import { TextModal } from './../../../providers/constants/text-modal';
import { WarningModalComponent } from './../../../components/utility/warning-modal/warning-modal';
import { DecimalPipe, LocationChangeListener } from '@angular/common';
import { PopoverCalendarComponent } from './../../../components/popover-calendar/popover-calendar';
import { UlinkAppDataProvider } from './../../../providers/ulink-app-data/ulink-app-data';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subscription} from 'rxjs/Rx';
import { Component, OnDestroy, Input, IterableDiffers, IterableDiffer, ElementRef, EventEmitter, Output, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, PopoverController } from 'ionic-angular';
import { Broadcaster } from './../../../providers/utility/broadcaster';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { AlertDirective } from './../../../directives/extends/alert/alert';


// Step Page
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { count } from 'rxjs/operator/count';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import { empty } from '../../../../node_modules/rxjs/observable/empty';
import { setDOM } from '../../../../node_modules/@angular/platform-browser/src/dom/dom_adapter';
import { ReturnStatement } from '../../../../node_modules/@angular/compiler';
import { UnitlinkBenefit } from '../../../providers/ulink-benefit/unitlink-benefit';


@IonicPage()
@Component({
selector: 'page-quatation-benefit',
templateUrl: 'quatation-benefit.html',
})
export class QuatationBenefitPage implements AfterViewChecked, OnDestroy {

  /**
  * ตำแหน่งของ Page
  */
  private tab: number = 0;
  private countIndex :number = 0;
  @Input() private premiumPayObj: object = {
    em : "0",
    tax : [5,10,15,20,30,35

    ],
    inflation : [1,2,3,4,5,6,7,8,9,10],
    profitper : [1,2,3,4,5,6,7,8,9,10,11,12]

  };

  // defalut value
  private tlPLanMain = [];

    /**
   * TL99/1 Plans
   */
  tlPlan1 = [
    'ทุนการศึกษาให้กับบุตรหลาน',
    'เพื่อชีวิตหลังเกษียณอายุ',
    'ออกแบบยูนิตลิงค์ด้วยตัวเอง'
  ];

    /**
   * TL99/99 Plans
   */
  tlPlan2 = [
    'สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต',
    'ทุนการศึกษาให้กับบุตรหลาน',
    'เพื่อชีวิตหลังเกษียนอายุ',
    'ค่ารักษาพยาบาล',
    'ออกแบบยูนิตลิงค์ด้วยตัวเอง'
  ];

  private subscription: Array<Subscription> = [];



  /**
   * ส่งจำนวนการวน loop เพื่อจะปริ้นตัวแปร select-option
   * @param n
   */
  private arrayOne(n: number): any[] {
    return Array(n);
  }

  /**
   * ตัวแปร Steps ของ dropdown 'ทุนการศึกษาให้กับบุตรหลาน' TL 99/1
   */
  private stepsPlan2 = [
      {
      id:0,
      title: 'ข้อมูลบุตรในอุปการะ',
      icon: '',
      disabled: false
      },
      {
      id:1,
      title: 'การชำระเบี้ยประกัน',
      icon: '',
      disabled: false
      },
      {
      id:2,
      title:  'อัตราผลตอบแทน',
      icon: '',
      disabled: false
      },
      {
      id:3,
      title: 'ถอน',
      icon: '',
      disabled: false
      }
      ,
      {
      id:4,
      title: 'สรุปตัวอย่างผลประโยชน์',
      icon: '',
      disabled: false
      }
    ];

    /**
   * ตัวแปร Steps ของ dropdown 'เพื่อชีวิตกลังเกษียณอายุ'  TL 99/1 และ
   * ตัวแปร Steps ของ dropdown 'ออกแบบยุนิตลิงค์ด้วยตัวเอง'  TL 99/1
   */
  private stepsPlanOne1 = [
    {
    id:0,
    title: 'การชำระเบี้ยประกันภัย',
    icon: '',
    disabled: false
    },
    {
    id:1,
    title:  'อัตราผลตอบแทน',
    icon: '',
    disabled: false
    },
    {
    id:2,
    title: 'ถอน',
    icon: '',
    disabled: false
    }
    ,
    {
    id:3,
    title: 'สรุปตัวอย่างผลประโยชน์',
    icon: '',
    disabled: false
    }
  ];

    /**
   * ตัวแปร Steps ของ dropdown 'สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต' TL 99/99
   */
  private stepsPlan3 = [
    {
    id:0,
    title: 'การชำระเบี้ยประกันภัย',
    icon: '',
    disabled: false
    },
    {
    id:1,
    title: 'จำนวนเงินเอาประกันภัย RPP',
    icon: '',
    disabled: false
    },
    {
    id:2,
    title:  'อัตราตอบแทน',
    icon: '',
    disabled: false
    },
    {
    id:3,
    title: 'สรุปตัวอย่างผลประโยชน์',
    icon: '',
    disabled: false
    }
  ];

   /**
   * ตัวแปร Steps ของ dropdown 'ทุนการศึกษาให้กับบุตรหลาน' TL 99/99
   */
  private stepsPlan4 = [
    {
    id:0,
    title: 'ข้อมูลบุตรในอุปการะ',
    icon: '',
    disabled: false
    },
    {
    id:1,
    title: 'การชำระเบี้ยประกันภัย',
    icon: '',
    disabled: false
    },
    {
    id:2,
    title:  'จำนวนเงินเอาประกันภัย RPP',
    icon: '',
    disabled: false
    },
    {
    id:3,
    title: 'อัตราผลตอบแทน',
    icon: '',
    disabled: false
    },
    {
    id:4,
    title: 'ถอน',
    icon: '',
    disabled: false
    },
    {
    id:5,
    title: 'สรุปตัวอย่างผลประโยชน์',
    icon: '',
    disabled: false
    }
  ];

  /**
   * ตัวแปร Steps ของ dropdown 'เพื่อชีวิตหลังเกษียณอายุ' TL 99/99
   */
  private stepsPlan5 = [
    {
    id:0,
    title: 'การชำระเบี้ยประกันภัย',
    icon: '',
    disabled: false
    },
    {
    id:1,
    title: 'จำนวนเงินประกันภัย RPP',
    icon: '',
    disabled: false
    },
    {
    id:2,
    title: 'อัตราผลตอบแทน',
    icon: '',
    disabled: false
    },
    {
    id:3,
    title: 'ถอน',
    icon: '',
    disabled: false
    },
    {
    id:4,
    title: 'สรุปตัวอย่างผลประโยชน์',
    icon: '',
    disabled: false
    }
  ];

  /**
   * ตัวแปร Steps ของ dropdown 'ค่ารักษาพยาบาล' TL99/99
   */
  private stepsPlan6 = [
    {
    id:0,
    title: 'การชำระเบี้ยประกันภัย',
    icon: '',
    disabled: false
    },
    {
    id:1,
    title: 'จำนวนเงินประกันภัย RPP',
    icon: '',
    disabled: false
    },
    {
    id:2,
    title: 'อัตราผลตอบแทน',
    icon: '',
    disabled: false
    },
    {
    id:3,
    title: 'สัญญาเพิ่มเติม',
    icon: '',
    disabled: false
    },
    {
    id:4,
    title: 'สรุปตัวอย่างผลประโยชน์',
    icon: '',
    disabled: false
    }
  ];

  /**
   * ตัวแปร Steps ของ dropdown 'ออกแบบยูนิตลิงค์ด้วยตัวเอง' TL 99/99
   */
  private stepsPlan7 = [
    {
    id:0,
    title: 'การชำระเบี้ยประกันภัย',
    icon: '',
    disabled: false
    },
    {
    id:1,
    title: 'จำนวนเงินประกันภัย RPP',
    icon: '',
    disabled: false
    },
    {
    id:2,
    title: 'อัตราผลตอบแทน',
    icon: '',
    disabled: false
    },
    {
    id:3,
    title: 'ถอน',
    icon: '',
    disabled: false
    },
    {
    id:4,
    title: 'สัญญาเพิ่มเติม',
    icon: '',
    disabled: false
    },
    {
    id:5,
    title: 'สรุปตัวอย่างผลประโยชน์',
    icon: '',
    disabled: false
    }
  ];

  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private prospect: ProspectModel;


  /**
   * ตั้งค่าตัวแปรที่ใช้เป็น Toggle เปิด/ปิด html details แต่ละส่วน
   */
  private showViewPage: number = 1;
  private showViewPage2: number = 1;
  private showPlan: number = 1;
  private showStepPage: number = 0;
  private showStepBtSum: boolean = false;

  private data = 'ทุนการศึกษาให้กับบุตรหลาน';

  private valueChangeProfitChild : Array<number> = [];

  /**
   * ทุนการศึกษาให้กับบุตรหลาน 99/1
   */
  private ulinkChildInfo:FormGroup;
  private ulinkChildPremium:FormGroup;
  private ulinkChildPremium_array:FormGroup;
  private ulinkChildProfit:FormGroup;
  private ulinkChildProfit_array:FormGroup;
  private ulinkChildWithdraw:FormGroup;

  /**
   * ทุนการศึกษาให้กับบุตรหลาน 99/99
   */
  private ulinkChildInfo2:FormGroup;
  private ulinkChildProfit2:FormGroup;
  private ulinkChildWithdraw2:FormGroup;
  private childFundPayPremium:FormGroup;
  private childRppPremiumValue:FormGroup;

  /**
   * variable to store latest child age in Profit Scope
   */
  public  child_age = 0;
  public child_ageto = 0;
  public propect_age;
  public propect_age_start;

/**
 * เพื่อชีวิตหลังเกษียณอายุ 99/1
 */
  private tlRetire: FormGroup;
  private tlRetirePremiumType = {
    retire_singlePremium: 0,
    retire_TopUpPremium: 0
  }
  private tlRetireProfit: FormGroup;

  private tlRetireWithdraw: FormGroup;

  private disableRetirePaymentType = [];

  private tlRetireBtnAddArrTopUp: boolean = false;
  private tlRetireBtnAddArrYield: boolean = false;

  /**
   * สำหรับโชว์ รายปี ซึ่งคำนวณจาก RPP
   */
  private sum_rpp : any = 'x,xxx,xxx';


  private dataChangeForChlid = [];

 /***************
      *  99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง
  ****************/
  private customUlinkPayInsurance: FormGroup;
  private customUlinkYield: FormGroup;
  private customUlinkWithdraw: FormGroup;
  private premiumUlink = {
    singlePremium: 0,
    topUpPremium: 0
  }
  // disable paymentType dropdown
  private disablePaymentType = [];
  // เปิด-ปิด ปุ่ม add form array
  private btnAddArrTopUp: boolean = false;
  private btnAddArrYield: boolean = false;

  private topsum: Array<number> = [0];

  /***************
      *  99/99 สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต
  ****************/
  private lifeChanging: FormGroup;
  private lifeChangingRpp: FormGroup;
  private lifeChangingProfit: FormGroup;


  private lifeChangingRppRow = [];
  private lifeChangingRppRowIndex :number = 0;


  private selectedTabIndex1: number = 0;
  private selectedTabIndex2: number = 0;

  private stepHTML : any = '<step *ngFor=" let item of stepsPlan2;let i = index"  [stepTitle]="item.title" [disabled]="item.disabled" [index]="item.id"></step>';
  private birthDate: any;

  private showMajor :boolean = false;
  private showMaster :boolean = false;
  private shoRpp: any = 'x,xxx,xxx';


  /**
 * เพื่อชีวิตหลังเกษียณอายุ 99/99
 */

  private tlRetire_ua02: FormGroup;
  private tlRetirePremium_ua02: FormGroup;
  private premium_ua02 = {

  }
  private tlRetireProfit_ua02: FormGroup;
  private tlRetireWithdraw_ua02: FormGroup;

  private BtnAddArrYield_ua02: boolean = false;


  private maxDate;
   /**
   * ปีที่เลือกได้น้อยที่สุด
   */
  private minBirthDate;

  private profitage : Array<number> = [];
  private profitchild : Array<number> = [];

  private  minSumRPP0: any = "800,000";
  private maxSumRPP0: any = "1,200,000";

  private btSummaryData: any;

  private premiumUlinkChild = {
    single_prem: 0,
    top_prem: 0
  }

