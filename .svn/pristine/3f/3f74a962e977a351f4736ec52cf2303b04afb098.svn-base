import { ApplicationData } from "./application-data";
import { FormArray, FormGroup } from "@angular/forms";

export class CopyAddress {

  public addressfield = {
    
    beneficiary : ['addressno', 'buildingname', 'moo', 'soi', 
      'road', 'district', 'subdistrict', 'province', 'postcode'
    ],
    beneficiary_select : 'address',
    currentP : ['permanentAddressNo', 'permanentVillage', 'permanentMoo', 'permanentSoi', 
      'permanentRoad', 'district', 'subdistrict', 'province', 'postcode',
      'permanentTelNo', 'permanentCountry', 'permanentMobileNo', 'permanentAddressEmail'
    ],
    currentP_select : 'permanentAddress',

    currentC : ['currentAddressNo', 'currentVillage', 'currentMoo', 'currentSoi', 
      'currentRoad', 'district', 'subdistrict', 'province', 'postcode',
      'currentTelNo','currentCountry', 'currentMobileNo','currentEmail'
    ],
    currentC_select : 'currentAddress',

    currentW : ['companyAddressNo', 'companyVillage', 'companyMoo', 'companySoi', 
      'companyRoad', 'district', 'subdistrict', 'province', 'postcode', 
      'companyTelNo','companyCountry'
    ],
    currentW_select : 'companyAddress',
  }

  public constructor(){
  }

  /**
   * copy ที่อยู่ของผู้เอาประกันจาก ทะเบียนบ้านไปที่อยู่ปัจจุบัน
   */
  public copyApplicaitonAddressCurrent(appData : ApplicationData) : void {
    const currentC : FormGroup = appData.appAddressC;
    const currentP : FormGroup = appData.appAddressP;

    if(currentC.controls['contactaddresscd_copy'].value =='P'){
      this.enableField(this.addressfield.currentC, currentC);
      this.copyAddress(currentC, currentP, 
          this.addressfield.currentC, this.addressfield.currentP,
          this.addressfield.currentC_select, this.addressfield.currentP_select)
      this.disableField(this.addressfield.currentC, currentC);
    }
  }

  /**
   * copy ที่อยู่ของผู้เอาประกันจาก ทะเบียนบ้าน หรือ อยู่ปัจจุบัน ไปที่อยู่ที่ทำงาน
   */
  public copyApplicaitonAddressWork(appData : ApplicationData) : void {
    const currentC : FormGroup = appData.appAddressC;
    const currentP : FormGroup = appData.appAddressP;
    const currentW : FormGroup = appData.appAddressW;

    if(currentW.controls['contactaddresscd_copy'].value =='P'){
      this.enableField(this.addressfield.currentW, currentW);
      this.copyAddress(currentW, currentP, 
          this.addressfield.currentW, this.addressfield.currentP,
          this.addressfield.currentW_select, this.addressfield.currentP_select)
      this.disableField(this.addressfield.currentW, currentW);
    }
    else if(currentW.controls['contactaddresscd_copy'].value =='C'){
      this.enableField(this.addressfield.currentW, currentW);
      this.copyAddress(currentW, currentC, 
          this.addressfield.currentW, this.addressfield.currentC,
          this.addressfield.currentW_select, this.addressfield.currentC_select)
      this.disableField(this.addressfield.currentW, currentW);
    }
  }

