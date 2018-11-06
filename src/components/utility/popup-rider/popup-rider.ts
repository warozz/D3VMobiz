import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PopupRiderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-rider',
  templateUrl: 'popup-rider.html'
})
export class PopupRiderComponent {

  private chooseRider: any;
  private rider: any;
  private dataArr: any;
  private text: string;
  private riderTH: string;
  private annotation : string;
  
  constructor(
    private viewCtrl: ViewController,
    private http: Http, 
    private storage: Storage,
    private params: NavParams
  ) {
    this.startInit();
  }

  async startInit() {
    await this.getParams();
    this.http.get('assets/json/riderQuotation/'+this.rider.toLowerCase()+'-modal.json').subscribe(data => {
      this.chooseRider = data.json();
      this.dataArr = this.chooseRider.disease;
      this.text = this.chooseRider.text;
      this.riderTH = this.chooseRider.keyTH;
      this.annotation = this.chooseRider.annotation;
    });
  }

  async getParams() {
    this.rider = this.params.get("rider");
  }

  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss();
  }

}
