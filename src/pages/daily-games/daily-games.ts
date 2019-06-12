import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NBAGame} from "../../class/NBA/NBAGame";
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {NBATeam} from "../../class/NBA/NBATeam";
import {DateServiceProvider} from "../../providers/date-service/date-service";

@IonicPage()
@Component({
  selector: 'page-daily-games',
  templateUrl: 'daily-games.html',
})
export class DailyGamesPage {

  games: NBAGame[] = new Array<NBAGame>();

  selectedDate: Date;

  dateStr: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nbaDataProvider: NbaDataProvider,
              public dateProvider: DateServiceProvider) {
    this.selectedDate = this.navParams.get('selectedDate');
    this.dateStr = this.dateProvider.dateToNBAString(this.selectedDate);

    this.games = this.navParams.get('nbaGames');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyGamesPage');
  }

  ionViewCanEnter() {
    this.nbaDataProvider.getTeamInfoPromise()
      .then(res => {
        let allTeams = res.teams.config;

        for (let game of this.games) {

          for (let team of allTeams) {

            if (game.hTeam.teamId == team.teamId) {
              game.hTeam.tricode = team.tricode;
              game.hTeam.ttsName = team.ttsName;
              game.hTeam.colors = this.nbaDataProvider.NBATeamsColors.get(game.hTeam.tricode);
            }

            if (game.vTeam.teamId == team.teamId) {
              game.vTeam.tricode = team.tricode;
              game.vTeam.ttsName = team.ttsName;
              game.vTeam.colors = this.nbaDataProvider.NBATeamsColors.get(game.vTeam.tricode);
            }
          }
        }
      });
  }

  showRoster(selectedTeam: NBATeam) {
    this.navCtrl.push('TeamRosterPage', {
      selectedTeam: selectedTeam,
      selectedDate: this.selectedDate
    });
  }
}
