import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the TtflTeamRankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ttfl-team-ranking',
  templateUrl: 'ttfl-team-ranking.html',
})
export class TtflTeamRankingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TtflTeamRankingPage');
  }

  ionViewCanEnter() {
    //TODO : get all teams and rank them
  }

}
