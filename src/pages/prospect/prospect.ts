import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProspectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'ผู้มุ่งหวัง'
})
@Component({
  selector: 'page-prospect',
  templateUrl: 'prospect.html',
})
export class ProspectPage {
  private componentId:String;
  private prospectObj;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.componentId = 'Search';
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProspectPage');
  }

  selectTab(tabId) {
    console.log(tabId);
    
  }

  cahngeComponent(event,componentId) {
    console.log("componentId : ",componentId);
    console.log("event : ",event);
    this.componentId = componentId;
    this.prospectObj = event;
  }

}
