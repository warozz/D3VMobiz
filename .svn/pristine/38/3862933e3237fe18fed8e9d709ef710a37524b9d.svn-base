import { ApplicationAnswerM } from './../service-table/applicationanswer-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { RequestModel } from '../model/request-model';
import { FormGroup } from '@angular/forms';
import { ServiceName } from '../constants/service-name';
import { FunctionName } from '../constants/function-name';
import { UlinkApplicationFormM } from '../ulink-app-data/ulink-application-form-model';
import { UlinkApplicationDetailM } from "./../ulink-app-data/ulink-application-detail-model";
import { UlinkLifePremium } from "./../ulink-appform-data/unitlink-premium-model";

import * as moment from 'moment';
import _ from "lodash";
import { AddressM } from '../service-table/address-model';

@Injectable()
export class UlinkAppformDataProvider {

  /**
   * แบบเเสดงผู้ถือหน่วยลงทุน
   */
  public appGeneralForSave: FormGroup;//แบบเเสดงผู้ถือหน่วยลงทุน Tab1
  public appGeneral: FormGroup;//แบบเเสดงผู้ถือหน่วยลงทุน Tab1
  public tab2Data: FormGroup;//แบบเเสดงผู้ถือหน่วยลงทุน Tab2
  public customerAppSign: FormGroup; //แบบเเสดงผู้ถือหน่วยลงทุน Tab3
  public applictationId:string;
  public unitlinkholder: Array<UlinkApplicationFormM>;
  public updateCustomerSign:boolean = false; //flag insert or save ใบคำร้องเกี่ยวกับเบี้ยเป็น table เก็บข้อมูลของพยานในหน้า ใบคำร้องเกี่ยวกับเบี้ย

  constructor(
    public http: HttpClient,
    private apiProvider: ApiProvider,) {
    console.log('Hello UlinkAppformDataProvider Provider');
  }

