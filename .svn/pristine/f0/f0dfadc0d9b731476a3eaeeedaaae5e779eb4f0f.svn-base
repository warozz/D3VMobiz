import { UlinkApplicationDetailM } from './../../../../providers/ulink-app-data/ulink-application-detail-model';
import { UnderAgeChildModel } from './../../../../providers/unitlink-under-age-child/under-agechild-model';
import { ApplicationMasterM } from './../../../../providers/application/application-master-model';
import { Subscription } from 'rxjs';
import { ApplicationAnswerM } from './../../../../providers/service-table/applicationanswer-model';
import { Component, Input  } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { IMyDpOptions } from "mydatepicker";
import { FormBuilder, Validators, FormGroup, FormControl, FormArray} from '@angular/forms';
import { DateFormatProvider } from "../../../../providers/date-format/date-format";
import { HttpClient } from '@angular/common/http';
import { ApplicationData } from '../../../../providers/application/application-data';
import moment from 'moment';
import { AppGePermanentAddressPage } from '../../../app-form/normal-app/app-general/app-ge-permanent-address/app-ge-permanent-address';
import { AppGeCurrentAddressPage } from './app-ge-current-address/app-ge-current-address';
import { AppGeCompanyAddressPage } from './app-ge-company-address/app-ge-company-address';
import { OccupationsM } from '../../../../providers/service-table/occupations-model';
import { MCAapplicationsM } from '../../../../providers/service-table/mcaapplications-model';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { CalculateAgeUtil } from '../../../../providers/utility/calculate-age-util';
import { Broadcaster } from '../../../../providers/utility/broadcaster';
import _ from "lodash";

@IonicPage()
@Component({
  selector: 'page-app-general',
  templateUrl: 'app-general.html',
})
export class AppGeneralPage {

  public isApp;
  public test;
  public getTabId =1;
  public religionDropdown;
  public occupationDropdown;
  public occupationPPNGDropdown;
  public countryDropdown;
  public itemSelected;
  public quotationM = this.appDatas.getQuotation();
  public occupData;
  public disabledCalendarIdentifyNoExpire : boolean = false;
  public minExpireDate;
  public showCloseIcon: boolean = false;

  private child: boolean;
  private isUlink: boolean = false;
  private isPPNG: boolean = false;

  private tabsPage = [
    {
      root:   AppGePermanentAddressPage,
      title: 'ที่อยู่ตามทะเบียนบ้าน',
      disabled: false
    },
    {
      root:   AppGeCurrentAddressPage,
      title: 'ที่อยู่ปัจจุบัน',
      disabled: false
    },
    {
      root:   AppGeCompanyAddressPage,
      title: 'สถานที่ทำงาน',
      disabled: false
    }
  ];

  @Input() public generalDataEdit:any;
  appGeneral: FormGroup;

  private subscription: Array<Subscription> = [];

