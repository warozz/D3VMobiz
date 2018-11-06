import { Component, Input, Output, EventEmitter, SimpleChanges, HostBinding, forwardRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import moment from 'moment';
import { MatButtonModule, MatCardModule, MatTabsModule, MatChipsModule, MatIconModule,MatDatepickerModule,MatNativeDateModule, MatDatepickerInputEvent } from "@angular/material";
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'DD MMM YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
  // providers: [
  //   {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
  //   {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  //   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ],
})

export class CalendarComponent {

  @Input()  private id        : string = "";
  @Input()  private min       : any;
  @Input()  private max       : any;
  @Input()  private placeholder     : string = "";
  @Input()  private date      : any = new Date();
  @Output() private dateChange: EventEmitter<string>;
 
  @Input('hidden') private hidden: number = 0;
  
  private disabled: boolean = false;
  @Input('disabled') set setDisabled(disabled: boolean) {
    this.disabled = disabled;
    if (disabled)
      this.disabledClass = 'disabled';
    else
      this.disabledClass = null;
  }

  @HostBinding('attr.disabled') private disabledClass: string;

  constructor(
    public platform:Platform,
    // private adapter: DateAdapter<any>
  ) {
    this.dateChange = new EventEmitter();

    console.log("hidden : "+this.hidden);
    // console.log("MAT_DATE_LOCALE => ",MAT_DATE_LOCALE);
    // console.log("MomentDateAdapter => ",MomentDateAdapter);
    // console.log("MY_FORMATS => ",MY_FORMATS);
    // console.log("MomentDateAdapter => ",MomentDateAdapter);
    // console.log("MAT_DATE_FORMATS => ",MAT_DATE_FORMATS);
    // console.log("----------------------- ");
    // this.adapter.setLocale('th');
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes['date']) {
      const date = this.dateDateToStr(this.date);
      this.date = date;
    }
    if(changes['max']) {
      const date = this.dateDateToStr(this.max);
      this.max = date;
    }
    if(changes['min']) {
      const date = this.dateDateToStr(this.min);
      this.min = date;
    }
  }
  private dateDateToStr(param: string = '') {
    if(!param) return param;
    if(!param.includes('-')) return '';
    // validate DateOnly when YYYY-MM-DD HHHH:MM:SS
    if(param.length > 10) {
      let dateOnly = param.split(' ');
      param = dateOnly[0];
    }
    let parseDate = param.split('-');
    const date = 
      {
        year  : Number(parseDate[0]),
        month : Number(parseDate[1]) - 1,
        day   : Number(parseDate[2])
      };
    return new Date(date.year, date.month, date.day);
  }

  changeDate(date: MatDatepickerInputEvent<Date>) {
    setTimeout(() => {
      this.dateChange.emit(moment(date.value).format('YYYY-MM-DD'));
      this.value = moment(date.value).format('YYYY-MM-DD');
    }, 100);
  }

  // อ่านค่า
  get value(): string {
    return this.date;
  };

  // เก็บค่า
  set value(date: string) {
    if (date !== this.date) {
      this.date = date;
      this.onChange(date);
    }
  }

  // เขียนค่าลง input
  public writeValue(date: string) {
    this.date = date;
    this.onChange(date);
  }

  private onChange = (_) => {};
  private onTouched = () => {};
  public registerOnChange(fn: (_: string) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
