import { TLPlanModel } from "../tlplan/tlplan-model";

/**
 * class สำหรับคำนวณค่าต่างๆ ของ tab มูลค่า
 */
export class QuatationValueCal {

  constructor() { }

  /**
   * เงินค่าเวนคืนกรมธรรม์
   */
  public getYear(plancode : string, listExtend : Array<any>
    , tlplan : TLPlanModel, age : number) : string[]
  {
    let arr1 : string[] = [];
    for(let i = 0; i < listExtend.length; i++){
      arr1[i] = listExtend[i].year;
    }
    this.set_arr1(plancode, tlplan, age, arr1);
    return arr1;
  }
  private set_arr1(plancode : string, tlplan : TLPlanModel
    , age : number, arr1 : string[])
  {
    let step : number = this.getStep(plancode, tlplan);
    let lastLoop : number = arr1.length-1;

    if(step == 5){
      let pPayYear : number = parseInt(tlplan.pPayYear, 10);
      let num : number = this.getNum(step, pPayYear, age);
      for(let i = lastLoop ; i >= 0 ; i--){
        if(i > num-1){
        }
        else{ // romove index
          arr1.splice(i, 1);
        }
      }
    }
  }
  public getPolicyReturn(plancode : string, quatationSum : number
    , listExtend : Array<any>, tlplan : TLPlanModel, age : number) : string[]
  {
    let arr2 : string[] = this.create_arr2(plancode, quatationSum, listExtend);
    this.set_arr2(plancode, tlplan, age, arr2);
    return arr2;
  }
  private create_arr2(plancode : string, quatationSum : number, listExtend : Array<any>) : string[]{
    
    let arr2 : string[] = [];
    let unitsum = this.calPlanUnitsum(plancode, quatationSum);
    
    let lastLoop : number = listExtend.length -1;

    for(let i = 0; i < listExtend.length; i++){
      let isNotLastLoop : boolean = i < lastLoop;
      let num2 = this.cal_arr2(plancode, listExtend[i].cashvalue, unitsum, isNotLastLoop);
      arr2[i] = num2 == 0 ? '-' : ''+num2;
    }
    return arr2;
  }
  private cal_arr2(plancode : string, cashvalue : number, unitsum : number
    , isNotLastLoop : boolean) : number
  {
    let num : number = 0;
    if(cashvalue > 0){
      if(!isNotLastLoop){
        let code : string = plancode.substring(0,2);
        if(code == "AK")
          num = Math.round((cashvalue + 1200) * unitsum);
        else if(code == "AG" || code == "AH" || code == "AI" || code == "AJ")
          num = Math.round((cashvalue + 1000)* unitsum);
        else if(code == "AM" || code == "AN" || code == "AL" || code == "AP" || code == "AQ" || code == "AR")
          num = Math.round((cashvalue + 1500)* unitsum);
        else
          num = Math.round(cashvalue * unitsum);
      }
      else{
        num = Math.round(cashvalue * unitsum);
      }
    }
    return num;
  }
  private set_arr2(plancode : string, tlplan : TLPlanModel
    , age : number, arr2 : string[])
  {
    let step : number = this.getStep(plancode, tlplan);
    let lastLoop : number = arr2.length-1;

    if(step == 1){
      arr2[lastLoop] = '-';
    }
    else if(step == 2){
      arr2[lastLoop] = '-';
    }
    else if(step == 3){
      ; // do nothing
    }
    else if(step == 4){
      ; // do nothing
    }
    else if(step == 5){
      let pPayYear : number = parseInt(tlplan.pPayYear, 10);
      let num : number = this.getNum(step, pPayYear, age);
      for(let i = arr2.length-1 ; i >= 0 ; i--){
        if(i > num-1){
          if(i == lastLoop){
            arr2[i] = '0';
          }
        }
        else{ // romove index
          arr2.splice(i, 1);
        }
      }
    }
    else if(step == 6){
      arr2[lastLoop] = '-';
    }
    else{ // romove index
      arr2[lastLoop] = '-';
    }
  }
  private getStep(plancode : string, tlplan : TLPlanModel) : number
  {
    // let pPayYear : number = parseInt(tlplan.pPayYear, 10);
    let payType : number = parseInt(tlplan.payType, 10);
    let arrayTLplan38 : string = tlplan.pensionAge;
    let step : number = 0;

    if(payType == 0 && arrayTLplan38 == '00' && plancode != 'AJ' && !this.isShowLastYear(plancode)  && !this.isPlanTR(plancode)){
      step = 1;
    }
    else if(plancode == 'AD' || plancode == 'SQ'){
      step = 2;
    }
    else if((arrayTLplan38 != "00" || plancode == 'AJ' || plancode == 'AE' || this.isShowLastYear(plancode)   )
      && plancode != 'AC' && !this.isBumNan(plancode)){
      step = 3;
    }
    else if(this.isBumNan(plancode)){
      step = 4;
    }
    else if(this.isPlanTR(plancode)){
      step = 5;
    }
    else if(this.isPlanMatured(plancode)){
      step = 6;
    }
    return step;
  }
  private getNum(step : number, pPayYear : number, age : number) : number
  {
    let num : number = 0;
    if(step == 1){
      num = pPayYear - 1;
    }
    else if(step == 2){
      num = pPayYear - age - 1;
    }
    else if(step == 3){
      num = pPayYear - age - 1;
    }
    else if(step == 4){
      num = age > pPayYear ? pPayYear : pPayYear - age;
    }
    else if(step == 5){
      num = pPayYear-1;
    }
    else if(step == 6){
      num = pPayYear - age - 1
    }
    else{ // step == 0
    }
    return num;
  }
  
