import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { rppCalculate } from './rpp-calculate';

@Injectable()
export class UnitlinkPremiumCalculateProvider {
  public jsonRpp: any;

  constructor() { 
    this.jsonRpp = rppCalculate;
  }

    /**
     * คำนวณค่าตำ่สุด RPP & RSP
     * @param payType แบบชำระเบี้ย
     */
    public getMinByPayType(payType: string): number{
      let min: number = 0;
      if( payType == '0' ) { // รายเดือน
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

    /**
    * เช็คค่า RPP นำมาเทียบรายปี
    * @param rppInsurancePremium เบี้ย RPP
    * @param payType แบบชำระเบี้ย
    */
   public premiumPerYear(rppInsurancePremium: number, payType: string) : number {
    let rppInsurancePremiumCompairOneYear = 0;
    if( payType == '0' ) { // รายเดือน
      rppInsurancePremiumCompairOneYear = rppInsurancePremium * 12;
    } else if ( payType  == '4' )  {//ราย 3 เดือน
      rppInsurancePremiumCompairOneYear = rppInsurancePremium * 4;

    } else if( payType == '2' ) { // ราย 6 เดือน
      rppInsurancePremiumCompairOneYear = rppInsurancePremium * 2;

    } else if ( payType  == '1' )  { // รายปี
      rppInsurancePremiumCompairOneYear = rppInsurancePremium;
    }
    console.log("rppInsurancePremiumCompairOneYear--->",rppInsurancePremiumCompairOneYear);
    return rppInsurancePremiumCompairOneYear;
  }

  /**
  * จำนวนเงินเอาประกันภัยเบี้ยประกันภัยหลักเพื่อความคุ้มครอง ขั้นต่ำ RPP โดยจะเท่าขึ้นกับอายุ
  * @param age อายุผู้มุ่งหวัง
  * @param rppInsurancePremium เบี้ย RPP
  */
  public getMinByAge(age: number , rppInsurancePremium: number ) : number { //เริ่มต้น 5 เท่า ของ RPP
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
  * จำนวนเงินเอาประกันภัยเบี้ยประกันภัยหลักเพื่อความคุ้มครอง สูงสุด RPP โดยจะเท่าขึ้นกับอายุและเพศ
  * @param age อายุของผู้มุ่งหวัง
  * @param rppInsurancePremium เบี้ย RPP
  * @param gender เพศของผู้มุ่งหวัง
  */
  public getMaxByAgeAndGender(age: number, rppInsurancePremium: number, gender: string) : number { //เริ่มต้น 5 เท่า ของ RPP
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

  /**
   * ค่าสูงสุดเบี้ย RPP
   * @param age อายุของผู้มุ่งหวัง
   * @param gender เพศของผู้มุ่งหวัง
   * @param payType แบบการชำระเบี้ย
   */
  public getMaxRpp(age: number, gender: string, payType: string): number{
    const limit = 999999999;
    let maxRpp = 0;
    let compare = 0;

    if( payType == '0' ) { // รายเดือน
      compare = Math.round(limit/12);
    } else if ( payType  == '4' )  {//ราย 3 เดือน
      compare = Math.round(limit/4);
    } else if( payType == '2' ) { // ราย 6 เดือน
      compare = Math.round(limit/2);
    } else if ( payType  == '1' )  { // รายปี
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

  /**
   * ค่าสูงสุดเบี้ย RSP
   * @param value ค่าที่ส่งเข้ามา
   */
  public getMaxRsp(value: number): number{
    let max = value*5;
    return max;
  }
}