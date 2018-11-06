import { Component , Input , ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormArray} from '@angular/forms';
import { BeneficiaryM } from '../../../../providers/service-table/beneficiary-model';
import { HttpClient } from '@angular/common/http'; 
import { ApplicationData } from '../../../../providers/application/application-data';
import { CalculateAgeUtil } from '../../../../providers/utility/calculate-age-util';
import { FullNameInfo } from '../../../../directives/utility/fullname-popup/fullname-info';
import { CopyAddress } from '../../../../providers/application/copy-address';
/**
 * Generated class for the AppBeneficiaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-beneficiary',
  templateUrl: 'app-beneficiary.html',
})
export class AppBeneficiaryPage {
  appBeneficiary: FormGroup;
  public addressRegistrationData;
  public currentBeneficiaryData=[];
  public temp=[];
  public percent : number;
  public beneCount=0;
  public maxPercent=100;
  public relationDropdown;
  public items: FormArray;
  public showCloseIcon: boolean = false;
  public isAddMoreBenefit: boolean = true;
  private editAddr;
  private editIndex;
  private fullnameInfo: FullNameInfo = new FullNameInfo();
  private indexBeneficiaryObj: string = "0";

  private copyAddress : CopyAddress;

  constructor(
    private cdRef:ChangeDetectorRef, 
    private appsData: ApplicationData,
    private http: HttpClient,
    public content: Content,
    public navCtrl: NavController,
    private fb: FormBuilder, 
    public navParams: NavParams) {

    this.copyAddress = new CopyAddress();

    this.http.get('assets/json/application/relation.json') 
    .subscribe(data => {
      this.relationDropdown = data;
      this.relationDropdown = this.relationDropdown.relation;
     });
     
    this.appBeneficiary = this.fb.group({
      percentageCh:['', Validators.required],
      beneficiaryData:this.fb.array([
        this.beneficiaryObj()
      ]),
    });

    this.appsData.getData('beneficiaryMs').then((res: Array<BeneficiaryM>) => {

      if(res){
        let fullname = '';
        // this.appsData.getQuotation().pname + ' ' 
        //     + this.appsData.getQuotation().fname + ' ' 
        //     + this.appsData.getQuotation().lname;

          // if (this.appsData.getQuotation().fname && this.appsData.getQuotation().pname && this.appsData.getQuotation().fname && this.appsData.getQuotation().lname) {
          //   // debugger;
          //   this.setFullnameInfo(this.appsData.getQuotation().insureage, "ผู้รับประโยชน์",this.appsData.getQuotation().pname, this.appsData.getQuotation().fname,this.appsData.getQuotation().lname);
          // }
          
        this.items = this.appBeneficiary.get('beneficiaryData') as FormArray;
        // debugger;
        this.items.removeAt(0);
        for(let i=0;i<res.length;i++){
          // console.log("A ->", res.paymentMs[0]);
            
          if((res[i].title 
          || res[i].name 
          || res[i].lastname )
          ) {
            
            fullname = res[i].title + ' '
            + res[i].name + ' '
            + res[i].lastname;
            // alert(fullname);
            // debugger;
            this.setFullnameInfo(this.appsData.getQuotation().insureage, "ผู้รับประโยชน์",res[i].title, res[i].name,res[i].lastname);
          }
          this.items.push(this.fb.group({
            addressContact:res[i].addresstype,
            identify_id:res[i].identifyid,
            buildingname:res[i].buildingname,
            moo:res[i].moo,
            district: [res[i].district,Validators.required],
            province: [res[i].province,Validators.required],
            subdistrict: [res[i].subdistrict,Validators.required],
            postcode: [res[i].postcode,Validators.required],
            soi:res[i].soi,
            road:res[i].road,
            benefitName : [ fullname ,Validators.required],
            name : [ res[i].name ? res[i].name : '' ,Validators.required],
            lastname : [ res[i].lastname ? res[i].lastname : '' ,Validators.required],
            title : [ res[i].title  ? res[i].title : '' ,Validators.required],
            age : [res[i].age,Validators.compose([Validators.required, Validators.max(100)])],
            relation : [res[i].relation,Validators.required],
            percentage : [res[i].percentage, Validators.compose([Validators.required, Validators.max(this.maxPercent)])],
            address: {
              addressSelected: {
                province_name: res[i].province,
                tambon_name: res[i].subdistrict,
                amphur_name: res[i].district,
                zip: res[i].postcode
              }
              },
            addressno : [res[i].addressno,Validators.required],
          }));
          this.beneCount++;
         this.temp[i] =res[i].percentage;

         this.identifyIdChange(i);
         this.editAddr=res[i].addresstype;
         this.editIndex=i;
         if(this.editAddr =='P' || this.editAddr =='C')
            this.disableField();
       }
       this.checkBenefitLimit(4);
      }
      this.appsData.appBeneficiary = this.appBeneficiary;
    }, 
    (err) => {
      console.log('Err : ', err);
    });

    this.appsData.appBeneficiary = this.appBeneficiary;
    
  }
  @Input() public addressRegistrationDataEdit:any;
 
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  fullnameChange(fullname: FullNameInfo) {
    const index = this.indexBeneficiaryObj;
    let test = this.appBeneficiary.get('beneficiaryData') as FormArray;
    console.log(test);
  
    if(test && test.length > 0) {
      // console.log(this.appBeneficiary.get('beneficiaryData'));
      test.controls[index].get('title').setValue(fullname.prefix);
      test.controls[index].get('name').setValue(fullname.firstName);
      test.controls[index].get('lastname').setValue(fullname.lastName);
      const benefitName = `${fullname.prefix} ${fullname.firstName} ${fullname.lastName}`;
      test.controls[index].get('benefitName').setValue(benefitName);
    }
    // debugger;
    // console.log(fullname);
    // this.paymentForSave.get('prename').setValue(fullname.prefix);
    // this.paymentForSave.get('firstname').setValue(fullname.firstName);
    // this.paymentForSave.get('lastname').setValue(fullname.lastName);
    // this.appData.appType = this.paymentForSave;
    this.appsData.appBeneficiary = this.appBeneficiary;
    this.setFullnameInfo(this.appsData.getQuotation().insureage, "ผู้รับประโยชน์",fullname.prefix, fullname.firstName,fullname.lastName);
  }

  setFullnameInfo(age: string, title: string, prefix: string, firstName: string, lastName: string): void {
    
    this.fullnameInfo = new FullNameInfo();
    this.fullnameInfo.age = age;
    this.fullnameInfo.title = title;
    this.fullnameInfo.prefix = prefix;
    this.fullnameInfo.firstName = firstName;
    this.fullnameInfo.lastName = lastName;
    console.log("setFUll bene _> ", this.fullnameInfo);
  }

  index(index) {
    let test = this.appBeneficiary.get('beneficiaryData') as FormArray;
    console.log(test);
  
    if(test && test.length > 0) {
      this.setFullnameInfo(
        this.appsData.getQuotation().insureage, 
        "ผู้รับประโยชน์",
        test.controls[index].get('title').value ? test.controls[index].get('title').value : '', 
        test.controls[index].get('name').value ? test.controls[index].get('name').value : '', 
        test.controls[index].get('lastname').value ? test.controls[index].get('lastname').value : '',
      );
    }
    
    this.indexBeneficiaryObj = index;
  }
/**
   * add more panel
   */
  private addMoreBeneficiary() : void {
    // control refers to your formarray
    const control = <FormArray>this.appBeneficiary.controls['beneficiaryData'];
    
    if (control.length < 4) {
    // add new formgroup
      control.push(this.beneficiaryObj());
      this.setFullnameInfo
    }
    // เช็คจำนวนผู้รับผลประโยฃน์
    this.checkBenefitLimit(4);
  }

