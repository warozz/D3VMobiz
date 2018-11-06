import { SQLite } from '@ionic-native/sqlite';
import { LoggerProvider } from '../logger/logger-service';
import { DistrictService } from './../address/district/district-service';
import { ApplicationService } from './../application/application-service';
import { RequestModel } from './../model/request-model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServiceName } from "../constants/service-name";
import { Platform } from 'ionic-angular'; 
import { PinLogService } from '../pinlog/pinlog-service';
import { ProspectService } from '../prospect/prospect-service';
import { ApplicationSessionService } from '../applicationsession/application-session-service';
import { TLPlanService } from '../tlplan/tlplan-service';
import { VersionService } from '../version/version-service';
import { AgentService } from '../agent/agent-service';
import { QuotationService } from '../quotation/quotation-service';
import { SubDistrictService } from '../address/sub-district/subdistrict-service';
import { ProvinceService } from '../address/province/province-service';
import { RiderService } from '../rider/rider-service';
import { RiderDetailService } from '../riderdetail/riderdetail-service';
import { PmrateService } from '../planprovide-table/pmrate/pmrate-service';
import { PackageDetailService } from '../planprovide-table/packagedetail/package-detail-service';
import { PremiumPackageService } from '../planprovide-table/premiumpackage/premiumpackage-service';
import { StepSumAssureService } from '../planprovide-table/stepsumassure/stepsumassure-service';
import { SumrateoService } from '../planprovide-table/sumrateo/sumrateo-service';
import { SumrateService } from '../planprovide-table/sumrate/sumrate-service';
import { PlanDetailService } from '../planprovide-table/plandetail/plandetail-service';
import { ParateService } from '../planprovide-table/parate/parate-service';
import { TaxConditionService } from '../planprovide-table/tax-condition/tax-condition-service';
import { TaxFixrateService } from '../planprovide-table/tax-fixrate/tax-fixrate-service';
import { TaxFormulaService } from '../planprovide-table/tax-formula/tax-formula-service';
import { PlanTypeService } from '../planprovide-table/plantype/plantype-service';
import { PlanTypeDetailService } from '../planprovide-table/plantype-detail/plantype-detail-service';
import { TaxSumConditionService } from '../planprovide-table/tax-sumcondition/tax-sumcondition-service';
import { FeeService } from '../planprovide-table/fee/fee-service';
import { PackageCoverageService } from '../planprovide-table/packagecoverage/package-coverage-service';
import { PackageCoverage2Service } from '../planprovide-table/packagecoverage2/package-coverage2-servicel';
import { PremiumRateService } from '../planprovide-table/premiumrate/premiumrate-service';
import { ChartService } from '../chart/chart-service';
import { HealthService } from '../health/health-service';
import { ExtendedService } from '../extended/extended-service';
import { CouponService } from '../coupon/coupon-service';
import { CoupontableService } from '../coupontable/coupontable-service';
import { MaturetableService } from '../maturetable/maturetable-service';
import { QuotationGuardianService } from '../quotationguardian/quotationguardian-service';
import { PlanRiderService } from '../planprovide-table/planrider/planrider-service';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { FavoritePlanService } from '../favoriteplan/favoriteplan-service';
import { QuotationRiderService } from '../quotationrider/quotationrider-service';
import { TopPlanService } from '../planprovide-table/topplan/topplan-service';
import { GroupPlanService } from '../planprovide-table/groupplan/groupplan-service';
import { GroupPlanDetailService } from '../planprovide-table/groupplandetail/groupplandetail-service';
import { PrenameMSerivce } from '../prename/prename-service';
 
