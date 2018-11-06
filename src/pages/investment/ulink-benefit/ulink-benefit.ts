import { UnitlinkBenefitUA02 } from './../../../providers/ulink-benefit/unitlink-benefit-UA02';

import { Broadcaster } from './../../../providers/utility/broadcaster';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnitlinkBenefit } from '../../../providers/ulink-benefit/unitlink-benefit';
import { Subscription } from 'rxjs';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import {UlinkAppDataProvider,  UlinkBenefitModel} from '../../../providers/ulink-app-data/ulink-app-data';

@IonicPage()
@Component({
  selector: 'page-ulink-benefit',
  templateUrl: 'ulink-benefit.html',
})
export class UlinkBenefitPage implements OnDestroy {

  /**
   * ข้อมูลตารางสรุปตัวอย่างผลประโยชน์
   */
  //private ulinkBenefit: Array<UlinkBenefitModel> = [];
  private ulinkBenefit: Array<object> = [];

  /**
   * เพิ่ม / ลด คอลัมน์
   */
  private showHideColumn: UlinkBenefitModel = new UlinkBenefitModel();


  // apiProvider: any;
  private subscription: Array<Subscription> = [];

  private indexStep:number = 0;

  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private prospect: ProspectModel;

  /**
   * @param chooseType  ค่าdropdownที่เลือก
   */
  private chooseType: string;


   /**
   * @param planCode  UAO1หรือUA02
   */  
  private planCode: string; 

  private benefitReqUA01 = {
    plancode : '', //UA01
    insureAge : 0, //อายุผู้เอาประกัน
    insureAgeEnd : 0, //อายุผู้เอาประกัน ที่สิ้นสุดความคุ้มครอง
    sex : '', //M, F 
    mode : '', //prem 1:Y 0=M 2=H 4=S
    tax : 0, //ภาษีอะไรสักอย่าง น่าจะเป็น rate ภาษี
    quotationSum : 0, //ทุนประกัน
    quotationPremium : 0, //เบี้ยประกันหลัก
    topupPremium : 0, //การชำระเบี้ยเพิ่มพิเศษ (Top-Up Premium)
    inflationrate : 0, // อัตราเงินเฟ้อ tab ถอน
    arrtop : [], //array ของ 'Top-Up'
    arrwd : [], //เก็บข้อมูลของ 'การถอน'
    arrpro : [], //array ของ 'ผลตอบแทน'
  };

  private benefitReqUA02 = {
    plancode : '', //UA02
    sex : '', //M, F  
    mode : 0, //รูปแบบการจ่าย Ex รายปี, รายเดือน, ...
    insureAge : 0,//อายุผู้เอาประกัน
    lastAgePay : 0,//อายุสุดท้ายที่จ่ายเบี้ย
    insureAgeEnd : 0,//อายุผู้เอาประกัน ที่สิ้นสุดความคุ้มครอง
    tax : 0,//
    totalRiderPremium : 0,//เบี้ย rider รวม
    arrrpp : [], //จำนวนเงินเอาประกันภัย (RPP)
    arrpay : [], //คาดว่าจะชำระเบี้ยประกันภัย
    arrwd : [], //เป็น object เก็บข้อมูลของ 'การถอน'
    arrpro : [], //เป็น object เก็บข้อมูลของ array ของ 'ผลตอบแทน'
    testEm : 0, //ป็น "0", "25", "50", "75"
    testEp : 0, //ไม่มี ใส่ 0
    testEpYear : 0,//ไม่มี ใส่ 0
    inflationrate : 0, // อัตราเงินเฟ้อ tab ถอน
  };

  /**
   * เปิด
   */
  private open: boolean = false;

  //private dummyData : UnitlinkBenefit = new UnitlinkBenefit();

  constructor(
    public navCtrl: NavController, 
    public broadcaster:Broadcaster,
    public navParams: NavParams,
    private ulinkData: UlinkAppDataProvider,
    private dummyData: UnitlinkBenefit,
    private ulinkBenefitProvider: UlinkAppDataProvider,) {

    this.prospect = this.navParams.get('prospect');

    this.subscription.push(
      this.broadcaster.on('investBenefitStep').subscribe(res => {
        this.indexStep  = res;
        this.chooseType = this.ulinkBenefitProvider.chooseType;
        this.planCode = this.ulinkBenefitProvider.planCode;
        this.ulinkBenefit = [];

        if(this.planCode == 'UA01'){

          if((this.indexStep == 3 && (this.chooseType == 'self' || this.chooseType == 'retire'))
          || (this.indexStep == 4 && this.chooseType == 'educate')){
            this.dataTableUA01();
          }
        }

        if(this.planCode == 'UA02'){

          if((this.indexStep == 3 && this.chooseType == 'protect')
          || (this.indexStep == 4 && (this.chooseType == 'retire' || this.chooseType == 'health' ))
          || (this.indexStep == 5 && (this.chooseType == 'educate' || this.chooseType == 'self'))
          ){
            this.dataTableUA02();
          }
        }
      })
    );
    
    // set default
    this.checkParent(true);
    
    // this.dummy();
  }

