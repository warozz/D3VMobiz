import { ProspectModel } from './../../../providers/prospect/prospect-model';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApplicationData } from '../../../providers/application/application-data';
import { ApplicationMasterM } from '../../../providers/application/application-master-model';
import _ from "lodash";
import { MCAapplicationsM} from '../../../providers/service-table/mcaapplications-model';
import { UlinkAppformDataProvider } from '../../../providers/ulink-appform-data/ulink-appform-data';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import { CommonUtilProvider } from '../../../providers/common-util/common-util';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { RequestModel } from '../../../providers/model/request-model';
import { ServiceName } from '../../../providers/constants/service-name';
import { FunctionName } from '../../../providers/constants/function-name';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';
import { DateFormatProvider } from '../../../providers/date-format/date-format';
import { FullNameInfo } from '../../../directives/utility/fullname-popup/fullname-info';
import { UlinkLifePremium } from '../../../providers/ulink-appform-data/unitlink-premium-model';
import { UlinkAllocateProvider } from '../../../providers/ulink-app-data/ulink-allocate-data';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { UlinkApplicationFormM } from '../../../providers/ulink-app-data/ulink-application-form-model';

@IonicPage({
  segment: 'ใบคำร้องเกี่ยวกับเบี้ยประกันภัย'
})
@Component({
  selector: 'page-app-lifepremium-ulink',
  templateUrl: 'app-lifepremium-ulink.html',
})
export class AppLifepremiumUlinkPage {
  /**
   * ใบเสนอขาย หน้าแรกที่ทำการเลือก
   */
  private quotation: any;
      /**
   * แถบที่กำลังเข้าถึง
   */
  private selectedStep: number = 0;
  private oldIndex: number = -1;
  /**
   * ข้อมูลรายละเอียดใบคำขอทั้งหมด ApplicationMasterM
   */
  private applicationMasterM: ApplicationMasterM = new ApplicationMasterM();
  private mcaapplication:MCAapplicationsM;
  private fullnameInfo_witness1: FullNameInfo = new FullNameInfo();
  private fullnameInfo_witness2: FullNameInfo = new FullNameInfo();;
  private ulinkLifePremium: UlinkLifePremium  = new UlinkLifePremium();
  private lifePremiumRes:UlinkLifePremium;//รับค่าตอน select กลับ
 /**
   * Tab1:การชำระเบี้ยประกันภัย
   */
  private app_lifepremiun_ulink_tab1Data: FormGroup;
  private customerDetail:FormGroup;
  private customerSign_tab2Data:FormGroup;
  private appForm1: FormGroup;
  

  private plan_code: string = '';
  

  private riskprofileScore : number = 0;
  private riskprofileLevel : string = '';

  private allocationArray :  Array<Object> = [];
  private allocationRSP : Array<Object> = [];
  private allocationRPP : Array<Object> = [];
  private allocationTopPremium : Array<Object> = [];

  private rppchoice: string = '';
  private rspchoice: string = '';
  private topchoice: string = '';
  private signType:string = '';

  private allocationData : Object;

  private allocationByCustomerId: any;

  private allocationStatus : Array<UlinkApplicationFormM>;
  private riskProfileStatus : Array<UlinkApplicationFormM>;


