import { ProspectModel } from './../prospect/prospect-model';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Validators, FormControl } from '@angular/forms';
import { checkPersonalID } from '../utility/id-util';

/*
  Generated class for the ValidateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValidateProvider {

  constructor(private alertCtrl: AlertDirective) { }

  /**
   * @param value
   */
  public isEmpty(value: any) {
    if (value == null || value === '' || typeof value == 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param value
   */
  public isEmptyDate(value: any) {
    if (value === null) {
      return true;
    } else if (value.year === 0 || value.month === 0 || value.day === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param value
   */
  public validateDate(startDate: any, endDate: any) {
    if (!this.isEmptyDate(startDate) || !this.isEmptyDate(endDate)) {
      if (this.isEmptyDate(startDate)) {
        return false;
      } else if (this.isEmptyDate(endDate)) {
        return false;
      } else {
        if (startDate.year > endDate.year) {
          return false;
        } else if (startDate.year === endDate.year && startDate.month > endDate.month) {
          return false;
        } else if (startDate.year === endDate.year && startDate.month === endDate.month && startDate.day > endDate.day) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }

  public getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  public isValidMailFormat(control: FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { "Please provide a valid email": true };
    }

    return null;
  }


  /**
  * Function Validate Prospect => firstname, lastName, mobilephone(include check length), citizenId(include check length, format)
  * @param prospect ProspectModel 
  * @param checkMobileLength boolean (optional)
  * @param checkCitizenId boolean (optional)
  * @param checkCitizenIdFormat boolean (optional)
  * @returns boolean 
  */
  public validateProspect(prospect: ProspectModel, checkMobileLength?:boolean, checkCitizenId?:boolean, checkCitizenIdFormat?:boolean) : boolean{

    console.log('In validateProspect :: prospect --->', prospect);
    if(typeof(prospect.firstName) === "undefined" || prospect.firstName == "" || typeof(prospect.lastName) === "undefined" || prospect.lastName == ""){
      this.alertCtrl.warning("กรุณากรอกข้อมูลชื่อหรือนามสกุลให้ครบถ้วน");
      return false;

    }else if(typeof(prospect.mobilephone) === "undefined" || prospect.mobilephone == '') {
      this.alertCtrl.warning("กรุณากรอกข้อมูลเบอร์โทรศัพท์");
      return false;
    }

    if(checkMobileLength){
      if(prospect.mobilephone.trim().length < 10) {
        this.alertCtrl.warning("กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ครบถ้วน");
        return false;
      }
    }
    /**
     * ex. save
     */
    if(checkCitizenId){
      if((prospect.citizenID != '') && (typeof prospect.citizenID != 'undefined') && prospect.citizenID.length < 13){
        this.alertCtrl.warning('กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลัก');
          return false;
      }
      else if((prospect.citizenID != '') && (typeof prospect.citizenID != 'undefined') && prospect.citizenID.length == 13){
        
        if (!checkPersonalID(prospect.citizenID)) {
          this.alertCtrl.warning('เลขประจำตัวประชาชนไม่ถูกต้อง โปรดกลับไปแก้ไข');
          return false;
        }
        
      }
    }
    /**
     * ex getting refno
    */
    if(checkCitizenIdFormat){
      if((prospect.citizenID == '') || (typeof prospect.citizenID == 'undefined')){
        this.alertCtrl.warning("กรุณากรอกเลขบัตรประจำตัวประชาชน");
        return false;

      }else if (!checkPersonalID(prospect.citizenID)) {
        this.alertCtrl.warning('เลขประจำตัวประชาชนไม่ถูกต้อง โปรดกลับไปแก้ไข');
        return false;
      }
    }
    return true;
  }


}
