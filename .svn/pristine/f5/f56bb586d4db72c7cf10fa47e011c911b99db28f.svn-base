import { ValidateProvider } from './../../providers/validate/validate';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { UniversalLifePdfModel } from './../../providers/universal-life-data/universal-life-pdf-model';
import { PdfViewdataPage } from './../pdf-viewdata/pdf-viewdata';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { Broadcaster } from '../../providers/utility/broadcaster';
import { UniversalLifeSaleofferPage } from './universal-life-saleoffer/universal-life-saleoffer';
import { UniversalLifeDataProvider} from '../../providers/universal-life-data/universal-life-data';
import { Subscription } from 'rxjs';
import { ProspectModel } from '../../providers/prospect/prospect-model';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { ApiProvider } from '../../providers/api/api';
import { FunctionName} from '../../providers/constants/function-name';
import { ApplicationpdfM } from '../../providers/service-table/application-pdf-model';
import { RequestModel } from '../../providers/model/request-model';
import { ResponseModel } from '../../providers/model/response-model';
import { CommonUtilProvider } from '../../providers/common-util/common-util';
import { RiderConfig } from '../../providers/rider/rider-config';
import { PopupPlanDetailComponent } from '../../components/utility/popup-plan-detail/popup-plan-detail';
import { ServiceName } from '../../providers/constants/service-name';
import { QuotationModel } from '../../providers/quotation/quotation-model';
import { UniversalLifeBenefitPage } from './universal-life-benefit/universal-life-benefit';



@IonicPage({
  segment: 'Universal Life'
})
@Component({
  selector: 'page-universal-life',
  templateUrl: 'universal-life.html',
})
export class UniversalLifePage implements OnDestroy{
  
  private subscription: Array<Subscription> = [];
  private planAll:any;
  private ageMoreOneMonth:boolean = false;
  private insuranceType: string = "";
  private payType: number = 1;//default val if unselect
  private step: number = 1;
  private prospect : any;
  private prospectForReset : any;
  private insuranceSum = 0;//เบี้ยประกันภัยรวม
  private stepsPage = [
    {
      id:0,
      root: UniversalLifeBenefitPage,
      title: 'ตัวอย่างผลประโยชน์',
      icon: 'icon-ion-eye',
      disabled: true
    },
    {
      id:1,
      root: UniversalLifeSaleofferPage,
      title: 'ทำใบเสนอขาย',
      icon: 'icon-ion-calculator',
      disabled: false
    }
  ];
  /**
   * ตัวแปร disable ปุ่ม save หลังจากกดปุ่มบันทึก
   */
  private disableSaveButton : boolean = false;

  private showFooter: boolean = false;

  private rider : object;

  private callPdfData: UniversalLifePdfModel;

