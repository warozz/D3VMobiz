import { UnitlinkBenefitUA02 } from './unitlink-benefit-UA02';
import { UnitlinkBenefitUA01 } from './unitlink-benefit-UA01';
import { UnitlinkUtility } from './unitlink-utility';
import { PremiumCalProvider } from '../utility/premium-cal';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';


@Injectable()
export class UnitlinkBenefit {

  constructor(private premCal: PremiumCalProvider){
  }

  /**
   * 
   * @param plancode UA01
   * @param insureAge อายุผู้เอาประกัน 
   * @param insureAgeEnd อายุผู้เอาประกัน ที่สิ้นสุดความคุ้มครอง
   * @param sex M, F 
   * @param mode prem 1:Y 0=M 2=H 4=S
   * @param tax ภาษีอะไรสักอย่าง น่าจะเป็น rate ภาษี
   * @param quotationSum ทุนประกัน
   * @param quotationPremium เบี้ยประกันหลัก
   * @param topupPremium การชำระเบี้ยเพิ่มพิเศษ (Top-Up Premium)
   * @param arrtop เป็น object ที่เก็บข้อมูลของ array ของ 'Top-Up' 
   * @param arrwd เป็น object เก็บข้อมูลของ 'การถอน'
   * @param arrpro เป็น object เก็บข้อมูลของ array ของ 'ผลตอบแทน'
   * @param inflationrate อัตราเงินเฟ้อ tab การถอน
   */
  public getBenefitTableUA01(
    plancode : string, 
    insureAge : number,
    insureAgeEnd : number,
    sex : string, 
    mode : string,
    tax : number,
    quotationSum : number,
    quotationPremium : number,
    topupPremium : number,
    arrtop : object[],
    arrwd : object[],
    arrpro : object[],
    inflationrate : number
  ) : String[][]{
    let func : UnitlinkUtility = new UnitlinkUtility();
    let ua01 : UnitlinkBenefitUA01 = new UnitlinkBenefitUA01(func);
    let testA1 = this.setDataUA01(
      plancode,
      insureAge,
      insureAgeEnd,
      quotationSum,
      quotationPremium,
      topupPremium,
      arrtop,
      arrwd,
      arrpro,
      inflationrate
    );
    console.log(JSON.stringify(testA1));
    return ua01.preloadUA01(testA1, insureAge, sex, mode, insureAgeEnd, tax);
  }

  public getAvUA01(
    plancode : string, 
    insureAge : number,
    insureAgeEnd : number,
    sex : string, 
    mode : string,
    tax : number,
    quotationSum : number,
    quotationPremium : number,
    topupPremium : number,
    arrtop : object[],
    arrwd : object[],
    arrpro : object[],
    inflationrate : number,
    testSeek: number
  ) : string{
    let func : UnitlinkUtility = new UnitlinkUtility();
    let ua01 : UnitlinkBenefitUA01 = new UnitlinkBenefitUA01(func);
    let testA1 = this.setDataUA01(
      plancode,
      insureAge,
      insureAgeEnd,
      quotationSum,
      quotationPremium,
      topupPremium,
      arrtop,
      arrwd,
      arrpro,
      inflationrate
    );
    console.log(JSON.stringify(testA1));
    return ua01.CalculateAvUA01(testA1, insureAge, sex, mode, insureAgeEnd, tax, testSeek);
  }
  /**
   * 
   * @param plancode UA02
   * @param mode รูปแบบการจ่าย Ex รายปี, รายเดือน, ...
   * @param insureAge อายุผู้เอาประกัน 
   * @param lastAgePay อายุสุดท้ายที่จ่ายเบี้ย
   * @param insureAgeEnd อายุผู้เอาประกัน ที่สิ้นสุดความคุ้มครอง
   * @param tax ภาษีอะไรสักอย่าง น่าจะเป็น rate ภาษี
   * @param totalRiderPremium เบี้ย rider รวม
   * @param arrrpp จำนวนเงินเอาประกันภัย (RPP)
   * @param arrpay คาดว่าจะชำระเบี้ยประกันภัย
   * @param arrwd เป็น object เก็บข้อมูลของ 'การถอน'
   * @param arrpro เป็น object เก็บข้อมูลของ array ของ 'ผลตอบแทน'
   * @param testEm เป็น "0", "25", "50", "75"
   * @param testEp ไม่มี ใส่ 0
   * @param testEpYear ไม่มี ใส่ 0
   * @param inflationrate อัตราเงินเฟ้อ tab การถอน
   * @param calRiderModel model สำหรับคำนวน premium rider
   */
  public getBenefitTableUA02(
    plancode : string, 
    sex : string, 
    mode : number,
    insureAge : number,
    lastAgePay : number,
    insureAgeEnd : number,
    tax : number,
    totalRiderPremium : number,
    arrrpp : object[],
    arrpay : object[],
    arrwd : object[],
    arrpro : object[],
    testEm : number,
    testEp : number,
    testEpYear : number,
    inflationrate : number,
    calRiderModel : object
  ) : String[][]{
    let func : UnitlinkUtility = new UnitlinkUtility();
    let ua02 : UnitlinkBenefitUA02 = new UnitlinkBenefitUA02(func);
    let test = this.setDataUA02(
      plancode,
      mode,
      insureAge,
      lastAgePay,
      insureAgeEnd,
      totalRiderPremium,
      arrrpp,
      arrpay,
      arrwd,
      arrpro,
      inflationrate,
      calRiderModel
    );
    console.log('UA02 : '+JSON.stringify(test));
    return ua02.preload(test, insureAge, sex, mode, insureAgeEnd, tax, testEm, testEp, testEpYear);
  }

