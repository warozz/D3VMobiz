import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { Subscription } from 'rxjs';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import { ExampleBenefitModel } from '../../../providers/ulink-benefit/example-benefit-model/example-benefit';
import { ListExamplewithdraw } from '../../../providers/ulink-benefit/example-benefit-model/list-example-withdraw';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import sortBy from 'lodash/sortBy';

@IonicPage()
@Component({
  selector: 'page-ulink-withdraw',
  templateUrl: 'ulink-withdraw.html',
})
export class UlinkWithdrawPage {

  private ulinkWithdraw: FormGroup;

  /**
   * เปิด collapse
   */
  private open: Array<boolean> = [false, false];

  private bachelorDegrees: boolean = true;
  private masterDegrees: boolean = true;
  private editFinish: boolean = true;

  private ageStartProspect: number = 0;

   /**
   * disable ปุ่ม เพิ่ม top-up
   */
  private disabledAddTopup: boolean = false;
  private listExampleWitdraw:Array<ListExamplewithdraw>;
  
/** 
 * ตัวเเปรสำหรับ tab ถอน ที่มาจาก dropdown เกษียรอายุ 
 @param valueRetire
*/

private valueRetire = {
   ageStartReword: 0,
   ageStartPension: 0,//อายุเริ่มต้นของบำนาญ
   policyyearStartReword:0,// ปีกรมธรรม์บำเหน็จ
   policyyearStartPension:0,// ปีกรมธรรม์บำนาญ
   ageEndProspect:0
}

private valueSelf = {
  ageStart: 0,
  ageEnd:0,
  policyyearStart:0,// ปีกรมธรรม์
  policyyearEnd:0,// ปีกรมธรรม์
  ageEndProspect:0,
  minAge:0//min ฮายุ เวลาเพิ่ม row
}


  // apiProvider: any;
  private subscription: Array<Subscription> = [];

  private textAlert = {
    ageLessthanProspect:'ระบุอายุน้อยกว่าปัจจุบัน',
    ageMoreThanAgeEnd:'ระบุอายุเกินความคุ้มครอง',
    ageNotRelevance:'ระบุอายุไม่สัมพันธ์กัน',
    agePensionMoreThanAgeEnd:'อายุบำเหน็จมีผลให้อายุบำนาญเกินความคุ้มครอง',
    pleaseKeyValue:' กรุณาระบุข้อมูลก่อนหน้าให้สมบูรณ์ก่อน'
  }

