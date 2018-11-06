import { TLPlanService } from './../../providers/tlplan/tlplan-service';
import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Broadcaster } from './../../providers/utility/broadcaster';
import { Subscription } from 'rxjs/Rx';

/**
 * Generated class for the PlanLabelPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'planLabel',
  pure: false
})
export class PlanLabelPipe implements PipeTransform, OnDestroy {

  /**
   * แบบประกันทั่วไป
   */
  private normal: Object = {
    'PLAN': 'แบบประกัน',
    'MAIN_PREMIUM': 'เบี้ยประกันภัยหลัก',
    'RIDER_PREMIUM': 'เบี้ยสัญญาเพิ่มเติมรวม',
    'TOTAL_PREMIUM': 'เบี้ยประกันรวม',
    'SUM': 'ทุนประกัน',
    'SUM2': 'จำนวนเงินเอาประกันภัย',
    'PREMIUM': 'เบี้ยประกัน',
    'PREMIUM2': 'เบี้ยประกันภัย',
    'PREMIUM3': 'เบี้ยประกันภัย',
    'PAYMENT' : 'ชำระเบี้ยประกันภัย',
    'ENDOWMENT': 'ระยะเวลาเอาประกันภัย',
    'INSURANCE': 'กรมธรรม์',
    'PLANSUM': 'การประกันชีวิต',
    'PLANPREMIUM': 'เบี้ยประกันรวม'
  };

  /**
   * แบบประกันตะกาฟุล
   */
  private takaful: Object = {
    'PLAN': 'สัญญา',
    'MAIN_PREMIUM': 'เงินสมทบหลัก',
    'RIDER_PREMIUM': 'เงินสมทบสัญญาเพิ่มเติมรวม',
    'TOTAL_PREMIUM': 'เงินสมทบรวม',
    'SUM': 'จำนวนเงินหลักประกันตะกาฟุล',
    'SUM2': 'จำนวนเงินหลักประกันตะกาฟุล',
    'PREMIUM': 'เงินสมทบ',
    'PREMIUM2': 'เงินสมทบตะกาฟุล',
    'PREMIUM3': 'เงินสมทบ',
    'PAYMENT' : 'ชำระเงินสมทบตะกาฟุล',
    'ENDOWMENT': 'ระยะเวลาของสัญญาตะกาฟุล',
    'INSURANCE': 'สัญญาตะกาฟุล',
    'PLANSUM': 'จำนวนหลักประกันตะกาฟุล',
    'PLANPREMIUM': 'เงินสมทบรวม'
  };

  /**
   * ประเภทแบบประกัน
   * true: normal
   * false: takaful
   */
  private type: boolean = true;

  private subscription: Subscription;

  constructor(private broadcaster: Broadcaster, private plan: TLPlanService) {
    this.type = this.plan.getPlanType();
     // แบบประกันที่เลือก
    this.subscription = this.broadcaster.on('planSelected').subscribe(res => {
      this.type = res[0].planName2.search('ตะกาฟุล') == -1;
      this.plan.setPlanType(this.type);
    });
  }

  /**
   * Takes a value and makes it lowercase.
   */
  public transform(value: string) {
    if (this.type)
      return this.normal[value.toUpperCase()];
    else
      return this.takaful[value.toUpperCase()];
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
    this.plan.setPlanType(true);
  }
}
