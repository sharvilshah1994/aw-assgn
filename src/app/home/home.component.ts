import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {Globals} from "../globals";
import {BackendService} from "../backend.service";
import {timestamp} from "rxjs/operator/timestamp";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: String;
  isLoggedIn = false;
  timestamps = [];
  flag = false;
  constructor(private router: Router,  private global: Globals, private backend: BackendService) {
      console.log('Status:'+global.loginStatus);
      if(global.loginStatus) {
        this.username = global.username;
        this.isLoggedIn = true;
      } else {
        router.navigate(['login']);
      }
  }

  ngOnInit() {
    console.log('On init');
    this.backend.getTimeStamp()
      .subscribe(
        (data: any) => {
          for (let i of data) {
            let d = new Date(parseInt(i.timestamp));
            this.timestamps.push(d);
          }
          this.flag = true;
        }
      )
  }

  logout() {
    const payload = {"username": "nothing"};
    this.backend.putCurrentUser(payload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.global.loginStatus = false;
    this.router.navigate(['login']);
  }

}
