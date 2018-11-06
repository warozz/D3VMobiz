import { CommonUtilProvider } from './../../../providers/common-util/common-util';
import { GenerateQuotationM } from './../../../providers/generate-quotation/generate-quotation-model';
import { QuotationModel } from './../../../providers/quotation/quotation-model';
import { ApplicationpdfM } from './../../../providers/service-table/application-pdf-model';
import { QuatationPdfPage } from './../../quatation/quatation-pdf/quatation-pdf';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { ApiProvider } from './../../../providers/api/api';
import { FunctionName } from './../../../providers/constants/function-name';
import { RequestModel } from './../../../providers/model/request-model';
import { AttachFileM } from './../../../providers/service-table/attachfile-model';
import { ApplicationData } from './../../../providers/application/application-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { Storage } from '@ionic/storage';
import { PopupAppUlinkComponent } from '../../../components/utility/popup-app-ulink/popup-app-ulink';

import { SignatureUlinkEAppPage } from '../signature-ulink-e-app/signature-ulink-e-app';
import { SignatureUlinkInvestmentInfoPage } from '../signature-ulink-investment-info/signature-ulink-investment-info';
import { SignatureUlinkLifepremiumPage } from '../signature-ulink-lifepremium/signature-ulink-lifepremium';
import { SignatureUlinkAcceptriskPage } from '../signature-ulink-acceptrisk/signature-ulink-acceptrisk';
import { ServiceName } from '../../../providers/constants/service-name';
import { ResponseModel } from '../../../providers/model/response-model';
import _ from "lodash";
import { PdfViewdataPage } from '../../pdf-viewdata/pdf-viewdata';

