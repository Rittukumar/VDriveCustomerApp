import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Driver } from "./driver";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  register(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "Users",
      JSON.stringify({
        Username: user.email,
        Email: user.email,
        Password: user.password
      }),
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  login(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "oauth/token",
      JSON.stringify({
        username: user.email,
        password: user.password,
        grant_type: "password"
      }),
      { headers: headers }
    )
    .map(response => response.json())
    .do(data => {
      Config.token = data.Result.access_token;
    })
    .catch(this.handleErrors);
  }

 resetPassword(email: string){
  alert(email);
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);

    return this.http.get('http://52.220.4.248/VDriveAdmin/public/v1/admin/getAllDrivers', {
      headers: headers
    })
    .map(res => {
      alert(res.json());
      res.json();
    })
    .map(data => {
      alert('test');
    })
    .catch(this.handleErrors);

 }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}