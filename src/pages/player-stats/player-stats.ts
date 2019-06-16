import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/NBA-service";
import {NBAPlayer} from "../../class/NBA/NBAPlayer";
import {TTFLPick} from "../../class/TTFL/TTFLPick";

@IonicPage()
@Component({
  selector: 'page-player-stats',
  templateUrl: 'player-stats.html',
})
export class PlayerStatsPage {

  NBAPlayer: NBAPlayer;
  picks: Array<TTFLPick>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public NBAService: NbaDataProvider)
  {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PlayerStatsPage');
  }

  /***
   * Loads the NBAPlayer and the related picks everytime the page is reloaded
   */
  ionViewCanEnter(){
    this.NBAPlayer = new NBAPlayer();
    this.NBAPlayer = this.navParams.get('selectedPlayer');

    this.picks = new Array<TTFLPick>();
  }

}
