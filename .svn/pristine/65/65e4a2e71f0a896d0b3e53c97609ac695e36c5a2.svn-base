import { Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PermissionDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[permission]' // Attribute selector
})
export class PermissionDirective {

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private storage: Storage,
  ) {

    this.storage.get('loginProfile').then(profile => {
      // ยังไม่เข้าสู่ระบบ
      if (profile == null)
        this.navCtrl.setRoot('LoginPage');
      // เข้าสู่ระบบแล้ว
      else
      {

      }
    });
  }
}
