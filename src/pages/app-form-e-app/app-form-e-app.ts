import { FunctionName } from './../../providers/constants/function-name';
import { ApiProvider } from './../../providers/api/api';
import { RequestModel } from './../../providers/model/request-model';
import { AttachFileM } from './../../providers/service-table/attachfile-model';
import {ConstantConfig} from '../../providers/utility/constant-config';
import {Storage} from '@ionic/storage';
import { Component } from '@angular/core';
import {NavParams, IonicPage,  NavController,  ViewController,  ToastController} from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { DateFormatProvider } from '../../providers/date-format/date-format';
import { AttachFileEAppPage } from '../app-form-e-app/attach-file-e-app/attach-file-e-app';
import { SignatureEAppPage } from '../app-form-e-app/signature-e-app/signature-e-app';
import { AppFormUlinkEAppPage } from '../app-form-e-app/app-form-ulink-e-app/app-form-ulink-e-app';
import { PaymentEAppPage } from '../app-form-e-app/payment-e-app/payment-e-app';
import { SendAllFileEAppPage } from '../app-form-e-app/send-all-file-e-app/send-all-file-e-app';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { ApplicationEAppData } from '../../providers/application/application-eapp-data';
import { ApplicationData } from '../../providers/application/application-data';
import { ResultUlinkEAppPage } from './result-ulink-e-app/result-ulink-e-app';
import { ServiceName } from '../../providers/constants/service-name';
@IonicPage({
  segment: 'ใบคำขอออนไลน์'
})
@Component({
  selector: 'page-app-form-e-app',
  templateUrl: 'app-form-e-app.html',
})
export class AppFormEAppPage {
  private quotationM = this.appData.getQuotation();

  private typeapp:string = this.quotationM.typeapp;

  private stepsPage = [
    {
      root: AttachFileEAppPage,
      title: 'แนบเอกสาร',
      disabled: false
    },
    {
      root: this.typeapp =='ULink'?AppFormUlinkEAppPage:SignatureEAppPage,
      title: 'ลงลายมือชื่อ',
      disabled: false
    },
    {
      root:this.typeapp =='ULink'?ResultUlinkEAppPage:PaymentEAppPage,
      title: this.typeapp =='ULink'?'ผลการรับประกัน':'ชำระเงิน',
      disabled: false
    },
    {
      root:this.typeapp =='ULink'?PaymentEAppPage:SendAllFileEAppPage,
      title: this.typeapp =='ULink'?'ชำระเงิน':'ส่งเอกสาร',
      disabled: false
    }
  ];

  private dropdownAttachFile = [
    {
      key:'01',
      value:'บัตรประจำตัวประชาชน' 
    },
    {
      key:'02',
      value:'ทะเบียนบ้าน (ทร.14)' 
    },
    {
      key:'03',
      value:'บัตรประจำตัวข้าราชการ'
    },
    {
      key:'04',
      value:'ใบสำคัญต่างด้าว' 
    },
    {
      key:'05',
      value:'หนังสือเดินทาง' 
    },
    {
      key:'06',
      value:'ใบสุทธิพระ'
    },{
      key:'07',
      value:'ใบขับขี่'
    },
    {
      key:'08',
      value:'สูติบัตร' 
    },
    {
      key:'09',
      value:'ใบรายการจากฐานข้อมูลทะเบียนบัตรประจำตัวประชาชน'
    },{
      key:'10',
      value:'สมุดประจำตัวคนพิการ'
    },
    {
      key:'11',
      value:'บัตรประจำตัวผู้หลบหนีเข้าเมือง'
    },
    {
      key:'12',
      value:'หนังสือรับรองแทนบัตรประจำตัวบุคคลผู้มิได้สัญชาติไทย'
    }
  ]

  

  private title: string = 'แนบเอกสาร';
  private today: string;

  private titleList = ["แนบเอกสาร", "ลงลายมือชื่อ", "ชำระเงิน", "ส่งเอกสาร"];

   /**
   * step ที่เลือก
   */
  private step: number = 0;

  private appApplication: FormGroup;

  private applicationEappM: any;



