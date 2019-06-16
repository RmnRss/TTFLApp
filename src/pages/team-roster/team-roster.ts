import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {NBATeam} from "../../class/NBA/NBATeam";
import {NBAPlayer} from "../../class/NBA/NBAPlayer";
import {User} from "../../class/TTFL/user";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-team-roster',
  templateUrl: 'team-roster.html',
})
export class TeamRosterPage {

  selectedTeam: NBATeam;
  selectedPlayer: NBAPlayer;

  date: Date;

  roster: Array<NBAPlayer>;
  bannedPlayersIds: Array<number>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public nbaDataProvider: NbaDataProvider,
              public userProvider: UserServiceProvider,
              public ttflProvider: TtflProvider) {
    this.selectedTeam = new NBATeam();
    this.date = new Date();
    this.roster = new Array<NBAPlayer>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamRosterPage');
  }

  ionViewCanEnter() {
    // Initialization
    this.bannedPlayersIds = new Array<number>();
    this.selectedPlayer = new NBAPlayer();

    this.selectedTeam = this.navParams.get('selectedTeam');
    this.date = this.navParams.get('selectedDate');

    this.ttflProvider.getBannedNBAPlayersOfUserPromise(this.userProvider.user).then(response => {
      this.bannedPlayersIds = response.data;
    }).then(next => {
      this.nbaDataProvider.getRosterPromise(this.selectedTeam)
        .then(res => {
            let fullRoster = res.league.standard.players;
            for (let player of fullRoster) {
              let tempPlayer = new NBAPlayer();
              tempPlayer.personId = player.personId;
              this.roster.push(tempPlayer);
            }
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
                  this.roster[numberOfPlayers].pos = aPlayer.pos;
                  this.roster[numberOfPlayers].team = this.selectedTeam;
                  numberOfPlayers++;
                }

              }
            }
          })
            .then(res => {
              for (let player of this.roster) {

                this.isAvailable(player);

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
      console.log(player.isAvailable);
      if (id == player.personId) {
        player.isAvailable = false;
        console.log(player.isAvailable);
      }
    }
  }

  postPick(nbaPlayer: NBAPlayer, user: User, date: Date) {
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
