import { Component, Output, EventEmitter } from '@angular/core';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { NavController, NavParams } from 'ionic-angular';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import { Subscription } from '../../../../node_modules/rxjs';
import { LoadingDirective } from '../../../directives/extends/loading/loading';

@Component({
  selector: 'unit-link-plan',
  templateUrl: 'unit-link-plan.html'
})
export class UnitLinkPlanComponent {

  text: string;

   /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private prospect: ProspectModel;
  public countChecked:number = 0;
  public ulinkCheckbox = {
    deposit: false,
    governmentbonds: false,
    fixedincome: false,
    stock: false
  }

  private subscription: Array<Subscription> = [];

  constructor( private navCtrl: NavController, 
    private navParams: NavParams,
    private broadcaster: Broadcaster,
    private unitlinkData: UnitlinkDataProvider,
    private loadingCtrl: LoadingDirective) {
      this.prospect = this.navParams.get('prospect');
      this.unitlinkData.prospectUlinkExpreiene_open = false;
    }

  ngOnInit(){
    this.subscription.push(
      this.broadcaster.on('prospect').subscribe(res => {
        this.prospect = res;
      })
    );
     //reset flag data
     this.subscription.push(
      this.broadcaster.on('resetCheckBoxUlink').subscribe(res => {
        if(res == true){
          this.resetData();
        }
      })
    )

    if(typeof this.prospect.customerID != 'undefined') {
      this.setEditCheckBox();
    }
  }


  ngOnDestroy(){
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }


  onChange(event : any) {
    if(this.ulinkCheckbox.deposit){
      this.unitlinkData.deposit = 'Y';
    }else if(this.ulinkCheckbox.deposit === false){
      this.unitlinkData.deposit = 'N';
    }
    // พันธบัตรรัฐบาล
    if(this.ulinkCheckbox.governmentbonds){
      this.unitlinkData.governmentbonds = 'Y';
    }else if(this.ulinkCheckbox.governmentbonds === false){
      this.unitlinkData.governmentbonds = 'N';
    }
    // หุ้นกู้
    if(this.ulinkCheckbox.fixedincome){
      this.unitlinkData.fixedincome = 'Y';
    }else if(this.ulinkCheckbox.fixedincome === false){
      this.unitlinkData.fixedincome = 'N';
    }
    // หุ้นสามัญ
    if(this.ulinkCheckbox.stock){
      this.unitlinkData.stock = 'Y';
    }else if(this.ulinkCheckbox.stock === false){
      this.unitlinkData.stock = 'N';
    }

    this.broadcaster.broadcast('ulinkCheckbox', this.ulinkCheckbox);
  }

  private async setEditCheckBox(){
    this.loadingCtrl.present();
    let data = await this.unitlinkData.searchprospectUlinkExpreiene(this.prospect.customerID);
      if(typeof data != 'undefined'){
        this.unitlinkData.prospectUlinkExpreiene_open = true;
        //set value checkbox
        this.unitlinkData.deposit = data.deposit;
        this.unitlinkData.governmentbonds = data.governmentbonds;
        this.unitlinkData.fixedincome = data.fixedincome;
        this.unitlinkData.stock = data.stock;
        
        // เงินฝากธนาคาร
        if(data.deposit === 'Y'){
          this.ulinkCheckbox.deposit = true;
        }else if(data.deposit === 'N'){
          this.ulinkCheckbox.deposit = false;
        }
        // พันธบัตรรัฐบาล
        if(data.governmentbonds === 'Y'){
          this.ulinkCheckbox.governmentbonds = true;
        }else if(data.governmentbonds = 'N'){
          this.ulinkCheckbox.governmentbonds = false;
        }
        // หุ้นกู้
        if(data.fixedincome === 'Y'){
          this.ulinkCheckbox.fixedincome = true;
        }else if(data.fixedincome === 'N'){
          this.ulinkCheckbox.fixedincome = false;
        }
        // หุ้นสามัญ
        if(data.stock === 'Y'){
          this.ulinkCheckbox.stock = true;
        }else if(data.stock === 'N'){
          this.ulinkCheckbox.stock = false;
        }
        await this.broadcaster.broadcast('ulinkCheckbox', this.ulinkCheckbox);
      }
    this.loadingCtrl.dismiss();
  }

  private resetData(): void {
    this.ulinkCheckbox = {
      deposit: false,
      governmentbonds: false,
      fixedincome: false,
      stock: false
    }
    this.broadcaster.broadcast('ulinkCheckbox', this.ulinkCheckbox);
  }
}