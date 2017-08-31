import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Globals} from "./globals";

@Injectable()
export class BackendService {
  // URL = 'https://aw-assign1.firebaseio.com/data.json';
  URL = 'http://localhost:8080/user/';
  login_log_url = 'http://localhost:8080/login/addtimestamp';
  get_login_log = 'http://localhost:8080/login/';
  put_current_user = 'http://localhost:8080/user/current';

  constructor(private http: Http, private globals: Globals) {
  }

  storeUsers(username:String, credentials: any) {
    return this.http.post(this.URL + 'add' + '/'+ username , JSON.stringify(credentials));
  }

  storeTimeStamp(username: any) {
    return this.http.post(this.login_log_url, JSON.stringify(username));
  }

  putCurrentUser(username: any) {
    return this.http.post(this.put_current_user, JSON.stringify(username));
  }

  getTimeStamp() {
    return this.http.get(this.get_login_log + this.globals.username)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
  }

  getUsers(username: String, password:String) {
    return this.http.get(this.URL+ username +'/'+ password)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
}


