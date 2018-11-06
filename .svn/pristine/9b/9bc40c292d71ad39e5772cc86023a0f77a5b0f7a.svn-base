import { Subscription } from 'rxjs';
import { Component , ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { AddressM } from '../../../../../providers/service-table/address-model';
import { ApplicationData } from '../../../../../providers/application/application-data';
import { Broadcaster } from '../../../../../providers/utility/broadcaster';
import { CopyAddress } from '../../../../../providers/application/copy-address';
/**
 * Generated class for the AppGeCurrentAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-ge-current-address',
  templateUrl: 'app-ge-current-address.html',
})
export class AppGeCurrentAddressPage {

  private subscription: Array<Subscription> = [];
  appGeneral: FormGroup;
  public temp;
  public currentAddressData =[];
  // public appData;
  public countryDropdown;
  private editAddr;
  private copyAddress : CopyAddress;

  constructor(private cdRef:ChangeDetectorRef, private http: HttpClient,
    public navCtrl: NavController,private fb: FormBuilder, public navParams: NavParams,
    private broadcaster: Broadcaster,
    private appDatas: ApplicationData) {
    
    this.copyAddress = new CopyAddress();
    
    this.http.get('assets/json/application/countryJson.json') 
    .subscribe(data => {
      this.countryDropdown = data;
      this.countryDropdown = this.countryDropdown.country;
     });

     this.appGeneral = this.fb.group({
      currentAddress:
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
      currentAddressId:'',
      currentAddressNo: ['', Validators.required],
      currentVillage:'',
      currentMoo:'',
      currentSoi:'',
      currentRoad:'',
      currentTelNo:'',
      currentCountry:['',Validators.required],
      currentMobileNo : ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      currentEmail : ['',Validators.compose([Validators.required, Validators.email])],
      contactaddresscd_copy:''
    });

    this.appDatas.appAddressC = this.appGeneral;
    
    this.appDatas.getData('addressMs').then((res: Array<AddressM>) => {
      
      if (res.length > 0) {
        let address:  Array<AddressM> = res.filter(item => item.type == 'C');
        if (address.length > 0) {
          if (address[0].addressno)
          this.appGeneral.controls['currentAddressNo'].setValue(address[0].addressno);
          this.appGeneral.controls['currentVillage'].setValue(address[0].buildingname);
          this.appGeneral.controls['currentMoo'].setValue(address[0].moo);
          this.appGeneral.controls['currentSoi'].setValue(address[0].soi);
          this.appGeneral.controls['currentRoad'].setValue(address[0].road);
          this.appGeneral.controls['contactaddresscd_copy'].setValue(address[0].regid);
          this.editAddr = address[0].regid;
          if(this.editAddr !='O')
            this.disableField();
  
          if (address[0].subdistrict || address[0].district || address[0].province || address[0].postcode) {
            this.appGeneral.controls['currentAddress'].setValue({
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
            this.appGeneral.controls['currentTelNo'].setValue(address[0].telno);
            this.appGeneral.controls['currentCountry'].setValue(address[0].country);
  
          if (address[0].mobileno)
            this.appGeneral.controls['currentMobileNo'].setValue(address[0].mobileno);
          if (address[0].email)
            this.appGeneral.controls['currentEmail'].setValue(address[0].email);
        }
      }
      else {
        this.appGeneral.controls['currentCountry'].setValue('TH');
      }
      
    }, (err) => {
        this.appGeneral.controls['currentCountry'].setValue('TH');
    });


    this.subscription.push(this.broadcaster.on('tabAddress').subscribe(res => {
      let tabAddress : number = res;

      if(tabAddress === 1) {  // ที่อยู่ที่สะดวก
        this.copyAdd();
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
  get currentEmail() {
    return this.appGeneral.get('currentEmail');
  } 
  get subdistrict   () {
    return this.appGeneral.value.currentAddress.addressSelected.tambon_name;
  } 
  get district  () {
    return this.appGeneral.value.currentAddress.addressSelected.amphur_name;
  } 
  get province   () {
    return this.appGeneral.value.currentAddress.addressSelected.province_name;
  } 
  get postcode  () {
    return this.appGeneral.value.currentAddress.addressSelected.zip;
  }
  get currentMobileNo   () {
    return this.appGeneral.get('currentMobileNo');
  }
  private copyaddress(option: String): void {
    // console.log('copyaddress : ', this.appDatas.appAddressP);
    this.editAddr = option;
    if(option=='P'){
      this.copyAdd();
    }
    else
    {
      this.copyAddress.clearAddress(this.appGeneral, this.copyAddress.addressfield.currentC, this.copyAddress.addressfield.currentC_select);
      this.appGeneral.controls['currentCountry'].setValue('TH');
      // this.copyAddress.enableField(this.copyAddress.addressfield.currentC, this.appGeneral)

    //   this.appGeneral.controls['currentAddressNo'].setValue('');
    //   this.appGeneral.controls['currentVillage'].setValue('');
    //   this.appGeneral.controls['currentMoo'].setValue('');
    //   this.appGeneral.controls['currentSoi'].setValue('');
    //   this.appGeneral.controls['currentRoad'].setValue('');
    //   this.appGeneral.controls['currentAddress'].setValue({
    //       addressSelected : {
    //         province_name: '',
    //         tambon_name: '',
    //         amphur_name: '',
    //         zip: ''
    //       }
    //   });
    //   this.appGeneral.controls['postcode'].setValue('');
    //   this.appGeneral.controls['subdistrict'].setValue('');
    //   this.appGeneral.controls['province'].setValue('');
    //   this.appGeneral.controls['district'].setValue('');
    //   this.appGeneral.controls['currentTelNo'].setValue('');
    //   this.appGeneral.controls['currentCountry'].setValue('');
    //   this.appGeneral.controls['currentMobileNo'].setValue('');
    //   this.appGeneral.controls['currentEmail'].setValue('');
    }
  }
  private copyAdd(){
    if(this.editAddr=='P'){
      this.copyAddress.copyApplicaitonAddressCurrent(this.appDatas);
      // const currentP = this.appDatas.appAddressP;

      // this.appGeneral.controls['currentAddressNo'].disable();
      // this.appGeneral.controls['currentVillage'].disable();
      // this.appGeneral.controls['currentMoo'].disable();
      // this.appGeneral.controls['currentSoi'].disable();
      // this.appGeneral.controls['currentRoad'].disable();
      // this.appGeneral.controls['postcode'].disable();
      // this.appGeneral.controls['subdistrict'].disable();
      // this.appGeneral.controls['province'].disable();
      // this.appGeneral.controls['district'].disable();
      // this.appGeneral.controls['currentTelNo'].disable();
      // this.appGeneral.controls['currentCountry'].disable();
      // this.appGeneral.controls['currentMobileNo'].disable();
      // this.appGeneral.controls['currentEmail'].disable();


      // this.appGeneral.controls['currentAddressNo'].setValue(currentP.controls['permanentAddressNo'].value);
      // this.appGeneral.controls['currentVillage'].setValue(currentP.controls['permanentVillage'].value);
      // this.appGeneral.controls['currentMoo'].setValue(currentP.controls['permanentMoo'].value);
      // this.appGeneral.controls['currentSoi'].setValue(currentP.controls['permanentSoi'].value);
      // this.appGeneral.controls['currentRoad'].setValue(currentP.controls['permanentRoad'].value);
      // // this.appGeneral.controls['currentAddress'].setValue(currentP.controls['permanentAddress'].value);
      // this.appGeneral.controls['currentAddress'].setValue({
      //     addressSelected : {
      //       province_name: currentP.controls['permanentAddress'].value.addressSelected.province_name,
      //       tambon_name: currentP.controls['permanentAddress'].value.addressSelected.tambon_name,
      //       amphur_name: currentP.controls['permanentAddress'].value.addressSelected.amphur_name,
      //       zip: currentP.controls['permanentAddress'].value.addressSelected.zip
      //     }
      // });
      // this.appGeneral.controls['postcode'].setValue(currentP.controls['postcode'].value);
      // this.appGeneral.controls['subdistrict'].setValue(currentP.controls['subdistrict'].value);
      // this.appGeneral.controls['province'].setValue(currentP.controls['province'].value);
      // this.appGeneral.controls['district'].setValue(currentP.controls['district'].value);
      // this.appGeneral.controls['currentTelNo'].setValue(currentP.controls['permanentTelNo'].value);
      // this.appGeneral.controls['currentCountry'].setValue(currentP.controls['permanentCountry'].value);
      // this.appGeneral.controls['currentMobileNo'].setValue(currentP.controls['permanentMobileNo'].value);
      // this.appGeneral.controls['currentEmail'].setValue(currentP.controls['permanentAddressEmail'].value);
    }
  }
  private disableField()
  {
    this.copyAddress.disableField(this.copyAddress.addressfield.currentC, this.appGeneral)
    // this.appGeneral.controls['currentAddressNo'].disable();
    //   this.appGeneral.controls['currentVillage'].disable();
    //   this.appGeneral.controls['currentMoo'].disable();
    //   this.appGeneral.controls['currentSoi'].disable();
    //   this.appGeneral.controls['currentRoad'].disable();
    //   this.appGeneral.controls['postcode'].disable();
    //   this.appGeneral.controls['subdistrict'].disable();
    //   this.appGeneral.controls['province'].disable();
    //   this.appGeneral.controls['district'].disable();
    //   this.appGeneral.controls['currentTelNo'].disable();
    //   this.appGeneral.controls['currentCountry'].disable();
    //   this.appGeneral.controls['currentMobileNo'].disable();
    //   this.appGeneral.controls['currentEmail'].disable();
  }

}
