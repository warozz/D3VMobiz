import { UlinkApplicationDetailM } from './../ulink-app-data/ulink-application-detail-model';
import { UlinkApplicationFormM } from './../ulink-app-data/ulink-application-form-model';
import {LoadingDirective} from '../../directives/extends/loading/loading';
import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import * as moment from 'moment';
import _ from "lodash";

import { QuotationModel } from '../quotation/quotation-model';
import { ApplicationMasterM } from './application-master-model';
import { MCAapplicationsM } from '../service-table/mcaapplications-model';
import { RequestModel } from '../model/request-model';
import { FunctionName } from '../constants/function-name';
import { ServiceName } from '../constants/service-name';
import { ApiProvider } from '../api/api';
import { SaledetailM } from '../service-table/saledetail-model';
import { AddressM } from '../service-table/address-model';
import { ApplicationAnswerM } from '../service-table/applicationanswer-model';
import { AttachFileM } from '../service-table/attachfile-model';
import { BeneficiaryM } from '../service-table/beneficiary-model';
import { InsurancerejectionsM } from '../service-table/insurancerejections-model';
import { MCAOccupationM } from '../service-table/mcaoccupations-model';
import { OccupationsM } from '../service-table/occupations-model';
import { OtherinsuranceM } from '../service-table/otherinsurance-model';
import { PaymentM } from '../service-table/payment-model';
import { KbM } from '../service-table/kb-model';
import { ToastController } from 'ionic-angular';
import { PersonType } from '../constants/person-type';
import { Storage } from '@ionic/storage';
import { UnderAgeChildModel } from "./../unitlink-under-age-child/under-agechild-model";
import { PreUWStatusM } from '../model/pre-underwrite';

@Injectable()
export class ApplicationData {

    private preUWStatusM: PreUWStatusM;

    /**
     * ใบเสนอขาย หน้าแรกที่ทำการเลือก
     */
    public quotation: any;

    /**
     * ข้อมูลรายละเอียดใบคำขอทั้งหมด ApplicationMasterM
     */
    public applicationMasterM: ApplicationMasterM = new ApplicationMasterM();

    /**
     * 1.ข้อมูลทั่วไป
     */
    public appGeneral: FormGroup;
    /**
     * ที่อยู่ตามทะเบียนบ้าน
     */
    public appAddressP: FormGroup;
    /**
     * ที่อยู่ปัจจุบัน
     */
    public appAddressC: FormGroup;
    /**
     * ที่อยู่ที่ทำงาน
     */
    public appAddressW: FormGroup;

    /**
     * 2.แบบประกัน
     */
    public appType: FormGroup;

    /**
     * 3.ผู้รับประโยชน์
     */
    public appBeneficiary: FormGroup;

    /**
     * 4.ประวัติการรับประกัน
     */
    public appHistory: FormGroup;

    /**
     * 5.ประวัติการแพทย์
     */
    public appMedicalHistory: FormGroup;

    /**
     * 6.รับรอง FATCA
     */
    public appTreatmentHistory: FormGroup;

    /**
     * 7.ลงชื่อผู้เอาประกัน
     */
    public appSign: FormGroup;

    /**
     * 8.คบ.
     */
    public appKb: FormGroup;

    /**
     * เลขที่ใบคำขอ
     */
    private applicationid: string = '';

     /**
     * เลขที่ Reference No.
     */
    private applicationno: string = '';

    /**
     * พร้อมดึงข้อมูล
     */
    private ready: boolean = false;

    /**
     * @name hasKB
     * @type boolean
     * @public
     * @description มี ค.บ. หรือไม่
     */
    public hasKB: boolean = false;

    private addressMs: Array<AddressM> = [];
    private attachfileMs: Array<AttachFileM> = [];
    private beneficiaryMs: Array<BeneficiaryM> = [];
    private insurancerejectionsMs: Array<InsurancerejectionsM> = [];
    private mcaoccupationsMs: Array<MCAOccupationM> = [];
    private occupationsMs: Array<OccupationsM> = [];
    private otherinsuranceMs: Array<OtherinsuranceM> = [];
    private paymentMs: Array<PaymentM> = [];
   

    constructor(
        private apiProvider: ApiProvider, 
        private toastCtrl: ToastController, 
        private loadingCtrl: LoadingDirective,
        private storage: Storage) 
        { 
            
        }

    /**
     * บันทึกข้อมูลใบเสนอขายที่เลือก
     */
    public setQuotation(quotation: any) {
        this.ready = false;
        this.quotation = quotation;
        this.applicationno = quotation.referenceno;

        return new Promise((resolve, reject) => {
            this.selectApplication().then(
                (res)=> {
                    resolve(res);
                },
                (err)=> {
                    console.log('err : ', err);
                    reject(err);
                }
            );
        });
        
    }

    /**
     * อ่านข้อมูลใบเสนอขายที่เลือก
     */
    public getQuotation() {
        return this.quotation;
    }

    /**
     * บันทึกข้อมูลรายละเอียดใบคำขอทั้งหมด ApplicationMasterM
     */
    public setApplicationMasterM(applicationMasterM: any): void {
        this.applicationMasterM = applicationMasterM;
    }

   /**
     * อ่านข้อมูลรายละเอียดใบคำขอทั้งหมด ApplicationMasterM
     */
    public getApplicationMasterM() {
        return this.applicationMasterM;
    }

    /**
     * อ่านข้อมูลทั้งหมดจาก service
     * @param customerId
     * @param applicationNo
     */
    public selectApplication(): Promise<ApplicationMasterM> {
        return new Promise((resolve, reject) => {
            let applicationMasterMs: Array<ApplicationMasterM> = [];
            let appMasterM: ApplicationMasterM = new ApplicationMasterM();

            let mCAapplicationsM: MCAapplicationsM = new MCAapplicationsM();
            mCAapplicationsM.customerid = this.quotation.customerid;
            mCAapplicationsM.applicationno = this.quotation.referenceno; //Get from quotation referenceno

            appMasterM.mcaapplicationM = mCAapplicationsM;

            applicationMasterMs.push(appMasterM);

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.APPLICATIONMASTER;
            reqM.serviceName = ServiceName.SELECT;
            reqM.param = applicationMasterMs;

            this.apiProvider.callData(reqM).then(
                res => {
                    if (res['size'] > 0) {

                        this.applicationMasterM = res['data'][0];
                        this.applicationid = res['data'][0].mcaapplicationM.applicationid;
                        this.applicationno = res['data'][0].mcaapplicationM.applicationno;
                        this.ready = true;
                        resolve(this.applicationMasterM);
                        
                        // this.applicationMasterM = res['data'][0];

                        // if ('GENERATE_APPID' == res['data'][0].mcaapplicationM.applicationstatus) {
                        //     /**
                        //      * กรณียังมีใบคำขอ จะทำการสร้างเลขที่ใบคำขอตอบกลับมา applicationid
                        //      */
                        //     this.applicationid = res['data'][0].mcaapplicationM.applicationid;
                        //     this.applicationno = this.quotation.referenceno;
                        //     resolve();
                        // }
                        // else {
                        //     this.applicationMasterM = res['data'][0];
                        //     this.applicationid = res['data'][0].mcaapplicationM.applicationid;
                        //     this.applicationno = res['data'][0].mcaapplicationM.applicationno;
                        //     this.ready = true;
                        //     resolve(this.applicationMasterM);
                        // }
                    }
                    else {
                        this.applicationid = '';
                        this.applicationMasterM = new ApplicationMasterM();
                        resolve();
                    }
                },
                err => {
                    console.log(err);
                    reject('');
                }
            );
        });
    }

    async selectAgreeTerm(customerid, referenceno) {
        if(customerid && referenceno) {
          let objM: MCAapplicationsM = new MCAapplicationsM();
            objM.customerid= customerid; //Require = Y
            objM.applicationno = referenceno; //Require = Y , From referenceNo in Quotation
    
            let objMs: Array<MCAapplicationsM> = [];
            objMs.push(objM);
    
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.MCAAPPLICATIONS;
            reqM.serviceName = ServiceName.SELECT;
            reqM.param = objMs; 
            
            await this.apiProvider.callData(reqM).then(
              (res) => {
                  let fatcaCheck: Boolean = false;
                if(res && res['size'] > 0) {
                    if(res['data'][0].fatcaagree && res['data'][0].fatcaagree == 'Y') {
                        fatcaCheck = true;
                    }
                }
                this.appTreatmentHistory.controls['selectAgreeTerm'].setValue(fatcaCheck);
                this.appTreatmentHistory.controls['agreeTerm'].setValue(fatcaCheck);
                // console.log(JSON.stringify(res));
              },
              (err) => {
                console.log(err);
                this.appTreatmentHistory.controls['selectAgreeTerm'].setValue(false);
                this.appTreatmentHistory.controls['agreeTerm'].setValue(false);
              }
            );
        }
    }

