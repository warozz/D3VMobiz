import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';

/**
 * Generated class for the PopupOccupationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-occupation',
  templateUrl: 'popup-occupation.html'
})
export class PopupOccupationComponent {

  /**
   * อาชีพที่เลือก
   */
  private occ: string;
  /**
   * กลุ่มอาชีพ
   */
  private occGroup: number;

  /**
   * อาชีพ
   */
  private occupation: Array<object> = [
    {
      group: 'กลุ่มนักเรียน / นักศึกษา / เยาวชน',
      occ: [
        'นักเรียน / นักศึกษา',
        'นักบวช (พระ)',
        'เด็กต่ำกว่าวัยเรียน'
      ]
    },
    {
      group: 'กลุ่มแม่บ้าน / พ่อบ้าน',
      occ: [
        'พ่อบ้าน',
        'แม่บ้าน',
        'ว่างงาน'
      ]
    },
    {
      group: 'กลุ่มผู้มีอาชีพ',
      occ: [
        'งานบ้าน - มีอาชีพรับจ้างทำงานบ้าน',
        'ทุกอาชีพที่เหลือทั้งหมด'
      ]
    }
  ];

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.occ = params.get('occ');
    this.occGroup = params.get('occGroup');
  }

  private submit(): void {
    this.occupation.forEach((occ1, idx1) => {
      occ1['occ'].forEach((occ2, idx2) => {
        if (occ2 == this.occ) {
          this.occGroup = idx1;
          return;
        }
      });
    });

    if (this.occ != '') {
      let data: object = {
        occ: this.occ,
        occGroup: this.occGroup
      }
      this.viewCtrl.dismiss(data);
    }
    else 
      this.viewCtrl.dismiss();
  }
  /**
   * ปิด modal
   */
  private close(): void {
    this.viewCtrl.dismiss();
  }
}