  constructor(
    public navCtrl: NavController,
    private storage: Storage, 
    private app : ApplicationData,
    private fb: FormBuilder,
    private appFormData: UlinkAppformDataProvider,
    private appData: ApplicationData,
    private commonUtilProvider: CommonUtilProvider,
    private loadingCtrl: LoadingDirective,
    private decimalPipe:DecimalPipe,
    private dateFormat: DateFormatProvider,
    private toastCtrl: ToastController,
    private ulinkAllocateData: UlinkAllocateProvider,
    private ulinkAppData: UlinkAppDataProvider, 
    private alertCtrl: AlertDirective,
  ) {
      //reset flag
      this.appFormData.updateCustomerSign = false;

      this.quotation = this.app.getQuotation();//ข้อมูลจากใบเสนอขาย
      console.log('this.app ---> ', this.app);
      console.log("ใบเสนอขาย : ",this.app.getQuotation());
      this.plan_code = this.quotation.plancode;


      this.applicationMasterM = _.get(this.app, 'applicationMasterM', new ApplicationMasterM);//ข้อมูลจากใบคำขอ
      console.log("ใบคำขอ : ",this.applicationMasterM);
      this.allocationStatus =  this.ulinkAppData.ulinkApplicationFormList.filter(item => item.formtype == 'allocation'); //get Formtype and status
      this.riskProfileStatus =  this.ulinkAppData.ulinkApplicationFormList.filter(item => item.formtype == 'riskprofile'); //get Formtype and status
      console.log("allocationStatus : ",this.allocationStatus);

      this.customerDetail = this.fb.group({
        // ผู้เอาประกันภัย
        customername: { value: '', disabled: true },
        // เพศ
        gender: { value: '', disabled: true },
        // อายุ
        age: { value: '', disabled: true },
        // แบบประกัน
        planname:  { value: '', disabled: true },
        // ชำระเบี้ย
        payment: { value: '', disabled: true },
        // ชั้นอาชีพ
        occupationtype: { value: '', disabled: true }
        
      });

      this.app_lifepremiun_ulink_tab1Data = this.fb.group({
        singlepremium: { value: '', disabled: true },// singlepremium UA01
        RPP: { value: '', disabled: true },
        RSP: { value: '', disabled: true },
        topuppremium:  { value: '', disabled: true },
        question1: [{ value: '', disabled: true }],
        question2: [{ value: '', disabled: true }],
        question3: [{ value: '', disabled: true }],
       
      });

      this.customerSign_tab2Data = this.fb.group({// singlepremium UA01
        signPlace: ['', Validators.required],
        date: { value: '', disabled: true },
        witnessName1: ['', Validators.required],
        witnessName2:  ['', Validators.required],
        customername: { value: '', disabled: true }
      });

      this.appForm1 = this.fb.group({
        prename1: ['', Validators.required],
        firstname1: ['', Validators.required],
        lastname1: ['', Validators.required],
        prename2: ['', Validators.required],
        firstname2: ['', Validators.required],
        lastname2: ['', Validators.required],
      });

      
  
      this.setFullnameInfo('25', "ระบุพยาน", '', '', '');
      this.getCustomerDetail();
      this.getPremiums();
      this.setTab1();
      this.setTab2(); 
      //this.getRiskProfileFromService();
      this.getAllocation();

  }

  ngAfterViewInit(): void {
    this.customerSign_tab2Data.get('signPlace').valueChanges.subscribe(data => {
      console.log("signPlace : ",data);
    });
  }

  private getCustomerDetail(){
    this.mcaapplication = this.applicationMasterM.mcaapplicationM;
    let customername:string ='';
    if( this.mcaapplication.insurename ){
      customername = this.mcaapplication.insuretitle + " "+ this.mcaapplication.insurename + " " +this.mcaapplication.insurelastname;

    } else {
      customername =this.quotation.pname+" "+ this.quotation.fname +" "+ this.quotation.lname; 
    }
    this.customerDetail.get('customername').setValue(customername);
    this.customerDetail.get('gender').setValue(this.quotation.gender == 'M'? 'ชาย' : 'หญิง');
    this.customerDetail.get('age').setValue(this.quotation.insureage);
    this.customerDetail.get('planname').setValue(this.quotation.planname);
    this.customerDetail.get('payment').setValue(this.appFormData.getTextMode(this.quotation.mode));
    this.customerDetail.get('occupationtype').setValue(this.quotation.occupationtype);

    console.log("customerDetail : ",this.customerDetail.getRawValue());
  }

  private getPremiums(){
    console.log("this.quotation ====>",this.quotation);
    this.app_lifepremiun_ulink_tab1Data.get('singlepremium').setValue(this.decimalPipe.transform(this.quotation.lifepremium));
    this.app_lifepremiun_ulink_tab1Data.get('RSP').setValue(this.decimalPipe.transform(this.quotation.savingpremium));
    this.app_lifepremiun_ulink_tab1Data.get('RPP').setValue(this.decimalPipe.transform(this.quotation.lifepremium));
    this.app_lifepremiun_ulink_tab1Data.get('topuppremium').setValue(this.decimalPipe.transform(this.quotation.topuppremium));
    console.log("app_lifepremiun_ulink_tab1Data : ",this.app_lifepremiun_ulink_tab1Data.getRawValue());
  }

  private setTab1(){

  }

