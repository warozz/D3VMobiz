import { TLPlanModel } from './../tlplan/tlplan-model';
import { PmrateM } from './../planprovide-table/pmrate/pmrate-model';
import { OccupationTypeComponent } from './../../components/form/occupation-type/occupation-type';
import { PackageDetailM } from './../planprovide-table/packagedetail/package-detail-model';
import { SumrateM } from './../planprovide-table/sumrate/sumrate-model';
import { PremiumRateM } from './../planprovide-table/premiumrate/premiumrate-model';
import { PackageCoverageM } from './../planprovide-table/packagecoverage/package-coverage-model';
import { SumrateoM } from './../planprovide-table/sumrateo/sumrateo-model';
import { ApiProvider } from './../api/api';
import { ServiceName } from './../constants/service-name';
import { FunctionName } from './../constants/function-name';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SettingPlanProvider } from '../setting-plan/setting-plan';
import { PremiumPackageM } from '../planprovide-table/premiumpackage/premiumpackage-model';
import { RequestModel } from '../model/request-model';
import {  TemplateParseResult } from '@angular/compiler';
import { RiderConfig } from '../rider/rider-config';

/*
  Generated class for the MathUtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PremiumCalProvider {

  /**
   * เบี้ยรวม
   */
  private premium: number = 0;
  /**
   * rider object
   */
  private rider: any;
  /**
   * โหมดชำระเบี้ย
   */
  private mode: number;
  /**
   * อาชีพ
   */
  private occupationType: string = '0';
  /**
   * อายุ
   */
  private insuredage: string;
  /**
   * มาจากแบบประกัน
   */
  private calType: number;
  /**
   * sex
   */
  private typex: string;
  /**
   * แบบประกันที่เลือก
   */
  private planSelected: TLPlanModel; // ok

  public getPremium(): number {
    return this.premium;
  }
  public setPremium(premium: number) {
    this.premium = premium;
    if (this.premium == 0) {
      this.rider = undefined;
      this.mode = undefined;
      this.occupationType = undefined;
      this.insuredage = undefined;
      this.calType = undefined;
      this.typex = undefined;
      this.planSelected = undefined;
    }
  }
  public getRider(): any {
    return this.rider;
  }
  public setRider(rider: any) {
    this.rider = rider;
  }
  public getMode(): number {
    return this.mode;
  }
  public setMode(mode: number) {
    this.mode = mode;
  }
  public getOccupationType(): string {
    return this.occupationType;
  }
  public setOccupationType(occupationType: string) {
    this.occupationType = occupationType;
  }
  public getInsuredage(): string {
    return this.insuredage;
  }
  public setInsuredage(insuredage: string) {
    this.insuredage = insuredage;
  }
  public getCalType(): number {
    return this.calType;
  } 
  public setCalType(calType: number) {
    this.calType = calType;
  } 
  public getTypex(): string {
    return this.typex;
  }
  public setTypex(typex: string) {
    this.typex = typex;
  }
  public getPlanSelected(): TLPlanModel {
    return this.planSelected;
  }
  public setPlanSelected(planSelected: TLPlanModel) {
    this.planSelected = planSelected;
  }

  constructor(private plan:SettingPlanProvider 
    , private planService: SettingPlanProvider
    , private apiProvider: ApiProvider
    , private conf : RiderConfig
    ) { }

  public premiumCal(fixSum : string , premium: string , plancode: string) :string{
    const newCal: Array<string> = ["TE2","TF2","TG2","TH2","YH","WV05","WV20","WV99","WN2","AS85","AS90","AS99","AT85","AT90","AT99","EN39","EN40"]; // rate per 100000

    fixSum = Number(fixSum) > 0 ? fixSum : "0";
    premium = Number(premium) > 0 ? premium :"0";
    let  result : string;
    if(newCal.indexOf(plancode) != -1) 
    {

    //  result = String((Number(fixSum) / 100000) * Number(premium));
      result = String( (Number(fixSum) * Number(premium) )/ 100000 );
      result = String(Math.floor(Number(result)));
    } 
    else 
    {
      result = String((Number(fixSum) / 10000) * Number(premium));
    }  
    
    console.log("premiumCal   result=" + result + "   premium=" + premium + "   fixSum=" + fixSum );
    
    return result;    
    
  }

  public premiumCalTR(fixSum : string , premium: string) :string{
    fixSum = Number(fixSum) > 0 ? fixSum : "0";
    premium = Number(premium) > 0 ? premium :"0";
    let  result = String(Math.floor((Number(fixSum) / 100000) * Number(premium)));
    return result;    
    
  }
  
  public discountPremium(sum : number,disCal : number):string {
    let dis : string = "0";
    dis = String(sum * disCal);

    //console.log("1.discountPremium premiumCal  sum=" + sum  + "  disCal=" + disCal + "  dis="+ dis);   
    
    dis = (Number(dis)/100).toFixed(0); 

    //console.log("2.discountPremium premiumCal  sum=" + sum  + "  disCal=" + disCal + "  dis="+ dis);   

    return dis;
  } 

  async AC01(insuredAge : number , mode : number , occupationType : string , riderSum : number ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    if(mode == 3 || mode > 4 || occupationType > '3')
      return "000000";
    let a =  await this.plan.getRider("AC01")
      .then(res => {
        amount = res['amtRate'][occupationType];
        fact = res['pmFact'][mode];
        amount = String((Number(amount)/10)*(Number(fact)/100));
        amount = Number(amount).toFixed(2);

        fact = "0.05";
        amount = String(Number(parseFloat(amount))+Number(parseFloat(fact)));
        amount = Number(amount).toFixed(2);

        amount = String(parseInt(String(Number(amount)*100),10));
        amount = this.rshift(amount,1,0)
        amount = this.lshift(amount,1,0)
        riderSum = this.rshift(riderSum,4,0);
        tmpPrem = String(riderSum * (Number(amount)/100));
        tmpPrem = Number(tmpPrem).toFixed(2);
        tmpPrem = tmpPrem.substring(0,tmpPrem.length-3);
        tmpPrem = this.setlen(tmpPrem,9);
       // console.log(">>>>>>>>>>>>"+amount+"  "+fact+"   "+tmpPrem);
        result = (tmpPrem);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });

      return a;
  }


  async AC02(insuredAge : number , mode : number , occupationType : string , riderSum : number ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    if(mode == 3 || mode > 4 || occupationType > '3')
      return "000000";
     let a = await this.plan.getRider("AC02")
      .then(res => {
        amount = res['amtRate'][occupationType];
        fact = res['pmFact'][mode];
        amount = String((Number(amount)/10)*(Number(fact)/100));
        amount = Number(amount).toFixed(2);

        fact = "0.05";
        amount = String(Number(parseFloat(amount))+Number(parseFloat(fact)));
        amount = Number(amount).toFixed(2);

        amount = String(parseInt(String(Number(amount)*100),10));
        amount = this.rshift(amount,1,0)
        amount = this.lshift(amount,1,0)
        riderSum = this.rshift(riderSum,4,0);
        tmpPrem = String(riderSum * (Number(amount)/100));
        tmpPrem = Number(tmpPrem).toFixed(2);
        tmpPrem = tmpPrem.substring(0,tmpPrem.length-3);
        tmpPrem = this.setlen(tmpPrem,9);
        //console.log(">>>>>>>>>>>>"+amount+"  "+fact+"   "+tmpPrem);
        result = (tmpPrem);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async AC03(insuredAge : number , mode : number , occupationType : string , riderSum : number ){
  let amount = "000000000";
  let isum = "000000000";
  let result : string = "0";
  if(riderSum == 0)return "0"
  if(mode == 3 || mode > 4 || occupationType > '3')
    return "000000000";
  let a = await this.plan.getRider("AC03")
  .then(res => {
    let str = String(mode)+occupationType;

    let acPrem = res['acRate'][str];
    
    isum = String(riderSum-5000);

    
    isum = String(Math.floor(Number(isum)/5000));
    amount = String(parseInt(acPrem)+parseInt(amount));

    let iprem = parseInt(String(Number(acPrem)/2));

    iprem = iprem * Number(isum);
    let hPrem = iprem;
    amount  = String(parseInt(amount)+parseInt(String(hPrem)));
     amount=""+amount;
     
    while(amount.length<9)
    {
      amount="0"+amount;
    }
    result  = amount; 
    return amount;
  })
  .catch(err => {
        console.log(err);
        return result;
  });
      //console.log(result);
      return result;
  }

  async RP(insuredAge : number , mode : number , riderSum : number ){

    let b = await this.plan.getRider("RP")
    .then(res => {
     return res.rpAge;
    });
    let ageIdx =  (insuredAge,b) =>
    {
      //console.log(insuredAge+"   "+JSON.stringify(b));
      
        var i;
      for ( i = 0 ; i < b.length;i++) {
        if (parseInt(insuredAge)<=parseInt(b[i])) {
          return i;
          }
      }
      return (--i) ;    
    };
    //console.log(ageIdx(insuredAge,b));
    
    let amount = "000000";
    let fact = "000";
    let result : string = "0";
    if(riderSum == 0)return "0"
    
    let a = await this.plan.getRider("RP")
    .then(res => {
        
      amount = res['amtRate'][ageIdx(insuredAge,b)] ;
      fact  = res['pmFact'][String(mode)];
      while(fact.length<3)
      {
        fact="0"+fact;
      }
      let amountfact = String(Number(amount)*(Number(fact)/100));
        amountfact=Number(amountfact).toFixed(1);
        if (insuredAge <= 65 )  
      {
        if (mode != 0)
          fact = '0.4';
        else
          fact = '0.5';
        amount = String(parseFloat(amountfact)+parseFloat(fact));
        amount = Number(amount).toFixed(1);
      }
      else
        amount = amountfact;


      amount=String(Number(amount)*10);
      amount=this.rshift(Number(amount),1,0);
      amount=this.setlen(amount,6);
      amount=this.lshift(amount,2,0);
      riderSum=this.rshift(riderSum,2,0);
      let tmpPrem=String(parseFloat(String(riderSum))*(Number(amount)/100));
      tmpPrem=Number(tmpPrem).toFixed(2);

      tmpPrem=tmpPrem.substring(0,tmpPrem.length-3);
      tmpPrem=this.setlen(tmpPrem,9);
      result = tmpPrem;
      return tmpPrem; 
    })
    .catch(err => {
          console.log(err);
          return result;
    });
       //console.log(result);
        return result;
    }
  
    async RPG(insuredAge : number , mode : number ,occupationType: string,sex :string, riderSum : number ){
      insuredAge=insuredAge+0;
      let totalPrem="0";

      let temp = "0";
      let a = await this.plan.getRider("HCG")
      .then(res => {
      
        let code = sex+occupationType+mode+insuredAge      
        //console.log("code >> "+code+"  "+sex);
        
        totalPrem = res[code];
      
        if(totalPrem=="" || typeof(totalPrem) === 'undefined')
        {
          temp="000000000";
        }
        else
        {
          
          temp = String(parseFloat(String(riderSum/10000)));
          //console.log("temp 1 >> "+temp);
          
          temp = String(parseFloat(String(Number(temp)*Number(totalPrem))));
          //console.log("temp 2 >> "+temp);
          temp= Number(temp).toFixed(2);

          temp= temp.substring(0,temp.length-3);
          temp = this.setlen(temp,9);
        }
        return temp;
    
      })
      .catch(err => {
            console.log(err);
            return temp;
      });
          //console.log(temp);
          return a;
      }



    

  async KG1(insuredAge : number , mode : number , occupationType : string , riderSum : number ){
      let amount = "00007.5";
      let fact = "0000000";
      let result ="0";
      if (mode == 3 || mode > 4)
      return "000000000";
      //var fact = this.pmFact[mode];
      let a = await  this.plan.getRider("KG1")
      .then(res => {
        fact = res['pmFact'][mode];
        fact=this.setlen(fact,3);

        amount=String(Number(amount)*(Number(fact)/100));
        amount=Number(amount).toFixed(2);
        fact = "0.05";
        amount = String(parseFloat(amount)+parseFloat(fact));
        amount=Number(amount).toFixed(2);

        amount=String(Number(amount)*100);
        amount=this.rshift(amount,1,0);
        amount=this.lshift(amount,1,0);
    
        riderSum = this.rshift(riderSum,4,0);
        let tmpPrem :string=String(riderSum*(Number(amount)/100));
        tmpPrem=Number(tmpPrem).toFixed(2);
        tmpPrem=tmpPrem.substring(0,tmpPrem.length-3);
        tmpPrem=this.setlen(tmpPrem,9);
        result = (tmpPrem);
        return result;
          //this.rshift("10")
      })
      .catch(err => {
          console.log(err);
          return result;
      });
      //console.log(a);
      return a;


       
  }

  async KG2(insuredAge : number , mode : number , occupationType : string , riderSum : number , payDate : string){

    let  amount : string ="0";
    let  remain : string ="0.00";
    let result : string = "0";
    let fact = "0000000";

    if (Number(payDate)<25481001)
    {
     //console.log("KG2");
      
      amount = "00015.0";
      remain = "0.05";
    }
    else
      amount = "00012.5";
 
    if (mode == 3 || mode > 4)
     return "000000000";
 
    let a = await  this.plan.getRider("KG2")
    .then(res => {
    
      fact = res['pmFact'][mode];
//console.log("bingo fact1=" + fact);      
      fact=this.setlen(fact,3);
//console.log("bingo fact2=" + fact);

      amount=String(Number(amount)*(Number(fact)/100));
//console.log("bingo amount1=" + amount);      
      amount=Number(amount).toFixed(2);
//console.log("bingo amount2=" + amount);               
      //fact = "0.05";
//console.log("bingo fact3=" + fact);      
//console.log("bingo remain1=" + remain);   
      amount = String(parseFloat(amount)+parseFloat(remain));
//console.log("bingo amount3=" + amount);               
      
      amount=Number(amount).toFixed(2);
//console.log("bingo amount4=" + amount); 
      amount = String(parseInt(String(Number(amount)*100),10));
//console.log("bingo amount5=" + amount);       
      amount=this.rshift(amount,1,0);
//console.log("bingo amount6=" + amount);         
      amount=this.lshift(amount,1,0);
//console.log("bingo amount7=" + amount);       

      riderSum = this.rshift(riderSum,4,0);
      let tmpPrem :string=String(riderSum*(Number(amount)/100));
//console.log("bingo tmpPrem1=" + tmpPrem);       
      tmpPrem=Number(tmpPrem).toFixed(2);
//console.log("bingo tmpPrem2=" + tmpPrem);       
      tmpPrem=tmpPrem.substring(0,tmpPrem.length-3);
//console.log("bingo tmpPrem3=" + tmpPrem);      
      tmpPrem=this.setlen(tmpPrem,9);
      result = (tmpPrem);
//console.log("bingo tmpPrem4=" + tmpPrem);      
      return result;
    
    })
    .catch(err => {
        console.log(err);
        return result;
    });
   // console.log(a);
    return a;
     
}



async TKG1(insuredAge : number , mode : number , occupationType : string , riderSum : number ){
  let amount = "00007.5";
  let fact = "0000000";
  let result ="0";
  if (mode == 3 || mode > 4)
  return "000000000";
  //var fact = this.pmFact[mode];
  let a = await  this.plan.getRider("KG1")
  .then(res => {
    fact = res['pmFact'][mode];
    fact=this.setlen(fact,3);

    amount=String(Number(amount)*(Number(fact)/100));
    amount=Number(amount).toFixed(2);
    fact = "0.05";
    amount = String(parseFloat(amount)+parseFloat(fact));
    amount=Number(amount).toFixed(2);

    amount=String(Number(amount)*100);
    amount=this.rshift(amount,1,0);
    amount=this.lshift(amount,1,0);

    riderSum = this.rshift(riderSum,4,0);
    let tmpPrem :string=String(riderSum*(Number(amount)/100));
    tmpPrem=Number(tmpPrem).toFixed(2);
    tmpPrem=tmpPrem.substring(0,tmpPrem.length-3);
    tmpPrem=this.setlen(tmpPrem,9);
    result = (tmpPrem);
    return result;
      //this.rshift("10")
  })
  .catch(err => {
      console.log(err);
      return result;
  });
  //console.log(a);
  return a;


   
}

async TKG2(insuredAge : number , mode : number , occupationType : string , riderSum : number , payDate : string){

  let  amount : string ="0";
  let  remain : string ="0.00";
  let result : string = "0";
  let fact = "0000000";

  if (Number(payDate)<25481001)
  {
   //console.log("KG2");
    
    amount = "00015.0";
    remain = "0.05";
  }
  else
    amount = "00012.5";

  if (mode == 3 || mode > 4)
   return "000000000";

  let a = await  this.plan.getRider("KG2")
  .then(res => {
  
    fact = res['pmFact'][mode];
//console.log("bingo fact1=" + fact);      
    fact=this.setlen(fact,3);
//console.log("bingo fact2=" + fact);

    amount=String(Number(amount)*(Number(fact)/100));
//console.log("bingo amount1=" + amount);      
    amount=Number(amount).toFixed(2);
//console.log("bingo amount2=" + amount);               
    //fact = "0.05";
//console.log("bingo fact3=" + fact);      
//console.log("bingo remain1=" + remain);   
    amount = String(parseFloat(amount)+parseFloat(remain));
//console.log("bingo amount3=" + amount);               
    
    amount=Number(amount).toFixed(2);
//console.log("bingo amount4=" + amount); 
    amount = String(parseInt(String(Number(amount)*100),10));
//console.log("bingo amount5=" + amount);       
    amount=this.rshift(amount,1,0);
//console.log("bingo amount6=" + amount);         
    amount=this.lshift(amount,1,0);
//console.log("bingo amount7=" + amount);       

    riderSum = this.rshift(riderSum,4,0);
    let tmpPrem :string=String(riderSum*(Number(amount)/100));
//console.log("bingo tmpPrem1=" + tmpPrem);       
    tmpPrem=Number(tmpPrem).toFixed(2);
//console.log("bingo tmpPrem2=" + tmpPrem);       
    tmpPrem=tmpPrem.substring(0,tmpPrem.length-3);
//console.log("bingo tmpPrem3=" + tmpPrem);      
    tmpPrem=this.setlen(tmpPrem,9);
    result = (tmpPrem);
//console.log("bingo tmpPrem4=" + tmpPrem);      
    return result;
  
  })
  .catch(err => {
      console.log(err);
      return result;
  });
 // console.log(a);
  return a;

 
}

async endowmentYear(insuredAge : number , endowmentYear : string , payYear : string){
  let trYear = "";
  trYear = (parseInt(endowmentYear)< parseInt(payYear))?endowmentYear : payYear;
  let case75 = 75 - insuredAge;
  if(parseInt(trYear) >= case75)
    trYear = String(case75);

  if(parseInt(trYear) >= 19)
    trYear = "19";

    return trYear;
}


async endowmentYearKB(insuredAge : number , panrentAge  : number , payYear : string){
  let case30 = (30 - insuredAge);
  let case60 = (60 - panrentAge);
  if(parseInt(payYear) > case30)
   payYear = String(case30);
  if(parseInt(payYear) > case60)
  payYear = String(case60);

    return payYear;
}

async endowmentYearJP4(endowmentYear : string){
  
  let jpYear = 19;
  if(parseInt(endowmentYear) < 19)
    jpYear = Number(endowmentYear);
  return String(jpYear);
}


async D01(insuredAge : number , endowmentYear : string , mode : number , sex : string , riderSum : number ){
  let premium = '00000000';
  let result = "0";
  let key = "";
  if(riderSum == 0)return "00000000";
  let a = await  this.plan.getRider("D09")
    .then(res => {
      key = this.itoa(parseInt(endowmentYear)+55);
      //console.log("convert key "+key);
      
      let data = key+sex+String(mode)+String(Number(insuredAge));
//console.log("D01 >  "+data);
      
      premium  = res[data];
      let temp = parseFloat(String(Number(riderSum)/100000));
      temp = parseFloat(String(temp*Number(premium)));
console.log("0 D01   temp >  "+temp);
      let temp2 =  Math.floor(temp);
    //  let temp2 = (Number(temp).toFixed(0));
console.log("1 D01 >  "+temp2);
      temp2  = this.setlen(temp2,9);
console.log("2 D01 >  "+temp2);
      result = String(temp2);
      return result;
     

  })
  .catch(err => {
      console.log(err);
      return result;
  });
  return result;
}


async D02(insuredAge : number , endowmentYear : string , mode : number , sex : string , riderSum : number ){
  let premium = '00000000';
  let result = "0";
  let key = "";
  if(riderSum == 0)return "00000000";
  let a = await  this.plan.getRider("D10")
    .then(res => {
      key = this.itoa(parseInt(endowmentYear)+55);
     // alert("convert key "+key);
      
      let data = key+sex+String(mode)+String(Number(insuredAge));
      //console.log("D02 >  "+data);
      
      premium  = res[data];
      let temp = parseFloat(String(Number(riderSum)/100000));
      temp = parseFloat(String(temp*Number(premium)));
//console.log("1 D02 >  "+temp);
      let temp2 =  Math.floor(temp); 
      // let temp2 = (Number(temp).toFixed(0)); ปัดขึ้น
//console.log("1.1 D02 >  "+temp2);
      temp2  = this.setlen(temp2,9);
//console.log("2 D02 >  "+temp2);
      result = String(temp2);
      return result;

  })
  .catch(err => {
      console.log(err);
      return result;
  });
  return result;
}

async D03(insuredAge : number ,  mode : number , sex : string , riderSum : number ){
  let premium = '00000000';
  let result = "0";
  let a = await  this.plan.getRider("D03")
    .then(res => {
      
      let data = sex+String(mode)+String(Number(insuredAge));
   
      
      premium  = res[data];
      if(typeof(premium) === 'undefined')
      return '00000000';
  //console.log("D03 >  "+data+"  "+premium);
      let temp = parseFloat(String(Number(riderSum)/10000));
      temp = parseFloat(String(temp*Number(premium)));
      temp  = this.setlen(temp,9);
      result = String(temp);
      return result;

  })
  .catch(err => {
      console.log(err);
      return result;
  });
  return a;
}


async VP34678(insuredAge : number ,  mode : number ,occupationType : string, sex : string , vp : string ){
  let premium = '00000000';
  let result = "0";
  if(Number(vp) > 0){
    let a = await  this.plan.getRider("VP"+(vp))
    .then(res => {
      
      let data = sex+occupationType+String(mode)+String(Number(insuredAge));
      //let data = sex+occupationType+String(Number(insuredAge))+String(mode);
      //console.log(" >  "+data);
      
      premium  = res[data];
      result = premium;
      return result;

    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  }
  else return premium;
  
}

async VP5(insuredAge : number ,  mode : number ,occupationType : string, sex : string , vp : boolean ){
  let premium = '00000000';
  let result = "0";
  //console.log("VP5 >>"+vp);
  
  if(vp){
    let a = await  this.plan.getRider("VP5")
    .then(res => {
      
      let data = sex+occupationType+String(mode)+String(Number(insuredAge));
      //let data = sex+occupationType+String(Number(insuredAge))+String(mode);
      //console.log(" >  "+data);
      
      premium  = res[data];
      result = premium;
      return result;

    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  }
  else return premium;
  
}




  async SmartV(insuredAge : number ,  mode : number ,occupationType : string, sex : string , vp : string ){
    let premium = '00000000';
    let result = "0";
    //console.log("smartVIP  >>>  "+vp);
    if(Number(vp) > 0){
      let a = await  this.plan.getRider("V0"+(vp))
      .then(res => {
        
        let data = sex+occupationType+String(mode)+String(Number(insuredAge));
        //let data = sex+occupationType+String(Number(insuredAge))+String(mode);
        //console.log("smartVIP >  "+data);
        
        premium  = res[data];
        result = premium;
        return result;

      })
      .catch(err => {
          console.log(err);
          return result;
      });
      return result;
    }
    else return premium;
    
  }


async SR2(insuredAge : number ,  mode : number ,occupationType : string, sex : string , riderSum : number ){
  let premium = '00000000';
  let result = "0";
  //console.log("SR2");
  if(riderSum == 0) return result;
    let a = await  this.plan.getRider("SR2")
    .then(res => {
      
      let data = sex+occupationType+String(mode)+String(Number(insuredAge));
      //let data = sex+occupationType+String(Number(insuredAge))+String(mode);
      //console.log("SR2 >  "+data);
      
      premium  = res[data];
      result = String(Number(premium) * riderSum);
      return result;

    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  
}

async G0(insuredAge : number ,  mode : number ,occupationType : string, sex : string , riderSum : number ){
  let premium = '00000000';
  let result = "0";
  

  if(riderSum == 0 || String(riderSum) == "") return result;
  let g = String(riderSum).substring(0,1);
  console.log("G0==" + g);
    let a = await  this.plan.getRider("G0"+g)
    .then(res => {
      
      let data = sex+occupationType+String(mode)+String(Number(insuredAge));
      //let data = sex+occupationType+String(Number(insuredAge))+String(mode);
      //console.log("SR2 >  "+data);
      
      premium  = res[data];
      result = premium;
      return result;

    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  
}

async H(insuredAge : number ,  mode : number ,occupationType : string, sex : string , riderSum : number ){
  let premium = '00000000';
  let result = "0";
  //console.log("H");
  if(riderSum == 0 ||  String(riderSum) == "") return result;
  
 let g = "";
  if(riderSum == 10000)
     g =  "1K";
  else
    g = String(riderSum).substring(0,2);
    let a = await  this.plan.getRider("H"+g)
    .then(res => {
      
      let data = sex+occupationType+String(mode)+String(Number(insuredAge));
      //let data = sex+occupationType+String(Number(insuredAge))+String(mode);
      //console.log("SR2 >  "+data);
      
      premium  = res[data];
      result = premium;
      return result;

    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  
}

  async KB2(parentAge : number , endowmentYear : string , mode : number , sex : string , totPrem : number ){

    let i, j;
    let amount = "000000";
    let result = "000000"
    let insured = parseInt(endowmentYear); //ระยะความคุ้มครอง
    let age = (parentAge); // อายุผู้ปกครอง
//console.log("premiumcal KB2 อายุผู้ปกครอง == " + age);
    if (age < 20)
    {
          age = 20;
    }
    if (age > 50)
   {
          age = 50;
    }
  i = insured - 2;
  age = age - 30;
  if (age < 0)
  age = 0;
  if ((age  % 5) > 0)
    j = 1
  else
    j = 0;
  j   = Math.ceil((j + age) / 5);


  let a = await  this.plan.getRider("KB2")
      .then(res => {
        // key = this.itoa(parseInt(endowmentYear)+55);
        // console.log("convert key "+key);
        
        // let data = key+sex+String(mode)+String(Number(parentAge));
        // console.log("D01 >  "+data);
        
        // premium  = res[data];
        // let temp = parseFloat(String(Number(riderSum)/10000));
        // temp = parseFloat(String(temp*Number(premium)));
        // temp  = this.setlen(temp,9);
        // result = String(temp);
        // 
        if (parentAge === 0)
          return "0";
        
        let test = "";
        if (sex.length > 0 && sex =='M')
        {
          let data = "M"+(i+"")+(j+"");
          test = data;
          amount = res[data];
          if(typeof(amount) === 'undefined')return "0";
         // console.log("check NAN >> "+JSON.stringify(res[data]));
         // console.log(">> "+amount);
          
          amount = this.setlen(amount,6);
        }
        else
        {
          let data = "F"+(i+"")+(j+"");
          test = data;
          amount = res[data];
          if(typeof(amount) === 'undefined')return "0";
          //console.log("check NAN >> "+JSON.stringify(res[data]));
          amount = this.setlen(amount,6);
          //console.log("check NAN >> "+JSON.stringify(res[data]));
          //console.log(">> "+amount);
        }
        let tmpPrem = String(Number(amount)/10);
        tmpPrem = ((totPrem)*Number(tmpPrem)).toFixed(2);
        //console.log(tmpPrem);
        
        result = ( tmpPrem.substring(0,tmpPrem.length-5) );
//console.log("premiumcal   kb2=" + result + "   totPrem=" + totPrem +"   data=" + test + "   amount=" +amount);
        return result;
    })
    .catch(err => {
        console.log(err);
        return result;
    });
  return result;

  }
 // ตอนนี้เป็น ฉพ3 
  async JP4(insuredAge : number , endowmentYear : string , mode : number , sex : string , riderSum : number ){
    let premium = '00000000';
    let result = "0";
    let key = "";
    if(riderSum == 0 || String(riderSum) == "")return "00000000";
    let a = await  this.plan.getRider("JP4")
      .then(res => {
        key = this.itoa(parseInt(endowmentYear)+55);
        //console.log("convert key "+key);
        
        let data = key+sex+String(mode)+String(Number(insuredAge));
        
        premium  = res[data];
//console.log("bingo JP4 premium >  "+premium + "  data=" +data);        
        let temp = parseFloat(String(Number(riderSum)/100000));   // ถ้า JP4 new tmo มา ต้องแก้เป็น หาร 100000
//console.log("bingo JP4 temp >  "+temp + "  riderSum >  "+riderSum);   
        temp = parseFloat(String(temp*Number(premium)));
        temp  = this.setlen(temp,9);
        result = String(temp);
        result = String(Math.floor(Number(result)));
//console.log("bingo JP4 result >  "+result);   
        return result;
  
    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  }


  // ตอนนี้เป็น สพ เด็ก 
  async J0(insuredAge : number , mode : number , sex : string , riderSum : number ){
    let age = this.setlen(insuredAge,2);
//console.log("bingo JP0 >> "+age);    
    let premium = '00000000';
    let result = "0";
    let key = "";
    if(riderSum == 0 || String(riderSum) == "")return "00000000";
    let a = await  this.plan.getRider("J0")
      .then(res => {
        key = "J0";
        //console.log("convert key "+key);
        
        let data = key+String(riderSum)+sex+String(mode)+String(Number(insuredAge));
        
        premium  = res[data];
//console.log("bingo J0 premium >  "+premium + "  data=" +data);        
        let temp  = this.setlen(premium,9);
        result = String(temp);
//console.log("bingo J0 result >  "+result);   
        return result;
  
    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  }


  async TH(insuredAge : number , occupationType : string , mode : number , sex : string , riderSum : number , payDate : string){
    let premium = '00000000';
    let result = "0";
    let key = "";
    if(riderSum == 0 || String(riderSum) == "")return "00000000";
    let querystr = String(riderSum).substring(0,2);
    //console.log("TH >  T"+querystr);
    let a = await  this.plan.getRider("T"+querystr)
      .then(res => {
        
        let data = sex+occupationType+String(mode)+String(Number(insuredAge));
        //console.log("TH >  "+data);
        
        premium  = res[data];
      
        result = String(premium);
        return result;
  
    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  }

  async TRP(insuredAge : number , occupationType : string , mode : number , sex : string , riderSum : number ){
    let premium = '00000000';
    let result = "0";
    let key = "";
    if(riderSum == 0 || String(riderSum) == "")return "00000000";
    let a = await  this.plan.getRider("TRP")
      .then(res => {
        
        let data = sex+String(mode)+String(insuredAge);
        let premium = res[data];
        //console.log("TRP >  "+data);
        let temp : number = 0;  	 
        temp = riderSum/100;
        temp = (temp*Number(premium));
        temp = this.setlen(String(temp),9);
        
        result = String(temp);
        return result;
  
    })
    .catch(err => {
        console.log(err);
        return result;
    });
    return result;
  }


  async TAC01(insuredAge : number , mode : number , occupationType : string , riderSum : number ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    if(mode == 3 || mode > 4 || occupationType > '3')
      return "000000";
    let a =  await this.plan.getRider("AC01")
      .then(res => {
        amount = res['amtRate'][occupationType];
        fact = res['pmFact'][mode];
        amount = String((Number(amount)/10)*(Number(fact)/100));
          
        amount = Number(amount).toFixed(2);
        amount = String(parseInt(String(Number(amount)*100),10));
        amount = this.rshift(amount,1,0)
        amount = this.lshift(amount,1,0)
        riderSum = this.rshift(riderSum,4,0);
        tmpPrem = String(riderSum * (Number(amount)/100));
        tmpPrem = Number(tmpPrem).toFixed(2);
        tmpPrem = tmpPrem.substring(0,tmpPrem.length-3);
        tmpPrem = this.setlen(tmpPrem,9);
       // console.log(">>>>>>>>>>>>"+amount+"  "+fact+"   "+tmpPrem);
        result = (tmpPrem);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });

      return a;
  }


  async TAC02(insuredAge : number , mode : number , occupationType : string , riderSum : number ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    if(mode == 3 || mode > 4 || occupationType > '3')
      return "000000";
     let a = await this.plan.getRider("AC02")
      .then(res => {
        amount = res['amtRate'][occupationType];
        fact = res['pmFact'][mode];
        amount = String((Number(amount)/10)*(Number(fact)/100));
          
        amount = Number(amount).toFixed(2);
        amount = String(parseInt(String(Number(amount)*100),10));
        amount = this.rshift(amount,1,0)
        amount = this.lshift(amount,1,0)
        riderSum = this.rshift(riderSum,4,0);
        tmpPrem = String(riderSum * (Number(amount)/100));
        tmpPrem = Number(tmpPrem).toFixed(2);
        tmpPrem = tmpPrem.substring(0,tmpPrem.length-3);
        tmpPrem = this.setlen(tmpPrem,9);
        //console.log(">>>>>>>>>>>>"+amount+"  "+fact+"   "+tmpPrem);
        result = (tmpPrem);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async AP5(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("AP5")
      .then(res => {

        let req = 'AP5'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        console.log("AP5>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async D08(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("D08")
      .then(res => {

        let req = 'D08'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        console.log("D08>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async HD(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("HD")
      .then(res => {

        let req = 'HD'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        console.log("HD>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async D13(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("D13")
      .then(res => {

        let req = 'D13'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        console.log("D13>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async HD1(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("HD1")
      .then(res => {

        let req = 'HD1'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        console.log("HD1>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async C00(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("C00")
      .then(res => {

        let req = 'C00'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        console.log("C00>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async HA(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("HA")
      .then(res => {

        let req = 'HA'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        console.log("HA>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async C07(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("C07")
      .then(res => {

        let req = 'C07'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        //console.log("C07>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async HA1(insuredAge : string , mode : string , sex : string , packaged : string ){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : string = "";
    let result : string = "0";
    
     let a = await this.plan.getRider("HA1")
      .then(res => {

        let req = 'HA1'+sex+mode+insuredAge+packaged;
        amount = res[req];
       
        //console.log("HA1>>>>>>>>>>>>"+amount+"  "+req);
        result = (amount);
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async C11(insuredAge : string , mode : string , sex : string , packaged : string ){

    let riderSum = "0";
    let planType = "1";
    let numberAge = 1;
    if(packaged=='1'){
      riderSum="100000";
    }
    else if(packaged=='2'){
      riderSum="200000";
    }
    else if(packaged=='3'){
      riderSum="250000";
    }
    else  if(packaged=='4'){
      riderSum="500000";
    }	
    if (riderSum=="100000")
        planType = "1";
    else if (riderSum=="200000")
        planType = "2";
    else if (riderSum=="250000")
        planType = "3";
    else if (riderSum=="500000")
        planType = "4";
    

    if ((Number(insuredAge)>=16) && (Number(insuredAge)<=35))
        numberAge  = 1;
    else if ((Number(insuredAge)>=36) && (Number(insuredAge)<=40))
        numberAge  = 2;
    else if ((Number(insuredAge)>=41) && (Number(insuredAge)<=45))
        numberAge  = 3;
    else if ((Number(insuredAge)>=46) && (Number(insuredAge)<=50))
        numberAge  = 4;
    else if ((Number(insuredAge)>=51) && (Number(insuredAge)<=55))
        numberAge  = 5;
    else if ((Number(insuredAge)>=56) && (Number(insuredAge)<=60))
        numberAge  = 6;
    else if ((Number(insuredAge)>=61) && (Number(insuredAge)<=65))
        numberAge  = 7;
    else if ((Number(insuredAge)>=66) && (Number(insuredAge)<=70))
        numberAge  = 8;

    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    
     let a = await this.plan.getRider("C11")
      .then(res => {

        let req = mode+String(numberAge)+planType;
        amount = res[req];
        
        //console.log("C11>>>>>>>>>>>>"+amount+"  "+req);
        result = amount;
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async C12(insuredAge : string , mode : string , sex : string , packaged : string ){

    let riderSum = "0";
    let planType = "1";
    let numberAge = 1;
    if(packaged=='1'){
      riderSum="100000";
    }
    else if(packaged=='2'){
      riderSum="200000";
    }
    else if(packaged=='3'){
      riderSum="250000";
    }
    else  if(packaged=='4'){
      riderSum="500000";
    }	
    if (riderSum=="100000")
        planType = "1";
    else if (riderSum=="200000")
        planType = "2";
    else if (riderSum=="250000")
        planType = "3";
    else if (riderSum=="500000")
        planType = "4";
    

    if ((Number(insuredAge)>=16) && (Number(insuredAge)<=35))
        numberAge  = 1;
    else if ((Number(insuredAge)>=36) && (Number(insuredAge)<=40))
        numberAge  = 2;
    else if ((Number(insuredAge)>=41) && (Number(insuredAge)<=45))
        numberAge  = 3;
    else if ((Number(insuredAge)>=46) && (Number(insuredAge)<=50))
        numberAge  = 4;
    else if ((Number(insuredAge)>=51) && (Number(insuredAge)<=55))
        numberAge  = 5;
    else if ((Number(insuredAge)>=56) && (Number(insuredAge)<=60))
        numberAge  = 6;
    else if ((Number(insuredAge)>=61) && (Number(insuredAge)<=65))
        numberAge  = 7;
    else if ((Number(insuredAge)>=66) && (Number(insuredAge)<=70))
        numberAge  = 8;

    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    
     let a = await this.plan.getRider("C12")
      .then(res => {

        let req = mode+String(numberAge)+planType;
        amount = res[req];
        
        //console.log("C12>>>>>>>>>>>>"+amount+"  "+req);
        result = amount;
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }


  async C01(insuredAge : string ,packaged : string ){

    let riderSum = "0";
    let planType = "1";
    let numberAge = 1;
    if(packaged=='1'){
      riderSum="100000";
    }
    else if(packaged=='2'){
      riderSum="200000";
    }
    else if(packaged=='3'){
      riderSum="250000";
    }
    else  if(packaged=='4'){
      riderSum="500000";
    }	
    if (riderSum=="100000")
        planType = "1";
    else if (riderSum=="200000")
        planType = "2";
    else if (riderSum=="250000")
        planType = "3";
    else if (riderSum=="500000")
        planType = "4";
    

    if ((Number(insuredAge)>=16) && (Number(insuredAge)<=35))
        numberAge  = 1;
    else if ((Number(insuredAge)>=36) && (Number(insuredAge)<=40))
        numberAge  = 2;
    else if ((Number(insuredAge)>=41) && (Number(insuredAge)<=45))
        numberAge  = 3;
    else if ((Number(insuredAge)>=46) && (Number(insuredAge)<=50))
        numberAge  = 4;
    else if ((Number(insuredAge)>=51) && (Number(insuredAge)<=55))
        numberAge  = 5;
    else if ((Number(insuredAge)>=56) && (Number(insuredAge)<=60))
        numberAge  = 6;
    else if ((Number(insuredAge)>=61) && (Number(insuredAge)<=65))
        numberAge  = 7;
    else if ((Number(insuredAge)>=66) && (Number(insuredAge)<=70))
        numberAge  = 8;

    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    
     let a = await this.plan.getRider("C01")
      .then(res => {

        let req = String(numberAge)+planType;
        amount = res[req];
        
        //console.log("C01>>>>>>>>>>>>"+amount+"  "+req);
        result = amount;
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async C02(insuredAge : string  , packaged : string ){

    let riderSum = "0";
    let planType = "1";
    let numberAge = 1;
    if(packaged=='1'){
      riderSum="100000";
    }
    else if(packaged=='2'){
      riderSum="200000";
    }
    else if(packaged=='3'){
      riderSum="250000";
    }
    else  if(packaged=='4'){
      riderSum="500000";
    }	
    if (riderSum=="100000")
        planType = "1";
    else if (riderSum=="200000")
        planType = "2";
    else if (riderSum=="250000")
        planType = "3";
    else if (riderSum=="500000")
        planType = "4";
    

    if ((Number(insuredAge)>=16) && (Number(insuredAge)<=35))
        numberAge  = 1;
    else if ((Number(insuredAge)>=36) && (Number(insuredAge)<=40))
        numberAge  = 2;
    else if ((Number(insuredAge)>=41) && (Number(insuredAge)<=45))
        numberAge  = 3;
    else if ((Number(insuredAge)>=46) && (Number(insuredAge)<=50))
        numberAge  = 4;
    else if ((Number(insuredAge)>=51) && (Number(insuredAge)<=55))
        numberAge  = 5;
    else if ((Number(insuredAge)>=56) && (Number(insuredAge)<=60))
        numberAge  = 6;
    else if ((Number(insuredAge)>=61) && (Number(insuredAge)<=65))
        numberAge  = 7;
    else if ((Number(insuredAge)>=66) && (Number(insuredAge)<=70))
        numberAge  = 8;

    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    
     let a = await this.plan.getRider("C02")
      .then(res => {

        let req = String(numberAge)+planType;
        amount = res[req];
        
        //console.log("C02>>>>>>>>>>>>"+amount+"  "+req);
        result = amount;
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async TT(insuredAge : string , mode : string , sex : string , riderSum : string ,planCode : string){
    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    let RiderCode : string ="";

    if (planCode.startsWith("TR") )
      RiderCode ="TT";
    else
      RiderCode ="TT1";
      

    
     let a = await this.plan.getRider(RiderCode)
      .then(res => {

        let req = planCode+sex+mode+insuredAge;
        amount = res[req];
        let rsum = (Number(riderSum)/100000).toFixed(2);
        let gross = (Number(rsum)*Number(amount)).toFixed(2);
        tmpPrem = Math.floor(Number(gross));
        if (gross.substring(gross.indexOf("."))!=".00" && planCode.startsWith("TR"))
        {
          tmpPrem = Number(tmpPrem) + 1;
        }


        //console.log("TT>>>>>>>>>>>>"+amount+"  "+req+"  "+tmpPrem+"  "+gross);
        result = String(tmpPrem);
        return result;




/*

        var rsum = parseFloat(riderSum/100000).toFixed(2);
		    var gross = parseFloat(rsum*premium).toFixed(2);
        var tpdprm = Math.floor(gross);
      console.log("TT1   tpdprm==" + tpdprm +"gross=="+ gross);
        if(gross.substring(gross.indexOf("."))!=".00"){
          console.log("1  tpdprm==" +tpdprm);
          tpdprm = tpdprm+1;
          console.log("2  tpdprm==" +tpdprm);
        }
        console.log("TT2   tpdprm==" + tpdprm);
        return tpdprm;*/
    


        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }
  
  async C13(insuredAge : string , mode : string , sex : string , packaged : string ){

    let riderSum = "0";
    let planType = "1";
    let numberAge = 1;
    if(packaged=='1'){
      riderSum="100000";
    }
    else if(packaged=='2'){
      riderSum="200000";
    }
    else if(packaged=='3'){
      riderSum="250000";
    }
    else  if(packaged=='4'){
      riderSum="500000";
    }	
    if (riderSum=="100000")
        planType = "1";
    else if (riderSum=="200000")
        planType = "2";
    else if (riderSum=="250000")
        planType = "3";
    else if (riderSum=="375000")
        planType = "4";
    else if (riderSum=="500000")
        planType = "5";    
    

    if ((Number(insuredAge)>=16) && (Number(insuredAge)<=35))
        numberAge  = 1;
    else if ((Number(insuredAge)>=36) && (Number(insuredAge)<=40))
        numberAge  = 2;
    else if ((Number(insuredAge)>=41) && (Number(insuredAge)<=45))
        numberAge  = 3;
    else if ((Number(insuredAge)>=46) && (Number(insuredAge)<=50))
        numberAge  = 4;
    else if ((Number(insuredAge)>=51) && (Number(insuredAge)<=55))
        numberAge  = 5;
    else if ((Number(insuredAge)>=56) && (Number(insuredAge)<=60))
        numberAge  = 6;
    else if ((Number(insuredAge)>=61) && (Number(insuredAge)<=65))
        numberAge  = 7;
    else if ((Number(insuredAge)>=66) && (Number(insuredAge)<=70))
        numberAge  = 8;

    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    
     let a = await this.plan.getRider("C13")
      .then(res => {

        let req = mode+String(numberAge)+planType;
        amount = res[req];
        
        //console.log("C13>>>>>>>>>>>>"+amount+"  "+req);
        result = amount;
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async C14(insuredAge : string , mode : string , sex : string , packaged : string ){

    let riderSum = "0";
    let planType = "1";
    let numberAge = 1;
    if(packaged=='1'){
      riderSum="100000";
    }
    else if(packaged=='2'){
      riderSum="200000";
    }
    else if(packaged=='3'){
      riderSum="250000";
    }
    else  if(packaged=='4'){
      riderSum="500000";
    }	
    if (riderSum=="100000")
        planType = "1";
    else if (riderSum=="200000")
        planType = "2";
    else if (riderSum=="250000")
        planType = "3";
    else if (riderSum=="375000")
        planType = "4";
    else if (riderSum=="500000")
        planType = "5";    
    

    if ((Number(insuredAge)>=16) && (Number(insuredAge)<=35))
        numberAge  = 1;
    else if ((Number(insuredAge)>=36) && (Number(insuredAge)<=40))
        numberAge  = 2;
    else if ((Number(insuredAge)>=41) && (Number(insuredAge)<=45))
        numberAge  = 3;
    else if ((Number(insuredAge)>=46) && (Number(insuredAge)<=50))
        numberAge  = 4;
    else if ((Number(insuredAge)>=51) && (Number(insuredAge)<=55))
        numberAge  = 5;
    else if ((Number(insuredAge)>=56) && (Number(insuredAge)<=60))
        numberAge  = 6;
    else if ((Number(insuredAge)>=61) && (Number(insuredAge)<=65))
        numberAge  = 7;
    else if ((Number(insuredAge)>=66) && (Number(insuredAge)<=70))
        numberAge  = 8;

    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    
     let a = await this.plan.getRider("C14")
      .then(res => {

        let req = mode+String(numberAge)+planType;
        amount = res[req];
        
        //console.log("C14>>>>>>>>>>>>"+amount+"  "+req);
        result = amount;
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }


  async C04(insuredAge : string ,packaged : string ){

    let riderSum = "0";
    let planType = "1";
    let numberAge = 1;

    if(packaged=='1'){
      riderSum="100000";
    }
    else if(packaged=='2'){
      riderSum="200000";
    }
    else if(packaged=='3'){
      riderSum="250000";
    }
    else  if(packaged=='4'){
      riderSum="500000";
    }	
    if (riderSum=="100000")
        planType = "1";
    else if (riderSum=="200000")
        planType = "2";
    else if (riderSum=="250000")
        planType = "3";
    else if (riderSum=="375000")
        planType = "4";
    else if (riderSum=="500000")
        planType = "5";    

    if ((Number(insuredAge)>=16) && (Number(insuredAge)<=35))
        numberAge  = 1;
    else if ((Number(insuredAge)>=36) && (Number(insuredAge)<=40))
        numberAge  = 2;
    else if ((Number(insuredAge)>=41) && (Number(insuredAge)<=45))
        numberAge  = 3;
    else if ((Number(insuredAge)>=46) && (Number(insuredAge)<=50))
        numberAge  = 4;
    else if ((Number(insuredAge)>=51) && (Number(insuredAge)<=55))
        numberAge  = 5;
    else if ((Number(insuredAge)>=56) && (Number(insuredAge)<=60))
        numberAge  = 6;
    else if ((Number(insuredAge)>=61) && (Number(insuredAge)<=65))
        numberAge  = 7;
    else if ((Number(insuredAge)>=66) && (Number(insuredAge)<=70))
        numberAge  = 8;

    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    
     let a = await this.plan.getRider("C04")
      .then(res => {

        let req = String(numberAge)+planType;
        amount = res[req];
        
        //console.log("C04>>>>>>>>>>>>"+amount+"  "+req);
        result = amount;
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }

  async C05(insuredAge : string  , packaged : string ){

    let riderSum = "0";
    let planType = "1";
    let numberAge = 1;
    if(packaged=='1'){
      riderSum="100000";
    }
    else if(packaged=='2'){
      riderSum="200000";
    }
    else if(packaged=='3'){
      riderSum="250000";
    }
    else  if(packaged=='4'){
      riderSum="500000";
    }	
    if (riderSum=="100000")
        planType = "1";
    else if (riderSum=="200000")
        planType = "2";
    else if (riderSum=="250000")
        planType = "3";
    else if (riderSum=="375000")
        planType = "4";
    else if (riderSum=="500000")
        planType = "5";    

    if ((Number(insuredAge)>=16) && (Number(insuredAge)<=35))
        numberAge  = 1;
    else if ((Number(insuredAge)>=36) && (Number(insuredAge)<=40))
        numberAge  = 2;
    else if ((Number(insuredAge)>=41) && (Number(insuredAge)<=45))
        numberAge  = 3;
    else if ((Number(insuredAge)>=46) && (Number(insuredAge)<=50))
        numberAge  = 4;
    else if ((Number(insuredAge)>=51) && (Number(insuredAge)<=55))
        numberAge  = 5;
    else if ((Number(insuredAge)>=56) && (Number(insuredAge)<=60))
        numberAge  = 6;
    else if ((Number(insuredAge)>=61) && (Number(insuredAge)<=65))
        numberAge  = 7;
    else if ((Number(insuredAge)>=66) && (Number(insuredAge)<=70))
        numberAge  = 8;

    let amount : string = "000000";
    let fact : string = "000";
    let tmpPrem : Number = 0;
    let result : string = "0";
    
     let a = await this.plan.getRider("C05")
      .then(res => {

        let req = String(numberAge)+planType;
        amount = res[req];
        
        //console.log("C05>>>>>>>>>>>>"+amount+"  "+req);
        result = amount;
        return result;
        //this.rshift("10")
      })
      .catch(err => {
        console.log(err);
        return result;
      });
      //console.log(a);
      return a;
      
  }
  async checkPlanFee(premium : Number, choosePlan : string){
    await this.planService.planfee().then(scr=>{
      let result : Array<any> = scr;

        let data : Array<any> = result.filter((item,index)=>{
            return item.planCode.indexOf(choosePlan) > -1
        });
        if(data.length > 0){
          return String( premium + data[0].fee);
        }

    }).catch(err => console.log(err));
  }

  /**
   * เบี้ยประกันภัยรวมที่ซื้อได้
   */
  async getPremiumPackageForDetail(calType : number ,choosePlan : string, mode : string , gender : string , age : string) {
    if (calType != 1) {
      let obj: PremiumPackageM = new PremiumPackageM();
      obj.plancode = choosePlan;//Require = Y
      obj.mode = mode;//Require = Y
      obj.sex = gender;//Require = Y
      obj.age = age;//Require = Y

      let objs: Array<PremiumPackageM> = [];
      objs.push(obj);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.PREMIUM_PACKAGE;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = objs;
      let premiumTotal = "0";

    let a =  await  this.apiProvider.callData(reqM).then(
        (res) => {
         // console.log(res['data']);
          
          let min: number = res['data'][0]['minpremium'];
          let max: number = res['data'][0]['maxpremium'];
          let step: number = res['data'][0]['step'];
          premiumTotal = min.toString();
          return premiumTotal;
        },
        (err) => {
          return err;
          //this.alertCtrl.error(err);
        }
      );
      //console.log(a);
      return premiumTotal;
    }
  }
  

  async getSumRateO(choosePlan : string, mode : string , gender : string , age : string, premiumTotal : string ){
    let objM: SumrateoM = new SumrateoM();
    
    objM.plancode = choosePlan;//Require = Y
    objM.sex = gender;//Require = Y
    objM.premium = this.factorCalType(Number(mode) ,Number(premiumTotal));//Require = Y
    objM.insuredage = age;//Require = Y
    //console.log(objM);
    
    let objMs: Array<SumrateoM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.SUMRATEO;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs;
    //console.log(objMs);
    let baseIncrementer = "0";
    await this.apiProvider.callData(reqM).then(
      (res) => {
        let obj: any = res;
        //console.log(JSON.stringify(res));
        baseIncrementer = obj.data[0].sum;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
    return baseIncrementer;
  }

  async getSumRate(choosePlan: string, gender : string ,premiumTotal :string , age :string){
    let objM: SumrateM = new SumrateM();
    //console.log(choosePlan+"  "+gender+"  "+premiumTotal+"  "+age);
    
    objM.plancode =  choosePlan;//Require = Y
    objM.sex = gender;//Require = Y
    //objM.premium = premCal.factorCalType(Number(mode) ,Number(premiumTotal));//Require = Y
    objM.premium = premiumTotal;
    objM.insuredage = age;//Require = Y

    let objMs: Array<SumrateM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.SUMRATE;
    reqM.serviceName = ServiceName.SELECT;
    //reqM.searchkey = ""all"";
    reqM.agentid = "00770198";
    reqM.param = objMs;

    await this.apiProvider.callData(reqM).then(
      (res) => {
        let obj: any = res;
        //this.premiumFooter = this.premiumTotal;
        let baseIncrementer = obj.data[0].sum;
        return baseIncrementer;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  }

  async getPackageDetail(choosePlan : string,occupationType :string , age :string){
    let objM: PackageDetailM = new PackageDetailM();
    objM.plancode = choosePlan;//Require = Y
    objM.occupationtype = occupationType;//Require = Y
    objM.age = age;

    let objMs: Array<PackageDetailM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PACKAGE_DETAIL;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs;
    let premiumPackage = [];
    return await this.apiProvider.callData(reqM).then(
      (res) => {
   
        let obj: any = res;
        if(obj.status == 0 && obj.size > 0){
          //console.log(JSON.stringify(res));
          let okpackage = obj.data[0].okpackage;
          let packages = okpackage.split(',');
          let packagee = packages[0];
          return packagee;
        }
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  }

  async getPremiumRate(choosePlan : string, gender : string, mode : string , age : string , packagee : string ){
    let objM: PremiumRateM = new PremiumRateM();
    objM.plancode = choosePlan; //Require = Y
    //console.log("sex >> "+gender+" mdoe >  "+mode+"  age  > "+age+"  package > "+packagee);
    
    objM.sex = gender; //Require = Y
    objM.mode = mode; //Require = Y
    objM.age = age; //Require = Y
    objM.packages = packagee; //Require = Y

    let objMs: Array<PremiumRateM> = [];
    objMs.push(objM);  

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PREMIUMRATE;
    reqM.serviceName = ServiceName.SELECT;
   // reqM.searchkey = ""all"";
    reqM.param = objMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        let obj: any = res;
        if(obj.status == 0 && obj.size > 0){
          //console.log(JSON.stringify(res));
          let premiumTotal = obj.data[0].premium;
          //let premiumFooter = obj.data[0].premium;
          return premiumTotal;
        }
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  }

  async getCoverageRate(choosePlan : string , packagee : string){
    
      let objM: PackageCoverageM = new PackageCoverageM();
      objM.plancode = choosePlan; //Require = Y
      objM.pan = packagee; //Require = Y

      let objMs: Array<PackageCoverageM> = [];
      objMs.push(objM); 

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.PACKAGE_COVERAGE;
      reqM.serviceName = ServiceName.SELECT;
      //reqM.searchkey = "all";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
      (res) => {
        let obj: any = res;
        if(obj.status == 0 && obj.size > 0){
          //console.log(JSON.stringify(res));
          let baseIncrementer = obj.data[0].lifesum;
          return baseIncrementer;
        }
        return "";
      },
      (err) => {
        console.log(err);
        return err;
        
      }
    );
  }

  setlen(s,n)
  {
    s = s+"";
    while(s.length<n)
    {
        s="0"+s;
    }
    return s;
  }
  rshift(s,n,k)
  {
    s = s+"";
    s = s.substring(0,s.length-n);
    var i = 0;
    while(i<n)
    {
        s = "0"+s;
        i++;
    }
    return s;
  }
  lshift(s,n,k)
  {
    s = s+"";
    s = s.substring(n);
    var i = 0;
    while(i<n)
    {
        s = s+"0";
        i++;
    }
    return s;
  }
  itoa(i){
    return String.fromCharCode(i);
  }

  factorCalType(mode : number , premiumNumber : number){
    let factor = Number(mode ==1 ? "100" : mode ==2 ? "052" : mode ==4 ? "027" :    mode ==0 ? "009" : "000");
    let premuse = String((premiumNumber*100)/factor);
    return premuse;
  }

  async detectCal(choosePlan : string, gender : string , mode :string ,age :string ,baseIncremeter: string ,calType : number ){
    let premiumTotalCal : any = "0";

    await this.calMainPremium(choosePlan, gender , mode ,age ,baseIncremeter ,calType).then(res => {
      premiumTotalCal = res;
      //console.log("detectCal premiumTotalCal >>> "+premiumTotalCal);     
    });


    if(choosePlan.startsWith("TR") || choosePlan.startsWith("TT"))
    {
      await this.TT(age,mode,gender,baseIncremeter,choosePlan).then(res => {
        premiumTotalCal = Number(premiumTotalCal)+ Number(res);
        //console.log("detectCal premiumTotalCal >>> "+premiumTotalCal);     
      });
    }
    


    await this.calDiscount(choosePlan,Number(baseIncremeter),premiumTotalCal,mode,baseIncremeter)
    .then(res => {
       //console.log("calDiscount premiumTotalCal >>> "+res);  
      premiumTotalCal = res;
    });
    // await this.checkPlanFee(Number(premiumTotalCal), choosePlan)
    // .then(res => {
    //   console.log("checkPlanFee premiumTotalCal >>> "+res);
    //   premiumTotalCal = res;
    // });
    let planfee = ["AJ", "AG01", "AH01", "AI01", "AM01"];
    if(planfee.indexOf(choosePlan) > -1){
      premiumTotalCal = String(Number(premiumTotalCal) + 3000);
    }

    //console.log("last premiumTotalCal >>> "+premiumTotalCal);  
    return premiumTotalCal;
  }
  private async calMainPremium(choosePlan : string, gender : string , mode :string ,age :string ,baseIncremeter: string ,calType : number ){
    let packages = [];
    //this.riderFooter = '0';
 
    let objM: PmrateM = new PmrateM();
    objM.plancode = choosePlan;//Require = Y
    objM.typex = gender;//Require = Y
    //alert(mode);
    objM.mode = mode;//Require = Y
    objM.insuredage = age;//Require = Y
    let objMs: Array<PmrateM> = [];
    objMs.push(objM);
  // alert(this.mode+"  "+this.typex+"  "+this.choosePlan+"  "+this.insuredage);
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PMRATE;
    reqM.serviceName = ServiceName.SELECT;
    reqM.agentid = "00770198";
    reqM.param = objMs;
    let premiumTotalCal= "0";

   await this.apiProvider.callData(reqM).then(
      (res) => {
//console.log(JSON.stringify(res));
        let result : any = res;
        if(result.size == 1){
          //alert(result.data[0].premium);
          //let sum : string =  this.premiumCal(baseIncremeter,result.data[0].premium);
          let sum : string;
          if(choosePlan.startsWith("TR") || choosePlan.startsWith("TT"))
            sum = this.premiumCalTR(baseIncremeter,result.data[0].premium);
          else
            sum = this.premiumCal(baseIncremeter,result.data[0].premium,choosePlan);

            //console.log("premiumcal==" + sum);
          premiumTotalCal = sum;
          return premiumTotalCal;
        }
       // debugger;
      },
      (err) => {
        console.log(err);
        return 0;
      }

    );
    
    //console.log("outcalDis_sub premiumTotal >>> "+premiumTotalCal); 
     return premiumTotalCal;
  }

  async calDiscount(choosePlan :string , sum : number , premiumDetailTotal : string , mode :string , baseIncremeter : string ){
    return await this.planService.getDiscount().then(scr => 
    {
      let result : Array<any> = scr;
      
        let data : Array<any> = result.filter((item,index)=>{
            return item.planCode === choosePlan;
        });
        if(data.length > 0){
//console.log("premiumCal  calDiscount data stringify >> "+JSON.stringify(data));
          let data2 : Array<any>  = data[0].interval.filter((item,index)=>{
//console.log("premiumCal  minSum=" + item.minSum +"  "+item.maxSum) ;
            if(item.mode.length > 0)
              return sum >= Number(item.minSum)  && sum <= Number(item.maxSum) && item.mode.indexOf(mode) > -1;
            else
              return sum >= Number(item.minSum)  && sum <= Number(item.maxSum)
          })
          if(data2.length > 0){
            let discount : number = Number(data2[0].discount);
            let result = this.discountPremium(sum,discount);
            return String(Number(premiumDetailTotal) - Number(result));
          }
          else{
            return String(Number(premiumDetailTotal));
          }
        }
        else
          return String(Number(premiumDetailTotal));
    })
  }



  async calWithRider(
    id: string = '',
    premium: number = this.premium,
    rider: any = this.rider,
    mode: number = this.mode,
    occupationType: string = this.occupationType,
    insuredage: string = this.insuredage,
    calType: number = this.calType, 
    typex: string = this.typex,
    planSelected: TLPlanModel = this.planSelected){
    //console.log((rider));

    console.log('premium', premium);
    console.log('rider', rider);
    console.log('mode', mode);
    console.log('occupationType', occupationType);
    console.log('insuredage', insuredage);
    console.log('calType', calType);
    console.log('typex', typex);
    console.log('planSelected', planSelected);

    if (
      typeof premium != 'undefined' && 
      typeof rider != 'undefined' && 
      typeof mode  != 'undefined' && 
      typeof occupationType != 'undefined' &&
      typeof insuredage != 'undefined' &&
      typeof calType != 'undefined' &&
      typeof typex != 'undefined' &&
      typeof planSelected != 'undefined'
    ) {

      console.log('>>>>>>>>>>>>>>>>>>> CAL <<<<<<<<<<<<<<<<<<<<<');
    
      //await this.detectCal();
      if( Object.keys(rider).length === 0  || calType == 0) {
      
        return premium;
      }

      let  riderLocal: any = rider;
      if( typeof(riderLocal[this.conf.rider('AC01')].sum) === 'undefined')
        return premium;

      let date = new Date();
      let currentMonth = String(date.getMonth() + 1).length == 1 ? "0"+String(date.getMonth() + 1) :String(date.getMonth() + 1);
      let currentYear = String(date.getFullYear() + 543);
      let currentDay = String(date.getDay()).length == 1 ? "0"+String(date.getDay()) : String(date.getDay());
      let payDate = currentYear+currentMonth+currentDay;

      if (id == '' || id == this.conf.rider('AC01')) {
        let ac01 =  await this.AC01(0,Number(mode),occupationType,riderLocal[this.conf.rider('AC01')].sum);
        rider[this.conf.rider('AC01')].premium = ac01;
        if (id != '')
          return ac01;
      }

      if (id == '' || id == this.conf.rider('AC02')) {
        let ac02 =  await this.AC02(0,Number(mode),occupationType,riderLocal[this.conf.rider('AC02')].sum);
        rider[this.conf.rider('AC02')].premium = ac02;
        if (id != '')
          return ac02;
      }

      if (id == '' || id == this.conf.rider('TAC01')) { 
        let tac01 =  await this.TAC01(0,Number(mode),occupationType,riderLocal[this.conf.rider('TAC01')].sum);
        rider[this.conf.rider('TAC01')].premium = tac01;
        if (id != '')
          return tac01;
      }

      if (id == '' || id == this.conf.rider('TAC02')) {
        let tac02 =  await this.TAC02(0,Number(mode),occupationType,riderLocal[this.conf.rider('TAC02')].sum);
        rider[this.conf.rider('TAC02')].premium = tac02;
        if (id != '')
          return tac02;
      }

      if (id == '' || id == this.conf.rider('AC03')) {
        let ac03 =  await this.AC03(0,Number(mode),occupationType,riderLocal[this.conf.rider('AC03')].sum);
        rider[this.conf.rider('AC03')].premium = ac03;
        if (id != '')
          return ac03;
      }

      if (id == '' || id == this.conf.rider('KG1')) {
        let kg1 =  await this.KG1(0,Number(mode),occupationType,riderLocal[this.conf.rider('KG1')].sum);
        rider[this.conf.rider('KG1')].premium = kg1;
        if (id != '')
          return kg1;
      }

      if (id == '' || id == this.conf.rider('KG2')) {
        let kg2 =  await this.KG2(0,Number(mode),occupationType,riderLocal[this.conf.rider('KG2')].sum,payDate);
        rider[this.conf.rider('KG2')].premium = kg2;
        if (id != '')
          return kg2;
      }

      if (id == '' || id == this.conf.rider('TKG1')) {
        let tkg1 =  await this.TKG1(0,Number(mode),occupationType,riderLocal[this.conf.rider('TKG1')].sum);
        rider[this.conf.rider('TKG1')].premium = tkg1;
        if (id != '')
          return tkg1;
      }

      if (id == '' || id == this.conf.rider('TKG2')) {
        let tkg2 =  await this.TKG2(0,Number(mode),occupationType,riderLocal[this.conf.rider('TKG2')].sum,payDate);
        rider[this.conf.rider('TKG2')].premium = tkg2;
        if (id != '')
          return tkg2;
      }

      if (id == '' || id == this.conf.rider('RP')) {
        let rp =  await this.RP(Number(insuredage),Number(mode),riderLocal[this.conf.rider('RP')].sum);
        rider[this.conf.rider('RP')].premium = rp;
        //console.log("ssss >>> "+rp);
        if (id != '')
          return rp;
      }

      if (id == '' || id == this.conf.rider('RPG')) {
        let rpg =  await this.RPG(Number(insuredage),Number(mode),occupationType,typex,riderLocal[this.conf.rider('RPG')].sum);
        rider[this.conf.rider('RPG')].premium = rpg;
        if (id != '')
          return rpg;
      }

      //alert(this.planSelected.endowmentType+"  "+this.planSelected.pEndowmentYear+"   "+String(Number(this.planSelected.pEndowmentYear) - Number(this.insuredage)));
      
      let endowmentYeartemp =  (planSelected.endowmentType === "0" ? planSelected.pEndowmentYear : String(Number(planSelected.pEndowmentYear) - Number(insuredage)));
      //alert(this.planSelected.payType +"  "+ this.planSelected.pPayYear+" "+String(Number(this.planSelected.pPayYear) - Number(this.insuredage)));
      let payYear = (planSelected.payType === "0" ? planSelected.pPayYear : String(Number(planSelected.pPayYear) - Number(insuredage)));
      //console.log(new Date().toLocaleDateString().split(',')[0]);
      //console.log(planSelected.pEndowmentYear +" endowmentYear  "+endowmentYeartemp+"  "+payYear); 

      let endowmentYear = await this.endowmentYear(Number(insuredage),endowmentYeartemp,payYear);

      if (id == '' || id == this.conf.rider('D01')) {
        let d01 =  await this.D01(Number(insuredage),endowmentYear,Number(mode),typex,riderLocal[this.conf.rider('D01')].sum);
        rider[this.conf.rider('D01')].premium = d01;
        if (id != '')
          return d01;
      }

      if (id == '' || id == this.conf.rider('D02')) {
        let d02 =  await this.D02(Number(insuredage),endowmentYear,Number(mode),typex,riderLocal[this.conf.rider('D02')].sum);
        rider[this.conf.rider('D02')].premium = d02;
        if (id != '')
          return d02;
      }

      if (id == '' || id == this.conf.rider('D03')) {
        let d03 =  await this.D03(Number(insuredage),Number(mode),typex,riderLocal[this.conf.rider('D03')].sum);
        rider[this.conf.rider('D03')].premium = d03;
        if (id != '')
          return d03;
      }

      if (id == '' || id == this.conf.rider('VP')) {
        let vp =  await this.VP34678(Number(insuredage),Number(mode),occupationType,typex,riderLocal[this.conf.rider('VP')].sum);
        rider[this.conf.rider('VP')].premium = vp;
        if (id != '')
          return vp;
      }

      // let vp4 =  await this.VP345678(Number(insuredage),Number(mode),occupationType,typex,riderLocal['VP4'].sum,"VP4");
      // rider['VP4'].premium = vp4;
      if (id == '' || id == this.conf.rider('VP5')) {
        let vp5 =  await this.VP5(Number(insuredage),Number(mode),occupationType,typex,riderLocal[this.conf.rider('VP5')].sum);
        rider[this.conf.rider('VP5')].premium = vp5;
        if (id != '')
          return vp5;
      }

      if (id == '' || id == this.conf.rider('v')) {
        let smartvip =  await this.SmartV(Number(insuredage),Number(mode),occupationType,typex,riderLocal[this.conf.rider('V')].sum);
        rider[this.conf.rider('V')].premium = smartvip;
        if (id != '')
          return smartvip;
      }

      if (id == '' || id == this.conf.rider('SR2')) {
        let sr2 =  await this.SR2(Number(insuredage),Number(mode),occupationType,typex,riderLocal[this.conf.rider('SR2')].sum);
        rider[this.conf.rider('SR2')].premium = sr2;
        if (id != '')
          return sr2;
      }

      if (id == '' || id == this.conf.rider('G')) {
        let g =  await this.G0(Number(insuredage),Number(mode),occupationType,typex,riderLocal[this.conf.rider('G')].sum);
        rider[this.conf.rider('G')].premium = g;
        if (id != '')
          return g;
      }

      if (id == '' || id == this.conf.rider('H')) {
        let h =  await this.H(Number(insuredage),Number(mode),occupationType,typex,riderLocal[this.conf.rider('H')].sum);
        rider[this.conf.rider('H')].premium = h;
        if (id != '')
          return h;
      }
      //{sum: 0, premium: 0, birth: "1988-01-10", age: 30, sex: "F"}
      //riderLocal['KB2'].age;
      //console.log(currentYear+" "+currentMonth +"  "+currentDay);
      if (id == '' || id == this.conf.rider('J0')) {
        let j0 = "0";
        j0 =  await this.J0(Number(insuredage),Number(mode),typex,riderLocal[this.conf.rider('J0')].sum);
        rider[this.conf.rider('J0')].premium = j0;
        if (id != '')
          return j0;
      }

      if (id == '' || id == this.conf.rider('JP')) {
        endowmentYear = await this.endowmentYearJP4(endowmentYeartemp);
        let jp4 =  await this.JP4(Number(insuredage),endowmentYear,Number(mode),typex,riderLocal[this.conf.rider('JP')].sum);
        rider[this.conf.rider('JP')].premium = jp4;
        if (id != '')
          return jp4;
      }
      
      if (id == '' || id == this.conf.rider('KB2')) {
        let kb2 = "0";
        endowmentYear = await this.endowmentYearKB(Number(insuredage),riderLocal[this.conf.rider('KB2')].age,payYear);
        kb2 =  await this.KB2(riderLocal[this.conf.rider('KB2')].age,endowmentYear,Number(mode),riderLocal[this.conf.rider('KB2')].sex,Number(premium));
        rider[this.conf.rider('KB2')].premium = kb2;
        if (id != '')
          return kb2;
      }

      //console.log("temp > "+endowmentYeartemp);

      if (id == '' || id == this.conf.rider('TH')) {
        let th =  await this.TH(Number(insuredage),occupationType,Number(mode),typex,riderLocal[this.conf.rider('TH')].sum,payDate);
        rider[this.conf.rider('TH')].premium = th;
        if (id != '')
          return th;
      }

      if (id == '' || id == this.conf.rider('TRP')) {
        let trp=  await this.TRP(Number(insuredage),occupationType,Number(mode),typex,riderLocal[this.conf.rider('TRP')].sum);
        rider[this.conf.rider('TRP')].premium = trp;
        let tt = "0";
        if (id != '')
          return trp;
      }
      
      //if(planSelected.planCode.startsWith("TR"))
      //  tt=  await this.TT((insuredage),(mode),typex,String(this.baseIncrementer),planSelected.planCode);
    
      //new Date().toLocaleDateString().split(',')[0];
      //this.premiumFooter = premium;
      /*************************************************** */
      //console.log("PremiumFooter_2 = "+this.premiumFooter);
      //this.broadcaster.broadcast('premiumFooter', this.premiumFooter);
      /**************************************************** */
      //riderFooter = String(Number(ac01)+Number(ac02)+Number(kg1)+Number(kg2)+Number(ac03)+Number(rp)+Number(rpg)+Number(d01)+Number(d02)+Number(d03)+Number(vp)+Number(vp5)+Number(smartvip)+Number(sr2)+Number(g)+Number(h)+Number(kb2)+Number(jp4));
      //console.log(premium+" ac01 > "+ac01 + " ac02 > " +ac02+" kg1 >"+kg1+" kg2 > "+kg2 + " ac03 > "+ac03+" rpg > "+rpg+" d01 > "+d01+" d02 > "+d02+" d03 > "+d03+" vp > "+vp+" vp5 > "+vp5+" V > "+smartvip+ " g > "+g+" h > "+h+"  kb2 > "+kb2+"  jp4 > "+jp4);
      //return String(Number(premium)+Number(ac01)+Number(ac02)+Number(kg1)+Number(kg2)+Number(ac03)+Number(rp)+Number(rpg)+Number(d01)+Number(d02)+Number(d03)+Number(vp)+Number(vp5)+Number(smartvip)+Number(sr2)+Number(g)+Number(h)+Number(kb2)+Number(jp4)+Number(tac01)+Number(tac02)+Number(tkg1)+Number(tkg2)+Number(th)+Number(trp)+Number(tt)+Number(j0));
      return;
    }
    else {
      return 0;
    }
  }


   getPayDate(){
    let date = new Date();
    let currentMonth = String(date.getMonth() + 1).length == 1 ? "0"+String(date.getMonth() + 1) :String(date.getMonth() + 1);
    let currentYear = String(date.getFullYear() + 543);
    let currentDay = String(date.getDay()).length == 1 ? "0"+String(date.getDay()) : String(date.getDay());
    let payDate = currentYear+currentMonth+currentDay;
    return payDate;
  }

  
}