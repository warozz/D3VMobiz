import { DateFormat2Pipe } from './../../../pipes/date-format/date-format';
import { PopupCalendarComponent } from './../../../components/utility/popup-calendar/popup-calendar';
import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Modal, ModalController } from 'ionic-angular';
import { DateFormatProvider } from '../../../providers/date-format/date-format';

/**
 * Generated class for the CalendarDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */

// creates an ngModel accessor to be used in components prov
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarDirective),
  multi: true
};

@Directive({
  selector: '[calendar]', // Attribute selector
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})
export class CalendarDirective implements ControlValueAccessor {

  /**
   * ค่า
   */
  private _value: string;

  constructor(private elementRef: ElementRef, private modalCtrl: ModalController, private dateFormat: DateFormatProvider) {

    const element: Element = this.elementRef.nativeElement;
    element.setAttribute('readonly', 'readonly');
  }

  @HostListener('click', ['$event']) private onclick(event): void {

    let modal: Modal = this.modalCtrl.create(PopupCalendarComponent, { date: this._value }, {cssClass: 'calendar'});
    modal.present();

    modal.onDidDismiss(data => {
      if (data != null) {
        this.value = data;
      }
    });
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

      let element: Element = this.elementRef.nativeElement;
      element.setAttribute('value', this.dateFormat.dateFormatShotTh1(this._value, 'S'));
    }
  }

  // เขียนค่าลง input
  public writeValue(value: string) {
    this._value = value;

    let element: Element = this.elementRef.nativeElement;
    element.setAttribute('value', this.dateFormat.dateFormatShotTh1(this._value, 'S'));
  }

  /**
   * เปิด/ปิด
   * @param disabled
   */
  public setDisabledState(disabled: boolean): void {
    const element: Element = this.elementRef.nativeElement;
    if (disabled) {
      element.removeAttribute('readonly');
      element.setAttribute('disabled', 'disabled');
    }
    else {
      element.removeAttribute('disabled');
      element.setAttribute('readonly', 'readonly');
    }
  }

  private onChange = (_) => {};
  private onTouched = () => {};
  public registerOnChange(fn: (_: string) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
