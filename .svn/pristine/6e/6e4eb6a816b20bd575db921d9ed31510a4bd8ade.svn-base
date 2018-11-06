import { AlertDirective } from './../../directives/extends/alert/alert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { ApplicationData } from '../../providers/application/application-data';
import { PcSixtyM } from '../../providers/pcsixty/pcsixty-model';
import { HttpClient } from '@angular/common/http'; 
import { PcsixtyService } from '../../providers/pcsixty/pcsixty-service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

/**
 * Generated class for the Pc60Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'ใบคำขอออนไลน์/ปช.60'
})
@Component({
  selector: 'page-pc60',
  templateUrl: 'pc60.html',
})
export class Pc60Page {
  pc60StepOne: FormGroup;
  pc60StepTwo: FormGroup;
  pc60StepThree: FormGroup;
  pc60StepFour: FormGroup;
  pc60StepFive: FormGroup;

  /**
   * แทบที่กำลังเข้าถึง
   */
  private index: number = 0;
  private oldIndex: number = -1;

  /**
   * ข้อมูลใบเสนอขาย
   */
  private quotationM = this.appData.getQuotation();

  private pcSixtyM: PcSixtyM = new PcSixtyM();

  /**
   * dropdown ข้อมูลประเทศ
   */
  public countryDropdown;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private alertCtrl: AlertDirective,
    private toastCtrl: ToastController,
    private appData: ApplicationData,
    private http: HttpClient,
    private pcsixtyservice: PcsixtyService,
    private storage: Storage
  ) {

      this.http.get('assets/json/application/countryJson.json') 
      .subscribe(data => {
        this.countryDropdown = data;
        this.countryDropdown = this.countryDropdown.country;
       });

    this.storage.get('saleInformation').then(info => {
      this.pc60StepFive.controls['accreditor'].setValue(info.firstName + ' ' + info.lastName);
      this.pc60StepFive.controls['position'].setValue(info.strName);
    });

    this.pcSixtyM = this.navParams.get('pcSixtyM');
    // console.log('pcSixtyM', this.pcSixtyM);

    this.pc60StepOne = this.fb.group({
      // ผู้ขอเอาประกัน ชื่อ-นามสกุล
      // PAYMENT_NAME ผู้ชำระเบี้ยประกัน ชื่อ-นามสกุล
      // OCCUPATION_DETAIL ลักษระอาชีพโดยละเอียด
      // MONTHLY_SALARY รายได้เดือนละ
      // YEARLY_SALARY อาชีพพิเศษ
      // JOB อาชีพพิเศษ
      // JOB_MONTH_INCOME รายได้เดือนละ
      // JOB_YEAR_INCOME ปีละ
      // PROPERTY_DETAIL รายละเอียดของทรัพย์สิน
      // PROPERTY_VALUE ราคาประมาณ
      applicationid: this.quotationM.mcaapplicationMs[0].applicationid,
      customername: [{ value: this.quotationM.pname + ' ' + this.quotationM.fname + ' ' + this.quotationM.lname, disabled: true }, Validators.required],
      paymentname : [ this.push(this.pcSixtyM.paymentname, this.appData.applicationMasterM.paymentMs[0].paymenttitle + ' ' + this.appData.applicationMasterM.paymentMs[0].paymentname + ' ' + this.appData.applicationMasterM.paymentMs[0].paymentlastname), Validators.required],
      occupationdetail : [ this.push(this.pcSixtyM.occupationdetail), Validators.required],
      monthlysalary : [ this.push(this.pcSixtyM.monthlysalary), Validators.required],
      yearlysalary : [ this.push(this.pcSixtyM.yearlysalary), Validators.required],
      job : this.push(this.pcSixtyM.job),
      jobmonthincome : this.push(this.pcSixtyM.jobmonthincome),
      jobyearincome : this.push(this.pcSixtyM.jobyearincome),
      propertydetail : [ this.push(this.pcSixtyM.propertydetail), Validators.required],
      propertyvalue : [ this.push(this.pcSixtyM.propertyvalue), Validators.required]
    }); 

    this.pc60StepTwo = this.fb.group({
      // RELATION_WHEN   ตัวแทนรู้จักกับผู้เอาประกันเมื่อใด
      //มีผู้แนะนำหรือขอเอาประกันด้วยตนเอง
      // INVITE_NAME ผู้แนะนำ
      // PAYMENT_PERSON ใครคือผู้ชำระ
      // PAYMENT_REASON เหตุผล
      // RELATION_DETAIL  ความสัมพันธ์โดยละเอียด
      // INSURE_OBJECTIVE วัตถุประสงค์การทำประกัน
      relationwhen : [this.push(this.pcSixtyM.relationwhen), Validators.required],
      insuredecision : [this.push(this.pcSixtyM.insuredecision), Validators.required],
      invitename :  [this.push(this.pcSixtyM.invitename), Validators.required],
      paymentperson :  [this.push(this.pcSixtyM.paymentperson), Validators.required],
      paymentreason : [this.push(this.pcSixtyM.paymentreason), Validators.required],
      relationdetail : [this.push(this.pcSixtyM.relationdetail), Validators.required],
      insureobjective : [this.push(this.pcSixtyM.insureobjective), Validators.required],
      addressno:  [this.push(this.pcSixtyM.addressno), Validators.required],
      buildingname: this.push(this.pcSixtyM.buildingname),
      moo: this.push(this.pcSixtyM.moo),
      soi: this.push(this.pcSixtyM.soi),
      road: this.push(this.pcSixtyM.road),
      subdistrict: [this.push(this.pcSixtyM.subdistrict), Validators.required],
      district: [this.push(this.pcSixtyM.district), Validators.required],
      province: [this.push(this.pcSixtyM.province), Validators.required],
      postcode: [this.push(this.pcSixtyM.postcode), Validators.required],
      permanentAddress:
      [{
        addressSelected: {
          province_name: this.push(this.pcSixtyM.province),
          tambon_name: this.push(this.pcSixtyM.subdistrict),
          amphur_name: this.push(this.pcSixtyM.district),
          zip: this.push(this.pcSixtyM.postcode)
        }
      }, Validators.required],
      country: this.push(this.pcSixtyM.country)
    });

    this.pc60StepThree = this.fb.group({

      // RELATIVE_DETAIL มีความสัมพันธ์ทางเครือญาติกันอย่างไร
      // SPONSOR_DETAIL มีการอุปการะซึ่งกันและกันอย่างไร
      // LIVING_DETAIL อยู่ร่วมกันหรือแยกกันอยู่ตั้งแต่เมื่อใด
      // SIBLING_NO_INSURE_REASON กรณีผู้ขอเอาประกันเป็นผู้เยาว์ เหตุผลที่พี่น้องไม่ได้ทำประกัน
      relativedetail : [this.push(this.pcSixtyM.relativedetail), Validators.required],
      sponsordetail : [this.push(this.pcSixtyM.sponsordetail), Validators.required],
      livingdetail : [this.push(this.pcSixtyM.livingdetail), Validators.required],
      siblingnoinsurereason : this.push(this.pcSixtyM.siblingnoinsurereason)
      
    }); 

    this.pc60StepFour = this.fb.group({
    // MARRIED_PERIOD อยู่ร่วมกับสามี จำนวน ปี 
    // CHILD มีบุตร จำนวน  
    // BREAK_REASON เหตุผลที่แยกกันอยู่
    // BREAK_CAUSE สาเหตุ
    // BREAK_WHEN เมื่อไหร่
    // HUSBAND_NO_INSURE_REASON เหตุผลที่สามีไม่ทำประกัน
      marriedperiod : this.push(this.pcSixtyM.marriedperiod),
      child : this.push(this.pcSixtyM.child),
      breakreason : this.push(this.pcSixtyM.breakreason),
      breakcause : this.push(this.pcSixtyM.breakcause),
      breakwhen : this.push(this.pcSixtyM.breakwhen), 
      husbandnoinsurereason : this.push(this.pcSixtyM.husbandnoinsurereason)
    }); 
    
    this.pc60StepFive = this.fb.group({
    // ผู้รับรอง
    // ตำแหน่ง
    // วันที่
      accreditor : { value: this.push(this.pcSixtyM.accreditor), disabled: true },
      position : { value: this.push(this.pcSixtyM.position), disabled: true },
      accreditdate : { value: this.push(this.pcSixtyM.accreditdate, moment().format('YYYY-MM-DD HH:mm:ss')), disabled: true }

   }); 

   /* this.insuredecisionChange(this.pcSixtyM.insuredecision);
    this.paymentpersonChange(this.pcSixtyM.paymentperson);*/
    console.log(' insuredecision  : ', this.pcSixtyM.insuredecision);
    if(this.pcSixtyM.insuredecision == 'มีผู้แนะนำ')
    {
      this.pc60StepTwo.controls['invitename'].enable();
      this.pc60StepTwo.controls['addressno'].enable();
      this.pc60StepTwo.controls['buildingname'].enable();
      this.pc60StepTwo.controls['moo'].enable();
      this.pc60StepTwo.controls['soi'].enable();
      this.pc60StepTwo.controls['road'].enable();
      this.pc60StepTwo.controls['country'].enable();

    }
    else {
      
      this.pc60StepTwo.controls['invitename'].disable();
      this.pc60StepTwo.controls['addressno'].disable();
      this.pc60StepTwo.controls['buildingname'].disable();
      this.pc60StepTwo.controls['moo'].disable();
      this.pc60StepTwo.controls['soi'].disable();
      this.pc60StepTwo.controls['road'].disable();
      this.pc60StepTwo.controls['subdistrict'].disable();
      this.pc60StepTwo.controls['district'].disable();
      this.pc60StepTwo.controls['province'].disable();
      this.pc60StepTwo.controls['postcode'].disable();
      this.pc60StepTwo.controls['country'].disable();

    }

    if(this.pcSixtyM.paymentperson != 'ผู้เอาประกัน')
    {
      this.pc60StepTwo.controls['paymentreason'].enable();
      this.pc60StepTwo.controls['relationdetail'].enable();
    }
    else {
      this.pc60StepTwo.controls['paymentreason'].disable();
      this.pc60StepTwo.controls['relationdetail'].disable();
    }
  }


  /**
   * เปลี่ยนแทบ
   * @param index 
   */
  private changeIndex(index?: number) {

    this.oldIndex = this.index;
    this.index = Number(index);
    if (this.validate(this.index - 1) || this.oldIndex > Number(index)) {
      this.save();
    }
    else {
      this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
      setTimeout(() => {
        this.index = this.oldIndex;
      }, 1);
    }
  }

  /**
   * ตรวจสอบการกรอกข้อมูล
   */
  private validate(index: number): boolean {

    switch (index) {

      case 4:
        if (this.pc60StepFive.invalid)
          return false;

      case 3:
        if (this.pc60StepFour.invalid)
            return false;

      case 2:
        if (this.pc60StepThree.invalid)
          return false;

      case 1:
        if (this.pc60StepTwo.invalid)
          return false;

      case 0:
        return this.pc60StepOne.valid;

      default:
        return false;
    }
  }

  /**
   * บันทึก
   */
  private save(): void {

    //step 1
    this.pcSixtyM.applicationid = this.pc60StepOne.controls['applicationid'].value;
    this.pcSixtyM.customername = this.pc60StepOne.controls['customername'].value;
    this.pcSixtyM.paymentname = this.pc60StepOne.controls['paymentname'].value;
    this.pcSixtyM.occupationdetail = this.pc60StepOne.controls['occupationdetail'].value;
    this.pcSixtyM.monthlysalary = this.pc60StepOne.controls['monthlysalary'].value;
    this.pcSixtyM.yearlysalary = this.pc60StepOne.controls['yearlysalary'].value;
    this.pcSixtyM.job = this.pc60StepOne.controls['job'].value;
    this.pcSixtyM.jobmonthincome = this.pc60StepOne.controls['jobmonthincome'].value;
    this.pcSixtyM.jobyearincome = this.pc60StepOne.controls['jobyearincome'].value;
    this.pcSixtyM.propertydetail = this.pc60StepOne.controls['propertydetail'].value;
    this.pcSixtyM.propertyvalue = this.pc60StepOne.controls['propertyvalue'].value;
    //step 2
    this.pcSixtyM.relationwhen = this.pc60StepTwo.controls['relationwhen'].value;
    this.pcSixtyM.insuredecision = this.pc60StepTwo.controls['insuredecision'].value;
    this.pcSixtyM.invitename = this.pc60StepTwo.controls['invitename'].value;
    this.pcSixtyM.paymentperson = this.pc60StepTwo.controls['paymentperson'].value;
    this.pcSixtyM.paymentreason = this.pc60StepTwo.controls['paymentreason'].value;
    this.pcSixtyM.relationdetail = this.pc60StepTwo.controls['relationdetail'].value;
    this.pcSixtyM.insureobjective = this.pc60StepTwo.controls['insureobjective'].value;

    this.pcSixtyM.addressno = this.pc60StepTwo.controls['addressno'].value;
    this.pcSixtyM.buildingname = this.pc60StepTwo.controls['buildingname'].value;
    this.pcSixtyM.moo = this.pc60StepTwo.controls['moo'].value;
    this.pcSixtyM.soi = this.pc60StepTwo.controls['soi'].value;
    this.pcSixtyM.road = this.pc60StepTwo.controls['road'].value;

    //address
    this.pcSixtyM.subdistrict = this.pc60StepTwo.controls['subdistrict'].value
    this.pcSixtyM.district = this.pc60StepTwo.controls['district'].value
    this.pcSixtyM.province = this.pc60StepTwo.controls['province'].value
    this.pcSixtyM.postcode = this.pc60StepTwo.controls['postcode'].value
    this.pcSixtyM.country = this.pc60StepTwo.controls['country'].value;


    //step3
    this.pcSixtyM.relativedetail = this.pc60StepThree.controls['relativedetail'].value;
    this.pcSixtyM.sponsordetail = this.pc60StepThree.controls['sponsordetail'].value;
    this.pcSixtyM.livingdetail = this.pc60StepThree.controls['livingdetail'].value;
    this.pcSixtyM.siblingnoinsurereason = this.pc60StepThree.controls['siblingnoinsurereason'].value;
    //step4
    this.pcSixtyM.marriedperiod = this.pc60StepFour.controls['marriedperiod'].value;
    this.pcSixtyM.child = this.pc60StepFour.controls['child'].value;
    this.pcSixtyM.breakreason = this.pc60StepFour.controls['breakreason'].value;
    this.pcSixtyM.breakcause = this.pc60StepFour.controls['breakcause'].value;
    this.pcSixtyM.breakwhen = this.pc60StepFour.controls['breakwhen'].value;
    this.pcSixtyM.husbandnoinsurereason = this.pc60StepFour.controls['husbandnoinsurereason'].value;
    //step5
    this.pcSixtyM.accreditor = this.pc60StepFive.controls['accreditor'].value;
    this.pcSixtyM.position = this.pc60StepFive.controls['position'].value;
    this.pcSixtyM.accreditdate = this.pc60StepFive.controls['accreditdate'].value;

    // save success
    this.pcsixtyservice.insertPcSixtyService(this.pcSixtyM).then(()=>{
     

      let toast = this.toastCtrl.create({
        message: 'บันทึกสำเร็จ',
        duration: 3000
      });
      toast.present();
     

    }).catch(err => {
        // save error
      let toast = this.toastCtrl.create({
        message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
          duration: 3000
      });
      this.index = this.oldIndex;
      toast.present();
    });
  }
  /**
   * ผู้แนะนำ
   */
  private insuredecisionChange(e: string):void{
    
    this.pc60StepTwo.controls['invitename'].setValue('');
    this.pc60StepTwo.controls['addressno'].setValue('');
    this.pc60StepTwo.controls['buildingname'].setValue('');
    this.pc60StepTwo.controls['moo'].setValue('');
    this.pc60StepTwo.controls['soi'].setValue('');
    this.pc60StepTwo.controls['road'].setValue('');
    this.pc60StepTwo.controls['subdistrict'].setValue('');
    this.pc60StepTwo.controls['district'].setValue('');
    this.pc60StepTwo.controls['province'].setValue('');
    this.pc60StepTwo.controls['postcode'].setValue('');
    this.pc60StepTwo.controls['country'].setValue('');

    this.pc60StepTwo.controls['permanentAddress'].setValue({
      addressSelected: {
        province_name: '',
        tambon_name: '',
        amphur_name: '',
        zip: ''
    }});

    // this.pc60StepTwo.value.permanentAddress.addressSelected.province_name = '';
    // this.pc60StepTwo.value.permanentAddress.addressSelected.tambon_name = '';
    // this.pc60StepTwo.value.permanentAddress.addressSelected.amphur_name = '';
    // this.pc60StepTwo.value.permanentAddress.addressSelected.zip = '';

    if(e == 'มีผู้แนะนำ')
    {
      this.pc60StepTwo.controls['invitename'].enable();
      this.pc60StepTwo.controls['addressno'].enable();
      this.pc60StepTwo.controls['buildingname'].enable();
      this.pc60StepTwo.controls['moo'].enable();
      this.pc60StepTwo.controls['soi'].enable();
      this.pc60StepTwo.controls['road'].enable();
      this.pc60StepTwo.controls['country'].enable();

    }
    else {
      
      this.pc60StepTwo.controls['invitename'].disable();
      this.pc60StepTwo.controls['addressno'].disable();
      this.pc60StepTwo.controls['buildingname'].disable();
      this.pc60StepTwo.controls['moo'].disable();
      this.pc60StepTwo.controls['soi'].disable();
      this.pc60StepTwo.controls['road'].disable();
      this.pc60StepTwo.controls['subdistrict'].disable();
      this.pc60StepTwo.controls['district'].disable();
      this.pc60StepTwo.controls['province'].disable();
      this.pc60StepTwo.controls['postcode'].disable();
      this.pc60StepTwo.controls['country'].disable();

    }
  }
  /**
   * ใครเป็นผู้ชำระเบี้ยประกัน
   */
  private paymentpersonChange(e: string):void{

    this.pc60StepTwo.controls['paymentreason'].setValue('');
    this.pc60StepTwo.controls['relationdetail'].setValue('');
    
    if(e != 'ผู้เอาประกัน')
    {
      this.pc60StepTwo.controls['paymentreason'].enable();
      this.pc60StepTwo.controls['relationdetail'].enable();
    }
    else {
      this.pc60StepTwo.controls['paymentreason'].disable();
      this.pc60StepTwo.controls['relationdetail'].disable();
    }
  }

  /**
   * ใส่ข้อมูล
   */
  private push(str: string, defaultStr: string = ''): string {
    return str ? str : defaultStr;
  }
}
