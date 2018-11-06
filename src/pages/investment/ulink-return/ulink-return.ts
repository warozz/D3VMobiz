import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { Subscription } from 'rxjs';

import { AlertDirective } from './../../../directives/extends/alert/alert';
import { ListExampleProfit } from '../../../providers/ulink-benefit/example-benefit-model/list-excample-profit';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import { ExampleBenefitModel } from '../../../providers/ulink-benefit/example-benefit-model/example-benefit';


import sortBy from 'lodash/sortBy';
/**
 * Generated class for the UlinkReturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ulink-return',
  templateUrl: 'ulink-return.html',
})
export class UlinkReturnPage {

  private ulinkReturn: FormGroup;

  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private prospect: ProspectModel;

  /**
   * ข้อมูลบุตรในอุปการะ
   */
  private ulinkChild;

  // ปุ่ม (เปิด/ปิด) ปรับอัตราผลตอบแทน
  private btnAddArrYield: boolean = false;

  // maxAge
  private maxAge:number = 0;

  // maxChildAge
  private maxChildAge:number = 0;

  private subscription: Array<Subscription> = [];

  private editFinish: boolean = true;

  // text ที่แสดงใน Alert
  private textAlert = {
    pleaseKeyValue:' กรุณาระบุข้อมูลก่อนหน้าให้สมบูรณ์ก่อน',
    ageNotMoreCurrent:'กรุณาระบุอายุมากกว่าปัจจุบัน',
    ageNotRelevance:'ระบุอายุไม่สัมพันธ์กัน',
    And: 'และ',
  }

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private alertCtrl: AlertDirective,
    private ulinkData: UlinkAppDataProvider,
    private unitlinkData: UnitlinkDataProvider,
    private broadcaster: Broadcaster

  ) {
      this.prospect = this.navParams.get('prospect');
      // เอาข้อมูลจากหน้า step ข้อมูลบุตรในอุปการะ
      this.ulinkChild = this.ulinkData.ulinkChild;

      this.subscription.push(
        this.broadcaster.on('investBenefitResetData').subscribe(res => {
          if(res){
            if(this.editFinish){
              console.log('investBenefitResetData use in ulink return ====> ',true);
              this.resetData();
            }
            this.editFinish = true;
          }
        })
      );
  }

  /*
    init
  */
  ngOnInit(): void {

    this.ulinkReturn = this.fb.group({
      ulinkReturnArray: this.fb.array([this.ulinkReturnRows(true)])
    });

    if(this.unitlinkData.editData){
      this.setEditData();
    }

    //เมื่อมีการ ใส่ข้อมูลใน tab ข้อมูลบุตรในอุปการะ ให้เอาข้อมูลมาใส่ ในส่วนของ อายุบุตร (ปี)
    if(this.ulinkData.ulinkChild){
      this.ulinkData.ulinkChild.get('agestart').valueChanges.subscribe(agestart => {
        this.updateChildAge(agestart);
      });
    }

    //เมื่อมีการ ใส่ข้อมูลใน tab การชำระเบี้ยประกันภัย ให้เอาข้อมูลมาใส่ ในส่วนของ อายุที่เริ่มผลตอบแทน (ปี)
    if(this.ulinkData.ulinkPayment){
      this.ulinkData.ulinkPayment.get('mAgeend').valueChanges.subscribe(mAgeend => {
        this.maxAge = mAgeend;
      });
    }

    this.ulinkData.ulinkReturn = this.ulinkReturn;
  }

  ngDoCheck() {
    const { ulinkReturnArray } = this.ulinkReturn.getRawValue();
    if(ulinkReturnArray && ulinkReturnArray.length > 0){
        //เมื่อมีการ ใส่ข้อมูลวันเกิด ให้เอาข้อมูลมาใส่ ในส่วนของ อายุที่เริ่มผลตอบแทน (ปี)
        if(this.prospect.age !== ulinkReturnArray[0].agestart){
          let form = this.ulinkReturn.get(['ulinkReturnArray', 0, 'agestart']) as FormControl;
          form.setValue(this.prospect.age);
         }
    }
  }
  public ngOnDestroy(): void {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }


  /**
   * อัพเดทข้อมูล อายุบุตร (ปี)
   */
  private updateChildAge(agestart) {
    const { ulinkReturnArray } = this.ulinkReturn.getRawValue();
        if(ulinkReturnArray && ulinkReturnArray.length > 0){
          if(agestart && agestart !== ulinkReturnArray[0].agechild){
            let form = this.ulinkReturn.get(['ulinkReturnArray', 0, 'agechild']) as FormControl;
            form.setValue(agestart);

            this.maxChildAge = Number(this.ulinkData.ulinkChild.controls.ageend.value);
            let diffAge = this.calAgeDifference(agestart,this.maxChildAge)
            this.maxAge = Number(this.prospect.age) + Number(diffAge);
          }
        }
  }

  /**
   * Reset ข้อมูล เมื่อมีการแก้ไข เกี่ยวกับอายุ
   */
  private resetData() {

    if(this.ulinkReturn){
      // ค่าใน form เดิม
    const form = <FormArray>this.ulinkData.ulinkReturn.controls['ulinkReturnArray'];
    // เปิดปุ่ม เพิ่มอัตราผลตอบแทน
    this.btnAddArrYield = false;

    // ลบข้อมูลใน form ทั้งหมด
    form.controls.splice(0);
    form.reset();

    //สร้าง Form ข้อมูลใหม่
    form.push(this.ulinkReturnRows(true));
    form.updateValueAndValidity();

    // หลังจาก resetData แล้ว
    //เมื่อมีการ ใส่ข้อมูลใน tab ข้อมูลบุตรในอุปการะ ให้เอาข้อมูลมาใส่ ในส่วนของ อายุบุตร (ปี)
    if(this.ulinkData.chooseType === 'educate'){
      if(this.ulinkData.ulinkChild){
          const { agestart } = this.ulinkData.ulinkChild.getRawValue();
          this.updateChildAge(agestart);
        }
      }
    }
  }

  private ulinkReturnRows(first: boolean = false): FormGroup {
    return this.fb.group({
      // อายุที่เริ่มผลตอบแทน
      agestart: [{ value: first ? Number(this.prospect.age) : null, disabled: first }, Validators.required],
      // อายุบุตร *** ให้ดึงจากบุตรมา default ในชุดแรก
      agechild: [{ value: null, disabled: this.ulinkData.chooseType != 'educate' ? true : first }, Validators.required],
      // ผลตอบแทนที่คาดหวัง
      ratebenefit: [null, Validators.required]
    });
  }

  /**
   * เพิ่มอัตราผลตอบแทน
   */
  private add(): void {
    const control: FormArray = <FormArray>this.ulinkReturn.controls['ulinkReturnArray'];
    if(control.valid){
      control.push(this.ulinkReturnRows());
    }else{
      this.alertCtrl.warning(this.textAlert.pleaseKeyValue);
    }
  }

  /**
   * ลบอัตราผลตอบแทน
   */
  private remove(index: number): void {
    const control = <FormArray>this.ulinkReturn.controls['ulinkReturnArray'];
    control.removeAt(index);
    control.updateValueAndValidity();

    //Update Display ปุ่ม ปรับอัตราผลตอบแทน
    const { ulinkReturnArray } = this.ulinkReturn.getRawValue();
    // let agechild = ulinkReturnArray[index-1].agechild;
    // this.checkDisableAdd(agechild,this.ulinkData.chooseType);

    let listExampleProfit = [];

    if(this.ulinkData.chooseType === 'educate'){
      listExampleProfit =  sortBy(ulinkReturnArray,'agechild');
      let agechild = Number(listExampleProfit[listExampleProfit.length-1].agechild);
      this.checkDisableAdd(agechild,this.ulinkData.chooseType);

    }else{
      listExampleProfit =  sortBy(ulinkReturnArray,'agestart');
      let agestart = Number(listExampleProfit[listExampleProfit.length-1].agestart);
      this.checkDisableAdd(agestart,this.ulinkData.chooseType);
    }


  }

  /**
   * ล้างค่า
   */
  private reset(): void {
    const form = <FormArray>this.ulinkReturn.controls['ulinkReturnArray'];
    this.btnAddArrYield = false;
    form.controls.splice(1);
    form.updateValueAndValidity();
  }

  /**
   * เช็คส่วนต่างของอายุุ
   * @param ageStart อายุเริ่มต้น
   * @param ageEnd อายุสิ้นสุด
   */
  private calAgeDifference(ageStart:number,ageEnd:number){
    if(ageStart && ageEnd){
      return Math.abs(ageStart - ageEnd) ;
    }else{
      return '';
    }
  }

  /**
   * เช็คส่วนต่างของอายุุ
   *  @param val ค่าของ calculator
   *  @param controlName ชื่อของตัวแปร ใน Form
   *  @param index ตำแหน่งของ Array ใน Form
  */
  private calculatorChange(val:number,controlName:string,index):void{

    //ข้อมูล อัตราผลตอบแทน ตาม index
    const form = this.ulinkReturn.get(['ulinkReturnArray', index, controlName]) as FormControl;

    // อัตราผลตอบแทนใน form ทั้งหมด
    const spliceForm = <FormArray>this.ulinkReturn.controls.ulinkReturnArray;

    // ค่าอัตราผลตอบแทนใน form ทั้งหมด
    const { ulinkReturnArray } = this.ulinkReturn.getRawValue();

    if(val){
      if(controlName === 'agestart'){

        let ageStart = ulinkReturnArray[index-1].agestart;
        let diffAge = this.calAgeDifference(ageStart,val);

        //อายุที่เริ่มผลตอบแทน (ปี)
        let agechildFrist;
        if(this.ulinkData.chooseType === 'educate'){
          agechildFrist = ulinkReturnArray[index-1].agechild;
        }else{
          agechildFrist = ulinkReturnArray[index-1].agestart;
        }
        let sumAge:number = Number(agechildFrist) + Number(diffAge);

        let ageChildForm = this.ulinkReturn.get(['ulinkReturnArray', index, 'agechild']);

        if(sumAge !== ulinkReturnArray[index].agechild){
          let msgAlert = [] ;
          if(val <= Number(this.prospect.age)){
            msgAlert.push(this.textAlert.ageNotMoreCurrent);

          }

          if(val <= Number(ulinkReturnArray[index-1].agestart)){
            //ระบุอายุไม่สัมพันธ์กัน
            msgAlert.push(this.textAlert.ageNotRelevance);
          }

          if(msgAlert && msgAlert.length !== 0){
            this.alertCtrl.warning(msgAlert.join(this.textAlert.And).toString());
            // form.reset();
            form.setValidators([
              Validators.required,
              Validators.minLength(Number(ulinkReturnArray[index-1].agestart)),
              Validators.maxLength(
                //
                this.checkIndexLast(index , ulinkReturnArray)
                ? this.maxAge
                : Number(ulinkReturnArray[index+1].agestart)
              )
            ]);
            // form.setValue(Number(ulinkReturnArray[index-1].agestart)+Number(1));
            form.setValue(null);
            form.updateValueAndValidity();

            if(this.ulinkData.chooseType === 'educate'){
              ageChildForm.setValidators([
                Validators.required,
                Validators.minLength(Number(ulinkReturnArray[index-1].agechild)),
                Validators.maxLength(
                  //
                  this.checkIndexLast(index , ulinkReturnArray)
                  ? this.maxChildAge
                  : Number(ulinkReturnArray[index+1].agechild)
                )
              ]);
              // ageChildForm.setValue(Number(ulinkReturnArray[index-1].agechild)+Number(1));
              ageChildForm.setValue(null);
              ageChildForm.updateValueAndValidity();
            }

          }else{

            //เช็ค ปรับอัตราผลตอบแทน
            if(this.checkDisableAdd(sumAge,this.ulinkData.chooseType)){
              this.alertCtrl.warning(this.textAlert.ageNotRelevance);

              form.setValidators([
                Validators.required,
                Validators.minLength(Number(ulinkReturnArray[index-1].agestart)),
                Validators.maxLength(
                  //
                  this.checkIndexLast(index , ulinkReturnArray)
                  ? this.maxAge
                  : Number(ulinkReturnArray[index+1].agestart)
                )
              ]);
              // form.setValue(Number(ulinkReturnArray[index-1].agestart)+Number(1));
              form.setValue(null);
              form.updateValueAndValidity();

            }

            // เช็คเมื่อมี ทุนการศึกษาให้กับบุตรหลาน
            if(this.ulinkData.chooseType === 'educate'){
              ageChildForm.setValidators([
                Validators.required,
                Validators.minLength(Number(ulinkReturnArray[index-1].agechild)),
                Validators.maxLength(
                  //
                  this.checkIndexLast(index , ulinkReturnArray)
                  ? this.maxChildAge
                  : Number(ulinkReturnArray[index+1].agechild)
                )
              ]);
              ageChildForm.setValue(sumAge);
              ageChildForm.updateValueAndValidity();
            }
          }
          // spliceForm.controls.splice(index+1);
        }

      } else if(controlName === 'agechild'){

        let ageStart = ulinkReturnArray[index-1].agechild;
        let diffAge = this.calAgeDifference(ageStart,val);

        //อายุที่เริ่มผลตอบแทน (ปี)
        let agechildFrist = ulinkReturnArray[index-1].agestart;
        let sumAge:number = Number(agechildFrist) + Number(diffAge);

        let ageStartForm = this.ulinkReturn.get(['ulinkReturnArray', index, 'agestart']);

        if(sumAge !== ulinkReturnArray[index].agestart){
          let msgAlert = [] ;
          if(val <= Number(ulinkReturnArray[0].agechild)){
            msgAlert.push(this.textAlert.ageNotMoreCurrent);
          }
          if(val <= Number(ulinkReturnArray[index-1].agechild) || val > this.maxAge){
            //ระบุอายุไม่สัมพันธ์กัน
            msgAlert.push(this.textAlert.ageNotRelevance);
          }

          //เช็ค ปรับอัตราผลตอบแทน
          if(this.checkDisableAdd(val,this.ulinkData.chooseType)){
            this.alertCtrl.warning(this.textAlert.ageNotRelevance);
          }

          if(msgAlert && msgAlert.length !== 0){
            this.alertCtrl.warning(msgAlert.join(this.textAlert.And).toString());
            // form.reset();
            form.setValidators([
              Validators.required,
              Validators.minLength(Number(ulinkReturnArray[index-1].agechild)),
              Validators.maxLength(
                //
                this.checkIndexLast(index , ulinkReturnArray)
                ? this.maxChildAge
                : Number(ulinkReturnArray[index+1].agechild)
              )
            ]);
            // form.setValue(Number(ulinkReturnArray[index-1].agechild)+1);
            form.setValue(null);
            form.updateValueAndValidity();

            ageStartForm.setValidators([
                  Validators.required,
                  Validators.minLength(Number(ulinkReturnArray[index-1].agestart)),
                  Validators.maxLength(
                    //
                    this.checkIndexLast(index , ulinkReturnArray)
                    ? this.maxAge
                    : Number(ulinkReturnArray[index+1].agestart)
                  )
            ]);
            // ageStartForm.setValue(Number(ulinkReturnArray[index-1].agestart)+Number(1));
            ageStartForm.setValue(null);
            ageStartForm.updateValueAndValidity();
          }else{

            ageStartForm.setValidators([
                  Validators.required,
                  Validators.minLength(Number(ulinkReturnArray[index-1].agestart)),
                  Validators.maxLength(
                    //
                    this.checkIndexLast(index , ulinkReturnArray)
                    ? this.maxAge
                    : Number(ulinkReturnArray[index+1].agestart)
                  )
            ]);
            ageStartForm.setValue(Number(sumAge));
            ageStartForm.updateValueAndValidity();

          }
          // spliceForm.controls.splice(index+1);
        }

      }
    }
    // console.log('spliceForm',spliceForm);
  }

  /**
   * เช็คปุ่มเปิด / ปิด  (+ปรับอัตราผลตอบแทน)
   *  @param sumAge ค่าของ อายุบุตร
   *  @param chooseType ค่าของ ประเภท แบบประกัน
  */
  private checkDisableAdd(sumAge:number = 0 ,chooseType:string = 'educate'){

    let maxAgeEnd:number = chooseType === 'educate'
        ? Number(this.ulinkData.ulinkChild.controls.ageend.value)
        : Number(this.maxAge);

    if(Number(sumAge) > maxAgeEnd){
      this.btnAddArrYield = true;
      return true;
    }else if(Number(sumAge) < maxAgeEnd){
      this.btnAddArrYield = false;
      return false;
    }else if(Number(sumAge) === maxAgeEnd){
      this.btnAddArrYield = true;
      return false;
    }
  }

  /**
   * set ข้อมูลตอน Edit
  */
  private setEditData() {
    // console.log('set Edit Data ---> listExampleProfit');
    let exampleBenefit : ExampleBenefitModel = this.ulinkData.getExampleBenefit();
    if(typeof exampleBenefit  != 'undefined'){

        // ข้อมูล listExampleProfit จาก service
        let listExampleProfitData: Array<ListExampleProfit> = exampleBenefit.listExampleprofit;

        let listExampleProfit =  sortBy(listExampleProfitData,'seq');

        // clear array form control
        const form = <FormArray>this.ulinkReturn.controls['ulinkReturnArray'];
        form.controls.splice(0);

        //check max age
        if(this.ulinkData.chooseType !== 'educate' ){
          this.maxAge = Number(exampleBenefit.ageend)
        }

        //วนลูปใส่ค่าใน form
        for (let index in listExampleProfit) {
          let agestart = listExampleProfit[index].agestart || null;
          let agechild = listExampleProfit[index].agechild || null;
          let ratebenefit = listExampleProfit[index].ratebenefit || null;

          let formIndex = this.fb.group({
            // อายุที่เริ่มผลตอบแทน
            agestart: [{ value: agestart, disabled: Number(index) === 0 ? true : false }, Validators.required],
            // อายุบุตร *** ให้ดึงจากบุตรมา
            agechild: [{ value: agechild, disabled: this.ulinkData.chooseType != 'educate' ? true : Number(index) === 0 ? true : false }, Validators.required],
            // ผลตอบแทนที่คาดหวัง
            ratebenefit: [ratebenefit, Validators.required]
          });
          form.push(formIndex);


          //update เช็คปุ่มเปิด / ปิด  (+ปรับอัตราผลตอบแทน)
          if(Number(index) === Number(listExampleProfit.length - 1)){
            if(this.ulinkData.chooseType === 'educate' ){
              this.checkDisableAdd(agechild,this.ulinkData.chooseType);
            }else{
              this.checkDisableAdd(agestart,this.ulinkData.chooseType);
            }
          }

        }

        this.editFinish = false;
        // console.log('form',form.getRawValue());
    }
  }

  // เช็ค array Index สุดท้ายหรือไม่ ?
  checkIndexLast(index:number,dataList = []){
    if(dataList && (dataList.length -1) === index){
      return true;
    }else{
      return false;
    }
  }

  /**
   * getValue ใน form
  */
  getValue(index:number,controlName:string){
    const { ulinkReturnArray } =  this.ulinkReturn.getRawValue();
    return Number(ulinkReturnArray[index][controlName]) === 0
            ? ''
            : Number(ulinkReturnArray[index][controlName]);
  }

}
