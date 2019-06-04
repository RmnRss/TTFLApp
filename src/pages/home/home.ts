import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {DateServiceProvider} from "../../providers/date-service/date-service";
import {User} from "../../class/user";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {TtflPick} from "../../class/ttflPick";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  today: String = this.dateProvider.getTodaysDate();
  picks: TtflPick[] = this.dateProvider.getCurrentWeek();

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: NbaDataProvider, public dateProvider: DateServiceProvider, public ttflProvider: TtflProvider) {
  }

  ionViewCanEnter() {

    this.user = this.navParams.get('loggedUser');

    this.dataProvider.getLinksPromise()
      .then(res => {
        this.dataProvider.links = res.links;
      })
      .then(next => {
        this.ttflProvider.getUserInfoPromise(this.user.id)
          .then(resp => {
            this.user = resp;
            console.log(this.user);
          })
      })
      .then(next => {
        for (let pick of this.picks) {
          this.ttflProvider.getPickOfUserPromise(pick.date, this.user).then(res => {
            for (let result of res) {
              if (result.size != 0) {
                pick.hasPlayer = true;
                pick.nbaPlayer.personId = result.nbaPlayerId;
                pick.score = result.score;
                pick.bestPick = result.bestPick;
                pick.worstPick = result.worstPick;

                this.dataProvider.getPlayerPromise().then(res => {
                  for (let player of res.league.standard) {
                    if (player.personId == pick.nbaPlayer.personId) {
                      pick.nbaPlayer.firstName = player.firstName;
                      pick.nbaPlayer.lastName = player.lastName;
                      pick.nbaPlayer.jersey = player.jersey;

                      console.log(player.teams);
                      pick.nbaPlayer.team = player.teams[player.teams.length - 1];

                      this.dataProvider.getTeamInfoPromise()
                        .then(res => {
                          let allTeams = res.teams.config;

                          for (let team of allTeams) {

                            if (pick.nbaPlayer.team.teamId == team.teamId) {
                              pick.nbaPlayer.team.tricode = team.tricode;
                              pick.nbaPlayer.team.ttsName = team.ttsName;
                              pick.nbaPlayer.team.primaryColor = team.primaryColor;
                              pick.nbaPlayer.team.secondaryColor = team.secondaryColor;
                            }

                          }

                        })
                    }
                  }
                });
              }
            }
          });
        }
      });
  }

  getGames(date: Date) {
    this.navCtrl.push('DailyGamesPage', {selectedDate: date, currentUser: this.user});
  }
}
