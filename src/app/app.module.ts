import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BackendService} from "./backend.service";
import { LoginComponent } from './login/login.component';
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import { RegisterComponent } from './register/register.component';
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import {Globals} from "./globals";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule

  ],
  providers: [BackendService, LoginComponent, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
