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

  picks: Array<TTFLPick>;
  NBADaysOfTheWeek: Array<NBADay>;

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
    this.NBADaysOfTheWeek = this.dateProvider.getWeek(new Date('19 April, 2019'));
  }

  /***
   * Called everytime the page is loaded
   */
  ionViewCanEnter() {
    this.picks = new Array<TTFLPick>();

    this.NBAService.getLinksPromise()
      .then(res => {
        this.NBAService.links = res.links;
      })
      .then(next => {
        for (let gameDay of this.NBADaysOfTheWeek) {
          // Get the games
          this.NBAService.getSchedulePromise()
            .then(schedule => {
              let allNBAGames = schedule.league.standard;

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

              if (gameDay.hasGames()) {

                this.TTFLService.getPickOfUserPromise(gameDay.date, this.userService.user)
                  .then(pickReceived => {
                    let pick = new TTFLPick();
                    pick.gameDate = gameDay;
                    // If a pick has already been chosen this week we get the information about all the picks
                    if (pickReceived.length != 0) {
                      pick.hasPlayer = true;

                      pick.nbaPlayer.personId = pickReceived[0].nbaPlayerId;
                      pick.score = pickReceived[0].score;
                      pick.bestPick = pickReceived[0].bestPick;
                      pick.worstPick = pickReceived[0].worstPick;
                      pick.isUpdated = pickReceived[0].isUpdated;

                      this.NBAService.getPlayerPromise()
                        .then(allPlayers => {
                          for (let player of allPlayers.league.standard) {
                            if (player.personId == pick.nbaPlayer.personId) {
                              pick.nbaPlayer.firstName = player.firstName;
                              pick.nbaPlayer.lastName = player.lastName;
                              pick.nbaPlayer.jersey = player.jersey;
                              pick.nbaPlayer.team = player.teams[player.teams.length - 1];

                              this.NBAService.getTeamInfoPromise()
                                .then(allTeams => {
                                  for (let team of allTeams.teams.config) {

                                    if (pick.nbaPlayer.team.teamId == team.teamId) {
                                      pick.nbaPlayer.team.tricode = team.tricode;
                                      pick.nbaPlayer.team.ttsName = team.ttsName;
                                      pick.nbaPlayer.team.colors = this.NBAService.NBATeamsColors.get(team.tricode);
                                    }

                                  }

                                  this.picks.push(pick);
                                });
                            }
                          }
                        });
                    } else {
                      //has no picks
                      this.picks.push(pick);
                    }

                  });

              }
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

