import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TTFLPick} from "../../class/TTFL/TTFLPick";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TTFLTeam} from "../../class/TTFL/TTFLTeam";
import {NbaDataProvider} from "../../providers/nba-service/NBA-service";


@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  userPicks: Array<TTFLPick>;
  userTeam: TTFLTeam;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public TTFLService: TtflProvider,
              public NBAService: NbaDataProvider) {
    this.userPicks = new Array<TTFLPick>();
    this.userTeam = new TTFLTeam();
  }

  ionViewDidLoad() {
    //console.log('UserProfilePage');
  }

  /***
   * Loads the user's information
   */
  ionViewCanEnter() {
    //Team Info
    if (this.userService.userHasTeam()) {
      this.TTFLService.getTeamOfUser(this.userService.user)
        .then(result => {
          this.userTeam = result;
        }, error => {
          console.log(error);
        });
    }

    // All Users Pick
    this.TTFLService.getAllPicksOfUserPromise(this.userService.user)
      .then(results => {
          this.userPicks = results;
      }, error => {
        console.log(error);
      });
  }

  /***
   *
   */
  getUsersPick() {
    //TODO :  Implements
  }

  getUsersBestPick() {
    //TODO :  Implements
  }

  getUsersWorstPick() {
    //TODO :  Implements
  }

}
