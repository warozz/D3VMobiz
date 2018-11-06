import { PopupLostConnectionComponent } from './../../components/utility/popup-lost-connection/popup-lost-connection';
import { Network } from '@ionic-native/network';
import { QuotationModel } from './../../providers/quotation/quotation-model';
import { AgentModel } from './../../providers/agent/agent-model';
import { ExtendedM } from './../../providers/extended/extended-model';
import { RequestModel } from './../../providers/model/request-model';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { TaxcalculatorComponent } from './../../components/utility/taxcalculator/taxcalculator';
import { Component, OnInit, OnDestroy ,ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, Loading } from 'ionic-angular';
import { ProspectModel } from './../../providers/prospect/prospect-model';
import { Http } from '@angular/http';
import { Broadcaster } from './../../providers/utility/broadcaster';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

// step page
import { QuatationFormPage } from './quatation-form/quatation-form';
import { QuatationTypePage } from './quatation-type/quatation-type';
import { QuatationRiderPage } from './quatation-rider/quatation-rider';
import { QuatationUnexpectedPage } from './quatation-unexpected/quatation-unexpected';
import { QuatationValuePage } from './quatation-value/quatation-value';
import { QuatationDetailPage } from './quatation-detail/quatation-detail';
import { QuatationCashbackPage } from './quatation-cashback/quatation-cashback';
import { QuatationHealthPage } from './quatation-health/quatation-health';
import { QuatationEAppPage } from './quatation-e-app/quatation-e-app';

// tab insurance
import { QuatationPdfPage } from './quatation-pdf/quatation-pdf';
import { CoupontableM } from '../../providers/coupontable/coupontable-model';
import { FunctionName } from '../../providers/constants/function-name';
import { ServiceName } from '../../providers/constants/service-name';
import { ApiProvider } from '../../providers/api/api';
import { RiderConfig } from '../../providers/rider/rider-config';
import { QuotationGuardianM } from '../../providers/quotationguardian/quotationguardian-model';
import { ResponseModel } from '../../providers/model/response-model';
import { QuotationRiderM } from '../../providers/quotationrider/quotationrider-model';
import { Subscription } from 'rxjs';
import { SettingPlanProvider } from '../../providers/setting-plan/setting-plan';
//import * as _ from 'lodash';
import { QuotationData } from '../../providers/quotation/quotation-data';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { ModalOptions } from 'ionic-angular/components/modal/modal-options';
import { ValidateProvider } from '../../providers/validate/validate';
import { ProspectProvider } from '../../providers/prospect/prospect';

/**
 * Generated class for the QuatationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *
 * Broadcaster
 * prospect: ข้อมูลผู้มุ่งหวัง
 * rider: สัญญาเพิ่มเติม
 * quatationPlan: แบบประกัน
 * quatationSum: ทุนประกัน
 * quatationMode: รูปแบบการชำระเบี้ยประกัน
 * quatationPremium: เบี้ยประกันภัย
 * quatationStep: ขั้นตอนที่กำลังเข้าถึง
 *
 */

@IonicPage({
  segment: 'ใบเสนอขาย/แบบประกันชีวิต',
})
@Component({
  selector: 'page-quatation',
  templateUrl: 'quatation.html',
})
export class QuatationPage implements OnInit, OnDestroy ,AfterViewChecked {
  [x: string]: any;

  private tabsPage = [
    {
      title: 'แบบประกันชีวิต',
      disabled: false
    },
    {
      title: 'แบบประกันชีวิตควบการลงทุน',
      disabled: false
    },
    {
      title: 'แบบประกันชีวิตสำหรับชาว ลาว พม่า กัมพูชา',
      disabled: true
    },
  ];
  /**
   * หน่วงเวลาการทำงาน
   */
  private timestamp: number;
  /**
   * ผู้มุ่งหวัง
   */
  private prospect: ProspectModel;

  /**
   * สัญญาเพิ่มเติม
   */
  private rider: object = {};


  /**
   * ลำดับขั้นตอน
   */
  private stepsPage = [
    {
      id:0,
      root: QuatationFormPage,
      title: 'คำนวณเบี้ย',
      icon: 'icon-ion-calculator',
      disabled: false
    },
    {
      id:1,
      root: QuatationTypePage,
      title: 'รูปแบบ โครงการ',
      icon: 'icon-ion-arrow-graph-up-right',
      disabled: false
    },
    {
      id:2,
      root: QuatationRiderPage,
      title: 'สัญญา เพิ่มเติม',
      icon: 'icon-ion-ios-paper-outline',
      disabled: false
    },
    {
      id:3,
      root: QuatationUnexpectedPage,
      title: 'เหตุไม่ คาดฝัน',
      icon: 'icon-ion-ios-medkit',
      disabled: false
    },
    {
      id:4,
      root: QuatationValuePage,
      title: 'มูลค่า',
      icon: 'icon-view-files',
      disabled: false
    },
    {
      id:5,
      root: QuatationDetailPage,
      title: 'รายละเอียด เบี้ย',
      icon: 'icon-ion-eye',
      disabled: false
    },
    {
      id:6,
      root: QuatationCashbackPage,
      title: 'เงินคืนสะสม',
      icon: 'icon-ion-social-bitcoin',
      disabled: false
    },
    {
      id:7,
      root: QuatationHealthPage,
      title: 'ตรวจสุขภาพ',
      icon: 'icon-ion-android-checkbox-outline',
      disabled: false
    }/*,
    {
      id:8,
      root: QuatationEAppPage,
      title: 'test e-app',
      icon: 'icon-ion-android-checkbox-outline',
      disabled: false
    }*/
  ];

  /**
   * เงื่อนไข รูปแบบสัญญา
   */
  private arrForm =
    ["TR05","TR06","TR07","TR08","TR09","TR10","TR11","TR12"
    ,"TR13","TR14","TR15","TR16","TR17","TR18","TR19","TR20"
    ,"TT05","TT07","TT10","TT15"];

  /**
   * เงื่อนไข เหตุไม่คาดฝัน
   */
  private arrUnexpected1 =
    ["TR05","TR06","TR07","TR08","TR09","TR10","TR11","TR12"
    ,"TR13","TR14","TR15","TR16","TR17","TR18","TR19","TR20"
    ,"TT05","TT07","TT10","TT15"];
  private arrUnexpected2 =
    ["AJ", "TJ1", "TL1", "TN1", "TX2", "TY", "TK1", "TM1","TQ1"];

