import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {Globals} from "../globals";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: String;
  isLoggedIn = false;

  constructor(loginComp: LoginComponent, router: Router, global: Globals) {
      console.log('Status:'+global.loginStatus);
      if(global.loginStatus) {
        this.username = global.username;
        this.isLoggedIn = true;
      } else {
        router.navigate(['login']);
      }
  }

  ngOnInit() {
  }



}
