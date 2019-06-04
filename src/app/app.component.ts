import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {TtflDailyPickRankingPage} from "../pages/ttfl-daily-pick-ranking/ttfl-daily-pick-ranking";
import {TtflTeamRankingPage} from "../pages/ttfl-team-ranking/ttfl-team-ranking";
import {TtflRankingPage} from "../pages/ttfl-ranking/ttfl-ranking";
import {TtflTeamPage} from "../pages/ttfl-team/ttfl-team";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      {title: 'Mes Decks', component: 'HomePage'},
      {title: 'Mon Equipe', component: 'TtflTeamPage'},
      {title: 'Classement', component: 'TtflRankingPage'},
      {title: 'Classement par equipes', component: 'TtflTeamRankingPage'},
      {title: 'Top Picks', component: 'TtflDailyPickRankingPage'}
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

