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
    console.log("inside the register"+Config.vdriveapi);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    /*this.http.post('http://192.168.56.1:3000/api/users', JSON.stringify({"username":"from native app","mobileNumber":"1234567890","createdAt":"2016-10-10"}), {
    headers: headers
    })
    .map(res => res.json())
      .subscribe((data) => {
        console.log("1"+JSON.stringify(data));
      },
      (err) => {
        console.error(err);
        alert("Failed to load the data:" + JSON.stringify(err));
      },
      () => {
        console.log("2");
      })*/


    return this.http.post('http://52.220.4.248/adminportal/public/v1/customer/signup',
        JSON.stringify({"data":{"name":"testt","phone":"123","email":"newvdrive1@gmail.com","password":"test"}}),
        { headers: headers }
      )
      .map(function(response){ return response.json(); })
      .do(data => {
         console.log('test....');
      })
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