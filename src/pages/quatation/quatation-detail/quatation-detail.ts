import {ApiProvider} from '../../../providers/api/api';
import {ServiceName} from '../../../providers/constants/service-name';
import {FunctionName} from '../../../providers/constants/function-name';
import {RequestModel} from '../../../providers/model/request-model';
import {PlanDetailM} from '../../../providers/planprovide-table/plandetail/plandetail-model';
import { LoadingDirective } from './../../../directives/extends/loading/loading';
import { SettingPlanProvider } from './../../../providers/setting-plan/setting-plan';
import { async } from 'rxjs/scheduler/async';
import { PremiumCalProvider } from './../../../providers/utility/premium-cal';
import { Component, NgZone, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { RiderConfig } from '../../../providers/rider/rider-config';
import { DecimalPipe } from '@angular/common';
/**
 * Generated class for the QuatationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-quatation-detail',
  templateUrl: 'quatation-detail.html',
})
export class QuatationDetailPage implements OnDestroy {

  //private data = [{"9":"","1":"","4":"","2":"","0" :""}];
  private data =[];
  private data1 = [];
  private dlMode : any;
  private baseIncrementer :any;
  private rider : any ;
  private prospect : any;
  private choosePlan : string;
  private planSelected : any;
  private calType : number;
  private premium : string;
  private indexPremium : number = 0;
  private package : string = "1";
  private modeSelected :string ;
  private focus : string = "6";
  private title : string = "";
  private total : string = "0";
  private focusDetail : string ="";
  private oneTotal : string = "0";
  private threeTotal : string = "0";
  private sixTotal : string = "0";
  private yearTotal : string = "0";
  private singleTotal : string = "0";
  private planName: string;
  private viewCol: number = 2;

  private subscription: Array<Subscription> = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public broadcaster :Broadcaster, 
    private premCal: PremiumCalProvider,
    private planProvider :SettingPlanProvider,
    private ngZone : NgZone,
    private loading: LoadingDirective,
    private conf : RiderConfig,
    private dP : DecimalPipe,
    private apiProvider : ApiProvider,
  ) {
    this.subscription.push(this.broadcaster.on('quatationStep').subscribe(res => {
      let type :any = res ;
      if(type == 5){
        
    
        // this.broadcaster.on('rider').subscribe(res => {
        //   this.rider = res;
        //   console.log(this.rider);
        // });
    
        // this.broadcaster.on('prospect').subscribe(res => {
        //   this.prospect = res;
        //   console.log(this.prospect);
        // });
    
        // this.broadcaster.on('quatationPlan').subscribe(res => {
        //   this.choosePlan = res;
        // });
        this.data = [];
        this.getDetail();
      }


    }));

    // this.broadcaster.on('quatationDetail').subscribe(res => {
    //   this.qform = res;
    //   console.log(this.qform);
    // });
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
      //alert("555"+this.planSelected);
      this.planSelected = res;
      
    }));
    this.subscription.push(this.broadcaster.on('dlMode').subscribe(res => {
      this.dlMode = res;
    }));
    this.subscription.push(this.broadcaster.on('quatationSum').subscribe(res => {
      this.baseIncrementer = res;
    }));

    this.subscription.push(this.broadcaster.on('rider').subscribe(res => {
      this.rider = res;
    }));

    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
      this.prospect = res;
    }));

    this.subscription.push(this.broadcaster.on('quatationPlan').subscribe(res => {
      this.choosePlan = res;
    }));

    this.subscription.push(this.broadcaster.on('quatationPremium').subscribe(res => {
      this.premium = res;
    }));

    this.subscription.push(this.broadcaster.on('indexPremiumCalType').subscribe(res => {
      //for calType = 2
      this.indexPremium = res;
    }));
    
    
    this.subscription.push(this.broadcaster.on('quatationPackage').subscribe(res => {
      //for calType = 4,5
      this.package = (typeof(res) === undefined?"1":res);
    }));

    this.subscription.push(this.broadcaster.on('quatationMode').subscribe(res => {
      //for calType = 4,5
      this.modeSelected = res;
    }));

    // แบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
      this.planName = res[0].planName;
    }));
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }
  
 findFocus(){
   if(Number(this.modeSelected) == 0)
   return "3";
   else if(Number(this.modeSelected) == 4)
   return "4";
   else if(Number(this.modeSelected) == 2)
   return "5";
   else if(Number(this.modeSelected) == 1 || Number(this.modeSelected) == 9)
   return "6";
 }

 findFocusDetail(){
  if(Number(this.modeSelected) == 0)
  return "รายเดือน";
  else if(Number(this.modeSelected) == 4)
  return "ราย 3 เดือน";
  else if(Number(this.modeSelected) == 2)
  return "ราย 6 เดือน";
  else if(Number(this.modeSelected) == 1 || Number(this.modeSelected) == 9)
  return "รายปี";
}

public getNameDetailByFilter(json, key){
   let data: any = json.find(x => key === x.plancode);
   return data.name;
}

 async getDetail(){
    this.loading.present();
    this.focus = this.findFocus();
    this.focusDetail = this.findFocusDetail();
    this.data1 = [];
    this.title = this.planSelected[0].planName;
    this.calType = this.planSelected[0].calType;
    let singleTotal = 0;
        let yearTotal = 0;
        let threeTotal = 0;
        let sixTotal = 0;
        let oneTotal = 0;
    if(this.planSelected[0].calType == 1 ){
      let b = {sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"};
      b.sum = this.baseIncrementer;
      //this.data.push({sum:this.baseIncrementer});
      //   await this.dlMode.forEach(element => {
      //     if(element.value == '9')
      //       this.getLoop2(element).then(res=> {b.single = res; singleTotal = Number(b.single) + singleTotal});
      //     else if(element.value == '1')
      //       this.getLoop2(element).then(res=> {b.year = res;yearTotal = Number(b.year) + yearTotal});
      //     else if(element.value == '4')
      //       this.getLoop2(element).then(res=> {b.three = res;threeTotal = Number(b.three) + threeTotal});
      //     else if(element.value == '2')
      //       this.getLoop2(element).then(res=> {b.six = res;sixTotal = Number(b.six) + sixTotal});
      //     else if(element.value == '0')
      //       this.getLoop2(element).then(res=> {b.one = res;oneTotal = Number(b.one) + oneTotal});
      //   });
      //  this.data.push(b);
      await Promise.all(this.dlMode.map(async element => {
        //alert(element.value);
        if(element.value == '1' || element.value == '9') {
          let res = await this.getLoop2(element);
          b.year = res;
          yearTotal = Number(b.year) + yearTotal;
        } else if(element.value == '4') {
          let res = await this.getLoop2(element);
          b.three = res;
          threeTotal = Number(b.three) + threeTotal;
        } else if(element.value == '2') {
          let res = await this.getLoop2(element);
          b.six = res;
          sixTotal = Number(b.six) + sixTotal;
        } else if(element.value == '0') {
          let res = await this.getLoop2(element);
          b.one = res;
          oneTotal = Number(b.one) + oneTotal;
        } 
      }));
      this.data.push(b);
     if(typeof(this.rider) !== undefined ){
        
        //console.log("detail this.rider" + JSON.stringify(this.rider));
    
        let planDetailMs: Array<PlanDetailM> = [];

        for (let key in this.rider) {
          let planDetailM: PlanDetailM = new PlanDetailM();
          planDetailM.plancode = key;
          planDetailMs.push(planDetailM); 
        }
       
        let reqM: RequestModel = new RequestModel();
        reqM.functionName = FunctionName.PLAN_DETAIL;
        reqM.serviceName = ServiceName.SELECT;
        reqM.param = planDetailMs;
        reqM.searchkey = "GROUP";
        let res: any = await this.apiProvider.callData(reqM);
        let planDetailJson: any = res['data'];
        // this.loading.present();
        let haveKB2 = false;
        for(let key in this.rider){

          //console.log(key);
          if(key == 'AC01'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.AC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.AC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.AC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.AC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.AC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'AC02'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.AC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.AC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.AC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.AC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.AC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'KG1'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.KG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.KG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.KG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.KG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.KG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'AC03'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.AC03(0,Number(element.value),this.prospect.occupationType,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.AC03(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.AC03(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.AC03(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.AC03(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'KG2'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.KG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.KG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.KG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.KG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.KG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'RP'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.RP(Number(this.prospect.age),Number(element.value),Number(sum)).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.RP(Number(this.prospect.age),Number(element.value),Number(sum)).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.RP(Number(this.prospect.age),Number(element.value),Number(sum)).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.RP(Number(this.prospect.age),Number(element.value),Number(sum)).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.RP(Number(this.prospect.age),Number(element.value),Number(sum)).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == this.conf.rider('RPG')){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.RPG(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,Number(sum)).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.RPG(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,Number(sum)).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.RPG(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,Number(sum)).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.RPG(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,Number(sum)).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.RPG(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,Number(sum)).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'VP'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                
                  this.premCal.VP34678(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.VP34678(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.VP34678(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.VP34678(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.VP34678(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = 'วพ.'+sum;
              this.data1.push(c);
            }
          }
          else if(key == 'SR2'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                
                  this.premCal.SR2(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.SR2(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.SR2(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.SR2(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.SR2(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum+" หน่วย";
              this.data1.push(c);
            }
          }
          else if(key == 'TAC01'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.TAC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.TAC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.TAC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.TAC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.TAC01(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });
              
              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'TAC02'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.TAC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.TAC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.TAC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.TAC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.TAC02(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'TH'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            let payDate = this.premCal.getPayDate();
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                this.premCal.TH(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum,payDate).then(res=> {c.single=res; singleTotal = Number(c.single)+singleTotal});
                else if(element.value == '1')
                this.premCal.TH(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum,payDate).then(res=> {c.year=res; yearTotal = Number(c.year)+yearTotal});
                else if(element.value == '4')
                this.premCal.TH(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum,payDate).then(res=> {c.three=res; threeTotal = Number(c.three)+threeTotal});
                else if(element.value == '2')
                this.premCal.TH(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum,payDate).then(res=> {c.six=res; sixTotal = Number(c.six)+sixTotal});
                else if(element.value == '0')
                  this.premCal.TH(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum,payDate).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'TRP'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                this.premCal.TRP(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum).then(res=> {c.single=res; singleTotal = Number(c.single)+singleTotal});
                else if(element.value == '1')
                this.premCal.TRP(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+yearTotal});
                else if(element.value == '4')
                this.premCal.TRP(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+threeTotal});
                else if(element.value == '2')
                this.premCal.TRP(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum).then(res=> {c.six=res; sixTotal = Number(c.six)+sixTotal});
                else if(element.value == '0')
                this.premCal.TRP(Number(this.prospect.age),this.prospect.occupationType,Number(element.value),this.prospect.gender ,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'TKG1'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.TKG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.TKG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.TKG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.TKG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.TKG1(0,Number(element.value),this.prospect.occupationType,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'TKG2'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            let payDate = this.premCal.getPayDate();
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.TKG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.TKG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.TKG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.TKG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.TKG2(0,Number(element.value),this.prospect.occupationType,sum,payDate).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });

              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == this.conf.rider('D01')){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            let payDate = this.premCal.getPayDate();
            let endowmentYeartemp =  (this.planSelected[0].endowmentType === "0" ? this.planSelected[0].pEndowmentYear : String(Number(this.planSelected[0].pEndowmentYear) - Number(this.prospect.age)));
            let payYear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.prospect.age)));
            let endowmentYear = await this.premCal.endowmentYear(Number(this.prospect.age),endowmentYeartemp,payYear);
         
 

            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              //console.log(endowmentYear +"    "+sum);
              //debugger;
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.D01(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> { c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.D01(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.D01(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.D01(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.D01(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });
             
              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == this.conf.rider('D02')){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            let payDate = this.premCal.getPayDate();
            let endowmentYeartemp =  (this.planSelected[0].endowmentType === "0" ? this.planSelected[0].pEndowmentYear : String(Number(this.planSelected[0].pEndowmentYear) - Number(this.prospect.age)));
            let payYear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.prospect.age)));
            let endowmentYear = await this.premCal.endowmentYear(Number(this.prospect.age),endowmentYeartemp,payYear);
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                this.premCal.D02(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                this.premCal.D02(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                this.premCal.D02(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                this.premCal.D02(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                this.premCal.D02(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });
              
              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'D03'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}

            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                this.premCal.D03(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                this.premCal.D03(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                this.premCal.D03(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                this.premCal.D03(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                this.premCal.D03(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });
              
              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'VP5'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            //if(Number(this.rider[key]['sum']) > 0)
            if(this.rider[key]['sum'])
            {
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                  this.premCal.VP5(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.VP5(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.VP5(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.VP5(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.VP5(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });
             
              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = 'วพ.5';
              this.data1.push(c);
            }
          }
          else if(key == 'V'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                
                  this.premCal.SmartV(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.SmartV(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.SmartV(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.SmartV(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.SmartV(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });
             
              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = 'แผน' + sum;
              this.data1.push(c);
            }
          }
          else if(key == 'G'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                
                  this.premCal.G0(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.G0(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.G0(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.G0(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.G0(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });
              
              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = sum;
              this.data1.push(c);
            }
          }
          else if(key == 'J0'){
            let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
            if(Number(this.rider[key]['sum']) > 0){
              let sum = this.rider[key]['sum'];
              let payDate = this.premCal.getPayDate();
              await this.dlMode.forEach(element => {
                let ac01  = "0";
                if(element.value == '9')
                
                  this.premCal.J0(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
                else if(element.value == '1')
                  this.premCal.J0(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
                else if(element.value == '4')
                  this.premCal.J0(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
                else if(element.value == '2')
                  this.premCal.J0(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
                else if(element.value == '0')
                  this.premCal.J0(Number(this.prospect.age),Number(element.value),this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
              });
              
              c.name = this.getNameDetailByFilter(planDetailJson, key);
              c.sum = this.dP.transform(sum * 5000 + 5000);
              this.data1.push(c);
            }
        }
        else if(key == 'H'){
          let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
          if(Number(this.rider[key]['sum']) > 0){
            let sum = this.rider[key]['sum'];
            let payDate = this.premCal.getPayDate();
            await this.dlMode.forEach(element => {
              let ac01  = "0";
              if(element.value == '9')
              
                this.premCal.H(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
              else if(element.value == '1')
                this.premCal.H(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
              else if(element.value == '4')
                this.premCal.H(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
              else if(element.value == '2')
                this.premCal.H(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
              else if(element.value == '0')
                this.premCal.H(Number(this.prospect.age),Number(element.value),this.prospect.occupationType,this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
            });
           
            c.name = this.getNameDetailByFilter(planDetailJson, key);
            c.sum = sum;
            this.data1.push(c);
          }
        }
        else if(key == 'KB2'){
         haveKB2 = true;
        }
        else if(key == 'JP'){
          let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
          if(Number(this.rider[key]['sum']) > 0){
            let sum = this.rider[key]['sum'];
            let payDate = this.premCal.getPayDate();
            let endowmentYeartemp =  (this.planSelected[0].endowmentType === "0" ? this.planSelected[0].pEndowmentYear : String(Number(this.planSelected[0].pEndowmentYear) - Number(this.prospect.age)));
            let endowmentYear = await this.premCal.endowmentYearJP4(endowmentYeartemp);
            await this.dlMode.forEach(element => {
              let ac01  = "0";
              if(element.value == '9')
              
                this.premCal.JP4(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
              else if(element.value == '1')
                this.premCal.JP4(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
              else if(element.value == '4')
                this.premCal.JP4(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
              else if(element.value == '2')
                this.premCal.JP4(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
              else if(element.value == '0')
                this.premCal.JP4(Number(this.prospect.age),endowmentYear,Number(element.value),this.prospect.gender,sum).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
            });
            
            c.name = this.getNameDetailByFilter(planDetailJson, key);
            c.sum = sum;
            this.data1.push(c);
          }
        }
       }
       if(haveKB2){
        let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
        if(Number(this.rider['KB2']['premium']) > 0 && this.rider['KB2']['sex'] != "" && Number(this.rider['KB2']['age']) > 0 ){
          let sum = this.rider['KB2']['sum'];
          let parentAge = this.rider['KB2']['age'];
          let parentSex = this.rider['KB2']['sex'];
          let payDate = this.premCal.getPayDate();
         
            //debugger;
          let endowmentYeartemp =  (this.planSelected[0].endowmentType === "0" ? this.planSelected[0].pEndowmentYear : String(Number(this.planSelected[0].pEndowmentYear) - Number(this.prospect.AgentModel)));
          let payYear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.prospect.age)));
          let endowmentYear = await this.premCal.endowmentYearKB(Number(this.prospect.age),Number(parentAge),payYear);
          await this.dlMode.forEach(element => {
            let ac01  = "0";
            
          // this.premCal.premiumCal()
            if(element.value == '9')
            
              this.premCal.KB2(Number(parentAge),endowmentYear,Number(element.value),parentSex,Number(singleTotal)).then(res=> {c.single=res;  singleTotal = Number(c.single) + singleTotal});
            else if(element.value == '1')
              this.premCal.KB2(Number(parentAge),endowmentYear,Number(element.value),parentSex,Number(yearTotal)).then(res=> {c.year=res; yearTotal = Number(c.year)+ yearTotal});
            else if(element.value == '4')
              this.premCal.KB2(Number(parentAge),endowmentYear,Number(element.value),parentSex,Number(threeTotal)).then(res=> {c.three=res; threeTotal = Number(c.three)+ threeTotal});
            else if(element.value == '2')
              this.premCal.KB2(Number(parentAge),endowmentYear,Number(element.value),parentSex,Number(sixTotal)).then(res=> {c.six=res; sixTotal = Number(c.six) + sixTotal});
            else if(element.value == '0')
              this.premCal.KB2(Number(parentAge),endowmentYear,Number(element.value),parentSex,Number(oneTotal)).then(res=> {c.one=res; oneTotal = Number(c.one)+oneTotal});
          });
         
          c.name = this.getNameDetailByFilter(planDetailJson, 'KB2');
          c.sum = sum;
          this.data1.push(c);
        }
       }
       let dateChoose = this.prospect.birthDate;
       let day: number = moment().diff(moment(dateChoose), 'days');
       let year: number = moment().diff(moment(dateChoose), 'year');
       let ptCode = await this.planProvider.getRiderPlanTP(this.choosePlan);

      if( year < 60){
        if(typeof(ptCode) !== 'undefined'  ){
//alert("test1 typeof(ptCode)=="+ typeof(ptCode)+ " >> "+JSON.stringify(ptCode));
          let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
          c.name = ptCode[0].ridercode == 'TP'?'[ทพ.]ทุพพลภาพถาวรสิ้นเชิง':'สัญญาเพิ่มเติม ตะกาฟุลทุพพลภาพถาวรสิ้นเชิง ตทพ.';
          //.name = ptCode[0].fullname;
          c.sum = this.baseIncrementer;
          //c.sum = ptCode[0].sum;
          this.data1.push(c);
        }
      }
      /*else if( (this.choosePlan == 'SN' || this.choosePlan == 'SQ') && year < 60 ){
        let ptCode = await this.planProvider.getRiderPlanTP(this.choosePlan);
        if(typeof(ptCode) !== 'undefined'){
          let c = {name:"",sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"}
          c.name = ptCode[0].ridercode == 'TP'?'[ทพ.]ทุพพลภาพถาวรสิ้นเชิง':'สัญญาเพิ่มเติม ตะกาฟุลทุพพลภาพถาวรสิ้นเชิง ตทพ.';
          //.name = ptCode[0].fullname;
          c.sum = this.baseIncrementer;
          //c.sum = ptCode[0].sum;
          this.data1.push(c);
        }
      }*/
      
       this.loading.dismiss();
      // debugger;
     }else{
       //console.log(this.rider);
     }

    }
    else if(this.planSelected[0].calType == 2 ){

      //debugger;
      if(this.dlMode.length > 0){
        let b = {sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"};
        b.sum = this.baseIncrementer;
        //this.data.push({sum:this.baseIncrementer});
        // หาคำแหน่ง index ของ premium dorpdown เพื่อไปคูณกับ premium ของแต่ละโหมด
        let step = this.indexPremium + 1;
        await this.dlMode.forEach(element => {
          
          if(element.value == '9'){
             this.getDataCalType2(element).then(res=> {b.single = String(step * Number(res)); singleTotal = Number(b.single)});
             
          }
          else if(element.value == '1'){
            this.getDataCalType2(element).then(res=> {b.year = String(step * Number(res));yearTotal = Number(b.year)});
          
          }
          else if(element.value == '4')
            this.getDataCalType2(element).then(res=> {b.three = String(step * Number(res));threeTotal = Number(b.three)});
          else if(element.value == '2')
            this.getDataCalType2(element).then(res=> {b.six = String(step * Number(res));sixTotal = Number(b.six) });
          else if(element.value == '0')
            this.getDataCalType2(element).then(res=> {b.one = String(step * Number(res));oneTotal = Number(b.one) });
        });
       this.data.push(b);
        //const data =  await this.getLoop();
        //console.log(data.values);
      }
     
    }
    else if(this.planSelected[0].calType == 3){

      //debugger;
      if(this.dlMode.length > 0){
        let b = {sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"};
        b.sum = this.baseIncrementer;
        //this.data.push({sum:this.baseIncrementer});
        // หาคำแหน่ง index ของ premium dorpdown เพื่อไปคูณกับ premium ของแต่ละโหมด
        let step = this.indexPremium + 1;
        await this.dlMode.forEach(element => {
        if(element.value == '0'){
          b.one = this.premium;
          oneTotal = Number(this.premium);
        }
        });
       this.data.push(b);
      }
     
    }
    else if(this.planSelected[0].calType == 4){

      this.focus = "6";
      if(this.dlMode.length > 0){
        let b = {sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"};
        b.sum = 'แผน '+this.package;
        //this.data.push({sum:this.baseIncrementer});
        // หาคำแหน่ง index ของ premium dorpdown เพื่อไปคูณกับ premium ของแต่ละโหมด
        let step = this.indexPremium + 1;
        await this.dlMode.forEach(element => {
        if(element.value == '1'){
          b.year = this.premium;
          yearTotal = Number(this.premium);
        }
        });
       this.data.push(b);
      }
     
    }
    else if(this.planSelected[0].calType == 5){

      this.focus = "6";
      if(this.dlMode.length > 0){
        let b = {sum:"0",year:"0",three:"0",six:"0",one:"0",single:"0"};
        b.sum = 'แผน '+this.package;
        //this.data.push({sum:this.baseIncrementer});
        // หาคำแหน่ง index ของ premium dorpdown เพื่อไปคูณกับ premium ของแต่ละโหมด
        let step = this.indexPremium + 1;
        await this.dlMode.forEach(element => {
        if(element.value == '1'){
          b.year = this.premium;
          yearTotal = Number(this.premium);
        }
        });
       this.data.push(b);
      }
     
    }
    this.loading.dismiss();
    setTimeout(() => {
      //alert(yearTotal);
      this.yearTotal = String(yearTotal);
      this.sixTotal = String(sixTotal);
      this.threeTotal = String(threeTotal);
      this.oneTotal = String(oneTotal);
      //console.log(yearTotal+"  "+sixTotal +"  "+ threeTotal +"  "+oneTotal);
      if(Number(this.modeSelected) == 0)
      this.total = String(oneTotal);
      else if(Number(this.modeSelected) == 4)
      this.total = String(threeTotal);
      else if(Number(this.modeSelected) == 2)
      this.total = String(sixTotal);
      else if(Number(this.modeSelected) == 1 || Number(this.modeSelected) == 9){

        this.total = String(yearTotal);
      }
    }, 500);
   

    //alert(this.total);
    
  }


  
 
  // async  getLoop(){
  //   let result = [];
  //    await this.dlMode.forEach(element => {
  //     let b = this.a( Number(this.planSelected[0].calType) ,this.planSelected[0].planCode , element.value , this.prospect.gender  , this.prospect.age );
  //     console.log(b);
  //     result.push(b)
  //   });
  //    console.log(result);
    
  //   return result;
  // }

  async getLoop2(element){
    let single = await this.premCal.detectCal(this.choosePlan, this.prospect.gender , element.value ,this.prospect.age  ,this.baseIncrementer , this.calType);
      // this.data.push({one:single});
      
      return single;
  }

  async getDataCalType2(element){
    //console.log(this.choosePlan);
    let result=  await this.premCal.getPremiumPackageForDetail(this.calType,this.choosePlan,element.value,this.prospect.gender,this.prospect.age);
    //let result = await this.premCal.getSumRateO(this.choosePlan,element.value,this.prospect.gender,this.prospect.age,this.premium);
      // this.data.push({one:single});
      
      return result;
  }

  async getDataCalType3(element){
    let premium =  await this.premCal.getPremiumPackageForDetail(this.calType,this.choosePlan,element.value,this.prospect.gender,this.prospect.age);
    //let result = await this.premCal.getSumRate(this.choosePlan,this.prospect.gender,premium,this.prospect.age);
      // this.data.push({one:single});
      
      return premium;
  }

  public checkNumber(data){
    //console.log(Number(data));
    if(Number(data) > 0){
      return true;
    }
    return false;
  }

}
