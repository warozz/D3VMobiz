import { UnitlinkDataProvider } from './../../providers/ulink-app-data/unitlink-data';
import { async } from 'rxjs/scheduler/async';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { Component, HostBinding } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { PopupLostConnectionComponent } from '../../components/utility/popup-lost-connection/popup-lost-connection';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { UniversalLifePdfModel } from '../../providers/universal-life-data/universal-life-pdf-model';
import { RequestModel } from '../../providers/model/request-model';
import { FunctionName } from '../../providers/constants/function-name';
import { CommonUtilProvider } from '../../providers/common-util/common-util';
import { Broadcaster } from '../../providers/utility/broadcaster';
import { UniversalLifeDataProvider } from '../../providers/universal-life-data/universal-life-data';
import { SendEmailComponent } from '../../components/form/send-email/send-email';
import { SendEmailM } from '../../providers/send-email/send-email';
import { SendEmailFileM } from '../../providers/send-email/send-email-file';
import { ApiProvider } from '../../providers/api/api';
import { ProspectModel } from '../../providers/prospect/prospect-model';
import { DomSanitizer } from '@angular/platform-browser';
import { DateUtil } from '../../providers/utility/date-util';
import { ServiceName } from '../../providers/constants/service-name';
import { QuotationprintlogM } from '../../providers/service-table/quotationprintlog-model';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { checkPersonalID } from '../../providers/utility/id-util';
import { ValidateProvider } from '../../providers/validate/validate';
import { QuotationPdfUtil } from '../../providers/quotation/quotation-pdf-util';
import { RiderConfig } from '../../providers/rider/rider-config';
import { EMAIL } from "./../../providers/constants/app-config";


const ZOOM_STEP:number = 0.25;
const DEFAULT_ZOOM:number = 1;
const MAX_ZOOM:number = 2;
const MIN_ZOOM:number = 0.25;
const { FROM, SENDERNAME } = EMAIL;

@IonicPage()
@Component({
  selector: 'page-pdf-viewdata',
  templateUrl: 'pdf-viewdata.html',
})
export class PdfViewdataPage {

  private version: string;
  private tlpromptMode = 'normal';

  private pdfSrc: any = '';
  /** เก็บ url สำหรับ download */
  private pdfUrlDownload = null;
  private pdfSrcBase64 = null;

  private prospect: ProspectModel;
  private userID : string = "";
  private userType : string = "";

  private pdfName : string = "";
  private fromAppDetail: boolean = false;
  private fromBasicVerify: boolean = false;

  private roleType : boolean = true; // ถ้าเป็น agent ให้ show
 
  private subscription: Array<Subscription> = [];

  private haveRef: boolean = false;
  private showReqRefButton: boolean = false;

  private callPdfData: UniversalLifePdfModel;

  private dataToJson;
  private pageTotal : number;

  private unitlinkPdf: any;

  private pdfZoom:number = DEFAULT_ZOOM;
  
  private modeCheck =  0;
    /**
   * ชื่อ file pdf สำหรับ download 
   */
  private downloadpdfFilename:string = "download.pdf";
  private downloadCode:string ='';
  private quotationPdfUtil : QuotationPdfUtil;

