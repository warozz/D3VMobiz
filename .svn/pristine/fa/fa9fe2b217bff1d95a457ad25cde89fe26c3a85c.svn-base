
import { MatPaginator } from '@angular/material';
import { ApplicationData } from './../../providers/application/application-data';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { QuotationModel } from '../../providers/quotation/quotation-model';
import { RequestModel } from '../../providers/model/request-model';
import { FunctionName } from '../../providers/constants/function-name';
import { ServiceName } from '../../providers/constants/service-name';
import { ApiProvider } from "../../providers/api/api";
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { AppDetailModalComponent } from '../../components/app-detail-modal/app-detail-modal';
import { DateFormatProvider } from '../../providers/date-format/date-format';
import { QuatationValueCal } from '../../providers/utility/quatation-value-cal';
import * as _ from 'lodash';
/**
 * Generated class for the AppFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'ใบคำขอ'
})
@Component({
  selector: 'page-app-form',
  templateUrl: 'app-form.html',
})
export class AppFormPage {
  public sortFlag: string = '';
  public selectProperty: string = '';
  public temp;
  public quotation = [];
  public quotationAll = [];

  keyvalue: string = '';
  pageSize: number = 10;
  pageNo: number = 1;
  totalPage: number = 10;
  totalRecord: number = 0;
  orderBy: string = '';
  orderType: string = '';
  filterBy: string = '00';
  isFirstLoad: boolean = false;

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private appData: ApplicationData,
    private loadingCtrl: LoadingDirective,
    private alertCtrl: AlertDirective,
    private modalCtrl: ModalController,
    public dateFormatProvider: DateFormatProvider,
    public QuatationValueCal: QuatationValueCal) {
    this.isFirstLoad = true;
  }

  async sort(property) {
    if(this.selectProperty != property) {
      this.sortFlag = 'ASC';
    } else {
      if(this.sortFlag === 'ASC') {
        this.sortFlag = 'DESC';
      } else {
        this.sortFlag = 'ASC';
      }
    }
    this.selectProperty = property;
    this.searchAll();
    
  }

  /**
   * ค้นหาใบคำขอ
   * @param text ข้อความค้นหา
   */
  public changeFilter(value) {
    this.pageNo = 1;
    this.filterBy = value;
    this.searchAll();
  }
 
  changeSize(size) {
    this.pageSize = size;
    this.searchAll();
  }

  setDefault() {
    this.selectProperty = '';
    this.sortFlag = '';
    this.pageSize = 10;
    this.pageNo = 1;
    this.filterBy = '00';
    this.keyvalue = '';
  }

  changePage(event) {
    if(event === 'increase') {
      this.pageNo++;
      if(this.pageNo > this.totalPage) return this.pageNo--;
    } 
    if(event === 'decrease') {
      this.pageNo--;
      if(this.pageNo < 1) return this.pageNo++;
    }
    this.searchAll();
  }

  defaultSearchAll() {
    this.setDefault();
    this.searchAll();
  }

  public searchAll() {
    //console.log(this);
    let loading = this.loadingCtrl.scopePresent();
    let objM: QuotationModel = new QuotationModel();

    let objMs: Array<QuotationModel> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.keyvalue = this.keyvalue;

    reqM.functionName = FunctionName.QUOTATION;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = objMs;
    reqM.pagingMode = true;
    reqM.orderBy = this.selectProperty; //NAME, PLAN, LIFESUM, REFID, APPID, STATUS, TYPE, DATE
    reqM.orderType = this.sortFlag; // DESC, ASC
    reqM.pageSize = this.pageSize; //จำนวนแถวต่อหน้า
    reqM.pageNo = this.pageNo; //หน้าที่
    reqM.filterBy = this.filterBy; //filter
    if (this.isFirstLoad) {
      reqM.searchkey = '1';
      this.isFirstLoad = false;
    }

    this.apiProvider.callData(reqM).then(
      (res) => {
        //console.log("search All ====> ", res);
        this.pageNo = res['pageNo'];
        this.pageSize = res['pageSize'];
        this.totalPage = res['pageTotal'];
        this.totalRecord = res['totalRecord'];
        //console.log("XXX = " + JSON.stringify(res));

        this.loadingCtrl.scopeDismiss(loading);
        this.temp = res;
        if (this.temp.status == 0 && this.temp.data.length > 0) {
          let quotationModelArr: QuotationModel[] = this.temp.data;
          this.quotation = [];
          quotationModelArr.forEach(element => {
            this.quotation.push(element);
          });

          this.quotationAll = this.quotation;
        }
        else {
          this.quotation = [];
        }
        
      },
      (err) => {
        console.log('err : ', err);
        this.loadingCtrl.scopeDismiss(loading);
        this.alertCtrl.error(err);
      }
    );
  }

  public search(i) {

    this.filterBy = '00';
    this.pageNo = 1;  
    this.selectProperty = "";
    this.sortFlag = "";

    if (!i) {
      this.alertCtrl.warning('กรุณาระบุข้อมูลที่ต้องการค้นหา');
      return;
    } 
    this.keyvalue = i;
    this.searchAll();
  }

  createApplication(item) {

    this.loadingCtrl.present();
    this.appData.setQuotation(item).then(
      (res)=> {
        console.log('res : ', res);
        if(item.typeapp == 'ULink'){
          this.navCtrl.push('AppFormUlinkPage').then(() => {
            this.loadingCtrl.dismiss();
          });
        }
        else {
          this.navCtrl.push('AppApplicationPage').then(() => {
            this.loadingCtrl.dismiss();
          });
        }
        
      },
      (err)=> {
        console.log('err : ', err);
        this.loadingCtrl.dismiss();
      });
   
  }

  viewApplication(item) {

    this.appData.setQuotation(item).then(
      (res)=> {
        if (item.typeapp == 'ULink') { // เข้าหน้า Ulink
          this.loadingCtrl.present();
          this.navCtrl.push('AppFormUlinkPage').then(() => {
            this.loadingCtrl.dismiss();
          });
        } else {
          let modal = this.modalCtrl.create(AppDetailModalComponent, this.quotation[item]);
          modal.present(); 
      
          modal.onDidDismiss(data => {
            if (data != null) {
              this.loadingCtrl.present();
              this.navCtrl.push(data.page, data).then(() => {
                this.loadingCtrl.dismiss();
              });
            }
          });
        }
      },
      (err)=> {
        console.log('err : ', err);
        this.loadingCtrl.dismiss();
      }
    );

    // this.appData.setQuotation(item);
    // if (item.typeapp == 'ULink') { // เข้าหน้า Ulink
    //   this.loadingCtrl.present();
    //   this.navCtrl.push('AppFormUlinkPage').then(() => {
    //     this.loadingCtrl.dismiss();
    //   });
    // } else {
    //   let modal = this.modalCtrl.create(AppDetailModalComponent, this.quotation[item]);
    //   modal.present(); 
  
    //   modal.onDidDismiss(data => {
    //     if (data != null) {
    //       this.loadingCtrl.present();
    //       this.navCtrl.push(data.page, data).then(() => {
    //         this.loadingCtrl.dismiss();
    //       });
    //     }
    //   });
    // }
  }

  /**
   * ลบใบเสนอขายที่ยังไม่มีเลข ReferanceNo.
   */
  async deleteApplication(item) {
    try {
      const messageAlert = `ท่านต้องการลบ ข้อมูล คุณ ${item.fname} ${item.lname} หรือไม่
        <br>หากต้องการกด ตกลง ข้อมูลทั้งหมดในการนำเสนอขายจะถูกลบไม่สามารถเรียกกลับมาแสดงได้อีก 
        <br>หากไม่ต้องการ กด ยกเลิก`;
      await this.alertCtrl.confiemBox(`${messageAlert}`);

      let loading = this.loadingCtrl.scopePresent();

      let objM: QuotationModel = new QuotationModel();
      objM.quotationno = item.quotationno;
      objM.customerid = item.customerid;

      let objMs: Array<QuotationModel> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.QUOTATION;
      reqM.serviceName = ServiceName.DELETE;
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          this.searchAll();
          this.alertCtrl.warning('ลบสำเร็จ');
          this.loadingCtrl.scopeDismiss(loading);
        },
        (err) => {
          console.log('err : ', err);
          this.alertCtrl.error(err);
          this.loadingCtrl.scopeDismiss(loading);
        }
      );

    }
    catch (e) {
      console.error(e);
      if (e !== 'cancel') {
        throw e;
      }
    }
  }

  ngOnInit() {
     this.searchAll();
  }
  
}
