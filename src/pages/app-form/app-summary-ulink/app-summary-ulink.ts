import { AlertDirective } from './../../../directives/extends/alert/alert';
import { ConstantConfig } from './../../../providers/utility/constant-config';
import { UnitlinkDataProvider } from './../../../providers/ulink-app-data/unitlink-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApplicationData } from '../../../providers/application/application-data';
import * as moment from 'moment';
import * as _ from 'lodash';
import { RequestModel } from '../../../providers/model/request-model';
import { ServiceName } from '../../../providers/constants/service-name';
import { FunctionName } from '../../../providers/constants/function-name';
import { CommonUtilProvider } from '../../../providers/common-util/common-util';
import { Storage } from "@ionic/storage";
import { ApiProvider } from '../../../providers/api/api';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { PreUWStatusM } from '../../../providers/model/pre-underwrite';
import { ConditionPreUnderwriteM } from '../../../providers/service-table/condition-uw-model';

@IonicPage({
  segment: 'สรุปข้อมูลคำขอเอาประกันยูนิตลิงค์'
})
@Component({
  selector: 'page-app-summary-ulink',
  templateUrl: 'app-summary-ulink.html',
})
export class AppSummaryUlinkPage {
  /**
   * ข้อมูลผู้เอาประกัน
   */
  private application = {
    insured: '',
    citizenID: '',
    gender: '',
    birthDate: '',
    age: '',
    planCode: '',
    planname: '',
    mode: ''
  };

  /**
   * Rider UA01
   */
  private ridersABD = {
    name: 'ABD',
    sum: '',
    premium: '0'
  }

  /**
   * Rider UA02
   */
  private riders = [];

  /**
   * All Fund
   */
  private allFund = []

  /**
   * Allocation
   */
  private allocation = [];
  private mapAllocation = [];

  /**
   * Show E-app botton
   */
  private isShowEappBtn: boolean = false;
  private isMobile: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private appData: ApplicationData,
    private appDataUlink: UnitlinkDataProvider,
    private commonUtilProvider: CommonUtilProvider,
    private storage: Storage,
    private loadingDirective: LoadingDirective,
    private alertCtrl: AlertDirective
    ) {
      console.log(this.appData);
      this.getQuotation(this.appData.quotation);
      this.getRiders(this.appData.quotation);
      this.getAllfund();
      this.getAllocation(this.appData.quotation.customerid);
      
      // ตรวจสอบก่อนเปิดให้เข้า E-app
      // wait for calling service
      if (this.checkMobilePlatform()) {
        this.appDataUlink.checkPreUW(this.appData.quotation).then(res => {
          let preUW: PreUWStatusM = new PreUWStatusM;
          preUW = {...preUW, ...res}
          if ( preUW.msgcode == 'Y') {
            this.isShowEappBtn = preUW.isPlanforEAPP === 'TRUE' && preUW.msgcode === 'Y'
            this.appData.setPreUWStatusM(preUW);
          } else {
            this.alertCtrl.warning(preUW.msg + ' ' + ConstantConfig.NB_APP_WARNING_N);
          }
        });
      }

  }
  /**
   * ข้อมูลคำขอเอาประกันภัย unitlink
   */
  private getQuotation(data){
    moment.locale('th');
    this.application.insured = data.pname+' '+data.fname+' '+data.lname;
    this.application.citizenID = data.citizenid;
    this.application.gender = data.gender === 'F' ? 'หญิง' : 'ชาย';
    this.application.birthDate = moment(data.birthdate).add(543, 'years').format("LL");
    this.application.age = data.insureage;
    this.application.planCode = data.plancode;
    this.application.planname = data.planname;
    switch(data.mode) {
      case '0':
        this.application.mode = 'รายเดือน';
        break;
      case '4':
        this.application.mode = 'ราย 3 เดือน';
        break;
      case '2':
        this.application.mode = 'ราย 6 เดือน';
        break;
      case '1':
        this.application.mode = 'รายปี';
        break;
      default:
        this.application.mode = 'ชำระครั้งเดียว';
    }
  }

  /**
   * map ค่า rider
   * @param data รับค่าจากใบเสนอขาย
   */
  private getRiders(data){
    if(data.plancode == 'UA01'){
      if(Number(data.lifesum) > 1000000){
        this.ridersABD.sum = '1000000';
      }else{
        this.ridersABD.sum = data.lifesum;
      }
      console.log("rider UA01-->",this.ridersABD);
    }else{
      let riderName = _.map(_.split(data.riders, ','), _.trim);
      let quotationRiderMs = data.quotationRiderMs;
      this.riders = _.map(quotationRiderMs, (item, index)=>{
        item.riderName = riderName[index];
        return item;
      });
      console.log("rider UA02-->",this.riders);
    }
  }

  /**
   * กองทุนทั้งหมด
   */
  private async getAllfund(){
    let reqModel: RequestModel = new RequestModel();
        reqModel.serviceName = ServiceName.SELECT;
        reqModel.functionName = FunctionName.ALLFUND;
        reqModel.param = [{ 'allfundid' : '1' }];
        await this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          (res: any) => {
            if(res.datas.length > 0){
              this.allFund = res.datas[0].allfund;
              console.log("allfund-->",this.allFund);
            }
          },
          (err) => {
            console.log(err);
          }
        );
  }

  /**
   * map ค่า allocate
   * @param customerId รหัสลูกค้า
   */
  private async getAllocation(customerId){
    this.loadingDirective.present();
    await this.storage.get("tlpromptMode").then(async mode => {
      await this.storage.get("loginProfile").then(async profile => {
        let reqModel: RequestModel = new RequestModel();
        reqModel.serviceName = ServiceName.SELECT;
        reqModel.functionName = FunctionName.ALLOCATE;
        reqModel.agentid = profile.agentid;
        reqModel.param = [{ "customerid" : customerId }];

       await this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          (res: any) => {
            this.loadingDirective.dismiss();
            if(res.datas.length > 0){
              this.allocation = res.datas[0].listDetail;
              console.log("allocation-->",this.allocation);
            }
          }
        );
      });
    });

    this.mapAllocation = _.map(this.allocation, (obj)=> {
      return _.assign(obj, _.find(this.allFund, {
        fundid: obj.fundcode
      }));
    });
    console.log("this.mapAllocation-->",this.mapAllocation);
  }

  /**
   * ตรวจสอบว่าเป็น mobile
   * @returns boolean
   */
  private checkMobilePlatform()
  {
    // force
    this.isMobile = true;
    return true;

    // if (this.platform.is('windows') || this.platform.is('core') || this.platform.is('mobileweb')) {
    //   this.isMobile = false;
    //   return false;
    // } else {
    //   this.isMobile = true;
    //   return true;
    // } 
  }
}
