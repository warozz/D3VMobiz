import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProspectModel } from './prospect-model';
import { RequestModel } from '../model/request-model';
import { FunctionName } from '../constants/function-name';
import { ServiceName } from '../constants/service-name';
import { ResponseModel } from '../model/response-model';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { ApiProvider } from '../api/api';

@Injectable()
export class ProspectProvider {

  customerId: string;
  duplicateFlag: boolean = false;

  constructor(public http: HttpClient, private alertCtrl: AlertDirective, private apiProvider: ApiProvider,) {
    
  }

  public async insertProspect(agentid : string, dateNow : string, dateNowNo : string, prospect : ProspectModel, draftData : boolean){
    let prospectModelReq: ProspectModel = this.setProspectForSave(agentid, dateNow, dateNowNo, prospect, draftData);
    /**
     * ถ้าเป็น insert แล้ว type เป็น draft ระบบจะต้อง set flagdraftyn เป็น Y 
     */
    if(draftData){
      prospect.flagdraftyn = "Y";
      prospectModelReq.flagdraftyn = "Y";
    }

    let prospectModelReqList : Array<ProspectModel> = [];
    let reqModel:RequestModel = new RequestModel();

    prospectModelReqList.push(prospectModelReq);
    
    reqModel.agentid = agentid;
    reqModel.functionName = FunctionName.POSPECT;
    reqModel.param = prospectModelReqList;
    reqModel.serviceName = ServiceName.INSERT;
   
    return await this.apiProvider.callData(reqModel).then(
      (res) =>{
        let obj :any = res;
        let resModel :ResponseModel = obj;
       
        // ต้องได้ค่า Foreign Key จาก Service
        prospect.customerID = obj.data[0].customerID;//ต้องส่ง customer id ออกมา
        this.customerId = obj.data[0].customerID;
        return true;
      },(err) => {
        
        this.alertCtrl.error(err);
        console.log(err);
        return false;
      });
  }

  public async updateProspect(agentid : string, dateNow : string, dateNowNo : string, prospect : ProspectModel, draftData : boolean){
    console.log('prospect update method --->', prospect);
    let prospectModelReq: ProspectModel = this.setProspectForSave(agentid, dateNow, dateNowNo, prospect, draftData);
    
    let prospectModelReqList : Array<ProspectModel> = [];
    prospectModelReqList.push(prospectModelReq);
    let reqModel:RequestModel = new RequestModel();

    reqModel.agentid = agentid;
    reqModel.functionName = FunctionName.POSPECT;
    reqModel.param = prospectModelReqList;
    reqModel.serviceName = ServiceName.UPDATE;
    if(this.duplicateFlag){
      reqModel.searchkey = 'DUPLICATEPROSPECT';
    }
    
    return await this.apiProvider.callData(reqModel).then(
      (res) =>{
        return true;
      },(err) => {
        this.alertCtrl.error(err);
        console.log(err);
        return false;
    });
  }

  private setProspectForSave(agentid : string, dateNow : string, dateNowNo : string, prospect : ProspectModel, draftData : boolean) : ProspectModel{
    
    let prospectModelReq: ProspectModel = new ProspectModel();
    prospectModelReq.agentID = agentid;

    prospectModelReq.firstName = prospect.firstName;
    prospectModelReq.lastName = prospect.lastName;
    prospectModelReq.preName = prospect.preName;
    prospectModelReq.gender = prospect.gender;
    prospectModelReq.occupationType = prospect.occupationType;
    prospectModelReq.age = prospect.age;
    prospectModelReq.birthDate = prospect.birthDate+" 00:00:00";
    prospectModelReq.mobilephone = prospect.mobilephone;
    prospectModelReq.createDatetime = dateNow;
    prospectModelReq.lastModify = dateNow;
    prospectModelReq.lastSync = "";
    prospectModelReq.citizenID = prospect.citizenID;
    prospectModelReq.createDatetimeFrom = dateNow;
    prospectModelReq.createDatetimeTo = dateNow;
    prospectModelReq.customerType = 'P';

    if(prospect.customerID != undefined){
      
      prospectModelReq.customerID = prospect.customerID;
      prospectModelReq.preNameOther = prospect.preNameOther;

      if (prospect.customerType != undefined && prospect.customerType != '') {
        prospectModelReq.customerType = prospect.customerType;
      }

      prospectModelReq.telephone = prospect.telephone;
      prospectModelReq.fax = prospect.fax;
      prospectModelReq.passport = prospect.passport;
      prospectModelReq.lineID = prospect.lineID;
      prospectModelReq.linkFacebook = prospect.linkFacebook;
      prospectModelReq.geolocation = prospect.geolocation;
      prospectModelReq.address = prospect.address;
      prospectModelReq.subdistrict = prospect.subdistrictCode;
      prospectModelReq.district = prospect.districtCode;
      prospectModelReq.province = prospect.provinceCode;
      prospectModelReq.postcode = prospect.postcode;
      prospectModelReq.status = prospect.status;
      prospectModelReq.remark = prospect.remark;
      prospectModelReq.lastSync = prospect.lastSync;
      prospectModelReq.email = prospect.email; 
      prospectModelReq.applicationAmt = prospect.applicationAmt;//number
      prospectModelReq.quatationAmt = prospect.quatationAmt;              
      prospectModelReq.maritalstatus = prospect.maritalstatus;
      prospectModelReq.provinceCode = prospect.provinceCode;
      prospectModelReq.districtCode = prospect.districtCode;
      prospectModelReq.subdistrictCode = prospect.subdistrictCode;
      prospectModelReq.addressno =  prospect.addressno;
      prospectModelReq.buildingname =  prospect.buildingname;
      prospectModelReq.moo =  prospect.moo;
      prospectModelReq.soi =  prospect.soi;
      prospectModelReq.road = prospect.road;
    }
    else{
      prospectModelReq.customerID = null;
      prospectModelReq.preNameOther = "";
      prospectModelReq.fax = "";
      prospectModelReq.passport = "";
      prospectModelReq.lineID = "";
      prospectModelReq.linkFacebook = "";
      prospectModelReq.geolocation = "";
      prospectModelReq.address = "";
      prospectModelReq.subdistrict = "";
      prospectModelReq.district = "";
      
      prospectModelReq.province = "";
      prospectModelReq.postcode = "";
      prospectModelReq.status = "";
      prospectModelReq.remark = "";
      prospectModelReq.email = ""; 
  
      prospectModelReq.applicationAmt = 0;//number
      prospectModelReq.quatationAmt = 0;              
      prospectModelReq.maritalstatus = "";
      
      prospectModelReq.provinceCode = "";
      prospectModelReq.districtCode = "";
      prospectModelReq.subdistrictCode = "";

      prospectModelReq.addressno =  "";
      prospectModelReq.buildingname =  "";
      prospectModelReq.moo =  "";
      prospectModelReq.soi = "";
      prospectModelReq.road =  "";
    }

    // if(draftData){
    //   prospect.flagdraftyn = "Y";
    //   prospectModelReq.flagdraftyn = "Y";
    // }else {
    //   prospect.flagdraftyn = "N";
    //   prospectModelReq.flagdraftyn = "N";
    // }
    
    /**
     * ถ้าเป็น draft ให้คงค่าเดิม
     */
    if((draftData)){
      prospectModelReq.flagdraftyn = prospect.flagdraftyn;
    }
    /**
     * ถ้าไม่ใช่ draft ให้เปลี่ยนเป็น "N"
     */
    else {
      prospect.flagdraftyn = "N";
      prospectModelReq.flagdraftyn = "N";
    }
    

    return prospectModelReq;
  }


