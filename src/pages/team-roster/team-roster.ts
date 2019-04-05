import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {NbaTeam} from "../../class/nbaTeam";
import {NbaPlayer} from "../../class/nbaPlayer";

@IonicPage()
@Component({
  selector: 'page-team-roster',
  templateUrl: 'team-roster.html',
})
export class TeamRosterPage {

  selectedTeam: NbaTeam;
  roster: NbaPlayer[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: NbaDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamRosterPage');
  }

  ionViewCanEnter() {
    this.selectedTeam = this.navParams.get('selectedTeam');
    console.log(this.selectedTeam.secondaryColor);
    console.log(this.selectedTeam.primaryColor);

    this.dataProvider.getRosterPromise(this.selectedTeam)
      .then(res => {
        this.roster = res.league.standard.players;
        }
      )
      .then(res => {
        this.dataProvider.getPlayerPromise().then(res => {
          let allPlayers = res.league.standard;
          let numberOfPlayers = 0;

          for (let teamPlayer of this.roster) {

            for (let aPlayer of allPlayers) {

              if (teamPlayer.personId == aPlayer.personId) {
                this.roster[numberOfPlayers].firstName = aPlayer.firstName;
                this.roster[numberOfPlayers].lastName = aPlayer.lastName;
                this.roster[numberOfPlayers].jersey = aPlayer.jersey;
                this.roster[numberOfPlayers].team = this.selectedTeam;
                numberOfPlayers++;
              }

            }
          }
        })
          .then(res => {
            for (let player of this.roster) {
              this.dataProvider.getPlayerSeasonStatsPromise(player)
                .then(res => {
                  let seasonStats = res.league.standard.stats.latest;

                  player.ppg = seasonStats.ppg;
                  player.rpg = seasonStats.rpg;
                  player.apg = seasonStats.apg;

                  //console.log(player.lastName + " ppg " + player.ppg + " rpg " + player.rpg + " apg " + player.apg);
                })
            }
          })
      });
  }

  showPlayerStats(selectedPlayer: NbaPlayer) {
    this.navCtrl.push('DailyGamesPage', {selectedPlayer: selectedPlayer});

  }
}
