import { ValidateProvider } from './../../../providers/validate/validate';
import { Component, Output, EventEmitter } from "@angular/core";
import { NavController, NavParams, ModalController, Platform } from "ionic-angular";
import { AlertDirective } from "../../../directives/extends/alert/alert";
import { RequestModel } from "../../../providers/model/request-model";
import { ProspectModel } from "../../../providers/prospect/prospect-model";
import { Storage } from '@ionic/storage';
import { FunctionName } from "../../../providers/constants/function-name";
import { ServiceName } from "../../../providers/constants/service-name";
import { ApiProvider } from "../../../providers/api/api";
import { ResponseModel } from "../../../providers/model/response-model";
import { MemberViewDataComponent } from "../../utility/member-view-data/member-view-data";
import moment from 'moment';
import { QuotationModel } from "../../../providers/quotation/quotation-model";
import { IMyDpOptions } from "mydatepicker";
import { LoadingDirective } from "../../../directives/extends/loading/loading";
import { DateFormatProvider } from "../../../providers/date-format/date-format";
import { QuotationRiderM } from '../../../providers/quotationrider/quotationrider-model';
import { QuotationGuardianM } from '../../../providers/quotationguardian/quotationguardian-model';
import { QuatationPdfPage } from '../../../pages/quatation/quatation-pdf/quatation-pdf';
import { ExampleBenefitModel } from './../../../providers/ulink-benefit/example-benefit-model/example-benefit';

