import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class BackendService {
  // URL = 'https://aw-assign1.firebaseio.com/data.json';
  URL = 'http://localhost:8080/user/';

  constructor(private http: Http) {
  }

  storeUsers(credentials: any[]) {
    return this.http.put(this.URL, credentials);
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


