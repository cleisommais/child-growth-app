import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AddProgressPage } from '../pages/add-progress/add-progress';
import { ReportProgressingPage } from '../pages/report-progressing/report-progressing';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { HttpModule } from '@angular/http';
import { GrowthLoginApiProvider } from '../providers/growth-login-api/growth-login-api';
import { GrowthTrackingApiProvider } from '../providers/growth-tracking-api/growth-tracking-api';
import { GrowthAccountApiProvider } from '../providers/growth-account-api/growth-account-api';
import { GrowthReportingApiProvider } from '../providers/growth-reporting-api/growth-reporting-api';

@NgModule({
  declarations: [
    MyApp,
    AddProgressPage,
    ReportProgressingPage,
    LoginPage,
    SignupPage,
    HomePage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddProgressPage,
    ReportProgressingPage,
    LoginPage,
    SignupPage,
    HomePage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GrowthLoginApiProvider, GrowthTrackingApiProvider, GrowthAccountApiProvider, GrowthReportingApiProvider
  ]
})
export class AppModule {}
