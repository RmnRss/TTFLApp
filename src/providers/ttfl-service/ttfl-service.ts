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

  createTfflPlayer(email: string, password: string, login: string) {
    let url = this.baseUrl + "ttflPlayers";
    this.http.post(url, {
      login: login,
      password: password,
      email: email,
      points: 0,
      money: 0
    }).subscribe(() => {
      console.log("posted");
    });
  }

}