  private setTab2(){
    let nowDate:string = this.dateFormat.dateFormatShotTh1 (moment(new Date()).format("YYYY-MM-DD"),"S");
    let date:string = this.dateFormat.dateFormatShotTh1 (this.mcaapplication.updatedate,"S");
    this.customerSign_tab2Data.get('date').setValue(this.mcaapplication.updatedate? date:nowDate);
    let name:string  = '' ;
    if(this.mcaapplication.insurename){
      name = this.mcaapplication.insuretitle + " "+ this.mcaapplication.insurename+" "+ this.mcaapplication.insurelastname; //จากใบคำขอ
    } else {
      name = this.quotation.pname+" "+this.quotation.fname+" "+ this.quotation.lname //จากใบเสนอขาย
    }

    this.customerSign_tab2Data.get('customername').setValue(name);//ถ้ามีค่าจากใบคำขอเอาจากใบคำขอ
    
    this.getUlinkLifePremium();

  }
  /**
   * select  UlinkLifePremium 
   */
  private getUlinkLifePremium(){
    this.appFormData.getUlinkLifePremium(this.mcaapplication.applicationid).then(
      (res) => {
        console.log('getUlinkLifePremium RES --->',res);
        let datas = res['data'];
        if(datas.length > 0){
          if(datas[0] != null){
            this.appFormData.updateCustomerSign = true;

            this.lifePremiumRes = datas[0];
            console.log(" this.lifePremiumRes  ===> ", this.lifePremiumRes );
            this.customerSign_tab2Data.get('signPlace').setValue( this.lifePremiumRes .place);
            let witnessName1 =  this.lifePremiumRes.witness1title +" "+ this.lifePremiumRes.witness1fname +" " + this.lifePremiumRes.witness1lname;
            let witnessName2 =  this.lifePremiumRes.witness2title +" "+ this.lifePremiumRes.witness2fname +" " + this.lifePremiumRes.witness2lname;
          

            this.fullnameInfo_witness1 = this.setFullnameInfo('', '', this.lifePremiumRes.witness1title, this.lifePremiumRes.witness1fname, this.lifePremiumRes.witness1lname);
            this.fullnameInfo_witness2 = this.setFullnameInfo('', '', this.lifePremiumRes.witness2title, this.lifePremiumRes.witness2fname, this.lifePremiumRes.witness2lname)
            this.customerSign_tab2Data.get('witnessName1').setValue(witnessName1);
            this.customerSign_tab2Data.get('witnessName2').setValue(witnessName2);
          }
        
        }

      },
      (err) => {

        console.log('ERROR getUlinkLifePremium', err);
        this.loadingCtrl.dismiss();
        let toast = this.toastCtrl.create({
          message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
            duration: 3000
        });
        toast.present();
      }
    );
  }

  private setFullnameInfo(age: string, title: string, prefix: string, firstName: string, lastName: string): FullNameInfo {
    let fullnameInfo : FullNameInfo = new FullNameInfo();
    //fullnameInfo.age = age;
    //fullnameInfo.title = title;
    fullnameInfo.prefix = prefix;
    fullnameInfo.firstName = firstName;
    fullnameInfo.lastName = lastName;

    return fullnameInfo;
  } 

  private fullnameChange(fullname: FullNameInfo , signType:string){
    this.signType = signType;
    console.log("signType ===>",this.signType);
    console.log('fullname', fullname)
   
    
    if(signType == 'witnessName1'){
      this.appForm1.get('prename1').setValue(fullname.prefix);
      this.appForm1.get('firstname1').setValue(fullname.firstName);
      this.appForm1.get('lastname1').setValue(fullname.lastName);

      this.fullnameInfo_witness1.prefix = fullname.prefix;
      this.fullnameInfo_witness1.firstName = fullname.firstName;
      this.fullnameInfo_witness1.lastName = fullname.lastName;

      this.customerSign_tab2Data.get('witnessName1').setValue(`${fullname.prefix} ${fullname.firstName} ${fullname.lastName}`);
              

    }
    if(signType == 'witnessName2'){
      this.appForm1.get('prename2').setValue(fullname.prefix);
      this.appForm1.get('firstname2').setValue(fullname.firstName);
      this.appForm1.get('lastname2').setValue(fullname.lastName);

      this.fullnameInfo_witness2.prefix = fullname.prefix;
      this.fullnameInfo_witness2.firstName = fullname.firstName;
      this.fullnameInfo_witness2.lastName = fullname.lastName;

      this.customerSign_tab2Data.get('witnessName2').setValue(`${fullname.prefix} ${fullname.firstName} ${fullname.lastName}`);
    }
  }

 

