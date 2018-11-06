import { AlertController, Alert } from 'ionic-angular';
import { Directive } from '@angular/core';

/**
 * Generated class for the AlertDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[alert]' // Attribute selector
})
export class AlertDirective extends AlertController {

  /**
   * แสดงข้อความแจ้งเตือน
   * @param message ข้อความที่แสดงแจ้งเตือน
   */
  public warning(message: string)
  {
    return new Promise((resolve,reject) => {
      let alert: Alert = this.create({
        title: 'แจ้งเตือน',
        subTitle: message, 
        buttons: [
          { 
            text: 'ตกลง',
            handler: () => {
              resolve();
            }
          }
        ]
      });
      alert.present();
      alert.onDidDismiss( ()=> {
        reject('onDidDismiss');
      });
    });
  }

  /**
   * แสดงข้อความผิดพลาด
   * @param message ข้อความที่แสดงผิดพลาด
   * 
   */
  public error(message: string): void
  {
    let alert = this.create({
      title: 'ข้อผิดพลาด',
      subTitle: 'เกิดข้อผิดพลาด ขออภัยในความไม่สะดวก',
      buttons: ['ตกลง']
    });
    alert.present();
    console.error('ข้อผิดพลาด: ' , message);
  }

    /**
   * แสดงข้อความแจ้งเตือน
   * @param message ข้อความที่แสดงแจ้งเตือน
   */
  public confiemBox(message: any)
  {
    return new Promise((resolve,reject) => {
      let alert = this.create({
        title: 'ยืนยัน',
        subTitle: message,
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              reject('cancel');
            }
          },
          {
            text: 'ตกลง',
            handler: () => {
              resolve();
            }
          }
        ]
      });
      alert.present();
    });
  }

  /**
   * แสดงข้อความยืนยันการทำงาน
   * @param message ข้อความที่แสดง
   * 
   */
  public confirm(message: string): Promise<object>
  {
    return new Promise((resolve, reject) => {
      let alert = this.create({
        title: 'ยืนยัน',
        subTitle: message,
        buttons: [
          {
            text: 'ยกเลิก',
            handler: () => {
              reject();
            }
          },
          {
            text: 'ตกลง',
            handler: () => {
              resolve();
            }
          }
        ]
      });
      alert.present();
    });
  }

  /**
   * แสดงข้อความแจ้งเตือน
   * @param message ข้อความที่แสดงแจ้งเตือน
   */
  public confiemBoxSaveQuation(message: any)
  {
    return new Promise((resolve,reject) => {
      let check = false;
      let alert = this.create({
        enableBackdropDismiss: false,
        title: 'ยืนยัน',
        subTitle: message,
        buttons: [
          {
            text: 'ไม่ใช่',
            handler: () => {
              check = true;
            }
          },
          {
            text: 'ใช่',
            handler: () => {
              resolve();
            }
          }
        ]
      });
      alert.present();

      alert.onDidDismiss(() => {
        if(check) {
          reject('cancel');
        } else {
          reject();
        }
      });
    });
  }
}
