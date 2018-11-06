import { UUID } from 'angular2-uuid';
import { Component, NgModule, OnInit, Input } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ApiProvider } from "../../../providers/api/api";
import { ProspectModel } from "../../../providers/prospect/prospect-model";
import { RequestModel } from "../../../providers/model/request-model";
import { ResponseModel } from "../../../providers/model/response-model";
import { FunctionName } from "../../../providers/constants/function-name";
import { ServiceName } from "../../../providers/constants/service-name";
import moment from 'moment';
import {Platform, ModalController, NavController, ViewController, Events, Modal} from 'ionic-angular';
import { AlertDirective } from "../../../directives/extends/alert/alert";
import { PopupModel, PopupComponent } from "../../utility/popup/popup";
import { IMyDpOptions } from "mydatepicker";
import { ValidateProvider } from "../../../providers/validate/validate";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingDirective } from "../../../directives/extends/loading/loading";
import { DateFormatProvider } from "../../../providers/date-format/date-format";
import {GoogleMapComponent} from "../../google-map/google-map";
import { PopupProspectAddComponent } from "../../utility/popup-prospect-add/popup-prospect-add";
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { customerM } from '../../../providers/service-table/customer-model';
import { Network } from '@ionic-native/network';
import { ModalOptions } from 'ionic-angular/components/modal/modal-options';
import { PopupLostConnectionComponent } from '../../utility/popup-lost-connection/popup-lost-connection';
import { Geolocation } from '@ionic-native/geolocation';
import { AddressProvider } from '../../../providers/address/address';
import _ from "lodash";
import { predictAddres, translateAddress } from "./../../../providers/utility/address-util";

@Component({
  selector: "prospect-add",
  templateUrl: "prospect-add.html"
})


export class ProspectAddComponent {

  @Input() public prospectDataEdit:any;

  prospectAddForm: FormGroup;

  private maxBirthDate: string = moment().format('YYYY-MM-DD');

  private infoParagraph = [
    'บันทึกสำเร็จ'
  ];

  public prospectData;

  public isApp;
  private buttonsearchId: string = "";
  /**
   * ใช้สำหรับ disable ปุ่ม
   */
  public buttonStatus = false;

  public isCustomer: boolean = false;

  public disableSaveButton: boolean = false;

  radioSelected: any;

  public customer : customerM;
  constructor(
    private http: Http,
    private storage: Storage,
    private apiProvider: ApiProvider,
    private platform: Platform,
    private alertCtrl: AlertDirective,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private validateProvider: ValidateProvider,
    private fb: FormBuilder,
    private loadingCtrl: LoadingDirective,
    private dateFormat: DateFormatProvider,
    private viewCtrl: ViewController,
    private events: Events,
    private broadcaster: Broadcaster,
    private network: Network,
    private geolocation: Geolocation,
    private address: AddressProvider
  ) {

    this.prospectAddForm = this.fb.group({
      citizenID : ['',[Validators.maxLength(13),Validators.minLength(13)]],
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      occupationType : ['',Validators.required],
      age: '',

      preName : ['',Validators.required],
      // gender: ['',Validators.required],
      gender: '',
      telephone : ['',Validators.minLength(9)],
      mobilephone: ['',[Validators.required,Validators.minLength(10)]],
      email: ['', this.validateProvider.isValidMailFormat],
      // email: '',
      maritalstatus: '',
      lineID:'',
      linkFacebook:'',
      geolocation:'',
      fax: '',
      passport: '',
      location: '',
      address: '',
      remark: '',

      // address new flow
      addressno:'',
      buildingname:'',
      moo:'',
      soi:'',
      road:''
    });

  }