  private  setAppSignForSave(){
  
    this.ulinkLifePremium.applicationid =  this.mcaapplication.applicationid;


    console.log('setAppSignForSave ---> lifePremiumRes', this.lifePremiumRes);

    let lifePremiumRes_place : string = '';
    let lifePremiumRes_witness1title : string = '';
    let lifePremiumRes_witness1fname : string = '';
    let lifePremiumRes_witness1lname : string = '';
    let lifePremiumRes_witness2title : string = '';
    let lifePremiumRes_witness2fname : string = '';
    let lifePremiumRes_witness2lname : string = '';

    if(typeof this.lifePremiumRes != 'undefined'){
      lifePremiumRes_place = this.lifePremiumRes.place;
      lifePremiumRes_witness1title = this.lifePremiumRes.witness1title;
      lifePremiumRes_witness1fname = this.lifePremiumRes.witness1fname;
      lifePremiumRes_witness1lname = this.lifePremiumRes.witness1lname;
      lifePremiumRes_witness2title = this.lifePremiumRes.witness2title;
      lifePremiumRes_witness2fname = this.lifePremiumRes.witness2fname;
      lifePremiumRes_witness2lname = this.lifePremiumRes.witness2lname;
    }



    this.ulinkLifePremium.place = this.customerSign_tab2Data.get('signPlace').value?this.customerSign_tab2Data.get('signPlace').value:lifePremiumRes_place;
    this.ulinkLifePremium.witness1title = this.appForm1.get('prename1').value?this.appForm1.get('prename1').value :lifePremiumRes_witness1title;
    this.ulinkLifePremium.witness1fname = this.appForm1.get('firstname1').value?this.appForm1.get('firstname1').value : lifePremiumRes_witness1fname;
    this.ulinkLifePremium.witness1lname = this.appForm1.get('lastname1').value?this.appForm1.get('lastname1').value: lifePremiumRes_witness1lname;
    this.ulinkLifePremium.witness2title = this.appForm1.get('prename2').value?this.appForm1.get('prename2').value: lifePremiumRes_witness2title;
    this.ulinkLifePremium.witness2fname = this.appForm1.get('firstname2').value?this.appForm1.get('firstname2').value: lifePremiumRes_witness2fname;
    this.ulinkLifePremium.witness2lname = this.appForm1.get('lastname2').value?this.appForm1.get('lastname2').value: lifePremiumRes_witness2lname;
    console.log("ulinkLifePremium ===>", this.ulinkLifePremium);
   

  }

   /**
   * search last riskprofile
   */
  // private async getRiskProfileFromService() {
  //   const citizenid: string = this.quotation.citizenid;
  //   if ((citizenid != '') && (typeof citizenid != 'undefined')){
  //     this.loadingCtrl.present();
  //     let reqModel: RequestModel = new RequestModel();
  //     reqModel.serviceName = ServiceName.SELECT;
  //     reqModel.functionName = FunctionName.RISKPROFILE;
  //     reqModel.param = [{citizenid : citizenid}];
     
  //     await this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
  //       (res)=>{
  //         if(res['datas'].length > 0){
  //           console.log(" res : ",res['datas']);
  //           this.riskprofileScore = res['datas'][0]['riskscore'];
  //           this.getRiskProfileLevel();
  //         }
  //         this.loadingCtrl.dismiss();
  //       },
  //       (err)=> {
  //         console.log(err);
  //         setTimeout(() => {
  //           this.loadingCtrl.dismiss();
  //         }, 1000);
          
  //       }
  //     );
  //   }
  // }


  // private getRiskProfileLevel(){
    
  //   if(this.riskprofileScore < 15){
  //     this.riskprofileLevel = 'LOW';
  //   }else if(this.riskprofileScore >= 15 && this.riskprofileScore <= 29){
  //     this.riskprofileLevel = 'MEDIUM';
  //   }else if(this.riskprofileScore > 29){
  //     this.riskprofileLevel = 'HIGH';
  //   }
  //   console.log('riskprofileScore -->', this.riskprofileScore);
  //   console.log('riskprofileLevel -->', this.riskprofileLevel);
  // }

