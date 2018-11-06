import { ApplicationData } from './../application/application-data';
import { UlinkApplicationFormM } from './ulink-application-form-model';
import {Storage} from '@ionic/storage';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { ApiProvider } from '../api/api';
import { ToastController } from 'ionic-angular';
import { UlinkMasterM } from './ulink-master-model';
import { RequestModel } from '../model/request-model';
import { FunctionName } from '../constants/function-name';
import { ServiceName } from '../constants/service-name';
import { ExampleBenefitModel } from '../ulink-benefit/example-benefit-model/example-benefit';
import { UnitlinkDataProvider } from './unitlink-data';
import { ExampleChildModel } from '../ulink-benefit/example-benefit-model/example-child';
import {ListExamplepay} from '../ulink-benefit/example-benefit-model/list-example-pay';
import { ListExamplewithdraw } from '../ulink-benefit/example-benefit-model/list-example-withdraw';
import { ProspectModel } from '../prospect/prospect-model';
import { ProspectUlinkExpreieneModel } from '../service-table/prospect-ulink-expreiene-medel';
import { ProspectProvider } from '../prospect/prospect';
import { ListExampleProfit } from '../ulink-benefit/example-benefit-model/list-excample-profit';
import { ListExampleSumRpp } from '../ulink-benefit/example-benefit-model/list-example-sumrpp';
import { ListExampleRider } from '../ulink-benefit/example-benefit-model/list-excample-rider';
import { UnitlinkBenefit } from '../ulink-benefit/unitlink-benefit';
import _ from "lodash";

@Injectable()
export class UlinkAppDataProvider {

    public  examBenefit:ExampleBenefitModel;

    /**
     * ข้อมูลบุตรในอุปการะ
     */
    public ulinkChild: FormGroup;

    /**
     * การชำระเบี้ยประกันภัย
     */
    public ulinkPayment: FormGroup;

    /**
     * จำนวนเงินเอาประกันภัย RPP
     */
    public ulinkSum: FormGroup;

    /**
     * อัตราผลตอบแทน
     */
    public ulinkReturn: FormGroup;

    /**
     * ถอน
     */
    public ulinkWithdraw: FormGroup;

    /**
     * สัญญาเพิ่มเติม
     */
    public ulinkRider: FormGroup;

    /**
     * สรุปตัวอย่างผลประโยชน์
     */
    public ulinkBenefit: Array<UlinkBenefitModel>;

    /**
     * แบบประกันที่เลือก
     */
    public choosePlan: number = 1;
    public planCode: string = ''; // UA01 or UA02

    /**
     * ประเภทผลประโยชน์ที่เลือก
     */
    public chooseType: string = 'educate';

    /**
     * prospect
     */
    public prospect : ProspectModel = new ProspectModel();

    /**
     * prospect Experience
     */
    public prospextExperience: ProspectUlinkExpreieneModel;


    private agentid: string;
    public ageend: string;
    public riders: any;

    public av: string = '0';//ประมาณการมูลค่ารับซื้อคืนหน่วยลงทุน ณ วันที่เริ่มถอน (บาท)
    private benefitReqUA01 = {
        plancode : '', //UA01
        insureAge : 0, //อายุผู้เอาประกัน
        insureAgeEnd : 0, //อายุผู้เอาประกัน ที่สิ้นสุดความคุ้มครอง
        sex : '', //M, F 
        mode : '', //prem 1:Y 0=M 2=H 4=S
        tax : 0, //ภาษีอะไรสักอย่าง น่าจะเป็น rate ภาษี
        quotationSum : 0, //ทุนประกัน
        quotationPremium : 0, //เบี้ยประกันหลัก
        topupPremium : 0, //การชำระเบี้ยเพิ่มพิเศษ (Top-Up Premium)
        inflationrate : 0, // อัตราเงินเฟ้อ tab ถอน
        arrtop : [], //array ของ 'Top-Up'
        arrwd : [], //เก็บข้อมูลของ 'การถอน'
        arrpro : [], //array ของ 'ผลตอบแทน'
    };
    
    private benefitReqUA02 = {
        plancode : '', //UA02
        sex : '', //M, F  
        mode : 0, //รูปแบบการจ่าย Ex รายปี, รายเดือน, ...
        insureAge : 0,//อายุผู้เอาประกัน
        lastAgePay : 0,//อายุสุดท้ายที่จ่ายเบี้ย
        insureAgeEnd : 0,//อายุผู้เอาประกัน ที่สิ้นสุดความคุ้มครอง
        tax : 0,//
        totalRiderPremium : 0,//เบี้ย rider รวม
        arrrpp : [], //จำนวนเงินเอาประกันภัย (RPP)
        arrpay : [], //คาดว่าจะชำระเบี้ยประกันภัย
        arrwd : [], //เป็น object เก็บข้อมูลของ 'การถอน'
        arrpro : [], //เป็น object เก็บข้อมูลของ array ของ 'ผลตอบแทน'
        testEm : 0, //ป็น "0", "25", "50", "75"
        testEp : 0, //ไม่มี ใส่ 0
        testEpYear : 0,//ไม่มี ใส่ 0
        inflationrate : 0, // อัตราเงินเฟ้อ tab ถอน
    };

    /**
     * provider premium
     */
    public premiumPerYear: number = 0;
    public minAmountRpp: number = 0;
    public maxAmountRpp: number = 0;
    public quotationSum: number = 0;

    /**
     * เอกสารประกอบใบคำขอ
     */
    public ulinkApplicationFormList: Array<UlinkApplicationFormM>

    constructor(
        private apiProvider: ApiProvider,
        private storage: Storage,
        private unitlinkData: UnitlinkDataProvider,
        private prospectProvider: ProspectProvider,
        private dummyData: UnitlinkBenefit,
        private appData: ApplicationData ) {}


