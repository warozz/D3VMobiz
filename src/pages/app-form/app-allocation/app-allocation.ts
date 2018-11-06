import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-app-allocation',
  templateUrl: 'app-allocation.html',
})
export class AppAllocationPage {

  private planCode : string = ''
  private dataEdit : Object;
  private prospect : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataEdit = this.navParams.get('dataEdit');
    this.planCode = this.dataEdit['planCode'];
    this.prospect = this.dataEdit['prospect'];
    console.log('navParams allocate -->', this.navParams);
    console.log('dataEdit allocate -->', this.dataEdit);
    console.log('planCode allocate -->', this.planCode);

    this.dataEdit = {
      ...this.dataEdit,
      callBackAppAllocation : this.callback
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppAllocationPage');
  }

  callback = () =>
  {
    console.log('callBackAppAllocation');
    this.navCtrl.pop();
   
  }; 



}