  private  async getAllocation(){
    await this.callAllocationRawSheet();
    const customerId = this.quotation.customerid;
    console.log('this.quotation.customerId--->', customerId);
    await this.ulinkAllocateData.getAllocationByCustomerId(customerId).then(
      (res)=>{
        console.log("allocationByCustomerId  res : ",res);
        this.allocationByCustomerId = res;
        console.log(" this.allocationData : ",this.allocationData);
        if(res['data'].length > 0){

          let data = res['data'][0];

          this.manageAllocation(data);

        }
      },
      (err)=> {
        console.log(err);
        
      }
    );

  }

  private manageAllocation(data){

    this.allocationData = data;

    this.rppchoice = data.rppchoice;
    this.rspchoice = data.rspchoice;
    this.topchoice = data.topchoice;

    this.app_lifepremiun_ulink_tab1Data.get('question1').setValue(this.rppchoice == 'custom'? '2':'1');
    if(this.plan_code == 'UA02'){
      this.app_lifepremiun_ulink_tab1Data.get('question2').setValue(this.rspchoice == 'rpp'? '1':'2');
    }
    this.app_lifepremiun_ulink_tab1Data.get('question3').setValue(this.topchoice == 'rpp'? '1':'2');


    let listData :Array<Object> = data.listDetail;
    console.log("listData Allocation ==> ",listData);
    this.combineAllocationData(listData);

    this.allocationRPP = listData.filter(item => item['premiumtype'] == 'rpp');
    this.allocationTopPremium = listData.filter(item => item['premiumtype'] == 'top');
    this.allocationRSP = listData.filter(item => item['premiumtype'] == 'rsp');

    console.log("allocationRPP Allocation ==> ", this.allocationRPP);
    console.log("allocationTopPremium Allocation ==> ", this.allocationTopPremium);
    console.log("allocationRSP Allocation ==> ", this.allocationRSP);


  }

