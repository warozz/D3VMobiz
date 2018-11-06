import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Generated class for the IncrementerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IncrementerComponent),
  multi: true
};

@Component({
  selector: 'incrementer',
  templateUrl: 'incrementer.html',
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})
export class IncrementerComponent implements AfterViewInit, ControlValueAccessor {

  /**
   * หน่วงเวลาการทำงาน
   */
  private timestamp: number;

  /**
   * ค่า
   */
  private _value: number = 0;
  @Input('value') set inputValue(value: number) {

    if (typeof value != 'undefined' && typeof this.step != 'undefined' && value != 0 && this._value != value && this.round) {
      if (typeof this.step == 'number') {
        this._value = Math.floor(value / this.step) * this.step;
      }
      else {
        // หา step ในแต่ละเงื่อนไข
        if (value >= this.step[0].value) {
          for (let i = this.step.length - 1; i > -1; i --) {
            if (value >= this.step[i].value) {
              this._value = Math.floor(value / this.step[i].step) * this.step[i].step;
              i = -1;
            }
          }
        }
        else {
          this._value = 0;
        }
      }
      // update value ใหม่
      setTimeout(()=> { // add by name
        this.valueChange.emit(this._value);
        this.value = this._value;
      }); // add by name

    }
    else {
      this._value = value;
    }
  }
  @Output() private valueChange: EventEmitter<number>;

  /**
   * ค่าต่ำสุด
   */
  private min: number = 0;
  @Input('min') set inputMin(min: number) {
    this.min = min;
    /*if (this.value < this.min)
      this.alertCtrl.warning(this.minAlert);*/
  }

  /**
   * ค่าสูงสุด
   */
  private max: number = 999999999;
  @Input('max') set inputMax(max: number) {
    this.max = max;
    if (this._value > this.max) {
     
      //this._value = max; //อั๋น
      /**  แก้ปัญหาทุนเกินที่ซื้อได้ แล้วเกิดคำเตือนให้set ค่า  */
      this.value = max;
      this.valueChange.emit(max);
      /**  แก้ปัญหาทุนเกินที่ซื้อได้ แล้วเกิดคำเตือนให้set ค่า  */
      setTimeout(() => {
        this.alertCtrl.warning(this.maxAlert);
      }, 100);
    }
  }

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
   * เพิ่มขึ้น / ลดลง ทีละ
   */
  private step: number | any = 1;
  @Input('step') set inputStep(step: number | any) {
    if (JSON.stringify(this.step) != JSON.stringify(step)) {
      // code เดิมเริ่มต้นตรงนี้
      this.step = step;
      // code เดิมสิ้นสุดตรงนี้

      let oldValue: number = this._value;
      if (typeof this._value != 'undefined' && typeof this.step != 'undefined' && this._value != 0) {
        if (typeof this.step == 'number') {
          this._value = Math.floor(this._value / this.step) * this.step;
        }
        else {
          // หา step ในแต่ละเงื่อนไข
          if (this._value >= this.step[0].value) {
            for (let i = this.step.length - 1; i > -1; i --) {
              if (this._value >= this.step[i].value) {
                this._value = Math.floor(this._value / this.step[i].step) * this.step[i].step;
                i = -1;
              }
            }
          }
          else {
            this._value = 0;
          }
        }

        if (oldValue != this._value) {
          this.valueChange.emit(this._value);
          this.value = this._value;
        }
      }
    }
  }

  private zero: number = 0;
  @Input('zero') set inputZero(zero: number) {
    this.zero = zero;
    if (this._value < zero || this._value > this.max) {
      this._value = zero;
      this.valueChange.emit(this._value);
      this.value = this._value;
    }
  }

  /**
   * เพิ่มขึ้น / ลดลง ทีละ
   */
  private sumMonth: boolean = false;
  @Input('sumMonth') set inputSumMonth(sumMonth: boolean) {
    this.sumMonth = sumMonth;
  }

  /**
   * ปัดเศษ
   */
  @Input('round') private round: boolean = true;

  @Input('default') private default: number = 0;

  /**
   * แสดง min max
   */
  @Input('showMinMax') private showMinMax: boolean = false;

  constructor(
    private alertCtrl: AlertDirective
  ) {
    this.valueChange = new EventEmitter();
    this.timestamp = Date.now();
  }

  public ngAfterViewInit(): void {
    if (this.max != null && this._value > this.max)
      this._value = this.max;
    else if (this.min != null && this._value < this.min)
      this._value = this.zero;
  }

