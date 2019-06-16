import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  fromLogin: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.fromLogin = false;
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad FaqPage');
  }

  ionViewCanEnter(){
    this.fromLogin = this.navParams.get('fromLogin');
  }

}
