import {ApiProvider} from '../../../providers/api/api';
import {ServiceName} from '../../../providers/constants/service-name';
import {FunctionName} from '../../../providers/constants/function-name';
import {RequestModel} from '../../../providers/model/request-model';
import { Component, Output, EventEmitter, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalculateAgeDirective } from '../../../directives/utility/calculate-age/calculate-age';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the PrefixNameComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PrefixNameComponent),
  multi: true
};

@Component({
  selector: 'prefix-name',
  templateUrl: 'prefix-name.html',
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})
export class PrefixNameComponent {

  /**
   * ค่า
   */
  private _value: string = '';

  /**
   * ข้อมูล
   */
  private _data: any;
  private _dataFilter: any;

  /**
   * อายุ
   */
  private age: number;

  /**
   * คำนำหน้า
   */
  private preName: string = '';

  /**
   * เฉพาะเพศ
   */
  private selectedSex: string;

  /**
   * เพศ
   */
  @Output('sex') private sex: EventEmitter<string> = new EventEmitter(); 

  /**
   * เปิด / ปิด เพศ
   */
  @Output('disabledSex') private disabledSex: EventEmitter<boolean> = new EventEmitter(); 

  /**
   * วัน เดือน ปีเกิด yyyy-MM-dd
   */
  @Input('birthDate') set setBirthDate(birthDate: string) {
    if (typeof birthDate != 'undefined') {
      this.age = this.calculateAge.calculateAge(new Date(birthDate.substring(0, 10)));
      this.filter();
    }
  }

  /**
   * เลือกเพศ
   */
  @Input('selectedSex') set setSelectedSex(sex: string) {
    this.selectedSex = sex;
    if (typeof this._data != 'undefined') {
      this._data = this._data.filter(item => item.gender == 'N' || item.gender == this.selectedSex);
      this._dataFilter = this._dataFilter.filter(item => item.gender == 'N' || item.gender == this.selectedSex);
    }
  }

  constructor(private apiProvider: ApiProvider, private calculateAge: CalculateAgeDirective, private http: HttpClient) {

    // ข้อมูลคำนำหน้า
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.PRENAME;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = [];

    //this.apiProvider.callData(reqM).then(
    this.http.get('assets/json/prefix-name.json').subscribe(
      (res)=> {
        // this._data = res['data'];  //console.log('>>>>>>>>>>>>>>>>>>>', res);
        if (typeof this.selectedSex == 'undefined')
          this._data = res['data'];
        else {
          this._data = res['data'].filter(item => item.gender == 'N' || item.gender == this.selectedSex);
        }
        this.filter();
      },
      (err)=> {
        console.log('PRENAME : err ', err);
      }
    );

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
    if (typeof this._dataFilter != 'undefined') {
      this.preNameChange(value);
    }
    else {
      this.preName = value;
    }
  }

  private onChange = (_) => {};
  private onTouched = () => {};
  public registerOnChange(fn: (_: string) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  /**
   * เปลี่ยนคำนำหน้า
   */
  private preNameChange(preName: string) {
    if (typeof this._data != 'undefined') {
      let item = this._data.filter(item => item.title == preName);
      if (item.length > 0 && item[0].gender != 'N') {
        this.sex.emit(item[0].gender);
        this.disabledSex.emit(true);
      }
      else
        this.disabledSex.emit(false);
    }

    this.value = preName;
    if (this._value != '') {
      setTimeout(() => {
        this.preName = preName;
      }, 10);
    }
  }

  /**
   * กรองคำนำหน้า
   */
  private filter() {

    if (typeof this._data != 'undefined') {
      if (this._value == '' && typeof this.preName != 'undefined') {
        this.preNameChange(this.preName);
      }

      if (typeof this.age == 'undefined') {
        this._dataFilter = this._data;
      }

      // ผู้ใหญ่
      else if (this.age > 14) {
        this._dataFilter = this._data.filter(item => item.title != 'เด็กชาย' && item.title != 'เด็กหญิง');
          
          setTimeout(() => {
            if (this.preName == 'เด็กชาย') {
              this.preNameChange('นาย');
              this.preName = 'นาย';
            }
            else if (this.preName == 'เด็กหญิง') {
              this.preNameChange('นางสาว');
              this.preName = 'นางสาว';
            }
          }, 1);
      }

      // เด็ก
      else {
        this._dataFilter = this._data.filter(item => item.title != 'นาย' && item.title != 'นาง' && item.title != 'นางสาว');
      
          setTimeout(() => {
            if (this.preName == 'นาย') {
              this.preNameChange('เด็กชาย');
              this.preName = 'เด็กชาย';
            }
            else if (this.preName == 'นาง' || this.preName == 'นางสาว') {
              this.preNameChange('เด็กหญิง');
              this.preName = 'เด็กหญิง';
            }
          }, 1);
      }
    }
  }
}
