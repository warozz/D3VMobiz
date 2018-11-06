import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Subscriber } from 'rxjs';

/**
 * Generated class for the CollapseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'collapse',
  templateUrl: 'collapse.html'
})
export class CollapseComponent implements OnDestroy {

  /**
   * ชื่อเรื่อง
   */
  @Input('collapseTitle') public title: string;

  /**
   * ชื่อแถบ
   */
  @Input('collapseTab') public tab: string;

  /**
   * ชื่อเรื่องย่อย
   */
  @Input('collapseSubtitle') public subtitle: string;

  /**
   * เปิด / ปิด ปุ่ม
   */
  @Input('disabled') public disabled: boolean = false;

  /**
   * ซ่อน / แสดง เนื้อหา
   */
  public action: boolean = false;

  /**
   * คลิก
   */
  public onClick: Observable<{}>;

  /**
   * ตำแหน่งที่ต้องการ scroll
   */
  @ViewChild('target') target: ElementRef;

  constructor() { 
    this.onClick = new Observable(observer => {
      this.observer = observer;
    });
  }

  /**
   * เลือก tab
   */
  
  private observer: Subscriber<{}>;
  public click(): void {
    if (!this.disabled) {
      this.observer.next();

      if (document.body.clientWidth < 992) {
        setTimeout(() => {
          this.target.nativeElement.scrollIntoView();
        }, 10);
      }
    }
  } 

  public ngOnDestroy(): void {
    this.observer.unsubscribe();
  }
}