    /************************************************************************************************************ */

    /**
     * ทุนการศึกษาให้กับบุตรหลาน TL 99/1
    */
    public ulinkChildInfo:FormGroup;
    public ulinkChildPremium:FormGroup;
    public ulinkChildPremium_array:FormGroup;
    public ulinkChildProfit:FormGroup;
    public ulinkChildProfit_array:FormGroup;
    public ulinkChildWithdraw:FormGroup;

    /**
   * ทุนการศึกษาให้กับบุตรหลาน 99/99
   */
    public ulinkChildInfo2:FormGroup;
    public ulinkChildProfit2:FormGroup;
    public ulinkChildWithdraw2:FormGroup;
    public childFundPayPremium:FormGroup;
    public childRppPremiumValue:FormGroup;

    /**
     * 99/1 เพื่อชีวิตหลังเกษียณอายุ
     */
    public tlRetire : FormGroup;
    public tlRetireProfit : FormGroup;
    public tlRetireWithdraw : FormGroup;


    /**
     *  99/1 ออกแบบยูนิตลิงค์ด้วยตัวเอง
     */
    public customUlinkPayInsurance : FormGroup;


    /**
      *  99/99 สร้างหลักประกันที่ปรับเปลี่ยนตามช่วงชีวิต
    */
    private lifeChanging: FormGroup;
    private lifeChangingRpp: FormGroup;
    private lifeChangingProfit: FormGroup;

  /**
     * อ่านข้อมูลทั้งหมดจาก service
     * @param customerId
     * @param applicationNo
     */
    public selectApplication(): Promise<UlinkMasterM> {
      return new Promise((resolve, reject) => {
          let ulinkMasterMs: Array<UlinkMasterM> = [];
          let ulinkMasterM: UlinkMasterM = new UlinkMasterM();



          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.APPLICATIONMASTER;
          reqM.serviceName = ServiceName.SELECT;
          reqM.param = ulinkMasterMs;

          this.apiProvider.callData(reqM).then(
              res => {
                  if (res['size'] > 0) {

                      resolve();
                  }
                  else {

                      reject();
                  }
              },
              err => {
                  console.log(err);
                  reject();
              }
          );
      });
  }

   /**
     * บันทึกข้อมูลด้วย service
     */
    public async saveExampleBenefit(){
        return new Promise(async (resolve, reject) => {

            let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            let dateNowNo = moment(new Date()).format("YYYYMMDDHHmmss");

            await this.storage.get('loginProfile').then(profile =>{
              this.agentid = profile.agentid;
            });

            let isInsertProspect : boolean = this.prospect.customerID == undefined
            let prospectsave : boolean = false;
            if(isInsertProspect)
            {

                await this.prospectProvider.insertProspect(this.agentid , dateNow , dateNowNo, this.prospect, false).then(
                (res) => {prospectsave = res}
                );
            } else {

                await this.prospectProvider.updateProspect(this.agentid , dateNow , dateNowNo, this.prospect, false).then(
                (res) => {prospectsave = res}
                );
            }


            this.unitlinkData.saveProspectUlinkExpreiene

            if(prospectsave){

                let prospectExp: boolean = false;

                await this.unitlinkData.saveProspectUlinkExpreiene(this.agentid, this.prospect.customerID).then(
                    (res) => {prospectExp = res}
                );

                if(prospectExp){
                    this.setExampleBenefitForSave();

                    let objMs: Array<ExampleBenefitModel> = [];
                    objMs.push(this.examBenefit);

                    let reqM: RequestModel = new RequestModel();
                    reqM.functionName = FunctionName.EXAMPLE_BENEFIT;
                    reqM.serviceName = this.examBenefit.benefitid == ''? ServiceName.INSERT : ServiceName.UPDATE;
                    reqM.param = objMs;
                    console.log(reqM);

                    await this.apiProvider.callData(reqM).then(
                        (res) => {
                        console.log("response ---> ",res);
                        if(res['data'].length > 0){
                            this.examBenefit.benefitid = res['data'][0]['benefitid'];
                        }
                            resolve();
                        },
                        (err) => {

                            console.log(err);
                            reject(err);
                        }
                    );
                }
            }


        });
    }

    public resetData() {
        this.examBenefit = undefined;
        this.ageend = '';
        this.av = '0';
    }

    public setExampleBenefit(exampleBenefit){
        this.examBenefit = exampleBenefit;
    }

    public getExampleBenefit(){
        return this.examBenefit;
    }

    private setExampleBenefitForSave(){

        let benefitId = "";

        // for update
        if(typeof this.examBenefit != 'undefined'){
            if(this.examBenefit.benefitid != ''){
                benefitId = this.examBenefit.benefitid;
            }
        }
        this.examBenefit = new ExampleBenefitModel();
        this.examBenefit.benefitid = benefitId;
        this.examBenefit.customerid = this.prospect.customerID;
        this.examBenefit.agentid = this.agentid;
        this.examBenefit.issuedate = ""
        this.examBenefit.plancode =  this.planCode;
        this.examBenefit.benefitname =  this.chooseType;
        this.examBenefit.taxrate = this.ulinkPayment.controls.taxrate.value;
        this.examBenefit.emrate = this.ulinkPayment.controls.emrate.value;
        this.examBenefit.status = "A";
        this.examBenefit.lastupdate = "";
        this.examBenefit.agestart = this.prospect.age;

        if(this.chooseType == 'educate'){
            // หา Period อายุผู้ปกครอง จากอายุเด็ก
            let ageChildStart:number =  this.ulinkChild.controls['agestart'].value != null? Number(this.ulinkChild.controls['agestart'].value) : 0;
            let ageChildEnd:number =  this.ulinkChild.controls['ageend'].value != null ? Number(this.ulinkChild.controls['ageend'].value): 0;
            let periodAge: number = ageChildEnd - ageChildStart;
            let ageEndProepect:number =  Number(this.examBenefit.agestart) + periodAge;
            this.examBenefit.ageend =  String(ageEndProepect);
        }else{
            this.examBenefit.ageend = String(this.ulinkPayment.controls.mAgeend.value);
        }

        this.examBenefit.examplechild = this.getExampleChild();
        this.examBenefit.listExampleprofit = this.getListExampleprofit();
        this.examBenefit.listExamplesumrpp = this.getListExampleSumRpp();
        this.examBenefit.listExamplewithdraw =  this.getlistExamplewithdraw();
        this.examBenefit.listExamplepay = this.getListExamplepay();
        this.examBenefit.listExamplerider = this.getListExamplerider();
    }