  constructor(private broadcaster: Broadcaster,
    private navCtrl: NavController,
    private storage: Storage,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public ulinkApp :UlinkAppDataProvider,
    private decimalPipe: DecimalPipe,
    private alertCtrl: AlertDirective,
    private element: ElementRef,
    private unitLinkData: UnitlinkDataProvider,
    private cdRef:ChangeDetectorRef
  ) {
    this.maxDate = moment().format('YYYY-MM-DD');

    /** defalut value for using in formArray protect dead loop */
    this.profitage.length = 1;
    this.profitchild.length = 1;
    this.topsum[0] = 0;
    this.profitage[0] = Number('');
    this.profitchild[0]= Number('');

    let date = new Date();
    this.minBirthDate = date.getFullYear() - 100;

    this.prospect = this.navParams.get('prospect');

      // default data
      this.tlPLanMain.push(this.tlPlan1);
      this.dataChangeForChlid[0] = 0;


    /** ทุนการศึกษาให้กับบุตรหลาน (formGroup) 99/1 */
    this.ulinkChildInfo = this.fb.group({
      child_title: '',
      child_title_des: '',
      child_fname_one: '',
      child_lname_one: '',
      child_sex: [{value: '', disabled: true}, Validators.required],
      child_age:  '',
      child_ageto: '',
    });

    this.ulinkChildPremium = this.fb.group({
      child_tax: '',
      Child_ageNow: [{value: this.prospect.age, disabled: true}, Validators.required],
      PremiumUlinkChild: this.premiumUlinkChild
    });

    this.ulinkChildPremium_array = this.fb.group({
      toppayRows: this.fb.array([this.initItemRows()])
    });

    this.ulinkChildProfit = this.fb.group({
      profitage_0: [{value: this.prospect.age, disabled: true}, Validators.required],
      profitchild_0: [{value: '', disabled: true}, Validators.required],
      profitper_0: '',
    });

    this.ulinkChildProfit_array = this.fb.group({
      profitRows: this.fb.array([this.initItemProfitRows()]),
    });


    this.ulinkChildWithdraw = this.fb.group({
      sale_fund: [{value: '', disabled: true}, Validators.required],
      child_inflation: '',
      bachelorwd: Number(''),
      bachelor_agestr_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_agestp_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_polstr_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_polstp_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_agechildstr_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_agechildstp_wd: [{value: '', disabled: true}, Validators.required],
      masterwd:  Number(''),
      master_agestr_wd: [{value: '', disabled: true}, Validators.required],
      master_agestp_wd: [{value: '', disabled: true}, Validators.required],
      master_polstr_wd: [{value: '', disabled: true}, Validators.required],
      master_polstp_wd: [{value: '', disabled: true}, Validators.required],
      master_agechildstr_wd: [{value: '', disabled: true}, Validators.required],
      master_agechildstp_wd: [{value: '', disabled: true}, Validators.required]
    });

    /** end of ทุนการศึกษาให้กับบุตรหลาน (formGroup) */

    // 99/1 เพื่อชีวิตหลังเกษียณอายุ
    this.tlRetire = this.fb.group({
      retire_inputAge : [this.prospect.age, Validators.required],
      retire_inputAgeFrom : [this.prospect.age, Validators.required],
      retire_inputAgeTo : ['',Validators.required],
      retire_tax:  ['',Validators.required],
      retirePremiumArrayFb: this.fb.array([this.retirePremiumRows()])
    });

    this.tlRetireProfit = this.fb.group({
      retireYieldArrayFb: this.fb.array([this.retireYieldRows()])
    })


    this.tlRetireWithdraw = this.fb.group({
      retireWithdraw_buyVolume: '',
      retireWithdraw_percentage: '',

      retireWithdraw_reward_withdraw: Number(''),
      retireWithdraw_reward_age: '',
      retireWithdraw_reward_year: '',

      retireWithdraw_pension_withdraw:  Number(''),
      retireWithdraw_pension_agefrom: '',
      retireWithdraw_pension_ageto: ['', Validators.required],
      retireWithdraw_pension_policyfrom: '',
      retireWithdraw_pension_policyto: '',
    })

    /***************
      *  99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง
    ****************/
    // Form Group การชำระเบี้ยประกัน
    this.customUlinkPayInsurance = this.fb.group({
      currentAge: [this.prospect.age, Validators.required],
      startAge: [this.prospect.age, Validators.required],
      endAge: [''],
      maxTax: [0, Validators.required],
      arrTopUp: this.fb.array([this.initTopUpCustomUlink()])
    })
    // Form Group อัตราผลตอบแทน
    this.customUlinkYield = this.fb.group({
      arrYield : this.fb.array([this.initYieldCustomUlink()])
    })
    // Form Group ถอน
    this.customUlinkWithdraw = this.fb.group({
      arrWithdraw : this.fb.array([this.initWithdrawCustomUlink()])
    })



    /** ทุนการศึกษาให้กับบุตรหลาน (formGroup) 99/99 */
    this.ulinkChildInfo2 = this.fb.group({
      child_title: '',
      child_title_des: '',
      child_fname_one: '',
      child_lname_one: '',
      child_sex: [{value: '', disabled: true}, Validators.required],
      child_age:  '',
      child_ageto: '',
    });

   /**
    * binding data to save
    */
   this.ulinkApp.ulinkChildInfo = this.ulinkChildInfo;
   this.ulinkApp.ulinkChildInfo2 = this.ulinkChildInfo2;
   this.ulinkApp.ulinkChildPremium_array = this.ulinkChildPremium_array;
   this.ulinkApp.ulinkChildPremium = this.ulinkChildPremium;
   this.ulinkApp.ulinkChildProfit = this.ulinkChildProfit;
   this.ulinkApp.ulinkChildProfit_array = this.ulinkChildProfit_array;
   this.ulinkChildProfit2 = this.ulinkChildProfit2;
   this.ulinkApp.ulinkChildWithdraw = this.ulinkChildWithdraw;
   this.ulinkApp.ulinkChildWithdraw2 = this.ulinkChildWithdraw2;
   this.ulinkApp.tlRetire       = this.tlRetire;
   this.ulinkApp.tlRetireProfit       = this.tlRetireProfit;
   this.ulinkApp.tlRetireWithdraw       = this.tlRetireWithdraw;
   this.ulinkApp.customUlinkPayInsurance = this.customUlinkPayInsurance;

   this.btSummaryData = this.ulinkApp;

    // รับค่ามาจากใบเสนอขาย investment เมื่อรีเซ็ต age
    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
      this.prospect = res;

      //onchange ค่าจาก prospect age
      this.onChangeAge(this.prospect.age);
      console.log("broadcaster this.propect "+ this.prospect);
    }))

    this.subscription.push(
    this.broadcaster.on('chooseTlPlan').subscribe(res => {
       console.log("test broad cast data showStepPage   : ", this.showStepPage);
      this.showPlan = res;
      this.showViewPage = 1;
      this.showViewPage2 = 1;
      this.showStepPage = 0;
      this.showStepBtSum = false;
      this.tlPLanMain.length = 0;

      if (this.showPlan == 1) {
        this.data = 'ทุนการศึกษาให้กับบุตรหลาน';
        this.tlPLanMain.push(this.tlPlan1);
      } else {
        this.data = 'สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต';
        this.tlPLanMain.push(this.tlPlan2);
      }

    })
    );






    /**
    * 99/99 สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต
    */
    this.lifeChanging = this.fb.group({
      exam_emPer: '',
      exam_tax : '',
      exam_num_pay: '',
      exam_inputAge: this.prospect.age,
      exam_inputAgeTo: '',
      ageStrPay0 : this.prospect.age,
      exam_ageto_pay: '',
      exam_slMode : '',
      exam_RPPPrem0 : Number(''),
      exam_RSPPrem0 : Number(''),
      topPay0 : Number(''),
      allPay0 : ''
    });

    this.lifeChangingRpp = this.fb.group({
      ageRPP0: [this.prospect.age, Validators.required],
      exam_RPPSum0: 0,
      lifeChangingRppArray: this.fb.array([this.lifeChangingRppRows()])
    });

    this.lifeChangingProfit = this.fb.group({
      profitage_0 : [{value: this.prospect.age, disabled: true}],
      profitper_0 : '',
      profitRows3 :  this.fb.array([this.initItemProfitRows3()]),
    });


 /** ทุนการศึกษาให้กับบุตรหลาน (formGroup) 99/99 อัตราผลตอบแทน*/
    this.ulinkChildProfit2 = this.fb.group({
      profitage_0: [{value: this.prospect.age, disabled: true}, Validators.required],
      profitchild_0: [{value: '', disabled: true}, Validators.required],
      profitper_0: '',
      profitRows2: this.fb.array([this.initItemProfitRows()]),
    });

