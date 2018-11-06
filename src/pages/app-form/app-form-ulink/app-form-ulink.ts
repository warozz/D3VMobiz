import { UlinkAppDataProvider } from './../../../providers/ulink-app-data/ulink-app-data';
import { ResponseModel } from './../../../providers/model/response-model';
import { ApplicationpdfM } from './../../../providers/service-table/application-pdf-model';
import { QuatationPdfPage } from './../../quatation/quatation-pdf/quatation-pdf';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { CommonUtilProvider } from './../../../providers/common-util/common-util';
import { GenerateQuotationM } from './../../../providers/generate-quotation/generate-quotation-model';
import { QuotationModel } from './../../../providers/quotation/quotation-model';
import { MCAapplicationsM } from './../../../providers/mcaapplications/mcaapplications-model';
import { ApiProvider } from './../../../providers/api/api';
import { FunctionName } from './../../../providers/constants/function-name';
import { RequestModel } from './../../../providers/model/request-model';
import { UlinkApplicationFormM } from './../../../providers/ulink-app-data/ulink-application-form-model';
import { LoadingDirective } from './../../../directives/extends/loading/loading';
import { ApplicationData } from './../../../providers/application/application-data';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PdfViewdataPage } from '../../pdf-viewdata/pdf-viewdata';
import _ from "lodash";
import { ServiceName } from '../../../providers/constants/service-name';

/**
 * Generated class for the AppFormUlinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  segment: 'เอกสารประกอบใบคำขอ'
})

@Component({
  selector: 'page-app-form-ulink',
  templateUrl: 'app-form-ulink.html',
})
export class AppFormUlinkPage {
  private listDatas: Array<UlinkApplicationFormM> = [];

  private application: UlinkApplicationFormM;
  private riskprofile: UlinkApplicationFormM;
  private allocation: UlinkApplicationFormM;
  private riskaccept: UlinkApplicationFormM;
  private unitlinkholder: UlinkApplicationFormM;
  private quotation: UlinkApplicationFormM;
  private isNext = false;
  // สถานะการลงลายเซน
  private documentsStatus: any = {
    applicationulinkpdf: { isSigned: false },
    allocation: { isSigned: false },
    riskaccept: { isSigned: false },
    unitlinkholder: { isSigned: false }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appData: ApplicationData,
    private loadingCtrl: LoadingDirective,
    private apiProvider: ApiProvider,
    private storage: Storage,
    private commonUtilProvider: CommonUtilProvider,
    private alertCtrl: AlertDirective,
    private ulinkAppDataProvider: UlinkAppDataProvider
    ) {
      console.log('appData', appData);
      this.setDefault();
  }

  ionViewDidEnter()
  {
    if (this.appData.getApplicationId() != '') {
      this.getUlinkApplicationFormList();
      this.checkAllSignStatus();
    }
    /**
     * เชคใบคำขอ
     * publishstatus // D = ดำเนินการ, P = เรียบร้อย
     */
    this.application = {
      ...this.application,
      status: _.get(this.appData, 'applicationMasterM.mcaapplicationM.publishstatus', 'N')
    };
  }

  /**
   * สร้างก่อนไปด
   */
  private setDefault()
  {
    this.riskprofile = new UlinkApplicationFormM;
    this.allocation = new UlinkApplicationFormM;
    this.riskaccept = new UlinkApplicationFormM;
    this.unitlinkholder = new UlinkApplicationFormM;
    this.application = new UlinkApplicationFormM;
    this.quotation = new UlinkApplicationFormM;

    /**
     * เชคใบคำขอ
     * publishstatus // D = ดำเนินการ, P = เรียบร้อย
     */
    this.application = {
      ...this.application,
      status: _.get(this.appData, 'applicationMasterM.mcaapplicationM.publishstatus', 'N')
    };

    // เชคสถานะใบเสนอขาย
    const quotation: QuotationModel = this.appData.getQuotation();
    if (quotation.referenceno != '') {
      this.quotation = {
        ...this.quotation,
        status: 'S'
      }
    }
  }


  private nextPage(){
    alert('<<< nextPage >>> ');
    this.navCtrl.push('AppInvestmentInfoPage');
  }

  // private goToApplictionPage()
  // {
  //   this.loadingCtrl.present();
  //   this.navCtrl.push('AppApplicationPage', {
  //     page: 'AppFormUlink'
  //   }).then(() => {
  //     this.loadingCtrl.dismiss();
  //   });
  // }

  private openAcceptriskUlink()
  {
    this.loadingCtrl.present();
    this.navCtrl.push('AppAcceptriskUlinkPage', {
      page: 'AppFormUlink'
    }).then(() => {
      this.loadingCtrl.dismiss();
    });
  }

  private openLifepremiumUlink()
  {
    console.log('openLifepremiumUlink')
    this.loadingCtrl.present();
    this.navCtrl.push('AppLifepremiumUlinkPage', {
      page: 'AppFormUlink'
    }).then(() => {
      this.loadingCtrl.dismiss();
    });
  }

  private getUlinkApplicationFormList()
  {
    this.loadingCtrl.present();
    this.ulinkAppDataProvider.getUlinkApplicationForm()
      .then(resp => {
        // เซตเข้าตัวแปล
        this.setDataLists(resp);
        this.setButtonAvailable(resp);
        this.loadingCtrl.dismiss();
      });
  }

  private setDataLists(list)
  {
    _.each(list, (n: UlinkApplicationFormM) => {
      if (n.formtype == 'riskprofile') {
        this.riskprofile = {...this.riskprofile, ...n};
      } else if (n.formtype == 'allocation') {
        this.allocation = {...this.allocation, ...n};
      } else if (n.formtype == 'riskaccept') {
        this.riskaccept = {...this.riskaccept, ...n};
      } else if (n.formtype == 'unitlinkholder') {
        this.unitlinkholder = {...this.unitlinkholder, ...n};
      }
    });
  }

  // ตรวจสอบการเปิดหน้าถัดไป
  private setButtonAvailable(list)
  {
    this.isNext = _.every(list, ['status', 'S']);
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

    private goToPage(pageName: string){
      this.appData.selectApplication().then(data => {
        this.loadingCtrl.present();
        this.navCtrl.push(pageName, {
          page: 'AppFormUlink'
        }).then(() => {
          this.loadingCtrl.dismiss();
        });
      });
    }
  
  // เชคสถานะการลงลายเซน
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
    
    if (quotationData.applicationid != '') {
      this.apiProvider.callData(reqM).then((res: ResponseModel) => {
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
        this.alertCtrl.error(err);
      });
    }
  }
}