    /**
     * ข้อมูลบุตรในอุปการะ
     */
    private getExampleChild() :ExampleChildModel {

        let exampleChild : ExampleChildModel;
        if(typeof this.ulinkChild != 'undefined'){
            if(this.chooseType == 'educate'){
                exampleChild = new ExampleChildModel()
                exampleChild.benefitid = this.examBenefit.benefitid;
                exampleChild.pname = this.ulinkChild.controls['pname'].value;
                exampleChild.fname = this.ulinkChild.controls['fname'].value;
                exampleChild.lname = this.ulinkChild.controls['lname'].value;
                exampleChild.agestart = this.ulinkChild.controls['agestart'].value != null ? String(this.ulinkChild.controls['agestart'].value) : null;
                exampleChild.ageend = this.ulinkChild.controls['ageend'].value != null ? String(this.ulinkChild.controls['ageend'].value): null;
                exampleChild.sex = this.ulinkChild.controls['sex'].value;
            }
    
        }
       
        return exampleChild;
    }

    /**
     * ข้อมูล อัตราผลตอบแทน
    */
    private getListExampleprofit() :Array<ListExampleProfit>{
      let listExampleProfit: Array<ListExampleProfit> = [];
      if(typeof this.ulinkReturn != 'undefined'){
        const { ulinkReturnArray } = this.ulinkReturn.getRawValue();

        for (let index in ulinkReturnArray) {
            let exampleProfit:ListExampleProfit = new ListExampleProfit();
            exampleProfit.benefitid = this.examBenefit.benefitid;
            exampleProfit.seq = String(Number(index)+1);
            exampleProfit.agestart = String(ulinkReturnArray[index].agestart || '' );
            exampleProfit.agechild = String(ulinkReturnArray[index].agechild || '');
            exampleProfit.ratebenefit = String(ulinkReturnArray[index].ratebenefit || '');
            listExampleProfit.push(exampleProfit);
        }
      }
      

      return  listExampleProfit;
    }

    /**
     * จำนวณเงินเอาประกันภัย RPP
     */
    private getListExampleSumRpp() :Array<ListExampleSumRpp>{

        let listExampleSumRpp: Array<ListExampleSumRpp> = [];
        if(typeof this.ulinkSum != 'undefined'){
            let ulinkSumArray = this.ulinkSum.controls.ulinkSumArray.value;
            let i;
            for(i in ulinkSumArray){
                let exampleSumRpp:ListExampleSumRpp = new ListExampleSumRpp();
                exampleSumRpp.benefitid = this.examBenefit.benefitid;
                exampleSumRpp.seq = String(Number(i)+1);
                exampleSumRpp.agestart = i == 0 ? this.prospect.age : ulinkSumArray[i].agestart;
                exampleSumRpp.minsumrpp = String(this.minAmountRpp);
                exampleSumRpp.maxsumrpp = String(this.maxAmountRpp);
                exampleSumRpp.realsumrpp = ulinkSumArray[i].realsumrpp;
                listExampleSumRpp.push(exampleSumRpp);
            }
        }
        
        return  listExampleSumRpp;
    }

    /**
     * ผลตอบเเทน
     */
    private getlistExamplewithdraw():Array<ListExamplewithdraw>{

        let listExamplewithdraw: Array<ListExamplewithdraw> = [];

        if(typeof this.ulinkWithdraw != 'undefined'){
            const ulinkWithdrawData = this.ulinkWithdraw.getRawValue();
            console.log('ulinkWithdraw--->', ulinkWithdrawData);
            let av = ulinkWithdrawData['av'];
            let inflationrate = ulinkWithdrawData['inflationrate'];
            let ulinkWithdrawArray = ulinkWithdrawData['ulinkWithdrawArray'];
            for (let index in ulinkWithdrawArray) {
    
                let data = ulinkWithdrawArray[index];
                let examplewithdraw:ListExamplewithdraw = new ListExamplewithdraw();
    
                examplewithdraw.benefitid = this.examBenefit.benefitid;
                examplewithdraw.agestart = String(data['agestart']==null? '': data['agestart']);
                examplewithdraw.agestop = String(data['agestop']==null? '' : data['agestop']);
                examplewithdraw.formatwithdraw = String(data['formatwithdraw']);
                examplewithdraw.inflationrate = String(inflationrate);
                examplewithdraw.seq = String(index + 1);
                examplewithdraw.sumwithdraw = String(data['sumwithdraw']==null? '' : data['sumwithdraw']);
                examplewithdraw.withdrawper = String(data['withdrawper']);
    
                listExamplewithdraw.push(examplewithdraw);
            }
        }
       
        return listExamplewithdraw;

    }

