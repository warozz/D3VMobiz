import { Storage } from '@ionic/storage';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { IMyDpOptions } from "mydatepicker";
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ValidateProvider } from "../../../../providers/validate/validate";
import { DateFormatProvider } from "../../../../providers/date-format/date-format";
import { HttpClient } from '@angular/common/http';
import { AddressProvider } from "../../../../providers/address/address";
import { KbM } from '../../../../providers/service-table/kb-model';
import { ApplicationData } from '../../../../providers/application/application-data';
import { ApplicationAnswerM } from '../../../../providers/service-table/applicationanswer-model';
import { AddressM } from '../../../../providers/service-table/address-model';
import { PersonType } from '../../../../providers/constants/person-type';
import moment from 'moment';
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-app-kb',
  templateUrl: 'app-kb.html',
})
export class AppKbPage {

  public generalData;
  public addressRegistrationData;
  appKb: FormGroup;
  public addresses = [];
  insertOneFlag: boolean = false;
  public occupationDropdown;
  public cardProvince;
  public companyDropDown;
  public relationDropdown;
  private limit = 50;

  public check_gender;

  private maxDate;


  constructor(private http: HttpClient,
    private fb: FormBuilder,
    public content:Content ,
    public navCtrl: NavController,
    public navParams: NavParams,
    private validate: ValidateProvider,
    private dateFormat: DateFormatProvider,
    private appsData: ApplicationData,
    public addressService: AddressProvider,
    private storage: Storage) {

      this.maxDate = moment().format('YYYY-MM-DD');

      this.addresses = this.addressService.getAddress();

      this.appKb = this.fb.group({
        agentemail: '',
        agentid: '',
        addressno: '',
        applicationid: '',
        birthDate: [ '', Validators.required],
        businessdesc: ['', Validators.required],
        address: [{
          addressSelected: {
            province_name: '',
            tambon_name: '',
            amphur_name: '',
            zip: ''
          },
        }, Validators.required],
        province: [ '', Validators.required],
        subdistrict: [ '', Validators.required],
        district: [ '', Validators.required],
        postcode: [ '', Validators.required],
        contactAddresscd: [{
          addressSelected: {
            province_name: '',
            tambon_name: '',
            amphur_name: '',
            zip: ''
          }
        } , Validators.required],
        contactProvince: [ '', Validators.required],
        contactSubdistrict: [ '', Validators.required],
        contactDistrict: [ '', Validators.required],
        contactPostcode: [ '', Validators.required],
        custemail: '',
        gender: ['', Validators.required],
        heigh: '',
        identifyexpiredate: '',
        identifyid: ['', Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(13)])],
        identifyissuecountry: '',
        identifyissueprovince: ['', Validators.required],
        identifynoexpire: '',
        identifyOption:'',
        identifytype: '',
        insurerejectionflag: ['', Validators.required],
        ispreunderwritesuccess: '',
        kbid: '',
        mobileno: '',
        name: ['', Validators.required],
        nationality: '',
        occupationcd: ['', Validators.required],
        description: [{value : '', disabled: true}, Validators.required],
        otherinsuranceRows: this.fb.array([this.initItemRows()]),
        parent_lastname: '',
        parent_name: ['', Validators.required],
        parentrelation: ['', Validators.required],
        parenttitle: '',
        parenttitledesc: '',
        place: ['', Validators.required],
        position: ['', Validators.required],
        spousetitle: [{value : '', disabled: true}, Validators.required],
        spousetitledesc: '',
        spousename: [{value : '', disabled: true}, Validators.required],
        spouselastname: [{value : '', disabled: true}, Validators.required],
        spouseoccupationcd: [{value : '', disabled: true}, Validators.required],
        spouseoccupationdesc: [{value : '', disabled: true}, Validators.required],
        submitdate: ['', Validators.required],
        title: ['', Validators.required],
        titledesc: '',
        updatedate: '',
        updateid: '',
        witness1_fname: ['', Validators.required],
        witness2_fname: ['', Validators.required],
        work_place: ['', Validators.required],
        license:'',
        rejectreason: '',
        age:[''],
        identify_type: [''],
        lname: ['', Validators.required],
        identify_issue_district: ['', Validators.required],
        occupationdesc: '',
        status: ['', Validators.required],
        address_no: ['', Validators.required],
        address_no2: ['', Validators.required],
        building: '',
        building2: '',
        moo: '',
        soi: '',
        road: '',
        road2: '',
        moo2: '',
        soi2: '',
        caddress: ['', Validators.required],
        tel_no: '',
        other_insurance_yn: [ ''],
        company: [{ value: '', disabled: true }, Validators.required],
        companydesc: [{ value: '', disabled: true }, Validators.required],
        health: [ '', Validators.required],
        healthdesc:[{ value: '', disabled: true }, Validators.required],
        disabled:['', Validators.required],
        disabledDesc:[{ value: '', disabled: true }, Validators.required],
        retarded:['', Validators.required],
        retardedDesc:  [{ value: '', disabled: true }, Validators.required],
        hospital_last_2years: ['', Validators.required],
        hospital_last_2years_desc:  [{ value: '', disabled: true }, Validators.required],
        rejectdate: '',
        insertDate: ['', Validators.required]
      });

      this.appsData.getData('addressMs').then((res: Array<AddressM>) => {
        let address:  Array<AddressM> = res.filter(item => item.type == 'P');
        if (address.length > 0) {

          this.appKb.controls['address'].setValue({
            addressSelected: {
              province_name: address[0].province,
              tambon_name: address[0].subdistrict,
              amphur_name: address[0].district,
              zip: address[0].postcode
            }
          });
          this.appKb.controls['contactAddresscd'].setValue({
            addressSelected: {
              province_name: address[0].province,
              tambon_name: address[0].subdistrict,
              amphur_name: address[0].district,
              zip: address[0].postcode
            }
          });
        }
      }, 
      (err)=> {
        console.log('Err : ', err);
      });

      const quotation = this.appsData.getQuotation();
      if(_.isArray(quotation.quotationGuardianMs) && quotation.quotationGuardianMs.length > 0) {
        let quotationGuardianMs = quotation.quotationGuardianMs[0];
        var  sex = (quotationGuardianMs.sex == 'M') ? 'ชาย' : 'หญิง';
        this.check_gender = sex;
        var birthDay = moment(quotationGuardianMs.birthdate).format('YYYY-MM-DD');
      }

      this.appKb.controls['license'].disable();
      this.appKb.controls['gender'].disable();
      //readOnly
      this.storage.get('saleInformation').then(
        (saleDetailM) => {
          this.appKb.controls['license'].setValue(saleDetailM.licenseNo);
        }
      );

      this.appKb.controls['gender'].setValue(sex);
      this.appKb.controls['birthDate'].setValue(birthDay);
      this.appKb.controls['submitdate'].setValue(moment(quotation.createdatetime).format('YYYY-MM-DD'));

    this.http.get('assets/json/application/relation.json')
    .subscribe(data => {
      this.relationDropdown = data;
      this.relationDropdown = this.relationDropdown.relation;
      });

    this.http.get('assets/json/application/provinceJson.json')
    .subscribe(data => {
      this.cardProvince = data;
      this.cardProvince = this.cardProvince.province;
     });
     this.http.get('assets/json/application/occupationJson.json')
     .subscribe(data => {
       this.occupationDropdown = data;
       this.occupationDropdown = this.occupationDropdown.occupation;
      });
      this.http.get('assets/json/application/company.json')
    .subscribe(data => {
      this.companyDropDown = data;
      this.companyDropDown = this.companyDropDown.company;
     });

     /**
      * Mapped ค่าเข้า Provider เพื่อ save
      */
     this.appsData.appKb = this.appKb;


     /**
      * select data
      */
     this.appsData.getData('kbM').then((res: KbM) => {

      if (res != null && res != undefined) {
        if (res.title)
        this.appKb.controls['title'].setValue(res.title);
        if (res.name)
          this.appKb.controls['name'].setValue(res.name);
        if (res.lastname)
          this.appKb.controls['lname'].setValue(res.lastname);
        if (res.marital){
          this.appKb.controls['status'].setValue(res.marital);
          //สถานภาพสมรส
          if(res.marital == 'M'){

            this.appKb.controls['spousetitle'].setValue(res.spousetitle);
            this.appKb.controls['spousename'].setValue(res.spousename);
            this.appKb.controls['spouselastname'].setValue(res.spouselastname);
            this.appKb.controls['spouseoccupationcd'].setValue(res.spouseoccupationcd);
            this.statusMarry();
            if(res.spouseoccupationdesc != ''){
              this.appKb.controls['spouseoccupationdesc'].setValue(res.spouseoccupationdesc);
              this.appKb.controls['spouseoccupationdesc'].enable();
            }
          }
        }


        this.appKb.controls['identify_type'].setValue(res.identifytype);
        this.appKb.controls['identifyid'].setValue(res.identifyid);
        if (res.identifytype == '01')
          this.appKb.controls['identifyOption'].setValue(res.identifytype);
        else
          this.appKb.controls['identifyOption'].setValue('N');
        this.identifyOptionChange(this.appKb.controls['identifyOption'].value, false);
        this.appKb.controls['other_insurance_yn'].setValue(res.otherinsuranceyn);
        this.appKb.controls['caddress'].setValue(res.contactaddresscd);
        this.appKb.controls['rejectreason'].setValue(res.rejectreason);
        this.appKb.controls['position'].setValue(res.position);
        this.appKb.controls['place'].setValue(res.place);
        this.appKb.controls['work_place'].setValue(res.workplace);
        this.appKb.controls['witness1_fname'].setValue(res.witness1fname);
        this.appKb.controls['witness2_fname'].setValue(res.witness2fname);
        if(res.occupationcd)
        this.appKb.controls['occupationcd'].setValue(res.occupationcd);
        if(res.parentrelation)
          this.appKb.controls['parentrelation'].setValue(res.parentrelation);

        this.appKb.controls['parent_name'].setValue(res.parentname);
        this.appKb.controls['submitdate'].setValue(moment(res.submitdate).format('YYYY-MM-DD'));
        this.appKb.controls['insurerejectionflag'].setValue(res.insurerejectionflag);
        this.insurerejectionflag(res.insurerejectionflag);
        this.appKb.controls['identify_issue_district'].setValue(res.identifyissuedistrict);
        if(res.identifyissueprovince)
        this.appKb.controls['identifyissueprovince'].setValue(res.identifyissueprovince);

        if (res.identifyexpiredate)
          this.appKb.controls['insertDate'].setValue(moment(res.identifyexpiredate).format('YYYY-MM-DD'));

        for (let index of res.addressMs){
          if (PersonType.KB == index.persontype && 'P' == index.type &&  !this.insertOneFlag) {
            this.appKb.controls['address_no'].setValue(index.addressno);
            this.appKb.controls['building'].setValue(index.buildingname);
            this.appKb.controls['moo'].setValue(index.moo);
            this.appKb.controls['soi'].setValue(index.soi);
            this.appKb.controls['road'].setValue(index.road);
            this.appKb.controls['tel_no'].setValue(index.telno);
            this.appKb.value.address.addressSelected.tambon_name = index.subdistrict;
            if(index.subdistrict)
            this.appKb.controls['subdistrict'].setValue(index.subdistrict);

            this.appKb.value.address.addressSelected.amphur_name = index.district;
            if(index.district)
            this.appKb.controls['district'].setValue(index.district);

            this.appKb.value.address.addressSelected.province_name = index.province;
            if(index.province)
            this.appKb.controls['province'].setValue(index.province);

            this.appKb.value.address.addressSelected.zip = index.postcode;
            if(index.postcode)
            this.appKb.controls['postcode'].setValue(index.postcode);

            this. insertOneFlag = true;
          }
          else if (PersonType.KB == index.persontype &&  this.insertOneFlag) {
            this.appKb.controls['address_no2'].setValue(index.addressno);
            this.appKb.controls['building2'].setValue(index.buildingname);
            this.appKb.controls['moo2'].setValue(index.moo);
            this.appKb.controls['soi2'].setValue(index.soi);
            this.appKb.controls['road2'].setValue(index.road);
            this.appKb.controls['tel_no'].setValue(index.telno);

            this.appKb.value.contactAddresscd.addressSelected.tambon_name = index.subdistrict;
            if(index.subdistrict)
            this.appKb.controls['subdistrict'].setValue(index.subdistrict);
            this.appKb.value.contactAddresscd.addressSelected.amphur_name = index.district;
            if(index.district)
            this.appKb.controls['district'].setValue(index.district);
            if(index.province)
            this.appKb.controls['province'].setValue(index.province);
            this.appKb.value.contactAddresscd.addressSelected.province_name = index.province;
            if(index.postcode)
            this.appKb.controls['postcode'].setValue(index.postcode);
            this.appKb.value.contactAddresscd.addressSelected.zip = index.postcode;

          }
      }

      for (let item of res.occupationsMs) {
        if (PersonType.KB == item.persontype) {
          this.appKb.value.occupationcd = item.occupationcd;
          if(item.description != ''  ||  this.appKb.value.occupationcd == 25 ){
            this.appKb.controls['description'].setValue(item.description);
            this.appKb.controls['description'].enable();
          }
          else {
            this.appKb.controls['description'].disable();
          }

          this.appKb.value.position = item.position;
          this.appKb.controls['businessdesc'].setValue(item.businessdesc);
        }

      }

      for (let oc of res.insurancerejectionsMs) {
        if (PersonType.KB == oc.persontype) {
          this.appKb.controls['company'].setValue(oc.company);
          this.changeCompany();
          this.appKb.controls['companydesc'].setValue(oc.companydesc);
          this.appKb.controls['rejectdate'].setValue(oc.rejectdate);
        }

      }

      const itemAdd = <FormArray>this.appKb.controls['otherinsuranceRows']
      itemAdd.removeAt(0);

      for (let oc of res.otherinsuranceMs) {

        if (PersonType.KB == oc.persontype) {

         let otherRows =  this.fb.group({
            company: [oc.company, Validators.required],
            insuranceplan: oc.insuredtype,
            insuranceno: oc.regid,
            totalinsurance: oc.suminsured,
            issueDate: oc.startdate,
            contractflag: [oc.contracteffectiveflag, Validators.required]
        });

        itemAdd.push(otherRows);

        }
      }
      }

     }, 
     (err)=> {
       console.log('Err : ', err);
     });

     // setting Application Answer
     this.appsData.getData('applicationAnswerMs').then((res: Array<ApplicationAnswerM> ) => {
      for (let item of res) {

        if (item.questionid == '71') {
          this.appKb.controls['health'].setValue(item.answeryn)
          if(item.answeryn == 'N' ){
            this.appKb.controls['healthdesc'].setValue(item.answerdesc)
            this.appKb.controls['healthdesc'].enable()
          }
          else
            this.appKb.controls['healthdesc'].disable();
        }

        if (item.questionid == '72') {
          this.appKb.controls['disabled'].setValue(item.answeryn)
          if(item.answeryn == 'N'){

            this.appKb.controls['disabledDesc'].setValue(item.answerdesc)
            this.appKb.controls['disabledDesc'].enable();
          }
          else {
            this.appKb.controls['disabledDesc'].disable();
          }
        }

        if (item.questionid == '73') {
          this.appKb.controls['retarded'].setValue(item.answeryn)
          if(item.answeryn == 'Y'){
            this.appKb.controls['retardedDesc'].setValue(item.answerdesc)
            this.appKb.controls['retardedDesc'].enable();
          }
          else
          this.appKb.controls['retardedDesc'].disable();

        }

        if (item.questionid == '74') {
          this.appKb.controls['hospital_last_2years'].setValue(item.answeryn)
          if(item.answeryn == 'Y') {
            this.appKb.controls['hospital_last_2years_desc'].setValue(item.answerdesc)
            this.appKb.controls['hospital_last_2years_desc'].enable();
          }
          else {
            this.appKb.controls['hospital_last_2years_desc'].disable();
          }
        }
      }

    }, 
    (err)=> {
      console.log('Err : ', err);
    });

  }
  @Input() public generalDataEdit:any;
  @Input() public addressRegistrationDataEdit:any;
  @Input() private id: string = "";

  ngOnInit() {

  }

  initItemRows() : FormGroup {
    return this.fb.group({
        // list all your form controls here, which belongs to your form array
        company: ['', Validators.required],
        insuranceplan: [''],
        insuranceno: [''],
        totalinsurance: [''],
        issueDate: [''],
        contractflag: ['', Validators.required]
    });
}

