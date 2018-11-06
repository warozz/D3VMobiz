import {ConstantConfig} from '../../../providers/utility/constant-config';
import {Storage} from '@ionic/storage';
import { SignImageType } from '../../../providers/constants/sign-image-type';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {ApplicationData} from '../../../providers/application/application-data';
import {SignatureComponent} from '../../../components/utility/signature/signature';
import {ValidateProvider} from '../../../providers/validate/validate';
import { Component } from '@angular/core';
import {ModalController, IonicPage,   NavController,   NavParams} from 'ionic-angular';
import { ApplicationEAppData } from '../../../providers/application/application-eapp-data';
import {ApplicationImageM} from '../../../providers/service-table/application-image-model';
import {MCAapplicationsM} from '../../../providers/service-table/mcaapplications-model';

/**
 * Generated class for the SignatureEAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature-e-app',
  templateUrl: 'signature-e-app.html',
})
export class SignatureEAppPage {
  private signs = {};
  private signed: boolean = false;
  private accept = false;
  private quatation: any;
  private customerName: string;
  private agentName: string;
  private signature:FormGroup;
  private applicationid:string;
  private applicationImageMs: Array<ApplicationImageM> = [];
  private mcaapplicationM: MCAapplicationsM;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private validate: ValidateProvider,
    private fb: FormBuilder,
    private storage: Storage,
    private appData: ApplicationData,
    private applicationEAPPData: ApplicationEAppData) {

      this.signature = this.fb.group({
        cusSignature:['',Validators.required],
        applicationid:'',
        cusName: '',
        agentName: '',
        agentSignature:['',Validators.required],
        place:'',
        witnessName1:'',//ชื่อ-สกุล
       // titleWitness1:'',//คำนำหน้า
        witnessSignature1:['',Validators.required],
        witnessName2:'',
       //titleWitness2:'',
        witnessSignature2:['',Validators.required],
     
      });

     this.mcaapplicationM = new MCAapplicationsM();
     this.applicationEAPPData.mcaapplicationM = this.mcaapplicationM;
     this.applicationEAPPData.applicationImageMs = this.applicationImageMs;
     this.applicationEAPPData.signature = this.signature;
     this.quatation = this.appData.getQuotation();
      
     if (this.quatation) {

        this.signature.get('cusName').setValue(this.quatation.pname + ' ' + this.quatation.fname + ' ' + this.quatation.lname); 
        this.signature.get('applicationid').setValue(this.quatation.applicationid);
        this.applicationid = this.quatation.applicationid;

        this.storage.get(ConstantConfig.SALE_INFO_KEY).then(objM => {
          if (objM != undefined) {
            this.signature.get('agentName').setValue( objM['firstName'] + ' ' + objM['lastName'] ); 
          }
        });
      }

    this.appData.getData('mcaapplicationM').then((res: MCAapplicationsM) => {
      
      let witnessName1 = res.witness1title + ' ' + res.witness1fname + ' ' + res.witness1lname;
      let witnessName2 = res.witness2title + ' ' + res.witness2fname + ' ' + res.witness2lname;
      let insurefullname  = res.insuretitle + ' ' + res.insurename + ' ' + res.insurelastname;

      this.signature.get('place').setValue(res.place);
      this.signature.get('witnessName1').setValue(witnessName1);
      this.signature.get('witnessName2').setValue(witnessName2);
      this.signature.get('cusName').setValue(insurefullname);

     
      });
  }

  async openSignature(signs, num) {
    if(this.signed) return;
    let modal = this.modalCtrl.create(SignatureComponent,'',{cssClass: 'signModel'});
    modal.onDidDismiss((signData) => {
      //console.log('signData',signData);
      if (!this.validate.isEmpty(signData)) {

        let dataBase64 =  signData.substring(signData.indexOf(',')+1);
        let applicationImageM:ApplicationImageM = new ApplicationImageM();
        applicationImageM.applicationid =  this.applicationid;
        applicationImageM.binary = dataBase64;
        applicationImageM.fileType = "PNG"; 
        signs[num] = signData; //ค่าจริงที่ใช้โชว์รูป  // decode จาก base64 => binary เพื่อเอาลง base
        /**
         * encode จาก binary => base64 เพื่อเอารูปภาพมาโชว์
         *'data:image/png;base64,'+btoa(atob(signData.substring(signData.indexOf(',')+1)))
         */
         if(num === 1){ /// signature1 ส่ง ค่า input    //sign_customer, sign_witness1 = พยานคนที่ 1, sign_witness2 = พยานคนที่ 2, sign_agent
         
          this.signature.get('cusSignature').setValue(dataBase64); 
          applicationImageM.imageType = SignImageType.SIGN_CUSTOMER; 
          
         }
         if(num === 2){ 
          this.signature.get('witnessSignature1').setValue(dataBase64);
          applicationImageM.imageType = SignImageType.SIGN_WITNESS1;

         }
         if(num === 3){ 
          this.signature.get('witnessSignature2').setValue(dataBase64);
          applicationImageM.imageType = SignImageType.SIGN_WITNESS2; 
         }
         if(num === 4){ 
          this.signature.get('agentSignature').setValue(dataBase64); 
          applicationImageM.imageType = SignImageType.SIGN_AGENT; 
         }

         this.applicationImageMs.push(applicationImageM);

      }
    });
    modal.present();
  }

  /*
  ปุ่มยอมรับ
  */ 
  private acceptAgreement(): void {
    this.accept = true;
  }

}
