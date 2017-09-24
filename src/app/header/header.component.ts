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
    // backend.getCurrentUser().subscribe(
    //   (data: any) => {
    //     if (data.length == 1){
    //       global.username = data[0].username;
    //       global.loginStatus = true;
    //       this.username = global.username;
    //       this.isLoggedIn = true;
    //     } else if (data.length > 1) {
    //       router.navigate(['logout']);
    //     } else {
    //       router.navigate(['login']);
    //     }
    //   }
    // );
    backend.sessionManagement();
    this.username = global.username;
    this.isLoggedIn = global.loginStatus;
    // if(global.loginStatus) {
    //   this.username = global.username;
    //   this.isLoggedIn = true;
    // } else {
    //   router.navigate(['login']);
    // }
  }

  ngOnInit() {
  }

}
