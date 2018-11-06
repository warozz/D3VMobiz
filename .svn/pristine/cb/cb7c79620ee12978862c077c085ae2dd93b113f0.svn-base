import { TLPlanModel } from './../tlplan/tlplan-model';
import { ApiProvider } from './../api/api';
import { ServiceName } from './../constants/service-name';
import { FunctionName } from './../constants/function-name';
import { RequestModel } from './../model/request-model';
import { SettingPlanProvider } from './../setting-plan/setting-plan';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { QuotationRiderM } from './../quotationrider/quotationrider-model';
import { QuotationGuardianM } from './../quotationguardian/quotationguardian-model';
import { QuotationModel } from './quotation-model';
import { ProspectModel } from './../prospect/prospect-model';
import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ValidateProvider } from '../validate/validate';
import { ProspectProvider } from '../prospect/prospect';

@Injectable()
export class QuotationData {
  
    /**
    * ข้อมูลผู้มุ่งหวัง
    * ใช้สำหรับ check ว่าเคย save แล้วหรือยัง
    * เป็นข้อมูลที่ได้จาก database
    */
   public prospect : ProspectModel; //
   /**
    * ข้อมูล ใบเสนอขาย 
    * ใช้สำหรับ check ว่าเคย save แล้วหรือยัง
    */
   public quotation: QuotationModel; //
   /**
    * ข้อมูล rider 
    */
   public quotationRider : Array<QuotationRiderM>;
   /**
    * ข้อมูล rider คบ. 
    */
   public quotationGuardian : QuotationGuardianM;

  /**
    * ข้อมูล rider จากหน้าจอ 
    * ข้อมูล rider ที่อยู่ใน broadcaster
    */
   public rider : object; // 
   public riderDraf: any;
   /**
    *  ข้อมูลที่ได้จากหน้า quotation-form
    */
   public planSelected: TLPlanModel[];//
   
   public mode : string = "";
   // plan ที่ถูกเลือกเมื่ออยู่ caltype 4, 5
   public package : string = ""; //
   public soldier : string = ""; //

   public premiumFooter : string = "0"; // ข้อมูลเบี้ยประกันหลัก
   public premiumTotal : string = "0"; // ข้อมูลเบี้ยรวม rider
   public baseIncrementer:number = 0; // ทุนประกัน

   private overwrite : boolean = false;
   private healthCheck: boolean = false;

  constructor(
      private alertCtrl: AlertDirective,
      private  planProvider : SettingPlanProvider,
      private apiProvider: ApiProvider,
      private storage : Storage,
      private validator: ValidateProvider,
      private prospectProvider: ProspectProvider) {}

  public async showData2(){
    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");
    let CodeTP = await this.planProvider.getRiderPlanTP(this.planSelected[0].planCode);
    let agentid = "agentid";
    await this.storage.get('loginProfile').then(profile =>{
      agentid = profile.agentid;
    });
    
  }

  /**
    * delete draf
    */
  public async deleteALLQuotationAfterSave(customerid?: string){
    this.checkDaftExist().then(
      (res) => {
        console.log('deleteALLQuotation : '+res);
        if(res){
          this.deleteALLQuotation(customerid);
        }
      });
  }

