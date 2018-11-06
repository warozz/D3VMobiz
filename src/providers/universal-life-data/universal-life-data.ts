import { QuotationModel } from './../quotation/quotation-model';
import { ApiProvider } from './../api/api';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { ProspectModel } from '../prospect/prospect-model';
import { QuotationRiderM } from '../quotationrider/quotationrider-model';
import * as moment from 'moment';
import { RequestModel } from '../model/request-model';
import { FunctionName } from '../constants/function-name';
import { ServiceName } from '../constants/service-name';
import { ResponseModel } from '../model/response-model';
import { ProspectProvider } from '../prospect/prospect';

@Injectable()
export class UniversalLifeDataProvider {

  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  public prospect : ProspectModel;

  /**
   * แบบประกัน
   * 
   * '' = default
   *  
   * UZA = universal life 10/1
   *  
   * UEA = universal life 10/10
   *  
   * UWA = universal life 90/90
   * 
   */
  public insuranceType: string = '';  //plancode
  public insuranceName: string = '';  //planname
  public payyear: string = '';  //ปีที่จ่าย
  public paytype: string = '';  //ประเภทการจ่าย
  public edownyear: string = '';  //ปีที่คุ้มครอง
  public edowntype: string = '';  //ประเภทการคุ้มครอง


  /**
   * เบี้ยประกันภัยหลัก
   */
  public mainInsurance : number = 0;
  /**
   * เบี้ยประกันภัยรวม
   */
  public insuranceSum : number = 0;
  /**
   * ทุนประกัน
   */
  public insurance:number = 0;
/**
   * สัญญาเพิ่มเติมรวม
   */
  public riderInsuranceSum:number = 0;

  /**
   * type เบี้ยประกันภัยส่วนออกเพิ่ม
   * 
   * default = 99
   * 
   * ไม่ซื้อ = N
   * 
   * ครั้งเดียวตอนออกกรมธรรม์ = 1
   * 
   * ตามงวดการชำระเบี้ยประกันหลัก = Y
   */
  public topupType: string = '99';

  /**
   * เบี้ยประกันภัยส่วนออกเพิ่ม
   */
  public topup: number = 0;

  /**
   * ชำระเบี้ย
   * 
   * 99 = default
   * 
   * 1 or 9 = ครั้งเดียว 
   * 
   * 1 = รายปี
   * 
   * 2 = ราย 6 เดือน
   * 
   * 4 = ราย 3 เดือน
   * 
   * 0 = รายเดือน
   */
  public paymentType: number = 0;

  /**
   * สัญญาเพิ่มเติม
   */
  public rider: any = [];


  private agentid: string;
  public quotationul: QuotationModel;
  
  public editData: boolean = false;

  public resetDataUl: boolean = false;


  constructor(private alertCtrl: AlertDirective,private storage : Storage,private apiProvider : ApiProvider, private prospectProvider: ProspectProvider ) {}

  public async saveData() {

    console.log("saveData ==   typeof(this.quotationul)==" + typeof(this.quotationul));
    if(this.validateData()){
      if(typeof(this.quotationul) === "undefined" ){ 
        let bsave :boolean = await this.insertProcess();
        if(bsave) {
          this.alertCtrl.warning('บันทึกสำเร็จ');
        }
      }
      else{
        if (this.quotationul.status == 'N') //สถานะ N คือเคยบันทึกไปแล้ว เป็นอัพเดตใบเสนอขาย
        {
          try{
            await this.alertCtrl.confiemBoxSaveQuation('คุณต้องการบันทึกซ้ำใบเสนอขายใบเดิมใช่หรือไม่');
            let bsave :boolean = await this.updateProcess();
            if(bsave) {
              this.alertCtrl.warning('แก้ไขข้อมูลเรียบร้อย');
            } 
          } catch(e) {
            if(e !== 'cancel') return;
            let bsave :boolean = await this.insertProcess();
            if(bsave) {
              this.alertCtrl.warning('บันทึกสำเร็จ');
            }
          }
        }
        else if(this.quotationul.status == 'R'){ //สถานะ R คือREF แล้ว ไม่สามารถอัพเดตใบเสนอขายได้ ต้องinsertใหม่อย่างเดียว
          try{
            await this.alertCtrl.confirm('คุณต้องการบันทึกใบเสนอขายใบใหม่ใช่หรือไม่');
            let bsave :boolean = await this.insertProcess();
            if(bsave) {
              this.alertCtrl.warning('บันทึกสำเร็จ');
            }
          } catch(e) {
            //this.alertCtrl.error(e);
          }
        }
      }
      
    }
   

  }

