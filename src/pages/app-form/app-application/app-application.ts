import {ConstantConfig} from '../../../providers/utility/constant-config';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { ApplicationData } from './../../../providers/application/application-data';

import { Component, Input  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { AppTypePage } from '../../../pages/app-form/normal-app/app-type/app-type';
import { AppGeneralPage } from '../../../pages/app-form/normal-app/app-general/app-general';
import { AppBeneficiaryPage } from '../../../pages/app-form/normal-app/app-beneficiary/app-beneficiary';
import { AppHistoryPage } from '../../../pages/app-form/normal-app/app-history/app-history';
import { AppMedicalHistoryPage } from '../../../pages/app-form/normal-app/app-medical-history/app-medical-history';
import { AppTreatmentHistoryPage } from '../../../pages/app-form/normal-app/app-treatment-history/app-treatment-history';
import { AppSignPage } from '../../../pages/app-form/normal-app/app-sign/app-sign';
import { AppKbPage } from '../../../pages/app-form/normal-app/app-kb/app-kb';

import { Storage } from '@ionic/storage';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { CopyAddress } from '../../../providers/application/copy-address';
/**

* Generated class for the AppApplicationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'สร้างใบคำขอ'
})
@Component({
  selector: 'page-app-application',
  templateUrl: 'app-application.html',
})
export class AppApplicationPage {
  segmentStr: string;
  public itemSelected;
  appApplication: FormGroup;
  kbcheck : boolean = false;
  segment = {
    PER: 'ใบคำขอรายงวด',
    ULink: 'ใบคำขอเอาประกันภัย ยูนิตลิงค์'
  }

  private stepsPage = [
    {
      id:0,
      root: AppGeneralPage,
      title: 'ข้อมูลทั่วไป',
      disabled: false
    },
    {
      id:1,
      root: AppTypePage,
      title: 'แบบประกัน',
      disabled: false
    },
    {
      id:2,
      root: AppBeneficiaryPage,
      title: 'ผู้รับประโยชน์',
      disabled: false
    },
    {
      id:3,
      root: AppHistoryPage,
      title: 'ประวัติการรับประกัน',
      disabled: false
    },
    {
      id:4,
      root: AppMedicalHistoryPage,
      title: 'ประวัติการแพทย์',
      disabled: false
    },
    {
      id:5,
      root: AppTreatmentHistoryPage,
      title: 'รับรอง FATCA',
      disabled: false
    },
    {
      id:6,
      root: AppSignPage,
      title: 'ลงชื่อผู้เอาประกัน',
      disabled: false
    },
    {
      id:7,
      root: AppKbPage,
      title: 'คบ.',
      disabled: true
    },
  ];
  private copyAddress : CopyAddress;
  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private appData: ApplicationData,
    private storage: Storage,
    private alertCtrl: AlertDirective,
    private broadcaster: Broadcaster) {
      this.copyAddress = new CopyAddress();
      this.segmentStr = this.segment[this.appData.quotation.typeapp];
      this.appApplication = this.fb.group({
        referenceno: { value: '', disabled: true },
        branchId: { value: '', disabled: true },
        dopositno: { value: '', disabled: true },
        healthcheckflag: '',
        bname: { value: '', disabled: true },
        bperid: { value: '', disabled: true },
        dname: { value: '', disabled: true },
        dperid: { value: '', disabled: true },
      });

      this.storage.get(ConstantConfig.SALE_INFO_KEY).then(objM => {
        if (objM != undefined) {
          if (objM.strid.startsWith('B')) {
            this.appApplication.controls['bperid'].setValue(objM['personID']);
            this.appApplication.controls['dperid'].setValue(objM['uPersonId']);
            this.appApplication.controls['bname'].setValue(objM['firstName'] + ' ' + objM['lastName']);
            this.appApplication.controls['dname'].setValue(objM['uFirstName'] + ' ' + objM['uLastName']);
          }
          else {
            this.appApplication.controls['bperid'].setValue(objM['personID']);
            this.appApplication.controls['dperid'].setValue(objM['personID']);
            this.appApplication.controls['bname'].setValue(objM['firstName'] + ' ' + objM['lastName']);
            this.appApplication.controls['dname'].setValue(objM['firstName'] + ' ' + objM['lastName']);
          }

          this.appApplication.controls['branchId'].setValue(objM['branchCode']);
          this.appApplication.controls['dopositno'].setValue(objM['depositNo']);
        }
      });
      
      this.appApplication.controls['referenceno'].setValue(this.appData.getQuotation().referenceno);
      if (this.appData.getQuotation().healthcheckflag == 'Y') {
        this.appApplication.controls['healthcheckflag'].setValue('ตรวจสุขภาพ');
      } 
      else {
        this.appApplication.controls['healthcheckflag'].setValue('ไม่ตรวจสุขภาพ');
      }

  }

  @Input('showAction') private showAction: number = 1;

  ngOnInit() {
    
      this.appData.hasKB = false;
      this.stepsPage[7].disabled = true;

      let quotation: any = this.appData.getQuotation();
        if (quotation['quotationRiderMs'] != undefined && quotation['quotationRiderMs'].length > 0){
          quotation['quotationRiderMs'].forEach(element => {
            if ("KB2" == element.ridertype) {
              this.stepsPage[7].disabled = false;
              this.appData.hasKB = true;
              this.kbcheck = true;
            }
          });
        }

  }

  /**
   * step ที่เลือก
   */
  private step: number = 0;

  /**
   * บันทึกใบคำขอ
   */
  public saveApp(step?: number) {

    console.log('save application: ', this.appData);

  setTimeout(() => {
    this.broadcaster.broadcast('appStep', this.step);
  }, 10);
  this.checkAddressBenefit();
    if(this.appData['applicationMasterM']['mcaapplicationM'] 
      && this.appData.applicationMasterM.mcaapplicationM.publishstatus === 'P'
    ) {
      let { publishstatus : publish } = this.appData.applicationMasterM.mcaapplicationM;
       let old = this.step;
      // --> only publishstatus P
      if(publish === 'P' && (typeof step == 'undefined'|| typeof step == 'number')) {
        let check = false;
        if(this.kbcheck) {
          check = this.appData.appKb.valid && this.appData.appSign.valid && this.appData.appTreatmentHistory.valid && this.appData.appMedicalHistory.valid &&this.appData.appHistory.valid && this.appData.appBeneficiary.valid && this.appData.appType.valid && this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid ;
        } else {
          check = this.appData.appSign.valid && this.appData.appTreatmentHistory.valid && this.appData.appMedicalHistory.valid &&this.appData.appHistory.valid && this.appData.appBeneficiary.valid && this.appData.appType.valid && this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid;
        }
        if(typeof step === 'number') {
          this.step = step;
        }
        if(check) {
          // undefinded --> click save button 
          if(typeof step === 'undefined') {
            this.appData.insertApplication(step, publish).then(() => {
              console.log('publish undefined this.navParams.data.page', this.navParams.get('page'))
              if (this.navParams.get('page') === 'AppFormUlink')
                this.navCtrl.pop();
              else
                this.navCtrl.setRoot('AppFormPage');
            });
          // number --> click step button
          } else if(typeof step === 'number'){
            this.appData.insertApplication(step, publish);
          }
        } else if((typeof step === 'number' || typeof step === 'undefined') && !check){
          this.alertCtrl.warning('กรุณากรอกข้อมูลที่มีสัญลักษณ์<span class="c-red"> * </span>ให้ครบถ้วน');
          setTimeout(() => {
            this.step = old;
          },1);
        } else {
          this.alertCtrl.warning('กรุณากรอกข้อมูลที่มีสัญลักษณ์<span class="c-red"> * </span>ให้ครบถ้วน');
        }
        
        return;
      }
      return; 
    }
    // ตรวจสอบการ validate
    // this.stepsPage[1].disabled = this.appData.appGeneral.invalid || this.appData.appAddressP.invalid || this.appData.appAddressC.invalid || this.appData.appAddressW.invalid;
    // this.stepsPage[2].disabled = this.appData.appType.invalid;
    // this.stepsPage[3].disabled = this.appData.appBeneficiary.invalid;
    // this.stepsPage[4].disabled = this.appData.appHistory.invalid;
    // this.stepsPage[5].disabled = this.appData.appMedicalHistory.invalid;
    // this.stepsPage[6].disabled = this.appData.appTreatmentHistory.invalid;
    // this.stepsPage[7].disabled = this.appData.appSign.invalid;
    let check: boolean = false;
    let oldStep: number = this.step;
    if (typeof step == 'number') {
      this.step = step;
    }
    if (typeof step != 'object') {

      check = this.validate(this.step - 1);

      // switch(step) {
      //   case 1:
      //     check = this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid ;
      //     break;

      //   case 2:
      //     check = this.appData.appType.valid && this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid;
      //     break;

      //   case 3:
      //     check = this.appData.appBeneficiary.valid && this.appData.appType.valid && this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid;
      //     break;

      //   case 4:
      //     check = this.appData.appHistory.valid && this.appData.appBeneficiary.valid && this.appData.appType.valid && this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid ;
      //     break;

      //   case 5:
      //     check = this.appData.appMedicalHistory.valid &&this.appData.appHistory.valid && this.appData.appBeneficiary.valid && this.appData.appType.valid && this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid;
      //     break;

      //   case 6:
      //     check = this.appData.appTreatmentHistory.valid && this.appData.appMedicalHistory.valid &&this.appData.appHistory.valid && this.appData.appBeneficiary.valid && this.appData.appType.valid && this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid;
      //     break;

      //   case 7:
      //     check = this.appData.appSign.valid && this.appData.appTreatmentHistory.valid && this.appData.appMedicalHistory.valid &&this.appData.appHistory.valid && this.appData.appBeneficiary.valid && this.appData.appType.valid && this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid ;
      //     break;

      //   default:
      //     check = true;
      // }
      if (check) {
        // step สุดท้าย validate ทั้งหมด

        let publish: string = 'D';
        if (typeof step == 'undefined' && this.step == 6 && !this.kbcheck) {

          if (
                this.appData.appGeneral.valid && 
                this.appData.appAddressP.valid && 
                this.appData.appAddressC.valid && 
                this.appData.appAddressW.valid &&
                this.appData.appType.valid &&
                this.appData.appBeneficiary.valid &&
                this.appData.appHistory.valid &&
                this.appData.appMedicalHistory.valid &&
                this.appData.appTreatmentHistory.valid &&
                this.appData.appSign.valid
              ) {
                publish = 'P';
              }
              else {
                this.alertCtrl.warning('กรุณากรอกข้อมูลที่มีสัญลักษณ์<span class="c-red"> * </span>ให้ครบถ้วน');
                this.markAsDirty(6)
              }
        }
        if (typeof step == 'undefined' && this.step == 7 && this.kbcheck) {
          if (
                this.appData.appGeneral.valid && 
                this.appData.appAddressP.valid && 
                this.appData.appAddressC.valid && 
                this.appData.appAddressW.valid &&
                this.appData.appType.valid &&
                this.appData.appBeneficiary.valid &&
                this.appData.appHistory.valid &&
                this.appData.appMedicalHistory.valid &&
                this.appData.appTreatmentHistory.valid &&
                this.appData.appSign.valid &&
                this.appData.appKb.valid &&
                this.kbcheck 
              ) {
                publish = 'P';
              }
              else{
                this.alertCtrl.warning('กรุณากรอกข้อมูลที่มีสัญลักษณ์<span class="c-red"> * </span>ให้ครบถ้วน');
                this.markAsDirty(7)
              }
              
        }
        this.appData.insertApplication(step, publish).then(() => {
          if (publish == 'P'){
            console.log('publish P this.navParams.data.page', this.navParams.get('page'))
            if (this.navParams.get('page') === 'AppFormUlink'){
              this.navCtrl.pop();
            } else {
              this.navCtrl.setRoot('AppFormPage');
            }
          }
        }, ()=>{
        this.step = oldStep;
        }
      );
      }
      else {

        if(oldStep == 2 && this.appData.appBeneficiary['controls']['beneficiaryData']['status']=="INVALID")
            this.alertCtrl.warning('กรุณากรอกข้อมูลที่มีสัญลักษณ์<span class="c-red"> * </span>ให้ครบถ้วน');
        else if(oldStep == 2 && this.appData.appBeneficiary['controls']['percentageCh']['status']=="INVALID")
            this.alertCtrl.warning('กรุณากรอกร้อยละผลประโยชน์ให้ครบ 100');
        else
            this.alertCtrl.warning('กรุณากรอกข้อมูลที่มีสัญลักษณ์<span class="c-red"> * </span>ให้ครบถ้วน');
        
        this.markAsDirty(oldStep);
        setTimeout(() => {
          this.step = oldStep;
        }, 1);
      }
    }
  }
  private checkAddressBenefit()
  {
    this.copyAddress.copyAddressBeneficiary(this.appData);
    this.copyAddress.copyApplicaitonAddressCurrent(this.appData);
    this.copyAddress.copyApplicaitonAddressWork(this.appData);
  }

  /**
   * ตรวจสอบการกรอกข้อมูล
   */
  private validate(index: number): boolean {
    if (this.step < index)
      return true;

    switch (index) {

      case 6:
        if (this.appData.appSign.invalid)
          return false;

      case 5:
        if (this.appData.appTreatmentHistory.invalid)
          return false;

      case 4:
        if (this.appData.appMedicalHistory.invalid)
          return false;

      case 3:
        if (this.appData.appHistory.invalid)
          return false;

      case 2:
        if (this.appData.appBeneficiary.invalid)
            return false;

      case 1:
        if (this.appData.appType.invalid)
          return false;

      case 0:
        return (this.appData.appGeneral.valid && this.appData.appAddressP.valid && this.appData.appAddressC.valid && this.appData.appAddressW.valid)

      default:
        return true;
    }
  }

  private markAsDirty(index: number): void {

    switch (index) {

      case 7:
        let otherinsuranceRows = this.appData.appKb.get('otherinsuranceRows') as FormArray;
        Object.keys(this.appData.appKb.controls).forEach(key => {
          if(key != 'otherinsuranceRows'){
            this.appData.appKb.get(key).markAsDirty();
          }
          else {
            this.appData.appKb.value.otherinsuranceRows.forEach((element ,idx) => {
              Object.keys(element).forEach(key2 =>{
                otherinsuranceRows.controls[idx].get(key2).markAsDirty();
              })
          });
          }
        });
        break;

      case 6:
        Object.keys(this.appData.appSign.controls).forEach(key => {
          this.appData.appSign.get(key).markAsDirty();
        });
        break;

      case 5:
        Object.keys(this.appData.appTreatmentHistory.controls).forEach(key => {
          this.appData.appTreatmentHistory.get(key).markAsDirty();
        });
        break;

      case 4:
        Object.keys(this.appData.appMedicalHistory.controls).forEach(key => {
          this.appData.appMedicalHistory.get(key).markAsDirty();
        });
        break;

      case 3:
        let otherInsuranceData = this.appData.appHistory.get('otherInsuranceData') as FormArray;
        let insuranceRejectionData = this.appData.appHistory.get('insuranceRejectionData') as FormArray;

        Object.keys(this.appData.appHistory.controls).forEach(key => {
           // otherinsuranceyn
            if(key == 'otherinsuranceyn' || key == 'insurancerejectionflag'){
              this.appData.appHistory.get(key).markAsDirty();
            }
            //otherInsuranceData
            else if(key == 'otherInsuranceData'){

              this.appData.appHistory.value.otherInsuranceData.forEach((element2 ,idx2) => {

                Object.keys(element2).forEach(key2 =>{
                 otherInsuranceData.controls[idx2].get(key2).markAsDirty();

 
                })
            });
            }
            else if(key == 'insuranceRejectionData'){
              this.appData.appHistory.value.insuranceRejectionData.forEach((element3 ,idx3) => {

                Object.keys(element3).forEach(key3 =>{
                 insuranceRejectionData .controls[idx3].get(key3).markAsDirty();
                })
            });
            }
          });
        break;

      case 2:
         let beneficiaryData = this.appData.appBeneficiary.get('beneficiaryData') as FormArray;
         Object.keys(this.appData.appBeneficiary.controls).forEach(key => {
          if(key == 'beneficiaryData'){
             this.appData.appBeneficiary.value.beneficiaryData.forEach((element ,idx) => {

               Object.keys(element).forEach(key2 =>{
                beneficiaryData.controls[idx].get(key2).markAsDirty();

               })
           });
         }
         });
        break;

      case 1:
        Object.keys(this.appData.appType.controls).forEach(key => {
          this.appData.appType.get(key).markAsDirty();
        });
        break;

      case 0:
        let childrenData =this.appData.appGeneral.get('childrenData') as FormArray;
        Object.keys(this.appData.appGeneral.controls).forEach(key => {
          this.appData.appGeneral.get(key).markAsDirty();
          // ulink บุตร/ธิดาที่ยังไม่บรรลุนิติภาวะ
          if(key == 'childrenData' && this.appData.quotation.typeapp === 'ULink') {
            this.appData.appGeneral.value.childrenData.forEach((element ,idx) => {
              Object.keys(element).forEach(key2 => {
                childrenData.controls[idx].get(key2).markAsDirty();
               });
            });
          }

        });

        Object.keys(this.appData.appAddressP.controls).forEach(key => {
          this.appData.appAddressP.get(key).markAsDirty();
        });

        Object.keys(this.appData.appAddressC.controls).forEach(key => {
          this.appData.appAddressC.get(key).markAsDirty();
        });

        Object.keys(this.appData.appAddressW.controls).forEach(key => {
          this.appData.appAddressW.get(key).markAsDirty();
        });

    }
  }

  private check100(oldStep:number)
  {
    if(oldStep == 2)
    {
      if(this.appData.appBeneficiary.get('age'))
      if(this.appData.appBeneficiary['controls']['percentageCh']['status']=="INVALID"){
        this.alertCtrl.warning('กรุณากรอกร้อยละผลประโยชน์ให้ครบ 100');
      }
    }
    else{
      this.alertCtrl.warning('กรุณากรอกข้อมูลที่มีสัญลักษณ์<span class="c-red"> * </span>ให้ครบถ้วน');
    }
  }
}
