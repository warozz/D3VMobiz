import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopupResetDataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-reset-data',
  templateUrl: 'popup-reset-data.html'
})
export class PopupResetDataComponent {

  text: string;

  constructor(private viewCtrl: ViewController) {
  }

  /**
   * กดปุ่ม "ตกลง"
   */
  private handleSubmited(): void
  {
    this.viewCtrl.dismiss('ok');
  }

  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss('close');
  }

}
