import { customerM } from './../../../providers/service-table/customer-model';
import { ApplicationAnswerM } from './../../../providers/service-table/applicationanswer-model';
import { filter } from 'rxjs/operators';
import { CopyAddress } from './../../../providers/application/copy-address';
import { AddressM } from './../../../providers/service-table/address-model';
import { HttpClient } from '@angular/common/http';
import { QuotationModel } from './../../../providers/quotation/quotation-model';
import { ApplicationData } from './../../../providers/application/application-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApplicationMasterM } from '../../../providers/application/application-master-model';
import {MCAapplicationsM} from '../../../providers/service-table/mcaapplications-model';
import { RequestModel } from '../../../providers/model/request-model';
import { ApiProvider } from '../../../providers/api/api';
import { FunctionName } from '../../../providers/constants/function-name';
import { ServiceName } from '../../../providers/constants/service-name';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import _ from "lodash";
import { UlinkAppformDataProvider } from '../../../providers/ulink-appform-data/ulink-appform-data';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import { UlinkApplicationFormM } from '../../../providers/ulink-app-data/ulink-application-form-model';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { Observable } from 'rxjs/Observable';
import { FullNameInfo } from '../../../directives/utility/fullname-popup/fullname-info';
import { UlinkApplicationDetailM } from '../../../providers/ulink-app-data/ulink-application-detail-model';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import * as moment from 'moment';
import { DateFormatProvider } from '../../../providers/date-format/date-format';


@IonicPage({
  segment: 'ข้อมูลผู้ถือหน่วยลงทุน'
})
@Component({
  selector: 'page-app-investment-info',
  templateUrl: 'app-investment-info.html',
})
export class AppInvestmentInfoPage {

    /**
   * แถบที่กำลังเข้าถึง
   */
  private selectedStep: number = 0;
  private oldIndex: number = -1;


    /**
     * ใบเสนอขาย หน้าแรกที่ทำการเลือก
     */
  public quotation: any;


    /**
     * ข้อมูลรายละเอียดใบคำขอทั้งหมด ApplicationMasterM
     */
  public applicationMasterM: ApplicationMasterM = new ApplicationMasterM();
  private appInfo: FormGroup;//ข้อมูลทั่วไป TAb1
  private appGeneral: FormGroup;//ข้อมูลทั่วไป TAB1
  private appGeneralForSave: FormGroup;//ข้อมูลทั่วไป TAB1
  private tab2Data: FormGroup; // ข้อมูลการลงทุน TAB2
  private customerAppSign: FormGroup;// ลงชื่อผู้เอาประกัน TAB3
  private appForm1: FormGroup;
  private fullnameInfo: FullNameInfo = new FullNameInfo();

  private countryDropdown: any;
  private occupationDropdown: any;
  private occupationNormal: any;
  private relationDropdown: any;
  private check;
  private copyAddress : CopyAddress;
  private unitlinkholder : Array<UlinkApplicationFormM>;
  private mcaapplicationM:MCAapplicationsM;

  private occupationNormalFlag: boolean = false;

