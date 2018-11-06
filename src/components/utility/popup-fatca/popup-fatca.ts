import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopupFatcaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-fatca',
  templateUrl: 'popup-fatca.html'
})
export class PopupFatcaComponent {
  private agreementFATCA = false;

  constructor(
    private viewCtrl: ViewController,
    private navParam: NavParams
  ) {
  }

  ionViewWillLoad() {
    const data = this.navParam.get('data');
    if(data && data.tempAgreementFATCA) {
      this.agreementFATCA = data.tempAgreementFATCA;
    }
  }

  /**
   * ปิด modal
   */
  private close(): void
  {
    let data = { 'agreementFATCA': this.agreementFATCA };
    this.viewCtrl.dismiss(data);
  }

}
