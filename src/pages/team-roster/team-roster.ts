import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/NBA-service";
import {NBATeam} from "../../class/NBA/NBATeam";
import {NBAPlayer} from "../../class/NBA/NBAPlayer";
import {User} from "../../class/TTFL/user";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {NBADay} from "../../class/NBA/NBADay";

@IonicPage()
@Component({
  selector: 'page-team-roster',
  templateUrl: 'team-roster.html',
})
export class TeamRosterPage {

  selectedTeam: NBATeam;
  selectedPlayer: NBAPlayer;

  day: NBADay;

  roster: Array<NBAPlayer>;
  bannedPlayersIds: Array<number>;

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
    // Initialization
    this.selectedTeam = new NBATeam();
    this.day = new NBADay();
    this.roster = new Array<NBAPlayer>();
    this.bannedPlayersIds = new Array<number>();
    this.selectedPlayer = new NBAPlayer();

    this.selectedTeam = this.navParams.get('selectedTeam');
    this.day = this.navParams.get('selectedDay');

    this.ttflProvider.getBannedNBAPlayersOfUserPromise(this.userProvider.user)
      .then(response => {
        this.bannedPlayersIds = response.data;
      })
      .then(next => {
        this.nbaDataProvider.getNBATeamRoster(this.selectedTeam)
          .then(roster => {
            console.log(roster);

            this.roster = roster;
            }
          )
          .then(res => {
            for (let teamPlayer of this.roster) {
              this.isAvailable(teamPlayer);
            }
          });
      });
  }


  showPlayerStats(selectedPlayer: NBAPlayer) {
    this.navCtrl.push('PlayerStatsPage', {selectedPlayer: selectedPlayer});
  }

  selectPlayer(player: NBAPlayer): NBAPlayer {
    for (let rosterPlayer of this.roster) {
      rosterPlayer.selected = false;
    }

    player.selected = true;
    this.selectedPlayer = player;
    return player;
  }

  isAvailable(player: NBAPlayer) {
    for (let id of this.bannedPlayersIds) {
      if (id == player.personId) {
        player.isAvailable = false;
      }
    }
  }

  postPick(nbaPlayer: NBAPlayer, user: User, day: NBADay) {
    this.ttflProvider.getPickOfUser(day, this.userProvider.user).then(res => {
      if (res.length == 0) {
        this.ttflProvider.postPickPromise(nbaPlayer, user, day.date).then(
          resp => {
            this.presentToast('Pick selectionné : ' + this.selectedPlayer.firstName + ' ' + this.selectedPlayer.lastName);
            this.navCtrl.setRoot('HomePage');
            console.log(resp);
          }, error => {
            this.presentToast('Erreur lors de l\'envoi du pick au serveur.');
            console.log(error);
          })
      } else {
        this.ttflProvider.updatePickPromise(res[0].id, nbaPlayer, user, day.date).then(resp => {
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
    this.postPick(this.selectedPlayer, this.userProvider.user, this.day);
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
