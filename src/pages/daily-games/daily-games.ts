import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaGame} from "../../class/nbaGame";
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {NbaTeam} from "../../class/nbaTeam";
import {DateServiceProvider} from "../../providers/date-service/date-service";
import {User} from "../../class/user";

@IonicPage()
@Component({
  selector: 'page-daily-games',
  templateUrl: 'daily-games.html',
})
export class DailyGamesPage {

  games: NbaGame[] = new Array<NbaGame>();

  selectedDate: Date;
  user: User;

  dateStr: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: NbaDataProvider, public dateProvider: DateServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyGamesPage');
  }

  ionViewCanEnter() {
    this.selectedDate = this.navParams.get('selectedDate');
    this.user = this.navParams.get('currentUser');
    this.dateStr = this.dateProvider.dateToString(this.selectedDate);

    this.dataProvider.getSchedulePromise()
      .then(res => {
        console.log("Date : " + this.dateStr);

        let numberOfGames = 0;
        let tempGames = res.league.standard;

        for (let game of tempGames) {
          let aGame = new NbaGame();

          if (game.startDateEastern == this.dateStr) {

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

  showRoster(selectedTeam: NbaTeam) {
    this.navCtrl.push('TeamRosterPage', {
      selectedTeam: selectedTeam,
      currentUser: this.user,
      selectedDate: this.selectedDate
    });
  }
}
