import { Subscription } from 'rxjs';
import { Component , ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { ApiProvider } from "../../../../../providers/api/api";                            
import { AddressM } from '../../../../../providers/service-table/address-model';
import { ApplicationData } from '../../../../../providers/application/application-data';
import { Broadcaster } from '../../../../../providers/utility/broadcaster';
import { CopyAddress } from '../../../../../providers/application/copy-address';
/**
 * Generated class for the AppGeCompanyAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-ge-company-address',
  templateUrl: 'app-ge-company-address.html',
})
export class AppGeCompanyAddressPage {
  private subscription: Array<Subscription> = [];
  appGeneral: FormGroup;
  public temp;
  public companyAddressData =[];
  // public appData;
  public countryDropdown;
  public editAddr;
  private copyAddress : CopyAddress;

  constructor(private cdRef:ChangeDetectorRef, private apiProvider: ApiProvider,private http: HttpClient,
    public navCtrl: NavController,private fb: FormBuilder, public navParams: NavParams,  
    private appDatas: ApplicationData,private broadcaster: Broadcaster
  ) {

    this.copyAddress = new CopyAddress();

    this.http.get('assets/json/application/countryJson.json') 
    .subscribe(data => {
      this.countryDropdown = data;
      this.countryDropdown = this.countryDropdown.country;
     });

     this.appGeneral = this.fb.group({    
      companyAddress:
     [{
        addressSelected: {
          province_name: '',
          tambon_name: '',
          amphur_name: '',
          zip: ''
        }
      }, Validators.required],
      district: ['',Validators.required],
      province: ['',Validators.required],
      subdistrict: ['',Validators.required],
      postcode: ['',Validators.required],
      companyAddressId:'',
      companyAddressNo: ['', Validators.required],
      companyVillage:'',
      companyMoo:'',
      companySoi:'',
      companyRoad:'',
      companyTelNo:'',
      companyCountry:['',Validators.required],
      workplace :['',Validators.required],
      companyMobileNo : '',
      companyEmail : '',
      contactaddresscd_copy:''
    });

    this.appDatas.appAddressW = this.appGeneral;

    this.appDatas.getData('addressMs').then((res: Array<AddressM>) => {
      
      if (res.length > 0) {
        let address:  Array<AddressM> = res.filter(item => item.type == 'W');
        if (address.length > 0) {
          if (address[0].addressno)
            this.appGeneral.controls['companyAddressNo'].setValue(address[0].addressno);
  
          this.appGeneral.controls['companyVillage'].setValue(address[0].buildingname);
          this.appGeneral.controls['companyMoo'].setValue(address[0].moo);
          this.appGeneral.controls['companySoi'].setValue(address[0].soi);
          this.appGeneral.controls['companyRoad'].setValue(address[0].road);
          this.appGeneral.controls['contactaddresscd_copy'].setValue(address[0].regid);
          this.editAddr = address[0].regid;
          if(this.editAddr !='O')
            this.disableField();
  
          if (address[0].subdistrict || address[0].district || address[0].province || address[0].postcode) {
            this.appGeneral.controls['companyAddress'].setValue({
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
            this.appGeneral.controls['companyTelNo'].setValue(address[0].telno);
          this.appGeneral.controls['companyCountry'].setValue(address[0].country);
  
          if (address[0].mobileno)
            this.appGeneral.controls['companyMobileNo'].setValue(address[0].mobileno);
          if (address[0].email)
            this.appGeneral.controls['companyEmail'].setValue(address[0].email);
            if (address[0].workplace)
            this.appGeneral.controls['workplace'].setValue(address[0].workplace);
          
        }
      }
      else {
        this.appGeneral.controls['companyCountry'].setValue('TH');
      }
      
    }, 
    (err) => {
      this.appGeneral.controls['companyCountry'].setValue('TH');
    });

    this.subscription.push(this.broadcaster.on('tabAddress').subscribe(res => {
      let tabAddress : number = res;

      if(tabAddress === 1) {  // ที่อยู่ที่สะดวก
        this.copyAddC();
      }
      if(tabAddress === 2) {  // ที่อยู่ที่สะดวก
        this.copyAddP();
        this.copyAddC();
      }
    }));
  }

  public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
  }
  ngAfterViewChecked(){
    // this.dateNow = new Date();
   
     this.cdRef.detectChanges();
   
   }
  get subdistrict   () {
    return this.appGeneral.value.companyAddress.addressSelected.tambon_name;
  } 
  get district  () {
    return this.appGeneral.value.companyAddress.addressSelected.amphur_name;
  } 
  get province   () {
    return this.appGeneral.value.companyAddress.addressSelected.province_name;
  } 
  get postcode  () {
    return this.appGeneral.value.companyAddress.addressSelected.zip;
  } 
  get companyMobileNo   () {
    return this.appGeneral.get('companyMobileNo');
  } 
  get companyEmail   () {
    return this.appGeneral.get('companyEmail');
  } 
  get workplace   () {
    return this.appGeneral.get('workplace');
  } 
  private copyaddress(option: String): void {
    // console.log('copyaddress : ', this.appDatas.appAddressP);
    this.editAddr = option;
    if(option=="P"){
      this.copyAddP();
    }
    else if(option=="C"){
      this.copyAddC();
    }
    else
    {
      this.copyAddress.clearAddress(this.appGeneral, this.copyAddress.addressfield.currentW, this.copyAddress.addressfield.currentW_select);
      this.appGeneral.controls['companyCountry'].setValue('TH');
      this.appGeneral.controls['workplace'].setValue('');

      // this.copyAddress.enableField(this.copyAddress.addressfield.currentW, this.appGeneral);
      // this.appGeneral.controls['workplace'].enable();
      // this.appGeneral.controls['companyAddressNo'].enable();
      // this.appGeneral.controls['companyVillage'].enable();
      // this.appGeneral.controls['companyMoo'].enable();
      // this.appGeneral.controls['companySoi'].enable();
      // this.appGeneral.controls['companyRoad'].enable();
      // this.appGeneral.controls['postcode'].enable();
      // this.appGeneral.controls['subdistrict'].enable();
      // this.appGeneral.controls['province'].enable();
      // this.appGeneral.controls['district'].enable();
      // this.appGeneral.controls['companyTelNo'].enable();
      // this.appGeneral.controls['companyCountry'].enable();

      // this.appGeneral.controls['workplace'].setValue('');
    //   this.appGeneral.controls['companyAddressNo'].setValue('');
    //   this.appGeneral.controls['companyAddress'].setValue({
    //     addressSelected : {
    //       province_name: '',
    //       tambon_name: '',
    //       amphur_name: '',
    //       zip: ''
    //     }
    // });
    //   this.appGeneral.controls['companyVillage'].setValue('');
    //   this.appGeneral.controls['companyMoo'].setValue('');
    //   this.appGeneral.controls['companySoi'].setValue('');
    //   this.appGeneral.controls['companyRoad'].setValue('');
    //   this.appGeneral.controls['postcode'].setValue('');
    //   this.appGeneral.controls['subdistrict'].setValue('');
    //   this.appGeneral.controls['province'].setValue('');
    //   this.appGeneral.controls['district'].setValue('');
    //   this.appGeneral.controls['companyTelNo'].setValue('');
    //   this.appGeneral.controls['companyCountry'].setValue('');
    }
  }
  private copyAddP(){
    if(this.editAddr=="P"){
      this.copyAddress.copyApplicaitonAddressWork(this.appDatas);
    //   const currentP = this.appDatas.appAddressP;
    //   // this.appGeneral.controls['workplace'].disable();
    //   this.appGeneral.controls['companyAddressNo'].disable();
    //   this.appGeneral.controls['companyVillage'].disable();
    //   this.appGeneral.controls['companyMoo'].disable();
    //   this.appGeneral.controls['companySoi'].disable();
    //   this.appGeneral.controls['companyRoad'].disable();
    //   this.appGeneral.controls['postcode'].disable();
    //   this.appGeneral.controls['subdistrict'].disable();
    //   this.appGeneral.controls['province'].disable();
    //   this.appGeneral.controls['district'].disable();
    //   this.appGeneral.controls['companyTelNo'].disable();
    //   this.appGeneral.controls['companyCountry'].disable();

    //   this.appGeneral.controls['companyAddressNo'].setValue(currentP.controls['permanentAddressNo'].value);
    //   this.appGeneral.controls['companyAddress'].setValue({
    //     addressSelected : {
    //       province_name: currentP.controls['permanentAddress'].value.addressSelected.province_name,
    //       tambon_name: currentP.controls['permanentAddress'].value.addressSelected.tambon_name,
    //       amphur_name: currentP.controls['permanentAddress'].value.addressSelected.amphur_name,
    //       zip: currentP.controls['permanentAddress'].value.addressSelected.zip
    //     }
    // });
    //   this.appGeneral.controls['companyVillage'].setValue(currentP.controls['permanentVillage'].value);
    //   this.appGeneral.controls['companyMoo'].setValue(currentP.controls['permanentMoo'].value);
    //   this.appGeneral.controls['companySoi'].setValue(currentP.controls['permanentSoi'].value);
    //   this.appGeneral.controls['companyRoad'].setValue(currentP.controls['permanentRoad'].value);
    //   // this.appGeneral.controls['companyAddress'].setValue(currentP.controls['permanentAddress'].value);
    //   this.appGeneral.controls['postcode'].setValue(currentP.controls['postcode'].value);
    //   this.appGeneral.controls['subdistrict'].setValue(currentP.controls['subdistrict'].value);
    //   this.appGeneral.controls['province'].setValue(currentP.controls['province'].value);
    //   this.appGeneral.controls['district'].setValue(currentP.controls['district'].value);
    //   this.appGeneral.controls['companyTelNo'].setValue(currentP.controls['permanentTelNo'].value);
    //   this.appGeneral.controls['companyCountry'].setValue(currentP.controls['permanentCountry'].value);
    }
  }
  private copyAddC(){
    if(this.editAddr=="C"){
      
      this.copyAddress.copyApplicaitonAddressWork(this.appDatas);
      // const currentC = this.appDatas.appAddressC;
      // this.appGeneral.controls['workplace'].disable();
    //   this.appGeneral.controls['companyAddressNo'].disable();
    //   this.appGeneral.controls['companyVillage'].disable();
    //   this.appGeneral.controls['companyMoo'].disable();
    //   this.appGeneral.controls['companySoi'].disable();
    //   this.appGeneral.controls['companyRoad'].disable();
    //   this.appGeneral.controls['postcode'].disable();
    //   this.appGeneral.controls['subdistrict'].disable();
    //   this.appGeneral.controls['province'].disable();
    //   this.appGeneral.controls['district'].disable();
    //   this.appGeneral.controls['companyTelNo'].disable();
    //   this.appGeneral.controls['companyCountry'].disable();

    //   this.appGeneral.controls['companyAddressNo'].setValue(currentC.controls['currentAddressNo'].value);
    //   this.appGeneral.controls['companyAddress'].setValue({
    //     addressSelected : {
    //       province_name: currentC.controls['currentAddress'].value.addressSelected.province_name,
    //       tambon_name: currentC.controls['currentAddress'].value.addressSelected.tambon_name,
    //       amphur_name: currentC.controls['currentAddress'].value.addressSelected.amphur_name,
    //       zip: currentC.controls['currentAddress'].value.addressSelected.zip
    //     }
    // });
    //   this.appGeneral.controls['companyVillage'].setValue(currentC.controls['currentVillage'].value);
    //   this.appGeneral.controls['companyMoo'].setValue(currentC.controls['currentMoo'].value);
    //   this.appGeneral.controls['companySoi'].setValue(currentC.controls['currentSoi'].value);
    //   this.appGeneral.controls['companyRoad'].setValue(currentC.controls['currentRoad'].value);
    //   this.appGeneral.controls['companyAddress'].setValue(currentC.controls['currentAddress'].value);
    //   this.appGeneral.controls['postcode'].setValue(currentC.controls['postcode'].value);
    //   this.appGeneral.controls['subdistrict'].setValue(currentC.controls['subdistrict'].value);
    //   this.appGeneral.controls['province'].setValue(currentC.controls['province'].value);
    //   this.appGeneral.controls['district'].setValue(currentC.controls['district'].value);
    //   this.appGeneral.controls['companyTelNo'].setValue(currentC.controls['currentTelNo'].value);
    //   this.appGeneral.controls['companyCountry'].setValue(currentC.controls['currentCountry'].value);
    }
  }
  private disableField()
  {
    this.copyAddress.disableField(this.copyAddress.addressfield.currentW, this.appGeneral);
    // this.appGeneral.controls['companyAddressNo'].disable();
    //   this.appGeneral.controls['companyVillage'].disable();
    //   this.appGeneral.controls['companyMoo'].disable();
    //   this.appGeneral.controls['companySoi'].disable();
    //   this.appGeneral.controls['companyRoad'].disable();
    //   this.appGeneral.controls['postcode'].disable();
    //   this.appGeneral.controls['subdistrict'].disable();
    //   this.appGeneral.controls['province'].disable();
    //   this.appGeneral.controls['district'].disable();
    //   this.appGeneral.controls['companyTelNo'].disable();
    //   this.appGeneral.controls['companyCountry'].disable();
    //   this.appGeneral.controls['subdistrict'].disable();
  }
}
