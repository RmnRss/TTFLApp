import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {NBAPlayer} from "../../class/NBA/NBAPlayer";

@IonicPage()
@Component({
  selector: 'page-player-stats',
  templateUrl: 'player-stats.html',
})
export class PlayerStatsPage {

  NBAPlayer: NBAPlayer;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public NBAService: NbaDataProvider)
  {
    this.NBAPlayer = new NBAPlayer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerStatsPage');
  }

  ionViewCanEnter(){
    this.NBAPlayer = this.navParams.get('selectedPlayer');
  }

}
