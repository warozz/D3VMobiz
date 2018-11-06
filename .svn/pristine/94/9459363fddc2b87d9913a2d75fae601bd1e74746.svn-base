import {PlanRiderModel} from '../planprovide-table/planrider/planrider-model';
import { PlanDetailM } from './../planprovide-table/plandetail/plandetail-model';
import { ApiProvider } from './../api/api';
import { async } from 'rxjs/scheduler/async';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestModel } from '../model/request-model';
import { FunctionName } from '../constants/function-name';
import { TLPlanService } from '../tlplan/tlplan-service';
import { Platform } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { ServiceName } from '../constants/service-name';
import { CommonUtilProvider } from '../common-util/common-util';

/*
  Generated class for the SettingPlanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingPlanProvider {

  constructor(public http: Http,public platform: Platform, public db: SQLite, public commonApi: CommonUtilProvider, private apiProvider : ApiProvider) {
    
  }


  async getALLPlan(){
    let request = new RequestModel();
    request.functionName = FunctionName.GETALLPLAN;
    request.param =  { body : { action : "SELECT" }};
    return this.commonApi.postApiData(request);
  }

  async getStep(){
    return await this.commonApi.getJsonFile("assets/json/StepSumAssure.json");
  }
  
  async getDiscount(){
    return await this.commonApi.getJsonFile("assets/json/discount.json");
  }

  async checkgio(){
    return await this.commonApi.getJsonFile("assets/json/checkgio.json");
  }

  async getRider(rider : string){
    return await this.commonApi.getJsonFile("assets/json/calrider/"+rider+".json");
  }

  async planfee(){
    return await this.commonApi.getJsonFile("assets/json/planfee.json");
  }

  async planDetail(plancode : string){
    let planDetailM: PlanDetailM = new PlanDetailM();
    planDetailM.plancode = plancode;//Require = Y

    let planDetailMs: Array<PlanDetailM> = [];
    planDetailMs.push(planDetailM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PLAN_DETAIL;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = planDetailMs;
    let resutl : string = ""; 
    await this.apiProvider.callData(reqM).then(
      (res) => {
        const obj: any = res 
        if(obj.status == 0 && obj.size > 0){
          resutl = obj.data[0].name;
        }
      },
      (err) => {
        console.log(err);
      }
    );
    return resutl;
  }

  async getTLPlan(){ 
    let reqModel:RequestModel = new RequestModel();
    reqModel.functionName = FunctionName.TLPLAN;
    reqModel.serviceName = ServiceName.SELECT;
    return await this.apiProvider.callData(reqModel);
  }

  async getRiderPlanTP(plancode : string){
    let planRiderM: PlanRiderModel = new PlanRiderModel();
    planRiderM.plancode = plancode;//Require = Y
    //planRiderM.sum = "100000";//Require = N
    //planRiderM.age = "6";//Require = N
    

    let planRiderMs: Array<PlanRiderModel> = [];
    planRiderMs.push(planRiderM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PLAN_RIDER;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = planRiderMs;
    let resultData : any ;
    let list = await this.apiProvider.callData(reqM).then(
      (res) => {
        //console.log(JSON.stringify(res));
        let obj : any = res; 
        if(obj.status == 0 && obj.size > 0){
          //console.log("PlanRiderModel="+obj.data+"obj.size=="+obj.size);
          let result : any = obj.data;
          let pt = result.filter((item,index)=>  (item.ridercode === 'TP' || item.ridercode === 'TTP'));
          //console.log("pt === " + pt +" pt.size==" + pt.size +" pt.length="+ pt.length);
          if (pt.length> 0)
            resultData =  pt;
          else
            resultData =  undefined;   
        }
      },
      (err) => {
        console.log(err);
      }
    );
    
    return resultData;
  }


}
