import { Component } from "@angular/core";
import { NavController, Events } from "ionic-angular";
import { GrowthTrackingApiProvider } from "../../providers/growth-tracking-api/growth-tracking-api";
import { ProgressModel } from "../../model/progress.model";
import { UserModel } from "../../model/user.model";
import { WelcomePage } from "../welcome/welcome";

@Component({
  selector: "page-add-progress",
  templateUrl: "add-progress.html"
})
export class AddProgressPage {
  public progress: ProgressModel = new ProgressModel();
  public user: UserModel = new UserModel();
  constructor(
    public events: Events,
    public navCtrl: NavController,
    public api: GrowthTrackingApiProvider
  ) {
    events.publish("app:testAuth");
    this.progress.dateTrack = new Date();
    if (localStorage.getItem("jbb-data"))
      this.user = JSON.parse(localStorage.getItem("jbb-data")).user;
  }

  addProgress() {
    this.events.publish("app:showloading");
    this.progress.user = this.user;
    this.api
      .saveProgress(this.progress)
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

  redirectWelcomePage() {
    localStorage.removeItem("jbb-data");
    this.events.publish("app:setUser", "");
    this.events.publish("app:testAuth", "");
    this.navCtrl.setRoot(WelcomePage);
  }

  isEmpty(str): boolean {
    return !str || 0 === str.length;
  }

  checkDisable(): boolean {
    if (
      this.isEmpty(this.progress.height) ||
      this.isEmpty(this.progress.weight) ||
      this.isEmpty(this.progress.headCircumference) ||
      this.isEmpty(this.progress.dateTrack)
    ) {
      return false;
    }
    return true;
  }

  handleProgressSucess(data) {
    this.events.publish("app:hideloading");
    this.progress.headCircumference = 0;
    this.progress.weight = 0;
    this.progress.height = 0;
    this.progress.dateTrack = null;
    this.events.publish(
      "app:toast",
      `Added, id => ${JSON.parse(data._body)._id}!`
    );
  }

  cancel() {
    this.progress = new ProgressModel();
  }
}
