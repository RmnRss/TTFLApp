import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TTFLTeam} from "../../class/TTFL/TTFLTeam";

@IonicPage()
@Component({
  selector: 'page-ttfl-team-ranking',
  templateUrl: 'ttfl-team-ranking.html',
})
export class TtflTeamRankingPage {

  userTeam: TTFLTeam;
  teams: Array<TTFLTeam>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public TTFLService: TtflProvider,
              public userService: UserServiceProvider) {
    this.teams = new Array<TTFLTeam>();
    this.userTeam = new TTFLTeam();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TtflTeamRankingPage');
  }

  ionViewCanEnter() {
    this.TTFLService.getTeamsRankingPromise().then(
      response => {
        this.teams = response.teams;
      }, error => {
        console.log(error);
      });

    this.TTFLService.getTeamPromise(this.userService.user)
      .then(result => {
        this.userTeam.id = result.id;
        this.userTeam.name = result.name;
        this.userTeam.rank = result.rank;
        this.userTeam.points = result.points;
      }, error => {
        console.log(error);
      });
  }

}