beneficiaryObj(): FormGroup {
  return this.fb.group({
    addressContact: '',
    identify_id:'',
    buildingname:'',
    district: ['',Validators.required],
    province: ['',Validators.required],
    subdistrict: ['',Validators.required],
    postcode: ['',Validators.required],
    moo:'',
    soi:'',
    road:'',
    // benefitName : [this.appsData.getQuotation().pname + ' ' + this.appsData.getQuotation().fname + ' ' + this.appsData.getQuotation().lname,Validators.required],
    benefitName : ['', Validators.required],
    // name : [this.appsData.getQuotation().fname,Validators.required],
    name : ['', Validators.required],
    // lastname : [this.appsData.getQuotation().lname, Validators.required],
    lastname : ['', Validators.required],
    // title : [this.appsData.getQuotation().pname, Validators.required],
    title : ['', Validators.required],
    // age : [CalculateAgeUtil.calculateAge(new Date(this.appsData.getQuotation().birthdate)) || '',Validators.compose([Validators.required, Validators.max(100)])],
    age : ['' ,Validators.compose([Validators.required, Validators.max(100)])],
    // relation : ['06',Validators.required],//defualt ผู้เอาประกันภัย
    relation : ['', Validators.required],
    percentage : ['', Validators.compose([Validators.required, Validators.max(this.maxPercent)])],
    address: {
      addressSelected: {
        province_name: '',
        tambon_name: '',
        amphur_name: '',
        zip: ''
      }
      },
    addressno : ['',Validators.required],
  });
}
get formData() { return <FormArray>this.appBeneficiary.get('beneficiaryData'); }

