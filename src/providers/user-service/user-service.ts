import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {User} from "../../class/user";

@Injectable()
export class UserServiceProvider {
  apiUrl: string = 'http://localhost:3000/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //'Authorization': 'my-auth-token'
    })
  };

  public user: User;

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
    this.user = new User();
  }

  getUserInfoPromise(id: number): Promise<any> {
    let url = this.apiUrl + "users/" + id;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    })

  }

  postLoginPromise(login: string, password: string): Promise<any> {
    let url = this.apiUrl + "users/login";
    return new Promise((resolve, reject) => {
      this.http.post(url, {
        username: login,
        password: password,
      }, this.httpOptions)
        .subscribe(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }

}