  public async checkProspectFormService(prospect : ProspectModel) {

    let prospectMs: Array<ProspectModel> = [];
    let prospectM: ProspectModel = new ProspectModel();
    prospectM.firstName = prospect.firstName;
    prospectM.lastName = prospect.lastName;
    prospectM.gender = prospect.gender;
    prospectM.birthDate = prospect.birthDate.substring(0, 10);
    prospectMs.push(prospectM);

    if (prospectMs.length > 0) {
      let reqProspectM: RequestModel = new RequestModel();
      reqProspectM.functionName = FunctionName.POSPECT;
      reqProspectM.param = prospectMs;
      reqProspectM.serviceName = ServiceName.SELECT;
      reqProspectM.searchmode = 'CHECKPROSPECT';
      reqProspectM.keyvalue = '';
    return await this.apiProvider.callData(reqProspectM).then(
      (res)=> {
        console.log('checkProspectFormService prospect : ', prospect);
        console.log('checkProspectFormService res : ', res);

       
        if(res['data'].length > 0){
          let prospectFormService:ProspectModel = res['data'][0];
          this.duplicateFlag = true;

          console.log('checkProspectFormService prospectFormService : ', prospectFormService);

          let age: string =  prospect.age;
          let birthDate: string =  prospect.birthDate;
          let citizenID: string =  prospect.citizenID;
          let firstName: string =  prospect.firstName;
          let flagdraftyn: string =  prospect.flagdraftyn
          ;
          let gender: string =  prospect.gender;
          let lastName: string =  prospect.lastName;
          let mobilephone: string =  prospect.mobilephone;
          let occupationType: string =  prospect.occupationType;
          let preName: string =  prospect.preName;


          // prospectFormService.age = prospect.age;
          // prospectFormService.birthDate = prospect.birthDate;
          // prospectFormService.citizenID = prospect.citizenID;
          // //prospectFormService.customerID = prospect.citizenID
          // prospectFormService.firstName = prospect.firstName;
          // prospectFormService.flagdraftyn = prospect.flagdraftyn;
          // prospectFormService.gender = prospect.gender;
          // prospectFormService.lastName = prospect.lastName;
          // prospectFormService.mobilephone = prospect.mobilephone;
          // prospectFormService.occupationType = prospect.occupationType;
          // prospectFormService.preName = prospect.preName;

          prospect = {
            ...prospectFormService,
            age,
            birthDate,
            citizenID,
            firstName,
            flagdraftyn,
            gender,
            lastName,
            mobilephone,
            occupationType,
            preName

          };

          //prospect = {...prospect, ...prospectFormService}

          console.log('checkProspectFormService prospect include for mservice : ', prospect);

        }
        
        return {prospect, success : true};
      },
      (err) => {
        
        console.log('checkProspectFormService err : ', err);
        this.alertCtrl.error(err);
        console.log(err);
        return {prospect, success : false};
       
        
      }
    );
    }
  }


 
}



