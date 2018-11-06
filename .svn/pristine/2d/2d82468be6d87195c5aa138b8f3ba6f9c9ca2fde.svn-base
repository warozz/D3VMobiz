import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { Alert } from 'ionic-angular/components/alert/alert';
import { PopupRiderComponent } from '../../../components/utility/popup-rider/popup-rider';
import { Subscription } from 'rxjs';
import { TLPlanModel } from '../../../providers/tlplan/tlplan-model';
import { RiderConfig } from '../../../providers/rider/rider-config';
/**
 * Generated class for the QuatationRiderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quatation-rider',
  templateUrl: 'quatation-rider.html',
})
export class QuatationRiderPage implements OnDestroy {

  
  data: Array<{ title: string, details: string, icon: string, showDetails: boolean }> = [];

  private collapseData;
  private rider;
  private riderH;
  private riderD02;
  private riderV;
  private riderVP;
  private riderG;
  private prospectAge: number = 0;
  private endowmentYear: number;
  private choiceJ0: boolean = false;

  private planName: string;
  private selectIndex: number = -1;
  private tkf: boolean = false;

  private subscription: Array<Subscription> = [];

  private sumJ0PlanH = [];
  private planSelected: TLPlanModel[];
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl   : ModalController,
    private broadcaster: Broadcaster,
    private conf: RiderConfig) {

    this.subscription.push(this.broadcaster.on('rider').subscribe(res => {
      if (res) {
        const copyRider = JSON.parse(JSON.stringify(res));
        this.rider = copyRider;
       
        if(this.tkf) {
          // อุบัติเหตุ
          this.rider[this.conf.rider('AC01')].sum = this.rider[this.conf.rider('TAC01')] ? Number(this.rider[this.conf.rider('TAC01')].sum) > 0 ? Number(this.rider[this.conf.rider('TAC01')].sum) : 0 : 0;
          this.rider[this.conf.rider('AC02')].sum = this.rider[this.conf.rider('TAC02')] ? Number(this.rider[this.conf.rider('TAC02')].sum) > 0 ? Number(this.rider[this.conf.rider('TAC02')].sum) : 0 : 0;
          // ฆาตรกรรม
          this.rider[this.conf.rider('KG1')].sum = this.rider[this.conf.rider('TKG1')] ? Number(this.rider[this.conf.rider('TKG1')].sum) > 0 ? Number(this.rider[this.conf.rider('TKG1')].sum) : 0 : 0;
          this.rider[this.conf.rider('KG2')].sum = this.rider[this.conf.rider('TKG2')] ? Number(this.rider[this.conf.rider('TKG2')].sum) > 0 ? Number(this.rider[this.conf.rider('TKG2')].sum) : 0 : 0;
          // รพ
          this.rider[this.conf.rider('RP')].sum = this.rider[this.conf.rider('TRP')] ? Number(this.rider[this.conf.rider('TRP')].sum) > 0 ? Number(this.rider[this.conf.rider('TRP')].sum) : 0 : 0;
          // สุขภาพ
          this.rider[this.conf.rider('H')].sum = this.rider[this.conf.rider('TH')] ? Number(this.rider[this.conf.rider('TH')].sum) > 0 ? Number(this.rider[this.conf.rider('TH')].sum) : 0 : 0;
        }

        if(this.rider[this.conf.rider('J0')]) {
          if(this.rider[this.conf.rider('J0')].sum == '1') {
            this.calSumJ0PlanH(10000, 2000, 11);
            this.calSumJ0PlanUnH(50000, 10000, 11);
          }
          if(this.rider[this.conf.rider('J0')].sum == '2') {
            this.calSumJ0PlanH(15000, 3000, 11);
            this.calSumJ0PlanUnH(75000, 15000, 11);
          }
          if(this.rider[this.conf.rider('J0')].sum == '3') {
            this.calSumJ0PlanH(20000, 4000, 11);
            this.calSumJ0PlanUnH(100000, 20000, 11);
          }
        }

        if (this.rider[this.conf.rider('H')]) {
          if (this.rider[this.conf.rider('H')].sum == '1000') {
            this.riderH = ['1000', '2000', '15000', '50000', '5000', '5000', '3000', '5000', '600', '300000', '630000'];
          } else if (this.rider[this.conf.rider('H')].sum == '1500') {
            this.riderH = ['1500', '3000', '20000', '60000', '6000', '6000', '3500', '5000', '700', '300000', '741000'];
          } else if (this.rider[this.conf.rider('H')].sum == '2000') {
            this.riderH = ['2000', '4000', '25000', '70000', '7000', '7000', '4000', '5000', '800', '300000', '852000'];
          } else if (this.rider[this.conf.rider('H')].sum == '2500') {
            this.riderH = ['2500', '5000', '25000', '80000', '8000', '8000', '5000', '5000', '900', '300000', '958500'];
          } else if (this.rider[this.conf.rider('H')].sum == '3000') {
            this.riderH = ['3000', '6000', '30000', '90000', '9000', '9000', '6000', '6000', '1000', '300000', '1071000']
          } else if (this.rider[this.conf.rider('H')].sum == '4000') {
            this.riderH = ['4000', '8000', '35000', '100000', '10000', '10000', '8000', '6000', '1000', '300000', '1247000']
          } else if (this.rider[this.conf.rider('H')].sum == '5000') {
            this.riderH = ['5000', '10000', '45000', '110000', '11000', '11000', '10000', '6000', '1000', '300000', '1428000']
          } else if (this.rider[this.conf.rider('H')].sum == '6000') {
            this.riderH = ['6000', '12000', '50000', '120000', '12000', '12000', '11000', '6000', '1100', '300000', '1618000']
          } else if (this.rider[this.conf.rider('H')].sum == '8000') {
            this.riderH = ['8000', '16000', '60000', '130000', '13000', '13000', '12000', '8000', '1200', '300000', '1972000']
          } else if (this.rider[this.conf.rider('H')].sum == '10000') {
            this.riderH = ['10000', '20000', '70000', '150000', '15000', '15000', '15000', '10000', '1500', '300000', '2370000']
          } else {
            this.riderH = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
          }
        }
        if (this.rider[this.conf.rider('D02')]) {
          let haftD02 = this.rider[this.conf.rider('D02')].sum / 2
          let chkValD02;
          //if (haftD02 > 50000) {
          if (haftD02 > 500000) {
            chkValD02 = '500000';
          } else {
            chkValD02 = haftD02;
          }
          this.riderD02 = chkValD02;
        }
        if (this.rider[this.conf.rider('V')]) {
          if (this.rider[this.conf.rider('V')].sum == 1) {
            this.riderV = ['1000000', '10000', '5000', '5000', '5000', '1000', '5000', '2500'];
          } else if (this.rider[this.conf.rider('V')].sum == 2) {
            this.riderV = ['2000000', '10000', '8000', '8000', '8000', '2000', '8000', '3000'];
          } else if (this.rider[this.conf.rider('V')].sum == 3) {
            this.riderV = ['3000000', '10000', '10000', '10000', '10000', '3000', '10000', '3500'];
          } else {
            this.riderV = ['0', '0', '0', '0', '0', '0', '0', '0'];
          }
        }
        if (this.rider[this.conf.rider('VP')]) {
          if (this.rider[this.conf.rider('VP')].sum == 3) {
            this.riderVP = ['แผน 1', 'วพ.3', '2000', '100000', '200000', '500'];
          } else if (this.rider[this.conf.rider('VP')].sum == 4) {
            this.riderVP = ['แผน 2', 'วพ.4', '4000', '200000', '400000', '1000'];
          } else if (this.rider[this.conf.rider('VP')].sum == 6) {
            this.riderVP = ['แผน 3', 'วพ.6', '6000', '300000', '600000', '1500'];
          } else if (this.rider[this.conf.rider('VP')].sum == 7) {
            this.riderVP = ['แผน 4', 'วพ.7', '8000', '400000', '800000', '2000'];
          } else if (this.rider[this.conf.rider('VP')].sum == 8) {
            this.riderVP = ['แผน 5', 'วพ.8', '10000', '500000', '1000000', '2500'];
          } else {
            this.riderVP = ['', '', '0', '0', '0', '0'];
          }
        }
        if (this.rider[this.conf.rider('G')]) {
          if (this.rider[this.conf.rider('G')].sum == '2000') {
            this.riderG = ['2000', '1000000', '500000', '1000000', '2000', '4000', '1500', '1200', '10000', '60000', '1000', '10000'];
          } else if (this.rider[this.conf.rider('G')].sum == '4000') {
            this.riderG = ['4000', '2000000', '1000000', '2000000', '4000', '8000', '2000', '2400', '15000', '90000', '2000', '10000'];
          } else if (this.rider[this.conf.rider('G')].sum == '6000') {
            this.riderG = ['6000', '3000000', '1500000', '3000000', '6000', '12000', '2500', '3600', '20000', '120000', '3000', '10000'];
          } else if (this.rider[this.conf.rider('G')].sum == '8000') {
            this.riderG = ['8000', '4000000', '2000000', '4000000', '8000', '16000', '3000', '4800', '25000', '150000', '4000', '10000'];
          } else if (this.rider[this.conf.rider('G')].sum == '10000') {
            this.riderG = ['10000', '5000000', '2500000', '5000000', '10000', '20000', '3500', '6000', '30000', '180000', '5000', '10000'];
          } else {
            this.riderG = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
          }
        }
      }
    }));

    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
      if (res)
        this.prospectAge = res.age;
        
    }));

    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
      this.planName = res[0].planName;
      if(this.planSelected != res){
        this.planSelected  = res;
      } 
     
      // เช็ค planCode ที่เป็น ตะกะฟุล
      const planCode = res[0].planCode;
      if(planCode && planCode.length > 0) {
        const arrTKfull = ['WU', 'EN08', 'NC01', 'ND01', 'EN09'];
        if(arrTKfull.indexOf(planCode) != -1) {
          this.tkf = true;
        } else {
          this.tkf = false;
        }
      } else {
        this.tkf = false;
      }
      this.endownKB2();

    }));
    this.subscription.push(this.broadcaster.on('quatationStep').subscribe(res => {
      if (res == 2) { // สัญญาเพิ่มเตืม
        this.selectIndexDefault();
        this.endownKB2();
      }
    }));
  }
  private endownKB2()
  {
    let payYear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.prospectAge)));
    /** ระยะเวลาผู้เอาชำระเบี้ย */
    let kid = 30 - this.prospectAge;
    let age = 0;
    try {
      age = this.rider[this.conf.rider('KB2')].age;
    } catch(e) {
      age = 0;
    }
    let parent = 60 - age;
    let kb2Endown = Number(payYear);

    if ( kb2Endown > kid )
      kb2Endown = kid;
    if ( kb2Endown > parent )
      kb2Endown = parent;
      //console.log("ผู้ปกครอง  kid=" + kid + "  parent=" + parent + "  payYear="+ payYear);

    this.endowmentYear = kb2Endown;
    //console.log("ผู้ปกครอง=" + age + "  เด็ก="+this.prospectAge + "  ระยะชำระเบี้ย="  + payYear + "  | คุ้มครองคบ=" + kb2Endown + " |  endowmentYear=" + this.endowmentYear);

  }   
  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  } 
  tabSelecter(index: number): void {
    this.selectIndex = index;
  }     
  private calSumJ0PlanH(start: number, step: number, length: number): void{

    let len = length;
    this.sumJ0PlanH = [];
    let sum = 0;
    while(length > 0) {
      this.sumJ0PlanH.push({
        num : len == length ? start : start+= step
      });
      length--;
    }
  }

  private calSumJ0PlanUnH(start: number, step: number, length: number): void{
    let len = length;
    while(length > 0) {
      this.sumJ0PlanH[len - length].num2 = len == length ? start : start+= step
      length--;
    }
  }

  /**
   * เลือก tab ที่มีข้อมูลให้อัตโนมัติ
   */
  private selectIndexDefault() {
    if (typeof this.rider != 'undefined') {
      this.selectIndex = 0;

      switch (this.selectIndex) {
        
        // อุบัติเหตุ
        case 0:
          if (this.rider[this.conf.rider('AC01')].sum > 0 || this.rider[this.conf.rider('AC02')].sum > 0 || this.rider[this.conf.rider('AC02')].sum > 0) {
            this.selectIndex = 0;
            break;
          }
        // ทุพพลภาพถาวรสิ้นเชิง
        case 1:
          if (this.prospectAge < 60) {
            this.selectIndex = 1;
            break;
          }
        // โรคร้ายแรง
        case 2:
          if (this.rider[this.conf.rider('D01')].sum > 0 || this.rider[this.conf.rider('D02')].sum > 0 || this.rider[this.conf.rider('D03')].sum > 0) {
            this.selectIndex = 2;
            break;
          }
        // ค่ารักษาพยาบาล
        case 3:
          if (this.rider[this.conf.rider('RP')].sum > 0) {
            this.selectIndex = 3;
            break;
          }
        // ประกันสุขภาพ
        case 4:
          if (this.rider[this.conf.rider('H')].sum > 0) {
            this.selectIndex = 4;
            break;
          }
        // เฉพาะกาล
        case 5:
          if (this.rider[this.conf.rider('JP')].sum > 0) {
            this.selectIndex = 5;
            break;
          }
        // รักษาพยาบาลโรคร้ายแรง
        case 6:
          if (this.rider[this.conf.rider('SR2')].sum > 0) {
            this.selectIndex = 6;
            break;
          }
        // สุขภาพพิเศษ
        case 7:
          if (this.rider[this.conf.rider('G')].sum > 0 || this.rider[this.conf.rider('VP')].sum > 0 || this.rider[this.conf.rider('V')].sum > 0 || this.rider[this.conf.rider('VP5')].sum) {
            this.selectIndex = 7;
            break;
          }
        // คุ้มครองผู้ชำระเบี้ย
        case 8:
          if (this.rider[this.conf.rider('KB2')].age) {
            this.selectIndex = 8;
            break;
          }
        // ค่ารักษาพยาบาลพิเศษ
        case 9:
          if (this.rider[this.conf.rider('RPG')].sum > 0) {
            this.selectIndex = 9;
            break;
          }
        default:
          this.selectIndex = -1;
      }
    }
    else {
      setTimeout(() => {
        this.selectIndexDefault();
      }, 100);
    }
  }

  /**
   * โรคร้ายแรง 44 โรค modal
   */
  private deadlyDisease(rider: string): void {
    let modal: Modal = this.modalCtrl.create(PopupRiderComponent, {rider: rider});
    modal.present();
  }
  
}
