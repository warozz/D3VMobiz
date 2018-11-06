import { AlertDirective } from './../../../directives/extends/alert/alert';
import {NavParams} from 'ionic-angular';
import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { UniversalLifeDataProvider } from '../../../providers/universal-life-data/universal-life-data';

@Component({
  selector: 'u-life-saleoffer-10-10',
  templateUrl: 'u-life-saleoffer-10-10.html'
})
export class ULifeSaleoffer_10_10Component implements OnInit,OnDestroy { //for 10/10 , 90/90

  private subscription: Array<Subscription> = [];
  private wording;
  private tlplan:any;
  private value;
  private prospect;
  private baseIncrementer:number = 0;
  private riderInsuranceSum:number = 0;//สัญญาเพิ่มเติม
  private insuranceSum:number = 0;//เบี้ยประกันภัยรวม
  private quatationSum:number = 0;//ทุนที่ส่งให้ rider เป็นค่าเดียวกับ ทุนประกัน
  private resetDataFlag :boolean = false;
  private showAlertMaxInsurance :boolean = true;
  private mainInsuranceCompairYear:number = 0;

  
    /**
   * สัญญาเพิ่มเติม
   */
  private rider: object = {};

  /**
   * ชำระเบี้ย
   * 
   * 99 = default
   * 
   * 1 = รายปี
   * 
   * 2 = ราย 6 เดือน
   * 
   * 4 = ราย 3 เดือน
   * 
   * 0 = รายเดือน
   * @param payType  ชำระเบี้ย
   */
  private payType: number = 1;//defealt 99(num) dropdownการจ่ายเเบบต่างๆ เช่น ชำระรายเดือน รายปี่
  /**
   * type เบี้ยประกันภัยส่วนออกเพิ่ม
   * 
   * ไม่ซื้อ = "N"
   * 
   * ครั้งเดียวตอนออกกรมธรรม์ = "1"
   * 
   * ตามงวดการชำระเบี้ยประกันหลัก = "Y"
   * @param topupType
   */
  private topupType: string = "99";//default val  99 = ยังไม่เลือก dropdown
  
  /**
   * ค่าเพิ่มขึ้นทีละ 10000 ของทุนประกัน
   * 
   * @param periodInsurance
   */
  private periodInsurance:number = 10000;//ค่าที่เพิ่มขึ้นทีละ 10000 ของทุนประกัน
   /**
   * ค่า dropdown ว่าเป็น UEA หรือ UWA
   * 
   * @param choosePlan
   */
  private choosePlan:string ='';
  @Input("choosePlan") set setChoosePlan(choosePlan:string){
    if(typeof choosePlan != 'undefined' && choosePlan != ''){

      this.choosePlan = choosePlan;
    // 10/1
   if (this.choosePlan == 'UZA'){//clear value
    this.tlplan = {
      planCode: 'UZA',
      pPayYear: '01',
      pEndowmentYear: '10',
      payType: '0',
      endowmentType: '0',
      calType: '2'
    };
  } 
  // 10/10
  else if (this.choosePlan == 'UEA') {
    this.tlplan = {
      planCode: 'UEA',
      pPayYear: '10',
      pEndowmentYear: '10',
      payType: '0',
      endowmentType: '0',
      calType: '2'
    };
  }
  // 90/90
  else {
    this.tlplan = {
      planCode: 'UWA',
      pPayYear: '90',
      pEndowmentYear: '90',
      payType: '1',
      endowmentType: '1',
      calType: '2'
    };
  }

    }
  }

  
  /**
   *  เบี้ยประกันภัยรวม
   */
  @Output("total") private totalChange: EventEmitter<number>;

