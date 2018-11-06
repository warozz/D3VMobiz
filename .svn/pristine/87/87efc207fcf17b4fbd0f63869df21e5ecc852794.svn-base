import { Storage } from '@ionic/storage';
import { ConstantConfig } from '../../../providers/utility/constant-config';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { ConfigAPI } from '../../../providers/constants/config-api';
import { ServiceName } from '../../../providers/constants/service-name';
import { Component, NgZone } from '@angular/core';
import { AlertController, IonicPage,  NavController,  NavParams,  Platform, ModalController} from 'ionic-angular';
import { ApplicationData } from '../../../providers/application/application-data';
import { ApiProvider } from '../../../providers/api/api';
import * as moment from 'moment';
import { ApplicationEAppData } from '../../../providers/application/application-eapp-data';
import { PaymentM } from '../../../providers/service-table/payment-model';
import { RequestModel } from '../../../providers/model/request-model';
import { FunctionName } from '../../../providers/constants/function-name';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { TempReceiptM } from '../../../providers/service-table/temp-receipt-model';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { DateFormatProvider } from '../../../providers/date-format/date-format';
import { ApplicationpdfM } from '../../../providers/service-table/application-pdf-model';
import { Market } from '@ionic-native/market';
import { QrcodeModalComponent } from '../../../components/qrcode-modal/qrcode-modal';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/**
 * Generated class for the PaymentEAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
(window as any).handleOpenURL = (url:string)=>{
  (window as any).handleOpenURL_LastURL = url;
};


@IonicPage()
@Component({
  selector: 'page-payment-e-app',
  templateUrl: 'payment-e-app.html',
})

export class PaymentEAppPage {

  private mPosSuccess: Boolean = false;
  private paymentForm = [];
  private dateCurrent: string | Date | number;
  private money: number = 0;
  private paymentslipno: string;
  private dateSuccess: string | Date | number;
  private pName: string;
  private fName: string;
  private lName: string;
  private bankCode : string = '';
  private amountMPOS: string;


  private flagIsCredit : boolean = false;
  // private showChkQrCode : boolean = false;
  // D =  donker or Q = qrcode 
  private flagBankType : string  = "C";
  private typeapp : string = '';
  private paymentCat : string = '';

  constructor(
    private loadingCtrl: LoadingDirective,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appsData: ApplicationData,
    private apiProvider: ApiProvider,
    private applicationData: ApplicationData,
    private alertCtrl: AlertDirective,
    public  alertCtrl2: AlertController,
    private broadcaster: Broadcaster,
    public appEAppData: ApplicationEAppData,
    private ngZone: NgZone,
    private platform: Platform,
    private dateFormat :DateFormatProvider,
    private storage: Storage,
    private market: Market,
    private modalCtrl: ModalController,
    private http: HttpClient 
  ) {
    
    // flagIsCredit  check 2 ล้าน และ สัญชาติไทย 
    console.log("check getPreUWStatusM "+this.appsData.getPreUWStatusM().isPlanforEAPP+"  "+this.appsData.getPreUWStatusM().msgcode);
    this.flagIsCredit = (this.appsData.getPreUWStatusM().isPlanforEAPP === 'TRUE' && this.appsData.getPreUWStatusM().msgcode === 'Y')  ? true : false;
    this.typeapp = this.appsData.quotation.typeapp;


    //ชื่อ นามสกุล
    this.pName = this.appsData.quotation.pname;
    this.fName = this.appsData.quotation.fname;
    this.lName = this.appsData.quotation.lname;
    //ช่องทาง
    //this.paymentForm = [{'form':'mPos'}]; 
   
    this.dateCurrent = this.dateFormat.dateFormatShotTh1(moment( Date.now()).format("YYYY-MM-DD HH:mm:ss"), "S");
    


    let epaypremium = this.epaypremium( this.appsData.quotation.typeapp , this.appsData.quotation.mode  , this.appsData.quotation.totalpremium ) ;
   
    //จำนวนเงิน
    this.money = epaypremium ;//this.appsData.quotation.totalpremium ? Number(this.appsData.quotation.totalpremium) : 0;
    
    /**
     * จำนวนเงินที่ส่งไปยังเครื่อง MPOS
     */
    this.amountMPOS = String(epaypremium);//this.appsData.quotation.totalpremium == "" ? '0' : this.appsData.quotation.totalpremium;
   
    //เลขที่ใบรับเงินชั่วคราว
    this.paymentslipno = "";
    
    //ค่าเริ่มต้น วันที่ชำระเงิน
    this.dateSuccess = this.dateFormat.dateFormatThAndShowTime(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), "S", true);
    
    this.requestTempReceiptNo();

    (window as any).handleOpenURL = (url: string) => {
      // this context is called outside of angular zone!
      setTimeout(() => {
        // so we need to get back into the zone..
        this.ngZone.run(() => {
           // this is in the zone again..
           this.handleOpenUrl(url);
        });
      }, 0);
    };

    // check if app was opened by custom url scheme
    const lastUrl: string = (window as any).handleOpenURL_LastURL || "";
    if (lastUrl && lastUrl !== "") {
      delete (window as any).handleOpenURL_LastURL;
      this.handleOpenUrl(lastUrl);
    }

  }
  public epaypremium(typeapp : string , modepay : string , premiumpay : string ) {
    if (typeapp == "PER" && modepay == "0" )
      return  Number(premiumpay)*2;
    else
      return  Number(premiumpay);
}

  private handleOpenUrl(url: string) {

    let obj = this.getAllUrlParams(url);
    let invoice =  obj['invoice'];
    let amount =  obj['amount'];
    let customer_email=  obj['customer_email'];
    let mobile =  obj['mobile'];
    let order_info = obj['order_info'];
    let auth_code = obj['auth_code'];
    let transaction_response_code=  obj['transaction_response_code'];
    let transaction_number = obj['transaction_number'];
    let transaction_ref =  obj['transaction_ref'];
    let Merchant_Name = obj['Merchant_Name'];
    let card_type = obj['card_type'];
    let cc_name = obj['cc_name'];
    let cc_number = obj['cc_number'];
    let currency = obj['currency'];
    let ref_1 =  obj['ref_1'];
    let ref_2 = obj['ref_2'];
    let ref_3 = obj['ref_3'];
    let ref_4 = obj['ref_4'];
    let TSI= obj['TSI'];
    let TVR = obj['TVR'];
    let CVMResult = obj['CVMResult'];

    if ( obj['transaction_response_code'] == "0" && (obj['transaction_number'] != '' && obj['transaction_number'] != undefined)) {

      this.appEAppData.isPurchaseComplete = true;
      this.mPosSuccess = true;
      let jsonDataObj = {};
      jsonDataObj['transactionNumber'] = transaction_number;
      jsonDataObj['transactionFef'] = transaction_ref;
      jsonDataObj['orderInfo'] = order_info;
      jsonDataObj['cardType'] = card_type;
      jsonDataObj['ccName'] = cc_name;
      jsonDataObj['ccNumber'] = cc_number;
      jsonDataObj['TSI'] = TSI;
      jsonDataObj['TVR'] = TVR;

      let jsonData :any = jsonDataObj;

      this.alertCtrl.warning('ชำระเงินเรียบร้อย');

      this.dateSuccess = this.dateFormat.dateFormatThAndShowTime(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), "S", true);
      this.broadcaster.broadcast('dateSubmitAppForm', this.dateSuccess);

      this.setPayment(jsonData);
      this.broadcaster.broadcast('paymentStatus','01');
      this.setPaymentStatus("01", jsonData);
    }
    else {
      this.alertCtrl.warning('ชำระเงินไม่สำเร็จ');
      this.mPosSuccess = false;
      this.setPaymentStatus("02", undefined);
      this.broadcaster.broadcast('paymentStatus','02');
    }

   }

  private getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
      queryString = decodeURI(queryString);
      queryString = queryString.split('#')[0];
      var arr = queryString.split('&');
      for (var i=0; i<arr.length; i++) {
        var a = arr[i].split('=');
        var paramNum = undefined;
        var paramName = a[0].replace(/\[\d*\]/, function(v) {
          paramNum = v.slice(1,-1);
          return '';
        });
        var paramValue = typeof(a[1])==='undefined' ? true : a[1];
        paramName = paramName.toLowerCase();
        paramValue = paramValue.toLowerCase();
        if (obj[paramName]) {
          if (typeof obj[paramName] === 'string') {
            obj[paramName] = [obj[paramName]];
          }
          if (typeof paramNum === 'undefined') {
            obj[paramName].push(paramValue);
          }
          else {
            obj[paramName][paramNum] = paramValue;
          }
        }
        else {
          obj[paramName] = paramValue;
        }
      }
    }
    return obj;
  }

  public requestTempReceiptNo() {

    let objM: TempReceiptM = new TempReceiptM();
    let objMs: Array<TempReceiptM> = [];
    objMs.push(objM);
    
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.TEMP_RECEIPTNO;
    reqM.param = objMs;
    
    this.apiProvider.callData(reqM).then(
      (res) => {
        if(res['size'] && res['size'] > 0) {
          this.paymentslipno = res['data'][0].tempRpNo;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async requestMPOS() {

    if (typeof(this.bankCode) === 'undefined' || this.bankCode == '') {
        this.alertCtrl.warning("กรุณาเลือกบัตรเครดิต");
        return ;
    }
    /**
     * 
     */
    // this.appEAppData.isPurchaseComplete = true;
    // this.mPosSuccess = true;
    // this.alertCtrl.warning('ชำระเงินเรียบร้อย');
    // this.dateSuccess = this.dateFormat.dateFormatShotTh1(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), "S");

    // this.broadcaster.broadcast('paymentStatus', '01');
    // this.setPaymentStatus("01", null);
     /**
      * 
      */

    let saleInfoM: any = await this.storage.get(ConstantConfig.SALE_INFO_KEY);
    console.log('------------ requestMPOS : param saleInfoM----------', JSON.stringify(saleInfoM));

    let param: any = {
      "package" : "com.bay.mpos", 
      "customer_email_ne" : this.appEAppData.emailCustomer,
      "mobile_ne" : this.appsData.quotation.prospectM.mobilephone,
      "amount_ne" : this.amountMPOS,
      "source" : "io.ionic.starter",
      "command" : "pay",
      "ref_1_ne" : this.paymentslipno,
      "ref_2_ne" : saleInfoM['depositNo'] != undefined ? saleInfoM['depositNo'] : '' ,
      "ref_3_ne" : "01/01",
      "ref_4_ne" : ""
    };

    console.log('------------ requestMPOS : param ----------', param);

    if (this.platform.is('ios')) {

        param['amount_ne'] = param['amount_ne']+="00"; 

        this.callQuickPayIOS(param).then((res)=> { 

       }, 
       (err) => {

        const prompt = this.alertCtrl2.create({
          title: 'Error',
          message: "Krungsri QuickPay not install on your phone.",
          cssClass: 'alertCustomCss',
          buttons: [
            {
              text: 'Close'
            },
            {
              text: 'Install',
              handler: data => {
                (window as any).cordova.plugins.market.open('krungsri-quick-pay/id563457247');
              }
            }
          ]
        });
        prompt.present();

      });

    } 
    else if (this.platform.is('android')) {

      this.callQuickPay(param).then((res) => {
        if (res != undefined && '' != res && 'OK' != res) {

          this.appEAppData.isPurchaseComplete = false;
        
          let data: any = res; 
          let jsonData: any = JSON.parse(data);
    
          if (jsonData.transactionFef != '' && jsonData.transactionFef != undefined 
              && (jsonData.transactionNumber != '' && jsonData.transactionNumber != undefined)) { 
            
            this.appEAppData.isPurchaseComplete = true;
            this.mPosSuccess = true;
            this.alertCtrl.warning('ชำระเงินเรียบร้อย');

            this.dateSuccess = this.dateFormat.dateFormatThAndShowTime(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), "S", true);
            this.broadcaster.broadcast('dateSubmitAppForm', this.dateSuccess);

            this.setPayment(jsonData);
            this.broadcaster.broadcast('paymentStatus', '01');
            this.setPaymentStatus("01", jsonData);
          }
          else {
            this.alertCtrl.warning('ชำระเงินไม่สำเร็จ');
            this.mPosSuccess = false;
            this.setPaymentStatus("02", undefined);
            this.broadcaster.broadcast('paymentStatus', '02');
          }

        }
        else {
          const prompt = this.alertCtrl2.create({
            title: 'Error',
            message: "Krungsri QuickPay not install on your phone.",
            cssClass: 'alertCustomCss',
            buttons: [
              {
                text: 'Close'
              },
              {
                text: 'Install',
                handler: data => {
                  var appId = 'com.bay.mpos';
                  (window as any).cordova.plugins.market.open(appId);
                  prompt.dismiss;
                }
              }
            ]
          }); 
          prompt.present();
        }
        
      }, (err) => {
        this.alertCtrl.warning('ชำระเงินไม่สำเร็จ');
        this.mPosSuccess = false;
        this.broadcaster.broadcast('paymentStatus', '02');
        this.setPaymentStatus("02", undefined);
      });

    }
    
  }

  public callQuickPay(param: any) {

    return new Promise((resolve, reject) => {
     
      (window as any).cordova.plugins.quickpay.launchApp(param, {
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      })

    });
    
  } 

  public callQuickPayIOS(param: any) {

    return new Promise((resolve, reject) => {
     
      let appId = encodeURI('goswiff-bay://pay?command=pay&customer_email_ne='+param['customer_email_ne']+'&mobile_ne='+param['mobile_ne']+'&amount_ne='+param['amount_ne']+'&ref_1_ne='+param['ref_1_ne']+'&ref_2_ne='+param['ref_2_ne']+'&ref_3_ne='+param['ref_3_ne']+'&ref_4_ne='+param['ref_4_ne']+'&return='+ ConfigAPI.CONFIG_VALUE1 +'://');
      let appStarter = (window as any).startApp.set(appId);

      appStarter.start(function (msg) {
        resolve(msg);
      }, function (err) {
        reject(err);
      });

    });
    
  } 

  setPayment(res) {
    
    //console.log(res + " << XXXXXXXXXX >> " + JSON.stringify(res));
    //alert(res + " << XXXXXXXXXX >> " + JSON.stringify(res));
    
    let paymentM: PaymentM  = new PaymentM();
        paymentM.amount = this.appsData.quotation.totalpremium || 0;
        paymentM.paydate = moment().format('YYYY-MM-DD HH:mm:ss');
        paymentM.paymentslipno = this.paymentslipno;
        paymentM.transactionnumber = res.transactionNumber;
        paymentM.transactionref = res.transactionFef;
        paymentM.orderinfo = res.orderInfo;
        paymentM.cardtype = res.cardType;
        paymentM.ccname = res.ccName;
        paymentM.ccnumber = res.ccNumber;
        paymentM.bankcode = res.TSI;
        paymentM.creditcardno = res.TVR;
        
        //alert(paymentM + "  "+JSON.stringify(paymentM));

    this.appEAppData.paymentM = paymentM;
  }

  /**
   * @see payment_step update database 
   * => gen receipt's pdf for save to alfresco and sent email 
   * => gen application's pdf for save to alfresco
   * @param status 
   * @param res 
   */
  public setPaymentStatus(status: string, res: any) {

    let objM: PaymentM = new PaymentM();
    objM.applicationid = this.applicationData.getApplicationId();  //Require = Y
    objM.paymentstatus = status;
    objM.paymentslipno = this.paymentslipno;
    objM.paydate = moment().format('YYYY-MM-DD HH:mm:ss');
    
    if (res != undefined && res != null) {
      objM.transactionnumber = res.transactionNumber;
      objM.transactionref = res.transactionFef;
      objM.orderinfo = res.orderInfo;
      objM.paymentslipno = this.paymentslipno;
      objM.cardtype = res.cardType;
      objM.ccname = res.ccName;
      objM.ccnumber = res.ccNumber;
      //objM.bankcode = res.TSI + '|' + res.TVR;
      objM.amount = this.amountMPOS;
      objM.bankcode = this.bankCode;
    }
    
    let objMs: Array<PaymentM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PAYMENT;
    reqM.serviceName = ServiceName.UPDATE;
    reqM.searchkey = "PAYMENT_STATUS";
    reqM.param = objMs;

    this.apiProvider.callData(reqM).then(
      async (res) => {

        if ('01' === status) {

          let loading = this.loadingCtrl.scopePresent();
          this.appEAppData.insertApplicationEAppData("SUMBIT_NBAPP").then(
            async (res) => {

              console.log('insertApplicationEAppData : res = ', res);

              this.loadingCtrl.scopeDismiss(loading);
              
              if ('N' === res['data'][0].responseCode) {
                this.alertCtrl.warning(res['data'][0].responseMsg + ConstantConfig.NB_APP_WARNING_N);
              }
            
              await this.callSaveFileToAlfresco();
            },
            async (err) => {

              this.loadingCtrl.scopeDismiss(loading);
              console.log("error : " + JSON.stringify(err));

              this.alertCtrl.warning(ConstantConfig.NB_APP_WARNING_TIMEOUT);

              await this.callSaveFileToAlfresco();
            }
          );
         
        }
        
      },
      (err) => {
        console.log(err);
      }
    );
  }  

  /** 
   * บันทึก pdf ใบคำขอ ลง alfresco server
  */
  private async callSaveFileToAlfresco() {

    let objM: ApplicationpdfM = new ApplicationpdfM();
    objM.applicationid = this.applicationData.getApplicationId();
    objM.saveAlfrescoStatus = 'payment';
    let objMs: Array<ApplicationpdfM> = [];
    objMs.push(objM);
    
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.APPLICATION_PDF_ALFRESCO;
    reqM.param = objMs;
    
    await this.apiProvider.callData(reqM).then(
      async (res) => {
        console.log('finish save callSaveFileToAlfresco()');

      },async (err) => {
        console.log('Error save callSaveFileToAlfresco()');
        this.alertCtrl.error(err); 
      }
    );
  }


  private changeChooseBank(type: string){

  }

  private changeChooseProvide(type : string){
    //alert(type);
    if(type === 'qrcode'){
      this.flagBankType = "Q";
    }
  }


  async viewApplication(item) {
    /*
    payCode    '01' - 'QR Payment (ตัดบัญชี) , 04' - QR Payment(ตัดบัตรเครดิต)
    bankCode  ธนาคารที่ระบุชำระ เช่น 'BAY', 'SCB'
    reference1   ใบเสร็จรับเงินชั่วคราว 
    reference2   เลขฝากค้ำ
    applicationCode TLPro => 'SD01'
    amount(13)
    userReference(20) 'S'+SalesReference, 'C'+citizenID
    message
    */
   let saleInfoM: any = await this.storage.get(ConstantConfig.SALE_INFO_KEY);
    let request = {
      "policyNo" : "249754",
      "payCode" : this.paymentCat,
      "reference1" : this.paymentslipno,
      "reference2" : saleInfoM['depositNo'] != undefined ? saleInfoM['depositNo'] : '',
      "applicationCode" : "SD01",
      "amount" : this.appsData.quotation.totalpremium == "" ? '0' : this.appsData.quotation.totalpremium,
      "userReference" : "S",
      "message" :""
    }
    // this.appData.setQuotation(item);
    let url : string = 'http://dev.thailife.com:8080/DigitalPServices/rest/digital/qrcode';
    let header: HttpHeaders = new HttpHeaders();
          header = header.set("Content-Type","application/json")
    this.http.post(url, request , {headers : header} )
      .subscribe(data => {
        //this.showChkQrCode = true;
         //console.log(JSON.stringify(data['image']));
         let modal = this.modalCtrl.create(QrcodeModalComponent, data ,{enableBackdropDismiss : false});
         modal.present(); 


         modal.onDidDismiss(data => {
          if (data != null) {

            this.broadcaster.broadcast('paymentStatus','01');
            this.dateSuccess = this.dateFormat.dateFormatShotTh1(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), "S");
            console.log(this.dateSuccess+"  "+JSON.stringify(data));
            this.mPosSuccess = true;
            // this.loadingCtrl.present();
            // this.navCtrl.push(data.page, data).then(() => {
            //   this.loadingCtrl.dismiss();
            // });
          }
        });
        //  this.imagePath =  this._sanitizer.bypassSecurityTrustResourceUrl(data['image']);
        //  this.countDown = this.myService.getCounter().do(() => --this.counter);
      }, (err) => {
        alert(JSON.stringify(err));
          
      });


   
  }


  
  

}