  private riderCode: Array<string> = [
    // อ.1
    'AC01',
    // ตอ.1
    'TAC01',
    // ฆจ.1
    'KG1',
    // ตฆ.1
    'TKG1',
    // อ.2
    'AC02',
    // ตอ.2
    'TAC02',
    // ฆจ.2
    'KG2',
    // ตฆ.2
    'TKG2',
    // อ.3
    'AC03',
    // สร.2
    'SR2',
    // ฉพ.
    'JP',
    // รพ.
    'RP',
    // ตรพ.
    'TRP',
    // รพ.โกลด์
    'RPG',
    // ทร.
    'D01',
    // ทร.44
    'D02',
    // ทร.ตลอดชีพ
    'D03',
    // สพ.
    'H',
      // ตสพ.
      'TH',
    // สพ.โกลด์
    'G',
    // วพ.
    'VP',
    // สมาร์ท วีไอพี
    'V',
    // วพ.5
    'VP5',
    // คบ
    'KB2',
    'KB2_1',
    // ค่าห้องสูงสุด
    'UW'
  ];

  /**
   * ปีที่เลือกได้น้อยที่สุด
   */
  private minBirthDate: number;

  /**
   * แบบประกันที่เลือก
   */
  private choosePlan: string;

  /**
   * ทุนประกัน
   */
  private quatationSum: string;

  /**
   * เบี้ยประกันรวม
   */
  private quatationPremium: string;

  /**
   * โหมดการชำระเบี้ย
   * รายปี QuatationMode = 1
   * 6 เดือน QuatationMode = 2
   * 3 เดือน QuatationMode = 4
   * รายเดือน QuatationMode = 0
   */
  private quatationMode: string;

  /**
   * เบี้ยประกันหลัก
   */
  private lifePremium: string;

  /**
   * เบี้ยประกันภัยหลัก(เบี้ยชีวิต)
   */
  private premiumFooter : string;
  /**
   * เบี้ยประกันภัยของ rider แฝง
   */
  private hiddenRider : string;

  /**
   * เพศ
   */
  private sex:string;

  /**
   * อายุ
   */
  private age:string;

  private quatation :QuotationModel;

  /**
   * เปิด/ปิด การคำนวณลดหย่อนภาษี
   */
  private disabledTax: boolean = true;
  private broadcastRider: boolean = true;
  private taxDeductFlag: string;
  private maxDeductTax : number;
  private package;

  private taxCal: TaxcalculatorComponent = new TaxcalculatorComponent(this.viewCtrl, this.navParams, this.apiProvider, this.alertCtrl);

  private profile: AgentModel;

  private subscription: Array<Subscription> = [];

