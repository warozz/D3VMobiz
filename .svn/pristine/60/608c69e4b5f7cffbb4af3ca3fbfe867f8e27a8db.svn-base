import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import _ from "lodash";
import { ApplicationData } from '../../../providers/application/application-data';
import { MCAapplicationsM } from '../../../providers/service-table/mcaapplications-model';
import { ApplicationMasterM } from '../../../providers/application/application-master-model';
import { UlinkApplicationDetailM } from '../../../providers/ulink-app-data/ulink-application-detail-model';
import { SignatureComponent } from '../../../components/utility/signature/signature';
import { ValidateProvider } from '../../../providers/validate/validate';
import { ApplicationImageM } from '../../../providers/service-table/application-image-model';
import { RequestModel } from '../../../providers/model/request-model';
import { ServiceName } from '../../../providers/constants/service-name';
import { FunctionName } from '../../../providers/constants/function-name';
import { ApiProvider } from '../../../providers/api/api';
import { ApplicationpdfM } from '../../../providers/service-table/application-pdf-model';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { PdfViewdataPage } from '../../pdf-viewdata/pdf-viewdata';
import { AlertDirective } from '../../../directives/extends/alert/alert';

@IonicPage()
@Component({
  selector: 'page-signature-ulink-investment-info',
  templateUrl: 'signature-ulink-investment-info.html',
})
export class SignatureUlinkInvestmentInfoPage {

  
  private signature:FormGroup; 
  private quatation: any;
  private appMaster:MCAapplicationsM;
  private signs = {};
  private signed: boolean = false;
 // private applicationMasterM: ApplicationMasterM = new ApplicationMasterM();
  constructor(
   
    private fb: FormBuilder,
    private appData: ApplicationData,
    private viewCtrl: ViewController,
    private alertCtrl: AlertDirective,
    private modalCtrl: ModalController,
    private validate: ValidateProvider,
    private apiProvider:ApiProvider,
    private loadingCtrl: LoadingDirective,
    public navCtrl: NavController,) {
      this.quatation = this.appData.getQuotation();
      //this.applicationMasterM = _.get(this.appData, 'applicationMasterM', new ApplicationMasterM);
      const unitlinkapplicationdetailMs =  _.first(_.get(this.appData.applicationMasterM , 'unitlinkapplicationdetailMs' , new UlinkApplicationDetailM()));
     
      this.appMaster = _.first(_.get(this.appData.getQuotation(), 'mcaapplicationMs', new MCAapplicationsM()));
      console.log("unitlinkapplicationdetailMs ===>",unitlinkapplicationdetailMs);
      console.log("appMaster ===>",this.appMaster);
      const { 
        insuretitle, 
        insurename, 
        insurelastname
      } = this.appMaster;

      const {
        lawtitle,
        lawfname,
        lawlname
      } = unitlinkapplicationdetailMs;

      this.signature = this.fb.group({
        insurefullname: `${insuretitle} ${insurename} ${insurelastname}`,
        insureSignature: ['', Validators.required],
        regalRepresentative: `${lawtitle} ${lawfname} ${lawlname}`,
        regalSignature: ['', Validators.required]

      });
  }

  private openSignature(signs, num) {
    const { applicationid } = this.quatation;
    
    console.log('openSignature', signs, num)
    if(this.signed) return;

    let modal = this.modalCtrl.create(SignatureComponent,'',{cssClass: 'signModel'});
    modal.onDidDismiss((signData) => {
      console.log('signData',signData);
      if (!this.validate.isEmpty(signData)) {
        let dataBase64 =  signData.substring(signData.indexOf(',')+1);
        let applicationImageM: ApplicationImageM = new ApplicationImageM();
        applicationImageM = {
          ...applicationImageM,
          applicationid,
          binary: dataBase64,
          fileType: "PNG"
        };
        signs[num] = signData;
          
        this.setSignatureToFormGroup(signData, num);
        
      }
    });

    modal.present();
  }

  private setSignatureToFormGroup(signatureStr, num){
    switch (num) {
      case 1:
        this.signature.get('insureSignature').setValue(signatureStr);
        break;
      case 2:
        this.signature.get('regalSignature').setValue(signatureStr);
        break;
      default:
        break;
    }
  }

  /**
   * 
   * บันทึกข้อมูล
   */
   /**
   * 
   * บันทึกข้อมูล
   */
  public save(){

    console.log("appId : ",this.appMaster.applicationid);
    // console.log('Save', this.signature);
    if (this.signature.valid) {
     // APPLICATION_PDF_UNITHOLDER
      // service save ลายเซ็น
    
    const { insureSignature, regalSignature} = this.signature.value;
    this.loadingCtrl.present();
    let ApplicationModel: ApplicationpdfM = new ApplicationpdfM();
    ApplicationModel = {
      ...ApplicationModel,
      applicationid:this.appMaster.applicationid,// this.appData.getApplicationId(),
      saveAlfrescoStatus : "saveToAlfresco",
      signInsured: insureSignature.split(",")[1],
      signWitness1: regalSignature.split(",")[1],//ผปค.

    }
    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      functionName: FunctionName.APPLICATION_PDF_UNITHOLDER,
      param: [ApplicationModel]
    }
    this.apiProvider.callData(request).then(
      (res : any) => {
       console.log("res :APPLICATION_PDF_UNITHOLDER ",res);
       this.viewCtrl.dismiss(true);
        // if (res && res.data[0] && res.data[0].binaryQuotationPDF) {
        //   const rawdata = res.data[0].binaryQuotationPDF;

        //   const pdfData = "data:application/pdf;base64," + rawdata;
        //   let data = { 
        //     showReqRefButton: false,  
        //     pdfDetail: {
        //       pageTotal: res.pageTotal,
        //       pdfName : res.data[0].pdfFileName,
        //       src: pdfData,
        //     }
        //   };
        //   this.navCtrl.push(PdfViewdataPage, data);
        // }
        this.loadingCtrl.dismiss();
      },
      err => {
        this.alertCtrl.error(err);
        this.loadingCtrl.dismiss();
      }
    );

     
    } else {
      Object.keys(this.signature.controls).forEach(key => {
        this.signature.get(key).markAsDirty();
      });
      this.alertCtrl.warning("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
    }
  }

   /**
  * ปิด modal
  */
  public close() {
    this.viewCtrl.dismiss(false);
  }
}
