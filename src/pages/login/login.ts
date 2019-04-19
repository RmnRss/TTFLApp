import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {User} from "../../class/user";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;
  email: string;

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ttflProvider: TtflProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(id: string, password: string) {
    this.user = new User();

    this.ttflProvider.postLoginPromise(id, password)
      .then(resp => {
        console.log("logged in");
        this.user.id = resp.userId;
        this.navCtrl.push('HomePage', {loggedUser: this.user});
      })
      .catch(() => {
        console.log("error")
      })
  }

  goToCreateAccount() {
    this.navCtrl.push('CreateAccountPage');
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  setUsername(value: string) {
    this.username = value;
  }
}