    /**
     * การชำระเบี้ย
     */
    private getListExamplepay() :Array<ListExamplepay>{

        let listExamplepay: Array<ListExamplepay> = [];
        let ulinkPaymentArray = this.ulinkPayment.controls.ulinkPaymentArray.value;
        let examplepay:ListExamplepay = new ListExamplepay();
        examplepay.premiumsp = this.ulinkPayment.controls.premiumsp.value != null ? this.ulinkPayment.controls.premiumsp.value : 0;
        examplepay.premiumtop = this.ulinkPayment.controls.premiumtop.value != null ? this.ulinkPayment.controls.premiumtop.value : 0;
        examplepay.mode = this.ulinkPayment.controls.mode.value != null ? this.ulinkPayment.controls.mode.value : '';
        examplepay.premiumrpp = this.ulinkPayment.controls.premiumrpp.value != null ? this.ulinkPayment.controls.premiumrpp.value : 0;
        examplepay.premiumrsp = this.ulinkPayment.controls.premiumrsp.value != null ? this.ulinkPayment.controls.premiumrsp.value : 0;
        examplepay.amountpayyear = this.ulinkPayment.controls.amountpayyear.value;
        examplepay.endpayyear = this.ulinkPayment.controls.endpayyear.value;
        examplepay.benefitid = this.examBenefit.benefitid;
        examplepay.seq = '1';
        listExamplepay.push(examplepay);

        for(let i in ulinkPaymentArray){
            examplepay = new ListExamplepay();
            examplepay.benefitid = this.examBenefit.benefitid;
            examplepay.seq = String(Number(i)+2);
            examplepay.formatpay = ulinkPaymentArray[i].formatpay != null ? ulinkPaymentArray[i].formatpay : 0;
            examplepay.agestart = ulinkPaymentArray[i].agestart;
            examplepay.ageend = ulinkPaymentArray[i].ageend;
            examplepay.premiumtop = ulinkPaymentArray[i].premiumtop;
            listExamplepay.push(examplepay);
        }

        return  listExamplepay;
    }

    private getListExamplerider() :Array<ListExampleRider>{

        let listExamplerider: Array<ListExampleRider> = [];
        let x = 0;
        for (let key in this.riders) {
            if(key != 'occupation'){
              let sum = Number(this.riders[key].sum);
              if(sum > 0){
                let  examplerider:ListExampleRider = new ListExampleRider();

                examplerider.benefitid = this.examBenefit.benefitid;
                examplerider.seq = String(x+1);
                examplerider.ridertype = String(key);
                examplerider.ridersum = String(this.riders[key].sum);
                examplerider.riderpremium = String(this.riders[key].premium);
                listExamplerider.push(examplerider);
                x++;
              }
            }
        }
        return  listExamplerider;
    }

    public dataTableUA01(): String[][]{

        this.benefitReqUA01.plancode = this.planCode;
        this.benefitReqUA01.insureAge = Number(this.prospect.age);
        this.benefitReqUA01.insureAgeEnd = Number(this.examBenefit.ageend);
        this.benefitReqUA01.sex = this.prospect.gender;
        this.benefitReqUA01.mode = '9';
        this.benefitReqUA01.tax = Number(this.examBenefit.taxrate);
        this.benefitReqUA01.quotationSum = Math.round(Number(this.ulinkPayment.get('premiumsp').value)*1.1)
        this.benefitReqUA01.quotationPremium = Number(this.ulinkPayment.get('premiumsp').value);
        this.benefitReqUA01.topupPremium = this.ulinkPayment.get('premiumtop').value == null? 0 : this.ulinkPayment.get('premiumtop').value;
        this.benefitReqUA01.arrtop = this.topUpUA01();
        this.benefitReqUA01.arrwd = this.withDraw();
        this.benefitReqUA01.arrpro = this.profit();
        this.benefitReqUA01.inflationrate = Number(this.ulinkWithdraw.get('inflationrate').value);
        
        return this.manageDataTable();
          
      }
    
      public dataTableUA02(): String[][]{
    
        this.benefitReqUA02.plancode = this.planCode;
        this.benefitReqUA02.sex = this.prospect.gender;
        this.benefitReqUA02.mode = this.ulinkPayment.get('mode').value;
        this.benefitReqUA02.insureAge = Number(this.prospect.age);
        this.benefitReqUA02.lastAgePay = this.ulinkPayment.get('endpayyear').value;
        this.benefitReqUA02.insureAgeEnd = Number(this.examBenefit.ageend);
        this.benefitReqUA02.tax = Number(this.examBenefit.taxrate);
        this.benefitReqUA02.totalRiderPremium = 0;
        this.benefitReqUA02.arrrpp = this.rpp();
        this.benefitReqUA02.arrpay = this.arrPayment();
        this.benefitReqUA02.arrwd = this.withDraw();
        this.benefitReqUA02.arrpro = this.profit();
        this.benefitReqUA02.testEm = this.ulinkPayment.controls.emrate.value;
        this.benefitReqUA02.testEp = 0;
        this.benefitReqUA02.testEpYear = 0;
        this.benefitReqUA02.inflationrate = Number(typeof this.ulinkWithdraw != 'undefined'? this.ulinkWithdraw.get('inflationrate').value : '0');
    
        return this.manageDataTable();
          
      }


    public calAvUA01(testSeek: number) {

        this.benefitReqUA01.plancode = this.planCode;
        this.benefitReqUA01.insureAge = Number(this.prospect.age);
        this.benefitReqUA01.insureAgeEnd = Number(this.examBenefit.ageend);
        this.benefitReqUA01.sex = this.prospect.gender;
        this.benefitReqUA01.mode = '9';
        this.benefitReqUA01.tax = Number(this.examBenefit.taxrate);
        this.benefitReqUA01.quotationSum = this.quotationSum;
        this.benefitReqUA01.quotationPremium = Number(this.ulinkPayment.get('premiumsp').value);
        this.benefitReqUA01.topupPremium = this.ulinkPayment.get('premiumtop').value == null? 0 : this.ulinkPayment.get('premiumtop').value;
        this.benefitReqUA01.arrtop = this.topUpUA01();
        this.benefitReqUA01.arrwd = this.withDraw();
        this.benefitReqUA01.arrpro = this.profit();
        this.benefitReqUA01.inflationrate = Number(this.ulinkWithdraw.get('inflationrate').value);
        
        this.calculateAv(testSeek);
    }

