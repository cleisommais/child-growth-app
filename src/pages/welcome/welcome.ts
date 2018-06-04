import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { LoginInterface } from '../../interface/login.interface';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  login: LoginInterface;

  constructor(public navCtrl: NavController) {
    localStorage.removeItem("jbb-data");
    this.login = null;
  }
  ionViewDidLoad(){
    localStorage.removeItem("jbb-data");
    this.login = null;
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
}