  /**
   * เพิ่มขึ้น
   */
  private stepUp(): void {

    if (this.timestamp < Date.now()) {
      this.timestamp = Date.now() + 500;

      // ปรับเริ่มต้นที่ค่าสูงสุด
      if (this._value == 0 && this.default > 0) {
        if (this.max == 0) {
          if (this.maxAlert != '')
            this.alertCtrl.warning(this.maxAlert);
        }
        else {
          if (this.default < this.max && this.min != this.max)
            this.change(this.default);
          else
            this.change(this.max);
        }
      }

      else if (this.max >= this.min && this.max > 0) {
        // ค่าเริ่มต้นน้อยที่สุด
        if (this._value < this.min && this.max != this.min)
          this._value = this.min;
        else {
          // step มีค่าเดียว
          if (typeof this.step == 'number') {
            // เพิ่มแล้วค่ายังไม่เกิน
            if (this._value + this.step <= this.max)
              this._value += this.step;
            else
              if (this.maxAlert != '')
                this.alertCtrl.warning(this.maxAlert);
          }
          // step มีมากกว่า 1 ค่า
          else {
            if (this._value == 0) {
              this._value = this.step[0].value;
            }
            else {
              // หา step ในแต่ละเงื่อนไข
              for (let i = this.step.length - 1; i > -1; i --) {
                if (this._value >= this.step[i].value) {
                  // เพิ่มแล้วค่ายังไม่เกิน
                  if (this._value + this.step[i].step <= this.max)
                    this._value += this.step[i].step;
                  else
                    if (this.maxAlert != '')
                      this.alertCtrl.warning(this.maxAlert);
                  i = -1;
                }
              }
            }
          }
        }
      }
      else {
        if (this.maxAlert != '')
          this.alertCtrl.warning(this.maxAlert);
      }

      this.valueChange.emit(this._value);
      this.value = this._value;
    }
  }

  /**
   * ลดลง
   */
  private stepDown(): void {

    if (this.timestamp < Date.now()) {
      this.timestamp = Date.now() + 500;

      // ค่าเริ่มต้นน้อยที่สุด
      if (this._value <= this.min) {
        this._value = this.zero;
        if (this.minAlert != '')
          this.alertCtrl.warning(this.minAlert);
      }
      else {
        // step มีค่าเดียว
        if (typeof this.step == 'number') {
            this._value -= this.step;
        }
        // step มีมากกว่า 1 ค่า
        else {
          if (this._value <= this.step[0].value) {
            this._value = this.zero;
            if (this.minAlert != '')
              this.alertCtrl.warning(this.minAlert);
          }
          // หา step ในแต่ละเงื่อนไข
          for (let i = this.step.length - 1; i > -1; i --) {
            if (this._value > this.step[i].value) {
              this._value -= this.step[i].step;
              i = -1;
            }
          }
        }
      }

      this.valueChange.emit(this._value);
      this.value = this._value;
    }
  }

  /**
   * ปรับค่า
   */
  private change(value: number): void {
    if (value < this.min) {
      if(!this.sumMonth) { // เคสพิเศษ เฉพาะ รายเดือน
        this._value = this.zero;
        if (this.minAlert != '')
          this.alertCtrl.warning(this.minAlert);
      }
    }
    
    else if (value > this.max) {
      if (this.round) {
        if (typeof this.step == 'number')
          this._value = Math.floor(this.max / this.step) * this.step;
        else {
          // หา step ในแต่ละเงื่อนไข
          for (let i = this.step.length - 1; i > -1; i --) {
            if (this.max >= this.step[i].value) {
                this._value = Math.floor(this.max / this.step[i].step) * this.step[i].step;
                i = -1;
            }
  
            // กรณีค่าต่ำกว่า step
            if (i == 0) {
              this._value = 0;
            }
          }
        }
      }
      else {
        this._value = this.max;
      }

      if (this.maxAlert != '')
        this.alertCtrl.warning(this.maxAlert);
    }

    else if (this.round) {
      if (typeof this.step == 'number')
        this._value = Math.floor(value / this.step) * this.step;
      else {
        // หา step ในแต่ละเงื่อนไข
        for (let i = this.step.length - 1; i > -1; i --) {
          if (value >= this.step[i].value) {
              this._value = Math.floor(value / this.step[i].step) * this.step[i].step;
              i = -1;
          }

          // กรณีค่าต่ำกว่า step
          if (i == 0) {
            this._value = 0;
          }
        }
      }
    }
    else
      this._value = value;

    this.valueChange.emit(this._value);
    this.value = this._value;
  }

  // อ่านค่า
  get value(): number {
    return this._value;
  };

  // เก็บค่า
  set value(value: number) {
    this._value = value;
    this.onChange(value);
  }

  // เขียนค่าลง input
  public writeValue(value: number) {
    this._value = value;
    this.onChange(value);
  }

  private onChange = (_) => {};
  private onTouched = () => {};
  public registerOnChange(fn: (_: string) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
