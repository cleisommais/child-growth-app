import { Component, ViewChild } from "@angular/core";
import {
  Platform,
  Nav,
  ToastController,
  Events,
  LoadingController,
  AlertController
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { WelcomePage } from "../pages/welcome/welcome";
import { HomePage } from "../pages/home/home";
import { LoginInterface } from "../interface/login.interface";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = WelcomePage;
  loading: any;
  login: LoginInterface;
  pages: Array<{ title: string; component: any }>;
  pageLogin: { title: string; component: any };
  pageWelcome: {title: string; component: any};
  loggedin: boolean = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    public loadingCtrl: LoadingController,
    public events: Events,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    splashScreen: SplashScreen
  ) {
    statusBar.styleDefault();
    splashScreen.hide();
    this.initEvents();
    this.rootPage = this.initComp();
    this.pages = [{ title: "Home", component: HomePage }];
    this.pageLogin = { title: "Login", component: LoginPage };
    this.pageWelcome = {title: "Welcome", component: WelcomePage};

  }

  initEvents() {
    // Events
    this.events.subscribe("app:showloading", () => {
      this.presentLoading();
    });

    this.events.subscribe("app:hideloading", () => {
      this.hideLoading();
    });

    this.events.subscribe("app:toast", message => {
      this.presentToast(message);
    });

    this.events.subscribe("app:alert", message => {
      this.presentAlert(message);
    });

    this.events.subscribe("app:setUser", data => {
      this.initUserLogged(data);
    });

    this.events.subscribe("app:testAuth", () => {
      this.testAuth();
    });
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait while loading ..."
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3500
    });
    toast.present();
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  initUserLogged(data) {
    this.loggedin = true;
    this.login = JSON.parse( localStorage.getItem("jbb-data") );
    localStorage.setItem("jbb-data", JSON.stringify(data));
    this.navCtrl.setRoot(HomePage);
  }

  testAuth() {
    let data = localStorage.getItem("jbb-data");
    if (!data) {
      if(this.navCtrl != null)
        this.navCtrl.setRoot(WelcomePage);
    } else {
      this.login = JSON.parse(data);
    }
  }

  initComp() {
    let data = localStorage.getItem("jbb-data");
    if (!data) {
      return WelcomePage;
    } else {
      this.login = JSON.parse(data);
      return HomePage;
    }
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }

  triggerLoggedOff() {
    localStorage.removeItem("jbb-data");
    this.login = null;
    this.navCtrl.setRoot(WelcomePage);
  }

  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SignupPage);
  }
}
