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
    let time_scroll = 0;
    let time_click = 0;
    let time_keydown = 0;
    let url_scroll = "";
    let url_click = "";
    let url_keydown = "";
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
            if (i['event_type'] == "scroll") {
              if (time_scroll == 0 && url_scroll == ""){
                url_scroll = i['uri'];
                time_scroll  = i['timestamp'];
                i['time_taken'] = 0;
              }
              else if(i['uri'] == url_scroll){
                i['time_taken'] = (i['timestamp'] - time_scroll) / 1000;
              }
            }
            else if (i['event_type'] == "click") {
              if (time_click == 0 && url_click == ""){
                time_click  = i['timestamp'];
                url_click = i['uri'];
                i['time_taken'] = 0;
              }
              else if(i['uri'] == url_click ){
                i['time_taken'] = (i['timestamp'] - time_click) / 1000;
              }
            }
            else if (i['event_type'] == "keydown") {
              if (time_keydown == 0 && url_keydown == ""){
                time_keydown  = i['timestamp'];
                url_keydown = i['uri'];
                i['time_taken'] = 0;
              }
              else if(i['uri'] == url_keydown) {
                i['time_taken'] = (i['timestamp'] - time_keydown) / 1000;
              }
            }
            else {
              i['time_taken'] = 0;
            }
            this.logs.push(i);
          }
          this.logs.reverse();
        }
      );
    this.flag = true;

  }

  refresh () {
    this.logs = [];
    this.backend.getUserLogs()
      .subscribe(
        (data: any) => {
          for (let i of data) {
            let d = new Date(parseInt(i.timestamp));
            i['timestamp'] = d;
            console.log(i);
            this.logs.push(i);
          }
          this.logs.reverse();
        }
      );
  }



}
