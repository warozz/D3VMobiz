import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { SignatureComponent } from '../../utility/signature/signature';
import { ValidateProvider } from '../../../providers/validate/validate';
import { Events } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { DateFormatProvider } from '../../../providers/date-format/date-format';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { PopupLostConnectionComponent } from '../../utility/popup-lost-connection/popup-lost-connection';

/**
 * Generated class for the QuatationSignatureFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quatation-signature-form',
  templateUrl: 'quatation-signature-form.html'
})
export class QuatationSignatureFormComponent {

  private signs = {};
  private importData;
  private explortSigns = {};

  private cusName;
  private agentName;
  private agentBranch;
  private date;

  constructor(private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private validate: ValidateProvider,
    private event: Events,
    private navParam: NavParams,
    private dateFormatProvider: DateFormatProvider,
    private alertCtrl: AlertDirective,
    private network: Network
  ) {
    this.importData = navParam.data
    this.cusName = this.importData.firstName + ' ' + this.importData.lastName;
    this.agentName = this.importData.agentFullName;
    this.agentBranch = this.importData.agentBranch;
    let year = (Number(this.importData.date.substring(0,4))-543).toString();
    let month = this.importData.date.substring(4,6);
    let day = this.importData.date.substring(6);
    this.date = this.dateFormatProvider.dateFormatShotTh1(year+'-'+month+'-'+day+' 00:00:00','L');
  }

  public close() {
    this.viewCtrl.dismiss('');
  }

  async openSignature(signs, num) {
    let modal = this.modalCtrl.create(SignatureComponent, '', { cssClass: 'signModel' });
    modal.onDidDismiss((signData) => {
      if (!this.validate.isEmpty(signData)) {
        signs[num] = signData;
        this.explortSigns[num] = signData;
      }
    });
    modal.present();
  }

  save() {
    if (this.network.type == 'none') {
      let opts = {
        cssClass: 'lost-connection'
      };

      let modal = this.modalCtrl.create(PopupLostConnectionComponent);
      modal.present();
      return;
    }

    if(this.explortSigns[1] == undefined || this.explortSigns[2] == undefined){
      if(this.explortSigns[1] == undefined)
        this.alertCtrl.warning("กรุณาระบุลายเซ็นของลูกค้า");
      else {
        if(this.explortSigns[2] == undefined)
          this.alertCtrl.warning("กรุณาระบุลายเซ็นของตัวแทน");
      }
    }
    else{
      this.viewCtrl.dismiss(true);
      let data = { signFlag: true, signsData: this.explortSigns };
      this.event.publish('quatation-signature-form', data);
    }
  }
}
