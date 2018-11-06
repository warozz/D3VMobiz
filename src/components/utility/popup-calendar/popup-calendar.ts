import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { Component } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the PopupCalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-calendar',
  templateUrl: 'popup-calendar.html'
})
export class PopupCalendarComponent {

  private years: Array<number> = [];

  private day: number = Number(moment().format('DD'));
  private month: number = Number(moment().format('MM'));
  private year: number = Number(moment().format('YYYY')) + 543;

  constructor(private alertCtrl: AlertDirective, private viewCtrl: ViewController, private param: NavParams) {

    if (typeof this.param.get('date') != 'undefined' && this.param.get('date') != '') {

      const date = moment(this.param.get('date')).format('DD MM YYYY');
      this.day = Number(date.substring(0, 2));
      this.month = Number(date.substring(3, 5));
      this.year = Number(date.substring(6, 10))+543;
    }

    let yearCurrent: number = Number(moment().format('YYYY')) + 543;
    
    for (let i: number = yearCurrent; i > this.year - 100; i --) {
      this.years.push(i);
    }
  }

  private submit(): void {
    let day: string;
    if (this.day.toString().length == 1)
      day = '0' + this.day.toString();
    else
      day = this.day.toString();

    let month: string;
    if (this.month.toString().length == 1)
      month = '0' + this.month.toString();
    else
      month = this.month.toString();

    let year: string = (this.year - 543).toString();

    let date = year + '-' + month + '-' + day;

    if (moment(date).isValid())
      this.viewCtrl.dismiss(moment(date).format("YYYY-MM-DD"));
    else
      this.alertCtrl.warning('วันที่ไม่ถูกต้อง');
  }

  private close(): void {
    this.viewCtrl.dismiss(); 
  }
}
