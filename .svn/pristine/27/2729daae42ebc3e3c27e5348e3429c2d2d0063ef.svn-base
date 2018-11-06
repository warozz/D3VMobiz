import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the PopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup',
  templateUrl: 'popup.html'
})
export class PopupComponent {

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.data = this.params.data;
    if (typeof this.data.paragraph == 'string')
      this.data.paragraph = [this.data.paragraph];
  }

  private data = new PopupModel;
  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss();
  }
}

/**
 * โมเดลสำหรับแสดง Popup ทั่วไป
 */
export class PopupModel {
  /**
   * ชื่อเรื่อง
   */
  public title: string;
  /**
   * เนื้อหา
   */
  public content: string;
  /**
   * เนื้อหาแบบพารากราฟ
   */
  public paragraph: string | Array<string>;
  /**
   * ไอคอน
   */
  public icon: string | Array<string>;
  /**
   * เนื้อหาส่วนfooter
   */
  public footer: string;
  /**
   * รูปแบบเนื้อหาแบบพารากราฟ
   */
  public paragraphClass: string | Array<string>;
  /**
   * รูปแบบเนื้อหาส่วนfooter
   */
  public footerClass: string | Array<string>;
  /**
   * เนื้อหาแบบพารากราฟ Object
   */
  public paragraphobject: string | Array<Object>; 
}
