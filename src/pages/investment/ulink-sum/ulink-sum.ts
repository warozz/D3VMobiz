import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { Subscription } from 'rxjs';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import sortBy from 'lodash/sortBy';
import { ExampleBenefitModel } from '../../../providers/ulink-benefit/example-benefit-model/example-benefit';
import { ListExampleSumRpp } from '../../../providers/ulink-benefit/example-benefit-model/list-example-sumrpp';

@IonicPage()
@Component({
  selector: 'page-ulink-sum',
  templateUrl: 'ulink-sum.html',
})
export class UlinkSumPage implements OnDestroy{

  private ulinkSum: FormGroup;

  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private prospect: ProspectModel = new ProspectModel;
  private subscription: Array<Subscription> = [];
  private editFinish: boolean = true;
   /**
   * ข้อความ alert
   */
  private textAlert = {
    pleaseKeyValue:'กรุณาระบุข้อมูลก่อนหน้าให้สมบูรณ์ก่อน',
    ageNotMoreCurrent:'กรุณาระบุอายุมากกว่าปัจจุบัน',
    ageNotRelevance:'ระบุอายุไม่สัมพันธ์กัน',
    notRangeAmountRpp:'จำนวนเงินเอาประกันภัยไม่อยู่ในช่วงต่ำสุด-สูงสุด'
  }

