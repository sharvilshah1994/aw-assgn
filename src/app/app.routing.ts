import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {QuestionComponent} from "./question/question.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./profile/profile.component";

const appRoutes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'profile', component: ProfileComponent },
  //404
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
