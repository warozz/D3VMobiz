import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Broadcaster } from './../../../providers/utility/broadcaster';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';
import { QuotationPdfModel } from '../../../providers/quotation/quotation-pdf-model';
import { RequestModel } from '../../../providers/model/request-model';
import { FunctionName } from '../../../providers/constants/function-name';
import { CommonUtilProvider } from '../../../providers/common-util/common-util';
import { Storage } from '@ionic/storage';
import { PdfViewdataPage } from '../../pdf-viewdata/pdf-viewdata';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { QuotationModel } from '../../../providers/quotation/quotation-model';
import * as _ from 'lodash';
import { rppCalculate } from '../../../providers/ulink-app-data/rpp-calculate';
import { ValidateProvider } from '../../../providers/validate/validate';
import { CompareProspectProvider } from '../../../providers/ulink-app-data/compare-prospect';
import { ApiProvider } from '../../../providers/api/api';
import { ServiceName } from '../../../providers/constants/service-name';

@IonicPage()
@Component({
  selector: 'page-quatation-saleoffer',
  templateUrl: 'quatation-saleoffer.html',
})
export class QuatationSaleofferPage implements OnInit, AfterViewInit, OnDestroy{

  private subscription: Array<Subscription> = [];
  private insuranceType: string = '';
  private planAll:any;
  private prospect: ProspectModel;
  //private showViewPage: number = 1;
  private payType: any = '';//dropdownการจ่ายเเบบต่างๆ ของ 99/99
  //private showSolution: number = 1;
  private tlPlan:string = '';//dropdown 99/1,99/99

  private choosePlan: string = '';
  private quatationSum:number = 0;
  private showRider: boolean = true;
/*-----------99/1-----------*/
  private amount:any = 0;
  private valueTlPlanOne: any = 0;
  private minTlPlanOne: number = 100000;
  private maxTlPlanOne: number = 30000000;
  private minAlertOne : string = "เบี้ยประกันภัยต่ำสุด "+this.decimalPipe.transform(this.minTlPlanOne)+" บาท";
  private maxAlertOne : string = "เบี้ยประกันภัยสูงสุด "+this.decimalPipe.transform(this.maxTlPlanOne)+" บาท";
/*---------- 99/99 ---------- */
  private wording = {
    rppInsurancePremium: '',//เบี้ยประกัน
    minRppInsurancePremium: '',
    maxRppInsurancePremium: '',
    rspInsurancePremium: '',//เบี้ยประกัน
    minRspInsurancePremium: '',
    maxRspInsurancePremium: '',
    rppAmount: '',//จ.เงินเอาประกัน
    minAmountRpp: '',
    maxAmountRpp: ''
  };

  private value = {
    min: 0,
    rspAmount: 0,//จ.เงินเอาประกัน
    rppAmount: 0,
    minAmountRpp:0,
    maxAmountRpp:0,
    rppInsurancePremium: 0,
    rspInsurancePremium: 0,
    maxRpp: 0,
    maxRsp: 0
  }
  public jsonRpp: any;

/*------ส่วนของเบียประกันรวม------*/
  private mainInsurance:number = 0; //เบี้ยประกันหลัก
  private riderInsuranceSum:number  = 0; //สัญญาเพิ่มเติมรวม
  private insuranceSum:number = 0; //เบี้ยประกันรวม

  /**
   * สัญญาเพิ่มเติม
   */
  private rider: any = [];

  private tlplan: any;

  private callPdfData: QuotationPdfModel;

  private old_quotation_data: QuotationPdfModel;

  private quotationul: QuotationModel;

  private formatDate: string = "YYYYMMDD";
  private today: string = moment(new Date).format(this.formatDate);


  /**
   * Enable ส่วน Save
   */
  private disableSaveButton : boolean = false;
  private toggle_footer :boolean = false;
  private resetDataFlag: boolean = false;

  constructor(
    private broadcaster: Broadcaster,
    private decimalPipe: DecimalPipe,
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage,
    private commonUtilProvider: CommonUtilProvider,
    private unitlinkData: UnitlinkDataProvider,
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private validator: ValidateProvider,
    private compareProspectProvider: CompareProspectProvider,
    private apiProvider: ApiProvider,
  ) {

    this.jsonRpp = rppCalculate;
    this.prospect = this.navParams.get('prospect');
    this.compareProspectProvider.alertConfirmChangeProspect(this.prospect);

    this.subscription.push(
      this.broadcaster.on('old_quotation_data').subscribe(res => {
        this.old_quotation_data = res;
      })
    );

  }

  public ngOnInit(){
    this.subscription.push(
      this.broadcaster.on('prospect').subscribe(res => {
        this.prospect.firstName = res.firstName;
        this.prospect.lastName = res.lastName;
        this.prospect.preName = res.preName;
        this.prospect.citizenID = res.citizenID;
        this.prospect.occupationType = res.occupationType
        this.prospect.mobilephone = res.mobilephone;
        this.changeProspect(res);
      })
    );
    //set value
    this.tlPlan = this.unitlinkData.insuranceType;
    this.choosePlan = this.unitlinkData.insuranceType;
    this.payType = this.unitlinkData.paymentType;
  }

  public async ngAfterViewInit() {
    this.planAll = await this.getPlanAll();

    await this.changePlan(this.tlPlan);
    await this.getPayType(this.payType);
    this.subscription.push(
      this.broadcaster.on('tlPlan').subscribe(res => {
        this.tlPlan = res; //checkTlPlan
        this.payType = this.unitlinkData.paymentType;
        this.changePlan(this.tlPlan);
        this.getPayType(this.payType);
        if(this.tlPlan){
          this.clearValue();
        }
        console.log('plan rider : ',this.tlplan)
      })
    );

    if(this.unitlinkData.editData){
      await this.setEditData();
    }
  }

