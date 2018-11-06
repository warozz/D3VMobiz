import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators, FormControlName, FormControl } from '@angular/forms';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import { ExampleBenefitModel } from '../../../providers/ulink-benefit/example-benefit-model/example-benefit';
import { ListExamplepay } from '../../../providers/ulink-benefit/example-benefit-model/list-example-pay';
import { UnitlinkPremiumCalculateProvider } from '../../../providers/ulink-app-data/unitlink-premium-calculate';
import { DecimalPipe } from '@angular/common';
import sortBy from 'lodash/sortBy';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-ulink-payment',
  templateUrl: 'ulink-payment.html',
})
export class UlinkPaymentPage implements OnDestroy{
  
  private ulinkPayment: FormGroup;
  private prospect: ProspectModel = new ProspectModel;
  private subscription: Array<Subscription> = [];
  private editFinish: boolean = true;
  /**
   * ข้อความ alert
   */
  private textAlert = {
    pleaseKeyValue:' กรุณาระบุข้อมูลก่อนหน้าให้สมบูรณ์ก่อน',
    ageNotMoreCurrent:'กรุณาระบุอายุมากกว่าปัจจุบัน',
    ageNotRelevance:'ระบุอายุไม่สัมพันธ์กัน',
    minPremiumsp: 'เบี้ยประกันภัยขั้นต่ำ 100,000 บาท',
    maxPremiumsp: 'เบี้ยประกันภัยสูงสุด 30,000,000 บาท',
    minPremiumtop: 'เบี้ยเพิ่มพิเศษต้องไม่น้อยกว่า 10,000',
    maxPremiumtop: 'เบี้ยเพิ่มพิเศษต้องไม่เกิน 120,000,000 บาท/ปี',
    pleaseSelectMode: 'คุณยังไม่ได้ระบุแบบชำระเบี้ยประกันภัย'
  }

  /**
   * disable ปุ่ม เพิ่ม top-up
   */
  private disabledAddTopup: boolean = false;

