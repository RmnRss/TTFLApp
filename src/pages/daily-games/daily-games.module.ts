import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DailyGamesPage} from './daily-games';

@NgModule({
  declarations: [
    DailyGamesPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyGamesPage),
  ],
})
export class DailyGamesPageModule {
}
