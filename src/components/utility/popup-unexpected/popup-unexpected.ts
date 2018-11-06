import { Component } from '@angular/core';
import { ViewController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
/**
 * Generated class for the PopupUnexpectedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-unexpected',
  templateUrl: 'popup-unexpected.html'
})
export class PopupUnexpectedComponent {

  private rider: string;
  private chooseRider: any;
  private dataArr: any;
  private riderTH: string;
  private dataLenght: number;
  private multiply: number;
  private sum : number;
  private result : number;

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
    this.http.get('assets/json/unexpected/'+this.rider.toLowerCase()+'-modal.json').subscribe(data => {
      this.chooseRider = data.json();
      this.dataArr = this.chooseRider.disease;
      this.dataLenght = this.dataArr.length;
      this.riderTH = this.chooseRider.keyTH;
      this.multiply = this.chooseRider.multiply;
      this.result = Number(this.sum) * Number(this.multiply);
    });
  }

  async getParams() {
    this.rider = this.params.get("rider");
    this.sum = this.params.get("sum");
  }

  /**
   * ปิด modal
   */
  private close(): void
  {
    this.viewCtrl.dismiss();
  }
}
