import { ResponseModel } from './../../../providers/model/response-model';
import { ApiProvider } from './../../../providers/api/api';
import { LoadingDirective } from './../../../directives/extends/loading/loading';
import { FunctionName } from './../../../providers/constants/function-name';
import { RequestModel } from './../../../providers/model/request-model';
import { Validators } from '@angular/forms';
import { MCAapplicationsM } from './../../../providers/service-table/mcaapplications-model';
import { ApplicationData } from './../../../providers/application/application-data';
import { ApplicationImageM } from './../../../providers/service-table/application-image-model';
import { ValidateProvider } from './../../../providers/validate/validate';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignatureComponent } from '../../../components/utility/signature/signature';
import {Storage} from '@ionic/storage';
import _ from "lodash";

@IonicPage()
@Component({
  selector: 'page-signature-ulink-e-app',
  templateUrl: 'signature-ulink-e-app.html',
})
export class SignatureUlinkEAppPage {
  private signs = {};
  private signed: boolean = false;
  private signature: FormGroup;
  private quatation: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingDirective,
    private modalCtrl: ModalController,
    private validate: ValidateProvider,
    private appData: ApplicationData,
    private apiProvider: ApiProvider,
    private storage: Storage) {
      
      const appMaster = _.first(_.get(this.appData.getQuotation(), 'mcaapplicationMs', new MCAapplicationsM()));
      console.log('appMaster', appMaster)
      const { 
        insuretitle, insurename, insurelastname,
        witness1title, witness1fname, witness1lname,
        witness2title, witness2fname, witness2lname,
        place
      } = appMaster;
      this.signature = this.fb.group({
        insureFullname: `${insuretitle} ${insurename} ${insurelastname}`,
        insureSignature: ['', Validators.required],
        witnessFullname1: `${witness1title} ${witness1fname} ${witness1lname}`,
        witnessSignature1: ['', Validators.required],
        witnessFullname2: `${witness2title} ${witness2fname} ${witness2lname}`,
        witnessSignature2: ['', Validators.required],
        signedAddress: place,
        agentfullname: '',
        agentSignature: ['', Validators.required]
      });
      
      console.log('this.appData.getQuotation()', this.appData)
      storage.get('saleInformation').then(saleInfo => {
        this.signature.get('agentfullname').setValue(`${saleInfo.prename} ${saleInfo.firstName} ${saleInfo.lastName}`);
      });
      
      this.quatation = this.appData.getQuotation();
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
    console.log('Sa ve', this.signature);
    if (this.signature.valid) {
      // รอเซอร์วิสส่งลายเซนต์ไปเซฟ
      this.loadingCtrl.present();

      const {
        insureSignature,
        witnessSignature1,
        witnessSignature2,
        agentSignature
      } = this.signature.value;
      let reqM: RequestModel = new RequestModel();
      reqM = {
        ...reqM,
        functionName: FunctionName.APPLICATION_PDF_ULINK,
        param: [
          {
            applicationid: this.appData.getApplicationId(),
            saveAlfrescoStatus: 'saveToAlfresco',
            signInsured: _.replace(insureSignature, 'data:image/png;base64,', ''),
            signWitness1: _.replace(witnessSignature1, 'data:image/png;base64,', ''),
            signWitness2: _.replace(witnessSignature2, 'data:image/png;base64,', ''),
            signAgent: _.replace(agentSignature, 'data:image/png;base64,', ''),
          }
        ]
      };
      this.apiProvider.callData(reqM).then(
        (res: ResponseModel) => {
          this.loadingCtrl.dismiss();
          this.viewCtrl.dismiss(true);
        }, err => {
          this.loadingCtrl.dismiss();
          this.viewCtrl.dismiss(false);
        });
    } else {
      Object.keys(this.signature.controls).forEach(key => {
        this.signature.get(key).markAsDirty();
      });
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

  private setSignatureToFormGroup(signatureStr, num)
  {
    switch (num) {
      case 1:
        this.signature.get('insureSignature').setValue(signatureStr);
        break;
      case 2:
        this.signature.get('witnessSignature1').setValue(signatureStr);
        break;
      case 3: 
        this.signature.get('witnessSignature2').setValue(signatureStr);
        break;
      case 4: 
        this.signature.get('agentSignature').setValue(signatureStr);
        break;
      default:
        break;
    }
  }
}
