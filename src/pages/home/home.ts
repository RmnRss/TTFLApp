import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/NBA-service";
import {DateServiceProvider} from "../../providers/date-service/date-service";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TTFLPick} from "../../class/TTFL/TTFLPick";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {NBADay} from "../../class/NBA/NBADay";

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
   * Get the links from the NBA API
   * Then for each NBA Day of the Week gets the picks of the user
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
          this.NBAService.getGames(this.dateProvider.dateToNBAString(gameDay.date))
            .then(games => {
              gameDay.nbaGames = games;

              if (gameDay.hasGames()) {

                this.TTFLService.getPickOfUser(gameDay, this.userService.user)
                  .then(pickReceived => {
                    let pick = pickReceived;
                    this.picks.push(pick);
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
  showGamePage(day: NBADay) {
    this.navCtrl.push('DailyGamesPage', {selectedDay: day});
  }
}