/** ทุนการศึกษาให้กับบุตรหลาน (formGroup) 99/99 ถอน*/
    this.ulinkChildWithdraw2 = this.fb.group({
      sale_fund: [{value: '', disabled: true}, Validators.required],
      child_inflation: '',
      bachelorwd: Number(''),
      bachelor_agestr_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_agestp_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_polstr_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_polstp_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_agechildstr_wd: [{value: '', disabled: true}, Validators.required],
      bachelor_agechildstp_wd: [{value: '', disabled: true}, Validators.required],
      masterwd:  Number(''),
      master_agestr_wd: [{value: '', disabled: true}, Validators.required],
      master_agestp_wd: [{value: '', disabled: true}, Validators.required],
      master_polstr_wd: [{value: '', disabled: true}, Validators.required],
      master_polstp_wd: [{value: '', disabled: true}, Validators.required],
      master_agechildstr_wd: [{value: '', disabled: true}, Validators.required],
      master_agechildstp_wd: [{value: '', disabled: true}, Validators.required]
    });

    /** */

    this.childFundPayPremium = this.fb.group({
      exam_emPer: [{value: ''}, Validators.required],
      exam_tax: [{value: ''}, Validators.required],
      exam_num_pay: '',
      ageStrPay0: [{value: this.prospect.age, disabled: true}, Validators.required],
      exam_ageto_pay: '',
      exam_slMode: '',
      exam_RPPPrem0: Number(''),
      exam_RSPPrem0:  Number(''),
      topPay0:  Number(''),
      allPay0: [{value: '', disabled: true}, Validators.required],
    });

    this.childRppPremiumValue =  this.fb.group({
      ageRPP0: [{value: '', disabled: true}, Validators.required],
    });

  /**
   * start
   * 99/99 เพื่อชีวิตหลังเกษียณอายุ
  */

  this.tlRetire_ua02 = this.fb.group({
    retire_protectTopupAgeFrom : this.prospect.age,
    retire_protectTopupAgeTo : '',
    retire_ua02_tax:  ['',Validators.required],

    retire_expactPay: '',
    retire_protectAgeFrom : this.prospect.age,
    retire_protectAgeTo : [ '', Validators.required],
    retire_payType : ['',Validators.required],

    retire_rpp: ['', Validators.required],
    retire_rsp: ['', Validators.required],
    retire_ua02_topup: ['', Validators.required],
    retire_total:['', Validators.required]
  });

  this.tlRetirePremium_ua02 = this.fb.group({
    retirePremiumArray_ua02: this.fb.array([this.premiumArray_ua02()])
  })

  this.tlRetireProfit_ua02 = this.fb.group({
    retireYieldArray_ua02: this.fb.array([this.retireYieldRows_ua02()])
  })


  this.tlRetireWithdraw_ua02 = this.fb.group({
    withdraw_02_buyVolume: '',
    withdraw_02_percentage: '',

    withdraw_02_reward_withdraw: Number(''),
    withdraw_02_reward_age: '',
    withdraw_02_reward_year: '',

    withdraw_02_pension_withdraw:  Number(''),
    withdraw_02_pension_agefrom: '',
    withdraw_02_pension_ageto: ['', Validators.required],
    withdraw_02_pension_policyfrom: '',
    withdraw_02_pension_policyto: '',
  })

  /**
   * end
   * 99/99 เพื่อชีวิตหลังเกษียณอายุ
  */


    // รับค่ามาจากใบเสนอขาย investment เมื่อรีเซ็ต age
    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
      this.prospect = res;
      console.log("broadcaster this.prospect "+ this.prospect);
    }))

    this.subscription.push(
    this.broadcaster.on('chooseTlPlan').subscribe(res => {
      // console.log("test broad cast data: "+res);
      this.showPlan = res;
      this.showViewPage = 1;
      this.showViewPage2 = 1;
      this.showStepPage = 0;
      this.showStepBtSum = false;
      this.tlPLanMain.length = 0;

      if (this.showPlan == 1) {
        this.data = 'ทุนการศึกษาให้กับบุตรหลาน';
        this.tlPLanMain.push(this.tlPlan1);
      } else if (this.showPlan == 2) {
        this.data = 'สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต';
        this.tlPLanMain.push(this.tlPlan2);
      }

    })
    );

  }

  private onChangeAge(propectAge:string){
    // 99/1 : ออกแบบยูนิตลิงค์ด้วยตัวเอง
    this.customUlinkPayInsurance.controls['currentAge'].setValue(propectAge);
    this.customUlinkPayInsurance.controls['startAge'].setValue(propectAge)
    // this.customUlinkPayInsurance.value.currentAge = propectAge;
    // this.customUlinkPayInsurance.value.startAge = propectAge;
    this.ulinkChildPremium.value.Child_ageNow   = propectAge;
  }

  // End Yield





  // #### start 99/1 เพื่อชีวิตหลังเกษียณอายุ ####
  retirePremiumRows() : FormGroup {
    return this.fb.group({
      payType: ['', Validators.required],
      topupFrom: ['', Validators.required],
      topupTo: '',
      addRetireTopup: [0, Validators.required],
    });
  }


   // Start Yield
  retireYieldRows() : FormGroup {
    return this.fb.group({
      ageProfit: [''],
      percentageProfit: ['', Validators.required]
    });
  }

  // #### end 99/1 เพื่อชีวิตหลังเกษียณอายุ ####

  // #### start 99/99 เพื่อชีวิตหลังเกษียณอายุ ####

  premiumArray_ua02() : FormGroup {
    return this.fb.group({
      agePremium_ua02: ['', Validators.required],
      premium_ua02: [0, Validators.required]
    })
  }
  retireYieldRows_ua02() : FormGroup {
    return this.fb.group({
      ageProfit_ua02: [''],
      percentageProfit_ua02: ['', Validators.required]
    });
  }



  private getSum(id:string, value:string, min:string, max:string){
    console.log("id > "+id+" value >> "+value+" min> "+min+" max >"+max);

    if(id == 'retire_singlePremium'){
      if(value < min){
        console.log('value < min')
        this.alertCtrl.warning("เบี้ยประกันภัยขั้นต่ำ "+min);
      }
      if(value > max){
        console.log('value > max')
        this.alertCtrl.warning("เบี้ยประกันภัยสูงสุด "+max);
      }
    }
    if(id == 'retire_TopUpPremium'){
      if(value < min){
        console.log('value < min')
        this.alertCtrl.warning("เบี้ยเพิ่มพิเศษต้องไม่่น้อยกว่า "+min);
      }
      if(value > max){
        console.log('value > max')
        this.alertCtrl.warning("เบี้ยเพิ่มพิเศษต้องไม่เกิน "+max);
      }
    }
    if(id == 'child_fund_singlePremium'){
      if(value < min){
        this.ulinkChildPremium.controls['single_prem'].setValue(min);
        this.alertCtrl.warning("เบี้ยประกันภัยขั้นต่ำ "+min);
      }
      if(value > max){
        console.log('value > max')
        this.ulinkChildPremium.controls['single_prem'].setValue(max);
        this.alertCtrl.warning("เบี้ยประกันภัยสูงสุด "+max);
      }
    }
    if(id == 'child_fund_topPremium'){
      if(value < min){
        this.ulinkChildPremium.controls['single_prem'].setValue(min);
        this.alertCtrl.warning("เบี้ยประกันภัยขั้นต่ำ "+min);
      }
      if(value > max){
        console.log('value > max')
        this.ulinkChildPremium.controls['single_prem'].setValue(max);
        this.alertCtrl.warning("เบี้ยประกันภัยสูงสุด "+max);
      }
    }

  }


  // #### end 99/1 เพื่อชีวิตหลังเกษียณอายุ ####

  // #### start 99/99 สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต ####

  lifeChangingRppRows() : FormGroup {
    return this.fb.group({
      ageRPP: [''],
      exam_RPPSum: 0
    });
  }
  private addLifeChangingRppArray(): void {

    console.log(this.lifeChangingRppRows());
    const control = <FormArray>this.lifeChangingRpp.controls['lifeChangingRppArray'];
    let index = control.length;

      control.push(this.lifeChangingRppRows());
      this.lifeChangingRppRowIndex++;
      this.lifeChangingRppRow[ this.lifeChangingRppRowIndex] = 0; //defalut


    if (control.controls[index-1].get('profitage').value &&
        control.controls[index-1].get('profitchild').value
        && control.controls[index-1].get('profitper').value) {
        //add new formgroup
        control.push(this.initItemProfitRows());

        } else {
          this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
          // let modal = this.modalCtrl.create(WarningModalComponent, TextModal.SCREEN4_1_41);
          // modal.present();
        }

  }

  private removeLifeChangingRppArray(index: number) :void {
    console.log("removeLifeChangingRppArray : "+ index);
    const control = <FormArray>this.lifeChangingRpp.controls['lifeChangingRppArray'];
    if (control.length > 1) {
      control.removeAt(index);
    }
  }
  // #### End 99/99 สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต ####

  ngOnInit(){
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }


  ngOnDestroy(){
      this.subscription.forEach(res => {
        res.unsubscribe();
      });
    }


    /**
   * ส่งค่า step ที่ถูกเลือก
   * @param index step
   */
  private progressStep(index: number) {
    if (typeof index == 'number'){
        this.showStepPage = index;
    }
        console.log('showStepPage 1---->',this.showStepPage);

  }


    /**
   * ส่งค่า step ที่ถูกเลือกของหน้า 'ตัวอย่างผลประโยชน์' dropdown=เพื่อชีวิตหลังเกษียณอายุ
   * @param index step
   */
  private progressStep2(index: number) {
    if (typeof index == 'number')
    this.showStepPage = index;
    console.log("showStepPage = "+ this.showStepPage);
    if (this.showStepPage == 3  && (this.showViewPage == 2 || this.showViewPage == 3) ) {
      this.showStepBtSum = true;
    }
  }

  /**
   * listener ดูการเปลี่ยนแปลงของ selection
   * และเปลี่ยนหน้า TL99/1 และเปลี่ยนหน้า Benefit ของ TL 99/99
   */
  private changeDetailPage(): void {
    let choosePlan = this.data;

    this.showViewPage = 0;
    this.showViewPage2 = 0;

    if ( choosePlan == 'ทุนการศึกษาให้กับบุตรหลาน' && this.showPlan == 1) {
      this.showViewPage = 1;
      this.selectedTabIndex1 = 0;
      this.stepHTML = '<step *ngFor=" let item of stepsPlan2;let i = index"  [stepTitle]="item.title" [disabled]="item.disabled" [index]="item.id"></step>';
    } else if ( choosePlan == 'เพื่อชีวิตหลังเกษียณอายุ' && this.showPlan == 1)  {
      this.showViewPage = 2;
      this.selectedTabIndex2 = 0;
      this.stepHTML = '<step *ngFor=" let item of stepsPlanOne1;let i = index"  [stepTitle]="item.title" [disabled]="item.disabled" [index]="item.id"></step>';
    } else if ( choosePlan == 'ออกแบบยูนิตลิงค์ด้วยตัวเอง' && this.showPlan == 1) {
      this.showViewPage = 3;
      this.selectedTabIndex2 = 0;
      this.stepHTML = '<step *ngFor=" let item of stepsPlanOne1;let i = index"  [stepTitle]="item.title" [disabled]="item.disabled" [index]="item.id"></step>';
    } else  if ( choosePlan == 'สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต' && this.showPlan == 2) {
      this.showViewPage2 = 1;
      this.selectedTabIndex1 = 0;
    } else if ( choosePlan == 'ทุนการศึกษาให้กับบุตรหลาน' && this.showPlan == 2)  {
      this.showViewPage2 = 2;
      this.selectedTabIndex1 = 0;
    } else if ( choosePlan == 'เพื่อชีวิตหลังเกษียนอายุ' && this.showPlan == 2) {
      this.showViewPage2 = 3;
      this.selectedTabIndex1 = 0;
    } else if ( choosePlan == 'ค่ารักษาพยาบาล' && this.showPlan == 2) {
      this.showViewPage2 = 4;
      this.selectedTabIndex1 = 0;
    } else if ( choosePlan == 'ออกแบบยูนิตลิงค์ด้วยตัวเอง' && this.showPlan == 2) {
      this.showViewPage2 = 5;
      this.selectedTabIndex1 = 0;
    }

     /**
     * set value step to frist step every time user clicked changing the dropdown
     */
    this.showStepPage = 0;
    console.log('showStepPage 2---->',this.showStepPage);

  }



  /**
   * ส่งค่า dropdown ที่ถูกเลือกสำหรับในหมวด 'TL 99/99'
   * เพื่อแสดงข้อมูล ของแต่ละหัวข้อ step
   * @param index step
   */
  private changePageProfile(index: number) {
    if (typeof index == 'number')
        this.showStepPage = index;

        //console.log("showStepPage = "+ this.showStepPage);
        console.log('showStepPage 3---->',this.showStepPage);
  }

  private changePremium(event: any) {
    console.log('changePremium : ',event)


  }


    /**
   * แสดงบำเหน็จ
   */
  private showRider1: boolean = false;

      /**
   * แสดงบำนาญ
   */
  private showRider2: boolean = false;

       /**
   * แสดงปริญญาตรี
   */
  private showRider3: boolean = false;


       /**
   * แสดงปริญญาโท
   */
  private showRider4: boolean = false;

  /**
   * สำหรับ disabled field Payment Type เมื่อ อายุที่สามารถกรอกเหลือ ปีเดียว ในการชำระเบี้ย
   */
  private CdisabledPayType: boolean = false;

  /**
   * สำหรับ disabled ปุ่ม 'เพิ่ม Top Up' ในหน้าชำระเบี้ยประกัน 99/1
   */
  private CdisabledAdd: boolean = false;

  /**
   * แสดงบำเหน็จ และ บำนาญ , ปริญญาตรี , ปริญญาโท
   */
  private toggleRider(index: number): void {

    if (index == 1) {

      this.showRider1 = !this.showRider1;

    } else if (index == 2) {

      this.showRider2 = !this.showRider2;

    } else if (index == 3) {

      this.showRider3 = !this.showRider3;

    } else {

      this.showRider4 = !this.showRider4;


    }
  }

 /***************
      *  99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง
  ****************/

  /**
   * ออกแบบยูนิตลิงค์ด้วยตัวเอง : การชำระเบี้ยประกัน
   */
  private taxDropdown = [5, 10, 15, 20, 25, 30, 35];
  private expectedDropdown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  private inflationDropdown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private withdrawYears = [1, 2, 3, 4, 5];
  private singlePremium = {
    minAlert: "เบี้ยประกันภัย (Single Premium) ต่ำสุด "+this.decimalPipe.transform(Number(100000))+" บาท",
    maxAlert: "เบี้ยประกันภัย (Single Premium) สูงสุด "+this.decimalPipe.transform(Number(30000000))+" บาท"
  }
  private topUpPremium = {
    minAlert: "ชำระเบี้ยพิเศษ (TOP-UP Premium) ต่ำสุด "+this.decimalPipe.transform(Number(10000))+" บาท",
    maxAlert : "ชำระเบี้ยพิเศษ (TOP-UP Premium) สูงสุด "+this.decimalPipe.transform(Number(120000000))+" บาท"
  }
  private topUp = {
    minAlert: "เพิ่ม TOP-UP ต่ำสุด "+this.decimalPipe.transform(Number(10000))+" บาท",
    maxAlert : "เพิ่ม TOP-UP สูงสุด "+this.decimalPipe.transform(Number(120000000))+" บาท"
  }


  private incrementValue(type:string, val:number, index:number)
  {
    // 99/1 ออกแบบยูนิตลิงค์ด้วยตยเอง
    if(type == "singlePreminum"){
      if(val < 100000){
        setTimeout(() => {
          this.premiumUlink.singlePremium = 100000;
        }, 20);
      }
    }
    if(type == "topUpPremium"){
      if(val < 10000){
        setTimeout(() => {
          this.premiumUlink.topUpPremium = 10000;
        }, 20);
      }
    }
    if(type == "arrTopUp"){
      if(val < 10000){
        setTimeout(() => {
          this.customUlinkPayInsurance.value.arrTopUp[index].topUpCost = 10000;
        }, 20);
      }
    }

    if(type == "retire_singlePremium"){ // 99/1 > 2
      if(val < 10000){
        setTimeout(() => {
          this.tlRetire.value.retire_singlePremium = 10000;
        }, 20);
      }
    }
    if(type == "retire_TopUpPremium"){ // 99/1 > 2
      if(val < 10000){
        setTimeout(() => {
          this.tlRetire.value.retire_TopUpPremium = 10000;
        }, 20);
      }
    }
    if(type == "addRetireTopup"){ // 99/1 > 2
      if(val < 10000){
        setTimeout(() => {
          this.tlRetire.value.retirePremiumArrayFb[index].addRetireTopup = 10000;
        }, 20);
      }
    }
    if(type == "child_fund_singlePremium"){
      if(val < 10000){
        setTimeout(() => {
          this.ulinkChildPremium.value.single_prem = 10000;
        }, 20);
      }
    }
    if(type == "child_fund_topPremium"){
      if(val < 10000){
        setTimeout(() => {
          this.ulinkChildPremium.value.top_prem = 10000;
        }, 20);
      }
    }
  }

  initItemRows() : FormGroup {
    return this.fb.group({
        // list all your form controls here, which belongs to your form array
        toptypepay: [''],
        topage: 0,
        topageto: 0,
        topsum: Number(0)
    });
  }

  private addTopUpForChlid() :void {

    // control refers to your formarray
    const rows = <FormArray>this.ulinkChildPremium_array.controls['toppayRows'];
    let index :number = rows.length;
    let endAge  = Math.abs(Number(this.prospect.age) - Number(this.ulinkChildInfo.controls['child_age'].value)) + this.ulinkChildInfo.controls['child_ageto'].value;
    let leftAge ;

    if (rows.controls[index-1].get('toptypepay').value != '') {
      if (rows.controls[index-1].get('toptypepay').value == 2) {
        if (rows.controls[index-1].get('topage').value
        && rows.controls[index-1].get('topsum').value) {
        //add new formgroup
          rows.push(this.initItemRows());
          this.countIndex++;
          leftAge = Math.abs(rows.controls[index-1].get('topage').value - endAge);
          if (leftAge == 1) {
            this.dataChangeForChlid[this.countIndex] = 2;
            this.CdisabledPayType = true;

          } else {
            this.dataChangeForChlid[this.countIndex] = 0; //defalut
            this.CdisabledPayType = false;
          }

          this.topsum[this.countIndex] = 0;


        } else {
          this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
          // modal.present();
        }
      } else {
        if (rows.controls[index-1].get('topage').value
            && rows.controls[index-1].get('topageto').value
            && rows.controls[index-1].get('topsum').value) {
              rows.push(this.initItemRows());
              this.countIndex++;
              leftAge = Math.abs(rows.controls[index-1].get('topageto').value - endAge);
              if (leftAge == 1) {
                this.dataChangeForChlid[this.countIndex] = 2;
                this.CdisabledPayType = true;

              } else {
                this.dataChangeForChlid[this.countIndex] = 0; //defalut
                this.CdisabledPayType = false;
              }
              this.topsum[this.countIndex] = 0;

            } else {
              this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
              // let modal = this.modalCtrl.create(WarningModalComponent, TextModal.SCREEN4_1_41);
              // modal.present();
            }
      }
    } else {
      this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
      // let modal = this.modalCtrl.create(WarningModalComponent, TextModal.SCREEN4_1_41);
      // modal.present();
    }
  }

  private deleteTopUpForChild(index: number) :void {
    console.log("test index changed : "+ index);
    // control refers to your formarray
    const control = <FormArray>this.ulinkChildPremium_array.controls['toppayRows'];

      if (control.length > 1){

          control.removeAt(index);
          this.countIndex--;

      }
  }

  private clearTopUpForChlid() :void{

    //this.ulinkChildPremium.reset();
    const control = <FormArray>this.ulinkChildPremium_array.controls['toppayRows'];

    while (1 !== control.length){
      control.removeAt(1);
    }
    control.removeAt(0);
    control.push(this.initItemRows());
    this.dataChangeForChlid.length = 1;
    this.topsum.length = 1;
    this.dataChangeForChlid[0] = 0;
    this.topsum[0] = 0;
    this.countIndex = 0;
  }


 /***************
      *  99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง
  ****************/


  // เชค
  private topupPayType: number;



  private checkAge(type: string, val: number, formName:FormControl) {

    if(val){
    //   console.log('type ',type)
      // console.log('formName ',formName)
    //   console.log('val ',val)
      // let age = Number(val);
      // console.log('age :',age)

      if (val == 0 || val <= Number(this.prospect.age)) {
        this.alertCtrl.warning(TextModal.wn_alert_2.text);
        if (type == "protectEndAge") {
          this.customUlinkPayInsurance.controls.endAge.setValue('');
        }
        if (type == "retire_inputAgeTo") {
          setTimeout(() => {
            this.tlRetire.value.retire_inputAgeTo = '';
          }, 20);
        }
        if(type == "retire_protectTopupAgeTo"){
          setTimeout(() => {
            this.tlRetire_ua02.value.retire_protectTopupAgeTo = '';
          }, 20);
        }
      } else {
        if (type == "retire_inputAgeTo") {
          setTimeout(() => {
            this.ulinkApp.tlRetireWithdraw.controls['retireWithdraw_pension_ageto']
              .setValue(this.tlRetire.value.retire_inputAgeTo);
          }, 100);

        }
      }

    }else{
      if (type == "protectEndAge") {
        setTimeout(() => {
          this.customUlinkPayInsurance.value.endAge = '';
        }, 20);
      }
    }


  }

  private calPoicyYear (type:string, val:number){
    if(val){
      if(type == 'retireWithdraw_reward_age'){
        let sum:number = (val - Number(this.prospect.age) + 1 );
        console.log('cal sum = ',sum)
        this.tlRetireWithdraw.controls['retireWithdraw_reward_year'].setValue(sum);
      }
    }
  }

  private calPension(type:string, val:number, formName:FormControl){
    console.log('val :',val)
    console.log('formName :',formName)
    if(val){
      if(type == 'retireWithdraw_pension_agefrom'){
        if(val == 0 || val <= Number(this.prospect.age) || val >= Number(this.tlRetire.value.retire_inputAgeTo)){
          formName.setValue('');
          this.tlRetireWithdraw.controls['retireWithdraw_pension_policyfrom'].setValue('');
          this.tlRetireWithdraw.controls['retireWithdraw_pension_policyto'].setValue('');
        }else{
          // อายุที่เริ่มถอน - อายุผู้เอาประกัน  + 1
          let sum_pension_policyfrom = (val - Number(this.prospect.age)) + 1;
          this.tlRetireWithdraw.controls['retireWithdraw_pension_policyfrom']
          .setValue(sum_pension_policyfrom);
          // ถอนถึงอายุ - อายุผู้เอาประกัน + 1
          let sum_pension_policyto = (Number(this.tlRetire.value.retire_inputAgeTo) - Number(this.prospect.age)) +1;
          this.tlRetireWithdraw.controls['retireWithdraw_pension_policyto']
          .setValue(sum_pension_policyto);

        }

      }
    }


  }

  // เช็คอายุของ form array
  private checkArrayAge(type:string, controlName:string, val:number, index:number){
    // 99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง : การชำระเบี้ยประกันภัย
    if(type == 'customUlinkTopUp'){
      let form = this.customUlinkPayInsurance.get(['arrTopUp', index, controlName]) as FormControl;
      let endTopUpAge = this.customUlinkPayInsurance.get(['arrTopUp', index, 'endTopUpAge']) as FormControl;
      const spliceForm = <FormArray>this.customUlinkPayInsurance.controls.arrTopUp;
      if(controlName == 'startTopUpAge'){
        if(val){
          if(index == 0){
            if(val <= this.customUlinkPayInsurance.value.startAge){
              this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
              form.setValue('');
            }else if(val > this.customUlinkPayInsurance.value.endAge){
              this.alertCtrl.warning(TextModal.wn_alert_2.text);
              form.setValue('');
            }else if(val == this.customUlinkPayInsurance.value.endAge){
              this.btnAddArrTopUp = true;
            }else if(val != this.customUlinkPayInsurance.value.endAge){
              this.btnAddArrTopUp = false;
            }
            endTopUpAge.setValue('');
            setTimeout(() => {
              this.customUlinkPayInsurance.value.arrTopUp[index].endTopUpAge = '';
            }, 20);
            spliceForm.controls.splice(index+1);
          }else{
            if(val && this.customUlinkPayInsurance.value.arrTopUp[index-1].paymentType == 1 || this.customUlinkPayInsurance.value.arrTopUp[index-1].paymentType == ''){
              if(val <= this.customUlinkPayInsurance.value.arrTopUp[index-1].endTopUpAge){
                this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
                form.setValue('');
              }else if(val > this.customUlinkPayInsurance.value.endAge){
                this.alertCtrl.warning(TextModal.wn_alert_2.text);
                form.setValue('');
              }else if(val == this.customUlinkPayInsurance.value.endAge){
                this.btnAddArrTopUp = true;
              }else if(val != this.customUlinkPayInsurance.value.endAge){
                this.btnAddArrTopUp = false;
              }
            }else if(val && this.customUlinkPayInsurance.value.arrTopUp[index-1].paymentType == 2){
              if(val <= this.customUlinkPayInsurance.value.arrTopUp[index-1].startTopUpAge){
                this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
                form.setValue('');
              }else if(val > this.customUlinkPayInsurance.value.endAge){
                this.alertCtrl.warning(TextModal.wn_alert_2.text);
                form.setValue('');
              }else if(val == this.customUlinkPayInsurance.value.endAge){
                this.btnAddArrTopUp = true;
              }else if(val != this.customUlinkPayInsurance.value.endAge){
                this.btnAddArrTopUp = false;
              }
            }
            endTopUpAge.setValue('');
            setTimeout(() => {
              this.customUlinkPayInsurance.value.arrTopUp[index].endTopUpAge = '';
            }, 20);
            spliceForm.controls.splice(index+1);
          }
        }else{
          setTimeout(() => {
            this.customUlinkPayInsurance.value.arrTopUp[index].startTopUpAge = '';
          }, 20);
          spliceForm.controls.splice(index+1);
        }
      }else if(controlName == 'endTopUpAge'){
        if(val){
          if(val <= this.customUlinkPayInsurance.value.arrTopUp[index].startTopUpAge){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            form.setValue('');
          }else if(val > this.customUlinkPayInsurance.value.endAge){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            form.setValue('');
          }else if(val == this.customUlinkPayInsurance.value.endAge){
            this.btnAddArrTopUp = true;
          }else if(val != this.customUlinkPayInsurance.value.endAge){
            this.btnAddArrTopUp = false;
          }
          spliceForm.controls.splice(index+1);
        }else{
          setTimeout(() => {
            this.customUlinkPayInsurance.value.arrTopUp[index].endTopUpAge = '';
          }, 20);
          spliceForm.controls.splice(index+1);
        }
      }
    }

    // 99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง : อัตราผลตอบแทน
    if(type == 'customUlinkYield'){
      let form = this.customUlinkYield.get(['arrYield', index, controlName]) as FormControl;
      const spliceForm = <FormArray>this.customUlinkYield.controls.arrYield;
      if(val){
        if(val < this.customUlinkPayInsurance.value.startAge){
          this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
          form.setValue('');
        }else if(val > this.customUlinkPayInsurance.value.endAge){
          this.alertCtrl.warning(TextModal.wn_alert_2.text);
          form.setValue('');
        }else if(val == this.customUlinkPayInsurance.value.endAge){
          this.btnAddArrYield = true;
        }else if(val != this.customUlinkPayInsurance.value.endAge){
          this.btnAddArrYield = false;
        }
        spliceForm.controls.splice(index+1);
      }else{
        setTimeout(() => {
          this.customUlinkYield.value.arrYield[index].startYieldAge = '';
        }, 20);
        spliceForm.controls.splice(index+1);
      }
    }

    // 99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง : เพื่อชีวิตหลังเกษียณอายุ
    if(type == 'tlRetire'){

      let form = this.tlRetire.get(['retirePremiumArrayFb', index, controlName]) as FormControl;
      let endAge = this.tlRetire.value.retire_inputAgeTo;
      let topupTo = this.tlRetire.get(['retirePremiumArrayFb', index, 'topupTo']) as FormControl;
      const spliceForm = <FormArray>this.tlRetire.controls.retirePremiumArrayFb;

      if(controlName == 'topupFrom'){
        if(val){
          if(index == 0){
            if(val <= this.tlRetire.value.retire_inputAgeFrom){
              this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
              form.setValue('');
            }else if(val > endAge){
              this.alertCtrl.warning(TextModal.wn_alert_2.text);
              form.setValue('');
            }else if(val == endAge){
              this.tlRetireBtnAddArrTopUp = true;
            }else if(val != endAge){
              this.tlRetireBtnAddArrTopUp = false;
            }
            topupTo.setValue('');
            setTimeout(() => {
              this.tlRetire.value.retirePremiumArrayFb[index].topupTo = '';
            }, 20);
            spliceForm.controls.splice(index+1);
          }else{
            if(val && this.tlRetire.value.retirePremiumArrayFb[index-1].payType == 1 || this.tlRetire.value.retirePremiumArrayFb[index-1].payType == ''){
              if(val <= this.tlRetire.value.retirePremiumArrayFb[index-1].topupTo){
                this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
                form.setValue('');
              }else if(val > endAge){
                this.alertCtrl.warning(TextModal.wn_alert_2.text);
                form.setValue('');
              }else if(val == endAge){
                this.tlRetireBtnAddArrTopUp = true;
              }else if(val != endAge){
                this.tlRetireBtnAddArrTopUp = false;
              }
            }else if(val && this.tlRetire.value.retirePremiumArrayFb[index-1].payType == 2){
              if(val <= this.tlRetire.value.retirePremiumArrayFb[index-1].topupFrom){
                this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
                form.setValue('');
              }else if(val > endAge){
                this.alertCtrl.warning(TextModal.wn_alert_2.text);
                form.setValue('');
              }else if(val == endAge){
                this.tlRetireBtnAddArrTopUp = true;
              }else if(val != endAge){
                this.tlRetireBtnAddArrTopUp = false;
              }
            }
            topupTo.setValue('');
            setTimeout(() => {
              this.tlRetire.value.retirePremiumArrayFb[index].topupTo = '';
            }, 20);
            spliceForm.controls.splice(index+1);
          }
        }else{
          setTimeout(() => {
            this.tlRetire.value.retirePremiumArrayFb[index].topupFrom = '';
          }, 20);
          spliceForm.controls.splice(index+1);
        }
      }else if(controlName == 'topupTo'){
        if(val){
          if(val <= this.tlRetire.value.retirePremiumArrayFb[index].topupFrom){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            form.setValue('');
          }else if(val > endAge){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            form.setValue('');
          }else if(val == endAge){
            this.tlRetireBtnAddArrTopUp = true;
          }else if(val != endAge){
            this.tlRetireBtnAddArrTopUp = false;
          }
          spliceForm.controls.splice(index+1);
        }else{
          setTimeout(() => {
            this.tlRetire.value.retirePremiumArrayFb[index].topupTo = '';
          }, 20);
          spliceForm.controls.splice(index+1);
        }
      }
    }
    // 
    if(type == 'tlRetireProfit'){
      let form = this.tlRetireProfit.get(['retireYieldArrayFb', index, controlName]) as FormControl;
      const spliceForm = <FormArray>this.tlRetireProfit.controls.retireYieldArrayFb;
      if(val){
        if(index == 0){
          if(val < this.tlRetire.value.retire_inputAgeFrom){
            this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
            form.setValue('');
          }else if(val > this.tlRetire.value.retire_inputAgeTo){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            form.setValue('');
          }else if(val == this.tlRetire.value.retire_inputAgeTo){
            this.tlRetireBtnAddArrYield = true;
          }else if(val != this.tlRetire.value.retire_inputAgeTo){
            this.tlRetireBtnAddArrYield = false;
          }
          spliceForm.controls.splice(index+1);
        }else{
          if(val < this.tlRetire.value.retire_inputAgeFrom){
            this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
            form.setValue('');
          }else if(val <= this.tlRetireProfit.value.retireYieldArrayFb[index-1].ageProfit){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            form.setValue('');
          }else if(val > this.tlRetire.value.retire_inputAgeTo){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            form.setValue('');
          }else if(val == this.tlRetire.value.retire_inputAgeTo){
            this.tlRetireBtnAddArrYield = true;
          }else if(val != this.tlRetire.value.retire_inputAgeTo){
            this.tlRetireBtnAddArrYield = false;
          }
          spliceForm.controls.splice(index+1);
        }
      }else{
        setTimeout(() => {
          this.tlRetireProfit.value.retireYieldArrayFb[index].ageProfit = '';
        }, 20);
        spliceForm.controls.splice(index+1);
      }
    }// END 99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง : เพื่อชีวิตหลังเกษียณอายุ

    if (type == 'ulinkProfit') {

      const rows = this.ulinkChildPremium_array.get(['toppayRows', index, controlName]) as FormControl
      let startAge = Number(this.prospect.age);
      let endAge  = Math.abs(Number(this.prospect.age) - Number(this.ulinkChildInfo.controls['child_age'].value)) + this.ulinkChildInfo.controls['child_ageto'].value ;
      const spliceForm = <FormArray>this.ulinkChildPremium_array.controls.toppayRows;
      if(controlName == 'topage'){
        if(val){
          if(index == 0){
            if(val <= startAge){
              this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
              rows.setValue('');
            }else if(val > endAge){
              this.alertCtrl.warning(TextModal.wn_alert_3.text);
              rows.setValue('');
            }
            else  if (val == endAge) {
              this.CdisabledAdd = true;
            } else if (val !== endAge) {
              this.CdisabledAdd = false;
            }
            spliceForm.controls.splice(index+1);
          }else{
            if(val && this.ulinkChildPremium_array.value.toppayRows[index-1].toptypepay == 1 || this.ulinkChildPremium_array.value.toppayRows[index-1].toptypepay == ''){
              if(val <= this.ulinkChildPremium_array.value.toppayRows[index-1].topageto){
                this.alertCtrl.warning("กรุณาระบุอายุมากกว่าปัจจุบัน");
                rows.setValue('');
              }else if(val > endAge){
                this.alertCtrl.warning(TextModal.wn_alert_2.text);
                rows.setValue('');
              }
              else if (val == endAge) {
                this.CdisabledAdd = true;
              } else if (val !== endAge) {
                this.CdisabledAdd = false;
              }
            }else if(val && this.ulinkChildPremium_array.value.toppayRows[index-1].toptypepay == 2){
              if(val <= this.ulinkChildPremium_array.value.toppayRows[index-1].topage){
                this.alertCtrl.warning(TextModal.wn_alert_2.text);
                rows.setValue('');
              }else if(val > endAge){
                this.alertCtrl.warning(TextModal.wn_alert_2.text);
                rows.setValue('');
              }
              else  if (val == endAge) {
                this.CdisabledAdd = true;
              } else if (val !== endAge) {
                this.CdisabledAdd = false;
              }
            }
            spliceForm.controls.splice(index+1);
          }
        }else{
          setTimeout(() => {
            this.ulinkChildPremium_array.value.toppayRows[index].topage = '';
          }, 20);
        }
      }else if(controlName == 'topageto'){
        if(val){
          if(val <= this.ulinkChildPremium_array.value.toppayRows[index].topage){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            rows.setValue('');
          }else if(val > endAge){
            this.alertCtrl.warning(TextModal.wn_alert_2.text);
            rows.setValue('');
          }
          else  if (val == endAge) {
            this.CdisabledAdd = true;
          } else if (val !== endAge) {
            this.CdisabledAdd = false;
          }
          spliceForm.controls.splice(index+1);
        }else{
          setTimeout(() => {
            this.ulinkChildPremium_array.value.toppayRows[index].topageto = '';
          }, 20);
        }
      }
    }
  }

  //เช็ค form array select payment type
  private checkArrayPaymentType(type:string, val:any, index:number){
    // 99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง
    if(type == 'arrTopUp'){
      const form = <FormArray>this.customUlinkPayInsurance.controls.arrTopUp;
      let startTopUpAge = this.customUlinkPayInsurance.get(['arrTopUp', index, 'startTopUpAge']) as FormControl;
      let endTopUpAge = this.customUlinkPayInsurance.get(['arrTopUp', index, 'endTopUpAge']) as FormControl;
      startTopUpAge.setValue('');
      endTopUpAge.setValue('');
      setTimeout(() => {
        this.customUlinkPayInsurance.value.arrTopUp[index].startTopUpAge = '';
        this.customUlinkPayInsurance.value.arrTopUp[index].endTopUpAge = '';
        this.customUlinkPayInsurance.value.arrTopUp[index].topUpCost = 0;
      }, 20);
    }
    if(type == 'retirePremiumArrayFb'){
      const form = <FormArray>this.tlRetire.controls.retirePremiumArrayFb;
      let startTopUpAge = this.tlRetire.get(['retirePremiumArrayFb', index, 'topupFrom']) as FormControl;
      let endTopUpAge = this.tlRetire.get(['retirePremiumArrayFb', index, 'topupTo']) as FormControl;
      startTopUpAge.setValue('');
      endTopUpAge.setValue('');
      setTimeout(() => {
        this.tlRetire.value.retirePremiumArrayFb[index].topupFrom = '';
        this.tlRetire.value.retirePremiumArrayFb[index].topupTo = '';
        this.tlRetire.value.retirePremiumArrayFb[index].addRetireTopup = 0;
      }, 20);
    }




  }

  // 99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง : การชำระเบี้ยประกัน
  private initTopUpCustomUlink(): FormGroup{
     return this.fb.group({
        paymentType: ['', Validators.required],
        startTopUpAge: [''],
        endTopUpAge: [''],
        topUpCost: [0, Validators.required]
     });
  }

  //ออกแบบยูนิตลิงค์ด้วยตัวเอง : อัตราผลตอบแทน
  private initYieldCustomUlink() : FormGroup
  {
     return this.fb.group({
      startYieldAge: [''],
      expectedYield: ['', Validators.required]
     });
  }

  private addFormArray(type:string): void {
    // 99/1 form array ออกแบบยูนิตลิงค์ด้วยตัวเอง การชำระเบี้ย
    if(type == 'arrTopUp'){
    const form = <FormArray>this.customUlinkPayInsurance.controls.arrTopUp;
    let index = form.length - 1;
    // index value
    let paymentType = this.customUlinkPayInsurance.value.arrTopUp[index].paymentType;
    let startTopUpAge = this.customUlinkPayInsurance.value.arrTopUp[index].startTopUpAge;
    let endTopUpAge = this.customUlinkPayInsurance.value.arrTopUp[index].endTopUpAge;
    let topUpCost = this.customUlinkPayInsurance.value.arrTopUp[index].topUpCost;
    if(form.valid && paymentType == 1 && startTopUpAge != '' && endTopUpAge != '' && topUpCost > 0){
      let calAge = Number(this.customUlinkPayInsurance.value.endAge) - Number(endTopUpAge);
      form.push(this.initTopUpCustomUlink());
      let dpPymentType = this.customUlinkPayInsurance.get(['arrTopUp', index+1, 'paymentType']) as FormControl;
      if(calAge == 1){
        dpPymentType.setValue('2');
        this.disablePaymentType[index+1] = true;
      }else{
        this.disablePaymentType[index+1] = false;
      }
    }else if(form.valid && paymentType == 2 && startTopUpAge != '' && topUpCost > 0){
      let calAge = Number(this.customUlinkPayInsurance.value.endAge) - Number(startTopUpAge);
      form.push(this.initTopUpCustomUlink());
      let dpPymentType = this.customUlinkPayInsurance.get(['arrTopUp', index+1, 'paymentType']) as FormControl;
      if(calAge == 1){
        dpPymentType.setValue('2');
        this.disablePaymentType[index+1] = true;
      }else{
        this.disablePaymentType[index+1] = false;
      }
    }else{
      this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
    }
    console.log("arrTopUp-->",form.value);
    }
    //อัตราผลตอบแทน
    if(type == 'arrYield'){
    const form = <FormArray>this.customUlinkYield.controls.arrYield;
    let index = form.length - 1;
    let begin = this.customUlinkYield.get(['arrYield', 0, 'startYieldAge']) as FormControl;
    let startYieldAge = this.customUlinkYield.value.arrYield[index].startYieldAge;
    if(form.length == 1 && form.valid){
      begin.setValue(this.prospect.age);
      form.push(this.initYieldCustomUlink());
    }else{
      if(form.valid && startYieldAge != ''){
        form.push(this.initYieldCustomUlink());
      }else{
        this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
      }
    }
    console.log("arrYield-->",form.value);
    }

    // 99/1 ชีวิตเพื่อหลังเกษียณ
    if (type == 'retirePremiumArrayFb') {
      const form = <FormArray>this.tlRetire.controls.retirePremiumArrayFb;
      let index = form.length - 1;
      // index value
      let paymentType = this.tlRetire.value.retirePremiumArrayFb[index].payType;
      let startTopUpAge = this.tlRetire.value.retirePremiumArrayFb[index].topupFrom;
      let endTopUpAge = this.tlRetire.value.retirePremiumArrayFb[index].topupto;
      let topUpCost = this.tlRetire.value.retirePremiumArrayFb[index].addRetireTopup;
      if (form.valid && paymentType == 1 && startTopUpAge != '' && endTopUpAge != '' && topUpCost > 0) {
        let calAge = Number(this.tlRetire.value.retire_inputAgeTo) - Number(endTopUpAge);
        form.push(this.retirePremiumRows());
        let dpPymentType = this.tlRetire.get(['retirePremiumArrayFb', index + 1, 'payType']) as FormControl;
        if (calAge == 1) {
          dpPymentType.setValue('2');
          this.disablePaymentType[index + 1] = true;
        } else {
          this.disablePaymentType[index + 1] = false;
        }
      } else if (form.valid && paymentType == 2 && startTopUpAge != '' && topUpCost > 0) {
        let calAge = Number(this.tlRetire.value.endAge) - Number(startTopUpAge);
        form.push(this.retirePremiumRows());
        let dpPymentType = this.tlRetire.get(['retirePremiumArrayFb', index + 1, 'payType']) as FormControl;
        if (calAge == 1) {
          dpPymentType.setValue('2');
          this.disablePaymentType[index + 1] = true;
        } else {
          this.disablePaymentType[index + 1] = false;
        }
      } else {
        this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
      }
      console.log("retirePremiumArrayFb-->", form.value);
    }
    if(type == 'retireYieldArrayFb'){
      const form = <FormArray>this.tlRetireProfit.controls.retireYieldArrayFb;
      let index = form.length - 1;
      let begin = this.tlRetireProfit.get(['retireYieldArrayFb', 0, 'ageProfit']) as FormControl;
      let startYieldAge = this.tlRetireProfit.value.retireYieldArrayFb[index].ageProfit;
      if(form.length == 1 && form.valid){
        begin.setValue(this.prospect.age);
        form.push(this.retireYieldRows());
      }else{
        if(form.valid && startYieldAge != ''){
          form.push(this.retireYieldRows());
        }else{
          this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
        }
      }
      console.log("retireYieldArrayFb-->",form.value);
    } 
    // 99/1 ชีวิตเพื่อหลังเกษียณ
    if(type == 'retirePremiumArray_ua02'){
      const form = <FormArray>this.tlRetirePremium_ua02.controls.retirePremiumArray_ua02;
      let index = form.length - 1;
      let begin = this.tlRetirePremium_ua02.get(['retirePremiumArray_ua02', 0, 'agePremium_ua02']) as FormControl;
      let agePremium_ua02 = this.tlRetirePremium_ua02.value.retirePremiumArray_ua02[index].agePremium_ua02;
      let premium_ua02 = this.tlRetirePremium_ua02.value.retirePremiumArray_ua02[index].premium_ua02;
      console.log('form.length ',form.length)
      if(form.length == 1 && form.valid){
        begin.setValue(this.prospect.age);
        form.push(this.premiumArray_ua02());
      }else{
        console.log('agePremium_ua02 : ',agePremium_ua02)
        if(form.valid && agePremium_ua02 != ''){
          form.push(this.premiumArray_ua02());
        }else{
          this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
        }
      }
      console.log("retirePremiumArray_ua02-->",form.value);
    }


  }

  private removeFormArray(type:string, i:number) : void {
    // 99/1 เพื่อชีวิตหลังเกษียณ
    if(type == 'retirePremiumArrayFb'){
      const form = <FormArray>this.tlRetire.controls.retirePremiumArrayFb;
      form.removeAt(i);
    }
    if(type == 'retireYieldArrayFb'){
      const form = <FormArray>this.tlRetireProfit.controls.retireYieldArrayFb;
      form.removeAt(i);
    }
    // 99/1 form array ออกแบบยูนิตลิงค์ด้วยตัวเอง การชำระเบี้ย
    if(type == 'arrTopUp'){
      const form = <FormArray>this.customUlinkPayInsurance.controls.arrTopUp;
      form.removeAt(i);
    }
    //อัตราผลตอบแทน
    if(type == 'arrYield'){
      const control = <FormArray>this.customUlinkYield.controls.arrYield;
      control.removeAt(i);
    }
  }

  private resetForm(type:string){
    if(type == 'arrTopUp'){
      const form = <FormArray>this.customUlinkPayInsurance.controls.arrTopUp;
      this.customUlinkPayInsurance.controls.endAge.setValue('');
      this.customUlinkPayInsurance.controls.maxTax.setValue('');
      const paymentType = this.customUlinkPayInsurance.get(['arrTopUp', 0, 'paymentType']) as FormControl;
      const startTopUpAge = this.customUlinkPayInsurance.get(['arrTopUp', 0, 'startTopUpAge']) as FormControl;
      const endTopUpAge = this.customUlinkPayInsurance.get(['arrTopUp', 0, 'endTopUpAge']) as FormControl;
      paymentType.setValue('');
      startTopUpAge.setValue('');
      endTopUpAge.setValue('');
      form.controls.splice(1);
      setTimeout(() => {
        this.premiumUlink.singlePremium = 0;
        this.premiumUlink.topUpPremium = 0;
        this.customUlinkPayInsurance.value.arrTopUp[0].startTopUpAge = '';
        this.customUlinkPayInsurance.value.arrTopUp[0].endTopUpAge = '';
      }, 20);
    }
  }

  /**
   * ออกแบบยูนิตลิงค์ด้วยตัวเอง : ถอน
   */
  private initWithdrawCustomUlink() : FormGroup
  {
     return this.fb.group({
     });
  }

  private addWithdrawCustomUlink() : void
  {
     const control = <FormArray>this.customUlinkWithdraw.controls.arrWithdraw;
     control.push(this.initWithdrawCustomUlink());
  }

  private removeWithdrawCustomUlink(i : number) : void
  {
     const control = <FormArray>this.customUlinkWithdraw.controls.arrWithdraw;
     control.removeAt(i);
  }

  private submitCustomUlinkWithdraw(val : any) : void
  {
     console.log(val);
  }

  private resetCustomUlinkWithdraw()
  {
    this.customUlinkWithdraw.reset();
  }


  // เชค
  private initTopupPayType(): void{

  }

  private addProfitForChildFund(planType: string) : void {

    if (planType == 'UA01') {
    // control refers to your formarray
    // control refers to your formarray
    const rows = <FormArray>this.ulinkChildProfit_array.controls['profitRows'];
    let index :number = rows.length;
    // add new formgroup
      if (rows.controls[index-1].get('profitage').value &&
        rows.controls[index-1].get('profitchild').value
        && rows.controls[index-1].get('profitper').value) {
        //add new formgroup
        rows.push(this.initItemProfitRows());

        } else {
          this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
          // let modal = this.modalCtrl.create(WarningModalComponent, TextModal.SCREEN4_1_41);
          // modal.present();
        }
    } else if (planType == 'UA02') {
    // control refers to your formarray
    const rows = <FormArray>this.ulinkChildProfit2.controls['profitRows2'];
    let index :number = rows.length;
    // add new formgroup
      if (rows.controls[index-1].get('profitage').value &&
        rows.controls[index-1].get('profitchild').value
        && rows.controls[index-1].get('profitper').value) {
        //add new formgroup
        rows.push(this.initItemProfitRows());
        this.valueChangeProfitChild.push(1);
        } else {
          this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
          // let modal = this.modalCtrl.create(WarningModalComponent, TextModal.SCREEN4_1_41);
          // modal.present();
        }
    } else if (planType == 'UA02_lifeChange') {
      // control refers to your formarray
      const rows = <FormArray>this.lifeChangingProfit.controls['profitRows3'];
      let index :number = rows.length;
      // add new formgroup
        if (rows.controls[index-1].get('profitage').value
          && rows.controls[index-1].get('profitper').value) {
          //add new formgroup
          rows.push(this.initItemProfitRows3());
          this.valueChangeProfitChild.push(1);
          } else {
            this.alertCtrl.warning(TextModal.SCREEN4_1_41.text);
            // let modal = this.modalCtrl.create(WarningModalComponent, TextModal.SCREEN4_1_41);
            // modal.present();
          }
      }
 }

 private clearProfitForChildFund(planType: string) :void {

  console.log("planType ",planType);

    if (planType == 'UA01'){
      const control = <FormArray>this.ulinkChildProfit_array.controls['profitRows'];

      while (1 !== control.length){
        control.removeAt(1);
      }
      control.removeAt(0);
      this.profitage.length = 1;
      this.profitchild.length = 1;
      this.profitage[0] = Number('');
      this.profitchild[0]= Number('');
      control.push(this.initItemProfitRows());
    } else if (planType == 'UA02') {
      const control = <FormArray>this.ulinkChildProfit2.controls['profitRows2'];

      this.ulinkChildProfit2.controls['profitage_0'].setValue('');
      this.ulinkChildProfit2.controls['profitchild_0'].setValue('');
      this.ulinkChildProfit2.controls['profitper_0'].setValue('');

      while (1 !== control.length){
      control.removeAt(1);
      }
      control.removeAt(0);
      control.push(this.initItemProfitRows());
    } else if (planType == 'UA02_lifeChange') {
      const control = <FormArray>this.lifeChangingProfit.controls['profitRows3'];

      this.lifeChangingProfit.controls['profitage_0'].setValue('');
      this.lifeChangingProfit.controls['profitper_0'].setValue('');

      while (1 !== control.length){
      control.removeAt(1);
      }
      control.removeAt(0);
      control.push(this.initItemProfitRows3());
    }
 }

 private deleteProfitForChildFund(planType ,index: number) :void {
   // control refers to your formarray
   let control;
   if (planType == 'UA01') {
    control = <FormArray>this.ulinkChildProfit.controls['profitRows'];
   } else if (planType == 'UA02') {
    control = <FormArray>this.ulinkChildProfit2.controls['profitRows2'];
   } else if (planType == 'UA02_lifeChange') {
    control = <FormArray>this.lifeChangingProfit.controls['profitRows3'];
   }

        // remove the chosen row
         control.removeAt(index);

 }

 initItemProfitRows() : FormGroup {
   return this.fb.group({
       // list all your form controls here, which belongs to your form array
       profitage: ['', Validators.required],
       profitchild: [''],
       profitper: ['']
   });
 }

 initItemProfitRows3() : FormGroup {
  return this.fb.group({
      // list all your form controls here, which belongs to your form array
      profitage: ['', Validators.required],
      profitper: ['']
  });
}


 preNameSelected(type: string,preName: string) {

  switch(type) {
    case 'ulinkChildInfo':
    this.ulinkChildInfo.value.child_title = preName;
  if(this.ulinkChildInfo.value.child_title == 'นาย' || this.ulinkChildInfo.value.child_title == 'เด็กชาย'){
    this.ulinkChildInfo.value.child_sex = 'M';

  } else if(this.ulinkChildInfo.value.child_title == 'นาง' || this.ulinkChildInfo.value.child_title == 'นางสาว' || this.ulinkChildInfo.value.child_title == 'เด็กหญิง') {
    this.ulinkChildInfo.value.child_sex = 'F';
  } else if (this.ulinkChildInfo.value.child_title == 'อื่นๆ') {
    this.ulinkChildInfo.value.child_sex = 'O';
  }

  var  sex = '';
  if (this.ulinkChildInfo.value.child_sex == 'O') {
    this.ulinkChildInfo.controls['child_sex'].enable();
  } else {
    sex = (this.ulinkChildInfo.value.child_sex == 'M') ? 'ชาย' : 'หญิง';
    this.ulinkChildInfo.controls['child_sex'].disable();
    this.ulinkChildInfo.controls['child_sex'].setValue(sex);
  }
    break;


  case 'ulinkChildInfo2':

    this.ulinkChildInfo2.value.child_title = preName;
    if(this.ulinkChildInfo2.value.child_title == 'นาย' || this.ulinkChildInfo2.value.child_title == 'เด็กชาย'){
      this.ulinkChildInfo2.value.child_sex = 'M';

    } else if(this.ulinkChildInfo2.value.child_title == 'นาง' || this.ulinkChildInfo2.value.child_title == 'นางสาว' || this.ulinkChildInfo2.value.child_title == 'เด็กหญิง') {
      this.ulinkChildInfo2.value.child_sex = 'F';
    } else if (this.ulinkChildInfo2.value.child_title == 'อื่นๆ') {
      this.ulinkChildInfo2.value.child_sex = 'O';
    }

    if (this.ulinkChildInfo2.value.child_sex == 'O') {
      this.ulinkChildInfo2.controls['child_sex'].enable();
    } else {
      sex = (this.ulinkChildInfo2.value.child_sex == 'M') ? 'ชาย' : 'หญิง';
      this.ulinkChildInfo2.controls['child_sex'].disable();
      this.ulinkChildInfo2.controls['child_sex'].setValue(sex);
  }
  break;
  }

}

