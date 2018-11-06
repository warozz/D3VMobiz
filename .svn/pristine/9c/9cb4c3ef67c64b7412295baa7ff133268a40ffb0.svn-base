import { Component, ViewChild } from '@angular/core';
import { ViewController, Platform, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AlertDirective } from '../../../directives/extends/alert/alert';

/**
 * Generated class for the SignatureComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'signature',
  templateUrl: 'signature.html'
})
export class SignatureComponent {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 1,
    'canvasHeight': 1,
    'backgroundColor': 'rgb(255,255,255)'
  };

  private drawFlag: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    private alertCtrl: AlertDirective, ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.screenOrientation.unlock();
        this.close();
      });
    });
  }

  public close() {
    this.screenOrientation.unlock();
    this.viewCtrl.dismiss('');
  }

  ngAfterViewInit() {
    this.platform.ready().then((readySource) => {
      let height = this.platform.height();
      let width = this.platform.width();
      if (width > 767) {
        this.signaturePad.set('canvasWidth', 450);
        this.signaturePad.set('canvasHeight', 200);
      } else if (height > width) {
        this.signaturePad.set('canvasWidth', height - 50);
        this.signaturePad.set('canvasHeight', width / 2);
      } else if (height < width) {
        this.signaturePad.set('canvasWidth', width - 50);
        this.signaturePad.set('canvasHeight', height / 2);
      }
      this.signaturePad.set('minWidth', 1);
      this.signaturePad.set('backgroundColor', 'rgb(255,255,255)');
      this.signaturePad.clear();
    });
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    this.drawFlag = true;
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing');
  }

  clear() {
    this.drawFlag = false;
    this.signaturePad.clear();
    // this.signaturePad.toData
    // console.log(this.signaturePad.toDataURL());
  }

  save() {
    if (this.drawFlag) {
      this.screenOrientation.unlock();
      let binaryString = atob(this.signaturePad.toDataURL('image/jpeg').replace('data:image/jpeg;base64,', ''));
      let len = binaryString.length;
      let bytes = [];
      for (var i = 0; i < len; i++) {
        bytes.push(binaryString.charCodeAt(i));
      }
      // console.log('this.signaturePad.toDataURL() : ', this.signaturePad.toDataURL('image/jpeg'));
      // console.log('bytes.buffer : ', bytes)
      this.viewCtrl.dismiss(this.signaturePad.toDataURL());
    } else {
      this.alertCtrl.warning("กรุณาเซ็นชื่อ")
    }
  }
}
