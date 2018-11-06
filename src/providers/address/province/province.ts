import { RequestWsbackendM } from './../../model/request-ws-backend';
import { BodyM } from './../../model/body-model';
import { HeadersM } from './../../model/headers-model';
import { FunctionName } from './../../constants/function-name';
import { RequestModel } from './../../model/request-model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonUtilProvider } from '../../common-util/common-util';

/*
  Generated class for the ProvinceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvinceProvider {

  constructor(public http: Http, public api: CommonUtilProvider) {
    console.log('Hello ProvinceProvider Provider');
  }


  async getProvinceByRegionId(regionid :string ){
    let request = new RequestModel();
    request.functionName = FunctionName.GETREGION;
    request.param =  { body : { action : "SELECT" , searchkey : "region" , keyvalue : regionid }};
    return this.api.postApiData(request);
  }

  async getProvince(){
    let request = new RequestModel();
    request.functionName = FunctionName.GETPROVINCE;
    request.param =  { body : { action : "SELECT" }};
    return this.api.postApiData(request);
  }


  async getHospital(text :any){
    let request = new RequestModel();
    request.functionName = FunctionName.HOSPITAL;
    request.param =  { body : { action : "SELECT" , datas : [text] }};
    return this.api.postApiData(request);
  }
  
}
