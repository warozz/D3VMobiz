import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the AttachFileViewModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'attach-file-view-modal',
  templateUrl: 'attach-file-view-modal.html'
})
export class AttachFileViewModalComponent {

  public image : any;

  constructor(public viewCtrl: ViewController,
    private base64: Base64,
    private loadingCtrl: LoadingDirective,
    private params: NavParams,
    private sanitize: DomSanitizer) {

      if (this.params.get("item").attribute01) {
        this.image =  this.sanitize.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+this.params.get("item").attribute01);
      }
  }

      /**
   * ปิด modal
   */
  public close() {
    this.viewCtrl.dismiss();
  }

}
