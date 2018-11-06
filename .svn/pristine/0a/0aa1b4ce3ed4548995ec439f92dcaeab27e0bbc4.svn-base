import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { DateFormatProvider } from '../../../providers/date-format/date-format';
import * as moment from 'moment';
import {Sort, AUTOCOMPLETE_OPTION_HEIGHT} from '@angular/material';

import { AlertDirective } from '../../../directives/extends/alert/alert';
import { Http } from '@angular/http';
import { CommonUtilProvider } from '../../../providers/common-util/common-util';
import { RequestModel } from '../../../providers/model/request-model';
import { Storage } from '@ionic/storage';
import { FunctionName } from '../../../providers/constants/function-name';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { TextModal } from './../../../providers/constants/text-modal';
import { PdfViewdataPage } from '../../../pages/pdf-viewdata/pdf-viewdata';


/**
 * Generated class for the AllocationModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'allocation-modal',
  templateUrl: 'allocation-modal.html'
})
export class AllocationModalComponent {

  private data:any;
  private value: any;

  private tabsRiskLevel = [
    {
      title: 'ความเสี่ยงต่ำ',
      disabled: false
    },
    {
      title: 'ความเสี่ยงปานกลาง',
      disabled: false
    },
    {
      title: 'ความเสี่ยงสูง',
      disabled: false
    },
    {
      title: 'กำหนดเอง',
      disabled: false
    }
  ];

  private sortedData: Array<Object> = [];
  private allocationData: any;
  private totalRisk: number = 0;
  private currentTab: number = 99;
  private allFileFundArray = [];
  private allocationArray = [];
  private finalAllFileArray = [];
  private showPieData: boolean = false;
  private dropdownNum: string = '1';

  
  constructor(
    private alertCtrl: AlertDirective,
    private http: Http, 
    private commonUtilProvider: CommonUtilProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private loadingCtrl: LoadingDirective,
    public viewCtrl: ViewController,
    private navParams: NavParams,
    
    
  ) {

    this.allFileFundArray = this.navParams.data.allFileFundArray;
    this.allocationArray = this.navParams.data.allocationArray;
    
    // console.log('allFileFundArray :',this.allFileFundArray)
    // console.log('allocationArray :',this.allocationArray)
    
    this.findLastMonthEachFundId();
      
  }

  sortData(sort: Sort) {
    

    this.allocationArray.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'riskLevel': return compare(+a['riskLevel'], +b['riskLevel'], isAsc);
        case 'name': return compare(a['fundCode'], b['fundCode'], isAsc);
        case 'riskInput': return compare(+a['riskInput'], +b['riskInput'], isAsc);
        default: return 0;
      }
    });
  }

  

  private findLastMonthEachFundId(){
    console.log('findLastMonthEachFundId func :')

    
    let _allFileWithFundId = [];
    let _monthAndFunId = [];
    let _onlyFundId = [];

    this.allFileFundArray.forEach((value) => {
      if(value.fundID){
        _allFileWithFundId.push(value)
      }
    });
    // console.log('_allFileWithFundId',_allFileWithFundId)
    _allFileWithFundId = _allFileWithFundId.sort(compares);
   

    // var allFund2 = _allFileWithFundId.filter(function(item, index){
    //   return _allFileWithFundId.indexOf(item) >= index;
    // });

    let allFund = _allFileWithFundId.map(function (item) {
      return item.fundID;
    });
    console.log('allFund',allFund)

    var allFund2 = allFund.filter(function(item, index){
      return allFund.indexOf(item) >= index;
    });

    console.log('allFund2  ',allFund2)
    for(let key of allFund2){
       console.log('key  ',key)

      var _fundidMultiMonth = _allFileWithFundId.filter(function(item, index){
        return item["fundID"] == key;
      }); 

      console.log('_fundidMultiMonth  ',_fundidMultiMonth)

      
      let _maxMonth:number = 0;
      let _finalMonth = {};
      for(let data of _fundidMultiMonth){ // each key
        //console.log('data :',data)
        const month = Number(data["month"]); 



        if(month > _maxMonth){
          _maxMonth = month;
          _finalMonth = data

        }

      }
      this.finalAllFileArray.push(_finalMonth);

    }
    console.log('finalAllFileArray ',this.finalAllFileArray)
    this.finalAllFileArray.forEach((value) =>{
      this.allocationArray.forEach((res) => {
        if(res.fundID == value.fundID){
          let _month = value.month.substring(6, 4); // only > yyyyMM
          let _year = value.month.substring(4, 0);
          if(_month == '01'){
            _month = 'ม.ค.'
          }if(_month == '02'){
            _month = 'ก.พ.'
          }if(_month == '03'){
            _month = 'มี.ค.'
          }if(_month == '04'){
            _month = 'เม.ย.'
          }if(_month == '05'){
            _month = 'พ.ค.'
          }if(_month == '06'){
            _month = 'มิ.ย.'
          }if(_month == '07'){
            _month = 'ก.ค.'
          }if(_month == '08'){
            _month = 'ส.ค.'
          }if(_month == '09'){
            _month = 'ก.ย.'
          }if(_month == '10'){
            _month = 'ต.ค.'
          }if(_month == '11'){
            _month = 'พ.ย.'
          }if(_month == '12'){
            _month = 'ธ.ค.'
          }
          res.month = value.month
          res.monthTh = _month+''+_year
          res.sequence = value.sequence
          res.filename = value.filename
        }
      })
    })
    console.log('allocationArray ',this.allocationArray)
    
  }

  
  private async openPdf(obj) {
    console.log('openPdf func')
    this.loadingCtrl.present();
    
    this.storage.get('tlpromptMode').then(async mode => {
      this.storage.get('loginProfile').then(async profile => {

        let _paramChangeObj = this.changeFundData(this.dropdownNum,obj);

        let reqModel: RequestModel = new RequestModel()
        reqModel.agentid = profile.agentid
        reqModel.mode = mode
        reqModel.functionName = FunctionName.UNITLINKAPI
        reqModel.param = [_paramChangeObj]

        console.log('reqModel',reqModel)
        this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          (res: any) => {

            console.log('api res : ',res)
            let tm1 = JSON.parse(res.datas[0])
            console.log('tm1 : ',tm1)
            
            
            if (tm1 && tm1.data[0] && tm1.data[0].pathpdf) {
              const rawdata = tm1.data[0].pathpdf

              const pdfData = "data:application/pdf;base64," + rawdata;

              let data = {
                pdfDetail: {
                  pageTotal: tm1.totalRecord,
                  pdfName: obj.filename,//fundCode .pdf
                  src: pdfData,
                }
              };

              console.log("success PDF File",data);
              this.navCtrl.push(PdfViewdataPage, data);
            }
            else {
              console.log("No PDF File");
              this.alertCtrl.warning("เกิดข้อผิดพลาดของระบบ");
            }
            this.loadingCtrl.dismiss();

          },
          (err) => {
            console.log("Call Service PDF Error : ", err);
            this.alertCtrl.warning("เกิดข้อผิดพลาดของระบบ");
            this.loadingCtrl.dismiss();
          });
      });
    });

  }
  
  private dropdownChange(value){
    this.dropdownNum = value;
  }

  private changeFundData(v, obj){
    console.log('changeFundData func :',v+':obj '+obj)

    
    let fileNameEngComm = '"' + obj.filename + '"';
    let engNameComm = '"'+ obj.fundEngName + '"';
    let fundIdComm = '"' + obj.fundID + '"';
    let monthComm = '"' + obj.month + '"';
    
    let ffsFullFileName = "FFS_"+obj.month+"_"+obj.fundID+"_"+obj.sequence
    let ffsFullFIleNameComm = '"' + ffsFullFileName + '"';

    // let aimFullFileName = "AIM_"+obj.month+"_"+obj.fundID+"_"+obj.sequence
    let aimFullFileName = "AIM_"+obj.month+"_00000_"+obj.sequence
    let aimFullFileNameComm = '"' + aimFullFileName + '"';
    //AIMC_Performance_201610
    let aimFullName =  "AIMC_"+obj.fundEngName+"_"+obj.month+".pdf";
    let aimNameFullComm = '"'+aimFullName+'"';

    // "raw": "{\"filename\":\"MTE_256007_02004_01\",\"name\":\"26072560_จดหมายแจ้งการเปลี่ยนแปลงกองทุนหลัก.pdf\"}"
    // let mteFullFileName = "MTE_"+obj.month+"_"+obj.fundID+"_"+obj.sequence;
    let mteFullFileName = "MTE_"+obj.month+"_00000_"+obj.sequence;
    let mteFullFileNameComm = '"' + mteFullFileName + '"';

    let metFullName = obj.month+"_"+obj.filename;
    let metFullNameComm = '"'+ metFullName +'"';

    //"raw": "{\"filename\":\"SPC_month_fundID_seq\",\"name\":\"xxx\"}"
    let spcFullFileName = "SPC_"+obj.month+"_"+obj.fundID+"_"+obj.sequence
    // let spcFullFileName = "SPC_"+obj.month+"_00000_"+obj.sequence
    let spcFullFileNameComm = '"' + spcFullFileName + '"';

    let paramChange;
    if(v === "1"){
      paramChange = {
        "ulink": "{\"filename\":" + ffsFullFIleNameComm + ",\"name\":" + engNameComm + "}",
        "operation": 'getffspdf'
      }
    }
    if(v === "2"){
      paramChange = {
        "ulink": "{\"filename\":" + aimFullFileNameComm + ",\"name\":" + aimNameFullComm + "}",
        "operation": 'getfpmaimcpdf'
      }
    }
    if(v === "3"){
      paramChange = {
        "ulink": "{\"filename\":" + mteFullFileNameComm + ",\"name\":" + metFullNameComm + "}",
        "operation": 'getmtepdf'
      }
    }
    if(v === "4"){
      paramChange = {
      "raw": "{\"filename\":"+ spcFullFileNameComm +",\"name\":" + engNameComm + "}",
        "operation": 'getspcpdf'
      }
    }

    console.log('paramChange return: ',paramChange)
    return paramChange;

  }

    /**
   * ปิด modal
   */
  public close() {
    this.viewCtrl.dismiss();
  }

}



function compares(a,b) {
  if (a.fundID < b.fundID)
    return -1;
  if (a.fundID > b.fundID)
    return 1;
  return 0;
}



function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}