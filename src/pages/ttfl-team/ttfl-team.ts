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

  /***
   * Loads the user's team infos
   */
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

  /***
   * Creates a team on the api and updates the current user
   * @param name given to the new team
   */
  createTeam(name: string) {
    this.TTFLService.createTeam(this.userService.user, name)
      .then((res: TTFLTeam) => {
        this.userService.updateUserTeamPromise(this.userService.user.id, res.id)
          .then(end => {
            this.navCtrl.setRoot('TtflTeamPage');
          }, error => {
            console.log(error);
          })
      }, error => {
        console.log(error);
      });
  }

  /***
   * Removes the current player from the team
   */
  leaveTeam() {
    this.userService.updateUserTeamPromise(this.userService.user.id, null)
      .then(() => {
        this.navCtrl.setRoot('TtflTeamPage')
      });
  }

  /***
   * Removes the current player from the team
   */
  joinTeam(team: TTFLTeam) {
    this.userService.updateUserTeamPromise(this.userService.user.id, team.id)
      .then(() => {
        this.navCtrl.setRoot('TtflTeamPage')
      });
  }

  /***
   * Send get request to the API to get the teams
   * @param terms
   */
  searchTeam(terms: string) {
    this.TTFLService.getTeamByNamePromise(terms)
      .then(response => {
        this.teamsFound = response;
      }, error => {
        console.log(error);
      });
  }
}
