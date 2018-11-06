import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the PopoverCalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-calendar',
  templateUrl: 'popover-calendar.html'
})
export class PopoverCalendarComponent {

  birthDate: any;

  constructor(private viewCtrl: ViewController) {
   
  }

   submit() : void {
    this.viewCtrl.dismiss(this.birthDate);
  }

}