  constructor(
    private fb: FormBuilder,
    private appEAppData: ApplicationEAppData,
    private appData: ApplicationData,
    private dateFormatProvider :DateFormatProvider,
    private decimalPipe: DecimalPipe ,
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingDirective,
    private alertCtrl: AlertDirective,
    private storage: Storage,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider) {
      
    this.appApplication = this.fb.group({
      referenceno: '',
      branchId: '',
      dopositno: '',
      healthcheckflag: '',
      bname: '',
      bperid: '',
      dname: '',
      dperid: '',
      applicationid: '',
      customername: '',
      createdate: '',
      planname:'',
      lifesum: '',
      totalpremium: ''

    });

    const data = this.appData.getQuotation();
    this.appData.getData('mcaapplicationM').then(
      (res)=> {
        this.appApplication.get('applicationid').setValue(res['applicationidDisplay']);
      }
    );
    this.appApplication.get('referenceno').setValue(data.referenceno);
    this.storage.get(ConstantConfig.SALE_INFO_KEY).then(objM => {
      if (objM != undefined) {
        if (objM.strid.startsWith('B')) {
          this.appApplication.get('bperid').setValue(objM['personID']);
          this.appApplication.get('dperid').setValue(objM['uPersonId']);
          this.appApplication.get('bname').setValue(objM['firstName'] + ' ' + objM['lastName']);
          this.appApplication.get('dname').setValue(objM['uFirstName'] + ' ' + objM['uLastName']);  
        }
        else {
          this.appApplication.get('bperid').setValue(objM['personID']);
          this.appApplication.get('dperid').setValue(objM['personID']);
          this.appApplication.get('bname').setValue(objM['firstName'] + ' ' + objM['lastName']);
          this.appApplication.get('dname').setValue(objM['firstName'] + ' ' + objM['lastName']);
        }

        this.appApplication.get('branchId').setValue(objM['branchCode']);
        this.appApplication.get('dopositno').setValue(objM['depositNo']);
      }
    });

    
    this.appApplication.get('customername').setValue(data.pname + ' ' +data.fname + ' ' + data.lname);
    this.appApplication.get('createdate').setValue(this.dateFormatProvider.dateFormatShotTh1(data.createdatetime, "S"));
    this.appApplication.get('planname').setValue(data.planname);
    this.appApplication.get('lifesum').setValue(data.lifesum !== ""?this.decimalPipe.transform(data.lifesum):"");
    this.appApplication.get('totalpremium').setValue(data.totalpremium !== ""?this.decimalPipe.transform(data.totalpremium):"");

    if(data.healthcheckflag == 'Y')
    {
      this.appApplication.get('healthcheckflag').setValue('ตรวจสุขภาพ');
    } else {
      this.appApplication.get('healthcheckflag').setValue('ไม่ตรวจสุขภาพ'); 
    }

    this.appApplication.get('referenceno').disable();
    this.appApplication.get('branchId').disable();
    this.appApplication.get('dopositno').disable();
    this.appApplication.get('bname').disable();
    this.appApplication.get('dname').disable();
    this.appApplication.get('bperid').disable();
    this.appApplication.get('dperid').disable();
    this.appApplication.get('applicationid').disable();
    this.appApplication.get('customername').disable();
    this.appApplication.get('createdate').disable();
    this.appApplication.get('planname').disable();
    this.appApplication.get('lifesum').disable();
    this.appApplication.get('totalpremium').disable();
    this.appApplication.get('healthcheckflag').disable();
    
    this.setDateTime();

    if (this.navParams.data.purchaseComplete != undefined && this.navParams.data.purchaseComplete) {
      this.step = 3;
      this.stepsPage[0].disabled = true;
      this.stepsPage[1].disabled = true;
      this.stepsPage[2].disabled = true;
    }

    this.appEAppData.isPurchaseComplete = false;
    
  }

  async ngAfterViewInit() {
    
    this.applicationEappM = await this.appEAppData.selectApplicationEAppData(); 
    
  }

  ionViewDidLoad() {}

  /**
   * แสดงวันที่ และเวลาปัจจุบัน
   */
  private setDateTime(): void 
  {
    this.today = this.dateFormatProvider.dateFormatShotTh2(String(moment(new Date()).format("YYYY-MM-DD HH:mm:ss")));
    setInterval(() => {
      this.today = this.dateFormatProvider.dateFormatShotTh2(String(moment(new Date()).format("YYYY-MM-DD HH:mm:ss")));
    }, 1000);
  }