    /**
   * copy ที่อยู่ของ ผู้เอาประกัน จาก ทะเบียนบ้าน หรือ อยู่ปัจจุบัน หรือ ที่อยู่ที่ทำงาน ไปให้ ผู้รับผลประโยชน์ 
   */
  public copyAddressBeneficiary(appData : ApplicationData) : void {

    const currentP : FormGroup = appData.appAddressP;
    const currentC : FormGroup = appData.appAddressC;
    const currentW : FormGroup = appData.appAddressW;
    const beneficiary = appData.appBeneficiary;
    const contactaddresscd = appData.appGeneral.value.contactaddresscd;

    let arr = <FormArray>beneficiary.controls['beneficiaryData'];
    for(let i = 0 ; i < arr.length ;i++){
      let beneficiary : FormGroup = <FormGroup>arr.at(i);
      if(beneficiary.get('addressContact').value == 'P'){
        this.copyAddressBeneficiary_sub(beneficiary, currentP, 
          this.addressfield.beneficiary, this.addressfield.currentP,
          this.addressfield.beneficiary_select, this.addressfield.currentP_select
        );
      }
      else if(beneficiary.get('addressContact').value == 'C'){
        if(contactaddresscd =='P')
        {
          this.copyAddressBeneficiary_sub(beneficiary, currentP, 
            this.addressfield.beneficiary, this.addressfield.currentP,
            this.addressfield.beneficiary_select, this.addressfield.currentP_select
          );
        }
        else if(contactaddresscd =='C')
        {
          this.copyAddressBeneficiary_sub(beneficiary, currentC, 
            this.addressfield.beneficiary, this.addressfield.currentC,
            this.addressfield.beneficiary_select, this.addressfield.currentC_select
          );
        }
        else if(contactaddresscd =='W')
        {
          this.copyAddressBeneficiary_sub(beneficiary, currentW, 
            this.addressfield.beneficiary, this.addressfield.currentW,
            this.addressfield.beneficiary_select, this.addressfield.currentW_select
          );
        }
      }
    }
  }
  /**
   * copy ข้อมูลที่อยู่ผู้รับผลประโยชน์จากที่อยู่ตามทะเบียบบ้าน
   */
  private copyAddressBeneficiary_sub(beneficiary : FormGroup,  address : FormGroup, 
    beneficiary_fieldname : string[], address_fieldname : string[],
    select_beneficiary_fieldname : string, select_address_fieldname : string
    ){
    this.enableField(beneficiary_fieldname, beneficiary);
    this.copyAddress(beneficiary, address, beneficiary_fieldname, address_fieldname, select_beneficiary_fieldname, select_address_fieldname)
    this.disableField(beneficiary_fieldname, beneficiary);
  }

  /**
   * copy ข้อมูลที่อยุ่
   */
  private copyAddress(to_form : FormGroup,  from_form : FormGroup, 
    to_fieldname : string[], form_fieldname : string[],
    select_to_fieldname : string, select_form_fieldname : string
    ){

    for(let i = 0; i < to_fieldname.length && i < form_fieldname.length; i++){
      to_form.controls[to_fieldname[i]].setValue(from_form.controls[form_fieldname[i]].value);
    }

    to_form.controls[select_to_fieldname].setValue({
      addressSelected : {
        province_name: from_form.controls[select_form_fieldname].value.addressSelected.province_name,
        tambon_name: from_form.controls[select_form_fieldname].value.addressSelected.tambon_name,
        amphur_name: from_form.controls[select_form_fieldname].value.addressSelected.amphur_name,
        zip: from_form.controls[select_form_fieldname].value.addressSelected.zip
      }
    });
  }

  /**
   * clear ที่อยู่ให้เป็นค่าว่าง
   */
  public clearAddress(form : FormGroup, fieldname : string[], select_fieldname : string){
    this.enableField(fieldname, form);

    for(let i = 0; i < fieldname.length; i++){
      form.controls[fieldname[i]].setValue('');
    }

    form.controls[select_fieldname].setValue({
      addressSelected : {
        province_name: '',
        tambon_name: '',
        amphur_name: '',
        zip: ''
      }
    });
  }


  /**
   * enable ที่อยู่
   */
  public enableField(field : string[], address : FormGroup){
    for(let j = 0; j < field.length; j++){
      address.controls[field[j]].enable();
    }
  }
  public disableField(field : string[], address : FormGroup){
    for(let j = 0; j < field.length; j++){
      address.controls[field[j]].disable();
    }
  }
}