import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  id: string;
  password: string;
  error: string;

  passwordType: string = 'password';
  passwordShown: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public userProvider: UserServiceProvider
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  login(id: string, password: string) {
    this.userProvider.postLoginPromise(id, password)
      .then(resp => {
        this.connexionLoading();
        this.navCtrl.setRoot('HomePage');
      })
      .catch(status => {
        if (status == 401) {
          this.error = "Erreur lors de la connexion. \n Verifier vos identifiants";
        } else {
          this.error = "Erreur lors de la connexion.";
        }
      })
  }

  connexionLoading() {
    const loader = this.loadingCtrl.create({
      content: "Connexion en cours",
      duration: 2000
    });
    loader.present();
  }

  goToCreateAccount() {
    this.navCtrl.push('CreateAccountPage');
  }

  forgotPassword() {
    //TODO : Implement
  }

  showRules() {
    this.navCtrl.push('RulesPage', {'fromLogin': true});
  }

  showFAQ() {
    this.navCtrl.push('FaqPage', {'fromLogin': true});
  }

  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }
}