  public getAvUA02(
    plancode : string, 
    sex : string, 
    mode : number,
    insureAge : number,
    lastAgePay : number,
    insureAgeEnd : number,
    tax : number,
    totalRiderPremium : number,
    arrrpp : object[],
    arrpay : object[],
    arrwd : object[],
    arrpro : object[],
    testEm : number,
    testEp : number,
    testEpYear : number,
    inflationrate : number,
    calRiderModel : object,
    testSeek : number
  ) : string{
    let func : UnitlinkUtility = new UnitlinkUtility();
    let ua02 : UnitlinkBenefitUA02 = new UnitlinkBenefitUA02(func);
    let test = this.setDataUA02(
      plancode,
      mode,
      insureAge,
      lastAgePay,
      insureAgeEnd,
      totalRiderPremium,
      arrrpp,
      arrpay,
      arrwd,
      arrpro,
      inflationrate,
      calRiderModel
    );
    console.log('UA02 : '+JSON.stringify(test));
    return ua02.CalculateAvUA02(test, insureAge, sex, mode, insureAgeEnd, tax, testEm, testEp, testEpYear, testSeek);
  }
  
  /**
   * 
   * @param insureAge อายุผู้เอาประกัน
   * @param endownmentYear ระยะเวลาคุ้มครองของกรมธรรม์ 
   * @param quotationSum ทุนประกัน
   * @param quotationPremium เบี้ยประกันหลัก
   * @param topupPremium การชำระเบี้ยเพิ่มพิเศษ (Top-Up Premium)
   * @param arrtop เป็น object ที่เก็บข้อมูลของ array ของ Top-Up จากหน้าจอ 
   * @param arrwd เป็น object เก็บข้อมูลของ 'การถอน'
   * @param arrpro เป็น object เก็บข้อมูลของ array ของ 'ผลตอบแทน'
   * @param inflationrate อัตราเงินเฟ้อ tab การถอน
   */
  private setDataUA01(
    plancode : string,
    insureAge : number,
    endownmentYear : number,
    quotationSum : number,
    quotationPremium : number,
    topupPremium : number,
    arrtop : object[],
    arrwd : object[],
    arrpro : object[],
    inflationrate : number
  ) : number[][]{
    
    // gb_exam_arrtop[key] = [idx,chkHave("toptypepay"+idx).value,chkHave("topage"+idx).value,chkHave("topageto"+idx).value
    // ,clearFormat(chkHave("topsum"+idx).value)];    
    let minage_infla : number = 99;
    const testage : number = insureAge;
    
    let testA1 : number[][] = [];
    let x : number = 0;
    
    if(plancode == "UA01"){
      for(let i=testage; i<=endownmentYear; i++){
        testA1[x] = [];
        testA1[x][0] = testage+x;
        testA1[x][1] = x+1;
        testA1[x][2] = quotationSum;
        testA1[x][3] = 0;
        testA1[x][4] = (x == 0) ? quotationPremium : 0;
        testA1[x][5] = 0;

        // set Topup
        // if(x == 0){
        //   testA1[x][6] = topupPremium;
        // }else{
        //   if(arrtop != undefined){

        //     const toptypepay : string[] = arrtop['toptypepay'];//1
        //     const topage : number[] = arrtop['topage'];//2
        //     const topageto : number[] = arrtop['topageto'];//3
        //     const topsum : number[] = arrtop['topsum'];//4
        //     var chktop = true;
        //     for(var j=0; j< toptypepay.length; j++){
        //       // if(toptypepay[j] == "O"){
        //         if(topage[j] != NaN && (topageto[j] == undefined || topageto[j] == NaN)){
        //           if((testage+x) == topage[j]){
        //             testA1[x][6] = topsum[j];
        //             chktop = false;
        //           }
        //         }
        //       // }else if(toptypepay[j] == "M"){
        //         if(topage[j] != NaN && topageto[j] != NaN){
        //           if((testage+x) >= topage[j] && (testage+x) <= topageto[j]){
        //             console.log('loop ['+i+'] ===> '+(testage+x)+'toptypepay : '+JSON.stringify(toptypepay));
        //             testA1[x][6] = topsum[j];
        //             chktop = false;
        //           }
        //         }
        //       // }
        //     }
        //     if(chktop){
        //       testA1[x][6] = 0;
        //     }
        //   }else{
        //     testA1[x][6] = 0;
        //   }
        // }

        //topup
        if(x == 0){
					testA1[x][6] = topupPremium//formatInt(sess_exam_topprem);;
				}else{
					if(arrtop.length > 0){
						var chktop = true;
						for(var j=0; j<arrtop.length; j++){
							if(arrtop[j][1] == "2"){
								if(this.chkValue(arrtop[j][2])){
									if(this.formatInt(testage+x) == this.formatInt(arrtop[j][2])){
										testA1[x][6] = this.formatInt(this.clearFormat(arrtop[j][4]));
										chktop = false;
									}
								}
							}else if(arrtop[j][1] == "1"){
								if(this.chkValue(arrtop[j][2]) && this.chkValue(arrtop[j][3])){
									if(this.formatInt(testage+x) >= this.formatInt(arrtop[j][2]) && this.formatInt(testage+x) <= this.formatInt(arrtop[j][3])){
										testA1[x][6] = this.formatInt(this.clearFormat(arrtop[j][4]));
										chktop = false;
									}
								}
							}
						}
						if(chktop){
							testA1[x][6] = 0;
						}
					}else{
						testA1[x][6] = 0;
					}
				}

        // rider
        testA1[x][7] = 0;
        
        //withdraw
        minage_infla = this.setArrWithdraw(x, testA1, arrwd, testage, inflationrate, minage_infla);

        //profit
        this.setArrProfit(x, testA1, arrpro, testage);

        x++;
        // ไม่รู้อะไร
        // if(i == endownmentYear){
        //   //console.log(JSON.stringify(testA1));
        //   tempDataUA01( function(finaldata){
        //     if(chkValue(finaldata) && (finaldata != "NaN") && gb_exam_arrwd.length > 0){
              
              
        //       setTimeout(function()
        //         {
        //         if(!$('#bachelor').hasClass('in') && !$('#master').hasClass('in'))
        //         {
        //           $('#exam_sale_fund').val('');
        //           }
        //         else 
        //         {
        //           chkHave("exam_sale_fund").value = numFormat(finaldata);
        //         }
        //       },100);
              
        //       chkHave("exam_sale_fund_rd").value = numFormat(finaldata);

              
        //     }else{
        //       chkHave("exam_sale_fund").value = 0;
        //       chkHave("exam_sale_fund_rd").value = 0;
        //     }
        //     chkHave("btshowtable").disabled = gb_show_tbl;
        //   }) ;
        // }
      }
    }
    return testA1;
  }
  /**
   * @param plancode
   * @param mode รูปแบบการจ่าย Ex รายปี, รายเดือน, ...
   * @param insureAge อายุผู้เอาประกัน
   * @param lastAgePay อายุสุดท้ายที่จ่ายเบี้ย
   * @param endownmentYear ระยะเวลาคุ้มครองของกรมธรรม์ 
   * @param totalRiderPremium เบี้ย rider รวม
   * @param arrrpp จำนวนเงินเอาประกันภัย (RPP)
   * @param arrpay คาดว่าจะชำระเบี้ยประกันภัย
   * @param arrwd เป็น object เก็บข้อมูลของ 'การถอน'
   * @param arrpro เป็น object เก็บข้อมูลของ array ของ 'ผลตอบแทน'
   * @param inflationrate อัตราเงินเฟ้อ tab การถอน
   * @param calRiderModel model สำหรับคำนวน premium rider 
   */
  private setDataUA02(
    plancode : string,
    mode : number,
    insureAge : number,
    lastAgePay : number,
    endownmentYear : number,
    totalRiderPremium : number,
    arrrpp : object[],
    arrpay : object[],
    arrwd : object[],
    arrpro : object[],
    inflationrate : number,
    calRiderModel : object
    ) : number[][]
  {
    console.log('setDataUA02 ===> start')
    let test : number[][] = [];
    let x : number = 0;
    let minage_infla : number = 99;
    const testage = insureAge;
    let tmpLastRSP : number = 0 ;


    let rider = calRiderModel['rider'];
    let planSelected = calRiderModel['planSelected'];

    if(plancode == "UA02"){
      for(let i : number = testage; i <= endownmentYear; i++){

        test[x] = [];
        test[x][0] = testage+x;
        test[x][1] = x+1;

        // gb_exam_arrrpp[key] = [idx,chkHave("ageRPP"+idx).value,clearFormat(chkHave("exam_RPPSum"+idx).value)
        // ,clearFormat(chkHave("minSumRPP"+idx).value),clearFormat(chkHave("maxSumRPP"+idx).value)
        // ,chkHave("ageChildRPP"+idx).value];	
        // if(arrrpp != undefined){
        //   const ageRPP : number[] = arrrpp['ageRPP'];// อายุ
        //   const exam_RPPSum : number[] = arrrpp['exam_RPPSum']; // ทุน อะไรสักอย่าง
        //   for(let j : number = 0; j < ageRPP.length; j++){
        //     if((testage+x) >= ageRPP[j]){
        //       test[x][2] = exam_RPPSum[j];
        //     }
        //   }
        // }
        // else{
        //   test[x][2] = 0;
        // }
        if(arrrpp.length > 0){
          for(var j=0; j<arrrpp.length; j++){
            if(this.formatInt(testage+x) >= this.formatInt(arrrpp[j][1])){
              test[x][2] = this.formatInt(this.clearFormat(arrrpp[j][2]));
            }
          }
        } else{
          test[x][2] = 0;
        }
        
        

        // gb_exam_arrpay[key] = [idx,chkHave("ageStrPay"+idx).value,clearFormat(chkHave("exam_RPPPrem"+idx).value)
        // ,clearFormat(chkHave("exam_RSPPrem"+idx).value),clearFormat(chkHave("topPay"+idx).value)
        // ,clearFormat(chkHave("allPay"+idx).value)];	
        // if(arrpay != undefined){
        //   const ageStrPay : number[] = arrpay['ageStrPay']; // อายุเริ่ม
        //   const exam_RSPPrem : number[] = arrpay['exam_RSPPrem'];// เบี้ย RSP
        //   const exam_RPPPrem : number[] = arrpay['exam_RSPPrem'];// เบี้ย RPP
        //   const topPay : number[] = arrpay['exam_RSPPrem'];// เบี้ย top-up
        //   for(var j=0; j<ageStrPay.length; j++){
        //     if((testage+x) >= ageStrPay[j]){
        //       test[x][3] = exam_RSPPrem[j] * 5 * (mode == 0 ? 12 : mode);
        //       if ( test[x][3] != 0 )
        //         tmpLastRSP = test[x][3] ;
        
        //       if ( tmpLastRSP != 0)
        //       {
        //         test[x][3] = tmpLastRSP;
        //       }	
        //       if((testage+x) <= lastAgePay){
        //         test[x][4] = exam_RPPPrem[j];
        //         test[x][5] = exam_RSPPrem[j];
        //         test[x][6] = topPay[j];
        //       }else{
        //         test[x][4] = 0;
        //         test[x][5] = 0;
        //         test[x][6] = 0;
        //       }
        //     }
        //   }
        // }
        // else{
        //   test[x][3] = 0;
        //   test[x][4] = 0;
        //   test[x][5] = 0;
        //   test[x][6] = 0;
        // }


        if(arrpay.length>0){
          for(var j=0; j< arrpay.length; j++){
            if(this.formatInt(testage+x) >= this.formatInt(arrpay[j][1])){
              test[x][3] = this.formatInt(this.clearFormat(arrpay[j][3])) * 5 * ((mode == 0) ? 12 : mode);
              if ( test[x][3] != 0 )
                tmpLastRSP = test[x][3] ;
                // console.log("ก่อนเปลี่ยนค่า     j==" + j + "  x==" + x +"    gb_exam_arrpay ==" + arrpay[j][3]
                // + "     test[x][3] ==" + test[x][3]
                // + "     tmpLastRSP ==" + tmpLastRSP );					
              if ( tmpLastRSP != 0)
              {
                test[x][3] = tmpLastRSP;
              }	
              
              // console.log("หลังเปลี่ยนค่า     j==" + j + "  x==" + x +"    gb_exam_arrpay ==" + arrpay[j][3]
              // + "     test[x][3] ==" + test[x][3]
              // + "     tmpLastRSP ==" + tmpLastRSP );
  
              if(this.formatInt(testage+x) <= this.formatInt(lastAgePay)){
                test[x][4] = this.formatInt(this.clearFormat(arrpay[j][2]));
                test[x][5] = this.formatInt(this.clearFormat(arrpay[j][3]));
                test[x][6] = this.formatInt(this.clearFormat(arrpay[j][4]));
              }else{
                test[x][4] = 0;
                test[x][5] = 0;
                test[x][6] = 0;
              }
            }
          }
        }else{
          test[x][3] = 0;
          test[x][4] = 0;
          test[x][5] = 0;
          test[x][6] = 0;
        }
      

        let premiumRider = 0;
        // ***** ต้องไปหาว่า ตรงนี้นะ ต้องมีค่าเท่าไหร่
        //test[x][7] = totalRiderPremium;//quotationPremium+topupPremium+totalRiderPremium
        if(typeof rider !='undefined'){
          let riderM = this.bestCopyEver(rider);
          console.log('riderM-->', riderM);
          this.premCal.calWithRider('', calRiderModel['premium'], riderM, calRiderModel['mode'], calRiderModel['occupationType'], String(i), calRiderModel['calType'], calRiderModel['typex'], planSelected);
          
          // ไม่เอา คบ.2 เนื่องจาก unitlink ไม่รวม kb2 ต้องนำเบี้ยที่คำนวณได้ออก
          //riderM.KB2.premium = '0';
          for (let item in riderM) {
            if (typeof riderM[item].premium != 'undefined' && riderM[item].premium != 'undefined')
            premiumRider += Number(riderM[item].premium);
          }
        }
        
        //console.log('riderM : ', riderM);
        //console.log('premiumRider : ', premiumRider);
        test[x][7] = premiumRider;




        minage_infla = this.setArrWithdraw(x, test, arrwd, testage, inflationrate, minage_infla);
        this.setArrProfit(x, test, arrpro, testage);
        x++;
      }
    }
    return test;
  }

