import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatProvider } from '../../providers/date-format/date-format';
import * as moment from 'moment';

/**
 * Generated class for the DateFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateFormatTHYeartoENYear',
})
export class DateFormatPipe implements PipeTransform {
  /**
   * Example:
   * 19 มี.ค พ.ศ 2561 -> 19 มี.ค 2018
   * พ.ศ*. *\d{4} : dynamic
   * พ.ศ. \d{4} : only
   */
  transform(date: string) {
    if(!date) return;
    let test = date.split(' ');
    if(date.includes('พ.ศ')) {
      date = date.replace(/พ.ศ. \d{4}/g, String(Number(test[2])+543));
    } else {
      date = date.replace(/\d{4}/g, String(Number(test[2])+543));
    }
    return date;
  }
}

@Pipe({
  name: 'dateFormat',
})
export class DateFormat2Pipe implements PipeTransform {

  constructor(private dateFormatProvider: DateFormatProvider) {

  }


  transform(date: string) {
    return this.dateFormatProvider.dateFormatShotTh2(String(moment(date).format("YYYY-MM-DD HH:mm:ss")))
  }
}
