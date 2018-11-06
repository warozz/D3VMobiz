import {TaxcalculatorComponent} from '../../../components/utility/taxcalculator/taxcalculator';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TlPlanProvider } from '../../../providers/tlplan/tlplan';
import  {Broadcaster } from "../../../providers/utility/broadcaster";
import { TLPlanModel } from '../../../providers/tlplan/tlplan-model';
import {ApiProvider} from '../../../providers/api/api';
import { Subscription } from 'rxjs';
/**
 * Generated class for the QuatationTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quatation-type',
  templateUrl: 'quatation-type.html',
})

export class QuatationTypePage implements OnDestroy {
  package: any;
  premium: any;
  name: string;
  mode: any;

  planCode:any;
  tlplan: any;
  sumValue:any;
  prospect:any;
  calculate:any;

  premiumFooter: any;

  private planName: string;

  // private bar = {
  //   style: '1',
  //   data : [{text:'150,000', css: {left:'664px'}},{text:'150,000',css: {left:'719px'}},{text:'150,000',css: {left:'773px'}},{text:'150,000',css: {left:'845px'}},{text:'150,000',css: {left:'900px'}},{text:'150,000',css: {left:'997px'}}]
  // };
  private disabledTax: boolean = true;
  private taxDeductFlag: string;
  private taxCal: TaxcalculatorComponent = new TaxcalculatorComponent(this.viewCtrl, this.navParams, this.apiProvider, this.alertCtrl);

  private subscription: Array<Subscription> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tlplanProvider: TlPlanProvider,
              public broadCaster: Broadcaster,
              private alertCtrl: AlertDirective,
              private apiProvider: ApiProvider,
              private viewCtrl: ViewController,
            
            ) {
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  } 

  ngOnInit() {
    this.subscription.push(this.broadCaster.on('quatationStep').subscribe(res => {
      if(res === 1) {   // รูปแบโครงการ
        this.taxCal.hasTax(this.taxDeductFlag, this.planCode, Number(this.sumValue), this.prospect.age, this.prospect.gender).then(res => {
          this.disabledTax = res;
          // console.log("bingo quatationStep >>tax="+this.taxDeductFlag+ " planCode=" + this.planCode + " sumValue=" +Number(this.sumValue)+ " age="+ this.prospect.age
          // + " gender="+ this.prospect.gender + " disabledTax=" + this.disabledTax);
          this.changeTLPlan(this.planCode);
        }).catch(()=>{

        });



        
      } 
    }));
    /** แบบประกันที่เลือก */
    this.subscription.push(this.broadCaster.on('planSelected').subscribe(res => {
      this.taxDeductFlag = res[0].taxDeductFlag;
      let age: any;
      let gender: any;
      try {
        age = this.prospect.age;
        gender = this.prospect.gender;
      } catch (error) {
        console.log(JSON.stringify(error));
        return;
      }
      
      this.taxCal.hasTax(this.taxDeductFlag, this.planCode, Number(this.sumValue), age, gender).then(res => {
        this.disabledTax = res;
        // console.log("bingo planSelected >>tax="+this.taxDeductFlag+ " planCode=" + this.planCode + " sumValue=" +Number(this.sumValue)+ " age="+ age
        // + " gender="+ gender + " disabledTax=" + this.disabledTax);
      });

    }));
   
    this.subscription.push(this.broadCaster.on('quatationPackage').subscribe(res => {
      this.package = res;
    }));
    this.subscription.push(this.broadCaster.on('quatationPlan').subscribe(res => {
      this.planCode = res;
    }));
    this.subscription.push(this.broadCaster.on('quatationSum').subscribe(res => {
      this.sumValue = res;
    }));
    this.subscription.push(this.broadCaster.on('prospect').subscribe(res => {
      this.prospect = res;
    }));
    this.subscription.push(this.broadCaster.on('quatationPremium').subscribe(res => {
      this.premium = res;
    }));
    this.subscription.push(this.broadCaster.on('quatationMode').subscribe(res => {
      this.mode = res;
    }));
    

    // อัปเดตแบบประกันที่เลือก
    this.subscription.push(this.broadCaster.on('planSelected').subscribe(res => {
      if(this.planSelected != res){
        this.planSelected  = res;
      }   
    }));
    
    this.subscription.push(this.broadCaster.on('planSelected').subscribe(res => {
      this.planName = res[0].planName;
    }));

    this.subscription.push(this.broadCaster.on('premiumFooter').subscribe(res => {
      this.premiumFooter = res;
    }));


  }
    // แบบประกันที่ถูกเลือก
  private planSelected: TLPlanModel[];
  private calPayYear() : string {
   /* console.log("bingo=   prospect=" +  this.prospect.age + "planSelected ==" + this.planSelected+ "planSelected ==" + JSON.stringify(this.planSelected)+" payType=" + this.planSelected[0].payType +" pPayYear=" + this.planSelected[0].pPayYear );*/
    let payYear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.prospect.age)));
    return payYear;
  }
  private changeTLPlan(tlPlanCode) {
  
    this.planCode = tlPlanCode;
    this.tlplan = this.tlplanProvider.getTlPlan(tlPlanCode);
    this.calculate = undefined;
    
    

      const quatation = {
        premium: this.premium,
        mode: this.mode,
        payYear: Number(this.calPayYear()),
        age: this.prospect.age,
        tax: this.disabledTax,
        package : this.package,
        premiumFooter: this.premiumFooter
      };
      if (this.tlplan && typeof this.tlplan.calculate === 'function') {
        this.calculate = this.tlplan.calculate(this.sumValue, this.prospect, this.utils, quatation);
        //console.log("result calculate=", this.calculate);
      }

    

    
  }

  private utils = {
    formatInt: (val) => {
      return val*1;
    },
    numFormat: (number) => {
      number = Math.round(number);
      if(number=="null" || number==null || number<0){
        return '0';
      }
      number = this.utils.formatInt(number).toString();
      number = '' + number;
      if (number.length > 3)
      {
        const mod = number.length % 3;
        let output = (mod > 0 ? (number.substring(0,mod)) : '');
        for (let i=0 ; i < Math.floor(number.length / 3); i++)
        {
          if ((mod == 0) && (i == 0))
            output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
          else
            output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
      }
      else return number;
    }
  }

}
