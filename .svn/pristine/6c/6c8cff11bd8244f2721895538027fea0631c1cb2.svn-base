import { AgentModel } from './../../providers/agent/agent-model';
import { Network } from '@ionic-native/network';
import { SendEmailFileM } from './../../providers/send-email/send-email-file';
import { QuotationData } from './../../providers/quotation/quotation-data';
import { RiderConfig } from './../../providers/rider/rider-config';
import { QuotationModel } from './../../providers/quotation/quotation-model';
import { Subscription } from 'rxjs';
import { DateUtil } from './../../providers/utility/date-util';
import { QuotationprintlogM } from './../../providers/service-table/quotationprintlog-model';
import { Component, HostBinding, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { SendEmailComponent } from '../../components/form/send-email/send-email';
import { ConditionSignatureComponent } from '../../components/utility/condition-signature/condition-signature';
import { Events } from 'ionic-angular/util/events';
import { RequestModel } from '../../providers/model/request-model';
import { GenerateQuotationM } from '../../providers/generate-quotation/generate-quotation-model';
import { FunctionName } from '../../providers/constants/function-name';
import { CommonUtilProvider } from '../../providers/common-util/common-util';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { ServiceName } from '../../providers/constants/service-name';
import { ApiProvider } from '../../providers/api/api';
import { ResponseModel } from '../../providers/model/response-model';
import {DomSanitizer} from "@angular/platform-browser";
import { SendEmailM } from '../../providers/send-email/send-email';
import { BasicVerifyAppModalComponent } from '../../components/basic-verify-app-modal/basic-verify-app-modal';
import { ConditionPreUnderwriteM } from '../../providers/service-table/condition-uw-model';
import { ApplicationData } from '../../providers/application/application-data';
import * as moment from 'moment';
import { MCAapplicationsM } from '../../providers/service-table/mcaapplications-model';
import { ApiDbProvider } from '../../providers/api-db/api-db';
import { ProspectModel } from '../../providers/prospect/prospect-model';
import { FileOpener} from '@ionic-native/file-opener';
import { File} from '@ionic-native/file';
import { PopupLostConnectionComponent } from '../../components/utility/popup-lost-connection/popup-lost-connection';
import { ConstantConfig } from '../../providers/utility/constant-config';
import { ApplicationpdfM } from '../../providers/service-table/application-pdf-model';
import { QuotationPdfUtil } from './../../providers/quotation/quotation-pdf-util';
import { EMAIL } from "./../../providers/constants/app-config";
import { PreUWStatusM } from '../../providers/model/pre-underwrite';

/**
 * Generated class for the PdfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const ZOOM_STEP:number = 0.25;
const DEFAULT_ZOOM:number = 1;
const MAX_ZOOM:number = 2;
const MIN_ZOOM:number = 0.25;
const { FROM, SENDERNAME } = EMAIL;

@IonicPage({
  segment: 'PDF',
})
@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
})
export class PdfPage implements OnInit {

  private quotation : QuotationModel; // use for broadcaster data back to quotation.ts

  private langMap = { 'T': 'ไทย', 'E': 'อังกฤษ' };

  private version: string;
  private tlpromptMode = 'normal';
  private pdfLanguage: string = 'T';

  private refFlag: boolean = false;
  private signFlag: boolean = false;

  /**
   * string of pdf on base64
   * format : 'data:application/pdf;base64,SFergf23311dsf......'
   */
  private pdfSrc: any = '';
  /** เก็บ url สำหรับ download */
  private pdfUrlDownload = null;
  private pdfSrcBase64 = null;

  private planCode: string = '';
  private tlplanObj = [];
  private prospect;
  private rider: object = {};
  private quatationSum: string;
  private quatationPremium: string;
  private premiumFooter : string;
  private quatationMode: string;
  private date: string;
  private time: string;
  private package : number;
  private premiumTax : number;

  private genQuoModel: GenerateQuotationM = new GenerateQuotationM();
  private listRiderObj = [];
  private dataToJson;
  private pageTotal : number;
  private userID : string = "";
  private userType : string = "";

  private pdfName : string = "";
  /**
   * อ่านไฟล์ pdf จาก path โดยตรง
   */
  private viewPdfOnly: boolean = false;

  private fromAppDetail: boolean = false;
  private fromBasicVerify: boolean = false;

  /**
   * แสดงภาษาให้เลือก
   */
  private showLang: boolean = false;

  private roleType : boolean = true; // ถ้าเป็น agent ให้ show
  private hideEngSelect : boolean = false;
  private hideThaiSelect : boolean = false;
  private subscription: Array<Subscription> = [];
  private disabledBasicVerify: boolean = false;
  private openPdfFrom : string = "quotation";
  private modeCheck =  0;
  private closeToPage: string;
  private isHasAppForm: boolean = false;

  private pdfZoom:number = DEFAULT_ZOOM;

  /**
   * ชื่อ file pdf สำหรับ download 
   */
  private downloadpdfFilename:string = "download.pdf";
  private downloadCode:string ='';
  private quotationPdfUtil : QuotationPdfUtil;

  private profile: AgentModel;

  @HostBinding('class') private className: string = 'page-header-default';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private modalCtrl: ModalController,
    private loading: LoadingDirective,
    private event: Events,
    private commonUtilProvider: CommonUtilProvider,
    private alertCtrl: AlertDirective,
    private apiProvider: ApiProvider,
    private sanitizer:DomSanitizer,
    private viewCtrl: ViewController,
    private appData: ApplicationData,
    private platform: Platform,
    private conf : RiderConfig,
    private quotationData : QuotationData,
    public apiDbProvider: ApiDbProvider,
    private fileOpener : FileOpener,
    private file : File,
    private network: Network) {

      this.prospect = this.navParams.get('prospect');
      this.quotation = this.navParams.get('quotation');
      this.planCode = this.navParams.get('planCode');
      this.tlplanObj.push(this.navParams.get('tlplan'));

      this.profile = this.navParams.get('profile');
      this.genQuoModel.agentFullName = '';
      this.genQuoModel.agentBranch = '';
      this.roleType = this.profile.roleType == 'agent';
      this.userType = this.profile.roleType;
      if(this.profile.roleType == 'employee'){
        this.userID = this.profile.pid.replace("-", "");
        if(this.userID == ''){
          this.userID = this.profile.agentid.replace("-", "");
        }
        this.genQuoModel.agentFullName = '';//profile.empName;
        this.genQuoModel.agentBranch = '';//profile.ou.length > 3 ? profile.ou.substring(3) : '';
      }
      else{
        this.userID = this.profile.agentid;
        this.genQuoModel.agentFullName = this.profile.fName + ' ' + this.profile.lName;
        this.genQuoModel.agentBranch = this.profile.branch;
      }

    this.quotationPdfUtil = new QuotationPdfUtil(this.storage, this.conf);
    this.openPdfFrom = "quotation";
    this.storage.get('version').then(version => {
      this.version = 'V.' + version;
    });

    this.modeCheck = this.apiProvider.getTLPromptMode();
      if (this.modeCheck == 0)
        this.tlpromptMode = 'mini';

    if(typeof this.navParams.data.planCode != 'undefined'){
      this.planCode = this.navParams.data.planCode;
      this.downloadCode = this.navParams.data.planCode;
    }

    // อ่านไฟล์ pdf อย่างเดียว
    if (typeof this.navParams.data.src != 'undefined') {

      if (typeof this.navParams.data.prospect != 'undefined') {
        this.prospect = this.navParams.data.prospect;
      }
      if (typeof this.navParams.data.pdfLanguage != 'undefined') {
        this.pdfLanguage = this.navParams.data.pdfLanguage;
        // if(!(this.pdfLanguage == "E" || this.pdfLanguage == "T")){
        //   this.pdfLanguage = "T";
        // }
      }
      this.pdfSrc = this.navParams.data.src;
      this.generateIFrameUrl(this.pdfSrc);
      this.viewPdfOnly = true;
    }

    if (typeof this.navParams.data.fromAppDetail != 'undefined') {
      
      this.fromAppDetail = true;
      this.appData.getData('mcaapplicationM').then((res: MCAapplicationsM) => {
        this.downloadCode = res.applicationid;
        this.genfilename();
        this.openPdfFrom = "application";
        this.disabledBasicVerify = (res.publishstatus == 'P');

        if(typeof this.navParams.data.fromBasicVerify != 'undefined'){
          this.fromBasicVerify = true;
          this.disabledBasicVerify = false;
        }
      
        if (ConstantConfig.appstatusDisabled.indexOf(res['applicationstatus']) > -1) {
          this.disabledBasicVerify = false;
        }

        /**
         * ถ้าส่งสาขาสำเร็จแล้วสามารถ โหลด พิมพ์ ส่งเมลย์ ได้
         */
        if (ConstantConfig.appstatusSubmitDone.indexOf(res['applicationstatus']) > -1) {
          this.fromAppDetail = true; 
          this.fromBasicVerify = true;
        }

      });

      this.viewPdfOnly = true;
    }
    else {
      /**
       * ตรวจสอบใบเสนอขายว่าถูกสร้างเป็นใบคำขอแล้วหรือยัง ถ้าสร้างแล้วต้องปิดปุ่ม ..สร้างใบคำขอ..
       */
      if (this.quotationData.quotation != undefined) {

        let mcaM: MCAapplicationsM = new MCAapplicationsM();
        mcaM.customerid = this.quotationData.quotation.customerid;
        mcaM.quotationno = this.quotationData.quotation.quotationno;

        let mcaMs: Array<MCAapplicationsM> = [];
        mcaMs.push(mcaM);

        let reqM: RequestModel = new RequestModel();
        reqM.functionName = FunctionName.MCAAPPLICATIONS;
        reqM.serviceName = ServiceName.SELECT;
        reqM.param = mcaMs;
        this.apiProvider.callData(reqM).then((res)=> {
          if (Number(res['status'] == 0) && Number(res['size'] > 0)) {
            this.isHasAppForm = true;
          }
          else {
            this.isHasAppForm = false;
          }
        }, (err) => {
          console.log(err);
        });
      }
    }

    if (this.navParams.data != undefined && this.navParams.data.closeToPage != undefined) {
      this.closeToPage = this.navParams.data.closeToPage;
    }
    else {
      this.closeToPage = '';
    }

    if (!this.viewPdfOnly) {
      this.quotation = this.quotationData.quotation;
      this.planCode = this.navParams.data.planCode;
      this.prospect = this.quotationData.prospect;
      this.quatationSum = ""+this.quotationData.baseIncrementer;
      this.quatationPremium = this.quotationData.premiumTotal;
      this.quatationMode = this.quotationData.mode;
      // this.lifePremium = this.navParams.data.lifePremium;
      this.premiumFooter = this.quotationData.premiumFooter;
      this.rider = this.quotationData.rider;
      this.package = (this.quotationData.package == undefined ? 1 : Number(this.quotationData.package));
      this.premiumTax = this.navParams.data.premiumTax;
      this.listRiderObj = this.quotationPdfUtil.setFormatRider(this.rider);

      let currentDate = new Date();
      let currentDay = currentDate.getDate() < 10 ? 0+currentDate.getDate().toString() : currentDate.getDate().toString()
      let currentMonth = currentDate.getMonth()+1 < 10 ? 0+(currentDate.getMonth()+1).toString() : (currentDate.getMonth()+1).toString()
      let currentYear = (currentDate.getFullYear()+543).toString();
      this.date = currentYear+currentMonth+currentDay;
      let hours = currentDate.getHours() < 10 ? '0'+currentDate.getHours().toString() : currentDate.getHours().toString();
      let minutes = currentDate.getMinutes() < 10 ? '0'+currentDate.getMinutes().toString() : currentDate.getMinutes().toString();
      let seconds = currentDate.getSeconds() < 10 ? '0'+currentDate.getSeconds().toString() : currentDate.getSeconds().toString();
      this.time = hours+minutes+seconds;
    }
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }  

  public ngOnInit(): void {

      const mode: number = this.apiProvider.getTLPromptMode();
      // let loading = this.loading.scopePresent();

		  if (!this.viewPdfOnly) {

          this.notHaveMailEnglish();
          this.setObject();
        	let reqModel: RequestModel = new RequestModel();
        	reqModel.agentid = this.userID;
        	reqModel.mode = mode;
        	reqModel.functionName = FunctionName.GENERATE_QUOTATION;
        	reqModel.param = [this.genQuoModel];
        	this.pageTotal = 0;
        	this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          	(res: any) => {

              let binary: string;
              this.pageTotal = res.pageTotal;
            	if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
                  this.dataToJson = res.datas[0].binaryQuotationPDF;
                  this.pdfName = res.datas[0].pdfFileName;
                  this.genQuoModel.timesend = res.datas[0].pdfFileName;
                  console.log('res ----------------------------------> '+this.pdfName);
              }
              else {
              		this.dataToJson = [];
              }

              this.pdfSrc = 'data:application/pdf;base64,' + this.dataToJson;
              this.generateIFrameUrl(this.pdfSrc);
              // this.loading.scopeDismiss(loading);
            },
            (err) => {
              // this.loading.scopeDismiss(loading);
              this.alertCtrl.error(err);
            }
          );
        }
        else {
          // this.loading.scopeDismiss(loading);
        }
  }
  
  private notHaveMailEnglish() : void{
    if(this.planCode != undefined && this.planCode.trim() != '')
    {
      this.hideEngSelect = false;
      
      let noEnglish : string[] = ["ZE", "ZF", "ZG", "EG", "EE", "EF"];
      for(let i = 0; i < noEnglish.length; i++){
        if(this.planCode == noEnglish[i]){
          this.hideEngSelect = true;
          break;
        }
      }
      this.pdfLanguage = 'T';
    }
  }

  private genfilename(){
    if(this.downloadCode == undefined || this.downloadCode.trim() == ''){
      this.downloadpdfFilename = "download.pdf";
    }
    else{
      if(this.userID != undefined && this.userID.trim() != ''){
        this.downloadpdfFilename = this.quotationPdfUtil.createPdfQuotationFilename2(this.downloadCode, this.userID)
      }else{
        this.quotationPdfUtil.createPdfQuotationFilename(this.downloadCode).then(
          (res)=>{this.downloadpdfFilename = res;}
        );
      }
    }
  }

  private setObject(){
    this.downloadCode = this.tlplanObj[0].planCode;
    this.genfilename();
    this.genQuoModel.quotationno = ''; // use for update status on table quotation
    this.genQuoModel.customerid = ''; // use for update status on table quotation
    this.genQuoModel.quotationStatus = ''; // use for update status on table quotation
    
    this.genQuoModel.flag = '1';
    this.genQuoModel.planCode = this.tlplanObj[0].planCode;
    this.genQuoModel.planName = this.tlplanObj[0].planName2;
    this.genQuoModel.preName = this.prospect.preName;
    this.genQuoModel.firstName = this.prospect.firstName;
    this.genQuoModel.lastName = this.prospect.lastName;
    this.genQuoModel.sex = this.prospect.gender;
    this.genQuoModel.age = this.prospect.age.toString();
    //this.genQuoModel.endowYear = this.tlplanObj[0].pEndowmentYear;
    //this.genQuoModel.payYear = this.tlplanObj[0].pPayYear;
    this.genQuoModel.endowYear = ""+(Number(this.tlplanObj[0].pEndowmentYear));
    this.genQuoModel.payYear = ""+(Number(this.tlplanObj[0].pPayYear));
    if(this.tlplanObj[0].payType == "1"){
      this.genQuoModel.payYear = ''+(Number(this.tlplanObj[0].pPayYear) - this.prospect.age);
    }
    this.genQuoModel.lifeBenfit = this.quatationSum;
    this.genQuoModel.lifePremium = this.premiumFooter;//this.getPremium(this.planCode);
    this.genQuoModel.premiumPerYear = this.premiumFooter;//this.getPremium(this.planCode);
    //TODO เพิ่มเบี้ยที่ลดหย่อยได้ ที่ premiumOfTaxDeduction
    this.genQuoModel.premiumOfTaxDeduction = ''+this.premiumTax;

    this.genQuoModel.date = this.date;
    this.genQuoModel.mode = this.quatationMode; // 9 จ่ายครั้งเดียว, 1 จ่ายรายปี
    //TODO เพิ่ม แผนของแบบประกัน ที่ plan โดย แผนของแบบประกันที่เป็นPackage - 1  ระบุเป็น (เลขแผน - 1)
    this.genQuoModel.plan = ''+(this.package-1);
    // this.timesend = this.time+'-'+this.tlplanObj[0].planCode+'-idS';//timesend + "-" + parent.fixplancode + "-" + idS  (25601206-140328)
    this.genQuoModel.timesend = '';//this.timesend;
    this.genQuoModel.occupation = this.prospect.occupationType;
    this.genQuoModel.referenceNo = '';//flag = 1 ,referenceNo = ''
    this.genQuoModel.listRaider = this.listRiderObj;
    this.genQuoModel.binaryCustomerSignature = '';
    this.genQuoModel.binaryAgentSignature = '';

    /**
     * ถ้าเคยบันทึก quotation แล้ว
     **/
   if(typeof this.quotation  != 'undefined'){

    this.genQuoModel.quotationno = this.quotation.quotationno;
    this.genQuoModel.customerid = this.quotation.customerid;
    this.genQuoModel.quotationStatus = this.quotation.status;  
    
    if(this.quotation.status == 'R'){
      this.genQuoModel.flag = '2';
      this.refFlag = true;
      this.signFlag = false;
    }
    else if(this.quotation.status == 'S'){
      this.genQuoModel.flag = '3';
      this.refFlag = true;
      this.signFlag = true;
    }
    else{
      this.genQuoModel.flag = '1';
    }

    let lang : string = 'T';
    let pdfPath : string = this.quotation.pdfpath;

    if(this.quotation.pdflang != undefined){
      lang = this.quotation.pdflang;
      if(lang == 'E' || lang == 'T'){
        this.pdfLanguage = lang;
      }
    }

    if(this.quotation.status == 'R' || this.quotation.status == 'S'){
      this.lockPdfLanguage();
    }
    this.genQuoModel.timesend = pdfPath;
    this.pdfName = pdfPath;
    this.genQuoModel.referenceNo = this.quotation.referenceno;
  }
    this.genQuoModel.reportLanguage = this.pdfLanguage;
  }
  private lockPdfLanguage(){
    if(this.pdfLanguage == 'T'){
      this.hideThaiSelect = false;
      this.hideEngSelect = true;
    }
    else if(this.pdfLanguage == 'E'){
      this.hideThaiSelect = true;
      this.hideEngSelect = false;
    }
  }

 

  async selectPlan(loading){
    let reqModel: RequestModel = new RequestModel();
    reqModel.functionName = FunctionName.TLPLAN;
    reqModel.serviceName = ServiceName.SELECT;
    return await this.apiProvider.callData(reqModel).then(
      res => {
        let obj: any = res;
        let resModel: ResponseModel = obj;

        if (resModel.data.length > 0) {
          let tlPlan = resModel.data;
          this.tlplanObj = tlPlan.filter((item) => {
            return item.planCode == this.planCode;
          });
        }
      },
      err => {
        this.alertCtrl.error(err);
        this.loading.scopeDismiss(loading);
      }
    );
  }

  changeLanguage() {
    this.storage.get('tlpromptMode').then(async mode => {
      this.storage.get('loginProfile').then(async profile => {
        let loading = this.loading.scopePresent();
        this.genQuoModel.reportLanguage = this.pdfLanguage;
        delete this.genQuoModel['opts']; // ลบ opts ที่ติดมาจากการใช้ modal
        let reqModel: RequestModel = new RequestModel();
        reqModel.agentid = profile.agentid;
        reqModel.mode = mode;
        reqModel.functionName = FunctionName.GENERATE_QUOTATION;
        reqModel.param = [this.genQuoModel];
        this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          (res: any) => {
            this.genQuoModel.referenceNo = res.datas[0].referenceNo;
            this.pageTotal = res.pageTotal;
            if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
              this.dataToJson = res.datas[0].binaryQuotationPDF;
            } else {
              this.dataToJson = [];
            }
            this.pdfSrc = 'data:application/pdf;base64,' + this.dataToJson;
            this.generateIFrameUrl(this.pdfSrc);
            this.loading.scopeDismiss(loading);
          },
          (err) => {
            this.loading.scopeDismiss(loading);
            this.alertCtrl.error(err);
          }
        );
      });
    });
  }

  close() {

    if (this.closeToPage != undefined && 'AppFormPage' == this.closeToPage) {
      this.navCtrl.setRoot('AppFormPage');
    }
    else {
      this.navCtrl.pop();
    }
  }

  async reqRef() {
    if (this.network.type == 'none') {
      let opts = {
        cssClass: 'lost-connection'
      };

      let modal = this.modalCtrl.create(PopupLostConnectionComponent);
      modal.present();
      return;
    }

    let b : boolean = await this.quotationData.saveQuationAllFromQuotationPdf();
    if (b) {
      this.quotation = this.quotationData.quotation;
      this.genQuoModel.quotationno = this.quotation.quotationno; // use for update status on table quotation
      this.genQuoModel.customerid = this.quotation.customerid; // use for update status on table quotation
      this.genQuoModel.quotationStatus = ''; // use for update status on table quotation

      this.storage.get('tlpromptMode').then(async mode => {
        if (0 == mode) {

          let objM: ProspectModel = new ProspectModel();
          objM.customerID = this.genQuoModel.customerid;

          let objMs: Array<ProspectModel> = [];
          objMs.push(objM);
          
          let requestM: RequestModel = new RequestModel();
          requestM.functionName = FunctionName.POSPECT;
          requestM.serviceName = ServiceName.SELECT;
          requestM.param = objMs;
          requestM.searchkey = "SEARCH_BY";
          this.apiDbProvider.prospectService(requestM).then(
            (res)=> {
              if (res["size"] > 0) {
                requestM = new RequestModel();
                requestM.functionName = FunctionName.POSPECT;
                requestM.serviceName = ServiceName.INSERT;
                requestM.param = res["data"];
                this.commonUtilProvider.callRestServiceTLPrompt(requestM).then(
                  (res)=>{
                    
                    this.syncUPQuotation();

                  },
                  (err)=> {
                    console.log(JSON.stringify(err));
                  }
                );
              }
            },
            (err)=> {
              console.log(JSON.stringify(err));
            }
          );
        }
        else {
          this.callwsReqRef();
        }
      });
    }
  }

  public syncUPQuotation() {
        let objM: QuotationModel = new QuotationModel();
        objM.customerid = this.genQuoModel.customerid;
        objM.quotationno = this.genQuoModel.quotationno;

        let objMs: Array<QuotationModel> = [];
        objMs.push(objM);
        
        let requestM: RequestModel = new RequestModel();
        requestM.functionName = FunctionName.QUOTATION;
        requestM.serviceName = ServiceName.SELECT;
        requestM.param = objMs;
        requestM.searchkey = "SEARCH_BY";
        this.apiDbProvider.quotationService(requestM).then(
          (res)=> {
            if (res["size"] > 0) {
              requestM = new RequestModel();
              requestM.functionName = FunctionName.QUOTATION;
              requestM.serviceName = ServiceName.INSERT;
              requestM.param = res["data"];
              this.commonUtilProvider.callRestServiceTLPrompt(requestM).then(
                (res)=>{
                  this.callwsReqRef();
                },
                (err)=> {
                  console.log(JSON.stringify(err));
                }
              );
            }
          },
          (err)=> {
            console.log(JSON.stringify(err));
          }
        );
  }

  async callwsReqRef() {

    let mode: number = this.apiProvider.getTLPromptMode();
    if (mode == 0) {

      let quotationMs: Array<QuotationModel> = [];
      
      let quotationM: QuotationModel = new QuotationModel();
      quotationM.customerid = this.genQuoModel.customerid;
      quotationM.quotationno = this.genQuoModel.quotationno;

      quotationMs.push(quotationM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.QUOTATION;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = quotationMs;
      reqM.searchkey = 'SEARCH_BY';
      let resM: any = await this.apiDbProvider.quotationService(reqM);
      if (1 == Number(resM['size'])) {

        await this.storage.get('loginProfile').then(async profile => {
          reqM = new RequestModel();
          reqM.agentid = profile.agentid;
          reqM.functionName = FunctionName.QUOTATION;
          reqM.serviceName = ServiceName.UPDATE;
          reqM.param = resM['data'];
          await this.commonUtilProvider.callRestServiceTLPrompt(reqM).then(
            (res)=> {},
            (err)=> {
              console.log('err : ' + JSON.stringify(err));
            }
          );
        });

      }

    }

    this.storage.get('loginProfile').then(async profile => {

      let loading = this.loading.scopePresent();
      this.genQuoModel.flag = '2';

      let reqModel: RequestModel = new RequestModel();
      reqModel.agentid = profile.agentid;
      reqModel.mode = mode;
      reqModel.functionName = FunctionName.GENERATE_QUOTATION;
      reqModel.param = [this.genQuoModel];
      this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
        (res: any) => {

          this.genQuoModel.referenceNo = res.datas[0].referenceNo;
          this.pageTotal = res.pageTotal;
          this.refFlag = true;
          if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {

            this.dataToJson = res.datas[0].binaryQuotationPDF;
            this.pdfName = res.datas[0].pdfFileName;
            this.genQuoModel.timesend = this.pdfName;
            this.quotation.pdfpath = this.pdfName+this.pdfLanguage;
            this.quotation.referenceno = res.datas[0].referenceNo;
            this.quotation.pdflang = this.pdfLanguage;
            this.quotation.status = 'R'

            this.updateRefno(mode, res.datas[0].referenceNo, this.pdfName+this.pdfLanguage);  

            if (res.datas[0].alfrescoid != undefined)
              
              this.quotation.alfrescoid = res.datas[0].alfrescoid;
              this.genQuoModel.quotationStatus = 'R';
              this.lockPdfLanguage();

              this.genQuoModel.quotationno;
              this.genQuoModel.customerid;
              res.datas[0].referenceNo;
          } 
          else {
            this.dataToJson = [];
          }

          this.pdfSrc = 'data:application/pdf;base64,' + this.dataToJson;
          this.generateIFrameUrl(this.pdfSrc);
          this.loading.scopeDismiss(loading);
        },
        (err) => {
          this.loading.scopeDismiss(loading);
          this.alertCtrl.error(err);
        } 
      );
    });

  }

  public updateRefno(mode: number, refno, pdfpath) {

    if (0 == mode) {

      let objM: QuotationModel = new QuotationModel();
      objM.customerid = this.genQuoModel.customerid;
      objM.quotationno = this.genQuoModel.quotationno;
      objM.pdflang = this.pdfLanguage;
      objM.status = this.quotation.status = 'R'
      objM.referenceno = refno;
      objM.pdfpath = pdfpath;

      let objMs: Array<QuotationModel> = [];
      objMs.push(objM); 
      
      let requestM: RequestModel = new RequestModel();
      requestM.functionName = FunctionName.QUOTATION;
      requestM.serviceName = ServiceName.UPDATE;
      requestM.param = objMs;
      requestM.searchkey = "REF_NO";
      this.apiDbProvider.quotationService(requestM).then();
      
    }
  }

  signature() {
    this.genQuoModel['pageTotal'] = this.pageTotal;
    let modal = this.modalCtrl.create(ConditionSignatureComponent, this.genQuoModel);
    modal.present();
    this.event.subscribe('quatation-signature-form', (data) => {
      this.storage.get('tlpromptMode').then(async mode => {
        this.storage.get('loginProfile').then(async profile => {
          let loading = this.loading.scopePresent();
          this.genQuoModel.flag = '3';
          let customerSignature: string = data.signsData[1];
          let agentSignature: string = data.signsData[2];
          this.genQuoModel.binaryCustomerSignature = customerSignature.replace('data:image/png;base64,', '');
          this.genQuoModel.binaryAgentSignature = agentSignature.replace('data:image/png;base64,', '');
          delete this.genQuoModel['opts']; // ลบ opts ที่ติดมาจากการใช้ modal
          delete this.genQuoModel['pageTotal']; // ลบ pageTotal ออกก่อนส่งให้ service
          let reqModel: RequestModel = new RequestModel();
          reqModel.agentid = profile.agentid;
          reqModel.mode = mode;
          reqModel.functionName = FunctionName.GENERATE_QUOTATION;
          reqModel.param = [this.genQuoModel];
          this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
            (res: any) => {

              console.log("X 3 ==> " + JSON.stringify(this.genQuoModel));
              console.log("X 4 ==> " + JSON.stringify(res));

              this.genQuoModel.referenceNo = res.datas[0].referenceNo;
              this.signFlag = data.signFlag;
              this.pageTotal = res.pageTotal;
              if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
                this.dataToJson = res.datas[0].binaryQuotationPDF;
                this.pdfName = res.datas[0].pdfFileName;
                this.genQuoModel.timesend = this.pdfName;
                this.quotation.pdfpath = this.pdfName+this.pdfLanguage;
                this.quotation.referenceno = res.datas[0].referenceNo;
                this.quotation.pdflang = this.pdfLanguage;
                this.quotation.status = 'S';
                this.genQuoModel.quotationStatus = 'S';
                if(res.datas[0].alfrescoid != undefined)
                  this.quotation.alfrescoid = res.datas[0].alfrescoid;
                // this.broadcaster.broadcast('quatation', this.quotation);
                console.log('res ----------------------------------> '+this.pdfName);
              } else {
                this.dataToJson = [];
              }
              this.pdfSrc = 'data:application/pdf;base64,' + this.dataToJson;
              this.generateIFrameUrl(this.pdfSrc);
              this.loading.scopeDismiss(loading);
            },
            (err) => {
              this.loading.scopeDismiss(loading);
              this.alertCtrl.error(err);
            }
          );
        });
      });
      this.event.unsubscribe('quatation-signature-form');
    });
  }

  public sendEmail() : void {
  
    // http://13.228.150.198:8280/tlprompt/sendMailService/1.0
    if(this.openPdfFrom == 'quotation'){
      this.sendEmailQuotation();
    }
    else if(this.openPdfFrom == 'application'){
      this.sendEmailApplication();
    }
  }
  private sendEmailQuotation() : void{
    this.storage.get('loginProfile').then(async profile => {
      let senderName : string = profile.fName+" "+profile.lName;
      if(this.pdfLanguage == 'E'){
        let textNull = "NULL";
        let str = profile.fNameE+" "+profile.lNameE;
        if (str.search(textNull) == -1) { 
          senderName = str;
        }else 
        senderName = ""; 
      }
      let senderEmail : string = profile.email;
      let receiver : string = '';
      if(this.prospect != undefined)
        receiver = this.prospect.email == null ? "" : this.prospect.email;
      // senderEmail = "";
      // receiver = "";
      
      // let en = new EnvironmentType();
      // switch (en.getModeType()) {

      //   case Environment.LOCAL: {
      //     senderEmail = "warorot.som@thailife.com";
      //     receiver = "";
      //     break;
      //   }
      //   case Environment.SIT: {
      //     senderEmail = "warorot.som@thailife.com";
      //     receiver = "";
      //     break;
      //   }
      //   case Environment.DEV: {
      //     senderEmail = "warorot.som@thailife.com";
      //     receiver = "";
      //     break;
      //   }
      // }
      let dataInput : object = {
        senderName,
        senderEmail,
        receiver
      };

      let modal = this.modalCtrl.create(SendEmailComponent, dataInput);
      modal.present();
      
      modal.onDidDismiss(async data => {
        if (data != null) {
          const {
            emailTitle,
            emailContent,
            senderEmail,
            receiver,
            receiverCC
          } = data;
          let loading = this.loading.scopePresent();

          // เตรียมไฟล์
          let sendEmailFileM : SendEmailFileM = new SendEmailFileM();
          sendEmailFileM = {
            ...sendEmailFileM,
            binaryOfFile: this.pdfSrc.replace('data:application/pdf;base64,', ''),
            fileName: 'quotation.pdf'
          }

          let sendEmailM : SendEmailM = new SendEmailM();
          sendEmailM = {
            ...sendEmailM,
            subject: emailTitle,
            content: emailContent,
            senderName: SENDERNAME,
            from: FROM,
            to: receiver === '' ? [] : [receiver],
            replyto: senderEmail,
            cc: receiverCC === '' ? [] : [receiverCC],
            filesSend: [sendEmailFileM]
          }
          
          await this.sendEmailFunc(sendEmailM);
          this.loading.scopeDismiss(loading);
        }
      });
    });
  }

  private sendEmailApplication(){
    this.storage.get('loginProfile').then(async profile => {
      const {
        fName,
        lName,
        fNameE,
        lNameE,
        email
      } = profile
      
      // ชื่อภาษาไทย
      let senderName : string = `${fName} ${lName}`;
      
      if (this.pdfLanguage == 'E') {
        const textNull = "NULL";
        // ชื่อภาษาอังกฤษ
        const str = `${fNameE} ${lNameE}`;
        if (str.search(textNull) == -1)
          senderName = str;
      }
      
      //เตรียมค่าให้ Form ใน Modal
      let dataInput : object = {
        senderName,
        senderEmail : email,
        receiver : ''
      };
      let modal = this.modalCtrl.create(SendEmailComponent, dataInput);
      modal.present();
      
      modal.onDidDismiss(async data => {
        if (data != null) {
          const {
            emailTitle,
            emailContent,
            senderEmail,
            receiver,
            receiverCC
          } = data;
          let loading = this.loading.scopePresent();
          
          let sendEmailM : SendEmailM = new SendEmailM();
          let sendEmailFileM : SendEmailFileM = new SendEmailFileM();
          
          sendEmailFileM = {
            ...sendEmailFileM,
            binaryOfFile: this.pdfSrc.replace('data:application/pdf;base64,', ''),
            fileName: 'application.pdf'
          }

          sendEmailM = {
            ...sendEmailM,
            subject: emailTitle,
            content: emailContent,
            senderName: SENDERNAME,
            from: FROM,
            to: receiver === '' ? [] : [receiver],
            replyto: senderEmail,
            cc: receiverCC === '' ? [] : [receiverCC],
            filesSend: [sendEmailFileM]
          }

          await this.sendEmailFunc(sendEmailM);
          this.loading.scopeDismiss(loading);
        }
      });
    });
  }

  private async sendEmailFunc(sendEmailM : SendEmailM)
  {
    const { SEND_EMAIL } = FunctionName;
    let reqM: RequestModel = new RequestModel();
    reqM = {
      ...reqM,
      functionName: SEND_EMAIL,
      param: [sendEmailM]
    };

    await this.apiProvider.callData(reqM).then(
      async (res) => {
        console.log(JSON.stringify(res));
        // {"data":[{"fileName":"quotation.pdf","binaryOfFile":"Send success"}],"size":1,"status":0}
        let data : Array<any> = res['data'];
        if (data.length > 0) {
          if (data[0].binaryOfFile === "Send success")
            this.alertCtrl.warning("ส่ง e-mail สำเร็จ");
          else
            this.alertCtrl.warning("เกิดข้อผิดพลาดไม่สามารถส่ง e-mail ได้");
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.alertCtrl.warning("เกิดข้อผิดพลาดไม่สามารถส่ง e-mail ได้");
      }
    );
  }

  generatePdfDownloadUrl(pdfSrc) {
    // return this.sanitizer.bypassSecurityTrustUrl(pdfSrc);
    // console.log("555");
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfSrc);
  }

  generateIFrameUrl(pdfSrc) {
    if (pdfSrc) {
      const pdfSrcChunk = pdfSrc.split(',');
      this.pdfSrcBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.b64toBlob(pdfSrcChunk[1], 'application/pdf')));
      this.pdfUrlDownload = this.sanitizer.bypassSecurityTrustResourceUrl(pdfSrc);
    } else {
      this.pdfUrlDownload = null;
      return null;
    }
  }

  async print() {
    // const objFra = document.getElementById('test');
    // objFra['contentWindow'].focus();
    // objFra['contentWindow'].window.print();

    try {
      const objFra = document.getElementById('test');
      objFra['contentWindow'].focus();
      objFra['contentWindow'].window.print();
      //window.frames['test'].window.focus();
      //window.frames['test'].window.print();
    } catch (error) {
      let pr = window.open(this.pdfSrc);
      //pr.print();
      //pr.close();
    }
    if(this.userID != ''){
      let objM: QuotationprintlogM = new QuotationprintlogM();
      objM.devicerefno = '1234';//this.pdfName;//Require = Y
      objM.referenceno = this.pdfName;//Require = Y
      objM.logdate = DateUtil.date2str(new Date());//Require = Y
      //objM.seq = "1";//Require = Y
      objM.userid = this.userID;//Require = Y
      objM.usertype = this.userType;//Require = Y
      await this.storage.get('loginProfile').then(profile => {
        if(typeof(profile.ou) !== 'undefined'){
          let b = profile.ou.split('bra');
          if(b.length == 2){
            objM.branchcode = b[1];
            objM.branchname = profile.branchname;
            
          }else{
            objM.branchcode = '';
            objM.branchname = '';
          }
        }else{
          objM.branchcode = '';
          objM.branchname = '';
        }
          //objM.branchcode = profile.ou;
      });
     
      let objMs: Array<QuotationprintlogM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.QUOTATION_PRINTLOG;
      reqM.serviceName = ServiceName.INSERT;
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          console.log("--------------------------------> "+JSON.stringify(res));
        },
        (err) => {
          console.log('err : ', err);
        }
      );
    }
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }

  private async basicVerifyApp(){

    this.loading.present();

    let isAllowCheckPreUW: boolean = true;
    let applicationM: any = this.appData.getApplicationMasterM();
   // console.log('xXx applicationM = ', applicationM);

    if (applicationM != undefined) {
      const mcaapplicationM = applicationM['mcaapplicationM'];
     
      if ('P' != mcaapplicationM.publishstatus)
        isAllowCheckPreUW = false;

      if (ConstantConfig.appstatusSubmitDone.indexOf(mcaapplicationM.applicationstatus) > -1)
        isAllowCheckPreUW = false;
    }
    else {
      isAllowCheckPreUW = false;
    }

    //console.log('xXx isAllowCheckPreUW = ', isAllowCheckPreUW);
    if (!isAllowCheckPreUW) {
      this.loading.dismiss();
      this.alertCtrl.warning('ไม่สามารถดำเนินการได้');
      this.disabledBasicVerify = false;
      return false;
    }

    const quotationData = this.appData.getQuotation();

    /**
     * ตรวจสอบแบบประกันที่สามารถทำ EAPP ได้
     */
    let isPlanforEAPP: string = 'FALSE';

    if (!this.platform.is('core') && !this.platform.is('mobileweb')) {

      let param: any = [{
        'plancode' : quotationData.plancode
      }];
  
      let reqMs: RequestModel = new RequestModel();
      reqMs.serviceName = ServiceName.SELECT;
      reqMs.functionName = FunctionName.EAPPPLAN;
      reqMs.searchkey = 'plancode';
      reqMs.param = param;
      let res: any = await this.apiProvider.callData(reqMs);
      
      if (res['status'] == '0' && res['size'] == '1') {
        isPlanforEAPP = 'TRUE';
      }
    
    }

    /**
     * ตรวจสอบ Pre UW โดยระบบ TLPROMPT
     */
    
    let objM: ConditionPreUnderwriteM = new ConditionPreUnderwriteM();
    objM.firstName = quotationData.fname;
    objM.idNo = quotationData.citizenid;
    objM.lastName = quotationData.lname;
    objM.mode = "1";
    let today = moment(new Date()).format('YYYY-MM-DD');
    let day = today.substring(8, 10);
    let month = today.substring(5, 7);
    let year = Number(today.substring(0,4))+543;
    objM.payDate = year+month+day; //for test
    objM.planCode = quotationData.plancode;
    objM.policyType = "O";
    objM.premium = quotationData.lifepremium;
    objM.sum = quotationData.lifesum;
    objM.applicationid = this.appData.getApplicationId();

    let objMs: Array<ConditionPreUnderwriteM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.APPLICATION_CHECKCONDITION;
    reqM.param = objMs;

    this.apiProvider.callData(reqM).then(
      (res) => {
        this.loading.dismiss();

        //this.viewCtrl.dismiss();
        if (res["data"][0] != undefined && res["data"].length > 0) {

          let msg: string = res["data"][0].responsemessage;
          let msgcode: string = res["data"][0].responsecode;

          let preUWStatusM: PreUWStatusM = new PreUWStatusM();
          preUWStatusM.msg = msg;
          preUWStatusM.msgcode = msgcode;
          preUWStatusM.isPlanforEAPP = isPlanforEAPP;
          this.appData.setPreUWStatusM(preUWStatusM);
            
          let modal = this.modalCtrl.create(BasicVerifyAppModalComponent, 
            {'msg' : msg, 'msgcode' : msgcode, 'isplaneapp' : isPlanforEAPP}
          );
          
          modal.present(); 
          modal.onDidDismiss(data => {
            if (data != null) {

              if (data.closeToPage != undefined && 'AppFormEAppPage' === data.closeToPage) {
                
                this.navCtrl.pop().then((res) => {
                  this.navCtrl.push("AppFormEAppPage");
                });

              }
              else if (data.closeToPage != undefined && 'AppFormPage' === data.closeToPage) {

                this.navCtrl.pop().then((res) => {
                  this.navCtrl.setRoot("AppFormPage");
                });

              }
              else {
                this.loading.present();
                let objM: ApplicationpdfM = new ApplicationpdfM();
                objM.applicationid = data.applicationid;//Require = Y
                objM.saveAlfrescoStatus = 'sendToBranch'; // uncomment after deploy api
                let objMs: Array<ApplicationpdfM> = [];
                objMs.push(objM);
                
                let reqM: RequestModel = new RequestModel();
                reqM.functionName = FunctionName.APPLICATION_PDF_ALFRESCO;
                reqM.param = objMs; 
                
                this.apiProvider.callData(reqM).then(
                  async (res) => {

                      let obj :any = res;
                      let resModel :ResponseModel = obj;
                      const pdfData = "data:application/pdf;base64," + resModel.data[0].binaryQuotationPDF;
              
                      let data = { src: pdfData, fromAppDetail : true, fromBasicVerify : true, 'closeToPage' : 'AppFormPage'};

                      this.navCtrl.pop().then((res) => {
                        
                        this.navCtrl.setRoot(PdfPage, data).then(() => {
                          this.loading.dismiss();
                        });

                      });

                  }, async (err) => {
                    this.loading.dismiss();
                    this.alertCtrl.error(err);
                  }
                );
              }
            }
            else {
              this.close();
            }
          });
        }
        else {
          this.alertCtrl.warning('ระบบ Pre UW ขัดข้อง');
        }
      },
      (err) => {
        console.log('Error Call ConditionPreUnderwriteM : ', err);
        this.loading.dismiss();
        this.alertCtrl.warning('ระบบ Pre UW ขัดข้อง');
      }
      
    );

  }

  private createApplication() {
    // console.log('createApplication this.quotation : ', JSON.stringify(this.quotation));
    if(this.quotation.typeapp == 'PER'){
      this.loading.present();
        this.storage.get('tlpromptMode').then(mode => {
  
          let objM: QuotationModel = new QuotationModel();
          objM.agentid = this.quotation.agentid;
          objM.customerid = this.quotation.customerid;
          objM.quotationno = this.quotation.quotationno;
      
          let objMs: Array<QuotationModel> = [];
          objMs.push(objM);
      
          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.QUOTATION;
          reqM.serviceName = ServiceName.SELECT;
          reqM.param = objMs;
          reqM.mode = mode;
              
          this.apiProvider.callData(reqM).then(
            (res) => {
              let obj :any = res;
              let resModel :ResponseModel = obj;
      
              if(resModel.size > 0 && resModel.data.length > 0){
  
                console.log('createApplication Call Quatation', resModel.data[0]);
                this.appData.setQuotation(resModel.data[0]);
                this.navCtrl.setRoot('AppApplicationPage').then(() => {
                  this.loading.dismiss();
                });
              }
      
            },
            (err) => {
              this.loading.dismiss();
              this.alertCtrl.error(err);
            }
          );
  
  
        });
    }else{
      this.alertCtrl.warning('ระบบไม่สามารถสร้างใบคำขอของแบบประกันที่ไม่ใช่รายงวดได้');
    }
    // let type : string = this.quotationData.typeApp(this.planCode);
    // if(type == 'PER'){
    //   this.loading.present();

    //   this.storage.get('tlpromptMode').then(mode => {

    //     let objM: QuotationModel = new QuotationModel();
    //     objM.agentid = this.quotation.agentid;
    //     objM.customerid = this.quotation.customerid;
    //     objM.quotationno = this.quotation.quotationno;
    
    //     let objMs: Array<QuotationModel> = [];
    //     objMs.push(objM);
    
    //     let reqM: RequestModel = new RequestModel();
    //     reqM.functionName = FunctionName.QUOTATION;
    //     reqM.serviceName = ServiceName.SELECT;
    //     reqM.param = objMs;
    //     reqM.mode = mode;
            
    //     this.apiProvider.callData(reqM).then(
    //       (res) => {
    //         let obj :any = res;
    //         let resModel :ResponseModel = obj;
    
    //         if(resModel.size > 0 && resModel.data.length > 0){

    //           console.log('createApplication Call Quatation', resModel.data[0]);
    //           this.appData.setQuotation(resModel.data[0]);
    //           this.navCtrl.setRoot('AppApplicationPage').then(() => {
    //             this.loading.dismiss();
    //           });
    //         }
    
    //       },
    //       (err) => {
    //         this.loading.dismiss();
    //         this.alertCtrl.error(err);
    //       }
    //     );


    //   });
    // }
    // else{
    //   this.alertCtrl.warning('ระบบไม่สามารถสร้างใบคำขอของแบบประกันที่ไม่ใช่รายงวดได้');
    // }
  }

  private downloadFile = ()=>{
    this.genfilename()
    if(this.platform.is('ios') && (this.modeCheck == 1 || this.modeCheck == 0)){
      fetch(this.pdfSrc,
        {
          method: "GET"
        }).then(res => res.blob()).then(blob => {
          let url : any;
          //this.file.writeFile(this.file.syncedDataDirectory, this.pdfName+'.pdf', blob, { replace: true }).then(res => {
          this.file.writeFile(this.file.syncedDataDirectory, this.downloadpdfFilename, blob, { replace: true }).then(res => {
              setTimeout(() => {
                this.fileOpener.open(
                  res.nativeURL,
                  'application/pdf',
                )
              }, 500);
            }).catch(err => {

            });
        }).catch(err => {
      });
    }
    else if(this.platform.is('android') && (this.modeCheck == 1 || this.modeCheck == 0)){
      fetch(this.pdfSrc,
        {
          method: "GET"
        }).then(res => res.blob()).then(blob => {
          //this.file.writeFile(this.file.externalApplicationStorageDirectory, this.pdfName+'.pdf', blob, { replace: true }).then(res => {
          this.file.writeFile(this.file.externalApplicationStorageDirectory, this.downloadpdfFilename, blob, { replace: true }).then(res => {
              this.fileOpener.open(
                res.toInternalURL(),
                'application/pdf'
              ).then((res) => {
              }).catch(err => {
              });
            }).catch(err => {
          });
        }).catch(err => {
      });
    }
  }

  private zoomIn()
	{
    if(this.pdfZoom < MAX_ZOOM){
      this.pdfZoom += ZOOM_STEP;
    }
		
	}

	private zoomOut()
	{
		if (this.pdfZoom > MIN_ZOOM) {
			this.pdfZoom -= ZOOM_STEP;
		}
	}

	private resetZoom()
	{
		this.pdfZoom = DEFAULT_ZOOM;
	}
}
