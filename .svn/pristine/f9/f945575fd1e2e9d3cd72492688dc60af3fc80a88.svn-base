import { Component } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl} from '@angular/forms';
import { ApplicationData } from '../../../../providers/application/application-data';
import { HttpClient } from '@angular/common/http';
import { ApplicationMasterM } from '../../../../providers/application/application-master-model';
import moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-app-history',
  templateUrl: 'app-history.html',
})
export class AppHistoryPage {
  appHistory: FormGroup;
  private companyDropdown;
  private maxDate;
  constructor(
    private content: Content,
    private fb: FormBuilder,
    private http: HttpClient,
    private appsData: ApplicationData) {
    this.maxDate = moment().format('YYYY-MM-DD');
    this.appHistory = this.fb.group({

      otherinsuranceyn: [null, Validators.required],
      insurancerejectionflag: [null, Validators.required],

      insuranceRejectionData: this.fb.array([]),
      otherInsuranceData: this.fb.array([]),
  });

    this.http.get('assets/json/application/companyJson.json')
    .subscribe(data => {
      this.companyDropdown = data;
      this.companyDropdown = this.companyDropdown.company;
     });
    // ส่งข้อมูลไปเก็บที่ provider
    this.appsData.appHistory = this.appHistory;
  }


  ngOnInit() {

    //get data for edit
    this.appsData.getData().then((res: ApplicationMasterM) => {
      if(res) {

        if(res.mcaapplicationM){

          this.appHistory.get('otherinsuranceyn').setValue(res.mcaapplicationM.otherinsuranceyn);
          this.appHistory.get('insurancerejectionflag').setValue(res.mcaapplicationM.insurerejectionflag);
        }

        if (res.otherinsuranceMs.length > 0) {
          for(let data of res.otherinsuranceMs){
            this.addOtherInsuranceData(data);
          }
        }

        if (res.insurancerejectionsMs.length > 0) {
          for (let data of res.insurancerejectionsMs) {
            this.addInsuranceRejection(data);
          }
        }
      }
    }, 
    (err)=> {
      console.log('Err : ', err);
    });
  }

  get other_insurance_yn() {
    return this.appHistory.get('other_insurance_yn');
  }

  scrollToCenter () {
    this.content.scrollTo(0, 100, 500);
  }
  scrollToBot () {
    this.content.scrollTo(0, 300, 500);
  }

  private otherInsuranceDataSumRows(data?: any): FormGroup {

    return this.fb.group({

      company: [data ? data.companycode == '99' ? data.companycode+':อื่นๆ' : (data.companycode == '' && data.company == '' ? '' : data.companycode + ':' + data.company) : '', Validators.required],
      company_desc : [{value : data ? data.companydesc : '', disabled: data ? data.companycode != '99' : true}, Validators.required],
      accident_amount : [data ? data.accidentamount : '', Validators.required],
      life_amount : [data ? data.lifeamount : '', Validators.required],
      compensation_daily : [data ? data.compensationdaily : '', Validators.required],
      critical_illness_amount : [data ? data.criticalillnessamount : '', Validators.required],
      contract_effective_flag : [data ? data.contracteffectiveflag : '', Validators.required],
      typeform: data ? data.typeform : 'PER'// PER=ทั่วไป, KB=คบ

    });
  }

  /**
   * เพิ่ม ประวัตฺการถูกปฏิเสธ
   */
  private addOtherInsuranceData(data?: any): void {
    const control: FormArray = <FormArray>this.appHistory.controls['otherInsuranceData'];
    control.push(this.otherInsuranceDataSumRows(data));
  }

  /**
   * ลบ ประวัติการถูกปฏิเสธ
   */
  private removeOtherInsuranceData(index: number): void {
    const control: FormArray = <FormArray>this.appHistory.controls['otherInsuranceData'];
    control.removeAt(index);

  }

  /**
   * ล้างค่า
   */
  private resetOtherInsuranceData(): void {

    const control: FormArray = <FormArray>this.appHistory.controls['otherInsuranceData'];
    while (control.length != 0) {
      control.removeAt(0)
    }
  }

  private insuranceRejectionSumRows(data?: any): FormGroup {

    return this.fb.group({
      //ชื่อบริษั่ทประกัน
      company: [data ? data.companycode == '99' ? data.companycode+':อื่นๆ' : (data.companycode == '' && data.company == '' ? '' : data.companycode + ':' + data.company) : '', Validators.required],
      // ชื่อบริษัทประกัน อื่นๆ
      company_desc:  [{value : data ? data.companydesc : '', disabled: data ? data.companycode != '99' : true}, Validators.required],
      reject_date: [data ? data.rejectdate : '', Validators.required],
      description: [data ? data.description : '', Validators.required],
      typeform: data ? data.typeform : 'PER'// PER=ทั่วไป, KB=คบ
    });
  }

  /**
   * เพิ่ม ประวัตฺการถูกปฏิเสธ
   */
  private addInsuranceRejection(data?: any): void {
    const control: FormArray = <FormArray>this.appHistory.controls['insuranceRejectionData'];
    control.push(this.insuranceRejectionSumRows(data));
  }

  /**
   * ลบ ประวัติการถูกปฏิเสธ
   */
  private removeInsuranceRejection(index: number): void {
    const control: FormArray = <FormArray>this.appHistory.controls['insuranceRejectionData'];
    control.removeAt(index);
  }

  /**
   * ล้างค่า
   */
  private resetInsuranceRejection(): void {

    const control: FormArray = <FormArray>this.appHistory.controls['insuranceRejectionData'];
    while (control.length != 0) {
      control.removeAt(0)
    }
  }

  /**
   * เปลี่ยนค่า dropdown บริษัท
   */
  private companyChange(company: string, type: number, index: number) {

    const control: FormArray = type == 1 ? <FormArray>this.appHistory.controls['otherInsuranceData'] : <FormArray>this.appHistory.controls['insuranceRejectionData'];
    if (company == '99:อื่นๆ')
      control.at(index).get('company_desc').enable();
    else {
      control.at(index).get('company_desc').setValue('');
      control.at(index).get('company_desc').disable();
    }
  }
}
