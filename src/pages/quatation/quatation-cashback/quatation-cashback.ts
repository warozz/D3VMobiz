import { ServiceName } from './../../../providers/constants/service-name';
import { ExtendedM } from './../../../providers/extended/extended-model';
import { QuatationValueCal } from './../../../providers/utility/quatation-value-cal';
import { Broadcaster } from './../../../providers/utility/broadcaster';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { RequestModel } from '../../../providers/model/request-model';
import { TLPlanModel } from '../../../providers/tlplan/tlplan-model';
import { FunctionName } from '../../../providers/constants/function-name';
import { CoupontableM } from '../../../providers/coupontable/coupontable-model';
import { CouponM } from '../../../providers/coupon/coupon-model';
import { MaturetableM } from '../../../providers/maturetable/maturetable-model';
import { Subscription } from 'rxjs';

/**
 * Generated class for the QuatationCashbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quatation-cashback',
  templateUrl: 'quatation-cashback.html',
})
export class QuatationCashbackPage implements OnDestroy {

  private table1 : string[][] = [];
  private table2 : string[][] = [['',''],['',''],['','']];
  private table1Show : boolean[] = [];
  private table2_size : number = 3;
  private table1_header2 : string = 'ครบสัญญา';

  private plancode : string = ''; // แผนประกัน
  private matureRate : number = 0; // rate ที่ได้จาก table matureRate โดยค้นหาจาก plancode
  private quatationMode : number = 0; // mode การจ่ายเบี้ย

  private quatationSum : number = 0; // ทุนประกัน (ไม่รวม raider)
  private quatationPremium : number = 0; // เบี้ยประกันรวม
  private premiumFooter : number = 0; // เบี้ยประกันภัยหลัก (ไม่รวม raider)
  private age : number = 0; // อายุ
  private sex : string = ''; // เพศ

  private tlplan : TLPlanModel = null; // ข้อมูลจาก table tlplan โดยค้นหาจาก plancode
  private listExtend : Array<any> = []; // ข้อมูลจาก table extended โดยค้นหาจาก plancode
  private list_quotation_value : Array<any> = [];
  private coupon_returnCash : string = '';
  private coupon_ytable : string = '';
  private list_coupon : Array<any> = []; // ข้อมูลจาก table extended โดยค้นหาจาก plancode

  private min_rate : number = 2;
  private current_rate : number = 2.5;

  private isChange_prospect : boolean = false;
  private isChange_quatationPlan : boolean = false;
  private isChange_quatationSum : boolean = false;
  private isChange_quatationMode : boolean = false;

  private sumcashReturn : number = 0;

  private currentPage : number = 0;
  private totalPage : number = 0;
  private pageSize : number = 10;
  private table1_show : string[][] = [];

  private planName: string; // ชื่อแผนประกัน

// plancode ที่จะต้องปรับใน couponrate row สุดท้ายเท่ากับ 0
  private plancode_lastRow_couponrate_to_zero : string[]= ["NB","WD","WE","EM"];

  private subscription: Array<Subscription> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private broadcaster: Broadcaster,
    private quatationValueCal : QuatationValueCal
  )
  {
    // on click tab
    this.subscription.push(this.broadcaster.on('quatationStep').subscribe(res => {
      let healthTab : number = res;
      // console.log('healthTab : '+healthTab);
      // console.log(' isChange_quatationPlan : '+this.isChange_quatationPlan+
      // ' isChange_prospect : '+this.isChange_prospect+
      // ' isChange_quatationSum : '+this.isChange_quatationSum);
      if(healthTab === 6) {  //เงินคืนสะสม
        this.changePlan();
        // if(this.isChange_quatationPlan){
        //   this.changePlan();
        // }
        // else if(this.isChange_prospect){
        //   this.changeProspect();
        // }
        // else if(this.isChange_quatationSum || this.isChange_quatationMode){
        //   this.changePremium();
        // }
        this.isChange_prospect = false;
        this.isChange_quatationPlan = false;
        this.isChange_quatationSum = false;
        this.isChange_quatationMode = false;
      }
    }));
    // อัปเดตแบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('quatationPlan').subscribe(res => {
      if(this.plancode != res){
        this.plancode = res;
        this.isChange_quatationPlan = true;
      }
    }));
    
    // ทุนประกัน
    this.subscription.push(this.broadcaster.on('quatationSum').subscribe(res => {
      this.quatationSum = res;
      this.isChange_quatationSum = true;
    }));
    // เบี้ยประกันภัย
    this.subscription.push(this.broadcaster.on('quatationPremium').subscribe(res => {
      this.quatationPremium = res;
    }));
    // เบี้ยประกันภัย
    this.subscription.push(this.broadcaster.on('quatationMode').subscribe(res => {
      this.quatationMode = res;
      this.isChange_quatationMode = true;
    }));
    /**เบี้ยประกันภัยหลัก(เบี้ยชีวิต) */
    this.subscription.push(this.broadcaster.on('premiumFooter').subscribe(res=>{
      this.premiumFooter = res;
      //console.log("Pre >>>>>> "+this.premiumFooter);
    }));

    this.subscription.push(this.broadcaster.on('prospect').subscribe(res =>{
      let prospect = res;
      this.isChange_prospect = false;
      if(this.sex != prospect.gender){
        this.sex = prospect.gender
        this.isChange_prospect = true;
      }
      if(this.age != prospect.age){
        this.age = prospect.age
        this.isChange_prospect = true;
      }
    }));

    // แบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
      this.tlplan = res[0];
      this.planName = res[0].planName;
    }));
  }
  
  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  private changePlan() : void{
    this.table1 = [];
    this.table2 = [['',''],['',''],['','']];
    this.table1_show = [];
    this.changePage(1);
    if(this.plancode != null && this.plancode != ''){
      this.changeProspect();
    }
  }
  private changeProspect(){
    this.listExtend = [];
    if(this.tlplan != null){
      let insurage : string = this.age < 10 ? '0'+this.age : ''+this.age;

      let objM: ExtendedM = new ExtendedM();
      objM.plancode = this.plancode;//Require = Y
      objM.sex = this.sex;//Require = Y
      objM.insuredage = insurage;//Require = Y 

      let objMs: Array<ExtendedM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.EXTENDED;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          this.listExtend = res['data'];
        },
        (err) => {
          console.log(err);
          throw new Error(err);
        }
      ).then(
        () => {
          this.changePremium();
        }
      );
    }
  }
  private changePremium(){
    this.setQuotationValue();
  }
  private setQuotationValue() : void {
    if(this.tlplan != null && this.listExtend.length > 0){
      
      let arr1 : string[] = this.quatationValueCal.getYear(this.plancode, this.listExtend, this.tlplan, this.age);
      let arr2 : string[] = this.quatationValueCal.getPolicyReturn(this.plancode, this.quatationSum, this.listExtend, this.tlplan, this.age);
      this.list_quotation_value = [];
      for(let i : number = 0; i < arr1.length; i++){
        this.list_quotation_value[i] = [arr1[i], arr2[i]];
      }
      this.searchCoupontable();
    }
  }
  private searchCoupontable() : void{
    this.table1_header2 = 'ครบสัญญา';
    this.table2_size = 3;
    this.table1 = [];
    this.table2 = [['',''],['',''],['','']];
    this.coupon_returnCash = '';
    this.coupon_ytable = null;
    if(this.plancode != null && this.plancode != ''){
      let objM: CoupontableM = new CoupontableM();
      objM.id = this.plancode;//Require = Y

      let objMs: Array<CoupontableM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.COUPONTABLE;
      reqM.serviceName = ServiceName.SELECT; 
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          let list : Array<any> = res['data'];
          if(list.length > 0){
          //"returncash":0,"ytable":"Y"
            let data : CoupontableM = list[0];
            if(data['returncash'] == undefined)
              this.coupon_returnCash = '0';
            else
              this.coupon_returnCash = data.returncash;
            this.coupon_ytable = data.ytable;
          }

          return Promise.resolve();
        },
        (err) => {
          console.log(err);
          throw new Error(err);
        }
      ).then(
        () => {
          if(this.coupon_returnCash == '1')
            this.table1_header2 = 'ครบสัญญา **';
          else
            this.table1_header2 = 'ครบสัญญา';
          this.searchMaturetable();
        }
      );
    }
  }

  private searchMaturetable() : void{
    console.log("searchMaturetable < ================");

    this.matureRate = 0;
    let objM: MaturetableM = new MaturetableM();
    objM.plancode = this.plancode;//Require = Y

    let objMs: Array<MaturetableM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.MATURETABLE;
    reqM.serviceName = ServiceName.SELECT; 
    reqM.param = objMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        let list = res['data'];
        if(list.length > 0){
          let rate : MaturetableM = list[0];
          this.matureRate = parseFloat(rate.maturerate);
          // this.matureRate = 100;
        }
        return Promise.resolve();
      },
      (err) => {
        console.log(err);
        throw new Error(err);
      }
    ).then(
      () => {
        this.searchCoupon();
      }
    );
  }
  private searchCoupon() : void{
    let objM: CouponM = new CouponM();
    objM.plancode = this.plancode;//Require = Y
    if(this.coupon_ytable == 'Y'){
      let insurage : string = this.age < 10 ? '0'+this.age : ''+this.age;
      objM.age = insurage;//Require = N
    }

    let objMs: Array<CouponM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.COUPON;
    reqM.serviceName = ServiceName.SELECT; 
    reqM.param = objMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        this.list_coupon = res['data'];
      },
      (err) => {
        console.log(err);
        throw new Error(err);
      }
    ).then(
      () => {
        this.setTable1();
      }
    );
  }
  private is_plancode_lastRow_couponrate_to_zero(plancode : string) : boolean{
    for(let i : number = 0; i < this.plancode_lastRow_couponrate_to_zero.length; i++){
      if(this.plancode_lastRow_couponrate_to_zero[i] == plancode){
        return true;
      }
    }
    return false;
  }
  private setTable1() : void{
    this.table1 = [];
    this.table1Show = [];
    if((this.coupon_returnCash == '0' || this.coupon_returnCash == '1')
     && this.list_coupon.length > 0 && this.coupon_ytable != null
     && this.plancode != null && this.plancode != '')
    {
      this.sumcashReturn = 0;
      let twoPercent : number = 0;
      let twosfPercent : number = 0;

      let len = this.list_coupon.length;
      let lastloop : number = len - 1;
      let beneType : string[] = [];
      let is_plancode_lastRow_couponrate_to_zero = this.is_plancode_lastRow_couponrate_to_zero(this.plancode);
      for(let i : number = 0; i < len; i++){
        let coupon = this.list_coupon[i];
        beneType[i] = coupon.benefittype;
        let couponRate : number = parseFloat(coupon.couponrate);
        if(i == len-1){
          if(is_plancode_lastRow_couponrate_to_zero){
            couponRate = 0;
          }
        }
        let benefitRate : number = parseFloat(coupon.benefitrate);
        let text1 : number = (this.quatationSum * couponRate)/100
        this.sumcashReturn = this.sumcashReturn + Math.ceil(text1) // Math.ceil ปัดขึ้น
        // twoPercent = twoPercent==0 ? text1 : ((twoPercent*102)/100)+text1;
        // twosfPercent = twosfPercent == 0 ? text1+0 : ((twosfPercent*102.50)/100)+text1;
        twoPercent = twoPercent==0 ? text1 : (twoPercent+((twoPercent*this.min_rate)/100))+text1;
        twosfPercent = twosfPercent == 0 ? text1+0 : (twosfPercent+((twosfPercent*this.current_rate)/100))+text1;
        let text6 = (this.quatationSum * benefitRate) / 100;
        // console.log('-----> year: '+coupon.year+' '+coupon.benefitrate+' '+text6);
        this.table1[i] = [];
        this.table1[i][0] = coupon.year;
        this.table1[i][1] = text1 == 0 ? '-' : ''+Math.round(text1);
        this.table1[i][2] = twoPercent == 0 ? '-' : ''+Math.round(twoPercent);
        this.table1[i][3] = twosfPercent == 0 ? '-' : ''+Math.round(twosfPercent);
        this.table1[i][4] = '-';
        if(i == lastloop){
          let num4 = Math.round((this.quatationSum * this.matureRate)/100);
          this.table1[i][4] = num4 == 0 ? '-' : ''+num4;
          
        }
        this.table1[i][5] = '-';
        this.table1[i][6] = text6 == 0 ? '-' : ''+Math.round(text6);
        this.table1Show[i] = false;
      }

      let chk : boolean = false;
      let lastloop2 : number = this.list_quotation_value.length-1;
      for(let i : number = 0; i < this.list_quotation_value.length; i++){
        let num : number = i;
        let year : string = this.list_quotation_value[i][0];

        if(year == '0'){
          chk = true;
        }
        if(chk){
          num++;
        }
        if(num > lastloop2)
          break;
        let policyReturn : string = this.list_quotation_value[num][1];

        if(num == lastloop2){
          if(policyReturn == "-"){
            this.table1[i][5] = 'ครบกำหนด';
            this.table1[i][6] = 'ครบกำหนด';
            // merge cell 5 และ 6
          }
        }

        if(num < len){
          this.table1[i][5] = policyReturn;
          if(policyReturn != '' && policyReturn != '-'){
            if(beneType[i] == 'S'){
              // console.log('beneType '+beneType[i]+' -----> year: '+this.table1[i][0]+' '+this.table1[i][6]+' '+policyReturn+' '+(parseInt(policyReturn) > parseInt(this.table1[i][6])));
              // เงินค่าเวนคืนกรมธรรม์	> ความคุ้มครองกรณีเสียชีวิต (จะเข้า case ในกรณีปีหลัง ex. plancode = EN10) 
              if(parseInt(policyReturn) > parseInt(this.table1[i][6])){
                this.table1[i][6] = policyReturn;
              }
            }
            else if(beneType[i] == 'V'){
              // EX. plancode = AF เงินค่าเวนคืนกรมธรรม์ = ความคุ้มครองกรณีเสียชีวิต
              this.table1[i][6] = policyReturn;
            }
          }
        }
        if(num == lastloop2){
          if(policyReturn == "-"){
            this.table1[i][5] = 'ครบกำหนด';
            this.table1[i][6] = 'ครบกำหนด';
            // merge cell 5 และ 6
          }
        }
      }
      this.changePage(1);
      this.setTable2();
      // console.log(JSON.stringify(this.list_coupon));
      // console.log('---------------------------------------------------------------');
      // console.log(JSON.stringify(this.table1));
      // console.log('---------------------------------------------------------------');
      // console.log(JSON.stringify(this.table2));
    }
  }
  private calPPayYear() : number {
    let pPayYear : number = 0;
    if(this.tlplan != null){
      pPayYear = parseInt(this.tlplan.pPayYear, 10);
      let payType : string = this.tlplan.payType;
      if(payType == '1'){
        pPayYear = pPayYear - this.age;
      }
    }
    return pPayYear;
  }
  private setTable2() : void{
    
    if(this.tlplan != null){

      let fm : number = this.quatationMode;
      if(fm == 0){
        fm = 12;
      }
      else if(fm == 9){
        fm = 1;
      }
      
      let lastIndexTable1 : number = this.table1.length-1;
      let pPayYear : number = this.calPPayYear();
      
      let totalPremReturn : number = this.premiumFooter * fm * pPayYear;

      let ratetwo : number = this.table1[lastIndexTable1][2] == '-' ? 0 : parseInt(this.table1[lastIndexTable1][2], 10);
      let ratetsf : number = this.table1[lastIndexTable1][3] == '-' ? 0 : parseInt(this.table1[lastIndexTable1][3], 10);
      let finPol : number  = this.table1[lastIndexTable1][4] == '-' ? 0 : parseInt(this.table1[lastIndexTable1][4], 10);
      let reBene1 : number = this.sumcashReturn + finPol - totalPremReturn;
      let reBene2 : number = ratetwo + finPol - totalPremReturn;
      let reBene3 : number = ratetsf + finPol - totalPremReturn;
      
      this.table2[0][0] = ''+(this.sumcashReturn + finPol)
      this.table2[0][1] = reBene1 < 0 ? '' : ''+reBene1
      this.table2[1][0] = ''+(ratetwo + finPol)
      this.table2[1][1] = reBene2 < 0 ? '' : ''+reBene2
      this.table2[2][0] = ''+(ratetsf + finPol)
      this.table2[2][1] = reBene3 < 0 ? '' : ''+reBene3
      
      console.log('this.table2 : '+JSON.stringify(this.table2));
      console.log('this.premiumFooter : '+this.premiumFooter+' fm : '+fm+' pPayYear : '+pPayYear);
      console.log('sumcashReturn : '+this.sumcashReturn);
      console.log('totalPremReturn : '+totalPremReturn);
      console.log('reBene1 : '+reBene1+' reBene2 : '+reBene2+' reBene3 : '+reBene3+' '+(reBene1 < 0 || reBene2 < 0 || reBene3 < 0));
    
      if(reBene1 < 0 || reBene2 < 0 || reBene3 < 0){
        this.table2_size = 2;
      }
    }
  }
  //------- click on table ----------
  private changeTable1Show(index : number){
    this.table1Show[index] = !this.table1Show[index];
  }
  //------- page -------------------
  private changePage(page:number) : void {
    this.totalPage = Math.ceil(this.table1.length / this.pageSize);
    this.totalPage = this.totalPage === 0 ? 1 : this.totalPage;
    if (page < 1)  {
      return;
    } else if(page > this.totalPage){
      page = this.totalPage;
    }
    this.currentPage = page;
    this.setDataShow();
  }
  private setDataShow() : void{
    this.table1_show = [];
    if(this.table1.length > 0){
      let first_index : number = (this.currentPage-1)*this.pageSize;
      let max : number = first_index+this.pageSize;
      if(max > this.table1.length)
        max = this.table1.length;
      
      for(let i = first_index; i < max; i++){
        this.table1_show.push(this.table1[i]);
      }
    }
  }
}
