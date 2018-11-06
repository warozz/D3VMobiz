import { Component, ContentChildren, QueryList, Input, ViewChild, ElementRef, ViewChildren, ContentChild, TemplateRef, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { StepComponent } from '../utility/steps/step/step';
import { Broadcaster } from './../../providers/utility/broadcaster';
import { MCAapplicationsM } from '../../providers/service-table/mcaapplications-model';
import { RequestModel } from '../../providers/model/request-model';
import { UUID } from 'angular2-uuid';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { ServiceName } from '../../providers/constants/service-name';
import { FunctionName } from '../../providers/constants/function-name';
import { ApiProvider } from "../../providers/api/api";
import { OccupationsM } from '../../providers/service-table/occupations-model';
import { AddressM } from '../../providers/service-table/address-model';
import { BeneficiaryM } from '../../providers/service-table/beneficiary-model';
import { OtherinsuranceM } from '../../providers/service-table/otherinsurance-model';
import { InsurancerejectionsM } from '../../providers/service-table/insurancerejections-model';
import { ApplicationModel } from '../../providers/application/application-model';
@Component({
  selector: 'app-form',
  templateUrl: 'app-form.html'
})
export class AppFormComponent implements AfterContentInit, AfterViewInit {
  private itemSelected;
  private originalItem;
  private appGeneral;
  private appType;
  private appBeneficiary;
  private appHistory;
  private appMedicalHistory;
  private appTreatmentHistory;
  private appSignPage;
  private appKb;
  private appFormPermanentAddress;
  private appFormCurrentAddress;
  private appFormCompanyAddress;
  constructor(private broadcaster: Broadcaster, private apiProvider: ApiProvider,  private alertCtrl: AlertDirective) {

  }

  /**
   * component step
   */
  @ContentChildren(StepComponent) private list: QueryList<StepComponent>;
  private stepArray: Array<StepComponent>;

  /**
   * ปุ่มรายการเมนู
   */
  @ViewChildren('oneStep') private oneStep: QueryList<ElementRef>;
  private oneStepArray: Array<ElementRef>;

  /**
   * action button
   */
  @ContentChild('action') actionTemp: TemplateRef<any>;

  /**
   * เลือกแสดงผล
   */
  @Input('selectIndex') private index: number = 0;

  /**
   * แสดงปุ่ม action
   */
  @Input('showAction') private showAction: number = 1;

  ngOnInit() {
    this.broadcaster.on('itemSelected').subscribe(res => {
      this.itemSelected = res; 
      // .referenceno console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appGeneral').subscribe(res => {
      this.appGeneral = res;
      // console.log("update On appForm broadcast 3 ::",res);
      //console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appFormPermanentAddress').subscribe(res => {
      this.appFormPermanentAddress = res;
      // console.log("update On appForm broadcast 3 ::",res);
      //console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appFormCurrentAddress').subscribe(res => {
      this.appFormCurrentAddress = res;
      // console.log("update On appForm broadcast 3 ::",res);
      //console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appFormCompanyAddress').subscribe(res => {
      this.appFormCompanyAddress = res;
      // console.log("update On appForm broadcast 3 ::",res);
      //console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appType').subscribe(res => {
      this.appType = res;
      // console.log("update On appForm broadcast 3 ::",res);
      // console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appBeneficiary').subscribe(res => {
      this.appBeneficiary = res;
      // console.log("update On appForm broadcast 3 ::",res);
      // console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appHistory').subscribe(res => {
      this.appHistory = res;
      // console.log("update On appForm broadcast 3 ::",res);
      // console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appMedicalHistory').subscribe(res => {
      this.appMedicalHistory = res;
      // console.log("update On appForm broadcast 3 ::",res);
      // console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appTreatmentHistory').subscribe(res => {
      this.appTreatmentHistory = res;
      // console.log("update On appForm broadcast 3 ::",res);
      // console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appSignPage').subscribe(res => {
      this.appSignPage = res;
      // console.log("update On appForm broadcast 3 ::",res);
      // console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appKb').subscribe(res => {
      this.appKb = res;
      // console.log("update On appForm broadcast 3 ::",res);
      // console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
    this.broadcaster.on('appOriginalData').subscribe(res => {
      this.originalItem = res;
      // console.log("update On appForm broadcast 3 ::",res);
      // console.log("update On appForm broadcast 4 ::",this.appGeneral) ;
    });
  }
  async save(){

if(this.originalItem!=undefined){
  try{
    await this.alertCtrl.confiemBox('ต้องการอัพเดทข้อมูลหรือไม่');

    console.log("original data : Yes" +this.appGeneral.value.name);

    let objM: MCAapplicationsM = new MCAapplicationsM();
    objM.applicationid= this.originalItem.data[0].applicationid
    objM.applicationno = this.itemSelected.referenceno;
    objM.birthdate = this.appGeneral.value.birthDate+" 00:00:00";
    objM.customerid = this.itemSelected.customerid;
    objM.title = this.appGeneral.value.title;
    objM.name = this.appGeneral.value.name;
    objM.lastname = this.appGeneral.value.lastName;
    objM.telno = this.appGeneral.value.telephone;
    objM.gender = this.appGeneral.value.gender;
    objM.heigh = this.appGeneral.value.heigh;
    objM.weigh = this.appGeneral.value.weigh;
    objM.race = this.appGeneral.value.race;
    objM.religion = this.appGeneral.value.religion;
    objM.nationality = this.appGeneral.value.nationality;
    objM.formtype = "T";
    objM.applicationstatus = "T";
  
    objM.identifytype = this.appGeneral.value.identifyType;
    objM.identifyid = this.appGeneral.value.identify_id;
    objM.identifyexpiredate = this.appGeneral.value.identifyExpireDate;
    objM.marital = this.appGeneral.value.martial;
    objM.spousetitle = this.appGeneral.value.spouseTitle;
    objM.spousename = this.appGeneral.value.spouseName;
    objM.spouselastname = this.appGeneral.value.spouseLastname;
    let objMs: Array<MCAapplicationsM> = [];
    objMs.push(objM);
  
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.MCAAPPLICATIONS;
    reqM.serviceName = ServiceName.UPDATE;
    reqM.param = objMs;
    console.log("Before MCAapplication update :"+JSON.stringify(reqM));
    this.apiProvider.callData(reqM).then(
      (res) => {
        let data = res['data'];
        console.log("After MCAapplication update :"+JSON.stringify(res));
        if(res['status']==0){
          // missing Country
    let addressPermanent : AddressM = new AddressM();
    let addressCurrent : AddressM = new AddressM();
    let addressCompany : AddressM = new AddressM();
  
    let objAddresss: Array<AddressM> = [];
  
    //PermanentAddess of Address Table
    
    addressPermanent.applicationid = this.originalItem.data[0].applicationid;
    addressPermanent.addressid = this.appFormPermanentAddress.value.permanentAddressId;
    addressPermanent.addressno = this.appFormPermanentAddress.value.permanentAddressNo;
    addressPermanent.buildingname = this.appFormPermanentAddress.value.permanentVillage;
    addressPermanent.moo = this.appFormPermanentAddress.value.permanentMoo;
    addressPermanent.soi = this.appFormPermanentAddress.value.permanentSoi;
    addressPermanent.road = this.appFormPermanentAddress.value.permanentRoad;
    addressPermanent.subdistrict = this.appFormPermanentAddress.value.permanentAddress.addressSelected.tambon_name;
    addressPermanent.district = this.appFormPermanentAddress.value.permanentAddress.addressSelected.amphur_name;
    addressPermanent.province = this.appFormPermanentAddress.value.permanentAddress.addressSelected.province_name;
    addressPermanent.postcode = this.appFormPermanentAddress.value.permanentAddress.addressSelected.zip;
    addressPermanent.telno = this.appFormPermanentAddress.value.permanentTelNo;
    addressPermanent.mobileno = this.appFormPermanentAddress.value.permanentMobileNo;
    addressPermanent.email = this.appFormPermanentAddress.value.permanentAddressEmail;
    addressPermanent.type = "P";
    objAddresss.push(addressPermanent);
  
    //CurrentAddess of Address Table
    addressCurrent.applicationid = this.originalItem.data[0].applicationid;
    addressCurrent.addressid = this.appFormCurrentAddress.value.currentAddressId;
    addressCurrent.addressno = this.appFormCurrentAddress.value.currentAddressNo;
    addressCurrent.buildingname = this.appFormCurrentAddress.value.currentVillage;
    addressCurrent.moo = this.appFormCurrentAddress.value.currentMoo;
    addressCurrent.soi = this.appFormCurrentAddress.value.currentSoi;
    addressCurrent.road = this.appFormCurrentAddress.value.currentRoad;
    addressCurrent.subdistrict = this.appFormCurrentAddress.value.currentAddress.addressSelected.tambon_name;
    addressCurrent.district = this.appFormCurrentAddress.value.currentAddress.addressSelected.amphur_name;
    addressCurrent.province = this.appFormCurrentAddress.value.currentAddress.addressSelected.province_name;
    addressCurrent.postcode = this.appFormCurrentAddress.value.currentAddress.addressSelected.zip;
    addressCurrent.telno = this.appFormCurrentAddress.value.currentTelNo;
    addressCurrent.mobileno = this.appFormCurrentAddress.value.currentMobileNo;
    addressCurrent.email = this.appFormCurrentAddress.value.currentEmail;
    addressCurrent.type = "C";
    objAddresss.push(addressCurrent);
  
    //CompanyAddess of Address Table
    addressCompany.applicationid = this.originalItem.data[0].applicationid;
    addressCompany.addressid = this.appFormCompanyAddress.value.companyAddressId;
    addressCompany.addressno = this.appFormCompanyAddress.value.companyAddressNo;
    addressCompany.buildingname = this.appFormCompanyAddress.value.companyVillage;
    addressCompany.moo = this.appFormCompanyAddress.value.companyMoo;
    addressCompany.soi = this.appFormCompanyAddress.value.companySoi;
    addressCompany.road = this.appFormCompanyAddress.value.companyRoad;
    addressCompany.subdistrict = this.appFormCompanyAddress.value.companyAddress.addressSelected.tambon_name;
    addressCompany.district = this.appFormCompanyAddress.value.companyAddress.addressSelected.amphur_name;
    addressCompany.province = this.appFormCompanyAddress.value.companyAddress.addressSelected.province_name;
    addressCompany.postcode = this.appFormCompanyAddress.value.companyAddress.addressSelected.zip;
    addressCompany.telno = this.appFormCompanyAddress.value.companyTelNo;
    addressCompany.mobileno = this.appFormCompanyAddress.value.companyMobileNo;
    addressCompany.email = this.appFormCompanyAddress.value.companyEmail;
  
    addressCompany.type = "W";
    objAddresss.push(addressCompany);
  
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.ADDRESS;
    reqM.serviceName = ServiceName.UPDATE;
    reqM.param = objAddresss;
    console.log("Before Address update log : "+JSON.stringify(reqM));
    this.apiProvider.callData(reqM).then(
      (res) => {
        console.log("After Address update Log : "+JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );
    //OCCUPATION TABLE
    let occupation: OccupationsM = new OccupationsM();
    let otherOccupation: OccupationsM = new OccupationsM();
    let objOccupations: Array<OccupationsM> = [];
  
    occupation.applicationid = this.originalItem.data[0].applicationid;
    occupation.occupationid = this.appGeneral.value.occupationid;
    occupation.occupationcd = this.appGeneral.value.occupation;
    occupation.occupationdesc = this.appGeneral.value.occupation_desc;
    occupation.position = this.appGeneral.value.position;
    occupation.yearsalary = this.appGeneral.value.year_salary;
    occupation.businesstype = this.appGeneral.value.business_type;
    occupation.businessdesc = this.appGeneral.value.business_desc;
    occupation.type = "P";
    objOccupations.push(occupation);
  
    //Other Occupation
    otherOccupation.applicationid = this.originalItem.data[0].applicationid;
    otherOccupation.occupationid = this.appGeneral.value.otherOccupationid;
    otherOccupation.occupationcd = this.appGeneral.value.otherOccupation;
    otherOccupation.occupationdesc = this.appGeneral.value.otherOccupationDesc;
    otherOccupation.position = this.appGeneral.value.otherBusinessPosition;
    otherOccupation.yearsalary = this.appGeneral.value.otherBusinessYearSalary;
    otherOccupation.businesstype = this.appGeneral.value.therBusinessType;
    otherOccupation.businessdesc = this.appGeneral.value.otherBusinessDesc;
    otherOccupation.type = "O";
    objOccupations.push(otherOccupation);
  
    let reqOc: RequestModel = new RequestModel();
    reqOc.functionName = FunctionName.OCCUPATIONS;
    reqOc.serviceName = ServiceName.UPDATE;
    reqOc.param = objOccupations;
    console.log("Before Occupation Insert Log : "+JSON.stringify(reqOc));
    this.apiProvider.callData(reqOc).then(
      (res) => {
        console.log("After Occupation response Log : "+JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );
         //Beneficiary TABLE
         let beneficiary: BeneficiaryM = new BeneficiaryM();
         let objBeneficiarys: Array<BeneficiaryM> = [];
         beneficiary.applicationid = data[0].applicationid;
         beneficiary.beneficiaryid = this.appBeneficiary.value.beneficiaryid;
         //beneficiary.beneficiaryid = data[0].applicationid;
         beneficiary.identifyid = this.appBeneficiary.value.identify_id;
         beneficiary.identifytype = this.appBeneficiary.value.addressContact;
         beneficiary.buildingname = this.appBeneficiary.value.buildingname;
         beneficiary.addressno = this.appBeneficiary.value.address_no;
         beneficiary.moo = this.appBeneficiary.value.moo;
         beneficiary.soi = this.appBeneficiary.value.soi;
         beneficiary.road = this.appBeneficiary.value.road;
         beneficiary.name = this.appBeneficiary.value.name; 
         beneficiary.age = this.appBeneficiary.value.age; 
         beneficiary.relation = this.appBeneficiary.value.relation; 
         beneficiary.percentage = this.appBeneficiary.value.percentage; 
         beneficiary.subdistrict = this.appBeneficiary.value.address.addressSelected.tambon_name;
         beneficiary.district = this.appBeneficiary.value.address.addressSelected.amphur_name;
         beneficiary.province = this.appBeneficiary.value.address.addressSelected.province_name;
         beneficiary.postcode = this.appBeneficiary.value.address.addressSelected.zip;
         
 
         objBeneficiarys.push(beneficiary);
     
         let reqBe: RequestModel = new RequestModel();
         reqBe.functionName = FunctionName.BENEFICIARY;
         reqBe.serviceName = ServiceName.UPDATE;
         reqBe.param = objBeneficiarys;
         console.log("Before Beneficiary Insert Log : "+JSON.stringify(reqBe));
         this.apiProvider.callData(reqBe).then(
           (res) => {
             console.log("After  Beneficiary  response Log : "+JSON.stringify(res));
           },
           (err) => {
             console.log(err);
           }
         );
    
         //Insurance History TABLE
         let othInsurance: OtherinsuranceM = new OtherinsuranceM();
         let objOthInsurances: Array<OtherinsuranceM> = [];
         othInsurance.applicationid = data[0].applicationid;
         othInsurance.otherinsuredid = this.appHistory.value.otherinsuredid;
        // othInsurance.otherinsuredid = data[0].applicationid;
         othInsurance.companydesc = this.appHistory.value.company_desc;
         othInsurance.company = this.appHistory.value.company;
         othInsurance.accidentamount = this.appHistory.value.accident_amount;
         othInsurance.lifeamount = this.appHistory.value.life_amount;
         othInsurance.compensationdaily = this.appHistory.value.compensation_daily;
         othInsurance.criticalillnessamount = this.appHistory.value.critical_illness_amount
         othInsurance.contracteffectiveflag =  this.appHistory.value.contract_effective_flag
 
         objOthInsurances.push(othInsurance);
     
         let reqOin: RequestModel = new RequestModel();
         reqOin.functionName = FunctionName.OTHER_INSURANCE;
         reqOin.serviceName = ServiceName.UPDATE;
         reqOin.param = objOthInsurances;
         console.log("Before Other Insurance Insert Log : "+JSON.stringify(reqOin));
         this.apiProvider.callData(reqOin).then(
           (res) => {
             console.log("After  Other Insurance   response Log : "+JSON.stringify(res));
           },
           (err) => {
             console.log(err);
           }
         );
 
           //Insurance reject TABLE
           let insuranceRej: InsurancerejectionsM = new InsurancerejectionsM();
           let objInsuranceRejs: Array<InsurancerejectionsM> = [];
           insuranceRej.applicationid = data[0].applicationid;
           insuranceRej.rejectid = this.appHistory.value.rejectid;
        //   insuranceRej.rejectid = data[0].applicationid;
           insuranceRej.company = this.appHistory.value.company2;
           insuranceRej.companydesc = this.appHistory.value.company_desc2;
           insuranceRej.rejectdate = this.appHistory.value.reject_date;
           insuranceRej.description = this.appHistory.value.description;
 
 
           objInsuranceRejs.push(insuranceRej);
       
           let reqIrj: RequestModel = new RequestModel();
           reqIrj.functionName = FunctionName.INSURANCE_REJECTIONS;
           reqIrj.serviceName = ServiceName.UPDATE;
           reqIrj.param = objInsuranceRejs;
           console.log("Before Insurance Reject Insert Log : "+JSON.stringify(reqIrj));
           this.apiProvider.callData(reqIrj).then(
             (res) => {
               console.log("After Insurance Reject  response Log : "+JSON.stringify(res));
             },
             (err) => {
               console.log(err);
             }
           );
   
        }
      },
      (err) => {
        console.log(err);
      }
    );
  } catch(e) {
    alert(e);
    if(e !== 'cancel'){
      throw e;
    }
  }


}else{
  console.log("original data : NO" +this.broadcaster.on('appOriginalData') );
    console.log("show item broadcast ::",  this.itemSelected.referenceno);
    console.log("show appForm broadcast ::", this.appGeneral);
    console.log("show appFormPermanentAddress broadcast ::", this.appFormPermanentAddress);
    console.log("show appFormCurrentAddress broadcast ::", this.appFormCurrentAddress);
    console.log("show appFormCompanyAddress broadcast ::", this.appFormCompanyAddress);
    console.log("show appType broadcast ::", this.appType);
    console.log("show appBeneficiary broadcast ::", this.appBeneficiary);
    console.log("show appHistory broadcast ::", this.appHistory);
    console.log("show appMedicalHistory broadcast ::", this.appMedicalHistory);
    console.log("show appTreatmentHistory broadcast ::", this.appTreatmentHistory);
    console.log("show appSignPage broadcast ::", this.appSignPage);
    console.log("show appKb broadcast ::", this.appKb);

    //age missing religion_desc titleChange oldFirstName oldLastName weigthChange: '', weigthChangeNum:'',weigthChangeDesc:'',

    let objM: MCAapplicationsM = new MCAapplicationsM();
    objM.applicationno = this.itemSelected.referenceno;
    objM.birthdate = this.appGeneral.value.birthDate+" 00:00:00";
    objM.customerid = this.itemSelected.customerid;
    objM.title = this.appGeneral.value.title;
    objM.name = this.appGeneral.value.name;
    objM.lastname = this.appGeneral.value.lastName;
    objM.telno = this.appGeneral.value.telephone;
    objM.gender = this.appGeneral.value.gender;
    objM.heigh = this.appGeneral.value.heigh;
    objM.weigh = this.appGeneral.value.weigh;
    objM.race = this.appGeneral.value.race;
    objM.religion = this.appGeneral.value.religion;
    objM.nationality = this.appGeneral.value.nationality;
    objM.formtype = "T";
    objM.applicationstatus = "T";

    objM.identifytype = this.appGeneral.value.identifyType;
    objM.identifyid = this.appGeneral.value.identify_id;
    objM.identifyexpiredate = this.appGeneral.value.identifyExpireDate;
    objM.marital = this.appGeneral.value.martial;
    objM.spousetitle = this.appGeneral.value.spouseTitle;
    objM.spousename = this.appGeneral.value.spouseName;
    objM.spouselastname = this.appGeneral.value.spouseLastname;
    let objMs: Array<MCAapplicationsM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.MCAAPPLICATIONS;
    reqM.serviceName = ServiceName.INSERT;
    reqM.param = objMs;
    console.log("Before MCAapplication insert :"+JSON.stringify(reqM));
    this.apiProvider.callData(reqM).then(
      (res) => {
        let data = res['data'];
        console.log("After MCAapplication response :"+JSON.stringify(res));
        if(res['status']==0){
          // missing Country
    let addressPermanent : AddressM = new AddressM();
    let addressCurrent : AddressM = new AddressM();
    let addressCompany : AddressM = new AddressM();

    let objAddresss: Array<AddressM> = [];

    //PermanentAddess of Address Table
    addressPermanent.applicationid = data[0].applicationid;
    addressPermanent .addressno = this.appFormPermanentAddress.value.permanentAddressNo;
    addressPermanent .buildingname = this.appFormPermanentAddress.value.permanentVillage;
    addressPermanent .moo = this.appFormPermanentAddress.value.permanentMoo;
    addressPermanent .soi = this.appFormPermanentAddress.value.permanentSoi;
    addressPermanent .road = this.appFormPermanentAddress.value.permanentRoad;
    addressPermanent .subdistrict = this.appFormPermanentAddress.value.permanentAddress.addressSelected.tambon_name;
    addressPermanent .district = this.appFormPermanentAddress.value.permanentAddress.addressSelected.amphur_name;
    addressPermanent .province = this.appFormPermanentAddress.value.permanentAddress.addressSelected.province_name;
    addressPermanent .postcode = this.appFormPermanentAddress.value.permanentAddress.addressSelected.zip;
    addressPermanent .telno = this.appFormPermanentAddress.value.permanentTelNo;
    addressPermanent .mobileno = this.appFormPermanentAddress.value.permanentMobileNo;
    addressPermanent .email = this.appFormPermanentAddress.value.permanentAddressEmail;
    addressPermanent .type = "P";
    objAddresss.push(addressPermanent);

    //CurrentAddess of Address Table
    addressCurrent.applicationid = data[0].applicationid;
    addressCurrent.addressno = this.appFormCurrentAddress.value.currentAddressNo;
    addressCurrent.buildingname = this.appFormCurrentAddress.value.currentVillage;
    addressCurrent.moo = this.appFormCurrentAddress.value.currentMoo;
    addressCurrent.soi = this.appFormCurrentAddress.value.currentSoi;
    addressCurrent.road = this.appFormCurrentAddress.value.currentRoad;
    addressCurrent.subdistrict = this.appFormCurrentAddress.value.currentAddress.addressSelected.tambon_name;
    addressCurrent.district = this.appFormCurrentAddress.value.currentAddress.addressSelected.amphur_name;
    addressCurrent.province = this.appFormCurrentAddress.value.currentAddress.addressSelected.province_name;
    addressCurrent.postcode = this.appFormCurrentAddress.value.currentAddress.addressSelected.zip;
    addressCurrent.telno = this.appFormCurrentAddress.value.currentTelNo;
    addressCurrent.mobileno = this.appFormCurrentAddress.value.currentMobileNo;
    addressCurrent.email = this.appFormCurrentAddress.value.currentEmail;
    addressCurrent.type = "C";
    objAddresss.push(addressCurrent);

    //CompanyAddess of Address Table
    addressCompany.applicationid = data[0].applicationid;
    addressCompany.addressno = this.appFormCompanyAddress.value.companyAddressNo;
    addressCompany.buildingname = this.appFormCompanyAddress.value.companyVillage;
    addressCompany.moo = this.appFormCompanyAddress.value.companyMoo;
    addressCompany.soi = this.appFormCompanyAddress.value.companySoi;
    addressCompany.road = this.appFormCompanyAddress.value.companyRoad;
    addressCompany.subdistrict = this.appFormCompanyAddress.value.companyAddress.addressSelected.tambon_name;
    addressCompany.district = this.appFormCompanyAddress.value.companyAddress.addressSelected.amphur_name;
    addressCompany.province = this.appFormCompanyAddress.value.companyAddress.addressSelected.province_name;
    addressCompany.postcode = this.appFormCompanyAddress.value.companyAddress.addressSelected.zip;
    addressCompany.telno = this.appFormCompanyAddress.value.companyTelNo;
    addressCompany.mobileno = this.appFormCompanyAddress.value.companyMobileNo;
    addressCompany.email = this.appFormCompanyAddress.value.companyEmail;

    addressCompany.type = "W";
    objAddresss.push(addressCompany);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.ADDRESS;
    reqM.serviceName = ServiceName.INSERT;
    reqM.param = objAddresss;
    console.log("Before Address insert log : "+JSON.stringify(reqM));
    this.apiProvider.callData(reqM).then(
      (res) => {
        console.log("After Address response Log : "+JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );
    //OCCUPATION TABLE
    let occupation: OccupationsM = new OccupationsM();
    let otherOccupation: OccupationsM = new OccupationsM();
    let objOccupations: Array<OccupationsM> = [];

    occupation.applicationid = data[0].applicationid;
    occupation.occupationcd = this.appGeneral.value.occupation;
    occupation.occupationdesc = this.appGeneral.value.occupation_desc;
    occupation.position = this.appGeneral.value.position;
    occupation.yearsalary = this.appGeneral.value.year_salary;
    occupation.businesstype = this.appGeneral.value.business_type;
    occupation.businessdesc = this.appGeneral.value.business_desc;
    occupation.type = "P";
    objOccupations.push(occupation);

    //Other Occupation
    otherOccupation.applicationid = data[0].applicationid;
    otherOccupation.occupationcd = this.appGeneral.value.otherOccupation;
    otherOccupation.occupationdesc = this.appGeneral.value.otherOccupationDesc;
    otherOccupation.position = this.appGeneral.value.otherBusinessPosition;
    otherOccupation.yearsalary = this.appGeneral.value.otherBusinessYearSalary;
    otherOccupation.businesstype = this.appGeneral.value.therBusinessType;
    otherOccupation.businessdesc = this.appGeneral.value.otherBusinessDesc;
    otherOccupation.type = "O";
    objOccupations.push(otherOccupation);

    let reqOc: RequestModel = new RequestModel();
    reqOc.functionName = FunctionName.OCCUPATIONS;
    reqOc.serviceName = ServiceName.INSERT;
    reqOc.param = objOccupations;
    console.log("Before Occupation Insert Log : "+JSON.stringify(reqOc));
    this.apiProvider.callData(reqOc).then(
      (res) => {
        console.log("After Occupation response Log : "+JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );

        //Beneficiary TABLE
        let beneficiary: BeneficiaryM = new BeneficiaryM();
        let objBeneficiarys: Array<BeneficiaryM> = [];
        beneficiary.applicationid = data[0].applicationid;
        beneficiary.identifyid = this.appBeneficiary.value.identify_id;
        beneficiary.identifytype = this.appBeneficiary.value.addressContact;
        beneficiary.buildingname = this.appBeneficiary.value.buildingname;
        beneficiary.addressno = this.appBeneficiary.value.address_no;
        beneficiary.moo = this.appBeneficiary.value.moo;
        beneficiary.soi = this.appBeneficiary.value.soi;
        beneficiary.road = this.appBeneficiary.value.road;
        beneficiary.name = this.appBeneficiary.value.name; 
        beneficiary.age = this.appBeneficiary.value.age; 
        beneficiary.relation = this.appBeneficiary.value.relation; 
        beneficiary.percentage = this.appBeneficiary.value.percentage; 
        beneficiary.subdistrict = this.appBeneficiary.value.address.addressSelected.tambon_name;
        beneficiary.district = this.appBeneficiary.value.address.addressSelected.amphur_name;
        beneficiary.province = this.appBeneficiary.value.address.addressSelected.province_name;
        beneficiary.postcode = this.appBeneficiary.value.address.addressSelected.zip;
        

        objBeneficiarys.push(beneficiary);
    
        let reqBe: RequestModel = new RequestModel();
        reqBe.functionName = FunctionName.BENEFICIARY;
        reqBe.serviceName = ServiceName.INSERT;
        reqBe.param = objBeneficiarys;
        console.log("Before Beneficiary Insert Log : "+JSON.stringify(reqBe));
        this.apiProvider.callData(reqBe).then(
          (res) => {
            console.log("After  Beneficiary  response Log : "+JSON.stringify(res));
          },
          (err) => {
            console.log(err);
          }
        );
   
   

        //Insurance History TABLE
        let othInsurance: OtherinsuranceM = new OtherinsuranceM();
        let objOthInsurances: Array<OtherinsuranceM> = [];
        othInsurance.applicationid = data[0].applicationid;
        othInsurance.companydesc = this.appHistory.value.company_desc;
        othInsurance.company = this.appHistory.value.company;
        othInsurance.accidentamount = this.appHistory.value.accident_amount;
        othInsurance.lifeamount = this.appHistory.value.life_amount;
        othInsurance.compensationdaily = this.appHistory.value.compensation_daily;
        othInsurance.criticalillnessamount = this.appHistory.value.critical_illness_amount
        othInsurance.contracteffectiveflag =  this.appHistory.value.contract_effective_flag

        objOthInsurances.push(othInsurance);
    
        let reqOin: RequestModel = new RequestModel();
        reqOin.functionName = FunctionName.OTHER_INSURANCE;
        reqOin.serviceName = ServiceName.INSERT;
        reqOin.param = objOthInsurances;
        console.log("Before Other Insurance Insert Log : "+JSON.stringify(reqOin));
        this.apiProvider.callData(reqOin).then(
          (res) => {
            console.log("After  Other Insurance   response Log : "+JSON.stringify(res));
          },
          (err) => {
            console.log(err);
          }
        );

          //Insurance reject TABLE
          let insuranceRej: InsurancerejectionsM = new InsurancerejectionsM();
          let objInsuranceRejs: Array<InsurancerejectionsM> = [];
          insuranceRej.applicationid = data[0].applicationid;
          insuranceRej.company = this.appHistory.value.company2;
          insuranceRej.companydesc = this.appHistory.value.company_desc2;
          insuranceRej.rejectdate = this.appHistory.value.reject_date;
          insuranceRej.description = this.appHistory.value.description;


          objInsuranceRejs.push(insuranceRej);
      
          let reqIrj: RequestModel = new RequestModel();
          reqIrj.functionName = FunctionName.INSURANCE_REJECTIONS;
          reqIrj.serviceName = ServiceName.INSERT;
          reqIrj.param = objInsuranceRejs;
          console.log("Before Insurance Reject Insert Log : "+JSON.stringify(reqIrj));
          this.apiProvider.callData(reqIrj).then(
            (res) => {
              console.log("After Insurance Reject  response Log : "+JSON.stringify(res));
            },
            (err) => {
              console.log(err);
            }
          );
           let objApp: ApplicationModel = new ApplicationModel();
           objApp.applicationid =  data[0].applicationid;; //Require = Y
           objApp.applicationno = this.itemSelected.referenceno; //Require = Y from ReferNo 
           objApp.customerid = this.itemSelected.customerid; //Require = Y
           objApp.quotationno = this.itemSelected.quotationno //Require = Y
           let objApps: Array<ApplicationModel> = [];
           objApps.push(objApp);
      
          let reqApp: RequestModel = new RequestModel();
          reqApp.functionName = FunctionName.APPLICATION;
          reqApp.serviceName = ServiceName.INSERT;
          reqApp.param = objApps;
      
          this.apiProvider.callData(reqApp).then(
            (res) => {
              console.log(JSON.stringify(res));
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );

    
    //console.log("get broadcast by on :"+ this.broadcaster.on('appGeneral')+" || "+this.appGeneral.value.heigh);
  }
  }
  public ngAfterContentInit(): void {
    this.stepArray = this.list.toArray();
    this.total = this.stepArray.length;
  }

  public ngAfterViewInit(): void {
    this.oneStepArray = this.oneStep.toArray();
    this.stepArray[this.index].hidden = false;
    this.selectTitle = this.stepArray[this.index].title;
  }

  /**
   * ชื่อ step ที่ถูกเลือก
   */
  private selectTitle: string = '';

  /**
   * จำนวน step
   */
  private total: number;

  /**
   * เลือก step
   */
  private step(index: number) {
    // ล้างค่าที่เคยคลิก เลือกค่าที่ตรงกัน
    this.oneStepArray.forEach((element: ElementRef, i: number) => {
      if (i == index) {
        element.nativeElement.setAttribute('area-selected', 'true');
        this.stepArray[i].hidden = false;
        this.selectTitle = this.stepArray[i].title;
        this.index = index;
      }
      else {
        element.nativeElement.setAttribute('area-selected', 'false');
        this.stepArray[i].hidden = true;
      }
    });
  }
}