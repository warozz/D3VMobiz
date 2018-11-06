import {ConstantConfig} from '../../providers/utility/constant-config';
import { ApplicationEAppData } from '../../providers/application/application-eapp-data';
import { ServiceName } from '../../providers/constants/service-name';
import { MCAapplicationsM } from '../../providers/mcaapplications/mcaapplications-model';
import { Component } from '@angular/core';
import { ModalController, NavParams,  ViewController,   NavController} from 'ionic-angular';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { RequestModel } from '../../providers/model/request-model';
import { ApiProvider } from '../../providers/api/api';
import { FunctionName } from '../../providers/constants/function-name';
import { ApplicationData } from '../../providers/application/application-data';
import { ApplicationpdfM } from '../../providers/service-table/application-pdf-model';
import { PaymentM } from '../../providers/service-table/payment-model';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'basic-verify-app-modal',
  templateUrl: 'basic-verify-app-modal.html'
})
export class BasicVerifyAppModalComponent {

  private sendDataType: number = 0;
  private data;
  private lifesum: number = 0;
  private verifyCode: string = 'N';
  private verifyMsg: string = '';
  private isplaneapp: string = '';
  private nationality: string;

  private modalStyle: number = 1;
  private responseMsgUNW: string = '';

  constructor(
      private viewCtrl: ViewController,
      private loadingCtrl: LoadingDirective,
      private navCtrl: NavController,
      private apiProvider: ApiProvider,
      private alertCtrl: AlertDirective,
      private appData: ApplicationData,
      private applicationEAppData: ApplicationEAppData,
      private params : NavParams,
      private modalCtrl: ModalController,
      private platform: Platform
    ) {

    this.data = this.appData.getQuotation();

    // สัญชาติ
    this.nationality = this.data.mcaapplicationMs[0].nationality;
    this.lifesum = Number(this.data.lifesum);
 
    this.verifyMsg = this.params.get('msg');
    this.verifyCode = this.params.get('msgcode');
    this.isplaneapp = this.params.get('isplaneapp');
    console.log('this.verifyCode = ' + this.verifyCode + ", msg = " + this.verifyMsg + ", isplaneapp = " + this.isplaneapp);

   }

   private onSelectionChangeSendType(data){
    this.sendDataType = data;
   }

  /**
   * ปิด modal
   */
  private close() {

    let data = { 'closeToPage' : 'AppFormPage'};
    this.viewCtrl.dismiss(data);
    
  }

  private submitData() {

    console.log('submitData : this.sendDataType = ' + this.sendDataType);

    if (this.sendDataType == 2) {

      this.loadingCtrl.present();

      this.appData.getData('paymentMs').then(async (res: Array<PaymentM>) => {
      this.loadingCtrl.dismiss();
      if (res.length > 0) {
        if (res[0].paymentslipno != '') {
          
          let objM: MCAapplicationsM = new MCAapplicationsM();
          objM.applicationid = this.appData.getApplicationId();
          let objMs: Array<MCAapplicationsM> = [];
          objMs.push(objM);
     
          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.MCAAPPLICATIONS;
          reqM.serviceName = ServiceName.UPDATE;
          reqM.searchkey = "WAIT_SIGN";
          reqM.param = objMs;
    
          await this.apiProvider.callData(reqM).then();

          this.alertCtrl.warning('เลขใบรับเงินชั่วคราวที่ท่านกรอกจะถูกเปลี่ยนเป็นเลขที่ใบรับเงินชั่วคราวอิเล็กทรอนิกส์ และถูกส่งผ่านอีเมลลูกค้า เมื่อมีการชำระเงินเรียบร้อย').then( res => {
            
            let data = { 'closeToPage' : 'AppFormEAppPage'};
            this.viewCtrl.dismiss(data);

            // this.navCtrl.push("AppFormEAppPage");
            // this.close();
          },
          err => {
            this.close();
            this.alertCtrl.error(err);
          });
        }
        else {
          this.close();
          this.navCtrl.push("AppFormEAppPage");
        }
      }
      else{
        this.close();
        this.navCtrl.push("AppFormEAppPage");
      }
    },
    (err) => {
      this.alertCtrl.error(err);
    });
  }
  else if (this.sendDataType == 1) {

      this.loadingCtrl.present();
      this.applicationEAppData.insertApplicationEAppData("SUMBIT_NBAPP_BRANCH").then(
        async (res) => {
          
          console.log('insertApplicationEAppData : res = ', res);

          this.loadingCtrl.dismiss();

          if ('N' === res['data'][0].responseCode) {
            this.alertCtrl.warning(res['data'][0].responseMsg + ' ' + ConstantConfig.NB_APP_WARNING_N);
          }
          else {
            this.responseMsgUNW = res['data'][0].responseMsg;
            this.modalStyle = 2;
          }

          this.callSaveFileToAlfresco();
          
        },
        (err) => {
          this.loadingCtrl.dismiss(); 
          this.alertCtrl.warning(ConstantConfig.NB_APP_WARNING_TIMEOUT);

          this.callSaveFileToAlfresco();
        }
      );
    }
    else {
      this.alertCtrl.warning('กรุณาเลือกการดำเนินการ');
    }

  }
  
  private async callSaveFileToAlfresco(){
    //this.loadingCtrl.present();
    
    let objM: ApplicationpdfM = new ApplicationpdfM();
    objM.applicationid = this.data.applicationid;//Require = Y
    objM.saveAlfrescoStatus = 'sendToBranch'; // uncomment after deploy api
    let objMs: Array<ApplicationpdfM> = [];
    objMs.push(objM);
    
    let reqM: RequestModel = new RequestModel();
    // reqM.functionName = FunctionName.APPLICATION_PDF_ALFRESCO;
    if (this.data.typeapp === 'ULink') {
      reqM.functionName = FunctionName.APPLICATION_ULINK_PDF_ALFRESCO;
    } else {
      reqM.functionName = FunctionName.APPLICATION_PDF_ALFRESCO;
    }
    reqM.param = objMs; 
    
    await this.apiProvider.callData(reqM).then(
      async (res) => {
        console.log('finish save callSaveFileToAlfresco()');
       
      },async (err) => {
        console.log('Error save callSaveFileToAlfresco()');
       
      }
    );

  }

  private openPDF(): void {
    this.viewCtrl.dismiss(this.data);
  }

}
