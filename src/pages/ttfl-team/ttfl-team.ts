import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TTFLTeam} from "../../class/TTFL/TTFLTeam";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {User} from "../../class/TTFL/user";

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
              public userService: UserServiceProvider,
              public ttflService: TtflProvider) {

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
        .then(next => {
        this.ttflService.getTeamMembersPromise(this.userTeam.id)
          .then(results => {
            let tempMembers = new Array<User>();

            for (let member of results) {
              tempMembers.push(member);
            }

            this.userTeam.members = tempMembers;
          }, error => {
            console.log(error);
          })
      })
    } else {

    }
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
    /*this.TTFLService.createTeam(this.userService.user, name)
      .then(response => {
        this.userService.updateUserTeamPromise(this.userService.user.id, response[0].id)
          .then(() => {
          });
      })*/
  }

  leaveTeam() {
    /*this.userService.updateUserTeamPromise(this.userService.user.id, null)
      .then(() => {
      });*/
  }
}
