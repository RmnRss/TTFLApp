import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-data/nba-data";
import {Team} from "../../providers/nba-data/Team";
import {Player} from "../../providers/nba-data/Player";

@IonicPage()
@Component({
  selector: 'page-team-roster',
  templateUrl: 'team-roster.html',
})
export class TeamRosterPage {

  selectedTeam: Team;

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
          this.selectedTeam.players = res.league.standard.players;
        }
      )
      .then(res => {
        this.dataProvider.getPlayerPromise().then(res => {
          let allPlayers = res.league.standard;
          let numberOfPlayers = 0;

          for (let teamPlayer of this.selectedTeam.players) {

            for (let aPlayer of allPlayers) {

              if (teamPlayer.personId == aPlayer.personId) {
                this.selectedTeam.players[numberOfPlayers].firstName = aPlayer.firstName;
                this.selectedTeam.players[numberOfPlayers].lastName = aPlayer.lastName;
                this.selectedTeam.players[numberOfPlayers].jersey = aPlayer.jersey;
                numberOfPlayers++;
              }

            }
          }
        })
          .then(res => {
            for (let player of this.selectedTeam.players) {
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

  showPlayerStats(selectedPlayer: Player) {
    this.navCtrl.push('DailyGamesPage', {selectedPlayer: selectedPlayer});

  }
}
