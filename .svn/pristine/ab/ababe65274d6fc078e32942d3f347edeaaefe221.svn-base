import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { RequestModel } from '../model/request-model';
import { DateUtil } from '../utility/date-util';
import { UUID } from 'angular2-uuid';
import { BodyM } from '../model/body-model';
import { RequestWsbackendM } from '../model/request-ws-backend';
import { URLConfig } from '../constants/url-config';
import { AuthorizationKey } from '../constants/authorization-key';
import { ResponseModel } from '../model/response-model';
import { HeadersM } from '../model/headers-model';
import { LogService } from '../utility/logs-service';
import { LogsModel } from '../service-table/logs-model';


/*
  Generated class for the CommonUtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonUtilProvider {

  constructor(public http: HttpClient ,public key : AuthorizationKey, public logs: LogService) {
  }
 
  // async invokeAccessToken(){
  //   let request: RequestModel = new RequestModel();
  //   let configURL: URLConfig = new URLConfig(request);
  //   let url = configURL.proxy;
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   headers.append("Authorization", configURL.secret);
  //   headers.append("Access-Control-Allow-Origin","*");
  //   let req = "grant_type=client_credentials";
  //   let options = new RequestOptions({ headers: headers });
  //   return await this.http.post(url,req,options)
  //   .toPromise()
  //   .then(this.extractData)
  //   .catch(this.handleErrorPromise);
  //   //return (response.json());
  // }

  public callRestServiceTLPrompt(request: RequestModel) {
    return new Promise((resolve, reject) => {

          let headersM: HeadersM = new HeadersM();
          headersM.sentDateTime = DateUtil.sentRequestDateT();
          headersM.uID =  UUID.UUID();
  
          let bodyM: BodyM = new BodyM();
          bodyM.action = request.serviceName;
          bodyM.datas = request.param;
          bodyM.searchkey = request.searchkey;
          bodyM.keyvalue = request.keyvalue;
          bodyM.agentid = request.agentid;
          bodyM.lastsync = request.lastsync;
          bodyM.searchmode = request.searchmode;

          bodyM.pagingMode = request.pagingMode;
          bodyM.sizeTotal = request.sizeTotal;
          bodyM.orderBy = request.orderBy;
          bodyM.orderType = request.orderType;
          bodyM.pageNo = request.pageNo;
          bodyM.pageSize = request.pageSize;
          bodyM.filterBy = request.filterBy;
          bodyM.sourcePage = request.sourcePage;
  
          let req: RequestWsbackendM = new RequestWsbackendM();
          req.body = bodyM
          req.headers = headersM; 
  
          let configURL: URLConfig = new URLConfig(request);
          //console.log(headersM.uID + ' >> callRestServiceTLPrompt : url = ' + configURL.url);
          //console.log(headersM.uID + ' >> callRestServiceTLPrompt : req = ' + JSON.stringify(req)); 
  
          let header: HttpHeaders = new HttpHeaders();
          header = header.set("Content-Type","application/json")
          .set("Authorization", this.key.getAuthToken());
          
          this.http.post(configURL.url, (req), {headers : header})
              .subscribe(data => {
                  //console.log('callRestServiceTLPrompt : response data = ' + JSON.stringify(data));
                  let result: any = data;
                  if ('S' === result.status.status) {
                      resolve(result.body);
                  }
                  else {
                    
                    let logsM: LogsModel = new LogsModel();
                    logsM.msg = result.errorMessage;
                    logsM.agentid = request.agentid;
                    logsM.function = request.functionName;
                    logsM.url = configURL.url;
                    logsM.reqmsg = JSON.stringify(req);
                    this.logs.insert(logsM);

                    reject(result.status.errorMessage);
                  }
              }, (err) => {

                let logsM: LogsModel = new LogsModel();
                logsM.msg = JSON.stringify(err);
                logsM.agentid = request.agentid;
                logsM.function = request.functionName;
                logsM.url = configURL.url;
                logsM.reqmsg = JSON.stringify(req);
                this.logs.insert(logsM);

                reject(err + " : " + configURL.url);
              });
    });
  }

  public callRestServiceNBApp(request: RequestModel) {
    return new Promise((resolve, reject) => {

          let headersM: HeadersM = new HeadersM();
          headersM.sentDateTime = DateUtil.sentRequestDateT();
          headersM.uID =  UUID.UUID();
  
          let bodyM: BodyM = new BodyM();
          bodyM.action = request.serviceName;
          bodyM.datas = request.param;
          bodyM.searchkey = request.searchkey;
          bodyM.keyvalue = request.keyvalue;
          bodyM.agentid = request.agentid;
          bodyM.lastsync = request.lastsync;
          bodyM.searchmode = request.searchmode;

          bodyM.pagingMode = request.pagingMode;
          bodyM.sizeTotal = request.sizeTotal;
          bodyM.orderBy = request.orderBy;
          bodyM.orderType = request.orderType;
          bodyM.pageNo = request.pageNo;
          bodyM.pageSize = request.pageSize;
          bodyM.filterBy = request.filterBy;
  
          let req: RequestWsbackendM = new RequestWsbackendM();
          req.body = bodyM
          req.headers = headersM; 
  
          let configURL: URLConfig = new URLConfig(request);
          //console.log(headersM.uID + ' >> callRestServiceTLPrompt : url = ' + configURL.url);
          //console.log(headersM.uID + ' >> callRestServiceTLPrompt : req = ' + JSON.stringify(req)); 
  
          let header: HttpHeaders = new HttpHeaders();
          header = header.set("Content-Type","application/json")
          .set("Authorization", this.key.getAuthToken());
          
          this.http.post(configURL.url, (req), {headers : header})
              .timeout(180000)
              .subscribe(data => {
                  //console.log('callRestServiceTLPrompt : response data = ' + JSON.stringify(data));
                  let result: any = data;
                  if ('S' === result.status.status) {
                      resolve(result.body);
                  }
                  else {
                    
                    let logsM: LogsModel = new LogsModel();
                    logsM.msg = result.errorMessage;
                    logsM.agentid = request.agentid;
                    logsM.function = request.functionName;
                    logsM.url = configURL.url;
                    logsM.reqmsg = JSON.stringify(req);
                    this.logs.insert(logsM);

                    reject(result.status.errorMessage);
                  }
              }, (err) => {

                let logsM: LogsModel = new LogsModel();
                logsM.msg = JSON.stringify(err);
                logsM.agentid = request.agentid;
                logsM.function = request.functionName;
                logsM.url = configURL.url;
                logsM.reqmsg = JSON.stringify(req);
                this.logs.insert(logsM);

                reject(err + " : " + configURL.url);
                  
              });
    });
  }

  postApi(request: RequestModel):Promise<ResponseModel> {

      let configURL: URLConfig = new URLConfig(request);

      // let headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append("Authorization", this.key.getKeyToken());
    
      // let options = new RequestOptions({ headers: headers });
      // let param = JSON.stringify(request.param);

      let header: HttpHeaders = new HttpHeaders();
      header = header.set("Content-Type","application/json")
      .set("Authorization",this.key.getAuthToken());


      return this.http.post(configURL.url,request.param,{headers : header})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  async postApiData(request : RequestModel) {

    let configURL: URLConfig = new URLConfig(request);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append("Authorization", this.key.getKeyToken());
    //let options = new RequestOptions({ headers: headers });
    let header: HttpHeaders = new HttpHeaders();
    header = header.set("Content-Type","application/json")
    .set("Authorization",this.key.getAuthToken());
    let headerJson = {
      headers : {
        uID : UUID.UUID(),
        sentDateTime : DateUtil.sentRequestDateT()
      }
    }
    let req = (Object.assign(headerJson,request.param));
   
    return await this.http.post(configURL.url,req,{headers : header})
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
    //return (response.json());
  }
  
  async getJsonFile(url :string){
    return await this.http.get(url)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
    //return (response.json());
  }

  private extractData(res:Response | any){
    //let body = res.json();
    let body : any = res;
    //console.log(JSON.stringify(body));
    return body || {};
  }

  private handleErrorPromise(error: Response | any){
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
  
  

   /**
   * Call post method for Authentication user login.
   * @param request Object parameter from Page.
   */
  public execServiceAuthen(request: RequestModel) {
    return new Promise((resolve, reject) => {

          let configURL: URLConfig = new URLConfig(request);

          console.log("execServiceAuthen : request = " + JSON.stringify(request));
          console.log("execServiceAuthen : url = " + configURL.url);
  
          let header: HttpHeaders = new HttpHeaders();
          header = header.set("Content-Type","application/json")
          .set("Authorization",this.key.getAuthToken());
          this.http.post(configURL.url, (request.param), {headers:header})
            .subscribe(data => {
              resolve(data);
            }, (err) => {
              reject(err);
            });
    });
  }

}