    public calAvUA02(testSeek: number) {
        this.benefitReqUA02.plancode = this.planCode;
        this.benefitReqUA02.sex = this.prospect.gender;
        this.benefitReqUA02.mode = this.ulinkPayment.get('mode').value;
        this.benefitReqUA02.insureAge = Number(this.prospect.age);
        this.benefitReqUA02.lastAgePay = this.ulinkPayment.get('endpayyear').value;
        this.benefitReqUA02.insureAgeEnd = Number(this.examBenefit.ageend);
        this.benefitReqUA02.tax = Number(this.examBenefit.taxrate);
        this.benefitReqUA02.totalRiderPremium = 0;
        this.benefitReqUA02.arrrpp = this.rpp();
        this.benefitReqUA02.arrpay = this.arrPayment();
        this.benefitReqUA02.arrwd = this.withDraw();
        this.benefitReqUA02.arrpro = this.profit();
        this.benefitReqUA02.testEm = this.ulinkPayment.controls.emrate.value;
        this.benefitReqUA02.testEp = 0;
        this.benefitReqUA02.testEpYear = 0;
        this.benefitReqUA02.inflationrate = Number(typeof this.ulinkWithdraw != 'undefined'? this.ulinkWithdraw.get('inflationrate').value : '0');
    
        this.calculateAv(testSeek);
    }


    private rpp() : object[] {
        let arrRpp = [];

        if(typeof this.ulinkSum !='undefined'){
            let ulinkSum = this.ulinkSum.getRawValue();

            let ulinkSumArray = ulinkSum.ulinkSumArray;

            for(let i=0; i<ulinkSumArray.length; i++){

            let agestart = ulinkSumArray[i].agestart;
            let realsumrpp = ulinkSumArray[i].realsumrpp;
            arrRpp[i] = [
                String(i),
                String(agestart),
                String(realsumrpp),
            ];

            // gb_exam_arrrpp[key] = [
            //   idx,
            //   chkHave("ageRPP"+idx).value,
            //   clearFormat(chkHave("exam_RPPSum"+idx).value),
            //   clearFormat(chkHave("minSumRPP"+idx).value),
            //   clearFormat(chkHave("maxSumRPP"+idx).value),
            //   chkHave("ageChildRPP"+idx).value
            // ];
        
            }
        }

        return arrRpp;

    }

    private arrPayment() : object[] {
        let arrpay = [];

        let ulinkPayment = this.ulinkPayment.getRawValue();

        let agestart = ulinkPayment.agestart;
        let premiumrpp = ulinkPayment.premiumrpp;
        let premiumrsp = ulinkPayment.premiumrsp;
        let premiumtop = ulinkPayment.premiumtop;
        let sumpremium = ulinkPayment.sumpremium;

        arrpay[0] = [
            String(0),
            String(this.prospect.age),
            String(premiumrpp != null? premiumrpp : 0),
            String(premiumrsp != null? premiumrsp : 0),
            String(premiumtop != null? premiumtop : 0),
            String(this.dummyData.clearFormat(sumpremium))
        ]

        // gb_exam_arrpay[key] = [
        //   idx,
        //   chkHave("ageStrPay"+idx).value,
        //   clearFormat(chkHave("exam_RPPPrem"+idx).value),
        //   clearFormat(chkHave("exam_RSPPrem"+idx).value),
        //   clearFormat(chkHave("topPay"+idx).value),
        //   clearFormat(chkHave("allPay"+idx).value)
        // ];	

        return arrpay;

    }

    private profit(){
        let arrpro = [];

        if(typeof this.ulinkReturn != 'undefined'){
            let ulinkReturn = this.ulinkReturn.getRawValue();

            let ulinkReturnArray = ulinkReturn.ulinkReturnArray;

        // ["0", "30", "1", "18"], ["1", "31", "2", "19"]
            for(let i=0; i<ulinkReturnArray.length; i++){

            let agestart = ulinkReturnArray[i].agestart;
            let ratebenefit = ulinkReturnArray[i].ratebenefit;
            let agechild = ulinkReturnArray[i].agechild;
            
            arrpro[i] = [
                String(i),
                String(agestart), // อายุที่เริ่มผลตอบแทน
                String(ratebenefit),//// ผลตอบแทนที่คาดหวัง
                String(agechild != null? agechild : 0 ),// อายุบุตร
            
            ];

            }
        }

        return arrpro;
    }

    private topUpUA01() : object[] {

        let arrtop = [];

        if(typeof this.ulinkPayment != 'undefined'){
            let ulinkPayment = this.ulinkPayment.getRawValue();

            let ulinkPaymentArray = ulinkPayment.ulinkPaymentArray;

            if(ulinkPaymentArray.length > 0 && ulinkPaymentArray[0].agestart != null){
            for(let i=0; i<ulinkPaymentArray.length; i++){

                let formatpay = ulinkPaymentArray[i].formatpay;
                let agestart = ulinkPaymentArray[i].agestart;
                let ageend = ulinkPaymentArray[i].ageend;
                let premiumtop = ulinkPaymentArray[i].premiumtop;
        
                //["0", "M", "31", "33", "10000"]
                arrtop[i] = [
                String(i),
                String(formatpay), //รูปแบบการชำระ
                String(agestart),//อายุ เพิ่ม Top-up (ปี)
                String(ageend),//ถึงอายุ (ปี)
                String(premiumtop)//Top-up (บาท)
                ];
        
            }
            }
        }
        
        return arrtop;
    }

