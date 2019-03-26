import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-data/nba-data";
import {DateServiceProvider} from "../../providers/date-service/date-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  today: String = this.dateProvider.getTodaysDate();
  dates: String[] = this.dateProvider.getCurrentWeek();

  constructor(public navCtrl: NavController, public dataProvider: NbaDataProvider, public dateProvider: DateServiceProvider) {
  }

  ionViewCanEnter() {

    this.dataProvider.getLinksPromise()
      .then(res => {
        this.dataProvider.links = res.links;
      });
  }

  getGames(date: String) {
    this.navCtrl.push('DailyGamesPage', {selectedDate: date});
  }
}
