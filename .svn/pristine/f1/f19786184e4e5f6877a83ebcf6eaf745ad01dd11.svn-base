import {PlanDetailM} from '../../../providers/planprovide-table/plandetail/plandetail-model';
import { ApiProvider } from './../../../providers/api/api';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { SettingPlanProvider } from '../../../providers/setting-plan/setting-plan';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { RequestModel } from '../../../providers/model/request-model';
import { FunctionName } from '../../../providers/constants/function-name';
import { ServiceName } from '../../../providers/constants/service-name';

/**
 * Generated class for the PopupNewUpdateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-plan-detail',
  templateUrl: 'popup-plan-detail.html'
})
export class PopupPlanDetailComponent implements OnInit {

  /**
   * เวอร์ชัน
   */
  private version: Array<object>;

  plancode: string = '';
  tlplanfull: any  ;
  tlplanshow: any ;
  dlplan: any ;
  attachdata : any ;
  
  ngOnInit(): void {
    this.getStart();
    
  }

  private async getStart(){
    await this.getAllPlanFromApi();
    this.plancode = this.params.get('plancode');
  }
  constructor(private viewCtrl: ViewController, 
    private http: Http, 
    private storage: Storage ,
    public planService: SettingPlanProvider,
    private alertCtrl: AlertDirective ,
    private params : NavParams,
    private apiProvider:ApiProvider) {

    //alert(params.get('plancode'));
    let planDetailM: PlanDetailM = new PlanDetailM();
    planDetailM.plancode = params.get('plancode');//Require = Y

    let planDetailMs: Array<PlanDetailM> = [];
    planDetailMs.push(planDetailM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PLAN_DETAIL;
    reqM.serviceName = ServiceName.SELECT;
    reqM.agentid = "00770198";
    reqM.param = planDetailMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        const obj: any = res 
        if(obj.status == 0 && obj.size > 0){
          const datavalue :string = obj.data[0].plandetail;
          this.attachdata = datavalue;
        }
        else
        this.attachdata = '';

       // this.version = obj;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss();
  }

  private async getAllPlanFromApi(){
    
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PLAN_DETAIL;
    reqM.serviceName = ServiceName.SELECT;
    reqM.agentid = "00770198";
    reqM.searchkey = "all";

    this.apiProvider.callData(reqM).then(
      (res) => {
        //console.log(JSON.stringify(res));
        const obj  : any  = res 
        if(obj.status == 0){
          this.dlplan = obj.data;
          //const datavalue :string = obj.data[0].plandetail;
          //this.attachdata = datavalue;
        }
       // this.version = obj;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private async selectPlan(){
    let planDetailM: PlanDetailM = new PlanDetailM();
    planDetailM.plancode =this.plancode;//Require = Y

    let planDetailMs: Array<PlanDetailM> = [];
    planDetailMs.push(planDetailM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PLAN_DETAIL;
    reqM.serviceName = ServiceName.SELECT;
    reqM.agentid = "00770198";
    reqM.param = planDetailMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        const obj  : any  = res 
        if(obj.status == 0 && obj.size > 0){
          const datavalue :string = obj.data[0].plandetail;
          this.attachdata = datavalue;
        }
        else{
          this.attachdata = "";
        }

       // this.version = obj;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
