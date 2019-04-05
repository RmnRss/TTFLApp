import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-service/nba-service";
import {DateServiceProvider} from "../../providers/date-service/date-service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  today: String = this.dateProvider.getTodaysDate();
  dates: Date[] = this.dateProvider.getCurrentWeek();

  constructor(public navCtrl: NavController, public dataProvider: NbaDataProvider, public dateProvider: DateServiceProvider) {
  }

  ionViewCanEnter() {

    this.dataProvider.getLinksPromise()
      .then(res => {
        this.dataProvider.links = res.links;
      });
  }

  getGames(date: Date) {
    this.navCtrl.push('DailyGamesPage', {selectedDate: date});
  }
}
