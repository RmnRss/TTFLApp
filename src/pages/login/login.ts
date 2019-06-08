import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;
  email: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public userProvider: UserServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(id: string, password: string) {

    this.userProvider.postLoginPromise(id, password)
      .then(resp => {
        console.log("logging in...");
        //this.connexionLoading();
        this.userProvider.user.id = resp.userId;
        this.navCtrl.setRoot('HomePage');
      })
      .catch(() => {
        console.log("error")
      })
  }

  connexionLoading() {
    const loader = this.loadingCtrl.create({
      content: "Connexion en cours",
      duration: 3000
    });
    loader.present();
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

  ForgottenPassword() {

  }
}
