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
  searchedTerms: string;

  teamsFound: Array<TTFLTeam>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public TTFLService: TtflProvider) {

  }

  ionViewCanEnter() {
    if (this.userService.userHasTeam()) {
      this.TTFLService.getTeamOfUser(this.userService.user)
        .then(result => {
          this.userTeam = result;
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

  searchTeam(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    //TODO : Add API Search

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.teamsFound = this.teamsFound.filter((team) => {
        return (team.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
