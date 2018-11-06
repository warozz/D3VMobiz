import {Broadcaster} from '../../../providers/utility/broadcaster';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { UniversalLifeDataProvider } from '../../../providers/universal-life-data/universal-life-data';
import { DecimalPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-universal-life-saleoffer',
  templateUrl: 'universal-life-saleoffer.html',
})
export class UniversalLifeSaleofferPage implements OnDestroy{
  private subscription: Array<Subscription> = [];
  private insuranceType: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public broadcaster: Broadcaster,
    private decimalPipe: DecimalPipe,
    private universalLifeData: UniversalLifeDataProvider ) {

      this.subscription.push(
        this.broadcaster.on('universalLifeInsuranceType').subscribe(res => {
          this.insuranceType = res;
        })
      );
  }
  
  ngOnDestroy(){
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  private getInsuranceSum(val){
    this.broadcaster.broadcast('insuranceSum', val);
  }
}
 