import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {DateServiceProvider} from "../../providers/date-service/date-service";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TtflPick} from "../../class/ttflPick";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  picks: TtflPick[] = this.dateProvider.getCurrentWeek();

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
        for (let pick of this.picks) {
          this.ttflProvider.getPickOfUserPromise(pick.date, this.userProvider.user)
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
   * Load the daily game page
   * @param date selected by the user
   */
  showGamePage(date: Date) {
    this.navCtrl.push('DailyGamesPage', {selectedDate: date});
  }
}

