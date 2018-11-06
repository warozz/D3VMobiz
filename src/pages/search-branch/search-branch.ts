import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchBranchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'สาขา'
})
@Component({
  selector: 'page-search-branch',
  templateUrl: 'search-branch.html',
})
export class SearchBranchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
