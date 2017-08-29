import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import {Response} from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials ;
  users = [
    {
      username: 'aaa',
      password: 'abc123'
    }
  ];
  constructor(private backendService: BackendService) { }

  ngOnInit() {
  }

  register() {
    this.backendService.storeUsers(this.users)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
  }
  //
  // get() {
  //   this.backendService.getUsers();
  // }
}
