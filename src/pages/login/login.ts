import { Component } from "@angular/core";
import { NavController, Events } from "ionic-angular";
import { GrowthLoginApiProvider } from "../../providers/growth-login-api/growth-login-api";
import { UserModel } from "../../model/user.model";
import { SignupPage } from "../signup/signup";
import { LoginInterface } from "../../interface/login.interface";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  public user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public api: GrowthLoginApiProvider,
    private events: Events
  ) {
    localStorage.removeItem("jbb-data");
  }

  logIn() {
    this.events.publish("app:showloading");
    this.api
      .getToken(this.user)
      .then(data => this.handleLoginSuccess(data))
      .catch(error => {
        this.events.publish("app:hideloading");
        switch (error.status) {
          case 0: {
            this.events.publish("app:toast", "API unavailable!");
            break;
          }
          case 404:{
            this.events.publish('app:toast', "URL or PATH unavailable!");
            break;
          }
          case 500:{
            this.events.publish('app:toast', "Error request!");
            break;
          }
          default: {
            this.events.publish("app:toast", JSON.parse(error._body).failed);
            break;
          }
        }
      });
  }

  handleLoginSuccess(data) {
    let login = new LoginInterface();
    login = JSON.parse(data._body);
    this.events.publish("app:hideloading");
    this.events.publish("app:setUser", login);
  }

  checkLoginDisable() {
    if (this.isEmpty(this.user.email.length) || this.isEmpty(this.user.password.length)) {
      return false;
    }
    return true;
  }

  isEmpty(str): boolean {
    return !str || 0 === str.length;
  }

  goToSignup(params) {
    this.user = new UserModel();
    this.navCtrl.setRoot(SignupPage);
  }
}