  public ngOnDestroy(){
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

    // change prospect
    private async changeProspect(prospect){
      let checkInfoProspect = await this.compareProspectProvider.alertConfirmChangeProspect(prospect);
      console.log("alertConfirmProspectProvider-->",checkInfoProspect);
      if(checkInfoProspect){
        this.prospect = await Object.assign(new ProspectModel, prospect);
        await this.clearValue();
        await this.changeAge();
      }
      await this.broadcaster.broadcast('changeProspectFlag', checkInfoProspect);
      console.log("changeProspectFlag-->",checkInfoProspect);
    }

  private changeAge(){
    console.log("change age=",this.prospect.age);
    let maxRppByAgeAndGender = this.getMaxRpp(Number(this.prospect.age), this.prospect.gender);
    this.value.maxRpp = maxRppByAgeAndGender;
    this.wording.maxRppInsurancePremium = "เบี้ยประกันภัยเพื่อความคุ้มครอง (RPP) สูงสุด "+this.decimalPipe.transform(Number(this.value.maxRpp))+" บาท";
    this.wording.rppInsurancePremium = "เบี้ยประกันภัยตั้งเเต่ "+this.decimalPipe.transform(Number(this.value.min))+" - "+this.decimalPipe.transform(Number(this.value.maxRpp));
    if(this.value.rppInsurancePremium > this.value.maxRpp){
      this.alertCtrl.warning(this.wording.maxRppInsurancePremium);
      this.value.rppInsurancePremium = this.value.maxRpp;
    }

    //rpp amount
    let premiumPerYear = this.premiumPerYear(this.value.rppInsurancePremium);
    let minByAge: number = this.getMinByAge(Number(this.prospect.age), premiumPerYear);
    let maxByAgeAndGender = this.getMaxByAgeAndGender(Number(this.prospect.age), premiumPerYear, this.prospect.gender);
    this.value.minAmountRpp = minByAge;
    this.value.maxAmountRpp = maxByAgeAndGender;
    this.wording.minAmountRpp = "จำนวนเงินเอาประกันภัยสำหรับเบี้ยประกันภัยหลักเพื่อความคุ้มครองขั้นต่ำ "+this.decimalPipe.transform(this.value.minAmountRpp)+" บาท";
    this.wording.maxAmountRpp = "จำนวนเงินเอาประกันภัยสำหรับเบี้ยประกันภัยหลักเพื่อความคุ้มครองขั้นสูง "+this.decimalPipe.transform(this.value.maxAmountRpp)+" บาท";
    if(this.value.rppAmount < minByAge){
      this.alertCtrl.warning(this.wording.minAmountRpp);
      this.value.rppAmount = minByAge;
    }else if(this.value.rppAmount > maxByAgeAndGender){
      this.alertCtrl.warning(this.wording.maxAmountRpp);
      this.value.rppAmount = maxByAgeAndGender;
    }

    if(this.value.minAmountRpp > 0 || this.value.maxAmountRpp > 0){
      this.wording.rppAmount = "จำนวนเงินเอาประกันข้ันต่ำ "+this.decimalPipe.transform(this.value.minAmountRpp)+" - " +this.decimalPipe.transform(this.value.maxAmountRpp)+" บาท";
    }else if(this.value.minAmountRpp <= 0 || this.value.maxAmountRpp <= 0){
      this.wording.rppAmount = "";
    }
  }

  private getPlanAll(){
    let reqModel: RequestModel = new RequestModel();
    reqModel.functionName = FunctionName.ULINKPLAN;
    reqModel.serviceName = ServiceName.SELECT;
    return new Promise((resolve) => {
      resolve(
        this.apiProvider.callData(reqModel).then((res: any)  => {
            if(res.data.length > 0) {
              return res.data;
            }
          }, err => {
            this.alertCtrl.error(err);
            return false;
          }
        )
      );
    });
  }

  private changePlan(tlPlan:string){
    if(tlPlan == 'UA01'){
      this.choosePlan = 'UA01';
      this.tlplan = {
        planCode: 'UA01',
        planName: this.planAll[0].planname,
        pPayYear: this.planAll[0].ppayyear,
        pEndowmentYear: this.planAll[0].pendowmentyear,
        payType: this.planAll[0].paytype,
        endowmentType: this.planAll[0].endowmenttype,
        calType: '2'
      }
    } else {
      this.amount = 0;
      this.choosePlan = 'UA02';
      this.tlplan = {
        planCode: 'UA02',
        planName: this.planAll[1].planname,
        pPayYear: this.planAll[1].ppayyear,
        pEndowmentYear: this.planAll[1].pendowmentyear,
        payType: this.planAll[1].paytype,
        endowmentType: this.planAll[1].endowmenttype,
        calType: '2'
      }
    }
  }
  /**
   * list paytype ดูการเปลี่ยนแปลงของ selection
   * และเปลี่ยนหน้า
   */
  private getPayType(payType:string){
    if( payType == '0' ) { // รายเดือน
      this.value.min = 1000;
    }else if ( payType  == '4' )  {//ราย 3 เดือน
      this.value.min = 3000;
    }else if( payType == '2' ) { // ราย 6 เดือน
      this.value.min = 6000;
    }else if ( payType  == '1' )  { // รายปี
      this.value.min = 12000;
    }

    this.changePlan(this.tlplan);
    // rpp
    let maxRppByAgeAndGender = this.getMaxRpp(Number(this.prospect.age), this.prospect.gender);
    this.value.maxRpp = maxRppByAgeAndGender;
    this.wording.rppInsurancePremium = "เบี้ยประกันภัยตั้งเเต่ "+this.decimalPipe.transform(Number(this.value.min))+" - "+this.decimalPipe.transform(Number(this.value.maxRpp));
    this.wording.minRppInsurancePremium = "เบี้ยประกันภัยเพื่อความคุ้มครอง (RPP) ขั้นต่ำ "+this.decimalPipe.transform(Number(this.value.min))+" บาท";
    this.wording.maxRppInsurancePremium = "เบี้ยประกันภัยเพื่อความคุ้มครอง (RPP) สูงสุด "+this.decimalPipe.transform(Number(this.value.maxRpp))+" บาท";

    //clear
    this.value.rspInsurancePremium = 0;
    this.value.rspAmount = 0;
    this.wording.rspInsurancePremium = '';

    if(this.value.rppInsurancePremium != 0){
      this.getSum(this.value.rppInsurancePremium, 'RPP');
    }
    console.log("PayType-->",payType);
    console.log("MinByPayType-->",this.value.min);
  }

  private getSum(val:number, incrementerType:string) {

    if(this.tlPlan == 'UA01'){
        // เช็ค value onchange ทำใบเสนอขาย 99/1: ชำระครั้งเดียว
        if(incrementerType == 'tlPlanOne'){
          if(val < this.minTlPlanOne){
            setTimeout(() => {
              this.valueTlPlanOne = this.minTlPlanOne;
            }, 20);
          }
          setTimeout(() => {
            this.amount = Math.round(this.valueTlPlanOne*1.1);//ค่าจ.เงินเอาประกันของ 99/1
          }, 40);
        }
    }
    if(this.tlPlan == 'UA02') {
      // เช็ค value onchange ทำใบเสนอขาย 99/99: RPP
      if(incrementerType == 'RPP'){
        this.value.rppInsurancePremium = val;
        this.wording.minRppInsurancePremium = "เบี้ยประกันภัยเพื่อความคุ้มครอง (RPP) ขั้นต่ำ "+this.decimalPipe.transform(Number(this.value.min))+" บาท";
        this.wording.maxRppInsurancePremium = "เบี้ยประกันภัยเพื่อความคุ้มครอง (RPP) สูงสุด "+this.decimalPipe.transform(Number(this.value.maxRpp))+" บาท";
        if(val < this.value.min){
          this.alertCtrl.warning(this.wording.minRppInsurancePremium)
          setTimeout(() => {
            this.value.rppInsurancePremium = this.value.min;
          }, 20);
        }
        else if(val > this.value.maxRpp){
          this.alertCtrl.warning(this.wording.maxRppInsurancePremium)
          setTimeout(() => {
            this.value.rppInsurancePremium = this.value.maxRpp;
          }, 20);
        }

        setTimeout(() => {
          // rpp
          let premiumPerYear = this.premiumPerYear(this.value.rppInsurancePremium);
          let minByAge: number = this.getMinByAge(Number(this.prospect.age), premiumPerYear);
          let maxByAgeAndGender = this.getMaxByAgeAndGender(Number(this.prospect.age), premiumPerYear, this.prospect.gender);
          this.value.minAmountRpp = minByAge;
          this.value.maxAmountRpp = maxByAgeAndGender;
          this.wording.minAmountRpp = "จำนวนเงินเอาประกันภัยสำหรับเบี้ยประกันภัยหลักเพื่อความคุ้มครองขั้นต่ำ "+this.decimalPipe.transform(this.value.minAmountRpp)+" บาท";
          this.wording.maxAmountRpp = "จำนวนเงินเอาประกันภัยสำหรับเบี้ยประกันภัยหลักเพื่อความคุ้มครองขั้นสูง "+this.decimalPipe.transform(this.value.maxAmountRpp)+" บาท";
          this.wording.rppAmount = "จำนวนเงินเอาประกันข้ันต่ำ "+this.decimalPipe.transform(this.value.minAmountRpp)+" - " +this.decimalPipe.transform(this.value.maxAmountRpp)+" บาท";
          if(this.value.rppAmount == 0){
            this.value.rppAmount = minByAge;
          }else if(this.value.rppAmount < minByAge){
            this.alertCtrl.warning(this.wording.minAmountRpp);
            this.value.rppAmount = minByAge;
          }else if(this.value.rppAmount > maxByAgeAndGender){
            this.alertCtrl.warning(this.wording.maxAmountRpp);
            this.value.rppAmount = maxByAgeAndGender;
          }
          // set value เข้า provider เพื่อนำไปใช้กับตัวอย่างผลประโยชน์
          let rppBroadcast = {
            rppPremium: this.value.rppInsurancePremium,
            rppPremiumPerYear: premiumPerYear,
            minRppPremium: this.value.minAmountRpp,
            maxRppPremium: this.value.maxAmountRpp
          }
          this.broadcaster.broadcast('rppBroadcast', rppBroadcast);

          // rsp
          this.value.maxRsp = Number(this.value.rppInsurancePremium) * 5;// 5 เท่าของ RPP
          this.wording.rspInsurancePremium = "เบี้ยประกันภัยตั้งเเต่ "+this.decimalPipe.transform(Number(this.value.min))+" - "+this.decimalPipe.transform(this.value.maxRsp)+" บาท";
          this.wording.minRspInsurancePremium = "เบี้ยประกันภัยเพื่อการออม (RSP) ขั้นต่ำ "+this.decimalPipe.transform(Number(this.value.min))+" บาท";
          this.wording.maxRspInsurancePremium = "เบี้ยประกันภัยเพื่อการออม (RSP) สูงสุดไม่เกิน "+this.decimalPipe.transform(this.value.maxRsp)+" บาท";
        }, 40);
      }

      const msgCheckRpp = "กรุณาระบุเบี้ยประกันภัยหลักเพื่อความคุ้มครอง (RPP)";

      if(incrementerType == 'rppAmount'){
        let premiumPerYear = this.premiumPerYear(this.value.rppInsurancePremium);
        let minByAge: number = this.getMinByAge(Number(this.prospect.age), premiumPerYear);
        if(this.value.rppInsurancePremium == 0){
          this.alertCtrl.warning(msgCheckRpp);
          setTimeout(() => {
            this.value.rppAmount = 0;
          }, 20);
        }else{
          this.wording.minAmountRpp = "จำนวนเงินเอาประกันภัยสำหรับเบี้ยประกันภัยหลักเพื่อความคุ้มครองขั้นต่ำ "+this.decimalPipe.transform(this.value.minAmountRpp)+" บาท";
          this.wording.maxAmountRpp = "จำนวนเงินเอาประกันภัยสำหรับเบี้ยประกันภัยหลักเพื่อความคุ้มครองขั้นสูง "+this.decimalPipe.transform(this.value.maxAmountRpp)+" บาท";
          if(val < minByAge){
            this.alertCtrl.warning(this.wording.minAmountRpp);
            setTimeout(() => {
              this.value.rppAmount = minByAge;
            }, 20);
          }else if(val > this.value.maxAmountRpp){
            this.alertCtrl.warning(this.wording.maxAmountRpp);
            setTimeout(() => {
              this.value.rppAmount = this.value.maxAmountRpp;
            }, 20);
          }
        }
      }

      // เช็ค value onchange ทำใบเสนอขาย 99/99: RSP
      if(incrementerType == 'RSP'){
        this.value.rspInsurancePremium = val;
        this.wording.minRspInsurancePremium = "เบี้ยประกันภัยเพื่อการออม (RSP) ขั้นต่ำ "+this.decimalPipe.transform(Number(this.value.min))+" บาท";
        this.wording.maxRspInsurancePremium = "เบี้ยประกันภัยเพื่อการออม (RSP) สูงสุดไม่เกิน "+this.decimalPipe.transform(this.value.maxRsp)+" บาท";
        if(this.value.rppInsurancePremium == 0){
          this.alertCtrl.warning(msgCheckRpp);
          setTimeout(() => {
            this.value.rspInsurancePremium = 0;
          }, 20);
        }else{
          if(val){
            if(val < this.value.min){
              this.alertCtrl.warning(this.wording.minRspInsurancePremium);
              setTimeout(() => {
                this.value.rspInsurancePremium = this.value.min;
              }, 20);
            }else if(val > this.value.maxRsp){
              this.alertCtrl.warning(this.wording.maxRspInsurancePremium);
              setTimeout(() => {
                this.value.rspInsurancePremium = this.value.maxRsp;
              }, 20);
            }else{
              this.value.rspInsurancePremium = val;
            }
          }else{
            setTimeout(() => {
              this.value.rspInsurancePremium = 0;
            }, 20);
          }
          setTimeout(() => {
            let premiumPerYear = this.premiumPerYear(this.value.rspInsurancePremium);
            this.value.rspAmount = Number(premiumPerYear) * 5;
          }, 40);
        }
      }

      // sum premium
      setTimeout(() => {
        this.mainInsurance =  Number(this.value.rppInsurancePremium) +  Number(this.value.rspInsurancePremium);//เบี้ยRPP+เบี้ยRSP
        this.insuranceSum =  Number(this.mainInsurance) + Number(this.riderInsuranceSum);//เบี้ยประกันภัยหลัก+ผลรวมของสัญญาเพิ่มเติม
        this.quatationSum = Number(this.value.rppAmount) + Number(this.value.rspAmount);
        this.unitlinkData.insuranceSum = this.insuranceSum;
        console.log("mainInsurance -->",this.mainInsurance);
        console.log("insuranceSum-->", this.insuranceSum);
        console.log("quatationSum-->", this.quatationSum);
      }, 60);
    }
  }

  /**
  * เช็คค่า RPP นำมาเทียบรายปี
  */
  private premiumPerYear(rppInsurancePremium:number) : number {
    let rppInsurancePremiumCompairOneYear = 0;
    if( this.payType == '0' ) { // รายเดือน
      rppInsurancePremiumCompairOneYear = rppInsurancePremium * 12;
    } else if ( this.payType  == '4' )  {//ราย 3 เดือน
      rppInsurancePremiumCompairOneYear = rppInsurancePremium * 4;

    } else if( this.payType == '2' ) { // ราย 6 เดือน
      rppInsurancePremiumCompairOneYear = rppInsurancePremium * 2;

    } else if ( this.payType  == '1' )  { // รายปี
      rppInsurancePremiumCompairOneYear = rppInsurancePremium;
    }
    console.log("rppInsurancePremiumCompairOneYear--->",rppInsurancePremiumCompairOneYear);
    return rppInsurancePremiumCompairOneYear;
  }

  /**
  * เบี้ยประกันความคุ้มครองเริ่มต้น 5 เท่า ของ RPP โดยจะเท่าขึ้นกับอายุ
  */
  private getMinByAge(age:number , rppInsurancePremium:number ) : number { //เริ่มต้น 5 เท่า ของ RPP
    let minAmountRpp = 0 ;
    this.jsonRpp.rppByAge.forEach(function(data) {
      if(age >= data.minAge && age <= data.maxAge){
        minAmountRpp = rppInsurancePremium * data.multiply;
      }
    });
    console.log("minAmountRpp : ",minAmountRpp);
    return minAmountRpp;
  }
/**
  * เบี้ยประกันความคุ้มครองสูงสุด 5 เท่า ของ RPP โดยจะเท่าขึ้นกับอายุและเพศ
  */
  private getMaxByAgeAndGender(age:number, rppInsurancePremium:number, gender:string) : number { //เริ่มต้น 5 เท่า ของ RPP
    let maxAmountRpp = 0;
    this.jsonRpp.rppByGender.forEach(function(data){
      if(age >= data.minAge && age <= data.maxAge){
        if(gender == "F"){
          maxAmountRpp = rppInsurancePremium * data.genderF;
        }else if(gender == "M"){
          maxAmountRpp = rppInsurancePremium * data.genderM;
        }
      }
    });
    console.log("maxAmountRpp ::: ", maxAmountRpp);
    return maxAmountRpp;
  }

  private getMaxRpp(age:number, gender:string): number{
    const limit = 999999999;
    let maxRpp = 0;
    let compare = 0;

    if( this.payType == '0' ) { // รายเดือน
      compare = Math.floor(limit/12);
    } else if ( this.payType  == '4' )  {//ราย 3 เดือน
      compare = Math.floor(limit/4);
    } else if( this.payType == '2' ) { // ราย 6 เดือน
      compare = Math.floor(limit/2);
    } else if ( this.payType  == '1' )  { // รายปี
      compare = limit;
    }

    this.jsonRpp.rppByGender.forEach(function(data){
      if(age >= data.minAge && age <= data.maxAge){
        if(gender == "F"){
          maxRpp = Math.floor(compare/data.genderF);
        }else if(gender == "M"){
          maxRpp = Math.floor(compare/data.genderM);
        }
      }
    });
    console.log("Max RPP--->",maxRpp);
    return maxRpp;
  }

  private clearValue(): void {
    this.wording.rspInsurancePremium = '';
    this.wording.rppAmount = '';
    this.value.rspAmount = 0;
    this.value.rppAmount = 0;
    this.value.minAmountRpp = 0;
    this.value.maxAmountRpp = 0;
    this.value.rppInsurancePremium = 0;
    this.value.rspInsurancePremium = 0;
    this.value.maxRsp = 0;
    this.mainInsurance = 0;
    this.riderInsuranceSum = 0;
    this.insuranceSum = 0;
    this.valueTlPlanOne = 0;
    this.amount = 0;
    this.showRider = false;
    this.quatationSum = 0;
    if(this.tlPlan == 'UA02'){
      setTimeout(() => {
        for (let key in this.rider) {
         if(key != 'occupation'){
           let sum = Number(this.rider[key].sum);
           let premium = Number(this.rider[key].premium);
           if(sum > 0){
             this.rider[key].sum = 0;
           }
           if(premium > 0){
             this.rider[key].premium = '000000000';
           }
         }
       }
       if(typeof this.rider['occupation'] != 'undefined'){
         delete this.rider['occupation'];
       }
       this.showRider = true;
       console.log('clear RIDER --->', this.rider );
     }, 1000);
    }
  }

  /**
   * ผลลัพธ์การคำนวณเบียประกัน
   * @param premium
   */
  private premiumRider(premium: number) {
    this.riderInsuranceSum = premium;
    this.insuranceSum =  Number(this.mainInsurance) + Number(this.riderInsuranceSum);
    this.unitlinkData.insuranceSum = this.insuranceSum;
    this.unitlinkData.rider = this.rider;
    this.unitlinkData.riderInsuranceSum = this.riderInsuranceSum;
  }

  private getRiderSelected(): Array<any> {

    let riderSelectedList: Array<any> = [];
    let riderkey: Array<string> = [];
    let dataList: Array<any> = [];

    // Set ABD Rider
    if(this.tlPlan === 'UA01'){

      let riderDetail = String(this.amount);
      if(this.amount > 1000000){
        riderDetail = '1000000';
      }
      const rider = {
        riderName: 'TP',
        riderDetail: riderDetail,
        riderPremium: '0'
      }
      riderSelectedList.push(rider);

    }else {
      // this.rider = this.rider;
      for (let key in this.rider) {
        if(key != 'occupation'){
          let sum = Number(this.rider[key].sum);
          if(sum > 0){
            const data = [key, this.rider[key]];
            dataList.push(data);
          }
        }
      }

      for( let data of dataList){

        if(data[0] != 'occupation'){

          let riderName = data[0];
          let riderDetail = String(data[1].sum);
          let riderPremium = String(Number(data[1].premium));

          if(data[0] == 'G'){
            switch(riderDetail) {
              case "2000": {
                riderDetail = "G11";
                break;
              }
              case "4000": {
                riderDetail = "G12";
                break;
              }
              case "6000": {
                riderDetail = "G13";
                break;
              }
              case "8000": {
                riderDetail = "G14";
                break;
              }
              case "10000": {
                riderDetail = "G15";
                break;
              }
            }
          } else if(data[0] == 'J0'){
            switch(riderDetail) {
              case "1": {
                riderDetail = "J01";
                break;
              }
              case "2": {
                riderDetail = "J02";
                break;
              }
              case "3": {
                riderDetail = "J03";
                break;
              }
            }
          }


          const rider = {
            riderName: riderName,
            riderDetail: riderDetail,
            riderPremium: riderPremium
          }
          riderSelectedList.push(rider);
        }
      }
    }



    return riderSelectedList;

  }

  /**
   *  Validate open quatation
   */
  private validateOpenQuotation(): boolean{
    if(this.tlPlan == 'UA01' && this.valueTlPlanOne == 0){
      this.alertCtrl.warning('คุณยังไม่ได้ระบุเบี้ยประกันภัย');
      return false;
    }else if(this.tlPlan == 'UA02' && this.value.rppInsurancePremium == 0){
      this.alertCtrl.warning('คุณยังไม่ได้ระบุเบี้ยประกันภัยหลักเพื่อความคุ้มครอง (RPP)');
      return false;
    }else{
      return true;
    }
  }

  /**
   * ดูใบเสนอขาย Quatation
   */
  private openQuotation() {
    let validateData = this.validator.validateProspect(this.prospect, true, true, false);
    if(validateData && this.validateOpenQuotation()){
      this.loadingCtrl.present();
      this.modelProvider();

      this.unitlinkData.insuranceSum = this.insuranceSum;
      this.unitlinkData.prospect = this.prospect;
      this.unitlinkData.paymentType = this.payType;

      this.storage.get('tlpromptMode').then(async mode => {
        this.storage.get('loginProfile').then(async profile => {

          let formData: QuotationPdfModel = new QuotationPdfModel();

          console.log('frist unitlinkData  :',this.unitlinkData)
          if(this.tlPlan == 'UA01'){
            formData.rpp = this.valueTlPlanOne
            formData.moneyRPP = this.amount
            formData.rsp = "0"
            formData.moneyRSP = "0"
            formData.total = this.valueTlPlanOne
          }else if(this.tlPlan == 'UA02'){
            formData.rpp = String(this.value.rppInsurancePremium)
            formData.moneyRPP = String(this.value.rppAmount)
            formData.rsp = String(this.value.rspInsurancePremium)
            formData.moneyRSP = String(this.value.rspAmount)
            formData.total = String(this.insuranceSum)
          }
          formData.planCode = this.tlPlan
          formData.lang = "T"
          formData.refNo = ""
          formData.age = String(this.prospect.age)
          formData.sex = this.prospect.gender

          formData.mode = this.payType
          formData.em = "0"
          formData.agentName = profile.pName+' '+profile.fName+' '+profile.lName
          formData.consName = this.prospect.preName +' '+this.prospect.firstName+' '+this.prospect.lastName
          formData.preName = this.prospect.preName
          formData.firstName = this.prospect.firstName
          formData.lastName = this.prospect.lastName
          formData.idCard = this.prospect.citizenID != undefined ? this.prospect.citizenID : ''
          formData.topup = "0"
          formData.topuptype = ""

          // YYYYMMDD
          let day = this.today.substring(6, 8);
          let month = this.today.substring(4, 6);
          let year = Number(this.today.substring(0,4))+543;
          let tmpToday = year+month+day;
          formData.sysdate = tmpToday;

          let riderSelectedList: Array<any> = this.getRiderSelected();
          formData.riderList = riderSelectedList

          formData.flag = ""
          formData.quotationStatus = ""
          formData.quotationno = ""
          formData.customerid = ""
          var prospectForChk = {};
          var quotationnData = {};
          //compare prospect vs quotation
          if(typeof this.unitlinkData.quotationul != 'undefined'){

            prospectForChk = {
              age: this.prospect.age,
              birthDate:  this.prospect.birthDate.substring(0, 10),
              citizenID: this.prospect.citizenID,
              firstName: this.prospect.firstName,
              gender: this.prospect.gender,
              lastName: this.prospect.lastName,
              mobilephone: this.prospect.mobilephone,
              occupationType: this.prospect.occupationType,
              preName:  this.prospect.preName
            }
            let quotationBirthdate = String(moment(this.unitlinkData.quotationul.birthdate).format("YYYY-MM-DD HH:mm:ss"));
            quotationnData = {
              age: this.unitlinkData.quotationul.insureage,
              birthDate: this.unitlinkData.quotationul.birthdate.substring(0, 10),
              citizenID: this.unitlinkData.citizenid,
              firstName: this.unitlinkData.quotationul.fname,
              gender: this.unitlinkData.quotationul.gender,
              lastName: this.unitlinkData.quotationul.lname,
              mobilephone: this.unitlinkData.mobilephone,
              occupationType: this.unitlinkData.quotationul.occupationtype,
              preName:  this.unitlinkData.quotationul.pname
            }

          }//

          this.callPdfData = formData;
          console.log('callPdfData AA---> ', this.callPdfData)
          console.log('old_quotation_data AA---> ', this.old_quotation_data)
          console.log('prospectForChk > ',prospectForChk)
          console.log('quotationnData > ',quotationnData)

          if(this.old_quotation_data != undefined){
            // หน้าจอ ไม่มีการแก้ ข้อมูล
            console.log('old_quotation_data != undefined');

            if(this.isEquivalent(this.callPdfData, this.old_quotation_data)
            && this.isEquivalent(quotationnData, prospectForChk)){
              console.log('this.callPdfData === this.old_quotation_data');
              this.callPdfData = this.old_quotation_data;
              this.callPdfData.quotationStatus = "R";
              console.log('ABC 1111')
            }

          }else{
            this.old_quotation_data  = undefined;
            if(!this.isEquivalent(quotationnData, prospectForChk)){
              this.callPdfData.flag = ""
              this.callPdfData.quotationStatus = ""
              this.callPdfData.quotationno = ""
              this.callPdfData.refNo = ""
              this.callPdfData.customerid = ""
              console.log('ABC 2222')

              console.log('ไม่มี old_quo และ มีการแก้');
            }
          }

          // save data in same quotation
          if(this.unitlinkData.editData){ // by edit
            if(this.unitlinkData.quotationul){
              if(!this.unitlinkData.quotationul.referenceno){
                this.callPdfData.flag = ""
                this.callPdfData.quotationStatus = ""
                this.callPdfData.refNo = "";
                this.callPdfData.quotationno = this.unitlinkData.quotationul.quotationno;
              console.log('ABC 3333')

                console.log('edit quotation UL !!! new quotation !!!')
              }
            }

          }else{// new data
            if(this.unitlinkData.quotationul &&
              (this.unitlinkData.quotationul.quotationno != this.callPdfData.quotationno)){
                this.callPdfData.flag = ""
                this.callPdfData.quotationStatus = ""
                this.callPdfData.refNo = "";
                this.callPdfData.quotationno = this.unitlinkData.quotationul.quotationno;
              console.log('ABC 4444')

                console.log('change quotationul.quotationno !!!!!')
            }
          }

          if(this.callPdfData.refNo && !this.unitlinkData.quotationul) {
            this.callPdfData.flag = ""
            this.callPdfData.quotationStatus = ""
            this.callPdfData.refNo = ""
            this.callPdfData.quotationno = ""
            console.log('ABC 5555')

            console.log('มี refNo และ ไม่มี quotationul !!!!!')

          }



          console.log('callPdfData BB---> ', this.callPdfData)
          console.log('old_quotation_data BB---> ', this.old_quotation_data)

          let reqModel: RequestModel = new RequestModel()
          reqModel.agentid = profile.agentid
          reqModel.mode = mode
          reqModel.functionName = FunctionName.UNITLINKPDF
          reqModel.param = [this.callPdfData]
          console.log('reqModel before : ', reqModel)

          this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
            (res: any) => {

              console.log('api res : ',res)

              if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
                const rawdata = res.datas[0].binaryQuotationPDF;

                const pdfData = "data:application/pdf;base64," + rawdata;
                let data = {
                  unitlinkPdf: true,
                  citizenID: this.prospect.citizenID,
                  showReqRefButton: true,
                  callPdfData: this.callPdfData,
                  pdfDetail: {
                    pageTotal: res.pageTotal,
                    pdfName : res.datas[0].pdfFileName,
                    src: pdfData,
                  },
                  planCode : this.tlplan.planCode
                };
                this.loadingCtrl.dismiss();
                this.navCtrl.push(PdfViewdataPage, data);
              }
              else{
              this.loadingCtrl.dismiss();
              console.log("No PDF File");
              this.alertCtrl.warning("เกิดข้อผิดพลาดของระบบ");
              }

            },
            (err) => {
              console.log("Call Service PDF Error : ", err);
              this.alertCtrl.warning("เกิดข้อผิดพลาดของระบบ");
              this.loadingCtrl.dismiss();
            });

        });
      });
    }
  }// end openQuotation

  private isEquivalent(newData, oldData) {

    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(newData);
    const bProps = Object.getOwnPropertyNames(oldData);
    // console.log('newData --Z>', newData);
    // console.log('oldData --Z>', oldData);
    // console.log('tlPlan --Z>', this.tlPlan);


    if(this.unitlinkData.editData){
      let quotation = this.navParams.get('quotationUnitLink');

      const refNo = quotation['referenceno'];



      if(this.tlPlan == 'UA01'){
        // console.log('UA01 !')
        // console.log('L>>',this.valueTlPlanOne+ ' : ' + this.old_quotation_data.rpp)
        if(refNo != ''){
          if(Number(this.valueTlPlanOne) != Number(this.old_quotation_data.rpp) ){
            console.log(this.valueTlPlanOne+ ' !== ' + this.old_quotation_data.rpp)
            return false;
          }
        }


      }else if(this.tlPlan == 'UA02'){
        // console.log('UA02 !')
        if(refNo != ''){
          if(Number(this.value.rppInsurancePremium) != Number(this.old_quotation_data.rpp)
          || Number(this.value.rspInsurancePremium) != Number(this.old_quotation_data.rsp)
          || Number(this.value.rppAmount) != Number(this.old_quotation_data.moneyRPP)){
            // console.log('old  !=',this.old_quotation_data)
            return false;
          }
        }

        for (let i = 0; i < aProps.length; i++) {
          const propName = aProps[i];

          if (propName == "riderList") {

            let newDataRiderkey: Array<string> = [];
            let oldDataRiderkey: Array<string> = [];


            if (newData[propName].length != oldData[propName].length) {
              return false;
            }


            for (let data of newData[propName]) {

              newDataRiderkey.push(data["riderName"]);
            }

            for (let data of oldData[propName]) {

              oldDataRiderkey.push(data["riderName"]);
            }


            for (let data of newDataRiderkey) {

              if (oldDataRiderkey.indexOf(data) == -1) {
                //console.log('No key');
                return false;
              }
              else {

                const newdata = newData[propName].filter(function (item) {
                  return item.riderName == data;
                });

                const olddata = oldData[propName].filter(function (item) {
                  return item.riderName == data;
                });

                if (newdata[0].riderDetail !== olddata[0].riderDetail) return false;
                if (newdata[0].riderPremium !== olddata[0].riderPremium) return false;

              }
            }
            console.log('2222222')

          }



      }


    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];
      if(propName != "refNo"
      && propName != "riderList"
      && propName != "flag"
      && propName != "quotationStatus"
      && propName != "quotationno"
      && propName != "customerid"){
    if (newData[propName] != oldData[propName]) {
      // console.log('loop data >> :'+newData[propName]+' != '+oldData[propName])
      // console.log('loop prop >> :'+propName)
      return false;
    }

    }


}


    }else{ //new data

      if (aProps.length != bProps.length) {
        return false;
      }

      for (let i = 0; i < aProps.length; i++) {
          const propName = aProps[i];

          // console.log('propName --Z>', propName);

          if(propName != "refNo"
              && propName != "riderList"
              && propName != "flag"
              && propName != "quotationStatus"
              && propName != "quotationno"
              && propName != "customerid"){
            if (newData[propName] !== oldData[propName]) {
              console.log('loop data >> :'+newData[propName]+' !== '+oldData[propName])
              console.log('loop prop >> :'+propName)
              return false;
            }
          }

          if(propName == "riderList" ){

            let newDataRiderkey: Array<string> = [];
            let oldDataRiderkey: Array<string> = [];

            if (newData[propName].length != oldData[propName].length) {
              return false;
            }

            for( let data of newData[propName]){

              newDataRiderkey.push(data["riderName"]);
            }

            for( let data of oldData[propName]){

              oldDataRiderkey.push(data["riderName"]);
            }

            for( let data of newDataRiderkey){

              if(oldDataRiderkey.indexOf(data) == -1){
                //console.log('No key');
                return false;
              }
              else {

                const newdata = newData[propName].filter(function(item){
                  return item.riderName == data;
                });

                const olddata = oldData[propName].filter(function(item){
                  return item.riderName == data;
                });

                if(newdata[0].riderDetail !== olddata[0].riderDetail) return false;
                if(newdata[0].riderPremium !== olddata[0].riderPremium) return false;

              }
            }
            console.log('2222222')

          }
      }

    }



    return true;
  }

  private modelProvider(){
    let data = this.unitlinkData;
    
    data.prospect = this.prospect;
    data.insuranceType = this.tlPlan;

    if(this.tlPlan == 'UA01'){
      data.insuranceSum = this.valueTlPlanOne;
      data.insuranceName = this.planAll[0].planname;
      data.payyear = this.planAll[0].ppayyear;
      data.edownyear = this.planAll[0].pendowmentyear;
      data.edowntype = this.planAll[0].endowmenttype;
      data.paytype = this.planAll[0].paytype;
      data.paymentType = this.payType;
      data.rppPremium = this.valueTlPlanOne;
      data.rppSum = this.amount;
      data.rspPremium = 0;
      data.rspSum = 0;
      data.riderInsuranceSum = 0;
      data.rider = [];
    }else if(this.tlPlan == 'UA02'){
      data.insuranceSum = this.insuranceSum;
      data.insuranceName = this.planAll[1].planname;
      data.payyear = this.planAll[1].ppayyear;
      data.edownyear = this.planAll[1].pendowmentyear;
      data.edowntype = this.planAll[1].endowmenttype;
      data.paytype = this.planAll[1].paytype;
      data.paymentType = this.payType;
      data.rppPremium = this.value.rppInsurancePremium;
      data.rppSum = this.value.rppAmount;
      data.rspPremium = this.value.rspInsurancePremium;
      data.rspSum = this.value.rspAmount;
      data.riderInsuranceSum = this.riderInsuranceSum;
      data.rider = this.rider;
    }
  }

  private async saveData() {
    this.disableSaveButton = true;
    this.loadingCtrl.present();
    await this.modelProvider();
    console.log('saveData unitlinkData',this.unitlinkData);
    let validateProspect = this.validator.validateProspect(this.prospect, true, true, false);
    if(validateProspect) await this.unitlinkData.saveData();
    this.disableSaveButton = false;
    this.loadingCtrl.dismiss();
  }

  private setEditPaytype(payType:string) : number{
    let min = 0;
    if( payType == '0' ) {// รายเดือน
      min = 1000;
    }else if ( payType  == '4' )  {//ราย 3 เดือน
      min = 3000;
    }else if( payType == '2' ) { // ราย 6 เดือน
      min = 6000;
    }else if ( payType  == '1' )  { // รายปี
      min = 12000;
    }
    return min;
  }

  private setEditData(){
    console.log('setEditData func')
     if(typeof this.navParams.get('quotationUnitLink') != 'undefined') {
      let quotation = this.navParams.get('quotationUnitLink');
      this.unitlinkData.citizenid = this.prospect.citizenID;
      this.unitlinkData.mobilephone = this.prospect.mobilephone;
        //set pdf
      const refNo = quotation['referenceno'];
      console.log('refNo ==> ',refNo)
      console.log('quotation ==> ',quotation)

      if(refNo != ''){
        this.storage.get('tlpromptMode').then(async mode => {
          this.storage.get('loginProfile').then(async profile => {

            this.old_quotation_data = new QuotationPdfModel();

            this.old_quotation_data.planCode = this.insuranceType;
            this.old_quotation_data.lang = "T"
            this.old_quotation_data.refNo = refNo != '' ? refNo : '';
            this.old_quotation_data.age = String(this.prospect.age)
            this.old_quotation_data.sex = this.prospect.gender

            this.old_quotation_data.mode = this.payType
            this.old_quotation_data.em = "0"
            this.old_quotation_data.agentName =  profile.pName+' '+profile.fName+' '+profile.lName
            this.old_quotation_data.consName = this.prospect.preName +' '+this.prospect.firstName+' '+this.prospect.lastName

            let day = this.today.substring(6, 8);
            let month = this.today.substring(4, 6);
            let year = Number(this.today.substring(0,4))+543;
            let tmpToday = year+month+day;
            this.old_quotation_data.sysdate = tmpToday;

            if(quotation.plancode == 'UA01'){
              this.old_quotation_data.rpp = quotation['lifepremium'];
              this.old_quotation_data.moneyRPP = quotation['lifesum'];
              this.old_quotation_data.rsp = "0";
              this.old_quotation_data.moneyRSP = "0";
            }else if(quotation.plancode == 'UA02'){
              this.old_quotation_data.rpp = quotation['lifepremium'];
              this.old_quotation_data.moneyRPP = quotation['lifesum'];
              this.old_quotation_data.rsp = quotation['savingpremium'];
              this.old_quotation_data.moneyRSP = quotation['savingsum'];
            }

            setTimeout(() => {
              let riderSelectedList: Array<any> = this.getRiderSelected();
              this.old_quotation_data.riderList = riderSelectedList;
            }, 1000);

            // set default
            this.old_quotation_data.flag = "2";
            this.old_quotation_data.quotationStatus = "R";
            this.old_quotation_data.quotationno = quotation['quotationno'];
            this.old_quotation_data.customerid = quotation['customerid'];
          });
        });
        console.log('old_quotation_data >>  >> ',this.old_quotation_data)
      }
        //set value
        this.insuranceType = this.unitlinkData.insuranceType;
        this.payType = this.unitlinkData.paymentType;
        if(this.insuranceType == 'UA01'){
          this.choosePlan = 'UA01';
          this.valueTlPlanOne = this.unitlinkData.rppPremium;
          this.amount = this.unitlinkData.rppSum;
          this.value.rppInsurancePremium = 0;
          this.value.rppAmount = 0;
          this.value.rspInsurancePremium = 0;
          this.value.rspAmount = 0;
        }else if(this.insuranceType == 'UA02'){
          this.choosePlan = 'UA02';
          this.valueTlPlanOne = 0;
          this.amount = 0;
          this.value.rppInsurancePremium = this.unitlinkData.rppPremium;
          this.value.rppAmount = this.unitlinkData.rppSum;
          this.value.rspInsurancePremium = this.unitlinkData.rspPremium;
          this.value.rspAmount = this.unitlinkData.rspSum;
        }

        this.value.min = this.setEditPaytype(this.payType);
        let maxRppByAgeAndGender = this.getMaxRpp(Number(this.prospect.age), this.prospect.gender);
        this.value.maxRpp = maxRppByAgeAndGender;
        this.wording.rppInsurancePremium = "เบี้ยประกันภัยตั้งเเต่ "+this.decimalPipe.transform(Number(this.value.min))+" - "+this.decimalPipe.transform(this.value.maxRpp);
        // rpp
        let premiumPerYear = this.premiumPerYear(this.value.rppInsurancePremium);
        let minByAge = this.getMinByAge(Number(this.prospect.age), premiumPerYear);
        let maxByAgeAndGender = this.getMaxByAgeAndGender(Number(this.prospect.age), premiumPerYear, this.prospect.gender);
        this.value.minAmountRpp = minByAge;
        this.value.maxAmountRpp = maxByAgeAndGender;
        this.wording.rppAmount = "จำนวนเงินเอาประกันข้ันต่ำ "+this.decimalPipe.transform(this.value.minAmountRpp)+" - " +this.decimalPipe.transform(this.value.maxAmountRpp)+" บาท";

        // rsp
        this.value.maxRsp = Number(this.value.rppInsurancePremium) * 5;// 5 เท่าของ RPP
        this.wording.rspInsurancePremium = "เบี้ยประกันภัยตั้งเเต่ "+this.decimalPipe.transform(Number(this.value.min))+" - "+this.decimalPipe.transform(this.value.maxRsp)+" บาท";

        //get sum insurance
        this.mainInsurance =  Number(this.value.rppInsurancePremium) + Number(this.value.rspInsurancePremium);//เบี้ยRPP+เบี้ยRSP
        this.insuranceSum =  Number(this.mainInsurance) + Number(this.riderInsuranceSum);//เบี้ยประกันภัยหลัก+ผลรวมของสัญญาเพิ่มเติม
        this.quatationSum = Number(this.value.rppAmount) + Number(this.value.rspAmount);
        this.unitlinkData.insuranceSum = this.insuranceSum;

        //get rider
        const quotationRiderMs = quotation['quotationRiderMs'];
          if(quotationRiderMs.length > 0){
            let  riders: object = {};
              for (let data of quotationRiderMs) {

              console.log('quotationRiderMs --->', data);
              const riderType = data['ridertype'];

              riders[riderType] = {};
              riders[riderType]['sum'] = Number(data['sum']);
              riders[riderType]['premium'] = data['premium'];

              console.log('riders -->', riders);

              }

              const occ = quotation['occ'];
              const occGroup = quotation['occgroup'];
              if(occ != '' && occGroup != ''){
                _.assign(riders,{occupation:{"occ":occ,"occGroup":occGroup}});
              }

              setTimeout(() => {
                this.rider = riders;
                console.log('this.rider 99/99 ==>', this.rider);
            }, 1000);
          }
    }
  }

  private resetData(): void {
    this.clearValue();
    // reset unitlink provider
    this.unitlinkData.resetData();
    this.unitlinkData.editData = false;
    this.unitlinkData.deposit = 'N';
    this.unitlinkData.fixedincome = 'N';
    this.unitlinkData.governmentbonds = 'N';
    this.unitlinkData.stock = 'N';
    this.unitlinkData.insuranceType = '';
    this.unitlinkData.prospectUlinkExpreiene_open = false;
    this.unitlinkData.quotationul = undefined;

    this.prospect.customerID = undefined;
    this.prospect.preName = 'นางสาว';
    this.prospect.gender = 'F';
    this.prospect.firstName = '';
    this.prospect.lastName = '';
    this.prospect.citizenID = '';
    this.prospect.birthDate = moment().add(-30, 'years').format('YYYY-MM-DD');
    this.prospect.age = '30';
    this.prospect.mobilephone = '';
    this.prospect.occupationType = '2';
    this.compareProspectProvider.newProspect = this.prospect;
    console.log("broadcast prospect-->",this.prospect);
    this.broadcaster.broadcast('prospect', this.prospect);
    this.broadcaster.broadcast('resetDataFlagUlink', true);
  }
}
