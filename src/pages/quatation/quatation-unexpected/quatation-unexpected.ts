import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { PopupUnexpectedComponent } from '../../../components/utility/popup-unexpected/popup-unexpected';
import { Http } from '@angular/http';
import { TLPlanModel } from '../../../providers/tlplan/tlplan-model';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { RiderConfig } from '../../../providers/rider/rider-config';

 /**
 * Generated class for the QuatationUnexpectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quatation-unexpected',
  templateUrl: 'quatation-unexpected.html',
})
export class QuatationUnexpectedPage implements OnDestroy {
  //Tab เหตุไม่คาดหวัง
  private unexpectedTab: number = 0;

  private allUnexpectedType: Array<{title: string, titleName: string}> = [
    {
      title : 'เสียชีวิตทุกกรณี',
      titleName : 'เสียชีวิตทุกกรณี'
    }
  ];
  private allWithAccUnexpectedType: Array<{title: string, titleName: string}> = [
    {
      title : 'เสียชีวิตทุกกรณี',
      titleName : 'เสียชีวิตทุกกรณี',
    },
    {
      title : 'เสียชีวิตจากอุบัติเหตุ',
      titleName : 'เสียชีวิตจากอุบัติเหตุ',
    }
  ];
  private dividedUnexpectedType : Array<{title: string, titleName: string}>;
  private dividedUnexpectedTypeDefault: Array<{title: string, titleName: string}> = [
    {
      title : 'โรคภัยไข้เจ็บ',
      titleName : 'โรคภัยไข้เจ็บ'
    },
    {
      title : 'อุบัติเหตุ',
      titleName : 'อุบัติเหตุ'
    },
    {
      title : 'อุบัติเหตุพิเศษ(*)',
      titleName : 'อุบัติเหตุพิเศษ(*)'
    },
    {
      title : 'ฆาตกรรม, ถูกลอบทำร้าย',
      titleName : 'ฆาตกรรม, ถูกลอบทำร้าย'
    },
    {
      title : 'โรคร้ายแรง',
      titleName : 'โรคร้ายแรง'
    }
  ];

  private dividedUnexpectedTypeTKF: Array<{title: string, titleName: string}> = [
    {
      title : 'โรคภัยไข้เจ็บ',
      titleName : 'โรคภัยไข้เจ็บ'
    },
    {
      title : 'ตะกาฟุลอุบัติเหตุ',
      titleName : 'ตะกาฟุลอุบัติเหตุ'
    },
    {
      title : 'ตะกาฟุลอุบัติเหตุพิเศษ(*)',
      titleName : 'ตะกาฟุลอุบัติเหตุพิเศษ(*)'
    },
    {
      title : 'ฆาตกรรม, ถูกลอบทำร้าย',
      titleName : 'ฆาตกรรม, ถูกลอบทำร้าย'
    },
    {
      title : 'โรคร้ายแรง',
      titleName : 'โรคร้ายแรง'
    }
  ];

  /**
   * 'โรคภัยไข้เจ็บ','อุบัติเหตุ','อุบัติเหตุพิเศษ(*)','ฆาตกรรม, ถูกลอบทำร้าย','โรคร้ายแรง' case 1
   * 'อ1', 'ฆจ1', 'อ2' , 'ฆจ2', 'ทร', 'ทร44', 'ทรตลอดชีพ', 'รพ', 'รพโกลด์', 'สร2'
   *  ตอ1 ,ตฆจ1,ตอ2 ,ตฆจ2,ตรพ
   */
  private dividedUnexpectedRiderType: Array<string> = 
  [
    this.conf.rider('AC01'), 
    this.conf.rider('KG1'), 
    this.conf.rider('AC02') , 
    this.conf.rider('KG2'), 
    this.conf.rider('D01'), 
    this.conf.rider('D02'), 
    this.conf.rider('D03'), 
    this.conf.rider('RP'), 
    this.conf.rider('RPG'), 
    this.conf.rider('SR2'),
    this.conf.rider('TAC01'), 
    this.conf.rider('TKG1'), 
    this.conf.rider('TAC02') , 
    this.conf.rider('TKG2'),
    this.conf.rider('TRP')
  ];

  /**
   * เสียชีวิตทุกกรณี case 2
   * 'อ3', 'วพ', 'วพ5', 'สมารท์vip', 'คบ', 'ตสพ'
   */
  private allUnexpectedRiderType: Array<string> = 
  [
    this.conf.rider('AC03'), 
    this.conf.rider('VP'), 
    this.conf.rider('VP5'), 
    this.conf.rider('V'), 
    this.conf.rider('KB2'), 
    this.conf.rider('TH')
  ];

  /**
   * เสียชีวิตทุกกรณี case 2
   * ฉพ,สพโกลด์
   */
  private spcUnexpectedRiderType: Array<string> = 
  [
    this.conf.rider('JP'), 
    this.conf.rider('G'), 
    this.conf.rider('J0')
  ];

  /**
   * แบบประกันที่เลือก
   */
  private choosePlan      : string = '';

  /**
   * แบบประกันที่เลือก
   */ 
  private rider = {};

  /**
   * set Default 
   */
  private txtUnecpected : string;

  /**
   * เลือกความคุ้มครองและเงินทดแทน
   */ 
  private chooseUnexpectedDefault : Array<{value: string, text: string, min: number, max: number}> = [];
  private chooseUnexpected : Array<{value: string, text: string, min: number, max: number}> = [];

  private selectedUnexpectedType: Array<{title: string, titleName: string}> = [];
  private arr5Case: Array<{value: string, text: string, min: number, max: number}> = [];
  private arr5CaseText: string = 'หมายเหตุ กรณีเป็นอุบัติเหตุไฟไหม้โรงแรม โรงมหรสพ อาคารสาธารณะ หรืออุบัติเหตุจากรถไฟ รถโดยสารประจำทาง ลิฟท์';
  // private arr5CaseText: string = '* หมายเหตุ กรณีเป็นอุบัติเหตุไฟไหม้โรงแรม โรงมหรสพ อาคารสาธารณะ หรืออุบัติเหตุจากรถไฟ รถโดยสารประจำทาง ลิฟท์';
  /**
   * ทุนประกัน
   */
  private sum: number;
  /**
   * เบี้ยประกันภัยหลัก 
   */
  private premium: number;

    /**
   * ความคุ้มครอง
   */
  private displaySum: string;

  private sumMinUnexpectedList: number;
  private sumMaxUnexpectedList: number;
  private unexpectedJSON: any; // โหลด unexpect 
  private hidden: boolean = false;

  private chooseUnexpectedJSON: any;
  private flagText    : string; // สถานะที่บอกว่าแบบนี้มีข้อความหมายเหตุของแบบประกันหรือไม่(N ไม่มี/Y มีข้อความ)
  private text        : string = '';//หมายเหตุ
  private oldText     : string = '';//หมายเหตุ
  private mulMinMain  : number = 1; // ตัวคูณค่าเงินทดแทนของสัญญาหลัก
  private mulMaxMain  : number = 1; // ตัวคูณค่าเงินทดแทนของสัญญาหลัก
  private mulRepMin   : number = 1; // ตัวคูณค่าเงินทดแทน mulReplacementMinMoney 
  private mulRepMax   : number = 1; // ตัวคูณค่าเงินทดแทน mulReplacementMaxMoney 
  private mulPremium  : number = 1; //ตัวคูณเบี้ย
  // แบบประกันที่ถูกเลือก
  private planSelected: TLPlanModel[];
  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private data: ProspectModel = new ProspectModel();
  /**
   * รูปแบบชำระ
   */
  private mode: number = 1;

  /**
   * แบบประกันที่เลือก
   */
  private planName: string;
  private arr5CaseTotal : number = 0;
  private selectIndex : number = 0;

  private subscription: Array<Subscription> = [];
  private star: string = "";
  
  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    private http        : Http, 
    private modalCtrl   : ModalController,
    private broadcaster : Broadcaster,
    private alertCtrl   : AlertDirective,
    private dP          : DecimalPipe,
    private conf        : RiderConfig
  ) {

    this.subscription.push(this.broadcaster.on('quatationStep').subscribe(res => {
      this.unexpectedTab = res;
      if(this.unexpectedTab === 3) {   // tab เหตุไม่คาดฝัน
        this.checkingUnexpectedCondition();
      } 
    }));

    // เฝ้าติดตามค่าข้อมูลแบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('quatationPlan').subscribe((res) => {
      if (res != '') {
        this.choosePlan = res;
        this.http.get('assets/json/unexpected/unexpect.json').subscribe(data => {
          this.unexpectedJSON = data.json();
          this.transformData();
          }, (err) => {
            console.error(err);
          }); 
        this.setDefaultchooseUnexpectedTxt(this.choosePlan);
      }
    }));

    // เฝ้าติดตามค่าข้อมูลผู้มุ่งหวัง
    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
      this.data = res;
    }));

    // tlPlan
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
      this.planSelected = res;
    }));

    // [input] เฝ้าติดตามข้อมูลสัญญาเพิ่มเติม
    this.subscription.push(this.broadcaster.on('rider').subscribe(res => {
      this.rider = res;
    }));

    // เฝ้าติดตามค่าทุนประกัน
    this.subscription.push(this.broadcaster.on('quatationSum').subscribe(res => {
      this.sum = res;
    }));

    // เฝ้าติดตามเบี้ยประกันภัยหลัก
    this.subscription.push(this.broadcaster.on('premiumFooter').subscribe(res => {
      this.premium = res;
    }));

    // รูปแบบชำระ
    this.subscription.push(this.broadcaster.on('quatationMode').subscribe(res => {
      this.mode = res;
    }));

    // แบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
      this.planName = res[0].planName;
    }));
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  } 
  
  private transformData() : void {
    // เลือก เงื่อนไข ตาม plancode ใน ่json
    this.chooseUnexpectedJSON = this.unexpectedJSON
    .filter(item => item.plancode == this.choosePlan)
    .reduce(item => item.plancode == this.choosePlan);
    // set หมายเหตุ, flagtext
    this.flagText = this.chooseUnexpectedJSON.flagtext;
    this.mulPremium = this.chooseUnexpectedJSON.multiplypremium;
    this.text = this.chooseUnexpectedJSON.text;
    // this.oldText = this.chooseUnexpectedJSON.text;
    //ค่าที่ใช้คูณในช่องเงินทดแทนของสัญญาหลัก
    if (this.chooseUnexpectedJSON.displaymoney == "4")
    {
      this.displaySum = this.chooseUnexpectedJSON.multiplysum;
    }
    else{
      this.displaySum = "";
      const minMax : Array<string>= this.chooseUnexpectedJSON.multiplysum.split("|");
      if(minMax.length > 1) {
        this.mulMinMain = Number(minMax[0]);
        this.mulMaxMain = Number(minMax[1]);
      } else {
        this.mulMinMain = Number(minMax[0]);
        this.mulMaxMain = Number(minMax[0]);
      }
      //ค่าที่ใช้คูณในช่องเงินทดแทน
      const displayMoney : string = this.chooseUnexpectedJSON.displaymoney;
      switch(displayMoney) {
        case "3": // จ่ายทุนอย่างเดียวไม่มีช่วง
          if(this.choosePlan == 'MF') {
            this.mulRepMin = 3.8;
            this.mulRepMax = 3.8;
          } else if(this.choosePlan == 'ME'){
            this.mulRepMin = 2.8;
            this.mulRepMax = 2.8;
          }
          break;
        case "2": // จ่ายแบบมีสูตร
        const mulPermium : string = this.chooseUnexpectedJSON.multiplypremium;
          this.mulRepMin = Number(mulPermium);
          this.mulRepMax = Number(mulPermium);
          break;
        case "1": // จ่ายทุน
          this.mulRepMin = Number(minMax[0]);
          this.mulRepMax = Number(minMax[1]);
          break;
        default: // จ่ายทุนอย่างเดียวไม่มีช่วง
          this.mulRepMin = Number(minMax[0]);
          this.mulRepMax = Number(minMax[0]);
          break;
      }
    }
    

    
  }

  private tabSelecter(index: number) {
   //alert("tabSelecter");
    this.selectIndex = index;
    this.chooseUnexpected = [];
    this.chooseUnexpected.push(...this.chooseUnexpectedDefault);
    this.hidden = false; //set Defualt แสดง <td>รวม</td>
    if(this.arr5Case.length > 0) {
      switch(index) {
        case 0:
          this.normalDisease();
          break;
        case 1 :
          this.accident();
          break;
        case 2:
          this.accidentSpc();
          break;
        case 3:
          this.homicide();
          break;
        case 4:
          this.deadlyDisease();
          break;
      }
    } else {
    //alert("allcase " + index);
      switch(index) {
        case 0:
          this.allCase();
          break;
        case 1:
          this.allCaseWithAcc();
          break;
      }
    }
    // alert(this.hidden);
    this.arr5CaseTotal = this.arr5Case.length;
    this.setMaintxt();
    this.sumMinUnexpectedList = this.chooseUnexpected.reduce((prevVal, elem) => prevVal + elem.min, 0);
    this.sumMaxUnexpectedList = this.chooseUnexpected.reduce((prevVal, elem) => prevVal + elem.max, 0);
    this.chooseUnexpected = this.roundNumber(this.chooseUnexpected);
    this.sumMinUnexpectedList = Math.round(this.sumMinUnexpectedList);
    this.sumMaxUnexpectedList = Math.round(this.sumMaxUnexpectedList);
    // alert(this.hidden);
  }
  
  private roundNumber = (numList) => {
    for(let i = 0;i<numList.length;i++) {
      numList[i].min = Math.round(Number(numList[i].min));
      numList[i].max = Math.round(Number(numList[i].max));
    }
    return numList;
  }
  // numList.map(item => (Math.round(Number(item.min)),Math.round(Number(item.max))));
  
  private allCaseWithAcc() : void {
    this.chooseUnexpected.map( item => item.value == 'main' ? (item.min = 600000, item.max = 600000) : item);
  }

  private allCase() : void {
    // case พิเศษ เฉพาะ ME,MF,AP55,AQ60,AR65
    this.hidden = false; //แสดง <td>รวม</td> 
    if(this.choosePlan == 'ME' || this.choosePlan == 'MF') {
      const cal: number = this.sum +(this.sum * this.mulRepMax);
      this.chooseUnexpected.map( item => item.value == 'main' ? (item.min = this.sum * this.mulMinMain , item.max = cal) : item);
    } else if(this.choosePlan == 'AP55' || this.choosePlan == 'AQ60' || this.choosePlan == 'AR65') {
      const cal: number = ((Number(this.premium) * (Number(this.mode) <= 0 ? this.mode = 12 : Number(this.mode)) )* Number(this.calPayYear()) )* 1.05;
      this.chooseUnexpected.map( item => item.value == 'main' ? (item.min = this.premium * this.mulPremium , item.max = cal) : item);
    } else if(this.choosePlan.startsWith('AS')) {
      this.hidden = true; //ซ่อน <td>รวม</td> 
      console.log("1 this.hidden =====" + this.hidden);
    } else {
      this.chooseUnexpected.map( item => item.value == 'main' ? (item.min = this.sum * this.mulMinMain , item.max = this.sum * this.mulMaxMain) : item);
    }

    console.log("2 this.hidden =====" + this.hidden);
  }

  private setDefaultchooseUnexpectedTxt(planCode: string) : void {
    if(planCode && planCode.length > 0) {
      const arrTKfull = ['WU', 'EN08', 'NC01', 'ND01', 'EN09'];
      if(arrTKfull.indexOf(planCode) != -1) {
        this.txtUnecpected = 'เงินหลักประกันตะกาฟุล';
        this.dividedUnexpectedType = this.dividedUnexpectedTypeTKF;
      } else {
        this.txtUnecpected = 'สัญญาหลัก';
        this.dividedUnexpectedType = this.dividedUnexpectedTypeDefault;
      }
      if('TE08' == planCode) {
        this.allUnexpectedType = this.allWithAccUnexpectedType;
      }
    } else {
      this.txtUnecpected = 'สัญญาหลัก';
      this.dividedUnexpectedType = this.dividedUnexpectedTypeDefault;
    }
  }

  private checkDuplicateValue(arr, ans: string) : Boolean {
    return (arr.map(obj => obj.value).indexOf(ans)) != -1;
  }

  private normalDisease() {
    //['ทร', 'ทร44', ,'ทร.ตลอดชีพ','รพโกลด์']
    const arrNormal = [this.conf.rider('D01'), this.conf.rider('D02'), this.conf.rider('D03'), this.conf.rider('RPG')];
    for(let i=0 ; i< arrNormal.length ; i++) {
      
      if(i == 0) { 'ทร.'
      const has = !this.checkDuplicateValue(this.arr5Case, arrNormal[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrNormal[i])) {
            this.chooseUnexpected.push({
              "value" : arrNormal[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.',
              "min"   : this.rider[arrNormal[i]].sum,
              "max"   : this.rider[arrNormal[i]].sum
            });
          }
        }
      }
      if(i == 1) { 'ทร.44'
      const has = !this.checkDuplicateValue(this.arr5Case, arrNormal[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrNormal[i])) {
            this.chooseUnexpected.push({
              "value" : arrNormal[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.44',
              "min"   : this.rider[arrNormal[i]].sum,
              "max"   : this.rider[arrNormal[i]].sum
            });
          }
        }
      }
      if(i == 2) { 'ทร. ตลอดชีพ'
      const has = !this.checkDuplicateValue(this.arr5Case, arrNormal[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrNormal[i])) {
            this.chooseUnexpected.push({
              "value" : arrNormal[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.ตลอดชีพ',
              "min"   : this.rider[arrNormal[i]].sum,
              "max"   : this.rider[arrNormal[i]].sum
            });
          }
        }
      }
      if(i == 3) { 'รพโกลด์'
      const has = !this.checkDuplicateValue(this.arr5Case, arrNormal[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrNormal[i])) {
            this.chooseUnexpected.push({
              "value" : arrNormal[i],
              "text"  : 'สัญญาเพิ่มเติม รพ.โกลด์',
              "min"   : this.rider[arrNormal[i]].sum *10,
              "max"   : this.rider[arrNormal[i]].sum *10
            });
          }
        }
      }
    }
  }

  private accident() : void {
    //['อ.1','อ.2','ตอ.1','ตอ.2','ทร', 'ทร44','ทร.ตลอดชีพ']
    const arrAccident = [this.conf.rider('AC01'),this.conf.rider('AC02'),this.conf.rider('TAC01'),this.conf.rider('TAC02'),this.conf.rider('D01'), this.conf.rider('D02'), this.conf.rider('D03')];
    
    for(let i=0 ; i< arrAccident.length ; i++) {
      
      if(i == 0) { 'อ.1'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccident[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccident[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccident[i],
              "text"  : 'สัญญาเพิ่มเติม อ.1',
              "min"   : this.rider[arrAccident[i]].sum,
              "max"   : this.rider[arrAccident[i]].sum
            });
          }
        }
      }
      if(i == 1) { 'อ.2'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccident[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccident[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccident[i],
              "text"  : 'สัญญาเพิ่มเติม อ.2',
              "min"   : this.rider[arrAccident[i]].sum,
              "max"   : this.rider[arrAccident[i]].sum
            });
          }
        }
      }
      if(i == 2) { 'ตอ.1'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccident[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccident[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccident[i],
              "text"  : 'สัญญาเพิ่มเติม ตอ.1',
              "min"   : this.rider[arrAccident[i]].sum,
              "max"   : this.rider[arrAccident[i]].sum 
            });
          }
        }
      }
      if(i == 3) { 'ตอ.2'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccident[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccident[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccident[i],
              "text"  : 'สัญญาเพิ่มเติม ตอ.2',
              "min"   : this.rider[arrAccident[i]].sum,
              "max"   : this.rider[arrAccident[i]].sum
            });
          }
        }
      }
      if(i == 4) { 'ทร'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccident[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccident[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccident[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.',
              "min"   : this.rider[arrAccident[i]].sum,
              "max"   : this.rider[arrAccident[i]].sum
            });
            break;
          }
        }
      }
      if(i == 5) { 'ทร44'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccident[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccident[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccident[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.44',
              "min"   : this.rider[arrAccident[i]].sum,
              "max"   : this.rider[arrAccident[i]].sum
            });
          }
        }
      }
      if(i == 6) { 'ทร.ตลอดชีพ'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccident[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccident[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccident[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.ตลอดชีพ',
              "min"   : this.rider[arrAccident[i]].sum,
              "max"   : this.rider[arrAccident[i]].sum
            });
          }
        }
      }
    }
  }

  private accidentSpc() : void {
    //['อ.1','อ.2','ตอ.1','ตอ.2','ทร', 'ทร44', 'ทร.ตลอดชีพ']
    const arrAccidentSpc = [this.conf.rider('AC01'),this.conf.rider('AC02'),this.conf.rider('TAC01'),this.conf.rider('TAC02'),this.conf.rider('D01'), this.conf.rider('D02'), this.conf.rider('D03')];

    for(let i=0 ; i< arrAccidentSpc.length ; i++) {
      
      if(i == 0) { 'อ.1'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccidentSpc[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccidentSpc[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccidentSpc[i],
              "text"  : 'สัญญาเพิ่มเติม อ.1 (อุบัติเหตุพิเศษ)',
              "min"   : this.rider[arrAccidentSpc[i]].sum *2,
              "max"   : this.rider[arrAccidentSpc[i]].sum *2
            });
          }
        }
      }
      if(i == 1) { 'อ.2'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccidentSpc[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccidentSpc[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccidentSpc[i],
              "text"  : 'สัญญาเพิ่มเติม อ.2 (อุบัติเหตุพิเศษ)',
              "min"   : this.rider[arrAccidentSpc[i]].sum *2,
              "max"   : this.rider[arrAccidentSpc[i]].sum *2
            });
          }
        }
      }
      if(i == 2) { 'ตอ.1'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccidentSpc[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccidentSpc[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccidentSpc[i],
              "text"  : 'สัญญาเพิ่มเติม ตอ.1 (อุบัติเหตุพิเศษ)',
              "min"   : this.rider[arrAccidentSpc[i]].sum *2,
              "max"   : this.rider[arrAccidentSpc[i]].sum *2
            });
          }
        }
      }
      if(i == 3) { 'ตอ.2'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccidentSpc[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccidentSpc[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccidentSpc[i],
              "text"  : 'สัญญาเพิ่มเติม ตอ.2 (อุบัติเหตุพิเศษ)',
              "min"   : this.rider[arrAccidentSpc[i]].sum *2,
              "max"   : this.rider[arrAccidentSpc[i]].sum *2
            });
          }
        }
      }
      if(i == 4) { 'ทร'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccidentSpc[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccidentSpc[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccidentSpc[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.',
              "min"   : this.rider[arrAccidentSpc[i]].sum,
              "max"   : this.rider[arrAccidentSpc[i]].sum
            });
            break;
          }
        }
      }
      if(i == 5) { 'ทร44'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccidentSpc[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccidentSpc[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccidentSpc[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.44',
              "min"   : this.rider[arrAccidentSpc[i]].sum,
              "max"   : this.rider[arrAccidentSpc[i]].sum
            });
          }
        }
      }
      if(i == 6) { 'ทร.ตลอดชีพ'
      const has = !this.checkDuplicateValue(this.arr5Case, arrAccidentSpc[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrAccidentSpc[i])) {
            this.chooseUnexpected.push({
              "value" : arrAccidentSpc[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.ตลอดชีพ',
              "min"   : this.rider[arrAccidentSpc[i]].sum,
              "max"   : this.rider[arrAccidentSpc[i]].sum
            });
          }
        }
      }
    }
  }

  private homicide() : void {
    //['ฆจ.1','ฆจ.2','ตฆจ.1','ตฆจ.2','ทร', 'ทร44', ทร.ตลอดชีพ]
    const arrHomicide = [this.conf.rider('KG1'),this.conf.rider('KG2'),this.conf.rider('TKG1'),this.conf.rider('TKG2'),this.conf.rider('D01'), this.conf.rider('D02'), this.conf.rider('D03')];

    for(let i=0 ; i< arrHomicide.length ; i++) {
      
      if(i == 0) { 'ฆจ.1'
      const has = !this.checkDuplicateValue(this.arr5Case, arrHomicide[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrHomicide[i])) {
            this.chooseUnexpected.push({
              "value" : arrHomicide[i],
              "text"  : 'สัญญาเพิ่มเติม ฆจ.1',
              "min"   : this.rider[arrHomicide[i]].sum,
              "max"   : this.rider[arrHomicide[i]].sum
            });
          }
        }
      }
      if(i == 1) { 'ฆจ.2'
      const has = !this.checkDuplicateValue(this.arr5Case, arrHomicide[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrHomicide[i])) {
            this.chooseUnexpected.push({
              "value" : arrHomicide[i],
              "text"  : 'สัญญาเพิ่มเติม ฆจ.2',
              "min"   : this.rider[arrHomicide[i]].sum,
              "max"   : this.rider[arrHomicide[i]].sum
            });
          }
        }
      }
      if(i == 2) { 'ตฆจ.1'
      const has = !this.checkDuplicateValue(this.arr5Case, arrHomicide[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrHomicide[i])) {
            this.chooseUnexpected.push({
              "value" : arrHomicide[i],
              "text"  : 'สัญญาเพิ่มเติม ตฆ.1',
              "min"   : this.rider[arrHomicide[i]].sum,
              "max"   : this.rider[arrHomicide[i]].sum
            });
          }
        }
      }
      if(i == 3) { 'ตฆจ.2'
      const has = !this.checkDuplicateValue(this.arr5Case, arrHomicide[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrHomicide[i])) {
            this.chooseUnexpected.push({
              "value" : arrHomicide[i],
              "text"  : 'สัญญาเพิ่มเติม ตฆ.2',
              "min"   : this.rider[arrHomicide[i]].sum,
              "max"   : this.rider[arrHomicide[i]].sum
            });
          }
        }
      }
      if(i == 4) { 'ทร'
      const has = !this.checkDuplicateValue(this.arr5Case, arrHomicide[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrHomicide[i])) {
            this.chooseUnexpected.push({
              "value" : arrHomicide[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.',
              "min"   : this.rider[arrHomicide[i]].sum,
              "max"   : this.rider[arrHomicide[i]].sum
            });
            break;
          }
        }
      }
      if(i == 5) { 'ทร44'
      const has = !this.checkDuplicateValue(this.arr5Case, arrHomicide[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrHomicide[i])) {
            this.chooseUnexpected.push({
              "value" : arrHomicide[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.44',
              "min"   : this.rider[arrHomicide[i]].sum,
              "max"   : this.rider[arrHomicide[i]].sum
            });
          }
        }
      }
      if(i == 6) { 'ทร.ตลอดชีพ'
      const has = !this.checkDuplicateValue(this.arr5Case, arrHomicide[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrHomicide[i])) {
            this.chooseUnexpected.push({
              "value" : arrHomicide[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.ตลอดชีพ',
              "min"   : this.rider[arrHomicide[i]].sum,
              "max"   : this.rider[arrHomicide[i]].sum
            });
          }
        }
      }
    }
  }

  private deadlyDisease() : void {
    //['รพ.','รพ.โกลด์','สร2.','ตรพ.','ทร', 'ทร44', ทร.ตลอดชีพ]
    const arrdeadlyDeisease = [this.conf.rider('RP'),this.conf.rider('RPG'),this.conf.rider('SR2'),this.conf.rider('TRP'),this.conf.rider('D01'), this.conf.rider('D02'), this.conf.rider('D03')];

    for(let i=0 ; i< arrdeadlyDeisease.length ; i++) {
      
      if(i == 0) { 'รพ.'
      const has = !this.checkDuplicateValue(this.arr5Case, arrdeadlyDeisease[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrdeadlyDeisease[i])) {
            this.chooseUnexpected.push({
              "value" : arrdeadlyDeisease[i],
              "text"  : 'สัญญาเพิ่มเติม รพ.',
              "min"   : this.rider[arrdeadlyDeisease[i]].sum,
              "max"   : this.rider[arrdeadlyDeisease[i]].sum
            });
            this.hidden = true; //ซ่อน <td>รวม</td>  เมื่อมีปุ่ม รายละเอียด
          }
        }
      }
      if(i == 1) { 'รพ.โกลด์'
      const has = !this.checkDuplicateValue(this.arr5Case, arrdeadlyDeisease[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrdeadlyDeisease[i])) {
            this.chooseUnexpected.push({
              "value" : arrdeadlyDeisease[i],
              "text"  : 'สัญญาเพิ่มเติม รพ.โกลด์',
              "min"   : this.rider[arrdeadlyDeisease[i]].sum,
              "max"   : this.rider[arrdeadlyDeisease[i]].sum
            });
            this.hidden = true; //ซ่อน <td>รวม</td>  เมื่อมีปุ่ม รายละเอียด
          }
        }
      }
      if(i == 2) { 'สร2.'
      const has = !this.checkDuplicateValue(this.arr5Case, arrdeadlyDeisease[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrdeadlyDeisease[i])) {
            this.chooseUnexpected.push({
              "value" : arrdeadlyDeisease[i],
              "text"  : 'สัญญาเพิ่มเติม สร.2',
              "min"   : this.rider[arrdeadlyDeisease[i]].sum,
              "max"   : this.rider[arrdeadlyDeisease[i]].sum
            });
            this.hidden = true; //ซ่อน <td>รวม</td>  เมื่อมีปุ่ม รายละเอียด
          }
        }
      }
      if(i == 3) { 'ตรพ.'
      const has = !this.checkDuplicateValue(this.arr5Case, arrdeadlyDeisease[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrdeadlyDeisease[i])) {
            this.chooseUnexpected.push({
              "value" : arrdeadlyDeisease[i],
              "text"  : 'สัญญาเพิ่มเติม ตรพ.',
              "min"   : this.rider[arrdeadlyDeisease[i]].sum,
              "max"   : this.rider[arrdeadlyDeisease[i]].sum
            });
            this.hidden = true; //ซ่อน <td>รวม</td>  เมื่อมีปุ่ม รายละเอียด
            break;
          }
        }
      }
      if(i == 4) { 'ทร'
      const has = !this.checkDuplicateValue(this.arr5Case, arrdeadlyDeisease[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrdeadlyDeisease[i])) {
            this.chooseUnexpected.push({
              "value" : arrdeadlyDeisease[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.',
              "min"   : this.rider[arrdeadlyDeisease[i]].sum,
              "max"   : this.rider[arrdeadlyDeisease[i]].sum
            });
            break;
          }
        }
      }
      if(i == 5) { 'ทร44'
      const has = !this.checkDuplicateValue(this.arr5Case, arrdeadlyDeisease[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrdeadlyDeisease[i])) {
            this.chooseUnexpected.push({
              "value" : arrdeadlyDeisease[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.44',
              "min"   : this.rider[arrdeadlyDeisease[i]].sum,
              "max"   : this.rider[arrdeadlyDeisease[i]].sum
            });
          }
        }
      }
      if(i == 6) { 'ทร.ตลอดชีพ'
      const has = !this.checkDuplicateValue(this.arr5Case, arrdeadlyDeisease[i]);
        if(!has){
          if(!this.checkDuplicateValue(this.chooseUnexpected, arrdeadlyDeisease[i])) {
            this.chooseUnexpected.push({
              "value" : arrdeadlyDeisease[i],
              "text"  : 'สัญญาเพิ่มเติม ทร.ตลอดชีพ',
              "min"   : this.rider[arrdeadlyDeisease[i]].sum,
              "max"   : this.rider[arrdeadlyDeisease[i]].sum
            });
          }
        }
      }
    }
  }

  private checkingUnexpectedCondition() : void {
    let arrSomeType = [];
    let arrAllType = [];
    let arrSpcType = [];
    this.arr5Case = [];
    if(this.displaySum && this.displaySum.length > 0) {
      this.chooseUnexpectedDefault = [{
        "value" : "main",
        "text"  : this.txtUnecpected,
        "min"   : 2,
        "max"   : 2
      }];
      this.selectedUnexpectedType = this.allUnexpectedType;
      // this.hidden = true;
      this.tabSelecter(0); // set Default
      return;
    }
    this.chooseUnexpectedDefault = [{
      "value" : "main",
      "text"  : this.txtUnecpected,
      "min"   : this.sum * this.mulMinMain,
      "max"   : this.sum * this.mulMaxMain
    }];
    this.chooseUnexpected = [];
    this.chooseUnexpected.push(...this.chooseUnexpectedDefault);
    if(this.rider != undefined && this.rider != null) {
      
      // 'โรคภัยไข้เจ็บ','อุบัติเหตุ','อุบัติเหตุพิเศษ(*)','ฆาตกรรม, ถูกลอบทำร้าย','โรคร้ายแรง' 
      for(let item in this.dividedUnexpectedRiderType) {
        if(this.rider[this.dividedUnexpectedRiderType[item]] && this.rider[this.dividedUnexpectedRiderType[item]].sum && this.rider[this.dividedUnexpectedRiderType[item]].sum > 0 ) {
          arrSomeType.push({
            "value" : this.dividedUnexpectedRiderType[item], 
            "min"   : this.rider[this.dividedUnexpectedRiderType[item]].sum,
            "max"   : this.rider[this.dividedUnexpectedRiderType[item]].sum
          });
        }
      }
      // มีจ่ายความคุ้มครอง
      for(let item in this.spcUnexpectedRiderType) {
        if(this.rider[this.spcUnexpectedRiderType[item]] && this.rider[this.spcUnexpectedRiderType[item]].sum && this.rider[this.spcUnexpectedRiderType[item]].sum > 0 ) {
          if(this.spcUnexpectedRiderType[item] == this.conf.rider('JP')) {
            arrSpcType.push({
              "value" : this.spcUnexpectedRiderType[item],
              "text"  : 'สัญญาเพิ่มเติม ฉพ.',
              "min"   : this.rider[this.spcUnexpectedRiderType[item]].sum,
              "max"   : this.rider[this.spcUnexpectedRiderType[item]].sum
            });
          } else if (this.spcUnexpectedRiderType[item] == this.conf.rider('G')) {
            // กำหนด ค่า สพ.โกลด์ เป็น 10000 เท่านั้น
            arrSpcType.push({
              "value" : this.spcUnexpectedRiderType[item],
              "text"  : 'สพ.โกลด์',
              "min"   : 10000,
              "max"   : 10000
            });
          } else if (this.spcUnexpectedRiderType[item] == this.conf.rider('J0')) {
            // กำหนด ค่า สพ.เด็ก
            arrSpcType.push({
              "value" : this.spcUnexpectedRiderType[item],
              "text"  : 'สพ.เด็ก',
              "min"   : 50000,
              "max"   : 50000
            });
          }
        }
      }

      // เสียชีวิตทุกกรณี
      for(let item in this.allUnexpectedRiderType) {
        if(this.rider[this.allUnexpectedRiderType[item]] && this.rider[this.allUnexpectedRiderType[item]].sum && this.rider[this.allUnexpectedRiderType[item]].sum > 0 ) {
          arrAllType.push({
            "value" : this.allUnexpectedRiderType[item], 
            "min"   : this.rider[this.allUnexpectedRiderType[item]].sum,
            "max"   : this.rider[this.allUnexpectedRiderType[item]].sum
          });
        }
      }

      if(arrSomeType.length > 0) {
        // 'โรคภัยไข้เจ็บ','อุบัติเหตุ','อุบัติเหตุพิเศษ(*)','ฆาตกรรม, ถูกลอบทำร้าย','โรคร้ายแรง' 
        this.selectedUnexpectedType = this.dividedUnexpectedType;
        this.arr5Case = arrSomeType;
        if(arrSpcType.length > 0) {
          this.chooseUnexpected.push(...arrSpcType);
          this.chooseUnexpectedDefault.push(...arrSpcType);
        }
        this.tabSelecter(0); // set Default
        // this.tabSelecter('โรคภัยไข้เจ็บ'); // set Default

      } else {
        // เสียชีวิตทุกกรณี 
        this.selectedUnexpectedType = this.allUnexpectedType;
        
        if(arrSpcType.length > 0) {
          //set Default sum of สัญญาเพิ่มเติม ฉพ.
          // this.tabSelecter('เสียชีวิตทุกกรณี'); // set Default
          //debugger;
          //const hasJP = arrSpcType.map(obj => obj.value == 'JP' ? obj.value : '').indexOf('JP');
          //if(hasJP > -1) {
          //  arrSpcType[0].min = this.sum;
          //  arrSpcType[0].max = this.sum;
          //}
          this.chooseUnexpected.push(...arrSpcType);
          this.chooseUnexpectedDefault.push(...arrSpcType);
        }
        this.tabSelecter(0); // set Default
       
      }
      
    } else {
      // เสียชีวิตทุกกรณี 
      this.selectedUnexpectedType = this.allUnexpectedType;
      this.tabSelecter(0); // set Default
      // this.tabSelecter('เสียชีวิตทุกกรณี'); // set Default
    }
    
  }

  //เช็ค สัญญาหลัก / สัญญาหลัก* /สัญญาหลัก**
  /**
   * 
   */
  private setMaintxt() : void {
    if(this.arr5Case.length > 0 && this.flagText == 'Y') {
      this.chooseUnexpected.map( item => item.value == 'main' ? item.text = this.txtUnecpected + '**' : item);
      // this.text = this.oldText;
      // this.text = "**" + this.text;
      this.star = '**';
    } 
    // else if( this.arr5Case.length > 0 && this.flagText == 'N' ) {
    //   if(this.choosePlan != 'NA') this.chooseUnexpected.map( item => item.value == 'main' ? item.text = this.txtUnecpected + '*' : item);
    //   this.chooseUnexpected.map( item => item.value == 'main' ? item.text = this.txtUnecpected + '*' : item);
    //   this.text = "";
    // } 
    else if( this.flagText == 'Y') {
      this.chooseUnexpected.map( item => item.value == 'main' ? item.text = this.txtUnecpected + '*' : item);
      // this.text = this.oldText;
      // this.text = "*" + this.text;
      this.star = '*';
    } else {
      // this.text = "";
      this.star = '';
    }
    // เคสพิเศษ เฉพาะ choosePlan NE เท่านั้น 
    if(this.choosePlan == "NE") {
      const lb1 = this.sum * 20;
      const lb2 = lb1 * 2;
      this.text = this.text.replace(/lb_money1/g, String(this.dP.transform(lb1)));
      this.text = this.text.replace(/lb_money2/g, String(this.dP.transform(lb2)));
    }
  }

  private calPayYear() : string {
		let payYear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.data.age)));
    return payYear;
  }

  private callModal(obj) {
    let modal: Modal = this.modalCtrl.create(PopupUnexpectedComponent, {rider: obj.value, sum: obj.max});
    modal.present();
  }

}
