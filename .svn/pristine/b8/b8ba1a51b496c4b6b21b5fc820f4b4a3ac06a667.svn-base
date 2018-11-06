import { QuatationPdfPage } from './../../../pages/quatation/quatation-pdf/quatation-pdf';
import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';


/**
 * Generated class for the PopupPlanRuleInternationalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-plan-rule-international',
  templateUrl: 'popup-plan-rule-international.html'
})
export class PopupPlanRuleInternationalComponent {

  /**
   * เวอร์ชัน
   */
  private version: Array<object>;

  constructor(
    private viewCtrl: ViewController, 
    private navCtrl: NavController) {

  }

  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss();
  }

  /**
   * เปิดไฟล์ pdf
   */
  private openPdf(file: string): void {
    let data = { src: 'assets/pdf/' + file };
    this.navCtrl.push(QuatationPdfPage, data);
  }
}
