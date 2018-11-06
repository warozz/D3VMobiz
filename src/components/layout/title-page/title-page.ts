import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { DateFormatProvider } from '../../../providers/date-format/date-format';
/**
 * Generated class for the TitlePageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'title-page',
  templateUrl: 'title-page.html'
})
export class TitlePageComponent {
  /**
   * วัน เวลา
   */
  private today: string;

  @Input('h1-class') h1Class; 

  @Input('sub1') private sub1: string = '';
  @Input('sub2') private sub2: string = '';

  constructor(private dateFormatProvider :DateFormatProvider) {
    this.setDateTime();
  }

  /**
   * แสดงวันที่ และเวลาปัจจุบัน
   */
  public setDateTime(): void
  {
    this.today = this.dateFormatProvider.dateFormatShotTh2(String(moment(new Date()).format("YYYY-MM-DD HH:mm:ss")));
    setInterval(() => {
      this.today = this.dateFormatProvider.dateFormatShotTh2(String(moment(new Date()).format("YYYY-MM-DD HH:mm:ss")));
    }, 1000);
  }
}
