import { Component, Input, Output, HostBinding, ContentChildren, QueryList, EventEmitter, AfterViewInit, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { DropdownOptionComponent } from './dropdown-option/dropdown-option';
import { ElementSchemaRegistry } from '@angular/compiler';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


/**
 * Generated class for the DropdownComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.html',
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})
export class DropdownComponent {

  
  /**
   * class boxSearchPlanInsurance
   */
  @HostBinding('class.boxSearchPlanInsurance') private classBoxSearchPlanInsurance: boolean = true;
  
  /**
   * ไอคอน
   */
  @Input('icon') private icon: string = '';
  /**
   * ชื่อเรื่อง
   */
  @Input('label') private label: string = '';
  /**
   * คำแนะนำ
   */
  @Input('placeholder') private placeholder: string = '';

  /**
   * แสดงรายการโปรด
   */
  @Input('favorite') set favorite(favorite: string) {
    this.showFavorite = true;
  }

  /**
   * ซ่อน แสดง รายการ dropdown
   */
  private showListOption: boolean = false;

  /**
   * ข้อความ
   */
  public text: string = '';

  /**
   * เปิด/ปิด
   */
  private _disabled: boolean = false;

  /**
   * component dropdown-option
   */
  private optionArray: Array<DropdownOptionComponent>;
  private option: QueryList<DropdownOptionComponent>;
  @ContentChildren(DropdownOptionComponent) set component(option: QueryList<DropdownOptionComponent>) {
    setTimeout(() => {
      this.option = option;
      this.optionArray = this.option.toArray();

      if (this.optionArray.length > 0)
      {
        let found: boolean = false;
        this.optionArray.forEach(element => {
          if (this.data == element.value || element.selected)
          { 
            found = true
            this.text = element.text;
            return;
          }
        });

        if (!found)
        {
          this.data = '';
          this.text = '';
        }
      }
    }, 100);
  }

  /**
   * ข้อความ
   */
  private data: string;
  @Input('data') set setData(data: string) {
    this.data = data;

    if (typeof this.optionArray != 'undefined' && this.optionArray.length > 0 && this.data != '')
    {
      let found: boolean = false;
      this.optionArray.forEach(element => {
        if (this.data == element.value)
        {
          found = true
          this.text = element.text;
          return;
        }
      });

      if (!found) {
        this.text = '';
      }
    }
    else {
      this.text = '';
    }
  }
  @Output() private dataChange: EventEmitter<string>;
 
  constructor() {
    this.dataChange = new EventEmitter();
  }

  /**
   * ซ่อน / แสดง รายการโปรด
   */
  @HostBinding('class.favorite') public showFavorite: boolean = false;

  /**
   * เลือกข้อความ
   */
  private select(text: string, value: string): void {
    this.text = text;
    this.dataChange.emit(value);
    this.value = value;
  }

  /**
   * ทำเครื่องหมายรายการโปรด
   */
  private mark(favorite: boolean): void {
    
  }

  private popup(): void {
    console.log('popup');
  }

   // อ่านค่า
   get value(): string { 
    return this.data; 
  };

  // เก็บค่า
  set value(v: string) {
    if (v !== this.data) {
      this.data = v;
      this.onChange(v);
    }
  }

  // เขียนค่าลง input
  public writeValue(value: string) {
    this.data = value;
    this.onChange(value);

    if (typeof this.optionArray != 'undefined' && this.optionArray.length > 0) {
      let found: boolean = false;
      this.optionArray.forEach(element => {
        if (this.data == element.value || element.selected)
        { 
          found = true
          this.text = element.text;
          return;
        }
      });

      if (!found)
      {
        this.data = '';
        this.text = '';
      }
    }
  }

  private onChange = (_) => {};
  private onTouched = () => {};
  public registerOnChange(fn: (_: string) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
