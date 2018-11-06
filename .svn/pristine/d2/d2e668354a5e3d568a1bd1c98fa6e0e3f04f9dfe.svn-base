import { async } from 'rxjs/scheduler/async';
import {SQLiteHandle} from '../../providers/utility/sqlite-handle';
import { Subscription } from 'rxjs/Rx';
import {ConstantConfig} from '../../providers/utility/constant-config';
import { QuotationGuardianM } from './../../providers/quotationguardian/quotationguardian-model';
import { RequestModel } from './../../providers/model/request-model';
import { LoggerProvider } from './../../providers/logger/logger-service';
import { ApiProvider } from '../../providers/api/api';
import { Component } from '@angular/core';
import { Events, NavController, IonicPage } from 'ionic-angular';
import { Idle } from '@ng-idle/core';
import { Platform } from 'ionic-angular/platform/platform';
import { Storage } from '@ionic/storage';
import { FunctionName } from '../../providers/constants/function-name';
import { ServiceName } from '../../providers/constants/service-name';
import { QuotationModel } from '../../providers/quotation/quotation-model';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { ResponseModel } from '../../providers/model/response-model';
import { MCAapplicationsM } from '../../providers/service-table/mcaapplications-model';
import { ApplicationData } from '../../providers/application/application-data';
import { ProspectModel } from '../../providers/prospect/prospect-model';
import { QuotationRiderM } from '../../providers/quotationrider/quotationrider-model';
import { CalculateAgeUtil } from '../../providers/utility/calculate-age-util';
import { RiderConfig } from '../../providers/rider/rider-config';

