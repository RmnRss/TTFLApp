import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the TtflProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TtflProvider {
  baseUrl: string = 'http://localhost:3000/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //'Authorization': 'my-auth-token'
    })
  };

  constructor(public http: HttpClient) {
    console.log('Hello TtflProvider Provider');
  }

  createTfflPlayer(email: string, password: string, username: string) {
    let url = this.baseUrl + "users";
    this.http.post(url, {
      username: username,
      password: password,
      email: email,
    }).subscribe(() => {
      console.log("posted");
    });
  }

  getLoginPromise(login: string, password: string): Promise<any> {
    let url = this.baseUrl + "users/login";
    return new Promise((resolve, reject) => {
      this.http.post(url, {
        username: login,
        password: password,
      }, this.httpOptions)
        .subscribe(success => {
          resolve(success);
        }, reject => {
          resolve(reject);
        });
    })

  }

  getUserInfoPromise(id: number): Promise<any> {
    let url = this.baseUrl + "users/" + id;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(success => {
        resolve(success);
      }, reject => {
        resolve(reject);
      });
    })

  }

}
