import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/**
 * Generated class for the PopupNewUpdateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-new-update',
  templateUrl: 'popup-new-update.html'
})
export class PopupNewUpdateComponent {

  /**
   * เวอร์ชัน
   */
  private version: Array<object>;

  constructor(private viewCtrl: ViewController, private http: Http, private storage: Storage) {

    // เวอร์ชัน
    this.http.get('assets/json/version.json').subscribe(data => {
      this.version = data.json();
      this.storage.set('version', this.version[0]['version']);
    });
  }

  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss();
  }
}