/*
  Generated class for the ApiDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiDbProvider {

  constructor(
    public http: Http, 
    public platform: Platform, 
    public db: SQLite,
    public loggerProvider: LoggerProvider,
    public sqlitePorter: SQLitePorter) {
    
  }

  /**
   * Function for manage Table Version in SQLLite.
   * @param request Object data.
   */
  public versionService(request: RequestModel) {
    let serviceName = request.serviceName;
    let service: VersionService = new VersionService(this.platform, this.db);
    console.log("versionService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        //console.log("======> versionService : Version mobile device.");
        if (ServiceName.INSERT == serviceName) {
          service.insert(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE == serviceName) {
          service.update(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("versionService Service name not found.");
        }
      }
      else {
        console.log("======> versionService : Version web browser.");
        resolve();
      }

    });
  }

  /**
   * Function for manage Table Agent in SQLLite.
   * @param request Object data.
   */
  public agentService(request: RequestModel) {
    let serviceName = request.serviceName;
    let service: AgentService = new AgentService(this.platform, this.db);
    //console.log("AgentService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        console.log("======> agentService : Version mobile device.");
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE == serviceName) {
          service.update(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DROP == serviceName) {
          service.drop().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("agentService Service name not found.");
        }
      }
      else {
        console.log("======> agentService : Version web browser.");

        resolve();
      }
    });
  }

  public applicationSessionService(request: RequestModel) {
    let service: ApplicationSessionService = new ApplicationSessionService(this.platform, this.db);
    let serviceName = request.serviceName;
    //console.log("applicationSessionService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE == serviceName) {
          service.update(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.deleteAll().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DROP == serviceName) {
          service.drop().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("applicationSessionService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public tlPlanService(request: RequestModel) {
    let service: TLPlanService = new TLPlanService(this.platform, this.db);
    let serviceName = request.serviceName;
    //console.log("tlPlanService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE == serviceName) {
          service.update(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        } 
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.CREATE == serviceName) {
          service.createTable().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DROP == serviceName) {
          service.drop().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("tlPlanService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public pinLogService(request: RequestModel) {
    let service: PinLogService = new PinLogService(this.platform, this.db);
    let serviceName = request.serviceName;
    //console.log("pinLogService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DROP == serviceName) {
          service.drop().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("pinLogService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public prospectService(request: RequestModel) {
    let service: ProspectService = new ProspectService(this.platform, this.db);
    let serviceName = request.serviceName; 
    //console.log("prospectService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res); 
            },
            (err) => {
              reject(err);
            }
          );
        } 
        else if (ServiceName.UPDATE == serviceName) {

          if ('DUPLICATEPROSPECT' == request.searchkey) {
            service.updateDuplicate(request.param[0], "").then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
          else {
            service.update(request.param[0], "").then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param[0]).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          if ("SEARCH_BY" == request.searchkey) {
            service.searchBy(request).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
          else {
            service.search(request).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
        }
        else if (ServiceName.UPDATE_LASTSYNC == serviceName) {
          service.updateLastSync(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count(request.param, request.agentid).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DROP == serviceName) {
          service.drop().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("prospectService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public quotationService(request: RequestModel) {

    let service: QuotationService = new QuotationService(this.platform, this.db);
    let serviceName = request.serviceName;

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE == serviceName) {
          if ("REF_NO" == request.searchkey) {
            service.updateRefno(request.param[0]).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
          else {
            service.update(request.param[0]).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
         
        }
        else if (ServiceName.SELECT == serviceName) {
          if ("SEARCH_BY" == request.searchkey) {
            service.searchBy(request).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
          else {
            service.search(request).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE_LASTSYNC == serviceName) {
          service.updateLastSync().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DROP == serviceName) {
          service.drop().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject(" quotationService Service quatation name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public applicationService(request: RequestModel) { 
    let service: ApplicationService = new ApplicationService(this.platform, this.db);
    let serviceName = request.serviceName;
    //console.log("applicationService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE == serviceName) {
          service.update(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.CREATE == serviceName) {
          service.createTable().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject(" applicationService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public districtService(request: RequestModel) {
    let service: DistrictService = new DistrictService(this.platform, this.db , this.sqlitePorter);
    let serviceName = request.serviceName;
    //console.log("districtService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject(" districtService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public subDistrictService(request: RequestModel) {
    let service: SubDistrictService = new SubDistrictService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName;
    //console.log("SubDistrictService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("subDistrictService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public provinceService(request: RequestModel) { 
    let service: ProvinceService = new ProvinceService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName;
   //console.log("ProvinceService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
        
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("provinceService Service name not found.");
        }
      }
      else {
        resolve();
      }

    });
  }

  public planRiderService(request: RequestModel) {
    let service: PlanRiderService = new PlanRiderService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName;
    //console.log("PlanRiderService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("provinceService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public riderService(request: RequestModel) {
    let service: RiderService = new RiderService(this.platform, this.db);
    let serviceName = request.serviceName;
    //console.log("RiderService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.deleteAll().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("provinceService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public riderDetailService(request: RequestModel) {
    let service: RiderDetailService = new RiderDetailService(this.platform, this.db);
    let serviceName = request.serviceName;
    //console.log("riderDetailService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("riderDetailService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public planDetailService(request: RequestModel) {
    let service: PlanDetailService = new PlanDetailService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("PlanDetailService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          if ('GROUP' === request.searchkey) {
            service.searchByGroup(request.param).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
          else {
            service.search(request.param).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("planDetailService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public pmrateService(request: RequestModel) {
    let service: PmrateService = new PmrateService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("PmrateService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("pmrateService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public packageDetailService(request: RequestModel) {
    let service: PackageDetailService = new PackageDetailService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("PackageDetailService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("packageDetailService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public premiumPackageService(request: RequestModel) {
    let service: PremiumPackageService = new PremiumPackageService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("PremiumPackageService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("premiumPackageService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public stepSumAssureService(request: RequestModel) {
    let service: StepSumAssureService = new StepSumAssureService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("StepSumAssureService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("stepSumAssureService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public sumrateoService(request: RequestModel) {
    let service: SumrateoService = new SumrateoService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("SumrateoService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("sumrateoService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public sumrateService(request: RequestModel) {
    let service: SumrateService = new SumrateService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("SumrateService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then( 
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("sumrateService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public parateService(request: RequestModel) {
    let service: ParateService = new ParateService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("ParateService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("parateService Service name not found.");
        }
      }
      else {
        resolve();
      }

    });
  }

  public taxConditionService(request: RequestModel) {
    let service: TaxConditionService = new TaxConditionService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("TaxConditionService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("taxConditionService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public taxFixrateService(request: RequestModel) {
    let service: TaxFixrateService = new TaxFixrateService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("TaxFixrateService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("taxFixrateService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public taxFormulaService(request: RequestModel) {
    let service: TaxFormulaService = new TaxFormulaService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("TaxFormulaService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("taxFormulaService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public planTypeService(request: RequestModel) {
    let service: PlanTypeService = new PlanTypeService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("PlanTypeService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("planTypeService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public planTypeDetailService(request: RequestModel) {
    let service: PlanTypeDetailService = new PlanTypeDetailService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("PlanTypeDetailService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("planTypeDetailService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public taxSumConditionService(request: RequestModel) {
    let service: TaxSumConditionService = new TaxSumConditionService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
   // console.log("TaxSumConditionService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("taxSumConditionService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public feeService(request: RequestModel) {
    let service: FeeService = new FeeService(this.platform, this.db);
    let serviceName = request.serviceName; 
    //console.log("FeeService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("feeService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public packageCoverageService(request: RequestModel) {
    let service: PackageCoverageService = new PackageCoverageService(this.platform, this.db);
    let serviceName = request.serviceName; 
    //console.log("PackageCoverageService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("packageCoverageService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public packageCoverage2Service(request: RequestModel) {
    let service: PackageCoverage2Service = new PackageCoverage2Service(this.platform, this.db);
    let serviceName = request.serviceName; 
    //console.log("PackageCoverage2Service : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("packageCoverage2Service Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }
 
  public premiumRateService(request: RequestModel) {
    let service: PremiumRateService = new PremiumRateService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("PremiumRateService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("premiumRateService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public chartService(request: RequestModel) {
    let service: ChartService = new ChartService(this.platform, this.db);
    let searchmode = request.searchmode; 
    console.log("ChartService : searchmode = " + searchmode);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if ("GROUP01" == searchmode) {
          service.getDataGruop01(request).then(
            (res) => {
              resolve(res); 
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if ("GROUP02" == searchmode) {
          service.getDataGruop02(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if ("GROUP03" == searchmode) {
          service.getDataGruop03(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if ("GROUP04" == searchmode) {
          service.getDataGruop04(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("chartService Search mode not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public healthService(request: RequestModel) {
    let service: HealthService = new HealthService(this.platform, this.db);
    let serviceName = request.serviceName; 
    //console.log("HealthService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("healthService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public extendedService(request: RequestModel) {
    let service: ExtendedService = new ExtendedService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("ExtendedService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("extendedService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });

  }

  public couponService(request: RequestModel) {
    let service: CouponService = new CouponService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("CouponService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count(request).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("couponService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });

  }

  public couponTableService(request: RequestModel) {
    let service: CoupontableService = new CoupontableService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("CoupontableService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count(request).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("couponTableService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });

  }

  public maturetableService(request: RequestModel) {
    let service: MaturetableService = new MaturetableService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("MaturetableService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("maturetableService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });

  }

  public quotationGuardianService(request: RequestModel) {
    let service: QuotationGuardianService = new QuotationGuardianService(this.platform, this.db);
    let serviceName = request.serviceName; 
    //console.log("QuotationGuardianService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DROP == serviceName) {
          service.drop().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("quotationGuardianService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public favoritePlanService(request: RequestModel) {
    let service: FavoritePlanService = new FavoritePlanService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("FavoritePlanService : serviceName = " + serviceName + " >> " + JSON.stringify(request));

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        // else if (ServiceName.COUNT == serviceName) {
        //   service.count().then(
        //     (res) => { 
        //       resolve(res);
        //     },
        //     (err) => {
        //       reject(err);
        //     }
        //   );
        // }
        else {
          reject("favoritePlanService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });

  }  
      
  public quotationRiderService(request: RequestModel) {
    let service: QuotationRiderService = new QuotationRiderService(this.platform, this.db);
    let serviceName = request.serviceName; 
    //console.log("prospectService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res); 
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE == serviceName) {
          service.update(request.param[0], "").then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          if ('DELETE_BY_QUOTATIONNO' == request.searchkey) {
            service.deleteByQuoNo(request.param).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
          else {
            service.delete(request.param[0]).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.UPDATE_LASTSYNC == serviceName) {
          service.updateLastSync(request.param).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DROP == serviceName) {
          service.drop().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("quotationRiderService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public topPlanService(request: RequestModel) {
    let service: TopPlanService = new TopPlanService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    //console.log("TopPlanService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            } 
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("topPlanService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public groupPlanService(request: RequestModel) {
    let service: GroupPlanService = new GroupPlanService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    console.log("GroupPlanService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("groupPlanService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public groupPlanDetailService(request: RequestModel) {
    let service: GroupPlanDetailService = new GroupPlanDetailService(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 
    console.log("GroupPlanDetailService : serviceName = " + serviceName);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE == serviceName) {
          service.delete(request.param).then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("groupPlanDetailService Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public prenameService(request: RequestModel) {
    let service: PrenameMSerivce = new PrenameMSerivce(this.platform, this.db, this.sqlitePorter);
    let serviceName = request.serviceName; 

    return new Promise((resolve, reject) => {
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        if (ServiceName.INSERT == serviceName) {
          service.insert(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.SELECT == serviceName) {
          service.search(request).then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.DELETE_ALL == serviceName) {
          service.deleteAll().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else if (ServiceName.COUNT == serviceName) {
          service.count().then(
            (res) => { 
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
        else {
          reject("PrenameMSerivce Service name not found.");
        }
      }
      else {
        resolve();
      }
    });
  }

  public dropTable() {

    return new Promise(async (resolve, reject) => {

      let req: RequestModel = new RequestModel();
      req.serviceName = ServiceName.DROP;

      await this.agentService(req);
      await this.applicationSessionService(req);
      await this.prospectService(req);
      await this.quotationService(req);
      await this.quotationRiderService(req);

      await this.quotationGuardianService(req);
      await this.tlPlanService(req);
      await this.pinLogService(req);
      await this.loggerProvider.dropActionLog();
      await this.loggerProvider.dropLoginlog();

      resolve(resolve);
    });
  }

}