  ngOnInit() {
    let loading = this.loadingCtrl.scopePresent();
    this.prospectData = {
      agentID: null,
      customerID: null,
      citizenID:"",
      firstName: "",
      lastName: "",
      preName:"",
      gender: "",
      occupationType: "",
      age: "",
      birthDate: moment().format("YYYY-MM-DD"),
      telephone: "",
      mobilephone: "",
      maritalstatus: "S",
      lineID:"",
      linkFacebook:"",
      geolocation:"",
      fax: "",
      passport: "",
      email: "",
      location: "",
      postcode: "",
      province: "",
      district: "",
      subdistrict: "",
      address: "",
      remark: "",
      createDatetime:"",
      addressSelected: {
        'province_name': '',
        'tambon_name': '',
        'amphur_name': '',
        'zip': ''
      },
      // address new flow
      addressno: '',
      buildingname: '',
      moo: '',
      soi: '',
      road: ''
    };

    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
    console.log("prospectData : ",this.prospectData);
    console.log("prospectdataedit",this.prospectDataEdit);

    if(typeof this.prospectDataEdit != 'undefined'){
      this.prospectData = this.prospectDataEdit.data;
      this.prospectData.birthDate = moment(this.prospectDataEdit.data.birthDate).format('YYYY-MM-DD');

      if(this.prospectDataEdit.data.province || this.prospectDataEdit.data.subdistrict ||
        this.prospectDataEdit.data.district || this.prospectDataEdit.data.postcode){
          this.prospectData.addressSelected = {
            province_id: this.prospectDataEdit.data.provinceCode,
            province_name: this.prospectDataEdit.data.province,
            tambon_id: this.prospectDataEdit.data.subdistrictCode,
            tambon_name: this.prospectDataEdit.data.subdistrict,
            amphur_id: this.prospectDataEdit.data.districtCode,
            amphur_name: this.prospectDataEdit.data.district,
            zip: this.prospectDataEdit.data.postcode
          }
      } else {
        this.prospectData.addressSelected = {
          'province_name': '',
          'tambon_name': '',
          'amphur_name': '',
          'zip': ''
        }
      }
    }

    this.storage.get('tlpromptMode').then(mode => {
      //mode = 0;//ถ้าต่อ เนต ยุ type ไม่ใช่ none
      if(this.network.type != 'none' && mode == 0)
      {
        this.buttonsearchId = '1';
      } else {
        this.buttonsearchId = mode;
      }

    });


    this.prospectAddForm.controls['preName'].valueChanges.subscribe((preName) => {
      console.log('preName => valueChanges =>',preName);
      this.preNameSelected(preName);
    });


    this.loadingCtrl.scopeDismiss(loading);

  }

