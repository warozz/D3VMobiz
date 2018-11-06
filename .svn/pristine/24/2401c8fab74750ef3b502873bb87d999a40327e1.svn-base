import { InvestmentBenefitPage } from './investment-benefit/investment-benefit';
import * as moment from 'moment';
import { Broadcaster } from './../../providers/utility/broadcaster';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { ProspectModel } from '../../providers/prospect/prospect-model';
import { OnInit, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Http } from '@angular/http';
import { AuthorizationKey } from '../../providers/constants/authorization-key';

// step page
import { QuatationSaleofferPage } from '../quatation/quatation-saleoffer/quatation-saleoffer';
import { QuatationRiskprofilePage } from '../quatation/quatation-riskprofile/quatation-riskprofile';
import { QuatationAllocationPage } from '../quatation/quatation-allocation/quatation-allocation';
import { CommonUtilProvider } from '../../providers/common-util/common-util';
import { RequestModel } from '../../providers/model/request-model';
import { ApiProvider } from '../../providers/api/api';
import { FunctionName } from '../../providers/constants/function-name';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { Subscription } from 'rxjs';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { WarningModalComponent } from '../../components/utility/warning-modal/warning-modal';
import { TextModal } from '../../providers/constants/text-modal';
import { Storage } from '@ionic/storage';
import { UniversalLifeDataProvider } from '../../providers/universal-life-data/universal-life-data';
import { UnitlinkDataProvider } from '../../providers/ulink-app-data/unitlink-data';
import { PopupPlanDetailComponent } from '../../components/utility/popup-plan-detail/popup-plan-detail';
import { UlinkAppDataProvider } from '../../providers/ulink-app-data/ulink-app-data';
import { CompareProspectProvider } from '../../providers/ulink-app-data/compare-prospect';

