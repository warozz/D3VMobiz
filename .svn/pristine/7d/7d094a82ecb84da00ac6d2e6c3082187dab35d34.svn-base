import { PremiumRateM } from './../../providers/planprovide-table/premiumrate/premiumrate-model';
import { SumrateService } from './../../providers/planprovide-table/sumrate/sumrate-service';
import { SettingPlanProvider } from './../../providers/setting-plan/setting-plan';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, Modal } from 'ionic-angular';
import { TLPlanService } from '../../providers/tlplan/tlplan-service';
import { RequestModel } from '../../providers/model/request-model';
import { FunctionName } from '../../providers/constants/function-name';
import { ServiceName } from '../../providers/constants/service-name';
import { TLPlanModel } from '../../providers/tlplan/tlplan-model';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { CommonUtilProvider } from '../../providers/common-util/common-util';
import { PmrateM } from '../../providers/planprovide-table/pmrate/pmrate-model';
import { ApiDbProvider } from '../../providers/api-db/api-db';
import { SumrateM } from '../../providers/planprovide-table/sumrate/sumrate-model';
import { PlanRiderModel } from '../../providers/planprovide-table/planrider/planrider-model';
import { ExtendedM } from '../../providers/extended/extended-model';
import { CouponM } from '../../providers/coupon/coupon-model';
import { Network } from '@ionic-native/network';
import { SQLiteHandle } from '../../providers/utility/sqlite-handle';
import { PopupSynchronizeComponent } from '../../components/utility/popup-synchronize/popup-synchronize';
import { LoadingDirective } from '../../directives/extends/loading/loading';


