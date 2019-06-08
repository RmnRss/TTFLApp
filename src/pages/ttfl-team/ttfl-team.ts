import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TTFLTeam} from "../../class/TTFL/TTFLTeam";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";

@IonicPage()
@Component({
  selector: 'page-ttfl-team',
  templateUrl: 'ttfl-team.html',
})
export class TtflTeamPage {

  userTeam: TTFLTeam = new TTFLTeam();

  // Creation or search variables
  teamName: string;
  showCreationCard: boolean = false;
  showSearchCard: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserServiceProvider,
              public ttflService: TtflProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TtflTeamPage');
  }

  ionViewCanEnter() {
    /*
    if (this.userProvider.userHasTeam()) {

    } else {

    }
    */
  }

  showTeamSearch() {
    this.showSearchCard = true;
  }

  showCreateTeam() {
    this.showCreationCard = true;
  }

  setTeamName(value: string) {
    this.teamName = value;
  }

  createTeam(name: string) {
    /*this.ttflService.createTeam(this.userProvider.user, name)
      .then(response => {
        this.userProvider.updateUserTeamPromise(this.userProvider.user.id, response[0].id)
          .then(() => {
          });
      })*/
  }

  leaveTeam() {
    /*this.userProvider.updateUserTeamPromise(this.userProvider.user.id, null)
      .then(() => {
      });*/
  }
}
