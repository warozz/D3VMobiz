import { Component } from '@angular/core';
import { IonicPage, } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import _ from "lodash";
import { Subscription } from 'rxjs';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import { ListExampleRider } from '../../../providers/ulink-benefit/example-benefit-model/list-excample-rider';
import { LoadingDirective } from '../../../directives/extends/loading/loading';

@IonicPage()
@Component({
  selector: 'page-ulink-rider',
  templateUrl: 'ulink-rider.html',
})
export class UlinkRiderPage {

  private ulinkRider: FormGroup;
  private sum: Number = 0;
  private mode: Number = 0;

  private subscription: Array<Subscription> = [];

  /**
   * สัญญาเพิ่มเติม
   */
  private rider: any = [];
  private tlplan: any = {
    planCode: 'UA02',
    planName: 'ทีแอล ไลฟ์ โซลูชั่น 99/99 [UA02]',
    pPayYear: '99',
    pEndowmentYear: '99',
    payType: 0,
    endowmentType: '0',
    calType: '2'
  };

  constructor(
    private fb: FormBuilder,
    public broadcaster:Broadcaster,
    private loadingCtrl: LoadingDirective,
    private ulinkAppDataProvider: UlinkAppDataProvider,
    private unitlinkData: UnitlinkDataProvider) {

      this.ulinkRider = this.fb.group({
        // ประมาณการมูลค่ารับซื้อคืนหน่วยลงทุน
        value: {value: null, disabled: true},
        // รวมเบี้ยสัญญาเพิ่มเติม (ต่อปี) ณ ปีที่เริ่มหยุดพักชำระเบี้ย (บาท)
        premium: {value: 0, disabled: true}
      });

      this.ulinkAppDataProvider.ulinkRider = this.ulinkRider;

      this.mode = this.ulinkAppDataProvider.ulinkPayment.controls['mode'].value;
      this.setSum();

      if(this.unitlinkData.editData){
        this.setEditData();
      }

      this.subscription.push(
        this.broadcaster.on('investBenefitStep').subscribe(res => {
          let chooseType = this.ulinkAppDataProvider.chooseType;
          let planCode = this.ulinkAppDataProvider.planCode;
  
          if(planCode == 'UA02'){
  
            if((res == 3 && chooseType == 'health')
            || (res == 4 && chooseType == 'self')
            ){
              this.calAV();
            }
          }
        })
      );
      
  }

  ngAfterViewInit(): void {
   
    this.ulinkAppDataProvider.ulinkPayment.get('mode').valueChanges.subscribe(data => {
      this.mode = data;
    });

    this.ulinkAppDataProvider.ulinkPayment.get('premiumrsp').valueChanges.subscribe(data => {
      this.setSum();
    });

    this.ulinkAppDataProvider.ulinkSum.get('ulinkSumArray').valueChanges.subscribe(data => {
      this.setSum();
    });

  }
  
  /**
   * ผลลัพธ์การคำนวณเบียประกัน
   * @param premium
   */
  private premiumRider(premium: number)
  {
    this.ulinkAppDataProvider.ulinkRider.controls['premium'].setValue(premium);
    this.ulinkAppDataProvider.riders = this.rider;
  }

  private setSum()
  {
    let rsp = this.ulinkAppDataProvider.ulinkPayment.controls['premiumrsp'].value * 5;
    let rpp = 0;
    let arrPay = <FormArray> this.ulinkAppDataProvider.ulinkSum.controls['ulinkSumArray'];
    if(arrPay.length > 0){
      let obj : FormGroup = <FormGroup>arrPay.at(0);
      rpp = obj.controls['realsumrpp'].value;
    }
    this.sum = rpp + rsp;
  }

  private setEditData() {

    //this.loadingCtrl.present();
    setTimeout(() => {
      let listExamplerider: Array<ListExampleRider> = this.ulinkAppDataProvider.examBenefit.listExamplerider;
      for(let data of listExamplerider){
        let key = data.ridertype;
        let sum = data.ridersum;
        let premium = data.riderpremium;
        this.rider[key].sum = Number(sum);
        this.rider[key].premium = premium;
      }
      //this.loadingCtrl.dismiss();
    }, 3000);
    
  }

  private calAV() {
    if(typeof this.ulinkAppDataProvider.ulinkWithdraw != 'undefined'){
      this.ulinkRider.get('value').setValue(this.ulinkAppDataProvider.av);
    }else {

      let sess_exam_age_pay = Number(this.ulinkAppDataProvider.ulinkPayment.get('endpayyear').value);
      let sess_exam_agecusto = Number(this.ulinkAppDataProvider.ulinkPayment.get('mAgeend').value);
      
      let testSeek = (sess_exam_age_pay+1 > sess_exam_agecusto) ? sess_exam_agecusto : sess_exam_age_pay+1;
      
      this.ulinkAppDataProvider.calAvUA02(testSeek);

      this.ulinkRider.get('value').setValue(this.ulinkAppDataProvider.av);

      //old code
      // if(chkValue(sess_exam_age_pay) && chkValue(sess_exam_agecusto)){
			// 	testSeek = (formatInt(sess_exam_age_pay)+1 > formatInt(sess_exam_agecusto)) ? formatInt(sess_exam_agecusto) : formatInt(sess_exam_age_pay)+1;
			// }else{
			// 	callback();
			// 	return;
			// }

    }

  }

}
