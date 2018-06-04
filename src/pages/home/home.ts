import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AddProgressPage } from '../add-progress/add-progress';
import { ReportProgressingPage } from '../report-progressing/report-progressing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root: any = AddProgressPage;
  tab2Root: any = ReportProgressingPage;
  constructor(public events: Events, public navCtrl: NavController) {
    events.publish('app:testAuth');
  }
}
