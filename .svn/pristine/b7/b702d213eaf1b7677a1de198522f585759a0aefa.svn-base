import {Storage} from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplicationData } from '../../../providers/application/application-data';
import _ from "lodash";
import { UlinkApplicationDetailM } from '../../../providers/ulink-app-data/ulink-application-detail-model';
import { MCAapplicationsM } from '../../../providers/service-table/mcaapplications-model';
import { SignatureComponent } from '../../../components/utility/signature/signature';
import { ValidateProvider } from '../../../providers/validate/validate';
import { ApplicationImageM } from '../../../providers/service-table/application-image-model';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { ApplicationpdfM } from '../../../providers/service-table/application-pdf-model';
import { RequestModel } from '../../../providers/model/request-model';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { FunctionName } from '../../../providers/constants/function-name';
import { ApiProvider } from '../../../providers/api/api';
import { UnitlinkAcceptRiskM } from '../../../providers/unitlink-accept-risk';
import { ServiceName } from '../../../providers/constants/service-name';

@IonicPage()
@Component({
  selector: 'page-signature-ulink-acceptrisk',
  templateUrl: 'signature-ulink-acceptrisk.html',
})
export class SignatureUlinkAcceptriskPage {

  private signature:FormGroup;
  private signs = {};
  private signed: boolean = false;
  private quatation: any;
  private insureage: number;
  private saleInfomation:any;
  private appMaster:MCAapplicationsM;
  private acceptRisk: UnitlinkAcceptRiskM = new UnitlinkAcceptRiskM();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private viewCtrl: ViewController,
    private appData: ApplicationData,
    private storage: Storage,
    private modalCtrl: ModalController,
    private validate: ValidateProvider,
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private apiProvider:ApiProvider,
    ) {
      const unitlinkapplicationdetailMs =  _.first(_.get(this.appData.applicationMasterM , 'unitlinkapplicationdetailMs' , new UlinkApplicationDetailM()));
     
      this.appMaster = _.first(_.get(this.appData.getQuotation(), 'mcaapplicationMs', new MCAapplicationsM()));
      // let saleInfomation:any = { 
      //   prename:'',
      //   licensesic:''};
   
      console.log("unitlinkapplicationdetailMs ===>",unitlinkapplicationdetailMs);
      console.log("appMaster ===>",this.appMaster);
      const { 
        insuretitle, 
        insurename, 
        insurelastname,
        agentid,
        agentfullname
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
        regalSignature: [{ value: '', disabled: true }, Validators.required],//ผปค.
        agentfullname: '',
        agentSignature: ['', Validators.required],//
        licensesic: '',
        agentid : agentid,
        tel:'',
      });
      
      this.quatation = this.appData.getQuotation();
      this.insureage = this.quatation.insureage; 
      console.log("insureage ==>",this.insureage);
     // this.insureage= 15;

      this.getUlinkAcceptRisk();
     // this.signature.get("tel").setValue(this.acceptRisk.agentmoblieno);

  }


  async ngAfterViewInit(){
    await this.storage.get('saleInformation').then(async saleInfo => {
      this.saleInfomation = saleInfo
        console.log("saleInfomation --->",this.saleInfomation);

        const {
          prename,
          licensesic
        } = this.saleInfomation;
    
        this.signature.get("licensesic").setValue(licensesic);
        this.signature.get("agentfullname").setValue(`${prename} ${this.appMaster.agentfullname}`);

      
      });

      if(this.insureage <= 19){
        this.signature.get("regalSignature").enable();
      } else {
        this.signature.get("regalSignature").disable();
        this.signature.get("regalSignature").setValue("");
      }

     
     
  
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
    case 3:
      this.signature.get('agentSignature').setValue(signatureStr);
      break;
    default:
      break;
  }
}

 /**
  * ปิด modal
  */
  public close() {
    this.viewCtrl.dismiss(false);
  }
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
    
    const { insureSignature, regalSignature ,agentSignature } = this.signature.value;
    this.loadingCtrl.present();
    let ApplicationModel: ApplicationpdfM = new ApplicationpdfM();
    ApplicationModel = {
      ...ApplicationModel,
      applicationid:this.appMaster.applicationid,// this.appData.getApplicationId(),
      saveAlfrescoStatus : "saveToAlfresco",
      signInsured: insureSignature.replace("data:image/png;base64,", ''),
      signWitness1:this.insureage < 20 ? regalSignature.replace("data:image/png;base64,", ''):"",//ผปค.
      signAgent:agentSignature.replace("data:image/png;base64,", '')


    }
    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      functionName: FunctionName.APPLICATION_PDF_ACCEPTRISK,
      param: [ApplicationModel]
    }
    this.apiProvider.callData(request).then(
      (res : any) => {
       console.log("res :APPLICATION_PDF_ACCEPTRISK ",res);
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

  private getUlinkAcceptRisk(){
    console.log('getUlinkAcceptRisk');
    let model: UnitlinkAcceptRiskM = new UnitlinkAcceptRiskM();
    model = {
      ...model,
      applicationid: this.appMaster.applicationid
    };
    
    let modelObj: Array<UnitlinkAcceptRiskM> = [];
    modelObj.push(model);

    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      functionName: FunctionName.ULINKACCEPTRISK,
      serviceName: ServiceName.SELECT,
      param: modelObj
    }

    this.apiProvider.callData(request).then(
      (res) => {
        const data = _.get(res, 'data', new UnitlinkAcceptRiskM());
        this.acceptRisk = _.first(data);
        this.signature.get("tel").setValue(this.acceptRisk.agentmoblieno);
        console.log('this.acceptRisk', this.acceptRisk);
      },
      (err) => {
        console.log('err err', err)
      });
  }

  // private getAllFund(){
  //   let request: RequestModel = new RequestModel();
  //   request = {
  //     ...request,
  //     functionName: FunctionName.ALLFUND,
  //     serviceName: ServiceName.SELECT,
  //     searchkey: '',
  //     param: [{
  //       "allfundid": "1"
  //     }]
  //   }

  //   this.apiProvider.callData(request).then(
  //     (res) => {
  //       const data = _.get(res, 'data[0].allfund', []);
  //       console.log('data data', data)
  //      // this.allFundLists = data;
  //     //  this.setFundSelected();
  //       this.setMobileAgent();
  //     },
  //     (err) => {
  //       console.log('err err', err)
  //     });
  // }
  // private setMobileAgent(){
  //   this.signature.get("tel").setValue(this.acceptRisk.agentmoblieno);
  // }
}
