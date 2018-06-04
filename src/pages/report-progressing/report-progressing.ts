import { Component, ViewChild } from "@angular/core";
import { NavController, Events } from "ionic-angular";
import { UserModel } from "../../model/user.model";
import { WelcomePage } from "../welcome/welcome";
import { GrowthReportingApiProvider } from "../../providers/growth-reporting-api/growth-reporting-api";
import { Chart } from "chart.js";

@Component({
  selector: "page-report-progressing",
  templateUrl: "report-progressing.html"
})
export class ReportProgressingPage {
  public user: UserModel = new UserModel();

  @ViewChild("lineCanvas") lineCanvas;
  lineChart: any;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public api: GrowthReportingApiProvider
  ) {
    events.publish("app:testAuth");
    if (localStorage.getItem("jbb-data"))
      this.user = JSON.parse(localStorage.getItem("jbb-data")).user;
  }

  ionViewDidEnter(){
    this.generateGraphBar();
  }


  generateGraphBar() {
    this.events.publish("app:showloading");
    this.api
      .retrieveByUserEmail()
      .then(data => this.handleProgressSucess(data))
      .catch(error => {
        this.events.publish("app:hideloading");
        switch (error.status) {
          case 0: {
            this.events.publish("app:toast", "API unavailable!");
            break;
          }
          case 401: {
            let message = "Incorrect token!";
            if (JSON.parse(error._body).error) {
              message = "Token Expired!";
            }
            this.events.publish("app:toast", message);
            this.redirectWelcomePage();
            break;
          }
          case 404:{
            this.events.publish('app:toast', "URL or PATH unavailable!");
            break;
          }
          case 500: {
            this.events.publish("app:toast", "Error request!");
            break;
          }
          default: {
            this.events.publish("app:toast", JSON.parse(error._body).failed);
            break;
          }
        }
      });
  }

  handleProgressSucess(data) {
    this.events.publish("app:hideloading");
    let array = JSON.parse(data._body);
    let bmi = [];
    array.forEach(progress => {
      bmi.push(((progress.weight)/(progress.height * progress.height)) + "-" + progress.dateTrack.split("-")[1]);
      progress.headCircumference;
      progress.dateTrack;
    });
    let count = 1;
    let dataGraph = [];
    while (count < 12) {
      let add = false;
      bmi.forEach(progress =>{
        if(count == progress.split("-")[1]){
          var aux = progress.split("-")[0];
          dataGraph.push(Number(aux).toPrecision(4));
          add = true;
        }
      });
      if(!add){
        dataGraph.push(0);
        add = false;
      }
      count++;
    }
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            label: "Body Mass Index - BMI",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "red",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataGraph,
            spanGaps: false
          }
        ]
      }
    });
    dataGraph = [];
    this.lineChart = null;
  }

  redirectWelcomePage() {
    localStorage.removeItem("jbb-data");
    this.events.publish("app:setUser", "");
    this.events.publish("app:testAuth", "");
    this.navCtrl.setRoot(WelcomePage);
  }
}
