import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TTFLPick} from "../../class/TTFL/TTFLPick";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TTFLTeam} from "../../class/TTFL/TTFLTeam";
import {User} from "../../class/TTFL/user";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
              public ttflService: TtflProvider)
  {
    this.userPicks = new Array<TTFLPick>();
    this.userTeam = new TTFLTeam();

  }

  ionViewDidLoad() {
    console.log('UserProfilePage');
  }

  ionViewCanEnter() {
    if (this.userService.userHasTeam()) {
      this.ttflService.getTeamPromise(this.userService.user)
        .then(result => {
          this.userTeam.id = result.id;
          this.userTeam.name = result.name;
          this.userTeam.rank = result.rank;
          this.userTeam.points = result.points;
        }, error => {
          console.log(error);
        })
    }
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
