import { LoadingDirective } from './../../../directives/extends/loading/loading';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { ResponseModel } from './../../../providers/model/response-model';
import { ApiProvider } from './../../../providers/api/api';
import { FunctionName } from './../../../providers/constants/function-name';
import { RequestModel } from './../../../providers/model/request-model';
import { MCAapplicationsM } from './../../../providers/mcaapplications/mcaapplications-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SignatureComponent } from '../../../components/utility/signature/signature';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateProvider } from '../../../providers/validate/validate';
import { ApplicationData } from '../../../providers/application/application-data';
import _ from "lodash";
import * as moment from "moment";
import { ServiceName } from '../../../providers/constants/service-name';

@IonicPage()
@Component({
  selector: 'page-signature-ulink-lifepremium',
  templateUrl: 'signature-ulink-lifepremium.html',
})
export class SignatureUlinkLifepremiumPage {
  private signs = {};
  private signed: boolean = false;
  private signature:FormGroup;
  private quatation: any;
  private dateStamp: string = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingDirective,
    private alertCtrl: AlertDirective,
    private validate: ValidateProvider,
    private appData: ApplicationData,
    private apiProvider: ApiProvider) {
      
      moment.locale('th');
      this.dateStamp = moment().format('LL');
      
      const appMaster = _.first(_.get(this.appData.getQuotation(), 'mcaapplicationMs', new MCAapplicationsM()));
      console.log('appMaster', appMaster)
      const { 
        insuretitle, insurename, insurelastname,
      } = appMaster;

      this.setUlinkLifePremiumData(this.appData.getQuotation().applicationid);

      this.signature = this.fb.group({
        signedAddress: ['', Validators.required],
        insureFullname: `${insuretitle} ${insurename} ${insurelastname}`,
        insureSignature: ['', Validators.required],
        witnessFullname1: '',
        witnessSignature1: ['', Validators.required],
        witnessFullname2: '',
        witnessSignature2: ['', Validators.required],
      });
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
      console.log('this.signature', this.signature);
      const {
        insureSignature,
        witnessSignature1,
        witnessSignature2
      } = this.signature.value;
      let reqM: RequestModel = new RequestModel();
      reqM = {
        ...reqM,
        functionName: FunctionName.APPLICATION_PDF_UNITLINKPERMIUM,
        param: [
          {
            applicationid: this.appData.getApplicationId(),
            saveAlfrescoStatus: 'saveToAlfresco',
            signInsured: _.replace(insureSignature, 'data:image/png;base64,', ''),
            signWitness1: _.replace(witnessSignature1, 'data:image/png;base64,', ''),
            signWitness2: _.replace(witnessSignature2, 'data:image/png;base64,', '')
          }
        ]
      } 
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
      this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
    }
  }

  private openSignature(signs, num) {
    console.log('openSignature', signs, num)
    if(this.signed) return;

    let modal = this.modalCtrl.create(SignatureComponent,'',{cssClass: 'signModel'});
    modal.onDidDismiss((signData) => {
      if (!this.validate.isEmpty(signData)) {
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
      default:
        break;
    }
  }
  
  private setUlinkLifePremiumData(appId)
  {
    let reqM: RequestModel = new RequestModel();
    reqM = {
      ...reqM,
      functionName: FunctionName.UNITLINK_LIFEPREMIUM,
      serviceName: ServiceName.SELECT,
      param: [
        { applicationid: appId }
      ]
    } 
     
    this.apiProvider.callData(reqM).then(
      (res: ResponseModel) => {
        const lifePremium = _.first(res.data);
        console.log('lifePremium', lifePremium)
        const {
          witness1title, witness1fname, witness1lname,
          witness2title, witness2fname, witness2lname, place
        } = lifePremium;

        this.signature.get('witnessFullname1').setValue(`${witness1title} ${witness1fname} ${witness1lname}`);
        this.signature.get('witnessFullname2').setValue(`${witness2title} ${witness2fname} ${witness2lname}`);
        this.signature.get('signedAddress').setValue(place);
      },
      (err) => {
      }
    );
  }
}