  private dummy() {

    this.ulinkBenefit = [];
    for (let i: number = 1; i < 10; i ++) {
      let data: UlinkBenefitModel = new UlinkBenefitModel();
      data.age = i + 24;
      data.policyYear = i;
      data.sum = 1000000 * i;

      data.sumProtect = 21000000 * i;
      data.sumSaving = 22000000 * i;
      data.sumTotal = 23000000 * i;

      data.premiumSP = 2000000 * i;
      data.premiumProtect = 24000000 * i;
      data.premiumSaving = 25000000 * i;
      data.premiumTopupPlus = 3000000 * i;
      data.premiumRider = 26000000 * i;
      data.premiumTotal = 4000000 * i;
      data.premiumCumulative = 5000000 * i;

      data.expenseOperations = 6000000 * i;
      data.expenseManagement = 7000000 * i;
      data.expenseInsurance = 8000000 * i;
      data.expenseTotal = 9000000 * i;

      data.bonusSP = 10000000 * i;
      data.bonusProtect = 27000000 * i;
      // data.expectReturn = 11000000 * i;
      data.expectReturn = 3 * i;

      data.withdrawAmount = 12000000 * i;
      data.withdrawFee = 28000000 * i;
      data.withdrawActual = 29000000 * i;
      data.withdrawCumulative = 13000000 * i;

      data.valueSP = 14000000 * i;
      data.valueProtect = 30000000 * i;
      data.valueSaving = 31000000 * i;
      data.valueTopupPlus = 15000000 * i;
      data.valueTotal = 16000000 * i;

      data.deathBenefit = 17000000 * i;

      data.taxAllowance = 18000000 * i;
      // data.taxBase = 19000000 * i;
      data.taxBase = 2 * i;
      data.taxRefund = 20000000 * i;
      
      this.ulinkBenefit.push(data);
    }

  }

  /**
   * เพิ่ม / ลด คอลัมน์เป็นกลุ่ม
   */
  private checkShowHide(check: boolean, col: string) {
    alert(check + ' ' + col);
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }
  
  private dataTableUA01(){

    let dataTable = this.ulinkData.dataTableUA01();
    this.dataTableRowUA01(dataTable);
  }

  private dataTableUA02(){

    let dataTable = this.ulinkData.dataTableUA02();
    this.dataTableRowUA02(dataTable);
  }



  private dataTableRowUA01(dataArray) {

    this.ulinkBenefit = [];

    for(let dataUA01 of dataArray){
      console.log('data ---->', dataUA01);

      let data: UlinkBenefitModel = new UlinkBenefitModel();
      data.age = dataUA01['0'];
      data.policyYear = dataUA01['1'];
      data.sum = dataUA01['2'];

      data.sumProtect = 0;
      data.sumSaving = 0;
      data.sumTotal = 0;

      data.premiumSP = dataUA01['3'];
      data.premiumProtect = 0;
      data.premiumSaving = 0;
      data.premiumTopupPlus = dataUA01['4'];
      data.premiumRider = 0;
      data.premiumTotal = dataUA01['5'];
      data.premiumCumulative = dataUA01['6'];

      data.expenseOperations = dataUA01['7'];
      data.expenseManagement = dataUA01['8'];
      data.expenseInsurance = dataUA01['9'];
      data.expenseTotal =  dataUA01['10'];

      data.bonusSP = dataUA01['11'];
      data.bonusProtect = 0;
      data.expectReturn = dataUA01['12'];

      data.withdrawAmount = dataUA01['13'];
      data.withdrawFee = 0;
      data.withdrawActual = 0;
      data.withdrawCumulative = dataUA01['14'];

      data.valueSP = dataUA01['15'];
      data.valueProtect = 0;
      data.valueSaving = 0;
      data.valueTopupPlus = dataUA01['16'];
      data.valueTotal = dataUA01['17'];

      data.deathBenefit = dataUA01['18'];

      data.taxAllowance = dataUA01['19'];
      data.taxBase = dataUA01['20'];
      data.taxRefund = dataUA01['21'];
      
      this.ulinkBenefit.push(data);
    }

  }


  private dataTableRowUA02(dataArray) {

    this.ulinkBenefit = [];

    for(let dataUA02 of dataArray){
      console.log('data ---->', dataUA02);

      let data: UlinkBenefitModel = new UlinkBenefitModel();
      data.age = dataUA02['0'];
      data.policyYear = dataUA02['1'];
      data.sum = 0;

      data.sumProtect = dataUA02['2'];
      data.sumSaving = dataUA02['3'];
      data.sumTotal = dataUA02['4'];

      data.premiumSP = 0;
      data.premiumProtect = dataUA02['5'];
      data.premiumSaving = dataUA02['6'];
      data.premiumTopupPlus = dataUA02['7'];
      data.premiumRider = dataUA02['8'];
      data.premiumTotal = dataUA02['9'];
      data.premiumCumulative = dataUA02['10'];

      data.expenseOperations = dataUA02['11'];
      data.expenseManagement = dataUA02['12'];
      data.expenseInsurance = dataUA02['13'];
      data.expenseTotal =  dataUA02['14'];

      data.bonusSP = 0;
      data.bonusProtect = dataUA02['15'];
      data.expectReturn = dataUA02['16'];

      data.withdrawAmount = dataUA02['17'];
      data.withdrawFee = dataUA02['18'];
      data.withdrawActual = dataUA02['19'];
      data.withdrawCumulative = dataUA02['20'];

      data.valueSP = 0;
      data.valueProtect = dataUA02['21'];
      data.valueSaving = dataUA02['22'];
      data.valueTopupPlus = dataUA02['23'];
      data.valueTotal = dataUA02['24'];

      data.deathBenefit = dataUA02['25'];

      data.taxAllowance = dataUA02['26'];
      data.taxBase = dataUA02['27'];
      data.taxRefund = dataUA02['28'];
      
      this.ulinkBenefit.push(data);
    }
  }
  
  /**
   * เพิ่ม ลด คอลัมน์ แม่
   * @param item 
   */
  private checkParent(check: boolean, item?: string): void {
    Object.keys(this.showHideColumn).forEach((idx: string) => {
      if (typeof item == 'undefined' || (idx.search(item) == 0 && idx != item)) {
        this.showHideColumn[idx] = check;
      }
    });
  }
}