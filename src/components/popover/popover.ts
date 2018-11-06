import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  content: object;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.content = this.navParams.get('userInfo');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