/**
 * Generated class for the ProspectSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'prospect-search',
  templateUrl: 'prospect-search.html'
})
export class ProspectSearchComponent {

  // @Input public dateChange:

  @Output() public addProspect:EventEmitter<any> = new EventEmitter<any>()

  private prospects = [];
  private prospectsTmp = [];
  private quatation = [];

  /*
  *Text Normal Search
  */
  private searchProspectVal:string = '';

  /*
  *Search Mode (adv,nor,all)
  */
  private searchMode :String = 'nor';

  /*
  *Select (A = all,C = customer ,P = prospect)
  */
  private typeMode : string = 'A';

  /*
  *Radio (All,P,C)
  */
  private typeVal : string = '';
  
  /*
  *Text Advance Search
  */
  private firstNameVal:string = '';
  private lastNameVal:string = '';
  private cIdVal:string = '';
  private mobileNoVal:string = '';
  private EmailVal:string = '';

  private formatDate: string = "YYYY-MM-DD";
  private startDate: string = moment().format(this.formatDate);
  private endDate: string = moment().format(this.formatDate);
  private genderVal:string = '';
  private districtVal:string = '';
  private provinceVal:string = '';

  /*
  *paging
  */
  private allItems: any[];
  private pagedItems: any[];
  private pager : any = {};
  private pageSize : number = 5;
  private currentPage : number;
  private totalPage : number;
  private flagSort : boolean;

  /*
  *sorting
  */
  private isDesc : boolean = false;
  private column : string = '';
  private direction : number;
  private sortingFlag : string = '';

  private statusMap = {
    C:'ลูกค้าเดิม',
    P:'ผู้มุ่งหวัง'
  };
  
  private count:number;

  constructor(
    private navCtrl: NavController, 
    private alertCtrl: AlertDirective,
    private storage: Storage,
    private apiProvider: ApiProvider,
    private modalCtrl: ModalController,
    private validate: ValidateProvider,
    private loadingCtrl: LoadingDirective,
    private dateFormat: DateFormatProvider,
    private platform: Platform) {
  }

  ngOnInit() {
    try {
      this.searchProspect('all');
    } catch (error) {
      console.error("error", error);
    }
    
  }

  searchProspect(typeOfSearch) {

    let loading = this.loadingCtrl.scopePresent();

    let prospectM: ProspectModel = new ProspectModel();
    prospectM.customerType = this.typeVal;
    if (typeOfSearch === 'nor') { 
          if (this.searchProspectVal === ''){
            this.alertCtrl.warning('กรุณาระบุข้อมูลที่ต้องการค้นหา');
            this.loadingCtrl.scopeDismiss(loading);
            return;
          }
          typeOfSearch = 'NORMAL';
        } 
        else if(typeOfSearch === 'adv') {
          if (this.firstNameVal === '' &&
            this.lastNameVal === '' &&
            this.cIdVal === '' &&
            this.mobileNoVal === '' &&
            this.EmailVal === '' &&
            this.validate.isEmptyDate(this.startDate) &&
            this.validate.isEmptyDate(this.endDate) &&
            this.genderVal === '' &&
            this.districtVal === '' &&
            this.provinceVal === ''){
            this.alertCtrl.warning('กรุณาระบุข้อมูลที่ต้องการค้นหา');
            this.loadingCtrl.scopeDismiss(loading);
            return;
          } 
          else if (!this.validate.validateDate(this.startDate,this.endDate)){
            this.alertCtrl.warning('กรุณาระบุวันที่ให้ถูกต้อง');
            this.loadingCtrl.scopeDismiss(loading);
            return;
          }

          let endDate = undefined;

          if (!this.validate.isEmptyDate(this.startDate)) {
            prospectM.createDatetimeFrom = this.startDate;
          } 
          else {
            prospectM.createDatetimeFrom = '';
          }

          if (this.endDate && !this.validate.isEmptyDate(this.endDate)) {
            if (this.endDate.hasOwnProperty('date')) {
              endDate = this.endDate['date'];
              prospectM.createDatetimeTo = this.endDate+' 23:59:59';
            } 
            else {
              prospectM.createDatetimeTo = this.endDate +' 23:59:59';
            }
          } 
          else {
            prospectM.createDatetimeTo = '';
          }
          
          prospectM.firstName = this.firstNameVal;
          prospectM.lastName = this.lastNameVal;
          prospectM.citizenID = this.cIdVal;
          prospectM.mobilephone = this.mobileNoVal;
          prospectM.gender = this.genderVal;
          prospectM.district = this.districtVal;
          prospectM.province = this.provinceVal;
          prospectM.email = this.EmailVal;
          typeOfSearch = 'ADVANCE';
        } else {
          typeOfSearch = '';
        }

        this.prospects = [];
        this.count = 0;

        let prospectMs : ProspectModel[] = [];
        prospectMs.push(prospectM)

        let reqModel:RequestModel = new RequestModel();
        reqModel.searchmode = typeOfSearch;
        reqModel.functionName = FunctionName.POSPECT;
        reqModel.param = prospectMs;
        reqModel.serviceName = ServiceName.SELECT;
        reqModel.keyvalue = this.searchProspectVal;
        this.apiProvider.callData(reqModel).then(
          (res) =>{
            let obj :any = res;
            let resModel :ResponseModel = obj;
            if(resModel.data.length > 0){
              let prospectModelArr: ProspectModel[] = resModel.data;
              prospectModelArr.forEach(element => {
                element.fullName = element.firstName+' '+element.lastName;
                this.prospects.push(element);
              });
              this.count = this.prospects.length;
              this.prospectsTmp = this.prospects;
            } else {
              this.pagedItems = [];
            }
            this.changePage(1);
            this.loadingCtrl.scopeDismiss(loading);
          },(err) => {
            // TODO
            this.loadingCtrl.scopeDismiss(loading);
            this.alertCtrl.error(err);
          });
  }

  async createSellSheet(prospect, quotation) {

    if (this.validate.isEmpty(quotation)) {
      this.navCtrl.push('QuatationPage',{'prospectToQuatation':{'prospect':prospect,'quotation':null}});
    } 
    else {
      this.loadingCtrl.present();

      let quatationRider : any = await this.getQuatationRider(quotation.quotationno, prospect.customerID);
      let quatationGuardian : any = await this.getQuatationGuardian(quotation.quotationno, prospect.customerID);

      const typeapp = quotation.typeapp;

      // Edit page Universal Life
      if (typeapp === 'UL') {
        this.navCtrl.setRoot('InvestmentPage', {
          'prospect' : prospect, 'quotationUniversalLife' : quotation, 
          'quotationriderUniversalLife' : quatationRider, 
          'quatationGuardianUniversalLife' : quatationGuardian, 
          'editDataUniversalLife': true }).then(() => {
            this.loadingCtrl.dismiss();
          });
      }
      else if (typeapp === 'ULink') {
        this.navCtrl.setRoot('InvestmentPage', {
          'prospect' : prospect, 
          'quotationUnitLink' : quotation, 
          'quotationriderUnitLink' : quatationRider, 
          'quatationGuardianUnitLink' : quatationGuardian, 
          'editDataUnitLink': true }).then(() => {
            this.loadingCtrl.dismiss();
          });
      }
      else {
        this.navCtrl.push('QuatationPage', {'prospectToQuatation' : {
          'prospect' : prospect, 
          'quotation' : quotation, 
          'quotationrider' : quatationRider, 
          'quatationGuardian' : quatationGuardian }}).then(
            () => {
              this.loadingCtrl.dismiss();
            });
      }
        
    }
  }

  selectSearchMode(selectSearchMode:String){
    this.searchMode = selectSearchMode;
    this.searchProspectVal = '';
  }

  deleteRow(arg) {

    let loading = this.loadingCtrl.scopePresent();
    
    this.storage.get('tlpromptMode').then(mode =>{
      this.storage.get('loginProfile').then(profile =>{

        let prospectM: ProspectModel = new ProspectModel();
        prospectM.agentID = profile.agentid;
        prospectM.customerID = arg.customerId;

        let prospectMs : Array<ProspectModel> = [];
        prospectMs.push(prospectM);

        let reqModel:RequestModel = new RequestModel();
        reqModel.agentid = profile.agentid;
        reqModel.mode = mode;
        reqModel.param = prospectMs;
        reqModel.functionName = FunctionName.POSPECT;
        reqModel.serviceName = ServiceName.DELETE;
        this.apiProvider.callData(reqModel).then(
          (res) => {

            let indexJson: any = this.prospects.findIndex(function(item){
              return  item.customerID === arg.customerId;
            }) 

            this.count = 0;
            this.prospects.splice(indexJson, 1);
            //this.prospects = this.prospects.slice(0);
            this.count = this.prospects.length;
            this.alertCtrl.warning('ลบสำเร็จ');
            this.changePage(this.currentPage);
            this.loadingCtrl.scopeDismiss(loading);
          },(err) => {
            console.log(err);
            this.loadingCtrl.scopeDismiss(loading);
            this.alertCtrl.error(err);
          }
        );


      });
    });

  }

  showAddMember(){
    this.addProspect.emit();
  }

  sort(property,option){
    if(this.column != property){
      this.isDesc = false;
      this.sortingFlag = 'desc'
    }
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1 ;
    if(this.direction == -1){
      this.sortingFlag = 'asc'
    } else if(this.direction == 1){
      this.sortingFlag = 'desc'
    }
    this.changePage(this.currentPage);
  }

  public async openMemberData(data){
    let quatationList : any = await this.getQuatation(data.customerID);
    let exampleBenefitList: any = await this.getExampleBenefit(data.customerID);
    let exportData = {
      'data': data,
      'quatationList': quatationList,
      'exampleBenefitList': exampleBenefitList
    };
    
    let modal = this.modalCtrl.create(MemberViewDataComponent, exportData,{cssClass: 'memberView'});
    modal.onDidDismiss((flag, quatation) => {
      if(flag === 'EDIT'){
        this.addProspect.emit(exportData);
      } 
      else if(flag === 'CQWQ'){
        this.createSellSheet(data, quatation);
      } 
      else if(flag === 'CQWP'){
        this.createSellSheet(data, quatation);
      }
      else if(flag === 'DELETEQUOTATION'){
        // ลบจำนวนที่ count ของ quotation
        data.quatationAmt = data.quatationAmt-1;
        if(data.quatationAmt < 0)
          data.quatationAmt = 0;

        if (quatation != undefined && quatation != null) {
          data.applicationAmt = Number(quatation['applicationAmt']);
        }
        else {
          data.applicationAmt = 0;
        } 
       
      }
      else if (flag == 'PDF') {
        this.navCtrl.push(QuatationPdfPage, quatation);
      }
      else if(flag == 'openExampleBenefit') {
        this.loadingCtrl.present();
        this.navCtrl.setRoot('InvestmentPage',{
          'prospect' : data, 'exampleBenefit' : quatation, 
          'editDataUnitLink': true }).then(() => {
          this.loadingCtrl.dismiss();
        });
      }
    });
    modal.present();
  } 

  getQuatation(customerId){
    return new Promise((resolve,reject) => {

      let quatationM : QuotationModel = new QuotationModel();
      quatationM.customerid = customerId;

      let quatationMs : Array<QuotationModel> = [];
      quatationMs.push(quatationM);

      let reqModel:RequestModel = new RequestModel();
      reqModel.param = quatationMs;
      reqModel.functionName = FunctionName.QUOTATION;
      reqModel.serviceName = ServiceName.SELECT;
      reqModel.searchkey = "FROM_PROSPECT";
      this.apiProvider.callData(reqModel).then(
        (res) => {
          let obj : any = res;
          let resModel : ResponseModel = obj;
          resolve(resModel.data);
        },(err) => {reject()}
      );
    });

  }

  getQuatationRider(quatation,customerId){
    return new Promise((resolve,reject) => {

      let quatationM : QuotationRiderM = new QuotationRiderM();
      quatationM.customerid = customerId;
      quatationM.quotationno = quatation;

      let quatationMs : Array<QuotationRiderM> = [];
      quatationMs.push(quatationM);

      let reqModel:RequestModel = new RequestModel();
      reqModel.param = quatationMs;
      reqModel.functionName = FunctionName.QUOTATIONRIDER;
      reqModel.serviceName = ServiceName.SELECT;

      this.apiProvider.callData(reqModel).then(
        (res) => {
         // console.log("QUOTATIONRIDER = ", res);

          let obj : any = res;
          let resModel : ResponseModel = obj;
          resolve(resModel.data);
        },(err) => {
          reject()
        }
      );

    });
  }

  getQuatationGuardian(quatation,customerId){
    return new Promise((resolve,reject) => {

      let quatationM : QuotationGuardianM = new QuotationGuardianM();
      quatationM.customerid = customerId;
      quatationM.quotationno = quatation;

      let quatationMs : Array<QuotationGuardianM> = [];
      quatationMs.push(quatationM);
      let reqModel:RequestModel = new RequestModel();
      reqModel.param = quatationMs;
      reqModel.functionName = FunctionName.QUOTATIONGUARDIAN;
      reqModel.serviceName = ServiceName.SELECT;

      this.apiProvider.callData(reqModel).then(
        (res) => {
         //console.log("XX 1 " + JSON.stringify(res));

          let obj : any = res;
          let resModel : ResponseModel = obj;
          resolve(resModel.data);
        },(err) => {
          console.log(JSON.parse(err));
          reject(err)
        }
      );

    });
  }

  changePage(page:number){
    this.totalPage = Math.ceil(this.prospects.length / this.pageSize);
    this.totalPage = this.totalPage === 0 ? 1 : this.totalPage;
    if (page < 1)  {
      return;
    } else if(page > this.totalPage){
      page = this.totalPage;
    }
    this.currentPage = page;
    this.flagSort = !this.flagSort;
  }

  async confirmDelete(customerID,index,fullName?){
    let deleteObj = { 
      'customerId':customerID,
      'index':index
    };
    try{
      const messageAlert = `ท่านต้องการลบ ข้อมูล คุณ ${fullName} หรือไม่
        <br>หากต้องการกด ตกลง ข้อมูลทั้งหมดในการนำเสนอขายจะถูกลบไม่สามารถเรียกกลับมาแสดงได้อีก 
        <br>หากไม่ต้องการ กด ยกเลิก`;
      await this.alertCtrl.confiemBox(`${messageAlert}`);
      this.deleteRow(deleteObj);
    } catch(e) {
      console.error(e);
      if(e !== 'cancel'){
        throw e;
      }
    }
  }

  filterCustomaerType(){
    this.prospects = this.prospectsTmp;
    if(this.typeMode !== 'A'){
      this.prospects = [];
      this.prospectsTmp.forEach(element => {
        if(element.customerType === this.typeMode){
          this.prospects.push(element);
        }
      });
    }
    this.count = this.prospects.length;
    this.changePage(this.currentPage);
  } 
  
  dateChange(date){
    //console.log("date",date);
    // this.startDate = date;
    // if(this.validate.isEmptyDate(this.endDate)){
    //   this.endDate = {date:this.startDate};
    // }
    // if(this.platform.is('core') || this.platform.is('mobileweb')) {
    //   if(this.validate.isEmptyDate(this.endDate)){
    //     //let dt = new Date(date.year, date.month-1 , date.day);
    //     //console.log("date from adpater:",this.dateFormat.datePickerAdapterIn(dt));
    //     //this.endDate = this.dateFormat.datePickerAdapterIn(dt);
    //     this.endDate = {date: date};
    //   }
    // } else {
    //   if(this.validate.isEmpty(this.endDate)){
    //     this.endDate = date;
    //   }
    // }
  }

  // ตัวอย่างผลประโยชน์
  private getExampleBenefit(customerId)
  {
    return new Promise((resolve,reject) => {

      let exBenefitM : ExampleBenefitModel = new ExampleBenefitModel();
      let exBenefitMs : Array<ExampleBenefitModel> = [];

      exBenefitM = {
        ...exBenefitM,
        customerid: customerId
      }

      exBenefitMs.push(exBenefitM);

      let reqModel:RequestModel = new RequestModel();
      reqModel = {
        ...reqModel,
        param: exBenefitMs,
        functionName: FunctionName.EXAMPLE_BENEFIT,
        serviceName: ServiceName.SELECT
      }
      
      this.apiProvider.callData(reqModel).then(
        res => {
          let obj : any = res;
          let resModel : ResponseModel = obj;
          resolve(resModel.data);
        }, err => { reject(err) }
      );
    });

  }

}
