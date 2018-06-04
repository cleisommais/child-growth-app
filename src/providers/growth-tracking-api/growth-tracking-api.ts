import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { LoginInterface } from "../../interface/login.interface";
import { ProgressModel } from "../../model/progress.model";

@Injectable()
export class GrowthTrackingApiProvider {
  login: LoginInterface;
  apiUrl = "http://192.168.0.24:3004";

  constructor(public http: Http) {
    this.login = JSON.parse(localStorage.getItem("jbb-data"));
  }

  saveProgress(body: ProgressModel) {
    let headers = new Headers();
    let token = this.login.token;
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${token}`);
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/progress", body, {
          headers: headers
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
