import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {DateServiceProvider} from "../../providers/date-service/date-service";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TTFLPick} from "../../class/TTFL/TTFLPick";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {NBAGame} from "../../class/NBA/NBAGame";
import {GameDay} from "../../class/GameDay";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  picks: TTFLPick[];
  daysOfTheWeek = this.dateProvider.getCurrentWeek();

  /***
   * Initializes the user information on page creation
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nbaDataProvider: NbaDataProvider,
              public userProvider: UserServiceProvider,
              public dateProvider: DateServiceProvider,
              public ttflProvider: TtflProvider) {
    //Gets the user info once he's logged in
    this.userProvider.getUserInfoPromise(this.userProvider.user.id)
      .then(resp => {
        this.userProvider.user = resp;
        console.log(this.userProvider.user);
      }, error => {
        console.log(error);
      });
  }

  /***
   * Called everytime the page is loaded
   */
  ionViewCanEnter() {
    this.nbaDataProvider.getLinksPromise()
      .then(res => {
        this.nbaDataProvider.links = res.links;
      })
      .then(next => {
        this.picks = new Array<TTFLPick>();
        for (let gameDay of this.daysOfTheWeek) {
          let pick = new TTFLPick(this.dateProvider);
          pick.gameDate = gameDay;
          this.picks.push(pick);

          let games: NBAGame[] = new Array<NBAGame>();

          this.nbaDataProvider.getSchedulePromise().then(
            res => {
              let tempGames = res.league.standard;

              for (let game of tempGames) {
                let aGame = new NBAGame();

                if (game.startDateEastern == this.dateProvider.dateToString(gameDay.date)) {
                  aGame.startTimeUTC = game.startTimeUTC;

                  // Home team
                  aGame.hTeam.teamId = game.hTeam.teamId;
                  aGame.hTeam.wins = game.hTeam.win;
                  aGame.hTeam.loss = game.hTeam.loss;

                  // Visitor team
                  aGame.vTeam.teamId = game.vTeam.teamId;
                  aGame.vTeam.wins = game.vTeam.win;
                  aGame.vTeam.loss = game.vTeam.loss;
                  gameDay.nbaGames.push(aGame);
                }
              }

              // If there is at least one game that day, we get the earliest one
              if (gameDay.nbaGames.length > 0) {
                let index = 0;
                let earliestGameTime = gameDay.nbaGames[index].startTimeUTC;

                while (index < games.length - 2) {
                  if (earliestGameTime > gameDay.nbaGames[index + 1].startTimeUTC) {
                    earliestGameTime = gameDay.nbaGames[index + 1].startTimeUTC;
                    index++;
                  } else {
                    index++;
                  }
                }
                pick.closingTime = earliestGameTime;
              }
            });

          this.ttflProvider.getPickOfUserPromise(pick.gameDate.date, this.userProvider.user)
            .then(res => {
              for (let result of res) {

                // If a pick has already been chosen this week we get the information about all the picks
                if (result.size != 0) {
                  pick.hasPlayer = true;

                  pick.nbaPlayer.personId = result.nbaPlayerId;
                  pick.score = result.score;
                  pick.bestPick = result.bestPick;
                  pick.worstPick = result.worstPick;

                  this.nbaDataProvider.getPlayerPromise()
                    .then(res => {
                      for (let player of res.league.standard) {
                        if (player.personId == pick.nbaPlayer.personId) {
                          pick.nbaPlayer.firstName = player.firstName;
                          pick.nbaPlayer.lastName = player.lastName;
                          pick.nbaPlayer.jersey = player.jersey;
                          pick.nbaPlayer.team = player.teams[player.teams.length - 1];

                          this.nbaDataProvider.getTeamInfoPromise()
                            .then(res => {
                              let allTeams = res.teams.config;

                              for (let team of allTeams) {

                                if (pick.nbaPlayer.team.teamId == team.teamId) {
                                  pick.nbaPlayer.team.tricode = team.tricode;
                                  pick.nbaPlayer.team.ttsName = team.ttsName;
                                  pick.nbaPlayer.team.primaryColor = team.primaryColor;
                                  pick.nbaPlayer.team.secondaryColor = team.secondaryColor;
                                }

                              }

                            })
                        }
                      }
                    });
                }
              }
            });
        }
      });
  }

  /***
   * Load the daily game page and passes the games and dates as parameters
   * @param date selected by the user
   */
  showGamePage(date: GameDay) {
    this.navCtrl.push('DailyGamesPage', {selectedDate: date.date, nbaGames: date.nbaGames});
  }
}

