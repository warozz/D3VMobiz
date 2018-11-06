import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams} from 'ionic-angular';
import { Broadcaster } from './../../../providers/utility/broadcaster';
import { ProspectModel } from './../../../providers/prospect/prospect-model';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-quatation-riskprofile',
  templateUrl: 'quatation-riskprofile.html',
})
export class QuatationRiskprofilePage {

  private prospect: ProspectModel;

  private subscription: Array<Subscription> = [];

  private refresh: boolean;

  constructor(
    public navCtrl: NavController,
    private broadcaster: Broadcaster,
    private navParams: NavParams,
    
    )  {
      this.prospect = this.navParams.get('prospect');

      this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
        this.prospect = JSON.parse(JSON.stringify(res));
      }));

      this.subscription.push(this.broadcaster.on('choose_step').subscribe(res => {
        this.refresh = res == 2;
      })); 
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }
}