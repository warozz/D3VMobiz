import { Subscription } from "rxjs/Rx";
import { Broadcaster } from "./../../../providers/utility/broadcaster";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
} from "ionic-angular";

import { UlinkAppDataProvider } from "../../../providers/ulink-app-data/ulink-app-data";
import { ProspectModel } from "../../../providers/prospect/prospect-model";

@IonicPage()
@Component({
  selector: "page-quatation-allocation",
  templateUrl: "quatation-allocation.html"
})
export class QuatationAllocationPage implements OnDestroy {
  private toggle_footer: boolean = false;
  private planCode: string = "";
  private subscription: Array<Subscription> = [];

  /**
   * prospect
   */
  private prospect: ProspectModel = new ProspectModel();


  constructor(
    private broadcaster: Broadcaster,
    private navCtrl: NavController,
    private ulinkBenefitData: UlinkAppDataProvider,
    public navParams: NavParams
  ) {

    this.prospect = this.navParams.get('prospect');

    this.subscription.push(
      this.broadcaster.on("choose_step").subscribe(res => {
        if (res == 3) {
          console.log('choose_step => res',res)
          this.toggle_footer = true;
        }
      })
    );
    //เมื่อมีการกดเปลี่ยน tlPlan
    this.subscription.push(
      this.broadcaster.on("tlPlan").subscribe(res => {
        console.log('tlPlan => res',res)
        if (res) {
          this.planCode = res;
        }
      })
    );

    this.subscription.push(
      this.broadcaster.on('prospect').subscribe(res => {
        console.log('prospect => res',res);
        this.prospect = res;
      })
    );

    //ถ้าข้อมูลจาก broadcaster โหลดมาไม่ทัน
    this.planCode = this.ulinkBenefitData.planCode;
  }
  ngOnDestroy(): void {
    this.subscription.forEach((item) => {
      item.unsubscribe();
    });
  }
}
