import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the PopupLostConnectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-lost-connection',
  templateUrl: 'popup-lost-connection.html'
})
export class PopupLostConnectionComponent {

  constructor(private viewCtrl: ViewController) {
    
  }

  /**
   * ปิด modal
   */
  private close(): void {
    this.viewCtrl.dismiss();
  }
}
