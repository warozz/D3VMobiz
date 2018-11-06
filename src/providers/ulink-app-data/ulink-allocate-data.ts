
import { Storage } from "@ionic/storage";
import { FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
// import * as moment from "moment";
import { ApiProvider } from "../api/api";
import { ToastController } from "ionic-angular";
import { UlinkMasterM } from "./ulink-master-model";
import { RequestModel } from "../model/request-model";
import { FunctionName } from "../constants/function-name";
import { ServiceName } from "../constants/service-name";
// import { ExampleBenefitModel } from "../ulink-benefit/example-benefit-model/example-benefit";
import { UnitlinkDataProvider } from "./unitlink-data";
// import { ExampleChildModel } from "../ulink-benefit/example-benefit-model/example-child";
// import { ListExamplepay } from "../ulink-benefit/example-benefit-model/list-example-pay";
// import { ListExamplewithdraw } from "../ulink-benefit/example-benefit-model/list-example-withdraw";
import { ProspectModel } from "../prospect/prospect-model";
import { ProspectUlinkExpreieneModel } from "../service-table/prospect-ulink-expreiene-medel";
import { ProspectProvider } from "../prospect/prospect";
// import { ListExampleProfit } from "../ulink-benefit/example-benefit-model/list-excample-profit";
// import { ListExampleSumRpp } from "../ulink-benefit/example-benefit-model/list-example-sumrpp";
// import { ListExampleRider } from "../ulink-benefit/example-benefit-model/list-excample-rider";

import { AllocateModel } from './allocate-model';
import { AllocateDetailModel } from './allocate-detail-model';

import * as moment from 'moment';

/** ใช้ใน Allocation */
@Injectable()
export class UlinkAllocateProvider {


  /**
   * allocateDetail
   */
  public allocate: AllocateModel;
  public allocateDetail: AllocateDetailModel;

  /**
   * prospect
   */
  public prospect: ProspectModel = new ProspectModel();

  /**
   * prospect Experience
   */
  public prospextExperience: ProspectUlinkExpreieneModel;

  private agentid: string;
  public ageend: string;
  public riders: any;

  public allfundid: string = '1';
  public status: string = 'A';

  public rppchoice: string;
  public rspchoice: string;
  public topchoice: string;

  public defaultChoice = 'rpp';


  public rspDefalutChoice: boolean;
  public topDefalutChoice: boolean;

  public chooseFundData;
  public formEditPage: string = '';

  constructor(
    private apiProvider: ApiProvider,
    private storage: Storage,
    private unitlinkData: UnitlinkDataProvider,
    private prospectProvider: ProspectProvider
  ) { }


  /**
   * บันทึกข้อมูลด้วย service
   */
  public async saveAllocate() {

    let agentid = "";

    await this.storage.get('loginProfile').then(profile =>{
      agentid = profile.agentid;
    });

    // console.log('prospect',this.prospect);
    // console.log('unitlinkData',this.unitlinkData);
    // console.log('allfundid',this.allfundid);
    // console.log('rppchoice',this.rppchoice);
    // console.log('rspchoice',this.rspchoice);
    // console.log('topchoice',this.topchoice);
    // console.log('chooseFundData',this.chooseFundData);

    console.log('agentid',agentid);

    let bsave;
    let saveAllSuccess = false;
    return this.saveProspect(agentid).then(async res=>{
      // console.log(agentid, this.prospect.customerID)
      if(this.formEditPage == 'AppLifepremiumUlinkPage'){
        bsave = true;
      }else {
        await this.unitlinkData.saveProspectUlinkExpreiene(agentid, this.prospect.customerID).then(
          (res) => {
            console.log('saveProspectUlinkExpreiene',res);
            bsave = res
          }
        );
      }


      // console.log('bsave',bsave);
      if(bsave){

        let rspchoice = this.rspDefalutChoice ? this.defaultChoice : this.rspchoice;
        let topchoice = this.topDefalutChoice ? this.defaultChoice : this.topchoice;

        let listDetail = [];
        for (const index in this.chooseFundData) {
          if (this.chooseFundData.hasOwnProperty(index)) {
            const items = this.chooseFundData[index];
            if((items.premiumtype === 'rpp')
            && (items.choiceType === this.rppchoice)
            && Number(items.riskInput) !== 0
            ){
              listDetail.push({
                customerid : this.prospect.customerID,
                agentid,
                assessmentdate : "",
                fundcode : items.fundID,
                premiumtype : items.premiumtype,
                percent : items.riskInput,
                status : "A"
              });
            }else if((items.premiumtype === 'rsp')
              && (items.choiceType === this.rspchoice)
              && rspchoice !== 'rpp'
              && Number(items.riskInput) !== 0
            ){
              listDetail.push({
                customerid : this.prospect.customerID,
                agentid,
                assessmentdate : "",
                fundcode : items.fundID,
                premiumtype : items.premiumtype,
                percent : items.riskInput,
                status : "A"
              });
            }else if((items.premiumtype === 'top')
              && (items.choiceType === this.topchoice)
              && topchoice !== 'rpp'
              && Number(items.riskInput) !== 0
            ){
              listDetail.push({
                customerid : this.prospect.customerID,
                agentid,
                assessmentdate : "",
                fundcode : items.fundID,
                premiumtype : items.premiumtype,
                percent : items.riskInput,
                status : "A"
              });
            }
          }
        }

        let body = {
          "action" : "insert",
          "agentid" : agentid,
          "searchkey":"",
          "datas" : [{
            "customerid" : this.prospect.customerID,
            "agentid" : agentid,
            "assessmentdate" : "",
            "allfundid" : this.allfundid,
            "rppchoice":this.rppchoice,
            "rspchoice":rspchoice,
            "topchoice":topchoice,
            "status" : "A",
            "listDetail" : listDetail
          }],
          "data" : {}
        };
        console.log('data before save',body);

        let request: RequestModel = new RequestModel();
        request = {
          ...request,
          functionName: FunctionName.ALLOCATE,
          serviceName: ServiceName.INSERT,
          searchkey: '',
          param: body.datas
        }

      let data = {};
      return await this.apiProvider.callData(request).then(
          (res) => {
            console.log('success => ALLOCATE', res)
            saveAllSuccess = true;
            data = {
              data : res,
              saveAllSuccess
            }
            return data;
          },
          (err) => {
            console.log('err => ALLOCATE', err)
            saveAllSuccess = false;
            data = {
              data : res,
              saveAllSuccess
            }
            return data;
          });
      }
    },(err)=>{
      console.log('err => saveProspect', err)
    });
  }

  private saveProspect(agentid : string){

    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");

    return new Promise<boolean>((resolve,reject) => {
      if(typeof this.prospect.customerID === 'undefined'){
        this.prospectProvider.insertProspect(agentid , dateNow , dateNowNo, this.prospect, false).then(
          (res : boolean) => {
            console.log('prospect after insert--->', this.prospect);
            if(res)
              resolve(res);
            else
              reject(res);
          }
        );
      } else {
        this.prospectProvider.updateProspect(agentid , dateNow , dateNowNo, this.prospect, false).then(
          (res : boolean) => {
            console.log('prospect after update--->', this.prospect);
            if(res)
              resolve(res);
            else
              reject(res);
          }
        );
      }
    });
  }

  public resetData() {
    this.allocate = undefined;
    this.ageend = "";
  }

  public setAllocate(allocate) {
    this.allocate = allocate;
  }

  public getAllocate() {
    return this.allocate;
  }

  private setAllocateForSave() {}

  public getAllocationByCustomerId(customerId: string)
  {
    return new Promise(async (resolve, reject) => {

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.ALLOCATE;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = [{customerid : customerId}];

      await this.apiProvider.callData(reqM).then(
        (res) => {
          //console.log("Allocation : "+JSON.stringify(res));
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }


  public async testSaveAllocate() {

    let agentid = "";

    await this.storage.get('loginProfile').then(profile =>{
      agentid = profile.agentid;
    });

    // console.log('prospect',this.prospect);
    // console.log('unitlinkData',this.unitlinkData);
    // console.log('allfundid',this.allfundid);
    // console.log('rppchoice',this.rppchoice);
    // console.log('rspchoice',this.rspchoice);
    // console.log('topchoice',this.topchoice);
    // console.log('chooseFundData',this.chooseFundData);

    console.log('agentid',agentid);

    let rspchoice = this.rspDefalutChoice ? this.defaultChoice : this.rspchoice;
        let topchoice = this.topDefalutChoice ? this.defaultChoice : this.topchoice;

        let listDetail = [];
        for (const index in this.chooseFundData) {
          if (this.chooseFundData.hasOwnProperty(index)) {
            const items = this.chooseFundData[index];
            if((items.premiumtype === 'rpp') && (items.choiceType === this.rppchoice)){
              listDetail.push({
                customerid : this.prospect.customerID,
                agentid,
                assessmentdate : "",
                fundcode : items.fundID,
                premiumtype : items.premiumtype,
                percent : items.riskInput,
                status : "A"
              });
            }else if((items.premiumtype === 'rsp')
              && (items.choiceType === this.rspchoice)
              && rspchoice !== 'rpp'
            ){
              listDetail.push({
                customerid : this.prospect.customerID,
                agentid,
                assessmentdate : "",
                fundcode : items.fundID,
                premiumtype : items.premiumtype,
                percent : items.riskInput,
                status : "A"
              });
            }else if((items.premiumtype === 'top')
            && (items.choiceType === this.topchoice)
            && topchoice !== 'rpp'
            ){
              listDetail.push({
                customerid : this.prospect.customerID,
                agentid,
                assessmentdate : "",
                fundcode : items.fundID,
                premiumtype : items.premiumtype,
                percent : items.riskInput,
                status : "A"
              });
            }
          }
        }


    console.log('listDetail',listDetail)

  }
}
