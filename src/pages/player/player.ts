import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaPlayer} from "../../class/nbaPlayer";
import {NbaDataProvider} from "../../providers/nba-service/nba-service";

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  selectedPlayer: NbaPlayer;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: NbaDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }

  ionViewCanEnter() {
    this.selectedPlayer = this.navParams.get('selectedPlayer');

    this.dataProvider.getPlayerLastGameStatsPromise(this.selectedPlayer).then(res => {

    });


  }

}