percentageChangeForAdd(){
  let inputItems = this.formData;
  this.percent = 0;


  for(let j=0; j<inputItems.length;j++){

   this.percent = (this.percent*1)+(inputItems.controls[j]['controls']['percentage'].value*1);
}

if(this.percent<=100&&this.percent/100==1){

  this.appBeneficiary.controls['percentageCh'].clearValidators();
  this.appBeneficiary.controls['percentageCh'].setValue(100);
}else{

  this.appBeneficiary.controls['percentageCh'].setValidators([Validators.max(100)]);
  this.appBeneficiary.controls['percentageCh'].setValue(1000);
}
}

percentageChange(){
  let inputItems = this.formData;
  this.percent = 0;


  for(let j=0; j<inputItems.length;j++){

   this.percent = (this.percent*1)+(inputItems.controls[j]['controls']['percentage'].value*1);
}

if (this.percent<=100&&this.percent/100==1) {
  this.appBeneficiary.controls['percentageCh'].clearValidators();
  this.appBeneficiary.controls['percentageCh'].setValue(100);
} else {

  this.appBeneficiary.controls['percentageCh'].setValidators([Validators.max(100)]);
  this.appBeneficiary.controls['percentageCh'].setValue(1000);
}
}


  /**
   * remove panel
   */
  private removeMoreBeneficiary(index: number) : void {
    // control refers to your formarray
    const control = <FormArray>this.appBeneficiary.controls['beneficiaryData'];

    if (control.length > 1) {
       // remove the chosen row
        control.removeAt(index);
    }
    this.checkBenefitLimit(4);
  }

  private checkBenefitLimit(limit: number = 4): void
  {
    this.percentageChange();
    const control = <FormArray>this.appBeneficiary.controls['beneficiaryData'];
    if (control.length >= limit) {
      this.isAddMoreBenefit = false;
    } else {
      this.isAddMoreBenefit = true;
    }
    this.showCloseIcon = false;  
    //ถ้าเหลือผู้รับประโยชน์คนเดียวให้ซ่อนปุ่มลบ
    if (control.length > 1) {
      this.showCloseIcon = true;
    }
    
  }

