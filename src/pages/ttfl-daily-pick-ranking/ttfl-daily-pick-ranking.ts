import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TTFLPick} from "../../class/TTFL/TTFLPick";
import {NbaDataProvider} from "../../providers/nba-service/nba-service";


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
    console.log('ionViewDidLoad TtflDailyPickRankingPage');
  }

  ionViewCanEnter() {
    //TODO : get all yesterday's pick and rank them
    this.ttflService.getResultsOfYesterday().then(
      response => {
        for (let pick of response.picks) {
          let tempPick = new TTFLPick();

          tempPick.nbaPlayer.personId = pick.nbaPlayerId;
          tempPick.score = pick.score;
          tempPick.bestPick = pick.bestPick;
          tempPick.worstPick = pick.worstPick;

          this.NBAService.getPlayerPromise()
            .then(players => {
              for (let player of players.league.standard) {
                if (player.personId == tempPick.nbaPlayer.personId) {
                  tempPick.nbaPlayer.firstName = player.firstName;
                  tempPick.nbaPlayer.lastName = player.lastName;
                  tempPick.nbaPlayer.jersey = player.jersey;
                  tempPick.nbaPlayer.team = player.teams[player.teams.length - 1];
                }
              }

              console.log(tempPick);
              this.picks.push(tempPick);
            });
        }
      },
      error => {
        console.log(error);
      })
  }

}