  public setQuotationValueTable(plancode : string, tlplan : TLPlanModel
    , age : number, arr3 : string[]
    , arr4 : string[], arr5 : string[], arr6 : string[], arr7 : string[]) : void
  {
    let pPayYear : number = parseInt(tlplan.pPayYear, 10);
    let step : number = this.getStep(plancode, tlplan);
    let num : number = this.getNum(step, pPayYear, age);

    let length : number = arr3.length;
    let text_replace = this.isIslam(plancode) ? '' : '-';
    if(step == 1){
      for(let i = 0; i < length; i++){
        if(i >= num){
          this.setSubDetail2(i, text_replace, arr3, arr4, arr5, arr6, arr7);
        }
      }
    }
    else if(step == 2){
      for(let i = 0; i < length; i++){
        if(i >= num){
          this.setSubDetail2(i, text_replace, arr3, arr4, arr5, arr6, arr7);
        }
      }
    }
    else if(step == 3){
      for(let i = 0; i < length; i++){
        if(i >= num){
          this.setSubDetail2(i, text_replace, arr3, arr4, arr5, arr6, arr7);
        }
      }
    }
    else if(step == 4){
      let nn : number = num-1;
      for(let i = 0; i < length; i++){
        if(i >= nn){
          this.setSubDetail2(i, text_replace, arr3, arr4, arr5, arr6, arr7);
        }
      }
    }
    else if(step == 5){
      for(let i = length-1 ; i >= 0 ; i--){
        if(i > num-1){
          this.setSubDetail2(i, text_replace, arr3, arr4, arr5, arr6, arr7);
        }
        else{ // romove index
          arr3.splice(i, 1);
          arr4.splice(i, 1);
          arr5.splice(i, 1);
          arr6.splice(i, 1);
          arr7.splice(i, 1);
        }
      }
    }
    else if(step == 6){
      for(let i = 0; i < length; i++){
        if(i >= num){
          this.setSubDetail2(i, text_replace, arr3, arr4, arr5, arr6, arr7);
        }
      }
    }
    else{ // step == 0
      let lastLoop : number = length-1;
      this.setSubDetail2(lastLoop, text_replace, arr3, arr4, arr5, arr6, arr7);
    }
  }
  private setSubDetail2(i: number, text : string, arr3 : string[], arr4 : string[]
    , arr5 : string[], arr6 : string[], arr7 : string[]) : void{
      arr3[i] = text;
      arr4[i] = text;
      arr5[i] = text;
      arr6[i] = text;
      arr7[i] = text;
  }
  
  public calPlanUnitsum(plancode : string, quatationSum: number) : number{
    let unitsum : number = quatationSum / 10000.0;
    if(this.isPlanTR(plancode))
      unitsum = unitsum / 10.0;
    return unitsum;
  }
  public calRaiderD03Unitsum(plancode : string, quatationSum: number, sumD03 : number, arrayTLplan34 : string) : number{
    let unitsum : number = 0;
    if (arrayTLplan34 == "1")
      unitsum =  sumD03 / 10000.0;	
    else if (arrayTLplan34 == "2" || arrayTLplan34 == "3")
      unitsum = quatationSum / 10000.0;
    return unitsum;
  }
  public isBumNan(plancode : string) : boolean{
    let isBumNan = ["AG","AH","AI","AM","AK"];
    if(plancode != undefined || plancode != null){
      let code : string = plancode.substring(0,2);
      for(let i = 0; i < isBumNan.length; i++){
        if(isBumNan[i] == code){
          return true;
        }
      }
    }
    return false;
  }

  public isShowLastYear(plancode : string) : boolean{
    let isLY = ["AS","AT"];
    if(plancode != undefined || plancode != null){
      let code : string = plancode.substring(0,2);
      for(let i = 0; i < isLY.length; i++){
        if(isLY[i] == code){
          return true;
        }
      }
    }
    return false;
  } 


  public isPlanTR(plancode : string) : boolean{
    if(plancode != undefined || plancode != null){
      let code : string = plancode.substring(0,2);
      if(plancode.length == 4 && code == 'TT'){
        return true;
      }
      else if(plancode.length == 4 && code == 'TR'){
        return true;
      }
    }
    return false;
  }
  public isPlanMatured(plancode : string) : boolean{
    let isPlanMatured = ["WX","WY","WV"];
    if(plancode != undefined || plancode != null){
      let code : string = plancode.substring(0,2);
      for(let i = 0; i < isPlanMatured.length; i++){
        if(isPlanMatured[i] == code){
          return true;
        }
      }
    }
    return false;
  }
  public isIslam(plancode : string) : boolean{
    let isIslam = ["NC","ND","NC01","ND01","WU","EN08","EN09"];
    if(plancode != undefined || plancode != null){
      for(let i = 0; i < isIslam.length; i++){
        if(isIslam[i] == plancode){
          return true;
        }
      }
    }
    return false;
  }
}