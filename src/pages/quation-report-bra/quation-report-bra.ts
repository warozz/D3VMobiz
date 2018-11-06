import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { QuotationprintlogM } from '../../providers/service-table/quotationprintlog-model';
import { RequestModel } from '../../providers/model/request-model';
import { FunctionName } from '../../providers/constants/function-name';
import { ServiceName } from '../../providers/constants/service-name';
import { ApiProvider } from '../../providers/api/api';
import { AlertDirective } from '../../directives/extends/alert/alert';

/**
 * Generated class for the QuationReportBraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'รายงานการพิมพ์ใบเสนอขายรายสาขา'
})
@Component({
  selector: 'page-quation-report-bra',
  templateUrl: 'quation-report-bra.html',
})
export class QuationReportBraPage {

  

  private listLogType = [
    {
      id: 1,
      text: 'รายงานการพิมพ์ใบเสนอขาย (รายสาขา)'
    }
  ];
  private list = [];
  private formatDate: string = "YYYY-MM-DD";
  private sum: number;
  private selectedColor: number = 0;
  private startDate: string = moment().format(this.formatDate);
  private endDate: string = moment().format(this.formatDate);
  private maxStartDate: string;
  private minEndDate: string;
  /*
  *paging
  */
  private allItems: any[];
  private pagedItems: any[];
  private pager: any = {};
  private pageSize: number = 5;
  private currentPage: number = 1;
  private totalPage: number;
  private flagSort: boolean;

  /*
  *sorting
  */
  private isDesc: boolean = false;
  private column: string = '';
  private direction: number;
  private sortingFlag: string = '';
  private branchcode : string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public alertCtrl: AlertDirective,
    public storage :Storage,
  ) {
    this.changePage(1);
    this.storage.get('loginProfile').then(profile => {
      //this.branchcode = profile.ou;
      if(typeof(profile.ou) !== 'undefined'){
        let b = profile.ou.split('bra');
        if(b.length == 2){
          //alert(b[1]);
          this.branchcode  = b[1];
          
        }else{
          this.branchcode = '';
        }
      }
    });
  }

  private callLogList() {
    if (!this.startDate || !this.endDate) {
      this.alertCtrl.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    let objM: QuotationprintlogM = new QuotationprintlogM();
    objM.fromdate = this.startDate; //Require = Y
    objM.todate = this.endDate; //Require = Y
    objM.branchcode = this.branchcode;
    objM.branchname = '';
    objM.userid = '';
    objM.usertype = '';
    objM.seq = '';
    objM.devicerefno = '';

    let objMs: Array<QuotationprintlogM> = [];
    objMs.push(objM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.QUOTATION_PRINTLOG;
    reqM.serviceName = ServiceName.SELECT;
    reqM.searchkey = 'report2';
    reqM.param = objMs;

    this.apiProvider.callData(reqM).then((res) => {
        let datas = <any>res;
        console.log(res);
        this.list = [...datas.data];
       
        this.sum = this.list.reduce((prevVal, elem) => prevVal + elem.amt, 0);
      },(err) => {
        console.log(JSON.stringify(err));
      }
    );

  }

  itemSelected(id): void {
    this.selectedColor = Number(id);
  }

  changePageSize(value): void {
    this.pageSize = Number(value);
    this.totalPage = Math.ceil(this.list.length / this.pageSize);
  }

  changePage(page: number): void {
    this.totalPage = Math.ceil(this.list.length / this.pageSize);
    this.totalPage = this.totalPage === 0 ? 1 : this.totalPage;
    if (page < 1) {
      return;
    } else if (page > this.totalPage) {
      page = this.totalPage;
    }
    this.currentPage = page;
    this.flagSort = !this.flagSort;
  }

  sort(property, option): void {

    if (this.column != property) {
      this.isDesc = false;
      this.sortingFlag = 'asc'
    }
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
    if (this.direction == -1) {
      this.sortingFlag = 'desc'
    } else if (this.direction == 1) {
      this.sortingFlag = 'asc'
    }
    this.changePage(this.currentPage);
  }

  changeMinEndDate(date) {
    this.minEndDate = date;
    if (!this.endDate
      || typeof this.endDate != 'string'
      || (typeof this.endDate == 'string' && this.endDate.length <= 0)
    ) {
      this.endDate = date;
    }
    this.maxStartDate = this.endDate;
  }

  changeMaxStartDate(date) {
    this.maxStartDate = date;
    if (!this.startDate
      || typeof this.startDate != 'string'
      || (typeof this.startDate == 'string' && this.startDate.length <= 0)
    ) {
      this.startDate = date;
    }
    this.minEndDate = this.startDate;
  }

  // back() {
  //   this.navCtrl.pop();
  // }

}
