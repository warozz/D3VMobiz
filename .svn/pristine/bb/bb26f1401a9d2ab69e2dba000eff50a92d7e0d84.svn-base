import { Component, QueryList, ContentChildren, Input, Output, EventEmitter } from '@angular/core';
import { CollapseComponent } from './collapse/collapse';

/**
 * Generated class for the CollapseGroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'collapse-group',
  templateUrl: 'collapse-group.html'
})
export class CollapseGroupComponent {

  constructor() {
    this.selectIndexChange = new EventEmitter();
  }

  /**
   * component collapse
   */
  @ContentChildren(CollapseComponent) set component(list: QueryList<CollapseComponent>) {
    this.collapseArray = list.toArray();
    this.total = this.collapseArray.length;
    this.index = 0;
    if (this.total > 0) {
      setTimeout(() => {
        this.tab(this.index);
      }, 100);
    }

    // ตรวจจับการคลิก
    for (let i = 0; i < this.total; i ++) {
      this.collapseArray[i].onClick.subscribe(() => {
        this.tab(i);
      });
    }
  }
  private collapseArray: Array<CollapseComponent>;
  
  /**
   * เลือกแสดงผล
   */
  private index: number = 0;
  @Input('selectIndex') set setIndex(index: number) {
    this.tab(index);
  }
  @Output() private selectIndexChange: EventEmitter<number>;

  /**
   * ชื่อ collapse
   */
  @Input('collapseTitle') private title: string;

  /**
   * จำนวน tab
   */
  private total: number;

  /**
   * tab ที่เลือก
   * @param index 
   */
  private tab(index: number): void {
    if (index > -1) {
      if (typeof this.collapseArray != 'undefined' && this.total > 0) {
        if (!this.collapseArray[index].disabled) {
          // ล้างค่าที่เคยคลิก เลือกค่าที่ตรงกัน
          for (let i = 0; i < this.total; i ++)
            this.collapseArray[i].action = false;

          this.index = index;
          this.collapseArray[index].action = true;
          this.selectIndexChange.emit(index);
        }
      }
      else {
        setTimeout(() => {
          this.tab(index);
          // ระวัง loop infinity กรณี index และ content มาไม่พร้อมกัน 
        }, 100);
      }
    }
    else {
      this.index = -1;
      // ล้างค่าที่เคยคลิก
      for (let i = 0; i < this.total; i ++)
        this.collapseArray[i].action = false;
    }
  }
}