import { PopupTableComponent } from './../../../components/utility/popup-table/popup-table';
import { ExtendedM } from './../../../providers/extended/extended-model';
import { Broadcaster } from './../../../providers/utility/broadcaster';
import { RequestModel } from './../../../providers/model/request-model';
import { ServiceName } from './../../../providers/constants/service-name';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { TLPlanModel } from './../../../providers/tlplan/tlplan-model';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal } from 'ionic-angular';
import { FunctionName } from '../../../providers/constants/function-name';
import { ApiProvider } from '../../../providers/api/api';
import { QuatationValueCal } from '../../../providers/utility/quatation-value-cal';
import { Subscription } from 'rxjs';


/**
 * Generated class for the QuatationValuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quatation-value',
  templateUrl: 'quatation-value.html',
})
export class QuatationValuePage implements OnDestroy {

  private tableValueHeader : string[][] = [];
  private tableValueDetail : string[][] = [];
  private tableValueDetailShow : boolean[] = [];
  private first_index_show : number = 0;
  private tableD03 : string[][] = []; // ทร.ตลอดชีพ
  
  private plancode : string = '';
  // private riderD03 : Object = {};

  private quatationSum : number = 0;
  private quatationPremium : number = 0;
  private premiumFooter : number = 0;
  private sumD03 : number = 0;
  
  private age : number = 0;
  private sex : string = '';

  private tlplan : TLPlanModel = null;
  private listExtend : Array<any> = [];
  private list_extendedD03 : Array<any> = [];

  private isChange_prospect : boolean = false;
  private isChange_quatationPlan : boolean = false;
  private isChange_quatationSum : boolean = false;
  private isChange_riderD03 : boolean = false;

  private currentPage : number = 0;
  private totalPage : number = 0;
  private pageSize : number = 10;
  private tableValueDetail_show : string[][] = [];

  private planName: string;
  
  private subscription: Array<Subscription> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private modalCtrl: ModalController,
    private apiProvider: ApiProvider,
    private broadcaster: Broadcaster,
    private quatationValueCal : QuatationValueCal
  )
  {
    // เฝ้าติดตามค่าข้อมูลผู้มุ่งหวัง
    this.subscription.push(this.broadcaster.on('quatationStep').subscribe(res => {
      let healthTab : number = res;
      // console.log('healthTab : '+healthTab);
      // console.log(' isChange_quatationPlan : '+this.isChange_quatationPlan+
      // ' isChange_prospect : '+this.isChange_prospect+
      // ' isChange_quatationSum : '+this.isChange_quatationSum+
      // ' isChange_riderD03 : '+this.isChange_riderD03);
      if(healthTab === 4) {  //มูลค่า
        this.changePlan();
        // if(this.isChange_quatationPlan){
        //   this.changePlan();
        // }
        // else if(this.isChange_prospect){
        //   this.changeProspect();
        // }
        // else if(this.isChange_quatationSum){
        //   this.setTableDetail();
        // }
        this.isChange_prospect = false;
        this.isChange_quatationPlan = false;
        this.isChange_quatationSum = false;
      }
    }));
    // อัปเดตแบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('quatationPlan').subscribe(res => {
      if(this.plancode != res){
        this.plancode = res;
        this.isChange_quatationPlan = true;
      }
    }));
    // อัปเดตสัญญาเพิ่มเติม
    this.subscription.push(this.broadcaster.on('rider').subscribe(res => {
      // console.log('onchange rider : '+JSON.stringify(res));
      let rider : Object = res;
      if(rider != null){
        if(rider['D03'] != null){
          if(this.sumD03 != rider['D03'].sum){
            this.sumD03 = rider['D03'].sum;
            this.isChange_riderD03 = true;
          }
        }
        else{
          this.sumD03 = 0;
        }
      }
      else{
        this.sumD03 = 0;
      }
    }));
    // ทุนประกัน
    this.subscription.push(this.broadcaster.on('quatationSum').subscribe(res => {
      this.quatationSum = res;
      this.isChange_quatationSum = true;

      if(this.tlplan != undefined || this.tlplan != null){
        let arrayTLplan34 : string = this.tlplan.calType;
        if(arrayTLplan34 == '1'){
          this.isChange_riderD03 = true;
        }
      }
    }));
    // เบี้ยประกันภัยรวม
    this.subscription.push(this.broadcaster.on('quatationPremium').subscribe(res => {
      this.quatationPremium = res;
    }));

    /**เบี้ยประกันภัยหลัก(เบี้ยชีวิต) */
    this.subscription.push(this.broadcaster.on('premiumFooter').subscribe(res=>{
      this.premiumFooter = res;
      //console.log("Pre >>>>>> "+this.premiumFooter);
    }));

    this.subscription.push(this.broadcaster.on('prospect').subscribe(res =>{
      let prospect = res;
      this.isChange_prospect = false;
      if(this.sex != prospect.gender){
        this.sex = prospect.gender
        this.isChange_prospect = true;
      }
      if(this.age != prospect.age){
        this.age = prospect.age
        this.isChange_prospect = true;
      }
    }));

    // แบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
      this.tlplan = res[0];
      this.planName = res[0].planName;
    }));
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  } 

  private changePlan() : void{
    this.tableValueDetail = [];
    this.tableValueDetail_show = [];
    this.changePage(1);
    if(this.plancode != null && this.plancode != ''){
      this.setHeader(this.plancode);
      this.changeProspect();
      this.detailD03();
    }
    
  }
  private changeProspect(){
    if(this.tlplan != null){
      let insurage : string = this.age < 10 ? '0'+this.age : ''+this.age;

      let objM: ExtendedM = new ExtendedM();
      objM.plancode = this.plancode;//Require = Y
      objM.sex = this.sex;//Require = Y
      objM.insuredage = insurage;//Require = Y

      let objMs: Array<ExtendedM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.EXTENDED;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          this.listExtend = res['data'];
        },
        (err) => {
          console.log(err);
          throw new Error(err);
        }
      ).then(
        () => {
          this.setTableDetail();
        }
      );
    }
  }
  private changeD03() : void{
    this.tableD03 = [];
    if(this.sumD03 > 0){
      let insurage : string = this.age < 10 ? '0'+this.age : ''+this.age;

      let objM: ExtendedM = new ExtendedM();
      objM.plancode = 'D03';//Require = Y
      objM.sex = this.sex;//Require = Y
      objM.insuredage = insurage;//Require = Y
      objM.year = "1";//Require = Y

      let objMs: Array<ExtendedM> = [];
      objMs.push(objM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.EXTENDED;
      reqM.serviceName = ServiceName.SELECT;
      reqM.param = objMs;

      this.apiProvider.callData(reqM).then(
        (res) => {
          this.list_extendedD03 = res['data'];
          // console.log(JSON.stringify(this.list_extendedD03));
        },
        (err) => {
          console.log(err);
          throw new Error(err);
        }
      ).then(
        () => {
          this.detailD03();
        }
      );
    }
  }
  private setTableDetail() : void{
    // console.log('changeProspect listExtend : '+JSON.stringify(this.listExtend));
    // console.log('change plan age : '+this.age+' sex : '+this.sex+' plancode : '+this.plancode);
    if(this.tlplan != null && this.listExtend.length > 0){
      let arrayTLplan34 : string = '1';
      let arrayTLplan38 : string = '00';
  
      if(this.tlplan != undefined || this.tlplan != null){
        arrayTLplan34 = this.tlplan.calType;
        arrayTLplan38 = this.tlplan.pensionAge;
      }
      
      let arr1 : string[] = this.quatationValueCal.getYear(this.plancode, this.listExtend, this.tlplan, this.age);
      let arr2 : string[] = this.quatationValueCal.getPolicyReturn(this.plancode, this.quatationSum, this.listExtend, this.tlplan, this.age);
      let arr3 : string[] = [];
      let arr4 : string[] = [];
      let arr5 : string[] = [];
      let arr6 : string[] = [];
      let arr7 : string[] = [];
  
      this.setDetail(arr3, arr4, arr5, arr6, arr7);
      this.quatationValueCal.setQuotationValueTable(this.plancode, this.tlplan, this.age, arr3, arr4, arr5, arr6, arr7);
      this.setTableValueDetail(arr1, arr2, arr3, arr4, arr5, arr6, arr7);
    }
  }

  private setDetail(arr3 : string[], arr4 : string[], arr5 : string[], arr6 : string[], arr7 : string[]) : void{
    
    let unitsum = this.quatationValueCal.calPlanUnitsum(this.plancode, this.quatationSum);
    
    let listExtend : Array<any> = this.listExtend;
    let text_replace = this.quatationValueCal.isIslam(this.plancode) ? '' : '-';
    for(let i = 0; i < listExtend.length; i++){
      
      if(listExtend[i].paidupcash == 0){
        arr3[i] = text_replace;
      }
      else{
        let paidUpCash : number = listExtend[i].paidupcash;
        arr3[i] = ""+(Math.round(paidUpCash * unitsum))
      }
      if(listExtend[i].paidupsum == 0){
        arr4[i] = text_replace;
      }
      else{
        let paidUpSum : number = listExtend[i].paidupsum;
        arr4[i] = ""+(Math.round(paidUpSum * unitsum));
      }
      arr5[i] = listExtend[i].extendyear == '' ? text_replace : listExtend[i].extendyear;
      arr6[i] = listExtend[i].extendday == '' ? text_replace : listExtend[i].extendday;
      if(listExtend[i].pureendowment == ''){
        arr7[i] = text_replace;
      }
      else{
        let pureEndowment : number = listExtend[i].pureendowment;
        arr7[i] = ""+(Math.round(pureEndowment * unitsum));
      }
    }
  }

  private setHeader(plancode : string) : void{
    let code = plancode.substring(0,2);
    if(this.quatationValueCal.isIslam(this.plancode)){
      this.tableValueHeader = [
        ['วันครบรอบสัญญาตะกาฟุล', 'เงินค่าเวนคืนสัญญาตะกาฟุล', '', ''],
        ['', '', '', '', '']
      ];
    }
    else{
      this.tableValueHeader = [
        ['วันครบรอบปีกรมธรรม์ที่', 'เงินค่าเวนคืนกรมธรรม์', 'กรมธรรม์ใช้เงินสำเร็จ', 'การขยายระยะเวลา'],
        ['เงินจ่ายคืนทันที', 'มูลค่าใช้เงินสำเร็จ', 'ปี', 'วัน', 'เงินครบกำหนด']
      ];
    }
  }
  private setTableValueDetail(arr1 : string[], arr2 : string[], arr3 : string[], arr4 : string[], arr5 : string[], arr6 : string[], arr7 : string[]) : void{
    this.tableValueDetail = [];
    this.tableValueDetailShow = [];
    for(let i = 0; i < arr1.length; i++){
      this.tableValueDetailShow[i] = false;
      this.tableValueDetail[i] = [arr1[i], arr2[i], arr3[i], arr4[i], arr5[i], arr6[i], arr7[i]];
    }
    
    this.changePage(1);
    // console.log('tableValueDetail : '+JSON.stringify(this.tableValueDetail))
  }

 public openTRAllLife(): void{
    if(this.isChange_riderD03){
      this.changeD03();
      this.isChange_riderD03 = false;
    }
    else{
      this.showModal();
    }
  }
  private showModal() : void{
    let params : Object = this.setModalDetail();
    let modal = this.modalCtrl.create(PopupTableComponent, params);
    modal.present();
  }
  private setModalDetail() : Object{
    let content : string = 'ไม่มีข้อมูลของ ทรตลอดชีพ';
    let tableHeader : string[][] = [];
    let tableBody : string[][] = [];
    let tableBodyClass : string[] =["txt-center"];
    if(this.tableD03.length > 0)
    {
      content = null;
      tableHeader[0] = ['สิ้นปีกรมธรรม์ที่', 'เงินค่าเวนคืน'];
      for(let i = 0; i < this.tableD03.length; i++){
        let var2 = (this.tableD03[i][1] == '' || this.tableD03[i][1] == '-') ? this.tableD03[i][1] : this.formatNumber(this.tableD03[i][1]);
        tableBody[i] = [this.tableD03[i][0], var2];
      }
    }
    let params : Object = {
      'title' : 'สัญญาเพิ่มเติม คุ้มครองการเสียชีวิตทุพพลภาพ และโรคร้ายแรง ตลอดชีพ'
      , 'tableHeader' : tableHeader
      , 'tableBody' : tableBody
      , 'content' : content
      , 'tableBodyClass' : tableBodyClass
    };
    return params;
  }
  // setting data of ทร.ตลอดชีพ
  private detailD03() : void
  {
    if(this.sumD03 > 0) //
    {
      let arrayTLplan34 : string = '1';
      // let arrayTLplan38 : string = '00';
      if(this.tlplan != undefined || this.tlplan != null){
        arrayTLplan34 = this.tlplan.calType;
        // arrayTLplan38 = this.tlplan.pensionAge;
      }
      
      if(this.list_extendedD03.length > 0){
        let unitsum : number = this.quatationValueCal.calRaiderD03Unitsum(this.plancode, this.quatationSum, this.sumD03, arrayTLplan34);
        if(unitsum > 0){
          let arr1 : string[] = [];
          let arr2 : string[] = [];
          
          for (var i=0; i < this.list_extendedD03.length ; i++) 
          {
            arr1[i] = this.list_extendedD03[i].year ;
            arr2[i] = this.list_extendedD03[i].cashvalue == '' ? '-' : ''+(this.list_extendedD03[i].cashvalue * unitsum);
          }
          this.setTableD03(arr1, arr2);
          this.showModal();
        }
      }
    }
  }
  private setTableD03(arr1 : string[], arr2 : string[]){
    for(let i = 0; i < arr1.length; i++){
      this.tableD03[i] = [arr1[i], arr2[i]];
    }
  }
  private formatNumber (num) : string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }
  //------- click on table ----------
  private changeTableValueDetailShow(index : number){
    this.tableValueDetailShow[index] = !this.tableValueDetailShow[index];
  }
  //------- page -------------------
  private changePage(page:number) : void {
    this.totalPage = Math.ceil(this.tableValueDetail.length / this.pageSize);
    this.totalPage = this.totalPage === 0 ? 1 : this.totalPage;
    if (page < 1)  {
      return;
    } else if(page > this.totalPage){
      page = this.totalPage;
    }
    this.currentPage = page;
    this.setDataShow();
  }
  private setDataShow() : void{
    this.tableValueDetail_show = [];
    if(this.tableValueDetail.length > 0){
      let first_index : number = (this.currentPage-1)*this.pageSize;
      this.first_index_show = first_index;
      let max : number = first_index+this.pageSize;
      if(max > this.tableValueDetail.length)
        max = this.tableValueDetail.length;
      
      for(let i = first_index; i < max; i++){
        this.tableValueDetail_show.push(this.tableValueDetail[i]);
      }
    }
  }
}
