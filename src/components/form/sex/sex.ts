import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

/**
 * Generated class for the SexComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sex',
  templateUrl: 'sex.html'
})
export class SexComponent {

  /**
   * เพศ
   */
  private sex = [
    {
      'key':'',
      'value':'ทั้งหมด'
    },
    {
      'key':'M',
      'value':'ชาย'
    },
    {
      'key':'F',
      'value':'หญิง'
    }
  ];

  /**
   * เพศ
   */
  @Input() data;
  @Output() private dataChange: EventEmitter<string> = new EventEmitter();;

  /**
   * กรองเพศ
   */
  @Input() private filter: string;

  @Input() private id: string = "";

  constructor() {

  }

  private select($event): void {
    this.dataChange.emit(this.data);
  }

  /* public ngOnChanges(changes: SimpleChanges): void {
    if (this.filter == 'นาย')
      this.data = 'ชาย';
    else if (this.filter == 'นาง' || this.filter == 'นางสาว')
      this.data = 'หญิง';
    else
      this.data = '';
  } */
}
