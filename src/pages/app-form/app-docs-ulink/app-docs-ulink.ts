import { ConstantConfig } from './../../../providers/utility/constant-config';
import { PreUWStatusM } from './../../../providers/model/pre-underwrite';
import { UnitlinkDataProvider } from './../../../providers/ulink-app-data/unitlink-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApplicationData } from '../../../providers/application/application-data';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { ApiProvider } from '../../../providers/api/api';
import { CommonUtilProvider } from '../../../providers/common-util/common-util';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { QuotationModel } from '../../../providers/quotation/quotation-model';
import { GenerateQuotationM } from '../../../providers/generate-quotation/generate-quotation-model';
import { RequestModel } from '../../../providers/model/request-model';
import { FunctionName } from '../../../providers/constants/function-name';
import { QuatationPdfPage } from '../../quatation/quatation-pdf/quatation-pdf';
import { ApplicationpdfM } from '../../../providers/service-table/application-pdf-model';
import { ResponseModel } from '../../../providers/model/response-model';
import { PdfViewdataPage } from '../../pdf-viewdata/pdf-viewdata';
import { Storage } from '@ionic/storage';
import _ from "lodash";

@IonicPage()
@Component({
  selector: 'page-app-docs-ulink',
  templateUrl: 'app-docs-ulink.html',
})
export class AppDocsUlinkPage {
  
  /**
   * Show E-app botton
   */
  private isShowEappBtn: boolean = false;
  private isMobile: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appData: ApplicationData,
    public platform: Platform,
    private appDataUlink: UnitlinkDataProvider,
    private loadingCtrl: LoadingDirective,
    private apiProvider: ApiProvider,
    private storage: Storage,
    private commonUtilProvider: CommonUtilProvider,
    private alertCtrl: AlertDirective) {
      
      // ตรวจสอบก่อนเปิดให้เข้า E-app
      // wait for calling service
      if (this.checkMobilePlatform()) {
        this.appDataUlink.checkPreUW(this.appData.quotation).then(res => {
          let preUW: PreUWStatusM = new PreUWStatusM;
          preUW = {...preUW, ...res}
          if ( preUW.msgcode == 'Y') {
            this.isShowEappBtn = preUW.isPlanforEAPP === 'TRUE' && preUW.msgcode === 'Y'
            this.appData.setPreUWStatusM(preUW);
          } else {
            this.alertCtrl.warning(preUW.msg + ' ' + ConstantConfig.NB_APP_WARNING_N);
          }
        });
      }

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

            if (res && data && data.binaryQuotationPDF) {
                dataToJson = data.binaryQuotationPDF;
                pdfName = data.pdfFileName;

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

  // PDF ใบคำขอ
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

   // PDF แบบฟอร์มการรับทราบความเสี่ยง
   private openApplicationAcceptriskPDF()
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
   private openApplicationUnitholderPDF()
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

    // PDF ใบคำร้องเกี่ยวกับเบี้ยประกันภัย
    private openApplicationUnitlinkPremiumPDF()
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
   * ตรวจสอบว่าเป็น mobile
   * @returns boolean
   */
  private checkMobilePlatform()
  {
    // force
    this.isMobile = true;
    return true;

    // if (this.platform.is('windows') || this.platform.is('core') || this.platform.is('mobileweb')) {
    //   this.isMobile = false;
    //   return false;
    // } else {
    //   this.isMobile = true;
    //   return true;
    // } 
  }
}
