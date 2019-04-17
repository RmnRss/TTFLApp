import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {DateServiceProvider} from "../../providers/date-service/date-service";
import {User} from "../../class/user";
import {TtflProvider} from "../../providers/ttfl-service/ttfl-service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  today: String = this.dateProvider.getTodaysDate();
  dates: Date[] = this.dateProvider.getCurrentWeek();

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: NbaDataProvider, public dateProvider: DateServiceProvider, public ttflProvider: TtflProvider) {
  }

  ionViewCanEnter() {

    this.user = this.navParams.get('loggedUser');

    this.dataProvider.getLinksPromise()
      .then(res => {
        this.dataProvider.links = res.links;
      })
      .then(res => {
        this.ttflProvider.getUserInfoPromise(this.user.id)
          .then(resp => {
            this.user = resp;
            console.log(this.user);
          })
      });
  }

  getGames(date: Date) {
    this.navCtrl.push('DailyGamesPage', {selectedDate: date});
  }
}