  private setApplicationAnswer():Array<ApplicationAnswerM> {
    let listApplicationAnswerM: Array<ApplicationAnswerM> = [];
    

    let dropdownEducate   = this.appGeneralForSave.get('dropdownEducate').value;// วุฒิการศึกษา 
    let salaryCheckbox    = this.appGeneralForSave.get('salaryCheckbox').value;//เงินเดือน | 1
    let savingCheckbox    = this.appGeneralForSave.get('savingCheckbox').value;//เงินออม | 2
    let bonusCheckbox     = this.appGeneralForSave.get('bonusCheckbox').value;//เงินปันผล/ดอกเบี้ย | 4
    let businessCheckbox  = this.appGeneralForSave.get('businessCheckbox').value;//ธุรกิจส่วนตัว | 5
    let propertyCheckbox  = this.appGeneralForSave.get('propertyCheckbox').value;//อสังหาริมทรัพย์ | 6
    let lagacyCheckbox    = this.appGeneralForSave.get('lagacyCheckbox').value;//มรดก | 3
    let otherCheckbox     = this.appGeneralForSave.get('otherCheckbox').value;// อื่นๆ| 7
    let otherDesc         = this.appGeneralForSave.get('otherDesc').value;
    let liability         = this.appGeneralForSave.get('liability').value;

    let citizenCheck      =  this.appGeneral.get('citizenCheck').value;
    let citizenid         =  this.appGeneral.get('citizenid').value;
    let expiredate        =  this.appGeneral.get('expiredate').value;
    let houseParticularsCheck = this.appGeneral.get('houseParticularsCheck').value;
    let passportCheck     = this.appGeneral.get('passportCheck').value;
    let passportValue     = this.appGeneral.get('passportValue').value;
    let otherDescCheck    = this.appGeneral.get('otherDescCheck').value;
    let otherDescValue    = this.appGeneral.get('otherDescValue').value;

    /**วุฒิการศึกษา */
    if( dropdownEducate != ''){
      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "100"; 
      applicationAnswerM.text1  = this.appGeneralForSave.get('dropdownEducate').value;
      applicationAnswerM.answeryn = "Y";
      listApplicationAnswerM.push(applicationAnswerM);
    }

    /**เเหล่งที่มาของเงิน */
    if(salaryCheckbox || savingCheckbox || bonusCheckbox || businessCheckbox || propertyCheckbox || lagacyCheckbox || otherCheckbox){//

      let stringAnswer:Array<string> = [];

      if(salaryCheckbox) stringAnswer.push("1");
      if(savingCheckbox) stringAnswer.push("2");
      if(lagacyCheckbox) stringAnswer.push("3");
      if(bonusCheckbox) stringAnswer.push("4");
      if(businessCheckbox) stringAnswer.push("5");
      if(propertyCheckbox) stringAnswer.push("6");
      if(otherCheckbox) stringAnswer.push("7");

      let txt = "";
      for(let i=0;i<stringAnswer.length;i++){
        if(i == 0){
          txt += stringAnswer[i];
        }else{
          txt += ', ' + stringAnswer[i];
        }
      }
      console.log("txt1 : ",txt);

      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "102"; 
      applicationAnswerM.text1  = txt;
      applicationAnswerM.answerdesc = otherCheckbox ? otherDesc : '';
      applicationAnswerM.answeryn = "Y";
      listApplicationAnswerM.push(applicationAnswerM);

    }
    /**ภาระทางการเงินต่อปี */
    if(liability != ''){
      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "103"; 
      applicationAnswerM.text1  = liability;
      applicationAnswerM.answeryn = "Y";
      listApplicationAnswerM.push(applicationAnswerM);
    }


    /**สำเนาบัตรประชาชน */
    if( citizenCheck ) {
      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "109"; 
      applicationAnswerM.answerdesc  = citizenid; // ค่าของเลขบัตรที่กรอกมาจากหน้าจอ
      applicationAnswerM.text1  = expiredate; // ค่าของวันหมดอายุที่กรอกจากหน้าจอ
      applicationAnswerM.answeryn = "Y";
      listApplicationAnswerM.push(applicationAnswerM);
    }
    /**สำเนาทะเบียนบ้าน */
    if( houseParticularsCheck ) {
      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "110"; 
      applicationAnswerM.answeryn = "Y";
      listApplicationAnswerM.push(applicationAnswerM);
    }

    /**สำเนาหนังสือเดินทาง */
    if( passportCheck ) {
      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "111"; 
      applicationAnswerM.answeryn = "Y";
      applicationAnswerM.answerdesc  = passportValue; // ค่าของเลขหนังสือเดินทางจากหน้าจอ 
      listApplicationAnswerM.push(applicationAnswerM);
    }
    /**อื่นๆ */
    if( otherDescCheck ) {
      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "112"; 
      applicationAnswerM.answeryn = "Y";
      applicationAnswerM.answerdesc  = otherDescValue; // ค่าของเลขหนังสือเดินทางจากหน้าจอ 
      listApplicationAnswerM.push(applicationAnswerM);
    }

    /**วัตถุประสงค์การลงทุน */
    let question14_1 = this.tab2Data.get('question14_1').value;
    let question14_2 = this.tab2Data.get('question14_2').value;
    let question14_3 = this.tab2Data.get('question14_3').value;
    let question14_4 = this.tab2Data.get('question14_4').value; 
    let question14_4_desc = this.tab2Data.get('question14_4_desc').value;
    if(question14_1 || question14_2 || question14_3 || question14_4){

      let stringAnswer:Array<string> = [];

      if(question14_1) stringAnswer.push("1");
      if(question14_2) stringAnswer.push("2");
      if(question14_3) stringAnswer.push("3");
      if(question14_4) stringAnswer.push("4");

      let txt = "";
      for(let i=0;i<stringAnswer.length;i++){
        if(i == 0){
          txt += stringAnswer[i];
        }else{
          txt += ', ' + stringAnswer[i];
        }
      }
      console.log("txt1 : ",txt);

      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "104"; 
      applicationAnswerM.text1  = txt;
      applicationAnswerM.answerdesc = question14_4_desc ? question14_4_desc : '';
      applicationAnswerM.answeryn = "Y";
      listApplicationAnswerM.push(applicationAnswerM);

    } 

    /**มูลค่าทรัพย์สินสุทธิโดยประมาณ */
    let question15 = this.tab2Data.get('question15').value;
    let applicationAnswerM15:ApplicationAnswerM = new ApplicationAnswerM();
    applicationAnswerM15.applicationid = this.applictationId;
    applicationAnswerM15.questionid  = "105"; 
    applicationAnswerM15.text1  = '';
    applicationAnswerM15.answerdesc = question15 ? question15 : '';
    applicationAnswerM15.answeryn = "Y";
    listApplicationAnswerM.push(applicationAnswerM15);

    /**จำนวนเงินที่คาดว่าจะลงทุน */
    let question16 = this.tab2Data.get('question16').value;
    let applicationAnswerM16:ApplicationAnswerM = new ApplicationAnswerM();
    applicationAnswerM16.applicationid = this.applictationId;
    applicationAnswerM16.questionid  = "106"; 
    applicationAnswerM16.text1  = String(question16);
    applicationAnswerM16.answerdesc = '';
    applicationAnswerM16.answeryn = "Y";
    listApplicationAnswerM.push(applicationAnswerM16);

    /**ประสบการณ์ลงทุน */
    let question17_1 = this.tab2Data.get('question17_1').value;
    let question17_2 = this.tab2Data.get('question17_2').value;
    let question17_3 = this.tab2Data.get('question17_3').value;
    let question17_4 = this.tab2Data.get('question17_4').value; 
    let question17_5 = this.tab2Data.get('question17_5').value;
    let question17_6 = this.tab2Data.get('question17_6').value; 
    let question17_6_desc = this.tab2Data.get('question17_6_desc').value;
    if(question17_1 || question17_2 || question17_3 || question17_4|| question17_5 || question17_6){

      let stringAnswer:Array<string> = [];

      if(question17_1) stringAnswer.push("1");
      if(question17_2) stringAnswer.push("2");
      if(question17_3) stringAnswer.push("3");
      if(question17_4) stringAnswer.push("4");
      if(question17_5) stringAnswer.push("5");
      if(question17_6) stringAnswer.push("6");

      let txt = "";
      for(let i=0;i<stringAnswer.length;i++){
        if(i == 0){
          txt += stringAnswer[i];
        }else{
          txt += ', ' + stringAnswer[i];
        }
      }
      console.log("txt1 : ",txt);

      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "107"; 
      applicationAnswerM.text1  = txt;
      applicationAnswerM.answerdesc = question17_6_desc ? question17_6_desc : '';
      applicationAnswerM.answeryn = "Y";
      listApplicationAnswerM.push(applicationAnswerM);

    }
    
    /**กองทุนรวมที่สนใจ */
    let question18_1 = this.tab2Data.get('question18_1').value;
    let question18_2 = this.tab2Data.get('question18_2').value;
    let question18_3 = this.tab2Data.get('question18_3').value;
    let question18_4 = this.tab2Data.get('question18_4').value; 
    let question18_5 = this.tab2Data.get('question18_5').value;
    let question18_6 = this.tab2Data.get('question18_6').value; 
    let question18_6_desc = this.tab2Data.get('question18_6_desc').value;
    if(question18_1 || question18_2 || question18_3 || question18_4 || question18_5 || question18_6){

      let stringAnswer:Array<string> = [];

      if(question18_1) stringAnswer.push("1");
      if(question18_2) stringAnswer.push("2");
      if(question18_3) stringAnswer.push("3");
      if(question18_4) stringAnswer.push("4");
      if(question18_5) stringAnswer.push("5");
      if(question18_6) stringAnswer.push("6");

      let txt = "";
      for(let i=0;i<stringAnswer.length;i++){
        if(i == 0){
          txt += stringAnswer[i];
        }else{
          txt += ', ' + stringAnswer[i];
        }
      }
      console.log("txt1 : ",txt);

      let applicationAnswerM:ApplicationAnswerM = new ApplicationAnswerM();
      applicationAnswerM.applicationid = this.applictationId;
      applicationAnswerM.questionid  = "108"; 
      applicationAnswerM.text1  = txt;
      applicationAnswerM.answerdesc = question18_6_desc ? question18_6_desc : '';
      applicationAnswerM.answeryn = "Y";
      listApplicationAnswerM.push(applicationAnswerM);

    }

    console.log("listApplicationAnswerM ===> ",listApplicationAnswerM);

    return listApplicationAnswerM;
  }

