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
  searchedTerms: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public TTFLService: TtflProvider) {

  }

  ionViewCanEnter() {
    if (this.userService.userHasTeam()) {
      this.TTFLService.getTeamPromise(this.userService.user)
        .then(result => {
          this.userTeam.id = result.id;
          this.userTeam.name = result.mid;
          this.userTeam.rank = result.rank;
          this.userTeam.points = result.last;
        }, error => {
          console.log(error);
        })
        .then(next => {
          this.TTFLService.getTeamMembersPromise(this.userTeam.id)
            .then(results => {
              let tempMembers = new Array<User>();

              for (let member of results.members) {
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
    this.TTFLService.createTeam(this.userService.user, name)
      .then(next => {
        this.TTFLService.getTeamByNamePromise(name)
          .then(response => {
            this.userService.updateUserTeamPromise(this.userService.user.id, response[0].id).then(end => {
              this.navCtrl.setRoot('TtflTeamPage');
            }, error => {
              console.log(error);
            })
          }, error => {
            console.log(error);
          })
      }, error => {
        console.log(error);
      });
  }

  leaveTeam() {
    this.userService.updateUserTeamPromise(this.userService.user.id, null)
      .then(() => {
        this.navCtrl.setRoot('TtflTeamPage')
      });
  }

  searchTeam(searchedTerms: string) {

  }
}
