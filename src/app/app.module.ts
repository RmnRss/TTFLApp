import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from '../app/app.component';
import {NbaDataProvider} from '../providers/nba-service/nba-service';
import {DateServiceProvider} from '../providers/date-service/date-service';
import {TtflProvider} from '../providers/ttfl-service/ttfl-service';
import {LoginPage} from "../pages/login/login";
import {UserServiceProvider} from '../providers/user-service/user-service';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NbaDataProvider,
    DateServiceProvider,
    TtflProvider,
    UserServiceProvider
  ]
})
export class AppModule {
}