emptyStringValidator(control: FormControl) {
  let emptyStr = control.value;
  if ((typeof emptyStr === 'string' && emptyStr.trim().length <= 0) || typeof emptyStr !== "string") {
    return {
      emptyStr: {
        emptyStr: "null , empty string"
      }
    }
  }
  return null;
}

  private startDateOption: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',

  };

  private endDateOption: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    alignSelectorRight: true
  };
  scrollToTop() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollToTop();
  }
  scrollToBot() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollToBottom();
  }
  scrollToAddress () {
    this.content.scrollTo(0, 800, 500);
  }
  scrollToTreatment () {
    this.content.scrollTo(0, 2050, 500);
  }
  scrollToInsurance () {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollTo(0, 1600, 500);
  }
  dateChange(date){

  }

  get subdistrict   () {
    return this.appKb.value.currentAddress.addressSelected.tambon_name;
  }
  get district  () {
    return this.appKb.value.currentAddress.addressSelected.amphur_name;
  }
  get province   () {
    return this.appKb.value.currentAddress.addressSelected.province_name;
  }
  get postcode  () {
    return this.appKb.value.currentAddress.addressSelected.zip;
  }

  /**
   * add more company panel
   */
  private addCompany() : void {

     // control refers to your formarray
     const control = <FormArray>this.appKb.controls['otherinsuranceRows'];

    if (control.length < 2){

    // add new formgroup
    control.push(this.initItemRows());
    }
  }

    /**
   * remove company panel
   */
  private removeCompany(index?: number) : void {
  // control refers to your formarray
    if (typeof index != 'undefined') {
      const control = <FormArray>this.appKb.controls['otherinsuranceRows'];

      if (control.length > 1){

        // remove the chosen row
          control.removeAt(index);
      }
    }

    else {
      const control = <FormArray>this.appKb.controls['otherinsuranceRows'];
      control.removeAt(1);
      control.removeAt(0);
    }
  }

  dateValueChange(date, position: string){

    this.appKb.get(position).setValue(date)
  }



  preNameSelected(preName: string) {
    // this.appKb.value.title = preName;
    // if(this.appKb.value.title == 'นาย' || this.appKb.value.title == 'เด็กชาย'){
    //   this.appKb.value.gender = 'M';

    // } else if(this.appKb.value.title == 'นาง' || this.appKb.value.title == 'นางสาว' || this.appKb.value.title == 'เด็กหญิง') {
    //   this.appKb.value.gender = 'F';
    // }

    // var  sex = (this.appKb.value.gender == 'M') ? 'ชาย' : 'หญิง';
    // this.appKb.controls['gender'].disable();
    // this.appKb.controls['gender'].setValue(sex);
  }

  private changeKbStartDate(date: string, idx: number): void {
    let items = this.appKb.get('otherinsuranceRows') as FormArray;
    items.at(idx).get('issueDate').setValue(date);
  }

  // set identify type default
  private identifyOptionChange(value: string, clear: boolean = true): void {
    if (value == 'N') {
      if (clear)
        this.appKb.controls['identify_type'].setValue('02');
      this.appKb.controls['identifyid'].setValidators([Validators.required]);
    }
    else {
      this.appKb.controls['identifyid'].setValidators([Validators.required, Validators.maxLength(13), Validators.minLength(13)]);
    }

    if (clear)
      this.appKb.controls['identifyid'].setValue('');
    this.appKb.controls['identifyid'].updateValueAndValidity();
  }


  // validate อาชีพ อิ่นๆ
  private occupationChage(e: string): void{
    
    if(e == '25')
    {
      this.appKb.controls['description'].enable();
    }
    else {
      this.appKb.controls['description'].setValue('');
      this.appKb.controls['description'].disable();
    }
  }
  // อาชีพคู่สมรส
  private spouseoccupationcdChange(e: string):void{

    if(e == '25')
    {
      this.appKb.controls['spouseoccupationdesc'].enable();
    }
    else {
      this.appKb.controls['spouseoccupationdesc'].disable();
      this.appKb.controls['spouseoccupationdesc'].setValue('');
    }
  }

  //สถานภาพ
  private statusMarry(): void{
    if(this.appKb.controls['status'].value == 'M'){

    this.appKb.controls['spousetitle'].enable();
    this.appKb.controls['spousename'].enable();
    this.appKb.controls['spouselastname'].enable();
    this.appKb.controls['spouseoccupationcd'].enable();
    }
    else {
      this.appKb.controls['spousetitle'].disable();
      this.appKb.controls['spousename'].disable();
      this.appKb.controls['spouselastname'].disable();
      this.appKb.controls['spouseoccupationcd'].disable();

      this.appKb.controls['spousetitle'].setValue('')
      this.appKb.controls['spousename'].setValue('')
      this.appKb.controls['spouselastname'].setValue('')
      this.appKb.controls['spouseoccupationcd'].setValue('')
    }
  }

  private insurerejectionflag(flag: string): void {

    if (flag == 'Y') {
      this.appKb.controls['company'].enable();
    }
    else {
      this.appKb.controls['company'].reset();
      this.appKb.controls['companydesc'].reset();
      this.appKb.controls['rejectreason'].reset();
      this.appKb.controls['rejectdate'].reset();
      this.appKb.controls['company'].disable();
    }
  }
  private changeCompany(): void {
    if (this.appKb.controls['company'].value == 'อื่นๆ')
      this.appKb.controls['companydesc'].enable();
    else
      this.appKb.controls['companydesc'].disable();
  }

  //ประวัติการรักษา
  private hospitalLast2yearsChange(): void{

    if(this.appKb.controls['hospital_last_2years'].value == 'Y'){

      this.appKb.controls['hospital_last_2years_desc'].enable();
    }
    else {
      this.appKb.controls['hospital_last_2years_desc'].disable();
      this.appKb.controls['hospital_last_2years_desc'].setValue('');
    }
  }
  //เป็นคนปัญญาอ่อนหรือไม่
  private retardedChange(): void{
    if(this.appKb.controls['retarded'].value == 'Y'){
      this.appKb.controls['retardedDesc'].enable();
    }
    else {
      this.appKb.controls['retardedDesc'].disable();
      this.appKb.controls['retardedDesc'].setValue('');
    }
  }
  //ท่านมีร่างกายส่วนหนึ่งส่วนใดพิการหรือไม่
  private disabledChange(): void{
    if(this.appKb.controls['disabled'].value == 'N'){
      this.appKb.controls['disabledDesc'].enable();
    }
    else {
      this.appKb.controls['disabledDesc'].disable();
      this.appKb.controls['disabledDesc'].setValue('');
    }
  }
  //ขณะนี้ท่านมีสุขภาพร่างกายและจิตใจสมบูรณ์ดีหรือไม่
  private healthChange(): void{

    if(this.appKb.controls['health'].value == 'N'){
      this.appKb.controls['healthdesc'].enable();
    }
    else {
      this.appKb.controls['healthdesc'].disable();
      this.appKb.controls['healthdesc'].setValue('');
    }
  }
  private copyaddress(option: String): void {
    if(option=='P' && this.appKb.value.caddress =='P')
    {
      this.enableFieldContact(false);
      this.appKb.controls['address_no2'].setValue(this.appKb.controls['address_no'].value);
      this.appKb.controls['building2'].setValue(this.appKb.controls['building'].value);
      this.appKb.controls['moo2'].setValue(this.appKb.controls['moo'].value);
      this.appKb.controls['soi2'].setValue(this.appKb.controls['soi'].value);
      this.appKb.controls['road2'].setValue(this.appKb.controls['road'].value);
      this.appKb.controls['contactSubdistrict'].setValue(this.appKb.controls['subdistrict'].value);
      this.appKb.controls['contactDistrict'].setValue(this.appKb.controls['district'].value);
      this.appKb.controls['contactProvince'].setValue(this.appKb.controls['province'].value);
      this.appKb.controls['contactPostcode'].setValue(this.appKb.controls['postcode'].value);

      this.appKb.value.contactAddresscd.addressSelected = this.appKb.value.address.addressSelected;
      this.appKb.controls['contactAddresscd'] = this.appKb.controls['address'];
    }
    else
    {
      let tmp = this.appKb.value.address.addressSelected;

      this.enableFieldContact(true);
      this.appKb.controls['address_no2'].setValue("");
      this.appKb.controls['building2'].setValue("");
      this.appKb.controls['moo2'].setValue("");
      this.appKb.controls['soi2'].setValue("");
      this.appKb.controls['road2'].setValue("");
      this.appKb.controls['contactSubdistrict'].setValue("");
      this.appKb.controls['contactDistrict'].setValue("");
      this.appKb.controls['contactProvince'].setValue("");
      this.appKb.controls['contactPostcode'].setValue("");
      this.appKb.controls['tel_no'].setValue("");

      this.appKb.controls['address']=new FormControl({
        addressSelected: {
          province_name: tmp.province_name,
          tambon_name: tmp.tambon_name,
          amphur_name: tmp.amphur_name,
          zip: tmp.zip
        }
      });
      this.appKb.controls['contactAddresscd']=new FormControl({
        addressSelected: {
          province_name: '',
          tambon_name: '',
          amphur_name: '',
          zip: ''
        }
      });
      this.appKb.value.contactAddresscd.addressSelected={
        province_name: '',
        tambon_name: '',
        amphur_name: '',
        zip: ''
      };
    }
  }
  private enableFieldContact(flag:boolean)
  {
    if(flag)
    {
      this.appKb.controls['address_no2'].enable();
      this.appKb.controls['building2'].enable();
      this.appKb.controls['moo2'].enable();
      this.appKb.controls['soi2'].enable();
      this.appKb.controls['road2'].enable();
      this.appKb.controls['contactSubdistrict'].enable();
      this.appKb.controls['contactDistrict'].enable();
      this.appKb.controls['contactProvince'].enable();
      this.appKb.controls['contactPostcode'].enable();
    }
    else
    {
      this.appKb.controls['address_no2'].disable();
      this.appKb.controls['building2'].disable();
      this.appKb.controls['moo2'].disable();
      this.appKb.controls['soi2'].disable();
      this.appKb.controls['road2'].disable();
      this.appKb.controls['contactSubdistrict'].disable();
      this.appKb.controls['contactDistrict'].disable();
      this.appKb.controls['contactProvince'].disable();
      this.appKb.controls['contactPostcode'].disable();
    }
  }
}