  /**
   * RPP & RSP
   */
  private disableRpp: boolean = true;
  private disableRsp: boolean = true;
  private minRpp: number = 0;
  private maxRpp: number = 0;
  private maxRsp: number = 0;
  private premiumSum: number = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private ulinkData: UlinkAppDataProvider,
    private alertCtrl: AlertDirective,
    private unitlinkData: UnitlinkDataProvider,
    private premiumCalculate: UnitlinkPremiumCalculateProvider,
    private decimalPipe: DecimalPipe,
    private broadcaster: Broadcaster) {

      this.prospect = this.navParams.get('prospect');

      this.subscription.push(
        this.broadcaster.on('investBenefitResetData').subscribe(res => {
          if(this.ulinkData.chooseType == 'educate' && res){
            if(this.editFinish){
              this.clearValue();
            }
          }
          this.editFinish = true;
        })
      );

      this.ulinkPayment = this.fb.group({
        // EM (อัตราค่าเอาประกันภัยเพิ่ม)
        emrate: [null, this.ulinkData.choosePlan == 2 ? Validators.required : null],
        // ขั้นภาษีสูงสุดที่ต้องการ
        taxrate:  [null, Validators.required],
        // อายุปัจจุบัน (ปี)
        age: [{value: null, disabled: true}, this.ulinkData.choosePlan == 1 ? Validators.required : null],
        // ต้องการความคุ้มครองเริ่มต้น (ปี) table Master
        mAgestart: [{value: null, disabled: true}, this.ulinkData.chooseType != 'educate' ? Validators.required : null],
        // ต้องการความคุ้มครองถึงอายุ (ปี) table Master
        mAgeend: [null, this.ulinkData.chooseType != 'educate' ? Validators.required : null],
        // ต้องการความคุ้มครองเริ่มต้น (ปี) table Master
        agestart: [{value: null, disabled: true}],
        // ต้องการความคุ้มครองถึงอายุ (ปี) table Master
        ageend: null,
        // เบี้ยประกันภัย (Single Premium)
        premiumsp: [{value: 0, disabled: this.ulinkData.choosePlan == 1 ? false : true}, [Validators.required, Validators.min(1)]],
        // เบี้ยประกันภัย (rsp)
        premiumrpp: [{value: null, disabled: this.ulinkData.choosePlan == 2 ? false : true}, Validators.required],
        // เบี้ยประกันภัย (rpp)
        premiumrsp: null,
        // ชำระเบี้ยพิเศษ (TOP-UP Premium)
        premiumtop: null,
        // คาดว่าจะชำระเบี้ย (ปี)
        amountpayyear : [null, this.ulinkData.choosePlan == 2 ? Validators.required : null],
        // อายุสิ้นสุดการรับประกัน (ปี)
        endpayyear : [null, this.ulinkData.choosePlan == 2 ? Validators.required : null],
        // ชำระเบี้ยประกันภัย
        mode: ['', this.ulinkData.choosePlan == 2 ? Validators.required : null],
        // รวมเบี้ยประกัน
        sumpremium: [null, this.ulinkData.choosePlan == 2 ? Validators.required : null],
        ulinkPaymentArray: this.fb.array([this.ulinkPaymentRows()])
      });

      this.ulinkData.ulinkPayment = this.ulinkPayment;

      if(this.unitlinkData.editData){
        this.setEditData();
      }
  }

  private ulinkPaymentRows(): FormGroup {
    return this.fb.group({
      // รูปแบบการชำระ
      formatpay: '',
      // ต้องการความคุ้มครองเริ่มต้น (ปี)
      agestart: null,
      // ต้องการความคุ้มครองถึงอายุ (ปี)
      ageend: null,
      // เบี้ยประกันภัย (Single Premium)
      premiumsp: null,
      // เบี้ยประกันภัย (rsp)
      premiumrpp: null,
      // เบี้ยประกันภัย (rpp)
      premiumrsp: null,
      // ชำระเบี้ยพิเศษ (TOP-UP Premium)
      premiumtop: 0,
      // คาดว่าจะชำระเบี้ย (ปี)
      amountpayyear: null,
      // รวมเบี้ยประกัน
      sumpremium: null,
    });
  }
  
  public ngOnDestroy(): void {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  /**
   * เพิ่มอัตราผลตอบแทน
   */
  private add(): void {
    const control: FormArray = <FormArray>this.ulinkPayment.controls['ulinkPaymentArray'];
    let i = control.length - 1; // check previous index
    let formatpay = this.ulinkPayment.value.ulinkPaymentArray[i].formatpay;
    let agestart = this.ulinkPayment.value.ulinkPaymentArray[i].agestart;
    let ageend = this.ulinkPayment.value.ulinkPaymentArray[i].ageend;
    let premiumtop = this.ulinkPayment.value.ulinkPaymentArray[i].premiumtop;
    if(formatpay == '1' && agestart != null && ageend != null && premiumtop != 0){
      control.push(this.ulinkPaymentRows());
    }else if(formatpay == '2' && agestart != null && premiumtop != 0){
      control.push(this.ulinkPaymentRows());
    }else{
      this.alertCtrl.warning(this.textAlert.pleaseKeyValue);
    }
  }

  /**
   * ลบอัตราผลตอบแทน
   */
  private remove(index: number): void {
    const control: FormArray = <FormArray>this.ulinkPayment.controls['ulinkPaymentArray'];
    let lastIndex = control.length - 1;
    if(lastIndex == index){
      this.disabledAddTopup = false;
    }
    control.removeAt(index);
  }

  /**
   * ล้างค่า
   */
  private reset(): void {

    if(this.ulinkData.choosePlan == 1){
      if(this.ulinkData.chooseType != 'educate'){
        this.ulinkPayment.controls.mAgeend.setValue(null);
      }
      this.ulinkPayment.controls.taxrate.setValue(null);
      this.ulinkPayment.controls.premiumsp.setValue(0);
      this.ulinkPayment.controls.premiumtop.setValue(0);
    }

    if(typeof this.ulinkPayment != 'undefined'){
      const control: FormArray = <FormArray>this.ulinkPayment.controls['ulinkPaymentArray'];
      while (control.length != 0) {
        control.removeAt(0)
      }
      control.push(this.ulinkPaymentRows());
    }
    
    this.disabledAddTopup = false;
  }

  /**
   * เปลี่ยนรูปแบบการชำระ Top-Up
   * @param idx 
   */
  private changeFormatPay(value: string, idx: number) {
    const control = <FormArray>this.ulinkPayment.controls['ulinkPaymentArray'];
    if (value != '2')
      control.at(idx).get('ageend').enable();
    else {
      control.at(idx).get('ageend').setValue(null);
      control.at(idx).get('ageend').disable();
    }
    control.controls.splice(idx+1);
  }

  /**
   * เปลี่ยนรูปแบบชำระเบี้ยประกันภัย
   */
  private changeMode(value: string){
    this.ulinkPayment.controls['mode'].setValue(value);
    // ค่าต่ำสุด RPP
    this.minRpp = this.premiumCalculate.getMinByPayType(value);
    // ค่าสูงสุด RPP
    this.maxRpp = this.premiumCalculate.getMaxRpp(Number(this.prospect.age), this.prospect.gender, value);
    // Default ค่าเข้า RPP ตามแบบชำระ
    this.changeValue(this.ulinkPayment.value.premiumrpp, 'premiumrpp');
    //เปิด input RSP
    this.disableRpp = false;
  }

  /**
   * รับค่า incrementer
   * @param type
   * @param formControlName
   */
  private changeValue(value: number, formControlName: string){
    let control = this.ulinkPayment.controls[formControlName];
    if(formControlName == 'premiumsp'){
      const min = 100000;
      if(value < min){
        control.setValue(min);
      }
    }

    // คำนวณเบี้ย Rpp
    if(formControlName == 'premiumrpp'){
      let minAlert = 'เบี้ยประกันภัยเพื่อความคุ้มครอง (RPP) ขั้นต่ำ '+this.decimalPipe.transform(this.minRpp)+' บาท';
      let maxAlert = 'เบี้ยประกันภัยเพื่อความคุ้มครอง (RPP) สูงสุด '+this.decimalPipe.transform(this.maxRpp)+' บาท';
      if(value < this.minRpp){
        this.alertCtrl.warning(minAlert);
        control.setValue(this.minRpp);
      }else if(value > this.maxRpp){
        this.alertCtrl.warning(maxAlert);
        control.setValue(this.maxRpp);
      }
      this.broadcaster.broadcast('investBenefitResetData', true);
      this.disableRsp = false;
    }
    
    // คำนวณเบี้ย Rsp
    this.maxRsp = this.premiumCalculate.getMaxRsp(this.ulinkPayment.value.premiumrpp);
    if(formControlName == 'premiumrsp'){
      let minAlert = 'เบี้ยประกันภัยเพื่อการออม (RSP) ขั้นต่ำ '+this.decimalPipe.transform(this.minRpp)+' บาท';
      let maxAlert = 'เบี้ยประกันภัยเพื่อการออม (RSP) สูงสุด '+this.decimalPipe.transform(this.maxRsp)+' บาท';
      if(value < this.minRpp){
        this.alertCtrl.warning(minAlert);
        control.setValue(this.minRpp);
      }else if(value > this.maxRsp){
        this.alertCtrl.warning(maxAlert);
        control.setValue(this.maxRsp);
      }
    }

    //คำนวนเบี้ย Top-UP
    if(formControlName == 'premiumtop'){
      let minAlert = 'เบี้ยเพิ่มพิเศษขั้นต่ำ '+this.decimalPipe.transform(this.minRpp)+' บาท';
      let maxAlert = 'เบี้ยเพิ่มพิเศษสูงสุด 120,000,000 บาท';
      if(value < this.minRpp){
        this.alertCtrl.warning(minAlert);
        control.setValue(this.minRpp);
      }else if(value > 120000000){
        this.alertCtrl.warning(maxAlert);
        control.setValue(120000000);
      }
    }
    
    if(this.ulinkData.choosePlan == 1){
      this.premiumSum = Number(this.ulinkPayment.value.premiumsp) + Number(this.ulinkPayment.value.premiumtop);
    }else if(this.ulinkData.choosePlan == 2){
      this.premiumSum = Number(this.ulinkPayment.value.premiumrpp) + Number(this.ulinkPayment.value.premiumrsp) + Number(this.ulinkPayment.value.premiumtop);
    }
    this.ulinkData.quotationSum = this.premiumSum;
    this.ulinkData.premiumPerYear = this.premiumCalculate.premiumPerYear(this.ulinkPayment.value.premiumrpp, this.ulinkPayment.value.mode);
    this.ulinkData.minAmountRpp = this.premiumCalculate.getMinByAge(Number(this.prospect.age), this.ulinkData.premiumPerYear);
    this.ulinkData.maxAmountRpp = this.premiumCalculate.getMaxByAgeAndGender(Number(this.prospect.age), this.ulinkData.premiumPerYear, this.prospect.gender);
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
   * เช็คต้องการความคุ้มครองอายุ
   */
  private checkAge(value: number, formControlName: string){
    let expactedPayYear = (value - Number(this.prospect.age)) + 1; // คำนวณคาดว่าจะชำระประกันภัย (ปี)
    let expectedAgeEnd = (value + Number(this.prospect.age)) - 1; // คำนวณอายุสิ้นสุดการรับประกัน
    if(this.ulinkData.chooseType == 'educate'){
      let rangeAge = (this.diffAge() - Number(this.prospect.age)) + 1; // หาช่วงระว่างอายุของผู้มุ่งหวัง
      if(formControlName == 'endpayyear'){
        if(value < Number(this.prospect.age)){
          this.alertCtrl.warning(this.textAlert.ageNotMoreCurrent);
          this.ulinkPayment.controls['endpayyear'].setValue(null);
          this.ulinkPayment.controls['amountpayyear'].setValue(null);
        }else if(value > this.diffAge()){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          this.ulinkPayment.controls['endpayyear'].setValue(null);
          this.ulinkPayment.controls['amountpayyear'].setValue(null);
        }else{
          this.ulinkPayment.controls['endpayyear'].setValue(value);
          this.ulinkPayment.controls['amountpayyear'].setValue(expactedPayYear);
        }
      }else if(formControlName == 'amountpayyear'){
        if(value > rangeAge || value == 0){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          this.ulinkPayment.controls['amountpayyear'].setValue(null);
          this.ulinkPayment.controls['endpayyear'].setValue(null);
        }else{
          this.ulinkPayment.controls['amountpayyear'].setValue(value);
          this.ulinkPayment.controls['endpayyear'].setValue(expectedAgeEnd);
        }
      }
    }else{
      let rangeAge = (this.ulinkPayment.value.mAgeend - Number(this.prospect.age)) + 1; // หาช่วงระว่างอายุของผู้มุ่งหวัง
      if(formControlName == 'mAgeend'){
        this.broadcaster.broadcast('investBenefitResetData', true);
        if(value <= Number(this.prospect.age)){
          this.alertCtrl.warning(this.textAlert.ageNotMoreCurrent);
          this.ulinkPayment.controls['mAgeend'].setValue(null);
        }
      }else if(formControlName == 'endpayyear'){
        if(value < Number(this.prospect.age)){
          this.alertCtrl.warning(this.textAlert.ageNotMoreCurrent);
          this.ulinkPayment.controls['endpayyear'].setValue(null);
          this.ulinkPayment.controls['amountpayyear'].setValue(null);
        }else if(value > this.ulinkPayment.value.mAgeend){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          this.ulinkPayment.controls['endpayyear'].setValue(null);
          this.ulinkPayment.controls['amountpayyear'].setValue(null);
        }else{
          this.ulinkPayment.controls['endpayyear'].setValue(value);
          this.ulinkPayment.controls['amountpayyear'].setValue(expactedPayYear);
        }
      }else if(formControlName == 'amountpayyear'){
        if(value > rangeAge || value == 0){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          this.ulinkPayment.controls['amountpayyear'].setValue(null);
          this.ulinkPayment.controls['endpayyear'].setValue(null);
        }else{
          this.ulinkPayment.controls['amountpayyear'].setValue(value);
          this.ulinkPayment.controls['endpayyear'].setValue(expectedAgeEnd);
        }
      }
    }
  }

  /**
   * form array เงื่อนไขการเช็คอายุ
   * @param formControlName 
   * @param idx
   */
  private checkArrayAge(value: number, formControlName: string, idx: number){
    const control = <FormArray>this.ulinkPayment.controls['ulinkPaymentArray'];
    let prospectAge:number = Number(this.prospect.age);
    if(this.ulinkData.chooseType == 'educate'){
      if(formControlName == 'agestart'){
        if(idx == 0){
          if(value <= prospectAge){
            this.alertCtrl.warning(this.textAlert.ageNotMoreCurrent);
            control.at(idx).get(formControlName).setValue(null);
          }else if(value > this.diffAge()){
            this.alertCtrl.warning(this.textAlert.ageNotRelevance);
            control.at(idx).get(formControlName).setValue(null);
          }
        }else{
          let prevFormatpay = this.ulinkPayment.value.ulinkPaymentArray[idx-1].formatpay;
          let prevAgeStart = this.ulinkPayment.value.ulinkPaymentArray[idx-1].agestart;
          let prevAgeEnd = this.ulinkPayment.value.ulinkPaymentArray[idx-1].ageend;
          if(prevFormatpay == '1'){
            if(value <= prevAgeEnd){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);
              control.at(idx).get(formControlName).setValue(null);
            }else if(value > this.diffAge()){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);
              control.at(idx).get(formControlName).setValue(null);
            }
          }else if(prevFormatpay == '2'){
            if(value <= prevAgeStart){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);
              control.at(idx).get(formControlName).setValue(null);
            }else if(value > this.diffAge()){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);
              control.at(idx).get(formControlName).setValue(null);
            }
          }
        }
        control.at(idx).get('ageend').setValue(null);
      }else if(formControlName == 'ageend'){
        if(this.ulinkPayment.value.ulinkPaymentArray[idx].agestart != null){
          if(value <= this.ulinkPayment.value.ulinkPaymentArray[idx].agestart){
            this.alertCtrl.warning(this.textAlert.ageNotRelevance);
            control.at(idx).get(formControlName).setValue(null);
          }else if(value > this.diffAge()){
            this.alertCtrl.warning(this.textAlert.ageNotRelevance);
            control.at(idx).get(formControlName).setValue(null);
          }
        }else{
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          control.at(idx).get(formControlName).setValue(null);
        }
      }

      //disable button top-up
      if(value == this.diffAge()){
        this.disabledAddTopup = true;
      }else{
        this.disabledAddTopup = false;
      }
    }else{
      if(formControlName == 'agestart'){
        if(idx == 0){
          if(value <= prospectAge){
            this.alertCtrl.warning(this.textAlert.ageNotMoreCurrent);
            control.at(idx).get(formControlName).setValue(null);
          }else if(value > this.ulinkPayment.value.mAgeend){
            this.alertCtrl.warning(this.textAlert.ageNotRelevance);
            control.at(idx).get(formControlName).setValue(null);
          }
        }else{
          let prevFormatpay = this.ulinkPayment.value.ulinkPaymentArray[idx-1].formatpay;
          let prevAgeStart = this.ulinkPayment.value.ulinkPaymentArray[idx-1].agestart;
          let prevAgeEnd = this.ulinkPayment.value.ulinkPaymentArray[idx-1].ageend;
          if(prevFormatpay == '1'){
            if(value <= prevAgeEnd){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);
              control.at(idx).get(formControlName).setValue(null);
            }else if(value > this.ulinkPayment.value.mAgeend){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);
              control.at(idx).get(formControlName).setValue(null);
            }
          }else if(prevFormatpay == '2'){
            if(value <= prevAgeStart){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);
              control.at(idx).get(formControlName).setValue(null);
            }else if(value > this.ulinkPayment.value.mAgeend){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);
              control.at(idx).get(formControlName).setValue(null);
            }
          }
        }
        control.at(idx).get('ageend').setValue(null);
      }else if(formControlName == 'ageend'){
        if(this.ulinkPayment.value.ulinkPaymentArray[idx].agestart != null){
          if(value <= this.ulinkPayment.value.ulinkPaymentArray[idx].agestart){
            this.alertCtrl.warning(this.textAlert.ageNotRelevance);
            control.at(idx).get(formControlName).setValue(null);
          }else if(value > this.ulinkPayment.value.mAgeend){
            this.alertCtrl.warning(this.textAlert.ageNotRelevance);
            control.at(idx).get(formControlName).setValue(null);
          }
        }else{
          this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          control.at(idx).get(formControlName).setValue(null);
        }
      }

      //disable button top-up
      if(value == this.ulinkPayment.value.mAgeend){
        this.disabledAddTopup = true;
      }else{
        this.disabledAddTopup = false;
      }
    }
    control.controls.splice(idx+1);
  }

  /**
   * function edit data
   */
  private setEditData(){
    let exampleBenefit : ExampleBenefitModel = this.ulinkData.getExampleBenefit();
    if(typeof exampleBenefit  != 'undefined'){
      let listExamplepay: Array<ListExamplepay> = exampleBenefit.listExamplepay;
      let listExamplepayArray =  sortBy(listExamplepay,'seq');
      let control = <FormArray>this.ulinkPayment.controls['ulinkPaymentArray'];
      while (control.length !== 0) {
        control.removeAt(0);
      }
      let lastIndex = listExamplepayArray.length - 1;
      let i;
      for (i = 0; i < listExamplepayArray.length; i++){
        if(i == 0){
          this.ulinkPayment.patchValue({
            mAgeend: Number(exampleBenefit.ageend),
            emrate: exampleBenefit.emrate,
            taxrate: exampleBenefit.taxrate,
            amountpayyear: Number(listExamplepayArray[0].amountpayyear),
            endpayyear: Number(listExamplepayArray[0].endpayyear),
            mode: listExamplepayArray[0].mode,
            premiumsp: Number(listExamplepayArray[0].premiumsp),
            premiumtop: Number(listExamplepayArray[0].premiumtop),
            premiumrpp: Number(listExamplepayArray[0].premiumrpp),
            premiumrsp: Number(listExamplepayArray[0].premiumrsp)
          });
        }else{
          control.push(this.fb.group({
            formatpay: listExamplepayArray[i].formatpay,
            agestart: Number(listExamplepayArray[i].agestart),
            ageend: Number(listExamplepayArray[i].ageend),
            premiumtop: Number(listExamplepayArray[i].premiumtop),
          }));

          if(Number(listExamplepayArray[lastIndex].agestart) == Number(exampleBenefit.ageend) || Number(listExamplepayArray[lastIndex].ageend) == Number(exampleBenefit.ageend)){
            this.disabledAddTopup = true;
          }
        }
      }

      //enable เบี้ยประกันเมื่อทุน rpp ไม่เท่ากับ 0
      if(listExamplepayArray[0].premiumrpp != '0'){
        // ค่าต่ำสุด RPP
        this.minRpp = this.premiumCalculate.getMinByPayType(listExamplepayArray[0].mode);
        // ค่าสูงสุด RPP
        this.maxRpp = this.premiumCalculate.getMaxRpp(Number(this.prospect.age), this.prospect.gender, listExamplepayArray[0].mode);
        // ค่าสูงสุด RSP
        this.maxRsp = this.premiumCalculate.getMaxRsp(Number(listExamplepayArray[0].premiumrpp));
        this.disableRpp = false;
        this.disableRsp = false; 
      }

      //set ค่า min-max คำนวณเงินเอาประกัน เข้า provider
      if(this.ulinkData.choosePlan == 1){
        this.premiumSum = Number(listExamplepayArray[0].premiumsp) + Number(listExamplepayArray[0].premiumtop);
      }else if(this.ulinkData.choosePlan == 2){
        this.premiumSum = Number(listExamplepayArray[0].premiumrpp) + Number(listExamplepayArray[0].premiumrsp) + Number(listExamplepayArray[0].premiumtop);
      }
      this.ulinkData.quotationSum = this.premiumSum;
      this.ulinkData.premiumPerYear = this.premiumCalculate.premiumPerYear(Number(listExamplepayArray[0].premiumrpp), listExamplepayArray[0].mode);
      this.ulinkData.minAmountRpp = this.premiumCalculate.getMinByAge(Number(this.prospect.age), this.ulinkData.premiumPerYear);
      this.ulinkData.maxAmountRpp = this.premiumCalculate.getMaxByAgeAndGender(Number(this.prospect.age), this.ulinkData.premiumPerYear, this.prospect.gender);
    }
    this.editFinish = false;
  }

  /**
   * clear all data
   */
  private clearValue(): void{
    // this.ulinkPayment.reset();
    if(typeof this.ulinkPayment != 'undefined'){
      this.ulinkPayment.controls['endpayyear'].setValue(null);
    this.ulinkPayment.controls['amountpayyear'].setValue(null);
    }
    
    this.reset();
    this.disableRpp = true;
    this.disableRsp = true;
  }
}