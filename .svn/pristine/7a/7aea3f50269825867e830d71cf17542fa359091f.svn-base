import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { QuatationSignatureFormComponent } from '../../form/quatation-signature-form/quatation-signature-form';
import { NavParams } from 'ionic-angular/navigation/nav-params';

/**
 * Generated class for the ConditionSignatureComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'condition-signature',
  templateUrl: 'condition-signature.html'
})
export class ConditionSignatureComponent {

  private explortData;
  private chkbox: boolean = false;
  private pageTotal : number = 0;

  constructor(private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private navParam: NavParams) {
    this.explortData = navParam.data;
    this.pageTotal = navParam.data.pageTotal;
  }

  close() {
    this.viewCtrl.dismiss('');
  }

  next() {
    this.close();
    let modal = this.modalCtrl.create(QuatationSignatureFormComponent,this.explortData);
    modal.present();
  }

}
