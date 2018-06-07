import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class GrowthLoginApiProvider {
  //apiUrl = "http://localhost:3000";
  apiUrl = "https://grow-lo.localtunnel.me";

  constructor(public http: Http) {

  }

  getToken(body) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/token", JSON.stringify(body), {
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

  verifyToken() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "");
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/verify", null, {
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
