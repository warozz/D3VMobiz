import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { ApplicationData } from '../../../providers/application/application-data';
import { UlinkApplicationFormM } from '../../../providers/ulink-app-data/ulink-application-form-model';

@IonicPage({
  segment: 'แบบประเมินความเสี่ยง'
})
@Component({
  selector: 'page-app-riskprofile',
  templateUrl: 'app-riskprofile.html',
})
export class AppRiskprofilePage{
  private prospect: ProspectModel = new ProspectModel;
  private refresh: boolean = true;
  private getQuotation: any;
  private appForm: UlinkApplicationFormM = new UlinkApplicationFormM;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appData: ApplicationData) {
      // รับค่าจากใบเสนอขาย
      this.getQuotation = this.appData.applicationMasterM.mcaapplicationM;
      console.log("getQuotation-->", this.getQuotation);
      this.getData(this.getQuotation);
    }

    private getData(getQuotation: any){
      if(typeof getQuotation != 'undefined'){
        //ส่งค่า prospect เข้า risk profile
        this.prospect.age = getQuotation.age;
        this.prospect.citizenID = getQuotation.identifyid;
        //ส่งค่า appform เข้า component riskprofile
        this.appForm.applicationid = getQuotation.applicationid;
      }
    }
}
