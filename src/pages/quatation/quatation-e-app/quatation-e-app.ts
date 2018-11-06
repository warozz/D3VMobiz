import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SignatureComponent } from '../../../components/utility/signature/signature';
import { ValidateProvider } from '../../../providers/validate/validate';

/**
 * Generated class for the QuatationEAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quatation-e-app',
  templateUrl: 'quatation-e-app.html',
})
export class QuatationEAppPage {

  // @ViewChild(SignaturePad) signaturePad: SignaturePad;

  // private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
  //   'minWidth': 1,
  //   'canvasWidth': 300,
  //   'canvasHeight': 80
  // };

  private signs = {};
  private signsBi = {};

  constructor(
    private modalCtrl: ModalController,
    private validate: ValidateProvider) {
    // no-op
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    // this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    // this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing');
  }

  async openSignature(signs, num) {
    let modal = this.modalCtrl.create(SignatureComponent,'',{cssClass: 'signModel'});
    modal.onDidDismiss((signData) => {
      if (!this.validate.isEmpty(signData)) {
        signs[num] = signData; //ค่าจริงที่ใช้โชว์รูป
        this.signsBi[num] = atob(signData.substring(signData.indexOf(',')+1)); // decode จาก base64 => binary เพื่อเอาลง base        
        /**
         * encode จาก binary => base64 เพื่อเอารูปภาพมาโชว์
         *'data:image/png;base64,'+btoa(atob(signData.substring(signData.indexOf(',')+1)))
         */
      }
    });
    modal.present();
  }
}
