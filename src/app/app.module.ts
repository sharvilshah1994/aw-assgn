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
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { HeaderComponent } from './header/header.component';
import { VizComponent } from './viz/viz.component';
import { VerticalnavComponent } from './verticalnav/verticalnav.component';
import { CompareComponent } from './viz/compare/compare.component';
import { TopicsComponent } from './viz/topics/topics.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    QuestionComponent,
    LogoutComponent,
    ProfileComponent,
    HeaderComponent,
    VizComponent,
    VerticalnavComponent,
    CompareComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    Ng2SmartTableModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [BackendService, LoginComponent, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
