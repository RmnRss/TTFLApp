import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Game} from "../../providers/nba-data/Game";
import {NbaDataProvider} from "../../providers/nba-data/nba-data";
import {Team} from "../../providers/nba-data/Team";

@IonicPage()
@Component({
  selector: 'page-daily-games',
  templateUrl: 'daily-games.html',
})
export class DailyGamesPage {

  games: Game[] = new Array<Game>();
  selectedDate: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: NbaDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyGamesPage');
  }

  ionViewCanEnter() {
    this.selectedDate = this.navParams.get('selectedDate');

    this.dataProvider.getSchedulePromise()
      .then(res => {
        console.log("Date : " + this.selectedDate);

        let numberOfGames = 0;
        let tempGames = res.league.standard;

        for (let game of tempGames) {
          let aGame = new Game();

          if (game.startDateEastern == this.selectedDate) {

            aGame.hTeam.teamId = game.hTeam.teamId;
            aGame.vTeam.teamId = game.vTeam.teamId;
            this.games.push(aGame);
            numberOfGames++;
          }
        }
      })
      .then(res => {
        this.dataProvider.getTeamInfoPromise()
          .then(res => {
            let allTeams = res.teams.config;

            for (let game of this.games) {

              for (let team of allTeams) {

                if (game.hTeam.teamId == team.teamId) {
                  game.hTeam.tricode = team.tricode;
                  game.hTeam.ttsName = team.ttsName;
                  game.hTeam.primaryColor = team.primaryColor;
                  game.hTeam.secondaryColor = team.secondaryColor;
                }
                if (game.vTeam.teamId == team.teamId) {
                  game.vTeam.tricode = team.tricode;
                  game.vTeam.ttsName = team.ttsName;
                  game.vTeam.primaryColor = team.primaryColor;
                  game.vTeam.secondaryColor = team.secondaryColor;
                }
              }
            }
          })
      });
  }

  showRoster(selectedTeam: Team) {
    this.navCtrl.push('TeamRosterPage', {selectedTeam: selectedTeam});
  }
}