  private sumwithdrawTxt: string = 'การถอนเงินต้องไม่น้อยกว่า 10,000 บาท';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private ulinkData: UlinkAppDataProvider,
    private unitlinkData: UnitlinkDataProvider,
    private alertCtrl: AlertDirective,
    private broadcaster: Broadcaster) {
      this.ageStartProspect =  Number(this.ulinkData.prospect.age);
      this.defaultData();

      this.subscription.push(
        this.broadcaster.on('investBenefitResetData').subscribe(res => {
          if(res){
            if(this.editFinish){
              this.resetData();
            }
          
            this.editFinish = true;
            
          }
        })
      );

      if(this.unitlinkData.editData){
        this.setEditData();
      }
  }
  
  private chkAgeStart(control, data: number ,i: number){//บำนาญ

    if (this.ulinkData.chooseType == 'retire') {
      this.chkAgeRetire(control, data);
    } else if(this.ulinkData.chooseType == 'self') {
      this.chkAgeStartSelf(control, data,i);
    }

    //cal AV
    this.AV();
  }

  private chkAgeRetire(control, data){//บำนาญ
  
    this.valueRetire.ageStartPension = data;
    let policyyearstart:number = this.getPolicyyearstart(data);
    
    control.get('agestart').setValue( this.valueRetire.ageStartPension);
    control.get('policyyearstart').setValue(policyyearstart);
      
    if(this.ulinkData.chooseType == 'retire' ){
      let sumAgePension: number = this.valueRetire.ageStartReword+1;

      if( this.valueRetire.ageStartPension < this.ageStartProspect){
        
        if( this.valueRetire.ageStartReword != 0 &&  this.valueRetire.ageStartReword != this.valueRetire.ageEndProspect){
          let policyyearstart = (sumAgePension - this.ageStartProspect)+1;
          control.get('agestart').setValue(sumAgePension);
          control.get('policyyearstart').setValue(policyyearstart);
        } else if (this.valueRetire.ageStartReword == 0){
          control.get('agestart').setValue(this.ageStartProspect);
          control.get('policyyearstart').setValue(1);
        } else {
          control.get('agestart').setValue(null);
          control.get('policyyearstart').setValue(null);
        }
        this.alertCtrl.warning(this.textAlert.ageLessthanProspect);
        
        } else {
          if (this.valueRetire.ageStartPension <= this.valueRetire.ageStartReword) {
            this.alertCtrl.warning(this.textAlert.ageNotRelevance);
            
            control.get('agestart').setValue(sumAgePension);
            control.get('policyyearstart').setValue(this.getPolicyyearstart(data));
            
          } 
          else if (this.valueRetire.ageStartPension >= this.valueRetire.ageEndProspect){
            
            this.alertCtrl.warning(this.textAlert.ageMoreThanAgeEnd);
            control.get('agestart').setValue(null);
            control.get('policyyearstart').setValue(null);
          } 
      }
    }
  }

  private chkAgeStartSelf(control, data: number ,index: number){
   
    const controlArr = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    this.valueSelf.ageStart = data;
    this.disabledAddTopup = false;

   
    console.log("control Self typeof :",typeof(control));
  
    if(index == 0){
      if(data < this.ageStartProspect){
        this.alertCtrl.warning(this.textAlert.ageLessthanProspect);
        control.get('agestart').setValue(null);
        control.get('policyyearstart').setValue(null);
        control.get('agestop').setValue( null);
        control.get('policyyearend').setValue(null);
          
      } else if(data > this.valueSelf.ageEndProspect){
        this.alertCtrl.warning(this.textAlert.ageMoreThanAgeEnd);
        control.get('agestart').setValue(null);
        control.get('policyyearstart').setValue(null);
        control.get('agestop').setValue( null);
        control.get('policyyearend').setValue(null);
      } else {
        control.get('agestart').setValue( data );
        control.get('policyyearstart').setValue(this.getPolicyyearstart( data));
      }
    } else {
     
      let formatpay = controlArr.at(index-1).get('formatwithdraw').value;
      let prevAgestart = controlArr.at(index-1).get('agestart').value;
      let prevAgeend = controlArr.at(index-1).get('agestop').value;
      this.valueSelf.minAge = formatpay == '1'?prevAgeend:prevAgestart;
          
      if( data  <=  this.valueSelf.minAge  &&  this.valueSelf.minAge  != null ){
        this.alertCtrl.warning(this.textAlert.ageNotRelevance);
        control.get('agestart').setValue(null);
        control.get('policyyearstart').setValue(null);
        control.get('agestop').setValue( null);
        control.get('policyyearend').setValue(null);
          
      } else if(data  > this.valueSelf.ageEndProspect &&  this.valueSelf.minAge  != null){
        this.alertCtrl.warning(this.textAlert.ageMoreThanAgeEnd);
        control.get('agestart').setValue(null);
        control.get('policyyearstart').setValue(null);
        control.get('agestop').setValue( null);
        control.get('policyyearend').setValue(null);
      }  else if ( data > this.valueSelf.minAge &&  data  <= this.valueSelf.ageEndProspect &&  this.valueSelf.minAge != null){
        
          control.get('agestart').setValue( data );
          control.get('policyyearstart').setValue(this.getPolicyyearstart( data));
      }
    }

    if ( this.valueSelf.ageEndProspect == this.valueSelf.minAge ||  data  == this.valueSelf.ageEndProspect){
      this.disabledAddTopup = true;
    } else {
      this.disabledAddTopup = false;
    }
    controlArr.controls.splice(index+1);
  }

  private chkAgeEnd(control, data: number ,index: number){ //ออกเเบบยูนิตลิ้งค์ด้วยตัวเอง
    const controlArr = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    this.disabledAddTopup = false;
    let policyyearend:number =  this.getPolicyyearEnd(data); 

    if(index == 0){
      if(this.ulinkData.chooseType == 'self') {

        this.valueSelf.ageEnd = data;
        //let payType =  control.get('formatwithdraw').value;
        
        if( data < this.ageStartProspect ||data < this.valueSelf.ageStart){
          this.alertCtrl.warning(this.textAlert.ageNotRelevance); 
          control.get('agestop').setValue( null);
          control.get('policyyearend').setValue(null);
          
        } else if( data > this.valueSelf.ageEndProspect ){
          this.alertCtrl.warning(this.textAlert.ageMoreThanAgeEnd);
          control.get('agestop').setValue( null);
          control.get('policyyearend').setValue(null);
         
        } else {
          control.get('agestop').setValue( data);
          control.get('policyyearend').setValue(policyyearend);
        }
      }
    } else {
      let formatpay = controlArr.at(index-1).get('formatwithdraw').value;
      let prevAgestart = controlArr.at(index-1).get('agestart').value;
      let prevAgeend = controlArr.at(index-1).get('agestop').value;
      this.valueSelf.minAge = formatpay == '1'?prevAgeend:prevAgestart;
          
      if( data  <=  this.valueSelf.minAge  &&  this.valueSelf.minAge  != null ){
        this.alertCtrl.warning(this.textAlert.ageNotRelevance);
        control.get('agestop').setValue( null);
        control.get('policyyearend').setValue(null);
          
      } else if(data  > this.valueSelf.ageEndProspect &&  this.valueSelf.minAge  != null){
        this.alertCtrl.warning(this.textAlert.ageMoreThanAgeEnd);
        control.get('agestop').setValue( null);
        control.get('policyyearend').setValue(null);
      }  else if ( data > this.valueSelf.minAge &&  data  <= this.valueSelf.ageEndProspect &&  this.valueSelf.minAge != null){
         
          control.get('agestop').setValue( data );
          control.get('policyyearend').setValue(policyyearend);
      }
    }

    controlArr.controls.splice(index+1);

    if ( this.valueSelf.ageEndProspect == this.valueSelf.minAge ||  data  == this.valueSelf.ageEndProspect){
      this.disabledAddTopup = true;
    } else {
      this.disabledAddTopup = false;
    }

  }


  private getPolicyyearstart(ageStart: number):number{
    let policyyearstart:number = 0;
    if(this.ulinkData.chooseType == 'retire') {

      policyyearstart = (this.valueRetire.ageStartPension - this.ageStartProspect)+1;
    } else if(this.ulinkData.chooseType == 'self'){
      policyyearstart = (ageStart - this.ageStartProspect)+1;
    }
    return policyyearstart;
  }


  private getPolicyyearEnd(ageEnd: number):number {
    let policyyearEnd:number = 0;
    if(this.ulinkData.chooseType == 'self'){
      policyyearEnd = (ageEnd - this.ageStartProspect)+1;
    }
    return policyyearEnd;
  }


  private ageReword(ageReword:number){
    const control: FormArray = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    let sumAgePension: number = this.valueRetire.ageStartReword+1;
    //let ageStartPension:number = 
    if( (ageReword > this.valueRetire.ageEndProspect) ){
      this.alertCtrl.warning(this.textAlert.ageMoreThanAgeEnd);
      control.at(0).get('agestart').setValue(null);
      control.at(0).get('policyyearstart').setValue(null);
      control.at(1).get('agestart').setValue(null);
      control.at(1).get('policyyearstart').setValue(null);

    } else {
      this.valueRetire.ageStartReword = Number(ageReword);
     
      this.getAgepensionByAgereword();
      if(this.valueRetire.ageStartPension >this.valueRetire.ageEndProspect){
        this.alertCtrl.warning(this.textAlert.agePensionMoreThanAgeEnd);
        control.at(1).get('agestart').setValue(null);
        control.at(1).get('policyyearstart').setValue(null);
      } else {
        control.at(1).get('agestart').setValue(this.valueRetire.ageStartPension );
        control.at(1).get('policyyearstart').setValue(this.valueRetire.policyyearStartPension);

        this.AV();
      }
      this.dataRetireFirst();
    }
  }

  private defaultData() {
    this.ulinkWithdraw = this.fb.group({
      //อัตราเงินเฟ้อ
      inflationrate : ['', Validators.required],
      //ประมาณการมูลค่ารับซื้อคืนหน่วยลงทุน ณวันที่เริ่มถอน (บาท) มาจากการเรียกฟังก์ชัน cal
      av : [{value: null, disabled: true}],
      ulinkWithdrawArray: this.fb.array([this.ulinkWithdrawRows()])
    });

    this.ulinkData.ulinkWithdraw = this.ulinkWithdraw;
    if (this.ulinkData.chooseType == 'educate' || this.ulinkData.chooseType == 'retire') {
      this.add();
      
    }
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  private ulinkWithdrawRows(): FormGroup {
    
    return this.fb.group({
      //รูปแบบการถอน  ประจำ/ครั้งเดียว 
      formatwithdraw: '',
      //ถอนเงินครั้งละ (บาท) 
      sumwithdraw: [null, Validators.required],
      //อายุที่เริ่มถอน
      agestart: [{value: null, disabled: this.ulinkData.chooseType != 'retire' && this.ulinkData.chooseType != 'self'}, Validators.required],
      //อายุุที่ถอนไปถึง
      agestop: [{value: null, disabled: this.ulinkData.chooseType != 'self'}],
      //ปีกรมธรรม์เริ่มต้น
      policyyearstart: [{value: null, disabled: true}],
      //ปีกรมธรรม์สิ้นสุด
      policyyearend: [{value: null, disabled: true}],
      //อายุบุตรเริ่มต้น
      childagestart: [{value: null, disabled: true}],
      //อายุบุตรสิ้นสุด
      childageend: [{value: null, disabled: true}],
      //ความถี่ในการถอน
      withdrawper: ['', this.ulinkData.chooseType == 'self'?Validators.required : null]
    });
  }

 /**
   * เพิ่มอัตราผลตอบแทน
   */
  private add(): void {
    const control: FormArray = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    
   
    if(this.ulinkData.chooseType == 'self' && control.length > 0 ){
      let i = control.length - 1; // check previous index
     
      let formatpay = control.at(i).get('formatwithdraw').value;
      let agestart = control.at(i).get('agestart').value;
      let ageend = control.at(i).get('agestop').value;
      let sumwithdraw = control.at(i).get('sumwithdraw').value;
      let withdrawper= control.at(i).get('withdrawper').value;

     // this.valueSelf.minAge = formatpay == '1'?ageend:agestart;

      if(formatpay == '1' && agestart != null && ageend != null && sumwithdraw != null && withdrawper != ''){
        control.push(this.ulinkWithdrawRows());
      }else if(formatpay == '2' && agestart != null && sumwithdraw != null){
        control.push(this.ulinkWithdrawRows());
      }else{
        this.alertCtrl.warning(this.textAlert.pleaseKeyValue);
      }
    } else {
      control.push(this.ulinkWithdrawRows());
    }
  }

  /**
   * ลบอัตราผลตอบแทน
   */
  private remove(index: number): void {
    const control: FormArray = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    control.removeAt(index);
  }

  /**
   * ล้างค่า
   */
  private reset(): void {
    const control: FormArray = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    while (control.length != 0) {
      control.removeAt(0)
    }
    control.push(this.ulinkWithdrawRows());
  }

  /**
   * เปิด / ปิด
   * @param idx 
   */
  private toggle(idx: number) {
    this.open[idx] = !this.open[idx];
  }

  /**
   * เปลี่ยนประเภทการถอน
   * @param idx 
   */
  private changeFormatWithdraw(value: string, idx: number) {
     this.disabledAddTopup = false;
    const control = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    this.clearVal(control,idx);

    if (value != '2') {//2 ครั้งเดียว, 1 ประจำ
      control.at(idx).get('agestop').enable();
      control.at(idx).get('withdrawper').enable();
    }
    else {
      control.at(idx).get('agestop').setValue(null);
      control.at(idx).get('withdrawper').setValue('');
      control.at(idx).get('agestop').disable();
      control.at(idx).get('withdrawper').disable();
    }
  }
 /**
  * Clear value when change dropdown เปลี่ยนประเภทการถอน
  */
  private clearVal(control,idx:number){
  //  const control = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
      control.at(idx).get('agestart').setValue(null);
      control.at(idx).get('agestop').setValue(null);
      control.at(idx).get('policyyearstart').setValue(null);
      control.at(idx).get('policyyearend').setValue(null);
  }



  private dataChild() {
    const ulinkChild :FormGroup = this.ulinkData.ulinkChild;
    let agestartChild = Number(ulinkChild.get('agestart').value);
    let ageendChild = Number(ulinkChild.get('ageend').value);
    let ageParent = Number(this.ulinkData.prospect.age);

    this.bachelorDegrees = (18 - agestartChild) >=0 && ageendChild >= 21? true : false;
    this.masterDegrees = ageendChild >=23 && this.bachelorDegrees? true : false;

    const control = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];

    let childagestart = 0;//อายุบุตรเริ่มต้น
    let childageend = 0;//อายุบุตรสิ้นสุด
    let policyyearstart = 0;//ปีกรมธรรม์เริ่มต้น
    let agestart = 0;//อายุที่เริ่มถอน
    let agestop = 0;//อายุุที่ถอนไปถึง
    let policyyearend = 0//ปีกรมธรรม์สิ้นสุด


    if(this.bachelorDegrees){
      childagestart = 18;
      childageend = 21;
      policyyearstart = (childagestart - agestartChild) + 1;
      agestart = ageParent + (childagestart - agestartChild);
      agestop = agestart + 3;
      policyyearend = policyyearstart + 3;

      control.at(0).get('childagestart').setValue(childagestart);
      control.at(0).get('childageend').setValue(childageend);
      control.at(0).get('policyyearstart').setValue(policyyearstart);
      control.at(0).get('agestart').setValue(agestart);
      control.at(0).get('agestop').setValue(agestop);
      control.at(0).get('policyyearend').setValue(policyyearend);
       
    }else {
      //control.at(0).get('sumwithdraw').disable();
    }

    if(this.masterDegrees){
      childagestart = 22;
      childageend = 23;
      policyyearstart = control.at(0).get('policyyearend').value + 1;
      agestart = control.at(0).get('agestop').value + 1;
      agestop = agestart + 1;
      policyyearend = policyyearstart + 1;

      control.at(1).get('childagestart').setValue(childagestart);
      control.at(1).get('childageend').setValue(childageend);
      control.at(1).get('policyyearstart').setValue(policyyearstart);
      control.at(1).get('agestart').setValue(agestart);
      control.at(1).get('agestop').setValue(agestop);
      control.at(1).get('policyyearend').setValue(policyyearend);
    }else {
      //control.at(1).get('sumwithdraw').disable();
    }

  }

  private dataRetireFirst(){
   
    const control = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];

    const ulinkPayment :FormGroup = this.ulinkData.ulinkPayment;
   // this.valueRetire.ageStartProspect = Number(this.ulinkData.prospect.age);
    this.valueRetire.ageEndProspect = ulinkPayment.get('mAgeend').value;

    let policyyearendPension:number= (this.valueRetire.ageEndProspect - this.ageStartProspect)+1;//ปีกรมธรรม์บำนาญ

    if(this.valueRetire.ageStartReword !=0){
      this.valueRetire.policyyearStartReword =  ( this.valueRetire.ageStartReword - this.ageStartProspect)+1 ;
      control.at(0).get('policyyearstart').setValue( this.valueRetire.policyyearStartReword );
   
    } else {
      control.at(0).get('policyyearstart').setValue(null);
    }

    control.at(1).get('agestop').setValue(this.valueRetire.ageEndProspect);
    control.at(1).get('policyyearend').setValue(policyyearendPension);
  }

  private getDataSelf(){
    const ulinkPayment :FormGroup = this.ulinkData.ulinkPayment;
    this.valueSelf.ageEndProspect = ulinkPayment.get('mAgeend').value;
    this.disabledAddTopup = false;
  }

  private getEditDataSelf(){
    let ulinkWithdrawArray = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    
    if(ulinkWithdrawArray.controls.length>0){
      let i = 0;
      for(let val of ulinkWithdrawArray.controls){
        let agestart:number =  Number(val.get('agestart').value);
        let agestop:number =  Number(val.get('agestop').value);

        val.get('policyyearstart').setValue(this.getPolicyyearstart(agestart));
        if(val.get('formatwithdraw').value == '1'){
          val.get('policyyearend').setValue(this.getPolicyyearEnd(agestop));
        }
        i++;
  
      }
    }
  }

  private getAgepensionByAgereword(){

   this.valueRetire.ageStartPension = this.valueRetire.ageStartReword +1;
   this.valueRetire.policyyearStartPension = (this.valueRetire.ageStartPension - this.ageStartProspect)+1;
    
  }

  private resetData() {

    //this.ageStartProspect =  Number(this.ulinkData.prospect.age);

    console.log("ageStartProspect ===> ",this.ageStartProspect);
    this.open = [false, false];
    
    this.ulinkWithdraw.get('inflationrate').setValue('');
    this.ulinkWithdraw.get('av').setValue(null);
    let control = <FormArray>this.ulinkWithdraw.get('ulinkWithdrawArray');
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.add();

    if (this.ulinkData.chooseType == 'educate' || this.ulinkData.chooseType == 'retire') {
      this.add();
    }

    if(this.ulinkData.chooseType == 'educate'){
      this.dataChild();
    } else if(this.ulinkData.chooseType == 'retire'){
      this.dataRetireFirst();
    }
     else if(this.ulinkData.chooseType == 'self'){
      this.getDataSelf();
    }
  }

  private setEditData() {
    
    let exampleBenefit : ExampleBenefitModel = this.ulinkData.getExampleBenefit();
    if(typeof exampleBenefit  != 'undefined'){

        let listExample = exampleBenefit.listExamplewithdraw;

        const form = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
        this.listExampleWitdraw  =  sortBy( listExample,'seq');
        if(this.listExampleWitdraw.length > 0){
          while (form.length !== 0) {
            form.removeAt(0);
          }
  
          console.log('listExample --->', listExample);
  
          if(this.listExampleWitdraw.length > 0){
            let inflationrate = this.listExampleWitdraw[0].inflationrate;
            this.ulinkWithdraw.get('inflationrate').setValue(inflationrate);
          }
  
          for (let data of this.listExampleWitdraw) {
            
            let formatwithdraw = data.formatwithdraw;
            let sumwithdraw = data.sumwithdraw;
            let agestart = data.agestart;
            let agestop = data.agestop;
            let withdrawper = data.withdrawper;                            
  
            let formIndex =  this.fb.group({
              //รูปแบบการถอน  ประจำ/ครั้งเดียว 
              formatwithdraw: formatwithdraw,
              //ถอนเงินครั้งละ (บาท) 
              sumwithdraw: [sumwithdraw, Validators.required],
              //อายุที่เริ่มถอน
              agestart: [{value: agestart, disabled: this.ulinkData.chooseType != 'retire' && this.ulinkData.chooseType != 'self'}, Validators.required],
              //อายุุที่ถอนไปถึง
              agestop: [{value: agestop, disabled: this.ulinkData.chooseType != 'self'}],
              //ปีกรมธรรม์เริ่มต้น
              policyyearstart: [{value: null, disabled: true}],
              //ปีกรมธรรม์สิ้นสุด
              policyyearend: [{value: null, disabled: true}],
              //อายุบุตรเริ่มต้น
              childagestart: [{value: null, disabled: true}],
              //อายุบุตรสิ้นสุด
              childageend: [{value: null, disabled: true}],
              //ความถี่ในการถอน
              withdrawper:[{value: withdrawper, disabled: this.ulinkData.chooseType != 'self'},Validators.required]
            })
  
            form.push(formIndex);
          }
         
          if (this.ulinkData.chooseType == 'educate'){
            this.dataChild();
          } else if (this.ulinkData.chooseType == 'retire'){
            this.dataRetireFirst();
            this.getDataRetireEdit();
          } else if (this.ulinkData.chooseType == 'self'){
            this.getDataSelf();
            this.getEditDataSelf();
          }
        }
       
        
        this.editFinish = false;
        
    }
  }

  /**
   * get data befour save success when edit
   */

  private getDataRetireEdit(){

    const control = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    const ulinkWithdraw  = this.ulinkData.ulinkWithdraw.getRawValue();
    let agestartReword = Number(ulinkWithdraw.ulinkWithdrawArray[0].agestart);
    let agestartPension = Number(ulinkWithdraw.ulinkWithdrawArray[1].agestart);
    
    let policyStartReword = (agestartReword - this.ageStartProspect)+1;
    let policyStartPension = (agestartPension - this.ageStartProspect)+1;
    control.at(0).get('policyyearstart').setValue(policyStartReword);
    control.at(1).get('policyyearstart').setValue(policyStartPension);
  }

  private AV() {

    let testSeek = 0;
    let ulinkWithdrawArray = <FormArray>this.ulinkWithdraw.controls['ulinkWithdrawArray'];
    testSeek = Number(ulinkWithdrawArray.at(0).get('agestart').value);

    let planCode = this.ulinkData.planCode;
    if(planCode == 'UA01'){
      if(this.ulinkData.chooseType == 'retire'){
        testSeek = this.valueRetire.ageStartReword;
      }
      this.ulinkData.calAvUA01(testSeek);
    }

    if(planCode == 'UA02'){
      this.ulinkData.calAvUA02(testSeek);
    }
    
    this.ulinkWithdraw.get('av').setValue(this.ulinkData.av);


  }
}

