import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

/**
 * Generated class for the DropdownOptionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dropdown-option',
  templateUrl: 'dropdown-option.html'
})
export class DropdownOptionComponent implements AfterViewInit {

  /**
   * รายการโปรด
   */
  public favorite: boolean;
  @Input('data-favorite') set mark(mark: string) {
    if(mark == "T") {
      this.favorite = true;
    } else {
      this.favorite = false;
    }
  }
  
  /**
   * ค่า
   */
  @Input('value') public value: string;

  /**
   * เลือก
   */
  @Input('selected') public selected: boolean = false;

  /**
   * ข้อความ
   */
  public text: string;
  constructor(private el: ElementRef) {
  }

  public ngAfterViewInit(): void {
    let element: Element = this.el.nativeElement;
    this.text = element.textContent;
    
  }
}
