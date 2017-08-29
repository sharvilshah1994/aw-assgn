import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },

  //404
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
