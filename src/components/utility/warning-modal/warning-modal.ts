import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { DateFormatProvider } from '../../../providers/date-format/date-format';
import * as moment from 'moment';

/**
 * Generated class for the WarningModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'warning-modal',
  templateUrl: 'warning-modal.html'
})
export class WarningModalComponent {

  private data:any;
  private value: any;
  private title;
  private list : boolean = false;
  private array: Array<string> = [];
  private result;
  private dataDate;

  private dup_name_selected: any;

  constructor(private viewCtrl: ViewController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private dateFormatProvider :DateFormatProvider) {
// debugger;
      this.data = this.navParams.data;

      if (this.data.type == 29) {
        moment.locale('th');
        this.dataDate = moment(this.data.date, "YYYY-MM-DD HH:mm:ss");
        this.data = this.data.redText;
        this.data.redText = this.data.redText.replace("{{value}}", moment(this.dataDate).format("LL"));
        this.list = false;
      } else if ( this.data[0].textAlert.type == 40) {
        console.log(this.data[0].list);

          if (this.data[0].list.length > 1) {
            let name = this.data[0].firstName+" "+this.data[0].lastName;
            let valueTxt = "{{value1}}" ;
            let valueTxt2 = "{{value2}}" ;
           
              for (const iterator of this.data[0].list) {
                this.data[0].textAlert.redText = this.data[0].textAlert.redText.replace(valueTxt, name);
                valueTxt = name;
                this.data[0].textAlert.redText = this.data[0].textAlert.redText.replace(valueTxt2, iterator.rUnc.referenceID);
                valueTxt2 = iterator.rUnc.referenceID;
               
                this.array.push(this.data[0].textAlert.redText);
              }
              this.data[0].textAlert.redText = this.data[0].textAlert.redText.replace(valueTxt, "{{value1}}");
              this.data[0].textAlert.redText = this.data[0].textAlert.redText.replace(valueTxt2, "{{value2}}");
              this.value =  this.data[0].textAlert.text;
              this.title = this.data[0].textAlert.title;
              this.list = true;
          }

       
       
      }
      
  }


  private setValue(i) : void{
    this.result = 
    {
      firstname:  this.data[0].firstName,
      lastname: this.data[0].lastName,
      identifyId:this.data[0].list[i].rUnc.referenceID
    }
    
  }

  private dismissData() : void {
    this.viewCtrl.dismiss(this.result);
  }

    /**
   * ปิด modal
   */
  public close() {
    this.viewCtrl.dismiss();
  }



}