  private planSelected: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private http: Http,
    private broadcaster: Broadcaster ,
    private alertCtrl: AlertDirective,
    private apiProvider: ApiProvider,
    private storage: Storage,
    private conf : RiderConfig,
    private planProvider :SettingPlanProvider,
    private quotationData: QuotationData,
    private loadingCtrl: LoadingDirective,
    private network: Network,
    private cdRef:ChangeDetectorRef,
    private validator: ValidateProvider,
    private prospectProvider: ProspectProvider) {

      let dataFromProspect = this.navParams.get('prospectToQuatation') ? this.navParams.get('prospectToQuatation') : this.navParams.get('homeToQuatation');
      
      console.log("dataFromProspect => ", dataFromProspect);
        
      if (typeof dataFromProspect != 'undefined' && dataFromProspect.quotation != null) {
        
        if (typeof dataFromProspect.quotationrider != 'undefined') {
          this.quotationData.riderDraf = JSON.parse(JSON.stringify(dataFromProspect.quotationrider));
        }
        if (typeof dataFromProspect.quatationGuardian !== 'undefined' && dataFromProspect.quatationGuardian.length > 0) {
          
          for (let i: number = 0; i < this.quotationData.riderDraf.length; i ++) {
            if (this.quotationData.riderDraf[i].ridertype == 'KB2') {
              let birth = (dataFromProspect.quatationGuardian[0].birthdate).split(' ');
              this.quotationData.riderDraf[i].birth = birth[0];
              this.quotationData.riderDraf[i].age = dataFromProspect.quatationGuardian[0].age;
              this.quotationData.riderDraf[i].sex = dataFromProspect.quatationGuardian[0].sex;
            }
          }
        }

        if (dataFromProspect.quotation.occ != null && dataFromProspect.quotation.occ != "" && dataFromProspect.quotation.occgroup != null && dataFromProspect.quotation.occgroup != "") {
          this.quotationData.riderDraf['occupation'] = { occ : dataFromProspect.quotation.occ , occGroup : dataFromProspect.quotation.occgroup};
        }

      }

      this.disabledOpenPDF = true;
      this.storage.get('tlpromptMode').then(mode => {
        // full mode
        if (mode != 0) {
          this.disabledOpenPDF = false;
        }
        // mini mode
        else {
          this.tabsPage = [
            {
              title: 'แบบประกันชีวิต',
              disabled: false
            },
            // {
            //   title: 'แบบประกันชีวิตสำหรับชาว ลาว พม่า กัมพูชา',
            //   disabled: true
            // },
            // {
            //   title: 'แบบประกันชีวิตควบการลงทุน',
            //   disabled: true
            // }
          ];
        }
      });

      let date = new Date();
      this.minBirthDate = date.getFullYear() - 100;

      // อัปเดตสัญญาเพิ่มเติม
      this.subscription.push(this.broadcaster.on('rider').subscribe(res => {
        // console.log(res);
      // this.rider = res;
      // let dataFromHome = this.navParams.get('homeToQuatation');
      // let dataFromProspect = this.navParams.get('prospectToQuatation') ? this.navParams.get('prospectToQuatation') : this.navParams.get('homeToQuatation');

      // // alert(JSON.stringify(this.rider));
      // //console.error(JSON.stringify(dataFromProspect)+"  "+this.broadcastRider);
      // if(this.broadcastRider && typeof dataFromProspect != 'undefined')//ต้อง clear ค่าตอนเริ่มคนใหม่
      // {
      //   setTimeout(() => {
      //   //alert("clear value");
      //   this.quotationrider = dataFromProspect.quotationrider;//ตรงนี้วน ให้ broadcast ถูกจุด ยังมีแก้

      //   for (let index = 0; index < this.quotationrider.length; index++) {

      //    // console.log(this.quotationrider[index].ridertype)
      //     this.rider[this.quotationrider[index].ridertype].sum = this.quotationrider[index].sum;
      //     this.rider[this.quotationrider[index].ridertype].premium = this.quotationrider[index].premium;
      //     // if(this.quotationrider[index].ridertype == 'KB2'){
      //     //   this.rider['KB2'].birth = '0000-00-00';
      //     //   this.rider['KB2'].age = null;
      //     //   this.rider['KB2'].sex = '';
      //     // }
      //     this.rider['show'] = true;
      //   }
      //   // debugger;
      //  // alert(dataFromProspect.quotation.occ +"  "+dataFromProspect.quotation.occgroup);
      //   if(dataFromProspect.quotation.occ != "" && dataFromProspect.quotation.occgroup != "")
      //     this.rider['occupation'] = { occ : dataFromProspect.quotation.occ , occGroup : dataFromProspect.quotation.occgroup};

      //   this.broadcastRider = false;

      //     if(typeof dataFromProspect.quatationGuardian !== 'undefined' && dataFromProspect.quatationGuardian.length > 0)
      //     {
      //       //console.log("ok คบ "+JSON.stringify(dataFromProspect.quatationGuardian[0]));
      //       let birth = (dataFromProspect.quatationGuardian[0].birthdate).split(' ');
      //       this.rider['KB2'].birth = birth[0];
      //       this.rider['KB2'].age = dataFromProspect.quatationGuardian[0].age;
      //       this.rider['KB2'].sex = dataFromProspect.quatationGuardian[0].sex;
      //      // this.quotationguardian = dataFromProspect.quatationGuardian;
      //       //console.log("ok คบ "+JSON.stringify(this.rider));
      //     }
      //     // this.oldRider = _.assign()
      //     this.broadcaster.broadcast('rider', this.rider);
      //   }, 1500);


      // } else {
      //  // alert("clear value2");
      // }
      this.disabledPage(true);
      this.rider = res;
    }));

    // อัปเดต จากหน้า pdf กรณีที่มีการเปลี่ยนแปลงค่า
    /*this.subscription.push(this.broadcaster.on('quatation').subscribe(res => {
      this.quatation = res;
      this.quatationDaft = res;
      // lock screen of status is 'R' or 'S'
    }));*/
    // อัปเดต จากหน้า pdf กรณีที่มีการเปลี่ยนแปลงค่า
    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
      this.prospect = res;
      this.prospectDaft = res;
      // lock screen of status is 'R' or 'S'
    }));
    // อัปเดตแบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('quatationPlan').subscribe(res => {
      this.choosePlan = res;
      this.disabledPage(true);
    }));

    /**ทุนประกัน */
    this.subscription.push(this.broadcaster.on('quatationSum').subscribe(res => {
      this.quatationSum = res;
      this.hasTax();
    }));

    this.subscription.push(this.broadcaster.on('quatationPremium').subscribe(res => {
      this.quatationPremium = res;
    }));

    this.subscription.push(this.broadcaster.on('quatationMode').subscribe(res => {
      this.quatationMode = res;
    }));
    this.subscription.push(this.broadcaster.on('hiddenRider').subscribe(res => {
      this.hiddenRider = res;
    }));
    /*
    this.subscription.push(this.broadcaster.on('lifePremium').subscribe(res =>{
      this.lifePremium = res;
      //console.log("Premium Life =>"+this.lifePremium);
    }));*/

    /**เบี้ยประกันภัยหลัก(เบี้ยชีวิต) */
    this.subscription.push(this.broadcaster.on('premiumFooter').subscribe(res=>{
      this.premiumFooter = res;
      //console.log("Pre >>>>>> "+this.premiumFooter);
      //console.log("Pre >>>>>> "+this.premiumFooter);
    }));

    /**เพศ */
    this.subscription.push(this.broadcaster.on('sex').subscribe(res=>{
      this.sex = res;
      this.hasTax();
    }));

    /**อายุ */
    this.subscription.push(this.broadcaster.on('age').subscribe(res =>{
      this.age = String(res);
      this.hasTax();
      this.disabledPage();
    }));

    /** แบบประกันที่เลือก */
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
      if (res.length > 0) {
        this.maxDeductTax = Number(res[0].maxDeductTax);
        this.taxDeductFlag = res[0].taxDeductFlag;
        this.hasTax();
        this.planSelected = res[0];
      }
    }));

    this.subscription.push(this.broadcaster.on('quatationPackage').subscribe(res => {
      this.package = res;
    }));

    this.storage.get('loginProfile').then(res => {
      this.profile = res;
      if (this.profile.roleType == 'employee') {
        for (let i = 1; i < this.stepsPage.length; i ++)
          this.stepsPage[i].disabled = true;

        for (let i = 1; i < this.tabsPage.length; i ++)
        this.tabsPage[i].disabled = true;
      }
    });
    this.timestamp = Date.now();
  }

  public async ngOnInit() {

      try {
        const saleInfo = await this.storage.get('saleInformation');
        if(this.tabsPage.length === 3) {
          if(saleInfo) {
            let check: boolean = false;
            check = !(/*saleInfo['ulip'] || */saleInfo['ulLicense']); // disabled ulink in all3
            if(!check) {
              this.tabsPage[1].disabled = check;
            } else {
              this.tabsPage = [
                {
                  title: 'แบบประกันชีวิต',
                  disabled: false
                },
                {
                  title: 'แบบประกันชีวิตสำหรับชาว ลาว พม่า กัมพูชา',
                  disabled: true
                }
              ];
            }

          } else {
            this.tabsPage = [
              {
                title: 'แบบประกันชีวิต',
                disabled: false
              },
              {
                title: 'แบบประกันชีวิตสำหรับชาว ลาว พม่า กัมพูชา',
                disabled: true
              }
            ];
          }
        }
      }catch(err) {
        console.log('saleInformation error! ==> ', err);
      }


    // default
    this.http.get('assets/json/quatation-default.json').subscribe(data => {
      let dataArray = data.json();
      this.prospect = dataArray;
      this.choosePlan = dataArray.plan;

      //console.log(this.navParams.get('prospectToQuatation'));
      if( typeof(this.navParams.get('prospectToQuatation')) !== 'undefined' || typeof(this.navParams.get('homeToQuatation')) !== 'undefined'){

        let dataFromProspect = this.navParams.get('prospectToQuatation') ? this.navParams.get('prospectToQuatation') : this.navParams.get('homeToQuatation');
        if(dataFromProspect.quotation != null){
          this.prospect.lifesum = dataFromProspect.quotation.lifesum;
          this.prospect.lifepremium = dataFromProspect.quotation.lifepremium;
          //alert(dataFromProspect.quotation.mode);
          this.prospect.mode = dataFromProspect.quotation.mode;
          this.choosePlan = dataFromProspect.quotation.plancode;
        }
      }

      if (this.prospect.birthDate == null && this.prospect.age != null) {
        this.prospect.birthDate = moment().subtract(this.prospect.age, 'year').format('YYYY-MM-DD');
      }

      let dataFromProspect = this.navParams.get('prospectToQuatation') ? this.navParams.get('prospectToQuatation') : this.navParams.get('homeToQuatation');

      if (dataFromProspect)
      {

        this.prospect  = dataFromProspect.prospect;

        if (typeof this.prospect.birthDate != 'undefined')
          this.prospect.birthDate = this.prospect.birthDate.substring(0, 10);

        this.broadcaster.broadcast('prospect', this.prospect);
        this.broadcaster.broadcast('quatationPlan', this.choosePlan);

        if (dataFromProspect.quotation != null)
        {
          this.quatation = dataFromProspect.quotation;
          this.quatationDaft = dataFromProspect.quotation;
          //(JSON.stringify(this.quatation));
          this.broadcaster.broadcast('quatation', this.quatation);//this
          this.choosePlan = this.quatation.plancode;

          //this.checkDisabled_QuatationCashbackPage(this.choosePlan);
          //this.checkDisabled_QuatationValuePage(this.choosePlan);
        }



        // if(typeof dataFromProspect.quatationGuardian !== 'undefined' && dataFromProspect.quatationGuardian.length > 0)
        // {

        //  // console.log("ok คบ "+JSON.stringify(dataFromProspect.quatationGuardian[0]));
        //   let birth = (dataFromProspect.quatationGuardian[0].birthdate).split(' ');
        //   this.rider['KB2'].birth = birth[0];
        //   this.rider['KB2'].age = dataFromProspect.quatationGuardian[0].age;
        //   this.rider['KB2'].sex = dataFromProspect.quatationGuardian[0].sex;
        //  // this.quotationguardian = dataFromProspect.quatationGuardian;
        //   //console.log("ok คบ "+JSON.stringify(this.rider));

        // }

      } else {
        this.broadcaster.broadcast('prospect', this.prospect);
        this.broadcaster.broadcast('quatationPlan', this.choosePlan);
      }

    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  /**
   * แสดงคำนวณภาษี
   */
  private fn_open_calTax(): void {

    const param : object = {
      taxDeductFlag : this.taxDeductFlag
      ,plancode : this.choosePlan
      ,quatationSum : this.quatationSum
      ,rider:this.rider
      ,quatationMode:this.quatationMode
      ,premiumFooter:this.premiumFooter
      ,age:this.age
      ,sex:this.sex
      ,maxDeductTax : this.maxDeductTax
      ,hiddenRider : this.hiddenRider

      // ,quatationPremium:this.quatationPremium
    };
    let modal: Modal = this.modalCtrl.create(TaxcalculatorComponent,param,{cssClass: 'taxcalculator'});
    modal.present();
  }
  private hasTax() : void {
    if(this.choosePlan && !isNaN(Number(this.quatationSum)) && this.age && this.sex) {
      this.taxCal.hasTax(this.taxDeductFlag, this.choosePlan, Number(this.quatationSum), this.age, this.sex).then(res => {
        this.disabledTax = res;
      });
    }
  }

  private async openPdf() {
    
    if (this.network.type == 'none') {
      let opts: ModalOptions = {
        cssClass: 'lost-connection'
      };

      let modal: Modal = this.modalCtrl.create(PopupLostConnectionComponent);
      modal.present();
      return;
    }

    if (String(this.premiumFooter).indexOf(".") >= 0){
      this.alertCtrl.warning("ระบบคำนวณเบี้ยไม่ถูกต้อง กรุณากดเริ่มใหม่");
      return ;
    }

    if (this.rider) {
      //console.log('this.rider >> ', this.rider);
    }
    if(this.prospect){
      //console.log('this.prospect >> ',this.prospect);
    }
    //console.log('this.prospectDaft >> ',this.prospectDaft);
    //console.log('this.quatationDaft >> ',this.quatationDaft);

    this.loadingCtrl.present();
    let showPdf : boolean = true;
    if(this.profile.roleType != 'employee'){
      if(this.checkinsertQuotationDraft()){
        showPdf = this.validator.validateProspect(this.prospectDaft, true, true, false);
        
        if(showPdf){
          //this.navCtrl.push(QuatationPdfPage, exportData);
            await this.checkDaftExist();
            if(this.checkExist){

              if(typeof(this.quatationDaft) === 'undefined'){
                console.log("customerid = "+this.customerid+" quotationno = "+this.quotationno);
                await this.quotationData.deleteALLQuotation(this.customerid);
                await this.insertProcess();
                this.checkExist = false;
              }else{
                await this.updateProcess();
                this.checkExist = false;
              }
              console.log("gggggggggg -> ", this.quotationData);
            }
            else{
              await this.insertProcess();
            }
        }
        else{
          this.loadingCtrl.dismiss();
        }
      }
    }

    if(showPdf){
    this.taxCal.getPremiumTax(this.taxDeductFlag,
      this.choosePlan,
      Number(this.quatationSum),
      this.age,
      this.sex,
      this.rider,
      this.premiumFooter,
      this.maxDeductTax,
      '1', //this.quatationMode ตอน print ให้แสดงเบี้ยตามที่แสดงในหน้าจอ
      this.hiddenRider
    ).then(res => {

      let premiumTax : number = res
      let exportData = {
          'planCode': this.choosePlan,
          'quatationSum': this.quatationSum,
          'quatationPremium': this.quatationPremium,
          'quatationMode': this.quatationMode,
          'lifePremium': this.lifePremium ,
          'premiumFooter':this.premiumFooter,
          'package': (this.package == undefined ? 1 : this.package),
          'premiumTax': (this.disabledTax ? 0 : premiumTax),

          'tlplan': this.planSelected,
          'prospect': this.prospect,
          'quotation': this.quatation,
          'profile': this.profile
      };
      //alert(this.prospect.firstName+"  "+this.prospect.lastName);
      let today = moment(new Date()).format('YYYY-MM-DD');
      const days: number = moment(today).diff(this.prospect.birthDate.length > 0 ? this.prospect.birthDate : today);


        if(this.profile.roleType != 'employee'){
          if(typeof(this.prospect.firstName) === "undefined" || this.prospect.firstName == '' || typeof(this.prospect.lastName) === "undefined" || this.prospect.lastName == ''){
            this.alertCtrl.warning("กรุณากรอกข้อมูลชื่อหรือนามสกุลให้ครบถ้วน");
          }
          else if(this.prospect.firstName.trim() == '' || this.prospect.lastName.trim() == ''){
            this.alertCtrl.warning("กรุณากรอกข้อมูลชื่อหรือนามสกุลให้ครบถ้วน");
          }
          else{
            this.navCtrl.push('PdfPage', exportData).then(() => {
              this.loadingCtrl.dismiss();
            });
          }
        }
        // else if(this.prospect.age == "0") {
        //   this.alertCtrl.warning("กรุณากรอกช้อมูลวันเดือนปีเกิด");
        // }
        else{
          this.navCtrl.push('PdfPage', exportData).then(() => {
            this.loadingCtrl.dismiss();
          });
        }
      }

    );
    }
  }
  private checkinsertQuotationDraft() : boolean{
    if(this.quotationData.quotation == null){
      return true;
    }
    else if(this.quotationData.quotation.referenceno == undefined
      || this.quotationData.quotation.referenceno == ''
      || this.quotationData.quotation.referenceno == 'N')
    {
      return true;
    }
    return false;
  }
  private selectIndex : number;
  /**
   * ส่งค่า step ที่ถูกเลือก
   * @param index step
   */
  private selectStep(index: number) {
    if (typeof index == 'number' && this.selectIndex != index){

      this.selectIndex = index;

      this.broadcaster.broadcast('quatationStep', index);

    }

  }


  /**
   * ส่งค่า tab ที่ถูกเลือก
   * @param index step
   */
  private selectTab(index: number) {
    if (typeof index == 'number'){
      this.broadcaster.broadcast('quatationTab', index);
      if (index == 1){
        this.loadingCtrl.present();
        this.navCtrl.setRoot('InvestmentPage', {prospect: this.prospect}).then(() => {
          this.loadingCtrl.dismiss();
        });
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
    this.broadcaster.count();
    this.broadcaster.broadcast('quatationStep', 0);
  }
  private filter = (arr) => arr
    .filter( item => item.plancode == this.choosePlan )
    .reduce( item => item.plancode == this.choosePlan );

  /**
   * disabled Page
   * @param
   */
  private disabledPage(param: boolean = false): void {
    if (this.choosePlan == '')
      return;

    if (!this.profile) {
      setTimeout(() => {
        this.disabledPage(param);
      }, 100);
    }
    else if (this.profile.roleType == 'agent') {
      this.http.get('assets/json/quatation-display.json').subscribe(
        data => {
          let dataArray = data.json();
          const planCodeObj = this.choosePlan != '' ? this.filter(dataArray) : null;
          const conditionObj: {YES: string, NO: string, CONDITION: string} =
          {
            "YES" : 'Y',  //เปิด Page ทุกกรณี
            "NO" : 'N',  //ปิด Page ทุกกรณี
            "CONDITION" : 'C'   //เงื่อนไข
          };
          Object.freeze(conditionObj);

          
          if(undefined != planCodeObj && null != planCodeObj) {
            const { form, additinal, unexpect, value, detail, cash, checkup, plancode } = planCodeObj;
            //กรณี plancode มีการเปลี่ยนแปลง
            if(param) {
                /**
               * รูปแบบโครงการ
               */
              if(conditionObj.CONDITION == form) {
                if(this.arrForm.indexOf(plancode) != -1) {
                  this.stepsPage[1].disabled = true;
                } else {
                  this.stepsPage[1].disabled = false;
                }
              } else if(conditionObj.NO == form){
                this.stepsPage[1].disabled = true;
              } else {
                this.stepsPage[1].disabled = false;
              }
              /**
               * เหตุไม่คาดฝัน
               */
              if(conditionObj.CONDITION == unexpect) {
                if(this.arrUnexpected1.indexOf(plancode) != -1) { //เลือกเหตุไม่คาดฝัน
                  this.stepsPage[3].disabled = true;
                  //this.alertCtrl.warning(`แบบประกันนี้ไม่มีหน้าเหตุไม่คาดฝัน`);
                } else if(this.arrUnexpected2.indexOf(plancode) != -1) {
                // this.alertCtrl.warning
                // (`แบบประกันนี้ไม่มีหน้าเหตุไม่คาดฝัน
                //   ดูรายละเอียดความคุ้มครองที่หน้ารูปแบบโครงการ`);
                  this.stepsPage[3].disabled = true;
                } else {
                  this.stepsPage[3].disabled = false;
                }
              } else if(conditionObj.NO == unexpect){
                this.stepsPage[3].disabled = true;
              } else {
                this.stepsPage[3].disabled = false;
              }
              /**
               * มูลค่า
               */
              if(conditionObj.NO == value) {
                this.stepsPage[4].disabled = true;
              } else {
                this.stepsPage[4].disabled = false;
              }
              /**
               * รายละเอียดเบี้ย
               */
              if(conditionObj.NO == detail) {
                this.stepsPage[5].disabled = true;
              } else {
                this.stepsPage[5].disabled = false;
              }
              /**
               * เงินคืนสะสม
               */
              if(conditionObj.NO == cash) {
                this.stepsPage[6].disabled = true;
              } else {
                this.stepsPage[6].disabled = false;
              }
              /**
               * ตรวจสุขภาพ
               */
              if(conditionObj.NO == checkup) {
                this.stepsPage[7].disabled = true;
              } else {
                this.stepsPage[7].disabled = false;
              }
            }
            //กรณี plancode,rider,age มีการเปลี่ยนแปลง
            /**
             * สัญญาเพิ่มเติม
             */
            if(conditionObj.CONDITION == additinal) {
              let checkSum0 = true;
              // console.log("---> ",this.rider);

              for(let i = 0 ; i < this.riderCode.length ; i++) {
                //เลือกสัญญาเพิ่มเติมแบบใดแบบหนึ่ง
                if(this.rider[this.conf.rider(this.riderCode[i])] && Number(this.rider[this.conf.rider(this.riderCode[i])].sum) > 0) {
                  checkSum0 = false;
                  break;
                }
              }
              if(!checkSum0) {
                this.stepsPage[2].disabled = checkSum0;
              }
              if(checkSum0 && Number(this.prospect.age) > 59) {
                this.stepsPage[2].disabled = true;
              } else {
                this.stepsPage[2].disabled = false;
              }
            } else if(conditionObj.NO == additinal) {
              this.stepsPage[2].disabled = true;
            } else {
              this.stepsPage[2].disabled = false;
            }
          }
        }
      );
    }
  }



  private prospectDaft: ProspectModel;
  private quatationDaft: QuotationModel;
  private async insertProcess(){
    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");
    let CodeTP = await this.planProvider.getRiderPlanTP(this.choosePlan);
    let agentid = "";
    await this.storage.get('loginProfile').then(profile =>{
      agentid = profile.agentid;
    });
    try{

      //check prospect form service
      let prospectFormService: any;
      this.prospectProvider.duplicateFlag = false;
      await this.prospectProvider.checkProspectFormService(this.prospectDaft).then(
        (res) => {
          console.log('this.prospect After Check form service 1 --->', res);
          prospectFormService = res;
        },
        (error) => {
          return;
        } 
      );

      if(typeof prospectFormService == 'undefined'){
        return;
      }
      if(prospectFormService['success'] == false){
        return;
      }
      this.prospectDaft.customerID = prospectFormService['prospect']['customerID'];
      console.log('this.prospect After Check form service 2 -->',this.prospectDaft);


      let isInsertProspect : boolean = this.prospectDaft.customerID == undefined
      if(isInsertProspect)
      {
        //console.log("save df insertProcess "+isInsertProspect+" "+agentid+"  "+dateNow+"  "+dateNowNo+"  "+this.planSelected[0].planCode);
        //await this.insertProspect(agentid , dateNow , dateNowNo);
        await this.prospectProvider.insertProspect(agentid , dateNow , dateNowNo, this.prospectDaft, true).then(
          (res) => {
            console.log('prospect after insert--->', this.prospectDaft);
          }
        );
      } else {
        //await this.updateProspect(agentid , dateNow , dateNowNo);
        await this.prospectProvider.updateProspect(agentid , dateNow , dateNowNo, this.prospectDaft, true).then(
          (res) => {
            console.log('prospect after update--->', this.prospectDaft);
          }
        );
      }
      // await this.saveQuation();
      let quotationno : string = agentid+this.choosePlan+dateNowNo;//Require = Y
      let customerid : string = this.prospectDaft.customerID;//Require = Y
      //console.log("insertProcess() : customerid : "+customerid);
      //Quotation
      await this.insertQuotation(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP);
      //QuotationRider
      await this.insertQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid);
      //QuotationGuardian
      await this.insertQuotationGuardianM(agentid, dateNow, dateNowNo,quotationno,customerid);

      //this.broadcaster.broadcast('quatation', this.quotation);
      // if(isInsertProspect){
      //   this.broadcaster.broadcast('prospect', this.prospect);
      // }

      return true;
    } catch(e) {
      this.alertCtrl.error(e);
      return false;
    }
  }

  // private async insertProspect(agentid : string, dateNow : string, dateNowNo : string){
  //   let prospectModelReq: ProspectModel = this.setProspectForSave(agentid, dateNow, dateNowNo);
  //   let prospectModelReqList : Array<ProspectModel> = [];
  //   prospectModelReqList.push(prospectModelReq);
  //   let reqModel:RequestModel = new RequestModel();

  //   prospectModelReq.flagdraftyn = 'Y';
  //   this.prospectDaft.flagdraftyn = "Y";

  //   reqModel.agentid = agentid;
  //   reqModel.functionName = FunctionName.POSPECT;
  //   reqModel.param = prospectModelReqList;
  //   reqModel.serviceName = ServiceName.INSERT;
  //   //console.log("data POSPECT : " +  prospectModelReq);
  //   await this.apiProvider.callData(reqModel).then(
  //     (res) =>{
  //       let obj :any = res;
  //       let resModel :ResponseModel = obj;
  //       console.log("insert POSPECT : " +  JSON.stringify(res));
  //       // ต้องได้ค่า Foreign Key จาก Service
  //       this.prospectDaft.customerID = obj.data[0].customerID;//ต้องส่ง customer id ออกมา

  //     },(err) => {
  //       //TO-DO
  //       console.log(err);
  //     });
  // }

  private checkExist : boolean = false;
  private async checkDaftExist(){
    let objM: QuotationModel = new QuotationModel();
    objM.publishstatus = 'D';
    let objMs: Array<QuotationModel> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.searchkey = "DRAFT";
    //reqM.keyvalue = i;

    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs;

    await this.apiProvider.callData(reqM).then(
    (res) => {

    //this.loadingCtrl.scopeDismiss(loading);
    let temp : any = res;
    //console.log(JSON.stringify(temp));

    //this.quotationAll = [];
    if (temp.status == 0 && temp.size > 0) {
      this.checkExist = true;
      this.customerid =  temp.data[0].customerid;
      this.quotationno =  temp.data[0].quotationno;
      if(this.prospect.customerID == undefined ||
         this.prospect.customerID == '' ||
         this.prospect.customerID != temp.data[0].customerid)
      {
        this.quatationDaft = undefined;
      }
      else{
        this.quatationDaft = temp.data[0];
      }
     // console.log('this.quatationDaft ============> '+JSON.stringify(this.quatationDaft));
      // this.prospect = temp.data[0].prospectM;
      // this.quotation.quotationno = temp.data[0].quotationno;
      //this.quatation = temp.data[0];
      // console.log("5555"+JSON.stringify(temp.data[0])+"  "+temp.data[0].quotationno);
      //this.
      //alert(temp.status+"  "+JSON.stringify(temp.data))
     // let quotationModelArr: QuotationModel[] = this.temp.data;
     //alert(temp.datas[0]);
      // quotationModelArr.forEach(element => {
      //   this.quotation.push(element);
      // });
      // this.quotationAll = this.quotation;
    }
    else {
      // this.quotation = [];
      this.checkExist = false;
    }
    },
    (err) => {
      this.alertCtrl.error(err);
    }
    );
  }

  // private setProspectForSave(agentid : string, dateNow : string, dateNowNo : string) : ProspectModel{
  //   let prospectModelReq: ProspectModel = new ProspectModel();
  //   prospectModelReq.agentID = agentid;
  //   prospectModelReq.customerID = null;
  //   prospectModelReq.firstName = this.prospectDaft.firstName;
  //   prospectModelReq.lastName = this.prospectDaft.lastName;
  //   prospectModelReq.preName = this.prospectDaft.preName;
  //   prospectModelReq.preNameOther = "";
  //   prospectModelReq.gender = this.prospectDaft.gender;
  //   prospectModelReq.occupationType = this.prospectDaft.occupationType;
  //   prospectModelReq.age = this.prospectDaft.age;

  //   let birthDate = undefined;
  //   //prospectModelReq.birthDate = dateNow;
  //   prospectModelReq.birthDate = this.prospectDaft.birthDate+" 00:00:00";

  //   prospectModelReq.telephone = "";
  //   prospectModelReq.mobilephone = this.prospectDaft.mobilephone;
  //   prospectModelReq.fax = "";
  //   prospectModelReq.passport = "";
  //   prospectModelReq.lineID = "";
  //   prospectModelReq.linkFacebook = "";
  //   prospectModelReq.geolocation = "";
  //   prospectModelReq.address = "";
  //   prospectModelReq.subdistrict = "";
  //   prospectModelReq.district = "";

  //   prospectModelReq.province = "";
  //   prospectModelReq.postcode = "";
  //   prospectModelReq.status = "";
  //   prospectModelReq.remark = "";
  //   prospectModelReq.createDatetime = dateNow;
  //   prospectModelReq.lastModify = dateNow;
  //   prospectModelReq.lastSync = "";
  //   prospectModelReq.citizenID = this.prospectDaft.citizenID;
  //   prospectModelReq.email = "";
  //   prospectModelReq.customerType = 'P'; // Prospect

  //   prospectModelReq.applicationAmt = 0;//number
  //   prospectModelReq.quatationAmt = 0;
  //   prospectModelReq.maritalstatus = "";

  //   prospectModelReq.provinceCode = "";
  //   prospectModelReq.districtCode = "";
  //   prospectModelReq.subdistrictCode = "";

  //   prospectModelReq.createDatetimeFrom = dateNow;
  //   prospectModelReq.createDatetimeTo = dateNow;

  //   if(this.prospect.customerID != undefined){
  //     prospectModelReq.customerID = this.prospectDaft.customerID;
  //     prospectModelReq.preNameOther = this.prospectDaft.preNameOther;

  //     prospectModelReq.telephone = this.prospectDaft.telephone;
  //     prospectModelReq.fax = this.prospectDaft.fax;
  //     prospectModelReq.passport = this.prospectDaft.passport;
  //     prospectModelReq.lineID = this.prospectDaft.lineID;
  //     prospectModelReq.linkFacebook = this.prospectDaft.linkFacebook;
  //     prospectModelReq.geolocation = this.prospectDaft.geolocation;
  //     prospectModelReq.address = this.prospectDaft.address;

  //     /** Fixed by send code to API. */
  //     prospectModelReq.subdistrict = this.prospectDaft.subdistrictCode;
  //     prospectModelReq.district = this.prospectDaft.districtCode;
  //     prospectModelReq.province = this.prospectDaft.provinceCode;

  //     prospectModelReq.postcode = this.prospectDaft.postcode;
  //     prospectModelReq.status = this.prospectDaft.status;
  //     prospectModelReq.remark = this.prospectDaft.remark;
  //     prospectModelReq.lastSync = this.prospectDaft.lastSync;
  //     prospectModelReq.email = this.prospectDaft.email;

  //     prospectModelReq.applicationAmt = this.prospectDaft.applicationAmt;//number
  //     prospectModelReq.quatationAmt = this.prospectDaft.quatationAmt;
  //     prospectModelReq.maritalstatus = this.prospectDaft.maritalstatus;

  //     prospectModelReq.provinceCode = this.prospectDaft.provinceCode;
  //     prospectModelReq.districtCode = this.prospectDaft.districtCode;
  //     prospectModelReq.subdistrictCode = this.prospectDaft.subdistrictCode;

  //     prospectModelReq.addressno =  this.prospectDaft.addressno;
  //     prospectModelReq.buildingname =  this.prospectDaft.buildingname;
  //     prospectModelReq.moo =  this.prospectDaft.moo;
  //     prospectModelReq.soi =  this.prospectDaft.soi;
  //     prospectModelReq.road =  this.prospectDaft.road;

  //     prospectModelReq.flagdraftyn = this.prospectDaft.flagdraftyn;
  //   }
  //   return prospectModelReq;
  // }

  private async insertQuotation(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string, CodeTP : any){
    let objM: QuotationModel = this.setQuotationForSave(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP);

    //console.log(JSON.stringify(objM))
    let objMs: Array<QuotationModel> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.INSERT;
    reqM.param = objMs;

    await this.apiProvider.callData(reqM).then(
      (res) => {
        this.quotation = objM;
        //console.log("insert quotation : " + JSON.stringify(res));
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }

  private setQuotationForSave(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string, CodeTP : any) : QuotationModel{
    let quotation: QuotationModel = new QuotationModel();
    //PK possible Duplicate
    // if(this.quotation == null) {
    //   quotation.quotationno = agentid+this.planSelected[0].planCode+dateNowNo;//Require = Y
    //   quotation.customerid = this.prospect.customerID;//Require = Y
    //   quotation.agentid = agentid;//Require = Y
    // }
    // else{
    //   quotation.quotationno = this.quotation.quotationno;//Require = Y
    //   quotation.customerid = this.prospect.customerID;//Require = Y
    //   quotation.agentid = agentid;//Require = Y
    // }
    quotation.quotationno = quotationno;//Require = Y
    quotation.customerid = customerid;//Require = Y
    quotation.agentid = agentid;//Require = Y

    quotation.devicerefno = "D";
    quotation.plancode = this.planSelected.planCode;

    quotation.planname = this.planSelected.planName;
    quotation.mode = (this.quatationMode === "9" ? "1" : this.quatationMode );
    quotation.occupationtype = this.prospectDaft.occupationType;
    quotation.insureage = this.prospectDaft.age;
    quotation.lifesum = String(this.quatationSum);

    quotation.lifepremium = this.premiumFooter;
    quotation.pname = this.prospectDaft.preName;
    quotation.fname = this.prospectDaft.firstName;
    quotation.lname = this.prospectDaft.lastName;
    quotation.branch = "";
    quotation.gender = this.prospectDaft.gender;

    quotation.tax = "";
    quotation.publishstatus = "D";

    quotation.packageno = this.package;
    quotation.soldier = this.soldier;
    quotation.referenceno = "";
    quotation.createdatetime = dateNow;//Require = Y
    quotation.birthdate = this.prospectDaft.birthDate+" 00:00:00";
    quotation.lastmodify = dateNow;//Require = Y
    quotation.lastsync = "";
    quotation.status = "N";
    if(typeof(this.quotation) === "undefined" || (this.overwrite == false)){
      quotation.status = "N";
    }else{
      quotation.status = this.quotation.status;
    }
    quotation.pdfpath = "";
    if(typeof(this.rider['occupation']) !== 'undefined' ){
      quotation.occ = this.rider['occupation']['occ'];
      quotation.occgroup = this.rider['occupation']['occGroup'];
    }
    quotation.typeapp = this.typeApp(this.planSelected.planCode);
    quotation.paytype = this.planSelected.payType;
    quotation.endowmenttype = this.planSelected.endowmentType;
    quotation.ppayyear = (this.planSelected.payType === "0" ? this.planSelected.pPayYear : String(Number(this.planSelected.pPayYear) - Number(this.prospectDaft.age)));
    quotation.pendowmentyear =  (this.planSelected.endowmentType === "0" ? this.planSelected.pEndowmentYear : String(Number(this.planSelected.pEndowmentYear) - Number(this.prospectDaft.age)));
    quotation.havetp = this.checkTp(CodeTP,Number(this.prospectDaft.age));
    quotation.kbcoverageyear = this.endownKB2(Number(this.prospectDaft.age) , Number(this.rider['KB2'].age) , Number(quotation.ppayyear));
    quotation.healthcheckflag = this.HealthCheck(Number(this.prospectDaft.age),Number(this.quatationSum));
    quotation.publishstatus = "D";
    quotation.totalpremium = this.premiumTotal;

    //console.log("quotation : " + JSON.stringify(quotation));
    return quotation
  }

  private async insertQuotationRiderM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){

    let objMQRs: Array<QuotationRiderM> = this.setRiderForSave(agentid, dateNow, dateNowNo,quotationno,customerid);

    if(objMQRs.length > 0)
    {
      let reqMQR: RequestModel = new RequestModel();
      reqMQR.functionName = FunctionName.QUOTATIONRIDER;
      reqMQR.serviceName = ServiceName.INSERT;
      reqMQR.param = objMQRs;

      await this.apiProvider.callData(reqMQR).then(
        (res) => {
          //console.log("insert QuotationRider : " + JSON.stringify(res));
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  private setRiderForSave(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string) : Array<QuotationRiderM> {
    let listRider: Array<QuotationRiderM> = [];

    for (let key in this.rider) {
      let sum = Number(this.rider[key].sum);
      let premium = Number(this.rider[key].premium);
      //console.log("key = " + key + "||sum = " + sum);

      if(premium > 0){
        let objMQR: QuotationRiderM = new QuotationRiderM();

        objMQR.quotationno = quotationno;//Require = Y
        objMQR.customerid = customerid;//Require = Y
        objMQR.ridertype = key;//Require = Y jomkrit

        objMQR.sum = this.rider[key].sum;
        objMQR.premium = this.rider[key].premium;

        objMQR.createdatetime = dateNow;//Require = Y
        objMQR.lastmodify = dateNow;//Require = Y
        objMQR.lastsync = "";
        objMQR.agentid  = agentid;//Require = Y

        listRider.push(objMQR);
      }
    }
    return listRider;
  }

  // อาจจะต้องแก้ไขให้มีการ return ค่ากลับกรณีที่บันทึกสำเร็จ หรือ error
  private async insertQuotationGuardianM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){

    let objGMs: Array<QuotationGuardianM> = [];
    if(this.rider['KB2'].premium > 0)
    {
      let objGM: QuotationGuardianM = this.setQuotationGuardianM(agentid, dateNow, dateNowNo,quotationno,customerid);//Require = Y
      objGMs.push(objGM);

      let reqGM: RequestModel = new RequestModel();
      reqGM.functionName = FunctionName.QUOTATIONGUARDIAN;
      reqGM.serviceName = ServiceName.INSERT;
      reqGM.param = objGMs;

      await this.apiProvider.callData(reqGM).then(
        (res) => {
          //console.log("insert QuotationGuardianM : " +  JSON.stringify(res));
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  private setQuotationGuardianM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){
    let objGM: QuotationGuardianM = new QuotationGuardianM();
    objGM.quotationno = quotationno;//Require = Y
    objGM.customerid = customerid;//Require = Y
    objGM.prename = "test";
    objGM.firstname = "jomkrit";
    objGM.lastname = "editservice";

    objGM.sex = this.rider['KB2'].sex;
    objGM.birthdate = this.rider['KB2'].birth.concat(" 00:00:00");//15:14:1
    objGM.age = this.rider['KB2'].age;

    objGM.createdatetime = dateNow;//Require = Y
    objGM.lastmodify = dateNow;//Require = Y

    objGM.lastsync = "";
    objGM.agentid = agentid;//Require = Y
    return objGM;
  }

  private typeApp(plan: string)
  {
    return this.quotationData.typeApp(plan);
  }

  private checkTp(codetp: string ,age: number)
  {
    return this.quotationData.checkTp(codetp, age);
  }

  private endownKB2(ageKid: number , ageKb: number , payYear: number)
  {
    return this.quotationData.endownKB2(ageKid, ageKb, payYear);
  }
  private HealthCheck(age: number , sum: number)
  {
    return this.quotationData.HealthCheck(age, sum);
  }

  // private async updateProspect(agentid : string, dateNow : string, dateNowNo : string){
  //   let prospectModelReq: ProspectModel = this.setProspectForSave(agentid, dateNow, dateNowNo);
  //   // prospectModelReq.customerID = this.quotation.customerid;
  //   //console.log(JSON.stringify(prospectModelReq));
  //   let prospectModelReqList : Array<ProspectModel> = [];
  //   prospectModelReqList.push(prospectModelReq);
  //   let reqModel:RequestModel = new RequestModel();

  //   reqModel.agentid = agentid;
  //   reqModel.functionName = FunctionName.POSPECT;
  //   reqModel.param = prospectModelReqList;
  //   reqModel.serviceName = ServiceName.UPDATE;

  //   await this.apiProvider.callData(reqModel).then(
  //     (res) =>{
  //       let obj :any = res;
  //       let resModel :ResponseModel = obj;
  //       //console.log("UPDATE POSPECT : " +  JSON.stringify(res));

  //     },(err) => {
  //       console.log(JSON.stringify(err));
  //   });
  // }

  private async updateProcess(){

    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");
    let CodeTP = await this.planProvider.getRiderPlanTP(this.choosePlan);
    let agentid = "";
    await this.storage.get('loginProfile').then(profile =>{
      agentid = profile.agentid;
    });
    try{

      //check prospect form service
      let prospectFormService: any;
      this.prospectProvider.duplicateFlag = false;
      await this.prospectProvider.checkProspectFormService(this.prospectDaft).then(
        (res) => {
          console.log('this.prospect After Check form service 1 --->', res);
          prospectFormService = res;
        },
        (error) => {
          return;
        } 
      );

      if(typeof prospectFormService == 'undefined'){
        return;
      }
      if(prospectFormService['success'] == false){
        return;
      }

      //Update prospect
      //await this.updateProspect(agentid , dateNow , dateNowNo);
      await this.prospectProvider.updateProspect(agentid , dateNow , dateNowNo, this.prospectDaft, true).then(
        (res) => {
          console.log('prospect after update--->', this.prospectDaft);
        }
      );
      //Update QUotation
      //alert(this.quotation.quotationno);
      let quotationno : string = this.quatationDaft.quotationno;//Require = Y
      let customerid : string = this.prospectDaft.customerID;//Require = Y
      await this.updateQuotation(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP);

      //Delete Rider
      await this.updateQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid);

      //Delete QuotationGuardianquotation
      await this.updateQuotationGuardianM(agentid, dateNow, dateNowNo,quotationno,customerid);
      //this.broadcaster.broadcast('quatation', this.quotation);

      return true;
    } catch(e) {
      this.alertCtrl.error(e);
      return false;
    }

  }

  private async updateQuotation(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string, CodeTP : any){

    let objM: QuotationModel = this.setQuotationForSave(agentid, dateNow, dateNowNo, quotationno, customerid, CodeTP);

    let objMs: Array<QuotationModel> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.UPDATE;
    reqM.param = objMs;

    await this.apiProvider.callData(reqM).then(
      (res) => {
        this.quotation = objM;
        //console.log("UPDATE quotation : " + JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private async updateQuotationRiderM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){

    let objMQRDs: Array<QuotationRiderM> = [];
    let objMQRD: QuotationRiderM = new QuotationRiderM();

    objMQRD.quotationno = quotationno;//Require = Y
    objMQRD.customerid = customerid;//Require = Y
    objMQRD.agentid = agentid;
    objMQRDs.push(objMQRD);

    let reqMQR: RequestModel = new RequestModel();
    reqMQR.functionName = FunctionName.QUOTATIONRIDER;
    reqMQR.serviceName = ServiceName.DELETE;
    reqMQR.param = objMQRDs;

    await this.apiProvider.callData(reqMQR).then(
      async (res) => {
        //console.log("DELETE QuotationRider : " + JSON.stringify(res));
          //QuotationRider
          await this.insertQuotationRiderM(agentid, dateNow, dateNowNo,quotationno,customerid);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private async updateQuotationGuardianM(agentid : string, dateNow : string, dateNowNo : string,
    quotationno : string, customerid : string){

    //Delete QuotationGuardian
    let objGMDs: Array<QuotationGuardianM> = [];
    let objGMD: QuotationGuardianM = new QuotationGuardianM();
    objGMD.quotationno = quotationno;//Require = Y
    objGMD.customerid = customerid;//Require = Y
    objGMD.agentid = agentid;
    objGMDs.push(objGMD);

    let reqGM: RequestModel = new RequestModel();
    reqGM.functionName = FunctionName.QUOTATIONGUARDIAN;
    reqGM.serviceName = ServiceName.DELETE;
    reqGM.param = objGMDs;

    await this.apiProvider.callData(reqGM).then(
      async (res) => {
        //console.log("DELETE QuotationGuardianM : " +  JSON.stringify(res));
        //QuotationGuardian
        await this.insertQuotationGuardianM(agentid, dateNow, dateNowNo,quotationno,customerid);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
