import { DecimalPipe } from '@angular/common';
import { NavController } from 'ionic-angular';
import { Directive, Input, ElementRef, HostListener, forwardRef, HostBinding, Output, EventEmitter } from '@angular/core';
import { ModalController, Modal } from 'ionic-angular';
import { CalculatorComponent } from '../../../components/utility/calculator/calculator';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertDirective } from '../../extends/alert/alert';

/**
 * Generated class for the AgeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalculatorDirective),
  multi: true
};

@Directive({
  selector: '[calculator]', // Attribute selector
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})
export class CalculatorDirective implements ControlValueAccessor {

  /**
   * ค่า
   */
  private _value: number;

  @HostBinding('attr.mini') private mini: string = null;

  /* เอาไว้ดักข้อมูลเปลี่ยนแปลง เมื่อมีการกด calculator แล้วกดตกลง*/
  @Output() private calculatorChange: EventEmitter<number> = new EventEmitter();

  /**
   * ข้อความแจ้งเตือนค่าต่ำสุด
   */
  private minAlert: string = '';
  @Input('minAlert') set inputMinAlert(minAlert: string) {
    this.minAlert = minAlert;
  }

  /**
   * ข้อความแจ้งเตือนค่าสูงสุด
   */
  private maxAlert: string = '';
  @Input('maxAlert') set inputMaxAlert(maxAlert: string) {
    this.maxAlert = maxAlert;
  }

  /**
   * ค่าสูงสุด
   */
  private max: number = 999999999;
  @Input('max') set setMax(max: number) {
    this.max = max;
    this.value = this.validateMinMax(this._value);

    if (String(this.max).length < 3)
      this.mini = '';
    else
      this.mini = null;
  }

  /**
   * ค่าต่ำสุด
   */
  private min: number = 0;
  @Input('min') set setMin(min: number) {
    this.min = min;
    this.value = this.validateMinMax(this._value);
  }

  public childObj: any;
  public status: boolean;

  constructor(
    private modalCtrl: ModalController,
    private elementRef: ElementRef,
    private navCtrl: NavController,
    private alertCtrl: AlertDirective,
    private decimalPipe: DecimalPipe) {

    const element: Element = this.elementRef.nativeElement;
    element.setAttribute('readonly', 'readonly');
  }

  @HostListener('click', ['$event']) private onclick(event): void {

    let data: object = { number: this.value == undefined || typeof this.value != 'number' ? 0 : this.value , style: String(this.max).length < 3 ? 'mini' : null, digit: String(this.max).length };
    let modal: Modal = this.modalCtrl.create(CalculatorComponent, data, {cssClass: 'calculator'});
    modal.present();

    modal.onDidDismiss(data => {
      if (data != null) {
        this.value = this.validateMinMax(Number(data));
        this.calculatorChange.emit(this.value);
      }
    });
  }

  // อ่านค่า
  get value(): number {
    return this._value;
  };

  // เก็บค่า
  set value(v: number) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);


      let element: Element = this.elementRef.nativeElement;
      element.setAttribute('value',  this.decimalPipe.transform(this._value));
    }
  }

  // เขียนค่าลง input
  public writeValue(value: any) {
    if (typeof value != 'undefined' && value != null && value != '') {
      this._value = Number(value);
      this.onChange(Number(value));

      let element: Element = this.elementRef.nativeElement;
      element.setAttribute('value', this.decimalPipe.transform(this._value));
    }
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

  /**
   * ตรวจสอบค่า min max
   * @param value
   */
  private validateMinMax(value: any): number {

    if (typeof value != 'number')
      return value;

    else if (value > this.max){
      if (this.maxAlert != '')
        this.alertCtrl.warning(this.maxAlert);
      return Number(this.max);
    }
    else if (value < this.min) {
      if (this.minAlert != '')
        this.alertCtrl.warning(this.minAlert);
      return Number(this.min);
    }
    else
      return Number(value);
  }

}