  constructor(private appDatas: ApplicationData,
    private http: HttpClient,
    private fb: FormBuilder,
    private content:Content,
    private dateFormat: DateFormatProvider,
    private broadcaster: Broadcaster) {
console.log('appDatas', appDatas)
      this.appGeneral = this.fb.group({
        // title: [{ value: this.quotationM.pname, disabled: true }, Validators.required],
        title: [{ value: this.quotationM.pname, disabled: true }],
        name: [{ value: this.quotationM.fname, disabled: true }, Validators.required],
        lastName: [{ value: this.quotationM.lname, disabled: true }, Validators.required],
        telephone: this.quotationM.prospectM.mobilephone,
        gender: { value: this.quotationM.gender, disabled: true },
        birthDate: moment(this.quotationM.birthdate).format('YYYY-MM-DD'),
        age: { value: CalculateAgeUtil.calculateAge(new Date(this.quotationM.birthdate)), disabled: true },
        heigh : [ '', Validators.required],
        weigh : [ '', Validators.required],
        race : [ '', Validators.required],
        religion : ['', Validators.required],
        religion_desc: [{ value: '', disabled: true },Validators.required],
        nationality : ['',Validators.required],
        isChange: '',
        titleChange: '',
        titleChangeOther: '',
        oldFirstName: '',
        oldLastName: '',
        contactaddresscd: ['',Validators.required],
        identifyOption: 'N',
        identifyType: '01',
        identify_id : [this.quotationM.prospectM.citizenID,Validators.required],
        identifyExpireDate: [{value: '', disabled: false}, Validators.required],
        identifyNoExpire:false,
        martial:[this.quotationM.prospectM.maritalstatus, Validators.required],
        spouseTitle: '',
        spouseName: '',
        spouseLastname: '',
        spouseIdentifyid: ['', Validators.compose([Validators.minLength(13), Validators.maxLength(13)])],
        weigthChange: ['',Validators.required],
        weigthChangeUD: '',
        weigthChangeNum:'',
        weigthChangeDesc:'',
        drug: ['',Validators.required],
        drug_exp: ['',Validators.required],
        description:'',
        occupationid: '',
        occupation: ['',Validators.required],
        occupation_ppng: ['',Validators.required],
        occupation_desc : [{ value: '', disabled: true },Validators.required],
        position : ['',Validators.required],
        year_salary : ['',Validators.required],
        business_type : ['',Validators.required],
        business_desc : ['',Validators.required],
        otherOccupation : '',
        otherBusinessPosition : '',
        otherOccupationDesc : '',
        otherBusinessYearSalary : '',
        otherBusinessType : '',
        otherBusinessDesc : '',
        childdrenTeen: ['', Validators.required],
        childrenData: this.fb.array([])
      });

      this.appGeneral.controls['identify_id'].disable();
      // Ulink
      this.appGeneral.controls['childdrenTeen'].disable();
      this.appGeneral.controls['occupation_ppng'].disable();
      /////
      this.appDatas.appGeneral = this.appGeneral;

      this.addFormForUlink(); // สร้างฟอร์มสำหรับ ยูลิงค์

      // let currentDate = new Date();
      // let years = currentDate.getFullYear();
      // let months = currentDate.getMonth()+1;
      // let days = currentDate.getDate();
      //this.minExpireDate = moment(years+"-"+months+"-"+days).format("YYYY-MM-DD");

      // อ้างอิงตามเอกสาร วันหมดอายุสามารถเลือกย้อนหลังได้ไม่เกิน 30 วัน [Updated: 22/10/2018 #3527]
      this.minExpireDate = moment().add(-30, 'days').format('YYYY-MM-DD');

      this.parallelRequests();
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  parallelRequests() {
    const parallel$ = Observable.forkJoin(
        this.http.get('assets/json/application/religionJson.json'),
        this.http.get('assets/json/application/occupationJson.json'),
        this.http.get('assets/json/application/countryJson.json'),
        this.http.get('assets/json/application/occupationppngJson.json')
    );

    parallel$.subscribe(
        values => {
          this.religionDropdown = this.objectValues(this.arrayJsonToObject(values, 'religion'));
          this.occupationDropdown = this.objectValues(this.arrayJsonToObject(values, 'occupation'));
          this.countryDropdown = this.objectValues(this.arrayJsonToObject(values, 'country'));
          this.occupationPPNGDropdown = this.objectValues(this.arrayJsonToObject(values, 'occupationPPNG'));

          this.initMappingData();
        }
    );
  }

  objectValues = (obj) => Object.keys(obj).map( key => obj[key]).reduce(item => item);

  public arrayJsonToObject = (array, key) =>
    array
      .filter(item => item[key])
      .reduce(item => item);

  public initMappingData() {

    var age = moment().diff(this.quotationM.birthdate,'year');

    this.checkChild(age);
    this.appDatas.getData('mcaapplicationM').then((res: MCAapplicationsM) => {
      // console.log('mcaapplicationM res=>',res);
      if (res.title)
        this.appGeneral.controls['title'].setValue(res.title);
      if (res.name)
        this.appGeneral.controls['name'].setValue(res.name);
      if (res.lastname)
        this.appGeneral.controls['lastName'].setValue(res.lastname);
      if (res.telno)
        this.appGeneral.controls['telephone'].setValue(res.telno);
      if (res.gender)
        this.appGeneral.controls['gender'].setValue(res.gender);
        this.checkGender(res.gender);
      if (res.birthdate)
        this.appGeneral.controls['birthDate'].setValue(res.birthdate);
      // this.appGeneral.controls['age'].setValue();
      if (res.heigh)
      //  var cheigh =  res.heigh+' ซม.';
        this.appGeneral.controls['heigh'].setValue(res.heigh);
      if (res.weigh)
      // var cWeigh = res.weigh+' กก.';
        this.appGeneral.controls['weigh'].setValue(res.weigh);
      if (res.race)
        this.appGeneral.controls['race'].setValue(res.race);


      this.appGeneral.controls['religion'].setValue(
        res.religion == 'พุทธ' || res.religion == 'คริสต์' ||
        res.religion == 'อิสลาม' || res.religion == 'ซิกซ์' ||
        res.religion == 'ฮินดู' ? res.religion : 'อื่นๆ');

      this.appGeneral.controls['religion_desc'].setValue(
        res.religion == 'พุทธ' || res.religion == 'คริสต์' ||
        res.religion == 'อิสลาม' || res.religion == 'ซิกซ์' ||
        res.religion == 'ฮินดู' ? '' : res.religion);

      this.appGeneral.controls['nationality'].setValue(res.nationality);
      this.appGeneral.controls['titleChange'].setValue(res.extitle);
      // this.appGeneral.controls['titleChange'].setValue(res.extitle == 'นาย' || res.extitle == 'นาง' || res.extitle == 'นางสาว' || res.extitle == 'เด็กชาย' || res.extitle == 'เด็กหญิง' ? res.extitle : 'อื่นๆ');
      // this.appGeneral.controls['titleChangeOther'].setValue(res.extitle == 'นาย' || res.extitle == 'นาง' || res.extitle == 'นางสาว' || res.extitle == 'เด็กชาย' || res.extitle == 'เด็กหญิง' ? '' : res.extitle);
      this.appGeneral.controls['oldFirstName'].setValue(res.exname);
      this.appGeneral.controls['oldLastName'].setValue(res.exlastname);
      this.appGeneral.controls['identifyType'].setValue(res.identifytype);
      this.appGeneral.controls['identify_id'].setValue(res.identifyid);
      if (res.identifyexpiredate != '')
        this.appGeneral.controls['identifyExpireDate'].setValue(moment(res.identifyexpiredate).format('YYYY-MM-DD'));
      this.appGeneral.controls['identifyNoExpire'].setValue(res.identifynoexpire == 'Y');

      this.disabledCalendarIdentifyNoExpire = res.identifynoexpire == 'Y' ? true:false;
      // alert(this.disabledCalendarIdentifyNoExpire);
      if(this.disabledCalendarIdentifyNoExpire) {
        this.appGeneral.controls['identifyExpireDate'].disable();

      } else {

        this.appGeneral.controls['identifyExpireDate'].enable();

      }
      if (res.marital == 'M' || res.marital == 'S' || res.marital == 'D' || res.marital == 'G')
        this.appGeneral.controls['martial'].setValue(res.marital);
      if(res.contactaddresscd=='C'||res.contactaddresscd=='W'||res.contactaddresscd=='P'){
      this.appGeneral.controls['contactaddresscd'].setValue(res.contactaddresscd);

      // ใส่ validate สถานะภาพ
      this.setMarryValidate(res.marital === 'M');

    //  this.disabledCalendarIdentifyNoExpire = false;
      if(res.identifytype == '01' || res.identifytype == '07')
      this.appGeneral.controls['identifyNoExpire'].enable();
      else if(res.identifytype == '11'){
        this.appGeneral.controls['identifyNoExpire'].disable();
        this.appGeneral.controls['identifyExpireDate'].disable();
        this.disabledCalendarIdentifyNoExpire = true;
      }
      else
      this.appGeneral.controls['identifyNoExpire'].disable();
      //this.disabledCalendarIdentifyNoExpire = true;
      }

      this.appGeneral.controls['spouseTitle'].setValue(res.spousetitle);
      this.appGeneral.controls['spouseName'].setValue(res.spousename);
      this.appGeneral.controls['spouseLastname'].setValue(res.spouselastname);
      this.appGeneral.controls['description'].setValue(res.additiondetail);
      // this.appGeneral.controls['occupationid'].setValue();
      // this.appGeneral.controls['occupation'].setValue();
      // this.appGeneral.controls['occupation_desc'].setValue();
      // this.appGeneral.controls['position'].setValue();
      // this.appGeneral.controls['year_salary'].setValue();
      // this.appGeneral.controls['business_type'].setValue();
      // this.appGeneral.controls['business_desc'].setValue();
      // this.appGeneral.controls['otherOccupation'].setValue();
      // this.appGeneral.controls['otherBusinessPosition'].setValue();
      // this.appGeneral.controls['otherOccupationDesc'].setValue();
      // this.appGeneral.controls['otherBusinessYearSalary'].setValue();
      // this.appGeneral.controls['otherBusinessType'].setValue();
      // this.appGeneral.controls['otherBusinessDesc'].setValue();

      if (res.extitle || res.exname || res.exlastname)
        this.appGeneral.controls['isChange'].setValue('Y');
      else  this.appGeneral.controls['isChange'].setValue('N');

      if (res.identifytype != '01'){
        this.appGeneral.controls['identifyOption'].setValue('Y');
        this.appGeneral.controls['identify_id'].enable();
      }else{
        this.appGeneral.controls['identify_id'].disable();
      }
    },
    (err) => {
      console.log('Err : ', err);
      this.appGeneral.controls['religion'].setValue('พุทธ');
      this.appGeneral.controls['nationality'].setValue('THA');
      this.appGeneral.controls['race'].setValue('THA');
    });

    this.appDatas.getData('applicationAnswerMs').then((res: Array<ApplicationAnswerM>) => {
      let answer: Array<ApplicationAnswerM>;

      answer = res.filter(item => item.questionid == '28');
      this.appGeneral.controls['weigthChange'].setValue(answer[0].answeryn);
      if (answer[0].answeryn == 'Y') {
        this.appGeneral.controls['weigthChangeDesc'].enable();
      }
      if (answer[0].text1 != '') {
        this.appGeneral.controls['weigthChangeUD'].setValue('U');
        this.appGeneral.controls['weigthChangeNum'].setValue(answer[0].text1);
      }
      else if (answer[0].text2 != '') {
        this.appGeneral.controls['weigthChangeUD'].setValue('D');
        this.appGeneral.controls['weigthChangeNum'].setValue(answer[0].text2);
      }

      this.appGeneral.controls['weigthChangeDesc'].setValue(answer[0].answerdesc);

      answer = res.filter(item => item.questionid == '6');
      this.appGeneral.controls['drug'].setValue(answer[0].answeryn);

      answer = res.filter(item => item.questionid == '7');
      this.appGeneral.controls['drug_exp'].setValue(answer[0].answeryn);
    }, (err)=> {
      console.log('Err : ', err);
    });

    this.appDatas.getData('occupationsMs').then((res: Array<OccupationsM>) => {
      console.log('occupationsMs',res)
      if (res.length > 0) {
        let occupation: Array<OccupationsM>;

        occupation = res.filter(item => item.seq == '1');


        let isUlink = this.checkIsUlink(this.appDatas.quotation.typeapp);

        if(isUlink){
          // this.appGeneral.controls['spouseIdentifyid'].enable();

          if(Number(occupation[0].occupationcd)>40 && Number(occupation[0].occupationcd)<=50){
            this.appGeneral.controls['occupation'].setValue(occupation[0].occupationcd);
            this.appGeneral.controls['occupation_ppng'].setValue(occupation[0].occupationcd);
            this.appGeneral.controls['occupation_desc'].setValue('');
            this.isPPNG = true;
          }else{
            if (occupation[0].occupationcd != ''){

              this.appGeneral.controls['occupation'].setValue(occupation[0].occupationcd);
              this.appGeneral.controls['occupation'].enable();
              this.appGeneral.controls['occupation_ppng'].setValue('25');

              this.appGeneral.controls['occupation_desc'].setValue('');
            }

          }
        }else{
          // this.appGeneral.controls['spouseIdentifyid'].disable();

          if ('25' != occupation[0].occupationcd) {
            // if ('99' != occupation[0].occupationcd) {
              if (occupation[0].occupationcd != '')
              this.appGeneral.controls['occupation'].setValue(occupation[0].occupationcd);
              this.appGeneral.controls['occupation_desc'].setValue('');
            } else {
              this.appGeneral.controls['occupation'].setValue('25');
              // this.appGeneral.controls['occupation'].setValue('99');
              this.appGeneral.controls['occupation_desc'].setValue(occupation[0].occupationdesc);
              this.appGeneral.controls['occupation_desc'].enable();
            }
        }




        this.appGeneral.controls['position'].setValue(occupation[0].position);
        this.appGeneral.controls['year_salary'].setValue(occupation[0].yearsalary);
        this.appGeneral.controls['business_type'].setValue(occupation[0].businessdesc);
        this.appGeneral.controls['business_desc'].setValue(occupation[0].description);

        occupation = res.filter(item => item.seq == '2');
        if ('25' != occupation[0].occupationcd) {
        // if ('99' != occupation[0].occupationcd) {
          this.appGeneral.controls['otherOccupation'].setValue(occupation[0].occupationcd);
          this.appGeneral.controls['otherOccupationDesc'].setValue('');
        }
        else {
          this.appGeneral.controls['otherOccupation'].setValue('25');
          // this.appGeneral.controls['otherOccupation'].setValue('99');
          this.appGeneral.controls['otherOccupationDesc'].setValue(occupation[0].occupationdesc);
        }
        this.appGeneral.controls['otherBusinessPosition'].setValue(occupation[0].position);
        this.appGeneral.controls['otherBusinessYearSalary'].setValue(occupation[0].yearsalary);
        this.appGeneral.controls['otherBusinessType'].setValue(occupation[0].businessdesc);
        this.appGeneral.controls['otherBusinessDesc'].setValue(occupation[0].description);



        ////use in ulink ปปง.


      }

    }, (err)=> {
      console.log('Err : ', err);
    });
    // // init onChange FormControl
    this.appGeneral.controls['title'].valueChanges.subscribe((value) => {
      console.log('title => valueChanges =>',value);
      this.chooseSex(value);
    });

}

get permanentAddressEmail() {
  return this.appGeneral.get('permanentAddressEmail');
}
get currentEmail() {
  return this.appGeneral.get('currentEmail');
}
get occupation_desc() {
  return this.appGeneral.get('occupation_desc');
}
get religion() {
  return this.appGeneral.get('religion');
}
get nationality () {
  return this.appGeneral.get('nationality');
}
get race () {
  return this.appGeneral.get('race');
}
get heigh  () {
  return this.appGeneral.get('heigh');
}
get weigh  () {
  return this.appGeneral.get('weigh');
}
get subdistrict   () {
  return this.appGeneral.value.permanentAddress.addressSelected.tambon_name;
}
get district  () {
  return this.appGeneral.value.permanentAddress.addressSelected.amphur_name;
}
get province   () {
  return this.appGeneral.value.permanentAddress.addressSelected.province_name;
}
get postcode  () {
  return this.appGeneral.value.permanentAddress.addressSelected.zip;
}
get permanentMobileNo   () {
  return this.appGeneral.get('permanentMobileNo');
}
get currentMobileNo   () {
  return this.appGeneral.get('currentMobileNo');
}
get companyMobileNo   () {
  return this.appGeneral.get('companyMobileNo');
}
get companyEmail   () {
  return this.appGeneral.get('companyEmail');
}
get workplace   () {
  return this.appGeneral.get('workplace');
}
get position    () {
  return this.appGeneral.get('position');
}
get year_salary    () {
  return this.appGeneral.get('year_salary');
}
get business_type   () {
  return this.appGeneral.get('business_type');
}
get business_desc   () {
  return this.appGeneral.get('business_desc');
}

get identify_id   () {
  return this.appGeneral.get('identify_id');
}

  changeIdentifyExpireDate(e){
    console.log("bf"+e);
   this.appGeneral.controls['identifyExpireDate'].setValue(e);
   this.appGeneral.controls['identifyNoExpire'].setValue('');
  //  this.appGeneral.controls['identifyNoExpire'].disable();

  }
  changeBirthDate(e){
    console.log("bf"+e);
    var age = moment().diff(e,'year');
    console.log("af"+age);
   this.appGeneral.controls['age'].setValue(age);
   this.appGeneral.controls['birthDate'].setValue(e);
 //   console.log("log 2 "+e);
    //console.log("log/ 2 "+this.appGeneral.value.birthDate);

  }
  scrollToTop() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
   this.content.scrollTo(0, 200, 500);
  }
  scrollToCenter() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollTo(0, 1100, 500);
  }
  scrollToBot() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollToBottom();
  }

  private birthDateOption: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',

  };

  private endDateOption: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    alignSelectorRight: true

  };

  private isChange(): void {
    if (this.appGeneral.controls['isChange'].value == 'N') {
      this.appGeneral.controls['titleChange'].setValue('');
      this.appGeneral.controls['oldFirstName'].setValue('');
      this.appGeneral.controls['oldLastName'].setValue('');
    }
  }
  private identifyNoExpireChange():void {

    if(this.appGeneral.controls['identifyNoExpire'].value){
      this.disabledCalendarIdentifyNoExpire = true;
  //    this.appGeneral.get('identifyType').clearValidators();
     this.appGeneral.controls['identifyExpireDate'].disable();
    }
    else {
     this.appGeneral.controls['identifyExpireDate'].enable();
      this.disabledCalendarIdentifyNoExpire = false;
    }
    this.appGeneral.controls['identifyExpireDate'].setValue('');
  }

  private identifyOptionChange(option: boolean): void {

    if (option) {

      this.appGeneral.controls['identifyType'].setValue('01');
      this.appGeneral.controls['identify_id'].disable();
      this.appGeneral.controls['identify_id'].setValue(this.quotationM.prospectM.citizenID);

      // this.appGeneral.get('identifyType').clearValidators();

      this.appGeneral.controls['identifyNoExpire'].enable();
      this.appGeneral.controls['identifyNoExpire'].setValue('');



      this.appGeneral.controls['identifyExpireDate'].enable();
      this.appGeneral.controls['identifyExpireDate'].setValue('');

    }
    else {

      this.appGeneral.controls['identifyType'].setValue('');
      this.appGeneral.controls['identify_id'].setValue('');
      this.appGeneral.controls['identify_id'].enable();

      this.appGeneral.get('identifyType').setValidators(Validators.required);
      this.appGeneral.controls['identifyNoExpire'].setValue('');
     // this.appGeneral.controls['identifyNoExpire'].disable();
      this.appGeneral.controls['identifyExpireDate'].setValue('');
   //   this.disabledCalendarIdentifyNoExpire = true;
    }
    this.disabledCalendarIdentifyNoExpire = false;
    this.appGeneral.get('identifyType').updateValueAndValidity();
  }

  private statusMarry(): void {
    const martial = this.appGeneral.controls['martial'].value;
    if (martial != 'M') {
      this.appGeneral.controls['spouseTitle'].setValue('');
      this.appGeneral.controls['spouseName'].setValue('');
      this.appGeneral.controls['spouseLastname'].setValue('');
      this.appGeneral.controls['spouseIdentifyid'].setValue('');
      this.setMarryValidate(false);
    } else {
      this.setMarryValidate(true);
    }
  }

  private weigthChange(): void {
    if (this.appGeneral.controls['weigthChange'].value == 'N') {
      this.appGeneral.controls['weigthChangeNum'].setValue('');
      this.appGeneral.controls['weigthChangeUD'].setValue('');

      this.appGeneral.controls['weigthChangeDesc'].setValue('');
      this.appGeneral.controls['weigthChangeDesc'].disable();
    }
    else {
      this.appGeneral.controls['weigthChangeDesc'].enable();
    }
  }

  private identifyTypeChange(e: string):void{

    this.disabledCalendarIdentifyNoExpire = false;
     if(e == '01' || e == '07')
     {
          this.appGeneral.controls['identifyNoExpire'].enable();
          if(this.appGeneral.controls['identifyNoExpire'].value != ''){
            this.disabledCalendarIdentifyNoExpire = this.appGeneral.controls['identifyNoExpire'].value;
          }
     }
     else if(e == '11'){
      this.appGeneral.controls['identifyNoExpire'].disable();
      this.appGeneral.controls['identifyExpireDate'].disable();

      this.appGeneral.controls['identifyNoExpire'].setValue(false);
      this.appGeneral.controls['identifyExpireDate'].setValue('');
      this.disabledCalendarIdentifyNoExpire = true;
     }
     else if(e != '') {
      this.appGeneral.controls['identifyNoExpire'].disable();
      this.appGeneral.controls['identifyNoExpire'].setValue('');
      this.appGeneral.controls['identifyExpireDate'].enable();
     }
     else {
      this.disabledCalendarIdentifyNoExpire = true;
     }
  }

  private occupationChange(e: string):void{
    if(e == '25')
    {
      this.appGeneral.get('occupation_desc').enable();
    }
    else {
      this.appGeneral.controls['occupation_desc'].setValue('');
      this.appGeneral.get('occupation_desc').disable();
    }
  }

  private occupationPPGChange(e: string):void{
    if(e == '25'){
      this.appGeneral.get('occupation').enable();
      this.appGeneral.get('occupation').setValue('26');
      this.isPPNG = false;
    }else{
      this.appGeneral.get('occupation').setValue(e);
      this.appGeneral.get('occupation').disable();
      this.appGeneral.get('occupation').updateValueAndValidity();
      this.isPPNG = true;
    }
  }

  checkOccupationShow(occupation:string){
    // เช็คปปง.
    let listPlan = ['41','42','43','44','45','46','47','48','49','50'];
    if(listPlan.includes(occupation)){
      return false;
    }else{
      return true;
    }
  }

  private religionChage(e: string):void{
    if(e == 'อื่นๆ')
    {
      this.appGeneral.get('religion_desc').enable();
    }
    else {
      this.appGeneral.controls['religion_desc'].setValue('');
      this.appGeneral.get('religion_desc').disable();
    }
  }


  private pNameChange(event:any): void {
    const pname = event.target.value;
    // console.log('pNameChange=>',pname);
    if(pname !== this.appGeneral.get('title').value){

      //updateSex
      // this.chooseSex(pname);

      this.appGeneral.controls['title'].setValue(pname);
      this.appGeneral.get('title').updateValueAndValidity();
    }
  }

  /**
   * เลือกเพศอัตโนมัติ
   * @param preName คำนำหน้าชื่อ
   */
  chooseSex(preName: string) {
    // console.log('chooseSex preName',preName);
    switch (preName) {
      case 'นาย': case 'เด็กชาย':
        this.appGeneral.controls['gender'].setValue('M');
        this.appGeneral.get('gender').updateValueAndValidity();
        break;
      case 'นาง': case 'นางสาว': case 'เด็กหญิง':
      this.appGeneral.controls['gender'].setValue('F');
      this.appGeneral.get('gender').updateValueAndValidity();
        break;
    }
  }

  checkGender(gender){
    switch (gender) {
      case 'F':
        this.appGeneral.controls['gender'].disable();
        break;
      case 'M':
      this.appGeneral.controls['gender'].disable();
        break;
      default:
        this.appGeneral.controls['gender'].enable();
    }
  }

  private checkChild(age): void {
    // ผู้ใหญ่
    // if (Number(this.data.age) > 19) {
    if (Number(age) > 14) {
      this.child = false;
    }
    // เด็ก
    else {
      this.child = true;
    }
  }

  // private preNameSelected(preName: string) {
  //   this.prospectData.preName = preName;
  //   if(this.prospectData.preName == 'นาย' || this.prospectData.preName == 'เด็กชาย'){
  //     this.prospectData.gender = 'M';
  //     this.enableGenderSelected = true;
  //   } else if(this.prospectData.preName == 'นาง' || this.prospectData.preName == 'นางสาว' || this.prospectData.preName == 'เด็กหญิง') {
  //     this.prospectData.gender = 'F';
  //     this.enableGenderSelected = true;
  //   }else{
  //     this.enableGenderSelected = false;
  //   }
  // }

  // getReligionJson() {
  //   return new Promise(resolve => {
  //     this.http.get('assets/json/application/religionJson.json')
  //     .subscribe(data => {
  //       resolve(data);
  //     });
  //   });
  // }

  // getOccupationJson() {
  //   return new Promise(resolve => {
  //     this.http.get('assets/json/application/occupationJson.json')
  //     .subscribe(data => {
  //       resolve(data);
  //     });
  //   });
  // }

  // getCountryJson() {
  //   return new Promise(resolve => {
  //     this.http.get('assets/json/application/countryJson.json')
  //     .subscribe(data => {
  //       resolve(data);
  //     });
  //   });
  // }

  private selectTabAddress(index: number){
    if (typeof index == 'number'){
      this.broadcaster.broadcast('tabAddress', index);
    }
  }

  /**
   * Unitlink
   */
  // บุตรยังไม่บรรลุนิติภาวะ
  private childdrenTeen(event): void {
    if (this.appGeneral.controls['childdrenTeen'].value == 'N') {
      /// เคลียร์ฟอร์ม
      const control: FormArray = <FormArray>this.appGeneral.controls['childrenData'];
      _.forEach(control, (a, b) => {
        control.removeAt(b);
      });
      this.showCloseIcon = false;
    }
    else {
      const control: FormArray = <FormArray>this.appGeneral.controls['childrenData'];
      if (control.length < 1 )
        this.addMoreChildren();
    }
  }

  // action Add more childrens
  private addMoreChildren(data?: any): void
  {
    const control: FormArray = <FormArray>this.appGeneral.controls['childrenData'];
    control.push(this.childrenDataSumValidator(data));
    this.showCloseIcon = false;
    //ถ้าเหลือผู้รับประโยชน์คนเดียวให้ซ่อนปุ่มลบ
    if (control.length > 1) {
      this.showCloseIcon = true;
    }
  }

  private removeChild(index: number): void
  {
    const control: FormArray = <FormArray>this.appGeneral.controls['childrenData'];
    control.removeAt(index);
    if (control.length == 1) {
      this.showCloseIcon = false;
    }
  }

  // Validator under childs age
  private childrenDataSumValidator(data?: any): FormGroup
  {
    return this.fb.group({
      childTitle: [_.get(data, 'title', ''), Validators.required],
      childfName: [_.get(data, 'fname', ''), Validators.required],
      childlName: [_.get(data, 'lname', ''), Validators.required],
      childIdentify: [_.get(data, 'identifyid', ''), Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(13)])],
      childAge: [_.get(data, 'age', ''), [Validators.required, Validators.max(20)]]
    });
  }
  // เชค type ว่าเป็น Ulink หรือไม่
  private checkIsUlink(type): boolean
  {
    const checkType = 'ULink';
    if (type === '')
      return false;

    return type === checkType;
  }

  private addFormForUlink(): void
  {
    this.isUlink = this.checkIsUlink(this.appDatas.quotation.typeapp);
    // เชค บุตร/ธิดา
    if (this.isUlink) {
      this.appGeneral.controls['childdrenTeen'].enable();
      this.appGeneral.controls['occupation_ppng'].enable();
      this.appGeneral.controls['occupation'].disable();

      this.setUlinkUnderAgeChild();
    }
    
    // เซตเลขบัตรประชาชนคู่สมรส (มีเฉพาะ ยูลิงค์)
    if (this.isUlink) {
      const appDetail = _.get(this.appDatas, 'applicationMasterM.unitlinkapplicationdetailMs[0]', new UlinkApplicationDetailM())
      if (_.has(appDetail, 'spouseidentifyid')) {
        this.appGeneral.controls['spouseIdentifyid'].setValue(appDetail.spouseidentifyid);
      }
    }
  }

  private setUlinkUnderAgeChild()
  {
    this.appDatas.getData('unitlinkunderagechildMs').then((res: Array<UnderAgeChildModel>) => {
      const unitlinkunderagechildMs = res
      if (unitlinkunderagechildMs.length > 0) {
        this.appGeneral.controls['childdrenTeen'].setValue('Y');
        // ดึงจาก provider มาใส่ค่า บุตร/ธิดาที่ยังไท่บรรลุนิติภาวะ
        _.each(unitlinkunderagechildMs, (value, key) => {
          this.addMoreChildren(value);
        });
      } else {
        this.appGeneral.controls['childdrenTeen'].setValue('N');
      }
    },err => {
      // สร้างมาครั้งแรกจะยังไม่มีข้อมูลบุตร
      console.log('ereeeee', err)
    });
  }

  private setMarryValidate(check: boolean = false): void 
  {
    // if (check) {
    //   this.appGeneral.controls['spouseTitle'].enable();
    //   this.appGeneral.controls['spouseName'].enable();
    //   this.appGeneral.controls['spouseLastname'].enable();
    //   if (this.isUlink)
    //     this.appGeneral.controls['spouseIdentifyid'].enable();
    //   else
    //     this.appGeneral.controls['spouseIdentifyid'].disable();
    // } else {
    //   this.appGeneral.controls['spouseTitle'].disable();
    //   this.appGeneral.controls['spouseName'].disable();
    //   this.appGeneral.controls['spouseLastname'].disable();
    //   this.appGeneral.controls['spouseIdentifyid'].disable();
    // }
  }

}

