import { LoadingDirective } from './../../../directives/extends/loading/loading';
import { AgentModel } from './../../../providers/agent/agent-model';
import { Subscription } from 'rxjs/Rx';
import { PremiumPackageM } from './../../../providers/planprovide-table/premiumpackage/premiumpackage-model';
import { DecimalPipe } from '@angular/common';
import { async } from 'rxjs/scheduler/async';
import { PremiumCalProvider } from './../../../providers/utility/premium-cal';
import { ProspectModel } from './../../../providers/prospect/prospect-model';
import { ResponseModel } from './../../../providers/model/response-model';
import { ServiceName } from './../../../providers/constants/service-name';
import { FunctionName } from './../../../providers/constants/function-name';
import { RequestModel } from './../../../providers/model/request-model';
import { TLPlanModel } from './../../../providers/tlplan/tlplan-model';
import { Component, OnInit, PipeTransform, OnDestroy, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController, Modal} from 'ionic-angular';
import { ApiProvider } from './../../../providers/api/api';
import { SettingPlanProvider } from './../../../providers/setting-plan/setting-plan';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { Broadcaster } from './../../../providers/utility/broadcaster';
import { PopupOccupationComponent } from './../../../components/utility/popup-occupation/popup-occupation';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ValidateProvider } from './../../../providers/validate/validate';

