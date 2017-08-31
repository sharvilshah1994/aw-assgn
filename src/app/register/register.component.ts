import {Component, OnInit, ViewChild} from '@angular/core';
import {BackendService} from "../backend.service";
import {Response} from '@angular/http';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  constructor(private backendService: BackendService) { }
  flag = true;

  ngOnInit() {
  }


  register() {
    this.flag = false;
    const val = this.loginForm.value;
    const username = val.username;
    const password = val.password;
    const payload = { "userName" : username, "password": password};
    this.backendService.storeUsers(username, payload)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
  }
}
