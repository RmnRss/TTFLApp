import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {DateServiceProvider} from "../../providers/date-service/date-service";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TTFLPick} from "../../class/TTFL/TTFLPick";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {NBADay} from "../../class/NBA/NBADay";
import {NBAGame} from "../../class/NBA/NBAGame";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  picks: TTFLPick[];
  NBADaysOfTheWeek = this.dateProvider.getCurrentWeek();

  /***
   * Initializes the user information on page creation
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public NBAService: NbaDataProvider,
              public userService: UserServiceProvider,
              public dateProvider: DateServiceProvider,
              public TTFLService: TtflProvider) {
    //Gets the user info once he's logged in
    this.userService.getUserInfo(this.userService.user.id);
  }

  /***
   * Called everytime the page is loaded
   */
  ionViewCanEnter() {
    this.NBAService.getLinksPromise()
      .then(res => {
        this.NBAService.links = res.links;
      })
      .then(next => {
        this.picks = new Array<TTFLPick>();

        for (let gameDay of this.NBADaysOfTheWeek) {
          let pick = new TTFLPick();
          pick.gameDate = gameDay;

          // Get the games
          this.NBAService.getSchedulePromise()
            .then(res => {
              let allNBAGames = res.league.standard;

              for (let anNBAGame of allNBAGames) {

                let tempNBAGame = new NBAGame();
                tempNBAGame.startDateEastern = this.dateProvider.dateToNBAString(gameDay.date);

                if (anNBAGame.startDateEastern == tempNBAGame.startDateEastern) {
                  tempNBAGame.startTimeUTC = anNBAGame.startTimeUTC;

                  // Home team
                  tempNBAGame.hTeam.teamId = anNBAGame.hTeam.teamId;
                  tempNBAGame.hTeam.wins = anNBAGame.hTeam.win;
                  tempNBAGame.hTeam.loss = anNBAGame.hTeam.loss;

                  // Visitor team
                  tempNBAGame.vTeam.teamId = anNBAGame.vTeam.teamId;
                  tempNBAGame.vTeam.wins = anNBAGame.vTeam.win;
                  tempNBAGame.vTeam.loss = anNBAGame.vTeam.loss;

                  gameDay.nbaGames.push(tempNBAGame);
                }
              }
            })
            .then(next => {

              this.TTFLService.getPickOfUserPromise(pick.gameDate.date, this.userService.user)
                .then(res => {
                  for (let result of res) {
                    // If a pick has already been chosen this week we get the information about all the picks
                    if (result.size != 0) {
                      pick.hasPlayer = true;

                      pick.nbaPlayer.personId = result.nbaPlayerId;
                      pick.score = result.score;
                      pick.bestPick = result.bestPick;
                      pick.worstPick = result.worstPick;
                      pick.isUpdated = result.isUpdated;

                      this.NBAService.getPlayerPromise()
                        .then(res => {
                          for (let player of res.league.standard) {
                            if (player.personId == pick.nbaPlayer.personId) {
                              pick.nbaPlayer.firstName = player.firstName;
                              pick.nbaPlayer.lastName = player.lastName;
                              pick.nbaPlayer.jersey = player.jersey;
                              pick.nbaPlayer.team = player.teams[player.teams.length - 1];

                              this.NBAService.getTeamInfoPromise()
                                .then(res => {
                                  let allTeams = res.teams.config;

                                  for (let team of allTeams) {

                                    if (pick.nbaPlayer.team.teamId == team.teamId) {
                                      pick.nbaPlayer.team.tricode = team.tricode;
                                      pick.nbaPlayer.team.ttsName = team.ttsName;
                                      pick.nbaPlayer.team.colors = this.NBAService.NBATeamsColors.get(team.tricode);
                                    }

                                  }

                                  this.picks.push(pick);

                                })
                            }
                          }
                        });
                    } else {
                      //has no pick
                    }
                  }
                });
            });
        }
      });
  }

  /***
   * Load the daily game page and passes the games and dates as parameters
   * @param date selected by the user
   */
  showGamePage(date: NBADay) {
    this.navCtrl.push('DailyGamesPage', {selectedDate: date.date, nbaGames: date.nbaGames});
  }
}

