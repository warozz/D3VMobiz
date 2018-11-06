import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the OccupationTypeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'occupation-type',
  templateUrl: 'occupation-type.html'
})
export class OccupationTypeComponent {

  /**
   * ชั้นอาชีพ
   */
  type = [
    '1',
    '2'
  ];

  /**
   * ชั้นอาชีพ
   */
  @Input() private data: string = '';
  @Output() private dataChange: EventEmitter<string>;

  constructor() {
    this.dataChange = new EventEmitter();
  }

  private select(): void {
    this.dataChange.emit(this.data);
  }
}
