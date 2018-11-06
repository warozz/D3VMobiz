import { ViewController, NavParams, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertDirective } from '../../../directives/extends/alert/alert';


/**
 * Generated class for the PopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-prospect-add',
  templateUrl: 'popup-prospect-add.html'
})
export class PopupProspectAddComponent {

  itemValue:any; 
  radioSelectAddress:any;
  prospectPopup: FormGroup;

  constructor(private viewCtrl: ViewController, private alertCtrl: AlertDirective, private fb: FormBuilder,private params: NavParams, private broadcaster: Broadcaster ) {
    this.prospectPopup = this.fb.group({
      isChange: ["", Validators.required]
    });
    this.data = this.params.data;
    this.data.paragraph = this.params.data.paragraphobject ? this.params.data.paragraphobject: [];
  }

  private data = new PopupModel;
  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss();
  }

  submitAddress(data:any) {
    if(this.prospectPopup.invalid) {
      this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
      return;
    }
    // this.viewCtrl.dismiss(0);
    this.viewCtrl.dismiss(this.prospectPopup.get('isChange').value);
    // if(data == undefined)
    // { 
    //   data = 0; 
    //   this.radioSelectAddress = 0;
    // }
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
  public paragraph: string | Array<Object>;
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
}