  private async callAllocationRawSheet() {
    await this.storage.get("tlpromptMode").then(async mode => {
      await this.storage.get("loginProfile").then(async profile => {
       
        let reqModel: RequestModel = new RequestModel();
        reqModel.agentid = profile.agentid;
        reqModel.mode = mode;
        reqModel.functionName = FunctionName.UNITLINKAPI;
        reqModel.param = [
          {
            ulink: "",
            operation: "allffsfund"
          }
        ];

        await this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          (res: any) => {
            //console.log('allffsfund res : ',res)
            if (res.datas[0]) {
              let tm1 = res.datas[0];
              let allocationData = JSON.parse(tm1);
              this.allocationArray = allocationData.data[0].arrfund;
              console.log("tm1 allocationArray : ", this.allocationArray);
            }
          },
          err => {
            console.log(err); 
          }
        );
      });
    });
  }

  private combineAllocationData(allocateResult:any){

    for(let data of allocateResult){

      let allocate = this.allocationArray.filter(item => item['fundID'] == data['fundcode']);
      //console.log('allocate --->', allocate);
      if(allocate.length > 0){

        // combine all
        //_.assign(data, allocate[0]);

        // combine some 
        let allo = {
          fundCode : allocate[0]['fundCode'],
          fundThaiName : allocate[0]['fundThaiName'],
          fundEngName : allocate[0]['fundEngName']
        }
        _.assign(data, allo);
       
        //console.log('data --->', data);
      }
    }
  }

     /**
   * step ที่เลือก
   * @param index 
   */
  private changeIndex(index: number) {
    console.log("this.selectedStep --->",this.selectedStep);
    console.log("index --->",index);
    this.oldIndex = this.selectedStep;
    this.selectedStep = index;

    if ((this.validate(this.oldIndex) && this.oldIndex < index ) || this.oldIndex > index) {
      //nothing
    }
    else {

      if(typeof this.allocationData == 'undefined'){
        this.alertCtrl.warning('กรุณาเลือก/แก้ไข กองทุน');
      }else {
        this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
      }
     
      setTimeout(() => {
        this.selectedStep = this.oldIndex;
      }, 1);
    }
  }

  private validate(index: number): boolean {
   
    if(index == 0){
      console.log('Validate app_lifepremiun_ulink_tab1Data --->', this.app_lifepremiun_ulink_tab1Data);
      console.log('Validate allocationData --->', this.allocationData);
     
      if(this.allocationData){
        return true;
      }else {
        return false;
      }
    }else if(index == 1){
      console.log(' Validate customerSign_tab2Data --->', this.customerSign_tab2Data);
      if(this.customerSign_tab2Data.valid){
        return true;
      }else {
        return false;
      }
    }
    //return true;
  }

  private validateBeforeSave(){

    if(this.selectedStep == 0 && typeof this.allocationData == 'undefined'){
      this.alertCtrl.warning('กรุณาเลือก/แก้ไข กองทุน');
      return;
    }

    const allocationStatus : UlinkApplicationFormM =  _.first(this.allocationStatus);
    console.log('allocationStatus ----> Before save ', allocationStatus);
    let valid:boolean = true;
    if( allocationStatus.status == 'S'){
      for(let i=0; i<2;i++){
        if(!this.validate(i)){
          valid = false;
          break;
        }
      }
      if(valid){
        this.save();

      } else {
          this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบทุกหน้า');
      } 
    } else {
       this.save();
    }
  }
  private save(){

   

    this.setAppSignForSave();
    
    this.loadingCtrl.present();
    this.appFormData.insertUlinkLifePremium(this.ulinkLifePremium).then( 
      (res) => {
       console.log("res ===>",res);
       this.appFormData.updateCustomerSign = true;
       this.loadingCtrl.dismiss();

       this.updateStatus();

       if(this.selectedStep == 1){
        this.navCtrl.pop();
      }
        
      },
      (err) => {
        console.log('ERROR ');
        this.loadingCtrl.dismiss();
        let toast = this.toastCtrl.create({
          message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
            duration: 3000
        });
        toast.present();
      }
    ).catch(err => {
      console.log('catch');
      this.loadingCtrl.dismiss();
      let toast = this.toastCtrl.create({
        message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
          duration: 3000
      });
      toast.present();
    });
  }

  private async updateStatus(){
    
    let valid: boolean = false;
    for(let i=0;i<2;i++){
      valid = this.validate(i);
      if(!valid) break;
    }
    let status = valid? 'S':'P';

    const allocationStatus : UlinkApplicationFormM =  _.first(this.allocationStatus);


      let model: UlinkApplicationFormM = new UlinkApplicationFormM();
      model.applicationid = this.mcaapplication.applicationid;
      model.formtype = 'allocation';
      model.allocationdate = this.allocationData['assessmentdate'];
      model.riskprofiledate = allocationStatus.riskprofiledate;
      model.status = status;
  
      await this.ulinkAppData.putUlinkApplicationForm(model).then(async ()=>{
        console.log('updateStatus allocation success!');
         this.loadingCtrl.dismiss();
         let toast = this.toastCtrl.create({
           message: 'บันทึกสำเร็จ',
           duration: 3000
         });
         toast.present();
     
       }).catch(err => {
         this.loadingCtrl.dismiss();
         let toast = this.toastCtrl.create({
           message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
             duration: 3000
         });
         toast.present();
       });


       const riskProfileStatus : UlinkApplicationFormM =  _.first(this.riskProfileStatus);
       riskProfileStatus.allocationdate = this.allocationData['assessmentdate'];
   
       await this.ulinkAppData.putUlinkApplicationForm(riskProfileStatus).then(async ()=>{
         console.log('updateStatus riskprofile success!');
          this.loadingCtrl.dismiss();
          let toast = this.toastCtrl.create({
            message: 'บันทึกสำเร็จ',
            duration: 3000
          });
          toast.present();
      
        }).catch(err => {
          this.loadingCtrl.dismiss();
          let toast = this.toastCtrl.create({
            message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
              duration: 3000
          });
          toast.present();
        });
  }
  

  private editAllocation(){
    let dataEdit = {
      pageName: 'AppLifepremiumUlinkPage',
      planCode: this.plan_code,
      prospect: this.quotation.prospectM,
      allocationData: this.allocationByCustomerId,
      customerId: this.quotation.customerid, //'bc3db1b5-d603-4f30-9874-729ecbc33a35', //
      callback: this.getDataAllocationEdit // function callback
    }
    this.navCtrl.push('AppAllocationPage',{dataEdit});

  }

  getDataAllocationEdit = data =>
  {
    console.log('getDataAllocationEdit---->', data);
    let dataAllocation = data['data']['data'][0];
    this.manageAllocation(dataAllocation);
   
  }; 

}