    /**
   * ส่งค่า step ที่ถูกเลือก
   * @param index step
   */
  private selectStep(index: number) {

  if (this.appEAppData.isPurchaseComplete) {
      
      this.step = 3;
      this.stepsPage[0].disabled = true;
      this.stepsPage[1].disabled = true;
      this.stepsPage[2].disabled = true;

      return false;
    }

    let totalRequire1: number = 0;
    let totalRequire2: number = 0;
    let totalRequire5: number = 0;
    let totalRequire8: number = 0;

    let totalFileType1: number = 0;
    let totalFileType2: number = 0;
    let totalFileType5: number = 0;
    let totalFileType8: number = 0;

    let caseOR: boolean = false;
    
    /**
     * กรณีผู้รับผลประโยชน์เป็นตัวผู้เอาประกัน
     */
    let caseOwnRequireType2: boolean = false;

    let txtAttachFileError: string ='<p>กรุณาแนบเอกสารให้ครบถ้วน ดังนี้</p>';

    if (this.applicationEappM['assuredDetailM'] != undefined) {
      caseOR = this.applicationEappM['assuredDetailM'].condition != undefined ? true : false;
      if (!caseOR) {
        if (this.applicationEappM['assuredDetailM'].requireType01)
          totalRequire1 += 1;

        if (this.applicationEappM['assuredDetailM'].requireType02)
          totalRequire2 += 1;
          
        if (this.applicationEappM['assuredDetailM'].requireType05)
          totalRequire5 += 1;
      }
      else {
        if (this.applicationEappM['assuredDetailM'].requireType02) {
          totalRequire2 += 1;
          caseOwnRequireType2 = true;
        }
      }
    }

    if (this.applicationEappM['beneficiaryDetailMs'] != undefined && this.applicationEappM['beneficiaryDetailMs'].length > 0) {
      
      this.applicationEappM['beneficiaryDetailMs'].forEach(itemM => {
        if (itemM.requireType01)
          totalRequire1 += 1;

        if (itemM.requireType02)
          totalRequire2 += 1;

      });
    }

    let check: boolean = false;
    let oldStep: number = this.step;
    let stepError: number = 0;

    console.log(">> this.applicationEappM['assuredDetailM'] -----> ", this.applicationEappM['assuredDetailM']);
    console.log(">> caseOR = " + caseOR);
    console.log(">> totalRequire1 = " + totalRequire1 + " : " + totalFileType1);
    console.log(">> totalRequire2 = " + totalRequire2 + " : " + totalFileType2);
    console.log(">> totalRequire5 = " + totalRequire5 + " : " + totalFileType5);
    console.log(">> totalRequire8 = " + totalRequire8 + " : " + totalFileType8);

    if (typeof index == 'number')
      this.step = index;

    if (typeof index == 'number') {
       if (index > oldStep) {
        for (let i = 0; i<index; i++) {
          
          check = true;
          stepError = i;

          if (i == 0) {
            if (this.appEAppData.attachFileMs.length == 0) {

              txtAttachFileError += "<ul>";

              if (totalRequire1 > 0)
                txtAttachFileError += '<li class="txt-left">'+ this.dropdownAttachFile[0].value + ' ' + String((totalRequire1)) +" ฉบับ"+'</li>';

              if (totalRequire2 > 0)
                txtAttachFileError += '<li class="txt-left">'+ this.dropdownAttachFile[1].value + ' ' + String((totalRequire2)) +" ฉบับ"+'</li>';
              
              if (totalRequire5 > 0)
                txtAttachFileError += '<li class="txt-left">'+ this.dropdownAttachFile[4].value + ' ' + String((totalRequire5)) +" ฉบับ"+'</li>';
            
              if (totalRequire8 > 0)
                txtAttachFileError += '<li class="txt-left">'+ this.dropdownAttachFile[7].value + ' ' + String((totalRequire8)) +" ฉบับ"+'</li>';
 
              if (caseOR) {
                txtAttachFileError += '<li class="txt-left">'+ this.dropdownAttachFile[0].value + ' หรือ ' + this.dropdownAttachFile[1].value +" หรือ "+ this.dropdownAttachFile[7].value +' 1 ฉบับ</li>';
              } 

              txtAttachFileError += "</ul>";
              check = false;
              break;
            }
            else { 
              let isPassValid: boolean = true;

              this.appEAppData.attachFileMs.forEach(itemM => {

                if ("01" == itemM.attribute02)
                  totalFileType1 += 1;

                if ("02" == itemM.attribute02)
                  totalFileType2 += 1;

                if ("05" == itemM.attribute02)
                  totalFileType5 += 1;  

                if ("08" == itemM.attribute02)
                  totalFileType8 += 1;

              }); 

              console.log(">> caseOR = " + caseOR);
              console.log("totalRequire1 = " + totalRequire1 + " : " + totalFileType1);
              console.log("totalRequire2 = " + totalRequire2 + " : " + totalFileType2);
              console.log("totalRequire5 = " + totalRequire5 + " : " + totalFileType5);
              console.log("totalRequire8 = " + totalRequire8 + " : " + totalFileType8);
              console.log("caseOwnRequireType2 = " + caseOwnRequireType2);
             
              txtAttachFileError += "<ul>";
              if (totalRequire1 > 0 && totalFileType1 < totalRequire1){
                isPassValid = false;
                txtAttachFileError +=  '<li class="txt-left">'+ this.dropdownAttachFile[0].value + ' ' + String((totalRequire1 - totalFileType1)) +" ฉบับ"+'</li>';
              }

              if (totalRequire2 > 0 && totalFileType2 < totalRequire2){
                isPassValid = false;
                txtAttachFileError +=  '<li class="txt-left">'+ this.dropdownAttachFile[1].value + ' ' + String((totalRequire2 - totalFileType2)) +" ฉบับ"+'</li>';
              }

              if (totalRequire5 > 0 && totalFileType5 < totalRequire5){
                isPassValid = false;
                txtAttachFileError +=  '<li class="txt-left">'+ this.dropdownAttachFile[4].value + ' ' + String((totalRequire5 - totalFileType5)) +" ฉบับ"+'</li>';
              }

              if (totalRequire8 > 0 && totalFileType8 < totalRequire8){
                isPassValid = false;
                txtAttachFileError +=  '<li class="txt-left">'+ this.dropdownAttachFile[7].value + ' ' + String((totalRequire8 - totalFileType8)) +" ฉบับ"+'</li>';
              }

              if (isPassValid && caseOR) {

                if ((totalFileType2 >= totalRequire2) && caseOwnRequireType2) {
                  isPassValid = true;
                }
                else {
                  if (totalFileType1 > totalRequire1 || totalFileType2 > totalRequire2 || totalFileType8 > totalRequire8) {
                    isPassValid = true;
                  }
                  else {
                    isPassValid = false;
                    txtAttachFileError += '<li class="txt-left">'+ this.dropdownAttachFile[0].value +' หรือ ' + this.dropdownAttachFile[1].value +" หรือ "+ this.dropdownAttachFile[7].value +' 1 ฉบับ</li>';
                  }
                }
              }  

              txtAttachFileError += "</ul>";   

              console.log("isPassValid = " + isPassValid);
              if (!isPassValid) {
                check = false;
                break;
              }
            }
          }
          else if (i == 1) {
            if (this.appEAppData.signature.invalid) {
              check = false;
              break;
            }
          }
          else if (i == 2) {
            if (!this.appEAppData.isPurchaseComplete) {
               check = false;
               break;
            }
          }
        }

        if(!check){
          
          if (stepError == 0) {
             this.alertCtrl.warning(txtAttachFileError);
          }
          else if (stepError == 1) {
            this.alertCtrl.warning('กรุณาแนบลายเซ็นให้ครบถ้วน');
          }
          else if (stepError == 2) {
            this.alertCtrl.warning('กรุณาชำระเงิน');
          }
        
          setTimeout(() => {
            this.step = oldStep;
            this.title = this.titleList[oldStep];
          }, 1);
          return;
        }

        this.loadingCtrl.present();
        this.appEAppData.insertApplicationEAppData("").then(
          (res) => {
            this.loadingCtrl.dismiss();
            let toast = this.toastCtrl.create({
              message: 'บันทึกสำเร็จ',
              duration: 3000
            });
            toast.present();
          },
          (err) => {
            this.loadingCtrl.dismiss();
            let toast = this.toastCtrl.create({
              message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
                duration: 3000
            });
            this.step = oldStep;
            toast.present();
            console.log(JSON.stringify(err));
          }
        );

      } 
      else {
        this.title = this.titleList[index];
      }
       
    }
  }

  private goToCreateApp() {

    this.loadingCtrl.present();
    this.appData.selectApplication().then(
      (res) => {

          this.loadingCtrl.dismiss();
          if(this.typeapp=='ULink'){
            this.navCtrl.push('AppFormUlinkPage').then(() => {
              this.loadingCtrl.dismiss();
              this.viewCtrl.dismiss();
            });
          }else {
            this.navCtrl.push('AppApplicationPage').then(() => {
              this.loadingCtrl.dismiss();
              this.viewCtrl.dismiss();
            });
          }
         
        
      }, 
      (err) => {
        this.loadingCtrl.dismiss();
        
      }
    );
 
  }
}
