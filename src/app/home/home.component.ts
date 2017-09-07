import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Globals} from "../globals";
import {BackendService} from "../backend.service";

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
  logs = [];

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
    let count = 0;
    console.log('On init');
    this.backend.getTimeStamp()
      .subscribe(
        (data: any) => {
          for (let i of data) {
            let d = new Date(parseInt(i.timestamp));
            if (count < 6) {
              this.timestamps.push(d);
            }
            count++;
          }
          this.timestamps.reverse();
        }
      );

    this.backend.getUserLogs()
      .subscribe(
        (data: any) => {
          for (let i of data) {
            let d = new Date(parseInt(i.timestamp));
            i['timestamp'] = d;
            this.logs.push(i);
          }
          this.logs.reverse();
        }
      );
    this.flag = true;

  }

  refresh () {
    this.backend.getUserLogs()
      .subscribe(
        (data: any) => {
          for (let i of data) {
            let d = new Date(parseInt(i.timestamp));
            i['timestamp'] = d;
            console.log(i);
            this.logs.push(i);
          }
        }
      );
  }

  logout() {
    this.backend.deleteUsers()
      .subscribe(
        (response: Response) =>
        console.log(response)
      );
    this.global.loginStatus = false;
    this.router.navigate(['login']);
  }

}
