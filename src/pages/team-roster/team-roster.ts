import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {NbaTeam} from "../../class/nbaTeam";
import {NbaPlayer} from "../../class/nbaPlayer";
import {User} from "../../class/user";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-team-roster',
  templateUrl: 'team-roster.html',
})
export class TeamRosterPage {

  selectedTeam: NbaTeam;
  selectedPlayer: NbaPlayer;

  date: Date;

  roster: NbaPlayer[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public nbaDataProvider: NbaDataProvider,
              public userProvider: UserServiceProvider,
              public ttflProvider: TtflProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamRosterPage');
  }

  ionViewCanEnter() {
    this.selectedTeam = this.navParams.get('selectedTeam');
    this.date = this.navParams.get('selectedDate');

    this.nbaDataProvider.getRosterPromise(this.selectedTeam)
      .then(res => {
        this.roster = res.league.standard.players;
        }
      )
      .then(res => {
        this.nbaDataProvider.getPlayerPromise().then(res => {
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
              this.nbaDataProvider.getPlayerSeasonStatsPromise(player)
                .then(res => {
                  let seasonStats = res.league.standard.stats.latest;

                  player.ppg = seasonStats.ppg;
                  player.rpg = seasonStats.rpg;
                  player.apg = seasonStats.apg;

                })
            }
          })
      });
  }

  showPlayerStats(selectedPlayer: NbaPlayer) {
    //this.navCtrl.push('PlayerPage', {selectedPlayer: selectedPlayer});
  }

  selectPlayer(player: NbaPlayer): NbaPlayer {
    for (let rosterPlayer of this.roster) {
      rosterPlayer.selected = false;
    }

    player.selected = true;
    this.selectedPlayer = player;
    return player;
  }

  postPick(nbaPlayer: NbaPlayer, user: User, date: Date) {
    this.ttflProvider.getPickOfUserPromise(date, this.userProvider.user).then(res => {
      console.log(res);
      console.log("size " + res.length);
      if (res.length == 0) {
        this.ttflProvider.postPickPromise(nbaPlayer, user, date).then(
          resp => {
            this.presentToast('Pick selectionné : ' + this.selectedPlayer.firstName + ' ' + this.selectedPlayer.lastName);
            this.navCtrl.setRoot('HomePage');
            console.log(resp);
          }, error => {
            this.presentToast('Erreur lors de l\'envoi du pick au serveur.');
            console.log(error);
          })
      } else {
        this.ttflProvider.updatePickPromise(res[0].id, nbaPlayer, user, date).then(resp => {
          this.presentToast('Pick mis à jour : ' + this.selectedPlayer.firstName + ' ' + this.selectedPlayer.lastName);
          this.navCtrl.setRoot('HomePage');
          console.log(resp);
        }, error => {
          this.presentToast('Erreur lors de l\'envoi du pick au serveur.');
          console.log(error);
        })
      }

    });
  }

  confirmPick() {
    this.postPick(this.selectedPlayer, this.userProvider.user, this.date);
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
