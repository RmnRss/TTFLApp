import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TTFLPick} from "../../class/TTFL/TTFLPick";
import {NbaDataProvider} from "../../providers/nba-service/NBA-service";


@IonicPage()
@Component({
  selector: 'page-ttfl-daily-pick-ranking',
  templateUrl: 'ttfl-daily-pick-ranking.html',
})
export class TtflDailyPickRankingPage {

  picks: Array<TTFLPick>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ttflService: TtflProvider,
              public NBAService: NbaDataProvider) {
    this.picks = new Array<TTFLPick>();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TtflDailyPickRankingPage');
  }

  /***
   * Loads the picks from API to be displayed
   */
  ionViewCanEnter() {
    //TODO : get all yesterday's pick and rank them
    this.ttflService.getResultsOfYesterday().then(
      response => {
        this.picks = response;
      },
      error => {
        console.log(error);
      })
  }

}
