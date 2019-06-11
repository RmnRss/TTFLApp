import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {User} from "../../class/TTFL/user";

@Injectable()
export class UserServiceProvider {
  apiUrl: string = 'http://163.172.190.75:5498/api/';

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

  /***
   * Creates a user on the API
   * @param email
   * @param password
   * @param username
   */
  createUser(email: string, password: string, username: string) {
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

  /***
   * Gets the promise for the user information
   * @param id
   */
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

  /***
   * Stores users information in user object
   */
  getUserInfo(id: number) {
    this.getUserInfoPromise(id)
      .then(resp => {
        this.user = resp;
        console.log(this.user);
      }, error => {
        console.log(error);
      });
  }


  /***
   * Returns the promise to update an existing pick
   * @param existingPickId
   * @param player
   * @param user
   * @param date
   */
  updateUserTeamPromise(id: number, teamId: number): Promise<any> {
    let url = this.apiUrl + "users/" + id;

    return new Promise((resolve, reject) => {
      this.http.patch(url, {
        teamId: teamId
      }, this.httpOptions)
        .subscribe(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }


  /***
   * Gets the promise to log the user using the API
   * @param login
   * @param password
   */
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

  /***
   * Checks if the user has a TTFL Team
   */
  userHasTeam(): boolean {
    if (this.user.teamId != null) {
      this.user.hasTeam = true;
      return this.user.hasTeam;
    } else {
      this.user.hasTeam = false;
      return this.user.hasTeam;
    }
  }
}
