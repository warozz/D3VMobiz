import { Component, NgModule, Input } from '@angular/core';
import { TlPlanProvider } from '../../../providers/tlplan/tlplan';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuatationPlanInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quatation-plan-info',
  templateUrl: 'quatation-plan-info.html'
})
export class QuatationPlanInfoComponent {

  @Input('data') data;
  @Input('calculate') calculate;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tlplanProvider: TlPlanProvider) {
    //console.log('Hello QuatationPlanInfoComponent Component');
  }

  ngOnInit() {
    //console.log("config=", this.data);
  }

}