    private withDraw() : object[] {

        //ประเภทการถอน  ระบบเก่า O = ครั้งเดียว , M = ประจำ   |   ระบบใหม่  2 = ครั้งเดียว , 1 = ประจำ
        let arrwd = [];
        if(typeof this.ulinkWithdraw !='undefined'){
            let ulinkWithraw = this.ulinkWithdraw.getRawValue();
            if(this.chooseType == 'educate' || this.chooseType == 'retire'){
        
            let sumwithdraw = String(ulinkWithraw.ulinkWithdrawArray[0].sumwithdraw);//exam_bachelor_wd
            let agestart = String(ulinkWithraw.ulinkWithdrawArray[0].agestart);//exam_bachelor_agestr_wd
            let agestop = String(ulinkWithraw.ulinkWithdrawArray[0].agestop);//exam_bachelor_agestp_wd
            let policyyearstart = String(ulinkWithraw.ulinkWithdrawArray[0].policyyearstart);//exam_bachelor_polstr_wd
            let childagestart = String(ulinkWithraw.ulinkWithdrawArray[0].childagestart);//exam_bachelor_agechildstr_wd
            let policyyearend = String(ulinkWithraw.ulinkWithdrawArray[0].policyyearend);//exam_bachelor_polstp_wd
            let childageend = String(ulinkWithraw.ulinkWithdrawArray[0].childageend);//exam_bachelor_agechildstp_wd
                if(this.chooseType == 'educate'){
        
                arrwd[0] = ["0",
                    "1",
                    sumwithdraw,
                    agestart,
                    agestop,
                    "1",
                    policyyearstart,
                    childagestart,
                    policyyearend,
                    childageend
                ];
        
            }else if(this.chooseType == 'retire'){
        
                arrwd[0] = ["0",
                    "2",
                    sumwithdraw,
                    agestart,
                    agestop,
                    "1",
                    policyyearstart,
                    childagestart,
                    policyyearend,
                    childageend
                ];
        
            }
        
        
            sumwithdraw = String(ulinkWithraw.ulinkWithdrawArray[1].sumwithdraw);//exam_master_wd
            agestart = String(ulinkWithraw.ulinkWithdrawArray[1].agestart);//exam_master_agestr_wd
            agestop = String(ulinkWithraw.ulinkWithdrawArray[1].agestop);//exam_master_agestp_wd
            policyyearstart = String(ulinkWithraw.ulinkWithdrawArray[1].policyyearstart);//exam_master_polstr_wd
            childagestart = String(ulinkWithraw.ulinkWithdrawArray[1].childagestart);//exam_master_agechildstr_wd
            policyyearend = String(ulinkWithraw.ulinkWithdrawArray[1].policyyearend);//exam_master_polstp_wd
            childageend = String(ulinkWithraw.ulinkWithdrawArray[1].childageend);//exam_master_agechildstp_wd
            
            arrwd[1] = ["1",
                    "1",
                    sumwithdraw,
                    agestart,
                    agestop,
                    "1",
                    policyyearstart,
                    childagestart,
                    policyyearend,
                    childageend
                ];
                
            }else if(this.chooseType == 'self') {
        
            //gb_exam_arrwd[key] = [idx,type,sum,agestr,agestp,seg,polstr,childstr,polstp,childstp];
        
            let ulinkWithdrawArray = ulinkWithraw.ulinkWithdrawArray;
            for(let i=0; i<ulinkWithdrawArray.length; i++){
        
                let data = ulinkWithdrawArray[i];
        
                let sumwithdraw = String(data.sumwithdraw);
                let agestart = String(data.agestart);
                let agestop = String(data.agestop);
                let formatwithdraw = String(data.formatwithdraw);
                let withdrawper = String(data.withdrawper);
        
                arrwd[i] = [String(i),
                    formatwithdraw,
                    sumwithdraw,
                    agestart,
                    agestop,
                    withdrawper,
                    "",
                    "",
                    "",
                    ""
                ];
            }
            }
        }
        
        console.log('arrwd --->', arrwd);
        return arrwd;
    }


    private manageDataTable(): String[][]{

        let dataTable: any;

        if(this.planCode == 'UA01'){

            let plancode = this.benefitReqUA01.plancode;
            let insureAge = this.benefitReqUA01.insureAge;
            let insureAgeEnd = this.benefitReqUA01.insureAgeEnd;
            let sex = this.benefitReqUA01.sex;
            let mode = this.benefitReqUA01.mode
            let tax = this.benefitReqUA01.tax;
            let quotationSum = this.benefitReqUA01.quotationSum;
            let quotationPremium = this.benefitReqUA01.quotationPremium;
            let topupPremium = this.benefitReqUA01.topupPremium;
            let arrtop = this.benefitReqUA01.arrtop;
            let arrwd = this.benefitReqUA01.arrwd;
            let arrpro = this.benefitReqUA01.arrpro;
            let inflationrate = this.benefitReqUA01.inflationrate;


            dataTable = this.dummyData.getBenefitTableUA01(
            plancode , 
            insureAge ,
            insureAgeEnd ,
            sex , 
            mode ,
            tax ,
            quotationSum ,
            quotationPremium ,
            topupPremium ,
            arrtop ,
            arrwd ,
            arrpro ,
            inflationrate
            );


            console.log('dataTable ---->', dataTable);
            

        }else if(this.planCode == 'UA02'){

            let plancode = this.benefitReqUA02.plancode;
            let sex = this.benefitReqUA02.sex;
            let mode = this.benefitReqUA02.mode
            let insureAge = this.benefitReqUA02.insureAge;
            let lastAgePay = this.benefitReqUA02.lastAgePay;
            let insureAgeEnd = this.benefitReqUA02.insureAgeEnd;
            let tax = this.benefitReqUA02.tax;
            let totalRiderPremium = this.benefitReqUA02.totalRiderPremium;
            let arrrpp = this.benefitReqUA02.arrrpp;
            let arrpay = this.benefitReqUA02.arrpay;
            let arrwd = this.benefitReqUA02.arrwd;
            let arrpro = this.benefitReqUA02.arrpro;

            let testEm = this.benefitReqUA02.testEm;
            let testEp = this.benefitReqUA02.testEp;
            let testEpYear = this.benefitReqUA02.testEpYear;
            
            let inflationrate = this.benefitReqUA02.inflationrate;

            let tlplan: any = {
            planCode: 'UA02',
            planName: 'ทีแอล ไลฟ์ โซลูชั่น 99/99 [UA02]',
            pPayYear: '99',
            pEndowmentYear: '99',
            payType: 0,
            endowmentType: '0',
            calType: '2'
            }

            let calRiderModel = {
            id : '',
            premium : 0,
            rider : this.riders,
            mode : mode,
            occupationType : this.prospect.occupationType,
            insuredage : null,
            calType : tlplan['calType'],
            typex : this.prospect.gender,
            planSelected : tlplan
            }


            dataTable = this.dummyData.getBenefitTableUA02(
            plancode, 
            sex, 
            mode,
            insureAge,
            lastAgePay,
            insureAgeEnd,
            tax,
            totalRiderPremium,
            arrrpp,
            arrpay,
            arrwd,
            arrpro,
            testEm,
            testEp,
            testEpYear,
            inflationrate,
            calRiderModel
            );


            console.log('dataTable ---->', dataTable);
            
        }
        
        return dataTable;

    }

