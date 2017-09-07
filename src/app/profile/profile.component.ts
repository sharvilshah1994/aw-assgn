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
  username;
  timestamps = [];
  flag;
  isLoggedIn;

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
          console.log(this.timestamps);
          this.timestamps.reverse();
          this.flag = true;
        }
      );
  }

}
