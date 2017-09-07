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
import {Ng2SmartTableModule} from "ng2-smart-table";
import { QuestionComponent } from './question/question.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    QuestionComponent,
    LogoutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    Ng2SmartTableModule
  ],
  providers: [BackendService, LoginComponent, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
