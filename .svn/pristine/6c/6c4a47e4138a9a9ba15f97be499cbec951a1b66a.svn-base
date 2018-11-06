import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {ConstantConfig} from '../../../providers/utility/constant-config';
import { ApplicationData } from './../../../providers/application/application-data';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AppInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-info',
  templateUrl: 'app-info.html'
})
export class AppInfoComponent {

  
  appApplication: FormGroup;
  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private appData: ApplicationData,
  ) {
    this.appApplication = this.fb.group({
      referenceno: { value: '', disabled: true },
      branchId: { value: '', disabled: true },
      dopositno: { value: '', disabled: true },
      healthcheckflag: '',
      bname: { value: '', disabled: true },
      bperid: { value: '', disabled: true },
      dname: { value: '', disabled: true },
      dperid: { value: '', disabled: true },
    }); 
   this.storage.get(ConstantConfig.SALE_INFO_KEY).then(objM => {

      console.log('objM : ', objM);
      if (objM != undefined) {
        if (objM.strid.startsWith('B')) {
          this.appApplication.controls['bperid'].setValue(objM['personID']);
          this.appApplication.controls['dperid'].setValue(objM['uPersonId']);
          this.appApplication.controls['bname'].setValue(objM['firstName'] + ' ' + objM['lastName']);
          this.appApplication.controls['dname'].setValue(objM['uFirstName'] + ' ' + objM['uLastName']);
        }
        else {
          this.appApplication.controls['bperid'].setValue(objM['personID']);
          this.appApplication.controls['dperid'].setValue(objM['personID']);
          this.appApplication.controls['bname'].setValue(objM['firstName'] + ' ' + objM['lastName']);
          this.appApplication.controls['dname'].setValue(objM['firstName'] + ' ' + objM['lastName']);
        }

        this.appApplication.controls['branchId'].setValue(objM['branchCode']);
        this.appApplication.controls['dopositno'].setValue(objM['depositNo']);
      }
    });
    
    this.appApplication.controls['referenceno'].setValue(this.appData.getQuotation().referenceno);
    if (this.appData.getQuotation().healthcheckflag == 'Y') {
      this.appApplication.controls['healthcheckflag'].setValue('ตรวจสุขภาพ');
    } 
    else {
      this.appApplication.controls['healthcheckflag'].setValue('ไม่ตรวจสุขภาพ');
    }
  }
}
