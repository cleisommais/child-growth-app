import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { TrackingPage } from '../tracking/tracking';
import { SignupPage } from '../signup/signup';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = SignupPage;
  tab3Root = TrackingPage;

  constructor() {

  }
}
