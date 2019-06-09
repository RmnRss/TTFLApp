import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the TtflRankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ttfl-ranking',
  templateUrl: 'ttfl-ranking.html',
})
export class TtflRankingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TtflRankingPage');
  }

  ionViewCanEnter() {
    //TODO : get all players and rank them
  }
}