  private old_callPdfData: UniversalLifePdfModel;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private broadcaster: Broadcaster,
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private apiProvider: ApiProvider,
    private commonUtilProvider: CommonUtilProvider,
    private universalLifeData: UniversalLifeDataProvider,
    private riderConf: RiderConfig,
    private modalCtrl: ModalController,
    private validator: ValidateProvider) {

      // set ค่าใช้ครั้งแรก
      this.prospect = this.navParams.get('prospect');
      this.universalLifeData.prospect = this.prospect;
      this.universalLifeData.quotationul = undefined;
      this.universalLifeData.resetDataUl = false;

      this.broadcaster.broadcast('universalLifeInsuranceType', this.insuranceType);


      this.subscription.push(
        this.broadcaster.on('insuranceSum').subscribe(res => {
          this.insuranceSum = res;
        })
      );

      this.subscription.push(
        this.broadcaster.on('prospect').subscribe(res => {
          this.prospect = res;

          if(this.insuranceType !== ""){
           let age  =  this.prospect.age;
           if(this.validateAge() == false){
              //reset data
           
           this.insuranceType = "";
           this.broadcaster.broadcast('universalLifeInsuranceType',this.insuranceType);
           this.payType = 1
           this.universalLifeData.paymentType = this.payType;
           
           this.insuranceSum = 0;
           this.universalLifeData.resetData();
           this.broadcaster.broadcast('resetDataFlag', true);
           }
          }
        })
      );

    this.subscription.push(
      this.broadcaster.on('payType').subscribe(res => {
        this.payType = res;
      })
    );

    this.subscription.push(
      this.broadcaster.on('old_callPdfData').subscribe(res => {
        this.old_callPdfData = res;
      })
    );

    //get planAll 10/1,10/10,90/90
    //let reqModel: RequestModel = new RequestModel();
    //reqModel.functionName = FunctionName.ULPLAN;
    //reqModel.serviceName = ServiceName.SELECT;
   // this.apiProvider.callData(reqModel).then((res: any)  => {
      //  if (res.data.length > 0) {
      //    this.planAll = res.data;
      //  }
    //  }, err => {
    //  this.alertCtrl.error(err);
    //  }
    //);

    //set editData
    if(this.universalLifeData.editData){
      this.setEditData();
    }
  }
   ngAfterViewInit() {
    //get planAll 10/1,10/10,90/90
    let reqModel: RequestModel = new RequestModel();
    reqModel.functionName = FunctionName.ULPLAN;
    reqModel.serviceName = ServiceName.SELECT;
     this.apiProvider.callData(reqModel).then((res: any)  => {
        if (res.data.length > 0) {
         this.planAll = res.data;
        }
      }, err => {
      this.alertCtrl.error(err);
      }
    );
  }

  ionViewDidLoad() {
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
  private selectStep(index: number) {
    let showSaleOfferPage:boolean = false;
    if (typeof index == 'number') {
      this.step = index;
    }
  }

  private changeInsuranceType(insuranceType:string): void {

   let validateAge =  this.validateAge();

    if(validateAge){
      this.insuranceType = insuranceType;
      this.universalLifeData.insuranceType = insuranceType;
      this.universalLifeData.insuranceSum = 0;
      this.broadcaster.broadcast('universalLifeInsuranceType',this.insuranceType);
    } else {
      setTimeout(() => {
        this.insuranceType = "";
        this.broadcaster.broadcast('universalLifeInsuranceType',this.insuranceType);
      },20);
    }
     //reset data
     this.payType = 1;
     this.universalLifeData.paymentType = this.payType;
     this.insuranceSum = 0;
     this.universalLifeData.resetData();
     this.broadcaster.broadcast('resetDataFlag', true);
  }

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

  private validateAge() :boolean{
    this.ageMoreOneMonth = this.checkMonthByBirthdate(this.prospect.birthDate);
    if(typeof this.planAll != 'undefined') {

      for (let data of this.planAll){
        let ageRes = Number(data.maxage);
        let agePros = Number(this.prospect.age);
  
        if(this.ageMoreOneMonth == false){
          if( (data['plancode']=='UZA') && (this.insuranceType =='UZA')){//10/1
            this.alertCtrl.warning("ผู้มุ่งหวังไม่อยู่ในช่วงการรับประกัน ( 1 เดือน"+  " - " +data.maxage+" อายุ/ปี ) โปรดเลือกแบบประกันใหม่");
            return false;
          } else if ( (data['plancode']=='UEA') && (this.insuranceType =='UEA')){//10/10
            this.alertCtrl.warning("ผู้มุ่งหวังไม่อยู่ในช่วงการรับประกัน ( 1 เดือน"+  " - " +data.maxage+" อายุ/ปี ) โปรดเลือกแบบประกันใหม่");
            return false;
          } else if ((data['plancode']=='UWA') && (this.insuranceType =='UWA') ){//90/90
            this.alertCtrl.warning("ผู้มุ่งหวังไม่อยู่ในช่วงการรับประกัน ( 1 เดือน"+  " - " +data.maxage+" อายุ/ปี ) โปรดเลือกแบบประกันใหม่");
            return false;
          }
        } else {
          if( ( agePros > ageRes) &&  (data['plancode']=='UZA') && (this.insuranceType =='UZA')){
            this.alertCtrl.warning("ผู้มุ่งหวังไม่อยู่ในช่วงการรับประกัน ( 1 เดือน"+  " - " +data.maxage+" อายุ/ปี ) โปรดเลือกแบบประกันใหม่");
            return false;
          } else if ( ( agePros > ageRes) &&  (data['plancode']=='UEA') && (this.insuranceType =='UEA')){
            this.alertCtrl.warning("ผู้มุ่งหวังไม่อยู่ในช่วงการรับประกัน ( 1 เดือน"+  " - " +data.maxage+" อายุ/ปี ) โปรดเลือกแบบประกันใหม่");
            return false;
          } else if ( (agePros > ageRes) && (data['plancode']=='UWA') && (this.insuranceType =='UWA') ){
            this.alertCtrl.warning("ผู้มุ่งหวังไม่อยู่ในช่วงการรับประกัน ( 1 เดือน"+  " - " +data.maxage+" อายุ/ปี ) โปรดเลือกแบบประกันใหม่");
            return false;
          }
        }
      }
    }
    return true;
  }
  
  private async resetData(){

    
    this.insuranceSum = 0;
    this.universalLifeData.resetData();
    this.broadcaster.broadcast('resetDataFlag', true);

    //setTimeout(() => {
      this.insuranceType = "";
      this.broadcaster.broadcast('universalLifeInsuranceType',this.insuranceType);
      this.prospect.birthDate = moment().add(-30, 'year').format('YYYY-MM-DD');
      this.prospect.citizenID="";
      this.prospect.firstName="";
      this.prospect.gender="F";
      this.prospect.lastName="";
      this.prospect.mobilephone="";
      this.prospect.occupationType="2";
      this.prospect.plan="EQ";
      this.prospect.preName="นางสาว";
    //},30);
  }

  
  private openPdf() {

    this.universalLifeData.insuranceSum = this.insuranceSum;
    this.universalLifeData.prospect = this.prospect;
    this.universalLifeData.paymentType = this.payType;

    const validateProspect = this.validator.validateProspect(this.prospect, true, true, false);

    if(validateProspect && this.universalLifeData.validateData()){

      this.loadingCtrl.present();

      this.storage.get('tlpromptMode').then(async mode => {
        this.storage.get('loginProfile').then(async profile => {
  
          let formData: UniversalLifePdfModel = new UniversalLifePdfModel();

          formData.pcode = this.insuranceType;
          formData.preName = this.prospect.preName;
          formData.firstName = this.prospect.firstName;
          formData.lastName = this.prospect.lastName;
          formData.age = String(this.prospect.age);
          formData.sex = this.prospect.gender;

          formData.mode = String(this.universalLifeData.paymentType);
          formData.tppay = "";
          formData.special ="0";

          formData.premiumMaster = String(this.universalLifeData.mainInsurance);
          formData.lifeSum = String(this.universalLifeData.insurance);

          formData.pNameBy = profile.pName;
          formData.fNameBy = profile.fName;
          formData.lNameBy = profile.lName;
          formData.branchName = profile.branch;

          formData.tel = profile.tel;
          formData.idCard = this.prospect.citizenID;
          formData.aorb = "B"; // no Ref
          formData.refNo = "";

          if(this.insuranceType != "UZA"){
            if(this.universalLifeData.topupType === "99"){
              formData.tppay = "N"
            }else{
              formData.tppay = this.universalLifeData.topupType;
            }

            if(this.universalLifeData.topupType == "1" || this.universalLifeData.topupType == "Y"){
              formData.special = String(this.universalLifeData.topup);
            }

            let riderSelectedList: Array<any> = this.getRiderSelected();
            formData.riderList = riderSelectedList;

          }

          // ste default
          formData.flag = "";
          formData.quotationStatus = "";
          formData.quotationno = "";
          formData.customerid = "";

          
          this.callPdfData = formData;

          if(this.old_callPdfData != undefined){

           
            if(this.isEquivalent(this.callPdfData, this.old_callPdfData)){
              
              this.callPdfData = this.old_callPdfData;
              this.callPdfData.quotationStatus = "R";
            }
            
          }else{
            this.old_callPdfData  = undefined;
          }

  
          let reqModel: RequestModel = new RequestModel();
          reqModel.agentid = profile.agentid;
          reqModel.mode = mode;
          reqModel.functionName = FunctionName.UNIVERSAL_LIFE_PDF;
          reqModel.param = [this.callPdfData];

          this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
            (res: any) => {
  
              if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
                const rawdata = res.datas[0].binaryQuotationPDF;

                const pdfData = "data:application/pdf;base64," + rawdata;
                let data = { 
                  showReqRefButton: true, 
                  callPdfData: this.callPdfData, 
                  pdfDetail: {
                    pageTotal: res.pageTotal,
                    pdfName : res.datas[0].pdfFileName,
                    src: pdfData,
                  },
                  planCode : this.insuranceType
                };
                this.navCtrl.push(PdfViewdataPage, data);
              }
              else{
              console.error("No PDF File");
              this.alertCtrl.error("No PDF File");
              } 
  
              this.loadingCtrl.dismiss();
  
            },
            (err) => {
              console.error("Call Service PDF Error : ", err);
              this.alertCtrl.error(err);
              this.loadingCtrl.dismiss();
            }
          );
        });
      });

    }

   
  }

  private getRiderSelected(): Array<any> {

    let riderSelectedList: Array<any> = [];
    let riderkey: Array<string> = [];
    let dataList: Array<any> = [];

    this.rider = this.universalLifeData.rider;
    for (let key in this.rider) {
      if(key != 'occupation'){
        let sum = Number(this.rider[key].sum);
        if(sum > 0){
          const data = [key, this.rider[key]];
          dataList.push(data);
        }
      }
    }

    for( let data of dataList){

      if(data[0] != 'occupation'){

        let riderName = data[0];
        let riderDetail = String(data[1].sum);
        let riderPremium = String(Number(data[1].premium));

        if(data[0] == 'G'){
          switch(riderDetail) { 
            case "2000": { 
              riderDetail = "G11";
              break; 
            } 
            case "4000": { 
              riderDetail = "G12";
              break;
            }
            case "6000": { 
              riderDetail = "G13";
              break; 
            }
            case "8000": { 
              riderDetail = "G14";
              break;  
            }
            case "10000": { 
              riderDetail = "G15";
              break;
            }  
          }
        } else if(data[0] == 'J0'){
          switch(riderDetail) { 
            case "1": { 
              riderDetail = "J01";
              break; 
            } 
            case "2": { 
              riderDetail = "J02";
              break;
            }
            case "3": { 
              riderDetail = "J03";
              break; 
            }
          }
        }


        const rider = {
          riderName: riderName,
          riderDetail: riderDetail,
          riderPremium: riderPremium  
        }
        riderSelectedList.push(rider);
      }
    }

    return riderSelectedList;

  }

  private isEquivalent(newData, oldData) {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(newData);
    const bProps = Object.getOwnPropertyNames(oldData);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

        if(propName != "refNo" 
            && propName != "aorb" 
            && propName != "riderList" 
            && propName != "flag" 
            && propName != "quotationStatus" 
            && propName != "quotationno"
            && propName != "customerid"){
          if (newData[propName] !== oldData[propName]) {
            return false;
          }
        }
      
        if(propName == "riderList" ){

          let newDataRiderkey: Array<string> = [];
          let oldDataRiderkey: Array<string> = [];

         
          if (newData[propName].length != oldData[propName].length) {
            return false;
          }


          for( let data of newData[propName]){

            newDataRiderkey.push(data["riderName"]);
          }

          for( let data of oldData[propName]){

            oldDataRiderkey.push(data["riderName"]);
          }

          for( let data of newDataRiderkey){

            if(oldDataRiderkey.indexOf(data) == -1){
              return false;
            }
            else {

              const newdata = newData[propName].filter(function(item){
                return item.riderName == data;
              });

              const olddata = oldData[propName].filter(function(item){
                return item.riderName == data;
              });

              if(newdata[0].riderDetail !== olddata[0].riderDetail) return false;
              if(newdata[0].riderPremium !== olddata[0].riderPremium) return false;

            }
          }
        } 
    }
    return true;
}

  private popup(): void {
    let modal: Modal = this.modalCtrl.create(PopupPlanDetailComponent,{ plancode : this.insuranceType});
    modal.present();
  }


  private planSelect (plancode : string) { 

    let result : Array<any> = this.planAll;
    let data : Array<any> = result.filter((item,index)=>{
        return item.plancode.indexOf(plancode) > -1
    }); 
    if(data.length > 0){
      let uldetail: Array<any> = data;

      this.universalLifeData.paytype =  data[0].paytype;
      this.universalLifeData.payyear = data[0].ppayyear;
      this.universalLifeData.edowntype = data[0].endowmenttype;
      this.universalLifeData.edownyear = data[0].pendowmentyear;
      this.universalLifeData.insuranceName = data[0].planname+" ["+data[0].plancode + "]";
    }
    
  }

  private async saveData() {
    
    await this.planSelect(this.insuranceType);
    
    this.disableSaveButton = true;
    this.universalLifeData.insuranceSum = this.insuranceSum;
    this.universalLifeData.prospect = this.prospect;
    this.universalLifeData.paymentType = this.payType;

    const validateProspect = this.validator.validateProspect(this.prospect, true, true, false);

    if(validateProspect) await this.universalLifeData.saveData();
    this.disableSaveButton = false;
    this.old_callPdfData= undefined;
    this.callPdfData = undefined;
  }

  private setEditData(){

    if(typeof this.navParams.get('quotationUniversalLife') != 'undefined') {
      let quotation = this.navParams.get('quotationUniversalLife');
      
      this.insuranceType = quotation['plancode'];
      this.broadcaster.broadcast('universalLifeInsuranceType',this.insuranceType);
      this.insuranceSum = quotation['totalpremium'];
      this.payType = Number(quotation['mode']);

      this.universalLifeData.insuranceType = this.insuranceType;
      this.universalLifeData.insuranceSum = this.insuranceSum;
      this.universalLifeData.quotationul = quotation;
      this.universalLifeData.paymentType = this.payType;

      //set pdf
      const refNo = quotation['referenceno'];
      if(refNo != ''){

        this.storage.get('tlpromptMode').then(async mode => {
          this.storage.get('loginProfile').then(async profile => {

            this.old_callPdfData = new UniversalLifePdfModel();

            this.old_callPdfData.pcode = this.insuranceType;
            this.old_callPdfData.preName = this.prospect.preName;
            this.old_callPdfData.firstName = this.prospect.firstName;
            this.old_callPdfData.lastName = this.prospect.lastName;
            this.old_callPdfData.age = String(this.prospect.age);
            this.old_callPdfData.sex = this.prospect.gender;
    
            this.old_callPdfData.mode = String(this.universalLifeData.paymentType);
            this.old_callPdfData.tppay = "";
            this.old_callPdfData.special ="0";
    
            this.old_callPdfData.premiumMaster = String(this.universalLifeData.mainInsurance);
            this.old_callPdfData.lifeSum = quotation['lifesum'];//String(this.universalLifeData.insurance);
    
            this.old_callPdfData.pNameBy = profile.pName;
            this.old_callPdfData.fNameBy = profile.fName;
            this.old_callPdfData.lNameBy = profile.lName;
            this.old_callPdfData.branchName = profile.branch;
    
            this.old_callPdfData.tel = profile.tel;
            this.old_callPdfData.idCard = this.prospect.citizenID;
            this.old_callPdfData.aorb = "A";
            this.old_callPdfData.refNo = refNo;
    
            if(this.insuranceType != "UZA"){
              if(this.universalLifeData.topupType === "99"){
                this.old_callPdfData.tppay = "N"
              }else{
                this.old_callPdfData.tppay = this.universalLifeData.topupType;
              }
    
              if(this.universalLifeData.topupType == "1" || this.universalLifeData.topupType == "Y"){
                this.old_callPdfData.special = String(this.universalLifeData.topup);
              }
    
              setTimeout(() => {
                let riderSelectedList: Array<any> = this.getRiderSelected();
                this.old_callPdfData.riderList = riderSelectedList;
              }, 1000);
            }
    
            // set default
            this.old_callPdfData.flag = "2";
            this.old_callPdfData.quotationStatus = "R";
            this.old_callPdfData.quotationno = quotation['quotationno'];
            this.old_callPdfData.customerid = quotation['customerid'];
          });
        });
      }
    }
  }
}