  constructor(
    private decimalPipe: DecimalPipe,
    private broadcaster: Broadcaster,
    private navParams:NavParams,
    private universalData:UniversalLifeDataProvider,
    private alertCtrl:AlertDirective
  ) {
    this.totalChange = new EventEmitter<number>();

    this.value = {
      insurance: 0,//ทุนประกัน
      mainInsurance:0,//เบี้ยประกันภัยหลัก
      insuranceTopup:0,// เบี้ยประกันส่วนออมเพิ่ม
      minInsurance: 0,//ทุนประกัน
      maxInsurance:0,
      minMainInsurance: 0,//เบี้ยประกันภัยหลัก
      minTopup: 0,// เบี้ยประกันส่วนออมเพิ่ม
      maxTopup: 0,// เบี้ยประกันส่วนออมเพิ่ม
      maxMain: 999999900,//max เบี้ยประกันภัย
    }

    this.wording = {
      /*------------wording ใต้ incrementer-----------*/
      insurance: '',//ทุนประกัน
      mainInsurance:'',//เบี้ยประกันภัยหลัก
      insuranceTopup:'',// เบี้ยประกันส่วนออมเพิ่ม
      /*------------------Min Max-------------------*/
      minMainAlert: '',//เบี้ยประกันภัยหลัก
      maxMainAlert: '',//เบี้ยประกันภัยหลัก
      minInsuranceAlert: 'กรุณาระบุเบี้ยประกันภัยหลัก',//ทุนประกัน
      maxInsuranceAlert: 'กรุณาระบุเบี้ยประกันภัยหลัก',//ทุนประกัน
      minTopupAlert:'กรุณาระบุเบี้ยประกันภัยหลัก',
      maxTopupAlert:'กรุณาระบุเบี้ยประกันภัยหลัก',
    };

    this.prospect = {
      age: 0,
      gender:'',
      birthDate: '',
      occupationType: ''
    }
     // รับค่ามาจากใบเสนอขาย
     this.prospect = this.navParams.get('prospect');
     
     this.subscription.push(
      this.broadcaster.on('resetDataFlag').subscribe(res => {
        this.resetDataFlag = res;
        if(this.resetDataFlag){
          this.resetData();
        }
      })
    );

    if(this.universalData.editData && (this.universalData.resetDataUl == false)){
      this.setEditData();
    }

  }
  ngOnInit(){

    this.subscription.push(
      this.broadcaster.on('prospect').subscribe(res => {
        this.prospect = {
            age: res.age,
            birthDate: res.birthDate,
            firstName: res.firstName,
            gender: res.gender,
            lastName: res.lastName,
            occupationType: res.occupationType,
            plan: res.plan,
            preName: res.preName
          };
          setTimeout(()=>{
            this.universalData.rider = this.rider;
          },20);
       
        if(this.value.mainInsurance !== 0){
          let oldInsurance:number = this.value.insurance;
          this.getInsurance();
          this.value.insurance = oldInsurance;

        }
      })
    );
    
  }