@IonicPage({
  segment: 'ใบเสนอขาย/แบบประกันชีวิตควบการลงทุน'
})
@Component({
  selector: 'page-investment',
  templateUrl: 'investment.html',
})
export class InvestmentPage implements OnInit, AfterViewChecked {

  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private prospect: ProspectModel;
  private chkDoNot: boolean = false;
  private objCheckBox = {
    'deposit': false,
    'fixedincome': false,
    'governmentbonds': false,
    'stock': false
  };
  private notDoFirstTime: boolean = false;
  private chkDoNot_fail: boolean = false;
  private universalLifePage: boolean = false;
  private investmentPage: boolean = true;
  private showUlPage: boolean = false;
  private data = [];
  private subscription: Array<Subscription> = [];
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
    }
  ];

  private insideTabsPage = [
    {
      title: 'แบบประกันยูนิตลิงค์',
      disabled: false // disabled in all3
    },
    {
      title: 'แบบประกันยูนิเวอร์แซลไลฟ์',
      disabled: false
    }
  ];

  private stepsPlanPage = [
    {
      id:0,
      // root: QuatationBenefitPage,
      root: InvestmentBenefitPage,
      title: 'ตัวอย่างผลประโยชน์',
      icon: 'icon-ion-eye',
      disabled: false
    },
    {
      id:1,
      root: QuatationSaleofferPage,
      title: 'ทำใบเสนอขาย',
      icon: 'icon-ion-calculator',
      disabled: false
    },
    {
      id:2,
      root: QuatationRiskprofilePage,
      title: 'Risk Profile',
      icon: 'icon-ion-android-checkbox-outline',
      disabled: false
    },
    {
      id:3,
      root: QuatationAllocationPage,
      title: 'Allocation',
      icon: 'icon-ion-pie-graph',
      disabled: false
    }
  ];
  private dataTL: string = '';
  private showViewPage: number = 1;
  private allowChoosePlan:boolean = false;
  private inDoNotCall : any;
  private ageCheck: number;
  private ageMoreOneMonth:boolean = false;
  private indexTab2: number = 0;
  private selectedIndexTab2: number;
  private selectedTabIndex: number = 0;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private broadcaster: Broadcaster,
    private apiProvider: ApiProvider,
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private modalCtrl: ModalController,
    private storage: Storage,
    private universalLifeData: UniversalLifeDataProvider,
    private unitlinkData: UnitlinkDataProvider,
    private ulinkBenefitData: UlinkAppDataProvider,
    private compareProspectProvider: CompareProspectProvider,
    private cdRef:ChangeDetectorRef
  ) {
    console.log('navParams---->', this.navParams);
    this.prospect = this.navParams.get('prospect');
    this.resetProvider();
    // setting edit data page (Universal Life)
    if(typeof this.navParams.get('editDataUniversalLife') != 'undefined') {
      this.universalLifeData.editData = true;
      this.indexTab2 = 1;
      this.selectTab2(1);
    }
    console.log('universalLifeData.editData---->', this.universalLifeData.editData);

    this.unitlinkData.prospect = this.prospect;
    this.ulinkBenefitData.prospect = this.prospect;
   
    this.compareProspectProvider.flagDoNotCall(this.prospect);
    // edit data UnitLink
    if(typeof this.navParams.get('editDataUnitLink') != 'undefined') {
      this.unitlinkData.editData = true;
      this.indexTab2 = 0;
      this.selectedIndexTab2 = 0;
    }
    console.log('unitlinkDataProvider.editData --->', this.unitlinkData.editData);
  }

  private resetProvider(){
    // univesal life
    this.universalLifeData.editData = false;

    // unit link
    this.unitlinkData.quotationul = undefined;
    this.unitlinkData.editData = false;
    this.compareProspectProvider.resetData();
    this.unitlinkData.resetData()
    this.ulinkBenefitData.resetData();
  }

  public async ngOnInit() {
      try {
       this.broadcaster.broadcast('prospect', this.prospect);
        const saleInfo = await this.storage.get('saleInformation');
        if(saleInfo) {
          this.tabsPage[1].disabled = false;
            // disabled in all3
            if(saleInfo && saleInfo['ulip'] ) {
              this.insideTabsPage[0].disabled = false; // enabled tab
            } else {
              this.insideTabsPage[0].disabled = true; // disabled tab
            }
            if(saleInfo && saleInfo['ulLicense']) {
              this.insideTabsPage[1].disabled = false; // enabled tab
            } else {
              this.insideTabsPage[1].disabled = true; // disabled tab
            }

            if(this.universalLifeData.editData == false && this.unitlinkData.editData == false) {
              if(saleInfo && saleInfo['ulLicense'] && saleInfo['ulip']){
                this.indexTab2 = 1;
              }else if (saleInfo && saleInfo['ulip'] ){
                this.indexTab2 = 0;
                this.selectedIndexTab2 = 0;
              }else if (saleInfo && saleInfo['ulLicense'] ){
                this.indexTab2 = 1;
              }
            }
        } else {
          // ไม่มีแบบประกันควบการลงทุน
          this.tabsPage[1].disabled = true;
          this.insideTabsPage[0].disabled = true;
          this.insideTabsPage[1].disabled = true;
        }
      }catch(err) {
        console.log('saleInformation error! ==> ', err);
      }

    //on change prospect
    this.subscription.push(
      this.broadcaster.on('prospect').subscribe(res => {
        if(this.selectedIndexTab2 == 0){
          if(this.dataTL !== '' && this.validateAge() == false){
            setTimeout(() => {
              this.dataTL = '';
            }, 20);
          }
        }

      })
    );
    this.broadcaster.broadcast('unitLinkInsuranceType', this.dataTL);
    this.ageCheck =  parseInt(this.prospect.age);

      this.subscription.push(
        this.broadcaster.on('ulinkCheckbox').subscribe(res => {
          //console.log("res ", res);
          this.objCheckBox.deposit = res.deposit;
          this.objCheckBox.fixedincome = res.fixedincome;
          this.objCheckBox.governmentbonds = res.governmentbonds;
          this.objCheckBox.stock = res.stock;
          // ให้ alert ครั้งเดียว ถ้าอายุมากกว่าเท่ากับ 60 ถ้าเค้าไม่เช็คอะไร จึง reset
          if (!res.governmentbonds && !res.fixedincome && !res.stock && !res.deposit) {
              this.oneTimeAert = false;
          }

          if(res.governmentbonds|| res.fixedincome || res.stock || res.deposit){
            this.allowChoosePlan = true;
            this.unitlinkData.flagValidUlinkExpreiene = false;
          }else if (!res.governmentbonds && !res.fixedincome && !res.stock && !res.deposit){
            this.allowChoosePlan = false;
          }
          this.checkAlertDonotCall(this.objCheckBox);
        })
      );

    //reset flag data
      this.subscription.push(
        this.broadcaster.on('resetDataFlagUlink').subscribe(res => {
          if(res == true){
            this.resetValue();
            this.broadcaster.broadcast('resetCheckBoxUlink', true);
            this.showUlPage = false;
          }
        })
      )

    if(this.unitlinkData.editData){
      this.setEditData();
    }
    this.cdRef.detectChanges();

      setTimeout(() => {
        this.notDoFirstTime = false;
      }, 1000);

  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngOnDestroy(){
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  /**
     * ตรวจจับ event prospect
     */
    private async keyupProspect() {
      console.log("investment prospect-->",this.prospect);
      let checkInfoProspect:boolean = await this.compareProspectProvider.flagDoNotCall(this.prospect);
      if(checkInfoProspect){
        this.chkDoNot = false;
        this.chkDoNot_fail = false;
      }
      this.unitlinkData.prospect = this.prospect;
      this.ulinkBenefitData.prospect = this.prospect;
      console.log("this.ulinkBenefitData.prospect-->",this.ulinkBenefitData.prospect);
    }

  /**
   * ส่งค่า tab ที่ถูกเลือก
   * @param index step
   */
  private selectTab(index: number): void {
    if (typeof index == 'number') {
      if (index == 0) {
        this.loadingCtrl.present();
        this.navCtrl.setRoot('QuatationPage', { prospectToQuatation: { prospect: this.prospect }} ).then(() => {
          this.loadingCtrl.dismiss();
        });
      }
    }
  }

  /**
   * ส่งค่า tab ที่ถูกเลือก ในหน้า investment
   * @param index step
   */
  private selectTab2(index: number): void {
   	if (typeof index == 'number') {
      if (index == 1){
        this.universalLifePage = true;
        this.resetValue();
        this.unitlinkData.resetData();
        this.unitlinkData.editData = false;
      }else{
        this.universalLifePage = false;
      }
      this.selectedIndexTab2 = index;
    }
  }

  private popup(): void {
    let modal: Modal = this.modalCtrl.create(PopupPlanDetailComponent,{ plancode : this.dataTL});
    modal.present();
  }

/**
   * ส่งค่า step ที่ถูกเลือกเพื่อเลือกแสดงข้อมูลของแต่ละ step
   * @param index step
   */
  private selectStep(index: number) {

     if (typeof index != 'undefined' || index != '') {
      this.broadcaster.broadcast('choose_step', index);
     }

  }
  /**
   * เช็ค Do Not Call
   */

  private doNotCall(): void {

    let token;
    if (this.prospect.citizenID || this.prospect.firstName || this.prospect.lastName) {
      this.loadingCtrl.present();
      if (this.prospect.citizenID){
          if((this.prospect.citizenID != '') && (typeof this.prospect.citizenID != 'undefined') && this.prospect.citizenID.length < 13){
            this.loadingCtrl.dismiss();
            this.alertCtrl.warning('กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลัก');
          }else{
            token = {
              "ulink" : "{\"idNo\":\""+this.prospect.citizenID+"\"}",
              "operation":"donotcallbyid"
            };
          }
      } else {
          if (this.prospect.firstName && this.prospect.lastName) {
            token = {
              "ulink" : "{\"fname\":\""+this.prospect.firstName+"\"\, \"lname\":\""+this.prospect.lastName+"\"}",
              "operation":"donotcallbyname"
            };
          } else {
            this.loadingCtrl.dismiss();
            this.alertCtrl.warning("โปรดกรอก ชื่อ และ นามสกุล ให้ครบ เพื่อใช้ในการตรวจสอบ Do Not Call List");
            this.chkDoNot_fail = false;
            this.chkDoNot = false;
            this.dataTL="";
          }
        }

    if (token){
          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.UNITLINKAPI;
          reqM.param = [token];

        this.apiProvider.callData(reqM).then(
          (res) => {
            this.loadingCtrl.dismiss();
            var dataReturn = JSON.parse(res['data']);
            console.log("dataReturn--> ",dataReturn);
            let key : any;
            let iterator: any;

            console.log("token.operation: ",token.operation);
            if (token.operation == 'donotcallbyid') {
              dataReturn['data'].forEach(element => {
                this.inDoNotCall = element.donotcall;
              });
            }else{
              dataReturn['data'].forEach(element => {
                this.inDoNotCall = element.arrdonotcall;
              });
            }
          },
          (err) => {
            this.loadingCtrl.dismiss();
            this.alertCtrl.error(err);
            console.log(err);
            throw new Error(err);
          }
        ).then(
          () => {
            console.log("this.inDoNotCall: ",this.inDoNotCall)
            if(token.operation == 'donotcallbyid'){
              if(typeof this.inDoNotCall != 'undefined'){
                if (this.inDoNotCall == '00000000') {
                  this.chkDoNot = true;
                  this.chkDoNot_fail = false;
                  this.showUlPage = true;
                  this.checkAlertDonotCall(this.objCheckBox);
                  //this.broadcaster.broadcast('choose_step', 2);
                }else if(this.inDoNotCall != '00000000'){
                  let data = {
                    type: 29,
                    redText: TextModal.SCREEN4_1_29,
                    date: this.inDoNotCall
                  };
                  this.chkDoNot = false;
                  this.chkDoNot_fail = true;
                  let modal = this.modalCtrl.create(WarningModalComponent, data);
                  modal.present();
                }
              }else{
                this.alertCtrl.warning('เกิดข้อผิดพลาดของระบบ');
              }
            }else{
              if(typeof this.inDoNotCall != 'undefined'){
                if(this.inDoNotCall.length == 0){
                  this.chkDoNot = true;
                    this.chkDoNot_fail = false;
                    this.showUlPage = true;
                    this.checkAlertDonotCall(this.objCheckBox);
                    //this.broadcaster.broadcast('choose_step', 2);
                }else if(this.inDoNotCall.length == 1){
                  let date;
                  this.inDoNotCall.forEach(element => {
                    date = element.alUncd[0].closeDate;
                  });
                  let data = {type: 29,
                            redText: TextModal.SCREEN4_1_29,
                              date: date
                            };
  
                  this.chkDoNot = false;
                  this.chkDoNot_fail = true;
  
                  let modal = this.modalCtrl.create(WarningModalComponent, data);
                  modal.present();
                }else if(this.inDoNotCall.length > 1){
                  let data = [{
                      textAlert: TextModal.SCREEN4_1_40,
                      firstName: this.prospect.firstName,
                      lastName: this.prospect.lastName,
                      list: this.inDoNotCall
                  }];
  
                    let closeAlertTemp = false;
                    if ( !this.allowChoosePlan) {
                      this.allowChoosePlan = true;
                      closeAlertTemp = true;
                    }
                    let modal = this.modalCtrl.create(WarningModalComponent, data);
                    modal.present();
  
                    /**
                   * ดึงข้อมูลกลับมารอ insert ในข้อมูลผู้มุ่งหวัง
                   */
                  modal.onDidDismiss(res => {
                    if (res) {
                    console.log("res>>>>>>", res)
                      if (closeAlertTemp) {
                        this.allowChoosePlan = false;
                      }
                      this.prospect.citizenID = res.identifyId;
                      console.log("this.prospect>>>>>>>>",  this.prospect.citizenID);
  
                      this.broadcaster.broadcast('prospect', this.prospect);
                    }
                  });
                }
              }else{
                this.alertCtrl.warning('เกิดข้อผิดพลาดของระบบ');
              }
            }
          }
        );
      }
    } else {
      this.alertCtrl.warning(TextModal.SCREEN4_1_37.text);
      this.chkDoNot_fail = false;
      this.chkDoNot = false;
      this.dataTL="";
    }
  }

  private oneTimeAert: boolean = false;
  private checkAlertDonotCall(data: any) {
    if (!this.notDoFirstTime) {
      if (Number(this.prospect.age) >= 60 && this.allowChoosePlan && this.chkDoNot) {
          if (!this.oneTimeAert) {
            this.oneTimeAert = true;
            this.alertCtrl.warning(TextModal.SCREEN4_1_32.text);
          }

      } else if (Number(this.prospect.age) < 60 && data.deposit
        && !data.fixedincome && !data.governmentbonds && !data.stock && this.chkDoNot) {
        this.alertCtrl.warning(TextModal.SCREEN4_1_32.text);

      } else if (!this.allowChoosePlan && this.chkDoNot){
        this.alertCtrl.warning(TextModal.SCREEN4_1_38.text);
        this.unitlinkData.flagValidUlinkExpreiene = true;
      }
    }
  }

  /**
   * listener ดูการเปลี่ยนแปลงของ selection
   * และเปลี่ยนหน้า
   */
  private changeDetailPage(): void {
    let chooseTlPlan = this.dataTL;
      if(this.validateAge() == false){
        setTimeout(() => {
          this.dataTL = '';
        }, 20);
      }else{
        if ( this.allowChoosePlan && this.chkDoNot) {
          this.unitlinkData.quotationul = undefined;
          this.unitlinkData.insuranceType =  chooseTlPlan;
          this.ulinkBenefitData.planCode = chooseTlPlan;
          this.selectedTabIndex = 1;
          console.log('changeDetailPage : ', chooseTlPlan, typeof chooseTlPlan);
          if ( chooseTlPlan == 'UA01' ) {
            this.showViewPage = 1;
            this.ulinkBenefitData.choosePlan = 1;
            this.broadcaster.broadcast('chooseTlPlan', this.showViewPage); // use on benefit example page
            this.unitlinkData.paymentType = Number('9');
          } else if ( chooseTlPlan == 'UA02' )  {
            this.showViewPage = 2;
            this.ulinkBenefitData.choosePlan = 2;
            this.broadcaster.broadcast('chooseTlPlan', this.showViewPage);
            this.unitlinkData.paymentType = Number('1');
          }
          this.broadcaster.broadcast('tlPlan', chooseTlPlan);
        }
      }
      this.broadcaster.broadcast('resetDataFlagUlink', false);
    }


    private setEditData(){
      if(typeof this.navParams.get('quotationUnitLink') != 'undefined') {
        this.selectedTabIndex = 1;
        this.showUlPage = true;
        let quotation = this.navParams.get('quotationUnitLink');
        this.unitlinkData.quotationul = quotation;
        this.dataTL = quotation['plancode'];
        this.unitlinkData.insuranceType = this.dataTL;
        this.unitlinkData.insuranceName = quotation['planname'];
        this.ulinkBenefitData.planCode = this.dataTL;
        this.allowChoosePlan = true;
        this.chkDoNot = true;
        this.notDoFirstTime = true;
        //set value
        this.unitlinkData.paytype = quotation['mode'];
        this.unitlinkData.rppPremium = Number(quotation['lifepremium']);
        this.unitlinkData.rppSum = Number(quotation['lifesum']);
        this.unitlinkData.rspPremium = Number(quotation['savingpremium']);
        this.unitlinkData.rspSum = Number(quotation['savingsum']);
      }
      if(typeof this.navParams.get('exampleBenefit') != 'undefined') {
        let exampleBenefit = this.navParams.get('exampleBenefit');
        this.allowChoosePlan = true;
        this.chkDoNot = true;
        this.notDoFirstTime = true;
        this.selectedTabIndex = 0;
        this.showUlPage = true;
        this.dataTL = exampleBenefit['plancode'];
        this.unitlinkData.insuranceType = this.dataTL;
        this.ulinkBenefitData.planCode = this.dataTL;
        this.ulinkBenefitData.setExampleBenefit(exampleBenefit);
      }
    }

    // เช็คอายุขั้นต่ำ 1 เดือน
    private checkMonthByBirthdate(birthdate:string):boolean{
      let ageMoreOneMonth = false;
      let bDate = moment(birthdate);
      let endDayOfMonth = bDate.daysInMonth();
      let futureMonth =   (bDate).add(endDayOfMonth, 'days');
      let nowDate  = moment();

      if(futureMonth <= nowDate){
         ageMoreOneMonth = true;
      }
       return ageMoreOneMonth;
    }

    // Function validate อายุ
    private validateAge() :boolean{
      this.ageMoreOneMonth = this.checkMonthByBirthdate(this.prospect.birthDate);
      const maxAge = 70;
      let agePros = Number(this.prospect.age);
      if(this.ageMoreOneMonth == false){
        this.alertCtrl.warning("ผู้มุ่งหวังไม่อยู่ในช่วงอายุการรับประกัน ( 1 เดือน"+  " - " +maxAge+" ปี )");
        return false;
      } else {
        if(agePros > maxAge){
          this.alertCtrl.warning("ผู้มุ่งหวังไม่อยู่ในช่วงอายุการรับประกัน ( 1 เดือน"+  " - " +maxAge+" ปี )");
          return false;
        }
      }

      return true;
    }

    // reset value
    private resetValue(): void {
      this.chkDoNot_fail = false;
      this.chkDoNot = false;
      this.allowChoosePlan = false;
      this.unitlinkData.flagValidUlinkExpreiene = false;
      setTimeout(() => {
        this.dataTL = '';
      }, 20);
    }
}