@IonicPage({
  segment: 'หน้าแรก'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appGender: string;
  appAge: string;
  appFullName: string;
  mapGender = { M : 'ชาย', F: 'หญิง' };
  gender: string;
  age: string;
  fullName: string = '';
  quotationMs = [];
  applicationMs = [];
  
  quotationDraftM: any;
  applicationDraftM: any;

  doughnutChartLabels = ['ผู้มุ่งหวัง','ลูกค้า'];
  doughnutChartData = [0,0];
  doughnutChartColor = [{ backgroundColor:['#307FC5','#D82A31']}];
  doughnutChartOption = {
    responsive: true,
    pieceLabel: {
      render: 'percentage',
      fontColor: 'white',
      precision: 2
    } 
  }

  barChartLabels = ['','','','','','','','','','','',''];
  barChartData = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'ใบเสนอขาย' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'ใบคำขอ' }
  ];
  barChartColor = [
      { backgroundColor: ['#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE', '#6FC2FE'] },
      { backgroundColor: ['#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2', '#3581C2'] }
  ];

  isMiniMode: boolean = false;
  public subscription: Subscription;

  monthPeriod(date, month) {
    var temp = date;
    temp = new Date(date.getFullYear()-1, date.getMonth(), 1);
    temp.setMonth(temp.getMonth() + (month + 1));
    temp.setDate(temp.getDate() - 1); 

    if (date.getDate() < temp.getDate()) { 
        temp.setDate(date.getDate()); 
    }

    return temp;    
  }

  constructor(
    public navCtrl: NavController, 
    public events: Events, 
    public apiProvider: ApiProvider, 
    private log: LoggerProvider, 
    private idle: Idle, 
    private platform: Platform, 
    private storage: Storage,
    private loadingCtrl: LoadingDirective,
    private alertCtrl: AlertDirective,
    private appData: ApplicationData,
    private riderConfig: RiderConfig
  )  {

    this.riderConfig.initConfig();

    this.log.execSQL().then(
      (res)=> {
        console.log('execSQL : res ', res);
      },
      (err)=> {
        console.log('execSQL : err ', err);
      }
    );

    this.storage.get('tlpromptMode').then(async mode => {
        if (0 == Number(mode)) {
          this.isMiniMode = true;
          
          await this.searchDoughnutChart();
          await this.searchBarChart();
          await this.searchLast3Quotation(); 
          await this.searchDrafQuotation(); 
        }
        else {

          await this.searchDoughnutChart();
          await this.searchBarChart();
          await this.searchLast3Quotation();
          await this.searchDrafQuotation(); 

          await this.searchLast3Application();
          await this.searchDrafApplication();
        }
    });

    // เวลาที่ใช้งานล่าสุด
    let date = new Date();
    this.storage.set('lastActive', date.getTime());
 
    // ตรวจสอบการใช้งานแอปพลิเคชัน
    this.idle.watch();
    // หมดเวลาที่ไม่ได้ใช้งาน

    this.idle.onTimeout.subscribe(() => {
      // เว็บไซต์
      if (this.platform.is('core') || this.platform.is('mobileweb'))
        this.navCtrl.setRoot('LoginPage');
      // แอปพลิเคชัน
      else
        this.navCtrl.setRoot('PincodePage');
    });

  }

  /**
   * ดึงข้อมูลกราฟผู้มุ่งหวัง
   */
  async searchDoughnutChart() {
    return new Promise((resolve,reject) => {

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.CHART;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "GROUP1";
      reqM.searchmode = "GROUP01";
      reqM.param = [];

      this.apiProvider.callData(reqM).then(
        (res : JSON) => {

          let data = res['data'];
          if (data != undefined && data.length > 0) {
            this.doughnutChartData = [data[0].prospectAmt, data[0].customerAmt];
            resolve();
          }
          else {
            resolve();
          }
        },
        (err) => {
          console.log('searchDoughnutChart : err ', err);
          reject(err)
        }
      );

    });
  }

  /**
   * ดึงข้อมูลกราฟใบเสนอขาย
   */
  async searchBarChart() {
    return new Promise((resolve,reject) => {

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.CHART;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "GROUP2";
      reqM.searchmode = "GROUP02";
      reqM.param = [];

      this.apiProvider.callData(reqM).then(
        (res : JSON) => {
          let data = res['data'];
          if(data != undefined && data.length > 0){
            for(let i = 0; i < 12; i++){
              this.barChartLabels[i] = data[0].barChartLabels[i];
            }
            this.barChartData = data[0].barChartDatas;

            resolve();
          }
          else {
            resolve();
          }
        },
        (err) => {
          console.log(err);
          reject(err)
        }
      );

    });
  }

  async searchLast3Quotation() {
    return new Promise((resolve, reject) => {

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.CHART;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "GROUP3";
      reqM.searchmode = "GROUP03";
      reqM.param = [];

      this.quotationMs = [];
      this.apiProvider.callData(reqM).then(
        (res) => {
          //console.log("quotationMs ", JSON.stringify(res)); 
          let data:any = res['data'];

          if (res['data'] != undefined && res['data'].length > 0) {
          
            let qou = res['data'][0].quotationMs;
            for (let i = 0; i < qou.length; i++) {
              this.quotationMs[i] = { 
                "no" : (i+1)
                ,"name" : (qou[i].pname == undefined || qou[i].pname == null ? "" : qou[i].pname) + " " + qou[i].fname+" "+qou[i].lname
                ,"planname" : qou[i].planname
                ,"lifesum" : this.getCurrency(qou[i].lifesum)
                ,"packageno" : qou[i].packageno
                ,"referenceno" : qou[i].referenceno == undefined || qou[i].referenceno.trim().length == 0 ? "-" : qou[i].referenceno
                ,"date" : this.dateFormat(qou[i].createdatetime)
                ,"quotationno" : qou[i].quotationno
                ,"customerid" : qou[i].customerid
                ,"disabled" : qou[i].disabled
              };
            }
            // this.quotationMs = data[0].quotationMs;

            resolve();
          }
        
        },
        (err) => {
          console.log('Error : ',err);
          reject();
        }
      );

    });
  }

  searchLast3Application() {
    return new Promise((resolve, reject) => {

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.CHART;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "GROUP4";
      reqM.searchmode = "GROUP04";
      reqM.param = [];

      this.apiProvider.callData(reqM).then(
        (res : JSON) => {
        //console.log("applicationMs ",res);

          let data = res['data'];
          if(data != undefined && data.length > 0){
            this.applicationMs = [];
            let app = data[0].applicationMs;
            
            for(let i = 0; i < app.length; i++){

              let applicationstatus: string;
              if ("01" == app[i].applicationstatus) {
                applicationstatus = "กำลังดำเนินการ";
              }
              else if ("02" == app[i].applicationstatus) {
                applicationstatus = "พิจารณาแล้ว";
              }
              else if ("03" == app[i].applicationstatus) {
                applicationstatus = "จ่ายเงินสำเร็จแล้ว";
              }
              else if ("04" == app[i].applicationstatus) {
                applicationstatus = "ส่งใบคำขอสำเร็จ";
              }
              else {
                applicationstatus = "ใบคำขอใหม่";
              }

              let lifesum: string = '';
              let planname: string = '';
              let packageno: string = '';
              if (app[i].quotationM != undefined) {
                planname = app[i].quotationM.planname;
                lifesum = app[i].quotationM.lifesum;
                packageno = app[i].quotationM.packageno;
              }

              this.applicationMs[i] = {
                "no" : (i+1)
                ,"idcard" : " idcard"
                ,"name" : app[i].title + " " + app[i].name + " " +app[i].lastname
                ,"packageno" : packageno
                ,"lifesum" :  this.getCurrency(lifesum)
                ,"date" :  this.dateFormat(app[i].updatedate)
                ,"appid" : app[i].applicationidDisplay
                ,"applicationno" : app[i].applicationno
                ,"applicationstatus" : applicationstatus
                ,"smart" : "ไม่มี"
                ,"customerid" : app[i].customerid
                ,"quotationno" : app[i].quotationno
                ,"planname" : planname
                ,"isexpire" : app[i].isexpire
                ,"smartcaseflag" : app[i].smartcaseflag
              };
            }
          }

          resolve();
        },
        (err) => {
          console.log('Error : ', err);
          reject();
        }
      );

    });
  }
  private dateFormat(datetime : string) : string{
    let date : string = "";
    if(datetime.length >= 10){
      let tmp = datetime.substring(0, 10);
      let yyyy = tmp.substring(0,4);
      let mm = tmp.substring(5,7);
      let dd = tmp.substring(8,10);
      let year = Number.parseInt(yyyy, 10);
      date = dd+"/"+mm+"/"+(year+543);
    }
    return date;
  }
  private getCurrency(amount: string) : string{
    //console.log(amount);
    if(amount == undefined || amount.trim().length == 0){
      return "0";
    }
    // let num = Number.parseInt(amount, 10);
    let index = amount.indexOf(".");

    let num = amount;
    let nn = "";
    if(index > -1){
      num = amount.substring(0, index);
      nn = amount.substring(index);
    }
    let nnum = "";
    let count = 0;
    for(let i = num.length-1; i >=0; i--){
      if(count == 3){
        nnum = ","+nnum;
        count = 0;
      }
      nnum = num.substring(i, i+1)+nnum;
      count++;
    }
    return nnum+nn;
  }

  searchDrafQuotation(val?) {
    return new Promise((resolve, reject) => {

      let objM: QuotationModel = new QuotationModel();
          objM.publishstatus = "D";

      let objMs: Array<QuotationModel> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
          reqM.searchkey = "DRAFT";
          reqM.functionName = FunctionName.QUOTATION;
          reqM.serviceName = ServiceName.SELECT;
          reqM.param = objMs;
      let loading = this.loadingCtrl.scopePresent();
      this.apiProvider.callData(reqM).then(
        (res) => {

          this.loadingCtrl.scopeDismiss(loading);

          if (res['status'] == 0 && res['data'].length > 0) {
            
            this.fullName =`${res['data'][0].pname} ${res['data'][0].fname} ${res['data'][0].lname}`;
            this.age = res['data'][0].prospectM.age;
            this.gender = this.mapGender[res['data'][0].prospectM.gender];
            this.quotationDraftM = res['data'][0];
          }
        
          resolve();
        },
          (err) => {
            this.loadingCtrl.scopeDismiss(loading);
            this.alertCtrl.error(err);
            console.log('searchDrafQuotation Error : ', err);
            reject();
          }
      );

    });
  }

  searchDrafApplication(val?) {
    return new Promise((resolve, reject) => {

      let objM: MCAapplicationsM = new MCAapplicationsM();
    
      let objMs: Array<MCAapplicationsM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.MCAAPPLICATIONS;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "DRAFT";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then( 
        (res) => {
          if(res['data'] && res['data'].length > 0) {
            this.appFullName = `${res['data'][0].title} ${res['data'][0].name} ${res['data'][0].lastname}`;
            this.appAge = CalculateAgeUtil.calculateAge(new Date(res['data'][0].birthdate.replace(' ', 'T'))); 
            
            this.appGender = this.mapGender[res['data'][0].gender];
            this.applicationDraftM = res['data'][0];
          }

          resolve();
        },
        (err) => {
          reject();
          console.log(' searchDrafApplication Error : ', err);
        }
      );

    });
  }

  private createApplication(quatation?: QuotationModel) {
    this.loadingCtrl.present();

    let objM: QuotationModel = new QuotationModel();
      objM.customerid = quatation.customerid; // agenid
      objM.quotationno = quatation.quotationno;
  
      let objMs: Array<QuotationModel> = [];
      objMs.push(objM);
  
      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.QUOTATION;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = objMs;
      this.apiProvider.callData(reqM).then(
        (res) => {
          let obj :any = res;
          let resModel :ResponseModel = obj;
  
          if(resModel.size > 0 && resModel.data.length > 0){
            // console.log('createApplication Call Quatation', resModel.data[0]);
            this.appData.setQuotation(resModel.data[0]).then(
              (res)=> {
                this.navCtrl.push('AppApplicationPage').then(() => {
                  this.loadingCtrl.dismiss();
                }); 
              },
              (err)=> {
                this.loadingCtrl.dismiss();
                this.alertCtrl.error(err);
              }
            );
           
          }
          else {
            this.loadingCtrl.dismiss();
          }
  
        },
        (err) => {
          this.loadingCtrl.dismiss();
          this.alertCtrl.error(err);
        }
      );
  }

  saveDrafQuotation(item) {

    if (item.disabled == true)
      return false;

    this.navCtrl.push('QuatationPage',
      {
        'homeToQuatation' : 
        {
          'prospect' : item.prospectM, 
          'quotation' : item, 
          'quotationrider' : item.quotationRiderMs,
          'quatationGuardian' : item.quotationGuardianMs
        } 
      }
    );
  }

  saveDrafApplication(item) {
    
    if (item.isexpire == true)
      return false;

    let quotationM: QuotationModel = new QuotationModel();
    quotationM.customerid = item.customerid;
    quotationM.quotationno = item.quotationno;

    this.createApplication(quotationM);
  }

  /**
   * ดูข้อมูลใบเสนอขายที่บันทึกล่าสุด 3 อันดับแรก
   */
  async openLatestSaveQuotation(item: any) {
    
    if (!item.disabled) {
      this.loadingCtrl.present();

      let quotationM: QuotationModel = new QuotationModel();
      quotationM.customerid = item.customerid;
      quotationM.quotationno = item.quotationno;

      let quotationMs: Array<QuotationModel> = [];
      quotationMs.push(quotationM);
      
      let requestM: RequestModel = new RequestModel();
      requestM.functionName = FunctionName.QUOTATION;
      requestM.serviceName = ServiceName.SELECT;
      requestM.param = quotationMs;

     this.storage.get('tlpromptMode').then(async mode => {
      if (mode == 0) { 
        let quotattionRes = await this.apiProvider.callData(requestM);
        //console.log("xxxx quotattionRes = ", quotattionRes);
  
        /**
         * Search prospect.
         */
        let prospectM: ProspectModel = new ProspectModel();
        prospectM.customerID = item.customerid;
  
        let prospectMs: Array<ProspectModel> = [];
        prospectMs.push(prospectM);
        
        let reqProspect: RequestModel = new RequestModel();
        reqProspect.functionName = FunctionName.POSPECT;
        reqProspect.serviceName = ServiceName.SELECT;
        reqProspect.param = prospectMs;
        reqProspect.searchkey = "SEARCH_BY";

        let prospectRes: any = await this.apiProvider.callData(reqProspect);
        //console.log("xxxx prospectRes = ", prospectRes);

         /**
         * Search quotationRider.
         */
        let quotationRiderM: QuotationRiderM = new QuotationRiderM();
        quotationRiderM.customerid = item.customerid;
        quotationRiderM.quotationno = item.quotationno;
       
        let quotationRiderMs: Array<QuotationRiderM> = [];
        quotationRiderMs.push(quotationRiderM);

        let reqQuotationRider: RequestModel = new RequestModel();
        reqQuotationRider.functionName = FunctionName.QUOTATIONRIDER;
        reqQuotationRider.serviceName = ServiceName.SELECT;
        reqQuotationRider.param = quotationRiderMs;

        let quotationRiderRes: any = await this.apiProvider.callData(reqQuotationRider);
        //console.log("xxxx quotationRiderRes = ", quotationRiderRes);

        /**
         * Search quatationGuardian. 
         */
        let quotationGuardianM: QuotationGuardianM = new QuotationGuardianM();
        quotationGuardianM.customerid = item.customerid;
        quotationGuardianM.quotationno = item.quotationno;

        let quotationGuardianMs: Array<QuotationGuardianM> = [];
        quotationGuardianMs.push(quotationGuardianM);

        let reqQuotationGuardianM: RequestModel = new RequestModel();
        reqQuotationGuardianM.functionName = FunctionName.QUOTATIONGUARDIAN;
        reqQuotationGuardianM.serviceName = ServiceName.SELECT;
        reqQuotationGuardianM.param = quotationGuardianMs;

        let quotationGuardianRes: any = await this.apiProvider.callData(reqQuotationGuardianM);
        //console.log("xxxx quotationGuardianRes = ", quotationGuardianRes);

        
        if (quotattionRes["data"].length > 0) {

          //console.log('quotattionRes["data"]----->', quotattionRes["data"] );

          const typeapp = quotattionRes["data"][0]["typeapp"];

          // Edit page Universal Life
          if(typeapp === 'UL'){
            this.navCtrl.setRoot('InvestmentPage',
              {
                'prospect' :  prospectRes["data"][0],
                'quotationUniversalLife' : quotattionRes["data"][0], 
                'quotationriderUniversalLife' : quotationRiderRes["data"],
                'quatationGuardianUniversalLife' : quotationGuardianRes["data"],
                'editDataUniversalLife': true 
              }
            ).then(() => {this.loadingCtrl.dismiss();});
          }else if(typeapp === 'ULink'){
            this.navCtrl.setRoot('InvestmentPage',
              {
                'prospect' :  prospectRes["data"][0],
                'quotationUnitLink' : quotattionRes["data"][0], 
                'quotationriderUnitLink' : quotationRiderRes["data"],
                'quatationGuardianUnitLink' : quotationGuardianRes["data"],
                'editDataUnitLink': true 
              }
            ).then(() => {this.loadingCtrl.dismiss();});
          }else {
            this.navCtrl.push('QuatationPage',
              {
                'homeToQuatation' : 
                {
                  'prospect' : prospectRes["data"][0], 
                  'quotation' : quotattionRes["data"][0], 
                  'quotationrider' : quotationRiderRes["data"],
                  'quatationGuardian' : quotationGuardianRes["data"]
                } 
              }
            ).then(() => {
              this.loadingCtrl.dismiss();
            });
          }
        }
      }
      else {
        this.apiProvider.callData(requestM).then(
        (res)=> {
          
          if (res["data"].length > 0) {

            //console.log('res["data"]----->', res["data"] );

            const typeapp = res["data"][0]["typeapp"];

            // Edit page Universal Life
            if(typeapp === 'UL'){
              this.navCtrl.setRoot('InvestmentPage',
                {
                  'prospect' : res["data"][0].prospectM,
                  'quotationUniversalLife' : res["data"][0], 
                  'quotationriderUniversalLife' : res["data"][0].quotationRiderMs,
                  'quatationGuardianUniversalLife' : res["data"][0].quotationGuardianMs,
                  'editDataUniversalLife': true 
                }
              ).then(() => {this.loadingCtrl.dismiss();});
            }else if(typeapp === 'ULink'){
              this.navCtrl.setRoot('InvestmentPage',
                {
                  'prospect' : res["data"][0].prospectM,
                  'quotationUnitLink' : res["data"][0], 
                  'quotationriderUnitLink' : res["data"][0].quotationRiderMs,
                  'quatationGuardianUnitLink' : res["data"][0].quotationGuardianMs,
                  'editDataUnitLink': true 
                }
              ).then(() => {this.loadingCtrl.dismiss();});
            }else {
              this.navCtrl.push('QuatationPage',
              {
                'homeToQuatation' : 
                {
                  'prospect' : res["data"][0].prospectM, 
                  'quotation' : res["data"][0], 
                  'quotationrider' : res["data"][0].quotationRiderMs,
                  'quatationGuardian' : res["data"][0].quotationGuardianMs
                } 
              }
              ).then(() => {
                this.loadingCtrl.dismiss();
              });  
            }
          }
        },
        (err)=> {
          this.loadingCtrl.dismiss();
          this.alertCtrl.error(err);
        }); 
      }
    });
    }
  }

   /**
   * ดูข้อมูลใบคำขอที่บันทึกล่าสุด 3 อันดับแรก
   */
  public openLatestSaveApplication(item: any) {
    if (!item.isexpire) {
      this.loadingCtrl.present();
    }
    else {
      return false;
    }

    let objM: QuotationModel = new QuotationModel();
      objM.customerid = item.customerid;
      objM.quotationno = item.quotationno;

      let objMs: Array<QuotationModel> = [];
      objMs.push(objM);
      
      let requestM: RequestModel = new RequestModel();
      requestM.functionName = FunctionName.QUOTATION;
      requestM.serviceName = ServiceName.SELECT;
      requestM.param = objMs;
      this.apiProvider.callData(requestM).then(
        (res)=> {
          this.loadingCtrl.dismiss();
          if (res["data"].length > 0) {

            this.appData.setQuotation(res["data"][0]).then(
              (res)=> {
                this.navCtrl.push('AppApplicationPage').then(() => {
                }); 
              },
              (err)=> {
                this.alertCtrl.error(err);
              }
            );
          }
        },
        (err)=> {
          this.loadingCtrl.dismiss();
          this.alertCtrl.error(err);
        }
      );
  }

}