  @HostBinding('class') private className: string = 'page-header-default';
  viewPdfOnly: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertDirective,
    private viewCtrl: ViewController,
    private network: Network,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingDirective,
    private commonUtilProvider: CommonUtilProvider,
    private broadcaster: Broadcaster,
    private universalLifeData: UniversalLifeDataProvider,
    private unitLinkData: UnitlinkDataProvider,
    private apiProvider: ApiProvider,
    private sanitizer:DomSanitizer,
    private fileOpener : FileOpener,
    private platform: Platform,
    private file : File,
    private unitlinkData: UnitlinkDataProvider,
    private validator: ValidateProvider,
    private conf : RiderConfig,
  ) {
    this.quotationPdfUtil = new QuotationPdfUtil(this.storage, this.conf);
   
    this.storage.get('version').then(version => {
      this.version = 'V.' + version;
    });

    this.storage.get('tlpromptMode').then(mode => {
      if (mode == 0)
        this.tlpromptMode = 'mini';

        this.modeCheck = mode;
    });
    this.getLoginProfile();

    if(typeof this.navParams.data.planCode != 'undefined'){
      this.downloadCode = this.navParams.data.planCode;
      this.genfilename();
    }

    if(typeof this.navParams.data.pdfDetail != 'undefined') {
      this.pdfSrc = this.navParams.data.pdfDetail.src;
      this.pageTotal = this.navParams.data.pdfDetail.pageTotal;
      this.pdfName = this.navParams.data.pdfDetail.pdfFileName;
      this.generateIFrameUrl(this.pdfSrc);

      this.viewPdfOnly = true;
    }

    if(typeof this.navParams.data.showReqRefButton != 'undefined'){
      this.showReqRefButton = this.navParams.data.showReqRefButton;
    }
    if(typeof this.navParams.data.callPdfData != 'undefined'){
      this.callPdfData = this.navParams.data.callPdfData;
    console.log('this.callPdfData.refNo :>>> ',this.callPdfData.refNo)
      
      this.showReqRefButton = this.callPdfData.refNo == ''? true: false;
      console.log('this is ref No : > ',this.showReqRefButton)
    }

    if(this.viewPdfOnly) {
      if(!this.navParams.data.unitlinkPdf){
        this.prospect = this.universalLifeData.prospect;
      }
      else{
        this.prospect = this.unitLinkData.prospect;
      }
    }

    if(this.navParams.data.unitlinkPdf){
      this.unitlinkPdf = true
    }else{
      this.unitlinkPdf = false
    }
    console.log('this.navParams.data.unitlinkPdf start :', this.navParams.data.unitlinkPdf)
    console.log('unitlinkPdf start :',this.unitlinkPdf)
    console.log('callPdfData start :',this.callPdfData)

    console.log('showReqRefButton start :',this.showReqRefButton)
    console.log('haveRef start :',this.haveRef)

  }
  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
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
  async getLoginProfile(){
    await this.storage.get('loginProfile').then(async profile => {
      this.roleType = profile.roleType == 'agent';
      this.userType = profile.roleType;
      if(profile.roleType == 'employee'){
        this.userID = profile.pid.replace("-", "");
        if(this.userID == ''){
          this.userID = profile.agentid.replace("-", "");
        }
       
      }
      else{
        this.userID = profile.agentid;
        
      }
    });
  }
  // async ngOnInit() {
  //   await this.storage.get('tlpromptMode').then(async mode => {
  //     await this.storage.get('loginProfile').then(async profile => {
  //       let loading = this.loadingCtrl.scopePresent();
  //       // await this.universalLifeData.saveDataFromPDFPage();
  //       console.log("ul --> ", this.universalLifeData.quotationul);

  //       this.userID = profile.agentid;
  //       this.userType = profile.roleType;

  //       this.callPdfData.aorb = "B";
  //       this.callPdfData.flag = "1";
  //       if(this.universalLifeData.quotationul != undefined) {
  //         this.callPdfData.quotationStatus = this.universalLifeData.quotationul['status'];
  //         this.callPdfData.quotationno = this.universalLifeData.quotationul['quotationno']; 
  //         this.callPdfData.customerid = this.universalLifeData.prospect['customerID'];
  
  //         if(this.callPdfData.quotationStatus == 'R') {
  //           alert("A");
  //           this.callPdfData.aorb = "A";
  //           this.callPdfData.flag = "2";
  //         }
  //       }
  //       let reqModel: RequestModel = new RequestModel();
  //       reqModel.agentid = profile.agentid;
  //       reqModel.mode = mode;
  //       reqModel.functionName = FunctionName.UNIVERSAL_LIFE_PDF;
  //       reqModel.param = [this.callPdfData];
  //       this.pageTotal = 0;
  //       this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
  //         (res: any) => {
  //           let binary: string;
  //           this.pageTotal = res.pageTotal;
  //           if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
  //               this.dataToJson = res.datas[0].binaryQuotationPDF;
  //               this.pdfName = res.datas[0].pdfFileName;
  //               // this.callPdfData.timesend = res.datas[0].pdfFileName;
  //               console.log('res ----------------------------------> '+this.pdfName);
  //               //alert(this.pdfName);
  //           }
  //           else {
  //               this.dataToJson = [];
  //           }
  //           this.pdfSrc = 'data:application/pdf;base64,' + this.dataToJson;
  //           this.generateIFrameUrl(this.pdfSrc);
  //           this.loadingCtrl.scopeDismiss(loading);
  //         },
  //         (err) => {
  //           this.loadingCtrl.scopeDismiss(loading);
  //           this.alertCtrl.error(err);
  //         }
  //       );
  //     });
  //   });
  // }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;

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

  private downloadFile = ()=>{
    this.genfilename();
    if(this.platform.is('ios')){

      //alert("start"); 
      fetch(this.pdfSrc,
        {
          method: "GET"
        }).then(res => res.blob()).then(blob => {
          //alert("start"+blob); 
          let url : any;
          this.file.writeFile(this.file.syncedDataDirectory, this.downloadpdfFilename, blob, { replace: true }).then(res => {
              //alert("nn >>> "+JSON.stringify(res));
              setTimeout(() => {
                this.fileOpener.open(
                  res.nativeURL,
                  'application/pdf',
                )
              }, 500);
            }).catch(err => {
              //alert("catch "+err); 
            });
        }).catch(err => {
               //alert("catch2 "+err); 
        });
     
        //alert("catch3 "); 

    }else if(this.platform.is('android')){
      //alert("android");
      fetch(this.pdfSrc,
        {
          method: "GET"
        }).then(res => res.blob()).then(blob => {
          this.file.writeFile(this.file.externalApplicationStorageDirectory, this.downloadpdfFilename, blob, { replace: true }).then(res => {
              //alert(JSON.stringify(res));
              this.fileOpener.open(
                res.toInternalURL(),
                'application/pdf'
              ).then((res) => {
                //alert("success "+res);
              }).catch(err => {
                //alert("err show "+JSON.stringify(err));
              });
            }).catch(err => {
              //alert("catch "+err); 
          });
        }).catch(err => {
               //alert("catch2 "+err); 
        });
    }
  }

  generatePdfDownloadUrl(pdfSrc) {
    // return this.sanitizer.bypassSecurityTrustUrl(pdfSrc);
    // console.log("555");
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfSrc);
  }

  private checkReqRef() {
    if(this.unitlinkPdf){
      this.unitlinkReqRef()
    }else{
      this.reqRef()
    }
    

  }

  private unitlinkReqRef() {
    console.log('unitlinkReqPdf func')
    this.loadingCtrl.present();

    const validateResult = this.validateData();

    if(!validateResult){
      this.loadingCtrl.dismiss();
    }
    else {

      this.storage.get('tlpromptMode').then(async mode => {
        this.storage.get('loginProfile').then(async profile => {

          await this.unitlinkPlanSelect(this.unitlinkData.insuranceType);

           await this.unitlinkData.saveDataFromPDFPage();

          console.log('this.unitlinkData.quotationul --->', this.unitlinkData.quotationul);
          
          this.callPdfData.flag = "2";
          this.callPdfData.quotationStatus = this.unitlinkData.quotationul.status;
          this.callPdfData.quotationno = this.unitlinkData.quotationul.quotationno; 
          this.callPdfData.customerid = this.unitlinkData.prospect.customerID;
          


          let reqModel: RequestModel = new RequestModel();
          reqModel.agentid = profile.agentid;
          reqModel.mode = mode;
          reqModel.functionName = FunctionName.UNITLINKPDF;
          reqModel.param = [this.callPdfData];

          console.log('request Data PDF reqModel:--->', reqModel);

          this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
            (res: any) => {
  
              
              if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
                const rawdata = res.datas[0].binaryQuotationPDF;
                const referenceNo = res.datas[0].referenceNo;
                this.pdfName = res.datas[0].pdfFileName;
                this.pageTotal = res.pageTotal;
                
                this.callPdfData.refNo = referenceNo;
                this.unitlinkData.quotationul['status'] = 'R';
                this.unitlinkData.quotationul['referenceno'] = referenceNo;
                this.unitlinkData.quotationul.pdflang = 'T';
                this.unitlinkData.quotationul.pdfpath = this.pdfName;

                this.showReqRefButton = false;
                this.haveRef = true;

                console.log('response REQ REF --> ', res);

                const pdfData = "data:application/pdf;base64," + rawdata;
                this.pdfSrc = pdfData;
                this.generateIFrameUrl(this.pdfSrc);
                this.broadcaster.broadcast('old_quotation_data', this.callPdfData);

              }
              else{
              console.log("No PDF File");
              this.alertCtrl.warning("เกิดข้อผิดพลาดของระบบ");
              } 
  
              
              this.loadingCtrl.dismiss();
  
            },
            (err) => {
              console.log("Call Service PDF Error : ", err);
              this.alertCtrl.warning("เกิดข้อผิดพลาดของระบบ");
              this.loadingCtrl.dismiss();
            }
          );

        });
      });
    }
  }

  private unitlinkPlanSelect (plancode : string) { 
    console.log('unitlinkPlanSelect func')

    console.log("plancode==" + plancode);

    let reqModel: RequestModel = new RequestModel();
    reqModel.functionName = FunctionName.ULPLAN;
    reqModel.serviceName = ServiceName.SELECT;
    this.apiProvider.callData(reqModel).then((res: any)  => {
        console.log('res : ',res);
        if (res.data.length > 0) {
          let planAll = res.data;


          let result : Array<any> = planAll;
          let data : Array<any> = result.filter((item,index)=>{
              return item.plancode.indexOf(plancode) > -1
          }); 
          console.log("ulplan data stringify >> "+JSON.stringify(data) + " data=" + data.length);
          if(data.length > 0){
            let uldetail: Array<any> = data;
      
      
            console.log("ulplan data stringify >> "+JSON.stringify(data) + " plancode ==" + uldetail[0].plancode  + " data ==" + data[0].plancode);
            this.unitlinkData.paytype =  data[0].paytype;
            this.unitlinkData.payyear = data[0].ppayyear;
            this.unitlinkData.edowntype = data[0].endowmenttype;
            this.unitlinkData.edownyear = data[0].pendowmentyear;
            this.unitlinkData.insuranceName = "["+data[0].plancode + "]" +data[0].planname;
          }


        }
      }, err => {
      console.log('error get planAll ')
      this.alertCtrl.error(err);
      }
    );
    
  }

  private reqRef() {
    this.loadingCtrl.present();

    const validateResult = this.validateData();

    if(!validateResult){
      this.loadingCtrl.dismiss();
    }
    else {

      this.storage.get('tlpromptMode').then(async mode => {
        this.storage.get('loginProfile').then(async profile => {

          await this.planSelect(this.universalLifeData.insuranceType);

          await this.universalLifeData.saveDataFromPDFPage();

          console.log('this.universalLifeData.quotationul.status --->', this.universalLifeData.quotationul.status);


          this.callPdfData.aorb = "A";
          this.callPdfData.flag = "2";
          this.callPdfData.quotationStatus = this.universalLifeData.quotationul.status;
          this.callPdfData.quotationno = this.universalLifeData.quotationul.quotationno; 
          this.callPdfData.customerid = this.universalLifeData.prospect.customerID;


          let reqModel: RequestModel = new RequestModel();
          reqModel.agentid = profile.agentid;
          reqModel.mode = mode;
          reqModel.functionName = FunctionName.UNIVERSAL_LIFE_PDF;
          reqModel.param = [this.callPdfData];

          console.log('request Data PDF reqModel:--->', reqModel);

          this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
            (res: any) => {
  
              
              if (res && res.datas[0] && res.datas[0].binaryQuotationPDF) {
                const rawdata = res.datas[0].binaryQuotationPDF;
                const referenceNo = res.datas[0].referenceNo;
                this.pdfName = res.datas[0].pdfFileName;
                this.pageTotal = res.pageTotal;
                
                this.callPdfData.refNo = referenceNo;
                this.universalLifeData.quotationul['status'] = 'R';
                this.universalLifeData.quotationul['referenceno'] = referenceNo;

                this.showReqRefButton = false;
                this.haveRef = true;

                console.log('response REQ REF --> ', res);

                const pdfData = "data:application/pdf;base64," + rawdata;
                this.pdfSrc = pdfData;
                this.generateIFrameUrl(this.pdfSrc);
                this.broadcaster.broadcast('old_callPdfData', this.callPdfData);

              }
              else{
              this.alertCtrl.error('No PDF File');
              } 
  
              
              this.loadingCtrl.dismiss();
  
            },
            (err) => {
              this.alertCtrl.error(err);
              this.loadingCtrl.dismiss();
            }
          );

        });
      });
    }
  }

  private validateData(): boolean {

    let validate: boolean = true;

    if (this.network.type == 'none') {

      let modal = this.modalCtrl.create(PopupLostConnectionComponent);
      modal.present();
      
      return false;
    }

    if(this.callPdfData == undefined){
      this.alertCtrl.warning("No callPdfData please sent to navParams");
      return false;
    }

    validate = this.validator.validateProspect(this.prospect, true, true, true);

    return validate;
  }

  private async planSelect (plancode : string) { 

    console.log("plancode==" + plancode);

    let reqModel: RequestModel = new RequestModel();
    reqModel.functionName = FunctionName.ULPLAN;
    reqModel.serviceName = ServiceName.SELECT;
    await this.apiProvider.callData(reqModel).then(async (res: any)  => {
        console.log('res : ',res);
        if (res.data.length > 0) {
          let planAll = res.data;

          let result : Array<any> = planAll;
          let data : Array<any> = result.filter((item,index)=>{
              return item.plancode.indexOf(plancode) > -1
          }); 
          console.log("ulplan data stringify >> "+JSON.stringify(data) + " data=" + data.length);
          if(data.length > 0){
            let uldetail: Array<any> = data;
      
      
            console.log("ulplan data stringify >> "+JSON.stringify(data) + " plancode ==" + uldetail[0].plancode  + " data ==" + data[0].plancode);
            this.universalLifeData.paytype =  data[0].paytype;
            this.universalLifeData.payyear = data[0].ppayyear;
            this.universalLifeData.edowntype = data[0].endowmenttype;
            this.universalLifeData.edownyear = data[0].pendowmentyear;
            this.universalLifeData.insuranceName = data[0].planname+" ["+data[0].plancode + "]";
          }


        }
      }, err => {
      console.log('error get planAll ')
      this.alertCtrl.error(err);
      }
    );



    
  }

  private sendEmail() {
    this.sendEmailUL();
  }

  private sendEmailUL() : void {
    this.storage.get('loginProfile').then(async profile => {
      const {
        fName,
        lName,
        email
      } = profile

      let receiver : string = "";


      if(typeof this.prospect != 'undefined'){
        if(typeof this.prospect["email"] != 'undefined'){
          receiver = this.prospect["email"];
        }
      }
      //เตรียมค่าให้ Form ใน Modal
      let dataInput : object = {
        senderName: `${fName} ${lName}`,
        senderEmail : email,
        receiver
      };
      let modal = this.modalCtrl.create(SendEmailComponent, dataInput);
      modal.present();
      
      modal.onDidDismiss(async data => {
        if (data != null){
          const {
            emailTitle,
            emailContent,
            senderEmail,
            receiver,
            receiverCC
          } = data;

          let loading = this.loadingCtrl.scopePresent();
          let sendEmailM : SendEmailM = new SendEmailM();

          // เตรียมไฟล์
          let sendEmailFileM : SendEmailFileM = new SendEmailFileM();
          sendEmailFileM = {
            ...sendEmailFileM,
            binaryOfFile: this.pdfSrc.replace('data:application/pdf;base64,', ''),
            fileName: 'quotation.pdf'
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
          this.loadingCtrl.scopeDismiss(loading);
        }
      });
    });
  }

  async print() {
    try {
      const objFra = document.getElementById('test');
      objFra['contentWindow'].focus();
      objFra['contentWindow'].window.print();
    } catch (error) {
      let pr = window.open(this.pdfSrc);
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
        //alert(this.pdfName);
        if(typeof(profile.ou) !== 'undefined'){
          let b = profile.ou.split('bra');
          if(b.length == 2){
            //alert(b[1]);
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
      });

      let objMs: Array<QuotationprintlogM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.QUOTATION_PRINTLOG;
      reqM.serviceName = ServiceName.INSERT;
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          //alert("save success");
          console.log("--------------------------------> "+JSON.stringify(res));
        },
        (err) => {
          //alert("save error");  
          console.log("--------------------------------> "+err);
        }
      );
    }
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

  close() {
    this.navCtrl.pop();
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
