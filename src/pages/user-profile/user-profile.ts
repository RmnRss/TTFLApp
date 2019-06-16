import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TTFLPick} from "../../class/TTFL/TTFLPick";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TTFLTeam} from "../../class/TTFL/TTFLTeam";
import {NbaDataProvider} from "../../providers/nba-service/nba-service";


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
    console.log('UserProfilePage');
  }

  ionViewCanEnter() {

    //Team Info
    if (this.userService.userHasTeam()) {
      this.TTFLService.getTeamPromise(this.userService.user)
        .then(result => {
          this.userTeam.id = result.id;
          this.userTeam.name = result.mid;
          this.userTeam.rank = result.rank;
          this.userTeam.points = result.last;
        }, error => {
          console.log(error);
        }).then(next => {

      });
    }

    // All Users Pick
    this.TTFLService.getAllPicksOfUserPromise(this.userService.user)
      .then(results => {
        for (let pick of results.picks) {
          let tempPick = new TTFLPick();

          tempPick.nbaPlayer.personId = pick.nbaPlayerId;
          tempPick.score = pick.score;
          tempPick.bestPick = pick.bestPick;
          tempPick.worstPick = pick.worstPick;

          this.NBAService.getPlayerPromise()
            .then(players => {
              for (let player of players.league.standard) {
                if (player.personId == tempPick.nbaPlayer.personId) {
                  tempPick.nbaPlayer.firstName = player.firstName;
                  tempPick.nbaPlayer.lastName = player.lastName;
                  tempPick.nbaPlayer.jersey = player.jersey;
                  tempPick.nbaPlayer.team = player.teams[player.teams.length - 1];
                }
              }

              console.log(tempPick);
              this.userPicks.push(tempPick);
            });
        }

      }, error => {
        console.log(error);
      });
  }

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
