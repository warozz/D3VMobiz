import { ProspectModel } from '../prospect/prospect-model';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Broadcaster } from '../utility/broadcaster';

@Injectable()
export class CompareProspectProvider {
  public oldProspectDoNotCall: any;
  public newProspectDoNotCall: any;
  public oldProspect: any;
  public newProspect: any;
  constructor(
    private alertDirective: AlertDirective,
    private broadcaster: Broadcaster
    ) { }

  /**
  * Function Change Prospect
  * @param prospect ProspectModel
  * @returns boolean
  */
  public flagDoNotCall(prospect: ProspectModel): boolean{
    if(typeof this.oldProspectDoNotCall == 'undefined' || this.oldProspectDoNotCall == ''){
      this.oldProspectDoNotCall = JSON.parse(JSON.stringify(prospect));
    }else{
      if(!this.newProspectDoNotCall) {
        this.newProspectDoNotCall = '';
      }
      this.oldProspectDoNotCall = JSON.parse(JSON.stringify(this.newProspectDoNotCall));
    }
    this.newProspectDoNotCall = JSON.parse(JSON.stringify(prospect));

    if(typeof this.oldProspectDoNotCall != 'undefined' && typeof this.newProspectDoNotCall != 'undefined'
      && this.oldProspectDoNotCall != '' && this.newProspectDoNotCall != ''){
        if(this.oldProspectDoNotCall.firstName != this.newProspectDoNotCall.firstName
          || this.oldProspectDoNotCall.lastName != this.newProspectDoNotCall.lastName
          || this.oldProspectDoNotCall.citizenID != this.newProspectDoNotCall.citizenID){
          return true;
        }
      }
    return false;
  }

  /**
  * Function Alert Change Prospect
  * @param prospect ProspectModel
  * @returns boolean
  */
  public alertConfirmChangeProspect(prospect: ProspectModel): Promise<boolean> {
    if(typeof this.oldProspect == 'undefined' || this.oldProspect == ''){
      this.oldProspect = JSON.parse(JSON.stringify(prospect));
    }else{
      if(!this.newProspect) {
        this.newProspect = '';
      }
      this.oldProspect = JSON.parse(JSON.stringify(this.newProspect));
    }
    this.newProspect = JSON.parse(JSON.stringify(prospect));

    console.log("oldProspect: ",this.oldProspect);
    console.log("newProspect: ",this.newProspect);

    return new Promise((resolve, reject) => {

      let alertConfirm = this.alertDirective.create({
        title: 'ยืนยัน',
        subTitle: 'การเปลี่ยนแปลง เพศ / อายุ ทำให้ข้อมูลที่กรอกเดิมในตัวอย่างผลประโยชน์และทำใบเสนอขาย จะต้องกรอกข้อมูลใหม่',
        buttons: [{
          text: 'ยกเลิก',
          handler: () => {
                if(typeof this.oldProspect.gender != 'undefined' && this.oldProspect.gender != ''
                || typeof this.oldProspect.age != 'undefined' && this.oldProspect.age != ''){
                  //set value prospect
                  prospect.preName = this.oldProspect.preName;
                  prospect.gender = this.oldProspect.gender;
                  prospect.birthDate = this.oldProspect.birthDate;
                  prospect.age = this.oldProspect.age;

                  // set old to new value
                  this.newProspect.preName = this.oldProspect.preName;
                  this.newProspect.gender = this.oldProspect.gender;
                  this.newProspect.birthDate = this.oldProspect.birthDate;
                  this.newProspect.age = this.oldProspect.age;
                }else{
                  prospect.preName = this.newProspect.preName;
                  prospect.gender = this.newProspect.gender;
                  prospect.birthDate = this.newProspect.birthDate;
                  prospect.age = this.newProspect.age;
                }
                setTimeout(() => {
                  this.broadcaster.broadcast('prospect', prospect);
                }, 1000);
            alertConfirm.dismiss().then(() => { resolve(false); });
            return false;
          }
        },{
          text: 'ตกลง',
          handler: () => {
            alertConfirm.dismiss().then(() => { resolve(true); });
            return false;
          }
        }]
      });

      if(typeof this.oldProspect != 'undefined' && typeof this.newProspect != 'undefined'
      && this.oldProspect != '' && this.newProspect != ''){
        if(this.oldProspect.gender != this.newProspect.gender || this.oldProspect.age != this.newProspect.age){
          alertConfirm.present();
        }
      }
    });
  }

  /**
  * Function Reset Data Compare Prospect Provider
  */
 public resetData(): void{
  this.oldProspectDoNotCall = '';
  this.newProspectDoNotCall = '';
  this.oldProspect = '';
  this.newProspect = '';
 }

}
