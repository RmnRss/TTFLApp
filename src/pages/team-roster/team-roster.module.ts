import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TeamRosterPage} from './team-roster';

@NgModule({
  declarations: [
    TeamRosterPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamRosterPage),
  ],
})
export class TeamRosterPageModule {
}
