import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NbaDataProvider} from "../../providers/nba-data/nba-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  today: String = this.dataProvider.getTodaysDate();
  dates: String[];

  constructor(public navCtrl: NavController, public dataProvider: NbaDataProvider) {
  }

  ionViewCanEnter() {

    this.dataProvider.getLinksPromise()
      .then(res => {
        this.dataProvider.links = res.links;
        console.log(this.dataProvider.links);
      });
  }

  getGames(date: String) {
    this.navCtrl.push('DailyGamesPage', {selectedDate: date});
  }
}
