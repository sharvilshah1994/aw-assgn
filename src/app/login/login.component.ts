import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BackendService} from "../backend.service";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {routing} from "../app.routing";

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
  loginStatus = false;
  ifLoginSuccess = true;

  constructor(private backendService: BackendService, private route: Router) { }

  ngOnInit() {
  }

  login() {
    const val = this.loginForm.value;
    this.username = val.username;
    this.password = val.password;
    this.backendService.getUsers(this.username, this.password).subscribe(
      (data: any) => {
        if (data === "SUCCESS"){
          this.route.navigate(['home']);
        }
        else {
          this.ifLoginSuccess = false;
        }
      }
    );

  }
}