  public async saveDataFromPDFPage() {
    if(typeof(this.quotationul) === "undefined" ){ 
      let bsave :boolean = await this.insertProcess();
     
    }
    else{
      if (this.quotationul.status == 'N') //สถานะ N คือเคยบันทึกไปแล้ว เป็นอัพเดตใบเสนอขาย
      {
        try{
          let bsave :boolean = await this.updateProcess();
         
        } catch(e) {
          console.log(e);
          
          let bsave :boolean = await this.insertProcess();
          
        }
      }
      else if(this.quotationul.status == 'R'){ //สถานะ R คือREF แล้ว ไม่สามารถอัพเดตใบเสนอขายได้ ต้องinsertใหม่อย่างเดียว
        try{
         
          let bsave :boolean = await this.insertProcess();
         
        } catch(e) {
          console.log(e);
          //do nothing
        }
      }
    }
  }

  private async updateProcess(){
    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");
    let agentid = "";
    await this.storage.get('loginProfile').then(profile =>{
      agentid = profile.agentid;
    });
    try{

      //check prospect form service
      let prospectFormService: any;
      this.prospectProvider.duplicateFlag = false;
      await this.prospectProvider.checkProspectFormService(this.prospect).then(
        (res) => {
          console.log('this.prospect After Check form service 1 --->', res);
          prospectFormService = res;
        },
        (error) => {
          return;
        } 
      );

      if(typeof prospectFormService == 'undefined'){
        return;
      }
      if(prospectFormService['success'] == false){
        return;
      }

      //Update prospect
      let bsave : boolean = true;
      // await this.updateProspect(agentid , dateNow , dateNowNo).then(
      //   (res) => {bsave = res}
      // );
      console.log('update prospect');
      await this.prospectProvider.updateProspect(agentid , dateNow , dateNowNo, this.prospect, false).then(
        (res) => {bsave = res
          console.log('prospect after update--->', this.prospect);
        }
      );
      if(bsave){
        //Update QUotation
        let quotationno : string = this.quotationul.quotationno;//Require = Y
        let customerid : string = this.prospect.customerID;//Require = Y
        await this.updateQuotation(agentid, dateNow, dateNowNo, quotationno, customerid).then(
          (res) => {bsave = res}
        );

        //Delete Rider
        if(bsave){
          await this.updateQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid).then(
            (res) => {bsave = res}
          );
        }
      }
      return bsave;
    } catch(e) {
      this.alertCtrl.error(e);
      return false;
    }
    
  }
  private async insertProcess(){
    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");
    let agentid = "";
    await this.storage.get('loginProfile').then(profile =>{
      agentid = profile.agentid;
    });
    try{
      //check prospect form service
      let prospectFormService: any;
      this.prospectProvider.duplicateFlag = false;
      await this.prospectProvider.checkProspectFormService(this.prospect).then(
        (res) => {
          console.log('this.prospect After Check form service 1 --->', res);
          prospectFormService = res;
        },
        (error) => {
          return;
        } 
      );

      if(typeof prospectFormService == 'undefined'){
        return;
      }
      if(prospectFormService['success'] == false){
        return;
      }
      this.prospect.customerID = prospectFormService['prospect']['customerID'];
      console.log('this.prospect After Check form service 2 -->',this.prospect);

      let isInsertProspect : boolean = this.prospect.customerID == undefined 
      let bsave : boolean = true;
      if(isInsertProspect)
      { 
        //console.log("insert prospect");
        // await this.insertProspect(agentid , dateNow , dateNowNo).then(
        //   (res) => {bsave = res}
        // );
        await this.prospectProvider.insertProspect(agentid , dateNow , dateNowNo, this.prospect, false).then(
          (res) => {bsave = res
            console.log('prospect after insert--->', this.prospect);
          }
        );
      } else {
        //console.log("update prospect");
        // await this.updateProspect(agentid , dateNow , dateNowNo).then(
        //   (res) => {bsave = res}
        // );
        await this.prospectProvider.updateProspect(agentid , dateNow , dateNowNo, this.prospect, false).then(
          (res) => {bsave = res
            console.log('prospect after update--->', this.prospect);
          }
        );
      }
      if(bsave){
        let customerid : string = this.prospect.customerID;//Require = Y
        let quotationno : string = agentid+this.insuranceType+dateNowNo;//Require = Y
        //Quotation
        await this.insertQuotation(agentid, dateNow, dateNowNo, quotationno, customerid).then(
          (res) => {bsave = res}
        );
        //QuotationRider
        if(bsave){
          await this.insertQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid).then(
            (res) => {bsave = res}
          );
        }
      }      
      return bsave;
    } catch(e) {
      this.alertCtrl.error(e);
      return false;
    }
   
  }

  private async insertQuotation(agentid : string, dateNow : string, dateNowNo : string,
                                quotationno : string, customerid : string){
    this.setQuotationForSave(agentid, dateNow, dateNowNo, quotationno, customerid);

    let objMs: Array<QuotationModel> = [];
    objMs.push(this.quotationul);
    console.log("insert quotation : " + JSON.stringify(objMs));

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.INSERT;
    reqM.param = objMs;

    return await this.apiProvider.callData(reqM).then(
      (res) => {
        //this.quotationul = objM;
         console.log("insert quotation : " + JSON.stringify(res));
         return true;
      },
      (err) => {
        this.alertCtrl.error(err);
        console.log("error insert quotation : "+ JSON.stringify(err));
        return false;
      }
    );
  }
  private async insertQuotationRiderM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){
    
    let objMQRs: Array<QuotationRiderM> = this.setRiderForSave(agentid, dateNow, dateNowNo,quotationno,customerid);

    if(objMQRs.length > 0)
    {
      let reqMQR: RequestModel = new RequestModel();
      reqMQR.functionName = FunctionName.QUOTATIONRIDER;
      reqMQR.serviceName = ServiceName.INSERT;
      reqMQR.param = objMQRs;

      return await this.apiProvider.callData(reqMQR).then(
        (res) => {
          //console.log("insert QuotationRider : " + JSON.stringify(res));
          return true;
        },
        (err) => {
          this.alertCtrl.error(err);
          console.log(err);
          return false;
        }
      );
    }
    else{
      return true;
    }
  }

  private async updateQuotation(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){
    
    this.setQuotationForSave(agentid, dateNow, dateNowNo, quotationno, customerid);

    let objMs: Array<QuotationModel> = [];
    objMs.push(this.quotationul);
    console.log("update quotation : " + JSON.stringify(objMs));    

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.UPDATE;
    reqM.param = objMs;

    return await this.apiProvider.callData(reqM).then(
      (res) => {
        console.log("UPDATE quotation : " + JSON.stringify(res));
        return true;
      },
      (err) => {
        this.alertCtrl.error(err);
        console.log(err);
        return false;
      }
    );
  }
  private async updateQuotationRiderM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){
    
    let objMQRDs: Array<QuotationRiderM> = [];
    let objMQRD: QuotationRiderM = new QuotationRiderM();

    objMQRD.quotationno = quotationno;//Require = Y
    objMQRD.customerid = customerid;//Require = Y
    objMQRD.agentid = agentid;
    objMQRDs.push(objMQRD);

    let reqMQR: RequestModel = new RequestModel();
    reqMQR.functionName = FunctionName.QUOTATIONRIDER;
    reqMQR.serviceName = ServiceName.DELETE;
    reqMQR.param = objMQRDs;

    return await this.apiProvider.callData(reqMQR).then(
      async (res) => {
        return await this.insertQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid)
      },
      (err) => {
        this.alertCtrl.error(err);
        console.log(err);
        return false;
      }
    );
  }
  

  public validateData(): boolean {

    if(this.insuranceType == '' ) {
      this.alertCtrl.warning('กรุณาเลือกแบบประกัน');
      return false;
    }else if(this.mainInsurance == 0){
      this.alertCtrl.warning('กรุณาระบุเบี้ยประกันภัยหลัก');
      return false;
    }else if(this.insuranceType != 'UZA' &&  this.paymentType == 99) {
      this.alertCtrl.warning('กรุณาเลือกชำระเบี้ย');
      return false;
     }else if(this.insuranceType != 'UZA'  && this.insurance == 0){
      this.alertCtrl.warning('กรุณาระบุทุนประกัน');
      return false;
    }else if(this.insuranceType != 'UZA'  && this.topupType == '99'){
      this.alertCtrl.warning('กรุณาระบุประเภทการชำระเบี้ยประกันส่วนออมเพิ่มเติม');
      return false;
     }else if(this.insuranceType != 'UZA'  && (this.topupType == 'Y' || this.topupType == '1') && this.topup == 0) {
      this.alertCtrl.warning('กรุณาระบุเบี้ยประกันภัยส่วนออมเพิ่ม');
      return false;
     }
  return true;
}

 

  public resetData() {
    this.mainInsurance = 0;
    this.insuranceSum = 0;
    this.topup = 0;

    this.topupType = '99';
    this.insurance = 0;

    this.rider = [];
    this.riderInsuranceSum = 0;

  }


  async setQuotationForSave(agentid : string, dateNow : string, dateNowNo : string
                             , quotationno : string, customerid : string)
 {
    this.quotationul = new QuotationModel();

    this.quotationul.agentid = agentid;
    this.quotationul.customerid =customerid;
    this.quotationul.quotationno =quotationno;

    
    this.quotationul.birthdate =this.prospect.birthDate+" 00:00:00";
    this.quotationul.branch ="";//เป็นว่าง
    this.quotationul.pname=this.prospect.preName;
    this.quotationul.fname =this.prospect.firstName;
    this.quotationul.lname =this.prospect.lastName;
    this.quotationul.gender =this.prospect.gender;
    this.quotationul.insureage =this.prospect.age;

    this.quotationul.mode =String(this.paymentType);
    this.quotationul.lifepremium =String(this.mainInsurance);//เบี้ยชีวิต
    this.quotationul.lifesum =String(this.insurance);//ทุนชีวิต
    this.quotationul.topuppremium =String(this.topup);//เบี้ยtopup
    this.quotationul.topuptype =this.topupType; // Y 1 N
    this.quotationul.totalpremium =String(this.insuranceSum);//เบี้ยรวม
    this.quotationul.savingsum="";//ทุนRSP
    this.quotationul.savingpremium="";//เบี้ยRSP


    console.log("this.insuranceName=="+ this.insuranceName);
    this.quotationul.plancode =this.insuranceType;//plancode
    this.quotationul.planname = this.insuranceName;//planname

    if(typeof(this.rider['occupation']) !== 'undefined' ){
      this.quotationul.occ = this.rider['occupation']['occ'];
      this.quotationul.occgroup = this.rider['occupation']['occGroup'];
    }
    this.quotationul.occupationtype =this.prospect.occupationType;
    this.quotationul.soldier ="";//เป็นว่าง

    this.quotationul.paytype = this.paytype;
    this.quotationul.ppayyear = this.payyear;
    this.quotationul.endowmenttype = this.edowntype;
    this.quotationul.pendowmentyear = this.edownyear;

    this.quotationul.createdatetime =dateNow;//Require = Y
    this.quotationul.lastmodify =dateNow;//Require = Y
    this.quotationul.lastsync ="";//เป็นว่าง
    this.quotationul.status ="N"; //insert
    this.quotationul.devicerefno ="ddd";

    this.quotationul.publishstatus ="";//เป็นว่าง
    this.quotationul.havetp ="";//เป็นว่าง
    this.quotationul.healthcheckflag ="N";//เป็นN
    this.quotationul.kbcoverageyear ="0";//เป็น0
    this.quotationul.typeapp ="UL";
    
    this.quotationul.pdflang ="";//เป็นว่าง
    this.quotationul.pdfpath ="";//เป็นว่าง
    this.quotationul.alfrescoid = "";//เป็นว่าง
    this.quotationul.referenceno ="";//เป็นว่าง

    

  } 
 
  private setRiderForSave(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string) : Array<QuotationRiderM> {
    let listRider: Array<QuotationRiderM> = [];
      
    for (let key in this.rider) {
      let sum = Number(this.rider[key].sum);
      let premium = Number(this.rider[key].premium);
      //console.log("key = " + key + "||sum = " + sum);
      
      if(premium > 0){
        let objMQR: QuotationRiderM = new QuotationRiderM();

        objMQR.quotationno = quotationno;//Require = Y
        objMQR.customerid = customerid;//Require = Y
        objMQR.ridertype = key;//Require = Y jomkrit
  
        objMQR.sum = this.rider[key].sum;
        objMQR.premium = this.rider[key].premium;

        objMQR.createdatetime = dateNow;//Require = Y
        objMQR.lastmodify = dateNow;//Require = Y
        objMQR.lastsync = "";
        objMQR.agentid  = agentid;//Require = Y
  
        listRider.push(objMQR);
      }
    }
    return listRider;
  }

}
