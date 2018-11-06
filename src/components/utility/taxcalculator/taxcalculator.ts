import { AlertDirective } from './../../../directives/extends/alert/alert';
import { ResponseModel } from './../../../providers/model/response-model';
import { RiderComponent } from './../../form/rider/rider';
import { RiderModel } from './../../../providers/rider/rider-model';
import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { TLPlanModel } from '../../../providers/tlplan/tlplan-model';
import { RequestModel } from '../../../providers/model/request-model';
import { FunctionName } from '../../../providers/constants/function-name';
import { ServiceName } from '../../../providers/constants/service-name';
import { ApiProvider } from '../../../providers/api/api';
import { TaxConditionM } from '../../../providers/planprovide-table/tax-condition/tax-condition-model';
import { TaxSumConditionM } from '../../../providers/planprovide-table/tax-sumcondition/tax-sumcondition-model';
import { TaxFormulaM } from '../../../providers/planprovide-table/tax-formula/tax-formula-model';

/**
 * Generated class for the TaxcalculatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'taxcalculator',
  templateUrl: 'taxcalculator.html'
})
export class TaxcalculatorComponent {

  private taxrate: number = 5;
  private premiumTax: number = 0;
  private premiumNet: number = 0;
  private taxflag: string ;

  /**แบบประกัน */
  private planCode: string ;
  
  /**ทุนประกัน */
  private quatationSum:number;

  /**สัญญาเพิ่มเติม */
  private rider: object = {};

  /**เบี้ยประกันรวม */
  // private quatationPremium:String; // ไม่ใช้

  /**
   * รายปี QuatationMode = 1
   * 6 เดือน QuatationMode = 2
   * 3 เดือน QuatationMode = 4
   * รายเดือน QuatationMode = 0
   * จ่ายครั้งเดียว QuatationMode = 9
   */
  private quatationMode:string;

  /**เบี้ยลดหย่อน */
  private premium:number;

  /**เบี้ยประกันภัยหลัก (เบี้ยชีวิต) */
  private premiumFooter:string ;

  /**เพศ */
  private sex:string;

  /**อายุ */
  private age:string;
  /** max เงินภาษี จาก table tlplan */
  private maxDeductTax:number;
  /** เบี้ยประกันภัยของ rider แฝง */
  private hiddenRider:number;
  
  constructor(
    private viewCtrl: ViewController, 
    private params: NavParams,
    private apiProvider: ApiProvider,
    private alertCtrl: AlertDirective
  ) { 
    
  }

  /**
   * ปิด modal
   */
  private close(): void {
    this.viewCtrl.dismiss();
  }

  private changeRate(tax: number): void{
    this.premiumTax = Math.round(this.premiumTax);
    this.premiumNet = Math.round((this.premiumTax * tax) / 100);
  }

  /*Call Web Service of Flag 'S' */ 
  public callWS_TaxCondition(planCode:string,quatationSum:number,age:string,sex:string):Promise<any>{
    return new Promise((resolve : any ,reject) => {
      let objM: TaxConditionM = new TaxConditionM();
      
      /*
      objM.plancode = "EK";//Require = Y
      objM.sex = "M";//Require = Y
      objM.age = "45";//Require = Y
      */

      objM.plancode = planCode;
      objM.sex = sex;
      objM.age = age;

      let objMs: Array<TaxConditionM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.TAX_CONDITION;
      reqM.serviceName = ServiceName.SELECT;
    // reqM.searchkey = ""plancode"";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
          (res) => {

            let obj:any = res;
            let resModel:ResponseModel = obj;
            if(resModel.size > 0){
              /**ตรวจสอบว่ามีเบี้ย ฉพ หรือไม่ */
              /**NJPremium = เบี้ย ฉพ.**/
              let NJPremium:number = this.getRaiderJP();
              /*console.log("เบี้ย ฉพ. >>> "+NJPremium);
                console.log("JP ไม่ได้ถูกเลือก");
                console.log("เบี้ยประกันภัยหลัก[เบี้ยชีวิต,premiumFooter] >>> "+this.premiumFooter);
                console.log("quatationMode >>> "+this.quatationMode);
                console.log("เบี้ยประกันรวม[quatationPremium] >>> "+this.quatationPremium);
                console.log("ทุนประกัน[quatationSum] "+this.quatationSum);*/

              /**เบี้ยลดหย่อน = เบี้ย ฉพ.(ถ้ามี ถ้าไม่มีเป็น 0) + เบี้ยประกันภัยหลัก */
              this.premium = NJPremium + Number(this.premiumFooter);
              if(this.premium > Number(this.maxDeductTax)){
                this.premiumTax = Number(this.maxDeductTax);
              }
              else{
                this.premiumTax = this.premium;
              }
              this.changeRate(this.taxrate);
              resolve({"hasTax":true, "premiumTax": this.premiumTax});
            }
            if(resModel.size == 0){
              //console.log("ไม่สามารถลดหย่อนภาษีได้");
              resolve({"hasTax":false, "premiumTax": 0});
            }
          },
          (err) => {
            this.alertCtrl.error(err);
            reject();
          }
      );
    });
  }

  /*Call Web Service of Flag 'A'*/ 
  public callWS_TaxSumCondition(planCode:string,quatationSum:number,age:string,sex:string):Promise<any>{
    return new Promise((resolve : any,reject) => {
      let objM: TaxSumConditionM = new TaxSumConditionM();
      
      /*
      objM.plancode = "WY20";//Require = Y
      objM.sex = "F";//Require = Y
      objM.age = "50";//Require = Y
      objM.sum = "0";////Require = N
      */

      objM.plancode = planCode;
      objM.sex = sex;
      objM.age = age;
      objM.sum = String(quatationSum); // number convert to string 

      let objMs: Array<TaxSumConditionM> = [];
      objMs.push(objM); 

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.TAX_SUMCONDITION;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {

          //console.log("TaxSumCondition [have argument] >>>> "+JSON.stringify(res));
          let obj:any = res;
          let resModel:ResponseModel = obj;

          if(resModel.size > 0){
              /**ตรวจสอบว่ามีเบี้ย ฉพ หรือไม่ */
              /**NJPremium = เบี้ย ฉพ.**/
              let NJPremium:number = this.getRaiderJP();
              /*console.log("เบี้ย ฉพ. >>> "+NJPremium);
              console.log("JP ไม่ได้ถูกเลือก");
              console.log("เบี้ยประกันภัยหลัก[เบี้ยชีวิต,premiumFooter] >>> "+this.premiumFooter);
              console.log("quatationMode >>> "+this.quatationMode);
              console.log("เบี้ยประกันรวม[quatationPremium] >>> "+this.quatationPremium);
              console.log("ทุนประกัน[quatationSum] "+this.quatationSum);*/

              /**เบี้ยลดหย่อน = เบี้ย ฉพ.(ถ้ามี ถ้าไม่มีเป็น 0) + เบี้ยประกันภัยหลัก */
              this.premium = NJPremium + Number(this.premiumFooter);
              if(this.premium > Number(this.maxDeductTax)){
                this.premiumTax = Number(this.maxDeductTax);
              }
              else{
                this.premiumTax = this.premium;
              }
              this.changeRate(this.taxrate);
              resolve({"hasTax":true, "premiumTax": this.premiumTax});
          }
          if(resModel.size == 0){
            //console.log("ไม่สามารถลดหย่อนภาษีได้ "+this.premium);
            resolve({"hasTax":false, "premiumTax": 0});
          }

        },
        (err) => {
          this.alertCtrl.error(err);
          reject();
        }
      );
    });
  }

  /*Call Web Service of Flag 'C'*/
  private callWS_TaxFormula(planCode:string):Promise<any>{
    return new Promise((resolve : any,reject) => {
      let objM: TaxFormulaM = new TaxFormulaM();

      /*
      objM.plancode = "ME";//Require = Y
      */

      objM.plancode = planCode;

      let objMs: Array<TaxFormulaM> = [];
      objMs.push(objM); 

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.TAX_FORMULA;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
          (res) => {
            //console.log(JSON.stringify(res));
            let obj:any = res;
            let resModel:ResponseModel = obj;
          
            let plancode:string = resModel.data[0].plancode;
            let multiplySum:number = resModel.data[0].multiplysum;
            let subtractPremium:number = resModel.data[0].subtractpremium;

            /**
             * 1. premiumTax  = เบี้ยชีวิต - ( ทุนชีวิต *  multiplySum) - subtractPremium
               2. premiumTax * 12     ( *12 เพราะทำเป็นรายปี)
            * 
            */
            if(resModel.size > 0 ){
              let multipleByMode = this.getMultipleByMode(this.quatationMode);
              this.premiumTax = (Number(this.premiumFooter) -( this.quatationSum * multiplySum)-subtractPremium);
              this.premiumTax = Math.round(this.premiumTax)*multipleByMode;
              this.changeRate(this.taxrate);
              resolve({"hasTax":true, "premiumTax": this.premiumTax});
            }
            else{
              //console.log("ไม่สามารถลดหย่อนภาษีได้ "+this.premium);
              resolve({"hasTax":false, "premiumTax": 0});
            }
            
          },
          (err) => {
            this.alertCtrl.error(err);
            reject();
          }
      );
    });
  }
  private calculate_flagY():Promise<any>{
    return new Promise((resolve : any,reject) => {
      /**NJPremium = เบี้ย ฉพ.**/
      let NJPremium:number = this.getRaiderJP();
      /*console.log("เบี้ย ฉพ. >>> "+NJPremium);
        console.log("JP ไม่ได้ถูกเลือก");
        console.log("เบี้ยประกันภัยหลัก[เบี้ยชีวิต,premiumFooter] >>> "+this.premiumFooter);
        console.log("quatationMode >>> "+this.quatationMode);
        console.log("เบี้ยประกันรวม[quatationPremium] >>> "+this.quatationPremium);
        console.log("ทุนประกัน[quatationSum] "+this.quatationSum);*/

      /**เบี้ยลดหย่อน = เบี้ย ฉพ.(ถ้ามี ถ้าไม่มีเป็น 0) + เบี้ยประกันภัยหลัก */
      this.premium = NJPremium + Number(this.premiumFooter);
      if(this.premium > Number(this.maxDeductTax)){
        this.premiumTax = Number(this.maxDeductTax);
      }
      else{
        this.premiumTax = this.premium;
      }
      this.changeRate(this.taxrate);
      resolve({"hasTax":true, "premiumTax": this.premiumTax});
    });
  }

  private getRaiderJP() : number{
    let NJPremium:number = 0;
    if(typeof(this.rider['JP']) != 'undefined') {
        NJPremium = Number(this.rider['JP'].premium);
        NJPremium = this.checkPremiumFooterByMode(NJPremium, this.quatationMode);
    }
    return NJPremium;
  }
  private checkPremiumFooterByMode(premiumFooter : number, quatationMode: string): number{
    let multipleByMode = this.getMultipleByMode(quatationMode);
    return premiumFooter * multipleByMode;
  }
  /**
   * รายปี QuatationMode = 1
   * 6 เดือน QuatationMode = 2
   * 3 เดือน QuatationMode = 4
   * รายเดือน QuatationMode = 0
   * จ่ายครั้งเดียว = 9 //คำนวณเหมือนรายปี
   */
  private getMultipleByMode(quatationMode: string) : number{
    if(quatationMode == '1' || quatationMode == '9'){
      return 1;
    }
    else if(quatationMode == '0'){
      return 12;
    }
    else if(quatationMode == '2'){
      return 2;
    }
    else if(quatationMode == '4'){
      return 4;
    }
    return 1;
  }
  
  public ngOnInit() {

    let taxDeductFlag : string = this.params.get("taxDeductFlag");
    this.planCode = this.params.get("plancode");
    this.quatationSum = this.params.get("quatationSum");
    this.rider = this.params.get("rider");
    this.quatationMode = this.params.get("quatationMode");
    this.premiumFooter = this.params.get("premiumFooter");
    this.age = this.params.get("age");
    this.sex = this.params.get("sex");
    this.maxDeductTax = this.params.get("maxDeductTax");
    this.hiddenRider = Number(this.params.get("hiddenRider"));
    /*** */
    // this.quatationPremium = this.params.get("quatationPremium");

    if(this.hiddenRider > 0){
      this.premiumFooter = ''+(Number(this.premiumFooter)-this.hiddenRider);
    }
    if(taxDeductFlag != 'C'){
      this.premiumFooter = ''+this.checkPremiumFooterByMode(Number(this.premiumFooter), this.quatationMode);
    }
    if(taxDeductFlag === 'Y'){ 
      this.calculate_flagY();
    }
    /**Flag = C */
    if(taxDeductFlag === 'C'){
      this.callWS_TaxFormula(this.planCode);
    }
    /**Flag = S */
    if(taxDeductFlag === 'S'){
      this.callWS_TaxCondition(this.planCode,this.quatationSum,this.age,this.sex);
    }
    /**Flag = A */
    if(taxDeductFlag === 'A'){
      this.callWS_TaxSumCondition(this.planCode,this.quatationSum,this.age,this.sex);  
    }

    /**Test call WebService */
    //this.callWS_TaxCondition();
    //this.callWS_TaxSumCondition();
    //this.callWS_TaxCondition(this.planCode,this.age,this.sex);
    //this.callWS_TaxSumCondition(this.planCode,this.quatationSum,this.age,this.sex);
                                                   
    /**ดึงค่าจาก Object rider */
    //console.log("All Object Rider "+JSON.stringify(this.rider));
    /**ทุน ฉพ */
    //console.log("Rider sum [modal box] is "+this.rider['JP'].sum);
    /**เบี้ย ฉพ */
    //console.log("Rider premium(เบี้ย ฉพ.) [modal box] is "+this.rider['JP'].premium);
    
    /**Call Web Service => TLPlan */
    // let objM: TLPlanModel = new TLPlanModel();
    // objM.planCode = this.planCode;

    // let objMs: Array<TLPlanModel> = [];
    // objMs.push(objM);

    // let reqM: RequestModel = new RequestModel();
    // reqM.functionName = FunctionName.TLPLAN;
    // reqM.serviceName = ServiceName.SELECT;
    // reqM.param = objMs;
    
    // this.apiProvider.callData(reqM).then(
    //     (res) => {
    //       //console.log(JSON.stringify(res));
    //       let obj:any = res;
    //       let resModel:ResponseModel = obj;

    //       this.maxDeductTax = resModel.data[0].maxDeductTax;
    //       /**การดึงค่าจาก json Object จาก Web service ออกมา */
    //       //console.log("TaxDeductFlag[modal box] is "+resModel.data[0].taxDeductFlag);
    //       //console.log("MaxDeductTax[modal box] is "+resModel.data[0].maxDeductTax);
    //       //taxcalculator.htmlconsole.log("เข้ามาใน Flag Y แล้ว "+Object.keys(this.rider));
    //       /**Flag = Y */
    //       if(resModel.data[0].taxDeductFlag != 'C'){
    //         this.premiumFooter = ''+this.checkPremiumFooterByMode(Number(this.premiumFooter), this.quatationMode);
    //       }
    //       if(resModel.data[0].taxDeductFlag === 'Y'){ 
    //         this.calculate_flagY();
    //       }
    //       /**Flag = C */
    //       if(resModel.data[0].taxDeductFlag === 'C'){
    //         this.callWS_TaxFormula(this.planCode);
    //       }
    //       /**Flag = S */
    //       if(resModel.data[0].taxDeductFlag === 'S'){
    //         this.callWS_TaxCondition(this.planCode,this.quatationSum,this.age,this.sex);
    //       }
    //       /**Flag = A */
    //       if(resModel.data[0].taxDeductFlag === 'A'){
    //         this.callWS_TaxSumCondition(this.planCode,this.quatationSum,this.age,this.sex);  
    //       }
    //     },
    //     (err) => {
    //       this.alertCtrl.error(err);
    //     }   
    // );
  }
  
  /**
   * มีภาษีหรือไม่
   */
  public hasTax(taxDeductFlag: string, choosePlan: string, quatationSum: number, age: string, sex: string): Promise<boolean> {
    quatationSum = isNaN(quatationSum) ? 0 : quatationSum;
    return new Promise((resolve,reject) => {
      
      switch (taxDeductFlag) {
        case 'Y': case 'C':
          resolve(false);
          break;

        case 'S':
          this.callWS_TaxCondition(choosePlan, quatationSum, age, sex).then(res => {
            resolve(!res.hasTax);
          });
          break;

        case 'A':
          this.callWS_TaxSumCondition(choosePlan, quatationSum, age, sex).then(res => {
            resolve(!res.hasTax);
          });
          break;

        default:
          resolve(true);
      }
    });
  }
  /**
   * มีภาษีหรือไม่
   */
  public getPremiumTax(
      taxDeductFlag: string, 
      choosePlan: string, 
      quatationSum: number, 
      age: string, 
      sex: string, 
      rider: object, 
      premiumFooter: string, 
      maxDeductTax: number,
      quatationMode: string,
      hiddenRider:string
  ): Promise<number> {

    this.planCode = choosePlan;
    this.quatationSum = quatationSum;
    this.rider = rider;
    this.quatationMode = quatationMode;
    this.premiumFooter = premiumFooter;
    this.age = age;
    this.sex = sex;
    this.maxDeductTax = maxDeductTax;
    this.hiddenRider = Number(hiddenRider);

    if(this.hiddenRider > 0){
      this.premiumFooter = ''+(Number(this.premiumFooter)-this.hiddenRider);
    }
    if(taxDeductFlag != 'C')
      this.premiumFooter = ''+this.checkPremiumFooterByMode(Number(this.premiumFooter), this.quatationMode);

    return new Promise((resolve,reject) => {
      switch (taxDeductFlag) {
        
        case 'Y':
          this.calculate_flagY().then((res) => {
            resolve(res.premiumTax);
          });
          break;
        case 'C':
          this.callWS_TaxFormula(choosePlan).then((res) => {
            resolve(res.premiumTax);
          });
          break;

        case 'S':
          this.callWS_TaxCondition(choosePlan, quatationSum, age, sex).then(res => {
            resolve(res.premiumTax);
          });
          break;

        case 'A':
          this.callWS_TaxSumCondition(choosePlan, quatationSum, age, sex).then(res => {
            resolve(res.premiumTax);
          });
          break;

        default:
          resolve(0);
      }
    });
  }
}