// tab page
import { PmrateM } from '../../../providers/planprovide-table/pmrate/pmrate-model';
import { SumrateoM } from '../../../providers/planprovide-table/sumrateo/sumrateo-model';
import { SumrateM } from '../../../providers/planprovide-table/sumrate/sumrate-model';
import { PackageDetailM } from '../../../providers/planprovide-table/packagedetail/package-detail-model';
import { PremiumRateM } from '../../../providers/planprovide-table/premiumrate/premiumrate-model';
import { PackageCoverageM } from '../../../providers/planprovide-table/packagecoverage/package-coverage-model';
import { ParateM } from '../../../providers/planprovide-table/parate/parate-model';
import { QuotationRiderM } from '../../../providers/quotationrider/quotationrider-model';
import { QuotationGuardianM } from '../../../providers/quotationguardian/quotationguardian-model';
import { FavoritePlanM } from '../../../providers/favoriteplan/favoriteplan-model';
import { QuotationModel } from '../../../providers/quotation/quotation-model';
import { PopupModel, PopupComponent } from '../../../components/utility/popup/popup';
import { DateUtil } from '../../../providers/utility/date-util';
import { QuotationService } from '../../../providers/quotation/quotation-service';
import { DateFormatProvider } from '../../../providers/date-format/date-format';
import { RiderConfig } from '../../../providers/rider/rider-config';
import { GroupplanSearchM } from '../../../providers/planprovide-table/groupplan-search/groupplan-search-model';
import { interval } from 'rxjs/observable/interval';
import { Observable } from 'rxjs/Observable';
import { QuotationData } from '../../../providers/quotation/quotation-data';
import { MAX_AGE } from "./../../../providers/constants/app-config";
/**
 * Generated class for the QuatationFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quatation-form',
  templateUrl: 'quatation-form.html'
})
export class QuatationFormPage implements OnInit, OnDestroy {

  /**
   * ตัวแปร disable ปุ่ม save หลังจากกดปุ่มบันทึก
   */
  private disableSaveButton : boolean = false;

  private oldFullName: any;
  private fullName: any;

  //เช็คทุนต่ำกว่า 50000
  //เช็คAlert ชุดหลักทิ้ง ชุดใหม่แทน
  private sumMonth: boolean = false;
  //เช็คอายุต่ำกว่า 1 เดือน
  private oldInsuredage: string = "0";
  /**
   * แบบประกันทั้งหมด
   */
  private tlPlan: Array<TLPlanModel>;
  private tlPlanAll: Array<TLPlanModel> = [];
  // แบบประกันที่ถูกเลือก
  private planSelected: TLPlanModel[] = [];
  // current step
  private step: any;
  private minStep : number = 0;
  private maxStep : number = 0;

  private gioMaxStep : number = 0;
  // เพศ
  private typex: string;
  // อายุ
  private insuredage: string;
  // แบบประกันที่เลือก
  private choosePlan: string = '';
  // เลือกTabsแบบประกัน
  private chooseTabs: string | number = 0;
  // เบี้ยประกันที่คำนวณแล้ว
  private premiumTotal : string;
  private premiumTotalReal : string ;
  // แบบที่ชำระเบี้ย
  private dlMode = [];

  private baseIncrementer:number = 0;

  private ShowStep : any ;
  private maxAge: string ="0";
  private minAge: string ="0";

  private minAlert : string = '';
  private maxAlert : string = '';

  private oldAge : string = "0";

  /**
   * สัญญาเพิ่มเติม
   */
  private rider: object = {};

  private premiumFooter : string = "0";
  private riderFooter : string = "0";
  /**
   * ตัวเลข
   */
  private sum: number = 0;
  private OldindexOfPremium : number = 0;
  private occupationType : string = "";
  private OldPremiumGIO : number = 0;


  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  public prospect: ProspectModel;
  public quotation: QuotationModel;

  private show : boolean = false;
  public prospectTemp :ProspectModel;
  private mode : string = "" ;
  private modeList = [
    {
      modeCode : "00001" , data :[{value : "9",text :"รายปี"}]
    },
    {
      modeCode : "00010" , data :[{value : "1",text :"รายปี"}]
    },
    {
      modeCode : "01110" , data :[{value : "4",text :"ราย 3 เดือน"},{value : "2",text :"ราย 6 เดือน"},{value : "1",text :"รายปี"}]
    },
    {
      modeCode : "10000" , data :[{value : "0",text :"รายเดือน"}]
    },
    {
      modeCode : "11110" , data :[{value : "0",text :"รายเดือน"},{value : "4",text :"ราย 3 เดือน"},{value : "2",text :"ราย 6 เดือน"},{value : "1",text :"รายปี"}]
    }
  ];

  private tabsPage = [
    {
      title: 'แบบประกันชีวิตทั้งหมด',
      disabled: false
    },
    {
      title: 'เลือกแบบประกันที่เหมาะสม',
      disabled: false
    },
    {
      title: 'แบบประกันเฉพาะช่วงเวลา',
      disabled: false
    },
    {
      title: 'แบบประกันที่น่าสนใจ',
      icon: 'icon-star c-yellow fs14 mgr7',
      disabled: false
    }
  ];

 /**
   * ประเภทการคำนวณ
   * calType == 1 คำนวณจากทุนไปเบี้ย
   * calType != 1 คำนวณจากเบี้ยไปทุน
   */
  private calType: number = 1;

  /**
   * เบี้ยประกันภัยรวมที่เลือกได้
   */
  private premiumPackage: Array<number> = [];


  private packages : Array<string> = [];
  private package : string = "";


  private soldier : string = "";

  private roleType: string;

  /**
   * บัญชีฝ่ายขาย
   */
  private profile = new AgentModel();


  private overwrite: boolean = false;

  /**
   *  defalut value เลือกแบบประกันที่เหมาะสม
  */
  private showDivDropdown: string = "";
  private selectVal: string = "";
  private selectType: string = "";
  private selectPay: string = "";
  private selectProtection: string = "";
  private selectTaxDeduct: string = "";
  private selectRegion: string = "";


  public ngOnInit(): void {

    this.getInit();

    // get profile
    this.storage.get('loginProfile').then(profile => {
      this.profile = profile;
    });
  }

  async getInit(){
    await this.selectPlan();
    await this.checkCalType();
  }

  async checkCalType(){
    //console.log("504 >> calType "+this.calType+" this.gioMaxStep==" + this.gioMaxStep);
    this.quotationData.package = ''; // clear ค่า package
    this.packages = [];
      if(this.calType == 1){
        //console.log("step1");
        await this.setMinMaxStep();
        //console.log("step2");
        await this.getStep();
        //console.log("step3");
        await this.detectCal();
      }
      else if(this.calType == 2){
        this.riderFooter = '0';
        await this.setMinMaxStep();
        //console.log("step1");
        await this.getStep();
        //console.log("step2");
        await this.getPremiumPackage();
        //console.log("step3");
        await this.getSumRateO();
        //console.log("step4");
      }else if(this.calType == 3){
        this.riderFooter = '0'
        await this.setMinMaxStep();
        await this.getStep();
        await this.getPremiumPackage();
        await this.getSumRate();
      }else if(this.calType == 4){
        this.riderFooter = '0';
        await this.setMinMaxStep();
        await this.getStep();
        await this.getPackageDetail();
        await this.selectPackage();
      }
      else if(this.calType == 5){
        this.riderFooter = '0';
        await this.setMinMaxStep();
        await this.getStep();
        await this.getPackageDetail();
        await this.selectPackage();
      }



    //console.log("step4");
  }

  private subscription: Array<Subscription> = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertDirective,
    private planService: SettingPlanProvider,
    private apiProvider: ApiProvider,
    private premCal: PremiumCalProvider,
    private decimalPipe: DecimalPipe,
    private modalCtrl: ModalController,
    private broadcaster: Broadcaster ,
    private storage: Storage,
    private dateFormat: DateFormatProvider,
    private ngZone : NgZone,
    private planProvider :SettingPlanProvider,
    private loadingCtrl: LoadingDirective,
    private conf : RiderConfig,
    private quotationData : QuotationData
    ) {
      this.quotationData.quotation = undefined;

      this.storage.get('tlpromptMode').then(mode => {
        if (0 == mode) {
          this.tabsPage = [
            {
              title: 'แบบประกันชีวิตทั้งหมด',
              disabled: false
            },
            // {
            //   title: 'เลือกแบบประกันที่เหมาะสม',
            //   disabled: true
            // },
            // {
            //   title: 'แบบประกันเฉพาะช่วงเวลา',
            //   disabled: true
            // },
            // {
            //   title: 'แบบประกันที่น่าสนใจ',
            //   icon: 'icon-star c-yellow fs14 mgr7',
            //   disabled: true
            // }
          ];
        }
      });

    /**
      * รับ broadcaster มาจากหน้า pdf เพื่อให้ ระบบ save ข้อมูลก่อน
     */
    /*this.subscription.push(this.broadcaster.on('actionSaveFromQuotationPdf').subscribe(async (res) => {
      //console.log("actionSaveFromQuotationPdf : "+JSON.stringify(res));
      if(res != undefined && res.status == "S"){
        let save_fin = await this.saveQuationAllFromQuotationPdf();
        if(save_fin){
          let data : object = {'status' : 'N',
            'customerid' : this.quotation.customerid,
            'quotationno' : this.quotation.quotationno
          };
          this.broadcaster.broadcast('actionSaveFromQuotationPdf', data);
        }
      }


    }));
    */
    // // อัปเดตข้อมูลผู้มุ่งหวัง
    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {

      if(!this.fullName) this.fullName = '';
      this.oldFullName = JSON.parse(JSON.stringify(this.fullName));
      this.fullName = JSON.parse(JSON.stringify(res));

      //console.log("subscribe..........."+JSON.stringify(res));
      //console.log("subscribe..........."+JSON.stringify(this.prospect));
      let a : ProspectModel = res ;



      //alert(JSON.stringify(this.prospect) === JSON.stringify(a));
     // alert(this.prospect);
      let chk = typeof(this.prospect) === 'undefined'?false:true;
      this.prospect = res;
      this.quotationData.prospect = this.prospect;

      this.checkSN(this.choosePlan);
      //alert(this.prospect)
      //alert(JSON.stringify(this.prospect) === JSON.stringify(a));
      //res.plan = this.planSelected[0].planCode;
      //alert(this.prospect === (a));
      this.typex = this.prospect.gender;
      this.occupationType =  (this.prospect.occupationType == "" ? "2":this.prospect.occupationType);
      this.prospect.occupationType = this.occupationType;

      this.oldAge = this.insuredage;
      //console.log("bingo  1 oldAge=="+ this.oldAge +" insuredage=="+this.insuredage +" prospectage=="+this.prospect.age);
      this.insuredage = this.prospect.age;
      //console.log("bingo  2 oldAge=="+ this.oldAge +" insuredage=="+this.insuredage +" prospectage=="+this.prospect.age);

      /*************************เพศ แสดงตรงนี้************************/
      //console.log("เพศ >>>>>>>>>>>>>>>>>>> "+this.typex);
      //console.log("อายุ >>>>>>>>>>>>>>>>>>> "+this.insuredage );
      this.broadcaster.broadcast('sex',this.typex);
      this.broadcaster.broadcast('age',this.insuredage);

      this.checkSN(this.choosePlan);

      if(this.fullName && this.oldFullName !== this.fullName && this.oldFullName.firstName != this.fullName.firstName) {
        return;
      }
      if(this.fullName && this.oldFullName !== this.fullName && this.oldFullName.lastName != this.fullName.lastName) {
        return;
      }
      if(this.fullName && this.oldFullName !== this.fullName && this.oldFullName.citizenID != this.fullName.citizenID) {
        return;
      }
      if(this.fullName && this.oldFullName !== this.fullName && this.oldFullName.mobilephone != this.fullName.mobilephone) {
        return;
      }
      if(chk)
      this.checkCalType();

      // กรองแบบประกัน
      this.filterPlan();
    }));

    // อัปเดตแบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('quatationPlan').subscribe(res => {
      this.choosePlan = res;
    //  alert("this.choosePlan="+ this.choosePlan);
    }));

    this.subscription.push(this.broadcaster.on('quatation').subscribe(async (res) => {
      this.quotation = res;
      this.quotationData.quotation = this.quotation;
      if(this.quotation != undefined && this.quotation.publishstatus == 'D'){
        this.quotationData.quotation = undefined;
      }
      // prospectToQuotation edit mode
      this.mode = this.quotation.mode;
      //alert(this.quotation.packageno);
      this.package = this.quotation.packageno;
      this.soldier = this.quotation.soldier;

      //editMode ex.MG150
      await this.selectPlan();
      //find calType
      if(!this.tlPlan) return;
      if(typeof this.planSelected == undefined || null) {
        this.planSelected = this.tlPlan.filter(item => item.planCode == this.quotation.plancode);
      }
      if(this.planSelected[0].calType == '2' || this.planSelected[0].calType == '3') {
        setTimeout( () => {
          this.getPremium(this.quotation.lifepremium);
        },1500);
      }

    }));

    //สัญญาเพิ่มเติม
    this.subscription.push(this.broadcaster.on('rider').subscribe(res => {
      this.rider = res;
      this.quotationData.rider = res;

      if (typeof(this.planSelected) !== 'undefined' && this.planSelected.length > 0){
        let payYearKB = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.insuredage)));
        // if(this.choosePlan == "ES" || this.choosePlan == "WY60"  && Number(this.insuredage) < 6 && this.rider['KB2'].age < 35 && this.rider['KB2'].age != 0)
        //if (Number(this.insuredage) < 6 && this.rider['KB2'].age < 35 && this.rider['KB2'].age != 0)

        if( Number(payYearKB) > 25 && Number(this.insuredage) < 6 && this.rider['KB2'].age < 35 && this.rider['KB2'].age != 0)
          this.setMinMaxStep();
      }


    if(this.calType == 1)
        this.detectCal();
    }));

    this.storage.get('loginProfile').then(profile => {
      this.roleType = profile.roleType;
      if (this.roleType == 'employee') {
        for (let i = 1; i < this.tabsPage.length; i ++)
          this.tabsPage[i].disabled = true;
      }
    });


    //let t = Observable.interval(1000).take(5).do(i=> console.log("hello "+i));
    // let t = Observable.interval(10000);
    // t.subscribe(j=>console.log("hello "+j));

  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  private showSummary() {

  }

  private hideSummary() {

  }

  async getStep(){
    await this.planService.getStep().then(scr =>
      {
        if(!this.tlPlan || this.planSelected.length == 0) return;
        if(typeof this.planSelected == undefined || this.planSelected == null) {
          this.planSelected = this.tlPlan.filter(item => item.planCode == this.choosePlan);
        }
        let result : Array<any> = scr;

        let data : any = result.filter((item,index)=>{
            return item.stepCode === this.planSelected[0].stepCode ;
        });

        let bb = [];
        for (let index = 0; index < data.length; index++) {
          const steps  = {
            step : Number(data[index].step),
            value : Number(data[index].minSum)
          }
          bb.push(steps);
        }
        this.step = bb;
        //console.log("success step" + this.step +" stepcode="+ this.planSelected[0].stepCode);
      });
  }

  private favorite(event: Event): void {
    //console.log(event)
  }

  private checkFighting(plan: string): boolean {
    let check = true;
    const fighting: Array<string> = ["EN39","EN40","EN15","ZT","ZS"];
    const confirmFightingStr: string =
    `ระยะเวลาการเสนอขาย ขึ้นอยู่กับประกาศของบริษัทฯ
    <br>- แบบประกัน ธนทวี8 3/2,ธนทวี8 5/3 และ ธนทวี3 10/3 กำหนดระยะเวลาการเสนอขาย 1 ตุลาคม – 31 ธันวาคม 2561 หรือเบี้ยประกันของทั้ง 3 แบบ ครบ 500 ล้านบาท
    <br>- แบบประกัน ธนรักษ์12 และ ธนรักษ์14 กำหนดระยะเวลาการเสนอขาย
    <br>1 ตุลาคม – 31 ธันวาคม 2561 หรือเบี้ยประกันของทั้ง 2 แบบ ครบ 800 ล้านบาท`;
    const warningFightingStr: string =
    `ไม่มีแบบประกันขายเฉพาะช่วงเวลาที่ขายได้ ณ ปัจจุบัน`;
    //YYYY-DD-MM
    //fighting
    const endFighting: Array<string> = ["2018-12-31","2018-12-31"];
    if(fighting.indexOf(plan) != -1) {
      this.alertCtrl.confiemBox(confirmFightingStr).then(
        (res) => {
          for(let i of endFighting) {
            if(!moment(i).isSameOrAfter(moment().format("YYYY-MM-DD"))) {
              this.alertCtrl.warning(warningFightingStr).then( res => {
                this.reset(true);
              },
              err => {
                this.reset(true);
              });
              return false;
            }
          }
        },(err) => {
          this.reset(true);
        }
      );
    }
    return check;
  }

  private checkSN(plan): boolean {
    if (plan == 'SN'){
      let day: number = moment().diff(moment(this.prospect.birthDate), 'days');
      let dayOfMonth: number = moment().diff(moment().subtract(1, 'months'), 'days');
      let year: number = moment().diff(moment(this.prospect.birthDate), 'year');
      let hour = moment().diff(this.prospect.birthDate ,'hours');

      if((Number(this.prospect.age) > 19 && (Number(this.prospect.age) <= 45)) && (this.prospect.gender == 'M' || this.prospect.preName == 'นาย' || this.prospect.preName == 'เด็กชาย')) {
        // this.alertCtrl.warning('เฉพาะเพศหญิงเท่านั้น');
        // this.prospect.gender = 'F';
        // this.prospect.preName = 'นางสาว';
        if (this.choosePlan == 'SN')
          this.changePlan('');
        return false;
      }
      else if (Number(this.prospect.age) < 20 && day > 90) {
        if (this.choosePlan == 'SN')
          this.changePlan('');
        return false;
      }
      else
        return true;
    }
    return true;
  }

  private changePlan(plan: string): void {
    console.log('logchangePlan : ',plan);
    // กรณีไม่เลือกแบบประกันใดๆ
    if (plan == '') {
      setTimeout(() => {
        this.premiumTotal = '0';
        this.premiumFooter = '0';
        this.riderFooter = '0';

        this.maxAlert = 'กรุณาเลือกแบบประกัน';
        this.minAlert = '';
        this.baseIncrementer = 0;
        this.minStep = 0;
        this.maxStep = 0;
        this.broadcaster.broadcast('quatationSum', this.baseIncrementer);
      }, 100);

      // แจ้งเตือนเมื่อแบบประกันที่เลือกอยู่นอกเงื่อนไขอายุ
      if (typeof this.planSelected != 'undefined' && this.planSelected.length > 0) {

        // เงื่อนไขเฉพาะแบบ
        if (this.planSelected[0].planCode == 'TE12' && this.typex != 'F') {
          this.alertCtrl.warning('แบบประกัน '+ this.planSelected[0].planName +' เพศไม่อยู่ในช่วงเกณฑ์การรับประกัน');
        }
        else if (this.planSelected[0].planCode == 'TE13'  && this.typex != 'M') {
           // เงื่อนไขเฉพาะแบบ
          this.alertCtrl.warning('แบบประกัน '+ this.planSelected[0].planName +' เพศไม่อยู่ในช่วงเกณฑ์การรับประกัน');
        }
        else if (this.planSelected[0].planCode == 'SN' && ((Number(this.prospect.age) > 19 && (Number(this.prospect.age) <= 45)) && (this.prospect.gender == 'M' || this.prospect.preName == 'นาย' || this.prospect.preName == 'เด็กชาย'))) {
           // เงื่อนไขเฉพาะแบบ
          this.alertCtrl.warning('แบบประกัน '+ this.planSelected[0].planName +' เพศไม่อยู่ในช่วงเกณฑ์การรับประกัน');
        }
        else {
          this.alertCtrl.warning('แบบประกัน '+ this.planSelected[0].planName +' อายุไม่อยู่ในช่วงเกณฑ์การรับประกัน');
        }

        this.planSelected = [];
      }

      this.broadcaster.broadcast('quatationPlan', '');

      return;
    }

    this.broadcaster.broadcast('hiddenRider', '0');// clear ค่า rider แฝง

    // ถ้า plan ก่อนหน้าถูกเลือก ไว้ที่ชั้นอาชีพ 3 แล้วเปลี่ยนมาเลือกแบบที่มี แค่ ชั้นอาชีพ 2 ให้ set ชั้น อาชีพเป็น 2
    if ((plan == 'TN1' || plan == 'TK1' || plan == 'TQ1' || plan == 'TX2' || plan == 'TY')  && this.occupationType == '3') {
      this.occupationType = "2";
      this.prospect.occupationType = "2";
    }
    /**
     * เฉพาะทหาร
     */
    if ((this.choosePlan != 'EN36' && this.choosePlan != 'EN37') && this.soldier != '') {
      this.soldier = '';
      this.quotationData.soldier = this.soldier;
      this.broadcaster.broadcast('soldierOcc',this.soldier);
    }

    if (!this.checkFighting(plan)) {return}

    // if(plan == 'SN' && (this.prospect.gender == 'M' || this.prospect.preName == 'นาย')){
    //   this.alertCtrl.warning('เฉพาะเพศหญิงเท่านั้น');
    //   this.prospect.gender = 'F';
    //   this.prospect.preName = 'นางสาว';
    // }
    this.checkSN(plan);

    //console.log("occupationType=="+this.occupationType);

    this.broadcaster.broadcast('quatationPlan', plan);
    this.gioMaxStep = 0;
    //console.log(plan);
    this.dlMode = [];
    this.choosePlan =  plan;
    let a = this.tlPlan.filter((item,index)=> {
      //console.log(item.planCode +"  "+ this.choosePlan);
      return item.planCode == this.choosePlan;
    });

    // check ว่า calType ก่อนหน้าเป็น  4,5 ให้ set sum เป็น 0 ก่อนเพื่อให้มีผลกับการคำนวณเบี้ย
    if (this.calType != 1) {
      this.baseIncrementer = 0;
    }

    this.calType = Number(a[0].calType);
    this.planSelected = a;
    this.quotationData.planSelected = this.planSelected;
    if (typeof this.planSelected !== 'undefined' && this.planSelected.length > 0) {
      this.broadcaster.broadcast('planSelected', this.planSelected);
    }

    if (this.choosePlan == 'TN1' && Number(this.prospect.occupationType) > 2) {
      this.prospect.occupationType = "2";
    }

    this.checkCalType();
    this.month();
  }

  async getSum(sum:string){
    // console.log("check sum >> "+sum+"  "+this.minStep);

    if(this.baseIncrementer < this.minStep){
      //this.alertCtrl.warning("ทุนไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.minStep+" - "+this.maxStep+" บาท");
      //alert("getSUm");
      setTimeout(() => {
        this.baseIncrementer = this.minStep;
      }, 20);

    }
    else if(this.baseIncrementer == this.maxStep){
      //this.alertCtrl.warning("ทุนไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.minStep+" - "+this.maxStep+" บาท");
      //alert("getSUm");
    }

    setTimeout(()=>{
      this.checkCalType();
      this.quotationData.baseIncrementer = this.baseIncrementer;
      this.broadcaster.broadcast('quatationSum', this.baseIncrementer);

    },120)

  }

  private getMode(){
    //debugger;
    this.quotationData.mode = this.mode;
    this.broadcaster.broadcast('quatationMode', this.mode);
    if(this.calType == 2) {
      this.getPremiumPackage();
    }
    else if(this.calType ==1){
      this.checkCalType();
    }
    this.month();
  }

  /**
   * เช็คAlert ชุดหลักทิ้ง ชุดใหม่แทน
   **/
  private month(): void {
    if(this.planSelected && this.planSelected[0]) {
      // รายเดือน
      let selectplan : any = this.planSelected[0];
      if(Number(selectplan.minSum) == 50000 && this.mode == "0" ) {
        this.sumMonth = true;
      } 
      else {
        this.sumMonth = false;
      }
    }
  }

  private getPremium(val?:string){
    if(val) {
      this.premiumTotal = val;
    } 
    else {
    // this.getSumRateO();]
      console.log("gePremium change    premiumTotal="+this.premiumTotal+"  this.calType=" +this.calType);
      if(this.calType == 2){

        this.OldindexOfPremium = this.premiumPackage.indexOf(Number(this.premiumTotal));
        //alert(this.OldindexOfPremium);
        this.premiumPackage.forEach((val,index)=>{
          if(this.premiumTotal == String(val)){
            this.broadcaster.broadcast('indexPremiumCalType', index);
          }
        })
        this.premiumFooter = this.premiumTotal;
        this.getSumRateO();
        this.quotationData.premiumFooter = this.premiumFooter;
        this.broadcaster.broadcast('premiumFooter', this.premiumFooter);
      }
      else if (this.calType == 3) {
        this.quotationData.premiumTotal = this.premiumTotal;
        this.broadcaster.broadcast('quatationPremium', this.premiumTotal);
        this.getSumRate();
      }
    }
  }

  message : string = "";

  async detectCal(){

    if (this.choosePlan == '') {
      return;
    }

    let ratePM : any;
    let objM: PmrateM = new PmrateM();
    objM.plancode = this.choosePlan;//Require = Y
    objM.typex = this.typex;//Require = Y
    //alert(this.mode);
    objM.mode = this.mode;//Require = Y
    objM.insuredage = this.insuredage;//Require = Y
    //alert(this.insuredage+"  "+this.choosePlan);
    let objMs: Array<PmrateM> = [];
    objMs.push(objM);
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PMRATE;
    reqM.serviceName = ServiceName.SELECT;
    reqM.agentid = "00770198";
    reqM.param = objMs;
    await this.apiProvider.callData(reqM).then(
      (res) => {
        //console.log(JSON.stringify(res));
        let result : any = res;
        if(result.size == 1){
          //alert(result.data[0].premium);
          ratePM = result.data[0].premium;
          let sum : string = "0";

          if(this.choosePlan.startsWith("TR") || this.choosePlan.startsWith("TT")) {
            sum = this.premCal.premiumCalTR(this.baseIncrementer+"",result.data[0].premium);
          }
          else {
            sum = this.premCal.premiumCal(this.baseIncrementer+"",result.data[0].premium,this.choosePlan);
          }

          this.premiumTotal = sum;
          this.premiumTotalReal = sum;

          this.calDiscount(Number(this.baseIncrementer), Number(sum))
          .then(res => {
            this.premiumTotal = res;
            this.quotationData.premiumTotal = this.premiumTotal;
            this.broadcaster.broadcast('quatationPremium', Number(this.premiumTotal));
            this.calWithRider(res)
              .then(result =>{
                this.premiumTotal = result;
                if( typeof this.quotationData.riderDraf === 'undefined' )
                {
                  if (Number(this.premiumTotal) > 0 && Number(this.premiumTotal) < 200 && this.mode === "0"    ) {
                    this.premiumPerMonth();
                  }

                } 

                if (this.gioMaxStep > 0) {
                  this.checkPremiumGIO(ratePM);
                }
                
                this.quotationData.premiumTotal = this.premiumTotal;
                this.broadcaster.broadcast('quatationPremium', Number(this.premiumTotal));

              },
              err =>{
                  console.log("3 >>> "+err);
              })

          },err =>{
            //console.log("2 >>> "+err);
          });


        }
        else{
          this.premiumTotal = "0";
          this.premiumTotalReal = "0";
        }

      },
      (err) => {
        //console.log(err);
      }
    );
  }


  /**
   * แสดงอาชีพสำหรับอ.1,อ.2
   */
  private fn_open_occupation(): void
  {

    let modal: Modal = this.modalCtrl.create(PopupOccupationComponent);

    modal.present();
  }

  async calDiscount(sum : number, premiumTotal : number){
    return await this.planService.getDiscount().then(scr =>
    {
      let result : Array<any> = scr;

        let data : Array<any> = result.filter((item,index)=>{
            return item.planCode === this.choosePlan;
        });
        if(data.length > 0){
          //console.log("data stringify >> "+JSON.stringify(data));

          let data2 : Array<any>  = data[0].interval.filter((item,index)=>{
            //console.log(item.minSum +"  "+item.maxSum) ;
            if(item.mode.length > 0)
              return sum >= Number(item.minSum)  && sum <= Number(item.maxSum) && item.mode.indexOf(this.mode) > -1;
            else
              return sum >= Number(item.minSum)  && sum <= Number(item.maxSum)
          })
          if(data2.length > 0){
            //console.log("data stringify2 >> "+JSON.stringify(data2));
            let discount : number = Number(data2[0].discount);
            let result = this.premCal.discountPremium(sum,discount);
            //this.premiumTotal = String(Number(this.premiumTotal) - Number(result));
            //this.premiumTotalReal = String(Number(this.premiumTotalReal) - Number(result));
//console.log("คำนวนส่วนลด calDiscount this.premiumTotal=" + premiumTotal + " result=" + result + " sum=" + sum + " discount=" + discount  );
            return String(Number(premiumTotal) - Number(result));
          }
          else{
            //console.log("calDiscoun2");

            return String(Number(premiumTotal));
          }
        }
        else
        return String(Number(premiumTotal));
    })
  }


  async getRateDiscount(sum : number){
    return await this.planService.getDiscount().then(scr =>
    {
      let result : Array<any> = scr;
        let data : Array<any> = result.filter((item,index)=>{
            return item.planCode === this.choosePlan;
        });
        if(data.length > 0){
          let data2 : Array<any>  = data[0].interval.filter((item,index)=>{
            if(item.mode.length > 0)
              return sum >= Number(item.minSum)  && sum <= Number(item.maxSum) && item.mode.indexOf(this.mode) > -1;
            else
              return sum >= Number(item.minSum)  && sum <= Number(item.maxSum)
          })
          if(data2.length > 0){
            let discount : number = Number(data2[0].discount);
console.log("คำนวนส่วนลด getRateDiscount  discount=" + discount  );
            return discount;
          }
        }
    })
  }





  async checkGio(age : string ){
    await this.planService.checkgio().then(scr=>{
      let result : Array<any> = scr;
      //console.log("eiei "+scr);
        let data : Array<any> = result.filter((item,index)=>{
            return item.planCode.indexOf(this.choosePlan) > -1
        });

        if(data.length > 0){
          //console.log("1 bingo data stringify >> "+JSON.stringify(data));

          let data2 : Array<any>  = data[0].interval.filter((item,index)=>{
            return age >= item.minage && age <= item.maxage;
            // if(item.mode.length > 0)
            //   return sum >= Number(item.minSum)  && sum <= Number(item.maxSum) && item.mode.indexOf(this.mode) > -1;
            // else
            //   return sum >= Number(item.minSum)  && sum <= Number(item.maxSum)

          })
          if(data2.length > 0){
            //console.log("2 bingo data stringify2 >> "+JSON.stringify(data2) +"  data2[0].mb=" + data2[0].mb);
            this.gioMaxStep = data2[0].mb;
          }
          else
            this.gioMaxStep = 0;
        }
        else
          this.gioMaxStep = 0;

          //console.log("4 bingo this.gioMaxStep >> "+ this.gioMaxStep  +"  this.maxStep=" + this.maxStep+ "  this.maxAlert ="+ this.maxAlert  +" ||  this.minAlert=" + this.minAlert );


    }).catch(err => console.log(err));
  }
  public premiumPerMonth() {
    this.alertCtrl.warning("ชำระรายเดือนเบี้ยประกันรวมต้องไม่ต่ำกว่า 200 บาท");
    this.mode = "1"
    this.quotationData.mode = this.mode;
    this.broadcaster.broadcast('quatationMode', this.mode);
  }
  public async checkPremiumGIO(ratePM : any) {
    let rate : any ;
    if ( this.gioMaxStep > 0 && Number(this.premiumTotal) > this.gioMaxStep )
    {
      //       console.log("3 bingo this.gioMaxStep >> "+ this.gioMaxStep
      // +" || this.maxStep=" + this.maxStep
      // +" || this.maxAlert ="+ this.maxAlert
      // +" || this.minAlert=" + this.minAlert
      // +" || this.premiumTotal="+ this.premiumTotal
      // +" || this.OldPremiumGIO="+this.OldPremiumGIO);
      // ดักไว้กันalert ซ้ำซ้อน กรณี เปลี่ยน แบบเก่าที่เป็นGIO Group A พอเปลี่ยนมา เป็นGIO Group B alert ขึ้นซ้ำ
      if ( this.OldPremiumGIO != Number(this.premiumTotal) )
        this.alertCtrl.warning('เบี้ยประกันภัยสูงสุดต้องไม่เกิน ' +  this.decimalPipe.transform(this.gioMaxStep) +' บาท');
      const newGIO: Array<string> = ["AS85","AS90","AS99","AT85","AT90","AT99","EN39","EN40"]; 
      if(newGIO.indexOf(this.choosePlan) != -1) 
      {

        await this.getRateDiscount(Number(this.baseIncrementer))
          .then(async res => {
            rate = res;
            rate = (Number(rate)*1000).toFixed(0); // json เก็บ value rate per 1000
            this.baseIncrementer = (this.gioMaxStep*100000) / (ratePM - rate);
            console.log("1 checkPremiumGIO   newGIO >> ratePM="+ratePM + " ส่วนลด=" +rate + "    (ratePM - rate) =" +(ratePM - rate)  + " this.gioMaxStep==" + this.gioMaxStep );
          },err =>{
            console.log("2 >>> "+err);
        });

      }
      else
        this.baseIncrementer = this.gioMaxStep;

      console.log("2 checkPremiumGIO   >> ratePM="+ratePM + " this.baseIncrementer =" +this.baseIncrementer);

      this.OldPremiumGIO = Number(this.premiumTotal);
        //console.log("6 bingo this.gioMaxStep >> "+ this.gioMaxStep  +"  ||  this.baseIncrementer=" + this.baseIncrementer +"  || this.premiumTotal="+ this.premiumTotal +"  || this.OldPremiumGIO="+ this.OldPremiumGIO);
      this.detectCal();
    }
    else
    {
        //console.log("7 bingo this.gioMaxStep >> "+ this.gioMaxStep  +"  ||  this.baseIncrementer=" + this.baseIncrementer +"  || this.premiumTotal="+ this.premiumTotal +"  || this.OldPremiumGIO="+ this.OldPremiumGIO);
        if (Number(this.premiumTotal) != Number(this.OldPremiumGIO) && this.gioMaxStep > 0 )
        {
          this.OldPremiumGIO = Number(this.premiumTotal);
          //console.log("8 bingo this.gioMaxStep >> "+ this.gioMaxStep  +"  ||  this.baseIncrementer=" + this.baseIncrementer +"  || this.premiumTotal="+ this.premiumTotal +"  || this.OldPremiumGIO="+ this.OldPremiumGIO);
        }
    }
  }
  async selectPlan(){

    let res = await this.planService.getTLPlan()
    .then(async res =>{

        let obj: any = res;
        let resModel: ResponseModel = obj;

        if (resModel.data.length > 0) {
          this.tlPlan = resModel.data;
          //console.log(resModel.data);
          this.tlPlanAll = this.tlPlan; // เก็บข้อมูล tlPlanAll เป็น default

          // if (resModel.data.length <= 10) {
          //   this.choosePlan = resModel.data[0].planCode;
          // }

          let defaultPlan = this.tlPlan.filter((item,index)=> {
            return item.planCode == this.choosePlan;
          });

          if (defaultPlan == undefined || defaultPlan[0] == undefined) {
            // defaultPlan = [resModel.data[0]];
            defaultPlan = [];
            this.calType = 1;
          }
          else
            this.calType = Number(defaultPlan[0].calType);

          // get tlplan จากที่ plan ที่เลือก
          this.planSelected = defaultPlan;
          this.quotationData.planSelected = this.planSelected;

          if (typeof this.planSelected !== 'undefined' && this.planSelected.length > 0) {
            this.broadcaster.broadcast('planSelected', this.planSelected);
          }

          //this.broadcaster.broadcast('defaultPlan', this.planSelected[0].planCode);

         //return a;
        }
        else {
          this.alertCtrl.warning('คุณยังไม่ได้เลือกแบบประกันใน Version TL PRO PLUS Mini');
          this.navCtrl.setRoot('HomePage');
        }
    })
    .catch(err =>{
      //console.log(err);
    });

    this.filterPlan();
    return res;
  }

  async setValueMinMax(){

    if (this.choosePlan == '')
      return;

    let selectplan : any = this.planSelected[0];

    // if(selectplan.planCode == 'TE12' && this.typex != 'F'){
    //   this.alertCtrl.warning('เฉพาะเพศหญิงเท่านั้น');
    //   this.typex = 'F';
    //   this.prospect.gender = 'F';

    //   if (Number(this.prospect.age) > 19)
    //     this.prospect.preName = 'นางสาว';
    //   else
    //     this.prospect.preName = 'เด็กหญิง';
    // }
    // if(selectplan.planCode == 'TE13'  && this.typex != 'M'){
    //   this.alertCtrl.warning('เฉพาะเพศชายเท่านั้น');
    //   this.typex = 'M';
    //   this.prospect.gender = 'M';

    //   if (Number(this.prospect.age) > 19)
    //     this.prospect.preName = 'นาย';
    //   else
    //     this.prospect.preName = 'เด็กชาย';
    // }
    await this.checkGio(this.insuredage);

    if(this.choosePlan == 'SN' && this.prospect.age == '0'){
      this.minStep = 100000;
      this.maxStep = 500000;
      if(this.baseIncrementer > 500000) {
        this.baseIncrementer = 500000;
        this.maxAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.decimalPipe.transform(this.minStep)+" - "+this.decimalPipe.transform(this.maxStep)+" บาท";
        this.minAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.decimalPipe.transform(this.minStep)+" - "+this.decimalPipe.transform(this.maxStep)+" บาท";
      }
      else{
        this.maxAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.decimalPipe.transform(this.minStep)+" - "+this.decimalPipe.transform(this.maxStep)+" บาท";
        this.minAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.decimalPipe.transform(this.minStep)+" - "+this.decimalPipe.transform(this.maxStep)+" บาท";
      }
    }
    else if (this.choosePlan == 'WN' && Number(this.prospect.age) < 15){
      this.minStep = 200000;
      this.maxStep = 300000;
      if(this.baseIncrementer > 300000) {
        this.baseIncrementer = 300000;
        this.maxAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.decimalPipe.transform(this.minStep)+" - "+this.decimalPipe.transform(this.maxStep)+" บาท";
        this.minAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.decimalPipe.transform(this.minStep)+" - "+this.decimalPipe.transform(this.maxStep)+" บาท";
      }
    }
    else{
      //console.log("5 bingo this.gioMaxStep=" + this.gioMaxStep + "  this.premiumTotal="+this.premiumTotal+"  this.maxStep="+ this.maxStep);
      this.minStep=  Number(selectplan.minSum);
      this.maxStep =  Number(selectplan.maxSum);
      let message = this.maxStep == 999999999?"ไม่จำกัด":this.decimalPipe.transform(this.maxStep);
      this.maxAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.decimalPipe.transform(this.minStep)+" - "+message+" บาท";

      // แบบประกันปกติจะแสดงค่าสูงสุด
      if (this.gioMaxStep == 0) {
        this.minAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุดและสูงสุด "+this.decimalPipe.transform(this.minStep)+" - "+message+" บาท";
      // เฉพาะแบบประกันที่เป็น GIO จะไม่แสดงค่าสูงสุด
      }
      else {
        this.minAlert = "ทุนประกันไม่อยู่ในช่วงต่ำสุด "+this.decimalPipe.transform(this.minStep)+" บาท";
      }

    }

    if (this.choosePlan == 'EN36' && this.soldier != '' ) {
      this.baseIncrementer = this.baseIncrementer;
    }

    if (Number(selectplan.minSum) == 50000 && this.baseIncrementer < 100000 && this.baseIncrementer != 0 && this.mode == "0" ) {
      this.alertCtrl.warning("ชำระรายเดือนทุนประกันต้องไม่ต่ำกว่า 100,000 บาท");
      this.baseIncrementer = 100000;
    }
    else if(this.baseIncrementer == 0){
      
      if (typeof(this.quotation) !== 'undefined' && Number(this.quotation.lifesum) > 0) {
        this.baseIncrementer = Number(this.quotation.lifesum);
      }
      else {
        this.baseIncrementer  = selectplan.maxSum == '999999999' ? 1000000: Number(selectplan.maxSum);
      }
    }
    else if(Number(selectplan.maxSum) < Number(this.baseIncrementer) || isNaN(this.baseIncrementer)){
      
      if (typeof(this.quotation) !== 'undefined' &&  Number(this.quotation.lifesum) > 0){
        this.baseIncrementer = Number(this.quotation.lifesum);
      }
      else {
        this.baseIncrementer =  selectplan.maxSum == '999999999' ? 1000000: Number(selectplan.maxSum);
      }
    }

    if (this.minStep > this.baseIncrementer){
        //this.alertCtrl.warning("ชำระรายเดือนทุนประกันต้องไม่ต่ำกว่า 200,000 บาท");
        this.baseIncrementer = this.minStep;
    }

    if (this.choosePlan == 'SN' && this.prospect.age == '0') {
      this.minStep = 100000;
      this.maxStep = 500000;
      if (this.baseIncrementer > 500000) {
        this.baseIncrementer = 500000;
      }
    }
    
    this.quotationData.baseIncrementer = this.baseIncrementer;
    this.broadcaster.broadcast('quatationSum', this.baseIncrementer);
    this.minAge = selectplan.minAge;
    this.maxAge = selectplan.maxAge;

  }

  //ESAge = 0;
  async setMinMaxStep()
  {
    if(!this.tlPlan) return;
    if(typeof this.planSelected == undefined || null) {
      this.planSelected = this.tlPlan.filter(item => item.planCode == this.choosePlan);
    }
   /* if (typeof(this.planSelected) !== 'undefined')
    {*/
      let selectplan : any = this.planSelected.length > 0 ? this.planSelected[0] : { minAge: '0', maxAge: '0' };
      //console.log("setMinMaxStep   insuredage=" + this.insuredage);
      await this.setValueMinMax();
      let remark = "";
      let pc =["EN33","EN34","EN35","EN38"];
      if(Number(this.insuredage) > 65) {
        pc.forEach(element => {
          if(this.choosePlan == element) {
            remark = "ผู้ขอเอาประกันอายุ 66 ปีขึ้นไปต้องใช้ หนังสือรับทราบการขอทำประกันชีวิต (ปช.01-10) ประกอบการขอเอาประกัน สามารถพิมพ์ อยู่ในหน้าใบเสนอขาย หน้าสุดท้าย<br/><br/>";
          }
        });
      }
      // debugger;
      this.minAge = selectplan.minAge;
      this.maxAge = selectplan.maxAge;
      //จำนวนวัน (นับจากวันปัจจุบันถึงวันเกิด)
      let day: number = moment().diff(moment(this.prospect.birthDate), 'days');
      let dayOfMonth: number = moment().diff(moment().subtract(1, 'months'), 'days');
      let year: number = moment().diff(moment(this.prospect.birthDate), 'year');
      let hour = moment().diff(this.prospect.birthDate ,'hours');
      
      // Detect max age
      const minDatetime = moment().subtract(MAX_AGE, 'year').format('YYYY-MM-DD');
      const maxAge = moment().diff(minDatetime, 'year');
      console.log('minDatetime: '+minDatetime, 'maxAge: '+maxAge, 'year: '+year, 'MAX_AGE: '+MAX_AGE);
      
      if (year > maxAge) {
        this.prospect.birthDate = minDatetime;
        this.alertCtrl.warning("อายุสูงสุดไม่เกิน 99 ปี");
      }

      // debugger;
      if (this.choosePlan != '') {
        if(this.choosePlan == "SN"){
           // do nothing
        }
        else if(this.choosePlan == "SQ"){
          // อายุต้อง >= 15 วัน
          if((this.oldInsuredage == (Number(this.insuredage) < 0 ? "0" : this.insuredage) ) && day < 15) {
            this.insuredage = "-1";
            this.oldInsuredage = this.insuredage;
          }
        }
        else{
          // อายุต้อง >= 30 วันขึ
          if((this.oldInsuredage == (Number(this.insuredage) < 0 ? "0" : this.insuredage) ) && day < dayOfMonth) {
            this.insuredage = "-1";
            this.oldInsuredage = this.insuredage;
          }
        }
      }


      let payYearKB = '0';
      if (this.planSelected.length > 0)
        payYearKB = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.insuredage)));

        //แบบประกัน ES  ตรวจอายุ ช่วงผู้เอาประกัน 0-5 แล้วผู้ปกครองอายุต่ำกว่า 35  ให้ขึ้นคำเตือน ไม่ต้องset เด็กใหม่  *มีผลแค่อายุผู้ปกครอง คบ
      //if(this.choosePlan.toUpperCase() == "ES" || this.choosePlan.toUpperCase() == "WY60" && !isNaN(this.rider['KB2'].age)) {
      if(Number(payYearKB) > 25 && this.rider['KB2'] && !isNaN(this.rider['KB2'].age)) {

        if(this.rider['KB2'] && typeof this.rider['KB2'].birth == 'string' && moment(this.rider['KB2'].birth).isValid()) {

          if(year < 6 ) { // 0-5 ปี อายุเด็ก
            if (Number(this.rider['KB2'].age) < 35) { // อายุ ผู้ปกครอง
              this.rider['KB2'].birth = moment().subtract(35, 'year').format('YYYY-MM-DD');
              this.alertCtrl.warning(remark+"อายุผู้ปกครองไม่อยู่ในช่วงต่ำสุดและสูงสุด (35- 50 ปี)");
            } 
            else if (Number(this.rider['KB2'].age) > 50) {
              this.rider['KB2'].birth = moment().subtract(50, 'year').format('YYYY-MM-DD');
              this.alertCtrl.warning(remark+"อายุผู้ปกครองไม่อยู่ในช่วงต่ำสุดและสูงสุด (35- 50 ปี)");
            }
          }
        }
      }

      if (Number(this.insuredage) < Number(selectplan.minAge)) {

        //เฉพาะ SN อายุเป็น 0 ได้ เมื่อ day <= 90
        let sn: boolean = false;
        if ("SN" == this.choosePlan) {
          let dateChoose = this.prospect.birthDate;
          if (year < 19) {
            if (day > 90) {
              this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด แรกเกิด - 90 วัน");
              this.prospect.birthDate = moment().subtract(90, 'days').format('YYYY-MM-DD');// ถอยหลัง 90 วัน
              this.insuredage ="0";
              this.prospect.age = "0";
              this.broadcaster.broadcast('prospect',this.prospect);
            } 
            else if(hour < 0) {
              this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด แรกเกิด - 90 วัน");
              this.prospect.birthDate = moment().format('YYYY-MM-DD');// แรกเกิด
              this.insuredage ="0";
              this.prospect.age = "0";
              this.broadcaster.broadcast('prospect',this.prospect);
            }
            sn = true;
          }
  //console.log("1 SN     this.prospect.age=" +  this.prospect.age +"    this.insuredage== " +this.insuredage );
  //debugger;
        }
        if(!sn) {
          /*this.insuredage = String(Number(selectplan.minAge));
          this.prospect.age = String(Number(selectplan.minAge));

          if(Number(this.minAge) == 0) {
            if(this.choosePlan.toUpperCase() == "SQ") {
              if(day < 15 ) { // 15 วัน
                this.prospect.birthDate = moment().subtract(15, 'days').format('YYYY-MM-DD');// ถอยหลัง 15 วัน
                this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด 15 วัน - "+Number(this.maxAge)+" ปี");
              }
            } else {
              this.prospect.birthDate = moment().subtract(1, 'months').format('YYYY-MM-DD');// ถอยหลัง 1 เดือน
              this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด 1 เดือน - "+Number(this.maxAge)+" ปี");
            }
          }else{
            this.prospect.birthDate = moment().subtract(this.prospect.age , 'year').format('YYYY-MM-DD');// ตามค่าต่ำสุดของวันเกิด
            this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด "+Number(this.minAge)+" - "+Number(this.maxAge)+" ปี");
          }
          this.broadcaster.broadcast('prospect',this.prospect);  */
        }
      }/*else if(Number(this.insuredage) > Number(selectplan.maxAge)){
        //อายุปัจจุบันมากกว่าอายุMaxของPlanCode
        this.insuredage = selectplan.maxAge;
        this.prospect.age = selectplan.maxAge;
        this.prospect.birthDate = moment().subtract(this.prospect.age, 'year').format('YYYY-MM-DD');
        if(Number(this.minAge) == 0) {
          if(this.choosePlan.toUpperCase() == "SQ") {
            this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด 15 วัน - "+Number(this.maxAge)+" ปี");
          } else {
            this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด 1 เดือน - "+Number(this.maxAge)+" ปี");
          }
          this.prospect.birthDate = moment().subtract(Number(this.insuredage), 'year').format('YYYY-MM-DD');
        } else {
          this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด "+Number(this.minAge)+" - "+Number(this.maxAge)+" ปี");
        }
        this.broadcaster.broadcast('prospect',this.prospect);
      }*/
      else if (this.oldAge != this.prospect.age) {
        this.oldAge = this.prospect.age;
        console.log("remark=" +remark+"  oldAge="+this.oldAge +"  prospect.age="+this.prospect.age);
        if (remark != '') {
          this.alertCtrl.warning(remark);
        }
      } 
      else { 
        this.oldInsuredage = "0";
      }

      if (this.planSelected.length > 0) {
        await this.findMode(selectplan.modeOK);
      }
  
  }

  async findMode(modeOK: string){

    // หา  mode ของแบบประกันว่าเป็น mode ไหน
    let b : any = await this.modeList.filter((item,index)=> {return (item.modeCode === modeOK)});
    
    this.dlMode = b[0].data;
    
    this.broadcaster.broadcast('dlMode', this.dlMode);

    if (this.mode != '') {

      let c : any = await this.dlMode.filter((item,index)=> {return (item.value === this.mode)});
      //console.log("REVIEW: >> "+JSON.stringify(c));
      if (c.length == 0) {
        if(modeOK== "11110" || modeOK == "01110") {
          this.mode = "1"
        }
        else {
          this.mode = b[0].data[0].value;
        }
      }
      else {
        this.mode = c[0].value;
      }
    }
    else {
      if (modeOK== "11110" || modeOK == "01110") {
        this.mode = "1"
      }
      else {
        this.mode = b[0].data[0].value;
      }
    }
  }
  async calWithRider(premium : string){

    if( Object.keys(this.rider).length === 0  || this.calType == 0) {
      this.premiumFooter = premium;
      /************************************************* */
     // console.log("PremiumFooter_1 = "+this.premiumFooter);
      this.quotationData.premiumFooter = this.premiumFooter;
      this.broadcaster.broadcast('premiumFooter', this.premiumFooter);
      /************************************************* */
      return premium;
    }

    let  riderLocal: any = this.rider;
    if( typeof(riderLocal['AC01'].sum) === 'undefined')
      return premium;

    let date = new Date();
    let currentMonth = String(date.getMonth() + 1).length == 1 ? "0"+String(date.getMonth() + 1) :String(date.getMonth() + 1);
    let currentYear = String(date.getFullYear() + 543);
    let currentDay = String(date.getDay()).length == 1 ? "0"+String(date.getDay()) : String(date.getDay());
    let payDate = currentYear+currentMonth+currentDay;

    let ac01 =  await this.premCal.AC01(0,Number(this.mode),this.occupationType,riderLocal['AC01'].sum);
    this.rider['AC01'].premium = ac01;
    let ac02 =  await this.premCal.AC02(0,Number(this.mode),this.occupationType,riderLocal['AC02'].sum);
    this.rider['AC02'].premium = ac02;

    let tac01 =  await this.premCal.TAC01(0,Number(this.mode),this.occupationType,riderLocal['TAC01'].sum);
    this.rider['TAC01'].premium = tac01;
    let tac02 =  await this.premCal.TAC02(0,Number(this.mode),this.occupationType,riderLocal['TAC02'].sum);
    this.rider['TAC02'].premium = tac02;

    let ac03 =  await this.premCal.AC03(0,Number(this.mode),this.occupationType,riderLocal['AC03'].sum);
    this.rider['AC03'].premium = ac03;

    let kg1 =  await this.premCal.KG1(0,Number(this.mode),this.occupationType,riderLocal['KG1'].sum);
    this.rider['KG1'].premium = kg1;
    let kg2 =  await this.premCal.KG2(0,Number(this.mode),this.occupationType,riderLocal['KG2'].sum,payDate);
    this.rider['KG2'].premium = kg2;


    let tkg1 =  await this.premCal.TKG1(0,Number(this.mode),this.occupationType,riderLocal['TKG1'].sum);
    this.rider['TKG1'].premium = tkg1;
    let tkg2 =  await this.premCal.TKG2(0,Number(this.mode),this.occupationType,riderLocal['TKG2'].sum,payDate);
    this.rider['TKG2'].premium = tkg2;

    let rp =  await this.premCal.RP(Number(this.insuredage),Number(this.mode),riderLocal['RP'].sum);
    this.rider['RP'].premium = rp;

    let rpg =  await this.premCal.RPG(Number(this.insuredage),Number(this.mode),this.occupationType,this.typex,riderLocal[this.conf.rider('RPG')].sum);
    this.rider[this.conf.rider('RPG')].premium = rpg;

    //alert(this.planSelected[0].endowmentType+"  "+this.planSelected[0].pEndowmentYear+"   "+String(Number(this.planSelected[0].pEndowmentYear) - Number(this.insuredage)));

    let endowmentYeartemp =  (this.planSelected[0].endowmentType === "0" ? this.planSelected[0].pEndowmentYear : String(Number(this.planSelected[0].pEndowmentYear) - Number(this.insuredage)));
    //alert(this.planSelected[0].payType +"  "+ this.planSelected[0].pPayYear+" "+String(Number(this.planSelected[0].pPayYear) - Number(this.insuredage)));
    let payYear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.insuredage)));
    //console.log(new Date().toLocaleDateString().split(',')[0]);
    //console.log(this.planSelected[0].pEndowmentYear +" endowmentYear  "+endowmentYeartemp+"  "+payYear);

    let endowmentYear = await this.premCal.endowmentYear(Number(this.insuredage),endowmentYeartemp,payYear)
    // debugger;
    this.broadcaster.broadcast('endowmentYear',endowmentYear);
    let d01 =  await this.premCal.D01(Number(this.insuredage),endowmentYear,Number(this.mode),this.typex,riderLocal[this.conf.rider('D01')].sum);
    this.rider[this.conf.rider('D01')].premium = d01;
    let d02 =  await this.premCal.D02(Number(this.insuredage),endowmentYear,Number(this.mode),this.typex,riderLocal[this.conf.rider('D02')].sum);
    this.rider[this.conf.rider('D02')].premium = d02;
    let d03 =  await this.premCal.D03(Number(this.insuredage),Number(this.mode),this.typex,riderLocal['D03'].sum);
    //console.log(d03);
    this.rider['D03'].premium = d03;
    let vp =  await this.premCal.VP34678(Number(this.insuredage),Number(this.mode),this.occupationType,this.typex,riderLocal['VP'].sum);
    this.rider['VP'].premium = vp;

    // let vp4 =  await this.premCal.VP345678(Number(this.insuredage),Number(this.mode),this.occupationType,this.typex,riderLocal['VP4'].sum,"VP4");
    // this.rider['VP4'].premium = vp4;
    let vp5 =  await this.premCal.VP5(Number(this.insuredage),Number(this.mode),this.occupationType,this.typex,riderLocal['VP5'].sum);
    this.rider['VP5'].premium = vp5;

    let smartvip =  await this.premCal.SmartV(Number(this.insuredage),Number(this.mode),this.occupationType,this.typex,riderLocal['V'].sum);
    this.rider['V'].premium = smartvip;
    let sr2 =  await this.premCal.SR2(Number(this.insuredage),Number(this.mode),this.occupationType,this.typex,riderLocal['SR2'].sum);
    this.rider['SR2'].premium = sr2;
    let g =  await this.premCal.G0(Number(this.insuredage),Number(this.mode),this.occupationType,this.typex,riderLocal['G'].sum);
    this.rider['G'].premium = g;
    let h =  await this.premCal.H(Number(this.insuredage),Number(this.mode),this.occupationType,this.typex,riderLocal['H'].sum);
    this.rider['H'].premium = h;
    //{sum: 0, premium: 0, birth: "1988-01-10", age: 30, sex: "F"}
    //riderLocal['KB2'].age;
    //console.log(currentYear+" "+currentMonth +"  "+currentDay);


    //console.log("temp > "+endowmentYeartemp);

    endowmentYear = await this.premCal.endowmentYearJP4(endowmentYeartemp);
    let jp4 =  await this.premCal.JP4(Number(this.insuredage),endowmentYear,Number(this.mode),this.typex,riderLocal['JP'].sum);
    this.rider['JP'].premium = jp4;

    let th =  await this.premCal.TH(Number(this.insuredage),this.occupationType,Number(this.mode),this.typex,riderLocal['TH'].sum,payDate);
    this.rider['TH'].premium = th;
    let trp=  await this.premCal.TRP(Number(this.insuredage),this.occupationType,Number(this.mode),this.typex,riderLocal['TRP'].sum);
    this.rider['TRP'].premium = trp;

    let j0 = "0";
    j0 =  await this.premCal.J0(Number(this.insuredage),Number(this.mode),this.typex,riderLocal['J0'].sum);
    this.rider['J0'].premium = j0;

    let kb2 = "0";
    let premTot = Number(premium)+Number(ac01)+Number(ac02)+Number(kg1)+Number(kg2)+Number(ac03)+Number(rp)+Number(rpg)+Number(d01)+Number(d02)+Number(d03)+Number(vp)+Number(vp5)+Number(smartvip)+Number(sr2)+Number(g)+Number(h)+Number(jp4)+Number(j0);

    endowmentYear = await this.premCal.endowmentYearKB(Number(this.insuredage),riderLocal['KB2'].age,payYear);
    kb2 =  await this.premCal.KB2(riderLocal['KB2'].age,endowmentYear,Number(this.mode),riderLocal['KB2'].sex,Number(premTot));
    this.rider['KB2'].premium = kb2;

    let tt = "0";
    if(this.choosePlan.startsWith("TR") || this.choosePlan.startsWith("TT") ){
      tt=  await this.premCal.TT((this.insuredage),(this.mode),this.typex,String(this.baseIncrementer),this.choosePlan);
      this.broadcaster.broadcast('hiddenRider', tt);
    }
    else{
      this.broadcaster.broadcast('hiddenRider', tt);
    }


    //this.rider['TT'].premium = tt;

    //new Date().toLocaleDateString().split(',')[0];
   // console.log("944 >> "+premium+"  "+tt);
   //console.log("555dddd");
    let planfee = ["AJ", "AG01", "AH01", "AI01", "AM01"];
    if(planfee.indexOf(this.choosePlan) > -1){
      premium = String(Number(premium) + 3000);
    }

    let hiddenrider = "0";
    if(this.choosePlan.startsWith("TR") || this.choosePlan.startsWith("TT")){
      hiddenrider = String(Number(premium)+Number(ac01)+Number(ac02)+Number(kg1)+Number(kg2)+Number(ac03)+Number(rp)+Number(rpg)+Number(d01)+Number(d02)+Number(d03)+Number(vp)+Number(vp5)+Number(smartvip)+Number(sr2)+Number(g)+Number(h)+Number(kb2)+Number(jp4)+Number(tac01)+Number(tac02)+Number(tkg1)+Number(tkg2)+Number(th)+Number(trp)+Number(tt));
      this.premiumFooter = hiddenrider;
    }else{
      this.premiumFooter = premium;
    }

    /*************************************************** */
    //console.log("PremiumFooter_2 = "+this.premiumFooter);
    this.quotationData.premiumFooter = this.premiumFooter;
    this.broadcaster.broadcast('premiumFooter', this.premiumFooter);
    /**************************************************** */
    this.riderFooter = String(Number(ac01)+Number(ac02)+Number(kg1)+Number(kg2)+Number(ac03)+Number(rp)+Number(rpg)+Number(d01)+Number(d02)+Number(d03)+Number(vp)+Number(vp5)+Number(smartvip)+Number(sr2)+Number(g)+Number(h)+Number(kb2)+Number(jp4)+Number(tac01)+Number(tac02)+Number(tkg1)+Number(tkg2)+Number(th)+Number(trp)+Number(j0));
    //console.log((Number(premium)+" "+Number(ac01)+" "+Number(ac02)+" "+Number(kg1)+" "+Number(kg2)+" "+Number(ac03)));
    //console.log((Number(rp)+" "+Number(rpg)+" "+Number(d01)+" "+Number(d02)+" "+Number(d03)+" "+Number(vp)));
    //console.log((Number(vp5)+" "+Number(smartvip)+" "+Number(sr2)+" "+Number(g)+" "+Number(h)+" "+Number(kb2)));
    //console.log((Number(premium),Number(ac01),Number(ac02),Number(kg1),Number(kg2),Number(ac03),Number(rp),Number(rpg),Number(d01),Number(d02),Number(d03),Number(vp),Number(vp5),Number(smartvip),Number(sr2),Number(g),Number(h),Number(kb2),Number(jp4),Number(tac01),Number(tac02),Number(tkg1),Number(tkg2),Number(th),Number(trp),Number(tt)));

    //console.log(premium+" ac01 > "+ac01 + " ac02 > " +ac02+" kg1 >"+kg1+" kg2 > "+kg2 + " ac03 > "+ac03+" rpg > "+rpg+" d01 > "+d01+" d02 > "+d02+" d03 > "+d03+" vp > "+vp+" vp5 > "+vp5+" V > "+smartvip+ " g > "+g+" h > "+h+"  kb2 > "+kb2+"  jp4 > "+jp4);
    return String(Number(premium)+Number(ac01)+Number(ac02)+Number(kg1)+Number(kg2)+Number(ac03)+Number(rp)+Number(rpg)+Number(d01)+Number(d02)+Number(d03)+Number(vp)+Number(vp5)+Number(smartvip)+Number(sr2)+Number(g)+Number(h)+Number(kb2)+Number(jp4)+Number(tac01)+Number(tac02)+Number(tkg1)+Number(tkg2)+Number(th)+Number(trp)+Number(tt)+Number(j0));

  }



  async checkPlanFee(premium : Number){
   let result =   await this.planService.planfee().then(scr=>{
      let result : Array<any> = scr;
     // console.log("boom planfee "+scr);

        let data : Array<any> = result.filter((item,index)=>{
            return item.planCode.indexOf(this.choosePlan) > -1
        });
        if(data.length > 0){
          //console.log("boom planfee data stringify >> "+JSON.stringify(data) + " data.length=" + data.length);
          //console.log("boom  premiumTotal=" + premium +" fee="+data[0].fee  );
          //this.premiumTotal = String( premium + data[0].fee);
          return data[0].fee;
        }
        else
        {
          return "0";
        }


    }).catch(err => console.log(err));
    return result
  }

  /**
   * เบี้ยประกันภัยรวมที่ซื้อได้
   */
  async getPremiumPackage() {
    if (this.choosePlan == '') {
      return;
    }

    if (this.calType != 1) {
      let obj: PremiumPackageM = new PremiumPackageM();
      obj.plancode = this.choosePlan;//Require = Y
      obj.mode = this.mode;//Require = Y
      obj.sex = this.prospect.gender;//Require = Y
      obj.age = this.prospect.age;//Require = Y

      let objs: Array<PremiumPackageM> = [];
      objs.push(obj);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.PREMIUM_PACKAGE;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = objs;

      await this.apiProvider.callData(reqM).then(
        (res) => {
          let min: number = res['data'][0]['minpremium'];
          let max: number = res['data'][0]['maxpremium'];
          let step: number = res['data'][0]['step'];

          this.premiumPackage = [];
          for (let i = min; i <= max; i += step) {
            this.premiumPackage.push(i);

          }

          if(this.OldindexOfPremium == 0){
            this.premiumTotal = min.toString();
          }
        //  else if(this.premiumPackage.indexOf(Number(this.premiumTotal)) <= -1){
          else{
            //console.log("OldindexOfPremium==" + this.OldindexOfPremium);
            this.premiumTotal = String(this.premiumPackage[this.OldindexOfPremium]);
            // this.OldindexOfPremium = this.premiumPackage.indexOf(Number(this.premiumTotal));
            // console.log(this.OldindexOfPremium);

          }
          this.quotationData.premiumTotal = this.premiumTotal;
          this.broadcaster.broadcast('quatationPremium', Number(this.premiumTotal));
          //console.log("success getPremiumPackage  premiumTotal="+this.premiumTotal);
        },
        (err) => {
          this.alertCtrl.error(err);
        }
      );
    }
  }

  async getSumRateO(){
    
    if (this.choosePlan == '') {
      return;
    }

    let objM: SumrateoM = new SumrateoM();
    //console.log("mode="+ this.mode +"  premiumTotal="+this.premiumTotal);
    //debugger;
    objM.plancode = this.choosePlan;//Require = Y
    objM.sex = this.typex;//Require = Y
    objM.premium = this.premCal.factorCalType(Number(this.mode) ,Number(this.premiumTotal));//Require = Y
    objM.insuredage = this.insuredage;//Require = Y
    //console.log(objM);

    let objMs: Array<SumrateoM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.SUMRATEO;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs;
    //console.log(objMs);

    await this.apiProvider.callData(reqM).then(
      (res) => {
        let obj: any = res;
        //console.log(JSON.stringify(res));
        this.baseIncrementer = obj.data[0].sum;
        this.quotationData.baseIncrementer = this.baseIncrementer;
        this.broadcaster.broadcast('quatationSum', this.baseIncrementer);
        console.log("success SumRateO");
      },
      (err) => {
        console.log(err);
      }
    );

  }

  async getSumRate(){

      if (this.choosePlan == '') {
        return;
      }
    
      let objM: SumrateM = new SumrateM();
      console.log("getSumRate" + this.choosePlan+"  "+this.typex+"  "+this.premiumTotal+"  "+this.insuredage);

      objM.plancode =  this.choosePlan;//Require = Y
      objM.sex = this.typex;//Require = Y
      //objM.premium = this.premCal.factorCalType(Number(this.mode) ,Number(this.premiumTotal));//Require = Y
      objM.premium = this.premiumTotal;
      objM.insuredage = this.insuredage;//Require = Y
      //console.log(objM);
      let objMs: Array<SumrateM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.SUMRATE;
      reqM.serviceName = ServiceName.SELECT;
      //reqM.searchkey = ""all"";
      reqM.agentid = "00770198";
      reqM.param = objMs;

      await this.apiProvider.callData(reqM).then(
        (res) => {
          let obj: any = res;
          //console.log(JSON.stringify(obj.data[0]));
          this.premiumFooter =  String(Math.floor(Number(this.premiumTotal)));
          this.baseIncrementer = obj.data[0].sum;
          this.quotationData.baseIncrementer = this.baseIncrementer;
          this.quotationData.premiumFooter = this.premiumFooter;
          this.broadcaster.broadcast('quatationSum', this.baseIncrementer);
          this.broadcaster.broadcast('premiumFooter', this.premiumFooter);
        },
        (err) => {
          console.log(err);
        }
      );

  }

  async getPackageDetail(){

    if (this.choosePlan == '') {
      return;
    }

    let objM: PackageDetailM = new PackageDetailM();
    objM.plancode = this.choosePlan;//Require = Y
    objM.occupationtype = this.occupationType;//Require = Y
    objM.age = this.insuredage;

    let objMs: Array<PackageDetailM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PACKAGE_DETAIL;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs;
    this.premiumPackage = [];
    await this.apiProvider.callData(reqM).then(
      (res) => {

        console.log('----------------- PACKAGE_DETAIL ------------ res', res);
        console.log('----------------- PACKAGE_DETAIL ------------ res', JSON.stringify(res));

        let obj: any = res;
        if(obj.status == 0 && obj.size > 0){
          let okpackage = obj.data[0].okpackage;
          this.packages = okpackage.split(',');
          if(this.package == "" || this.packages.indexOf(this.package) <= -1) {
            this.package = this.packages[0];
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async getPremiumRate(){

    if (this.choosePlan == '') {
      return '0';
    }

    let objM: PremiumRateM = new PremiumRateM();
    objM.plancode = this.choosePlan; //Require = Y
    //console.log("getPremiumRate sex >> "+this.typex+" mdoe >  "+this.mode+"  age  > "+this.insuredage+"  package > "+this.package );

    objM.sex = this.typex; //Require = Y
    objM.mode = this.mode; //Require = Y
    objM.age = this.insuredage; //Require = Y
    objM.packages = this.package; //Require = Y

    let objMs: Array<PremiumRateM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PREMIUMRATE;
    reqM.serviceName = ServiceName.SELECT;
   // reqM.searchkey = ""all"";
    reqM.param = objMs;

    let a = await this.apiProvider.callData(reqM).then(
      (res) => {
        let obj: any = res;
        if(obj.status == 0 && obj.size > 0){
          //console.log(JSON.stringify(res));
          this.premiumTotal = obj.data[0].premium;
          this.premiumFooter = obj.data[0].premium;
          //console.log(this.premiumTotal);
          return obj.data[0].premium;
        }
      },
      (err) => {
        console.log(err);
      }
    );

    return a;
  }

  async getCoverageRate(){

      if (this.choosePlan == '') {
        this.baseIncrementer = 0
        this.quotationData.baseIncrementer = this.baseIncrementer;
        this.broadcaster.broadcast('quatationSum', this.baseIncrementer);
        return;
      }

      let objM: PackageCoverageM = new PackageCoverageM();
      objM.plancode = this.choosePlan; //Require = Y
      objM.pan = this.package; //Require = Y

      let objMs: Array<PackageCoverageM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.PACKAGE_COVERAGE;
      reqM.serviceName = ServiceName.SELECT;
      //reqM.searchkey = "all";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
      (res) => {
        let obj: any = res;
        if(obj.status == 0 && obj.size > 0){
          //console.log(JSON.stringify(res));
          this.baseIncrementer = obj.data[0].lifesum;
          this.quotationData.baseIncrementer = this.baseIncrementer;
          this.broadcaster.broadcast('quatationSum', this.baseIncrementer);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async selectPackage(){

    if (this.choosePlan == '') {
      return;
    }
    
    //console.log("selectPackage="+this.package);
    //let premiumplan ;
    this.quotationData.package = this.package;
    this.broadcaster.broadcast('quatationPackage', this.package);
    if(this.calType == 4 ){
      //premiumplan = await this.getPremiumRate();
      let premium = await this.getPremiumRate();
      await this.getCoverageRate();
      let ap5 = "0";
      if(this.choosePlan == 'TE08')
      {
        ap5 =  await this.premCal.AP5(this.insuredage,this.mode,this.typex,this.package);
        //this.rider['AP5'].premium = ap5;

      }
      let d08 = "0";
      if(this.choosePlan == 'TE08' || this.choosePlan == 'TE05')
      {
        d08 =  await this.premCal.D08(this.insuredage,this.mode,this.typex,this.package);
        //this.rider['D08'].premium = d08;
      }

      let hd = "0";
      if(this.choosePlan == 'TE08' || this.choosePlan == 'TE05')
      {
        hd =  await this.premCal.HD(this.insuredage,this.mode,this.typex,this.package);
        //this.rider['HD'].premium = hd;
      }

      let ha = "0";
      if(this.choosePlan == 'TE03')
      {
        ha =  await this.premCal.HA(this.insuredage,this.mode,this.typex,this.package);

      }

      let c00 = "0";
      if(this.choosePlan == 'TE03')
      {
        c00 =  await this.premCal.C00(this.insuredage,this.mode,this.typex,this.package);
        //this.rider['HD'].premium = hd;
      }

      let c11 = "0";
      let c12 = "0";
      if(this.choosePlan == 'TE02')
      {
        c11 =  await this.premCal.C11(this.insuredage,this.mode,this.typex,this.package);
        c12 =  await this.premCal.C12(this.insuredage,this.mode,this.typex,this.package);
      }


      let c01 = "0";
      let c02 = "0";
      if(this.choosePlan == 'TE01')
      {
        c01 =  await this.premCal.C01(this.insuredage,this.package);
        c02 =  await this.premCal.C02(this.insuredage,this.package);
        //this.rider['HD'].premium = hd;
      }

      let d13 = "0";
      if( this.choosePlan == 'TE14')
      {
        d13 =  await this.premCal.D13(this.insuredage,this.mode,this.typex,this.package);
      }

      let hd1 = "0";
      if( this.choosePlan == 'TE14')
      {
        hd1 =  await this.premCal.HD1(this.insuredage,this.mode,this.typex,this.package);
      }

      let ha1 = "0";
      if(this.choosePlan == 'TE17')
      {
        ha1 =  await this.premCal.HA1(this.insuredage,this.mode,this.typex,this.package);

      }

      let c07 = "0";
      if(this.choosePlan == 'TE17')
      {
        c07 =  await this.premCal.C07(this.insuredage,this.mode,this.typex,this.package);
      }


      let c13 = "0";
      let c14 = "0";
      if(this.choosePlan == 'TE13')
      {
        c13 =  await this.premCal.C13(this.insuredage,this.mode,this.typex,this.package);
        c14 =  await this.premCal.C14(this.insuredage,this.mode,this.typex,this.package);
      }


      let c04 = "0";
      let c05 = "0";
      if(this.choosePlan == 'TE12')
      {
        c04 =  await this.premCal.C04(this.insuredage,this.package);
        c05 =  await this.premCal.C05(this.insuredage,this.package);
        //this.rider['HD'].premium = hd;
      }



      //console.log("this.premiumTotal=="+premium);
      //console.log(String(Number(premium)+Number(ap5)+Number(d08)+Number(hd)+Number(c00)+Number(ha)+Number(d13)+Number(hd1)+Number(c07)+Number(ha1)+Number(c13)+Number(c14)+Number(c04)+Number(c05)));
      let data = String(Number(premium)+Number(ap5)+Number(d08)+Number(hd)+Number(c00)+Number(ha)+Number(c11)+Number(c12)+Number(c01)+Number(c02)+Number(d13)+Number(hd1)+Number(c07)+Number(ha1)+Number(c13)+Number(c14)+Number(c04)+Number(c05));
      this.premiumTotal = data;
      this.premiumFooter = data;
      this.quotationData.premiumFooter = this.premiumFooter;
      this.quotationData.premiumTotal = this.premiumTotal;
      this.broadcaster.broadcast('quatationPremium', this.premiumTotal);
      this.broadcaster.broadcast('premiumFooter', this.premiumFooter);
      let hidenrider =String(Number(ap5)+Number(d08)+Number(hd)+Number(c00)+Number(ha)+Number(c11)+Number(c12)+Number(c01)+Number(c02)+Number(d13)+Number(hd1)+Number(c07)+Number(ha1)+Number(c13)+Number(c14)+Number(c04)+Number(c05));
      this.broadcaster.broadcast('hiddenRider', hidenrider);
    }
    else if(this.calType == 5){
      //await this.getPackageDetail();
      await this.getParate();
    }
  }

  async getParate(){
    let objM: ParateM = new ParateM();
    objM.plancode = this.choosePlan;//Require = Y
    objM.pan = this.package;//Require = Y
    //objM.rider = "DD";//Require = Y
    objM.occ = this.occupationType;//Require = Y
    objM.age = this.insuredage;//Require = Y

    let objMs: Array<ParateM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PARATE;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs;

    this.apiProvider.callData(reqM).then(
    (res) => {

      let obj: any = res;
        if(obj.status == 0 && obj.size > 0){
         
          this.premiumTotal = obj.data[0].premAll;
          this.quotationData.premiumTotal = this.premiumTotal;
          this.broadcaster.broadcast('quatationPremium', this.premiumTotal);
          this.premiumFooter = obj.data[0].premAll;
          //console.log(obj.data[0].sumAll);

          this.baseIncrementer = obj.data[0].sumAll;
          this.quotationData.baseIncrementer = this.baseIncrementer;
          this.quotationData.premiumFooter = this.premiumFooter;
          this.broadcaster.broadcast('quatationSum', this.baseIncrementer);
          this.broadcaster.broadcast('premiumFooter', this.premiumFooter);
        }
    },
    (err) => {
      console.log(err);
    }
    );
  }

  async changeFavorite(e) {
    if(null != e && e.length <= 0) {
      return;
    }
    if(e.favorite) {
      await this.callFavoritePCService(e.value, ServiceName.DELETE);
      if(null != this.tlPlanAll && undefined != this.tlPlanAll && this.tlPlanAll.length > 0) {
          // delete row in tlplan Array
        const deleteFavorite = this.tlPlan.filter(res => res.planCode !== e.value);
        this.tlPlan = deleteFavorite; //ลบค่า favorite ออกจากหน้า แทป favorite
        this.tlPlanAll = this.changeTlPlanArray(this.tlPlanAll, e.value, 'F');
      } else {
        this.tlPlan = this.changeTlPlanArray(this.tlPlan, e.value, 'F');
      }

    } else {
      await this.callFavoritePCService(e.value, ServiceName.INSERT);
      this.tlPlan = this.changeTlPlanArray(this.tlPlan, e.value, 'T');


    }

    //console.log(this.tlPlan);
  }

  //เปลี่ยนค่า favorite จาด tlPlanAll
  private changeTlPlanArray(arr: Array<any>, value: string, tf: string) {
    arr.forEach((element, index) => {
      if(element.planCode === value) {
        arr[index].favorite = tf;
      }
    }); // เปลี่ยนค่า favorite ของ tlPlanAll
    return arr;
  }

  // insert | delete favorite service
  private async callFavoritePCService(item : string, service : any) {
    let objM: FavoritePlanM = new FavoritePlanM();
        objM.plancode = item;
        if(ServiceName.INSERT == service) {
          objM.createdate = DateUtil.date2str(new Date());
        }
        objM.lastmodify = DateUtil.date2str(new Date());

    let objMs: Array<FavoritePlanM> = [];
        objMs.push(objM);
    let reqM: RequestModel = new RequestModel();
        reqM.functionName = FunctionName.FAVORITE_PLAN;
        reqM.serviceName = service;
        reqM.param = objMs;
    try {
      const res = JSON.stringify(await this.apiProvider.callData(reqM));
    } catch(err) {
      console.log(err);
    }
  }

  /**
   * ปิด dropdown plan
   */
  private disabledPlan: boolean = false;
  /**
   * เลือกแทปแบบประกัน ของ autoComplete
   */
  async changeTabs(e) {

    /**
     * แทปแบบประกัน2 ของ autoComplete
     */
    this.disabledPlan = false;
    this.loadingCtrl.present();

    switch(e) {
      case 3:
        this.planSelected = [];
         // แบบประกันที่น่าสนใจ
         this.selectVal = "";
         this.selectType ="";
         this.selectPay ="";
         this.selectProtection ="";
         this.showDivDropdown="";
         this.tlPlan = [];
         this.tlPlanAll = [];

         let objM3: GroupplanSearchM = new GroupplanSearchM();
         let objM3s: Array<GroupplanSearchM> = [];
         objM3s.push(objM3);

         let reqM3: RequestModel = new RequestModel();
         reqM3.functionName = FunctionName.GROUPPLAN_SEARCH;
         reqM3.serviceName = ServiceName.SELECT;
         reqM3.searchkey = "INTERESTING_PLAN";
         reqM3.param = objM3s;

         this.apiProvider.callData(reqM3).then(
           (res) => {
             this.loadingCtrl.dismiss();

             let obj: any = res;
             let resModel: ResponseModel = obj;
             if (resModel.data.length > 0){
              this.tlPlanAll = resModel.data;
              this.filterPlan();
             }
             
           },(err) => {
             this.loadingCtrl.dismiss();
             console.log(JSON.stringify(err));
           }
         );

      break;
      case 2: // แบบประกันเฉพาะช่วงเวลา
        // setDefault value dropdown of แบบประกันที่เหมาะสม when change Tab
        this.planSelected = [];
        this.tlPlan = [];
        this.tlPlanAll = [];

        this.selectVal = "";
        this.selectType ="";
        this.selectPay ="";
        this.selectProtection ="";
        this.showDivDropdown="";
        this.selectTaxDeduct = "";
        this.selectRegion = "";
        this.disabledPlan = false;

        let objM: GroupplanSearchM = new GroupplanSearchM();
        let objMs: Array<GroupplanSearchM> = [];
        objMs.push(objM);

        let reqM: RequestModel = new RequestModel();
        reqM.functionName = FunctionName.GROUPPLAN_SEARCH;
        reqM.serviceName = ServiceName.SELECT;
        reqM.searchkey = "FIGHTINGPLAN";
        reqM.param = objMs;

        this.apiProvider.callData(reqM).then(
          (res) => {
            this.loadingCtrl.dismiss();

            let obj: any = res;
            let resModel: ResponseModel = obj;
            if (resModel.data.length > 0){
              this.tlPlanAll = resModel.data;
              this.filterPlan();
            }
          },(err) => {
            this.loadingCtrl.dismiss();
            console.log(JSON.stringify(err));
          }
        );

      break;
      case 1: // เลือกแบบประกันที่เหมาะสม
        this.planSelected = [];
        this.disabledPlan = true;
        this.tlPlan = [];
        this.tlPlanAll = [];
        // setDefault value dropdown of แบบประกันที่เหมาะสม when change Tab
        this.selectVal = "";
        this.selectType ="";
        this.selectPay ="";
        this.selectProtection ="";
        this.showDivDropdown="";
        this.selectTaxDeduct = "";
        this.selectRegion = "";
        this.loadingCtrl.dismiss();

      break;
      default : // แบบประกันชีวิตทั้งหมด

        // setDefault value dropdown of แบบประกันที่เหมาะสม when change Tab
        this.selectVal = "";
        this.selectType ="";
        this.selectPay ="";
        this.selectProtection ="";
        this.showDivDropdown="";
        this.selectTaxDeduct = "";
        this.selectRegion = "";
        this.disabledPlan = false;

        this.tlPlanAll = [];

        let reqModel:RequestModel = new RequestModel();
        reqModel.functionName = FunctionName.TLPLAN;
        reqModel.serviceName = ServiceName.SELECT;
        this.apiProvider.callData(reqModel).then(
          res => {
            this.loadingCtrl.dismiss();

            let obj: any = res;
            let resModel: ResponseModel = obj;

            if (resModel.data.length > 0) {
              this.tlPlanAll = resModel.data;
              this.filterPlan();
            }
          },
          err => this.alertCtrl.error(err));
      break;
    }
  }

/**
 * dropdown ค้นหาจาก
 */
  private setDropdown() :void {

    this.selectVal = this.selectVal;
    //default value for change dropdown

    this.selectType = "";
    this.selectPay = "";
    this.selectProtection = "";
    this.selectTaxDeduct = "";
    this.selectRegion = "";
    this.tlPlan = [];
    this.planSelected = [];

    if(this.selectVal == "1"){//กลุ่มแบบประกัน
      this.disabledPlan = true;
      this.showDivDropdown = "detail1";
      this.disabledPlan = true;
    }
    else if(this.selectVal == "2"){//ระยะเวลา
      this.disabledPlan = true;
      this.showDivDropdown = "detail2";
    }
    else if(this.selectVal == "3"){//ลดหย่อนภาษี
      this.disabledPlan = true;
      this.showDivDropdown = "detail3";
    }
    else if(this.selectVal == "4"){//แบบล่าสุด
      this.showDivDropdown = "detail4";
      this.disabledPlan = false;

      let objM: GroupplanSearchM = new GroupplanSearchM();
      let objMs: Array<GroupplanSearchM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.GROUPPLAN_SEARCH;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "LATEST";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          let obj: any = res;
          let resModel: ResponseModel = obj;
          if (resModel.data.length > 0){
            this.tlPlanAll = resModel.data;
            this.filterPlan();
            // this.tlPlan = resModel.data;
          }
        },(err) => {
          console.log(JSON.stringify(err));
        }
      );
    } else if(this.selectVal == "5"){//แบบขายดี
      this.showDivDropdown = "detail5";
    }
  }

  /**
   * dropdown : ประเภทความคุ้มครอง
   */
  private checkGropType() :void {

   // this.selectType = "";
    this.disabledPlan = false;
    this.tlPlan = [];
    this.planSelected = [];

    let objM: GroupplanSearchM = new GroupplanSearchM();
    objM.groupType = this.selectType;//
    objM.pdAge = this.prospect.age;//
    objM.pdInsure = String(this.baseIncrementer);//จำนวนที่เอาเงินประกัน
    objM.pdGender = this.prospect.gender;//Require = Y

    if(this.selectType !== ""){
      let objMs: Array<GroupplanSearchM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.GROUPPLAN_SEARCH;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "INSURANCE";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          let obj: any = res;
          let resModel: ResponseModel = obj;
          if (resModel.data.length > 0){
            //this.tlPlan = resModel.data;
            this.tlPlanAll = resModel.data;
            this.filterPlan();
          }
        },(err) => {
          console.log(JSON.stringify(err));
        }
      );
    }

  }

  /**
   * dropdown : การชำระเบี้ย
   */
  private getPay() :void {
    this.planSelected = [];
    console.log("this.selectPay ::: ",this.selectPay);
    this.disabledPlan = false;
    this.getProtection();
    //this.selectProtection = "";
  }

  /**
   * dropdown : ความคุ้มครอง
   */
  private getProtection() :void {
    this.planSelected = [];
    console.log("selectProtection ::: ",this.selectProtection);
    this.disabledPlan = false;

    this.tlPlan = [];
    let objM: GroupplanSearchM = new GroupplanSearchM();
    objM.pdAge = this.prospect.age;
    objM.pdInsure = String(this.baseIncrementer);
    objM.pdGender = this.prospect.gender;
    objM.ppayYearMode = this.selectPay; //ระยะเวลาชำระเบี้ยสูงสุด
    objM.pendOwmentYearMode = this.selectProtection; //ระยะเวลาคุ้มครองสูงสุด

    let objMs: Array<GroupplanSearchM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.GROUPPLAN_SEARCH;
    reqM.serviceName = ServiceName.SELECT;
    reqM.searchkey = "PERIOD";
    reqM.param = objMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        let obj: any = res;
        let resModel: ResponseModel = obj;
        if (resModel.data.length > 0){
          //this.tlPlan = resModel.data;
          this.tlPlanAll = resModel.data;
          this.filterPlan();
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );

  }

  /**
  *dropdown : การลดหย่อนภาษี
  */
  private getTaxDeduct() :void {
    this.planSelected = [];
    console.log("this.selectTaxDeduct ::: ",this.selectTaxDeduct);
    this.disabledPlan = false;

    if(this.selectTaxDeduct !== ""){
      this.tlPlan = [];
      let objM: GroupplanSearchM = new GroupplanSearchM();
      objM.pdAge = this.prospect.age; //Require = Y
      objM.pdInsure = String(this.baseIncrementer); //Require = Y
      objM.pdGender = this.prospect.gender; //Require = Y
      objM.taxDeductMode = this.selectTaxDeduct; //valueการลดหย่อนภาษี

      let objMs: Array<GroupplanSearchM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.GROUPPLAN_SEARCH;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "TAXDEDUCT";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          let obj: any = res;
          let resModel: ResponseModel = obj;
          if (resModel.data.length > 0){
            //this.tlPlan = resModel.data;
            this.tlPlanAll = resModel.data;
            this.filterPlan();
          }
        },(err) => {
          console.log(JSON.stringify(err));
        }
      );
    }
  }

  /**
  *dropdown : แบบขายดี
  */
  private getRegion() :void {
    this.planSelected = [];
    console.log("this.selectRegion ::: ",this.selectRegion);
    this.disabledPlan = false;

    if(this.selectRegion !== ""){
      this.tlPlan = [];

      let objM: GroupplanSearchM = new GroupplanSearchM();
      objM.pdAge = this.prospect.age; //Require = Y
      objM.pdInsure = String(this.baseIncrementer); //Require = Y
      objM.pdGender = this.prospect.gender; //Require = Y
      objM.region = this.selectRegion; //ภาค

      let objMs: Array<GroupplanSearchM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.GROUPPLAN_SEARCH;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = "BESTSELLER";
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          let obj: any = res;
          let resModel: ResponseModel = obj;
          if (resModel.data.length > 0){
            //this.tlPlan = resModel.data;
            this.tlPlanAll = resModel.data;
            this.filterPlan();
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        }
      );
    }
  }

  async checkRemarkMessage(){
    let remark = "";
      let pc =["EN33","EN34","EN35","EN38"];

      if(Number(this.maxAge) > 0 ){
        if(Number(this.prospect.age) > 65){
          pc.forEach(element => {
            if(this.choosePlan == element) {
              remark = "ผู้ขอเอาประกันอายุ 66 ปีขึ้นไปต้องใช้ หนังสือรับทราบการขอทำประกันชีวิต (ปช.01-10) ประกอบการขอเอาประกัน สามารถพิมพ์ อยู่ในหน้าใบเสนอขาย หน้าสุดท้าย<br/><br/>";
            }
          });
        }

        if(Number(this.insuredage)  < Number(this.minAge) ){
          this.insuredage = this.minAge;
          this.prospect.age = this.minAge;
          this.prospect.birthDate = moment().subtract(this.prospect.age, 'year').format('YYYY-MM-DD');

          if(Number(this.minAge) == 0) {
            this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด 1 เดือน - "+Number(this.maxAge)+" ปี");
          }
          else {
            this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด "+Number(this.minAge)+" - "+Number(this.maxAge)+" ปี");
          }
        }
        else if(Number(this.insuredage) > Number(this.maxAge)){
          this.insuredage =this.maxAge;
          this.prospect.age = this.maxAge;
          this.prospect.birthDate = moment().subtract(this.prospect.age, 'year').format('YYYY-MM-DD');
          
          if (Number(this.minAge) == 0) {
            this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด 1 เดือน - "+Number(this.maxAge)+" ปี");
          }
          else {
            this.alertCtrl.warning(remark+"อายุไม่อยู่ในช่วงต่ำสุดและสูงสุด "+Number(this.minAge)+" - "+Number(this.maxAge)+" ปี");
          }
        }
        else if(this.oldAge != this.prospect.age){
          if (remark != '') {
            this.alertCtrl.warning(remark);
          }
        }
      }
  }

  async saveQuationAll(){

    this.disableSaveButton = true;
    try {
      await this.quotationData.saveQuationAll();
    } 
    catch(e) {
      alert(e);
    }

    this.disableSaveButton = false;
    
  }

  //------------ setting object for save quotation ----------

  private reset(isClearPlancode? :boolean): void {
    this.loadingCtrl.present();
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 3000);
    delete this.rider['occupation'];
    if(isClearPlancode)
      this.navCtrl.setRoot('QuatationPage', {'prospectToQuatation':{'prospect':this.prospect,'quotation':null}});
    else
      this.navCtrl.setRoot('QuatationPage');
  }

  async selectSoldier(){
    //alert(this.soldier);
    this.broadcaster.broadcast('soldierOcc',this.soldier);
    this.quotationData.soldier = this.soldier;
    if(this.soldier == '1' && this.choosePlan == 'EN36'){
     let en361 = {
        "accPay":"0000",
        "accident":"0",
        "amtOfCoverage":"0000000001",
        "apl":"1",
        "approvedBy":"",
        "calType":"1",
        "deVoid":"Y",
        "disable":"0",
        "discount":"1",
        "dividend":"0",
        "endDate":"31/12/2200 00:12:00",
        "endowmentType":"1",
        "favorite":"F",
        "interestRate":"0400",
        "isPackagePlan":"N",
        "issueDate":"01/01/2017 00:01:00",
        "lifePay":"0100",
        "loanInterest":"0600",
        "matureAmount":"200",
        "matureInterest":"0400",
        "maxAge":"50",
        "maxDeductTax":"100000",
        "maxPremium":"999999999",
        "maxSum":"000100000",
        "minAge":"20",
        "minPremium":"000000000",
        "minSum":"000100000",
        "modeOK":"11110",
        "pEndowmentYear":"60",
        "pPayYear":"60",
        "payType":"1",
        "pensionAge":"00",
        "planCode":"EN36",
        "planName":"พิทักษ์บำเหน็จ [EN36]",
        "planName2":"พิทักษ์บำเหน็จ",
        "policyType":"O",
        "riderType":"",
        "sex":"A",
        "stepCode":"03",
        "surrender":"1",
        "taxDeductFlag":"Y"
      }
      this.planSelected[0] = en361;
    }
    else if(this.soldier == '2' && this.choosePlan == 'EN36'){
      let en362 = {
        "accPay":"0000",
        "accident":"0",
        "amtOfCoverage":"0000000001",
        "apl":"1",
        "approvedBy":"",
        "calType":"1",
        "deVoid":"Y",
        "disable":"0",
        "discount":"1",
        "dividend":"0",
        "endDate":"31/12/2200 00:12:00",
        "endowmentType":"1",
        "favorite":"F",
        "interestRate":"0400",
        "isPackagePlan":"N",
        "issueDate":"01/01/2017 00:01:00",
        "lifePay":"0100",
        "loanInterest":"0600",
        "matureAmount":"200",
        "matureInterest":"0400",
        "maxAge":"50",
        "maxDeductTax":"100000",
        "maxPremium":"999999999",
        "maxSum":"000200000",
        "minAge":"20",
        "minPremium":"000000000",
        "minSum":"000100000",
        "modeOK":"11110",
        "pEndowmentYear":"60",
        "pPayYear":"60",
        "payType":"1",
        "pensionAge":"00",
        "planCode":"EN36",
        "planName":"พิทักษ์บำเหน็จ [EN36]",
        "planName2":"พิทักษ์บำเหน็จ",
        "policyType":"O",
        "riderType":"",
        "sex":"A",
        "stepCode":"03",
        "surrender":"1",
        "taxDeductFlag":"Y"
      }
      this.planSelected[0] = en362;
    }
    else if(this.soldier == '3' && this.choosePlan == 'EN36'){
      let en363 = {
        "accPay":"0000",
        "accident":"0",
        "amtOfCoverage":"0000000001",
        "apl":"1",
        "approvedBy":"",
        "calType":"1",
        "deVoid":"Y",
        "disable":"0",
        "discount":"1",
        "dividend":"0",
        "endDate":"31/12/2200 00:12:00",
        "endowmentType":"1",
        "favorite":"F",
        "interestRate":"0400",
        "isPackagePlan":"N",
        "issueDate":"01/01/2017 00:01:00",
        "lifePay":"0100",
        "loanInterest":"0600",
        "matureAmount":"200",
        "matureInterest":"0400",
        "maxAge":"50",
        "maxDeductTax":"100000",
        "maxPremium":"999999999",
        "maxSum":"000500000",
        "minAge":"20",
        "minPremium":"000000000",
        "minSum":"000100000",
        "modeOK":"11110",
        "pEndowmentYear":"60",
        "pPayYear":"60",
        "payType":"1",
        "pensionAge":"00",
        "planCode":"EN36",
        "planName":"พิทักษ์บำเหน็จ [EN36]",
        "planName2":"พิทักษ์บำเหน็จ",
        "policyType":"O",
        "riderType":"",
        "sex":"A",
        "stepCode":"03",
        "surrender":"1",
        "taxDeductFlag":"Y"
      }
      this.planSelected[0] = en363;
    }


    else if(this.soldier == '1' && this.choosePlan == 'EN37'){
      let en361 = {
         "accPay":"0000",
         "accident":"0",
         "amtOfCoverage":"0000000001",
         "apl":"1",
         "approvedBy":"",
         "calType":"1",
         "deVoid":"Y",
         "disable":"0",
         "discount":"1",
         "dividend":"0",
         "endDate":"31/12/2200 00:12:00",
         "endowmentType":"0",
         "favorite":"F",
         "interestRate":"0400",
         "isPackagePlan":"N",
         "issueDate":"01/01/2017 00:01:00",
         "lifePay":"0100",
         "loanInterest":"0600",
         "matureAmount":"200",
         "matureInterest":"0400",
         "maxAge":"65",
         "maxDeductTax":"100000",
         "maxPremium":"999999999",
         "maxSum":"000100000",
         "minAge":"20",
         "minPremium":"000000000",
         "minSum":"00070000",
         "modeOK":"11110",
         "pEndowmentYear":"15",
         "pPayYear":"10",
         "payType":"0",
         "pensionAge":"00",
         "planCode":"EN37",
         "planName":"พิทักษ์ทวี [EN37]",
         "planName2":"พิทักษ์ทวี",
         "policyType":"O",
         "riderType":"",
         "sex":"A",
         "stepCode":"03",
         "surrender":"1",
         "taxDeductFlag":"Y"
       }
       this.planSelected[0] = en361;
     }
     else if(this.soldier == '2' && this.choosePlan == 'EN37'){
       let en362 =  {
        "accPay":"0000",
        "accident":"0",
        "amtOfCoverage":"0000000001",
        "apl":"1",
        "approvedBy":"",
        "calType":"1",
        "deVoid":"Y",
        "disable":"0",
        "discount":"1",
        "dividend":"0",
        "endDate":"31/12/2200 00:12:00",
        "endowmentType":"0",
        "favorite":"F",
        "interestRate":"0400",
        "isPackagePlan":"N",
        "issueDate":"01/01/2017 00:01:00",
        "lifePay":"0100",
        "loanInterest":"0600",
        "matureAmount":"200",
        "matureInterest":"0400",
        "maxAge":"65",
        "maxDeductTax":"100000",
        "maxPremium":"999999999",
        "maxSum":"000200000",
        "minAge":"20",
        "minPremium":"000000000",
        "minSum":"00070000",
        "modeOK":"11110",
        "pEndowmentYear":"15",
        "pPayYear":"10",
        "payType":"0",
        "pensionAge":"00",
        "planCode":"EN37",
        "planName":"พิทักษ์ทวี [EN37]",
        "planName2":"พิทักษ์ทวี",
        "policyType":"O",
        "riderType":"",
        "sex":"A",
        "stepCode":"03",
        "surrender":"1",
        "taxDeductFlag":"Y"
      }
       this.planSelected[0] = en362;
     }
     else if(this.soldier == '3' && this.choosePlan == 'EN37'){
       let en363 =  {
        "accPay":"0000",
        "accident":"0",
        "amtOfCoverage":"0000000001",
        "apl":"1",
        "approvedBy":"",
        "calType":"1",
        "deVoid":"Y",
        "disable":"0",
        "discount":"1",
        "dividend":"0",
        "endDate":"31/12/2200 00:12:00",
        "endowmentType":"0",
        "favorite":"F",
        "interestRate":"0400",
        "isPackagePlan":"N",
        "issueDate":"01/01/2017 00:01:00",
        "lifePay":"0100",
        "loanInterest":"0600",
        "matureAmount":"200",
        "matureInterest":"0400",
        "maxAge":"65",
        "maxDeductTax":"100000",
        "maxPremium":"999999999",
        "maxSum":"000500000",
        "minAge":"20",
        "minPremium":"000000000",
        "minSum":"00070000",
        "modeOK":"11110",
        "pEndowmentYear":"15",
        "pPayYear":"10",
        "payType":"0",
        "pensionAge":"00",
        "planCode":"EN37",
        "planName":"พิทักษ์ทวี [EN37]",
        "planName2":"พิทักษ์ทวี",
        "policyType":"O",
        "riderType":"",
        "sex":"A",
        "stepCode":"03",
        "surrender":"1",
        "taxDeductFlag":"Y"
      }
       this.planSelected[0] = en363;
     }
    else{
      this.changePlan(this.choosePlan);
    }
    this.checkCalType();

  }

  // private typeApp(plan: string)
  // {
  //   const arrPA: Array<string> = ["TJ1","TL1","TN1","TZ","TX2","TY","TK1","TM1"];
  //   const arrMon: Array<string> = ["MC","MD","ME","MF","MH","MG"];
  //   const arrCancer: Array<string> = ["TE01","TE02","TE03","TE13","TE12"];
  //   if(arrPA.indexOf(plan) != -1) {
  //     return "PA";
  //   }
  //   else if(arrMon.indexOf(plan) != -1) {
  //     return "MON";
  //   }
  //   else if(arrCancer.indexOf(plan) != -1) {
  //     return "CAN";
  //   }
  //   else{
  //     return "PER";
  //   }

  // }
  // private endownKB2(ageKid: number , ageKb: number , payYear: number)
  // {
  //   /** ระยะเวลาผู้เอาชำระเบี้ย */
  //   let kid = 30 - ageKid;
  //   let parent = 60 - ageKb;
  //   let kb2Endown = payYear;

  //   if ( kb2Endown > kid )
  //     kb2Endown = kid;
  //   if ( kb2Endown > parent )
  //     kb2Endown = parent;

  //   //console.log("ผู้ปกครอง=" + ageKb + "  เด็ก="+kid + "  ระยะชำระเบี้ย="  + payYear + "  |----คุ้มครองคบ=" + kb2Endown+ "----|" );

  //   return  String(kb2Endown);

  // }
  // private HealthCheck(age: number , sum: number)
  // {
  //   if ( age> 45 && sum > 3000000 )
  //     return  "Y";
  //   else
  //     return  "N";
  // }
  // private checkTp(codetp: string ,age: number)
  // {
  //   if( age < 60){
  //     if(typeof(codetp) !== 'undefined'){
  //       return  "Y";
  //     }
  //   }
  //   else
  //     return  "N";
  // }

  // กรองแบบประกัน
  public filterPlan() {
    if (this.tlPlanAll.length > 0 && this.prospect != null) {
      this.tlPlan = this.tlPlanAll.filter((res: TLPlanModel) =>
        // อายุอยู่ในช่วง
        (this.checkMinAge(res) && Number(res.maxAge) >= Number(this.prospect.age)) &&
        // เพศ
        (res.sex == 'A' || res.sex == this.prospect.gender) &&
        // เฉพาะก้าวแรก
        (this.checkSN(res.planCode))
      );

      // ไม่พบแบบประกันที่เลือกได้ในช่วงดังกล่าว
      if (this.tlPlan.length == 0) {
        this.choosePlan = '';
        this.premiumTotal = '0';
        this.premiumFooter = '0';
        this.riderFooter = '0';
      }
    }
  }

  /**
   * ตรวจสอบ อายุน้อยสุดที่ซื้อได้
   * @param minAge
   */
  private checkMinAge(tlplan: TLPlanModel): boolean {
    // 0 วัน และ 1 ปีขึ้นไป
    if (Number(tlplan.minAge) > 0 || tlplan.planCode == 'SN') {
      return Number(tlplan.minAge) <= Number(this.prospect.age);
    // เงื่อนไขน้อยสุดเริ่มต้นที่ 1 เดือน
    }
    else {
      // เฉพาะ SQ 15 วัน
      if (tlplan.planCode == 'SQ') {
        return moment().diff(moment(this.prospect.birthDate), 'days') > 14;
      }
      else {
        // อื่นๆ 1 เดือน
        return moment().diff(moment(this.prospect.birthDate), 'months') > 0;
      }
       
    }
  }
}
