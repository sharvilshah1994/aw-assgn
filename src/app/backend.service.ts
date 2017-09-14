import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Globals} from "./globals";

@Injectable()
export class BackendService {
  aws_url = 'http://adaptiveassgn-env.zmjstf8vmf.us-east-1.elasticbeanstalk.com:9000';
  // aws_url = 'http://localhost:9000';
  URL = this.aws_url + '/user/';
  login_log_url = this.aws_url + '/login/addtimestamp';
  get_login_log = this.aws_url + '/login/';
  put_current_user = this.aws_url + '/user/current';
  get_user_logs = this.aws_url + '/log/';
  delete_current_user = this.aws_url + '/user/delete';

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

  getUserLogs() {
    return this.http.get(this.get_user_logs + this.globals.username)
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

  deleteUsers() {
    return this.http.delete(this.delete_current_user)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
  }
}