public setValue_child(data, scope){

  if (scope == 'child_age') {
    this.child_age = data
    this.propect_age = (this.propect_age ==  '' || this.propect_age == null )? this.prospect.age:this.propect_age;

    this.ulinkChildProfit.controls['profitchild_0'].setValue(this.child_age)
  } else if (scope == 'child_ageto') {
    this.child_ageto = data;
  } else if (scope == 'child_age_99') {
    this.child_age = data
    this.propect_age = (this.propect_age ==  '' || this.propect_age == null )? this.prospect.age:this.propect_age;

  } else if (scope == 'child_ageto_99') {
    this.child_ageto = data;

    if (this.child_age != 0 && this.propect_age != 0){
      this.ulinkChildProfit2.controls['profitage_0'].setValue(this.propect_age)
      this.ulinkChildProfit2.controls['profitchild_0'].setValue(this.child_age)
    }
  }

    let check_show_major = ( this.child_age < 18 && this.child_ageto) > 21   ? true: false;
    let check_show_master = ( this.child_age < 22 && this.child_ageto) > 23  ? true: false;

    if (check_show_major) {
      this.showMajor = true;
    } else {
      this.showMajor = false;
    }

    if (check_show_master) {
      this.showMaster = true;
    } else {
      this.showMaster = false;
    }


}

