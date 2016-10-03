import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { setHintColor } from "../../utils/hint-util";
import {Http, Headers} from "@angular/http";

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;

  @ViewChild("container") container: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("name") name: ElementRef;
  @ViewChild("phone") phone: ElementRef;

  constructor(private router: Router, private userService: UserService, private page: Page) {
    this.user = new User();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
    let name = <TextField>this.name.nativeElement; 
    name.set("visibility","collapsed"); 
    let phone = <TextField>this.phone.nativeElement; 
    phone.set("visibility","collapsed"); 
    
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }

    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        () =>  {
          //this.router.navigate(["/list"]);
          this.router.navigate(["/vdrive"]);
        },
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  signUp() {

    this.userService.register(this.user)
    .map(res => res.json())
    .subscribe(
        (data) => {
          console.log("success:" + JSON.stringify(data));
          this.router.navigate(["/vdrive"]);
        },
        (err) => {
          alert("An error occurred updating your data:" + JSON.stringify(err));
        },
        () => {
        }
      );
  }

  forgotPassword() {
    prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register for Groceries to reset your password.",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      if (data.result) {
        this.userService.resetPassword(data.text.trim())
          .subscribe(
            () => {
            alert("Password email reset sent.");
          },
           () => alert("Unfortunately we were unable to rest the password.")
        );
      }
    });
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    this.setTextFieldColors();
    let container = <View>this.container.nativeElement;

    if(!this.isLoggingIn) {
      let name = <TextField>this.name.nativeElement; 
      name.set("visibility","visible"); 
      let phone = <TextField>this.phone.nativeElement; 
      phone.set("visibility","visible"); 
    }

    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }

  setTextFieldColors() {
    let emailTextField = <TextField>this.email.nativeElement;
    let passwordTextField = <TextField>this.password.nativeElement;
    let userTextField = <TextField>this.name.nativeElement;
    let phoneTextField = <TextField>this.phone.nativeElement;

    let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;
    userTextField.color = mainTextColor;
    phoneTextField.color = mainTextColor;

    let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
    setHintColor({ view: userTextField, color: hintColor });
    setHintColor({ view: phoneTextField, color: hintColor });
  }
}
