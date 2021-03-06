import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  email: string;
  password: string;
  username: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CreateAccountPage');
  }

  /***
   * Creates a user using the userService method
   * Then loads the login page
   * @param email
   * @param password
   * @param username
   */
  createUser(email: string, password: string, username: string) {
    this.userService.createUser(email, password, username);
    this.navCtrl.push('LoginPage');
  }
}