  /**
   * disable ปุ่ม เพิ่ม top-up
   */
  private disabledAddSumRpp: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private ulinkData: UlinkAppDataProvider,
    private alertCtrl: AlertDirective,
    private broadcaster: Broadcaster,
    private unitlinkData: UnitlinkDataProvider) {

      this.prospect = this.navParams.get('prospect');

      this.subscription.push(
        this.broadcaster.on('investBenefitResetData').subscribe(res => {
          if(res){
            if(this.editFinish){
              this.reset();
            }
          }
          this.editFinish = true;
        })
      );

      this.ulinkSum = this.fb.group({
        // รวมชำระเบี้ยประกัน RPP ปีละ (บาท)
        totalRPP: 0,
        ulinkSumArray: this.fb.array([this.ulinkSumRows(true)])
      });

      this.ulinkData.ulinkSum = this.ulinkSum;

      if(this.unitlinkData.editData){
        this.setEditData();
      }
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  private ulinkSumRows(first: boolean = false): FormGroup {
    return this.fb.group({
      // อายุผู้เอาประกัน
      agestart: [{ value: first ? Number(this.prospect.age) : null, disabled: first }, Validators.required],
      // จำนวนเงินเอาประกัน
      realsumrpp: [null, Validators.required]
    });
  }

  /**
   * เพิ่มทุน
   */
  private add(): void {
    const control: FormArray = <FormArray>this.ulinkSum.controls['ulinkSumArray'];
    if(control.valid){
      control.push(this.ulinkSumRows());
    }else{
      this.alertCtrl.warning(this.textAlert.pleaseKeyValue);
    }
  }

  /**
   * ลบทุน
   */
  private remove(index: number): void {
    const control: FormArray = <FormArray>this.ulinkSum.controls['ulinkSumArray'];
    let lastIndex = control.length - 1;
    if(lastIndex == index){
      this.disabledAddSumRpp = false;
    }
    control.removeAt(index);
  }

  /**
   * ล้างค่า
   */
  private reset(): void {
    if(typeof this.ulinkSum != 'undefined'){
      this.ulinkSum.controls['totalRPP'].setValue(0);
      const control: FormArray = <FormArray>this.ulinkSum.controls['ulinkSumArray'];
      while (control.length != 0) {
        control.removeAt(0)
      }
      control.push(this.ulinkSumRows(true));
    }
    
  }

   /**
   * form array เงื่อนไขการเช็คอายุ
   * @param formControlName
   * @param idx
   */
  private checkArrayAge(value: number, idx: number){
    const control = <FormArray>this.ulinkSum.controls['ulinkSumArray'];
    let prospectAge:number = Number(this.prospect.age);
    if(this.ulinkData.chooseType == 'educate'){
      if(idx == 1){
        if(value <= prospectAge){
          this.alertCtrl.warning(this.textAlert.ageNotMoreCurrent);
          control.at(idx).get('agestart').setValue(null);
        }else if(value > this.diffAge()){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          control.at(idx).get('agestart').setValue(null);
        }
      }else{
        let prevAgeStart = this.ulinkSum.value.ulinkSumArray[idx-1].agestart;
        if(value <= prevAgeStart){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          control.at(idx).get('agestart').setValue(null);
        }else if(value > this.diffAge()){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          control.at(idx).get('agestart').setValue(null);
        }
      }

      //disable button top-up
      if(value == this.diffAge()){
        this.disabledAddSumRpp = true;
      }else{
        this.disabledAddSumRpp = false;
      }
    }else{
      if(idx == 1){
        if(value <= prospectAge){
          this.alertCtrl.warning(this.textAlert.ageNotMoreCurrent);
          control.at(idx).get('agestart').setValue(null);
        }else if(value > this.ulinkData.ulinkPayment.value.mAgeend){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          control.at(idx).get('agestart').setValue(null);
        }
      }else{
        let prevAgeStart = this.ulinkSum.value.ulinkSumArray[idx-1].agestart;
        if(value <= prevAgeStart){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          control.at(idx).get('agestart').setValue(null);
        }else if(value > this.ulinkData.ulinkPayment.value.mAgeend){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          control.at(idx).get('agestart').setValue(null);
        }
      }

      //disable button top-up
      if(value == this.ulinkData.ulinkPayment.value.mAgeend){
        this.disabledAddSumRpp = true;
      }else{
        this.disabledAddSumRpp = false;
      }
    }
    control.controls.splice(idx+1);
  }

  /**
   * คำนวณอายุผู้เอาประกัน และ บุตร
   */
  private diffAge(): number{
    let ageStartChild: number = this.ulinkData.ulinkChild.value.agestart;
    let ageEndChild: number = this.ulinkData.ulinkChild.value.ageend;
    let diffAgeChild: number = ageEndChild - ageStartChild;
    let diffAge: number = Number(this.prospect.age) + diffAgeChild;
    console.log("Diff Top-up Age-->",diffAge);
    return diffAge;
  }

  /**
   * รับค่า incrementer
   */
  private changeValue(value: number, idx: number){
    const control = <FormArray>this.ulinkSum.controls['ulinkSumArray'];
    if(value < this.ulinkData.minAmountRpp){
      control.at(idx).get('realsumrpp').setValue(this.ulinkData.minAmountRpp);
    }
  }

  private setEditData(){
    let exampleBenefit : ExampleBenefitModel = this.ulinkData.getExampleBenefit();
    if(typeof exampleBenefit  != 'undefined'){
      let listExamplesumrpp: Array<ListExampleSumRpp> = exampleBenefit.listExamplesumrpp;
      let listExamplesumrppArray =  sortBy(listExamplesumrpp,'seq');
      const control = <FormArray>this.ulinkSum.controls['ulinkSumArray'];
      while (control.length !== 0) {
        control.removeAt(0);
      }
      let lastIndex = listExamplesumrppArray.length - 1;
        if(listExamplesumrppArray.length > 0){
          for(let i in listExamplesumrppArray){
            control.push(this.fb.group({
              agestart: [{ value: Number(listExamplesumrppArray[i].agestart), disabled: Number(i) == 0 ? true : false }, Validators.required],
              realsumrpp: [Number(listExamplesumrppArray[i].realsumrpp), Validators.required]
            }));
            if(Number(listExamplesumrppArray[lastIndex].agestart) == Number(exampleBenefit.ageend)){
              this.disabledAddSumRpp = true;
            }
          }
        }else{
          control.push(this.ulinkSumRows(true));
        }
    }
    this.editFinish = false;
  }
}
