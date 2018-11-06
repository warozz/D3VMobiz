import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MPosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'ชำระเบี้ย M-POS'
})
@Component({
  selector: 'page-m-pos',
  templateUrl: 'm-pos.html',
})
export class MPosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
