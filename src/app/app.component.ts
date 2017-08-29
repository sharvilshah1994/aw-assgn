import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private loginComp: LoginComponent, private router: Router){
    if(loginComp.loginStatus === false){
      router.navigate(['login']);
    }
  }

}
