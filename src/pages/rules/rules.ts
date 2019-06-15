import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})
export class RulesPage {
  fromLogin: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.fromLogin = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RulesPage');
  }

  ionViewCanEnter(){
    this.fromLogin = this.navParams.get('fromLogin');
  }

}
