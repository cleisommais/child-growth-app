import { Component } from "@angular/core";
import { NavController, Events } from "ionic-angular";
import { LoginPage } from "../login/login";
import { UserModel } from "../../model/user.model";
import { GrowthAccountApiProvider } from "../../providers/growth-account-api/growth-account-api";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  public user: UserModel = new UserModel();

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public api: GrowthAccountApiProvider
  ) {}

  addUser() {
    this.events.publish("app:showloading");
    this.api
      .saveUser(this.user)
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
            break;
          }
          case 404:{
            this.events.publish('app:toast', "URL or PATH unavailable!");
            break;
          }
          case 500: {
            let search = JSON.parse(error._body).error.message.indexOf(
              "duplicate key error"
            );
            let message = "Error request!";
            if (search != -1) {
              message = `The email ${
                this.user.email
              } alredy exist, choose another!`;
            }
            console.log(JSON.parse(error._body).error.message);
            this.events.publish("app:toast", message);
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
    this.events.publish(
      "app:toast",
      `Added, id => ${JSON.parse(data._body)._id}!`
    );
    this.navCtrl.push(LoginPage);
  }

  checkPassEquals(): boolean {
    if (this.user.password !== this.user.c_password) {
      this.events.publish("app:alert", "The passwords should be equals!");
      this.user.password = "";
      this.user.c_password = "";
      return true;
    }
    return false;
  }

  checkDisable(): boolean {
    if (
      this.isEmpty(this.user.firstName) ||
      this.isEmpty(this.user.email) ||
      this.isEmpty(this.user.password) ||
      this.isEmpty(this.user.c_password) ||
      this.isEmpty(this.user.gender) ||
      this.isEmpty(this.user.dateBirth)
    ) {
      return false;
    }
    return true;
  }

  isEmpty(str): boolean {
    return !str || 0 === str.length;
  }

  cancel() {
    this.user = new UserModel();
    this.navCtrl.popToRoot();
  }
}
