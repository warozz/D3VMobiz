import { Component, Input } from '@angular/core';
import 'chart.piecelabel.js';

@Component({
  selector: 'doughnut-chart',
  templateUrl: 'doughnut-chart.html'
})
export class DoughnutChartComponent {
  public doughnutChartType: string = 'doughnut';

  @Input() public label: string[];

  @Input() public data: number[];

  @Input() public color: any[];

  @Input() public option: any;
  
  constructor() {

  }
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}