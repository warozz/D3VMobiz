import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddressProvider} from "../../providers/address/address";

/**
 * Generated class for the LeadRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'ผู้มุ่งหวังtmp'
})
@Component({
  selector: 'page-lead-register',
  templateUrl: 'lead-register.html',
})
export class LeadRegisterPage {

  private data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              addressService: AddressProvider) {

  }

  addressSelected = '';
}