private flag_success = false;

setDataDefault() {
  this.flag_success = false;
}

private checkScopeValue(valueName: string, planType: string, value: number, formName: FormControl) {
  let sum;
  let result;
  //console.log("test1 : ", this.childFundPayPremium.controls['exam_RPPPrem0'].value, this.childFundPayPremium.controls['exam_RSPPrem0'].value, this.childFundPayPremium.controls['topPay0'].value);
debugger;
    if(!value){
      return;
    }
    if (valueName == "bachelorwd"){

    if ( value < 10000 && value !=0) {

        this.alertCtrl.warning("ถอนขั้นต่ำ 10,000 บาท และต้องมีเงินเหลือในบัญชีไม่ต่ำกว่า 20,000 บาท");
        value = 10000;

    }

    if (typeof planType != 'undefined' && value && valueName) {

    if (planType == 'UA01') {
        //ปีกรมธรรม์ที่เริ่ม
        let cal_polstr: number = Math.abs((18 - Number(this.ulinkChildInfo.get('child_age').value))) + 1;

        //ถึงปีกรมธรรม์ที่
        let cal_polstr_to : number = (cal_polstr + 4 ) - 1;

        //อายุที่เริ่มถอน
        let cal_agestr : number = ( Number(this.prospect.age + cal_polstr) ) - 1;

          //ถอนถึงอายุ
        let cal_agestrto : number = ( Number(cal_agestr + 4) ) - 1;

        if (!this.flag_success) {
        this.flag_success = true;
        this.ulinkChildWithdraw.setValue({
          sale_fund: this.ulinkChildWithdraw.get('sale_fund').value,
          child_inflation:  this.ulinkChildWithdraw.get('child_inflation').value,
          bachelorwd: this.decimalPipe.transform(Number(value)),
          bachelor_agestr_wd: cal_agestr,
          bachelor_agestp_wd: cal_agestrto,
          bachelor_polstr_wd: cal_polstr,
          bachelor_polstp_wd: cal_polstr_to,
          bachelor_agechildstr_wd: Number(18),
          bachelor_agechildstp_wd: Number(21),
          masterwd: this.ulinkChildWithdraw.get('masterwd').value,
          master_agestr_wd: this.ulinkChildWithdraw.get('master_agestr_wd').value,
          master_agestp_wd: this.ulinkChildWithdraw.get('master_agestp_wd').value,
          master_polstr_wd: this.ulinkChildWithdraw.get('master_polstr_wd').value,
          master_polstp_wd: this.ulinkChildWithdraw.get('master_polstp_wd').value,
          master_agechildstr_wd: this.ulinkChildWithdraw.get('master_agechildstr_wd').value,
          master_agechildstp_wd: this.ulinkChildWithdraw.get('master_agechildstp_wd').value
        });
      }

      } else if (planType == 'UA02') {
         //ปีกรมธรรม์ที่เริ่ม
      let cal_polstr2: number = Math.abs((18 - Number(this.ulinkChildInfo2.get('child_age').value))) + 1;

      //ถึงปีกรมธรรม์ที่
      let cal_polstr_to2: number = (cal_polstr2 + 4 ) - 1;

        //อายุที่เริ่มถอน
      let cal_agestr2: number = ( Number(this.prospect.age + cal_polstr2) ) - 1;

       //ถอนถึงอายุ
      let cal_agestrto2: number = ( Number(cal_agestr2 + 4) ) - 1;


      if (!this.flag_success) {
        this.flag_success = true;
        this.ulinkChildWithdraw2.setValue({
          sale_fund: this.ulinkChildWithdraw2.get('sale_fund').value,
          child_inflation:  this.ulinkChildWithdraw2.get('child_inflation').value,
          bachelorwd: this.decimalPipe.transform(Number(value)),
          bachelor_agestr_wd: cal_agestr2,
          bachelor_agestp_wd: cal_agestrto2,
          bachelor_polstr_wd: cal_polstr2,
          bachelor_polstp_wd: cal_polstr_to2,
          bachelor_agechildstr_wd: Number(18),
          bachelor_agechildstp_wd: Number(21),
          masterwd: this.ulinkChildWithdraw.get('masterwd').value,
          master_agestr_wd: this.ulinkChildWithdraw2.get('master_agestr_wd').value,
          master_agestp_wd: this.ulinkChildWithdraw2.get('master_agestp_wd').value,
          master_polstr_wd: this.ulinkChildWithdraw2.get('master_polstr_wd').value,
          master_polstp_wd: this.ulinkChildWithdraw2.get('master_polstp_wd').value,
          master_agechildstr_wd: this.ulinkChildWithdraw2.get('master_agechildstr_wd').value,
          master_agechildstp_wd: this.ulinkChildWithdraw2.get('master_agechildstp_wd').value
        });
      }

      }
    }
  } else if (valueName == "masterwd" ){


    if ( value < 10000 && value != 0) {

      this.alertCtrl.warning("ถอนขั้นต่ำ 10,000 บาท และต้องมีเงินเหลือในบัญชีไม่ต่ำกว่า 20,000 บาท");
      value = 10000;
    }

    if (typeof planType != 'undefined' && value && valueName) {

    if (planType == 'UA01') {
      //ปีกรมธรรม์ที่เริ่ม
      let cal_polstr = Number( this.ulinkChildWithdraw.get('bachelor_polstp_wd').value + 1 );

      //ถึงปีกรมธรรม์ที่
      let cal_polstr_to = Number( cal_polstr + 2 ) - 1;

        //อายุที่เริ่มถอน
      let cal_agestr = Number( this.ulinkChildWithdraw.get('bachelor_agestp_wd').value + 1 );

      //ถอนถึงอายุ
      let cal_agestrto = Number(cal_agestr + 2 ) - 1;


      if (!this.flag_success) {
      this.flag_success = true;
      this.ulinkChildWithdraw.setValue({
        sale_fund: this.ulinkChildWithdraw.get('sale_fund').value,
        child_inflation:  this.ulinkChildWithdraw.get('child_inflation').value,
        bachelorwd: this.ulinkChildWithdraw.get('bachelorwd').value,
        bachelor_agestr_wd: this.ulinkChildWithdraw.get('bachelor_agestr_wd').value,
        bachelor_agestp_wd: this.ulinkChildWithdraw.get('bachelor_agestp_wd').value,
        bachelor_polstr_wd: this.ulinkChildWithdraw.get('bachelor_polstr_wd').value,
        bachelor_polstp_wd: this.ulinkChildWithdraw.get('bachelor_polstp_wd').value,
        bachelor_agechildstr_wd: Number(18),
        bachelor_agechildstp_wd: Number(21),
        masterwd: this.decimalPipe.transform(Number(value)),
        master_agestr_wd: cal_agestr,
        master_agestp_wd: cal_agestrto,
        master_polstr_wd: cal_polstr,
        master_polstp_wd: cal_polstr_to,
        master_agechildstr_wd: Number(22),
        master_agechildstp_wd: Number(23)
      });
    }

    } else  if (planType == 'UA02') {
        //ปีกรมธรรม์ที่เริ่ม
        let cal_polstr2 = Number( this.ulinkChildWithdraw2.get('bachelor_polstp_wd').value + 1 );

        //ถึงปีกรมธรรม์ที่
        let cal_polstr_to2 = Number( cal_polstr2 + 2 ) - 1;

          //อายุที่เริ่มถอน
        let cal_agestr2 = Number( this.ulinkChildWithdraw2.get('bachelor_agestp_wd').value + 1 );

        //ถอนถึงอายุ
        let cal_agestrto2 = Number(cal_agestr2 + 2 ) - 1;


        if (!this.flag_success) {
          this.flag_success = true;
          this.ulinkChildWithdraw2.setValue({
            sale_fund: this.ulinkChildWithdraw2.get('sale_fund').value,
            child_inflation:  this.ulinkChildWithdraw2.get('child_inflation').value,
            bachelorwd: this.ulinkChildWithdraw2.get('bachelorwd').value,
            bachelor_agestr_wd: this.ulinkChildWithdraw2.get('bachelor_agestr_wd').value,
            bachelor_agestp_wd: this.ulinkChildWithdraw2.get('bachelor_agestp_wd').value,
            bachelor_polstr_wd: this.ulinkChildWithdraw2.get('bachelor_polstr_wd').value,
            bachelor_polstp_wd: this.ulinkChildWithdraw2.get('bachelor_polstp_wd').value,
            bachelor_agechildstr_wd: Number(18),
            bachelor_agechildstp_wd: Number(21),
            masterwd: this.decimalPipe.transform(Number(value)),
            master_agestr_wd: cal_agestr2,
            master_agestp_wd: cal_agestrto2,
            master_polstr_wd: cal_polstr2,
            master_polstp_wd: cal_polstr_to2,
            master_agechildstr_wd: Number(22),
            master_agechildstp_wd: Number(23)
          });
        }

    }
    }

  } else if (valueName ==  "retireWithdraw_reward_withdraw"){

    if ( value < 10000 && value != 0) {
      this.alertCtrl.warning("ถอนขั้นต่ำ 10,000 บาท และต้องมีเงินเหลือในบัญชีไม่ต่ำกว่า 20,000 บาท");
      formName.setValue(10000);
    }

  } else if (valueName ==  "retireWithdraw_pension_withdraw"){

    if ( value < 10000 && value != 0) {
      this.alertCtrl.warning("ถอนขั้นต่ำ 10,000 บาท และต้องมีเงินเหลือในบัญชีไม่ต่ำกว่า 20,000 บาท");
      formName.setValue(10000);
    }

  } if (valueName == 'topsum') {

    if ( value < 10000 && value != 0) {
      this.alertCtrl.warning(TextModal.wn_alert_1.text);
      result = this.decimalPipe.transform(10000);
      formName.setValue(result);

    } else if(value > 120000000 && value != 0) {
      this.alertCtrl.warning(TextModal.wn_alert_4.text);
      result = this.decimalPipe.transform(120000000);
      formName.setValue(result);

    } else {
      if (typeof value != 'undefined'||  value != 0 || value ) {
        result = this.decimalPipe.transform(value);
        formName.setValue(result);
      } else {
        formName.setValue('');
      }

    }
  } else if (valueName == 'addRetireTopup') {


      if (value < 10000 && value != 0) {
        this.alertCtrl.warning(TextModal.wn_alert_1.text);
        formName.setValue(10000);
      }
      if(value > 120000000 && value != 0) {
        this.alertCtrl.warning(TextModal.wn_alert_4.text);
        formName.setValue(120000000);
      }

  } else if (valueName == 'exam_RPPPrem0') {

    if (this.childFundPayPremium.controls['exam_slMode'].value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อความคุ้มครองขั้นต่ำ 12,000 บาท');
      this.childFundPayPremium.controls['exam_RPPPrem0'].setValue(12000);
    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อความคุ้มครองขั้นต่ำ 1,000 บาท');
      this.childFundPayPremium.controls['exam_RPPPrem0'].setValue(1000);

    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อความคุ้มครองขั้นต่ำ 3,000 บาท');
      this.childFundPayPremium.controls['exam_RPPPrem0'].setValue(3000);
    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อความคุ้มครองขั้นต่ำ 6,000 บาท');
      this.childFundPayPremium.controls['exam_RPPPrem0'].setValue(6000);
    } else {
      value = value + Number(this.childFundPayPremium.controls['exam_RPPPrem0'].value);
    }

    sum =  Number(value + this.childFundPayPremium.controls['topPay0'].value);
    sum = this.decimalPipe.transform(Number(sum));
    this.childFundPayPremium.controls['allPay0'].setValue(sum);
  } else if (valueName == 'exam_RSPPrem0') {

    if (this.childFundPayPremium.controls['exam_slMode'].value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 12,000 บาท');
      this.childFundPayPremium.controls['exam_RSPPrem0'].setValue(12000);
    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 1,000 บาท');
      this.childFundPayPremium.controls['exam_RSPPrem0'].setValue(1000);
    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 3,000 บาท');
      this.childFundPayPremium.controls['exam_RSPPrem0'].setValue(3000);
    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 6,000 บาท');
      this.childFundPayPremium.controls['exam_RSPPrem0'].setValue(6000);
    }
    sum =  Number(this.childFundPayPremium.controls['exam_RPPPrem0'].value + this.childFundPayPremium.controls['exam_RSPPrem0'].value + this.childFundPayPremium.controls['topPay0'].value);
    sum = this.decimalPipe.transform(Number(sum));
    this.childFundPayPremium.controls['allPay0'].setValue(sum);
  } else if (valueName == 'topPay0') {


    if (this.childFundPayPremium.controls['exam_slMode'].value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยเพิ่มพิเศษต้องไม่น้อยกว่า 12,000 บาท');
      this.childFundPayPremium.controls['topPay0'].setValue(12000);
    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยเพิ่มพิเศษต้องไม่น้อยกว่า 1,000 บาท');
      this.childFundPayPremium.controls['topPay0'].setValue(1000);
    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยเพิ่มพิเศษต้องไม่น้อยกว่า 3,000 บาท');
      this.childFundPayPremium.controls['topPay0'].setValue(3000);
    } else if (this.childFundPayPremium.controls['exam_slMode'].value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยเพิ่มพิเศษต้องไม่น้อยกว่า 6,000 บาท');
      this.childFundPayPremium.controls['topPay0'].setValue(6000);
    }
    sum =  Number(this.childFundPayPremium.controls['exam_RPPPrem0'].value + this.childFundPayPremium.controls['exam_RSPPrem0'].value + this.childFundPayPremium.controls['topPay0'].value);
    sum = this.decimalPipe.transform(Number(sum));
    this.childFundPayPremium.controls['allPay0'].setValue(sum);
  } else if (valueName == 'exam_RPPPrem0_lifeChange') {
    
    if (this.lifeChanging.get('exam_slMode').value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 12,000 บาท');
      result = this.decimalPipe.transform(Number(12000));
      sum =  Number(12000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 1,000 บาท');
      result = this.decimalPipe.transform(Number(1000));
      sum =  Number(1000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 3,000 บาท');
      result = this.decimalPipe.transform(Number(3000));
      sum =  Number(3000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 6,000 บาท');
      result = this.decimalPipe.transform(Number(6000));
      sum =  Number(6000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else {
      result = this.decimalPipe.transform(Number(value));
      sum =  Number(value) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    }

    if (!this.flag_success) {
    this.flag_success = true;
    let sh_rpp = Number(value)*12;
    this.minSumRPP0 = this.decimalPipe.transform(Number(sh_rpp*50));
    this.maxSumRPP0 = this.decimalPipe.transform(Number(sh_rpp*100));
    this.sum_rpp = this.decimalPipe.transform(Number(sh_rpp));
    this.lifeChanging.setValue({
      exam_emPer: this.lifeChanging.get('exam_emPer').value,
      exam_tax : this.lifeChanging.get('exam_tax').value,
      exam_num_pay: this.lifeChanging.get('exam_num_pay').value,
      exam_inputAge: this.lifeChanging.get('exam_inputAge').value,
      exam_inputAgeTo: this.lifeChanging.get('exam_inputAgeTo').value,
      ageStrPay0 :this.lifeChanging.get('ageStrPay0').value,
      exam_ageto_pay: this.lifeChanging.get('exam_ageto_pay').value,
      exam_slMode : this.lifeChanging.get('exam_slMode').value,
      exam_RPPPrem0 : result.toString(),
      exam_RSPPrem0 : this.lifeChanging.get('exam_RSPPrem0').value,
      topPay0 : this.lifeChanging.get('topPay0').value,
      allPay0 : sum.toString()
    });
    }
  
  } else if (valueName == 'exam_RSPPrem0_lifeChange') {

    console.log("ffff>>>>>", Number(this.lifeChanging.get('exam_RPPPrem0').value));
    
    if (this.lifeChanging.get('exam_slMode').value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 12,000 บาท');
      result = this.decimalPipe.transform(Number(12000));
      sum =  Number(12000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 1,000 บาท');
      result = this.decimalPipe.transform(Number(1000));
      sum =  Number(1000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 3,000 บาท');
      result = this.decimalPipe.transform(Number(3000));
      sum =  Number(3000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 6,000 บาท');
      result = this.decimalPipe.transform(Number(6000));
      sum =  Number(6000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else {
      result = this.decimalPipe.transform(Number(value));
      sum =  Number(value) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    }
    if (!this.flag_success) {
      this.flag_success = true;
   
    this.lifeChanging.setValue({
      exam_emPer: this.lifeChanging.get('exam_emPer').value,
      exam_tax : this.lifeChanging.get('exam_tax').value,
      exam_num_pay: this.lifeChanging.get('exam_num_pay').value,
      exam_inputAge: this.lifeChanging.get('exam_inputAge').value,
      exam_inputAgeTo: this.lifeChanging.get('exam_inputAgeTo').value,
      ageStrPay0 :this.lifeChanging.get('ageStrPay0').value,
      exam_ageto_pay: this.lifeChanging.get('exam_ageto_pay').value,
      exam_slMode : this.lifeChanging.get('exam_slMode').value,
      exam_RPPPrem0 : this.lifeChanging.get('exam_RPPPrem0').value,
      exam_RSPPrem0 : result.toString(),
      topPay0 : this.lifeChanging.get('topPay0').value,
      allPay0 : sum.toString()
      });
    }
  } else if (valueName == 'topPay0_lifeChange'){

    if (this.lifeChanging.get('exam_slMode').value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 12,000 บาท');
      result = this.decimalPipe.transform(Number(12000));
      sum =  Number(12000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 1,000 บาท');
      result = this.decimalPipe.transform(Number(1000));
      sum =  Number(1000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 3,000 บาท');
      result = this.decimalPipe.transform(Number(3000));
      sum =  Number(3000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else if (this.lifeChanging.get('exam_slMode').value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 6,000 บาท');
      result = this.decimalPipe.transform(Number(6000));
      sum =  Number(6000) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    } else {
      result = this.decimalPipe.transform(Number(value));
      sum =  Number(value) + Number(this.lifeChanging.get('exam_RPPPrem0').value) + Number(this.lifeChanging.get('exam_RSPPrem0').value) + Number(this.lifeChanging.get('topPay0').value);
      sum = this.decimalPipe.transform(Number(sum));
    }

    if (!this.flag_success) {
      this.flag_success = true;
    this.lifeChanging.setValue({
      exam_emPer: this.lifeChanging.get('exam_emPer').value,
      exam_tax : this.lifeChanging.get('exam_tax').value,
      exam_num_pay: this.lifeChanging.get('exam_num_pay').value,
      exam_inputAge: this.lifeChanging.get('exam_inputAge').value,
      exam_inputAgeTo: this.lifeChanging.get('exam_inputAgeTo').value,
      ageStrPay0 :this.lifeChanging.get('ageStrPay0').value,
      exam_ageto_pay: this.lifeChanging.get('exam_ageto_pay').value,
      exam_slMode : this.lifeChanging.get('exam_slMode').value,
      exam_RPPPrem0 : this.lifeChanging.get('exam_RPPPrem0').value,
      exam_RSPPrem0 : this.lifeChanging.get('exam_RSPPrem0').value,
      topPay0 : result.toString(),
      allPay0 : sum.toString()   
      });
    }
  } else if (valueName == 'exam_inputAgeTo_lifeChange'){

    if (!this.flag_success) {
      if (value && value < this.lifeChanging.get('exam_inputAge').value) {
        this.alertCtrl.warning(TextModal.wn_alert_2.text);
        this.lifeChanging.setValue({
          exam_emPer: this.lifeChanging.get('exam_emPer').value,
          exam_tax : this.lifeChanging.get('exam_tax').value,
          exam_num_pay: '',
          exam_inputAge: this.lifeChanging.get('exam_inputAge').value,
          exam_inputAgeTo: '',
          ageStrPay0 :this.lifeChanging.get('ageStrPay0').value,
          exam_ageto_pay: '',
          exam_slMode : this.lifeChanging.get('exam_slMode').value,
          exam_RPPPrem0 : this.lifeChanging.get('exam_RPPPrem0').value,
          exam_RSPPrem0 : this.lifeChanging.get('exam_RSPPrem0').value,
          topPay0 : this.lifeChanging.get('topPay0').value,
          allPay0 : this.lifeChanging.get('allPay0').value
        });
      } else if (this.lifeChanging.get('exam_num_pay').value && this.lifeChanging.get('exam_ageto_pay').value){
        
          this.flag_success = true;
          this.lifeChanging.setValue({
            exam_emPer: this.lifeChanging.get('exam_emPer').value,
            exam_tax : this.lifeChanging.get('exam_tax').value,
            exam_num_pay: '',
            exam_inputAge: this.lifeChanging.get('exam_inputAge').value,
            exam_inputAgeTo: value,
            ageStrPay0 :this.lifeChanging.get('ageStrPay0').value,
            exam_ageto_pay: '',
            exam_slMode : this.lifeChanging.get('exam_slMode').value,
            exam_RPPPrem0 : this.lifeChanging.get('exam_RPPPrem0').value,
            exam_RSPPrem0 : this.lifeChanging.get('exam_RSPPrem0').value,
            topPay0 : this.lifeChanging.get('topPay0').value,
            allPay0 : this.lifeChanging.get('allPay0').value
          });
          
      }
    }
  } else if (valueName == 'exam_num_pay_lifeChange'){

    let max_exam_num_pay = this.lifeChanging.controls['exam_inputAgeTo'].value != 0 ? Math.abs(Number(this.lifeChanging.controls['exam_inputAge'].value) - Number(this.lifeChanging.controls['exam_inputAgeTo'].value)) + 1 : 0;
    let _cal = ( Number(this.lifeChanging.get('exam_inputAge').value - 1 ) + Number (value));

    if (!this.flag_success) {
      if (value && value <= max_exam_num_pay && value != 0) {
          
          this.flag_success = true;

          this.lifeChanging.setValue({
            exam_emPer: this.lifeChanging.get('exam_emPer').value,
            exam_tax : this.lifeChanging.get('exam_tax').value,
            exam_num_pay: value,
            exam_inputAge: this.lifeChanging.get('exam_inputAge').value,
            exam_inputAgeTo: this.lifeChanging.get('exam_inputAgeTo').value,
            ageStrPay0 :this.lifeChanging.get('ageStrPay0').value,
            exam_ageto_pay: _cal,
            exam_slMode : this.lifeChanging.get('exam_slMode').value,
            exam_RPPPrem0 : this.lifeChanging.get('exam_RPPPrem0').value,
            exam_RSPPrem0 : this.lifeChanging.get('exam_RSPPrem0').value,
            topPay0 : this.lifeChanging.get('topPay0').value,
            allPay0 : this.lifeChanging.get('allPay0').value
            });

      } else {
 
          this.flag_success = true;
          this.alertCtrl.warning(TextModal.wn_alert_2.text);
          this.flag_success = true;
          this.lifeChanging.setValue({ 
          exam_emPer: this.lifeChanging.get('exam_emPer').value,
          exam_tax : this.lifeChanging.get('exam_tax').value,
          exam_num_pay: '',
          exam_inputAge: this.lifeChanging.get('exam_inputAge').value,
          exam_inputAgeTo: this.lifeChanging.get('exam_inputAgeTo').value,
          ageStrPay0 :this.lifeChanging.get('ageStrPay0').value,
          exam_ageto_pay: '',
          exam_slMode : this.lifeChanging.get('exam_slMode').value,
          exam_RPPPrem0 : this.lifeChanging.get('exam_RPPPrem0').value,
          exam_RSPPrem0 : this.lifeChanging.get('exam_RSPPrem0').value,
          topPay0 : this.lifeChanging.get('topPay0').value,
          allPay0 : this.lifeChanging.get('allPay0').value
          });

      }
    }
  } else if (valueName == 'exam_ageto_pay_lifeChange') {

    let cal = ( Math.abs( Number(this.lifeChanging.get('exam_inputAge').value) - Number(value) )) + 1;
    if (!this.flag_success) {
      if (value && value <=  this.lifeChanging.get('exam_inputAgeTo').value && value >= this.lifeChanging.get('exam_inputAge').value) {
  
          this.flag_success = true;
          this.lifeChanging.setValue({'exam_ageto_pay': value, 'exam_num_pay': cal});
      
      } else {
        this.alertCtrl.warning(TextModal.wn_alert_2.text);
        this.flag_success = true;
        this.lifeChanging.setValue({'exam_ageto_pay': '', 'exam_num_pay': ''});

      }
    }
  }
  // 99/99 เพื่อชีวิตหลังเกษียณ 
  else if(valueName == 'retire_rpp'){

    if (this.tlRetire_ua02.controls['retire_payType'].value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อความคุ้มครองขั้นต่ำ 12,000 บาท');
      this.tlRetire_ua02.controls['retire_rpp'].setValue(12000);
    }else if (this.tlRetire_ua02.controls['retire_payType'].value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อความคุ้มครองขั้นต่ำ 6,000 บาท');
      this.tlRetire_ua02.controls['retire_rpp'].setValue(6000);
    } else if (this.tlRetire_ua02.controls['retire_payType'].value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อความคุ้มครองขั้นต่ำ 3,000 บาท');
      this.tlRetire_ua02.controls['retire_rpp'].setValue(3000);
    }else if (this.tlRetire_ua02.controls['retire_payType'].value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อความคุ้มครองขั้นต่ำ 1,000 บาท');
      this.tlRetire_ua02.controls['retire_rpp'].setValue(1000);
    }
    sum =  Number(this.tlRetire_ua02.controls['retire_rpp'].value) + Number(this.tlRetire_ua02.controls['retire_rsp'].value) + Number(this.tlRetire_ua02.controls['retire_ua02_topup'].value);
    sum = this.decimalPipe.transform(Number(sum));
    this.tlRetire_ua02.controls['retire_total'].setValue(sum);
  }
  else if (valueName == 'retire_rsp'){

    if (this.tlRetire_ua02.controls['retire_payType'].value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 12,000 บาท');
      this.tlRetire_ua02.controls['retire_rsp'].setValue(12000);
    }else if (this.tlRetire_ua02.controls['retire_payType'].value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 6,000 บาท');
      this.tlRetire_ua02.controls['retire_rsp'].setValue(6000);
    } else if (this.tlRetire_ua02.controls['retire_payType'].value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 3,000 บาท');
      this.tlRetire_ua02.controls['retire_rsp'].setValue(3000);
    }else if (this.tlRetire_ua02.controls['retire_payType'].value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยประกันภัยเพื่อการออมขั้นต่ำ 1,000 บาท');
      this.tlRetire_ua02.controls['retire_rsp'].setValue(1000);
    }
    sum =  Number(this.tlRetire_ua02.controls['retire_rpp'].value + this.tlRetire_ua02.controls['retire_rsp'].value + this.tlRetire_ua02.controls['retire_ua02_topup'].value);
    sum = this.decimalPipe.transform(Number(sum));
    this.tlRetire_ua02.controls['retire_total'].setValue(sum);
  }
  else if (valueName == 'retire_ua02_topup'){

    if (this.tlRetire_ua02.controls['retire_payType'].value == 'รายปี' && Number(value) < 12000) {
      this.alertCtrl.warning('- เบี้ยพิเศษขั้นต่ำ 12,000 บาท');
      this.tlRetire_ua02.controls['retire_ua02_topup'].setValue(12000);
    }else if (this.tlRetire_ua02.controls['retire_payType'].value == 'ราย 6 เดือน' && Number(value) < 6000) {
      this.alertCtrl.warning('- เบี้ยพิเศษขั้นต่ำ 6,000 บาท');
      this.tlRetire_ua02.controls['retire_ua02_topup'].setValue(6000);
    } else if (this.tlRetire_ua02.controls['retire_payType'].value == 'ราย 3 เดือน' && Number(value) < 3000) {
      this.alertCtrl.warning('- เบี้ยพิเศษขั้นต่ำ 3,000 บาท');
      this.tlRetire_ua02.controls['retire_ua02_topup'].setValue(3000);
    }else if (this.tlRetire_ua02.controls['retire_payType'].value == 'รายเดือน' && Number(value) < 1000) {
      this.alertCtrl.warning('- เบี้ยพิเศษขั้นต่ำ 1,000 บาท');
      this.tlRetire_ua02.controls['retire_ua02_topup'].setValue(1000);
    }
    else if (this.tlRetire_ua02.controls['retire_payType'].value == 'รายปี' && Number(value) > 120000000) {
      this.alertCtrl.warning('- เบี้ยพิเศษสูงสุดไม่เกิน 120,000,000 บาท');
      this.tlRetire_ua02.controls['retire_ua02_topup'].setValue(120000000);
    }else if (this.tlRetire_ua02.controls['retire_payType'].value == 'ราย 6 เดือน' && Number(value) > 60000000) {
      this.alertCtrl.warning('- เบี้ยพิเศษสูงสุดไม่เกิน 60,000,000 บาท');
      this.tlRetire_ua02.controls['retire_ua02_topup'].setValue(60000000);
    } else if (this.tlRetire_ua02.controls['retire_payType'].value == 'ราย 3 เดือน' && Number(value) > 30000000) {
      this.alertCtrl.warning('- เบี้ยพิเศษสูงสุดไม่เกิน 30,000,000 บาท');
      this.tlRetire_ua02.controls['retire_ua02_topup'].setValue(30000000);
    }else if (this.tlRetire_ua02.controls['retire_payType'].value == 'รายเดือน' && Number(value) > 10000000) {
      this.alertCtrl.warning('- เบี้ยพิเศษสูงสุดไม่เกิน 10,000,000 บาท');
      this.tlRetire_ua02.controls['retire_ua02_topup'].setValue(10000000);
    }
    sum =  Number(this.tlRetire_ua02.controls['retire_rpp'].value + this.tlRetire_ua02.controls['retire_rsp'].value + this.tlRetire_ua02.controls['retire_ua02_topup'].value);
    sum = this.decimalPipe.transform(Number(sum));
    this.tlRetire_ua02.controls['retire_total'].setValue(sum);
  }

}

private setSlMode(planType: string, data: any){

  let number;
  let sum;

  console.log("test : ", this.childFundPayPremium.controls['exam_RPPPrem0'].value, this.childFundPayPremium.controls['exam_RSPPrem0'].value, this.childFundPayPremium.controls['topPay0'].value);

  if (typeof planType != 'undefined' && planType == 'exam_slMode_childFund_99'
  && typeof data != 'undefined' && data) {

    if (this.childFundPayPremium.controls['exam_RPPPrem0'].value || this.childFundPayPremium.controls['exam_RSPPrem0'].value
    || this.childFundPayPremium.controls['topPay0'].value ) {

      switch(data){

        case 'รายเดือน':
        number = Number(1000);
        this.childFundPayPremium.controls['exam_RPPPrem0'].setValue(number);
        this.childFundPayPremium.controls['exam_RSPPrem0'].setValue(number);
        this.childFundPayPremium.controls['topPay0'].setValue(number);
        if ( this.childFundPayPremium.controls['exam_RPPPrem0'].value
        && this.childFundPayPremium.controls['exam_RSPPrem0'].value
        && this.childFundPayPremium.controls['topPay0'].value) {

          sum =this.childFundPayPremium.controls['exam_RPPPrem0'].value + this.childFundPayPremium.controls['exam_RSPPrem0'].value + this.childFundPayPremium.controls['topPay0'].value;
          sum = this.decimalPipe.transform(Number(sum));
          this.childFundPayPremium.controls['allPay0'].setValue(sum);

        }
        break;

        case 'ราย 3 เดือน':
        number = Number(3000);
        this.childFundPayPremium.controls['exam_RPPPrem0'].setValue(number);
        this.childFundPayPremium.controls['exam_RSPPrem0'].setValue(number);
        this.childFundPayPremium.controls['topPay0'].setValue(number);

         if ( this.childFundPayPremium.controls['exam_RPPPrem0'].value
        && this.childFundPayPremium.controls['exam_RSPPrem0'].value
        && this.childFundPayPremium.controls['topPay0'].value) {

          sum =this.childFundPayPremium.controls['exam_RPPPrem0'].value + this.childFundPayPremium.controls['exam_RSPPrem0'].value + this.childFundPayPremium.controls['topPay0'].value;
        sum = this.decimalPipe.transform(Number(sum));
        this.childFundPayPremium.controls['allPay0'].setValue(sum);
        }

        break;

        case 'ราย 6 เดือน':
        number = Number(6000);
        this.childFundPayPremium.controls['exam_RPPPrem0'].setValue(number);
        this.childFundPayPremium.controls['exam_RSPPrem0'].setValue(number);
        this.childFundPayPremium.controls['topPay0'].setValue(number);

        if ( this.childFundPayPremium.controls['exam_RPPPrem0'].value
        && this.childFundPayPremium.controls['exam_RSPPrem0'].value
        && this.childFundPayPremium.controls['topPay0'].value) {

        sum =this.childFundPayPremium.controls['exam_RPPPrem0'].value + this.childFundPayPremium.controls['exam_RSPPrem0'].value + this.childFundPayPremium.controls['topPay0'].value;
        sum = this.decimalPipe.transform(Number(sum));
        this.childFundPayPremium.controls['allPay0'].setValue(sum);
        }
        break;

        case 'รายปี':
        number = Number(12000);
        this.childFundPayPremium.controls['exam_RPPPrem0'].setValue(number);
        this.childFundPayPremium.controls['exam_RSPPrem0'].setValue(number);
        this.childFundPayPremium.controls['topPay0'].setValue(number);

        if ( this.childFundPayPremium.controls['exam_RPPPrem0'].value
        && this.childFundPayPremium.controls['exam_RSPPrem0'].value
        && this.childFundPayPremium.controls['topPay0'].value) {

        sum =this.childFundPayPremium.controls['exam_RPPPrem0'].value + this.childFundPayPremium.controls['exam_RSPPrem0'].value + this.childFundPayPremium.controls['topPay0'].value;
        sum = this.decimalPipe.transform(Number(sum));
        this.childFundPayPremium.controls['allPay0'].setValue(sum);
        }

        break;
      }
  }
  } else if (typeof planType != 'undefined' && planType == 'exam_slMode_lifeChange_99'
  && typeof data != 'undefined' && data) {
    if (this.lifeChanging.controls['exam_RPPPrem0'].value || this.lifeChanging.controls['exam_RSPPrem0'].value
    || this.lifeChanging.controls['topPay0'].value ) {

      switch(data){

        case 'รายเดือน':
        number = this.decimalPipe.transform(Number(1000)); 
        if (Number(this.lifeChanging.controls['exam_RPPPrem0'].value) != 0  && Number(this.lifeChanging.controls['exam_RPPPrem0'].value) < 1000) {
          this.lifeChanging.controls['exam_RPPPrem0'].setValue(number)
        } else if ( Number(this.lifeChanging.controls['exam_RSPPrem0'].value) != 0 && Number(this.lifeChanging.controls['exam_RSPPrem0'].value) < 1000){
          this.lifeChanging.controls['exam_RSPPrem0'].setValue(number);
        } else if ( Number(this.lifeChanging.controls['topPay0'].value) != 0 && Number(this.lifeChanging.controls['topPay0'].value) < 1000) {
          this.lifeChanging.controls['topPay0'].setValue(number);
        }
        
          sum = Number(this.lifeChanging.controls['exam_RPPPrem0'].value + this.lifeChanging.controls['exam_RSPPrem0'].value + this.lifeChanging.controls['topPay0'].value);
          sum = this.decimalPipe.transform(Number(sum));
          this.lifeChanging.controls['allPay0'].setValue(sum);
        break;

        case 'ราย 3 เดือน':
        number = this.decimalPipe.transform(Number(3000));
        if (Number(this.lifeChanging.controls['exam_RPPPrem0'].value) != 0  && Number(this.lifeChanging.controls['exam_RPPPrem0'].value) < 3000) {
          this.lifeChanging.controls['exam_RPPPrem0'].setValue(number)
        } else if ( Number(this.lifeChanging.controls['exam_RSPPrem0'].value) != 0 && Number(this.lifeChanging.controls['exam_RSPPrem0'].value) < 3000){
          this.lifeChanging.controls['exam_RSPPrem0'].setValue(number);
        } else if ( Number(this.lifeChanging.controls['topPay0'].value) != 0 && Number(this.lifeChanging.controls['topPay0'].value) < 3000) {
          this.lifeChanging.controls['topPay0'].setValue(number);
        }

        sum = Number(this.lifeChanging.controls['exam_RPPPrem0'].value + this.lifeChanging.controls['exam_RSPPrem0'].value + this.lifeChanging.controls['topPay0'].value);
        sum = this.decimalPipe.transform(Number(sum));
        this.lifeChanging.controls['allPay0'].setValue(sum);
        

        break;

        case 'ราย 6 เดือน':
        number = this.decimalPipe.transform(Number(6000));
        if (Number(this.lifeChanging.controls['exam_RPPPrem0'].value) != 0  && Number(this.lifeChanging.controls['exam_RPPPrem0'].value) < 6000) {
          this.lifeChanging.controls['exam_RPPPrem0'].setValue(number)
        } else if ( Number(this.lifeChanging.controls['exam_RSPPrem0'].value) != 0 && Number(this.lifeChanging.controls['exam_RSPPrem0'].value) < 6000){
          this.lifeChanging.controls['exam_RSPPrem0'].setValue(number);
        } else if ( Number(this.lifeChanging.controls['topPay0'].value) != 0 && Number(this.lifeChanging.controls['topPay0'].value) < 6000) {
          this.lifeChanging.controls['topPay0'].setValue(number);
        }

        sum = Number(this.lifeChanging.controls['exam_RPPPrem0'].value + this.lifeChanging.controls['exam_RSPPrem0'].value + this.lifeChanging.controls['topPay0'].value);
        sum = this.decimalPipe.transform(Number(sum));
        this.lifeChanging.controls['allPay0'].setValue(sum);
        
        break;

        case 'รายปี':
        number =this.decimalPipe.transform(Number(12000)); 
        if (Number(this.lifeChanging.controls['exam_RPPPrem0'].value) != 0  && Number(this.lifeChanging.controls['exam_RPPPrem0'].value) < 12000) {
          this.lifeChanging.controls['exam_RPPPrem0'].setValue(number)
        } else if ( Number(this.lifeChanging.controls['exam_RSPPrem0'].value) != 0 && Number(this.lifeChanging.controls['exam_RSPPrem0'].value) < 12000){
          this.lifeChanging.controls['exam_RSPPrem0'].setValue(number);
        } else if ( Number(this.lifeChanging.controls['topPay0'].value) != 0 && Number(this.lifeChanging.controls['topPay0'].value) < 12000) {
          this.lifeChanging.controls['topPay0'].setValue(number);
        }

        sum = Number(this.lifeChanging.controls['exam_RPPPrem0'].value + this.lifeChanging.controls['exam_RSPPrem0'].value + this.lifeChanging.controls['topPay0'].value);
        sum = this.decimalPipe.transform(Number(sum));
        this.lifeChanging.controls['allPay0'].setValue(sum);
        

        break;
      }
  }
  }

}


private  newValue = 0; // To store new data calculated for both prospect's age and child's age
private  newValue2 = 0;
private successful_flag = false; // To store flag when the process every of steps is successfully
public setDetectLoop(): void {
// set to dafalut value for each variable
this.successful_flag = false;
}

public profitValidationAge(age,position,item, i, type) : void {
  debugger;
  let checkInput = position == 'profitage' ? this.propect_age : this.child_age;
  let rows;
  let num;
  let form; 
  if (type == 'UA01') {
    rows = this.ulinkChildProfit_array;
    form =  rows.get(['profitRows',i]) as FormControl;
    num = rows.get('profitRows') as FormArray;
  } else if (type == 'UA02') {
    rows =  this.ulinkChildProfit2;
    form =  rows.get(['profitRows2',i]) as FormControl;
    num = rows.get('profitRows2') as FormArray;
  } else if (type == 'UA02_lifeChange') {
    rows = this.lifeChangingProfit;
    form =  rows.get(['profitRows3',i]) as FormControl;
    num = rows.get('profitRows3') as FormArray;
  }
    if (!this.successful_flag){

      if (age && this.child_ageto != 0) {

        if (i == (num.length-1) ) {
                if (age > Number (checkInput)) {

                    let increaseNum: number = Math.abs((age - Number(checkInput)));
                    let valid_age_child_over_scope =  ((increaseNum + this.child_age) >= this.child_ageto )? true : false;


                        if (!valid_age_child_over_scope) {
                          this.newValue = Number(increaseNum + this.propect_age);
                          this.newValue2 = Number(increaseNum + this.child_age);
                          this.propect_age = this.newValue;
                          if (type !== 'UA02_lifeChange') {
                          this.child_age =  this.newValue2;
                          }
                          this.successful_flag = true;
                          if (type !== 'UA02_lifeChange') {
                          form.setValue({'profitage' : this.newValue, 'profitchild': this.newValue2, 'profitper':  form.get('profitper').value});
                          } else {
                          form.setValue({'profitage' : this.newValue, 'profitper': form.get('profitper').value});
                          } 

                        } else {
                          this.alertCtrl.warning(TextModal.wn_alert_2.text);
                          this.successful_flag = true;
                            if (type !== 'UA02_lifeChange') {
                            form.setValue({'profitage' : 0, 'profitchild': 0, 'profitper':  form.get('profitper').value});
                            } else {
                            form.setValue({'profitage' : 0, 'profitper': form.get('profitper').value});
                            } 
                        }

                } else {
                        let alertText;
                        if (age == this.ulinkChildProfit.controls['profitage_0'].value) {
                          alertText = TextModal.wn_alert_3.text;
                        } else {
                          alertText = TextModal.wn_alert_2.text;
                        }
                    
                          this.alertCtrl.warning(alertText);
                          this.successful_flag = true;
                          form.setValue({'profitage' : 0, 'profitchild': 0, 'profitper':  form.get('profitper').value});
                
                }

              }else {
                this.cleanArray(i, num, 'profitValidationAge');
                this.successful_flag = true;
              }

      } else {
        this.successful_flag = true;
        if (type !== 'UA02_lifeChange') {
          form.setValue({'profitage' : 0, 'profitchild': 0, 'profitper':  form.get('profitper').value});
        } else {
          form.setValue({'profitage' : 0, 'profitper': form.get('profitper').value});
        } 

      }

    }
}

// 99/99 เพื่อชีวิตหลังเกษียณ

private calRetirePayPremium (type:string, val:number, formName:FormControl) {

  if(val == 0){
    formName.setValue('');
    return;
  }
  if(val){
    let startAge = this.tlRetire_ua02.value.retire_protectTopupAgeFrom;
    let endAge = this.tlRetire_ua02.value.retire_protectTopupAgeTo;

    let sum_protectAgeTo = (val + Number(startAge)) - 1;
    let sum_expectAge = (val - Number(startAge)) + 1;

    if(type == 'retire_expactPay'){
      if(val < endAge){
        setTimeout(() => {
          this.tlRetire_ua02.value.retire_protectAgeTo = sum_protectAgeTo;
        }, 100);
      }else{
        this.alertCtrl.warning(TextModal.wn_alert_2.text);
        formName.setValue('');
        setTimeout(() => {
          this.tlRetire_ua02.value.retire_protectAgeTo = '';
        }, 100);
      }
    }
    if(type == 'retire_protectAgeTo'){
      if(val >= startAge && val <= endAge){
        setTimeout(() => {
          this.tlRetire_ua02.value.retire_expactPay = sum_expectAge;
        }, 100);
      }else{
        this.alertCtrl.warning(TextModal.wn_alert_2.text);
        formName.setValue('');
        setTimeout(() => {
          this.tlRetire_ua02.value.retire_protectAgeTo = '';
        }, 100);
      }

    }

  }


}

private cleanArray (index, rows : FormArray, call_from) : void {

  rows.controls.splice(index+1);

  if (call_from == 'profitValidationAge') {

    if (index == 0) {
      this.propect_age = this.prospect.age;
      this.child_age   = this.ulinkChildInfo.controls['child_age'].value;
    } else {
    this.propect_age =  rows.controls[index-1].get('profitage').value;
    this.child_age   = rows.controls[index-1].get('profitchild').value;
    }
  }
  rows.controls[index].reset();

}

private callCalendar(birthday: any) {


  console.log("print bd : "+birthday);


    let today = moment(new Date()).format('YYYY-MM-DD');
    let yearNow = Number(today.substring(0,4))+543;



    let year = Number(birthday.substring(0,4))+543;
    let ageNow = yearNow - year;


  this.ulinkChildInfo.controls['child_age'].setValue(ageNow.toString());

}

private allReset() {
  this.ulinkChildInfo.reset();
  this.ulinkChildPremium.reset();
  this.ulinkChildPremium_array.reset();
  this.ulinkChildProfit.reset();
  this.ulinkChildWithdraw.reset();
  this.tlRetire.reset();
  this.tlRetireProfit.reset();
  this.tlRetireWithdraw.reset();
  this.customUlinkPayInsurance.reset();
  this.customUlinkWithdraw.reset();
  this.customUlinkYield.reset();
  this.lifeChanging.reset();
  this.lifeChangingProfit.reset();
  this.lifeChangingRpp.reset();
}

}
