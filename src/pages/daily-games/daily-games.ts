import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/NBA-service";
import {NBATeam} from "../../class/NBA/NBATeam";
import {NBADay} from "../../class/NBA/NBADay";

@IonicPage()
@Component({
  selector: 'page-daily-games',
  templateUrl: 'daily-games.html',
})
export class DailyGamesPage {

  selectedDay: NBADay;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nbaDataProvider: NbaDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyGamesPage');
  }

  ionViewCanEnter() {
    this.selectedDay = this.navParams.get('selectedDay');

    for (let game of this.selectedDay.nbaGames) {

      this.nbaDataProvider.getNBATeam(game.hTeam)
        .then(team => {
          game.hTeam = team;
        });

      this.nbaDataProvider.getNBATeam(game.vTeam)
        .then(team => {
          game.vTeam = team;
        });
    }
  }

  showRoster(selectedTeam: NBATeam) {
    this.navCtrl.push('TeamRosterPage', {
      selectedTeam: selectedTeam,
      selectedDay: this.selectedDay
    });
  }
}