  ngOnDestroy(){
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  private resetData() {
    this.payType = 1;
    this.value.mainInsurance = 0;
    this.value.insuranceTopup = 0;
    this.riderInsuranceSum = 0;
    this.universalData.resetDataUl = true;
    this.clearValue();
    this.detailBypayType(); 
  }

  private detailBypayType(): void {
    if( this.payType == 0 ) { // รายเดือน
      this.value.minMainInsurance = 1000;
    } else if ( this.payType  == 4 )  {//ราย 3 เดือน
      this.value.minMainInsurance = 3000;
    } else if( this.payType == 2 ) { // ราย 6 เดือน
      this.value.minMainInsurance = 6000;
    } else if ( this.payType  == 1 )  { // รายปี
      this.value.minMainInsurance = 12000;
    }
    this.wording.mainInsurance = this.decimalPipe.transform(this.value.minMainInsurance) +" - "+ this.decimalPipe.transform(this.value.maxMain);//เบี้ยประกันภัยหลัก
    this.wording.minMainAlert = "เบี้ยประกันหลักขั้นต่ำ "+this.decimalPipe.transform(this.value.minMainInsurance)+" บาท";
    this.wording.maxMainAlert = "เบี้ยประกันหลักสูงสุดไม่เกิน "+this.decimalPipe.transform(this.value.maxMain)+" บาท";
   
    this.broadcaster.broadcast('payType', this.payType);
    //console.log("this.value.minMainInsurance : ",this.value.minMainInsurance);
    this.universalData.paymentType = this.payType;

    
    if(this.value.mainInsurance != 0){

      if(this.value.mainInsurance < this.value.minMainInsurance){
        this.alertCtrl.warning(this.wording.minMainAlert);
      }
      this.getSum(this.value.mainInsurance,'mainInsurance');

    }
  }

  private getSum(val,incrementerType) {
    if(incrementerType === "mainInsurance"){
      if(val < this.value.minMainInsurance) {
        setTimeout(() => {
           this.value.mainInsurance = this.value.minMainInsurance; 
        },20); 
      } else if (val > this.value.maxMain){
        setTimeout(() => {
        this.value.mainInsurance = this.value.maxMain; 
        },20); 
      }
      /*-----------ทุนประกัน-------------- */
      if(val >= this.value.minMainInsurance && val <= this.value.maxMain){
        this.value.mainInsurance = val;
       
         console.log("this.value : ",this.value);
          this.getInsurance();
        /*--------------ออมเพิ่ม------------------ */
        if(this.topupType == "99"){
        this.wording.minTopupAlert = "กรุณาระบุประเภทการชำระเบี้ยประกันส่วนออมเพิ่มเติม";
        this.wording.maxTopupAlert = "กรุณาระบุประเภทการชำระเบี้ยประกันส่วนออมเพิ่มเติม";
        } else {
          this.setMinMaxAndSetVaridateTopup();
        }
        this.value.minTopup = 1000;
        if( this.topupType == "1" || this.topupType =="Y" ){
          this.value.maxTopup = this.value.mainInsurance;
          if(this.topupType == "1" && this.payType == 0){
            this.value.maxTopup = 2*(this.value.mainInsurance);
          } 
          this.getWordingTopup();
        }
      }
      this.universalData.mainInsurance = this.value.mainInsurance;
    } 
    if(incrementerType === "insurance"){
       /*-------------------alert------------------------ */
      if(this.value.mainInsurance == 0){
         this.value.minInsurance = 0;
         this.value.maxInsurance = 0;
         this.wording.minInsuranceAlert = "กรุณาระบุเบี้ยประกันภัยหลัก";
         this.wording.maxInsuranceAlert = "กรุณาระบุเบี้ยประกันภัยหลัก";
         
        // this.alertCtrl.warning("กรุณาระบุเบี้ยประกันภัยหลัก");
      }
      if(val < this.value.minInsurance) {
        
          this.value.insurance = this.value.minInsurance;  
       
      } else if (val > this.value.maxInsurance){
       
          this.value.insurance = this.value.maxInsurance; 
       
      }
     
      this.quatationSum = this.value.insurance;
      this.universalData.insurance = this.value.insurance;
    } 
    if(incrementerType === "topup"){
      if(this.value.mainInsurance == 0){
        this.wording.minTopupAlert = "กรุณาระบุเบี้ยประกันภัยหลัก";
        this.wording.maxTopupAlert = "กรุณาระบุเบี้ยประกันภัยหลัก";
        this.wording.insuranceTopup = '';
        this.value.minTopup = 0;
        this.value.maxTopup = 0;
      } else {
        this.setMinMaxAndSetVaridateTopup();
      }

      if(val < this.value.minTopup) {
        setTimeout(() => {
          this.value.insuranceTopup = this.value.minTopup;  
        },20);
      } else if (val > this.value.maxTopup){
        setTimeout(() => {
         this.value.insuranceTopup = this.value.maxTopup; 
      },20);
      }
      
      this.universalData.topup = this.value.insuranceTopup;
    }
    this.getInsuranSum();
  }


  private getInsurance(){
    this.mainInsuranceCompairYear = this.getmainInsuranceCompairYear();
    this.value.minInsurance = this.getMinInsurance( this.mainInsuranceCompairYear , this.prospect.age);
    this.value.maxInsurance = this.getMaxInsurance( this.mainInsuranceCompairYear , this.prospect.age , this.prospect.gender);
  
    this.wording.insurance = this.decimalPipe.transform(this.value.minInsurance)+" - "+this.decimalPipe.transform(this.value.maxInsurance);
    this.wording.minInsuranceAlert = "สามารถซื้อได้ต่ำสุด "+this.decimalPipe.transform(this.value.minInsurance)+" บาท";
    this.wording.maxInsuranceAlert = "สามารถซื้อได้สูงสุดไม่เกิน "+this.decimalPipe.transform(this.value.maxInsurance)+" บาท";

    if (this.value.insurance < this.value.minInsurance && this.value.insurance != 0 ){
      this.alertCtrl.warning(this.wording.minInsuranceAlert);
      this.value.insurance = this.value.minInsurance; 
    } else if ( this.value.insurance > this.value.maxInsurance && this.value.insurance != 0 ){
      this.alertCtrl.warning(this.wording.maxInsuranceAlert);
      this.value.insurance = this.value.maxInsurance;
    }
     

  }
  private getmainInsuranceCompairYear():number {
    let mainInsuranceCompairOneYear = 0;
    if( this.payType == 0 ) { // รายเดือน
       mainInsuranceCompairOneYear = (this.value.mainInsurance)*12;
    } else if ( this.payType  == 4 )  {//ราย 3 เดือน
       mainInsuranceCompairOneYear = (this.value.mainInsurance)*4;
     
    } else if( this.payType == 2 ) { // ราย 6 เดือน
      mainInsuranceCompairOneYear = (this.value.mainInsurance)*2;
     
    } else if ( this.payType  == 1 )  { // รายปี
      mainInsuranceCompairOneYear = this.value.mainInsurance;
    }
    //console.log("mainInsuranceCompairOneYear :: ",mainInsuranceCompairOneYear);
    return mainInsuranceCompairOneYear;
  }

  private setMinMaxAndSetVaridateTopup(){
    
    if( (this.topupType == "1" || this.topupType =="Y")){
      this.value.minTopup = 1000;
      //การซื้อครั้งเดียวตอนออกกรมธรรม์ หรือ ตามงวดการชำระเบี้ยประกันหลัก (ต้องกรอกตัวเลข) ขั้นต่ำ 1,000 บาท 
      this.value.maxTopup = this.value.mainInsurance;
      if(this.topupType == "1" && this.payType == 0){
        this.value.maxTopup = 2*(this.value.mainInsurance);
      } 
      this.getWordingTopup();
      //this.wording.insuranceTopup = this.decimalPipe.transform(this.value.minTopup)+" - "+this.decimalPipe.transform(this.value.maxTopup);
      this.wording.minTopupAlert = "เบี้ยประกันส่วนออมเพิ่มเติมขั้นต่ำ "+this.decimalPipe.transform(this.value.minTopup)+" บาท";
    
    } else if (this.topupType == "N"){
      this.wording.minTopupAlert = "ไม่สามารถซื้อสัญญาพิเศษส่วนออมเพิ่มเติมได้";
      this.wording.maxTopupAlert = "ไม่สามารถซื้อสัญญาพิเศษส่วนออมเพิ่มเติมได้";
    
      this.value.maxTopup = 0;
      this.value.minTopup = 0;
      this.value.insuranceTopup = 0;
      this.wording.insuranceTopup ='';
     
    }
    this.getInsuranSum();
  }
  private topupChange(): void {

    this.clearValueWhenTopupChange();
    if(this.value.mainInsurance == 0){
      this.wording.minTopupAlert = "กรุณาระบุเบี้ยประกันภัยหลัก";
      this.wording.maxTopupAlert = "กรุณาระบุเบี้ยประกันภัยหลัก";
      this.wording.insuranceTopup = '';
      this.value.minTopup = 0;
      this.value.maxTopup = 0;
    } else {
      this.setMinMaxAndSetVaridateTopup();
    }


    this.universalData.topupType =this.topupType;
  }

  private getInsuranSum(){
    this.insuranceSum =  this.value.mainInsurance + this.riderInsuranceSum + this.value.insuranceTopup;//เบี้ยประกันรวม = เบี้ยประกันหลัก+สัญญเพิ่มเติมรวม+ทุนประกัน
    //console.log("sumInsurance : ",this.insuranceSum);

    this.totalChange.emit(this.insuranceSum);//เบี้ยประกันรวม
  }
  private getWordingTopup(){
    this.wording.insuranceTopup = this.decimalPipe.transform(this.value.minTopup)+" - "+this.decimalPipe.transform(this.value.maxTopup);
    if(this.topupType == "1" && this.payType == 0){
      this.wording.maxTopupAlert = "เบี้ยประกันภัยส่วนออมเพิ่มเติมซื้อได้สูงสูดไม่เกิน 2 เท่าของเบี้ยประกันภัยหลัก";
    } else {
      this.wording.maxTopupAlert = "เบี้ยประกันส่วนออมเพิ่มเติมสูงสุดไม่เกินจำนวนเบี้ยประกันภัยหลัก";
    }
  }

  private getMinInsurance( mainInsuranceVal: number ,age: number) :number {
    //console.log("mainInsuranceVal : ",mainInsuranceVal);
    let mainVal:number = 0;
    let baseInsurance:number = 100000;
    
    if( age <= 49 ){
      mainVal = 8 * mainInsuranceVal;
    } else if ( age > 49 ){
      mainVal = 5 * mainInsuranceVal;
    }
    let chkMaxVal = Math.max(mainVal, baseInsurance);
    let result = this.getRoundup(chkMaxVal, this.periodInsurance);
    //console.log("getMinInsurance ====> chkMaxVal : "+chkMaxVal+" ,getRoundup : "+result);
    return result;
  }

  private getMaxInsurance( mainInsuranceVal: number,age: number,gender: string):number {
    let maxVal:number = 0;
    if( age >= 0 && age <= 20 ) {
      if( gender == "F" ) {
        maxVal = 196*mainInsuranceVal;
      } else {
        maxVal = 126*mainInsuranceVal;
      }
    } else if( age >= 21 && age <= 40 ) {
      if( gender == "F" ) {
        maxVal = 174*mainInsuranceVal;
      } else {
        maxVal = 89*mainInsuranceVal;
      }
    } else if( age >= 41 && age <= 50 ) {
      if( gender == "F" ) {
        maxVal = 69*mainInsuranceVal;
      } else {
        maxVal = 42*mainInsuranceVal;
      }
    } else  if( age >= 51 && age <= 55 ) {
      if( gender == "F" ) {
        maxVal = 44*mainInsuranceVal;
      } else {
        maxVal = 29*mainInsuranceVal;
      }
    } else if( age >= 56 && age <= 60 ) {
      if( gender == "F" ) {
        maxVal = 29*mainInsuranceVal;
      } else {
        maxVal = 20*mainInsuranceVal;
      }
    } else if( age >= 61 && age <= 65 ) {
      if( gender == "F" ) {
        maxVal = 18*mainInsuranceVal;
      } else {
        maxVal = 13*mainInsuranceVal;
      }
    } else if( age >= 66 && age <= 70 ) {
      if( gender == "F" ) {
        maxVal = 12*mainInsuranceVal;
      } else {
        maxVal = 9*mainInsuranceVal;
      }
    }
    //console.log("getMaxInsurance ====> mainInsuranceVal : ",mainInsuranceVal + ", maxVal : "+maxVal);
    let result = this.getRoundup(maxVal, this.periodInsurance);
    //console.log("getMaxInsurance ====> maxVal : "+maxVal+" ,getRoundup : "+result);
    return result;
  }

  private clearValueWhenTopupChange(){
    this.value.minTopup = 0;
    this.value.maxTopup = 0;
    this.value.insuranceTopup = 0;
    this.wording.minTopupAlert = '';
    this.wording.maxTopupAlert = '';
    this.universalData.topup = 0;
    //this.topupType = '99';
  }

  private clearValue(){
    this.topupType = "99";
    this.value = {
      insurance: 0,
      mainInsurance:0,
      insuranceTopup:0,
      minInsurance: 0,
      maxInsurance:0,
      minMainInsurance: 0,
      minTopup: 0,
      maxTopup:0,
      maxMain: 999999900
    }
    this.wording = {
      insurance: '',
      mainInsurance:'',
      insuranceTopup:'',
      minMainAlert: '',
      maxMainAlert: '',
      minInsuranceAlert: 'กรุณาระบุเบี้ยประกันภัยหลัก',
      maxInsuranceAlert: 'กรุณาระบุเบี้ยประกันภัยหลัก',
      minTopupAlert:'กรุณาระบุเบี้ยประกันภัยหลัก',
      maxTopupAlert:'กรุณาระบุเบี้ยประกันภัยหลัก',
    };
    this.totalChange.emit(this.value.mainInsurance);
    this.universalData.insurance =  0;
    this.universalData.mainInsurance =  0;
    this.universalData.topupType = "99";
  }
  
  /**
   * ปัดทศนิยมโดยต้องหาร 10000 ลงตัว*/
  private getRoundup(val: number, periodInsurance: number): number{
    //console.log("val ====> "+val+" ,periodInsurance ====> "+periodInsurance);
    let dataRoudup = (Math.ceil(val/periodInsurance))*periodInsurance;
    return dataRoudup;
  }

  /**
   * ผลลัพธ์การคำนวณเบียประกัน
   * @param premium 
   */
  private premiumRider(premium: number) {
    //console.log("rider : ",premium);
    this.riderInsuranceSum = premium;
    this.getInsuranSum();

    this.universalData.rider = this.rider;
    this.universalData.riderInsuranceSum = this.riderInsuranceSum;
  }

  private setEditData() {

    if(typeof this.universalData.quotationul != 'undefined') {

      this.prospect = this.navParams.get('prospect');
      //console.log("setEditData prospect  navParams : ",this.prospect);

      let quotation = this.universalData.quotationul;
      if(quotation['plancode'] != 'UZA'){

        this.payType = Number(quotation['mode']);

        this.detailBypayType();

        this.broadcaster.broadcast('payType', this.payType);
        this.universalData.paymentType = this.payType;

        this.value.mainInsurance = Number(quotation['lifepremium']);

        this.topupType = quotation['topuptype'];
        this.topupChange();

        this.value.insuranceTopup = Number(quotation['topuppremium']);
       
        setTimeout(() => {

          this.value.insurance = Number(quotation['lifesum']);
          this.universalData.insurance = this.value.insurance;
          this.quatationSum = this.value.insurance;

       }, 1000);

        this.universalData.mainInsurance = this.value.mainInsurance;
        this.universalData.topupType = this.topupType;
        this.universalData.topup = this.value.insuranceTopup;

        const quotationRiderMs = quotation['quotationRiderMs'];

        if(quotationRiderMs.length > 0){
          let  riders: object = {};
         
            for (let data of quotationRiderMs) {
  
             const riderType = data['ridertype'];
             riders[riderType] = {};
             riders[riderType]['sum'] = Number(data['sum']);
             riders[riderType]['premium'] = data['premium'];
    
            }
  
            const occ = quotation['occ'];
            const occGroup = quotation['occgroup'];
            if(occ != '' && occGroup != ''){
              _.assign(riders,{occupation:{"occ":occ,"occGroup":occGroup}});
            }

            setTimeout(() => {
              this.rider = riders;
           }, 1000);
        }
      }
    }
  }
}
