import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CalculateAgeDirective } from '../../../directives/utility/calculate-age/calculate-age';
import * as moment from 'moment';

/**
 * Generated class for the CalendarAgeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarAgeComponent),
  multi: true
};

@Component({
  selector: 'calendar-age',
  templateUrl: 'calendar-age.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CalendarAgeComponent implements ControlValueAccessor {

  /**
   * ค่า
   */
  private _value: string = '';

  /**
   * วันที่มากสุด
   */
  private maxDate = moment().format('YYYY-MM-DD');

  /**
   * วันที่น้อยสุด
   */
  private minDate = moment().subtract(99, 'years').format('YYYY-MM-DD');

 

  /**
   * ค่า maxAge <=  อายุ prospect เช็คอายุบุตรไม่ควรมากกว่าอายุผู้ปกครอง
   * 
   * @param maxAge
   */
  private maxAge:number = 99;
  @Input("maxAge") set setMaxAge(maxAge:string){
      this.maxAge = Number(maxAge);
  }

  /**
   * ค่า minDate <=  วันเกิดของ prospect รับมาเพื่อเช็คให้อายุเริ่มต้นของบุตรใส่ได้ไม่เกินวันเกิดของผู้ปกครอง
   * 
   * @param minDate
   */

  @Input("minDate") set setMinDate(minDate:string){
    this.minDate = minDate;
  }

  constructor(private calculateAge: CalculateAgeDirective) {
    
  }

  // อ่านค่า
  get value(): string {
    return this._value;
  };

  // เก็บค่า
  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  // เขียนค่าลง input
  public writeValue(value: string) {
    this._value = value;
    this.onChange(value);
  }


  private onChange = (_) => {};
  private onTouched = () => {};
  public registerOnChange(fn: (_: string) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  /**
   * คำนวณอายุ
   * @param birthDate 
   */
  private calAge(birthDate: string): void {
    let valCal = this.calculateAge.calculateAge(new Date(birthDate.substring(0, 10)));
    this.value = String(valCal);
  }
}
