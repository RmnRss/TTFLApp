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

  /***
   * Logs the user in
   * Depending on the HTTPS GET Response we either displays errors or load the HomePage
   * @param id
   * @param password
   */
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

  /***
   * Shows a loader for the connexion
   */
  connexionLoading() {
    const loader = this.loadingCtrl.create({
      content: "Connexion en cours",
      duration: 2000
    });
    loader.present();
  }

  /***
   * Loads the account creation page
   */
  goToCreateAccount() {
    this.navCtrl.push('CreateAccountPage');
  }

  /***
   * Uses the API to reset the users password
   */
  forgotPassword() {
    //TODO : Implement
  }

  /***
   * Loads the rules page
   */
  showRules() {
    this.navCtrl.push('RulesPage', {'fromLogin': true});
  }

  /***
   * Loads the FAQ page
   */
  showFAQ() {
    this.navCtrl.push('FaqPage', {'fromLogin': true});
  }

  /***
   * Hides or show password using the http parameter type
   */
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
