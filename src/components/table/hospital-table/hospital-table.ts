import { Component,Input } from '@angular/core';

/**
 * Generated class for the HospitalTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hospital-table',
  templateUrl: 'hospital-table.html'
})
export class HospitalTableComponent {
@Input() private data: Array<object>;

  constructor() {
    
  }

}
