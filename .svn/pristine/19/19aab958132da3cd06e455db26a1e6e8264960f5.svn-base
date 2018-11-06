import { Component, Input } from '@angular/core';

/**
 * Generated class for the CircleGraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circle-graph',
  templateUrl: 'circle-graph.html'
})
export class CircleGraphComponent {

  /**
   * กลุ่มลูกค้า
   */
  private customer: number = 0;
  private prospect: number = 0;

  private percentCustomer = '50';
  private percentProspect = '50';

  private percent: number = 0;

  @Input('data') set setData(data: any) {
    if (typeof data != 'undefined') {
      this.prospect = data[0];
      this.customer = data[1];

      if (this.prospect > 0 || this.customer > 0) {
        this.percentProspect = (this.prospect / (this.customer + this.prospect) * 100).toFixed(2);
        this.percentCustomer = (this.customer / (this.customer + this.prospect) * 100).toFixed(2);

        // this.percent = Number((cal / 5).toFixed(0)) * 5;

        this.calculate(Number((this.prospect / (this.customer + this.prospect) * 100).toFixed(0)));
      }
    }
  }

  /**
   * คำนวณเปอร์เซนต์
   * @param percent เปอร์เซนต์
   */
  private calculate(percent: number) {
    setTimeout(() => {
      this.percent += 1;
      if (this.percent < percent)
        this.calculate(percent);
    }, 5);
  }

  constructor() {

  }

}
