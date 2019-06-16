import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {User} from "../../class/TTFL/user";
import {ToastController} from "ionic-angular";

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

  constructor(public http: HttpClient,
              public toastCtrl: ToastController) {
    //console.log('Hello UserServiceProvider Provider');
    this.user = new User();
  }

  /***
   * Creates a user on the API
   * @param email
   * @param password
   * @param username
   */
  createUser(email: string, password: string, username: string) {
    // TODO: Hash password before sending it

    let url = this.apiUrl + "users";

    this.http.post(url, {
      username: username,
      password: password,
      email: email,
    }).subscribe(success => {
        this.presentToast('Votre compte a bien été créé').then();
      }, error => {
        this.presentToast('Erreur lors de la création de votre compte').then();
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
        this.presentToast('Bienvenue ' + this.user.username).then();
      }, error => {
        this.presentToast('Erreur: Impossible de récupérer l\'utilisateur ').then();
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
    let url = this.apiUrl + "users/update?[where][id]=" + id;

    return new Promise((resolve, reject) => {
      this.http.post(url, {
        teamId: teamId
      }, this.httpOptions)
        .subscribe(success => {
          this.user.teamId = teamId;
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
    // TODO: Hash password before sending it
    let url = this.apiUrl + "users/login";
    return new Promise((resolve, reject) => {
      this.http.post(url, {
        username: login,
        password: password,
      }, this.httpOptions)
        .subscribe((success:any) => {
          this.user.id = success.userId;
          resolve(success);
        }, (error: HttpErrorResponse) => {
          reject(error.status);
        });
    })
  }

  /***
   * Gets the promise to log out the user using the API
   * @param login
   * @param password
   */
  postLogOutPromise(accessToken:string): Promise<any> {
    let url = this.apiUrl + "users/logout";
    return new Promise((resolve, reject) => {
      this.http.post(url, {

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

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
