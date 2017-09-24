import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {Router, RouterModule} from "@angular/router";
import {BackendService} from "./backend.service";
import {Globals} from "./globals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(backend: BackendService, globals: Globals, route: Router){
    console.log('App module');
    backend.getCurrentUser().subscribe(
      (data: any) => {
        if (data.length == 1){
          globals.username = data[0].username;
          globals.loginStatus = true;
        } else if (data.length > 1) {
          route.navigate(['logout']);
        } else {
          route.navigate(['login']);
        }
      }
    );
  }

}
