import { Subscription } from 'rxjs/Subscription';
import { RiderConfig } from './../../../../providers/rider/rider-config';
import { ApplicationData } from './../../../../providers/application/application-data';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content} from 'ionic-angular';
import { ValidateProvider } from "../../../../providers/validate/validate";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingDirective } from "../../../../directives/extends/loading/loading";
import { DecimalPipe } from '@angular/common';
import { PaymentM } from '../../../../providers/service-table/payment-model';
import { HttpClient } from '@angular/common/http';
import { ApplicationMasterM } from '../../../../providers/application/application-master-model';
import { Broadcaster } from '../../../../providers/utility/broadcaster';
import { FullNameInfo } from '../../../../directives/utility/fullname-popup/fullname-info';


/**
 * Generated class for the AppTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-type',
  templateUrl: 'app-type.html',
})
export class AppTypePage implements OnDestroy {


  private quatationRiders: any;
  private quatation: any;
  private relationDropdown;
  //private endowmenttype = "";
  /**
   * rider ทั้งหมด
   */
  private rider;
  private appTypeForShow;
  paymentForSave:FormGroup;
  private fullnameInfo: FullNameInfo = new FullNameInfo();

  public quotationM = this.appData.getQuotation();
  //private personidtax: string;

  private subscription: Subscription;

  ulinkInsurancePlan:string;

  constructor(
    private fb: FormBuilder,
    public content:Content ,
    public navCtrl: NavController,
    public navParams: NavParams,
    private appData: ApplicationData,
    private decimalPipe: DecimalPipe ,
    private http: HttpClient,
    private conf: RiderConfig,
    private broadcaster: Broadcaster) {

    this.appTypeForShow = {
      idType: '',
      insuranceType: '',
      insurancePlan: '',
      insurancePaymentType: '',
      insuranceLifeTime: '',
      insurancePaymentTime: '',
      insuranceAmount: '',
      insureMain: '',
      insureTotal: '',
      KbAge:'',

      //show in ulink ua01,ua02
      savingpremium:'',
      savingsum:'',
      topuppremium:''
    };

    this.rider = {
      tpInsure:'',
      tpAmount:'',
      a1Amount:'',
      a1Insure:'',
      kjAmount:'',
      kjInsure:'',
      a2Amount:'',
      a2Insure:'',
      kj2Amount:'',
      kj2Insure:'',
      a3Amount:'',
      a3Insure:'',
      trInsure:'',
      trAmount:'',
      trLtInsure:'',
      trLtAmount:'',
      tr44Insure:'',
      tr44Amount:'',
      smartVipAmount:'',
      smartVipInsure:'',
      vpInsure:'',
      vpAmount:'',
      vp5Insure:'',
      sr2Insure:'',
      spInsure:'',
      spAmount:'',
      rpAmount:'',
      rpInsure:'',
      rpgAmount:'',
      rpgInsure:'',
      spgAmount:'',
      spgInsure:'',
      sr2Amount:'',
      KbInsure:'',
      jpAmount:'',
      jpInsure:'',
      hAmount:'',
      hInsure:'',
      tpCheck:false,
      a1Check:false,
      kjCheck:false,
      a2Check:false,
      kj2Check:false,
      a3Check:false,
      trCheck:false,
      trLtCheck:false,
      tr44Check:false,
      smartVipCheck:false,
      vpCheck:false,
      vp5Check:false,
      sr2Check:false,
      spCheck:false,
      rpCheck:false,
      rpgCheck:false,
      spgCheck:false,
      KbCheck:false,
      jpCheck:false,
      hCheck:false
    }

    this.subscription = this.broadcaster.on('appStep').subscribe(res =>{

      if(res == 1){
        this.taxreduceflag(this.paymentForSave.controls['taxreduceflag'].value == 'Y');
      }
    })

     /*
     get dropdown list from json
    */
    this.http.get('assets/json/application/relation.json').subscribe(data => {
      this.relationDropdown = data;
      this.relationDropdown = this.relationDropdown.relation;
    });

    // if (this.quotationM && this.quotationM.pname && this.quotationM.fname && this.quotationM.lname) {
    //   this.fullnameInfo.age = this.quotationM.insureage;
    //   this.fullnameInfo.title = "ผู้ชำระเบี้ยประกัน";
    //   this.fullnameInfo.prefix = this.quotationM.pname;
    //   this.fullnameInfo.firstName = this.quotationM.fname;
    //   this.fullnameInfo.lastName = this.quotationM.lname;
    // }

    this.paymentForSave = this.fb.group({
      //paymentname:['' ,Validators.required],
      paymentname:[ this.quotationM.pname + ' ' + this.quotationM.fname + ' ' + this.quotationM.lname ,Validators.required],
      paymentrelation:['06',Validators.required],
      paymentslipno:['', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])],
      amount:'',
      amountForShow:{ value: '', disabled: true },
      paymenttype:['',Validators.required],
      paymenttypedesc:'',
      taxreduceflag:['', Validators.required],
      intertax:{value: false, disabled: true},
      personidtax: [{value: '', disabled: true}, Validators.required],
      prename: [this.quotationM.pname,Validators.required],
      firstname: [this.quotationM.fname,Validators.required],
      lastname: [this.quotationM.lname,Validators.required],

    });

    this.setFullnameInfo(this.quotationM.insureage, "ผู้ชำระเบี้ยประกันภัย",this.quotationM.pname, this.quotationM.fname,this.quotationM.lname);

    this.appData.appType = this.paymentForSave;

  }

  fullnameChange(fullname: FullNameInfo) {
    console.log(fullname);
    this.paymentForSave.get('prename').setValue(fullname.prefix);
    this.paymentForSave.get('firstname').setValue(fullname.firstName);
    this.paymentForSave.get('lastname').setValue(fullname.lastName);
    this.appData.appType = this.paymentForSave;

    this.setFullnameInfo(this.quotationM.insureage, "ผู้ชำระเบี้ยประกันภัย",fullname.prefix, fullname.firstName,fullname.lastName);
  }

  setFullnameInfo(age: string, title: string, prefix: string, firstName: string, lastName: string): void {

    this.fullnameInfo = new FullNameInfo();
    this.fullnameInfo.age = age;
    this.fullnameInfo.title = title;
    this.fullnameInfo.prefix = prefix;
    this.fullnameInfo.firstName = firstName;
    this.fullnameInfo.lastName = lastName;
    // debugger;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppTypePage');
  }
  scrollToTop () {
    this.content.scrollTo(0, 100, 500);
  }
  scrollToCenter () {
    this.content.scrollTo(0, 450, 500);
  }
  scrollToBot () {
    this.content.scrollToBottom();
  }
  ngOnInit() {
    this.quatation = this.appData.getQuotation();
    console.log("quatation :",this.quatation);
    if (this.quatation) {
      let mode: string  = "";

      if(this.quatation.typeapp === 'ULink'){


        //updateText insurancePlan
        // this.ulinkInsurancePlan = this.renderPlanCodeUlink(this.)


        if(this.quatation.mode === "1") {
          mode = "รายปี";
        } else if(this.quatation.mode === "0") {
          mode = "รายเดือน";
        } else if(this.quatation.mode === "2") {
          mode = "ราย 6 เดือน";
        } else if(this.quatation.mode === "4") {
          mode = "ราย 3 เดือน";
        }else if(this.quatation.mode === "9") {
          mode = "ครั้งเดียว";
        }

      } else {
        if(this.quatation.mode === "1" || this.quatation.mode === "9" ) {
          mode = "รายปี";
        } else if(this.quatation.mode === "0") {
          mode = "รายเดือน";
        } else if(this.quatation.mode === "2") {
          mode = "ราย 6 เดือน";
        } else if(this.quatation.mode === "4") {
          mode = "ราย 3 เดือน";
        }
      }



      // havetp
      if(this.quatation.havetp === "Y") {
        this.rider.tpCheck = true;
        this.rider.tpAmount = this.decimalPipe.transform(this.quatation.lifesum);
        this.rider.tpInsure = "-";
      }

      let dictionary = new Dictionary<any>();

      //console.log("this.quatation.quotationRiderMs : ",this.quatation.quotationRiderMs);

      for (let rider of this.quatation.quotationRiderMs) {
        dictionary.add(rider.ridertype, rider);//key:ridertype | val:quotationRiderMs[i]
      }
      this.quatationRiders = dictionary;

      if( this.quatation.quotationRiderMs.length > 0){
          //console.log("rider :: ",this.conf.rider('D01'));

          // this.rider.tpInsure = this.quatationRiders.getByKey(this.conf.rider('TP')) ? this.quatationRiders.getByKey(this.conf.rider('TP')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('TP')).premium):"" :"";//เบี้ยประ�?ัน,
          // this.rider.tpAmount = this.quatationRiders.getByKey(this.conf.rider('TP')) ? this.quatationRiders.getByKey(this.conf.rider('TP')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('TP')).sum):"" :"";//เงินเอาประ�?ันภัย
          // this.rider.tpCheck = this.quatationRiders.getByKey(this.conf.rider('TP')) ? true:false;

          this.rider.a1Amount = this.quatationRiders.getByKey(this.conf.rider('AC01')) ? this.quatationRiders.getByKey(this.conf.rider('AC01')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('AC01')).sum):"" :"";//เงินเอาประ�?ันภัย,
          this.rider.a1Insure = this.quatationRiders.getByKey(this.conf.rider('AC01')) ? this.quatationRiders.getByKey(this.conf.rider('AC01')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('AC01')).premium):"" :"";//เบี้ยประ�?ัน,
          this.rider.a1Check = this.quatationRiders.getByKey(this.conf.rider('AC01')) ? true:false;

          this.rider.kjAmount = this.quatationRiders.getByKey(this.conf.rider('KG1')) ? this.quatationRiders.getByKey(this.conf.rider('KG1')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('KG1')).sum):"" : "";//เงินเอาประ�?ันภัย,
          this.rider.kjInsure = this.quatationRiders.getByKey(this.conf.rider('KG1')) ? this.quatationRiders.getByKey(this.conf.rider('KG1')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('KG1')).premium):"" :"";//เบี้ยประ�?ัน,
          this.rider.kjCheck = this.quatationRiders.getByKey(this.conf.rider('KG1')) ? true:false;

          this.rider.a2Amount = this.quatationRiders.getByKey(this.conf.rider('AC02')) ? this.quatationRiders.getByKey(this.conf.rider('AC02')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('AC02')).sum):"" :"";//เงินเอาประ�?ันภัย,
          this.rider.a2Insure = this.quatationRiders.getByKey(this.conf.rider('AC02')) ? this.quatationRiders.getByKey(this.conf.rider('AC02')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('AC02')).premium):"" :"";//เบี้ยประ�?ัน
          this.rider.a2Check = this.quatationRiders.getByKey(this.conf.rider('AC02')) ? true:false;

          this.rider.kj2Amount = this.quatationRiders.getByKey(this.conf.rider('KG2')) ? this.quatationRiders.getByKey(this.conf.rider('KG2')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('KG2')).sum):"" :"",//เงินเอาประ�?ันภัย,
          this.rider.kj2Insure = this.quatationRiders.getByKey(this.conf.rider('KG2')) ? this.quatationRiders.getByKey(this.conf.rider('KG2')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('KG2')).premium):"" :"";//เบี้ยประ�?ัน,
          this.rider.kj2Check = this.quatationRiders.getByKey(this.conf.rider('KG2')) ? true:false;

          this.rider.a3Amount = this.quatationRiders.getByKey(this.conf.rider('AC03')) ? this.quatationRiders.getByKey(this.conf.rider('AC03')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('AC03')).sum):"" :"";//เงินเอาประ�?ันภัย
          this.rider.a3Insure = this.quatationRiders.getByKey(this.conf.rider('AC03')) ? this.quatationRiders.getByKey(this.conf.rider('AC03')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('AC03')).premium):"" :"";//เบี้ยประ�?ัน
          this.rider.a3Check = this.quatationRiders.getByKey(this.conf.rider('AC03')) ? true:false;

          this.rider.trAmount = this.quatationRiders.getByKey(this.conf.rider('D01')) ? this.quatationRiders.getByKey(this.conf.rider('D01')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('D01')).sum):"" :"";//เงินเอาประ�?ันภัย
          this.rider.trInsure = this.quatationRiders.getByKey(this.conf.rider('D01')) ? this.quatationRiders.getByKey(this.conf.rider('D01')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('D01')).premium):"" :"";//เบี้ยประ�?ัน,
          this.rider.trCheck = this.quatationRiders.getByKey(this.conf.rider('D01')) ? true:false;

          this.rider.trLtInsure = this.quatationRiders.getByKey(this.conf.rider('D03')) ? this.quatationRiders.getByKey(this.conf.rider('D03')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('D03')).premium):"" :"";
          this.rider.trLtAmount = this.quatationRiders.getByKey(this.conf.rider('D03')) ? this.quatationRiders.getByKey(this.conf.rider('D03')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('D03')).sum):"" :"";
          this.rider.trLtCheck = this.quatationRiders.getByKey(this.conf.rider('D03')) ? true:false;

          this.rider.tr44Insure = this.quatationRiders.getByKey(this.conf.rider('D02')) ? this.quatationRiders.getByKey(this.conf.rider('D02')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('D02')).premium):"" :"";
          this.rider.tr44Amount = this.quatationRiders.getByKey(this.conf.rider('D02')) ? this.quatationRiders.getByKey(this.conf.rider('D02')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('D02')).sum):"" :"";
          this.rider.tr44Check = this.quatationRiders.getByKey(this.conf.rider('D02')) ? true:false;

          this.rider.smartVipAmount = this.quatationRiders.getByKey(this.conf.rider('V')) ? this.quatationRiders.getByKey(this.conf.rider('V')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('V')).sum):"" :"";
          this.rider.smartVipInsure = this.quatationRiders.getByKey(this.conf.rider('V')) ? this.quatationRiders.getByKey(this.conf.rider('V')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('V')).premium):"" :"";
          this.rider.smartVipCheck = this.quatationRiders.getByKey(this.conf.rider('V')) ? true:false;

          this.rider.vpInsure = this.quatationRiders.getByKey(this.conf.rider('VP')) ? this.quatationRiders.getByKey(this.conf.rider('VP')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('VP')).premium):"" :"";
          this.rider.vpAmount = this.quatationRiders.getByKey(this.conf.rider('VP')) ? this.quatationRiders.getByKey(this.conf.rider('VP')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('VP')).sum):"" :"";
          this.rider.vpCheck = this.quatationRiders.getByKey(this.conf.rider('VP')) ? true:false;

          this.rider.vp5Insure = this.quatationRiders.getByKey(this.conf.rider('VP5')) ? this.quatationRiders.getByKey(this.conf.rider('VP5')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('VP5')).premium):"" :"";
          this.rider.vp5Check = this.quatationRiders.getByKey(this.conf.rider('VP5')) ? true:false;

          this.rider.KbInsure = this.quatationRiders.getByKey(this.conf.rider('KB2')) ? this.quatationRiders.getByKey(this.conf.rider('KB2')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('KB2')).premium):"" :"";//this.decimalPipe.transform(this.quatationRiders.getByKey('KB2').premium)
          this.rider.KbCheck = this.quatationRiders.getByKey(this.conf.rider('KB2')) ? true:false

          this.rider.sr2Insure = this.quatationRiders.getByKey(this.conf.rider('SR2')) ? this.quatationRiders.getByKey(this.conf.rider('SR2')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('SR2')).premium):"" :"";
          this.rider.sr2Amount = this.quatationRiders.getByKey(this.conf.rider('SR2')) ? this.quatationRiders.getByKey(this.conf.rider('SR2')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('SR2')).sum):"" :"";
          this.rider.sr2Check = this.quatationRiders.getByKey(this.conf.rider('SR2')) ? true:false;

          this.rider.spInsure = this.quatationRiders.getByKey(this.conf.rider('H')) ? this.quatationRiders.getByKey(this.conf.rider('H')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('H')).premium):"" :"";
          this.rider.spAmount = this.quatationRiders.getByKey(this.conf.rider('H')) ? this.quatationRiders.getByKey(this.conf.rider('H')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('H')).sum):"" :"";
          this.rider.spCheck = this.quatationRiders.getByKey(this.conf.rider('H')) ? true:false;

          this.rider.spgInsure = this.quatationRiders.getByKey(this.conf.rider('G')) ? this.quatationRiders.getByKey(this.conf.rider('G')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('G')).premium):"" :"";
          this.rider.spgAmount = this.quatationRiders.getByKey(this.conf.rider('G')) ? this.quatationRiders.getByKey(this.conf.rider('G')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('G')).sum):"" :"";
          this.rider.spgCheck = this.quatationRiders.getByKey(this.conf.rider('G')) ? true:false;

          this.rider.rpInsure = this.quatationRiders.getByKey(this.conf.rider('RP')) ? this.quatationRiders.getByKey(this.conf.rider('RP')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('RP')).premium):"" :"";
          this.rider.rpAmount = this.quatationRiders.getByKey(this.conf.rider('RP')) ? this.quatationRiders.getByKey(this.conf.rider('RP')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('RP')).sum):"" :"";
          this.rider.rpCheck = this.quatationRiders.getByKey(this.conf.rider('RP')) ? true:false;

          this.rider.rpgInsure = this.quatationRiders.getByKey(this.conf.rider('RPG')) ? this.quatationRiders.getByKey(this.conf.rider('RPG')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('RPG')).premium):"" :"";
          this.rider.rpgAmount = this.quatationRiders.getByKey(this.conf.rider('RPG')) ? this.quatationRiders.getByKey(this.conf.rider('RPG')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('RPG')).sum):"" :"";
          this.rider.rpgCheck = this.quatationRiders.getByKey(this.conf.rider('RPG')) ? true:false;

          this.rider.jpInsure = this.quatationRiders.getByKey(this.conf.rider('JP')) ? this.quatationRiders.getByKey(this.conf.rider('JP')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('JP')).premium):"" :"";
          this.rider.jpAmount = this.quatationRiders.getByKey(this.conf.rider('JP')) ? this.quatationRiders.getByKey(this.conf.rider('JP')).sum !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('JP')).sum):"" :"";
          this.rider.jpCheck = this.quatationRiders.getByKey(this.conf.rider('JP')) ? true:false;

          this.rider.hInsure = this.quatationRiders.getByKey(this.conf.rider('J0')) ? this.quatationRiders.getByKey(this.conf.rider('J0')).premium !== ""?this.decimalPipe.transform(this.quatationRiders.getByKey(this.conf.rider('J0')).premium):"" :"";
          let hAmount = this.quatationRiders.getByKey(this.conf.rider('J0')) ? this.quatationRiders.getByKey(this.conf.rider('J0')).sum !== ""?this.quatationRiders.getByKey(this.conf.rider('J0')).sum:"" :"";
          this.rider.hAmount = hAmount !== ""?this.decimalPipe.transform(Number(hAmount)*5000+5000):"";
          this.rider.hCheck = this.quatationRiders.getByKey(this.conf.rider('J0')) ? true:false; // สพ.เด็�?

      }

      this.appTypeForShow.idType = this.quatation.agentid;
      this.appTypeForShow.insuranceType = this.quatation.planname;
      this.appTypeForShow.insurancePlan = this.quatation.packageno; //�?ผนประ�?ัน
      this.appTypeForShow.insurancePaymentType =  mode;//ชำระเบี้ยประ�?ัน



      if(this.quatation.typeapp==='ULink'){
        if( this.quatation.endowmenttype === "1"){
          this.appTypeForShow.insuranceLifeTime =  Number(this.quatation.pendowmentyear) - Number(this.quatation.insureage);
        }else{
          this.appTypeForShow.insuranceLifeTime =  Number(this.quatation.pendowmentyear);//ระยะเวลาเอาประ�?ันภัย
        }
      }else{
        if( this.quatation.endowmenttype === "1"){
          //console.log("endowmenttype : ",this.quatation.endowmenttype);
          let insureage = Number(this.quatation.insureage);
          this.appTypeForShow.insuranceLifeTime =  Number(this.quatation.pendowmentyear)+insureage;
        } else {
          this.appTypeForShow.insuranceLifeTime =  Number(this.quatation.pendowmentyear);//ระยะเวลาเอาประ�?ันภัย
        }
      }



      this.appTypeForShow.insurancePaymentTime = Number(this.quatation.ppayyear);//ระยะเวลาชำระเบี้ย
      this.appTypeForShow.insuranceAmount = this.quatation.lifesum !== ""?this.decimalPipe.transform(this.quatation.lifesum):"";//ทุนประ�?ัน
      this.appTypeForShow.insureMain = this.quatation.lifepremium !== ""?this.decimalPipe.transform(this.quatation.lifepremium):"";//เบี้ยประ�?ันภัยหลั�?

      let totalpaypremium = this.totalpaypremium(this.quatation.typeapp , this.quatation.mode  , this.quatation.totalpremium ) ;
      this.paymentForSave.get('amount').setValue( totalpaypremium);

      this.appTypeForShow.insureTotal = this.quatation.totalpremium !== ""?this.decimalPipe.transform(this.quatation.totalpremium):"";//เบี้ยประ�?ันภัยรวม

     // this.paymentForSave.get('amount').setValue( this.quatation.totalpremium !== ""?this.quatation.totalpremium:"");

      //display ulink value UA01,UA02
      // this.quatation.lifepremium = this.decimalPipe.transform(this.quatation.lifesum);
      // this.quatation.lifesum = this.decimalPipe.transform(this.quatation.lifesum);

      this.appTypeForShow.savingpremium = this.quatation.savingpremium !== '' ?this.decimalPipe.transform(this.quatation.savingpremium):"";
      this.appTypeForShow.savingsum = this.quatation.savingsum !== '' ?this.decimalPipe.transform(this.quatation.savingsum):"";
      this.appTypeForShow.topuppremium = this.quatation.topuppremium !== '' ? this.decimalPipe.transform(this.quatation.topuppremium):"";

      this.appTypeForShow.KbAge =  this.quatation.quotationGuardianMs.length > 0 ?this.quatation.quotationGuardianMs[0].age:"";
      this.paymentForSave.get('amountForShow').setValue(this.decimalPipe.transform(totalpaypremium)) ;

      this.appData.getData().then((res: ApplicationMasterM) => {
        if(res){
          let fullname =
            this.quotationM.pname + ' '
            + this.quotationM.fname + ' '
            + this.quotationM.lname;

          if (this.quotationM && this.quotationM.pname && this.quotationM.fname && this.quotationM.lname) {
            // debugger;
            this.setFullnameInfo(this.quotationM.insureage, "ผู้ชำระเบี้ยประกันภัย",this.quotationM.pname, this.quotationM.fname,this.quotationM.lname);
          }
          if(res.paymentMs.length > 0){

            console.log("A ->", res.paymentMs[0]);

            if((res.paymentMs[0].paymenttitle
            || res.paymentMs[0].paymentname
            || res.paymentMs[0].paymentlastname )
            ) {

              fullname = res.paymentMs[0].paymenttitle + ' '
              + res.paymentMs[0].paymentname + ' '
              + res.paymentMs[0].paymentlastname;
              // alert(fullname);
              // debugger;
              this.setFullnameInfo(this.quotationM.insureage, "ผู้ชำระเบี้ยประกันภัย",res.paymentMs[0].paymenttitle, res.paymentMs[0].paymentname,res.paymentMs[0].paymentlastname);
            }
            let paymentslipno = res.paymentMs[0].paymentslipno ? res.paymentMs[0].paymentslipno :'';
            this.paymentForSave.get('paymentname').setValue(fullname ? fullname: '');
            this.paymentForSave.get('paymentrelation').setValue(res.paymentMs[0].paymentrelation);
            this.paymentForSave.get('paymentslipno').setValue(paymentslipno);
            this.paymentForSave.get('firstname').setValue(res.paymentMs[0].paymentname ? res.paymentMs[0].paymentname :this.quotationM.fname);
            this.paymentForSave.get('lastname').setValue(res.paymentMs[0].paymentlastname ? res.paymentMs[0].paymentlastname :this.quotationM.lname);
            this.paymentForSave.get('prename').setValue(res.paymentMs[0].paymenttitle ? res.paymentMs[0].paymenttitle :this.quotationM.pname);
           //this.paymentForSave.controls['amount'].setValue(res.paymentMs[0].amount);

            this.paymentForSave.get('amountForShow').setValue(this.decimalPipe.transform(totalpaypremium));
            this.paymentForSave.get('paymenttype').setValue(res.paymentMs[0].paymenttype);// ชำระเป็น
            this.paymentForSave.get('paymenttypedesc').setValue(res.paymentMs[0].paymenttypedesc);// ค่า Input อื่นๆ
            // เปิด checkbox tax
            if (res.paymentMs[0].taxreduceflag.toUpperCase() == 'Y')
              this.paymentForSave.controls['intertax'].enable();
            this.paymentForSave.get('taxreduceflag').setValue(res.paymentMs[0].taxreduceflag.toUpperCase()); // ใช้สิทธิยกเว้นภาษีเงินได้ check: y,n
            if (res.paymentMs[0].personidtax != '') {
              this.paymentForSave.get('intertax').setValue(true);
              this.personidtaxChange();
            }
            this.paymentForSave.get('personidtax').setValue(res.paymentMs[0].personidtax); // เลขประจำตัวผู้เสียภาษีต่างชาติ
            // this.personidtax = res.paymentMs[0].personidtax;
            // if ( res.paymentMs[0].personidtax!= '')
            // {
            //   this.paymentForSave.get('intertax').setValue(true);
            // }
          }
        }
      },
      (err)=> {
        console.log('Err : ', err);
      });
    }
  }

  public totalpaypremium(typeapp : string , modepay : string , premiumpay : string ) {
      if (typeapp == "PER" && modepay == "0" )
        return  Number(premiumpay)*2;
      else
        return  Number(premiumpay);
  }

  get paymenttitle () {
    return this.paymentForSave.get('paymenttitle');
  }
  get paymentname () {
    return this.paymentForSave.get('paymentname');
  }
  get paymentlastname () {
    return this.paymentForSave.get('paymentlastname');
  }
  get paymenttype () {
    return this.paymentForSave.get('paymenttype');
  }
  get paymenttypedesc() {
    return this.paymentForSave.get('paymenttypedesc');
  }
  get paymentrelation() {
    return this.paymentForSave.get('paymentrelation');
  }
  get paymentslipno() {
    return this.paymentForSave.get('paymentslipno');
  }

  /*
   check value after init
  */
  ngAfterViewInit(): void {
  //this.paymentForSave.get('paymentname').valueChanges.subscribe(data =>{console.log("paymentname : ", data)});
    this.paymentForSave.get('paymenttype').valueChanges.subscribe(data => {
      if(data === "1"){
        this.paymentForSave.get('paymenttypedesc').clearValidators();
        this.paymentForSave.get('paymenttypedesc').setValue('');//clear input value
      }
      if(data === "2"){
        this.paymentForSave.get('paymenttypedesc').setValidators(Validators.required);
        this.paymentForSave.get('paymenttypedesc').updateValueAndValidity();
      }
    });
  }

  /**
   * เลือก / ไม่เลือก ภาษี
   * @param checked
   */
  private taxreduceflag(checked: boolean) {

    // this.paymentForSave.get('personidtax').setValue('');
    // // ไม่เลือก
    // if (!checked) {
    //   this.paymentForSave.get('intertax').setValue(false);
    //   this.paymentForSave.get('intertax').disable();
    //   this.paymentForSave.get('personidtax').disable();

    // }
    // else
    // {
    //    if (/*this.nationality != 'THA'*/ this.appData.appGeneral.controls['nationality'].value != 'THA'){
    //       this.paymentForSave.get('intertax').setValue(true);
    //       this.paymentForSave.get('personidtax').enable();
    //    }
    //    else
    //    {
    //       // console.log('== THA');
    //       this.paymentForSave.get('intertax').setValue(false);
    //       this.paymentForSave.get('personidtax').disable();
    //    }
    // }

    // เลือก เปิดให้คลิก checkbox
    if (checked) {

      // สัญชาติไทย
      if (this.appData.appGeneral.controls['nationality'].value == 'THA')
        this.paymentForSave.controls['intertax'].enable();

      // สัญชาติอื่นๆ
      else {
        this.paymentForSave.controls['intertax'].setValue(true);
        this.paymentForSave.controls['intertax'].disable();
        this.personidtaxChange();
      }
    }
    // ไม่เลือก ปิดให้คลิก checkbox
    else {
      this.paymentForSave.controls['intertax'].disable();
      this.paymentForSave.get('intertax').setValue(false);
      this.paymentForSave.get('personidtax').setValue('');

      this.personidtaxChange();
    }
  }

  /**
   * ผู้เอาประกันเป็นชาวต่างชาติ ระบุเลขประจำตัวผู้เสียภาษี
   */
  private personidtaxChange():void{

    //alert(this.paymentForSave.controls['intertax'].value);
    if (this.paymentForSave.controls['intertax'].value) {
      this.paymentForSave.get('personidtax').enable();
    }
    else {
      this.paymentForSave.get('personidtax').setValue('');
      this.paymentForSave.get('personidtax').disable();
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.broadcaster.broadcast('appStep', 0);
  }

    //ความคุ้มครอง Ulink
  checkUlinkCoverage(quatation){
      let listPlan = ['UA01']
      if(listPlan.includes(quatation.plancode)){
        return true;
      }else{
        return false;
      }
  }

  renderPlanCodeUlink(insuranceType,plancode){
    if(insuranceType){
      return insuranceType.replace(`[${plancode}]`, '').trim();
    }
    return insuranceType;
  }


  //เป็น Ulink หรือไม่
  isUlink(quatation){
      let listPlan = ['UA01','UA02']
      if(listPlan.includes(quatation.plancode)){
        return true;
      }else{
        return false;
      }
  }

}

export class Dictionary<T> {
    private items = [];

    add(key: string, value: T) {
      this.items.push(value);
      this.items[key] = value;
    }

    getByIndex(index: number) {
      return this.items[index];
    }

    getByKey(key: string) {
      return this.items[key];
    }
}
