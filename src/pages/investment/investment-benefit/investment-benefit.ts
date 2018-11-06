import { ApiProvider } from './../../../providers/api/api';

import { ExampleBenefitModel } from './../../../providers/ulink-benefit/example-benefit-model/example-benefit';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { UlinkChildPage } from '../ulink-child/ulink-child';
import { UlinkPaymentPage } from '../ulink-payment/ulink-payment';
import { UlinkSumPage } from '../ulink-sum/ulink-sum';
import { UlinkReturnPage } from '../ulink-return/ulink-return';
import { UlinkRiderPage } from '../ulink-rider/ulink-rider';
import { UlinkWithdrawPage } from '../ulink-withdraw/ulink-withdraw';
import { UlinkBenefitPage } from '../ulink-benefit/ulink-benefit';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { ValidateProvider } from '../../../providers/validate/validate';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';

@IonicPage()
@Component({
  selector: 'page-investment-benefit',
  templateUrl: 'investment-benefit.html',
})
export class InvestmentBenefitPage implements OnDestroy {

  // apiProvider: any;
  private subscription: Array<Subscription> = [];

  /**
   * แบบประกันที่เลือก
   */
  private choosePlan: number = 1;

  /**
   * code แบบประกัน
   */
  private planCode: string = '';

  /**
   * ประเภทผลประโยชน์ที่เลือก
   */
  private chooseType: string = '';

  /**
   * step ที่เลือก
   */
  private selectedStep: number = 0;
  private oldIndex: number = -1;


  /**
   * step
   */
  private stepsPage: Array<any> = [];

  private formGroupAll:Array<string> = [];

  public examBenefit: ExampleBenefitModel;

