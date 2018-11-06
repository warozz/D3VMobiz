import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { UniversalLifeDataProvider } from '../../../providers/universal-life-data/universal-life-data';
import { Subscription } from 'rxjs';
import { Broadcaster } from '../../../providers/utility/broadcaster';

@Component({
  selector: 'u-life-saleoffer-10-1',
  templateUrl: 'u-life-saleoffer-10-1.html'
})
export class ULifeSaleoffer_10_1Component implements OnDestroy{
  private subscription: Array<Subscription> = [];
  private amount:any = 0;//ทุนประกัน
  private minUlPlanOne: number = 50000;
  private maxUlPlanOne: number = 999990000;
  private baseIncrementer:number = 0;
  private minAlertOne: string = "เบี้ยประกันหลักขั้นต่ำ "+this.decimalPipe.transform(this.minUlPlanOne)+" บาท";
  private maxAlertOne: string = "เบี้ยประกันหลักสูงสุดไม่เกิน "+this.decimalPipe.transform(this.maxUlPlanOne)+" บาท";
  private resetDataFlag: boolean = false;

  @Output("total") private totalChange: EventEmitter<number>; //เบี้ยประกันภัยรวม

  constructor(
    private decimalPipe: DecimalPipe,
    private broadcaster: Broadcaster,
    private universalLifeData: UniversalLifeDataProvider
  ) {
    this.totalChange = new EventEmitter<number>();

    // set ชำระครั้งเดียว
    //this.universalLifeData.paymentType = 9;
    this.broadcaster.broadcast('payType', 9);//ทุนประกัน

    this.subscription.push(
      this.broadcaster.on('resetDataFlag').subscribe(res => {
        this.resetDataFlag = res;
        if(this.resetDataFlag){
          this.resetData();
        }
      })
    );

    if(this.universalLifeData.editData && (this.universalLifeData.resetDataUl == false)){
      this.setEditData();
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }
                                      
  private getSum(val) {
      if( val ===  this.minUlPlanOne ) {
        this.amount =  this.minUlPlanOne*1.3;//ค่าเริ่มต้น
        this.baseIncrementer =  this.minUlPlanOne;
      } else if(val > this.minUlPlanOne) {
        this.amount = val*1.3;//ค่าจ.เงินเอาประกันของ 10/1
      } else if(val == this.maxUlPlanOne){
        //setTimeout(() => {
          this.baseIncrementer = this.maxUlPlanOne;  
        //}, 20);
      } else if(val < this.minUlPlanOne){
        this.amount = 0;//ค่าเริ่มต้น
        setTimeout(() => {
         this.baseIncrementer = this.minUlPlanOne;  
        }, 20);
      } 

      // set ทุนประกัน และ เบี้ยประกัน
      this.universalLifeData.insurance = this.amount;
      this.universalLifeData.mainInsurance = val;

      this.totalChange.emit(val);//ส่งค่า เบี้ยประกันรวม เท่ากับเบี้ยประกันภัยหลัก
  }

  private resetData() {
    this.baseIncrementer = 0;
    this.amount = 0;
    this.universalLifeData.resetDataUl = true;
  }

  private setEditData() {

    if(typeof this.universalLifeData.quotationul != 'undefined') {
      let quotation = this.universalLifeData.quotationul;
      if(quotation['plancode']== 'UZA'){
        this.amount = Number(quotation['lifesum']);
        this.baseIncrementer = Number(quotation['lifepremium']);
        this.universalLifeData.insurance = this.amount;
        this.universalLifeData.mainInsurance = this.baseIncrementer;
        this.totalChange.emit(this.baseIncrementer);
      }
    }
  }
}
