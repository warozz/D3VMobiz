import {Component, Input} from '@angular/core';
import {TlPlanProvider} from "../../../providers/tlplan/tlplan";

/**
 * Generated class for the QuatationPlanSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quatation-plan-summary',
  templateUrl: 'quatation-plan-summary.html'
})
export class QuatationPlanSummaryComponent {

  @Input('data') data;
  @Input('calculate') calculate:any;

  constructor(
    private tlplanService:TlPlanProvider
  ) {}

  ngOnInit() {
    //console.log("config=", this.data);
    //console.log("Quatation plan summary.");
  }
}
