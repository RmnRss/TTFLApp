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

  teams: Array<TTFLTeam>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ttflService: TtflProvider,
              public userService: UserServiceProvider) {
    this.teams = new Array<TTFLTeam>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TtflTeamRankingPage');
  }

  ionViewCanEnter() {
    this.ttflService.getTeamsRankingPromise().then(
      response => {
        this.teams = response.teams;
      }, error => {
        console.log(error);
      })
  }

}
