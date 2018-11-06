import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the PopupTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-table',
  templateUrl: 'popup-table.html'
})
export class PopupTableComponent {

  text: string;

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.data = this.params.data;
    if (typeof this.data.tableHeader == 'string')
      this.data.tableHeader = [];
    if (typeof this.data.tableBody == 'string')
      this.data.tableBody = [];
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
   * หัวข้อใน table
   */
  public tableHeader: string[][];
  /**
   * เนื้อหาใน table
   */
  public tableBody: string | string[][];
  /**
   * ไอคอน
   */
  public icon: string | Array<string>;
  /**
   * เนื้อหาส่วนfooter
   */
  public footer: string;
  /**
   * รูปแบบหัวข้อใน table
   */
  public tableHeaderClass: string | Array<string>;
  /**
   * รูปแบบเนื้อหาใน table
   */
  public tableBodyClass: string | Array<string>;
  /**
   * รูปแบบเนื้อหาส่วนfooter
   */
  public footerClass: string | Array<string>;

}

