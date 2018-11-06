import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { ApiProvider } from "../../../../../providers/api/api";       
import { AddressM } from '../../../../../providers/service-table/address-model';
import { ApplicationData } from '../../../../../providers/application/application-data';
/**
 * Generated class for the AppGePermanentAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-ge-permanent-address',
  templateUrl: 'app-ge-permanent-address.html',
})
export class AppGePermanentAddressPage {

  appGeneral: FormGroup;
  public temp;
  public permanentAddressData =[];
  public appData = this.appDatas.getQuotation();
  public countryDropdown;

  constructor(private cdRef:ChangeDetectorRef, private http: HttpClient,public navCtrl: NavController,private fb: FormBuilder, public navParams: NavParams, private apiProvider: ApiProvider, private appDatas: ApplicationData) {
    this.http.get('assets/json/application/countryJson.json') 
    .subscribe(data => {
      this.countryDropdown = data;
      this.countryDropdown = this.countryDropdown.country;
     });

     this.appGeneral = this.fb.group({
        permanentAddress:
        [{
          addressSelected: {
            province_name: this.appData.prospectM.province,
            tambon_name: this.appData.prospectM.subdistrict,
            amphur_name: this.appData.prospectM.district,
            zip: this.appData.prospectM.postcode
          }
        }, Validators.required],
        district: [this.appData.prospectM.district,Validators.required],
        province: [this.appData.prospectM.province,Validators.required],
        subdistrict: [this.appData.prospectM.subdistrict,Validators.required],
        postcode: [ this.appData.prospectM.postcode,Validators.required],
        permanentAddressId:'',
        permanentAddressNo: [this.appData.prospectM.addressno, Validators.required],
        permanentVillage: this.appData.prospectM.buildingname,
        permanentMoo: this.appData.prospectM.moo,
        permanentSoi: this.appData.prospectM.soi,
        permanentRoad: this.appData.prospectM.road,
        permanentTelNo: this.appData.prospectM.telephone,
        permanentCountry: ['',Validators.required],
        permanentMobileNo : [{ value: this.appData.prospectM.mobilephone, disabled: true }, Validators.required],
        permanentAddressEmail : [this.appData.prospectM.email, Validators.compose([Validators.required, Validators.email])]
    });

    this.appDatas.appAddressP = this.appGeneral;

    this.appDatas.getData('addressMs').then((res: Array<AddressM>) => {
      if (res.length > 0) {
        let address:  Array<AddressM> = res.filter(item => item.type == 'P');
        if (address[0].addressno)
          this.appGeneral.controls['permanentAddressNo'].setValue(address[0].addressno);
  
        this.appGeneral.controls['permanentVillage'].setValue(address[0].buildingname);
        this.appGeneral.controls['permanentMoo'].setValue(address[0].moo);
        this.appGeneral.controls['permanentSoi'].setValue(address[0].soi);
        this.appGeneral.controls['permanentRoad'].setValue(address[0].road);
  
        if (address[0].subdistrict || address[0].district || address[0].province || address[0].postcode) {
          this.appGeneral.controls['permanentAddress'].setValue({
            addressSelected: {
              province_name: address[0].province,
              tambon_name: address[0].subdistrict,
              amphur_name: address[0].district,
              zip: address[0].postcode
            }
          });
          this.appGeneral.controls['postcode'].setValue(address[0].postcode);
          this.appGeneral.controls['subdistrict'].setValue(address[0].subdistrict);
          this.appGeneral.controls['province'].setValue(address[0].province);
          this.appGeneral.controls['district'].setValue(address[0].district);
        }
  
        if (address[0].telno)
          this.appGeneral.controls['permanentTelNo'].setValue(address[0].telno);
        this.appGeneral.controls['permanentCountry'].setValue(address[0].country);
  
        if (address[0].mobileno)
          this.appGeneral.controls['permanentMobileNo'].setValue(address[0].mobileno);
        if (address[0].email)
          this.appGeneral.controls['permanentAddressEmail'].setValue(address[0].email);
      }
      else {
        this.appGeneral.controls['permanentCountry'].setValue('TH');
      }

    }, 
    (err) => {
      this.appGeneral.controls['permanentCountry'].setValue('TH');
    });
  }
  ngAfterViewChecked(){
    // this.dateNow = new Date();
   
     this.cdRef.detectChanges();
   
   }
  get subdistrict   () {
    return this.appGeneral.value.permanentAddress.addressSelected.tambon_name;
  } 
  get district  () {
    return this.appGeneral.value.permanentAddress.addressSelected.amphur_name;
  } 
  get province   () {
    return this.appGeneral.value.permanentAddress.addressSelected.province_name;
  } 
  get postcode  () {
    return this.appGeneral.value.permanentAddress.addressSelected.zip;
  } 
  get permanentMobileNo   () {
    return this.appGeneral.get('permanentMobileNo');
  } 
  get permanentAddressEmail() {
    return this.appGeneral.get('permanentAddressEmail');
  } 
}
