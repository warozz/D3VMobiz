import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApplicationEAppData } from '../../../providers/application/application-eapp-data';
import { ApplicationData } from '../../../providers/application/application-data';
import { MCAapplicationsM } from '../../../providers/service-table/mcaapplications-model';
import { RequestModel } from '../../../providers/model/request-model';
import { FunctionName } from '../../../providers/constants/function-name';
import { ServiceName } from '../../../providers/constants/service-name';
import { ApiProvider } from "../../../providers/api/api";
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { PaymentM } from '../../../providers/service-table/payment-model';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { Subscription } from 'rxjs/Rx';
import { LoadingDirective } from '../../../directives/extends/loading/loading';

/**
 * Generated class for the SendAllFileEAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-all-file-e-app',
  templateUrl: 'send-all-file-e-app.html',
})
export class SendAllFileEAppPage {

  private statusSubmit = false;
  public applicationid;
  public paymentStatus;
  public pname;
  public fname;
  public lname;
  public dateSubmitAppForm: string | Date | number;
  public totalFile;
  private subscription: Array<Subscription> = [];
  private isPurchaseComplete: Boolean = false;
 
  constructor(private alertCtrl: AlertDirective, 
    private apiProvider: ApiProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appData: ApplicationData,
    private applicationEAppData: ApplicationEAppData,
    private loadingCtrl: LoadingDirective,
    private broadcaster: Broadcaster) {

    const data = this.appData.getQuotation();
    this.appData.getData('mcaapplicationM').then(
      (res)=> {
        this.applicationid = res['applicationidDisplay'];
      }
    );
    
    this.pname = data.pname;
    this.fname = data.fname;
    this.lname = data.lname;

    this.subscription.push(this.broadcaster.on('attachfilesize').subscribe(res => {
      this.totalFile = res;
    }));

    this.subscription.push(this.broadcaster.on('paymentStatus').subscribe(res => {
      this.paymentStatus = res;
    }));

    this.subscription.push(this.broadcaster.on('dateSubmitAppForm').subscribe(res => {
      this.dateSubmitAppForm = res;
    }));

  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  public sendApp() { 
  
    this.statusSubmit = false;

    let loading = this.loadingCtrl.scopePresent();
    this.applicationEAppData.insertApplicationEAppData("SUMBIT_NBAPP").then(
      (res) => {
        this.loadingCtrl.scopeDismiss(loading);
        
        console.log("insertApplicationEAppData success : " + JSON.stringify(res));
        this.statusSubmit = true;         
        this.alertCtrl.warning("ส่งใบคำขอเรียบร้อย");
      },
      (err) => {
        this.loadingCtrl.scopeDismiss(loading);
        
        console.log("insertApplicationEAppData error : " + JSON.stringify(err));
        this.statusSubmit = false;
        this.alertCtrl.warning("ไม่สามารถส่งใบคำขอได้");
      }
    );
  }

}
