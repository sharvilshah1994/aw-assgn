import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {Globals} from "../globals";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  res: any;
  private username: String;
  private password: String;
  ifLoginSuccess = true;
  private chrome;

  constructor(private backendService: BackendService, private route: Router,
  private globals: Globals) { }

  ngOnInit() {
  }

  login() {
    const val = this.loginForm.value;
    this.username = val.username;
    this.password = val.password;
    const milliseconds = (new Date).getTime();
    const payload = { "username" : this.username, "timestamp": milliseconds};
    const user = {"username": this.username};
    this.backendService.getUsers(this.username, this.password).subscribe(
      (data: any) => {
        console.log(data);
        if (data === "Success"){
          this.backendService.storeTimeStamp(payload).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );
          this.backendService.putCurrentUser(user).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );
          this.globals.username = this.username;
          this.globals.loginStatus = true;
          this.route.navigate(['profile']);
        }
        else {
          this.ifLoginSuccess = false;
        }
      }
    );

  }
}