    private calculateAv(testSeek: number){

        

        if(this.planCode == 'UA01'){

            let plancode = this.benefitReqUA01.plancode;
            let insureAge = this.benefitReqUA01.insureAge;
            let insureAgeEnd = this.benefitReqUA01.insureAgeEnd;
            let sex = this.benefitReqUA01.sex;
            let mode = this.benefitReqUA01.mode
            let tax = this.benefitReqUA01.tax;
            let quotationSum = this.benefitReqUA01.quotationSum;
            let quotationPremium = this.benefitReqUA01.quotationPremium;
            let topupPremium = this.benefitReqUA01.topupPremium;
            let arrtop = this.benefitReqUA01.arrtop;
            let arrwd = this.benefitReqUA01.arrwd;
            let arrpro = this.benefitReqUA01.arrpro;
            let inflationrate = this.benefitReqUA01.inflationrate;


            this.av = this.dummyData.getAvUA01(
            plancode , 
            insureAge ,
            insureAgeEnd ,
            sex , 
            mode ,
            tax ,
            quotationSum ,
            quotationPremium ,
            topupPremium ,
            arrtop ,
            arrwd ,
            arrpro ,
            inflationrate,
            testSeek
            );


            console.log('Av UA01 ---->', this.av);
            

        }else if(this.planCode == 'UA02'){

            let plancode = this.benefitReqUA02.plancode;
            let sex = this.benefitReqUA02.sex;
            let mode = this.benefitReqUA02.mode
            let insureAge = this.benefitReqUA02.insureAge;
            let lastAgePay = this.benefitReqUA02.lastAgePay;
            let insureAgeEnd = this.benefitReqUA02.insureAgeEnd;
            let tax = this.benefitReqUA02.tax;
            let totalRiderPremium = this.benefitReqUA02.totalRiderPremium;
            let arrrpp = this.benefitReqUA02.arrrpp;
            let arrpay = this.benefitReqUA02.arrpay;
            let arrwd = this.benefitReqUA02.arrwd;
            let arrpro = this.benefitReqUA02.arrpro;

            let testEm = this.benefitReqUA02.testEm;
            let testEp = this.benefitReqUA02.testEp;
            let testEpYear = this.benefitReqUA02.testEpYear;
            
            let inflationrate = this.benefitReqUA02.inflationrate;

            let tlplan: any = {
            planCode: 'UA02',
            planName: 'ทีแอล ไลฟ์ โซลูชั่น 99/99 [UA02]',
            pPayYear: '99',
            pEndowmentYear: '99',
            payType: 0,
            endowmentType: '0',
            calType: '2'
            }

            let calRiderModel = {
            id : '',
            premium : 0,
            rider : this.riders,
            mode : mode,
            occupationType : this.prospect.occupationType,
            insuredage : null,
            calType : tlplan['calType'],
            typex : this.prospect.gender,
            planSelected : tlplan
            }


            this.av = this.dummyData.getAvUA02(
            plancode, 
            sex, 
            mode,
            insureAge,
            lastAgePay,
            insureAgeEnd,
            tax,
            totalRiderPremium,
            arrrpp,
            arrpay,
            arrwd,
            arrpro,
            testEm,
            testEp,
            testEpYear,
            inflationrate,
            calRiderModel,
            testSeek
            );


             console.log('Av UA02 ---->', this.av);
            //this.dataTableRowUA02(dataTable);
        }

    }

    private setUlinkApplicationForm(data)
    {
        // เซตเอกสารใบคำขอ
        this.ulinkApplicationFormList =  data;  
    }
    
    /**
     * ค้นหาสถานะเอกสารใบคำขอ 6ใบ
     */
    public getUlinkApplicationForm()
    {
        return new Promise((resolve, reject) => {
      
          let model: UlinkApplicationFormM = new UlinkApplicationFormM();
          model = {
            ...model,
            applicationid: this.appData.getApplicationId()
          };
          
          let modelObj: Array<UlinkApplicationFormM> = [];
          modelObj.push(model);
      
          let request: RequestModel = new RequestModel();
          request = {
            ...request,
            functionName: FunctionName.ULINKAPPLICATIONFORM,
            serviceName: ServiceName.SELECT,
            param: modelObj
          };
          
          this.apiProvider.callData(request).then(
            (res) => {
                const data = _.get(res, 'data', []);
                this.setUlinkApplicationForm(data);
                resolve(data);
            },
            (err) => {
                reject(err);
            }
          );
      
        });
    }