  private prospect: ProspectModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private broadcaster: Broadcaster,
    private alertCtrl: AlertDirective,
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingDirective,
    private ulinkBenefit: UlinkAppDataProvider,
    private unitlinkData: UnitlinkDataProvider,
    private validator: ValidateProvider) {
    this.choosePlan = this.ulinkBenefit.choosePlan;
    this.planCode = this.ulinkBenefit.planCode;
    this.changeChoosePlan(this.choosePlan);

    this.prospect = this.navParams.get('prospect');

    this.subscription.push(
      this.broadcaster.on('chooseTlPlan').subscribe(res => {
        this.choosePlan = res;
        this.changeChoosePlan(this.choosePlan);
      })
    );


    if(this.unitlinkData.editData){
      this.setEditData();
    }


  }

  public ngOnDestroy(): void {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  /**
   * เช็คการเลือกแบบประกัน
   */
  private changeChoosePlan(choosePlan: number){
    if (choosePlan == 1){
      this.chooseType = 'educate';
    }else{
      this.chooseType = 'protect';
    }
    this.changeChooseType(this.chooseType);
  }

  /**
   * ประเภทผลประโยชน์ที่เลือก
   */
  private changeChooseType(type: string) {

    this.ulinkBenefit.choosePlan = this.choosePlan;
    this.ulinkBenefit.chooseType = this.chooseType;

    // ล้างค่า
    this.stepsPage = [];
    this.formGroupAll = [];

    // เฉพาะประเภท ทุนการศึกษาให้กับบุตรหลาน
    if (type == 'educate') {
      this.stepsPage.push({
        id: 0,
        root: UlinkChildPage,
        title: 'ข้อมูลบุตรในอุปการะ',
        disabled: false
      });
      this.formGroupAll.push("ulinkChild");
    }

    // ทุกประเภท
    this.stepsPage.push({
      id: 1,
      root: UlinkPaymentPage,
      title: 'การชำระเบี้ยประกันภัย',
      disabled: false
    });
    this.formGroupAll.push("ulinkPayment");

    // เฉพาะแบบ ทีแอล ไลฟ์ โซลูชั่น 99/99
    if (this.choosePlan == 2) {
      this.stepsPage.push({
        id: 2,
        root: UlinkSumPage,
        title: 'จำนวนเงินเอาประกันภัย RPP',
        disabled: false
      });
      this.formGroupAll.push("ulinkSum");
    }

    // ทุกประเภท
    this.stepsPage.push({
      id: 3,
      root: UlinkReturnPage,
      title: 'อัตราผลตอบแทน',
      disabled: false
    });
    this.formGroupAll.push("ulinkReturn");

    // ทุกประเภทที่ไม่ใช่ สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต และ ค่ารักษาพยาบาล
    if (type != 'protect' && type != 'health') {
      this.stepsPage.push({
        id: 4,
        root: UlinkWithdrawPage,
        title: 'ถอน',
        disabled: false
      });
      this.formGroupAll.push("ulinkWithdraw");
    }

    // เฉพาะแบบ ทีแอล ไลฟ์ โซลูชั่น 99/99 และประเภท ค่ารักษาพยาบาล หรือ ออกแบบยูนิตลิงค์ด้วยตัวเอง
    if (this.choosePlan == 2 && (type == 'health' || type == 'self')) {
      this.stepsPage.push({
        id: 5,
        root: UlinkRiderPage,
        title: 'สัญญาเพิ่มเติม',
        disabled: false
      });
      this.formGroupAll.push("ulinkRider");
    }

    // ทุกประเภท
    this.stepsPage.push({
      id: 6,
      root: UlinkBenefitPage,
      title: 'สรุปตัวอย่างผลประโยชน์',
      disabled: false
    });
    this.formGroupAll.push("ulinkBenefit");
    this.selectedStep = 0;
  }

  /**
   * step ที่เลือก
   * @param index 
   */
  private changeSelectedStep(index: number) {
    console.log("this.selectedStep --->",this.selectedStep);
    console.log("index --->",index);
    this.oldIndex = this.selectedStep;
    this.selectedStep = index;

    if ((this.validate(this.oldIndex) && this.oldIndex < index ) || this.oldIndex > index) {
      let valid: boolean = true;
      if(this.formGroupAll[index] == 'ulinkBenefit'){
        for(let i=0; i<index;i++){
          if(!this.validate(i)){
            valid = false;
            break;
          }
        }
      }
      if(valid){
        this.saveDataUlink();
        this.broadcaster.broadcast('investBenefitStep', index);
      }else{
        this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบทุกหน้า');
        setTimeout(() => {
          this.selectedStep = this.oldIndex;
        }, 1);
      } 
    }
    else {
      this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
      setTimeout(() => {
        this.selectedStep = this.oldIndex;
      }, 1);
    }
  }

/**
 * check field has reqiure
 * */ 
  private validate(index: number): boolean {
   
    // for(let i=0; i<=index; i++){
    //   if(this.formGroupAll[i] != 'ulinkBenefit'){
    //     console.log(this.formGroupAll[i]+'.valid = ' + this.ulinkBenefit[this.formGroupAll[i]].valid, this.ulinkBenefit[this.formGroupAll[i]]);
    //   }
    // }

    if(this.formGroupAll[index] == 'ulinkRider' || this.formGroupAll[index] == 'ulinkBenefit') return true;
   
    return this.ulinkBenefit[this.formGroupAll[index]].valid;
  }

  private saveDataUlink():void{ 

    const validateProspect = this.validator.validateProspect(this.prospect, true, true, false);

    if(validateProspect){

      this.loadingCtrl.present();

      this.ulinkBenefit.saveExampleBenefit().then(()=>{

        this.loadingCtrl.dismiss();
        let toast = this.toastCtrl.create({
          message: 'บันทึกสำเร็จ',
          duration: 3000
        });
        toast.present();
    
      }).catch(err => {
        this.loadingCtrl.dismiss();
        let toast = this.toastCtrl.create({
          message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
            duration: 3000
        });
        toast.present();
        this.selectedStep = this.oldIndex;
      });
    }
  }

  private setEditData(){
    console.log('set Edit Data --->Invest Benefit');
    let exampleBenefit : ExampleBenefitModel = this.ulinkBenefit.getExampleBenefit();
    if(typeof exampleBenefit  != 'undefined'){
      if(exampleBenefit.plancode == 'UA01'){
        this.choosePlan = 1;
      }else if(exampleBenefit.plancode == 'UA02'){
        this.choosePlan = 2;
      }
      this.chooseType = exampleBenefit.benefitname;
      this.changeChooseType(this.chooseType);
    }
  }
}










