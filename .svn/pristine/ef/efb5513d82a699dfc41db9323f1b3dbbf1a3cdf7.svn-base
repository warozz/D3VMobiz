import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ValidateProvider } from '../validate/validate';
import moment from 'moment';
import { Platform } from 'ionic-angular';


/*
  Generated class for the DateFormatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateFormatProvider {

  private monthShotThMap = {
    '01': 'ม.ค.', '02': 'ก.พ.', '03': 'มี.ค.', '04': 'เม.ย.', '05': 'พ.ค.', '06': 'มิ.ย.',
    '07': 'ก.ค.', '08': 'ส.ค.', '09': 'ก.ย.', '10': 'ต.ค.', '11': 'พ.ย.', '12': 'ธ.ค.',
    '1': 'ม.ค.', '2': 'ก.พ.', '3': 'มี.ค.', '4': 'เม.ย.', '5': 'พ.ค.', '6': 'มิ.ย.',
    '7': 'ก.ค.', '8': 'ส.ค.', '9': 'ก.ย.'
  }
  private monthLongThMap = {
    '01': 'มกราคม', '02': 'กุมภาพันธ์', '03': 'มีนาคม', '04': 'เมษายน', '05': 'พฤษภาคม',
    '06': 'มิถุนายน', '07': 'กรกฎาคม', '08': 'สิงหาคม', '09': 'กันยายน', '10': 'ตุลาคม',
    '11': 'พฤจิกายน', '12': 'ฑันวาคม', '1': 'มกราคม', '2': 'กุมภาพันธ์', '3': 'มีนาคม',
    '4': 'เมษายน', '5': 'พฤษภาคม', '6': 'มิถุนายน', '7': 'กรกฎาคม', '8': 'สิงหาคม',
    '9': 'กันยายน'
  }

  constructor(private validate: ValidateProvider,
              private platform: Platform) { }
  /**
   *@param value Date
   *@param type S = Shot , L = Long
   *@returns StringDate 
   */
  public dateFormatShotTh1(value: string, type: string) {
    /**
    *input format string YYYY-MM-DD hh:mm:ss Ex. 2017-11-21 11:59:59
    *output Ex. 21 พ.ย. 2560 or 21 พฤษจิกายน 2560
    */
    if (this.validate.isEmpty(value)) {
      return value;
    }
    value = moment(value).format('DD MM YYYY');
    let day = Number(value.substring(0, 2));
    let month = value.substring(3, 5);
    let year = Number(value.substring(6))+543;
    if (type === 'S') {
      month = this.monthShotThMap[month];
    } else if (type === 'L') {
      month = this.monthLongThMap[month];
    }
    value = day + ' ' + month + ' ' + year;
    return value;
  }

  /**
   *@param value Date
   *@param type S = Shot , L = Long
   *@param showtime boolean
   *@returns StringDate 
   */
  public dateFormatThAndShowTime(value: string, type: string, showtime:boolean) {
    /**
    *input format string YYYY-MM-DD hh:mm:ss Ex. 2017-11-21 11:59:59
    *output Ex. 21 พ.ย. 2560 11.59 น. or 21 พฤษจิกายน 2560 11.59 น.
    */
    if (this.validate.isEmpty(value)) {
      return value;
    }
    //const valuebefore = value;
    value = moment(value).format('DD MM YYYY HH:mm น.');
    let day = value.substring(0, 2);
    let month = value.substring(3, 5);
    let year = Number(value.substring(6,10))+543;
    let time = value.substring(11);
    if (type === 'S') {
      month = this.monthShotThMap[month];
    } else if (type === 'L') {
      month = this.monthLongThMap[month];
    }
    value = showtime? day + ' ' + month + ' ' + year + ' ' + time : day + ' ' + month + ' ' + year;
    return value;
  }

    /**
   *@param value Date
   *@returns StringDate 
   */
  public dateFormatShotTh2(value: string) {
    /**
     *input format string YYYY-MM-DD hh:mm:ss Ex. 2017-11-21 11:59:59
     *output Ex. 21/11/2560 11:59 น. 
     */
    if (this.validate.isEmpty(value)) {
      return value;
    }
    let year = Number(value.substring(0,4))+543;
    value = moment(value).format('DD/MM/'+year+' HH:mm น.');
    return value;
  }

  /**
   * @param value Date
   * @param type S = start , E = end || optional
   * @returns StringDate 
   */
  public dateFormatToDB(value: any, type?: string) {
    /**
     *input format object {year: YYYY,month: MM,day: DD} Ex.{year: 2017,month: 11,day: 21} 
     *output 2017-11-24 00:00:00 or 2017-11-24 23:59:59
     */
    let output:string;
    if (this.validate.isEmptyDate(value)) {
      return value;
    }
    if (type === 'E') {
      output = value.year+'-'+value.month+'-'+value.day+' 23:59:59';
      return moment(output).format('YYYY-MM-DD HH:mm:ss');
    } else {
      output = value.year + '-' + value.month + '-' + value.day + ' 00:00:00';
      return moment(output).format('YYYY-MM-DD HH:mm:ss');
    }
  }

  public datePickerAdapterIn(value: any) {
    if(this.platform.is('core') || this.platform.is('mobileweb')){
      if(typeof value !== 'undefined' && value !== '' && value !== null) {
        let bd : Date = new Date(value);
        return { date: { year: bd.getFullYear(), month: bd.getMonth()+1, day: bd.getDate() } };
      } else {
        return { year:0, month:0, day:0 };
      }
    } else {
      if(typeof value !== 'undefined' && value !== '' && value !== null) {
        return moment(value).format("YYYY-MM-DD");
      } else {
        return "";
      }
    }
  }

  public datePickerAdapterOut(value: any) {
    let output : string;
    if(this.platform.is('core') || this.platform.is('mobileweb')){
      if(!this.validate.isEmptyDate(value)){
        output = value.year + '-' + value.month + '-' + value.day + ' 00:00:00';
        return moment(output).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return "";
      }
    } else {
      if(!this.validate.isEmpty(value)){
        return value + ' 00:00:00';
      } else {
        return "";
      }
    }
  }
}
