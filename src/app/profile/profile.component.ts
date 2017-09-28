import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Globals} from "../globals";
import {BackendService} from "../backend.service";
import {timestamp} from "rxjs/operator/timestamp";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = localStorage.getItem("userid");
  timestamps = [];
  flag = false;
  isLoggedIn;

  constructor(private router: Router,  private global: Globals, private backend: BackendService) {
    console.log('Status:'+global.loginStatus);
    // backend.sessionManagement();

    this.username = localStorage.getItem("userid");
    this.isLoggedIn = global.loginStatus;
    if(this.username != null) {
      this.isLoggedIn = true;
      this.getTableData();
    } else {
      router.navigate(['login']);
    }
  }

  ngOnInit() {

  }

  getTableData() {
    console.log("Table called");
    this.backend.getTimeStamp()
      .subscribe(
        (data: any) => {
          for (let i of data) {
            let d = new Date(parseInt(i.timestamp));
            this.timestamps.push(d);
          }
          console.log(this.timestamps);
          this.timestamps.reverse();
          this.flag = true;
        }
      );
  }

}
