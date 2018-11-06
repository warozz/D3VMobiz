import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import {ProspectModel, } from '../../../providers/prospect/prospect-model';
import { ExampleBenefitModel } from '../../../providers/ulink-benefit/example-benefit-model/example-benefit';
import { ExampleChildModel } from '../../../providers/ulink-benefit/example-benefit-model/example-child';
import { UnitlinkDataProvider } from '../../../providers/ulink-app-data/unitlink-data';
import { Broadcaster } from '../../../providers/utility/broadcaster';

@IonicPage()
@Component({
  selector: 'page-ulink-child',
  templateUrl: 'ulink-child.html',
})
export class UlinkChildPage {

  private ulinkChild: FormGroup;
  private prospect:ProspectModel =  new ProspectModel();
  private child: boolean = false;
  
  constructor(
  
    private fb: FormBuilder,
    private ulinkData: UlinkAppDataProvider,
    private navParams:NavParams,
    private broadcaster: Broadcaster,
    private unitlinkData: UnitlinkDataProvider
   
  ) {
    this.prospect = this.navParams.get('prospect');

    this.ulinkChild = this.fb.group({
      // คำนำหน้า
      pname: ['', Validators.required],
      // ชื่อ
      fname: ['', Validators.required],
      // นามสกุล
      lname: ['', Validators.required],
      // เพศ
      sex:  ['', Validators.required],
      // อายุปัจจุบัน
      agestart: [null, Validators.required],
      // การคุ้มครองถึงอายุ
      ageend: [null, Validators.required],
    });
    this.ulinkData.ulinkChild = this.ulinkChild;

    if(this.unitlinkData.editData){
      this.setEditData();
    }
   

  }

  ngAfterViewInit(): void {
    this.ulinkChild.get('agestart').valueChanges.subscribe(data => { 
      //console.log("agestart ===> ",data);
      this.child = data > 14 ? false: true;
      this.checkPreName();
      this.choosePreNameByAgeAndSex();

      this.broadcaster.broadcast('investBenefitResetData', true);
    });

    this.ulinkChild.get('ageend').valueChanges.subscribe(data => { 
      this.broadcaster.broadcast('investBenefitResetData', true);
    });
  }

  private checkPreName(): void {
    if (Number(this.ulinkChild.get('agestart').value) > 14) {
      switch (this.ulinkChild.get('pname').value) {
        case 'เด็กชาย' :
        this.ulinkChild.get('pname').setValue('นาย');
          break;
        case 'เด็กหญิง':
        this.ulinkChild.get('pname').setValue('นางสาว');
      }
    }
      // เด็ก
      else {
        switch (this.ulinkChild.get('pname').value) {
          case 'นาย':
          this.ulinkChild.get('pname').setValue('เด็กชาย');
            break;
          case 'นาง': case 'นางสาว':
          this.ulinkChild.get('pname').setValue('เด็กหญิง');
        }
      }
  }

  private choosePreNameByAgeAndSex(): void {
    if(this.ulinkChild.get('pname').value == 'เด็กชาย' || this.ulinkChild.get('pname').value == 'นางสาว' ||
    this.ulinkChild.get('pname').value == 'นาย' || this.ulinkChild.get('pname').value == 'นางสาว'){
      if (this.child) {
        switch (this.ulinkChild.get('sex').value) {
          case 'M':
          this.ulinkChild.get('pname').setValue('เด็กชาย');
            break;
          case 'F':
          this.ulinkChild.get('pname').setValue('เด็กหญิง');
        }
      }
      else {
        switch (this.ulinkChild.get('sex').value) {
          case 'M' :
          this.ulinkChild.get('pname').setValue('นาย');
            break;
          case 'F':
          this.ulinkChild.get('pname').setValue('นางสาว');
        }
      }
    }
  }

  private setEditData() {
    console.log('set Edit Data --->Child');
    let exampleBenefit : ExampleBenefitModel = this.ulinkData.getExampleBenefit();
    if(typeof exampleBenefit  != 'undefined'){

      if(exampleBenefit['benefitname'] == 'educate'){

        let exampleChild : ExampleChildModel = exampleBenefit.examplechild;
        this.ulinkChild.get('pname').setValue(exampleChild.pname);
        this.ulinkChild.get('fname').setValue(exampleChild.fname);
        this.ulinkChild.get('lname').setValue(exampleChild.lname);
        this.ulinkChild.get('sex').setValue(exampleChild.sex);
        this.ulinkChild.get('agestart').setValue(exampleChild.agestart);
        this.ulinkChild.get('ageend').setValue(exampleChild.ageend);
        // this.ulinkChild = this.fb.group({
        //   pname: [ exampleChild.pname, Validators.required],
        //   fname: [exampleChild.fname, Validators.required],
        //   lname: [exampleChild.lname, Validators.required],
        //   sex:  [exampleChild.sex, Validators.required],
        //   agestart: [exampleChild.agestart, Validators.required],
        //   ageend: [exampleChild.ageend, Validators.required],
        // });
        // this.ulinkData.ulinkChild = this.ulinkChild;
      }

    }
  }

  /**
   * เปิด ปิด เพศ
   * @param disable 
   */
  private disabledSex(disable: boolean) {
    if (disable)
      this.ulinkChild.controls['sex'].disable();
    else
      this.ulinkChild.controls['sex'].enable();
  }
}
