import { QuotationRiderService } from './../quotationrider/quotationrider-service';
import {PopupSynchronizeComponent} from '../../components/utility/popup-synchronize/popup-synchronize';
import {CommonUtilProvider} from '../common-util/common-util';
import { ApplicationModel } from './../application/application-model';
import { FunctionName } from './../constants/function-name';
import { ApplicationSessionM } from './../applicationsession/application-session-model';
import { ResponseModel } from './../model/response-model';
import { ApiDbProvider } from './../api-db/api-db';
import { ApiProvider } from './../api/api';
import {ModalController, Modal, ModalOptions, Platform} from 'ionic-angular';
import { RequestModel } from '../model/request-model';
import { ServiceName } from '../constants/service-name';
import { ProspectModel } from '../prospect/prospect-model';
import { Storage } from '@ionic/storage';
import { DateUtil } from '../utility/date-util';
import { LoggerProvider } from '../logger/logger-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { SQLiteHandle } from '../utility/sqlite-handle';

/*
  Generated class for the SynchronizeTlpromptProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SynchronizeTlpromptProvider {

  constructor( 
    public http: Http, 
    public platform: Platform,
    public apiProvider: ApiProvider,
    public apiDbProvider: ApiDbProvider,
    public storage: Storage, 
    public loggerProvider: LoggerProvider,
    public commonApi: CommonUtilProvider,
    private modalCtrl: ModalController,
    private network: Network) {

  }

  deviceRefNo: string = '';

  public initialTimerLoadScreen() {

    SQLiteHandle.isOnLoadScreenSync = true;

     let opts: ModalOptions = {
          enableBackdropDismiss: false,
          cssClass: 'synchronize'
    } 
    opts.enableBackdropDismiss = false;
    let modal: Modal = this.modalCtrl.create(PopupSynchronizeComponent, null, opts);
    modal.present();
    
  }

  public startSync() {

    //console.log("------------ startSync -------------");

    SQLiteHandle.isOnLoadScreenSync = false;
    SQLiteHandle.isDoneSync = false;
    SQLiteHandle.recordBeWrite = 0;
    SQLiteHandle.recordTotalSize = 0;

    //SQLiteState.start();  

    return new Promise((resolve, reject) => {
   
    if (!this.platform.is('core') && !this.platform.is('mobileweb') && this.network.type != 'none') {
        let agentID: any = "";
        

        this.storage.get('loginProfile').then(profile => {
            if (profile.agentid != null && profile.agentid != "") {
                return Promise.resolve(profile.agentid);
            }
            else {
                throw new Error("Agent ID is null.");
            }
        }).then(
            (res) => {
                agentID = res;
                //Find last sync date time.
                let appSessM: ApplicationSessionM = new ApplicationSessionM();
                appSessM.agentid = agentID;

                let reqM: RequestModel = new RequestModel();
                reqM.param = appSessM;
                reqM.serviceName = ServiceName.SELECT;
                this.apiDbProvider.applicationSessionService(reqM).then(
                    (res) => {
                        let obj: any = res;
                        let resObj: ResponseModel = obj;
                        if (resObj.status == 0 && resObj.size > 0) {
                            let lastsync: string = resObj.data[0].lastsync;
                            this.deviceRefNo = resObj.data[0].deviceRefNo;


                            return Promise.resolve(lastsync);
                        }
                        else {
                            return Promise.resolve("");
                        }
                    },
                    (err) => {
                        console.log("ERRROR = " + err);  
                        throw new Error(err);
                    }
                ).then(
                    async (res) => {
                        let lastsync: any = '';
                        if (res != null && res != "null")
                            lastsync = res;

                        //console.log("deviceRefNo = " + this.deviceRefNo + ", agentID = " + agentID + ", lastsync = " + lastsync);
                        
                        if (lastsync == '' || lastsync == undefined) {
                            //console.log('This is first time for sync on mobile.');

                            /**
                             * 1. Select from prospect.
                             */
                            let prospectReqM: RequestModel = new RequestModel();
                            prospectReqM.param = [];
                            prospectReqM.serviceName = ServiceName.SYNC_UP;
                            prospectReqM.functionName = FunctionName.POSPECT;
                            prospectReqM.agentid = agentID;
                            prospectReqM.lastsync = lastsync;
                            prospectReqM.searchkey = this.deviceRefNo;

                            let respectResponse: any = await this.commonApi.callRestServiceTLPrompt(prospectReqM);
                            let prospectMs: Array<any> = respectResponse.datas;
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + prospectMs.length);

                            /**
                             * 2. Select from quotation.
                             */
                            let quotationReqM: RequestModel = new RequestModel(); 
                            quotationReqM.functionName = FunctionName.QUOTATION;
                            quotationReqM.serviceName = ServiceName.SYNC_UP;
                            quotationReqM.agentid = agentID;
                            quotationReqM.lastsync = lastsync;
                            quotationReqM.param = [];
                            quotationReqM.searchkey = this.deviceRefNo;

                            let quotationResponse: any = await this.commonApi.callRestServiceTLPrompt(quotationReqM);
                            let quotationMs: Array<any> = quotationResponse.datas;
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + quotationMs.length);
                            
                            if (prospectMs.length > 0 || quotationMs.length > 0) {
                                
                                if (!SQLiteHandle.isOnLoadScreenSync) 
                                    this.initialTimerLoadScreen();
                            }

                            /**
                             * 3. Select from quotation rider.
                             */
                            let quotationRiderReqM: RequestModel = new RequestModel(); 
                            quotationRiderReqM.functionName = FunctionName.QUOTATIONRIDER;
                            quotationRiderReqM.serviceName = ServiceName.SYNC_UP;
                            quotationRiderReqM.agentid = agentID;
                            quotationRiderReqM.lastsync = lastsync;
                            quotationRiderReqM.param = [];
                            quotationRiderReqM.searchkey = this.deviceRefNo;

                            let quotationRiderResponse: any = await this.commonApi.callRestServiceTLPrompt(quotationRiderReqM);
                            let quotationRiderMs: Array<any> = quotationRiderResponse.datas;
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + quotationRiderMs.length);

                            /**
                             * 4. Select from quotation guarddian.
                             */

                            let quotationGuarDReqM: RequestModel = new RequestModel(); 
                            quotationGuarDReqM.functionName = FunctionName.QUOTATIONGUARDIAN;
                            quotationGuarDReqM.serviceName = ServiceName.SYNC_UP;
                            quotationGuarDReqM.agentid = agentID;
                            quotationGuarDReqM.lastsync = lastsync;
                            quotationGuarDReqM.param = [];
                            quotationGuarDReqM.searchkey = this.deviceRefNo;

                            let quotationGuarDResponse: any = await this.commonApi.callRestServiceTLPrompt(quotationGuarDReqM);
                            let quotationGuarDMs: Array<any> = quotationGuarDResponse.datas;
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + quotationGuarDMs.length);

                            /**
                             Insert into SQLite.
                             */
                            let reqM: RequestModel = new RequestModel();
                            reqM.param = prospectMs;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.lastsync = lastsync;
                            reqM.syncMode = true;
                            reqM.agentid = agentID;
                            reqM.searchkey = lastsync == '' || lastsync == undefined ? '1' : '';
                            await this.apiDbProvider.prospectService(reqM);

                            reqM = new RequestModel(); 
                            reqM.functionName = FunctionName.QUOTATION;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = quotationMs;
                            reqM.agentid = agentID;
                            reqM.searchkey = lastsync == '' || lastsync == undefined ? '1' : '';
                            await this.apiDbProvider.quotationService(reqM);

                            reqM = new RequestModel(); 
                            reqM.functionName = FunctionName.QUOTATIONRIDER;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = quotationRiderMs;
                            reqM.agentid = agentID;
                            reqM.searchkey = lastsync == '' || lastsync == undefined ? '1' : '';
                            await this.apiDbProvider.quotationRiderService(reqM);

                            reqM = new RequestModel(); 
                            reqM.functionName = FunctionName.QUOTATIONGUARDIAN;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = quotationGuarDMs;
                            reqM.agentid = agentID;
                            reqM.searchkey = lastsync == '' || lastsync == undefined ? '1' : '';
                            await this.apiDbProvider.quotationGuardianService(reqM);
                        }
                        else {

                            await this.syncProspect(agentID, lastsync).then(
                                (res) => {
                                    return Promise.resolve();
                                },
                                (err) => {
                                    return Promise.resolve();
                                }
                            ).then(
                                async (res) => {

                                    await this.syncQuotation(agentID, lastsync).then(
                                        (res) => {
                                            return Promise.resolve();
                                        },
                                        (err) => {
                                            return Promise.resolve();
                                        }
                                    ).then(
                                        async (res) => { 
                                            await this.syncQuotationRider(agentID, lastsync).then(
                                                (res) => {
                                                    return Promise.resolve();
                                                },
                                                (err) => {
                                                    return Promise.resolve();
                                                }
                                            );
                    
                                            await this.syncQuotationGuardian(agentID, lastsync).then(
                                                (res) => {
                                                    return Promise.resolve();
                                                },
                                                (err) => {
                                                    return Promise.resolve();
                                                }
                                            );
                                        }
                                    );

                                }
                            );
                        }
                        
                        /** */
                        await this.syncProvinceService(agentID, lastsync);

                        await this.syncDistrictService(agentID, lastsync);

                        await this.syncSubDistrictService(agentID, lastsync);

                        await this.syncApplication(agentID, lastsync);

                        await this.syncActionlog(agentID, lastsync).then(
                            (res) => {
                                this.loggerProvider.deleteActionLog().then((res) => {
                                    return Promise.resolve();
                                }, (err) => {
                                    return Promise.resolve();
                                });
                            },
                            (err) => {
                                return Promise.resolve();
                            }
                        );

                        await this.syncLoginlog(agentID, lastsync).then(
                            (res) => {
                                this.loggerProvider.deleteLoginLog().then((res) => {
                                    return Promise.resolve();
                                }, (err) => {
                                    return Promise.resolve();
                                });
                            },
                            (err) => {
                                return Promise.resolve();
                            }
                        );
                         
                        await this.syncPrenameService(agentID, lastsync);
                        await this.syncPlanDetailService(agentID, lastsync);
                        await this.syncStepSumAssureService(agentID, lastsync);
                        await this.syncSumrateoService(agentID, lastsync);
                        await this.syncPremiumPackageService(agentID, lastsync);
                        await this.syncPackageDetailService(agentID, lastsync);
                        await this.syncParateService(agentID, lastsync);
                        await this.syncTaxConditionService(agentID, lastsync);
                        await this.syncTaxFixrateService(agentID, lastsync); 
                        await this.syncTaxSumConditionService(agentID, lastsync);
                        await this.syncFeeService(agentID, lastsync);
                        await this.syncPackageCoverageService(agentID, lastsync);
                        await this.syncPackageCoverage2Service(agentID, lastsync);
                        await this.syncHealthService(agentID, lastsync);
                        await this.syncPlanTypeService(agentID);
                        await this.syncPlanTypeDetailService(agentID);
                        await this.syncFavoritePlanService(agentID);
                        await this.topplanService(agentID);
                        await this.syncCoupontableService(agentID);
                        await this.syncMaturetableService(agentID);
                        await this.syncUpApplicationSession(agentID, lastsync);
                        await this.syncTaxFormulaService(agentID, lastsync);

                        await this.initialTlPlan(agentID);
                         
                        this.updateLastSyncAppSession(agentID);

                        SQLiteHandle.isDoneSync = true;
                        resolve();
                    },
                    (err) => {
                        console.log("ERRROR = " + err);
                    }
                   
                );
            },
            (err) => {
                console.log("ERRROR = " + err);
            }
            );
        }
        else {
            resolve();
        }
     });

    }

    syncProspect(agentID: string, lastsync: string) {

        return new Promise((resolve, reject) => {
            let prospectModel: ProspectModel = new ProspectModel();
            prospectModel.agentID = agentID;
            prospectModel.customerID = "";

            let prospectModels: ProspectModel[] = [];
            prospectModels.push(prospectModel);

            let resM: RequestModel = new RequestModel();
            resM.param = prospectModels;
            resM.agentid = agentID;
            resM.syncMode = true;
            resM.lastsync = lastsync;
            resM.serviceName = ServiceName.SELECT; 
            this.apiDbProvider.prospectService(resM).then(
                (res) => {

                    let obj: any = res;
                    let resProspect: ResponseModel = obj;
                    if (resProspect.status == 0) {

                        if (resProspect.size > 0 && !SQLiteHandle.isOnLoadScreenSync)
                            this.initialTimerLoadScreen();
                        
                        let reqM = new RequestModel();
                        reqM.param = resProspect.data;
                        reqM.serviceName = ServiceName.SYNC_UP;
                        reqM.functionName = FunctionName.POSPECT;
                        reqM.agentid = agentID;
                        reqM.lastsync = lastsync;
                        reqM.searchkey = this.deviceRefNo;

                        this.commonApi.callRestServiceTLPrompt(reqM).then(
                            (res) => {
                                let body: any = res;
                                let objs: Array<any> = body.datas;
                
                                if (objs.length > 0) {

                                    if (!SQLiteHandle.isOnLoadScreenSync) 
                                        this.initialTimerLoadScreen();

                                    SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
                                
                                    let reqM: RequestModel = new RequestModel();
                                    reqM.param = objs;
                                    reqM.serviceName = ServiceName.INSERT;
                                    reqM.lastsync = lastsync;
                                    reqM.syncMode = true;
                                    reqM.agentid = agentID;
                                    reqM.searchkey = lastsync == '' || lastsync == undefined ? '1' : '';
                                    this.apiDbProvider.prospectService(reqM).then(
                                        (res) => {
                                            resolve();
                                        }
                                    );
                                } 
                                else {
                                    resolve();
                                }
                        },
                        (err) => {
                            reject(err);
                        }
                    );
                }
                
            }, (err) => {
                console.log(err);
                reject(err);
            });
        });
    }

    syncQuotation(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.QUOTATION;
            reqM.serviceName = ServiceName.SELECT;
            reqM.agentid = agentID;
            reqM.lastsync = lastsync; 
            reqM.syncMode = true; 

            //1. Select data from SQLite. 
            this.apiDbProvider.quotationService(reqM).then(
                (res) => {
                   
                    let objM: any = res;
                    let objResp: ResponseModel = objM;

                    if (objResp.size > 0 && !SQLiteHandle.isOnLoadScreenSync)
                        this.initialTimerLoadScreen();

                    return Promise.resolve(objResp.data);
                }, (err) => {
                    console.log(err);
                }

            ).then(
                (res) => {

                    reqM = new RequestModel(); 
                    reqM.functionName = FunctionName.QUOTATION;
                    reqM.serviceName = ServiceName.SYNC_UP;
                    reqM.agentid = agentID;
                    reqM.lastsync = lastsync;
                    reqM.param = res;
                    reqM.searchkey = this.deviceRefNo;

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {

                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                if (!SQLiteHandle.isOnLoadScreenSync)
                                    this.initialTimerLoadScreen();

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);

                                reqM = new RequestModel(); 
                                reqM.functionName = FunctionName.QUOTATION;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                reqM.searchkey = lastsync == '' || lastsync == undefined ? '1' : '';
                                
                                this.apiDbProvider.quotationService(reqM).then(
                                    async (res) => {

                                        let reqDelRiderM: RequestModel = new RequestModel(); 
                                        reqDelRiderM.functionName = FunctionName.QUOTATIONRIDER;
                                        reqDelRiderM.serviceName = ServiceName.DELETE;
                                        reqDelRiderM.param = objs;
                                        reqDelRiderM.agentid = agentID;
                                        reqDelRiderM.searchkey = 'DELETE_BY_QUOTATIONNO';
                                        await this.apiDbProvider.quotationRiderService(reqDelRiderM);

                                        resolve(res);
                                    },
                                    (err) => {
                                        console.log(err);
                                        reject(err);
                                    }
                                );
                            } 
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            reject(err);
                        }
                        
                    );
                }
                , (err) => {
                    console.log(err);
                    reject(err);
                }
            )
        });
    }

    syncQuotationRider(agentID: string, lastsync: string) {

        return new Promise((resolve, reject) => {
            
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.QUOTATIONRIDER;
            reqM.serviceName = ServiceName.SELECT;
            reqM.agentid = agentID;
            reqM.lastsync = lastsync; 
            reqM.syncMode = true;

            this.apiDbProvider.quotationRiderService(reqM).then(
                (res) => {
                    let objM: any = res;
                    let objResp: ResponseModel = objM;
                    return Promise.resolve(objResp.data);
                }, (err) => {
                    console.log(err);
                }
            ).then(
                (res) => {

                    reqM = new RequestModel(); 
                    reqM.functionName = FunctionName.QUOTATIONRIDER;
                    reqM.serviceName = ServiceName.SYNC_UP;
                    reqM.agentid = agentID;
                    reqM.lastsync = lastsync;
                    reqM.param = res;
                    reqM.searchkey = this.deviceRefNo;

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {

                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                if (!SQLiteHandle.isOnLoadScreenSync) 
                                    this.initialTimerLoadScreen();

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);

                                reqM = new RequestModel(); 
                                reqM.functionName = FunctionName.QUOTATIONRIDER;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                reqM.searchkey = lastsync == '' || lastsync == undefined ? '1' : '';
        
                                //3. Insert data Quatation to SQLite.
                                this.apiDbProvider.quotationRiderService(reqM).then(
                                    (res) => {
                                        resolve();
                                    },
                                    (err) => {
                                        console.log(err);
                                        reject();
                                    }
                                );
                            } 
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            reject(err);
                        }
                        );

                        /** -- **/
                }
                , (err) => {
                    console.log(err);
                }
            )
        });
    }

    syncQuotationGuardian(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.QUOTATIONGUARDIAN;
            reqM.serviceName = ServiceName.SELECT;
            reqM.agentid = agentID;
            reqM.lastsync = lastsync; 
            reqM.syncMode = true;

            //1. Select data from SQLite. 
            this.apiDbProvider.quotationGuardianService(reqM).then(
                (res) => {
                    let objM: any = res;
                    let objResp: ResponseModel = objM;
                    return Promise.resolve(objResp.data);
                }, (err) => {
                    console.log(err);
                }
            ).then(
                (res) => {

                    reqM = new RequestModel(); 
                    reqM.functionName = FunctionName.QUOTATIONGUARDIAN;
                    reqM.serviceName = ServiceName.SYNC_UP;
                    reqM.agentid = agentID;
                    reqM.lastsync = lastsync; 
                    reqM.param = res;
                    reqM.searchkey = this.deviceRefNo;

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {

                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                if (!SQLiteHandle.isOnLoadScreenSync) 
                                    this.initialTimerLoadScreen();

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);

                                reqM = new RequestModel(); 
                                reqM.functionName = FunctionName.QUOTATIONGUARDIAN;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
        
                                //3. Insert data Quatation to SQLite.
                                this.apiDbProvider.quotationGuardianService(reqM).then(
                                    (res) => {
                                        resolve();
                                    },
                                    (err) => {
                                        console.log(err);
                                        reject();
                                    }
                                );
                            } 
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            reject(err);
                        }
                        );

                        /** -- **/
                }
                , (err) => {
                    console.log(err);
                }
            ).then(
                (res) => {

                }
                , (err) => {
                    console.log(err);
                }
            );
        });
    }

    syncApplication(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            
            let applicationM: ApplicationModel = new ApplicationModel();
            let applicationMs: Array<ApplicationModel> = [];
            applicationMs.push(applicationM);
            
            let reqM = new RequestModel();
            reqM.functionName = FunctionName.APPLICATION;
            reqM.serviceName = ServiceName.CREATE;
            reqM.agentid = agentID;
            reqM.syncMode = true;
            this.apiDbProvider.applicationService(reqM).then(
                (res) => {
                    resolve();
                },
                (err) => {
                    console.log("******************* Error syncApplication " + err);
                    reject();
                }
            );
            
            /*            
            this.apiProvider.callData(reqM).then(
                (res) => {
                    let obj: any = res;
                    let resM: ResponseModel = obj;
                    SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + resM.size);

                    if (resM.status == 0) {
                        let reqM = new RequestModel();
                        reqM.functionName = FunctionName.APPLICATION;
                        reqM.serviceName = ServiceName.INSERT;
                        reqM.agentid = agentID;
                        reqM.param = resM.data;
                        reqM.syncMode = true;
                        this.apiDbProvider.applicationService(reqM).then(
                            (res) => {
                                resolve();
                            },
                            (err) => {
                                console.log("******************* Error syncApplication " + err);
                                reject();
                            }
                        );
                    }
                }, (err) => {
                    console.log("******************* Error syncApplication " + err);
                    reject(err);
                });
                */
        });
    }

    syncActionlog(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            //Load data from tb_actionlog
            this.loggerProvider.execSQL().then((res)=> {
                let objM: any = res;
                let resM: ResponseModel = objM;
                if (resM != null && resM.size > 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.ACTIONLOG;
                    reqM.serviceName = ServiceName.INSERT;
                    reqM.agentid = agentID;
                    reqM.lastsync = lastsync;
                    reqM.param = resM.data;
                    reqM.syncMode = true;
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {
                            resolve(res);
                        }, (err) => {
                            console.log("******************* Error syncActionlog " + err);
                            reject(err);
                        });
                }
                else {
                    resolve();
                }
            }, (err) => {
                console.log("******************* Error syncActionlog " + err);
                reject(err);
            });
        });
    }

    syncLoginlog(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            //Load data from tb_loginlog
            this.loggerProvider.findAll().then((res)=> {
                let objM: any = res;
                let resM: ResponseModel = objM;
                if (resM != null && resM.size > 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.LOGINLOG;
                    reqM.serviceName = ServiceName.INSERT;
                    reqM.agentid = agentID;
                    reqM.lastsync = lastsync;
                    reqM.param = resM.data;
                    reqM.syncMode = true;
                    reqM.mode = 1;
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {
                            resolve(res);
                        }, (err) => {
                            console.log("******************* Error syncLoginlog " + err);
                            reject(err);
                        });
                }
                else {
                    reject("resM == null or resM.size = 0");
                }
            }, (err) => {
                console.log("******************* Error syncLoginlog " + err);
                reject(err);
            });
        });
    }

    syncUpApplicationSession(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let appSessionM: ApplicationSessionM = new ApplicationSessionM();
            appSessionM.agentid = agentID;

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.APPLICATION_SESSION;
            reqM.serviceName = ServiceName.SELECT;
            reqM.agentid = agentID;
            reqM.lastsync = lastsync;
            reqM.param = appSessionM;

            this.apiDbProvider.applicationSessionService(reqM).then((res) => {
                let objM: any = res;
                let resM: ResponseModel = objM;
                if (resM != null && resM.size > 0) {
                    
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.APPLICATION_SESSION;
                    reqM.serviceName = ServiceName.INSERT;
                    reqM.agentid = agentID;
                    reqM.lastsync = lastsync;
                    reqM.param = resM.data;
                    reqM.syncMode = true;
                    reqM.mode = 1;

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {
                            //console.log("******************* Sync Up ApplicationSession successfully.");
                            resolve(res);
                        }, (err) => {
                            console.log("******************* Error ApplicationSession " + err);
                            reject(err);
                        });
                }
                else {
                    resolve(res);
                }
            }, (err) => {
                resolve();
            });
        });
    }

    syncPlanDetailService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PLAN_DETAIL;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.planDetailService(reqM).then( (res) => {
                
                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PLAN_DETAIL;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all"; 

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {
                            
                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
        
                                let reqM: RequestModel = new RequestModel();
                                reqM.functionName = FunctionName.PLAN_DETAIL;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                this.apiDbProvider.planDetailService(reqM).then(
                                    (res) => {
                                        resolve();
                                    },
                                    (err) => {
                                        console.log('Error : ', err);
                                        resolve();
                                    }
                                );
                            }
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            console.log('Error : ', err);
                            resolve();
                        }
                    );
                }
                else {
                    /**
                     * ลบข้อมูลเก่าทิ้งทั้งหมดแล้วดึงข้อมูลล่าสุดมาแทน
                     */
                    let reqDeleteM: RequestModel = new RequestModel();
                    reqDeleteM.functionName = FunctionName.PLAN_DETAIL;
                    reqDeleteM.serviceName = ServiceName.DELETE_ALL;
                    reqDeleteM.agentid = agentID;
                    this.apiDbProvider.planDetailService(reqDeleteM).then(
                        (res) => {

                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.PLAN_DETAIL;
                            reqM.serviceName = ServiceName.SELECT;
                            reqM.agentid = agentID;
                            reqM.searchkey = "all"; 

                            this.commonApi.callRestServiceTLPrompt(reqM).then(
                                (res) => {
                                    
                                    let body: any = res;
                                    let objs: Array<any> = body.datas;
                    
                                    if (objs != undefined && objs.length > 0) {

                                        SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
                
                                        let reqM: RequestModel = new RequestModel();
                                        reqM.functionName = FunctionName.PLAN_DETAIL;
                                        reqM.serviceName = ServiceName.INSERT;
                                        reqM.param = objs;
                                        reqM.agentid = agentID;
                                        this.apiDbProvider.planDetailService(reqM).then(
                                            (res) => {
                                                resolve();
                                            },
                                            (err) => {
                                                console.log('Error : ', err);
                                                resolve();
                                            }
                                        );
                                    }
                                    else {
                                        resolve();
                                    }
                                },
                                (err) => {
                                    console.log('Error : ', err);
                                    resolve();
                                }
                            );

                        },
                        (err) => {
                            console.log('Error : ', err);
                            resolve();
                        }
                    );
                }
            }, (err) => {
                console.log('Error : ', err);
                reject(err);
            });
        });
    }

    public syncStepSumAssureService(agentID: string, lastsync: string) { 
        return new Promise((resolve, reject) => {

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.STEP_SUMASSURE;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.stepSumAssureService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.STEP_SUMASSURE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.STEP_SUMASSURE;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.stepSumAssureService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    console.log(err);
                                    resolve();
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                        
                    },
                    (err) => {
                        console.log(err);
                        resolve();
                    }
                    );
                }
                else {
                    resolve();
                }

            }, (err) => {
                console.log(err);
                resolve();
            });
        });
    }   

    public updateLastSyncAppSession(agentID: string) {

        let appSessM: ApplicationSessionM = new ApplicationSessionM();
        appSessM.agentid = agentID;
        appSessM.lastsync = DateUtil.date2str(new Date());

        let reqM: RequestModel = new RequestModel();
        reqM.param = appSessM;
        reqM.serviceName = ServiceName.UPDATE;
        this.apiDbProvider.applicationSessionService(reqM).then((res) => {

        });
    }

    public syncSumrateoService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.SUMRATEO;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.sumrateoService(reqDeleteM).then(
                (res) => {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.SUMRATEO;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {
                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
                            
                                let reqM: RequestModel = new RequestModel();
                                reqM.functionName = FunctionName.SUMRATEO;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                this.apiDbProvider.sumrateoService(reqM).then(
                                    (res) => {
                                        resolve();
                                    },
                                    (err) => {
                                        console.log(err);
                                        resolve();
                                    }
                                );
                            }
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            console.log(err);
                            resolve();
                        }
                    );
                },
                (err) => {
                    console.log('Error : ', err);
                    resolve();
                }
            );
            
        });
    }

    public syncPremiumPackageService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.PREMIUM_PACKAGE;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.premiumPackageService(reqDeleteM).then(
                (res) => {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PREMIUM_PACKAGE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.PREMIUM_PACKAGE;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.premiumPackageService(reqM).then(
                                (res) => {
                                   resolve();
                                },
                                (err) => {
                                    console.log(err);
                                    resolve();
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log(err);
                        resolve();
                    }
                    );
                },
                (err) => {
                    console.log(err);
                    resolve();
                }
            );
        });
    }

    public syncPackageDetailService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.PACKAGE_DETAIL;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.packageDetailService(reqDeleteM).then(
                (res) => {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PACKAGE_DETAIL;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {
                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.PACKAGE_DETAIL;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.packageDetailService(reqM).then(
                                (res) => {
                                    resolve();
                                },
                                (err) => {
                                    console.log(JSON.stringify(err));
                                    resolve();
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log(JSON.stringify(err));
                        resolve();
                    }
                    );
                },
                (err) => {
                    console.log(JSON.stringify(err));
                    resolve();
                }
            );
        });
    }

    public syncParateService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.PARATE;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.parateService(reqDeleteM).then(
                (res) => {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PARATE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {

                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
        
                                let reqM: RequestModel = new RequestModel();
                                reqM.functionName = FunctionName.PARATE;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                this.apiDbProvider.parateService(reqM).then(
                                    (res) => {
                                        resolve();
                                    },
                                    (err) => {
                                        console.log(err);
                                        resolve();
                                    }
                                );
                            }
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            console.log(err);
                            resolve();
                        }
                    );
                },
                (err) => {
                    console.log(err);
                    resolve();
                }
            );
        });
    }

    public syncTaxConditionService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.TAX_CONDITION;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.taxConditionService(reqDeleteM).then(
                (res) => {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.TAX_CONDITION;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {
                            
                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
        
                                let reqM: RequestModel = new RequestModel();
                                reqM.functionName = FunctionName.TAX_CONDITION;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                this.apiDbProvider.taxConditionService(reqM).then(
                                    (res) => {
                                        resolve();
                                    },
                                    (err) => {
                                        console.log(err);
                                        resolve();
                                    }
                                );
                            }
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            console.log(err);
                            reject(err);
                        }
                    );
                },
                (err) => {
                    console.log(err);
                    resolve();
                }
            );
        });
    }

    public syncTaxFixrateService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.TAX_FIXRATE;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.taxFixrateService(reqDeleteM).then(
                (res) => {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.TAX_FIXRATE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {
                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {
                                
                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
        
                                let reqM: RequestModel = new RequestModel();
                                reqM.functionName = FunctionName.TAX_FIXRATE;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                this.apiDbProvider.taxFixrateService(reqM).then(
                                    (res) => {
                                        resolve();
                                    },
                                    (err) => {
                                        console.log(err);
                                        resolve();
                                    }
                                );
                            }
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            resolve();
                            console.log(err);
                        }
                    );
                },
                (err) => {
                    console.log(err);
                    reject();
                }
            );
        });
    }

    public syncTaxFormulaService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.TAX_FORMULA;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.taxFormulaService(reqDeleteM).then(
                (res) => {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.TAX_FORMULA;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {

                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
        
                                let reqM: RequestModel = new RequestModel();
                                reqM.functionName = FunctionName.TAX_FORMULA;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                this.apiDbProvider.taxFormulaService(reqM).then(
                                    (res) => {
                                        resolve(res);
                                    },
                                    (err) => {
                                        console.log(err);
                                        resolve();
                                    }
                                );
                            }
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            console.log(err);
                            resolve();
                        }
                    );
                },
                (err) => {
                    console.log(err);
                    resolve();
                }
            );
        });
    }

    public syncTaxSumConditionService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.TAX_SUMCONDITION;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.taxSumConditionService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.TAX_SUMCONDITION;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {
                        
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.TAX_SUMCONDITION;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.taxSumConditionService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                        else {
                            resolve(res); 
                        }

                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error taxSumConditionService " + err);
                reject(err);
            });
        });
    }

    syncFeeService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.FEE;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.feeService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.FEE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {
                        
                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.FEE;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.feeService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                        else {
                            resolve(res);
                        }
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncFeeService " + err);
                reject(err);
            });
        });
    }

    public syncPackageCoverageService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PACKAGE_COVERAGE;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.packageCoverageService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PACKAGE_COVERAGE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.PACKAGE_COVERAGE;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.packageCoverageService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                        else {
                            resolve(res);
                        }
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncPackageCoverageService " + err);
                reject(err);
            });
        });
    }

    syncPackageCoverage2Service(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PACKAGE_COVERAGE2;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.packageCoverage2Service(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PACKAGE_COVERAGE2;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                   this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {
                            
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.PACKAGE_COVERAGE2;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.packageCoverage2Service(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    console.log(err);
                                    reject(err);
                                }
                            );
                        }
                        else {
                            resolve(res);
                        }
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncPackageCoverage2Service " + err);
                reject(err);
            });
        });
    }

    syncHealthService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.HEALTH;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.healthService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.HEALTH;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                   
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.HEALTH;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.healthService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncPackageCoverage2Service " + err);
                reject(err);
            });
        });
    }

    syncPlanTypeService(agentID: string) { 
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PLANTYPE;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.planTypeService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PLANTYPE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.searchkey = "all";
                    
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {
                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.PLANTYPE;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.planTypeService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                       
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncPackageCoverage2Service " + err);
                reject(err);
            });
        });
    }

    syncPlanTypeDetailService(agentID: string) { 
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PLANTYPE_DETAIL;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.planTypeDetailService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                   
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PLANTYPE_DETAIL;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.searchkey = "all";
                    
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) { 

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.PLANTYPE_DETAIL;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.planTypeDetailService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                        else {
                            resolve();
                        }

                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncPackageCoverage2Service " + err);
                reject(err);
            });
        });
    }

    syncProvinceService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.GETPROVINCE;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.provinceService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != null && resM.size == 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.GETPROVINCE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.GETPROVINCE;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.provinceService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncPackageCoverage2Service " + err);
                reject(err);
            });
        });
    }

    syncDistrictService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.DISTRICT;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.districtService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.DISTRICT;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.DISTRICT;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.districtService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncPackageCoverage2Service " + err);
            });
        });
    }

    syncSubDistrictService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.SUBDISTRICT;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.subDistrictService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.SUBDISTRICT;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {
                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.SUBDISTRICT;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.subDistrictService(reqM).then(
                                (res) => {
                                    resolve(res);
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error syncPackageCoverage2Service " + err);
            });
        });
    }

    syncFavoritePlanService(agentID: string) {

        return new Promise((resolve, reject) => {

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.FAVORITE_PLAN;
            reqM.serviceName = ServiceName.SELECT;
            reqM.agentid = agentID;
            this.apiDbProvider.favoritePlanService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.FAVORITE_PLAN;
                    reqM.serviceName = ServiceName.SYNC_UP;
                    reqM.param = resM.data;
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {

                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {
                            
                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
        
                                let reqM: RequestModel = new RequestModel();
                                reqM.functionName = FunctionName.FAVORITE_PLAN;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                this.apiDbProvider.favoritePlanService(reqM).then(
                                    (res) => {
                                        resolve(res);
                                    },
                                    (err) => {
                                        reject(err);
                                    }
                                );
                            }
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            console.log(err);
                            reject(err);
                        }
                    );

            }, (err) => {
                console.log("******************* Error syncPackageCoverage2Service " + err);
                reject(err);
            });
        });
    }

    topplanService(agentID: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.TOPPLAN;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.topPlanService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.TOPPLAN;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";

                    /** -- **/
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                        (res) => {
                            let body: any = res;
                            let objs: Array<any> = body.datas;
            
                            if (objs != undefined && objs.length > 0) {

                                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
                            
                                let reqM: RequestModel = new RequestModel();
                                reqM.functionName = FunctionName.TOPPLAN;
                                reqM.serviceName = ServiceName.INSERT;
                                reqM.param = objs;
                                reqM.agentid = agentID;
                                this.apiDbProvider.topPlanService(reqM).then(
                                    (res) => {
                                        resolve(res);
                                    },
                                    (err) => {
                                        reject(err);
                                    }
                                );
                            } 
                            else {
                                resolve();
                            }
                        },
                        (err) => {
                            reject(err);
                        }
                        );

                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error topplanService " + err);
                reject(err);
            });
        });
    }

    groupplanService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.GROUPPLAN;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.groupPlanService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != null && resM.size == 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.GROUPPLAN;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    this.apiProvider.callData(reqM).then(
                    (res) => {

                        let objM: any = res;
                        let resM: ResponseModel = objM;

                        SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + resM.size);
    
                        let reqM: RequestModel = new RequestModel();
                        reqM.functionName = FunctionName.GROUPPLAN;
                        reqM.serviceName = ServiceName.INSERT;
                        reqM.param = resM.data;
                        reqM.agentid = agentID;
                        this.apiDbProvider.groupPlanService(reqM).then(
                            (res) => {
                                resolve(res);
                            },
                            (err) => {
                                reject(err);
                            }
                        );
                    },
                    (err) => {
                        console.log(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error groupplanService " + err);
            });
        });
    }

    groupplanDetailService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.GROUPPLAN_DETAIL;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.groupPlanDetailService(reqM).then((res) => {

                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != null && resM.size == 0) {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.GROUPPLAN_DETAIL;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    this.apiProvider.callData(reqM).then(
                    (res) => {

                        let objM: any = res;
                        let resM: ResponseModel = objM;

                        SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + resM.size);
    
                        let reqM: RequestModel = new RequestModel();
                        reqM.functionName = FunctionName.GROUPPLAN_DETAIL;
                        reqM.serviceName = ServiceName.INSERT;
                        reqM.param = resM.data;
                        reqM.agentid = agentID;
                        this.apiDbProvider.groupPlanDetailService(reqM).then(
                            (res) => {
                                resolve(res);
                            },
                            (err) => {
                                reject(err);
                            }
                        );
                    },
                    (err) => {
                        console.log(err);
                    }
                    );
                }
                else {
                    resolve(res);
                }

            }, (err) => {
                console.log("******************* Error groupplanService " + err);
            });
        });
    }

    public syncCoupontableService(agentID: string) { 
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.COUPONTABLE;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.couponTableService(reqDeleteM).then(
                (res) => {
                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.COUPONTABLE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;

                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);

                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.COUPONTABLE;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.couponTableService(reqM).then(
                                (res) => {
                                    resolve();
                                },
                                (err) => {
                                    console.log(err);
                                    resolve();
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log(err);
                        resolve();
                    }
                    );
                },
                (err) => {
                    console.log('Err : ', err);
                    resolve();
                }
            );
        });
    }

    syncMaturetableService(agentID: string) {
        return new Promise((resolve, reject) => {

            let reqDeleteM: RequestModel = new RequestModel();
            reqDeleteM.functionName = FunctionName.MATURETABLE;
            reqDeleteM.serviceName = ServiceName.DELETE_ALL;
            reqDeleteM.agentid = agentID;
            this.apiDbProvider.maturetableService(reqDeleteM).then(
                (res) => {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.MATURETABLE;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    reqM.searchkey = "all";
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {

                        let body: any = res;
                        let objs: Array<any> = body.datas;

                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
                        
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.MATURETABLE;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.maturetableService(reqM).then(
                                (res) => {
                                    resolve();
                                },
                                (err) => {
                                    console.log(err);
                                    resolve();
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log(err);
                        resolve();
                    }
                    );
                },
                (err) => {
                    console.log(err);
                    resolve();
                }
            );
        });
    }

    syncPrenameService(agentID: string, lastsync: string) {
        return new Promise((resolve, reject) => {

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PRENAME;
            reqM.serviceName = ServiceName.COUNT;
            reqM.agentid = agentID;
            this.apiDbProvider.prenameService(reqM).then( (res) => {
                
                let obj: any = res;
                let resM: ResponseModel = obj;

                if (resM != undefined && resM.size == 0) {

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.PRENAME;
                    reqM.serviceName = ServiceName.SELECT;
                    reqM.agentid = agentID;
                    this.commonApi.callRestServiceTLPrompt(reqM).then(
                    (res) => {
                        
                        let body: any = res;
                        let objs: Array<any> = body.datas;
        
                        if (objs != undefined && objs.length > 0) {

                            SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objs.length);
    
                            let reqM: RequestModel = new RequestModel();
                            reqM.functionName = FunctionName.PRENAME;
                            reqM.serviceName = ServiceName.INSERT;
                            reqM.param = objs;
                            reqM.agentid = agentID;
                            this.apiDbProvider.prenameService(reqM).then(
                                (res) => {
                                    resolve();
                                },
                                (err) => {
                                    console.log('Error : ', err);
                                    resolve();
                                }
                            );
                        }
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log('Error : ', err);
                        resolve();
                    }
                    );
                }
                else {
                    resolve();
                }
            }, (err) => {
                console.log('Error : ', err);
                reject(err);
            });
        });
    }
    //////////

    initialTlPlan(agentID: string) {
        return new Promise((resolve, reject) => {
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.TLPLAN;
            reqM.serviceName = ServiceName.CREATE;
            reqM.agentid = agentID;
            this.apiDbProvider.tlPlanService(reqM).then(
                (res) => {
                    resolve();
                },
                (err) => {
                    reject();
                }
            );
        });
    }

}


//