  private bestCopyEver(src) {
    return Object.assign({}, src);
  }

 
  /**
   * @see function สำหรับ set ค่า array 'การถอน' ลงใน object arrTest
   * @param x index from main function
   * @param arrTest array on main function
   * @param arrwd เป็น object เก็บข้อมูลของ array ของ 'การถอน'
   * @param insureAge insureAge อายุผู้เอาประกัน
   * @param inflationrate อัตราเงินเฟ้อ tab การถอน 
   * @param minage_infla ไม่รู้ว่าคือค่าอะไร
   */
  private setArrWithdraw(
    x : number, 
    arrTest : number[][], 
    arrwd : object[], 
    insureAge : number,
    inflationrate : number,
    minage_infla : number,
  ){
  
    const testage : number = insureAge;
    // if(arrwd != undefined){
    //   let chkwd : boolean = true;
    //   if(arrwd['bachelorwd'] != undefined){
    //     if(arrwd['bachlor_agestr_wd'] != undefined && arrwd['bachlor_agestp_wd'] != undefined){
    //       if((testage+x) >= Number(arrwd['bachlor_agestr_wd']) && (testage+x) <= Number(arrwd['bachlor_agestp_wd'])){
    //         // if((testage+x) == Number(arrwd['bachlor_agestr_wd'])){
    //           if(minage_infla > Number(arrwd['bachlor_agestr_wd'])){
    //             minage_infla = Number(arrwd['bachlor_agestr_wd']);
    //           }
    //           console.log('x : '+x);
    //           arrTest[x][8] = Number(arrwd['bachelorwd']) * Math.pow(1 + (Number(arrwd['child_inflation']) / 100) , ((testage+x) - minage_infla));
    //           chkwd = false;
    //         }
    //       // }
    //     }
    //   }
    //   if(arrwd['masterwd'] != undefined){
    //     if(arrwd['master_agestr_wd'] != undefined && arrwd['master_agestp_wd'] != undefined){
    //       if((testage+x) >= Number(arrwd['master_agestr_wd']) && (testage+x) <= Number(arrwd['master_agestp_wd'])){
    //         // if((testage+x) == Number(arrwd['master_agestr_wd'])){
    //           if(minage_infla > Number(arrwd['master_agestr_wd'])){
    //             minage_infla = Number(arrwd['master_agestr_wd']);
    //           }
    //           arrTest[x][8] = Number(arrwd['masterwd']) * Math.pow(1 + (Number(arrwd['child_inflation']) / 100) , ((testage+x) - minage_infla));
    //           chkwd = false;
    //         }
    //       // }
    //     }
    //   }
    //   if(chkwd){
    //     arrTest[x][8] = 0;
    //   }
    // }
    // else{
    //   arrTest[x][8] = 0;
    // }



    //sessionStorage.setItem('sess_exam_inflation', "<?php echo $inflation ?>");//เงินเพ้อ
    //gb_exam_arrwd[key] = [idx,type,sum,agestr,agestp,seg,polstr,childstr,polstp,childstp];
    //ประเภทการถอน  ระบบเก่า O = ครั้งเดียว , M = ประจำ   |   ระบบใหม่  2 = ครั้งเดียว , 1 = ประจำ
    if(arrwd.length > 0){
      var chkwd = true;
      for(var j=0; j<arrwd.length; j++){
        if(arrwd[j][1] == "2"){
          if(this.chkValue(arrwd[j][3])){
            if(this.formatInt(testage+x) == this.formatInt(arrwd[j][3])){
              arrTest[x][8] = this.formatInt(this.clearFormat(arrwd[j][2]));
              chkwd = false;
            }
          }
        }else if(arrwd[j][1] == "1"){
          if(this.chkValue(arrwd[j][3]) && this.chkValue(arrwd[j][4])){
            if(this.formatInt(testage+x) >= this.formatInt(arrwd[j][3]) && this.formatInt(testage+x) <= this.formatInt(arrwd[j][4])){
              if(((this.formatInt(testage+x) - this.formatInt(arrwd[j][3])) % this.formatInt(arrwd[j][5])) == 0){
                if(minage_infla > this.formatInt(arrwd[j][3])){
                  minage_infla = this.formatInt(arrwd[j][3]);
                }
                arrTest[x][8] = this.formatInt(this.clearFormat(arrwd[j][2])) * Math.pow(1 + (this.formatInt(inflationrate) / 100) , (this.formatInt(testage+x) - minage_infla));
                chkwd = false;
              }
            }
          }
        }
      }
      if(chkwd){
        arrTest[x][8] = 0;
      }
    }else{
      arrTest[x][8] = 0;
    }

    return minage_infla;
  }
  /**
   * @see function สำหรับ set ค่า array 'ผลตอบแทน' ลงใน object arrTest
   * @param x index from main function
   * @param arrTest array on main function
   * @param arrpro เป็น object เก็บข้อมูลของ array ของ 'ผลตอบแทน'
   * @param insureAge อายุผู้เอาประกัน
   */
  private setArrProfit(
    x : number, 
    arrTest : number[][], 
    arrpro : object[], 
    insureAge : number
  ){
    // gb_exam_arrpro[key] = [idx,chkHave("profitage"+idx).value,chkHave("profitper"+idx).value,chkHave("profitchild"+idx).value];    
    // if(arrpro != undefined){
    //   const profitage = arrpro['profitage']; //อายุผู้เอาประกัน
    //   const profitper = arrpro['profitper']; //อัตราผลตอบแทน
    //   // const profitchild = arrpro['profitchild']; //

    //   let chkpro : boolean = true;
    //   for(var j=0; j< profitage.length; j++){
    //     if(profitage[j] != undefined){
    //       if((insureAge+x) >= Number(profitage[j])){
    //         arrTest[x][9] = Number(profitper[j]) / 100;
    //         chkpro = false;
    //       }
    //     }
    //   }
    //   if(chkpro){
    //     arrTest[x][9] = 0;
    //   }
    // }else{
    //   arrTest[x][9] = 0;
    // }

    //Profit
    if(arrpro.length > 0){
      var chkpro = true;
      for(var j=0; j<arrpro.length; j++){
        if(this.chkValue(arrpro[j][1])){
          if(this.formatInt(insureAge+x) >= this.formatInt(arrpro[j][1])){
            arrTest[x][9] = this.formatInt(this.clearFormat(arrpro[j][2])) / 100;
            chkpro = false;
          }
        }
      }
      if(chkpro){
        arrTest[x][9] = 0;
      }
    }else{
      arrTest[x][9] = 0;
    }
  }
  // private getRiderSum(rider: object, ridercode : string) : string{
  //   if(rider == undefined){
  //     return "0";
  //   }
  //   let tmp : object = rider[this.conf.rider(ridercode)];
  //   if(tmp == undefined){
  //     return "0";
  //   }
  //   if(tmp['sum'] == undefined){
  //     return "0";
  //   }
  //   return tmp['sum'];
  // }


  public chkValue(val){
    try{
      if (typeof val === 'string') {
        val = val.trim();
      }
      if((val == "") || (val == null) || (val == "-") || (val == "0")){
        return false;
      }
      return true;
    }catch(e){
      console.log("chkValue",e);
    }
  }

  public formatInt(a){
    try{
      if (typeof a === 'string') {
          a = a.trim();
      }
      if(a == '' || a == null){
        return 0;
      }
      if(isNaN(a)){
        return a;
      }
        var b = a*1;
        return b;
    }catch(e){
      console.log("formatInt",e);
    }
  }

  public clearFormat(number){
    try{
      if (typeof number === 'string') {
        number = number.trim();
      }
      if(number == null || number == '' || number == '-'){
            return '0';
        }
      var ans = "";
      number = number + "";
      var arr  = number.split(',');
      for(let i=0 ; i < arr.length; i++){
        ans = ans + arr[i];
      }
      return ans;
    }catch(e){
      console.log("clearFormat",e);
    }
  }
}