/**
 * Generated class for the AppFormUlinkEAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ 
  segment: 'แนบลายมือชื่อ'}
)
@Component({
  selector: 'page-app-form-ulink-e-app',
  templateUrl: 'app-form-ulink-e-app.html',
})
export class AppFormUlinkEAppPage {

  private documentsStatus: any = {
    applicationulinkpdf: { isSigned: false },
    allocation: { isSigned: false },
    riskaccept: { isSigned: false },
    unitlinkholder: { isSigned: false }
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingDirective,
    private alertCtrl: AlertDirective,
    private appData: ApplicationData,
    private apiProvider: ApiProvider,
    private storage: Storage,
    private commonUtilProvider: CommonUtilProvider) {

      this.checkAllSignStatus();
  }

  private openPopupAccept()
  {
     //call modal
     let modal = this.modalCtrl.create(PopupAppUlinkComponent);
     modal.present();
     modal.onDidDismiss( data => {
     if(data){
      let modalSign = this.modalCtrl.create(SignatureUlinkEAppPage);
      modalSign.onDidDismiss( res => {
        console.log('res onDidDismiss', res)
        if (res) {
          this.checkAllSignStatus();
        }
      });
      modalSign.present();
    }
    });
  }

  private openPopupInvestmentInfo()
  {
    let modalSign = this.modalCtrl.create(SignatureUlinkInvestmentInfoPage);
    modalSign.onDidDismiss( res => {
      console.log('res onDidDismiss', res)
      if (res) {
        this.checkAllSignStatus();
      }
    });
    modalSign.present();

  }
  private openPopupSignatureLifepremium()
  {
    let modalSign = this.modalCtrl.create(SignatureUlinkLifepremiumPage);
    modalSign.onDidDismiss( res => {
      console.log('res onDidDismiss', res)
      if (res) {
        this.checkAllSignStatus();
      }
    });
    
    modalSign.present();
    
  }
  private openPopupSignatureAcceptrisk(){

    let modalSign = this.modalCtrl.create(SignatureUlinkAcceptriskPage);
    modalSign.onDidDismiss( res => {
      console.log('res onDidDismiss', res)
      if (res) {
        this.checkAllSignStatus();
      }
    });
    modalSign.present();
    
  }
    // PDF ใบคำร้องเกี่ยวกับเบี้ยประกันภัย
    private openApplicationUnitlinkPremiumPDF(){
      this.loadingCtrl.present();
      let ApplicationModel: ApplicationpdfM = new ApplicationpdfM();
      ApplicationModel = {
        ...ApplicationModel,
        applicationid: this.appData.getApplicationId()
      }
      let request: RequestModel = new RequestModel();
      request = {
        ...request,
        functionName: FunctionName.APPLICATION_PDF_UNITLINKPERMIUM,
        param: [ApplicationModel]
      }
      this.apiProvider.callData(request).then(
        (res : any) => {
          if (res && res.data[0] && res.data[0].binaryQuotationPDF) {
            const rawdata = res.data[0].binaryQuotationPDF;
  
            const pdfData = "data:application/pdf;base64," + rawdata;
            let data = { 
              showReqRefButton: false,  
              pdfDetail: {
                pageTotal: res.pageTotal,
                pdfName : res.data[0].pdfFileName,
                src: pdfData,
              }
            };
            this.navCtrl.push(PdfViewdataPage, data);
          }
          this.loadingCtrl.dismiss();
        },
        err => {
          this.alertCtrl.error(err);
          this.loadingCtrl.dismiss();
        }
      );
    }


  /**
   * เชตสถานะการลงลายเซนต์แต่ละใบ
   */
  private checkAllSignStatus(): void
  {
    const quotationData = this.appData.getQuotation();

    let reqM: RequestModel = new RequestModel();
    reqM = {
      ...reqM,
      functionName: FunctionName.ATTACHFILE,
      serviceName: ServiceName.SELECT,
      param: [
        { applicationid: quotationData.applicationid }
      ],
      searchkey: 'ATTACH_PDF'
    };
    this.loadingCtrl.present();
    
    this.apiProvider.callData(reqM).then((res: ResponseModel) => {
      this.loadingCtrl.dismiss();
      if (res.data) {
        // เชคสถานะเอกสารที่ลงลายเซนแล้ว
        _.forEach(res.data, (value, key) => {
          console.log('_.has(this.documentsStatus, value.attribute01)', _.has(this.documentsStatus, value.attribute01))
          if (_.has(this.documentsStatus, value.attribute01)) {
            // เปลี่ยนสถานะเอกสาร
            this.documentsStatus[value.attribute01].isSigned = true;
          }
        });
      }
    } , (err) => {
      this.loadingCtrl.dismiss();
      this.alertCtrl.error(err);
    });
  }

  /**
   * เปิดใบเสนอขาย PDF
   */
  private async openQuotation()
  {
    const quotation: QuotationModel = this.appData.getQuotation();
    const {
      quotationno,
      customerid,
      status
    } = quotation;

    let genQuoModel: GenerateQuotationM = new GenerateQuotationM();
    genQuoModel = {
      ...genQuoModel,
      quotationno: quotationno,
      customerid: customerid,
      quotationStatus: status,
      flag: status == 'S' ? '3' : '2',
    };

    this.loadingCtrl.present();

    await this.storage.get('tlpromptMode').then(async mode => { // หา mode
      await this.storage.get('loginProfile').then(async profile => {
        let userID = '';
        if (profile.roleType == 'employee') {
          userID = profile.pid.replace("-", "");
          if (userID == '') {
            userID = profile.agentid.replace("-", "");
          }
          genQuoModel = {
            ...genQuoModel,
            agentFullName: '',
            agentBranch: ''
          };

        } else {
          userID = profile.agentid;
          genQuoModel = {
            ...genQuoModel,
            agentFullName: `${profile.fName} ${profile.lName}`,
            agentBranch: profile.branch
          };
        }

        let reqModel: RequestModel = new RequestModel();
        reqModel = {
          ...reqModel,
          agentid: userID,
          mode: mode,
          functionName: FunctionName.GENERATE_QUOTATION,
          param: [genQuoModel]
        };

        this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          (res: any) => {
            let dataToJson = '';
            let pdfName = '';
            const dataResp = _.get(res, 'datas', []);
            const data = _.first(dataResp); //เอา Array แรก

            if (res && data && data['binaryQuotationPDF']) {
                dataToJson = data['binaryQuotationPDF'];
                pdfName = data['pdfFileName'];

                let pdfSrc = `data:application/pdf;base64, ${dataToJson}`;
                let a : any = {
                  prospect: quotation.prospectM,
                  pdfLanguage: quotation.pdflang,
                  src: pdfSrc,
                  planCode: quotation.plancode
                }
                // เปิด PDF
                this.navCtrl.push(QuatationPdfPage, a);
            } else {
              this.alertCtrl.warning('ไม่พบข้อมูลใบเสนอขาย')
            }
            this.loadingCtrl.dismiss();
          },
          (err) => {
            this.loadingCtrl.dismiss();
            this.alertCtrl.error(err);
          }
        );
      });
    });
  }

  // PDF แบบสอบถามประเมินความเสี่ยง
  private openApplicationPDFRiskProfilePDF()
  {
    this.loadingCtrl.present();
    let ApplicationModel: ApplicationpdfM = new ApplicationpdfM();
    ApplicationModel = {
      ...ApplicationModel,
      applicationid: this.appData.getApplicationId()
    }
    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      functionName: FunctionName.APPLICATION_PDF_RISKPROFILE,
      param: [ApplicationModel]
    }
    this.apiProvider.callData(request).then(
      (res : any) => {
        if (res && res.data[0] && res.data[0].binaryQuotationPDF) {
          const rawdata = res.data[0].binaryQuotationPDF;

          const pdfData = "data:application/pdf;base64," + rawdata;
          let data = { 
            showReqRefButton: false,  
            pdfDetail: {
              pageTotal: res.pageTotal,
              pdfName : res.data[0].pdfFileName,
              src: pdfData,
            }
          };
          this.navCtrl.push(PdfViewdataPage, data);
        }
        this.loadingCtrl.dismiss();
      },
      err => {
        this.alertCtrl.error(err);
        this.loadingCtrl.dismiss();
      }
    );
  }
  
  //แบบฟอร์มการรับทราบความเสี่ยง
  private openApplicationAcceptriskPDF(){
    this.loadingCtrl.present();
    let ApplicationModel: ApplicationpdfM = new ApplicationpdfM();
    ApplicationModel = {
      ...ApplicationModel,
      applicationid: this.appData.getApplicationId()
    }
    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      functionName: FunctionName.APPLICATION_PDF_ACCEPTRISK,
      param: [ApplicationModel]
    }
    this.apiProvider.callData(request).then(
      (res : any) => {
        if (res && res.data[0] && res.data[0].binaryQuotationPDF) {
          const rawdata = res.data[0].binaryQuotationPDF;

          const pdfData = "data:application/pdf;base64," + rawdata;
          let data = { 
            showReqRefButton: false,  
            pdfDetail: {
              pageTotal: res.pageTotal,
              pdfName : res.data[0].pdfFileName,
              src: pdfData,
            }
          };
          this.navCtrl.push(PdfViewdataPage, data);
        }
        this.loadingCtrl.dismiss();
      },
      err => {
        this.alertCtrl.error(err);
        this.loadingCtrl.dismiss();
      }
    );
  }

   // PDF แบบแสดงผู้ถือหน่วยลงทุน
   private openApplicationUnitholderPDF(){
     this.loadingCtrl.present();
     let ApplicationModel: ApplicationpdfM = new ApplicationpdfM();
     ApplicationModel = {
       ...ApplicationModel,
       applicationid: this.appData.getApplicationId()
     }
     let request: RequestModel = new RequestModel();
     request = {
       ...request,
       functionName: FunctionName.APPLICATION_PDF_UNITHOLDER,
       param: [ApplicationModel]
     }
     this.apiProvider.callData(request).then(
       (res : any) => {
         if (res && res.data[0] && res.data[0].binaryQuotationPDF) {
           const rawdata = res.data[0].binaryQuotationPDF;
 
           const pdfData = "data:application/pdf;base64," + rawdata;
           let data = { 
             showReqRefButton: false,  
             pdfDetail: {
               pageTotal: res.pageTotal,
               pdfName : res.data[0].pdfFileName,
               src: pdfData,
             }
           };
           this.navCtrl.push(PdfViewdataPage, data);
         }
         this.loadingCtrl.dismiss();
       },
       err => {
         this.alertCtrl.error(err);
         this.loadingCtrl.dismiss();
       }
     );
   }

  // PDF ใบคำขอเอาประกัน
  private openApplicationPDF()
  {
    this.loadingCtrl.present();

    let ApplicationModel: ApplicationpdfM = new ApplicationpdfM();
    ApplicationModel = {
      ...ApplicationModel,
      applicationid: this.appData.getApplicationId()
    }

    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      // functionName: FunctionName.APPLICATION_PDF,
      functionName: FunctionName.APPLICATION_PDF_ULINK,
      param: [ApplicationModel]
    }

    this.apiProvider.callData(request).then(
      res => {
        const obj :any = res;
        const resModel :ResponseModel = obj;
        const dataResp = _.get(res, 'data', []);
        const data = _.first(dataResp); //เอา Array แรก
        if(res && data) {

          const pdfData = "data:application/pdf;base64," + resModel.data[0].binaryQuotationPDF;

          let dataPDF = { page: QuatationPdfPage, src: pdfData, fromAppDetail : true };
           //this.navCtrl.push(QuatationPdfPage, data);
          // this.close();
          this.navCtrl.push(QuatationPdfPage, dataPDF);
        }else {
          alert("PDF File does not exist");
        }
        this.loadingCtrl.dismiss();
      },
      err => {
        this.alertCtrl.error(err);
        this.loadingCtrl.dismiss();
      }
    );
  }
}