    /**
     * อัพเดทสถานะเอกสารใบคำขอ 6ใบ
     * @formType string riskprofile | allocation | riskaccept | unitlinkholder
     * @status string N | P | S
     */
    public patchUlinkApplicationForm(formType='', status='N')
    {
        return new Promise((resolve, reject) => {
            if (formType == '')
                reject();
    
            let model: UlinkApplicationFormM = new UlinkApplicationFormM();
            model = {
              ...model,
              applicationid: this.appData.getApplicationId(),
              formtype: formType,
              status: status
            };
        
            let modelObj: Array<UlinkApplicationFormM> = [];
            modelObj.push(model);
        
            let request: RequestModel = new RequestModel();
            request = {
              ...request,
              functionName: FunctionName.ULINKAPPLICATIONFORM,
              serviceName: ServiceName.UPDATE,
              param: modelObj
            };
    
            this.apiProvider.callData(request).then(
                (res) => {
                  resolve(res);
                },
                (err) => {
                  reject(err);
                }
            );
        });
    }
    
    /**
     * อัพเดทสถานะเอกสารใบคำขอ 6ใบ
     * @model UlinkApplicationFormM
     */
    public putUlinkApplicationForm(model: UlinkApplicationFormM = undefined)
    {
        return new Promise((resolve, reject) => {
          if (model == undefined)
              reject();
      
          let modelObj: Array<UlinkApplicationFormM> = [];
          modelObj.push(model);
      
          let request: RequestModel = new RequestModel();
          request = {
            ...request,
            functionName: FunctionName.ULINKAPPLICATIONFORM,
            serviceName: ServiceName.UPDATE,
            param: modelObj
          };
      
          this.apiProvider.callData(request).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
          );
        });
    }

}

/**
 * ตารางผลประโยชน์
 */
export class UlinkBenefitModel {

    /**
     * อายุ
     */
    public age: number | boolean = null;
    /**
     * ปี กธ.
     */
    public policyYear: number | boolean = null;
    /**
     * จำนวนเงินเอาประกันภัย
     */
    public sum: number | boolean = null;

    /**
     * เบี้ยประกันภัยหลักเพื่อความคุ้มครอง
     */
    public sumProtect: number | boolean = null;
    /**
     * เบี้ยประกันภัยหลักเพื่อการออม
     */
    public sumSaving: number | boolean = null;
    /**
     * รวม
     */
    public sumTotal: number | boolean = null;

    /**
     * เบี้ยประกันภัยชำระครั้งเดียว
     */
    public premiumSP: number | boolean = null;
    /**
     * เบี้ยประกันภัยหลักเพื่อความคุ้มครอง
     */
    public premiumProtect: number | boolean = null;
    /**
     * เบี้ยประกันภัยหลักเพื่อการออม
     */
    public premiumSaving: number | boolean = null;
    /**
     * เบี้ยประกันภัยเพิ่มพิเศษ
     */
    public premiumTopupPlus: number | boolean = null;
    /**
     * สัญญาเพิ่มเติม
     */
    public premiumRider: number | boolean = null;
    /**
     * รวม
     */
    public premiumTotal: number | boolean = null;
    /**
     * รวมสะสม
     */
    public premiumCumulative: number | boolean = null;

    /**
     * ค่าใช้จ่ายในการดำเนินการประกันภัย
     */
    public expenseOperations: number | boolean = null;
    /**
     * ค่าธรรมเนียมการบริหารกรมธรรม์
     */
    public expenseManagement: number | boolean = null;
    /**
     * ค่าการประกันภัย
     */
    public expenseInsurance: number | boolean = null;
    /**
     * รวม
     */
    public expenseTotal: number | boolean = null;

    /**
     * โบนัสเบี้ยประกันภัยชำระครั้งเดียว
     */
    public bonusSP: number | boolean = null;

    /**
     * โบนัสเบี้ยประกันภัยหลักเพื่อความคุ้มครอง
     */
    public bonusProtect: number | boolean = null;

    /**
     * คาดหวังผลตอบแทน (%)
     */
    public expectReturn: number | boolean = null;

    /**
     * จำนวนเงินที่ถอน
     */
    public withdrawAmount: number | boolean = null;
    /**
     * ค่าธรรมเนียมการถอน
     */
    public withdrawFee: number | boolean = null;
    /**
     * จำนวนเงินที่รับจริง
     */
    public withdrawActual: number | boolean = null;
    /**
     * จำนวนเงินที่ถอนสะสม
     */
    public withdrawCumulative: number | boolean = null;

    /**
     * เบี้ยประกันภัยชำระครั้งเดียว
     */
    public valueSP: number | boolean = null;
    /**
     * เบี้ยประกันภัยหลักเพื่อความคุ้มครอง
     */
    public valueProtect: number | boolean = null;
    /**
     * เบี้ยประกันภัยหลักเพื่อการออม
     */
    public valueSaving: number | boolean = null;
    /**
     * เบี้ยประกันภัยเพิ่มพิเศษ
     */
    public valueTopupPlus: number | boolean = null;
    /**
     * รวม
     */
    public valueTotal: number | boolean = null;

    /**
     * ผลประโยชน์กรณีเสียชีวิต ณ สิ้นปีกรมธรรม์
     */
    public deathBenefit: number | boolean = null;

    /**
     * ค่าใช้จ่ายที่นำไปหักลดหย่อนภาษีได้
     */
    public taxAllowance: number | boolean = null;
    /**
     * ฐานภาษี
     */
    public taxBase: number | boolean = null;
    /**
     * เงินคืนภาษีที่คาดว่าจะได้รับ
     */
    public taxRefund: number | boolean = null;
}
