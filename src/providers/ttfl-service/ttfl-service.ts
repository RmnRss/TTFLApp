import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NbaPlayer} from "../../class/nbaPlayer";
import {User} from "../../class/user";
import {NbaDataProvider} from "../nba-service/nba-service";

@Injectable()
export class TtflProvider {
  apiUrl: string = 'http://localhost:3000/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //'Authorization': 'my-auth-token'
    })
  };

  constructor(public http: HttpClient, public nbaData: NbaDataProvider) {
    console.log('Hello TtflProvider Provider');
  }

  createTfflPlayer(email: string, password: string, username: string) {
    let url = this.apiUrl + "users";

    this.http.post(url, {
      username: username,
      password: password,
      email: email,
    })
      .subscribe(success => {
          console.log(success);
        }, error => {
          console.log(error);
        }
      );
  }

  postPickPromise(player: NbaPlayer, user: User, date: Date): Promise<any> {
    let url = this.apiUrl + "picks";

    return new Promise((resolve, reject) => {
      this.http.post(url, {
        date: date,
        userId: user.id,
        nbaPlayerId: player.personId
      }, this.httpOptions)
        .subscribe(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }

  updatePickPromise(existingPickId: number, player: NbaPlayer, user: User, date: Date): Promise<any> {
    let url = this.apiUrl + "picks/" + existingPickId;
    console.log("put @ " + url);

    return new Promise((resolve, reject) => {
      this.http.put(url, {
        id: existingPickId,
        date: date,
        userId: user.id,
        nbaPlayerId: player.personId
      }, this.httpOptions)
        .subscribe(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }

  getPickPromise(): Promise<any> {
    let url = this.apiUrl + "picks";
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    })
  }

  getPickOfUserPromise(date: Date, user: User): Promise<any> {
    let url = this.apiUrl + "picks";

    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    let filter = {"where": {"userId": user.id, "date": date}};
    let params = new HttpParams().set("filter", JSON.stringify(filter));

    return new Promise((resolve, reject) => {
      this.http.get(url, {params: params}).subscribe(
        success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }
}