  public async deleteALLQuotation(customerid?: string){
    let quotationM: QuotationModel = new QuotationModel();
          
    let objMs : Array<QuotationModel> = [];
    objMs.push(quotationM);
    
    let reqModel:RequestModel = new RequestModel();
    reqModel.param = objMs;
    reqModel.searchkey = "DRAFT_DELETE";
    reqModel.functionName = FunctionName.QUOTATION;
    reqModel.serviceName = ServiceName.DELETE;
    this.apiProvider.callData(reqModel).then(
    (res) => {
    
    //alert(JSON.stringify(res));
    },(err) => {
          
      console.log(">> "+JSON.stringify(err));
    }
    );
  }
  /**
   * search daft
   * @return true : ลบ draft , false : ไม่ต้องลบ draft
   */
  private async checkDaftExist() {
    let objM: QuotationModel = new QuotationModel();
    objM.publishstatus = 'D';
    let objMs: Array<QuotationModel> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.searchkey = "DRAFT";
    //reqM.keyvalue = i;

    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs;
    return await this.apiProvider.callData(reqM).then(
      (res) => {
      let temp : any = res;
      // console.log(JSON.stringify(temp));
      if (temp.status == 0 && temp.size > 0) {
        let customerid : string =  temp.data[0].customerid;
        // let quotationno : string =  temp.data[0].quotationno;
        if(this.prospect.customerID == undefined || this.prospect.customerID == ''){
          return false;
        }
        else if(this.prospect.customerID != customerid){
          return false;
        }
        else{ // this.prospect.customerID == customerid ให้ลบ draft
          return true;
        }
      }
      else {
        return false;
      }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
   /**
    * save 
    */
  public async saveQuationAll(){
    // if(this.checkDataBeforeSave(this.prospect)){
    let validateData = this.validator.validateProspect(this.prospect, true, true, false);
    if(validateData){

      if(typeof(this.quotation) === "undefined" ){ 
        let bsave :boolean = await this.insertProcess();
        if(bsave) {
          this.alertCtrl.warning('บันทึกสำเร็จ');
          await this.deleteALLQuotationAfterSave();
        }
      } else {
        //console.log('this.quotation.status : '+this.quotation.status)
        if(this.quotation.status == 'R' || this.quotation.status == 'S'){
          try{
            await this.alertCtrl.confirm('คุณต้องการบันทึกใบเสนอขายใบใหม่ใช่หรือไม่');
            this.overwrite = false;
            let bsave :boolean = await this.insertProcess();
            if(bsave) {
              this.alertCtrl.warning('บันทึกสำเร็จ');
              await this.deleteALLQuotationAfterSave();
            }
          } catch(e) {
            //do nothing
          }
        }
        else{
          try{
            await this.alertCtrl.confiemBoxSaveQuation('คุณต้องการบันทึกซ้ำใบเสนอขายใบเดิมใช่หรือไม่');
            this.overwrite = true;
            if(!this.quotation['applicationidapplicationid']){
              let bsave :boolean = await this.updateProcess();
              if(bsave) {
                this.alertCtrl.warning('แก้ไขข้อมูลเรียบร้อย');
                await this.deleteALLQuotationAfterSave();
            }
          }else{
            this.alertCtrl.warning('ไม่สามารถแก้ไขข้อมูลได้ เนื่องจากมีใบคำขอแล้ว');
          }
          } catch(e) {
            this.overwrite = false;
            if(e !== 'cancel') return;
            let bsave :boolean = await this.insertProcess();
            if(bsave) {
              this.alertCtrl.warning('บันทึกสำเร็จ');
              await this.deleteALLQuotationAfterSave();
            }
          }
        }
      }
    }
  }
  // ใช้เฉพาะ quatation-pdf.ts
  public async saveQuationAllFromQuotationPdf(){
    let validateData = this.validator.validateProspect(this.prospect, true, true, true);
    if(validateData){
    // if(this.checkDataBeforeSaveFromQuotationPdf()){

      if(typeof(this.quotation) === "undefined" ){ 
        let bsave : boolean = await this.insertProcess();
        if(bsave){ // insert สำเร็จแล้ว  ลบ darft ทิ้ง
          await this.deleteALLQuotationAfterSave();
        }
        return bsave;
      } else {
        let bsave : boolean = await this.updateProcess();
        if(bsave){ // insert สำเร็จแล้ว  ลบ darft ทิ้ง
          await this.deleteALLQuotationAfterSave();
        }
        return bsave;
      }
    }
    return false;
  }

  private async insertProcess(){
    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");
    let CodeTP = await this.planProvider.getRiderPlanTP(this.planSelected[0].planCode);
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
        // await this.insertProspect(agentid , dateNow , dateNowNo).then(
        //   (res) => {bsave = res}
        // );
        await this.prospectProvider.insertProspect(agentid , dateNow , dateNowNo, this.prospect, false).then(
          (res) => {bsave = res
            console.log('prospect after insert--->', this.prospect);
          }
        );
      } else {
        // await this.updateProspect(agentid , dateNow , dateNowNo).then(
        //   (res) => {bsave = res}
        // );
        await this.prospectProvider.updateProspect(agentid , dateNow , dateNowNo, this.prospect, false).then(
          (res) => {bsave = res
            console.log('prospect after update--->', this.prospect);
          }
        );
      }
      // await this.saveQuation();
      if(bsave){
        let quotationno : string = agentid+this.planSelected[0].planCode+dateNowNo;//Require = Y
        let customerid : string = this.prospect.customerID;//Require = Y
      // console.log("insertProcess() : customerid : "+customerid);
        //Quotation
        await this.insertQuotation(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP).then(
          (res) => {bsave = res}
        );
        if(bsave){
          //QuotationRider
          await this.insertQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid).then(
            (res) => {bsave = res}
          );
          if(bsave){
            //QuotationGuardian
            await this.insertQuotationGuardianM(agentid, dateNow, dateNowNo,quotationno,customerid).then(
              (res) => {bsave = res}
            );
          }
        }
        // this.broadcaster.broadcast('quatation', this.quotation);
        // if(isInsertProspect){
        //   this.broadcaster.broadcast('prospect', this.prospect);
        // }
        //รอ
        //console.log(this.rider);
        // let popupInfo = new PopupModel();
        // popupInfo.content = "บันทึกสำเร็จ";
        // let modal = this.modalCtrl.create(PopupComponent, popupInfo);
        // modal.present();
      }
      return bsave;
    } catch(e) {
      this.alertCtrl.error(e);
      return false;
    }
    // modal.onDidDismiss(() => {
    //   this.navCtrl.push('QuatationPage');
    // });
  }
  private async updateProcess(){
    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");
    let CodeTP = await this.planProvider.getRiderPlanTP(this.planSelected[0].planCode);
    let agentid = "";
    await this.storage.get('loginProfile').then(profile =>{
      agentid = profile.agentid;
    });
    try{
      let bsave : boolean = true;

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
      // await this.updateProspect(agentid , dateNow , dateNowNo).then(
      //   (res) => {bsave = res}
      // );
      await this.prospectProvider.updateProspect(agentid , dateNow , dateNowNo, this.prospect, false).then(
        (res) => {bsave = res
          console.log('prospect after update--->', this.prospect);
        }
      );
      if(bsave){
        //Update QUotation
        let quotationno : string = this.quotation.quotationno;//Require = Y
        let customerid : string = this.prospect.customerID;//Require = Y
        await this.updateQuotation(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP).then(
          (res) => {bsave = res}
        );
        if(bsave){
          //Delete Rider
          await this.updateQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid).then(
            (res) => {bsave = res}
          );
          if(bsave){
            //Delete QuotationGuardianquotation
            await this.updateQuotationGuardianM(agentid, dateNow, dateNowNo,quotationno,customerid).then(
              (res) => {bsave = res}
            );
          }
          // this.broadcaster.broadcast('quatation', this.quotation);
        }
      }
      //รอ
      return bsave;
    } catch(e) {
      this.alertCtrl.error(e);
      return false;
    }
    
  }

  // async saveQuation() {
  //   let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  //   let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");
  //   let CodeTP = await this.planProvider.getRiderPlanTP(this.choosePlan);
  //   this.storage.get('loginProfile').then(profile =>{
  //     let agentid = profile.agentid;
  //     //Quotation
  //     let quotationno : string = agentid+this.planSelected[0].planCode+dateNowNo;//Require = Y
  //     let customerid : string = this.prospect.customerID;//Require = Y

  //     this.insertQuotation(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP);

  //     let popupInfo = new PopupModel();
  //     popupInfo.content = "บันทึกสำเร็จ";
  //     let modal = this.modalCtrl.create(PopupComponent, popupInfo);
  //     modal.present();

  //     modal.onDidDismiss(() => {
  //       this.navCtrl.push('QuatationPage');
  //     });
  //   });
  // }
  // private async updateProspect(agentid : string, dateNow : string, dateNowNo : string){
  //   let prospectModelReq: ProspectModel = this.setProspectForSave(agentid, dateNow, dateNowNo);
  //   // prospectModelReq.customerID = this.quotation.customerid;
  //  // console.log(JSON.stringify(prospectModelReq));
  //   let prospectModelReqList : Array<ProspectModel> = [];
  //   prospectModelReqList.push(prospectModelReq);
  //   let reqModel:RequestModel = new RequestModel();

  //   reqModel.agentid = agentid;
  //   reqModel.functionName = FunctionName.POSPECT;
  //   reqModel.param = prospectModelReqList;
  //   reqModel.serviceName = ServiceName.UPDATE;
    
  //   return await this.apiProvider.callData(reqModel).then(
  //     (res) =>{
  //       // let obj :any = res;
  //       // let resModel :ResponseModel = obj;
  //       //console.log("UPDATE POSPECT : " +  JSON.stringify(res));
  //       return true;
  //     },(err) => {
  //       this.alertCtrl.error(err);
  //       console.log(err);
  //       return false;
  //   });
  // }
  private async updateQuotation(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string, CodeTP : any){

    let objM: QuotationModel = this.setQuotationForSave(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP);

    let objMs: Array<QuotationModel> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.UPDATE;
    reqM.param = objMs;

    return await this.apiProvider.callData(reqM).then(
      (res) => {
        this.quotation = objM;
       // console.log("UPDATE quotation : " + JSON.stringify(res));
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
        //console.log("DELETE QuotationRider : " + JSON.stringify(res));
          //QuotationRider
        return await this.insertQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid);
      },
      (err) => {
        this.alertCtrl.error(err);
        console.log(err);
        return false;
      }
    );
  }
  // อาจจะต้องแก้ไขให้มีการ return ค่ากลับกรณีที่บันทึกสำเร็จ หรือ error
  private async updateQuotationGuardianM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){

    //Delete QuotationGuardian
    let objGMDs: Array<QuotationGuardianM> = [];
    let objGMD: QuotationGuardianM = new QuotationGuardianM();
    objGMD.quotationno = quotationno;//Require = Y
    objGMD.customerid = customerid;//Require = Y
    objGMD.agentid = agentid;
    objGMDs.push(objGMD);

    let reqGM: RequestModel = new RequestModel();
    reqGM.functionName = FunctionName.QUOTATIONGUARDIAN;
    reqGM.serviceName = ServiceName.DELETE;
    reqGM.param = objGMDs;

    return await this.apiProvider.callData(reqGM).then(
      async (res) => {
        //console.log("DELETE QuotationGuardianM : " +  JSON.stringify(res));
        //QuotationGuardian
        return await this.insertQuotationGuardianM(agentid, dateNow, dateNowNo,quotationno,customerid);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
  // private async insertProspect(agentid : string, dateNow : string, dateNowNo : string){
  //   let prospectModelReq: ProspectModel = this.setProspectForSave(agentid, dateNow, dateNowNo);
  //   let prospectModelReqList : Array<ProspectModel> = [];
  //   prospectModelReqList.push(prospectModelReq);
  //   let reqModel:RequestModel = new RequestModel();
    
  //   reqModel.agentid = agentid;
  //   reqModel.functionName = FunctionName.POSPECT;
  //   reqModel.param = prospectModelReqList;
  //   reqModel.serviceName = ServiceName.INSERT;
  //   //console.log("data POSPECT : " +  prospectModelReq);
  //   return await this.apiProvider.callData(reqModel).then(
  //     (res) =>{
  //       let obj :any = res;
  //       let resModel :ResponseModel = obj;
  //       //console.log("insert POSPECT : " +  JSON.stringify(res));
  //       // ต้องได้ค่า Foreign Key จาก Service
  //       this.prospect.customerID = obj.data[0].customerID;//ต้องส่ง customer id ออกมา
  //       return true;
  //     },(err) => {
  //       //TO-DO
  //       this.alertCtrl.error(err);
  //       console.log(err);
  //       return false;
  //     });
  // }
  private async insertQuotation(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string, CodeTP : any){
    let objM: QuotationModel = this.setQuotationForSave(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP);

    //console.log(JSON.stringify(objM))
    let objMs: Array<QuotationModel> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.INSERT;
    reqM.param = objMs;

    return await this.apiProvider.callData(reqM).then(
      (res) => {
        this.quotation = objM;
        return true;
        //console.log("insert quotation : " + JSON.stringify(res));
      },
      (err) => {
        this.alertCtrl.error(err);
        console.log(err);
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
  // อาจจะต้องแก้ไขให้มีการ return ค่ากลับกรณีที่บันทึกสำเร็จ หรือ error
  private async insertQuotationGuardianM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){

    let objGMs: Array<QuotationGuardianM> = [];
    if(this.rider['KB2'].premium > 0)
    {
      let objGM: QuotationGuardianM = this.setQuotationGuardianM(agentid, dateNow, dateNowNo,quotationno,customerid);//Require = Y
      objGMs.push(objGM);

      let reqGM: RequestModel = new RequestModel();
      reqGM.functionName = FunctionName.QUOTATIONGUARDIAN;
      reqGM.serviceName = ServiceName.INSERT;
      reqGM.param = objGMs;
  
      return await this.apiProvider.callData(reqGM).then(
        (res) => {
          //console.log("insert QuotationGuardianM : " +  JSON.stringify(res));
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
  //------------ setting object for save prospect ----------
  // private setProspectForSave(agentid : string, dateNow : string, dateNowNo : string) : ProspectModel{
  //   let prospectModelReq: ProspectModel = new ProspectModel();
  //   prospectModelReq.agentID = agentid;

  //   prospectModelReq.firstName = this.prospect.firstName;
  //   prospectModelReq.lastName = this.prospect.lastName;
  //   prospectModelReq.preName = this.prospect.preName;

  //   prospectModelReq.gender = this.prospect.gender;
  //   prospectModelReq.occupationType = this.prospect.occupationType;
  //   prospectModelReq.age = this.prospect.age;
    
  //   //let birthDate = undefined;
  //   //prospectModelReq.birthDate = dateNow;       
  //   prospectModelReq.birthDate = this.prospect.birthDate+" 00:00:00";

  //   prospectModelReq.mobilephone = this.prospect.mobilephone;

  //   prospectModelReq.createDatetime = dateNow;
  //   prospectModelReq.lastModify = dateNow;
  //   prospectModelReq.lastSync = "";
  //   prospectModelReq.citizenID = this.prospect.citizenID;

  //   prospectModelReq.createDatetimeFrom = dateNow;
  //   prospectModelReq.createDatetimeTo = dateNow;
  //   prospectModelReq.customerType = 'P'; // Prospect

  //   if(this.prospect.customerID != undefined){
  //     prospectModelReq.customerID = this.prospect.customerID;
  //     prospectModelReq.preNameOther = this.prospect.preNameOther;

  //     prospectModelReq.telephone = this.prospect.telephone;
  //     prospectModelReq.fax = this.prospect.fax;
  //     prospectModelReq.passport = this.prospect.passport;
  //     prospectModelReq.lineID = this.prospect.lineID;
  //     prospectModelReq.linkFacebook = this.prospect.linkFacebook;
  //     prospectModelReq.geolocation = this.prospect.geolocation;
  //     prospectModelReq.address = this.prospect.address;
  //     prospectModelReq.subdistrict = this.prospect.subdistrictCode;
  //     prospectModelReq.district = this.prospect.districtCode;
      
  //     prospectModelReq.province = this.prospect.provinceCode;
  //     prospectModelReq.postcode = this.prospect.postcode;
  //     prospectModelReq.status = this.prospect.status;
  //     prospectModelReq.remark = this.prospect.remark;
  //     prospectModelReq.lastSync = this.prospect.lastSync;
  //     prospectModelReq.email = this.prospect.email; 

  //     prospectModelReq.applicationAmt = this.prospect.applicationAmt;//number
  //     prospectModelReq.quatationAmt = this.prospect.quatationAmt;              
  //     prospectModelReq.maritalstatus = this.prospect.maritalstatus;
      
  //     prospectModelReq.provinceCode = this.prospect.provinceCode;
  //     prospectModelReq.districtCode = this.prospect.districtCode;
  //     prospectModelReq.subdistrictCode = this.prospect.subdistrictCode;

  //     prospectModelReq.addressno =  this.prospect.addressno;
  //     prospectModelReq.buildingname =  this.prospect.buildingname;
  //     prospectModelReq.moo =  this.prospect.moo;
  //     prospectModelReq.soi =  this.prospect.soi;
  //     prospectModelReq.road =  this.prospect.road;
  //   }
  //   else{
  //     prospectModelReq.customerID = null;
  //     prospectModelReq.preNameOther = "";
  //     prospectModelReq.fax = "";
  //     prospectModelReq.passport = "";
  //     prospectModelReq.lineID = "";
  //     prospectModelReq.linkFacebook = "";
  //     prospectModelReq.geolocation = "";
  //     prospectModelReq.address = "";
  //     prospectModelReq.subdistrict = "";
  //     prospectModelReq.district = "";
      
  //     prospectModelReq.province = "";
  //     prospectModelReq.postcode = "";
  //     prospectModelReq.status = "";
  //     prospectModelReq.remark = "";
  //     prospectModelReq.email = ""; 
  
  //     prospectModelReq.applicationAmt = 0;//number
  //     prospectModelReq.quatationAmt = 0;              
  //     prospectModelReq.maritalstatus = "";
      
  //     prospectModelReq.provinceCode = "";
  //     prospectModelReq.districtCode = "";
  //     prospectModelReq.subdistrictCode = "";
  //   }
  //   this.prospect.flagdraftyn = "N";
  //   prospectModelReq.flagdraftyn = "N";

  //   return prospectModelReq;
  // }
  private setQuotationForSave(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string, CodeTP : any) : QuotationModel{
    let quotation: QuotationModel = new QuotationModel();
    //PK possible Duplicate 
    // if(this.quotation == null) {
    //   quotation.quotationno = agentid+this.planSelected[0].planCode+dateNowNo;//Require = Y
    //   quotation.customerid = this.prospect.customerID;//Require = Y
    //   quotation.agentid = agentid;//Require = Y
    // }
    // else{
    //   quotation.quotationno = this.quotation.quotationno;//Require = Y
    //   quotation.customerid = this.prospect.customerID;//Require = Y
    //   quotation.agentid = agentid;//Require = Y
    // }
    quotation.quotationno = quotationno;//Require = Y
    quotation.customerid = customerid;//Require = Y
    quotation.agentid = agentid;//Require = Y
    
    quotation.devicerefno = "ddd";
    quotation.plancode = this.planSelected[0].planCode;
    
    quotation.planname = this.planSelected[0].planName;
    quotation.mode = this.mode; //แก้ไข เพราะทางUNW ให้ส่งโหมด ชำระครั้งเดียว 9  (this.mode === "9" ? "1" : this.mode );  
    quotation.occupationtype = this.prospect.occupationType;
    quotation.insureage = this.prospect.age;
    quotation.lifesum = String(this.baseIncrementer);
    
    quotation.lifepremium = this.premiumFooter;
    quotation.pname = this.prospect.preName;
    quotation.fname = this.prospect.firstName;
    quotation.lname = this.prospect.lastName;
    quotation.branch = "";
    quotation.gender = this.prospect.gender;
    
    quotation.tax = "";
    quotation.publishstatus = "";
    
    quotation.packageno = this.package;
    quotation.soldier = this.soldier;
    quotation.createdatetime = dateNow;//Require = Y
    quotation.birthdate = this.prospect.birthDate+" 00:00:00";
    quotation.lastmodify = dateNow;//Require = Y
    quotation.lastsync = "";
    if(typeof(this.quotation) === "undefined" || (this.overwrite == false)){
      quotation.status = "N";
      quotation.pdfpath = "";
      quotation.pdflang = "";
      quotation.alfrescoid = "";
      quotation.referenceno = "";
    }else{
      quotation.status = this.quotation.status;
      quotation.pdfpath = this.quotation.pdfpath;
      quotation.pdflang = this.quotation.pdflang;
      quotation.alfrescoid = this.quotation.alfrescoid;
      quotation.referenceno = this.quotation.referenceno;
    }
    
    if(typeof(this.rider['occupation']) !== 'undefined' ){
      quotation.occ = this.rider['occupation']['occ'];
      quotation.occgroup = this.rider['occupation']['occGroup'];
    }
    quotation.typeapp = this.typeApp(this.planSelected[0].planCode);
    quotation.paytype = this.planSelected[0].payType;
    quotation.endowmenttype = this.planSelected[0].endowmentType;
    quotation.ppayyear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.prospect.age)));
    quotation.pendowmentyear =  (this.planSelected[0].endowmentType === "0" ? this.planSelected[0].pEndowmentYear : String(Number(this.planSelected[0].pEndowmentYear) - Number(this.prospect.age)));
    quotation.havetp = this.checkTp(CodeTP,Number(this.prospect.age));  
    quotation.kbcoverageyear = this.endownKB2(Number(this.prospect.age) , Number(this.rider['KB2'].age) , Number(quotation.ppayyear));
    quotation.healthcheckflag = this.getHealthCheck();
    // quotation.healthcheckflag = this.HealthCheck(Number(this.prospect.age),this.baseIncrementer);
    quotation.totalpremium = this.premiumTotal; 

    //console.log("quotation : " + JSON.stringify(quotation));
    return quotation
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
  private setQuotationGuardianM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){
    let objGM: QuotationGuardianM = new QuotationGuardianM();
    objGM.quotationno = quotationno;//Require = Y
    objGM.customerid = customerid;//Require = Y
    objGM.prename = "test";
    objGM.firstname = "jomkrit";
    objGM.lastname = "editservice";

    objGM.sex = this.rider['KB2'].sex;
    objGM.birthdate = this.rider['KB2'].birth.concat(" 00:00:00");//15:14:1
    objGM.age = this.rider['KB2'].age;

    objGM.createdatetime = dateNow;//Require = Y
    objGM.lastmodify = dateNow;//Require = Y

    objGM.lastsync = "";
    objGM.agentid = agentid;//Require = Y
    return objGM;
  }

  //-----------------------------------------------
  public typeApp(plan: string)
  {
    const arrPA: Array<string> = ["TJ1","TL1","TN1","TZ","TX2","TY","TK1","TM1"];
    const arrMon: Array<string> = ["MC","MD","ME","MF","MH","MG"];
    const arrCancer: Array<string> = ["TE01","TE02","TE03","TE12","TE13","TE14","TE17"];
    const arrIslam: Array<string> = ["NC","ND","NC01","ND01","WU","EN08","EN09"];
    if(arrPA.indexOf(plan) != -1) {
      return "PA";
    }
    else if(arrMon.indexOf(plan) != -1) {
      return "MON";
    }
    else if(arrCancer.indexOf(plan) != -1) {
      return "CAN";
    }
    else if(arrIslam.indexOf(plan) != -1) {
      return "ISLAM";
    }
    else{
      return "PER";
    }
    
  }
  public endownKB2(ageKid: number , ageKb: number , payYear: number)
  {
    /** ระยะเวลาผู้เอาชำระเบี้ย */
    let kid = 30 - ageKid;
    let parent = 60 - ageKb;
    let kb2Endown = payYear;

    if ( kb2Endown > kid )
      kb2Endown = kid;
    if ( kb2Endown > parent )
      kb2Endown = parent;

    //console.log("ผู้ปกครอง=" + ageKb + "  เด็ก="+kid + "  ระยะชำระเบี้ย="  + payYear + "  |----คุ้มครองคบ=" + kb2Endown+ "----|" );

    return  String(kb2Endown); 

  }  
  public HealthCheck(age: number , sum: number)
  {
    if ( age> 45 && sum > 3000000 )
      return  "Y"; 
    else
      return  "N"; 
  }  
  public setHealthCheck(check: boolean)
  {
    this.healthCheck = check;
  }  
  public getHealthCheck()
  {
    if ( this.healthCheck )
      return  "Y"; 
    else
      return  "N"; 
  }  
  public checkTp(codetp: string ,age: number)
  {
    if( age < 60){
      if(typeof(codetp) !== 'undefined'){
        return  "Y"; 
      }
    }
    else
      return  "N"; 
  }
  
}