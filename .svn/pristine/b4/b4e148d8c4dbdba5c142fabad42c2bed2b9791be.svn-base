import { Subscription } from 'rxjs/Rx';
import { TLPlanModel } from './../../../providers/tlplan/tlplan-model';
import { Broadcaster } from './../../../providers/utility/broadcaster';
import { ProspectModel } from './../../../providers/prospect/prospect-model';
import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { MAX_AGE } from "./../../../providers/constants/app-config";

/**
 * Generated class for the QuatationFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quatation-form',
  templateUrl: 'quatation-form.html'
})
export class QuatationFormComponent implements OnDestroy {
  hasPackage: boolean;
  private maxDate;
  private minBirthDate;
  //
  package: any;
  //ขั้นอาชีพ
  occupationType: string;
  /**เบี้ยประกันภัยหลัก(เบี้ยชีวิต) */
  private premiumMain: number;

  /**ทุนประกัน */
  private sum: number;
  /**เบี้ยประกันภัยรวม(เบี้ยชีวิต) */
  private premium: number;
  /**
   * ตำแหน่งของ Page
   */
  private tab: number = 0;

  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private data: ProspectModel = new ProspectModel();

  /**
   * เด็ก
   */
  private child: boolean = false;


  /**
   * enableGenderSelected ทำไว้เช็คให้เลือกเพศได้ เมื่อ มีการเลือกคำนำหน้า
   * ที่ไม่ใช่ นาย,นาง,นางสาว,เด็กชาย,เด็กหญิง
   */
  private enableGenderSelected: boolean = true;

  private planselected: TLPlanModel[];
  private calType: string;
  private choosePlan : string;
  private roleType: string;
  private endowmentType: boolean = false;
  private payType: boolean = false;
  private pEndowmentYear: number;
  private pPayYear: number;
  private subscription: Array<Subscription> = [];

  constructor(private broadcaster: Broadcaster, private navCtrl: NavController, private storage: Storage) {
    this.maxDate = moment().format('YYYY-MM-DD');
    this.minBirthDate = moment().subtract(MAX_AGE, 'years').format('YYYY-MM-DD');
    //defualt dateMAX_AGE
    this.data.birthDate = moment().format('YYYY-MM-DD');
    // เฝ้าติดตามค่าข้อมูลผู้มุ่งหวัง
    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
      if (!this.wait) {
        this.data = res;
        this.occupationType = this.data.occupationType;
        //เช็คอีกรอบ
        this.checkPreName();

        console.log('loop');
      }
    }));

    // ไว้ check calType = 5 จะต้องมี ชั้นอาชีพ 1,2
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res =>{
      this.planselected = res;
      //console.log(this.planselected[0]);
      //alert(JSON.stringify(this.planselected[0].calType));
      this.calType = this.planselected[0].calType;
      this.choosePlan = this.planselected[0].planCode;
      this.endowmentType = this.planselected[0].endowmentType === "1" ? true : false;
      this.payType = this.planselected[0].payType === "1" ? true : false;
      this.pEndowmentYear = Number(this.planselected[0].pEndowmentYear ? this.planselected[0].pEndowmentYear : 0);
      this.pPayYear = Number(this.planselected[0].pPayYear ? this.planselected[0].pPayYear : 0);

      //alert(this.choosePlan);
    }));



    this.storage.get('loginProfile').then(profile => {
      this.roleType = profile.roleType;
    });

    this.subscription.push(this.broadcaster.on('quatationPackage').subscribe(res => {
      this.package = res;
      this.hasPackage = false;
      const hasPackage = ['TJ1','TK1','TQ1','TL1','TN1','TM1','TX2','TY'];
      if(this.choosePlan && this.choosePlan.length > 0
      ) {
        if(hasPackage.includes(this.choosePlan)) this.hasPackage = true;
      }
    }));

    this.subscription.push(this.broadcaster.on('quatationStep').subscribe(res => {
      this.tab = res;
    }));

    /**เบี้ยประกันภัยรวม(เบี้ยชีวิต) */
    this.subscription.push(this.broadcaster.on('quatationPremium').subscribe(res => {
      this.premium = Number(res ? res : 0);
    }));

    /**ทุนประกัน */
    this.subscription.push(this.broadcaster.on('quatationSum').subscribe(res => {
      this.sum = Number(res ? res : 0);
    }));

    /**เบี้ยประกันภัยหลัก(เบี้ยชีวิต) */
    this.subscription.push(this.broadcaster.on('premiumFooter').subscribe(res=>{
      this.premiumMain = Number(res ? res : 0);
    }));
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }

  /**
   * เลือกเพศอัตโนมัติ
   * @param preName คำนำหน้าชื่อ
   */
  private chooseSex(preName: string) {
    // switch (preName) {
    //   case 'นาย': case 'เด็กชาย':
    //     this.data.gender = 'M';
    //     break;
    //   case 'นาง': case 'นางสาว': case 'เด็กหญิง':
    //     this.data.gender = 'F';
    //     break;
    //   default:
    //     if(!this.data.gender){
    //       this.data.gender = '';
    //     }
    // }

    // if (this.data.gender != '')
    //   this.onChange('preName');
  }

  waitKeyPress(value) {
    //setTimeout( () => {
      //this.onChange(value);
    //}, 500);
  }

  private wait: boolean = false;
  /**
   * เปลี่ยนค่า
   * @param id ไอดีที่เปลี่ยนค่า
   */
  private onChange(id: string): void {
    

    let data = {
      id: id,
      value: this.data[id]
    }

    if (id == 'birthDate') {
      this.checkPreName();
    }
    else {
      this.wait = true;
      setTimeout(() => {
        this.broadcaster.broadcast('prospect', this.data);
      }, 100);
      setTimeout(() => {
        this.wait = false;
      }, 1000);
    }
  }

  private checkPreName(): void {
    
    // this.wait = true;
    // setTimeout(() => {
    //   let oldPrename: string = this.data.preName;
    //   // ผู้ใหญ่
    //   // if (Number(this.data.age) > 19) {
    //   if (Number(this.data.age) > 14) {
    //     this.child = false;
    //     switch (this.data.preName) {
    //       case 'เด็กชาย':
    //         this.data.preName = 'นาย';
    //         break;
    //       case 'เด็กหญิง':
    //         this.data.preName = 'นางสาว';
    //     }
    //   }
    //   // เด็ก
    //   else {
    //     this.child = true;
    //     switch (this.data.preName) {
    //       case 'นาย':
    //         this.data.preName = 'เด็กชาย';
    //         break;
    //       case 'นาง': case 'นางสาว':
    //         this.data.preName = 'เด็กหญิง';
    //     }
    //   }

    //   if (oldPrename == this.data.preName)
    //      this.broadcaster.broadcast('prospect', this.data);
    // }, 50);

    // setTimeout(() => {
    //   this.wait = false;
    // }, 1000);

  }
}
