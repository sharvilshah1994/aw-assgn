import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Globals} from "../globals";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String;
  isLoggedIn;
  route;

  constructor(private router: Router,  private global: Globals, private backend: BackendService) {
    this.route = router.routerState.snapshot.url;
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
