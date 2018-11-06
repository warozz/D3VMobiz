import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopupAppUlinkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-app-ulink',
  templateUrl: 'popup-app-ulink.html'
})
export class PopupAppUlinkComponent {

  constructor(private viewCtrl: ViewController,public navCtrl: NavController, 
    public navParams: NavParams,) { 
  }

   /**
   * ปิด modal
   */
  public close() {
    this.viewCtrl.dismiss(false);
  }
  private next() {
  
    this.viewCtrl.dismiss(true);
  }

}
