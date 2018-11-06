import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Network } from '@ionic-native/network';
import { SendEmailM } from './../../../providers/send-email/send-email';
import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { PopupLostConnectionComponent } from '../../utility/popup-lost-connection/popup-lost-connection';

/**
 * Generated class for the SendEmailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'send-email',
  templateUrl: 'send-email.html'
})
export class SendEmailComponent {

  private senderName : string = "";
  private senderEmail : string = "";
  private receiver : string = "";
  private receiverCC : string = "";
  private emailTitle : string = "";
  private emailContent : string = "";


  // {"data":{"senderName":"senderName","senderEmail":"ukrit.jin@thailife.com","listReceivers":["ukrit.jin@thailife.com"],
  // "listReceiversCC":[],"emailTitle":"ทดสอบส่ง email ของใบเสนอขาย TLprompt","emailContent":"ทดสอบส่ง email ของใบเสนอขาย TLprompt","filename":"9851-MF-idS.pdf","opts":{"showBackdrop":true,"enableBackdropDismiss":true}}}
  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private alertCtrl: AlertDirective,
    private network: Network,
    private modalCtrl: ModalController
  ) {
    console.log("SendEmailComponent : "+JSON.stringify(params));

    this.senderName = "";
    this.senderEmail = "";
    this.receiver = "";
    this.receiverCC = "";
    this.emailTitle = "";
    this.emailContent = "";

    if(params.data != null){
      this.senderName = params.data.senderName
      this.senderEmail = params.data.senderEmail
      this.receiver = params.data.receiver;
      // this.emailTitle = params.data.emailTitle
    }
  }

  /**
   * ปิด modal
   */
  public close() {
    this.viewCtrl.dismiss();
  }

  /**
   * ตกลง
   */
  private submit(): void {
    if (this.network.type == 'none') {
      let opts = {
        cssClass: 'lost-connection'
      };

      let modal = this.modalCtrl.create(PopupLostConnectionComponent);
      modal.present();
      return;
    }

    if(this.senderEmail == undefined || this.senderEmail.trim() == ''){
      this.alertCtrl.warning("กรุณากรอกข้อมูล e-mail ผู้ส่ง");
      return;
    }
    if(this.receiver == undefined || this.receiver.trim() == ''){
      this.alertCtrl.warning("กรุณากรอกข้อมูล e-mail ผู้รับ");
      return;
    }
    if(this.emailTitle == undefined || this.emailTitle.trim() == ''){
      this.alertCtrl.warning("กรุณาระบุชื่อเรื่อง");
      return;
    }
    if(this.emailContent == undefined || this.emailContent.trim() == ''){
      this.alertCtrl.warning("กรุณาระบุข้อความ");
      return;
    }
    let _return : object = {
      senderName : this.senderName,
      senderEmail : this.senderEmail,
      receiver : this.receiver,
      receiverCC : this.receiverCC,
      emailTitle : this.emailTitle,
      emailContent : this.emailContent
    };
    this.viewCtrl.dismiss(_return);
  }
}
