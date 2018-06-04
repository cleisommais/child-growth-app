import { Http, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { UserModel } from "../../model/user.model";

@Injectable()
export class GrowthAccountApiProvider {
  apiUrl = "http://192.168.0.24:3001";

  constructor(public http: Http) {
  }

  saveUser(body: UserModel){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/user", body, {
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
