import { PackageDetailM } from './../planprovide-table/packagedetail/package-detail-model';
import { PmrateM } from './../planprovide-table/pmrate/pmrate-model';
import { RiderModel } from './../rider/rider-model';
import { ApplicationModel } from './../application/application-model';
import { TLPlanModel } from './../tlplan/tlplan-model';
import { ProspectModel } from './../prospect/prospect-model';
import { FunctionName } from './../constants/function-name';
import { ResponseModel } from './../model/response-model';
import { RequestModel } from './../model/request-model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { ApiDbProvider } from '../api-db/api-db';
import { CallBackM } from '../utility/call-backm';
import { AgentModel } from '../agent/agent-model';
import { CommonUtilProvider } from '../common-util/common-util';
import { ApplicationSessionM } from '../applicationsession/application-session-model';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { LoggerActionLogModel } from '../logger/logger-actionlog-model';
import { LoggerLoginLogModel } from '../logger/logger-loginlog-model';

import { RiderDetailM } from '../riderdetail/riderdetail-model';
import { PremiumPackageM } from '../planprovide-table/premiumpackage/premiumpackage-model';
import { StepSumAssureM } from '../planprovide-table/stepsumassure/stepsumassure-model';
import { SumrateoM } from '../planprovide-table/sumrateo/sumrateo-model';
import { SumrateM } from '../planprovide-table/sumrate/sumrate-model';
import { PlanDetailM } from '../planprovide-table/plandetail/plandetail-model';
import { ParateM } from '../planprovide-table/parate/parate-model';
import { TaxConditionM } from '../planprovide-table/tax-condition/tax-condition-model';
import { TaxFixrateM } from '../planprovide-table/tax-fixrate/tax-fixrate-model';
import { TaxFormulaM } from '../planprovide-table/tax-formula/tax-formula-model';
import { PlanTypeM } from '../planprovide-table/plantype/plantype-model';
import { PlanTypeDetailM } from '../planprovide-table/plantype-detail/plantype-detail-model';
import { TaxSumConditionM } from '../planprovide-table/tax-sumcondition/tax-sumcondition-model';
import { FeeM } from '../planprovide-table/fee/fee-model';
import { PackageCoverageM } from '../planprovide-table/packagecoverage/package-coverage-model';
import { PackageCoverage2M } from '../planprovide-table/packagecoverage2/package-coverage2-model';
import { PremiumRateM } from '../planprovide-table/premiumrate/premiumrate-model';
import { HttpClient } from '@angular/common/http';
import { ServiceName } from '../constants/service-name'; 
import { ULinkPlanModel } from '../ulinkplan/ulinkplan-model';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  public responsePrenameCache: any = undefined;

  constructor(
      public http: HttpClient,
      public httpImg : Http, 
      public db: SQLite,
      public loadingCtrl: LoadingController,
      public apiDbProvider: ApiDbProvider,
      public commonApi: CommonUtilProvider,
      private storage: Storage,
      private network: Network,
      private alertCtrl: AlertDirective) {
  }

  /**
   * Function for convert data from JWT to object model<AgentModel>.
   * @param data Object from JWT for convert to <AgentModel>
   * @param objM Call back function for return object.
   */
  public genarateTokenToAgentM(data: any, objM: CallBackM<AgentModel>): void {

    let agentM: AgentModel = new AgentModel();
    JSON.parse(data).forEach(item => {

      agentM.agentid = item.agentid;
      agentM.branch = item.branch;
      agentM.email = item.email;
      agentM.fName = item.fName;
      agentM.fNameE = item.fNameE;
      agentM.idCardNo = item.idCardNo;
      agentM.license = item.licence;
      agentM.lName = item.lName;
      agentM.lNameE = item.lNameE;
      agentM.perrmissionAgent = item.perrmissionAgent;
      agentM.pName = item.pName;
      agentM.tel = item.tel;
      agentM.ulLicense = item.ulLicense;
      agentM.unLicense = item.unLicense;

      this.fetchURLImageBlob(item.agentid).then((res) => {
        let img: any = res;
        agentM.image = img;
        objM(agentM);
      }, (err) => {
        agentM.image = "";
        objM(agentM);
      });

    });
  }

  public getMode(request: RequestModel) {
    return new Promise((resolve, reject) => {
        this.storage.get('tlpromptMode').then(mode => {
            if (mode != 0 && this.network.type == 'none') {
              this.alertCtrl.warning('กรุณาเชื่อมต่ออินเทอร์เน็ต เพื่อใช้งานทีแอล โปร พลัส');
              reject();
            }
            else
              resolve(mode);
        });
    });
  }

  public getAgentID() {
    return new Promise((resolve, reject) => {
        this.storage.get('loginProfile').then(profile => {
            resolve(profile.agentid);
        });
    });
  }

  /**
   * Function for call data from SQLLite or RESTservice.
   * @param request Object for send to Web Service.
   */
  public callData(request: RequestModel) { 

    return new Promise((resolve, reject) => {
      this.getMode(request).then(mode => { 
        this.getAgentID().then(agentid => {
          request.agentid = <string><any>agentid;
          //console.log("callData : agentID = " + request.agentid);

          if (FunctionName.AGENT == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.agentService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.TLPLAN == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.tlPlanService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let tlPlanMs: Array<TLPlanModel> = body.datas;
    
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = tlPlanMs;
                  responseM.size = tlPlanMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.VERSION == request.functionName) {
            if (mode == 0) {
    
            }
            else if (mode == 1) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  resolve(body.datas);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.POSPECT == request.functionName) {
            if (mode == 0) { 
              this.apiDbProvider.prospectService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let prospectMs: Array<ProspectModel> = body.datas;
    
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = prospectMs;
                  responseM.status = 0;

                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = prospectMs.length;
                  }
    
                  resolve(responseM);
    
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.QUOTATION == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.quotationService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => { 
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
                  
                  responseM.sizeTotal = body.sizeTotal;
                  responseM.pageNo = body.pageNo;
                  responseM.pageSize = body.pageSize;
                  responseM.pageTotal = body.pageTotal;
                  responseM.totalRecord = body.totalRecord;
    
                  resolve(responseM);
    
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.APPLICATION == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.applicationService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let applicationMs: Array<ApplicationModel> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = applicationMs;
                  responseM.size = applicationMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
    
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.ACTIONLOG == request.functionName) {
            if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let actionLogMs: Array<LoggerActionLogModel> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = actionLogMs;
                  responseM.size = actionLogMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 0) {
              resolve(new ResponseModel());
            }
            else {
              reject("Mode ACTIONLOG not correct.");
            }
          }
          else if (FunctionName.LOGINLOG == request.functionName) {
            if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let loginMs: Array<LoggerLoginLogModel> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = loginMs;
                  responseM.size = loginMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 0) {
              resolve(new ResponseModel());
            }
            else {
              reject("Mode LOGINLOG not correct.");
            }
          }
          else if (FunctionName.APPLICATION_SESSION == request.functionName) {
            if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let applicationSessionMs: Array<ApplicationSessionM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = applicationSessionMs;
                  responseM.size = applicationSessionMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 0) {
              resolve(new ResponseModel());
            }
            else {
              reject("Mode APPLICATION_SESSION not correct.");
            }
          }
          else if (FunctionName.PLAN_RIDER == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.planRiderService(request).then(
                (res) => {
                  resolve(res); 
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => { 
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.RIDER == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.riderService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let riderMs: Array<RiderModel> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = riderMs;
                  responseM.size = riderMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.RIDER_DETAIL == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.riderDetailService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let riderDetailMs: Array<RiderDetailM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = riderDetailMs;
                  responseM.size = riderDetailMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PLAN_DETAIL == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.planDetailService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }  
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let planDetailMs: Array<PlanDetailM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = planDetailMs;
                  responseM.size = planDetailMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PMRATE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.pmrateService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let pmrateMs: Array<PmrateM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = pmrateMs;
                  responseM.size = pmrateMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PACKAGE_DETAIL == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.packageDetailService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<PackageDetailM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PREMIUM_PACKAGE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.premiumPackageService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<PremiumPackageM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.STEP_SUMASSURE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.stepSumAssureService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<StepSumAssureM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.SUMRATEO == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.sumrateoService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<SumrateoM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.SUMRATE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.sumrateService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<SumrateM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PARATE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.parateService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<ParateM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.TAX_CONDITION == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.taxConditionService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<TaxConditionM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.TAX_FIXRATE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.taxFixrateService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<TaxFixrateM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.TAX_FORMULA == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.taxFormulaService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<TaxFormulaM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PLANTYPE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.planTypeService(request).then(
                (res) => { 
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<PlanTypeM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PLANTYPE_DETAIL == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.planTypeDetailService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<PlanTypeDetailM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.TAX_SUMCONDITION == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.taxSumConditionService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<TaxSumConditionM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.FEE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.feeService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<FeeM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PACKAGE_COVERAGE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.packageCoverageService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<PackageCoverageM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PACKAGE_COVERAGE2 == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.packageCoverage2Service(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<PackageCoverage2M> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PREMIUMRATE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.premiumRateService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<PremiumRateM> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.CHART == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.chartService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.HEALTH == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.healthService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.EXTENDED == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.extendedService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.FAVORITE_PLAN == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.favoritePlanService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.GETPROVINCE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.provinceService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.DISTRICT == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.districtService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.SUBDISTRICT == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.subDistrictService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.COUPON == request.functionName) {
            console.log("request XML = " + JSON.stringify(request));
            if (mode == 0) {
              this.apiDbProvider.couponService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.COUPONTABLE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.couponTableService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.MATURETABLE == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.maturetableService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            } 
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.QUOTATIONGUARDIAN == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.quotationGuardianService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.MCAAPPLICATIONS == request.functionName) {
            if (mode == 0) {
              
            } 
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.QUOTATIONRIDER == request.functionName) {
            //alert(mode);
            if (mode == 0) {
              this.apiDbProvider.quotationRiderService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
    
                },
                (err) => {
                  reject(err);
                }
              );
            }
          }
          else if (FunctionName.SEND_EMAIL == request.functionName) {
            /*if (mode == 0) {
              
            } 
            else if (mode == 1 || mode == 2) { */
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
           /* }
            else {
              reject("Mode not correct.");
            }*/
          }
          else if (FunctionName.GROUPPLAN_SEARCH == request.functionName) {
            if (mode == 0) {
              
            } 
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  responseM.size = objMs.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.TOPPLAN == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.topPlanService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.GROUPPLAN == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.groupPlanService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.GROUPPLAN_DETAIL == request.functionName) {
            if (mode == 0) {
              this.apiDbProvider.groupPlanDetailService(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
              );
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.OCCUPATIONS == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.OTHER_INSURANCE == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.INSURANCE_REJECTIONS == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.ADDRESS == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PAYMENT == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.BENEFICIARY == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.QUOTATION_PRINTLOG == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.APPLICATIONANSWER == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.ATTACHFILE == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.MCAOCCUPATIONS == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.QUESTIONS == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.APPLICATIONMASTER == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.APPLICATION_SUBMITMDA == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.APPLICATION_PDF == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.APPLICATION_IMAGE_SIGN == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          
          else if (FunctionName.APPLICATION_CHECKCONDITION == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.APPLICATION_EAPP == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) {
              if ("SUMBIT_NBAPP_BRANCH" == request.searchkey || "SUMBIT_NBAPP" == request.searchkey) {
                this.commonApi.callRestServiceNBApp(request).then(
                  (res) => {
                    let body: any = res;
                    let objMs: Array<any> = body.datas;
                    let responseM: ResponseModel = new ResponseModel();
                    responseM.data = objMs;
                    if (ServiceName.COUNT == request.serviceName) {
                      responseM.size = body.size;
                    }
                    else {
                      responseM.size = objMs.length;
                    }
                    
                    responseM.status = 0;
      
                    resolve(responseM);
                  },
                  (err) => {
                    reject(err);
                  }
                );
              }
              else {
                this.commonApi.callRestServiceTLPrompt(request).then(
                  (res) => {
                    let body: any = res;
                    let objMs: Array<any> = body.datas;
                    let responseM: ResponseModel = new ResponseModel();
                    responseM.data = objMs;
                    if (ServiceName.COUNT == request.serviceName) {
                      responseM.size = body.size;
                    }
                    else {
                      responseM.size = objMs.length;
                    }
                    
                    responseM.status = 0;
      
                    resolve(responseM);
                  },
                  (err) => {
                    reject(err);
                  }
                );
              }
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.TEMP_RECEIPTNO == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.CUSTOMERSERVICE == request.functionName) {  
            
            this.commonApi.callRestServiceTLPrompt(request).then( 
              (res) => {
                let body: any = res;
                let objMs: Array<any> = body.datas;
                let responseM: ResponseModel = new ResponseModel();
                responseM.data = objMs;
                if (ServiceName.COUNT == request.serviceName) {
                  responseM.size = body.size;
                }
                else {
                  responseM.size = objMs.length;
                }
                 
                responseM.status = 0;
  
                resolve(responseM);
              },
              (err) => {
                reject(err); 
              }
            );
          }
          else if (FunctionName.UNITLINKAPI == request.functionName) {  
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) {  
              this.commonApi.callRestServiceTLPrompt(request).then( 
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.APPLICATION_PDF_ALFRESCO == request.functionName) {
            if (mode == 0) {
            
            }   
            else if (mode == 1 || mode == 2) { 
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let objMs: Array<any> = body.datas;
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = objMs;
                  if (ServiceName.COUNT == request.serviceName) {
                    responseM.size = body.size;
                  }
                  else {
                    responseM.size = objMs.length;
                  }
                  
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.ULINKPLAN == request.functionName) {
            if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let uLinkPlanModels: Array<ULinkPlanModel> = body.datas;
    
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = uLinkPlanModels;
                  responseM.size = uLinkPlanModels.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.ULINKPLAN == request.functionName) {
            if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let uLinkPlanModels: Array<ULinkPlanModel> = body.datas;
    
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = uLinkPlanModels;
                  responseM.size = uLinkPlanModels.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PROSPECTULINKEXPERIENCE == request.functionName) {
            if (mode == 1 || mode == 2) {
              this.commonApi.callRestServiceTLPrompt(request).then(
                (res) => {
                  let body: any = res;
                  let obj: Array<Object> = body.datas;
    
                  let responseM: ResponseModel = new ResponseModel();
                  responseM.data = obj;
                  responseM.size = obj.length;
                  responseM.status = 0;
    
                  resolve(responseM);
                },
                (err) => {
                  reject(err);
                }
              );
            }
            else {
              reject("Mode not correct.");
            }
          }
          else if (FunctionName.PRENAME == request.functionName) {

            if (this.responsePrenameCache != undefined && this.responsePrenameCache != null) {
              console.log('FunctionName.PRENAME use cache.');
              resolve(this.responsePrenameCache);
            }
            else {
              console.log('FunctionName.PRENAME not use cache.');
              if (mode == 0) {
                this.apiDbProvider.prenameService(request).then(
                  (res) => {
                    console.log('FunctionName.PRENAME not use cache. res = ', res);
                    this.responsePrenameCache = res;
                    resolve(res);
                  },
                  (err) => {
                    reject(err);
                  }
                );
              }   
              else if (mode == 1 || mode == 2) { 
                this.commonApi.callRestServiceTLPrompt(request).then(
                  (res) => {
                    let body: any = res;
                    let objMs: Array<any> = body.datas;
                    let responseM: ResponseModel = new ResponseModel();
                    responseM.data = objMs;
                    if (ServiceName.COUNT == request.serviceName) {
                      responseM.size = body.size;
                    }
                    else {
                      responseM.size = objMs.length;
                    }
                    
                    responseM.status = 0;

                    this.responsePrenameCache = responseM;
      
                    resolve(responseM);
                  },
                  (err) => {
                    reject(err);
                  }
                );
              }
              else {
                reject("Mode not correct.");
              }
            }

           
          }
          else {
            this.commonApi.callRestServiceTLPrompt(request).then(
              (res) => {
                let body: any = res;
                let objMs: Array<any> = body.datas;
                let responseM: ResponseModel = new ResponseModel();
                responseM.data = objMs;
                if (ServiceName.COUNT == request.serviceName) {
                  responseM.size = body.size;
                }
                else {
                  if (objMs != undefined) {
                    responseM.size = objMs.length; 
                  }
                  else {
                    responseM.size = 0; 
                  }
                }
                
                responseM.status = 0;
  
                resolve(responseM);
              },
              (err) => {
                reject(err);
              }
            );
          }

        });
        //console.log("callData : mode = " + mode);

      });
    });
  }

  public fetchURLImageBlob(agentID: string) {
    return new Promise((resolve, reject) => {
      this.httpImg.request('https://da.thailife.com/getpic.php?pic=' + agentID)
      //this.httpImg.request('http://da.thailife.com:8080/CaOperation/rest/public/agentpic/' + agentID)
        .subscribe(res => {
          //console.log(res.text()) 
          resolve(res.text());
        }, (err) => {
          reject(err);
        })
    });
  }

  /**
   * โหมดการทำงาน
   * 0: mini mode app
   * 1: full mode app
   * 2: website
   */
  private tlpromptMode: number = 2;
  /**
   * ดึงโหมด
   */
  public getTLPromptMode(): number {
    return this.tlpromptMode;
  }
  /**
   * บันทึกโหมด
   * @param mode 
   */
  public setTLPromptMode(mode?: number): void {
    if (typeof mode != 'undefined')
      this.tlpromptMode = mode;
    else {
      this.storage.get('tlpromptMode').then(mode => {
        if (typeof mode != 'undefined')
          this.tlpromptMode = mode;
      });
    }
  }
} 