    async updateAgreeTerm(customerid, referenceno, flag) {
        if(customerid && referenceno) {
          let objM: MCAapplicationsM = new MCAapplicationsM();
            objM.customerid= customerid; //Require = Y
            objM.applicationno = referenceno; //Require = Y , From referenceNo in Quotation
            objM.fatcaagree = flag;
            let objMs: Array<MCAapplicationsM> = [];
            objMs.push(objM);
    
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.MCAAPPLICATIONS;
            reqM.serviceName = ServiceName.UPDATE;
            reqM.param = objMs; 
            reqM.searchkey = "fatca";
    
            await this.apiProvider.callData(reqM).then(
              (res) => {
                console.log(JSON.stringify(res));
              },
              (err) => {
                console.log(err);
              }
            );
        }
    }


    /**
     * ดึงข้อมูล
     * @param model โมเดลที่ต้องการ
     */
    public getData(model?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.ready) {
                if (typeof model != 'undefined')
                    resolve(this.applicationMasterM[model]);
                else   
                    resolve(this.applicationMasterM);
            }
            else {
                reject();
            }
        });
     }

    /**
     * บันทึกข้อมูลด้วย service
     */
    public insertApplication(step?:number, publish: string = 'D'): Promise<null> {
        //let { publishstatus : publishCompare } = this.applicationMasterM.mcaapplicationM;
        // console.log("step -> ", step);
        // console.log("insertApp current pulish -> ", publish);
        // console.log("publishCompare DB -> ", publishCompare);
        // if(publishCompare === 'P') {
        //     publish = publishCompare;
        // }
        return new Promise(async (resolve, reject) => {
            // Fatca page
            if(step == 5) {
                this.selectAgreeTerm(this.quotation.customerid, this.quotation.referenceno);
            }

            let applicationMasterMs: Array<ApplicationMasterM> = [];
            let applicationMasterM: ApplicationMasterM = new ApplicationMasterM();
            /**
             * รวมข้อมูลทั้งหมด
             */

            applicationMasterM.mcaapplicationM = this.getMCAapplications(publish); 
           
            applicationMasterM.occupationsMs = this.getOccupation();
          
            applicationMasterM.addressMs = this.getAddressMs();

            applicationMasterM.beneficiaryMs = this.getBeneficiaryMs();
        
            applicationMasterM.applicationAnswerMs = this.getApplicationAnswer();

            applicationMasterM.otherinsuranceMs = this.getOtherinsuranceM();

            applicationMasterM.insurancerejectionsMs = this.getInsurancerejectionsMs();

            applicationMasterM.paymentMs = this.getPaymentMs();
            
            // เชค ใบคำขอ ยูนิตลิงค์
            if (this.quotation.typeapp === 'ULink') {
                // ข้อมูลบุตร/ธิดา
                applicationMasterM.unitlinkunderagechildMs = this.getUnitlinkunderagechildMs();
                // คู่สมรส
                applicationMasterM.unitlinkapplicationdetailMs = [this.getUnitlinkApplicationDetailMs()];
            }
            
            if (this.hasKB) {
                // ข้อมูล คบ.
                applicationMasterM.kbM = this.getKB();
            }

            applicationMasterMs.push(applicationMasterM);

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.APPLICATIONMASTER;
            reqM.serviceName = this.applicationid == '' ? ServiceName.INSERT : ServiceName.UPDATE;
            reqM.param = applicationMasterMs;

            this.loadingCtrl.present();
            this.apiProvider.callData(reqM).then(
                res => {
                    this.loadingCtrl.dismiss();
                    let toast = this.toastCtrl.create({
                        message: 'บันทึกสำเร็จ',
                        duration: 3000
                    });
                    toast.present();
                    this.applicationid = res['data'][0].mcaapplicationM.applicationid;
                    this.setApplicationMasterM(applicationMasterM) ;
                    resolve();
                },
                err => {
                    this.loadingCtrl.dismiss();
                    let toast = this.toastCtrl.create({
                        message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
                        duration: 3000
                    });
                    toast.present();
                    console.log(err);
                    reject();
                }
            );
        });
    }

    private getApplicationAnswer() : Array<ApplicationAnswerM> {

        let applicationAnswerMs: Array<ApplicationAnswerM> = [];

        let diseaseNm1 = this.appMedicalHistory.controls['disease_name1'].value
        let diseaseNm2 = this.appMedicalHistory.controls['disease_name2'].value
        let diseaseNm3 = this.appMedicalHistory.controls['disease_name3'].value
        

        /**
         * ข้อมูลทั่วไป >> ในรอบ 6 เดือนที่ผ่านมาน้ำหนักตัวของท่านเปลี่ยนแปลงหรือไม่
         */
        let appAnswerM28: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM28.questionid = "28";
        appAnswerM28.answeryn = this.appGeneral.controls['weigthChange'].value;//Y N
        appAnswerM28.answerdesc = this.appGeneral.controls['weigthChangeDesc'].value; // สาเหตุที่นำหนักเลี่ยนแปลง
        if (this.appGeneral.controls['weigthChangeUD'].value == 'U') {
            appAnswerM28.text1 = this.appGeneral.controls['weigthChangeNum'].value; //น้ำหนักเพิ่ม
            appAnswerM28.text2 = "";
        }
        else if (this.appGeneral.controls['weigthChangeUD'].value == 'D') {
            appAnswerM28.text1 = "";
            appAnswerM28.text2 = this.appGeneral.controls['weigthChangeNum'].value; //น้ำหนักลด
        }
        else {
            appAnswerM28.text1 = ""; //น้ำหนักเพิ่ม
            appAnswerM28.text2 = ""; //น้ำหนักลด
        }
        applicationAnswerMs.push(appAnswerM28);

        /**
         *  ข้อมูลทั่วไป >> ท่านเคยมีส่วนเกี่ยวข้องกับการค้ายาเสพติดหรือเคยต้องโทษเกี่ยวกับคดียาเสพติดหรือไม่
         */
        let appAnswerM6: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM6.questionid = "6";
        appAnswerM6.answeryn = this.appGeneral.controls['drug'].value;//Y N
        applicationAnswerMs.push(appAnswerM6);

        /**
         * ข้อมูลทั่วไป >> ท่านเสพหรือเคยเสพยาเสพติด
         */
        let appAnswerM7: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM7.questionid = "7";
        appAnswerM7.answeryn = this.appGeneral.controls['drug_exp'].value;//Y N
        applicationAnswerMs.push(appAnswerM7);

        /**
         * ประวัติการรับประกัน >> ท่านเคยทำประกันชีวิตที่อื่น*
         */
        let appAnswerM76: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM76.questionid = "76";
        appAnswerM76.answeryn = "";//Y N
        applicationAnswerMs.push(appAnswerM76);

        /**
         * ประวัติการรับประกัน >> ท่านเคยถูกปฏิเสธ*
         */
        let appAnswerM77: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM77.questionid = "77";
        appAnswerM77.answeryn = "";//Y N
        applicationAnswerMs.push(appAnswerM77);

        /**
         * ประวัติการแพทย์ >> ท่านมีสุขภาพร่างกายและจิตใจสมบูรณ์ดีไม่มีอวัยวะส่วนใดของร้างกายพิการและ/หรือทุพพลภาพ
         */
        let appAnswerM1: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM1.questionid = "8";
        if(this.appMedicalHistory.get('physician').value == 'Y'){
            appAnswerM1.answeryn = 'Y'
        }
        else if(this.appMedicalHistory.get('physician').value == 'N'){
            appAnswerM1.answeryn = 'N'
        }
        else{
            appAnswerM1.answeryn = ''
        }
        // appAnswerM1.answeryn = this.appMedicalHistory.get('physician').value == 'Y' ? 'Y' : 'N';//Y N
        appAnswerM1.answerdesc = this.appMedicalHistory.controls['physician_desc'].value;// ไม่ใช่ (โปรดระบุ)
        applicationAnswerMs.push(appAnswerM1);

        /**
         * ประวัติการแพทย์ >> ในระหว่าง 3 ปีที่แล้วท่านเคยให้แพทย์ตรวจหรือเข้าสถานพยาบาลทำการรักษาตัว ตรวจโลหิตความดันโลหิต ปัสสาวะ เอกซเรย์ ตรวจหัวใจหรือตรวจอย่างอื่นหรือไม่
           text1 = ชื่อสถานพยาบาล, text2 = ชื่อนายแพทย์, text3 = ชื่อโรค, text4 = ผลการตรวจ, text5 = ผลการรักษา, datetime1 = วดป.
         */
        let appAnswerM9: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM9.questionid = "9";
        if(this.appMedicalHistory.get('yearphysician').value == 'Y'){
            appAnswerM9.answeryn = 'Y'
        }
        else if(this.appMedicalHistory.get('yearphysician').value == 'N'){
            appAnswerM9.answeryn = 'N'
        }
        else{
            appAnswerM9.answeryn = ''
        }
        // appAnswerM9.answeryn = this.appMedicalHistory.get('yearphysician').value == 'Y' ? 'Y' : 'N';//Y N
        appAnswerM9.text1 = this.appMedicalHistory.controls['hospitalName'].value;
        appAnswerM9.text2 = this.appMedicalHistory.controls['physicianName'].value;
        appAnswerM9.text3 = this.appMedicalHistory.controls['diseaseName'].value;
        appAnswerM9.text4 = this.appMedicalHistory.controls['result'].value;
        appAnswerM9.text5 = this.appMedicalHistory.controls['treatmentResult'].value;
        appAnswerM9.datetime1 = moment(this.appMedicalHistory.controls['medicalDate'].value).isValid() ? moment(this.appMedicalHistory.controls['medicalDate'].value).format('YYYY-MM-DD HH:mm:ss') : '';
        
        applicationAnswerMs.push(appAnswerM9);

        /**
         * ประวัติการแพทย์ >> ท่านเคยได้รับการวินิจฉัย รับการรักษา ตั้งข้อส่งสัยว่าป่วยเป็นโรคตามรายการนี้หรือไม่
         */
        let appAnswerM10: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM10.questionid = "10";
        if(this.appMedicalHistory.get('treatmentPhysician').value == 'Y'){
            appAnswerM10.answeryn = 'Y'
        }
        else if(this.appMedicalHistory.get('treatmentPhysician').value == 'N'){
            appAnswerM10.answeryn = 'N'
        }
        else{
            appAnswerM10.answeryn = ''
        }
        // appAnswerM10.answeryn = this.appMedicalHistory.get('treatmentPhysician').value == 'Y' ? 'Y' : 'N';//Y N 
        applicationAnswerMs.push(appAnswerM10);

        /**
         * ประวัติการแพทย์ >> ท่านเคยต้องโทษคดีเกี่ยวกับยาเสพติดหรือไม่
         */
        let appAnswerM27: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM27.questionid = "27";
        appAnswerM27.answeryn = "";//Y N
        applicationAnswerMs.push(appAnswerM27);

        /**
         * ประวัติการแพทย์ >> ติดเชื้อในหูชั้นกลาง
         */
        let appAnswerM29: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM29.questionid = "29";
        appAnswerM29.answeryn = this.appMedicalHistory.controls['disease_21'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ติดเชื้อในหูชั้นกลาง'){
            appAnswerM29.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM29.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM29.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ติดเชื้อในหูชั้นกลาง'){
            appAnswerM29.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM29.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM29.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ติดเชื้อในหูชั้นกลาง'){
            appAnswerM29.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM29.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM29.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM29);

        /**
         * ประวัติการแพทย์ >> ต่อมทอนซิลอักเสบเรื้อรัง 
         */
        let appAnswerM30: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM30.questionid = "30";
        appAnswerM30.answeryn = this.appMedicalHistory.controls['disease_5'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ต่อมทอนซิลอักเสบเรื้อรัง'){
            appAnswerM30.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM30.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM30.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ต่อมทอนซิลอักเสบเรื้อรัง'){
            appAnswerM30.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM30.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM30.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ต่อมทอนซิลอักเสบเรื้อรัง'){
            appAnswerM30.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM30.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM30.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM30);

        /**
         * ประวัติการแพทย์ >> ไซนัสอักเสบ 
         */
        let appAnswerM31: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM31.questionid = "31";
        appAnswerM31.answeryn = this.appMedicalHistory.controls['disease_9'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ไซนัสอักเสบ'){
            appAnswerM31.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM31.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM31.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ไซนัสอักเสบ'){
            appAnswerM31.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM31.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM31.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ไซนัสอักเสบ'){
            appAnswerM31.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM31.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM31.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM31);

        /**
         * ประวัติการแพทย์ >> ปวดศีรษะไมเกรน
         */
        let appAnswerM32: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM32.questionid = "32";
        appAnswerM32.answeryn = this.appMedicalHistory.controls['disease_13'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ปวดศีรษะไมเกรน'){
            appAnswerM32.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM32.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM32.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ปวดศีรษะไมเกรน'){
            appAnswerM32.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM32.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM32.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ปวดศีรษะไมเกรน'){
            appAnswerM32.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM32.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM32.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM32);

        /**
         * ประวัติการแพทย์ >> ภูมิแพ้ 
         */
        let appAnswerM33: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM33.questionid = "33";
        appAnswerM33.answeryn = this.appMedicalHistory.controls['disease_16'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ภูมิแพ้'){
            appAnswerM33.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM33.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM33.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ภูมิแพ้'){
            appAnswerM33.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM33.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM33.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ภูมิแพ้'){
            appAnswerM33.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM33.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM33.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM33);

        /**
         * ประวัติการแพทย์ >> หลอดลมอักเสบเรื้อรัง 
         */
        let appAnswerM34: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM34.questionid = "34";//disease_22
        appAnswerM34.answeryn = this.appMedicalHistory.controls['disease_22'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'หลอดลมอักเสบเรื้อรัง'){
            appAnswerM34.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM34.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM34.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'หลอดลมอักเสบเรื้อรัง'){
            appAnswerM34.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM34.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM34.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'หลอดลมอักเสบเรื้อรัง'){
            appAnswerM34.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM34.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM34.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM34);


        /**
         * ประวัติการแพทย์ >> กรดไหลย้อน 
         */
        let appAnswerM35: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM35.questionid = "35";
        appAnswerM35.answeryn = this.appMedicalHistory.controls['disease_6'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'กรดไหลย้อน'){
            appAnswerM35.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM35.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM35.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'กรดไหลย้อน'){
            appAnswerM35.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM35.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM35.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'กรดไหลย้อน'){
            appAnswerM35.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM35.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM35.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM35);

        /**
         * ประวัติการแพทย์ >> นิ่ว
         */
        let appAnswerM36: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM36.questionid = "36";
        appAnswerM36.answeryn = this.appMedicalHistory.controls['disease_20'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'นิ่ว'){
            appAnswerM36.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM36.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM36.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'นิ่ว'){
            appAnswerM36.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM36.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM36.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'นิ่ว'){
            appAnswerM36.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM36.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM36.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM36);

        /**
         * ประวัติการแพทย์ >> ถุงน้ำดีอักเสบ 
         */
        let appAnswerM37: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM37.questionid = "37";
        appAnswerM37.answeryn = this.appMedicalHistory.controls['disease_10'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ถุงน้ำดีอักเสบ'){
            appAnswerM37.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM37.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM37.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ถุงน้ำดีอักเสบ'){
            appAnswerM37.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM37.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM37.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ถุงน้ำดีอักเสบ'){
            appAnswerM37.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM37.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM37.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM37);

        /**
         * ประวัติการแพทย์ >> ไส้เลื่อน 
         */
        let appAnswerM38: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM38.questionid = "38";
        appAnswerM38.answeryn = this.appMedicalHistory.controls['disease_14'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ไส้เลื่อน'){
            appAnswerM38.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM38.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM38.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ไส้เลื่อน'){
            appAnswerM38.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM38.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM38.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ไส้เลื่อน'){
            appAnswerM38.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM38.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM38.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM38);

        /**
         * ประวัติการแพทย์ >> ริดสีดวงทวาร 
         */
        let appAnswerM39: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM39.questionid = "39";
        appAnswerM39.answeryn = this.appMedicalHistory.controls['disease_17'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ริดสีดวงทวาร'){
            appAnswerM39.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM39.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM39.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ริดสีดวงทวาร'){
            appAnswerM39.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM39.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM39.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ริดสีดวงทวาร'){
            appAnswerM39.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM39.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM39.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM39);

        /**
         * ประวัติการแพทย์ >> ฝีคัณฑศูตร 
         */
        let appAnswerM40: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM40.questionid = "40";
        appAnswerM40.answeryn = this.appMedicalHistory.controls['disease_19'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ฝีคัณฑศูตร'){
            appAnswerM40.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM40.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM40.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ฝีคัณฑศูตร'){
            appAnswerM40.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM40.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM40.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ฝีคัณฑศูตร'){
            appAnswerM40.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM40.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM40.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM40);

        /**
         * ประวัติการแพทย์ >> เยื่อบุโพรงมดลูกเจริญผิดที่
         */
        let appAnswerM41: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM41.questionid = "41";
        appAnswerM41.answeryn = this.appMedicalHistory.controls['disease_23'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'เยื่อบุโพรงมดลูกเจริญผิดที่'){
            appAnswerM41.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM41.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM41.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'เยื่อบุโพรงมดลูกเจริญผิดที่'){
            appAnswerM41.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM41.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM41.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'เยื่อบุโพรงมดลูกเจริญผิดที่'){
            appAnswerM41.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM41.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM41.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM41);

        /**
         * ประวัติการแพทย์ >> หมอนรองกระดูกเคลื่อน
         */
        let appAnswerM42: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM42.questionid = "42";
        appAnswerM42.answeryn = this.appMedicalHistory.controls['disease_11'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'หมอนรองกระดูกเคลื่อน'){
            appAnswerM42.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM42.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM42.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'หมอนรองกระดูกเคลื่อน'){
            appAnswerM42.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM42.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM42.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'หมอนรองกระดูกเคลื่อน'){
            appAnswerM42.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM42.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM42.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM42);

        /**
         * ประวัติการแพทย์ >> ข้อเสื่อม 
         */
        let appAnswerM43: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM43.questionid = "43";
        appAnswerM43.answeryn = this.appMedicalHistory.controls['disease_15'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ข้อเสื่อม'){
            appAnswerM43.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM43.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM43.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ข้อเสื่อม'){
            appAnswerM43.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM43.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM43.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ข้อเสื่อม'){
            appAnswerM43.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM43.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM43.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM43);

        /**
         * ประวัติการแพทย์ >> เส้นเอ็นอักเสบเรื้อรัง 
         */
        let appAnswerM44: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM44.questionid = "44";
        appAnswerM44.answeryn = this.appMedicalHistory.controls['disease_18'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'เส้นเอ็นอักเสบเรื้อรัง'){
            appAnswerM44.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM44.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM44.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'เส้นเอ็นอักเสบเรื้อรัง'){
            appAnswerM44.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM44.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM44.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'เส้นเอ็นอักเสบเรื้อรัง'){
            appAnswerM44.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM44.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM44.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM44);

        /**
         * ประวัติการแพทย์ >> เส้นประสาทอักเสบ 
         */
        let appAnswerM45: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM45.questionid = "45";
        appAnswerM45.answeryn = this.appMedicalHistory.controls['disease_24'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'เส้นประสาทอักเสบ'){
            appAnswerM45.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM45.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM45.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'เส้นประสาทอักเสบ'){
            appAnswerM45.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM45.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM45.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'เส้นประสาทอักเสบ'){
            appAnswerM45.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM45.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM45.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM45);

        /**
         * ประวัติการแพทย์ >> ออทิสติก 
         */
        let appAnswerM46: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM46.questionid = "46";
        appAnswerM46.answeryn = this.appMedicalHistory.controls['disease_8'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'ออทิสติก'){
            appAnswerM46.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM46.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM46.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'ออทิสติก'){
            appAnswerM46.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM46.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM46.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'ออทิสติก'){
            appAnswerM46.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM46.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM46.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM46);

        /**
         * ประวัติการแพทย์ >> สมาธิสั้น 
         */
        let appAnswerM47: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM47.questionid = "47";
        appAnswerM47.answeryn = this.appMedicalHistory.controls['disease_12'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'สมาธิสั้น'){
            appAnswerM47.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM47.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM47.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'สมาธิสั้น'){
            appAnswerM47.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM47.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM47.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'สมาธิสั้น'){
            appAnswerM47.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM47.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM47.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM47);

        /**
         * ประวัติการแพทย์ >> กระดูกสันหลังเคลื่อน
         */
        let appAnswerM51: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM51.questionid = "51";
        appAnswerM51.answeryn = this.appMedicalHistory.controls['disease_7'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'กระดูกสันหลังเคลื่อน'){
            appAnswerM51.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM51.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM51.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'กระดูกสันหลังเคลื่อน'){
            appAnswerM51.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM51.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM51.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'กระดูกสันหลังเคลื่อน'){
            appAnswerM51.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM51.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM51.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM51);

        /**
         * ประวัติการแพทย์ >> หมอนรองกระดูกเคลื่อน หรือทับเส้นประสาท
         */
        let appAnswerM78: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM78.questionid = "78";
        appAnswerM78.answeryn = this.appMedicalHistory.controls['disease_25'].value == true ? 'Y' : '';//Y N 
        if(diseaseNm1 == 'หมอนรองกระดูกเคลื่อน หรือทับเส้นประสาท'){
            appAnswerM78.text1 = this.appMedicalHistory.controls['treatment_result1'].value;
            appAnswerM78.text2 = this.appMedicalHistory.controls['medical_contact1'].value;
            appAnswerM78.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate1'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm2 == 'หมอนรองกระดูกเคลื่อน หรือทับเส้นประสาท'){
            appAnswerM78.text1 = this.appMedicalHistory.controls['treatment_result2'].value;
            appAnswerM78.text2 = this.appMedicalHistory.controls['medical_contact2'].value;
            appAnswerM78.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate2'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        if(diseaseNm3 == 'หมอนรองกระดูกเคลื่อน หรือทับเส้นประสาท'){
            appAnswerM78.text1 = this.appMedicalHistory.controls['treatment_result3'].value;
            appAnswerM78.text2 = this.appMedicalHistory.controls['medical_contact3'].value;
            appAnswerM78.datetime1 = moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .isValid() ? moment(this.appMedicalHistory.controls['treatmentDate3'].value)
                                    .format('YYYY-MM-DD HH:mm:ss') : '';
        }
        applicationAnswerMs.push(appAnswerM78);

        /**
         * รับรอง FATCA >>
         */
        let appAnswerM64: ApplicationAnswerM = new ApplicationAnswerM();
            appAnswerM64.questionid = '64';
            appAnswerM64.answeryn = this.appTreatmentHistory.controls['nationcheck'].value;
            appAnswerM64.answerdesc = this.appTreatmentHistory.controls['nationality'].value;
        let appAnswerM65: ApplicationAnswerM = new ApplicationAnswerM();
            appAnswerM65.questionid = '65';
            appAnswerM65.answeryn = this.appTreatmentHistory.controls['nationalityAddress'].value;
        let appAnswerM66: ApplicationAnswerM = new ApplicationAnswerM();
            appAnswerM66.questionid = '66';
            appAnswerM66.answeryn = this.appTreatmentHistory.controls['nationalityTax'].value;
        let appAnswerM67: ApplicationAnswerM = new ApplicationAnswerM();
            appAnswerM67.questionid = '67';
            appAnswerM67.answeryn = this.appTreatmentHistory.controls['nationalityStatus'].value;
            applicationAnswerMs = [...applicationAnswerMs, appAnswerM64, appAnswerM65, appAnswerM66, appAnswerM67];

       /**
         * คบ >> ขณะนี้ท่านมีสุขภาพทางร่างกายและจิตใจสมบูรณ์ดีหรือไม่
         */
        let appAnswerM71: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM71.questionid = "71";
        appAnswerM71.answeryn = this.appKb.controls['health'].value;//Y N OR Emtry
        appAnswerM71.answerdesc = this.appKb.controls['healthdesc'].value;
        applicationAnswerMs.push(appAnswerM71);

        /**
         * คบ >> ท่านมีร่างกายส่วนหนึ่งส่วนใดพิการหรือไม่
         */
        let appAnswerM72: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM72.questionid = "72";
        appAnswerM72.answeryn = this.appKb.controls['disabled'].value;//Y N OR Emtry
        appAnswerM72.answerdesc = this.appKb.controls['disabledDesc'].value;
        applicationAnswerMs.push(appAnswerM72);

        /**
         * คบ >> เป็นคนปัญญาอ่อนหรือไม่
         */
        let appAnswerM73: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM73.questionid = "73";
        appAnswerM73.answeryn = this.appKb.controls['retarded'].value;//Y N OR Emtry
        appAnswerM73.answerdesc = this.appKb.controls['retardedDesc'].value;
        applicationAnswerMs.push(appAnswerM73);

        /**
         * คบ >> ในระหว่าง 2 ปีที่แล้ว ท่านเคยให้แพทย์ตรวจ หรือเข้าสถานพยาบาลทำการรักษาตัว ตรวจโลหิต ความดันโลหิต ปัสสาวะ เอกซเรย์ ตรวจหัวใจ หรือตรวจอย่างอื่นหรือไม่
         */
        let appAnswerM74: ApplicationAnswerM = new ApplicationAnswerM();
        appAnswerM74.questionid = "74";
        appAnswerM74.answeryn = this.appKb.controls['hospital_last_2years'].value;//Y N
        appAnswerM74.answerdesc = this.appKb.controls['hospital_last_2years_desc'].value;
        applicationAnswerMs.push(appAnswerM74);


        return applicationAnswerMs;
    }

    private getMCAapplications(publish: string = 'D'): MCAapplicationsM {
        
        // ข้อมูลทั่วไป
        let mCAapplicationsM: MCAapplicationsM = new MCAapplicationsM();
        // เลขที่ใบคำขอ
        mCAapplicationsM.applicationid = this.applicationid;
        // เลขที่ลูกค้า
        mCAapplicationsM.customerid = this.quotation.customerid;
        // เลขที่ใบเสนอขาย
        mCAapplicationsM.quotationno = this.quotation.quotationno;
        // สถานะเค้าร่าง
        mCAapplicationsM.publishstatus = publish; 
        mCAapplicationsM.applicationno = this.quotation.referenceno;
        mCAapplicationsM.title = this.appGeneral.controls['title'].value;
        mCAapplicationsM.name = this.appGeneral.controls['name'].value;
        mCAapplicationsM.lastname = this.appGeneral.controls['lastName'].value;
        mCAapplicationsM.telno =  this.appGeneral.controls['telephone'].value;
        mCAapplicationsM.gender = this.appGeneral.controls['gender'].value;
        mCAapplicationsM.age = moment().diff(this.quotation.birthdate,'year').toString();//this.appGeneral.controls['age'].value;
        mCAapplicationsM.birthdate = moment(this.appGeneral.controls['birthDate'].value).isValid() ? moment(this.appGeneral.controls['birthDate'].value).format('YYYY-MM-DD HH:mm:ss') : '';
        mCAapplicationsM.heigh = this.appGeneral.controls['heigh'].value;
        mCAapplicationsM.weigh = this.appGeneral.controls['weigh'].value;
        mCAapplicationsM.race = this.appGeneral.controls['race'].value;
        mCAapplicationsM.religion = this.appGeneral.controls['religion'].value != 'อื่นๆ' ? this.appGeneral.controls['religion'].value : this.appGeneral.controls['religion_desc'].value;
        mCAapplicationsM.nationality = this.appGeneral.controls['nationality'].value;
        mCAapplicationsM.extitle = this.appGeneral.controls['titleChange'].value != 'อื่นๆ' ? this.appGeneral.controls['titleChange'].value : this.appGeneral.controls['titleChangeOther'].value;
        mCAapplicationsM.exname = this.appGeneral.controls['oldFirstName'].value;
        mCAapplicationsM.exlastname = this.appGeneral.controls['oldLastName'].value;
        mCAapplicationsM.identifytype = this.appGeneral.controls['identifyType'].value;
        mCAapplicationsM.identifyid = this.appGeneral.controls['identify_id'].value;
        mCAapplicationsM.identifyexpiredate = moment(this.appGeneral.controls['identifyExpireDate'].value).isValid() ? moment(this.appGeneral.controls['identifyExpireDate'].value).format('YYYY-MM-DD HH:mm:ss') : '';
        mCAapplicationsM.identifynoexpire = this.appGeneral.controls['identifyNoExpire'].value ? 'Y' : 'N';
        mCAapplicationsM.marital = this.appGeneral.controls['martial'].value;
        mCAapplicationsM.spousetitle = this.appGeneral.controls['spouseTitle'].value;
        mCAapplicationsM.spousename = this.appGeneral.controls['spouseName'].value;
        mCAapplicationsM.spouselastname = this.appGeneral.controls['spouseLastname'].value;
        mCAapplicationsM.additiondetail = this.appGeneral.controls['description'].value;
        mCAapplicationsM.contactaddresscd = this.appGeneral.controls['contactaddresscd'].value;
        //ลงชื่อผู้เอาประกัน
        mCAapplicationsM.place = this.appSign.controls['place'].value;
        mCAapplicationsM.witness1title = this.appSign.controls['witness1title'].value;
        mCAapplicationsM.witness1fname = this.appSign.controls['witness1fname'].value;
        mCAapplicationsM.witness1lname = this.appSign.controls['witness1lname'].value;
        mCAapplicationsM.witness2title = this.appSign.controls['witness2title'].value;
        mCAapplicationsM.witness2fname = this.appSign.controls['witness2fname'].value;
        mCAapplicationsM.witness2lname = this.appSign.controls['witness2lname'].value;
        mCAapplicationsM.agentfullname = this.appSign.controls['agentName'].value;
        //ผู้เอาประกันภัย เป็นผู้ปกครองหรือผู้แทนโดยชอบธรรม เพื่อลงนามแทน
        mCAapplicationsM.insuretitle = this.appSign.controls['insuretitle'].value;
        mCAapplicationsM.insurename = this.appSign.controls['insurename'].value;
        mCAapplicationsM.insurelastname = this.appSign.controls['insurelastname'].value;
 
        const insurancerejectionflag = this.appHistory.get('insurancerejectionflag').value;
        const otherinsuranceyn = this.appHistory.get('otherinsuranceyn').value;
        mCAapplicationsM.otherinsuranceyn = otherinsuranceyn;
        mCAapplicationsM.insurerejectionflag = insurancerejectionflag;
        // debugger;
        return mCAapplicationsM;
    }

    private getPaymentMs(): Array<PaymentM> {
    
        let paymentMs: Array<PaymentM> = [];
        let paymentM: PaymentM = new PaymentM();
        // paymentM.paymentname = this.appType.controls['paymentname'].value;
        paymentM.paymenttype = this.appType.controls['paymenttype'].value;
        paymentM.paymentrelation = this.appType.controls['paymentrelation'].value;
        paymentM.amount = this.appType.controls['amount'].value;
        paymentM.paymentslipno = this.appType.controls['paymentslipno'].value; 
        paymentM.paymenttypedesc = this.appType.controls['paymenttypedesc'].value;
        paymentM.taxreduceflag = this.appType.controls['taxreduceflag'].value;
        paymentM.personidtax = this.appType.controls['personidtax'].value;
        paymentM.paymenttitle = this.appType.controls['prename'].value;
        paymentM.paymentname = this.appType.controls['firstname'].value;
        paymentM.paymentlastname = this.appType.controls['lastname'].value;

        paymentMs.push(paymentM);
        return paymentMs;
    }
    
    private getBeneficiaryMs(): Array<BeneficiaryM> {
    
        let beneficiaryMs: Array<BeneficiaryM> = [];
        let arr = <FormArray>this.appBeneficiary.controls['beneficiaryData'];
        for(let i = 0 ; i < arr.length ;i++){
            let beneficiary : FormGroup = <FormGroup>arr.at(i);
            
            let beneficiaryM: BeneficiaryM = new BeneficiaryM();
            beneficiaryM.applicationid = this.applicationid;
            
            beneficiaryM.addressno = beneficiary.controls.addressno.value;
            beneficiaryM.addresstype = beneficiary.controls.addressContact.value;
            beneficiaryM.identifyid = beneficiary.controls.identify_id.value;
            beneficiaryM.buildingname = beneficiary.controls.buildingname.value;
            beneficiaryM.moo = beneficiary.controls.moo.value;
            beneficiaryM.soi = beneficiary.controls.soi.value;
            beneficiaryM.road = beneficiary.controls.road.value;
            beneficiaryM.name = beneficiary.controls.name.value;
            beneficiaryM.title = beneficiary.controls.title.value;
            beneficiaryM.name = beneficiary.controls.name.value;
            beneficiaryM.lastname = beneficiary.controls.lastname.value;
            beneficiaryM.age = beneficiary.controls.age.value; 
            beneficiaryM.relation = beneficiary.controls.relation.value; 
            beneficiaryM.percentage = beneficiary.controls.percentage.value;

            beneficiaryM.subdistrict = this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.tambon_name;
            beneficiaryM.district = this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.amphur_name;
            beneficiaryM.province = this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.province_name;
            beneficiaryM.postcode = this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.zip;
            // beneficiaryM.subdistrict = beneficiary.controls.address.value.addressSelected.tambon_name.value;
            // beneficiaryM.district = beneficiary.controls.address.value.addressSelected.amphur_name.value;
            // beneficiaryM.province = beneficiary.controls.address.value.addressSelected.province_name.value;
            // beneficiaryM.postcode = beneficiary.controls.address.value.addressSelected.zip.value;

            beneficiaryMs.push(beneficiaryM);   
        }
        // for(let i=0;i<this.appBeneficiary.value.beneficiaryData.length;i++){

        //     let beneficiaryM: BeneficiaryM = new BeneficiaryM();
        //     beneficiaryM.applicationid = this.applicationid;
        //     beneficiaryM.addressno = this.appBeneficiary.value.beneficiaryData[i].addressno;
        //     beneficiaryM.addresstype = this.appBeneficiary.value.beneficiaryData[i].addressContact;
        //     beneficiaryM.identifyid = this.appBeneficiary.value.beneficiaryData[i].identify_id;
        //     beneficiaryM.buildingname = this.appBeneficiary.value.beneficiaryData[i].buildingname;
        //     beneficiaryM.moo = this.appBeneficiary.value.beneficiaryData[i].moo;
        //     beneficiaryM.soi = this.appBeneficiary.value.beneficiaryData[i].soi;
        //     beneficiaryM.road = this.appBeneficiary.value.beneficiaryData[i].road;
        //     beneficiaryM.name = this.appBeneficiary.value.beneficiaryData[i].name;
        //     beneficiaryM.title = this.appBeneficiary.value.beneficiaryData[i].title;
        //     beneficiaryM.name = this.appBeneficiary.value.beneficiaryData[i].name;
        //     beneficiaryM.lastname = this.appBeneficiary.value.beneficiaryData[i].lastname;
        //     beneficiaryM.age = this.appBeneficiary.value.beneficiaryData[i].age; 
        //     beneficiaryM.relation = this.appBeneficiary.value.beneficiaryData[i].relation; 
        //     beneficiaryM.percentage = this.appBeneficiary.value.beneficiaryData[i].percentage; 
        //     beneficiaryM.subdistrict = this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.tambon_name;
        //     beneficiaryM.district = this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.amphur_name;
        //     beneficiaryM.province = this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.province_name;
        //     beneficiaryM.postcode = this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.zip;

        // beneficiaryMs.push(beneficiaryM);
        // }
        return beneficiaryMs;
    }

    private getInsurancerejectionsMs(): Array<InsurancerejectionsM> {
    
        let InsurancerejectionsMs: Array<InsurancerejectionsM> = [];

        const insurancerejectionflag = this.appHistory.get('insurancerejectionflag').value;

        if(insurancerejectionflag == 'Y'){

            const items = this.appHistory.get('insuranceRejectionData') as FormArray;

            for(let i=0;i<items.length;i++){

                let insurancerejectionsM: InsurancerejectionsM = new InsurancerejectionsM();

                let data = items.at(i);

                const companyspl = data.get('company').value.split(":");

                insurancerejectionsM.companycode = companyspl[0];
                insurancerejectionsM.company = companyspl[1];
                if(companyspl[0] === '99'){
                    insurancerejectionsM.companydesc = data.get('company_desc').value;
                    insurancerejectionsM.company = data.get('company_desc').value;
                }

                insurancerejectionsM.rejectdate =  moment(data.get('reject_date').value).isValid() ? moment(data.get('reject_date').value).format('YYYY-MM-DD HH:mm:ss') : '';
                insurancerejectionsM.description = data.get('description').value;
                insurancerejectionsM.typeform = data.get('typeform').value;
                insurancerejectionsM.persontype = PersonType.GENERAL;
                
                InsurancerejectionsMs.push(insurancerejectionsM);
            }
        }
        return InsurancerejectionsMs;
    }

    private getOtherinsuranceM(): Array<OtherinsuranceM> {
    
        let otherinsuranceMs: Array<OtherinsuranceM> = [];

        const otherinsuranceyn = this.appHistory.get('otherinsuranceyn').value;

        if(otherinsuranceyn == 'Y'){

            const items = this.appHistory.get('otherInsuranceData') as FormArray;

            for(let i=0;i<items.length;i++){

                let otherinsuranceM: OtherinsuranceM = new OtherinsuranceM();

                let data = items.at(i);

                const companyspl = data.get('company').value.split(":");

                otherinsuranceM.company = companyspl[1];
                otherinsuranceM.companycode = companyspl[0];
                otherinsuranceM.compensationdaily = data.get('compensation_daily').value;
                otherinsuranceM.lifeamount = data.get('life_amount').value;
                otherinsuranceM.accidentamount = data.get('accident_amount').value;
                otherinsuranceM.criticalillnessamount = data.get('critical_illness_amount').value;
                if(companyspl[0] === '99'){
                    otherinsuranceM.companydesc = data.get('company_desc').value;
                    otherinsuranceM.company = data.get('company_desc').value;
                }
                otherinsuranceM.contracteffectiveflag = data.get('contract_effective_flag').value;
                otherinsuranceM.typeform = data.get('typeform').value;
                otherinsuranceM.persontype = PersonType.GENERAL;
 
                otherinsuranceMs.push(otherinsuranceM);
            }
        }


        return otherinsuranceMs;
    }

    private getAddressMs(): Array<AddressM> {
    
        let addressMs: Array<AddressM> = [];
        let addressP: AddressM = new AddressM();
        let addressC: AddressM = new AddressM();
        let addressW: AddressM = new AddressM();
        
        // ที่อยู่ตามทะเบียนบ้าน
        addressP.type = 'P';
        addressP.regid = '';
        addressP.workplace = '';
        addressP.addressno = this.appAddressP.controls['permanentAddressNo'].value;
        addressP.buildingname = this.appAddressP.controls['permanentVillage'].value;
        addressP.moo = this.appAddressP.controls['permanentMoo'].value;
        addressP.soi = this.appAddressP.controls['permanentSoi'].value;
        addressP.road = this.appAddressP.controls['permanentRoad'].value;

        addressP.subdistrict = this.appAddressP.value.permanentAddress.addressSelected.tambon_name;
        addressP.district = this.appAddressP.value.permanentAddress.addressSelected.amphur_name;
        addressP.province = this.appAddressP.value.permanentAddress.addressSelected.province_name;
        addressP.postcode = this.appAddressP.value.permanentAddress.addressSelected.zip;

        addressP.telno = this.appAddressP.controls['permanentTelNo'].value;
        addressP.country = this.appAddressP.controls['permanentCountry'].value;
        addressP.mobileno = this.appAddressP.controls['permanentMobileNo'].value;
        addressP.email = this.appAddressP.controls['permanentAddressEmail'].value;
        addressP.persontype = PersonType.GENERAL;
        addressMs.push(addressP);

        // ที่ปัจจุบัน
        addressC.type = 'C';
        addressC.workplace = '';
        // addressC.regid = '';
        // if(this.appAddressC.controls['contactaddresscd_copy'].value =='P')
        // {
        //     addressC.regid = 'P';
        //     addressC.addressno = this.appAddressP.controls['permanentAddressNo'].value;
        //     addressC.buildingname = this.appAddressP.controls['permanentVillage'].value;
        //     addressC.moo = this.appAddressP.controls['permanentMoo'].value;
        //     addressC.soi = this.appAddressP.controls['permanentSoi'].value;
        //     addressC.road = this.appAddressP.controls['permanentRoad'].value;

        //     addressC.subdistrict = this.appAddressP.value.permanentAddress.addressSelected.tambon_name;
        //     addressC.district = this.appAddressP.value.permanentAddress.addressSelected.amphur_name;
        //     addressC.province = this.appAddressP.value.permanentAddress.addressSelected.province_name;
        //     addressC.postcode = this.appAddressP.value.permanentAddress.addressSelected.zip;

        //     addressC.telno = this.appAddressP.controls['permanentTelNo'].value;
        //     addressC.country = this.appAddressP.controls['permanentCountry'].value;
        //     addressC.mobileno = this.appAddressP.controls['permanentMobileNo'].value;
        //     addressC.email = this.appAddressP.controls['permanentAddressEmail'].value;
        // }
        // else{
        //     addressC.regid = 'O';
            addressC.addressno = this.appAddressC.controls['currentAddressNo'].value;
            addressC.buildingname = this.appAddressC.controls['currentVillage'].value;
            addressC.moo = this.appAddressC.controls['currentMoo'].value;
            addressC.soi = this.appAddressC.controls['currentSoi'].value;
            addressC.road = this.appAddressC.controls['currentRoad'].value;

            addressC.subdistrict = this.appAddressC.value.currentAddress.addressSelected.tambon_name;
            addressC.district = this.appAddressC.value.currentAddress.addressSelected.amphur_name;
            addressC.province = this.appAddressC.value.currentAddress.addressSelected.province_name;
            addressC.postcode = this.appAddressC.value.currentAddress.addressSelected.zip;

            addressC.telno = this.appAddressC.controls['currentTelNo'].value;
            addressC.country = this.appAddressC.controls['currentCountry'].value;
            addressC.mobileno = this.appAddressC.controls['currentMobileNo'].value;
            addressC.email = this.appAddressC.controls['currentEmail'].value;
            
        // }
        
        if(this.appAddressC.controls['contactaddresscd_copy'].value =='P'){
            addressC.regid = this.appAddressC.controls['contactaddresscd_copy'].value;
        }
        else{
            addressC.regid = 'O';
        }
        addressC.persontype = PersonType.GENERAL;
        addressMs.push(addressC);

         // ที่ทำงาน
        
         addressW.type = 'W';
        //  addressW.regid = '';
         addressW.workplace = this.appAddressW.controls['workplace'].value;
        //  if(this.appAddressW.controls['contactaddresscd_copy'].value =='P')
        //  {
        //     addressW.regid = 'P';
        //     addressW.addressno = this.appAddressP.controls['permanentAddressNo'].value;
        //     addressW.buildingname = this.appAddressP.controls['permanentVillage'].value;
        //     addressW.moo = this.appAddressP.controls['permanentMoo'].value;
        //     addressW.soi = this.appAddressP.controls['permanentSoi'].value;
        //     addressW.road = this.appAddressP.controls['permanentRoad'].value;
        //     addressW.subdistrict = this.appAddressP.value.permanentAddress.addressSelected.tambon_name;
        //     addressW.district = this.appAddressP.value.permanentAddress.addressSelected.amphur_name;
        //     addressW.province = this.appAddressP.value.permanentAddress.addressSelected.province_name;
        //     addressW.postcode = this.appAddressP.value.permanentAddress.addressSelected.zip;
    
        //     addressW.telno = this.appAddressP.controls['permanentTelNo'].value;
        //     addressW.country = this.appAddressP.controls['permanentCountry'].value;
        //     addressW.mobileno = this.appAddressP.controls['permanentMobileNo'].value;
        //     addressW.email = this.appAddressP.controls['permanentAddressEmail'].value;
        //  }
        //  else if(this.appAddressW.controls['contactaddresscd_copy'].value =='C'){
        //     addressW.regid = 'C';
        //     addressW.addressno = this.appAddressC.controls['currentAddressNo'].value;
        //     addressW.buildingname = this.appAddressC.controls['currentVillage'].value;
        //     addressW.moo = this.appAddressC.controls['currentMoo'].value;
        //     addressW.soi = this.appAddressC.controls['currentSoi'].value;
        //     addressW.road = this.appAddressC.controls['currentRoad'].value;
    
        //     addressW.subdistrict = this.appAddressC.value.currentAddress.addressSelected.tambon_name;
        //     addressW.district = this.appAddressC.value.currentAddress.addressSelected.amphur_name;
        //     addressW.province = this.appAddressC.value.currentAddress.addressSelected.province_name;
        //     addressW.postcode = this.appAddressC.value.currentAddress.addressSelected.zip;
    
        //     addressW.telno = this.appAddressC.controls['currentTelNo'].value;
        //     addressW.country = this.appAddressC.controls['currentCountry'].value;
        //     addressW.mobileno = this.appAddressC.controls['currentMobileNo'].value;
        //     addressW.email = this.appAddressC.controls['currentEmail'].value;
        //  }
        //  else{
            // addressW.regid = 'O';
            addressW.addressno = this.appAddressW.controls['companyAddressNo'].value;
            addressW.buildingname = this.appAddressW.controls['companyVillage'].value;
            addressW.moo = this.appAddressW.controls['companyMoo'].value;
            addressW.soi = this.appAddressW.controls['companySoi'].value;
            addressW.road = this.appAddressW.controls['companyRoad'].value;
    
            addressW.subdistrict = this.appAddressW.value.companyAddress.addressSelected.tambon_name;
            addressW.district = this.appAddressW.value.companyAddress.addressSelected.amphur_name;
            addressW.province = this.appAddressW.value.companyAddress.addressSelected.province_name;
            addressW.postcode = this.appAddressW.value.companyAddress.addressSelected.zip;
    
            addressW.telno = this.appAddressW.controls['companyTelNo'].value;
            addressW.country = this.appAddressW.controls['companyCountry'].value;
            addressW.mobileno = this.appAddressW.controls['companyMobileNo'].value;
            addressW.email = this.appAddressW.controls['companyEmail'].value;
        //  }
       
        if(this.appAddressW.controls['contactaddresscd_copy'].value =='P' || this.appAddressW.controls['contactaddresscd_copy'].value =='C'){
            addressW.regid = this.appAddressW.controls['contactaddresscd_copy'].value;
        }
        else{
            addressW.regid = 'O';
        }
        addressW.persontype = PersonType.GENERAL;
        addressMs.push(addressW);

        //console.log('addressP : '+JSON.stringify(addressP));
        //console.log('addressC : '+JSON.stringify(addressC));
        //console.log('addressW : '+JSON.stringify(addressW));
        return addressMs;
    }

    public getKB() : KbM{
        /**
         * ดึงข้อมูลหน้าคบ. เพื่อทำการ mapping ก่อนส่งไปบันทึก
         */
        let kb: KbM = new KbM(); 
        kb.title = this.appKb.value.title;
        kb.name = this.appKb.value.name;
        kb.lastname = this.appKb.value.lname;
        kb.gender = this.appKb.value.gender;
        kb.birthdate = moment(this.appKb.value.birthDate).isValid() ? moment(this.appKb.value.birthDate).format('YYYY-MM-DD HH:mm:ss') : '';
        kb.identifyid = this.appKb.value.identifyid;
        kb.identifytype = (this.appKb.value.identifyOption == '01') ? this.appKb.value.identifyOption:this.appKb.value.identify_type;
        kb.identifyexpiredate = moment(this.appKb.value.insertDate).isValid() ? moment(this.appKb.value.insertDate).format('YYYY-MM-DD HH:mm:ss') : '';
        kb.occupationcd = (this.appKb.value.occupationcd != '') ? this.appKb.value.occupationcd : this.appKb.value.description;
        kb.insurerejectionflag = this.appKb.value.insurerejectionflag;
        kb.rejectreason = this.appKb.value.rejectreason;
        kb.marital = this.appKb.value.status;
        kb.position = this.appKb.value.position;
        kb.place = this.appKb.value.place;
        kb.workplace = this.appKb.value.work_place;
        kb.witness1fname = this.appKb.value.witness1_fname;
        kb.witness2fname = this.appKb.value.witness2_fname;
        kb.otherinsuranceyn = this.appKb.value.other_insurance_yn;
        kb.spousetitle = this.appKb.value.spousetitle;
        kb.spousename = this.appKb.value.spousename;
        kb.spouselastname = this.appKb.value.spouselastname;
        kb.spouseoccupationcd = this.appKb.value.spouseoccupationcd;
        kb.spouseoccupationdesc = this.appKb.value.spouseoccupationdesc;
        kb.contactaddresscd = this.appKb.value.caddress;
        kb.identifyissuedistrict = this.appKb.value.identify_issue_district;
        kb.identifyissueprovince = this.appKb.value.identifyissueprovince;
        kb.parentname = this.appKb.value.parent_name;
        kb.parentrelation = this.appKb.value.parentrelation;
        kb.submitdate =moment(this.appKb.value.submitdate).isValid() ? moment(this.appKb.value.submitdate).format('YYYY-MM-DD HH:mm:ss') : '';

        let otherinsuranceMs: Array<OtherinsuranceM> = [];
        if (this.appKb.value.other_insurance_yn == 'Y') {
            for (let item of this.appKb.value.otherinsuranceRows) {
                
                let otherinsuranceM = new OtherinsuranceM();
                otherinsuranceM.persontype = 'KB';
                otherinsuranceM.company = item.company;
                otherinsuranceM.insuredtype = item.insuranceplan;
                otherinsuranceM.contracteffectiveflag = item.contractflag;
                otherinsuranceM.startdate = moment(item.issueDate).isValid() ? moment(item.issueDate).format('YYYY-MM-DD HH:mm:ss') : '';
                otherinsuranceM.suminsured = item.totalinsurance;
                otherinsuranceM.persontype = PersonType.KB;
                otherinsuranceM.regid = item.insuranceno;
    
                otherinsuranceMs.push(otherinsuranceM);
            }

            kb.otherinsuranceMs = otherinsuranceMs;
        }

        //ข้อมูลประกันภัย
        let insurancerejectionsMs: Array<InsurancerejectionsM> = [];
        let insurancerejectionsM = new InsurancerejectionsM();

        if (this.appKb.value.insurerejectionflag == 'Y') {
            insurancerejectionsM.company  = this.appKb.value.company;
            insurancerejectionsM.companydesc  = this.appKb.value.companydesc;
            insurancerejectionsM.rejectdate = moment(this.appKb.value.rejectdate).isValid() ? moment(this.appKb.value.rejectdate).format('YYYY-MM-DD HH:mm:ss') : '';
            insurancerejectionsM.persontype = PersonType.KB;

            insurancerejectionsMs.push(insurancerejectionsM);

            kb.insurancerejectionsMs = insurancerejectionsMs;
        }

        //ข้อมูลอาชีพ
        let occupationsMs: Array<OccupationsM> = [];
        let occupationsM = new OccupationsM();
        occupationsM.occupationcd = this.appKb.value.occupationcd;
        occupationsM.description = this.appKb.value.description;
        occupationsM.position = this.appKb.value.position;
        occupationsM.businessdesc = this.appKb.value.businessdesc;
        occupationsM.persontype = PersonType.KB;
        occupationsM.type = "P";
        occupationsMs.push(occupationsM);

        kb.occupationsMs = occupationsMs;

        let kbAddressMs: Array<AddressM> = [];
        let addressP: AddressM = new AddressM();
        let addressChooser: AddressM = new AddressM(); 

        //ที่อยู่ตามทะเบียนบ้าน
        addressP.type = 'P';
        addressP.addressno = this.appKb.controls['address_no'].value;
        addressP.buildingname = this.appKb.controls['building'].value;
        addressP.moo = this.appKb.controls['moo'].value;
        addressP.soi = this.appKb.controls['soi'].value;
        addressP.road = this.appKb.controls['road'].value;
        addressP.subdistrict = this.appKb.value.address.addressSelected.tambon_name;
        addressP.district = this.appKb.value.address.addressSelected.amphur_name;
        addressP.province = this.appKb.value.address.addressSelected.province_name;
        addressP.postcode = this.appKb.value.address.addressSelected.zip;
        addressP.persontype = PersonType.KB;

        kbAddressMs.push(addressP);

        //ตามเงื่อนไขที่ลูกค้าเลือก P = ตามทะเบียนบ้าน, C = ที่อยู่ปัจจุบัน, W = สถานที่ทำงาน

        switch (this.appKb.value.caddress) {
            case 'C':
            addressChooser.type = 'C';
            addressChooser.addressno = this.appKb.controls['address_no2'].value;
            addressChooser.buildingname = this.appKb.controls['building2'].value;
            addressChooser.moo = this.appKb.controls['moo2'].value;
            addressChooser.soi = this.appKb.controls['soi2'].value;
            addressChooser.road = this.appKb.controls['road2'].value;
    
            addressChooser.subdistrict = this.appKb.value.contactAddresscd.addressSelected.tambon_name;
            addressChooser.district = this.appKb.value.contactAddresscd.addressSelected.amphur_name;
            addressChooser.province = this.appKb.value.contactAddresscd.addressSelected.province_name;
            addressChooser.postcode = this.appKb.value.contactAddresscd.addressSelected.zip;
            addressChooser.persontype = PersonType.KB;
            addressChooser.telno = this.appKb.controls['tel_no'].value;
            kbAddressMs.push(addressChooser);

            break;
            case 'W':
            addressChooser.type = 'W';
            addressChooser.addressno = this.appKb.controls['address_no2'].value;
            addressChooser.buildingname = this.appKb.controls['building2'].value;
            addressChooser.moo = this.appKb.controls['moo2'].value;
            addressChooser.soi = this.appKb.controls['soi2'].value;
            addressChooser.road = this.appKb.controls['road2'].value;
    
            addressChooser.subdistrict = this.appKb.value.contactAddresscd.addressSelected.tambon_name;
            addressChooser.district = this.appKb.value.contactAddresscd.addressSelected.amphur_name;
            addressChooser.province = this.appKb.value.contactAddresscd.addressSelected.province_name;
            addressChooser.postcode = this.appKb.value.contactAddresscd.addressSelected.zip;
            addressChooser.persontype = PersonType.KB;
            addressChooser.telno = this.appKb.controls['tel_no'].value;
            kbAddressMs.push(addressChooser);

            break;
            case 'P':
            addressChooser.type = 'P';
            addressChooser.addressno = this.appKb.controls['address_no2'].value;
            addressChooser.buildingname = this.appKb.controls['building2'].value;
            addressChooser.moo = this.appKb.controls['moo2'].value;
            addressChooser.soi = this.appKb.controls['soi2'].value;
            addressChooser.road = this.appKb.controls['road2'].value;
            addressChooser.subdistrict = this.appKb.value.contactAddresscd.addressSelected.tambon_name;
            addressChooser.district = this.appKb.value.contactAddresscd.addressSelected.amphur_name;
            addressChooser.province = this.appKb.value.contactAddresscd.addressSelected.province_name;
            addressChooser.postcode = this.appKb.value.contactAddresscd.addressSelected.zip;
            addressChooser.persontype = PersonType.KB;
            addressChooser.telno = this.appKb.controls['tel_no'].value;
            
            kbAddressMs.push(addressChooser);

            break;
        }
        
        kb.addressMs = kbAddressMs;

        return kb;
    }

    public getOccupation(): Array<OccupationsM> {
        
        // อาชีพ
        let occupationsMs: Array<OccupationsM> = [];
        
        let occupationsM1: OccupationsM = new OccupationsM();
            occupationsM1.applicationid = this.applicationid;
            occupationsM1.seq = '1';
            occupationsM1.occupationcd = this.appGeneral.controls['occupation'].value;
            occupationsM1.occupationdesc = this.appGeneral.controls['occupation_desc'].value;
            occupationsM1.position = this.appGeneral.controls['position'].value;
            occupationsM1.yearsalary = this.appGeneral.controls['year_salary'].value;
            occupationsM1.businessdesc = this.appGeneral.controls['business_type'].value;
            occupationsM1.description = this.appGeneral.controls['business_desc'].value;
            occupationsM1.persontype = PersonType.GENERAL;
            occupationsM1.type = "P";
            occupationsMs.push(occupationsM1);

            let occupationsM2: OccupationsM = new OccupationsM();
            occupationsM2.applicationid = this.applicationid;
            occupationsM2.seq = '2';
            occupationsM2.occupationcd = this.appGeneral.controls['otherOccupation'].value;
            occupationsM2.occupationdesc = this.appGeneral.controls['otherOccupationDesc'].value;
            occupationsM2.position = this.appGeneral.controls['otherBusinessPosition'].value;
            occupationsM2.yearsalary = this.appGeneral.controls['otherBusinessYearSalary'].value;
            occupationsM2.businessdesc = this.appGeneral.controls['otherBusinessType'].value;
            occupationsM2.description = this.appGeneral.controls['otherBusinessDesc'].value;
            occupationsM2.persontype = PersonType.GENERAL;
            occupationsM2.type = "O";
            occupationsMs.push(occupationsM2);

        return occupationsMs;
    }

    public getApplicationId(): string {
        return this.applicationid;
    }

    public getApplicationno(): string {
        return this.applicationno;
    }
    public getUnitlinkunderagechildMs(): Array<UnderAgeChildModel>
    {
        let underAgeChildsMs: Array<UnderAgeChildModel> = [];
        const childrens = this.appGeneral.controls['childrenData'].value;
        _.each(childrens, (value, key) => {
            let childAgeM: UnderAgeChildModel = new UnderAgeChildModel();
            childAgeM = {
                ...childAgeM,
                seq: key+1,
                title: value.childTitle,
                fname: value.childfName,
                lname: value.childlName,
                identifyid: value.childIdentify,
                age: value.childAge
            };
            underAgeChildsMs.push(childAgeM)
        })
        return underAgeChildsMs;
    }

    public setPreUWStatusM(obj: PreUWStatusM) {
        this.preUWStatusM = obj;
    }

    public getPreUWStatusM(): PreUWStatusM {
        return this.preUWStatusM;
    }

    public getUnitlinkApplicationDetailMs(): UlinkApplicationDetailM {
        let ulinkAppDetail: UlinkApplicationDetailM = _.get(this.applicationMasterM, 'unitlinkapplicationdetailMs[0]', new UlinkApplicationDetailM());
        ulinkAppDetail = {
            ...ulinkAppDetail,
            spouseidentifyid: this.appGeneral.controls['spouseIdentifyid'].value
        };

        return ulinkAppDetail;
    }

    /**
     * เชคว่าเป็นใบคำขอของ ยูลิงค์
     */
    public isUlink(): boolean
    {
        const typeapp = _.get(this.quotation, 'typeapp', '');
        const checkType = 'ULink';
        if (typeapp === '')
            return false;
    
        return typeapp === checkType;
    }
}