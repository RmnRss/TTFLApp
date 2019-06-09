import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the TtflDailyPickRankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ttfl-daily-pick-ranking',
  templateUrl: 'ttfl-daily-pick-ranking.html',
})
export class TtflDailyPickRankingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TtflDailyPickRankingPage');
  }

  ionViewCanEnter() {
    //TODO : get all yesterday's pick and rank them
  }

}
