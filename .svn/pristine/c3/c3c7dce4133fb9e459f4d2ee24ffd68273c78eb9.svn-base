import { SQLiteHandle } from './../../../providers/utility/sqlite-handle';
import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

/**
 * Generated class for the PopupSynchronizeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-synchronize',
  templateUrl: 'popup-synchronize.html'
})
export class PopupSynchronizeComponent {

  /**
   * ความคืบหน้า
   */
  private percent: number = 0;

  public isDoneSync: boolean = false;

  constructor(
    private viewCtrl: ViewController, 
    private navCtrl: NavController) {

    this.observableSync();
  }

  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss();
  }

  /**
   * ติดตาม % การซิงค์
   */
  private observableSync(): void {
    // กรณีมี record ต้องบันทึก
    this.isDoneSync = SQLiteHandle.isDoneSync;

    if (SQLiteHandle.isOnLoadScreenSync) {

      if (SQLiteHandle.isDoneSync) {
        if (SQLiteHandle.recordTotalSize > 0) {
          
          let result = SQLiteHandle.recordTotalSize / 100;
          this.percent = SQLiteHandle.recordBeWrite / result;
          
          if (Math.round(this.percent) < 100) {
                setTimeout(() => {
                  this.observableSync();
                }, 100);
          }
          else {
            this.viewCtrl.dismiss(); 
          }
        }
        else {
          this.percent = 100;
          this.viewCtrl.dismiss();
        }
      }
      else {

        if (SQLiteHandle.recordTotalSize > 0) { 
          let result = SQLiteHandle.recordTotalSize / 100;
          this.percent = SQLiteHandle.recordBeWrite / result;

          if (Math.round(this.percent) < 100) { 
            setTimeout(() => {
              this.observableSync();
            }, 100);
          }
          else {
            this.viewCtrl.dismiss();
          }
          
        }
        else {
          setTimeout(() => {
            this.observableSync();
          }, 100);
        }
      }
    }
    else {
      if (!SQLiteHandle.isDoneSync) {
        setTimeout(() => {
          this.observableSync();
        }, 100);
      }
      else {
        this.viewCtrl.dismiss();
      }
    }
  }
}