  private chkInputVal(id: string): void {
    //console.log(id);
    var regex = /[`~<>"'\[\];:\}\{|\_\?\.,!@#$%^&*+\-/\(\)\\=0-9๐-๙]+/;
    let regexOnlyCharacter_TH_EN = new RegExp(/^[\u0E01-\u0E4Ca-zA-Z ]+$/);
    let regexOnlyNumber = new RegExp(/[0-9]+/);
    if(id == 'firstName'){

      let fName: string = this.prospectAddForm.get('firstName').value;

      if(!regexOnlyCharacter_TH_EN.test(fName) && fName.trim() != ""){
        this.prospectData.firstName = this.prospectData.firstName.replace(regex, '');
        this.prospectAddForm.get('firstName').setValue(this.prospectData.firstName);

      }
    }
    if(id == 'lastName'){
      let lName: string = this.prospectAddForm.get('lastName').value;

      if(!regexOnlyCharacter_TH_EN.test(lName) && lName.trim() != ""){
        this.prospectData.lastName = this.prospectData.lastName.replace(regex, '');
        this.prospectAddForm.get('lastName').setValue(this.prospectData.lastName);
      }
    }
  }


  private searchId() {
    //ถ้าต่อ เนต ยุ type ไม่ใช่ none
    if (this.buttonsearchId != '0' && this.network.type == 'none') {
      this.alertCtrl.warning('กรุณาเชื่อมต่ออินเทอร์เน็ต เพื่อใช้งานทีแอล โปร พลัส');
      return false;
    } else {

      //service choose address from api
      let objMs: Array<customerM> = [];
      let objM: customerM = new customerM();
      if(this.prospectData.citizenID == '')
      {
        this.alertCtrl.warning('กรุณากรอกข้อมูลค้นหา');
        return false;
      }

      let pattern = /^(-?[0-9]*)$/;
      let checkIdno = pattern.test(this.prospectData.citizenID);
      if (!checkIdno) {
        this.alertCtrl.warning('กรุณากรอกเลขบัตรประจำตัวประชาชนให้ถูกรูปแบบ');
        this.prospectData.citizenID = '';
        return false;

      }

      if(this.prospectData.citizenID.length < 13)
      {
        this.alertCtrl.warning('กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลัก');
        return false;
      }

      this.storage.get('loginProfile').then(profile =>{
          objM.idNo = this.prospectData.citizenID;
          objM.personID = profile.agentid;
          objMs.push(objM);
          let errorMessage = "ไม่พบข้อมูลลูกค้าจากเลขประจำตัวประชาชนนี้";
          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.CUSTOMERSERVICE;
          reqM.param = objMs;

          let loading = this.loadingCtrl.create({
            content: 'กรุณารอสักครู่...'
          });
          loading.present();
          this.apiProvider.callData(reqM).then(
            (res) => {
              loading.dismiss();
              let obj :any = res;
              let resModel: ResponseModel = obj;

              if(resModel.status === 0){
                console.log('resModel', resModel);
                if(resModel.size > 0)
                {

                    let popupInfo = new PopupModel();
                    if(resModel.data[0].address != '' ||
                    resModel.data[0].province != '' ||
                    resModel.data[0].tambon != '' ||
                    resModel.data[0].ampho != '')
                    {
                      this.isCustomer = true;
                      popupInfo.title = "ลูกค้าท่านนี้มีข้อมูลการทำประกันกับบริษัท";
                      let objpops: Array<Object> = [];
                      for (let key in resModel.data) {
                        let nameobj: string;
                        const tumbon = typeof resModel.data[key].tambon == 'undefined' || resModel.data[key].tambon.trim() =='' 
                            ? '' : ' แขวง/ตำบล ' +resModel.data[key].tambon;
                        const ampho = typeof resModel.data[key].ampho == 'undefined' || resModel.data[key].ampho.trim() =='' 
                            ? '' : ' เขต/อำเภอ ' + resModel.data[key].ampho;
                        const province = typeof resModel.data[key].province == 'undefined' || resModel.data[key].province.trim() =='' 
                            ? '' : ' จังหวัด ' +resModel.data[key].province;
                        nameobj = `${translateAddress(resModel.data[key].address)} ${tumbon} ${ampho} ${province}`;

                        objpops[key] = { "name": nameobj , "itemValue": key};
                      }
                      popupInfo.paragraphobject = objpops;
                      console.log("popupInfo ", popupInfo);
                    } else {
                      popupInfo.content = errorMessage;
                    }

                    let modal = this.modalCtrl.create(PopupProspectAddComponent, popupInfo,{enableBackdropDismiss: false});
                    modal.present();

                    modal.onDidDismiss(data => {
                      if (data === undefined)
                        return;

                      this.customer = resModel.data[data];
                      this.customer.birthData = parseInt(this.customer.birthData.substring(0, 4)) - 543 + "-"  +
                      this.customer.birthData.substring(4, 6) + "-"  +
                      this.customer.birthData.substring(6, 8);
                      this.prospectData.email = "",
                      // this.prospectData.age = this.customer.age;
                      this.prospectData.birthDate = this.customer.birthData;
                      this.prospectData.fax = this.customer.faxNo;
                      this.prospectData.firstName = this.customer.fName;
                      this.prospectData.gender = this.customer.sex;
                      this.prospectData.lastName = this.customer.lName;
                      this.prospectData.mobilephone = this.customer.mobileNo;
                      this.prospectData.occupationType = this.customer.occupation;

                      setTimeout(() => {
                        this.prospectData.preName = this.customer.perName;
                      }, 100);
                      this.prospectData.birthDate = moment(this.customer.birthData).format("YYYY-MM-DD");
                      this.prospectData.address = this.customer.address;
                      let address = this.address.getAddress().filter( item =>
                        (item['tambon_name'] == this.customer.tambon)
                        && (item['amphur_name'] == this.customer.ampho
                        && item['province_name'] == this.customer.province));

                      let mapAddress = {
                        province_id: '',
                        province_name: '',
                        tambon_id: '',
                        tambon_name: '',
                        amphur_id:  '',
                        amphur_name: '',
                        zip: ''
                      }
                      if(address && address.length > 0) {
                        mapAddress = {
                          province_id: address[0].province_id,
                          province_name: address[0].province_name,
                          tambon_id: address[0].tambon_id,
                          tambon_name: address[0].tambon_name,
                          amphur_id:  address[0].amphur_id,
                          amphur_name: address[0].amphur_name,
                          zip: address[0].zip
                        }
                      }
                      this.prospectData.addressSelected = {
                        province_id: mapAddress.province_id,
                        province_name: mapAddress.province_name,
                        tambon_id: mapAddress.tambon_id,
                        tambon_name: mapAddress.tambon_name,
                        amphur_id:  mapAddress.amphur_id,
                        amphur_name: mapAddress.amphur_name,
                        zip: mapAddress.zip
                      }

                      /**
                       * Test case
                       * A : 212\nM9\nVนาเมือ
                       * B : 1169 ซอยท่าดินแดง 16 ถนนท่าดินแดง
                       */
                      const addressObj = predictAddres(this.customer.address);
                      // const addressObj = predictAddres('1169 ซอยท่าดินแดง 16 ถนนท่าดินแดง');
                      this.prospectData = {
                        ...this.prospectData,
                        addressno: addressObj.address.no,
                        soi: addressObj.address.soi,
                        road: addressObj.address.road,
                        buildingname: addressObj.address.building,
                        moo: addressObj.address.moo
                      };
                      if (!addressObj.isComplete) {
                        this.alertCtrl.warning(' ข้อมูลที่อยู่ลูกค้าในระบบเป็นข้อมูลเก่า การแสดงผลใน TL Pro+ อาจไม่สมบูรณ์   ');
                        // this.alertCtrl.warning('ข้อมูลลูกค้าท่านนี้ ไม่สมบูรณ์ กรุณาเพิ่มเติมในรายละเอียด');
                      }
                     
                    });

                } else {
                  this.isCustomer = false;
                  let popupInfo = new PopupModel();
                  popupInfo.content = errorMessage;
                  let modalError = this.modalCtrl.create(PopupProspectAddComponent, popupInfo,{enableBackdropDismiss: false});
                  modalError.present();
                  // this.alertCtrl.warning('ไม่พบข้อมูลการทำประกันกับบริษัท');
                }
              } else {
                  this.isCustomer = false;
                  let popupInfo = new PopupModel();
                  popupInfo.content = errorMessage;
                  let modalError = this.modalCtrl.create(PopupProspectAddComponent, popupInfo,{enableBackdropDismiss: false});
                  modalError.present();
                // this.alertCtrl.warning('ไม่พบข้อมูลการทำประกันกับบริษัท');
              }
            },
            (err) => {
              this.isCustomer = false;
              loading.dismiss();
              let popupInfo = new PopupModel();
                  popupInfo.content = errorMessage;
                  let modalError = this.modalCtrl.create(PopupProspectAddComponent, popupInfo,{enableBackdropDismiss: false});
                  modalError.present();
              // this.alertCtrl.warning('ไม่พบข้อมูลการทำประกันกับบริษัท');
              console.log(err);
            }
          );
      });
    }

  }


  preNameSelected(preName: string) {
    // this.prospectData.preName = preName;
    // if(this.prospectData.preName == 'นาย' || this.prospectData.preName == 'เด็กชาย'){
    //   this.prospectData.gender = 'M';
    // } else if(this.prospectData.preName == 'นาง' || this.prospectData.preName == 'นางสาว' || this.prospectData.preName == 'เด็กหญิง') {
    //   this.prospectData.gender = 'F';
    // }
  }

  checkMaxDate(age) {
    this.checkAge(age);
    if(age && Number(age) > 99) {
      this.prospectData.birthDate = moment().subtract('year', 99).format('YYYY-MM-DD');
      return;
    }
  }

  checkAge(age){
    // if(age && Number(age) > 14) {
    //   const typeChild = ['เด็กชาย','เด็กหญิง'];
    //   // ถ้าเป็นเด็กให้ clear ค่า
    //   if(typeChild.includes(this.prospectAddForm.get('preName').value)){
    //     this.prospectAddForm.controls['preName'].setValue('');
    //     this.prospectAddForm.get('preName').updateValueAndValidity();
    //   }
    // } else {
    //    // ถ้าเป็นผู้ใหญ่ให้ clear ค่า
    //   const typeAdult = ['นาย','นาง','นางสาว'];
    //   if(typeAdult.includes(this.prospectAddForm.get('preName').value)){
    //     this.prospectAddForm.controls['preName'].setValue('');
    //     this.prospectAddForm.get('preName').updateValueAndValidity();
    //   }
    // }
  }

  isEmptyDate(data) {
    if(data) {
      if((data.year==0 || data.month==0 || data.day==0)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }

  }

  setAddr(address) {
    this.prospectData.subdistrict = address.tambon_id;
    this.prospectData.district = address.amphur_id;
    this.prospectData.province = address.province_id;
    this.prospectData.postcode = address.zip;
  }

  public submitPospect() {

    this.disableSaveButton = true;

    let pattern = /^(-?[0-9]*)$/;
    let checkIdno = pattern.test(this.prospectData.citizenID);
    
    if ((this.prospectData.citizenID != '') && (typeof this.prospectData.citizenID != 'undefined') && (!checkIdno)) {
      this.alertCtrl.warning('กรุณากรอกเลขบัตรประจำตัวประชาชนให้ถูกรูปแบบ');
      this.prospectData.citizenID = '';
        
      this.disableSaveButton = false;
      return false;
    }
    else if ((this.prospectData.citizenID != '') && (typeof this.prospectData.citizenID != 'undefined') && this.prospectData.citizenID.length < 13){
      this.alertCtrl.warning('กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลัก');
        
      this.disableSaveButton = false;
      return false;
    }

    this.buttonStatus = true;
    this.storage.get('tlpromptMode').then(mode =>{
      this.storage.get('loginProfile').then(async profile => {

        if (this.prospectData.addressSelected !== null) {
          this.prospectData.subdistrict = this.prospectData.addressSelected.tambon_id;
          this.prospectData.district = this.prospectData.addressSelected.amphur_id;
          this.prospectData.province = this.prospectData.addressSelected.province_id;
          this.prospectData.postcode = this.prospectData.addressSelected.zip;
        }
        else {
          this.prospectData.subdistrict = '';
          this.prospectData.district = '';
          this.prospectData.province = '';
          this.prospectData.postcode = '';
        }

        if(this.prospectData.preName === '' ||
          this.prospectData.firstName.trim() === '' ||
          this.prospectData.lastName.trim() === '' ||
          this.prospectData.gender === '' ||
          this.prospectData.mobilephone === '' ||
          this.prospectData.occupationType === ''
        ){
            let warnStr = "";
            if(this.prospectData.preName === ''){
              warnStr += ' คำนำหน้าชื่อ';
            }
            if(this.prospectData.firstName.trim() === ''){
              warnStr += ' ชื่อ';
            }
            if(this.prospectData.lastName.trim() === ''){
              warnStr += ' นามสกุล';
            }
            if(this.prospectData.gender === ''){
              warnStr += ' เพศ';
            }
            if(this.prospectData.mobilephone === ''){
            warnStr += ' เบอร์มือถือ';
            }
            if(this.prospectData.occupationType === ''){
              warnStr += ' ชั้นอาชีพ';
            }
            this.buttonStatus=false;
            this.alertCtrl.warning('กรุณาใส่'+warnStr);

            this.disableSaveButton = false;
            return;
        }
        else {

          if (this.prospectAddForm.valid) {

              this.loadingCtrl.present();

              let valitateExitsProspect: boolean = true;
              let prospectMs: Array<ProspectModel> = [];
              
              if (this.prospectData.customerID == null || this.prospectData.customerID == undefined) {

                  console.log('------------- เช็คข้อมูลซ้ำกรณีสร้างผู้มุ่งหวังคนใหม่ ------------');

                  let prospectM: ProspectModel = new ProspectModel();
                  prospectM.firstName = this.prospectData.firstName;
                  prospectM.lastName = this.prospectData.lastName;
                  prospectM.gender = this.prospectData.gender;
                  prospectM.birthDate = this.prospectData.birthDate;
                  prospectMs.push(prospectM);
              }

              if (this.prospectData.customerID != '' && this.prospectData.customerID != undefined) {

                  console.log('------------- เช็คข้อมูลซ้ำกรณีแก้ไขผู้มุ่งหวังเดิม ------------');

                  let prospectM: ProspectModel = new ProspectModel();
                  prospectM.firstName = this.prospectData.firstName;
                  prospectM.lastName = this.prospectData.lastName;
                  prospectM.gender = this.prospectData.gender;
                  prospectM.birthDate = this.prospectData.birthDate;
                  prospectM.customerID = this.prospectData.customerID;
                  prospectMs.push(prospectM);
              }

              if (prospectMs.length > 0) {
                let reqProspectM: RequestModel = new RequestModel();
                reqProspectM.functionName = FunctionName.POSPECT;
                reqProspectM.param = prospectMs;
                reqProspectM.serviceName = ServiceName.COUNT;
                reqProspectM.keyvalue = '';
                await this.apiProvider.callData(reqProspectM).then(
                  (res)=> {
                    if (Number(res['size']) > 0) {
                      valitateExitsProspect = false;
                    }
                  },
                  (err) => {
                    this.disableSaveButton = false;
                    console.log('err : ', err);
                    this.alertCtrl.error(err);
                  }
                );
              }

            if (valitateExitsProspect) {

              let prospectModelReq: ProspectModel = new ProspectModel();
              prospectModelReq.agentID = profile.agentid;
              prospectModelReq.customerID = this.prospectData.customerID;
              prospectModelReq.preName = this.prospectData.preName;
              prospectModelReq.firstName = this.prospectData.firstName;
              prospectModelReq.lastName = this.prospectData.lastName;
              prospectModelReq.citizenID = this.prospectData.citizenID;
              prospectModelReq.telephone = this.prospectData.telephone;
              prospectModelReq.mobilephone = this.prospectData.mobilephone;
              prospectModelReq.fax = this.prospectData.fax;
              prospectModelReq.gender = this.prospectData.gender;
              prospectModelReq.age = this.prospectData.age;
              prospectModelReq.occupationType = this.prospectData.occupationType;
              prospectModelReq.maritalstatus = this.prospectData.maritalstatus;
              prospectModelReq.geolocation = this.prospectData.geolocation;
              prospectModelReq.passport = this.prospectData.passport;
              prospectModelReq.lineID = this.prospectData.lineID;
              prospectModelReq.linkFacebook = this.prospectData.linkFacebook;
              prospectModelReq.subdistrict = this.prospectData.subdistrict;
              prospectModelReq.district = this.prospectData.district;
              prospectModelReq.province = this.prospectData.province;
              prospectModelReq.postcode = this.prospectData.postcode;
              prospectModelReq.address = this.prospectData.address;
              prospectModelReq.email = this.prospectData.email;
              prospectModelReq.remark = this.prospectData.remark;
              prospectModelReq.addressno = this.prospectData.addressno;
              prospectModelReq.buildingname = this.prospectData.buildingname;
              prospectModelReq.moo = this.prospectData.moo;
              prospectModelReq.soi = this.prospectData.soi;
              prospectModelReq.road = this.prospectData.road;

              prospectModelReq.birthDate = moment(this.prospectData.birthDate).format("YYYY-MM-DD HH:mm:ss");

              let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              let serviceName: ServiceName;

              if (prospectModelReq.customerID == null || prospectModelReq.customerID == undefined) {

                if (this.isCustomer) {
                  prospectModelReq.customerType = 'C';
                }
                else {
                  prospectModelReq.customerType = 'P';
                }

                prospectModelReq.createDatetimeFrom = dateNow;
                prospectModelReq.createDatetimeTo = dateNow;
                prospectModelReq.createDatetime = dateNow;
                prospectModelReq.customerID = UUID.UUID();
                serviceName = ServiceName.INSERT;
              }
              else {

                if (this.isCustomer) {
                  prospectModelReq.customerType = 'C';
                }
                else {
                  prospectModelReq.customerType = this.prospectData.customerType;
                }

                prospectModelReq.createDatetime = this.prospectData.createDatetime;
                serviceName = ServiceName.UPDATE;
              }

              prospectModelReq.lastModify = dateNow;
              prospectModelReq.flagdraftyn = "N";

              let prospectModelReqList : ProspectModel[] = [];
              prospectModelReqList.push(prospectModelReq);

              let reqModel:RequestModel = new RequestModel();
              reqModel.agentid = profile.agentid;
              reqModel.mode = mode;
              reqModel.functionName = FunctionName.POSPECT;
              reqModel.param = prospectModelReqList;
              reqModel.serviceName = serviceName;
              
              
              this.apiProvider.callData(reqModel).then(
                (res) => {
                  this.disableSaveButton = false;
                  this.loadingCtrl.dismiss();

                  let obj :any = res;
                  let resModel :ResponseModel = obj;

                  if (resModel.status === 0) {
                    this.buttonStatus = false;
                    // แก้ไขให้กดปุ่มตกลงก่อนแล้วค่อยไปเปิดหน้า ProspectPage
                    this.alertCtrl.warning('บันทึกสำเร็จ').then(
                      () => {
                        this.navCtrl.push('ProspectPage');
                      },(err) => {
                        // เผื่อ user กดทึ่หน้าจอด้านหลังแทนกดปุ่มตกลง
                        this.navCtrl.push('ProspectPage');
                      }
                    );
                  } 
                  else {
                    this.alertCtrl.warning('ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่');
                    this.buttonStatus = false;
                  }
                },
                (err) => {
                  this.disableSaveButton = false;
                  this.loadingCtrl.dismiss();
                  console.log(err);
                  this.buttonStatus = false;
                });
            }
            else {
              this.disableSaveButton = false;
              this.loadingCtrl.dismiss();
              this.alertCtrl.warning("ชื่อ " + this.prospectData.firstName + " " + this.prospectData.lastName + " ซ้ำกับลูกค้าที่ท่านเคยบันทึกไว้แล้ว");
            }

          }
          else if(this.prospectData.mobilephone.trim().length < 10) {
            this.disableSaveButton = false; 
            //แก้เฉพาะกรณีกรอกไม่ครบให้เหมือนใบเสนอขาย
            this.alertCtrl.warning("กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ครบถ้วน");
            this.disableSaveButton = false;
          }
          else {
            this.buttonStatus = false;
            this.alertCtrl.warning('กรอกรูปแบบข้อมูลไม่ถูกต้อง');
            this.disableSaveButton = false;
          }
        }
      });
    });
  }

  reset(){
    this.prospectData = {
      agentID: null,
      customerID: null,
      citizenID:"",
      firstName: "",
      lastName: "",
      preName:"",
      gender: "",
      occupationType: "",
      age: "",
      birthDate: moment().format('YYYY-MM-DD'),
      // birthDate: this.dateFormat.datePickerAdapterIn(""),
      telephone: "",
      mobilephone: "",
      status: "",
      lineID:"",
      linkFacebook:"",
      geolocation:"",
      fax: "",
      passport: "",
      email: "",
      location: "",
      postcode: "",
      province: "",
      district: "",
      subdistrict: "",
      address: "",
      remark: "",
      addressSelected: {
        'province_name': '',
        'tambon_name': '',
        'amphur_name': '',
        'zip': ''
      }
    };

    this.disableSaveButton = false;
    this.isCustomer = false;
  }

  openGoogleMap() {
      this.storage.get('tlpromptMode').then(mode => {
        //mode = 0;//ถ้าต่อเน็ตอยู่ type ไม่ใช่ none
        if(this.network.type == 'none' && mode == 0)
        {
          let opts: ModalOptions = {
            cssClass: 'lost-connection'
          };

          let modal: Modal = this.modalCtrl.create(PopupLostConnectionComponent);
              modal.present();
              this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 10000, enableHighAccuracy: true }).then((resp) => {
                this.prospectData.geolocation = resp.coords.latitude+','+resp.coords.longitude;
              },err => {
                this.prospectData.geolocation = "0,0";
              });

        } else {

          let modal = this.modalCtrl.create(GoogleMapComponent, '');
              modal.onDidDismiss((data) => {
                this.prospectData.geolocation = data.lat+','+data.lng;
              });
              modal.present();
        }

      });
  }

  private keyupdata() {
    if( this.prospectData.citizenID.length > 13)
    {
      this.prospectData.citizenID = this.prospectData.citizenID.substring(0, 13);
    }
  }


  private pNameChange(event:any): void {
    if(event.target.value !== this.prospectAddForm.get('preName').value){
      this.prospectAddForm.controls['preName'].setValue(event.target.value);
      this.prospectAddForm.get('preName').updateValueAndValidity();
    }
  }


  private sexChange(genderValue:any): void {
    if(genderValue !== this.prospectAddForm.get('gender').value){
      this.prospectAddForm.controls['gender'].setValue(genderValue);
      this.prospectAddForm.get('gender').updateValueAndValidity();
    }
  }



}