name(i) {
  return this.appBeneficiary.value.beneficiaryData[i].name;
} 
age(i) {
  return this.appBeneficiary.value.beneficiaryData[i].age;
} 
relation(i) {
  return this.appBeneficiary.value.beneficiaryData[i].relation;
} 
percentage(i) {
  return this.appBeneficiary.value.beneficiaryData[i].percentage;
} 
addressno(i) {
  return this.appBeneficiary.value.beneficiaryData[i].addressno;
} 
subdistrict(i) {
  return this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.tambon_name;
} 
district(i) {
  return this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.amphur_name;
} 
province(i) {
  return this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.province_name;
} 
postcode (i) {
  return this.appBeneficiary.value.beneficiaryData[i].address.addressSelected.zip;
} 

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppBeneficiaryPage');
  }
  scrollToCenter () {
    this.content.scrollTo(0, 100, 500);
  }

  private identifyIdChange(index: number) {

    if (this.formData.controls[index]['controls']['identify_id'].value == '')
      this.formData.controls[index]['controls']['identify_id'].clearValidators();
    else
      this.formData.controls[index]['controls']['identify_id'].setValidators(Validators.compose([Validators.minLength(13), Validators.maxLength(13)]));

    this.formData.controls[index]['controls']['identify_id'].updateValueAndValidity();
  }
  private copyaddress(option: String,index: number): void {

    this.editAddr = option;
    this.editIndex=index;
    
    if(this.editAddr=='P')
      this.copyAddP();
    else if(this.editAddr=='C')
      this.copyAddC();
    else
      this.setBlank();
  }
  private copyAddP(){
    // this.disableField();
    if(this.editAddr=='P'){

    }
  }

  private copyAddC(){
    // this.disableField();
    if(this.editAddr=='C'){
      
    }
  }
  private setBlank(){
    // this.enableField();
    if(this.editAddr=='O'){
      let arr = <FormArray>this.appBeneficiary.controls['beneficiaryData'];
      let address = <FormGroup> arr.at(this.editIndex);

      this.copyAddress.clearAddress(address, this.copyAddress.addressfield.beneficiary, this.copyAddress.addressfield.beneficiary_select);
    
    //   arr.at(this.editIndex).get('addressno').setValue('');
    //   arr.at(this.editIndex).get('buildingname').setValue('');
    //   arr.at(this.editIndex).get('moo').setValue('');
    //   arr.at(this.editIndex).get('soi').setValue('');
    //   arr.at(this.editIndex).get('road').setValue('');
    //   arr.at(this.editIndex).get('district').setValue('');
    //   arr.at(this.editIndex).get('subdistrict').setValue('');
    //   arr.at(this.editIndex).get('province').setValue('');
    //   arr.at(this.editIndex).get('postcode').setValue('');
    //   arr.at(this.editIndex).get('address').setValue({
    //     addressSelected : {
    //       province_name: '',
    //       tambon_name: '',
    //       amphur_name: '',
    //       zip: ''
    //     }
    // });
    }
  }
  private disableField()
  {
    let cont = <FormArray>this.appBeneficiary.controls['beneficiaryData'];
    let address = <FormGroup> cont.at(this.editIndex);

    this.copyAddress.disableField(this.copyAddress.addressfield.beneficiary, address);
    // cont.at(this.editIndex).get('addressno').disable();
    // cont.at(this.editIndex).get('buildingname').disable();
    // cont.at(this.editIndex).get('moo').disable();
    // cont.at(this.editIndex).get('soi').disable();
    // cont.at(this.editIndex).get('road').disable();
    // cont.at(this.editIndex).get('district').disable();
    // cont.at(this.editIndex).get('subdistrict').disable();
    // cont.at(this.editIndex).get('province').disable();
    // cont.at(this.editIndex).get('postcode').disable(); 

  }
  private enableField()
  {
    let cont = <FormArray>this.appBeneficiary.controls['beneficiaryData'];
    let address = <FormGroup> cont.at(this.editIndex);

    this.copyAddress.enableField(this.copyAddress.addressfield.beneficiary, address);

    // cont.at(this.editIndex).get('addressno').enable();
    // cont.at(this.editIndex).get('buildingname').enable();
    // cont.at(this.editIndex).get('moo').enable();
    // cont.at(this.editIndex).get('soi').enable();
    // cont.at(this.editIndex).get('road').enable();
    // cont.at(this.editIndex).get('district').enable();
    // cont.at(this.editIndex).get('subdistrict').enable();
    // cont.at(this.editIndex).get('province').enable();
    // cont.at(this.editIndex).get('postcode').enable();
  }
}
