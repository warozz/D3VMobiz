import { Directive, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the CalculateAgeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[calculate-age]' // Attribute selector
})
export class CalculateAgeDirective {

  /**
   * วัน เดือน ปีเกิด yyyy-MM-dd
   */
  @Input('birthDate') set date(birthDate: string) {
    
    if (birthDate != null) {
      if (typeof moment(birthDate) == 'object' && !moment(birthDate).isValid()) {
        birthDate = moment().format("YYYY-MM-DD");
      }
      this.ngModelChange.emit(this.calculateAge(new Date(birthDate.substring(0, 10))));
    }
      
  }

  @Output() private ngModelChange: EventEmitter<any>;

  @HostBinding('value') private value: string;

  constructor() {
    this.ngModelChange = new EventEmitter();
  }

  /**
   * คำนวณอายุ จากวันเกิด
   * @param birthDate วันเกิด
   */
  public calculateAge(birth: Date): any {
    // วันที่ปัจจุบัน
    let now = new Date();

    // วันที่ปัจจุบัน
    let ageDay = now.getDate();
    // เดือนปัจจุบัน
    let ageMonth = now.getMonth();
    // ปีปัจจุบัน
    let ageYear = now.getFullYear();
   
    if (ageDay < birth.getDate()) {
      ageDay += 30;
      ageMonth --;
    }
    if (ageMonth < birth.getMonth()) {
      ageMonth += 12;
      ageYear --;
    }
console.log("0  ageMonth="+ageMonth + "  ageDay="+ ageDay +"   ageYear=" + ageYear);

    ageDay -= birth.getDate();
    if(birth.getFullYear() == 1940 && birth.getMonth() < 3 )  // คือ ถ้าคนเกิดปี 2483/1940 ไม่ว่าจะเกิดเดือนอะไร ให้เปลี่ยน
      ageMonth = ageMonth-3;
    else 
      ageMonth -= birth.getMonth();
    ageYear -= birth.getFullYear();


console.log("1  ageMonth="+ageMonth + "  ageDay="+ ageDay +"   ageYear=" + ageYear);

    if (ageMonth > 6 || ageMonth == 6 && ageDay >= 1) //** boom edit **
      ageYear ++

console.log("2 ageYear ==" + ageYear + " birth.getFullYear()==" +birth.getFullYear()  + " birth.getMonth()==" +birth.getMonth() +"  birth.getDate()==" +birth.getDate() );

    if ( birth.getFullYear() < 1940 && birth.getMonth() < 3) 
      ageYear --;

console.log("3 ageYear ==" + ageYear);

    this.value = ageYear.toString();//+ ' ปี';
    return ageYear;
  }
}