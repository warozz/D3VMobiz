import { Component, EventEmitter, Output } from '@angular/core';
import { ViewController, NavParams, ModalController } from 'ionic-angular';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ExampleBenefitModel } from "./../../../providers/ulink-benefit/example-benefit-model/example-benefit";
import _ from "lodash"
import * as moment from 'moment';
/**
 * Generated class for the MemberViewDataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-example-benefit',
  templateUrl: 'popup-example-benefit.html'
})
export class PopupExampleBenefitComponent {
  
  private benefit: ExampleBenefitModel
  private prospect: any = [];
  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    ) {
      console.log('this.params.data.data', this.params.data.data)
      const { data, prospect } = this.params.data;
      this.setModel(data);
      this.setPospect(prospect);
      console.log('this.benefit',this.benefit)
      console.log('this.setPospect',this.prospect)
    }
  
  protected setModel(data)
  {
    this.benefit = data;
    const issuedate = String(moment(data.issuedate).locale('th').format('DD/MMM/YYYY H:mm:ss'))
    this.benefit = {
      ...this.benefit,
      issuedate: issuedate
    };
  }
  protected setPospect(data)
  {
    this.prospect = data;
  }

  public close(){
    this.viewCtrl.dismiss('');
  }
  
}