  public async saveAnswer(){

    return new Promise(async (resolve, reject) => {

      //let date: string = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      
      let reqModel: RequestModel = new RequestModel();
      reqModel.serviceName = ServiceName.INSERT;
      reqModel.functionName = FunctionName.APPLICATIONANSWER;
      reqModel.param = this.setApplicationAnswer();

      await this.apiProvider.callData(reqModel).then(
        (res) => {
        console.log("response  ---> ",res);
        if(res['data'].length > 0){

            //this.examBenefit.benefitid = res['data'][0]['benefitid'];
        }
            resolve();
        },
        (err) => {

            console.log(err);
            reject(err);
        }
      );
    });
  }

/**
 * เช็คว่าจ่ายจ่ายเเบบไหน
 */
  public getTextMode(mode: string): string{
    if(mode == '1'){
      return "รายปี";
    } else if('2'){
      return "ราย 6 เดือน";
    } else if('4'){
      return "ราย 3 เดือน";
    } else if('0'){
      return "รายเดือน";
    } else if('1'){
      return "ชำระเบี้ยครั้งเดียว";
    }

    return "";
  }

  /**
   * ใบคำร้องเกี่ยวกับเบี้ยเป็น table เก็บข้อมูลของพยานในหน้า ใบคำร้องเกี่ยวกับเบี้ย
   */
  public insertUlinkLifePremium(model: UlinkLifePremium){
    return new Promise(async (resolve, reject) => {

      let objLifePremium: Array<UlinkLifePremium> = [];
      objLifePremium.push(model);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.UNITLINK_LIFEPREMIUM;
      reqM.serviceName = this.updateCustomerSign?ServiceName.UPDATE:ServiceName.INSERT;
      reqM.param = objLifePremium;
     
      await this.apiProvider.callData(reqM).then(
        (res) => {
          console.log("After UlinkLifePremium response Log : "+JSON.stringify(res));
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

 /**
   * ใบคำร้องเกี่ยวกับเบี้ยเป็น table เก็บข้อมูลของพยานในหน้า ใบคำร้องเกี่ยวกับเบี้ย
   */
  public getUlinkLifePremium(appId: string){
    return new Promise(async (resolve, reject) => {

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.UNITLINK_LIFEPREMIUM;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = [{applicationid : appId}];
     
      await this.apiProvider.callData(reqM).then(
        (res) => {
          console.log("After select  UlinkLifePremium response Log: "+JSON.stringify(res));
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  
  /**
   * Ulink application detail
   */
  public insertUlinkAppDetail(model: UlinkApplicationDetailM)
  {
    return new Promise(async (resolve, reject) => {
      let request: RequestModel = new RequestModel();
      request = {
        ...request,
        serviceName: ServiceName.INSERT,
        functionName: FunctionName.ULINKAPPLICATIONDETAIL,
        param: [model]
      };

      await this.apiProvider.callData(request).then(
        (res) => {
          resolve(_.get(res, 'data', new UlinkApplicationDetailM()));
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public updateUlinkAppDetail(model: UlinkApplicationDetailM)
  {
    return new Promise(async (resolve, reject) => {
      let request: RequestModel = new RequestModel();
      request = {
        ...request,
        serviceName: ServiceName.INSERT,
        functionName: FunctionName.ULINKAPPLICATIONDETAIL,
        param: [model]
      };

      await this.apiProvider.callData(request).then(
        (res) => {
          console.log('updateUlinkAppDetail res', res)
          resolve(_.get(res, 'data', new UlinkApplicationDetailM()));
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public saveAddressControllingPerson(model: AddressM){
    return new Promise(async (resolve, reject) => {

      let objAddresss: Array<AddressM> = [];
      objAddresss.push(model);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.ADDRESS;
      reqM.serviceName = ServiceName.INSERT;
      reqM.searchkey = 'ULINK_CONTROLLING';
      reqM.param = objAddresss;
      //console.log("Before Address insert log : "+JSON.stringify(reqM));
      await this.apiProvider.callData(reqM).then(
        (res) => {
          console.log("After Address response Log : "+JSON.stringify(res));
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public getAddressControllingPerson(appId: string)
  {
    return new Promise(async (resolve, reject) => {

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.ADDRESS;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = 'ULINK_CONTROLLING';
      reqM.param = [{applicationid : appId}];
     
      await this.apiProvider.callData(reqM).then(
        (res) => {
          console.log("After select controlling person Address response Log : "+JSON.stringify(res));
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

}
