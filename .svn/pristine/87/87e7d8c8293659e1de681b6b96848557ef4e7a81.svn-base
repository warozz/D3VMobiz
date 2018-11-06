import { ApplicationMasterM } from '../../providers/application/application-master-model';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MCAapplicationsM } from '../../providers/service-table/mcaapplications-model';
import { RequestModel } from '../../providers/model/request-model';
import { FunctionName } from '../../providers/constants/function-name';
import { ServiceName } from '../../providers/constants/service-name';
import { AddressM } from '../../providers/service-table/address-model';
import { ApplicationAnswerM } from '../../providers/service-table/applicationanswer-model';
import { AttachFileM } from '../../providers/service-table/attachfile-model';
import { BeneficiaryM } from '../../providers/service-table/beneficiary-model';
import { InsurancerejectionsM } from '../../providers/service-table/insurancerejections-model';
import { MCAOccupationM } from '../../providers/service-table/mcaoccupations-model';
import { OccupationsM } from '../../providers/service-table/occupations-model';
import { OtherinsuranceM } from '../../providers/service-table/otherinsurance-model';
import { PaymentM } from '../../providers/service-table/payment-model';
import { SaledetailM } from '../../providers/service-table/saledetail-model';

/**
 * Generated class for the ExamplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-example',
  templateUrl: 'example.html',
})
export class ExamplePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamplePage');
  }

  /**
   * Example for SELECT.
   */

  public exampleSELECT() {

    let applicationMasterMs: Array<ApplicationMasterM> = [];
    let applicationMasterM: ApplicationMasterM = new ApplicationMasterM();

    let mCAapplicationsM: MCAapplicationsM = new MCAapplicationsM();
    mCAapplicationsM.customerid = "00000001";
    mCAapplicationsM.applicationno = "00000002"; //Get from quotation referenceno

    applicationMasterM.mcaapplicationM = mCAapplicationsM;

    applicationMasterMs.push(applicationMasterM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.APPLICATIONMASTER;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = applicationMasterMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        console.log(JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );

  }

  /** 
    * Example for INSERT.
    * Attribute variable.
    * กรณีทำการบันทุก applicationid ไม่ต้องส่งไปในทุกๆ Class เพราะ applicationid หาให้อัตโนมัต
    * Date format "2200-12-31 00:00:00"
    */
  addressMs: Array<AddressM>;

  applicationAnswerMs: Array<ApplicationAnswerM>;

  attachfileMs: Array<AttachFileM>;

  beneficiaryMs: Array<BeneficiaryM>;

  insurancerejectionsMs: Array<InsurancerejectionsM>;

  mcaoccupationsMs: Array<MCAOccupationM>;

  occupationsMs: Array<OccupationsM>;

  otherinsuranceMs: Array<OtherinsuranceM>;

  paymentMs: Array<PaymentM>;

  public exampleINSERT() {

    let applicationMasterMs: Array<ApplicationMasterM> = [];
    let applicationMasterM: ApplicationMasterM = new ApplicationMasterM();



    /**
     * สร้างข้อมูลตัวแทนฝ่ายขาย
     */
    let saledetailM = new SaledetailM();
    saledetailM.bfname = "xxxx";


    let mCAapplicationsM: MCAapplicationsM = new MCAapplicationsM();
    mCAapplicationsM.additiondetail = "xxx";


    /**
     * สร้างข้อมูลที่อยู่ทุกแท็บมาเก็บใน Array >> AddressM
     */
    let addressTypeA: AddressM = new AddressM();
    addressTypeA.addressno = "xxx";
    this.addressMs.push(addressTypeA);

    let addressTypeB: AddressM = new AddressM();
    addressTypeB.addressno = "xxx";
    this.addressMs.push(addressTypeB);

    let addressTypeC: AddressM = new AddressM();
    addressTypeC.addressno = "xxx";
    this.addressMs.push(addressTypeC);

    /**
     * สร้างข้อมูล คำถาม คำตอบ ทุกแท็บมาเก็บใน Array >> ApplicationAnswerM
     */
    let appAnswerM1: ApplicationAnswerM = new ApplicationAnswerM();
    appAnswerM1.answeryn = "";//Y N
    this.applicationAnswerMs.push(appAnswerM1);

    let appAnswerM2: ApplicationAnswerM = new ApplicationAnswerM();
    appAnswerM2.answeryn = "";//Y N
    this.applicationAnswerMs.push(appAnswerM2);

    // Answer ประวัติการรับประกัน > ท่านเคยทำประกันชีวิต*
    mCAapplicationsM.otherinsuranceyn = ""; //YN
    if ("Y" == mCAapplicationsM.otherinsuranceyn) {
      let otherinsuranceM: OtherinsuranceM = new OtherinsuranceM();
      otherinsuranceM.regid = ""; //Require = N
      otherinsuranceM.company = ""; //Require = Y

      this.otherinsuranceMs.push(otherinsuranceM);
    }

    // Answer ประวัติการรับประกัน > ท่านเคยถูกปฏิเสธ*
    mCAapplicationsM.insurerejectionflag = ""; //YN
    if ("Y" == mCAapplicationsM.insurerejectionflag) {
      let insurancerejectionsM: InsurancerejectionsM = new InsurancerejectionsM();
      insurancerejectionsM.regid = ""; //Require = N
      insurancerejectionsM.company = ""; //Require = Y

      this.insurancerejectionsMs.push(insurancerejectionsM);
    }

    /**
     * Payment การชำระเงิน
     */

    let paymentM1: PaymentM = new PaymentM();
    paymentM1.paymentname = "";
    this.paymentMs.push(paymentM1);

    let paymentM2: PaymentM = new PaymentM();
    paymentM2.paymentname = "";
    this.paymentMs.push(paymentM2);

    /**
     * 
     */



    /**
     * รวมข้อมูลทั้งหมด
     */
    applicationMasterM.mcaapplicationM = mCAapplicationsM;
    applicationMasterM.addressMs = this.addressMs;
    applicationMasterM.applicationAnswerMs = this.applicationAnswerMs;
    applicationMasterM.otherinsuranceMs = this.otherinsuranceMs;
    applicationMasterM.insurancerejectionsMs = this.insurancerejectionsMs;
    applicationMasterM.paymentMs = this.paymentMs;

    applicationMasterMs.push(applicationMasterM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.APPLICATIONMASTER;
    reqM.serviceName = ServiceName.INSERT;
    reqM.param = applicationMasterMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        console.log(JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );

  }


}
