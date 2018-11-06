import { ServiceName } from './../../../providers/constants/service-name';
import { FunctionName } from './../../../providers/constants/function-name';
import { RequestModel } from './../../../providers/model/request-model';
import { Http } from '@angular/http';
import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import * as moment from 'moment';
import { PopupPlanDetailComponent } from '../../utility/popup-plan-detail/popup-plan-detail';
import { ModalController , Modal, Loading } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { PopupOccupationComponent } from './../../utility/popup-occupation/popup-occupation';
import { PlanRiderModel } from '../../../providers/planprovide-table/planrider/planrider-model';
import { TLPlanModel } from '../../../providers/tlplan/tlplan-model';
import { RiderConfig } from '../../../providers/rider/rider-config';
import { QuotationData } from '../../../providers/quotation/quotation-data';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import * as _ from 'lodash';
import { PremiumCalProvider } from '../../../providers/utility/premium-cal';

/**
 * Generated class for the RiderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rider2',
  templateUrl: 'rider2.html'
})
export class Rider2Component implements OnDestroy {

  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private prospect: ProspectModel = new ProspectModel();
  
  /**
   * ทุนประกัน
   */
  private sum: number = 0;

  /**
   * กลุ่มอาชีพ
   * 0 = นักเรียน นักศึกษา เยาวชน
   * 1 = แม่บ้าน พ่อบ้าน ว่างงาน
   * 2 = อาชีพอื่นๆ
   */
  private occGroup: number = -1;
  /**
   * 3 = อาชีพทหาร
   */
  private occGroup2: number = 0;

  /**
   * อาชีพ
   */
  private occ: string = '';

  /**
   * สิทธิ์ตัวแทน
   * Normal
   * Q UP,
   * Top UP,
   * Top UP plus
   */
  private permission: string;

  /**
   * ข้อความแจ้งเตือนค่าสูงสุด
   */
  private maxAlert: string = '';

  /**
   * ข้อความแจ้งเตือนค่าต่ำสุด
   */
  private minAlert: string = '';

  /**
   * ชื่อเรื่อง
   */
  private riderTitle: string = 'เบี้ยสัญญาเพิ่มเติม';

  /**
   * ประเภท ทร.
   */
  private dType: string = this.conf.rider('D01');

  /**
   * วันที่อายุผู้ปกครองมากสุดที่เลือกได้
   */
  private minKB2Date: string;

  /**
   * วันที่อายุผู้ปกครองน้อยสุดที่เลือกได้
   */
  private maxKB2Date: string;

  /**
   * ชื่อรหัสสัญญาเพิ่มเติม
   */
  private riderCode: Array<string> = this.conf.getRiderCode('code');

  /**
   * ชื่อรหัสสัญญาเพิ่มเติมที่ผูกกับแบบประกัน
   */
  private riderCodeForPlan: Array<string> = this.conf.getRiderCodeForPlan();

  /**
   * แบบประกันที่ซื้อได้อายุขั้นต่ำ default = 1m
   */
  private planMinAge = {
    SQ: '15d'
  }

  /**
   * ชื่อรหัสสัญญาเพิ่มเติมแฝง
   */
  private riderHiddenCode: Array<string> = this.conf.getRiderHiddenCode();

  /**
   * ตั้งค่า
   */
  private config: object = {};

  /**
   * สัญญาเพิ่มเติม
   */
  private rider: any = [];

  /**
   * แบบประกัน
   */
  private choosePlan: string;

  /**
   * สัญญาเพิ่มเติมพร้อมใช้งาน
   */
  private ready: boolean = false;

  /**
   * แบบประกันที่ซื้อสัญญาเพิ่มเติมตะกาฟุลได้
   */
  private takafulRider: boolean = false;

  /**
   * อายุ
   */
  private age: number = 30;

  /**
   * อาชีพทหาร
   */
  private soldier: string = '';

  /**
   * แบบประกันที่เลือก
   */
  private tlplan: TLPlanModel;

  /**
   * เบี้ยประกัน
   */
  @Output('premium') private premium: EventEmitter<number> = new EventEmitter();

  // ข้อมูลสัญญาเพิ่มเติม
  @Input('rider') set setRider(rider: any) {
    this.setRiderValue(rider);
  }
  /**
   * แสดงสัญญาเพิ่มเติม
   */
  private setRiderValue(rider: any) {

    if (this.ready) {
      if (!_.isEmpty(rider)) {
        
        //this.rider = rider;

        if(typeof(rider['occupation']) !== 'undefined' ){
          this.occ = rider['occupation']['occ'];
          this.occGroup = rider['occupation']['occGroup'];
          // this.premCal.calWithRider();
        }

        let allRiderCode: Array<string> = this.riderCode.concat(this.riderCodeForPlan);
        allRiderCode.forEach(code => {
          if (typeof rider[code] != 'undefined') {
            this.rider[code].sum = rider[code].sum;
            this.rider[code].premium = rider[code].premium;

            if (code == this.conf.rider('KB2')) {
              this.buyKB2 = true; 
              this.rider[this.conf.rider('KB2')]['premium'] = this.rider[code].premium
              this.rider[this.conf.rider('KB2')]['age'] = this.rider[code].age;
              this.rider[this.conf.rider('KB2')]['sex'] = this.rider[code].sex;
              this.rider[this.conf.rider('KB2')]['birth'] = this.rider[code].birth;
            }
          }
        });

        if(typeof(rider['occupation']) !== 'undefined' ){

          this.rider['occupation'] = [];
          this.rider['occupation']['occ'] = this.occ;
          this.rider['occupation']['occGroup']= this.occGroup;
    
        }
      
        if(this.rider[this.conf.rider('KB2')]['age'] != null &&  this.rider[this.conf.rider('KB2')]['sex'] != ''){
          //setTimeout(() => {
            this.buyKB2 = true;  
          //}, 2000);
          
        }
        if(typeof this.rider[this.conf.rider('D01')].premium == 'string' && !isNaN(this.rider[this.conf.rider('D01')].premium) && Number(this.rider[this.conf.rider('D01')].premium)>0 ) {
          this.dType = this.conf.rider('D01');
          return;
        }
        if(typeof this.rider[this.conf.rider('D02')].premium == 'string' && !isNaN(this.rider[this.conf.rider('D02')].premium) && Number(this.rider[this.conf.rider('D02')].premium)>0 ) {
          this.dType = this.conf.rider('D02');
          return;
        }
        if(typeof this.rider[this.conf.rider('D03')].premium == 'string' && !isNaN(this.rider[this.conf.rider('D03')].premium) && Number(this.rider[this.conf.rider('D03')].premium)>0 ) {
          this.dType = this.conf.rider('D03');
          return;
        }

        this.premCal.setRider(this.rider);
        // this.premCal.calWithRider();
      }
    }

    else {
      setTimeout(() => {
        this.setRiderValue(rider);
      }, 100);
    }
  }
  @Output() private riderChange: EventEmitter<object> = new EventEmitter();

  // ข้อมูลผู้มุ่งหวัง
  @Input('prospect') set setProspect(prospect: ProspectModel) {
    if (typeof prospect != 'undefined') {
      this.prospect = prospect;
        //this.callPlanRider();

      if (this.prospect.birthDate != null && this.birthDate != this.prospect.birthDate) {
        this.birthDate = this.prospect.birthDate;

        this.validateAge();
        this.validateMax();
        this.validateMin();
      }

      // เฉพาะ อ.1 อ.2
      if (this.age < 16 && Number(this.prospect.age) > 15 && this.occ == '') {
        this.rider[this.conf.rider('AC01')].sum = 0;
        this.rider[this.conf.rider('AC02')].sum = 0;
        this.rider[this.conf.rider('KG1')].sum = 0;
        this.rider[this.conf.rider('KG2')].sum = 0;
        this.rider[this.conf.rider('TAC01')].sum = 0;
        this.rider[this.conf.rider('TAC02')].sum = 0;
        this.rider[this.conf.rider('TKG1')].sum = 0;
        this.rider[this.conf.rider('TKG2')].sum = 0;
        
        this.broadcastRider();
      }
      this.age = Number(this.prospect.age);

      this.premCal.setInsuredage(this.prospect.age);
      this.premCal.setTypex(this.prospect.gender);
      this.premCal.setOccupationType(this.prospect.occupationType);
      this.premCal.calWithRider().then(res => {
        this.broadcastRider();
      });
    }
  }

  // ทุนประกัน
  @Input('sum') set setSum(sum: number) {
    if (typeof sum == 'number') {
      this.sum = sum;
      //this.callPlanRider();

      this.validateMax();
      this.validateMin();
    }
  }

  // แบบประกันที่เลือก
  @Input('plan') set setPlan(plan: string) {
    this.choosePlan = plan;
    this.callPlanRider();

    if (this.choosePlan != 'EN36' && this.choosePlan != 'EN37' && this.occGroup2 > 0) {
      this.occGroup2 = 0;
      this.changeOccGroup();
    }
  }

  // อาชีพทหาร
  @Input('soldier') set setSoldier(soldier: string) {
    this.soldier = soldier;
    this.callPlanRider();

    if (soldier == '')
      this.occGroup2 = 0;
    else
      this.occGroup2 = 3;

    this.changeOccGroup();
  }

  @Input('tlplan') set setTLPlan(tlplan: TLPlanModel) {
    if (typeof tlplan != 'undefined') {
      this.tlplan = tlplan;
      this.validateAge();

      this.premCal.setPlanSelected(this.tlplan);
      this.premCal.setCalType(Number(this.tlplan.calType));
      this.premCal.calWithRider().then(res => {
        this.broadcastRider();
      });
    }
  }

  @Input('mode') set mode(mode: string | number) {
    if (typeof mode != 'undefined') {
      this.premCal.setMode(Number(mode));
      this.premCal.calWithRider().then(res => {
        this.broadcastRider();
      });
    }
  }

  constructor(
    private http: Http,
    private alertCtrl: AlertDirective,
    private decimalPipe: DecimalPipe,
    private modalCtrl: ModalController,
    private storage: Storage,
    private apiProvider: ApiProvider,
    private conf: RiderConfig,
    private quotationData: QuotationData,
    private loadingCtrl: LoadingDirective,
    private premCal: PremiumCalProvider) {

    let loading: Loading = this.loadingCtrl.scopePresent();
    this.initConfig().then(() => {
      this.premCal.setRider(this.rider);
      this.broadcastRider();
      this.ready = true;

      loading.dismiss();
    });
  }

  public ngOnDestroy() {
    this.initConfig();
  }

  private initConfig(): Promise<{}> {

    return new Promise((resolve, reject) => {
      let allRiderCode: Array<string> = this.riderCode.concat(this.riderCodeForPlan);

      // default
      allRiderCode.forEach(code => {
        this.config[code] = {
          rider: '',
          age: {
            min: null,
            max: null
          },
          steps: null,
          sum: {
            min: null,
            max: null
          },
          disabled: false,
          active: false,
          min: 0,
          minAlert: '',
          max: 999999999,
          maxAlert: '',
          zero: 0
        };

        if (code == this.conf.rider('KB2')) {
          this.changeBuyKB2(false);
        }
        else {
          this.rider[code] = {
            sum: 0,
            premium: '000000000'
          };
        }
      });

      // default
      this.riderHiddenCode.forEach(code => {
        this.rider[code] = {
          sum: 0,
          premium: '000000000'
        };
      });

      this.premCal.setRider(this.rider);


      this.conf.getConfig().then(res => {
        this.config = JSON.parse(res);
        this.changeBuyKB2(false);

        this.minKB2Date = moment().subtract(Number(this.config[this.conf.rider('KB2')].age.max.replace('y', '')), 'year').format('YYYY-MM-DD');
        this.maxKB2Date = moment().subtract(Number(this.config[this.conf.rider('KB2')].age.min.replace('y', '')), 'year').format('YYYY-MM-DD');
        resolve();
      });

      // // ระดับสิทธิ์ตัวแทน
      // this.storage.get('loginProfile').then(profile => {
      //   this.permission = profile.perrmissionAgent;

      //   // config
      //   let allRiderCode: Array<string> = this.conf.getRiderCode('code').concat(this.riderCodeForPlan);
      //   allRiderCode.forEach(code => {
      //     // ตั้งค่าสัญญาเพิ่มเติม
      //     this.http.get('assets/json/rider/'+ code +'.json').subscribe(data => {

      //       let config = data.json();

      //       // ใช้ชื่อรหัสสัญญาเพิ่มเติมใหม่
      //       code = this.conf.rider(code);

      //       // กรณีแบ่งตาม permission มากกว่า 1 ระดับสิทธิ์
      //       if (typeof config.agent != 'undefined') {
      //         let length: number = config.agent.length;
      //         if (length == 1)
      //           // มีระดับสิทธิ์เดียว
      //           this.config[code] = config.agent[0];
      //         else {
      //           switch (this.permission.trim().toLocaleLowerCase()) {
      //             case 'normal':
      //               this.config[code] = config.agent[0];
      //               break;
      //             case 'q up':
      //               this.config[code] = config.agent[1];
      //               break;
      //             case 'top up':
      //               this.config[code] = config.agent[2];
      //               break;
      //             case 'top up plus':
      //               if (length > 3)
      //                 // กรณีมีเงื่อนไขระดับ Top UP plus
      //                 this.config[code] = config.agent[3];
      //               else
      //                 // กรณีไม่มีเงื่อนไขระดับ Top UP plus ใช้ Top UP แทน
      //                 this.config[code] = config.agent[2];
      //               break;
      //             default:
      //               this.config[code] = config.agent[0];
      //           }
      //         }
      //         this.config[code].rider = config.rider;
      //         if (typeof config.age != 'undefined')
      //           this.config[code].age = config.age;
      //         if (typeof config.steps != 'undefined')
      //           this.config[code].steps = config.steps;
      //         if (typeof config.rule != 'undefined')
      //           this.config[code].rule = config.rule;
      //       }
      //       else
      //         this.config[code] = config;

      //       this.config[code].disabled = false;
      //       this.config[code].active = false;
      //       this.config[code].min = 0;
      //       this.config[code].minAlert = '';
      //       this.config[code].max = 999999999;
      //       this.config[code].maxAlert = '';
      //       this.config[code].zero = 0;

      //       if (code == this.conf.rider('KB2')) {
      //         this.minKB2Date = moment().subtract(Number(this.config[code].age.max.replace('y', '')), 'year').format('YYYY-MM-DD');
      //         this.maxKB2Date = moment().subtract(Number(this.config[code].age.min.replace('y', '')), 'year').format('YYYY-MM-DD');
      //       }

      //       this.ready ++;
      //       if (this.ready == allRiderCode.length)
      //         resolve();
      //     });
      //   });
      // });
    });
  }

  /**
   * แสดงสัญญาเพิ่มเติม
   */
  private showRider: boolean = false;
  /**
   * แสดงสัญญาเพิ่มเติม
   */
  private toggleRider(): void {
    this.showRider = !this.showRider;
  }

  /**
   * ตรวจสอบอายุที่ซื้อสัญญาเพิ่มเติมได้
   */
  private birthDate: string;
  private validateAge(): void {

    // โหลดสัญญาเพิ่มเติมเสร็จหมดแล้ว
    if (this.ready) {
      this.riderCode.forEach(code => {
        
        let config: any = this.getConfig(code);
        
        if (this.checkAge(config.age.min, config.age.max)) {
          // อายุอยู่ในช่วง ขาย สัญญาเพิ่มเติมนี้ได้
          // this.config[code].disabled = false;
          this.config[code].disabled = !this.specialConditions(code);

          if (code == this.conf.rider('KB2_1')) {
            this.changeBuyKB2(false);
          }
        }
        else {
          // อายุอยู่นอกช่วง ห้าม สัญญาเพิ่มเติมนี้
          this.rider[code].sum = 0;
          this.rider[code].premium = '000000000';
          this.config[code].disabled = true;

          if (code == this.conf.rider('KB2_1')) {
            this.changeBuyKB2(false);
          }
        }
      });

      // default ทร.
      setTimeout(() => {
        this.dType = this.selectDefault(this.dType, [this.conf.rider('D01'), this.conf.rider('D02'), this.conf.rider('D03')]);
      }, 300);
    }
    else {
      setTimeout(() => {
        this.validateAge();
      }, 100);
    }
  }

  /**
   * ตรวจสอบค่าต่ำสุดที่ซื้อสัญญาเพิ่มเติมได้
   */
  private validateMin(checkall: boolean = true) {
    if(typeof this.quotationData.riderDraf != 'undefined') return;

    // โหลดสัญญาเพิ่มเติมเสร็จหมดแล้ว
    if (this.ready) {
      this.riderCode.forEach(code => {
        let config: any = this.getConfig(code);
        if (typeof config.sum != 'undefined') {
          //if (typeof config.sum.min != 'number' && checkall)
            this.setMin(code, config.sum.min);
        }
      });
    }
    else {
      setTimeout(() => {
        this.validateMin();
      }, 100);
    }
  }

  /**
   * ตรวจสอบค่าสูงสุดที่ซื้อสัญญาเพิ่มเติมได้
   */
  private validateMax(showAlert: boolean = true) {
    if(typeof this.quotationData.riderDraf != 'undefined') return;

    // โหลดสัญญาเพิ่มเติมเสร็จหมดแล้ว
    if (this.ready) {
      this.maxAlert = '';

      this.riderCode.forEach(code => {
        let config: any = this.getConfig(code);
        if (typeof config.sum != 'undefined') {
          // ค่าสูงสุดมีค่าเดียว
          if (typeof config.sum.max != 'object') {
            this.setMax(code, config.sum.max);
          }
          // ค่าสูงสุดมีหลายเงื่อนไข
          else {
            // ค่าสูงสุดมีมากกว่า 1 ค่า ไม่มีเงื่อนไขอื่น
            if (typeof config.sum.max.value != 'undefined') {
              this.setMax(code, config.sum.max);
            }
            // ค่าสูงสุดมีเงื่อนไขอื่นๆ
            else {
              for (let i = config.sum.max.length - 1; i > - 1; i --) {
                let max = config.sum.max[i];

                // เงื่อนไข อายุ
                if (typeof max.age != 'undefined') {
                  // อยู่ในช่วงอายุ
                  if (this.checkAge(max.age)) {
                    // พบค่าสูงสุดในเงื่อนไข อายุ
                    if (typeof max.value != 'undefined') {
                      // ค่าสูงสุดมีค่าเดียว
                      if (typeof max.value == 'number')
                        this.config[code].max = max.value;
                      // ค่าสูงสุดมีมากกว่า 1 ค่า
                      else {
                        this.setMax(code, max);
                      }
                    } 
                    // พบค่าสูงสุดในเงื่อนไข อาชีพ
                    else if (typeof max.occGroup != 'undefined') {
                      console.log(" max.occGroup  >>.", max.occGroup);
                      // เลือกกลุ่มอาชีพ
                      if (this.occGroup2 == 0){
                        if(this.occGroup != -1  || Number(this.prospect.age) < 16)
                        {
                          this.setMax(code, max.occGroup[this.occGroup]);
                        }
                      }
                      else
                        this.setMax(code, max.occGroup[this.occGroup2]);
                    }
                    // พบค่าสูงสุดในเงื่อนไข ทุนประกัน
                    else if (typeof max.steps != 'undefined') {
                      // เลือกช่วงทุนประกัน
                      for (let j = max.steps.length - 1; j > -1; j --) {
                        let step: any = max.steps[j];
                        // เลือกช่วงเงื่อนไข ตามทุนประกัน
                        if (this.sum >= step.step) {
                          this.setMax(code, step);

                          j = -1;
                        }
                      }
                    }
                    i = -1;
                  }

                }
              }
            }
          }
        }

        // รูปแบบ dropdown
        else if (typeof config.select != 'undefined') {
          this.conditionDropdown(code, false);
        }
      });

      // แสดงข้อความแจ้งเตือนค่าสูงสุด
      if (this.maxAlert != '' && showAlert) {
        //this.alertCtrl.warning(this.maxAlert);
        this.alert(this.maxAlert);
      }
    }
    else {
      setTimeout(() => {
        this.validateMax();
      }, 100);
    }
  }

  /**
   * ปรับค่าสูงสุด
   * @param code ชื่อย่อสัญญาเพิ่มเติม
   * @param param ค่า
   */
  private setMax(code: string, param: any): void {
    this.config[code].max = 999999999;
    this.config[code].maxAlert = '';
    let message = '';
    let sum = 999999999;
    let max = typeof param.value == 'undefined' ? [ param ] : param.value;

    if (typeof max == 'string' || typeof max == 'number')
      max = [max];

    // เด็ก
    /*if (Number(this.prospect.age) < 20)
      message += 'เด็ก : ';*/

    // สัญญาเพิ่มเติมที่ต้องซื้อก่อน
    if (typeof param.required != 'undefined') {
      let required = param.required;
      // ต้องซื้อสัญญาเพิ่มเติมก่อน 1 สัญญา
      if (typeof required == 'string') {
        message += 'ต้องซื้อทุน ' + this.config[required].rider + ' ก่อน และทุน ' + this.config[code].rider + ' ต้องไม่เกินทุน ' + this.config[required].rider + ' ';
        this.config[code].max = this.rider[required].sum;
      }
    }

    message += 'ทุน ' + this.config[code].rider + ' ซื้อได้สูงสุดไม่เกิน ';
    max.forEach((value, idx) => {
      // ค่าสูงสุดเป็นค่าคงที่
      if (typeof value == 'number') {
        if (idx > 0)
          message += ' และสูงสุดไม่เกิน ';
        message += this.decimalPipe.transform(value) + ' บาท';
        if (sum > value)
          sum = value;

        if (this.config[code].max > value)
          this.config[code].max = value
      }
      // ค่าสูงสุดเป็นตัวอักษร
      else if (typeof value == 'string') {
        // ทุนประกัน
        if (value == 'sum') {
          if (idx > 0)
            message += ' และสูงสุดไม่เกิน ';
          message += '1 เท่าของทุนประกัน';
          sum = this.sum

          if (this.config[code].max > this.sum)
            this.config[code].max = sum;
        }
        // ทุนประกันมากกว่า 1 เท่า
        else if (value.search('sum') > -1) {
          if (idx > 0)
            message += ' และสูงสุดไม่เกิน ';

          // จำนวนเท่าของทุนประกัน
          if (value.search('x') > 0) {
            let split: Array<string> = value.split('x');
            let x: number = Number(split[0]);
            message += x + ' เท่า';

            sum = this.sum * x;
          }
          // จำนวน %
          else if (value.search('%') > 0) {
            let split: Array<string> = value.split('%');
            let x: number = Number(split[0]);
            message += x + '% ';

            sum = this.sum * (x / 100);
          }
          message += 'ของทุนประกัน';

          if (this.config[code].max > sum) {
            if (typeof this.config[code].steps == 'number'){
              if (sum < this.config[code].steps)
                this.config[code].max = 0;
              else
                this.config[code].max = sum;
              }
            else {
              if (sum < this.config[code].steps[0].step)
                this.config[code].max = 0;
              else
                this.config[code].max = sum;
            }
          }
        }
        // สัญญาเพิ่มเติม
        else {
          if (this.rider[value].sum != 0) {
            message = message.replace('ซื้อได้สูงสุดไม่เกิน', '+ ' + this.config[value].rider + ' ซื้อได้สูงสุดไม่เกิน');

            let oldSum = sum;
            sum -= this.rider[value].sum;

            if (
              sum < 0 || 
              // เงื่อนไขเฉพาะ ฆจ.1 ฆจ.2 ห้ามซื้อเกินทั้งสอง ฆจ รวมกัน และต้องซื้อที่ max เท่านั้น
              ((code == 'KG1' || code == 'KG2') && sum - this.config[code].max < 0)
            )
              sum = 0;
            if (this.config[code].max > sum) {
              this.config[code].max = sum;
            }
            
            // ตรวจสอบอีกครั้งว่าซื้อเกินสัญญาเพิ่มเติมที่เกี่ยวข้องกันหรือไม่
            setTimeout(() => {
              //alert(idx + ' | ' + value + '<>' + code + ': ' + this.rider[value].sum + ' >>>>>> ' + (sum - this.rider[value].sum));
              if (oldSum - this.rider[value].sum < 1)
                this.config[code].max = 0;
            }, 100)
          }
        }
      }
      // ค่าสูงสุดเป็นอาร์เรย์ สัญญาเพิ่มเติม
      else if (typeof value == 'object') {
        let check: boolean = false;
        let tmpMsg: string;

        value.forEach((item, idx) => {
          if (idx == 0) {
            // ปรับข้อความแจ้งเตือนค่าสูงสุด
            tmpMsg = message.substr(0, message.lastIndexOf('สูงสุดไม่เกิน')) + 'สูงสุดไม่เกิน ' + this.decimalPipe.transform(item) + ' บาท';
            sum = item;
          }
          else {
            if (this.rider[item].sum != 0) {
              // มีค่าสัญญาเพิ่มเติมอื่นที่เกี่ยวข้อง
              tmpMsg = tmpMsg.replace('ซื้อได้สูงสุดไม่เกิน', '+ ' + this.config[item].rider + ' ซื้อได้สูงสุดไม่เกิน');

              sum -= this.rider[item].sum;

              if (sum < 0)
                sum = 0;
              // ไม่สามารถซื้อเกินสัญญาเพิ่มเติมอื่นที่เกี่ยวข้อง
              else if (this.config[item].max == this.rider[item].sum) {
                sum = this.rider[code].sum;
                check = true;
              }

              if (this.config[code].max > sum)
                this.config[code].max = sum;
            }
          }
        });

        if (check) {
          message = tmpMsg;
        }
      }
    });

    this.config[code].maxAlert = message;
    // ค่าเกิน ปรับค่าใหม่ และแจ้งเตือนข้อความ
    if (this.rider[code].sum > this.config[code].max) {
      this.rider[code].sum = this.config[code].max;
      this.rider[code].premium = '000000000';
      this.maxAlert += message + '<br />';
    }
    // else {
    
    //   // ตั้งค่า
    //   let config: any = this.getConfig(code);
    //   let check: boolean = true;

    //   // สำหรับปรับสลับค่าสัญญาเพิ่มเติม
    //   let refRider: string;
    //   let refRiderMsg: string;
    //   // กฏเพิ่มเติม
    //   if (typeof config.rule != 'undefined') {
    //     // เงื่อนไขแต่ละกฎ
    //     for (let i = 0; i < config.rule.length; i ++) {

    //       let deny: Array<string>;
    //       if (typeof config.rule[i].deny == 'string')
    //         deny = [config.rule[i].deny];
    //       else
    //         deny = config.rule[i].deny;

    //       message = 'ไม่สามารถซื้อ ' + config.rider + ' พร้อมกับ ';
    //       deny.forEach((item, idx) => {
    //         if (this.rider[item].sum > 0 && this.rider[code].sum > 0) {
    //           message += this.config[item].rider;
    //           // ยกเลิกซื้อสัญญาเพิ่มเติมแบบเดิม
    //           alert(item);
    //           this.rider[item].sum = 0;
    //           check = false;
    //         }
    //       });
    //     }

    //     if (!check)
    //       this.alert(message);
    //   }
    // }
  }

  /**
   * ปรับค่าต่ำสุด
   * @param code ชื่อย่อสัญญาเพิ่มเติม
   * @param value ค่า
   */
  private setMin(code: string, param: any): void {
    this.config[code].min = 0;
    this.config[code].minAlert = '';
    let message = '';

    // ค่าต่ำสุดเป็นค่าคงที่
    if (typeof param == 'number') {
      this.config[code].min = param
    }
    // ค่าต่ำสุดเป็นตัวอักษร
    else if (typeof param == 'string') {
      
      // ทุนประกัน
      if (param == 'sum') {
        if (this.config[code].min < this.sum)
          this.config[code].min = this.sum;
      }
      // สัญญาเพิ่มเติม
      else {
        if (this.config[code].min < this.rider[param].sum && this.config[code].max > this.rider[param].sum)
          this.config[code].min = this.rider[param].sum;
        else
          this.config[code].min = this.config[code].max;
      }
    }
    // ค่าต่ำสุดเป็น object
    else if (typeof param == 'object') {
      // สัญญาเพิ่มเติมที่ห้ามซื้อต่ำกว่า
      if (typeof param.required != 'undefined' && (this.occGroup != -1 || Number(this.prospect.age) < 16)) {
        this.config[code].min = this.rider[param.required].sum;
        this.config[code].zero = this.rider[param.required].sum;
      }
    }

    // ค่าเกิน ปรับค่าใหม่ และแจ้งเตือนข้อความ

    if (this.rider[code].sum > 0 && this.rider[code].sum <= this.config[code].min) {
      this.rider[code].sum = this.config[code].min;
    }
  }

  /**
   * เปลี่ยนค่า
   */
  private onChange(id: string): void {

    let message: string = '';
    // ตั้งค่า
    let config: any = this.getConfig(id);
    let check: boolean = true;

    // สำหรับปรับสลับค่าสัญญาเพิ่มเติม
    let refRider: string;
    let refRiderMsg: string;
    // กฏเพิ่มเติม
    if (typeof config.rule != 'undefined') {
      // เงื่อนไขแต่ละกฎ
      for (let i = 0; i < config.rule.length; i ++) {

        let deny: Array<string>;
        if (typeof config.rule[i].deny == 'string')
          deny = [config.rule[i].deny];
        else
          deny = config.rule[i].deny;

        message = 'ไม่สามารถซื้อ ' + config.rider + ' พร้อมกับ ';
        deny.forEach((item, idx) => {
          if (this.rider[item].sum > 0) {
            message += this.config[item].rider;
            // ยกเลิกซื้อสัญญาเพิ่มเติมแบบเดิม
            this.rider[item].sum = 0;
            check = false;
          }
        });
      }

      if (!check)
        this.alert(message);
    }

    this.validateMax(false);
    this.validateMin(false);

    let data = {
      id: id,
      value: this.rider[id]
    }
    
    this.premCal.calWithRider(id).then(res => {
      this.broadcastRider();
    });

    // เงื่อนไขเฉพาะ เกี่ยวพันกันระหว่าง อ. ฆจ.
    if (id == this.conf.rider('AC02')) {
        this.setMax(this.conf.rider('KG1'), this.config[this.conf.rider('KG1')].sum.max);
        this.setMin(this.conf.rider('KG1'), this.config[this.conf.rider('KG1')].sum.min);
    }
  }

  private popup(plancode : string){
    let modal: Modal = this.modalCtrl.create(PopupPlanDetailComponent,{ plancode : plancode});
    modal.present();
  }

  /**
   * เปลี่ยนกลุ่มอาชีพ
   */
  private changeOccGroup(): void {
    setTimeout(() => {
      this.validateMax();
      this.validateMin();
    }, 100);
  }

  /**
   * เปลี่ยน ทร.
   */
  private changeD(): void {
    this.rider[this.conf.rider('D01')].sum = 0;
    this.rider[this.conf.rider('D01')].premium = '000000000';
    this.rider[this.conf.rider('D02')].sum = 0;
    this.rider[this.conf.rider('D02')].premium = '000000000';
    this.rider[this.conf.rider('D03')].sum = 0;
    this.rider[this.conf.rider('D03')].premium = '000000000';
    this.broadcastRider();
  }

  /**
   * กำหนดค่าเริ่มต้น dropdown
   */
  private selectDefault(value: string, options: Array<string>): string {
    if (this.config[value].disabled || !this.config[value].active) {
      for (let i = 0; i < options.length; i ++) {
        if (!this.config[options[i]].disabled && this.config[options[i]].active) {
          value = options[i];
          i = options.length;
          break;
        }

        if (i == options.length)
          value = options[0];
      }
    }
    
    return value;
  }
  
  /**
   * เงื่อนไข dropdown
   * @param code ชื่อย่อสัญญาเพิ่มเติม
   * @param showAlert แสดงแจ้งเตือนทันที
   */
  private conditionDropdown(code: string, showAlert: boolean = true): void {
    if(typeof this.quotationData.riderDraf != 'undefined') return;

    if (this.rider[code].sum != 0) {
      // ตั้งค่า
      let config: any = this.getConfig(code);

      let check: boolean = true;
      let message: string = '';

      // สำหรับปรับสลับค่าสัญญาเพิ่มเติม
      let refRider: string;
      let refRiderMsg: string;

      // ทุนรวมค่าห้องเกินหรือไม่
      let overRoomRate: boolean = false;

      // กฏเพิ่มเติม
      if (typeof config.rule != 'undefined') {
        // เงื่อนไขแต่ละกฎ
        for (let i = 0; i < config.rule.length; i ++) {
          // เงื่อนไขอายุ และห้ามซื้อ
          if (typeof config.rule[i].age != 'undefined' && typeof config.rule[i].deny != 'undefined') {
            // เงื่อนไขอยู่ในช่วงอายุ
            if (this.checkAge(config.rule[i].age.min, config.rule[i].age.max)) {
              if (this.rider[config.rule[i].deny].sum > 0) {
                message = 'อายุอยู่ในช่วงต่ำสุดและสูงสุด ' + this.convertAgeToMessage(config.rule[i].age.min) + ' - ' + this.convertAgeToMessage(config.rule[i].age.max) + ' ไม่สามารถซื้อ ' + config.rider + ' พร้อมกับ ' + this.config[config.rule[i].deny].rider;
                check = false;
                
                // ยกเลิกซื้อสัญญาเพิ่มเติมแบบเดิม
                refRider = config.rule[i].deny;
                refRiderMsg = message;
              }
            }
          }

          // ไม่มีอายุ
          else if (typeof config.rule[i].deny != 'undefined') {
            let deny: Array<string>;
            if (typeof config.rule[i].deny == 'string')
              deny = [config.rule[i].deny];
            else
              deny = config.rule[i].deny;

            let count = 0;
            message = 'ไม่สามารถซื้อ ' + config.rider + ' พร้อมกับ ';
            deny.forEach((item, idx) => {
              if (this.rider[item].sum > 0) {
                /*if (count > 0)
                  message += ' และ ';*/
                message += this.config[item].rider;
                // ยกเลิกซื้อสัญญาเพิ่มเติมแบบเดิม
                refRider = item;
                //check = false;
              }
              count ++;
            });

            refRiderMsg = message;
          }

          // ความสัมพันธ์เพิ่มเติม
          else if (typeof config.rule[i].config != 'undefined') {
            
            setTimeout(() => {
              let extConf: any = this.config[config.rule[i].config];

              // เงื่อนไขแต่ละกฎ ค่าสูงสุด
              for (let j = extConf.sum.max.length - 1; j > -1; j --) {
                let conf: any = extConf.sum.max[j];
                // เงื่อนไขอยู่ในช่วงอายุ
                if (this.checkAge(conf.age)) {

                  // เลือกช่วงทุนประกัน
                  for (let k = conf.steps.length - 1; k > -1; k --) {
                    let step: any = conf.steps[k];
                    // เลือกช่วงเงื่อนไข ตามทุนประกัน
                    if (this.sum >= step.step) {

                      // ข้อความแจ้งเตือน
                      let message: string = 'ทุนรวมค่าห้องของ ';
                      // ค่ารวมสูงสุด
                      let sumValue: number = step.value;
                      // สัญญาเพิ่มเติมที่เกี่ยวข้อง
                      conf.rider.forEach((rider, idx) => {
                        if (this.rider[rider].sum > 0) {
                          // ตัวเลือกสัญญาเพิ่มเติมที่เกี่ยวข้อง
                          let select: any = this.config[rider].select;
                          for (let m = 0; m < select.length; m ++) {
                            if (select[m].option == this.rider[rider].sum) {
                              if (typeof select[m].value == 'undefined')
                                sumValue -= select[m].option;
                              else
                                sumValue -= select[m].value;

                              // เกินค่า ปรับค่าใหม่
                              if (sumValue < 0) {
                                setTimeout(() => {
                                  this.rider[rider].sum = 0;
                                }, 100);
                                
                              }

                              if (idx > 0)
                                message += ' และ ';
                              message += this.config[rider].rider;
                              m = select.length;
                            }
                          }
                        }
                      });

                      message += ' ต้องไม่เกิน ' + this.decimalPipe.transform(step.value) + ' บาท';
                      
                      // ห้ามซื้อเกินค่าสูงสุด
                      if (sumValue < 0) {

                        // แสดงข้อความแจ้งเตือน
                        if (showAlert)
                          //this.alertCtrl.warning(message);
                          this.alert(message);
                        else
                          this.maxAlert += message + '<br />';

                        overRoomRate = true;
                        //return;
                      }

                      k = -1;
                    }
                  }

                  j = -1;
                }
              }
            }, 150);
          }
        }
      }

      // ผ่านกฏ
      if (check) {
        // เงื่อนไขแต่ละ option
        for (let i = 0; i < config.select.length; i ++) {
          let sum: any = config.select[i].sum;
          let option: number = config.select[i].option;
          let minAge: string = typeof config.select[i].age != 'undefined' ? config.select[i].age.min : '';
          let maxAge: string = typeof config.select[i].age != 'undefined' ? config.select[i].age.max : '';

          // ทุนประกันตามที่เลือก
          if (this.rider[code].sum == option) {

            let check: boolean = true;
            let message: string = '';

            // เงื่อนไข เพิ่มเติม
            if (typeof config.select[i].condition != 'undefined') {
              let condition: any = config.select[i].condition;
              for (let j = condition.length - 1; j > -1; j --) {

                if (this.checkAge(condition[j].age.min, condition[j].age.max)) {
                  sum = condition[j].sum;
                  minAge = condition[j].age.min;
                  maxAge = condition[j].age.max;

                  j = -1;
                }

                // ไม่พบค่าที่เลือกได้
                if (j == 0) {
                  check = false;
                  message += config.rider + ' ' + this.decimalPipe.transform(option) + ' ไม่อยู่ในช่วงที่ซื้อได้';
                }
              }
            }

            // ช่วงอายุ
            if (minAge != '') {
              message += config.rider + ' ' + this.decimalPipe.transform(option) + ' อายุอยู่ในช่วงต่ำสุดและสูงสุด ' + this.convertAgeToMessage(minAge) + ' - ' + this.convertAgeToMessage(maxAge);
              if (!this.checkAge(minAge, maxAge) && Number(this.prospect.age) <= Number(maxAge.replace('y', ''))) {
                // อยู่นอกช่วง
                check = false;
                /*setTimeout(() => {
                  this.rider[code].sum = 0;
                }, 100);*/
              }
            }

            // เงื่อนไข ทุนประกันขั้นต่ำที่ซื้อได้
            if (typeof sum == 'object') {
              // แบบประกันตลอดชีพ WN, WX, WY
              if (typeof sum.wholelife != 'undefined' && (this.choosePlan.toUpperCase().search('WN') == 0 || this.choosePlan.toUpperCase().search('WV') == 0 || this.choosePlan.toUpperCase().search('WX') == 0 || this.choosePlan.toUpperCase().search('WY') == 0)) {
                sum = sum.wholelife;
              }
              // แบบประกันทั่วไป
              else {
                sum = sum.newcase;
              }
            }

            // ซื้อต่ำกว่าทุนประกันขั้นต่ำไม่ได้
            if (message == '')
              message += config.rider + ' ' + this.decimalPipe.transform(option) + ' ';
            if (typeof sum != 'undefined')
                message += 'ทุนประกันต้องไม่ต่ำกว่า ' + this.decimalPipe.transform(sum) + ' บาท';

            if (typeof sum == 'undefined' || this.sum < sum || !check) {
              check = false;

              for (let j = config.select.length - 1; j > -1; j --) {

                let sum: any = config.select[j].sum;
                let option: number = config.select[j].option;
                let minAge: string = typeof config.select[j].age != 'undefined' ? config.select[j].age.min : '';
                let maxAge: string = typeof config.select[j].age != 'undefined' ? config.select[j].age.max : '';

                // เงื่อนไข เพิ่มเติม
                if (typeof config.select[j].condition != 'undefined') {
                  let condition: any = config.select[j].condition;
                  for (let k = condition.length - 1; k > -1; k --) {
                    if (this.checkAge(condition[k].age.min)) {
                      sum = condition[k].sum;
                      minAge = condition[k].age.min;
                      maxAge = condition[k].age.max;

                      k = -1;
                    }
                  }
                }

                // ช่วงอายุ
                if (minAge != '') {
                  if (!(this.checkAge(minAge) && Number(this.prospect.age) <= Number(maxAge.replace('y', '')))) {
                    // อยู่นอกช่วง
                    sum = 999999999;
                  }
                }

                // แบบประกันตลอดชีพ WN, WX, WY
                if (typeof sum == 'object') {
                  if (typeof sum.wholelife != 'undefined' && (this.choosePlan.toUpperCase().search('WN') == 0 || this.choosePlan.toUpperCase().search('WV') == 0 || this.choosePlan.toUpperCase().search('WX') == 0 || this.choosePlan.toUpperCase().search('WY') == 0)) {
                    sum = sum.wholelife;
                  }
                  // แบบประกันทั่วไป
                  else {
                    sum = sum.newcase;
                  }
                }

                // ไม่พบค่าที่เลือกได้
                if (j == 0) {
                  setTimeout(() => {
                    this.rider[code].sum = 0;
                  }, 100);
                }
                else if (typeof sum != 'undefined' && this.sum >= sum) {
                  setTimeout(() => {
                    this.rider[code].sum = option;
                  }, 100);
                  j = -1;
                }
              }
            }

            // แสดงข้อความแจ้งเตือน
            if (!check) {
              if (showAlert)
                //this.alertCtrl.warning(message);
                this.alert(message);
              else
                this.maxAlert += message + '<br />';
            }
            // กำหนดค่าได้ และประกาศค่า
            else {
              if (typeof refRider != 'undefined') {
                this.rider[refRider].sum = 0;
                //this.rider[refRider].premium = '000000000';

                // แสดงข้อความแจ้งเตือนการเปลี่ยนสัญญาเพิ่มเติมที่ซื้อได้
                setTimeout(() => {
                  // ต้องไม่มีแจ้งเตือนทุนรวมค่าห้อง
                  if (!overRoomRate) {
                    if (showAlert)
                      //this.alertCtrl.warning(refRiderMsg);
                      this.alert(refRiderMsg);
                    else
                      this.maxAlert += refRiderMsg + '<br />';
                  }
                }, 200);
              }

              this.premCal.calWithRider(code).then(res => {
                this.broadcastRider();
              });
            }
          }
        }
      }

      // ไม่ผ่านกฏ
      else {
          setTimeout(() => {
            this.rider[code].sum = 0;
          }, 100);

          if (showAlert)
            //this.alertCtrl.warning(message);
            this.alert(message);
          else
            this.maxAlert = message + '<br />';
      }
    }
    // กรณีเป็น 0
    else {
      this.rider[code].premium = '000000000';
      if (showAlert)
        this.broadcastRider();
    }
  }
  

  /**
   * แปลงอายุเป็นข้อความ
   * @param age 
   */
  private convertAgeToMessage(age: string): string {
    let message: string = '';

    let day: number = 0;
    let month: number = 0;
    let year: number = 0;

    if (age.search('d') > -1) {
      day = Number(age.substring(0, age.search('d')));
      age = age.slice(age.search('d') + 1, age.length);
      message += day + ' วัน';
    }
    if (age.search('m') > -1) {
      month = Number(age.substring(0, age.search('m')));
      age = age.slice(age.search('m') + 1, age.length);
      if (message != '')
        message += ' ';
      message += month + ' เดือน';
    }
    if (age.search('y') > -1) {
      year = Number(age.substring(0, age.search('y')));
      age = age.slice(age.search('y') + 1, age.length);
      if (message != '')
        message += ' ';

      if (year == 0) {
        if (this.choosePlan in this.planMinAge)
          message += this.convertAgeToMessage(this.planMinAge[this.choosePlan]);
        else
          message += this.convertAgeToMessage('1m');
      }
      else
        message += year + ' ปี ';
    }

    return message;
  }

  /**
   * ตรวจสอบอายุอยู่ในช่วงหรือไม่
   * @param minAge อายุน้อยสุด
   * @param maxAge อายุมากสุด
   */
  private checkAge(minAge: string = null, maxAge: string = null): boolean {

    // min age
    let minDay: number = 0;
    let minMonth: number = 0;
    let minYear: number = 0;
    let minAgo: moment.Moment;

    if (minAge != null) {
      if (minAge.search('d') > -1) {
        minDay = Number(minAge.substring(0, minAge.search('d')));
        minAge = minAge.slice(minAge.search('d') + 1, minAge.length);
      }
      if (minAge.search('m') > -1) {
        minMonth = Number(minAge.substring(0, minAge.search('m')));
        minAge = minAge.slice(minAge.search('m') + 1, minAge.length);
      }
      if (minAge.search('y') > -1) {
        minYear = Number(minAge.substring(0, minAge.search('y')));
        minAge = minAge.slice(minAge.search('y') + 1, minAge.length);
      }
      minAgo = moment().subtract(minYear, 'year');
      minAgo = moment(minAgo).subtract(minMonth, 'month');
      minAgo = moment(minAgo).subtract(minDay, 'days');
    }

    // max age
    let maxDay: number = 0;
    let maxMonth: number = 0;
    let maxYear: number = 0;
    let maxAgo: moment.Moment;

    if (maxAge != null) {
      if (maxAge.search('d') > -1) {
        maxDay = Number(maxAge.substring(0, maxAge.search('d')));
        maxAge = maxAge.slice(maxAge.search('d') + 1, maxAge.length);
      }
      if (maxAge.search('m') > -1) {
        maxMonth = Number(maxAge.substring(0, maxAge.search('m')));
        maxAge = maxAge.slice(maxAge.search('m') + 1, maxAge.length);
      }
      if (maxAge.search('y') > -1) {
        maxYear = Number(maxAge.substring(0, maxAge.search('y')));
        maxAge = maxAge.slice(maxAge.search('y') + 1, maxAge.length);
      }
      maxAgo = moment().subtract(maxYear, 'year');
      maxAgo = moment(maxAgo).subtract(maxMonth, 'month');
      maxAgo = moment(maxAgo).subtract(maxDay, 'days');
    }

    // อายุน้อยกว่า
    if (minAge != null && Number(this.prospect.age) < minYear || Number(this.prospect.age) == 0)
     {
      // อายุอยู่ในช่วงหรือไม่
      return moment(minAgo).diff(this.birthDate) > 0;
    }
    // อายุมากกว่า
    else if (maxAge != null && Number(this.prospect.age) > maxYear) {
      // อายุอยู่ในช่วงหรือไม่
      return moment(maxAgo).diff(this.birthDate) < 0;
    }
    // อายุอยู่ในช่วง
    else
      return true;
  }

  private hasRider: boolean = false;
  /**
   * ตรวจสอบสัญญาเพิ่มเติมที่ซื้อได้
   */
  private callPlanRider() {
    if (this.choosePlan != null) {

      if(this.soldier != ""){
        // ล้างค่าสัญญาเพิ่มเติมแฝง
        this.riderHiddenCode.forEach(code => {
          this.rider[code].sum = 0;
          this.rider[code].premium = '000000000';
        });
        let checkTakaful: boolean = false;
        let hiddenrider: boolean = false;
        let normalrider: boolean = true;
        this.hasRider = normalrider;
        let res  = {};
        res['data'] = [{
          "plancode": "EN36",
          "ridercode": "AC01",
          "ridertype": "อ01",
          "ridername": "อ01",
          "fullname": "อุบัติเหตุการเสียชีวิต และสูญเสียอวัยวะ",
          "minage": "0",
          "maxage": "64",
          "minsum": "0.0",
          "maxsum": "100000",
          "riderminsum": "",
          "ridermaxsum": "",
          "riderstep": "",
          "status": "",
          "gender": "",
          "sum": "",
          "age": "",
          "issuedate": "2000-04-01 00:00:00",
          "hiddenrider": false
      },
      {
          "plancode": "EN36",
          "ridercode": "AC02",
          "ridertype": "อ02",
          "ridername": "อ02",
          "fullname": "อุบัติเหตุการเสียชีวิต และสูญเสียอวัยวะ และทุพพลภาพ",
          "minage": "5",
          "maxage": "64",
          "minsum": "0.0",
          "maxsum": "3000000.0",
          "riderminsum": "",
          "ridermaxsum": "",
          "riderstep": "",
          "status": "",
          "gender": "",
          "sum": "",
          "age": "",
          "issuedate": "2000-04-01 00:00:00",
          "hiddenrider": false
      },
      {
          "plancode": "EN36",
          "ridercode": "AC03",
          "ridertype": "อ03",
          "ridername": "อ03",
          "fullname": "ค่ารักษาพยาบาลเนื่องจากอุบัติเหตุ",
          "minage": "5",
          "maxage": "64",
          "minsum": "0.0",
          "maxsum": "9.99999999E8",
          "riderminsum": "",
          "ridermaxsum": "",
          "riderstep": "",
          "status": "",
          "gender": "",
          "sum": "",
          "age": "",
          "issuedate": "2016-07-01 00:00:00",
          "hiddenrider": false
      },
      {
          "plancode": "EN36",
          "ridercode": "RP",
          "ridertype": "รพ",
          "ridername": "รพ",
          "fullname": "ค่ารักษาพยาบาลรายวัน (รพ.) เบี้ยปรับตามอายุ      วันละ",
          "minage": "0",
          "maxage": "65",
          "minsum": "0.0",
          "maxsum": "4000.0",
          "riderminsum": "",
          "ridermaxsum": "",
          "riderstep": "100000",
          "status": "",
          "gender": "",
          "sum": "",
          "age": "",
          "issuedate": "1977-01-01 00:00:00",
          "hiddenrider": false
      },
      {
          "plancode": "EN36",
          "ridercode": "H",
          "ridertype": "H10",
          "ridername": "สพ.80",
          "fullname": "การประกันสุขภาพ 80 (สพ.2) เบี้ยประกันปรับตามอายุ",
          "minage": "0",
          "maxage": "80",
          "minsum": "0.0",
          "maxsum": "9.99999999E8",
          "riderminsum": "",
          "ridermaxsum": "",
          "riderstep": "",
          "status": "",
          "gender": "",
          "sum": "",
          "age": "",
          "issuedate": "2015-06-01 00:00:00",
          "hiddenrider": false
      },
      {
          "plancode": "EN36",
          "ridercode": "TP",
          "ridertype": "ทพ",
          "ridername": "ทพ",
          "fullname": "[ทพ.]ทุพพลภาพถาวรสิ้นเชิง",
          "minage": "0",
          "maxage": "60",
          "minsum": "0.0",
          "maxsum": "9.99999999E8",
          "riderminsum": "",
          "ridermaxsum": "",
          "riderstep": "",
          "status": "",
          "gender": "",
          "sum": "",
          "age": "",
          "issuedate": "2001-01-01 00:00:00",
          "hiddenrider": false
      }
  ];
        //alert(JSON.stringify(res['data']));
        res['data'].forEach(item => {
          // มีสัญญาเพิ่มเติมแฝง
          if (item.hiddenrider) {
            hiddenrider = true;
            this.rider[item.ridercode.toUpperCase()].sum = 1;
          }
          // มีสัญญาเพิ่มเติมปกติ
          else
            normalrider = true;
        });

        this.hasRider = normalrider;
        
        // ไม่มีสัญญาเพิ่มเติมใดๆ
        if (!normalrider && !hiddenrider) {
          this.riderCode.forEach(code => {
            this.config[code].active = false;

            this.rider[code].sum = 0;
            this.rider[code].premium = '000000000';

            if (code == this.conf.rider('KB2')) {
              this.changeBuyKB2(false);
            }
          });
        }
        else {
          this.riderCode.forEach(code => {
            let check: boolean = false;
          
            for (let i = 0; i < res['data'].length; i ++) {
              // สามารถซื้อสัญญาเพิ่มเติมนี้ได้
              if (res['data'][i].ridercode.toUpperCase() == code) {
                check = true;
                i = res['data'].length;

                // ตะกาฟุล
                if (code.substring(0, 1) == 'T') {
                  checkTakaful = true;
                }
              }
            }

            this.config[code].active = check;

            // default
            if (check) {
              if (code == this.conf.rider('KB2') && !this.config[this.conf.rider('KB2_1')].disabled) {
                this.changeBuyKB2(false);
              }
            }
            else {
              this.rider[code].sum = 0;
              this.rider[code].premium = '000000000';

              if (code == this.conf.rider('KB2') && this.config[this.conf.rider('KB2_1')].disabled) {
                this.changeBuyKB2(false);
              }
            }
          });

          // แบบประกันสามารถซื้อสัญญาเพิ่มเติมตะกาฟุล
          this.takafulRider = checkTakaful;
        }

        this.broadcastRider();


      }else{
          let planRiderM: PlanRiderModel = new PlanRiderModel();
          planRiderM.plancode = this.choosePlan;

          let planRiderMs: Array<PlanRiderModel> = [];
          planRiderMs.push(planRiderM);

          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.PLAN_RIDER;
          reqM.serviceName = ServiceName.SELECT;
          reqM.param = planRiderMs;

          // ล้างค่าสัญญาเพิ่มเติมแฝง
          this.riderHiddenCode.forEach(code => {
            this.rider[code].sum = 0;
            this.rider[code].premium = '000000000';
          });

          this.apiProvider.callData(reqM).then(
            (res) => {
              //console.log(JSON.stringify(res['data']));
              let checkTakaful: boolean = false;
              let hiddenrider: boolean = false;
              let normalrider: boolean = false;
              //alert(JSON.stringify(res['data']));
              let obj : any = res['data'];
              //console.log(obj);
              res['data'].forEach(item => {
                // มีสัญญาเพิ่มเติมแฝง
                if (item.hiddenrider) {
                  hiddenrider = true;
                  this.rider[item.ridercode.toUpperCase()].sum = 1;
                }
                // มีสัญญาเพิ่มเติมปกติ
                else
                  normalrider = true;
              });

              this.hasRider = normalrider;
              
              // ไม่มีสัญญาเพิ่มเติมใดๆ
              if (!normalrider && !hiddenrider) {
                this.riderCode.forEach(code => {
                  this.config[code].active = false;

                  this.rider[code].sum = 0;
                  this.rider[code].premium = '000000000';

                  if (code == this.conf.rider('KB2')) {
                    this.changeBuyKB2(false);
                  }
                });
              }
              else {
                this.riderCode.forEach(code => {
                  let check: boolean = false;
                
                  for (let i = 0; i < res['data'].length; i ++) {
                    // สามารถซื้อสัญญาเพิ่มเติมนี้ได้
                    if (res['data'][i].ridercode.toUpperCase() == code) {
                      check = true;
                      i = res['data'].length;

                      // ตะกาฟุล
                      if (code.substring(0, 1) == 'T') {
                        checkTakaful = true;
                      }
                    }
                  }

                  this.config[code].active = check;

                  // default
                  if (check) {
                    if (code == this.conf.rider('KB2') && !this.config[this.conf.rider('KB2_1')].disabled) {
                      this.changeBuyKB2(false);
                    }
                  }
                  else {
                    this.rider[code].sum = 0;
                    this.rider[code].premium = '000000000';

                    if (code == this.conf.rider('KB2') && this.config[this.conf.rider('KB2_1')].disabled) {
                      this.changeBuyKB2(false);
                    }
                  }
                });

                // แบบประกันสามารถซื้อสัญญาเพิ่มเติมตะกาฟุล
                this.takafulRider = checkTakaful;
              }

              this.broadcastRider();
            },
            (err) => {
              this.alertCtrl.error(err);
            }
          );
        }
      }
      
      
  }

  /**
   * แสดงอาชีพสำหรับ อ.1, อ.2 เฉพาะอายุ 16y ขึ้นไป
   */
  private openOccupation: boolean = false;
  private fn_open_occupation(code: string = ''): void
  {
    setTimeout(() => {
      if (!this.openOccupation && (code == '' || code != '' && this.occ == '' && Number(this.prospect.age) > 15)) {
        this.openOccupation = true;
        let data: object = {
          occ: this.occ,
          occGroup: this.occGroup
        }
        let modal: Modal = this.modalCtrl.create(PopupOccupationComponent, data);
        modal.present();
  
        modal.onDidDismiss(data => {
          this.openOccupation = false;
          console.log(JSON.stringify(data));
          if (data != null) {
            this.occ = data.occ;
            this.occGroup = data.occGroup;
            this.changeOccGroup();
            this.rider['occupation'] = data;
            this.broadcastRider();
          }
          else if (code != '') {
            this.rider[code].sum = 0;
            this.rider[code].premium = '000000000';
            
            this.validateMax();
            this.validateMin();
            this.broadcastRider();
          }
        });
      }
    }, 200); 
  }

  /**
   * ซื้อ คบ.
   */
  private buyKB2: boolean = false;
  private changeBuyKB2(check?: boolean) {
    if (typeof check != 'undefined')
      this.buyKB2 = check;

    // ซื้อ คบ.
    if (this.buyKB2) {
      this.rider[this.conf.rider('KB2')] = {
        sum: 0,
        premium: '000000000',
        birth: moment().subtract(35, 'year').format('YYYY-MM-DD'),
        age: 35,
        sex: 'F'
      };
    }
    else {
      this.rider[this.conf.rider('KB2')] = {
        sum: 0,
        premium: '000000000',
        birth: '0000-00-00',
        age: NaN,
        sex: ''
      };
    }
  }

  /**
   * เงื่อนไขพิเศษของแต่ละ rider
   */
  private specialConditions(code): boolean {
    
    if (typeof this.tlplan != 'undefined') {
      // 1. คำนวณหาระยะเวลาเอาประกันภัย
      let num1: number = Number(this.tlplan.pEndowmentYear);
      if (this.tlplan.endowmentType != '0')
        num1 -= Number(this.prospect.age);
      
      // 2. คำนวณหาระยะเวลาชำระเบี้ย
      let num2: number = Number(this.tlplan.pPayYear);
      if (this.tlplan.payType != '0')
        num2 -= Number(this.prospect.age);
        
      switch (code) {
        // ทร., ทร.44
        case this.conf.rider('D01'): case this.conf.rider('D02'):
          // 3. คำนวณหาระยะของอายุ 75
          let num3: number = 75 - Number(this.prospect.age);
          // 4. ค่าคงที่
          let num4: number = 19;

          // ใช้ค่าต่ำสุด
          let num: Number = Math.min(num1, num2, num3, num4);
          return num > 9 && num < 20;

        // ฉพ.
        // case 'JP':
        // return num1 > 9 && num2 > 9;
          
        default:
          return true;
      }
    }
    else
      return true;
  }

  //แบบ fiexd
  // filterD = (rider, riderType: string) => rider.filter( item => item.ridertype == riderType);
  //แบบ dynamic
  filterTR = (rider, ...riderTR) => rider.filter( item => riderTR.includes(item.ridertype));
  /**
   * ประกาศค่าสัญญาเพิ่มเติม
   */
  private flagRiderDraf: Boolean = true;
  private broadcastRider(): void {
    
    
    
    // console.log("riderDraf 2-> ",filterD(this.quotationData.riderDraf, this.conf.rider('D02')));
    // console.log("riderDraf 3-> ",filterD(this.quotationData.riderDraf, this.conf.rider('D03')));
    setTimeout(() => {
      // if(_.isEqual(this.rider,this.oldRider)) return;
      // alert(typeof this.quotationData.riderDraf);
      if(typeof this.quotationData.riderDraf != 'undefined') {

        if(this.flagRiderDraf) {
          //แบบ fiexd
          // let riderd1 = this.filterD(this.quotationData.riderDraf, this.conf.rider('D01'));
          // let riderd2 = this.filterD(this.quotationData.riderDraf, this.conf.rider('D02'));
          // let riderd3 = this.filterD(this.quotationData.riderDraf, this.conf.rider('D03'));
          // if(riderd1[0]) {
          //   this.dType = riderd1[0].ridertype;
          // }
          // if(riderd2[0]) {
          //   this.dType = riderd2[0].ridertype;
          // }
          // if(riderd3[0]) {
          //   this.dType = riderd3[0].ridertype;
          // }
          // console.log("riderDraf 1-> ",riderd1[0]);
          // console.log("riderDraf 2-> ",riderd2[0]);
          // console.log("riderDraf 3-> ",riderd3[0]);
          //แบบ dynamic
          let riderDD = this.filterTR(_.cloneDeep(this.quotationData.riderDraf), this.conf.rider('D01'),this.conf.rider('D02'),this.conf.rider('D03'));
          // console.log(riderDD);
          // debugger;
          if(typeof riderDD == 'object' && !_.isEmpty(riderDD)) {
            this.dType = riderDD[0].ridertype;
          }
          
          let loading = this.loadingCtrl.scopePresent();
          this.flagRiderDraf = false;
            setTimeout(()=> {
              for (let index = 0; index < this.quotationData.riderDraf.length; index++) {
                this.rider[this.quotationData.riderDraf[index].ridertype].sum = this.quotationData.riderDraf[index].sum;
                this.rider[this.quotationData.riderDraf[index].ridertype].premium = this.quotationData.riderDraf[index].premium;
    
                if (this.quotationData.riderDraf[index].ridertype == this.conf.rider('KB2')) {
                  
                  this.buyKB2 = true; 
                  setTimeout(() => {
                    //debugger;
                    this.rider[this.conf.rider('KB2')]['premium'] = this.quotationData.riderDraf[index].premium;
                    this.rider[this.conf.rider('KB2')]['age'] = this.quotationData.riderDraf[index].age;
                    this.rider[this.conf.rider('KB2')]['sex'] = this.quotationData.riderDraf[index].sex;
                    this.rider[this.conf.rider('KB2')]['birth'] = this.quotationData.riderDraf[index].birth;
                  }, 2800);
                }
    
                this.rider['show'] = true;
              }
              console.log('riderDraf +> ',this.quotationData.riderDraf);
              if(typeof(this.quotationData.riderDraf['occupation']) !== 'undefined' ){
                this.occGroup = this.quotationData.riderDraf.occupation.occGroup;
                this.occ = this.quotationData.riderDraf.occupation.occ;
                
                _.assign(this.rider,{occupation:{"occ":this.occ,"occGroup":this.occGroup}});
                // debugger;
              }
            },100);
            
          setTimeout(() => {
            this.loadingCtrl.scopeDismiss(loading);
            this.quotationData.riderDraf = undefined;
            // debugger;
            let premium: number = 0;
            for (let item in this.rider) {
              premium += Number(this.rider[item].premium);
            }
            this.riderChange.emit(this.rider);
            this.premium.emit(premium);
          }, 3000);
        }
      } else {
        let premium: number = 0;
        for (let item in this.rider) {
          if (typeof this.rider[item].premium != 'undefined')
            premium += Number(this.rider[item].premium);
        }
        this.riderChange.emit(this.rider);
        this.premium.emit(premium);
      }
    }, 200);
  }

  /**
   * แสดงข้อความชนกัน
   */
  private conflictAlert: boolean = false;
  /**
   * แสดงข้อความแจ้งเตือน
   */
  private alert(message: string): void {
    if (!this.conflictAlert) {
      this.conflictAlert = true;
      this.alertCtrl.warning(message);
      setTimeout(() => { 
        this.conflictAlert = false;
      }, 200);
    }
  }

  /**
   * ดึงค่า Config
   */
  private getConfig(code: string): any {

    let config: any = this.config[code];

    // กรณีมี config ที่ขึ้นกับ แบบประกัน
    this.riderCodeForPlan.forEach(c => {
      let cArray: Array<string> = c.split('.');
      if (cArray.length > 1 && cArray[0] == code && cArray[1] == this.choosePlan) {
        config = this.config[c];
      }
    });

    return config;
  }
}