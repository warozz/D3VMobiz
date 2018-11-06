import { Component } from '@angular/core';
import { IonicPage, Content, Modal, ModalController, ModalOptions} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PopupFatcaComponent } from '../../../../components/utility/popup-fatca/popup-fatca';
import { ApplicationData } from '../../../../providers/application/application-data';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-app-treatment-history',
  templateUrl: 'app-treatment-history.html',
})
export class AppTreatmentHistoryPage {
  private subscription: Array<Subscription> = [];
  private appTreatmentHistory : FormGroup;
  private disabledAgreeTerm = true;
  private hiddenAgreeTerm = false;
  private tempAgreementFATCA = false;

  constructor(
    private content         : Content,
    private fb              : FormBuilder,
    private modalCtrl       : ModalController,
    private appsData        : ApplicationData
  ) {
    this.appTreatmentHistory = this.fb.group({
      nationcheck : ['',Validators.required],
      nationality : [''],
      nationalityAddress: ['',Validators.required],
      nationalityTax: ['',Validators.required],
      nationalityStatus: ['',Validators.required],
      agreeTerm: ['',Validators.requiredTrue],
      selectAgreeTerm: false
    });
    this.appsData.appTreatmentHistory = this.appTreatmentHistory;

    this.appsData.getData().then((res) => {
      // debugger;
      const {applicationAnswerMs} = res;
      
      if(applicationAnswerMs) {
        const ans64 = this.getAnswerQ(applicationAnswerMs, '64');
        const ans65 = this.getAnswerQ(applicationAnswerMs, '65');
        const ans66 = this.getAnswerQ(applicationAnswerMs, '66');
        const ans67 = this.getAnswerQ(applicationAnswerMs, '67');
        this.appTreatmentHistory.controls['nationcheck'].setValue(ans64.answeryn);
        this.appTreatmentHistory.controls['nationality'].setValue(ans64.answerdesc);
        this.appTreatmentHistory.controls['nationalityAddress'].setValue(ans65.answeryn);
        this.appTreatmentHistory.controls['nationalityTax'].setValue(ans66.answeryn);
        this.appTreatmentHistory.controls['nationalityStatus'].setValue(ans67.answeryn);
        
        this.appsData.selectAgreeTerm(this.appsData.getQuotation().customerid, this.appsData.getQuotation().referenceno);
      }
    }, 
    (err)=> {
      console.log('Err : ', err);
    });

    this.subscription.push(this.appTreatmentHistory.controls['nationcheck'].valueChanges.subscribe(() => {
      // debugger;
      if(this.appTreatmentHistory.controls['nationcheck'].value == 'Y') {
        
        this.appTreatmentHistory.controls['nationality'].setValidators([Validators.required]);
        this.appTreatmentHistory.controls['nationality'].setValue('');
      } else {
        this.appTreatmentHistory.controls['nationality'].clearValidators();
        this.appTreatmentHistory.controls['nationality'].setValue('');
      }
    }));
  }

  private getAnswerQ = (array,id) => 
    array
      .filter( item => item.questionid == id)
      .reduce( item => item.questionid == id);

  private scrollToCenter () {
    this.content.scrollTo(0, 300, 500);
  }
  
  private callModalFATCA() {
    // if(!this.appTreatmentHistory.valid) return false;
    const modalOption: ModalOptions = {
      enableBackdropDismiss: false
    }
    const data = {
      tempAgreementFATCA : this.tempAgreementFATCA
    }
    const modal: Modal = this.modalCtrl.create(PopupFatcaComponent, {data: data}, modalOption);
    modal.present();

    modal.onDidDismiss( data => {
      if(data && data.agreementFATCA) {
        // เพ่ิม Y
        this.appsData.updateAgreeTerm(this.appsData.getQuotation().customerid, this.appsData.getQuotation().referenceno, 'Y');
        // this.updateAgreeTerm(this.appsData.getQuotation().customerid, this.appsData.getQuotation().referenceno);
        this.disabledAgreeTerm = !data.agreementFATCA;
        this.tempAgreementFATCA = data.agreementFATCA;
        // this.appTreatmentHistory.controls['agreeTerm'].enable();
        this.appTreatmentHistory.controls['agreeTerm'].setValue(true);
      } else {
        // เพ่ิม Nasdsad
        this.appsData.updateAgreeTerm(this.appsData.getQuotation().customerid, this.appsData.getQuotation().referenceno, 'N');
        this.disabledAgreeTerm = !data.agreementFATCA;
        this.tempAgreementFATCA = data.agreementFATCA;
        // this.appTreatmentHistory.controls['agreeTerm'].disable();
        this.appTreatmentHistory.controls['agreeTerm'].setValue(false);
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }  

}
