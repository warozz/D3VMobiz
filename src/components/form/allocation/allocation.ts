import { Component,Input, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";

import { Sort } from "@angular/material";
import { AlertDirective } from "../../../directives/extends/alert/alert";
import { Http } from "@angular/http";
import { CommonUtilProvider } from "../../../providers/common-util/common-util";
import { RequestModel } from "../../../providers/model/request-model";
import { Storage } from "@ionic/storage";
import { FunctionName } from "../../../providers/constants/function-name";
import { PdfViewdataPage } from './../../../pages/pdf-viewdata/pdf-viewdata';

import { LoadingDirective } from "../../../directives/extends/loading/loading";
import { AllocationModalComponent } from "./../../../components/utility/popup-allocation/allocation-modal";
import { TextModal } from "./../../../providers/constants/text-modal";

import { UlinkAppDataProvider } from "../../../providers/ulink-app-data/ulink-app-data";
import { UlinkAllocateProvider } from "../../../providers/ulink-app-data/ulink-allocate-data";
import _ from "lodash";
import { ProspectModel } from "../../../providers/prospect/prospect-model";

@Component({
  selector: "allocation",
  templateUrl: "allocation.html"
})
export class AllocationComponent {
  /* TAB ระดับความเสี่ยง */
  private tabsRiskLevel = [
    {
      title: "ความเสี่ยงต่ำ",
      disabled: false
    },
    {
      title: "ความเสี่ยงปานกลาง",
      disabled: false
    },
    {
      title: "ความเสี่ยงสูง",
      disabled: false
    },
    {
      title: "กำหนดเอง",
      disabled: false
    }
  ];

  private choiceType: string;

  // ระดับความเสี่ยง  low,medium,height,custom
  private riskType = {
    low: "low",
    medium: "medium",
    height: "height",
    custom: "custom"
  };

  private premiumtypeList = [
    {
      title: "เบี้ยประกันหลักเพื่อความคุ้มครอง (RPP)",
      selected: false,
      value: "rpp",
      type: ["UA02"]
    },
    {
      title: "เบี้ยประกันภัยหลักเพื่อการออม (RSP)",
      selected: false,
      value: "rsp",
      type: ["UA02"]
    },
    {
      title: "เบี้ยประกันชำระครั้งเดียว (SP)",
      selected: false,
      value: "rpp",
      type: ["UA01"]
    },
    {
      title: "เบี้ยประกันเพิ่มเติมพิเศษ (Top-Up Premium)",
      selected: false,
      value: "top",
      type: ["UA01", "UA02"]
    }
  ];
  private premiumTypeSelected;
  private showTab: number = 0;

  private totalRisk: number = 0;
  private oldFundID: string = "";
  private oldValue: number = 0;
  private allocationData: any;
  private sortedData: Array<Object> = [];
  private currentTab: number = 99;
  private fundPerformance: any;
  private fundDataList: Array<Object> = [];
  private showPieData: boolean = false;

  private fundEngName: string;
  private allFileFundData: any;
  private allFileFundArray = [];
  private allocationArray = [];
  private ffsFullName: string;
  private pdfName_open: string;

  disableSaveButton:Boolean;

  //pieChartLabels = ['CIMB-PRINCIPAL GSA','CIMB-PRINCIPAL iFIXED-C','KFFLEX','TMBUSBLUECHIP'];
  //pieChartData = [20, 20, 20, 40];
  pieChartLabels: string[];
  pieChartData: number[];
  //pieChartColor = [{ backgroundColor:['#2A4F77','#2b5c91','#4076B1','#adcbed','#DEECFA']}];
  pieChartOption = {
    responsive: true,
    pieceLabel: {
      render: "percentage",
      fontColor: "white",
      precision: 2
    }
  };

  private cal3M: string = "0";
  private cal3MSD: string = "0";
  private cal6M: string = "0";
  private cal6MSD: string = "0";
  private cal1Y: string = "0";
  private cal1YSD: string = "0";
  private cal3Y: string = "0";
  private cal3YSD: string = "0";
  private cal5Y: string = "0";
  private cal5YSD: string = "0";
  private cal10Y: string = "0";
  private cal10YSD: string = "0";
  private calST: string = "0";
  private calSTSD: string = "0";

  /**
   * prospect
   */
  private prospect: ProspectModel = new ProspectModel();

  callback : any;

  public ngOnInit(): void {
    console.log("OnInit");
  }

  public ngOnDestroy() {
    console.log("OnDestroy");
    this.ulinkAllocateData.formEditPage = '';
  }

  public handleRowClick(element): void {
    console.log("element===> value :" + element);
  }

  private toggle_footer: boolean = false;

  planCode: string = "";

  @Input('refresh') set setRefresh(refresh: boolean) {
    if (refresh) {
      this.toggle_footer = true;
    }
  }

  @Input('tlPlan') set setTlPlan(tlPlan: string) {
    console.log('tlPlan',tlPlan);
    if (typeof tlPlan !== 'undefined') {
      this.planCode = tlPlan;
      this.setDefaultDropDownAndChoice(this.planCode,this.premiumtypeList);

      if(this.allocationData && typeof this.dataEdit === 'undefined'){
        this.setDefaultdaftSaveListfund();
      }
    }
  }

  // let dataEdit = {
  //   pageName: 'AppLifepremiumUlinkPage',
  //   planCode: this.plan_code,
  //   customerId: this.quotation.customerid, //'bc3db1b5-d603-4f30-9874-729ecbc33a35', //
  //   callback: this.getDataAllocationEdit // function callback
  // }
  private dataEdit : any;
  @Input('dataEdit') set setDataEdit(dataEdit: any) {
    console.log('dataEdit',dataEdit);
    if (typeof dataEdit !== 'undefined') {
      this.dataEdit = dataEdit;
      console.log('dataEdit allocation = ', this.dataEdit);
      // function callback for app-lifepremium-ulink.ts
      if (typeof dataEdit['callback'] !== 'undefined') {
        // console.log('dataEdit["callback"] --->', dataEdit['callback']);
        this.callback = this.dataEdit['callback'];
        this.ulinkAllocateData.formEditPage = this.dataEdit['pageName'];

        this.prospect = this.dataEdit['prospect'];
        this.ulinkAllocateData.prospect = this.prospect;
        // console.log('dataEdit => this.prospect',this.prospect);
      }

      if (typeof dataEdit['allocationData'] !== 'undefined') {
          this.loadingCtrl.present();
          setTimeout(() => {
            this.setEditData();
            this.loadingCtrl.dismiss();
          }, 1000);

      }


    }
  }

  @Input('prospect') set setProspect(prospect: any) {
    this.prospect = prospect;
  }


  daftSaveList = [];

  constructor(
    private alertCtrl: AlertDirective,
    private http: Http,
    private cdRef: ChangeDetectorRef,
    private commonUtilProvider: CommonUtilProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private loadingCtrl: LoadingDirective,
    private modalCtrl: ModalController,
    private ulinkData: UlinkAppDataProvider,
    private ulinkAllocateData: UlinkAllocateProvider
  ) {
    this.callPdfList();

    this.http.get("assets/json/ulink/fund-performance.json").subscribe(data => {
      this.fundPerformance = data.json();
    });

    this.ulinkAllocateData.prospect = this.prospect;
    // console.log('this.toggle_footer',this.toggle_footer);
    // console.log('this.planCode',this.planCode)
    // this.planCode = this.ulinkData.planCode;

  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  sortData(sort: Sort) {
    /*const data = this.allocationData.data['0'].arrfund.slice();
  if (!sort.active || sort.direction == '') {
    this.sortedData = data;
    return;
  }

  this.sortedData = data.sort((a, b) => {
    let isAsc = sort.direction == 'asc';
    switch (sort.active) {
      case 'riskLevel': return compare(+a.riskLevel, +b.riskLevel, isAsc);
      case 'name': return compare(a.fundCode, b.fundCode, isAsc);
      //case 'riskInput': return compare(+a.riskInput, +b.riskInput, isAsc);
      default: return 0;
    }
  });*/

    this.sortedData.sort((a, b) => {
      let isAsc = sort.direction == "asc";
      switch (sort.active) {
        case "riskLevel":
          return compare(+a["riskLevel"], +b["riskLevel"], isAsc);
        case "name":
          return compare(a["fundCode"], b["fundCode"], isAsc);
        case "riskInput":
          return compare(+a["riskInput"], +b["riskInput"], isAsc);
        default:
          return 0;
      }
    });
  }

  /**
   * set กำหนดสัดส่วนการลงทุน
   */
  async setDefaultDropDownAndChoice(planCode,premiumtypeList){

    // console.log('planCode',planCode);
    // console.log('premiumtypeList',premiumtypeList);

    // await this.callPdfList();


    console.log('this.allocationData;',this.allocationData);

    if(planCode === 'UA01'){

      this.ulinkAllocateData.rspDefalutChoice = false;
      this.ulinkAllocateData.topDefalutChoice = false;

      // set choice

      // set RPP
      this.ulinkAllocateData.rppchoice = this.riskType.low;

      // set RSP
      this.ulinkAllocateData.rspchoice = '';

      // set TOP
      this.ulinkAllocateData.topchoice = this.riskType.low;


      // เช็คว่ามีการเลือก Default แล้วหรือยัง
      // if(premiumtypeList && !premiumtypeList.find((item)=>item.selected === true)){
        const dataPremiumtypeList = premiumtypeList && premiumtypeList.map((item)=>{
          if(item.value === 'rpp' && item.type.includes(planCode)){
            let itemSelected = {
              ...item,
              selected:true
            };
            this.premiumTypeSelected = itemSelected;
            return itemSelected;
          }
          return item;
        });
        // console.log('dataPremiumtypeList',dataPremiumtypeList);
        this.premiumtypeList = dataPremiumtypeList;
      // }

      console.log('this.ulinkAllocateData',this.ulinkAllocateData)

    }else if(planCode === 'UA02'){

      // set choice

      // set RPP
      this.ulinkAllocateData.rppchoice = this.riskType.low;

      // set RSP
      this.ulinkAllocateData.rspchoice = this.riskType.low;

       // set TOP
      this.ulinkAllocateData.topchoice = this.riskType.low;


      this.ulinkAllocateData.rspDefalutChoice = false;
      this.ulinkAllocateData.topDefalutChoice = false;

      // เช็คว่ามีการเลือก Default แล้วหรือยัง
      // if(premiumtypeList && !premiumtypeList.find((item)=>item.selected === true)){

        const dataPremiumtypeList = premiumtypeList && premiumtypeList.map((item)=>{
          if(item.value === 'rpp' && item.type.includes(planCode)){
            let itemSelected = {
              ...item,
              selected:true
            };
            this.premiumTypeSelected = itemSelected;
            return itemSelected;
          }
          return item;
        });
        console.log('dataPremiumtypeList',dataPremiumtypeList)
        this.premiumtypeList = dataPremiumtypeList;
      // }
    }
  }

  setDefaultdaftSaveListfund(){
    // set RPP
    // this.ulinkAllocateData.rppchoice = this.riskType.low;
    if(this.ulinkAllocateData.rppchoice){
      let rppFund = this.chooseFundByRisk(this.ulinkAllocateData.rppchoice);
      rppFund.riskInput = rppFund.riskInput ? rppFund.riskInput : "100";
      this.daftSaveListfund(rppFund,this.daftSaveList,this.premiumtypeList[0],99);
    }

    // set RSP
    // this.ulinkAllocateData.rspchoice = this.riskType.low;
    if(this.ulinkAllocateData.rspchoice){
      let rspFund =  this.chooseFundByRisk(this.ulinkAllocateData.rspchoice);
      rspFund.riskInput = rspFund.riskInput ? rspFund.riskInput : "100";
      this.daftSaveListfund(rspFund,this.daftSaveList,this.premiumtypeList[1],99);
    }

    // set TOP
    // this.ulinkAllocateData.topchoice = this.riskType.low;
    if(this.ulinkAllocateData.topchoice){
      let topFund =  this.chooseFundByRisk(this.ulinkAllocateData.topchoice);
      topFund.riskInput = topFund.riskInput ? topFund.riskInput : "100";
      this.daftSaveListfund(topFund,this.daftSaveList,this.premiumtypeList[3],99);
    }
  }

  updateDisplayRiskCustom(daftSaveList,sortedDataTabCustom,premiumTypeSelected){
    // ค้นหา type ที่เคยเลือกไว้
    let dataFilterUpdate = daftSaveList && daftSaveList.filter(item => item.choiceType === this.riskType.custom && premiumTypeSelected.value === item.premiumtype);

    let updateData:any = sortedDataTabCustom;
    //เอาข้อมูลมาไล่ update
    dataFilterUpdate && dataFilterUpdate.forEach((itemFilter) => {
      //ค้นหา fundID และ premiumtype เพื่อเช็คว่ามีข้อมูลซ้ำกันหรือไม่ ?
      let indexUpdate = updateData && updateData.findIndex((itemsUpdate) => itemsUpdate.fundID === itemFilter.fundID);
      if(indexUpdate !== -1){
        updateData[indexUpdate].riskInput = itemFilter.riskInput;
       }
    });

    return updateData;
  }

  chooseFundByRisk(typeRisk){
    let sortedDataTabLow: Array<Object> = [];
    let sortedDataTabMiddle: Array<Object> = [];
    let sortedDataTabHigh: Array<Object> = [];
    let sortedDataTabCustom: Array<Object> = [];

    for (let i = 0; i < this.allocationData.data[0].arrfund.length; i++) {
      const data = Object.assign({}, this.allocationData.data[0].arrfund[i], {
        riskInput: "",
        oldRiskInput: 0
      });

      if (data["fundCode"] == "TMBABF") {
        sortedDataTabLow.push(data);
      }
      // if (data["fundCode"] == "KFFLEX") {
      if (data["fundCode"] == "CIMB-PRINCIPAL iBALANCED-C") {
        sortedDataTabMiddle.push(data);
      }
      if (data["fundCode"] == "KFSEQ") {
        sortedDataTabHigh.push(data);
      }
      sortedDataTabCustom.push(data);
    }


    //chooseReturnFund

    if(typeRisk === this.riskType.low){
      return _.get(sortedDataTabLow,'[0]');
    }else if(typeRisk === this.riskType.medium){
      return _.get(sortedDataTabMiddle,'[0]');
    }else if(typeRisk === this.riskType.height){
      return _.get(sortedDataTabHigh,'[0]');
    }else if(typeRisk === this.riskType.custom){
      return sortedDataTabCustom;
    }

  }

  /**
   * เลือก TAB ระดับความเสี่ยง
   */
  private changeTabsRiskLevel(e) {

    // console.log("changeTabsRiskLevel func");
    // console.log(`[${e}] != tab[${this.currentTab}]`);

    // update tab active
    this.showTab = e;

    if (e != this.currentTab) {
      let sortedDataTabLow: Array<Object> = [];
      let sortedDataTabMiddle: Array<Object> = [];
      let sortedDataTabHigh: Array<Object> = [];
      let sortedDataTabCustom: Array<Object> = [];

      for (let i = 0; i < this.allocationData.data[0].arrfund.length; i++) {
        const data = Object.assign({}, this.allocationData.data[0].arrfund[i], {
          riskInput: "",
          oldRiskInput: 0
        });

        if (data["fundCode"] == "TMBABF") {
          sortedDataTabLow.push(data);
        }
        // if (data["fundCode"] == "KFFLEX") {
        if (data["fundCode"] == "CIMB-PRINCIPAL iBALANCED-C") {
          sortedDataTabMiddle.push(data);
        }
        if (data["fundCode"] == "KFSEQ") {
          sortedDataTabHigh.push(data);
        }

        sortedDataTabCustom.push(data);
      }

      switch (e) {
        case 3:
          console.log("กำหนดเอง");

          // console.log('this.daftSaveList',this.daftSaveList);
          // console.log('sortedDataTabCustom',sortedDataTabCustom);
          // console.log('this.premiumTypeSelected',this.premiumTypeSelected);
          // console.log('------------------------------------')

          let updateData = this.updateDisplayRiskCustom(this.daftSaveList,sortedDataTabCustom,this.premiumTypeSelected);
          let sumRisk:any = updateData.reduce((acc, cur:any) => Number(acc) + Number(cur.riskInput), 0);

          this.sortedData = sortedDataTabCustom;
          // this.sortData = updateData;
          this.totalRisk = sumRisk;
          // this.sortedData = updateData;
          // this.totalRisk = 0;

          //update data เมื่อ click
          this.updateChoiceType(this.premiumTypeSelected, this.riskType.custom);

          break;
        case 2:
          console.log("ความเสี่ยงสูง");
          sortedDataTabHigh[0]["riskInput"] = "100";
          this.sortedData = sortedDataTabHigh;
          this.totalRisk = 100;


          for (const index in this.sortedData) {
            if (this.sortedData.hasOwnProperty(index)) {
              const items = this.sortedData[index];
              // console.log('items',items);
              this.daftSaveListfund(items,this.daftSaveList,this.premiumTypeSelected,this.showTab);
            }
          }

          //update data เมื่อ click
          this.updateChoiceType(this.premiumTypeSelected, this.riskType.height);

          break;
        case 1:
          console.log("ความเสี่ยงปานกลาง");
          sortedDataTabMiddle[0]["riskInput"] = "100";
          this.sortedData = sortedDataTabMiddle;
          this.totalRisk = 100;

          for (const index in this.sortedData) {
            if (this.sortedData.hasOwnProperty(index)) {
              const items = this.sortedData[index];
              // console.log('items',items);
              this.daftSaveListfund(items,this.daftSaveList,this.premiumTypeSelected,this.showTab);
            }
          }

          //update data เมื่อ click
          // this.choiceType = this.riskType.medium;
          this.updateChoiceType(this.premiumTypeSelected, this.riskType.medium);

          break;
        case 0:
          console.log("ความเสี่ยงต่ำ");
          sortedDataTabLow[0]["riskInput"] = "100";
          this.sortedData = sortedDataTabLow;
          this.totalRisk = 100;

          for (const index in this.sortedData) {
            if (this.sortedData.hasOwnProperty(index)) {
              const items = this.sortedData[index];
              // console.log('items',items);
              this.daftSaveListfund(items,this.daftSaveList,this.premiumTypeSelected,this.showTab);
            }
          }

          //update data เมื่อ click
          // this.choiceType = this.riskType.low;
          this.updateChoiceType(this.premiumTypeSelected, this.riskType.low);

          break;
        default:
          console.log("ความเสี่ยงต่ำ");
          sortedDataTabLow[0]["riskInput"] = "100";
          this.sortedData = sortedDataTabLow;
          this.totalRisk = 100;

          for (const index in this.sortedData) {
            if (this.sortedData.hasOwnProperty(index)) {
              const items = this.sortedData[index];
              // console.log('items',items);
              this.daftSaveListfund(items,this.daftSaveList,this.premiumTypeSelected,this.showTab);
            }
          }

          //update data เมื่อ click
          // this.choiceType = this.riskType.low;
          this.updateChoiceType(this.premiumTypeSelected, this.riskType.low);
          break;
      }
      this.currentTab = e;
      this.showPieData = false;
      console.log("sortedData", this.sortedData);
    }
  }



  private async callFileFund(mode, profile) {
    console.log("callFileFund func");

    let reqModel: RequestModel = new RequestModel();
    reqModel.agentid = profile.agentid;
    reqModel.mode = mode;
    reqModel.functionName = FunctionName.UNITLINKAPI;
    reqModel.param = [
      {
        ulink: "",
        operation: "allfilefund"
      }
    ];
    await this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
      (res: any) => {
        if (res.datas[0]) {
          let tm1 = res.datas[0];
          this.allFileFundData = JSON.parse(tm1);

          for (
            let i = 0;
            i < this.allFileFundData.data[0].allfilefund.length;
            i++
          ) {
            // console.log(' AA', this.allFileFundData.data[0].allfilefund[i])
            Array.prototype.push.apply(
              this.allFileFundArray,
              this.allFileFundData.data[0].allfilefund[i]
            );
          }
        } else {
          console.log("No allfilefund");
        }
      },
      err => {
        console.log("allfilefund err", err);
      }
    );
    console.log("allFileFundArray A", this.allFileFundArray);
  }

  private async callPdfList() {
    console.log("callPdfList func");

    this.storage.get("tlpromptMode").then(async mode => {
      this.storage.get("loginProfile").then(async profile => {
        await this.callFileFund(mode, profile);

        let reqModel: RequestModel = new RequestModel();
        reqModel.agentid = profile.agentid;
        reqModel.mode = mode;
        reqModel.functionName = FunctionName.UNITLINKAPI;
        reqModel.param = [
          {
            ulink: "",
            operation: "allffsfund"
          }
        ];

        this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          (res: any) => {
            // console.log('allffsfund res : ',res)

            if (res.datas[0]) {
              let tm1 = res.datas[0];
              this.allocationData = JSON.parse(tm1);
              this.allocationArray = this.allocationData.data[0].arrfund;
              console.log("tm1 allocationArray : ", this.allocationArray);


              if (typeof this.dataEdit === 'undefined' || this.dataEdit['allocationData']['data'].length === 0) {
                //set Default value
                this.changeTabsRiskLevel(0);
                this.setDefaultdaftSaveListfund();
              }



            } else {
              console.log("No PDF File");
            }
          },
          err => {
            console.log("Call Service PDF Error : ", err);
            this.alertCtrl.error(err);
            // this.loadingCtrl.dismiss();
          }
        );
      });
    });
  }
  /**
   * func search fund file's name by last update
   */
  private findMonthAndSeqByFundId(fundId) {
    console.log("fundId ", fundId);
    let _dupFund = [];
    let _result_ffsName;
    this.allFileFundArray.forEach(value => {
      if (fundId == value.fundID) {
        _dupFund.push(value);
      }
    });
    // console.log('_dupFund obj ',_dupFund)

    let _maxMonth = _dupFund[1].month;

    for (var i = 0; i < _dupFund.length - 1; i++) {
      console.log(
        " number  ",
        Number(_dupFund[i + 1].month) + " > " + Number(_dupFund[i].month)
      );
      if (Number(_dupFund[i + 1].month)) {
        if (Number(_dupFund[i + 1].month) > _maxMonth) {
          _maxMonth = _dupFund[i + 1].month;
          // console.log(i+'_result_ffsName'+_result_ffsName)
          _result_ffsName =
            "FFS_" +
            _maxMonth +
            "_" +
            _dupFund[i + 1].fundID +
            "_" +
            _dupFund[i + 1].sequence;
          this.pdfName_open = _dupFund[i + 1].filename;
        }
      }
    }
    console.log("_result_ffsName  ", _result_ffsName);
    this.ffsFullName = _result_ffsName;
  }

  private async openPdf(obj) {
    console.log("openPdf func", obj);
    this.loadingCtrl.present();

    await this.findMonthAndSeqByFundId(obj.fundID);
    console.log("ffsFullName ", this.ffsFullName);
    this.storage.get("tlpromptMode").then(async mode => {
      this.storage.get("loginProfile").then(async profile => {
        let engNameComm = '"' + this.pdfName_open + '"';
        let ffsNameComm = '"' + this.ffsFullName + '"';

        let reqModel: RequestModel = new RequestModel();
        reqModel.agentid = profile.agentid;
        reqModel.mode = mode;
        reqModel.functionName = FunctionName.UNITLINKAPI;
        reqModel.param = [
          {
            // "ulink": "{\"filename\":\"FFS_255911_02004_01\",\"name\":" + engNameComm + "}",
            ulink:
              '{"filename":' + ffsNameComm + ',"name":' + engNameComm + "}", //FFS_256008_03002_01
            operation: "getffspdf"
          }
        ];
        // console.log('reqModel',reqModel)
        this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
          (res: any) => {
            console.log("api res : ", res);
            let tm1 = JSON.parse(res.datas[0]);
            console.log("tm1 : ", tm1);

            if (tm1 && tm1.data[0] && tm1.data[0].pathpdf) {
              const rawdata = tm1.data[0].pathpdf;

              const pdfData = "data:application/pdf;base64," + rawdata;

              let data = {
                pdfDetail: {
                  pageTotal: tm1.totalRecord,
                  pdfName: this.pdfName_open, //fundCode allo , fileName in allfile
                  // pdfName: "CIMB-PRINCIPAL_GSA.pdf",
                  src: pdfData
                }
              };

              console.log("success PDF File", data);
              this.navCtrl.push(PdfViewdataPage, data);
            } else {
              console.log("No PDF File");
              this.alertCtrl.warning("เกิดข้อผิดพลาดของระบบ");
            }
            this.loadingCtrl.dismiss();
          },
          err => {
            console.log("Call Service PDF Error : ", err);
            this.alertCtrl.warning("เกิดข้อผิดพลาดของระบบ");
            this.loadingCtrl.dismiss();
          }
        );
      });
    });
  }

  private openFundData() {
    console.log("openFundData func");

    let modal = this.modalCtrl.create(
      AllocationModalComponent,
      {
        allFileFundArray: this.allFileFundArray,
        allocationArray: this.allocationArray
      },
      { cssClass: "popup-allocation" }
    );
    modal.present();
  }

  /** คำนวนเงื่อนไขในการกรอก เปอร์เซ็นความเสี่ยง */
  private calculateRisk(event, data, index) {
    console.log("event =>", event);
    console.log("data =>", data);

    this.showPieData = false;

    const value = event.target.value;

    const srtData = this.sortedData[index];

    const oldRiskInput = srtData["oldRiskInput"];
    const riskInput = srtData["riskInput"];

    if (value > 0 && value < 5) {
      this.alertCtrl.warning("สัดส่วนการลงทุนขั้นต่ำ 5%");
      event.srcElement.value = riskInput;
    } else {
      let riskCalData = 0;
      srtData["oldRiskInput"] = Number(riskInput);
      srtData["riskInput"] = value;

      // calculate total
      for (let data of this.sortedData) {
        const numberRisk = Number(data["riskInput"]);
        riskCalData = riskCalData + numberRisk;
      }

      if (riskCalData > 100) {
        this.alertCtrl.warning(
          "คุณสามารถกรอกเปอร์เซ็นต์ความเสี่ยงได้อีก " +
            (100 - this.totalRisk) +
            " %"
        );
        srtData["riskInput"] = riskInput;
        srtData["oldRiskInput"] = oldRiskInput;

        event.srcElement.value = riskInput;
      } else {
        this.totalRisk = riskCalData;

        //สำรองข้อมูลก่อน save
        this.daftSaveListfund(data,this.daftSaveList,this.premiumTypeSelected,this.showTab);
      }
    }
  }

  private calculatePieChart() {
    let dataList: Array<Object> = [];
    let _fundDataList: Array<Object> = [];

    for (let i = 0; i < this.sortedData.length; i++) {
      const data = this.sortedData[i];
      const numberRisk = Number(data["riskInput"]);
      if (numberRisk > 0) {
        dataList.push(data);
      }
    }

    let _pieChartLabels: Array<any> = new Array(dataList.length);
    let _pieChartData: Array<any> = new Array(dataList.length);
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      const numberRisk = Number(data["riskInput"]);

      _pieChartLabels[i] = data["fundCode"];
      _pieChartData[i] = numberRisk;
    }

    // if(this.currentTab == 0){
    //   this.pieChartLabels = ['TMBABF'];
    //   this.pieChartData = [100];
    // }
    // else if(this.currentTab == 1){
    //  this.pieChartLabels = ['KFFLEX','TMBABF'];
    //  this.pieChartData = [50, 50];
    // }
    // else if(this.currentTab == 2){
    //   this.pieChartLabels = ['KFSEQ', 'KFFLEX', 'TMBABF'];
    //   this.pieChartData = [5, 80, 15];
    // }else {
    //   this.pieChartLabels = _pieChartLabels;
    //   this.pieChartData = _pieChartData;
    // }

    this.pieChartLabels = _pieChartLabels;
    this.pieChartData = _pieChartData;

    // cal percent table
    let _cal3M = 0;
    let _cal3MSD = 0;
    let _cal6M = 0;
    let _cal6MSD = 0;
    let _cal1Y = 0;
    let _cal1YSD = 0;
    let _cal3Y = 0;
    let _cal3YSD = 0;
    let _cal5Y = 0;
    let _cal5YSD = 0;
    let _cal10Y = 0;
    let _cal10YSD = 0;
    let _calST = 0;
    let _calSTSD = 0;
    console.log("fundPerformance : ", this.fundPerformance);
    for (let data of dataList) {
      const numberRisk = Number(data["riskInput"]);
      const fundCode = data["fundCode"];

      for (let fundData of this.fundPerformance.performance) {
        if (fundData.fund == fundCode) {
          _fundDataList.push(fundData); // for Return
          _fundDataList.push(fundData); // for SD

          _cal3M = _cal3M + (numberRisk / 100) * Number(fundData["3M"]);
          _cal3MSD = _cal3MSD + (numberRisk / 100) * Number(fundData["3MSD"]);
          _cal6M = _cal6M + (numberRisk / 100) * Number(fundData["6M"]);
          _cal6MSD = _cal6MSD + (numberRisk / 100) * Number(fundData["6MSD"]);
          _cal1Y = _cal1Y + (numberRisk / 100) * Number(fundData["1Y"]);
          _cal1YSD = _cal1YSD + (numberRisk / 100) * Number(fundData["1YSD"]);
          _cal3Y = _cal3Y + (numberRisk / 100) * Number(fundData["3Y"]);
          _cal3YSD = _cal3YSD + (numberRisk / 100) * Number(fundData["3YSD"]);
          _cal5Y = _cal5Y + (numberRisk / 100) * Number(fundData["5Y"]);
          _cal5YSD = _cal5YSD + (numberRisk / 100) * Number(fundData["5YSD"]);
          _cal10Y = _cal10Y + (numberRisk / 100) * Number(fundData["10Y"]);
          _cal10YSD =
            _cal10YSD + (numberRisk / 100) * Number(fundData["10YSD"]);
          _calST = _calST + (numberRisk / 100) * Number(fundData["total"]);
          _calSTSD =
            _calSTSD + (numberRisk / 100) * Number(fundData["totalSD"]);

          break;
        }
      }
    }

    this.cal3M = this.addper(isNaN(_cal3M) ? "N/A" : _cal3M.toFixed(2));
    this.cal3MSD = this.addper(isNaN(_cal3MSD) ? "N/A" : _cal3MSD.toFixed(2));
    this.cal6M = this.addper(isNaN(_cal6M) ? "N/A" : _cal6M.toFixed(2));
    this.cal6MSD = this.addper(isNaN(_cal6MSD) ? "N/A" : _cal6MSD.toFixed(2));
    this.cal1Y = this.addper(isNaN(_cal1Y) ? "N/A" : _cal1Y.toFixed(2));
    this.cal1YSD = this.addper(isNaN(_cal1YSD) ? "N/A" : _cal1YSD.toFixed(2));
    this.cal3Y = this.addper(isNaN(_cal3Y) ? "N/A" : _cal3Y.toFixed(2));
    this.cal3YSD = this.addper(isNaN(_cal3YSD) ? "N/A" : _cal3YSD.toFixed(2));
    this.cal5Y = this.addper(isNaN(_cal5Y) ? "N/A" : _cal5Y.toFixed(2));
    this.cal5YSD = this.addper(isNaN(_cal5YSD) ? "N/A" : _cal5YSD.toFixed(2));
    this.cal10Y = this.addper(isNaN(_cal10Y) ? "N/A" : _cal10Y.toFixed(2));
    this.cal10YSD = this.addper(
      isNaN(_cal10YSD) ? "N/A" : _cal10YSD.toFixed(2)
    );
    this.calST = this.addper(isNaN(_calST) ? "N/A" : _calST.toFixed(2));
    this.calSTSD = this.addper(isNaN(_calSTSD) ? "N/A" : _calSTSD.toFixed(2));
    this.fundDataList = _fundDataList;

    this.showPieData = true;
  }

  addper(per) {
    try {
      if (per == "N/A") {
        return per;
      }
      return per + "%";
    } catch (e) {
      console.log(e);
    }
  }

  premiumTypeChange(dataSelected, choiceType) {
    // console.log(
    //   "premiumTypeChange this.ulinkAllocateData",
    //   this.ulinkAllocateData
    // );
    if (dataSelected && choiceType) {

      this.currentTab = 99;

      switch (dataSelected.value) {
        case "top":
          this.activeTab(this.ulinkAllocateData.topchoice);
          break;
        case "rsp":
          this.activeTab(this.ulinkAllocateData.rspchoice);
          break;
        case "rpp":
          this.activeTab(this.ulinkAllocateData.rppchoice);
          break;
      }
    }
  }
  //testSave data
  async saveDataAllocation() {


    this.ulinkAllocateData.prospect = this.prospect;

    this.loadingCtrl.present();
    this.disableSaveButton  = true;
    let dataRes = await this.ulinkAllocateData.saveAllocate().then(res => res);
    if(dataRes['saveAllSuccess']){
      this.alertCtrl.warning('บันทึกสำเร็จ');

    }

    this.disableSaveButton  = false;
    this.loadingCtrl.dismiss();


    //callback to page AppLifepremiumUlinkPage
    //console.log('this.ulinkAllocateData JOKEY --->', this.ulinkAllocateData);
    if(this.ulinkAllocateData.formEditPage == 'AppLifepremiumUlinkPage'){
      this.callback(dataRes);
      let callBackAppAllocation = this.dataEdit['callBackAppAllocation'];
      callBackAppAllocation();
      //this.navCtrl.pop();
    }


    // console.log('await saveDataAllocation',this.disableSaveButton);

    //this.ulinkAllocateData.testSaveAllocate();

  }
  //
  async activeTab(choiceType) {
    switch (choiceType) {
      case this.riskType.low:
        this.showTab = 0;
        // this.currentTab = null;
        this.choiceType = this.riskType.low;
        this.changeTabsRiskLevel(0);
        break;
      case this.riskType.medium:
        this.showTab = 1;
        this.choiceType = this.riskType.medium;
        // this.currentTab = null;
        this.changeTabsRiskLevel(1);
        break;
      case this.riskType.height:
        this.showTab = 2;
        this.choiceType = this.riskType.height;
        // this.currentTab = null;
        this.changeTabsRiskLevel(2);
        break;
      case this.riskType.custom:
        this.showTab = 3;
        this.choiceType = this.riskType.custom;
        // this.currentTab = null;
        this.changeTabsRiskLevel(3);
        break;
    }
  }

  updateChoiceType(dataSelected, choiceType) {
    if (dataSelected && choiceType) {
      this.choiceType = choiceType;
      this.showTab = this.getRiskByKey(choiceType);
      switch (dataSelected.value) {
        case "top":
          this.ulinkAllocateData.topchoice = choiceType;
          break;
        case "rsp":
          this.ulinkAllocateData.rspchoice = choiceType;
          break;
        case "rpp":
          this.ulinkAllocateData.rppchoice = choiceType;
          break;
      }
    }
  }

  displayPremiumType(premiumtypeList = [], planCode = '') {
    if (planCode && premiumtypeList) {
      return premiumtypeList.filter(
        data => data && data.type.includes(planCode)
      );
    }
    return premiumtypeList;
  }

  displayCheckBoxPremiumType(premiumtypeList = [], planCode = '',TypeCheckbox) {
    if (planCode && premiumtypeList) {
      return premiumtypeList.filter(
        data => data
        && data.type.includes(planCode)
        && data.value === TypeCheckbox
        && data.value !== 'rpp'
      );
    }

    this.cdRef.detectChanges();

    return premiumtypeList;
  }

  displayContainer(rspDefalutChoice,topDefalutChoice,premiumTypeSelected){
    if(rspDefalutChoice && premiumTypeSelected === 'rsp'){
      return false;
    }else if(topDefalutChoice && premiumTypeSelected === 'top'){
      return false;
    }
    return true;
  }




  daftSaveListfund(dataInput:any,daftSaveList:any,premiumTypeSelected:any,showTab:any){
    if(premiumTypeSelected){
      let indexUpdate = _.findIndex(daftSaveList, {
        //ค้นหา fundID และ premiumtype เพื่อเช็คว่ามีข้อมูลซ้ำกันหรือไม่ ?
        fundID: dataInput.fundID,
        premiumtype: premiumTypeSelected.value,
        choiceType: this.getRiskByIndex(showTab)
      });
      if(indexUpdate === -1){
        daftSaveList.push({
          fundID: dataInput.fundID,
          riskInput: dataInput.riskInput,
          premiumtype: premiumTypeSelected.value,
          choiceType: this.getRiskByIndex(showTab)
        });
      }else{
        daftSaveList[indexUpdate] = {
          fundID: dataInput.fundID,
          riskInput: dataInput.riskInput,
          premiumtype: premiumTypeSelected.value,
          choiceType: this.getRiskByIndex(showTab)
        };
      }
    }

    this.ulinkAllocateData.chooseFundData = daftSaveList;
    console.log('daftSaveListAfrer',daftSaveList)
    // dataInput.find()
  }

  getRiskByIndex(showTab){
    let respone;
    switch (showTab) {
      case 0:
        respone = this.riskType.low;
        break;
      case 1:
        respone = this.riskType.medium;
        break;
      case 2:
        respone = this.riskType.height;
        break;
      case 3:
        respone = this.riskType.custom;
        break;
      default:
        respone = this.riskType.low;
        break;
    }
    return respone;
  }

  getRiskByKey(riskType){
    let respone;
    switch (riskType) {
      case this.riskType.low:
        respone = 0;
        break;
      case this.riskType.medium:
        respone = 1;
        break;
      case this.riskType.height:
        respone = 2;
        break;
      case this.riskType.custom:
        respone = 3;
        break;
      default:
        respone = 0;
        break;
    }
    return respone;
  }

  private async setEditData() {

    await this.getAllocation();

    let data = this.dataEdit['allocationData']['data'][0];
    let rppchoice = data['rppchoice'];
    let rspchoice = data['rspchoice'];
    let topchoice = data['topchoice'];

    let dataList: Array<any> = data['listDetail'];

    this.ulinkAllocateData.rppchoice = rppchoice;
    this.ulinkAllocateData.rspchoice = rspchoice;
    this.ulinkAllocateData.topchoice = topchoice;

    if(this.planCode == 'UA01'){

      //setDefault checkbox rpp
     this.ulinkAllocateData.topDefalutChoice = topchoice === 'rpp' ? true : false;
     dataList.forEach((item)=>{

        let choiceType = '';
        if(item.premiumtype === 'rpp'){
          choiceType = rppchoice;
        }else if(item.premiumtype === 'rsp'){
          choiceType = rspchoice;
        }else if(item.premiumtype === 'top'){
          choiceType = topchoice;
        }

        let dataItem = {
            fundID: item.fundcode,
            riskInput: item.percent,
            premiumtype: item.premiumtype
          };
        let premiumTypeSelected = {
          value: item.premiumtype
        };
        this.daftSaveListfund(dataItem,this.daftSaveList, premiumTypeSelected ,this.getRiskByKey(choiceType));
      });

    }else if(this.planCode == 'UA02'){

      //setDefault checkbox rpp
      this.ulinkAllocateData.topDefalutChoice = topchoice === 'rpp' ? true : false;
      this.ulinkAllocateData.rspDefalutChoice = rspchoice === 'rpp' ? true : false;

      dataList.forEach((item)=>{
        let choiceType = '';
        if(item.premiumtype === 'rpp'){
          choiceType = rppchoice;
        }else if(item.premiumtype === 'rsp'){
          choiceType = rspchoice;
        }else if(item.premiumtype === 'top'){
          choiceType = topchoice;
        }

        let dataItem = {
          fundID: item.fundcode,
          fundCode: item.fundCode,
          riskInput: item.percent,
          premiumtype: item.premiumtype
        };
        let premiumTypeSelected = {
          value: item.premiumtype
        };
        this.daftSaveListfund(dataItem,this.daftSaveList, premiumTypeSelected ,this.getRiskByKey(choiceType));
      });

    }
    await this.activeTab(rppchoice);
  }

  private async getAllocation(){
    const customerId = this.prospect.customerID;
    console.log('this.quotation.customerId--->', customerId);
    await this.ulinkAllocateData.getAllocationByCustomerId(customerId).then(
      (res)=>{
        console.log("allocationByCustomerId  res : ",res);
        if(res['data'].length > 0){
          // let data = res['data'][0];
          this.dataEdit['allocationData'] = res;
        }
      },
      (err)=> {
        console.log(err);

      }
    );
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
