import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {User} from "../../class/TTFL/user";

@IonicPage()
@Component({
  selector: 'page-ttfl-ranking',
  templateUrl: 'ttfl-ranking.html',
})
export class TtflRankingPage {

  users: Array<User>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ttflService: TtflProvider,
              public userService: UserServiceProvider) {
    this.users = new Array<User>();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TtflRankingPage');
  }

  /***
   * Loads the rankings
   */
  ionViewCanEnter() {
    this.ttflService.getUsersRankingPromise().then(
      response => {
        this.users = response.users;
      }, error => {
        console.log(error);
      })
  }
}
