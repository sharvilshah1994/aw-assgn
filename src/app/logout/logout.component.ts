import { Component, OnInit } from '@angular/core';
import {Globals} from "../globals";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  flag;
  constructor(private global: Globals, private backend: BackendService) {
  }

  ngOnInit() {
    this.backend.deleteUsers()
      .subscribe(
        (response: Response) =>
          console.log(response)
      );
    this.global.loginStatus = false;
    this.flag = this.global.loginStatus;
  }

}