/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// class Port {
//   public id: number;
//   public name: string;
// }
@IonicPage({
  segment: 'ตั้งค่า'
})
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage implements OnInit{
  // ports: Port[];
  // port: Port;
  plans : TLPlanModel[];
  plan :TLPlanModel;
  plancode: string = '';
  tlplanfull: TLPlanModel[]  ;
  tlplanshow: TLPlanModel[] ;
  dlplan: TLPlanModel[] ;
  private online : boolean = true;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public planService: SettingPlanProvider, 
    private tlplanService: TLPlanService,
    private alertCtrl: AlertDirective,
    private commonApi: CommonUtilProvider,
    private apiDbProvider: ApiDbProvider,
    private network: Network,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingDirective) {
    
    //   this.ports = [
    //     { id: 1, name: 'Tokai' },
    //     { id: 2, name: 'Vladivostok' },
    //     { id: 3, name: 'Navlakhi' }
    // ];
          let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
           if(this.online)
           {
              alertCtrl.warning("กรุณาเชื่อมต่ออินเทอร์เน็ต เพื่อเลือกแบบประกัน");
              this.online = false;
           } 
            
          });

          // this.network.onConnect().subscribe(() => {
          //   this.online = true;
          //   if(typeof this.dlplan == 'undefined')
          //     this.getAllPlanFromApi();
          // })
          //this.getAllPlanFromApi();

    }

  ngOnInit(): void {
    //alert("---1---");
    this.getStart();
    
  }
  private async getStart(){
    await this.selectPlanFromDB();
    //alert("---2---");
    if (this.network.type === 'none') {
      this.online = false;
      this.alertCtrl.warning("กรุณาเชื่อมต่ออินเทอร์เน็ต เพื่อเลือกแบบประกัน");
    }
    else {
      this.online = true;
      await this.getAllPlanFromApi();
    }

    
    //alert("---3---");
    await this.filterDropDown();
    //alert("---4---");
    this.plancode = '';
  }

  private async getInState(){
    await this.selectPlanFromDB();
    await this.filterDropDown();
  }
  private async getAllPlanFromApi(){

    let reqModel:RequestModel = new RequestModel();
    reqModel.functionName = FunctionName.TLPLAN;
    reqModel.serviceName = ServiceName.SELECT;



    this.loadingCtrl.present();
    this.commonApi.callRestServiceTLPrompt(reqModel).then(
      res=>{ 
        let result: any = res;
        if(result.datas != null){
          this.tlplanfull = result.datas;
          this.dlplan =result.datas;
          //this.plans =result.datas;
          this.filterDropDown();
        }
        else{
         this.tlplanfull = [];
        }
        
        this.loadingCtrl.dismiss();
      },
      err => { 
        this.loadingCtrl.dismiss();
        this.alertCtrl.error(err);
      }
    );

    ///
    // await this.planService.getALLPlan().then(
    //   res=>{ 
    //     if(res.status.status == 'S'){
    //       this.tlplanfull = res.body.datas;
    //       this.dlplan = res.body.datas;
    //       this.filterDropDown();
    //     }
    //     else{
    //      this.tlplanfull = [];
    //     }
    //   },
    //   err => { this.alertCtrl.error(err);}
    // );
  }

  private async insertPlanCode(){
    
    //alert(JSON.stringify(this.plancode));
    if (this.plancode == '')
      return;

    if (this.network.type === 'none') {
      this.alertCtrl.warning("กรุณาเชื่อมต่ออินเทอร์เน็ต เพื่อเลือกแบบประกัน");
      return;
    }
    SQLiteHandle.recordBeWrite = 0;
    SQLiteHandle.recordTotalSize = 0;

    if(typeof(this.tlplanshow) !== 'undefined'){
      if(this.tlplanshow.length == 10){
        this.alertCtrl.warning('คุณได้เลือกแบบประกันครบ 10 แบบแล้ว');
        return;
      }
    }
    let data = this.tlplanfull.filter((item,index) => item.planCode === this.plancode);
    let requests  = new RequestModel;
    requests.param = data; 

    SQLiteHandle.recordTotalSize = Number(1);

    if (SQLiteHandle.recordTotalSize > 0) {

      SQLiteHandle.isOnLoadScreenSync = true;

      let opts: ModalOptions = {
        enableBackdropDismiss: false,
        cssClass: 'synchronize'
      }

      opts.enableBackdropDismiss = false;
      let modal: Modal = this.modalCtrl.create(PopupSynchronizeComponent, null, opts); 
      modal.present();
   }

    await this.tlplanService.insert(requests).then( 
      (res) => {

      }, (err) => {
        this.alertCtrl.error(err);
      }).then(
        (res) => {

          let objM : PmrateM = new PmrateM();
          objM.plancode = this.plancode;

          let objMs : Array<PmrateM> = [];
          objMs.push(objM);

          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.PMRATE;
          reqM.serviceName = ServiceName.SELECT;
          reqM.searchkey = "plancode";
          reqM.param = objMs;
          this.commonApi.callRestServiceTLPrompt(reqM).then(
            (res) => {
              let body: any = res;
              let objMs: Array<PmrateM> = body.datas;
              if (objMs != null && objMs.length > 0) {

                let reqM: RequestModel = new RequestModel();
                reqM.functionName = FunctionName.PMRATE;
                reqM.serviceName = ServiceName.INSERT;
                reqM.param = objMs;
                this.apiDbProvider.pmrateService(reqM); 
              }
              else {
                return Promise.resolve();
              }
            }, (err) => {
              console.log(err);
            });

        }, (err) => {
          console.log(err);
        }
      ).then(
        (res) => {

          let objM : PlanRiderModel = new PlanRiderModel();
          objM.plancode = this.plancode;

          let objMs : Array<PlanRiderModel> = [];
          objMs.push(objM);

          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.PLAN_RIDER;
          reqM.serviceName = ServiceName.SELECT;
          reqM.searchkey = "plancode";
          reqM.param = objMs;
          this.commonApi.callRestServiceTLPrompt(reqM).then(
            (res) => {
              let body: any = res;
              let objMs: Array<PlanRiderModel> = body.datas;
              if (objMs != null && objMs.length > 0) {

                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objMs.length);

                let reqM: RequestModel = new RequestModel();
                reqM.functionName = FunctionName.PLAN_RIDER;
                reqM.serviceName = ServiceName.INSERT;
                reqM.param = objMs;
                this.apiDbProvider.planRiderService(reqM);
              }
            }, (err) => {
              console.log(err);
            });

        }, (err) => {
          console.log(err);
        }
      ).then(
        (res) => {

          let objM : SumrateM = new SumrateM();
          objM.plancode = this.plancode;

          let objMs : Array<SumrateM> = [];
          objMs.push(objM);

          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.SUMRATE;
          reqM.serviceName = ServiceName.SELECT;
          reqM.searchkey = "plancode";
          reqM.param = objMs;
          this.commonApi.callRestServiceTLPrompt(reqM).then(
            (res) => {
              let body: any = res;
              let objMs: Array<SumrateM> = body.datas;
              if (objMs != null && objMs.length > 0) {

                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objMs.length);

                let reqM: RequestModel = new RequestModel();
                reqM.functionName = FunctionName.SUMRATE;
                reqM.serviceName = ServiceName.INSERT;
                reqM.param = objMs;
                this.apiDbProvider.sumrateService(reqM);
              }
            }, (err) => {
              console.log(err);
            });
        }
        , (err) => {
          console.log(err);
        }
      ).then(
        (res) => {

          let objM: ExtendedM = new ExtendedM();
          objM.plancode = this.plancode;//Require = Y
      
          let objMs: Array<ExtendedM> = [];
          objMs.push(objM);
      
          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.EXTENDED;
          reqM.serviceName = ServiceName.SELECT;
          reqM.searchkey = "plancode";
          reqM.param = objMs;

          this.commonApi.callRestServiceTLPrompt(reqM).then(
            (res) => {
              let body: any = res;
              let objMs: Array<any> = body.datas;
              if (objMs != null && objMs.length > 0) {

                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objMs.length);

                let reqM: RequestModel = new RequestModel();
                reqM.functionName = FunctionName.EXTENDED;
                reqM.serviceName = ServiceName.INSERT;
                reqM.param = objMs;
                this.apiDbProvider.extendedService(reqM);
              }
            }, (err) => {
              console.log(err);
            });

        }
        , (err) => {
          console.log(err);
        }
      ).then(
        (res) => {

          let objM: CouponM = new CouponM();
          objM.plancode = this.plancode;//Require = Y
      
          let objMs: Array<CouponM> = [];
          objMs.push(objM);
      
          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.COUPON;
          reqM.serviceName = ServiceName.SELECT;
          reqM.searchkey = "plancode";
          reqM.param = objMs;

          this.commonApi.callRestServiceTLPrompt(reqM).then(
            (res) => {
              let body: any = res;
              let objMs: Array<any> = body.datas;
              if (objMs != null && objMs.length > 0) {

                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objMs.length);

                let reqM: RequestModel = new RequestModel();
                reqM.functionName = FunctionName.COUPON;
                reqM.serviceName = ServiceName.INSERT;
                reqM.param = objMs;
                this.apiDbProvider.couponService(reqM);
              }
            }, (err) => {
              console.log(err);
            });
          
        }
        , (err) => {
          console.log(err);
        }

      ).then(
        (res) => {

          let objM: PremiumRateM = new PremiumRateM();
          objM.plancode = this.plancode;//Require = Y
      
          let objMs: Array<PremiumRateM> = [];
          objMs.push(objM);
      
          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.PREMIUMRATE;
          reqM.serviceName = ServiceName.SELECT;
          reqM.searchkey = "plancode";
          reqM.param = objMs;

          this.commonApi.callRestServiceTLPrompt(reqM).then(
            (res) => {
              let body: any = res;
              let objMs: Array<any> = body.datas;
              if (objMs != null && objMs.length > 0) {

                SQLiteHandle.recordTotalSize = Number(SQLiteHandle.recordTotalSize + objMs.length);

                let reqM: RequestModel = new RequestModel();
                reqM.functionName = FunctionName.PREMIUMRATE;
                reqM.serviceName = ServiceName.INSERT;
                reqM.param = objMs;
                this.apiDbProvider.premiumRateService(reqM);
              }
            }, (err) => {
              console.log(err);
            });

          SQLiteHandle.isDoneSync = true;
          //SQLiteHandle.recordTotalSize = 0;
          this.getInState();
          //this.alertCtrl.warning('บันทึกข้อมูลเรียบร้อย');
          this.plancode = '';
          this.plan = new TLPlanModel;
        }
        , (err) => {
          console.log(err);
        }
      );
  }

  private async selectPlanFromDB(){
    let plan = new TLPlanModel();
    let requests  = new RequestModel;
    requests.functionName = FunctionName.TLPLAN;
    requests.serviceName = ServiceName.SELECT;
    let tlplan :TLPlanModel = new TLPlanModel;
    await this.tlplanService.search(tlplan)
    .then(
      sr=> {
        let result : any = sr;
        this.tlplanshow = result.data;
      }
    );
  }

  private async filterDropDown(){
    if (this.tlplanfull != null && this.tlplanfull != undefined) {
      if (this.tlplanshow != null && this.tlplanshow != undefined) {
        this.dlplan  = this.tlplanfull.filter(a=>{
          return  this.tlplanshow.filter(b=>{
            return   b.planCode == a.planCode;
          }).length == 0
        })
      }
    }
  }

  private deletePlanCode(plancodedelete: string){

    if (this.network.type === 'none') {
      this.alertCtrl.warning("กรุณาเชื่อมต่ออินเทอร์เน็ต เพื่อลบแบบประกัน");
      return;
    }
    this.alertCtrl.confirm('คุณแน่ใจที่จะลบแบบประกันนี้').then(() => {

      let plan = new TLPlanModel();
      let requests  = new RequestModel;
      requests.mode = 1;
      requests.functionName = FunctionName.TLPLAN;
      requests.serviceName = ServiceName.DELETE;
      plan.planCode  = plancodedelete;
       this.tlplanService.delete(plan).then(
        sr=> {
          this.getStart();
        }).then(
          (res) => {

            let objM : PmrateM = new PmrateM();
            objM.plancode = plancodedelete;
  
            let objMs : Array<PmrateM> = [];
            objMs.push(objM);

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PMRATE;
            reqM.serviceName = ServiceName.DELETE;
            reqM.param = objMs;
            this.apiDbProvider.pmrateService(reqM);

          }, (err) => {
            console.log(err);
          }
        ).then(
          (res) => {

            let objM : PlanRiderModel = new PlanRiderModel();
            objM.plancode = plancodedelete;
  
            let objMs : Array<PlanRiderModel> = [];
            objMs.push(objM);

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PLAN_RIDER;
            reqM.serviceName = ServiceName.DELETE;
            reqM.param = objMs;
            this.apiDbProvider.planRiderService(reqM);

          }, (err) => {
            console.log(err);
          }
        ).then(
          (res) => {

            let objM : SumrateM = new SumrateM();
            objM.plancode = plancodedelete;
  
            let objMs : Array<SumrateM> = [];
            objMs.push(objM);

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.SUMRATE;
            reqM.serviceName = ServiceName.DELETE;
            reqM.param = objMs;
            this.apiDbProvider.sumrateService(reqM);

          }, (err) => {
            console.log(err);
          }
        ).then(
          (res) => {

            let objM : ExtendedM = new ExtendedM();
            objM.plancode = plancodedelete;
  
            let objMs : Array<ExtendedM> = [];
            objMs.push(objM); 

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.EXTENDED;
            reqM.serviceName = ServiceName.DELETE;
            reqM.param = objMs;
            this.apiDbProvider.extendedService(reqM);

          }, (err) => { 
            console.log(err);
          }
        ).then(
          (res) => {

            let objM : CouponM = new CouponM();
            objM.plancode = plancodedelete;
  
            let objMs : Array<CouponM> = [];
            objMs.push(objM); 

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.COUPON;
            reqM.serviceName = ServiceName.DELETE;
            reqM.param = objMs;
            this.apiDbProvider.couponService(reqM);

          }, (err) => { 
            console.log(err);
          }
        ).then(
          (res) => {

            let objM : PremiumRateM = new PremiumRateM();
            objM.plancode = plancodedelete;
  
            let objMs : Array<PremiumRateM> = [];
            objMs.push(objM); 

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PREMIUMRATE;
            reqM.serviceName = ServiceName.DELETE;
            reqM.param = objMs;
            this.apiDbProvider.premiumRateService(reqM);

          }, (err) => { 
            console.log(err);
          }
        );
    });
  }

}