  private question12Flag : boolean = false;//เเหล่งที่มาของเงิน 
  private question14Flag : boolean = false;//วัตถุประสงค์การลงทุน 
  private question17Flag : boolean = false;//ประสบการณ์การลงทุน 
  private question18Flag : boolean = false;//กองทุนรวมที่สนใจจะลงทุน 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private alertCtrl: AlertDirective,
    private app: ApplicationData,
    private fb: FormBuilder,
    private http: HttpClient,
    private ulinkAppData: UlinkAppDataProvider,
    private appFormData: UlinkAppformDataProvider,
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingDirective,
    private dateFormat: DateFormatProvider,
  ) {
      this.copyAddress = new CopyAddress();
      this.setFullnameInfo('25', "ระบุผู้แทนโดยชอบธรรม", '', '', '');

      /**
       * get formtype
       * and status form provider
       */
   
     console.log("ulinkApplicationFormList status:: ",this.ulinkAppData.ulinkApplicationFormList);
     this.unitlinkholder =  this.ulinkAppData.ulinkApplicationFormList.filter(item => item.formtype == 'unitlinkholder'); //get Formtype and status
     console.log("unitlinkholder : ",this.unitlinkholder);
     this.appFormData.unitlinkholder = this.unitlinkholder;

      this.appInfo = this.fb.group({
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

      this.appGeneral = this.fb.group({
        //เอกสารประกอบได้เเก่
          username    : { value: '', disabled: true },
          gender      : { value: '', disabled: true },
          birthdate   : { value: '', disabled: true},
          age         : { value: '', disabled: true },
          nationality : { value: '', disabled: true },
          taxid       : { value: '', disabled: true },
          citizenCheck: false,
          citizenid   : [{ value: '', disabled: true }, Validators.required],
          expiredate  : '',
          houseParticularsCheck : false,
          passportCheck     : false,
          passportValue     :[{ value: '', disabled: true }, Validators.required],
          otherDescCheck    : false,
          otherDescValue    :[{ value: '', disabled: true }, Validators.required],
          
          permanentAddress:
          [{
            addressSelected: {
              province_name : '',
              tambon_name   : '',
              amphur_name   : '',
              zip           : ''
            }
          }],
          district      : '',
          province      :'',
          subdistrict   : '',
          postcode      : '',
          permanentAddressNo: '',
          permanentVillage: '',
          permanentMoo  : '',
          permanentSoi  : '',
          permanentRoad : '',
          permanentTelNo: '',
          permanentCountry: '',
          permanentMobileNo : '',
          permanentAddressEmail :'',
          companyAddress:
          [{
              addressSelected: {
                province_name   : '',
                tambon_name     : '',
                amphur_name     : '',
                zip             : ''
              }
            }],
          companyDistrict   :'',
          companyProvince   : '',
          companySubdistrict: '',
          companyPostcode   : '',
          companyAddressNo  : '',
          companyVillage    :'',
          companyMoo        :'',
          companySoi        :'',
          companyRoad       :'',
          companyTelNo      :'',
          companyCountry    :'',
          workplace         :'',
          companyMobileNo   : '',
          companyEmail      : '',
          contactaddresscd_copy:''
      });
      this.appFormData.appGeneral = this.appGeneral;


      this.appGeneralForSave =this.fb.group({

        occupation      : { value: '', disabled: true },
        occupationNormol: { value: '', disabled: true },
        businessType    : { value: '', disabled: true }, //ประเภทธุรกิจ
        annualRevenue   : { value: '', disabled: true }, //รายได้ต่อปี

        dropdownEducate : ['' , Validators.required],
        liability       : ['' , Validators.required], //ภาระหนี้
       /*-------เเหล่งที่มาของเงิน -----*/
        salaryCheckbox  : false,
        savingCheckbox  : false,
        bonusCheckbox   : false,
        businessCheckbox : false,
        propertyCheckbox : false,
        lagacyCheckbox  : false,
        otherCheckbox   : false,
        otherDesc       : [{ value: '', disabled: true }, Validators.required],

      });
      this.appFormData.appGeneralForSave = this.appGeneralForSave;
     
      // Formgroup ข้อมูลการลงทุน Tab2
      this.tab2Data = this.fb.group({
        question14_1: false,
        question14_2: false,
        question14_3: false,
        question14_4: false,
        question14_4_desc: [{ value: '', disabled: true }, Validators.required],
        question15: ['' , Validators.required],
        question16: ['' , Validators.required],
        question17_1: false,
        question17_2: false,
        question17_3: false,
        question17_4: false,
        question17_5: false,
        question17_6: false,
        question17_6_desc: [{ value: '', disabled: true }, Validators.required],
        question18_1: false,
        question18_2: false,
        question18_3: false,
        question18_4: false,
        question18_5: false,
        question18_6: false,
        question18_6_desc: [{ value: '', disabled: true }, Validators.required],
        question19: ['' , Validators.required],
        controlling_person_name: [{ value: '', disabled: true }, Validators.required],
        controlling_person_address_type: ['', Validators.required],
        controlling_person_address_no : [{ value: '', disabled: true }, Validators.required],
        controlling_person_village: '',
        controlling_person_moo: '',
        controlling_person_soi: '',
        controlling_person_road: '',
        controlling_person_address:
        {
          addressSelected: {
            province_name: '',
            tambon_name: '',
            amphur_name: '',
            zip: ''
          }
        },
        district: [{ value: '', disabled: true }, Validators.required],
        province: [{ value: '', disabled: true }, Validators.required],
        subdistrict: [{ value: '', disabled: true }, Validators.required],
        postcode: [{ value: '', disabled: true }, Validators.required],
        relation : [{ value: '', disabled: true }, Validators.required]

      });

      this.appFormData.tab2Data = this.tab2Data;


      //ลงชื่อผู้เอาประกัน Tab3
      this.customerAppSign = this.fb.group({
        customername       : { value :'', disabled :true },
        regalRepresentative : ['' , Validators.required], // ผู้เเทนโดยชอบธรรม
        date               : ''
      });
      this.appFormData.customerAppSign = this.customerAppSign;


    this.appForm1 = this.fb.group({
      prename: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });

      this.parallelRequests();
  }

  private parallelRequests() {

    const parallel$ = Observable.forkJoin(
        this.http.get('assets/json/application/occupationJson.json'),
        this.http.get('assets/json/application/countryJson.json'),
        this.http.get('assets/json/application/occupationppngJson.json'),
        this.http.get('assets/json/application/relation.json')
    );

    parallel$.subscribe(
        values => {
          this.occupationNormal = this.objectValues(this.arrayJsonToObject(values, 'occupation'));
          this.countryDropdown = this.objectValues(this.arrayJsonToObject(values, 'country'));
          this.occupationDropdown = this.objectValues(this.arrayJsonToObject(values, 'occupationPPNG'));
          this.relationDropdown = this.objectValues(this.arrayJsonToObject(values, 'relation'));

          console.log('res occupationNormal --->', this.occupationNormal);
          console.log('res countryDropdown --->', this.countryDropdown);
          console.log('res occupationJson --->', this.occupationDropdown);
          console.log('res relationDropdown --->', this.relationDropdown);

          // set Data
          this.getApplicationM();
          this.getQuatation();
          this.getControllingPersonAddress();
          this.setDataTab1();
          this.setDataTab2();
          this.setDataTab3();
        }
    );
  }

  objectValues = (obj) => Object.keys(obj).map( key => obj[key]).reduce(item => item);

  public arrayJsonToObject = (array, key) =>
    array
      .filter(item => item[key])
      .reduce(item => item);


  ngAfterViewInit(): void {

    this.checkDataChangeTab1();
    this.checkDataChangeTab2();
  }
  private  getApplicationM(){
    this.applicationMasterM = _.get(this.app, 'applicationMasterM', new ApplicationMasterM);//ข้อมูลจากใบคำขอ
    console.log("applicationMasterM : ",this.applicationMasterM);
    this.mcaapplicationM = this.applicationMasterM.mcaapplicationM;;
    console.log("mcaapplicationM : ",this.mcaapplicationM);
  }

  private questionChange(tab,data){
    
    if(tab == 'tab1'){//เเหล่งที่มาของเงิน
     this.question12Flag = this.appGeneralForSave.get(data).value;
    }
    if(tab == 'tab2'){

      if(data.startsWith('question14')) this.question14Flag = this.tab2Data.get(data).value;//วัตถุประสงค์การลงทุน
      if(data.startsWith('question17')) this.question17Flag = this.tab2Data.get(data).value;//ประสบการณ์ลงทุน
      if(data.startsWith('question18')) this.question18Flag = this.tab2Data.get(data).value;//กองทุนรวมที่สนใจ
      
      
    }


  }

  private checkDataChangeTab1(){
      //citizen
    this.appGeneral.get('citizenCheck').valueChanges.subscribe(data => {
      console.log("citizenCheck : ",data);
      if(data){
        this.appGeneral.get("citizenid").enable();
      } else {
        this.appGeneral.get("citizenid").setValue("");
        this.appGeneral.get("citizenid").disable();
      }

    });

    this.appGeneral.get('passportCheck').valueChanges.subscribe(data => {
      console.log("passportCheck : ",data);
      if(data){
        this.appGeneral.get("passportValue").enable();

      } else {
        this.appGeneral.get("passportValue").setValue("");
        this.appGeneral.get("passportValue").disable();
      }
    });

    this.appGeneral.get('otherDescCheck').valueChanges.subscribe(data => {
      console.log("otherDescCheck : ",data);
      if(data){
        this.appGeneral.get("otherDescValue").enable();

      } else {
      this.appGeneral.get("otherDescValue").setValue("");
      this.appGeneral.get("otherDescValue").disable();
      }
    });

    this.appGeneralForSave.get('otherCheckbox').valueChanges.subscribe(data => {
      console.log("otherCheckbox : ",data);
      if(data){
      this.appGeneralForSave.get("otherDesc").enable();

      } else {
      this.appGeneralForSave.get("otherDesc").setValue("");
      this.appGeneralForSave.get("otherDesc").disable();
      }
    });
  }

  private checkDataChangeTab2(){

    this.tab2Data.get('question14_4').valueChanges.subscribe(data => {
      console.log("question14_4 : ",data);
      if(data){
        this.tab2Data.get("question14_4_desc").enable();
      } else {
        this.tab2Data.get("question14_4_desc").setValue("");
        this.tab2Data.get("question14_4_desc").disable();
      }
    });
    
    this.tab2Data.get('question17_6').valueChanges.subscribe(data => {
      console.log("question17_6 : ",data);
      if(data){
        this.tab2Data.get("question17_6_desc").enable();
      } else {
        this.tab2Data.get("question17_6_desc").setValue("");
        this.tab2Data.get("question17_6_desc").disable();
      }
    });

    this.tab2Data.get('question18_6').valueChanges.subscribe(data => {
      console.log("question18_6 : ",data);
      if(data){
        this.tab2Data.get("question18_6_desc").enable();
      } else {
        this.tab2Data.get("question18_6_desc").setValue("");
        this.tab2Data.get("question18_6_desc").disable();
      }
    });

    this.tab2Data.get('question19').valueChanges.subscribe(data => {
      console.log("question19 : ",data);

      if(Number(data) == 2 ){
        this.tab2Data.get("controlling_person_name").enable();
        this.tab2Data.get("controlling_person_address_no").enable();
        this.tab2Data.get("controlling_person_address_type").enable();
        this.tab2Data.get("district").enable();
        this.tab2Data.get("province").enable();
        this.tab2Data.get("subdistrict").enable();
        this.tab2Data.get("postcode").enable();
        this.tab2Data.get("relation").enable();
        
      } else {
        this.tab2Data.get("controlling_person_name").setValue("");
        this.tab2Data.get("controlling_person_name").disable();

        this.tab2Data.get("controlling_person_address_no").setValue("");
        this.tab2Data.get("controlling_person_address_no").disable();

        this.tab2Data.get("controlling_person_address_type").setValue("");
        this.tab2Data.get("controlling_person_address_type").disable();

        this.tab2Data.get("controlling_person_village").setValue("");
        this.tab2Data.get("controlling_person_moo").setValue("");
        this.tab2Data.get("controlling_person_soi").setValue("");
        this.tab2Data.get("controlling_person_road").setValue("");

        this.tab2Data.get("district").setValue("");
        this.tab2Data.get("district").disable();

        this.tab2Data.get("province").setValue("");
        this.tab2Data.get("province").disable();

        this.tab2Data.get("subdistrict").setValue("");
        this.tab2Data.get("subdistrict").disable();

        this.tab2Data.get("postcode").setValue("");
        this.tab2Data.get("postcode").disable();

        this.tab2Data.get("relation").setValue("");
        this.tab2Data.get("relation").disable();

        this.tab2Data.controls.controlling_person_address.value.addressSelected.amphur_id = '';
        this.tab2Data.controls.controlling_person_address.value.addressSelected.amphur_name = '';
        this.tab2Data.controls.controlling_person_address.value.addressSelected.province_id = '';
        this.tab2Data.controls.controlling_person_address.value.addressSelected.province_name = '';
        this.tab2Data.controls.controlling_person_address.value.addressSelected.tambon_id = '';
        this.tab2Data.controls.controlling_person_address.value.addressSelected.tambon_name = '';
        this.tab2Data.controls.controlling_person_address.value.addressSelected.zip = '';

      }
    });


  }

  /**
   * ค่าจากใบเสนอขาย
   */
  private getQuatation(){ 
    this.quotation = this.app.getQuotation();//ข้อมูลจากใบเสนอขาย
    console.log("getQuotation : ",this.app.getQuotation());
    if (this.quotation) {
    let name:string = '';
    
    if( this.mcaapplicationM.insurename ){
      name = this.mcaapplicationM.insuretitle + " " + this.mcaapplicationM.insurename + " " +this.mcaapplicationM.insurelastname;
    } else {
      name = this.quotation.pname+" "+ this.quotation.fname +" "+ this.quotation.lname; 
    }
    this.appInfo.get('customername').setValue(name);
    this.appInfo.get('gender').setValue(this.quotation.gender == 'M'? 'ชาย' : 'หญิง');
    this.appInfo.get('age').setValue(this.quotation.insureage);
    this.appInfo.get('planname').setValue(this.quotation.planname);
    this.appInfo.get('payment').setValue(this.appFormData.getTextMode(this.quotation.mode));
    this.appInfo.get('occupationtype').setValue(this.quotation.occupationtype);

    this.customerAppSign.get('customername').setValue(this.quotation.pname+" "+this.quotation.fname +" "+ this.quotation.lname);

    }
  }
 
  private setDataTab1() {
    this.mcaapplicationM = this.applicationMasterM.mcaapplicationM;
    this.appFormData.applictationId = this.mcaapplicationM.applicationid;
    let username:string  =  this.mcaapplicationM.title +" "+this.mcaapplicationM.name +" "+this.mcaapplicationM.lastname;
    this.appGeneral.get('username').setValue(username);
    this.appGeneral.get('gender').setValue(this.mcaapplicationM.gender);
    this.appGeneral.get('nationality').setValue(this.mcaapplicationM.nationality);
    this.appGeneral.get('taxid').setValue( this.mcaapplicationM.nationality == 'THA' ?'':this.mcaapplicationM.identifyid);
    let date  :string = this.dateFormat.dateFormatShotTh1(this.mcaapplicationM.birthdate,"S");
    this.appGeneral.get('birthdate').setValue(date);
    this.appGeneral.get('birthdate').disable();

    /*-----ที่อยู่ปัจจุบัน----*/
    let permanentAddress:Array<AddressM>  = this.applicationMasterM.addressMs.filter(item => item.type == 'C');
    console.log("address : " , JSON.stringify(permanentAddress));
    if(permanentAddress.length > 0){

      this.appGeneral.controls['permanentAddressNo'].setValue(permanentAddress[0].addressno?permanentAddress[0].addressno : '');
      this.appGeneral.controls['permanentVillage'].setValue(permanentAddress[0].buildingname);
      this.appGeneral.controls['permanentMoo'].setValue(permanentAddress[0].moo);
      this.appGeneral.controls['permanentSoi'].setValue(permanentAddress[0].soi);
      this.appGeneral.controls['permanentRoad'].setValue(permanentAddress[0].road);
      if (permanentAddress[0].subdistrict || permanentAddress[0].district || permanentAddress[0].province || permanentAddress[0].postcode) {

        this.appGeneral.controls['postcode'].setValue(permanentAddress[0].postcode);
        this.appGeneral.controls['subdistrict'].setValue(permanentAddress[0].subdistrict);
        this.appGeneral.controls['province'].setValue(permanentAddress[0].province);
        this.appGeneral.controls['district'].setValue(permanentAddress[0].district);
        this.appGeneral.controls['permanentAddress'].setValue({
          addressSelected: {
            province_name: permanentAddress[0].province,
            tambon_name: permanentAddress[0].subdistrict,
            amphur_name: permanentAddress[0].district,
            zip: permanentAddress[0].postcode
          }
        });
      }
      this.appGeneral.controls['permanentTelNo'].setValue(permanentAddress[0].telno?permanentAddress[0].telno:'');
      this.appGeneral.controls['permanentCountry'].setValue(permanentAddress[0].country);
      this.appGeneral.controls['permanentMobileNo'].setValue(permanentAddress[0].mobileno?permanentAddress[0].mobileno:'');
      this.appGeneral.controls['permanentAddressEmail'].setValue('');
      
    }
       
   /*-----ที่ทำงาน----*/
    let companyAddress:Array<AddressM>  = this.applicationMasterM.addressMs.filter(item => item.type == 'W');
    if (companyAddress.length > 0) {
      if (companyAddress[0].addressno)
        this.appGeneral.controls['companyAddressNo'].setValue(companyAddress[0].addressno);

      this.appGeneral.controls['companyVillage'].setValue(companyAddress[0].buildingname);
      this.appGeneral.controls['companyMoo'].setValue(companyAddress[0].moo);
      this.appGeneral.controls['companySoi'].setValue(companyAddress[0].soi);
      this.appGeneral.controls['companyRoad'].setValue(companyAddress[0].road);
      this.appGeneral.controls['contactaddresscd_copy'].setValue(companyAddress[0].regid);
      if (companyAddress[0].subdistrict || companyAddress[0].district || companyAddress[0].province || companyAddress[0].postcode) {
        this.appGeneral.controls['companyAddress'].setValue({
          addressSelected: {
            province_name: companyAddress[0].province,
            tambon_name: companyAddress[0].subdistrict,
            amphur_name: companyAddress[0].district,
            zip: companyAddress[0].postcode
          }
        });
        this.appGeneral.controls['companyPostcode'].setValue(companyAddress[0].postcode);
        this.appGeneral.controls['companySubdistrict'].setValue(companyAddress[0].subdistrict);
        this.appGeneral.controls['companyProvince'].setValue(companyAddress[0].province);
        this.appGeneral.controls['companyDistrict'].setValue(companyAddress[0].district);
      }
      this.appGeneral.controls['companyTelNo'].setValue(companyAddress[0].telno?companyAddress[0].telno:'');
      this.appGeneral.controls['companyCountry'].setValue(companyAddress[0].country);
      this.appGeneral.controls['companyMobileNo'].setValue(companyAddress[0].mobileno?companyAddress[0].mobileno:'');
      this.appGeneral.controls['workplace'].setValue(companyAddress[0].workplace ? companyAddress[0].workplace:'');
      
    }
    let currentW_field : string[] = ['companyAddressNo', 'companyVillage', 'companyMoo', 'companySoi', 
    'companyRoad', 'companyDistrict', 'companySubdistrict', 'companyProvince', 'companyPostcode', 
    'companyTelNo','companyCountry','workplace', 'companyMobileNo'];

   // SetField Disable
    this.copyAddress.disableField(this.copyAddress.addressfield.currentP, this.appGeneral);
    this.copyAddress.disableField(currentW_field, this.appGeneral);

    let occupationKey =this.applicationMasterM.occupationsMs[0].occupationcd;
  //  console.log('occupationDropdown --->', this.occupationDropdown);
   
    let occupationPPNG : Array<any> =  this.occupationDropdown.filter(item => item.key == occupationKey);
    console.log('occupationPPNG filter --->', occupationPPNG);
   if(occupationPPNG.length > 0) {
    this.occupationNormalFlag = false;
    this.appGeneralForSave.get('occupation').setValue(occupationPPNG[0]['key']);
   }else {
    this.occupationNormalFlag = true;
    this.appGeneralForSave.get('occupation').setValue('25');
    occupationPPNG = this.occupationNormal.filter(item => item.key == occupationKey);
    if(occupationPPNG.length > 0){
      this.appGeneralForSave.get('occupationNormol').setValue(occupationPPNG[0]['value']);
    }
   }

    this.appGeneralForSave.controls['businessType'].setValue(this.applicationMasterM.occupationsMs[0].businessdesc);
    this.appGeneralForSave.controls['annualRevenue'].setValue(this.applicationMasterM.occupationsMs[0].yearsalary);
    /*--------------getAnswer------------ */
    let appAnswerM :Array<ApplicationAnswerM> = this.applicationMasterM.applicationAnswerMs;
    console.log("appAnswerM ==> ",appAnswerM);
    if(appAnswerM.length > 0){
      let educateAnswer:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '100');
      let sourceMoneyAnswer:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '102');
      let liabilityAnswer:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '103');

      let citizenAnswer:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '109');
      let houseParticularsAnswer:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '110');
      let passportAnswer:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '111');
      let otherAnswer:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '112');



      console.log("citizenAnswer length ==>",citizenAnswer.length);
     
      if(educateAnswer.length > 0) this.appGeneralForSave.get('dropdownEducate').setValue(educateAnswer[0].text1);
      if(liabilityAnswer.length > 0) this.appGeneralForSave.get('liability').setValue(liabilityAnswer[0].text1);
      if(sourceMoneyAnswer.length > 0){
        console.log("sourceMoneyAnswer =>",sourceMoneyAnswer);
        let wayOfmoney : Array<string> = sourceMoneyAnswer[0].text1.split(",");
        console.log("wayOfmoney split ===> ",wayOfmoney);
        for(let foundCheck of wayOfmoney){
          foundCheck =  foundCheck.trim();
          if(foundCheck == "1"){ this.appGeneralForSave.get('salaryCheckbox').setValue(true); this.question12Flag = true; }
          if(foundCheck == "2"){ this.appGeneralForSave.get('savingCheckbox').setValue(true); this.question12Flag = true; }
          if(foundCheck == "3"){ this.appGeneralForSave.get('lagacyCheckbox').setValue(true); this.question12Flag = true; } 
          if(foundCheck == "4"){ this.appGeneralForSave.get('bonusCheckbox').setValue(true); this.question12Flag = true; }
          if(foundCheck == "5"){ this.appGeneralForSave.get('businessCheckbox').setValue(true); this.question12Flag = true; }
          if(foundCheck == "6"){ this.appGeneralForSave.get('propertyCheckbox').setValue(true); this.question12Flag = true; }
          if(foundCheck == "7") {
            this.appGeneralForSave.get('otherCheckbox').setValue(true);
            this.question12Flag = true;
            this.appGeneralForSave.get('otherDesc').setValue(sourceMoneyAnswer[0].answerdesc);
          }
        }
      } 
     

      let citizenFormApp: boolean = false;
      let houseParticularsFormApp: boolean = false;
      let passportFormApp: boolean = false;
       // เอกสารประกอบ
      let identifytype = this.mcaapplicationM.identifytype;
      if(identifytype == '01'){//สำเนาบัตรประจำตัวประชาชน
        this.appGeneral.get('citizenCheck').setValue(true);
        this.appGeneral.get('citizenCheck').disable();
        this.appGeneral.get('citizenid').setValue( this.mcaapplicationM.identifyid);
        this.appGeneral.get('citizenid').disable();
        this.appGeneral.get('expiredate').setValue( this.mcaapplicationM.identifyexpiredate? this.dateFormat.dateFormatShotTh1(this.mcaapplicationM.identifyexpiredate,'S'):'');
        this.appGeneral.get('expiredate').disable();

        citizenFormApp = true;
      }
      if(identifytype == '11'){//สำเนาทะเบียนบ้าน

        this.appGeneral.get('houseParticularsCheck').setValue(true);
        this.appGeneral.get('houseParticularsCheck').disable();

        houseParticularsFormApp = true;
      }

      if(identifytype == '04'){//สำเนาหนังสือเดินทาง (Passport)
        this.appGeneral.get('passportCheck').setValue(true);
        this.appGeneral.get('passportCheck').disable();
        this.appGeneral.get('passportValue').disable();

        passportFormApp = true;
      }

      if(citizenAnswer.length > 0 && !citizenFormApp){

        this.appGeneral.get('citizenCheck').setValue(true);
        this.appGeneral.get('citizenid').setValue(citizenAnswer[0].answerdesc);
        this.appGeneral.get('expiredate').setValue(citizenAnswer[0].text1);
      } 
      if(houseParticularsAnswer.length > 0 && !houseParticularsFormApp) this.appGeneral.get('houseParticularsCheck').setValue(true);
      
      if(passportAnswer.length > 0 && !passportFormApp){
        this.appGeneral.get('passportCheck').setValue(true);
        this.appGeneral.get('passportValue').setValue(passportAnswer[0].answerdesc);
      } 

      if(otherAnswer.length > 0){
        this.appGeneral.get('otherDescCheck').setValue(true);
        this.appGeneral.get('otherDescValue').setValue(otherAnswer[0].answerdesc);
      } 
    }
  }

  private setDataTab2() {
    let appAnswerM :Array<ApplicationAnswerM> = this.applicationMasterM.applicationAnswerMs;
    console.log("appAnswerM ==> ",appAnswerM);
    if(appAnswerM.length > 0){
      let question14:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '104');
      let question15:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '105');
      let question16:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '106');
      let question17:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '107');
      let question18:Array<ApplicationAnswerM> = appAnswerM.filter(item => item.questionid == '108');

      console.log('question14 --->', question14);
      console.log('question15 --->', question15);
      console.log('question16 --->', question16);
      console.log('question17 --->', question17);
      console.log('question18 --->', question18);

      if(question14.length > 0){

        let question14Split : Array<string> = question14[0].text1.split(",");
        console.log("question14Split split ===> ",question14Split);
        for(let foundCheck of question14Split){
          foundCheck =  foundCheck.trim();
          if(foundCheck == "1") { this.tab2Data.get('question14_1').setValue(true); this.question14Flag = true; }
          if(foundCheck == "2") { this.tab2Data.get('question14_2').setValue(true); this.question14Flag = true; }
          if(foundCheck == "3") { this.tab2Data.get('question14_3').setValue(true); this.question14Flag = true; }
          if(foundCheck == "4"){
            this.tab2Data.get('question14_4').setValue(true);
            this.question14Flag = true;
            let desc: string = question14[0].answerdesc;
            this.tab2Data.get('question14_4_desc').setValue(desc);

          } 
        }

      }
      if(question15.length > 0){

        let foundCheck : string = question15[0].answerdesc;
        console.log("question15_ans  ===> ",foundCheck);
        this.tab2Data.get('question15').setValue(foundCheck);
        
      }
      if(question16.length > 0){

        let foundCheck : string = question16[0].text1;
        console.log("question16_ans  ===> ",foundCheck);
        this.tab2Data.get('question16').setValue(foundCheck);
        
      }
      if(question17.length > 0){

        let question17Split : Array<string> = question17[0].text1.split(",");
        console.log("question17Split split ===> ",question17Split);
        for(let foundCheck of question17Split){
          foundCheck =  foundCheck.trim();
          if(foundCheck == "1") { this.tab2Data.get('question17_1').setValue(true); this.question17Flag = true; }
          if(foundCheck == "2") { this.tab2Data.get('question17_2').setValue(true); this.question17Flag = true; }
          if(foundCheck == "3") { this.tab2Data.get('question17_3').setValue(true); this.question17Flag = true; }
          if(foundCheck == "4") { this.tab2Data.get('question17_4').setValue(true); this.question17Flag = true; }
          if(foundCheck == "5") { this.tab2Data.get('question17_5').setValue(true); this.question17Flag = true; }
          if(foundCheck == "6"){
            this.tab2Data.get('question17_6').setValue(true);
            this.question17Flag = true;
            let desc: string = question17[0].answerdesc;
            this.tab2Data.get('question17_6_desc').setValue(desc);

          } 
        }
        
      }
      if(question18.length > 0){

        let question18Split : Array<string> = question18[0].text1.split(",");
        console.log("question18Split split ===> ",question18Split);
        for(let foundCheck of question18Split){
          foundCheck =  foundCheck.trim();
          if(foundCheck == "1") { this.tab2Data.get('question18_1').setValue(true); this.question18Flag = true; }
          if(foundCheck == "2") { this.tab2Data.get('question18_2').setValue(true); this.question18Flag = true; }
          if(foundCheck == "3") { this.tab2Data.get('question18_3').setValue(true); this.question18Flag = true; }
          if(foundCheck == "4") { this.tab2Data.get('question18_4').setValue(true); this.question18Flag = true; }
          if(foundCheck == "5") { this.tab2Data.get('question18_5').setValue(true); this.question18Flag = true; }
          if(foundCheck == "6"){
            this.tab2Data.get('question18_6').setValue(true);
            this.question18Flag = true;
            let desc: string = question18[0].answerdesc;
            this.tab2Data.get('question18_6_desc').setValue(desc);

          } 
        }
        
      }
      this.getapplicationdetailMs();
    }

  }
  private getapplicationdetailMs(){

    if( this.applicationMasterM.unitlinkapplicationdetailMs.length > 0){
     
      let regalRepresentative = this.applicationMasterM.unitlinkapplicationdetailMs[0].lawtitle+" " +
                               this.applicationMasterM.unitlinkapplicationdetailMs[0].lawfname+" " +
                               this.applicationMasterM.unitlinkapplicationdetailMs[0].lawlname;
      this.customerAppSign.get('regalRepresentative').setValue(regalRepresentative);
      this.setFullnameInfo('', '', this.applicationMasterM.unitlinkapplicationdetailMs[0].lawtitle, this.applicationMasterM.unitlinkapplicationdetailMs[0].lawfname, this.applicationMasterM.unitlinkapplicationdetailMs[0].lawlname);

      let reletion :string  = this.applicationMasterM.unitlinkapplicationdetailMs[0].controllingpersonrelation?this.applicationMasterM.unitlinkapplicationdetailMs[0].controllingpersonrelation:'';
      let titleName :string  = this.applicationMasterM.unitlinkapplicationdetailMs[0].controllingpersontitle?this.applicationMasterM.unitlinkapplicationdetailMs[0].controllingpersontitle:'';
      let fName :string  = this.applicationMasterM.unitlinkapplicationdetailMs[0].controllingpersonfname?this.applicationMasterM.unitlinkapplicationdetailMs[0].controllingpersonfname:'';
      let lName :string  = this.applicationMasterM.unitlinkapplicationdetailMs[0].controllingpersonlname?this.applicationMasterM.unitlinkapplicationdetailMs[0].controllingpersonlname:'';

     

      this.tab2Data.get('relation').setValue(reletion); 
      this.tab2Data.get('controlling_person_name').setValue(titleName+" "+fName+" "+lName); 

     
   }
  }

  private setDataTab3() {
    
   this.getapplicationdetailMs();
   let nowDate:string = this.dateFormat.dateFormatShotTh1 (moment(new Date()).format("YYYY-MM-DD"),"S");
   let date:string = this.dateFormat.dateFormatShotTh1 (this.mcaapplicationM.updatedate,"S");
   this.customerAppSign.get('date').setValue(this.mcaapplicationM.updatedate? date:nowDate);
    
  }

  private validateBeforeSave(){
    const unitlinkholder =  _.first(this.unitlinkholder);
    let valid:boolean = true;
    if( unitlinkholder.status == 'S'){
      for(let i=0; i<3;i++){
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
 
      this.loadingCtrl.present();
      this.appFormData.saveAnswer().then( 
        (res) => {

          this.saveUlinkAppDetail();

          if(this.tab2Data.get('question19').value == 2 ){
            this.saveAddressControllingPerson();
          }
      
          this.updateStatus();

          if(this.selectedStep == 2){
            this.navCtrl.pop();
          }
          
        },
        (err) => {

          console.log('ERROR SaveAppGenaralForSave');
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
        //this.selectedStep = this.oldIndex;
      });

  }

  private saveUlinkAppDetail(){

    let ulinkApplicationDetailM: UlinkApplicationDetailM = new UlinkApplicationDetailM();
    ulinkApplicationDetailM.applicationid =  this.mcaapplicationM.applicationid;

    ulinkApplicationDetailM.lawtitle = this.appForm1.get('prename').value?this.appForm1.get('prename').value:this.applicationMasterM.unitlinkapplicationdetailMs[0].lawtitle;
    ulinkApplicationDetailM.lawfname = this.appForm1.get('firstname').value?this.appForm1.get('firstname').value:this.applicationMasterM.unitlinkapplicationdetailMs[0].lawfname;
    ulinkApplicationDetailM.lawlname = this.appForm1.get('lastname').value?this.appForm1.get('lastname').value:this.applicationMasterM.unitlinkapplicationdetailMs[0].lawlname;
    
    ulinkApplicationDetailM.controllingpersontype = this.tab2Data.get('question19').value;
    
    if(this.tab2Data.get('question19').value == 2 ){
     
      let nameControlPerson:Array<string> = this.tab2Data.get('controlling_person_name').value.trim().split(" ");

      let resultNameFindTxt:Array<string> = nameControlPerson.filter(item => item != '');
      console.log("resultNameFindTxt size ====> ",resultNameFindTxt.length);
      //  console.log("result ====> ",result);
      //  console.log("resultlast ====> ",resultlast);
      if ( resultNameFindTxt.length == 3 ){
        ulinkApplicationDetailM.controllingpersontitle = resultNameFindTxt[0];
        ulinkApplicationDetailM.controllingpersonfname = resultNameFindTxt[1];
        ulinkApplicationDetailM.controllingpersonlname = resultNameFindTxt[2];
      } else  if ( resultNameFindTxt.length == 2 ){
        ulinkApplicationDetailM.controllingpersonfname = resultNameFindTxt[0];
        ulinkApplicationDetailM.controllingpersonlname = resultNameFindTxt[1];
      } else {
        ulinkApplicationDetailM.controllingpersonfname = resultNameFindTxt[0];
      }

      ulinkApplicationDetailM.controllingpersonrelation = this.tab2Data.get('relation').value;
    }

   
    this.appFormData.updateUlinkAppDetail(ulinkApplicationDetailM);

}

private updateStatus(){
    
    let valid: boolean = false;
    for(let i=0;i<3;i++){
      valid = this.validate(i);
      if(!valid) break;
    }
    let status = valid? 'S':'P';

     this.ulinkAppData.patchUlinkApplicationForm("unitlinkholder",status).then(()=>{
       console.log('updateStatus success!');
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

public saveAddressControllingPerson()
  {
    let address : AddressM = new AddressM();

    let tab2RawData = this.tab2Data.getRawValue();
    console.log('tab2RawData--->', tab2RawData);

    address.applicationid = this.mcaapplicationM.applicationid;
    address.addressno = tab2RawData.controlling_person_address_no;
    address.buildingname = tab2RawData.controlling_person_village;
    address.moo = tab2RawData.controlling_person_moo;
    address.soi = tab2RawData.controlling_person_soi;
    address.road = tab2RawData.controlling_person_road;
    address.subdistrict = tab2RawData.controlling_person_address.addressSelected.tambon_name;
    address.district = tab2RawData.controlling_person_address.addressSelected.amphur_name;
    address.province = tab2RawData.controlling_person_address.addressSelected.province_name;
    address.postcode = tab2RawData.controlling_person_address.addressSelected.zip;
    //address.telno = '';
    //address.mobileno = '';
    //address.email = '';
    //address.country = 'TH';
    address.type = tab2RawData.controlling_person_address_type == null? '': tab2RawData.controlling_person_address_type;

    address = {
      ...address,
      persontype : 'ULINK_CONTROLLING'
    }


    this.appFormData.saveAddressControllingPerson(address);

  }
  private getControllingPersonAddress(){
    this.appFormData.getAddressControllingPerson(this.mcaapplicationM.applicationid).then(
      (res) => {
        console.log('getAddressControllingPerson RES --->',res);
        let datas = res['data'];
        if(datas.length > 0){

          let data = datas[0];

          this.tab2Data.get('question19').setValue('2');
          this.tab2Data.get('controlling_person_address_type').setValue(data.type);
          this.tab2Data.get('controlling_person_address_no').setValue(data.addressno);
          this.tab2Data.get('controlling_person_village').setValue(data.buildingname);
          this.tab2Data.get('controlling_person_moo').setValue(data.moo);
          this.tab2Data.get('controlling_person_soi').setValue(data.soi);
          this.tab2Data.get('controlling_person_road').setValue(data.road);
          this.tab2Data.get('controlling_person_address').setValue(
            {
              addressSelected: {
                province_name: data.province,
                tambon_name: data.subdistrict,
                amphur_name: data.district,
                zip: data.postcode
              }
            }
          );
          this.tab2Data.get('district').setValue(data.province);
          this.tab2Data.get('province').setValue(data.subdistrict);
          this.tab2Data.get('subdistrict').setValue(data.district);
          this.tab2Data.get('postcode').setValue(data.postcode);

        }else {
          this.tab2Data.get('question19').setValue('1');
        }

      },
      (err) => {

        console.log('ERROR getAddressControllingPerson', err);
        this.loadingCtrl.dismiss();
        let toast = this.toastCtrl.create({
          message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
            duration: 3000
        });
        toast.present();
      }
    );
  }

private setFullnameInfo(age: string, title: string, prefix: string, firstName: string, lastName: string): void
  {
    this.fullnameInfo = new FullNameInfo();
    //this.fullnameInfo.age = age;
    //this.fullnameInfo.title = title;
    this.fullnameInfo.prefix = prefix;
    this.fullnameInfo.firstName = firstName;
    this.fullnameInfo.lastName = lastName;
  } 

private fullnameChange(fullname: FullNameInfo){
    console.log('fullname', fullname);
    this.appForm1.get('prename').setValue(fullname.prefix);
    this.appForm1.get('firstname').setValue(fullname.firstName);
    this.appForm1.get('lastname').setValue(fullname.lastName);

    this.setFullnameInfo('', '', fullname.prefix, fullname.firstName, fullname.lastName);
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
      let valid: boolean = true;
      if(index == 2){
        for(let i=0; i<index;i++){
          if(!this.validate(i)){
            valid = false;
            break;
          }
        }
      }
      if(valid){
        //this.save();
      }else{
        this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบทุกหน้า');
        setTimeout(() => {
          this.selectedStep = this.oldIndex;
        }, 1);
      } 
    }
    else {
      this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
      setTimeout(() => {
        this.selectedStep = this.oldIndex;
      }, 1);
    }
  }

  private validate(index: number): boolean {
   
    if(index == 0){
      console.log('Validate this.appGeneral --->', this.appGeneral);
      console.log('Validate this.appGeneral --->', this.appGeneralForSave);
      if(this.appGeneral.valid && this.appGeneralForSave.valid && this.question12Flag){
        return true;
      }else {
        return false;
      }
    }else if(index == 1){
      console.log(' Validate this.tab2Data --->', this.tab2Data);
      if(this.tab2Data.valid && this.question14Flag){
        return true;
      }else {
        return false;
      }
    }else if(index == 2){
      console.log(' Validate this.customerAppSign --->', this.customerAppSign);
      if(this.customerAppSign.valid){
        return true;
      }else {
        return false;
      }
    }
    //return true;
  }
}

