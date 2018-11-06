import { NgForm } from '@angular/forms';
import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Generated class for the SearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {

  /**
   * ข้อความค้นหา
   */
  @Output() value: EventEmitter<String>
  
  /**
   * ข้อความค้นหา
   */
  @Input('text') text: string = '';
  // private text: string = '';
  /**
   * ฟอร์ม
   */
  private form: any;
  /**
   * สถานะฟอร์ม
   */
  private status: string;
  /**
   * แสดงปุ่มล้างข้อความ
   */
  private showClear: boolean = false;
  
  constructor() {
    this.value = new EventEmitter();
  }

  /**
   * ค้นหา
   * @param event 
   */
  private submit(form: NgForm): void {
    if (form.valid) {
      this.status = 'valid';
      this.value.emit(this.text);
    }
    else
    {
      this.status = 'invalid';
    }
  }

  /**
   * ล้างข้อความค้นหา
   */
  private clear(): void {
    this.text = '';
    this.showClear = false;
  }

  /**
   * พิมพ์ข้อความ
   */
  private typing(): void {
    if (this.text.length == 0)
      this.showClear = false;
    else
      this.showClear = true;
  }
}
