import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  email: string;
  password: string;
  login: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ttflProvider: TtflProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  createPlayer(email: string, password: string, login: string) {
    console.log(email);
    console.log(password);
    console.log(login);
    this.ttflProvider.createTfflPlayer(email, password, login);
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  setUsername(value: string) {
    this.login = value;
  }
}
