import { CalculateAgeUtil } from './../../../providers/utility/calculate-age-util';
import { QuatationPdfPage } from './../../../pages/quatation/quatation-pdf/quatation-pdf';
import { CommonUtilProvider } from './../../../providers/common-util/common-util';
import { GenerateQuotationM } from './../../../providers/generate-quotation/generate-quotation-model';
import {PopupLostConnectionComponent} from '../popup-lost-connection/popup-lost-connection';
import { Component, EventEmitter, Output } from '@angular/core';
import { ViewController, NavParams, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { QuotationModel } from '../../../providers/quotation/quotation-model';
import { ValidateProvider } from '../../../providers/validate/validate';
import { RequestModel } from '../../../providers/model/request-model';
import { FunctionName } from '../../../providers/constants/function-name';
import { ServiceName } from '../../../providers/constants/service-name';
import { ApiProvider } from '../../../providers/api/api';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { Storage } from '@ionic/storage';
import { DateFormatProvider } from '../../../providers/date-format/date-format';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { CurrencyFormatProvider } from '../../../providers/currency-format/currency-format';
import * as moment from 'moment';
import { Network } from '@ionic-native/network';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ExampleBenefitModel } from './../../../providers/ulink-benefit/example-benefit-model/example-benefit';
import _ from "lodash"
import { PopupExampleBenefitComponent } from "./../../utility/popup-example-benefit";
/**
 * Generated class for the MemberViewDataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'member-view-data',
  templateUrl: 'member-view-data.html'
})
export class MemberViewDataComponent {

  @Output() public addProspect:EventEmitter<String> = new EventEmitter<String>()
  
  private data: any = [];
  private quatationList: QuotationModel[] = [];
  private address:string;
  private exportElement;
  private exampleBenefitList: Array<ExampleBenefitModel> = [];

  genderMap = {M:'ชาย',F:'หญิง'};

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private validate: ValidateProvider,
    private storage: Storage,
    private apiProvider: ApiProvider,
    private alertCtrl: AlertDirective,
    private dateFormat: DateFormatProvider,
    private loadingCtrl: LoadingDirective,
    private network: Network,
    private modalCtrl: ModalController,
    private currencyFormat: CurrencyFormatProvider,
    private commonUtilProvider: CommonUtilProvider,
    private navCtrl: NavController,
    ) {
      let element = this.params.data.data;
      this.exportElement = element;
      this.quatationList = this.params.data.quatationList;
      this.exampleBenefitList = this.params.data.exampleBenefitList;
      const {
        subdistrict,
        district,
        province,
        postcode,
        addressno,
        buildingname,
        moo,
        soi,
        road
      } = element;
        
     // this.address = '';
      let address ='';

      if (addressno !== '') address = addressno;
      if (buildingname !== '') address += ` ${buildingname}`;
      if (moo !== '') address += ` หมู่${moo}`;
      if (soi !== '' && soi !== '-') address += ` ซอย${soi}`;
      if (road !== '' && road !== '-') address += ` ถนน${road}`;
      if (subdistrict !== '') address += ` ตำบล${subdistrict}`;
      if (district !== '') address += ` อำเภอ${district}`;
      if (province !== '') address += ` จังหวัด${province}`;
      if (postcode !== '') address += ` ${postcode}`;
      this.address = address !=''?address:'-';
      let birthDate = this.dateFormat.dateFormatShotTh1(element.birthDate,'S');

      this.data = {
        programe : 'TL Pro Plus',
        citizenID : this.validate.isEmpty(element.citizenID) ? '-' : element.citizenID,
        preName : this.validate.isEmpty(element.preName) ? '-' : element.preName,
        firstName : this.validate.isEmpty(element.firstName) ? '-' : element.firstName,
        lastName : this.validate.isEmpty(element.lastName) ? '-' : element.lastName,
        gender : this.validate.isEmpty(element.gender) ? '-' : element.gender,
        birthDate : this.validate.isEmpty(birthDate) ? '-' : birthDate,
        age : this.validate.isEmpty(element.age) ? '-' : CalculateAgeUtil.calculateAge(new Date(element.birthDate.replace(' ', 'T'))),
        occupationType : this.validate.isEmpty(element.occupationType) ? '-' : element.occupationType,
        mobilephone : this.validate.isEmpty(element.mobilephone) ? '-' : element.mobilephone,
        telephone : this.validate.isEmpty(element.telephone) ? '-' : element.telephone,
        fax : this.validate.isEmpty(element.fax) ? '-' : element.fax,
        passport : this.validate.isEmpty(element.passport) ? '-' : element.passport,
        linkFacebook : this.validate.isEmpty(element.linkFacebook) ? '-' : element.linkFacebook,
        lineID : this.validate.isEmpty(element.lineID) ? '-' : element.lineID,
        geolocation : this.validate.isEmpty(element.geolocation) ? '-' : element.geolocation,
        address : this.validate.isEmpty(element.address) ? '' : element.address,
        subdistrict : this.validate.isEmpty(element.subdistrict) ? '' : element.subdistrict,
        district : this.validate.isEmpty(element.district) ? '' : element.district,
        province : this.validate.isEmpty(element.province) ? '' : element.province,
        postcode : this.validate.isEmpty(element.postcode) ? '' : element.postcode,
        remark : this.validate.isEmpty(element.remark) ? '-' : element.remark,
        customerId : element.customerID
      }
    }

  public close(){
    this.viewCtrl.dismiss('');
  }

  showAddMember(dataProspect){
    this.viewCtrl.dismiss('EDIT');
  }
  
  openQuatation(data, quotation) {
    this.viewCtrl.dismiss('CQWP', quotation);
  }

  openExampleBenefit(exampleBenefit) {
    this.viewCtrl.dismiss('openExampleBenefit', exampleBenefit);
  }

  async confirmDelete(quotation){
    try{
      const messageAlert = `หากท่านทำการลบข้อมูลใบเสนอขายนี้ ข้อมูลใบเสนอขายที่ออกเลข Ref. หรือใบคำขอ ที่เกี่ยวข้อง
      กับใบเสนอขายนี้ จะถูก ลบ อัตโนมัติ ต้องการลบใบเสนอขาย กดปุ่ม "ตกลง"`;
      await this.alertCtrl.confiemBox(`${messageAlert}`).then(
        (res) => {
          this.deleteQuatation(quotation);
        }
      );
    } 
    catch(e) {
      console.error(e);
      if(e !== 'cancel'){
        throw e;
      }
    }
  }
  
  deleteQuatation(quotation){

    let loading = this.loadingCtrl.scopePresent();
    let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    
    let quotationM: QuotationModel = new QuotationModel();
    quotationM.customerid = this.data.customerId;
    quotationM.quotationno = quotation.quotationno;
    quotationM.lastmodify = dateNow; 

    let objMs : Array<QuotationModel> = [];
    objMs.push(quotationM);
    
    let reqModel:RequestModel = new RequestModel();
    reqModel.param = objMs;
    reqModel.functionName = FunctionName.QUOTATION;
    reqModel.serviceName = ServiceName.DELETE;
    this.apiProvider.callData(reqModel).then(
      (res) => {
        this.alertCtrl.warning('ลบสำเร็จ');
        this.loadingCtrl.scopeDismiss(loading);
        this.viewCtrl.dismiss('DELETEQUOTATION', res['data'][0]);
       
      },(err) => {
        this.loadingCtrl.scopeDismiss(loading);
        this.alertCtrl.error(err);
      }
    );
    
  }

  public async viewQuotationForm(quotation : QuotationModel) {

    if (this.network.type == 'none') {
      let opts: ModalOptions = {
        cssClass: 'lost-connection'
      };

      let modal: Modal = this.modalCtrl.create(PopupLostConnectionComponent);
      modal.present();
      return;
    }
    else{
      // ถ้ามี refNo แล้ว
      if((quotation.referenceno != undefined && quotation.referenceno != '') && 
        (quotation.status == 'R' || quotation.status == 'S'))
      {
        let genQuoModel: GenerateQuotationM = new GenerateQuotationM();
        genQuoModel.quotationno = quotation.quotationno;
        genQuoModel.customerid = quotation.customerid;
        genQuoModel.quotationStatus = quotation.status;
        genQuoModel.flag = '2';
        if(quotation.status == 'S')
          genQuoModel.flag = '3';
        let loading = this.loadingCtrl.scopePresent();
        await this.storage.get('tlpromptMode').then(async mode => {
          await this.storage.get('loginProfile').then(async profile => {
            let userID = '';
            if(profile.roleType == 'employee'){
              userID = profile.pid.replace("-", "");
              if(userID == ''){
                userID = profile.agentid.replace("-", "");
              }
              genQuoModel.agentFullName = '';//profile.empName;
              genQuoModel.agentBranch = '';//profile.ou.length > 3 ? profile.ou.substring(3) : '';
            }
            else{
              userID = profile.agentid;
              genQuoModel.agentFullName = profile.fName + ' ' + profile.lName;
              genQuoModel.agentBranch = profile.branch;
            }
            let reqModel: RequestModel = new RequestModel();
            reqModel.agentid = userID;
            reqModel.mode = mode;
            reqModel.functionName = FunctionName.GENERATE_QUOTATION;
            // if(quotation.typeapp == 'UL')
            //   reqModel.functionName = FunctionName.UNIVERSAL_LIFE_PDF;
            reqModel.param = [genQuoModel];
            // this.pageTotal = 0;
            this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
              (res: any) => {
                // let binary: string;
                // this.pageTotal = res.pageTotal;
                let dataToJson = '';
                let pdfName = '';
                if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
                    dataToJson = res.datas[0].binaryQuotationPDF;
                    pdfName = res.datas[0].pdfFileName;
                    // let genQuoModel.timesend = res.datas[0].pdfFileName;
                    
                    let pdfSrc = 'data:application/pdf;base64,' + dataToJson;
                    // let data = { src: pdfSrc};
                    //this.navCtrl.push(QuatationPdfPage, data);
                    let a : any = {prospect:this.params.data.data, pdfLanguage : quotation.pdflang, src:pdfSrc, planCode : quotation.plancode }
                    this.viewCtrl.dismiss('PDF', a);
                    // console.log('pdfSrc : ',pdfSrc);
                }
                else {
                  // this.dataToJson = [];
                  this.alertCtrl.warning('ไม่พบข้อมูลใบเสนอขาย')
                }
                // this.generateIFrameUrl(this.pdfSrc);
                this.loadingCtrl.scopeDismiss(loading);
              },
              (err) => {
                this.loadingCtrl.scopeDismiss(loading);
                this.alertCtrl.error(err);
              }
            );
          })
        })
      }
    }
  }

  // ExampleBenefit
  async deleteBenefit(benefitID)
  {
    try {
      const messageAlert = `ต้องการลบตัวอย่างผลประโยชน์ กดปุ่ม "ตกลง"`;
      await this.alertCtrl.confiemBox(`${messageAlert}`).then(
        (res) => {
          this.deleteExampleBenefit(benefitID);
        }
      );
    } catch(e) {
      console.error(e);
      if(e !== 'cancel'){
        throw e;
      }
    }
  }

  deleteExampleBenefit(benefitID)
  {
    let loading = this.loadingCtrl.scopePresent();
    
    let exampleM: ExampleBenefitModel = new ExampleBenefitModel();
    let objMs : Array<ExampleBenefitModel> = [];
    
    exampleM = {
      ...exampleM, 
      customerid: this.data.customerId,
      benefitid: benefitID
    }

    objMs.push(exampleM);
    let reqModel:RequestModel = new RequestModel();
    reqModel = {
      ...reqModel,
      param: objMs,
      functionName: FunctionName.EXAMPLE_BENEFIT,
      serviceName: ServiceName.DELETE
    }
    
    this.loadingCtrl.scopeDismiss(loading);
    this.apiProvider.callData(reqModel).then(
      (res) => {
        this.alertCtrl.warning('ลบสำเร็จ');
        this.loadingCtrl.scopeDismiss(loading);
        // ลบออกจากอาร์เรย์
        _.remove(this.exampleBenefitList, benefit => (
          benefit.benefitid == benefitID
        ));
      },(err) => {
        this.loadingCtrl.scopeDismiss(loading);
        this.alertCtrl.error(err);
      }
    );
    
  }

  // ป๊อปอัพแสดงรายละเอียด ข้อมูลตัวอย่างผลประโยชน์
  viewBenefitDetail(benefitExample) {
    console.log('benefitExample', benefitExample)
    let modal: Modal = this.modalCtrl.create(PopupExampleBenefitComponent, { data: benefitExample, prospect: this.data }, {cssClass: 'benefitView'});
    modal.present();
  }

}
