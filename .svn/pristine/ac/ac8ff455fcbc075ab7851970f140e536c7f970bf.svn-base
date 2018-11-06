import { AlertDirective } from './../../directives/extends/alert/alert';
import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { ApplicationData } from '../../providers/application/application-data';
import { DateFormatProvider } from '../../providers/date-format/date-format';
import * as moment from 'moment';
import { MCAapplicationsM } from '../../providers/service-table/mcaapplications-model';
import { RequestModel } from '../../providers/model/request-model';
import { FunctionName } from '../../providers/constants/function-name';
import { ServiceName } from '../../providers/constants/service-name';
import { ApiProvider } from '../../providers/api/api';
import { ResponseModel } from '../../providers/model/response-model';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { QuatationPdfPage } from '../../pages/quatation/quatation-pdf/quatation-pdf';
import { ApplicationpdfM } from '../../providers/service-table/application-pdf-model';
import { ConstantConfig } from '../../providers/utility/constant-config';

@Component({
  selector: 'app-detail-modal',
  templateUrl: 'app-detail-modal.html'
})
export class AppDetailModalComponent {

  private data;
  private datemodify;
  private gender;
  private applicationid = "-";
  private createApp = false;
  private disableEditAppForm = false;

  constructor(private viewCtrl: ViewController,
    private appData: ApplicationData,
    private navCtrl: NavController,
    private dateFormatProvider :DateFormatProvider,
    private apiProvider: ApiProvider,
    private loadingCtrl: LoadingDirective,
    private alertCtrl: AlertDirective) {

       //loading
    this.loadingCtrl.present();

    this.data = this.appData.getQuotation();
    console.log("this.appData.getQuotation() : ",this.data);

    //set datemodify
    this.datemodify = this.dateFormatProvider.dateFormatThAndShowTime(this.data.lastmodify, "L", true);

    //set gender
    this.gender = this.data.prospectM.gender === 'M'? 'ชาย' : 'หญิง';

    //ระบบตรวจสอบว่าเคยสร้างใบคำขอรึยัง
    let objM: MCAapplicationsM = new MCAapplicationsM();
    objM.customerid= this.data.prospectM.customerID;
    objM.applicationno = this.data.referenceno;

    let objMs: Array<MCAapplicationsM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.MCAAPPLICATIONS;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs; 

    this.apiProvider.callData(reqM).then(
      (res) => {
        //console.log("xxxx = ", res);

        let obj :any = res;
        let resModel :ResponseModel = obj;

        //เคยสร้างแล้ว
        if(resModel.size > 0 && resModel.data.length > 0){
          //set applicationNo
          this.applicationid = resModel.data[0].applicationidDisplay;
          this.createApp = true;
          const applicationstatus = resModel.data[0].applicationstatus;
          if(ConstantConfig.appstatusDisabled.indexOf(applicationstatus) > -1){
            this.disableEditAppForm = true; 
          }
        }
        
        this.loadingCtrl.dismiss();

      },
      (err) => {
        this.alertCtrl.error(err);
        this.loadingCtrl.dismiss();
      } 
    );
    
  }

    /**
   * ปิด modal
   */
  public close() {
    this.viewCtrl.dismiss();
  }

  /**
   * เปิดไฟล์ pdf
   */
  private openPdf(): void {

    this.loadingCtrl.present();

    //call service PDF
    let objM: ApplicationpdfM = new ApplicationpdfM();
    objM.applicationid = this.data.applicationid;//Require = Y
    let objMs: Array<ApplicationpdfM> = [];
    objMs.push(objM);
    
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.APPLICATION_PDF;
    reqM.param = objMs;
    
    console.log("Call APPLICATION_PDF Request : ", JSON.stringify(reqM));
    this.apiProvider.callData(reqM).then(
      (res) => {
        
        let obj :any = res;
        let resModel :ResponseModel = obj;

        console.log("Call APPLICATION_PDF Response : ", resModel);
        

        if(resModel.size > 0 && resModel.data.length > 0){

          const pdfData = "data:application/pdf;base64," + resModel.data[0].binaryQuotationPDF;

          let data = { page: QuatationPdfPage, src: pdfData, fromAppDetail : true };
           //this.navCtrl.push(QuatationPdfPage, data);
          // this.close();

          this.viewCtrl.dismiss(data);

        }else {
          alert("PDF File does not exist");
        }

        this.loadingCtrl.dismiss();
      },
      (err) => {
        this.alertCtrl.error(err);
        this.loadingCtrl.dismiss();
      }
    );
        
  }

  private goToCreateApp() {
    this.viewCtrl.dismiss({page: 'AppApplicationPage'});
  }

}
