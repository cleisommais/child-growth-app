import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { LoginInterface } from "../../interface/login.interface";

@Injectable()
export class GrowthReportingApiProvider {
  login: LoginInterface;
  apiUrl = "http://192.168.0.24:3002";

  constructor(public http: Http) {
    this.login = JSON.parse(localStorage.getItem("jbb-data"));
  }

  retrieveByUserEmail() {
    let headers = new Headers();
    let token = this.login.token;
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${token}`);
    return new Promise((resolve, reject ) => {
      this.http.get(this.apiUrl + `/progress/user/${this.login.user.email}`, { headers: headers }).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
