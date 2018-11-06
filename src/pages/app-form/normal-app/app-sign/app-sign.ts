import {Storage} from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform, Content } from 'ionic-angular';
import { IMyDpOptions } from "mydatepicker";
import { ValidateProvider } from "../../../../providers/validate/validate";
import { DateFormatProvider } from "../../../../providers/date-format/date-format";
import { Broadcaster } from './../../../../providers/utility/broadcaster';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { ApplicationData } from '../../../../providers/application/application-data';
import { MCAapplicationsM } from '../../../../providers/service-table/mcaapplications-model';
import { FullNameInfo } from '../../../../directives/utility/fullname-popup/fullname-info';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-app-sign',
  templateUrl: 'app-sign.html',
})
export class AppSignPage { 
  appSignPage : FormGroup;
  private submitDate : string = '';
  private fullnameInfo: FullNameInfo = new FullNameInfo();
  private fullnameInfo2: FullNameInfo = new FullNameInfo();
  private insurefullnameInfo: FullNameInfo = new FullNameInfo();

  private birthDate: string;

  public quotationM = this.appDatas.getQuotation();

  constructor(
    private broadcaster     : Broadcaster ,
    private fb              : FormBuilder,
    public content          : Content, 
    public navCtrl          : NavController, 
    public navParams        : NavParams,
    private validate        : ValidateProvider,
    private dateFormat      : DateFormatProvider, 
    private platform        : Platform,
    private appsData        : ApplicationData,
    private storage         : Storage,
    private appDatas: ApplicationData
  ) {
    this.setFullnameInfo(this.quotationM.insureage, "ชื่อพยาน", '', '', '');
    this.setFullnameInfo2(this.quotationM.insureage, "ชื่อพยาน/ผู้เขียน/พิมพ์", '', '', '');
    this.setInsureFullname(this.quotationM.insureage, "ชื่อผู้เอาประกันภัย", '', '', '');

    this.appSignPage = this.fb.group({
     
      place : ['', Validators.required],
      witness_fname:['', Validators.required],
      witness_fname2:['', Validators.required],
      license:'',
      name:['', Validators.required],
      agentName:'',
      submitDate:''  ,
      witness1title: ['',Validators.required],
      witness1fname: ['',Validators.required],
      witness1lname: ['',Validators.required],
      witness2title: ['',Validators.required],
      witness2fname: ['',Validators.required],
      witness2lname: ['',Validators.required],
     
      insuretitle: ['', Validators.required],
      insurename: ['', Validators.required],
      insurelastname: ['', Validators.required]

    });

    this.storage.get('saleInformation').then(
      (saleDetailM) => { 
        this.appsData.appSign = this.appSignPage;
        const quotation = this.appsData.getQuotation();
     
        if(quotation.insureage >= 0 && quotation.insureage < 7){
          this.appSignPage.controls['name'].enable();
          this.birthDate = moment().subtract(20, "years").format("YYYY-MM-DD");
        }
        else {

          this.appSignPage.controls['name'].setValue(quotation.pname+' '+quotation.fname+ ' ' +quotation.lname);
          this.appSignPage.controls['name'].disable();
          this.appSignPage.controls['insuretitle'].setValue(quotation.pname);
          this.appSignPage.controls['insurename'].setValue(quotation.fname);
          this.appSignPage.controls['insurelastname'].setValue(quotation.lname);
        }
 
        this.appSignPage.controls['agentName'].disable();
        this.appSignPage.controls['license'].disable();

        //readOnly
        this.submitDate = quotation.createdatetime;
        this.appSignPage.controls['submitDate'].setValue(this.submitDate);
  
        this.appSignPage.controls['agentName'].setValue(saleDetailM.firstName + " " + saleDetailM.lastName);
        this.appSignPage.controls['license'].setValue(saleDetailM.licenseNo); 
        this.appsData.getData('mcaapplicationM').then((res: MCAapplicationsM) => {
        this.appSignPage.controls['place'].setValue(res.place);
        if(res.witness1title != '' &&  res.witness1fname != '' && res.witness1lname != '')
          this.appSignPage.controls['witness_fname'].setValue(res.witness1title + ' ' + res.witness1fname + ' ' + res.witness1lname);
        
          // this.appSignPage.controls['witness_fname'].setValue(res.witness1title + ' ' + res.witness1fname + ' ' + res.witness1lname);
        if(res.witness2title != '' && res.witness2fname != '' && res.witness2lname != '')
          this.appSignPage.controls['witness_fname2'].setValue(res.witness2title + ' ' + res.witness2fname + ' ' + res.witness2lname);
          // this.appSignPage.controls['witness_fname2'].setValue(res.witness2title != '' && res.witness2fname != '' && res.witness2lname != '' ? res.witness2title + ' ' + res.witness2fname + ' ' + res.witness2lname : '');


          this.appSignPage.controls['witness1title'].setValue(res.witness1title);
          this.appSignPage.controls['witness1fname'].setValue(res.witness1fname);
          this.appSignPage.controls['witness1lname'].setValue(res.witness1lname);

          this.appSignPage.controls['witness2title'].setValue(res.witness2title);
          this.appSignPage.controls['witness2fname'].setValue(res.witness2fname);
          this.appSignPage.controls['witness2lname'].setValue(res.witness2lname);

          if(typeof res.insuretitle !== 'undefined' && typeof res.insurename !== 'undefined' && typeof res.insurelastname !== 'undefined'
            && res.insuretitle != '' && res.insurename != '' && res.insurelastname != ''
          ){
            this.appSignPage.controls['insuretitle'].setValue(res.insuretitle);
            this.appSignPage.controls['insurename'].setValue(res.insurename);
            this.appSignPage.controls['insurelastname'].setValue(res.insurelastname);
            this.appSignPage.controls['name'].setValue(res.insuretitle+' '+res.insurename+' '+res.insurelastname);
            this.setInsureFullname(this.quotationM.insureage, "ชื่อผู้เอาประกันภัย",res.insuretitle,res.insurename,res.insurelastname);
          }

          this.setFullnameInfo(this.quotationM.insureage, "ชื่อพยาน", res.witness1title, res.witness1fname, res.witness1lname);
          this.setFullnameInfo2(this.quotationM.insureage, "ชื่อพยาน/ผู้เขียน/พิมพ์", res.witness2title, res.witness2fname, res.witness2lname);
        // debugger;
      }, 
      (err)=> {
        console.log('Err : ', err);
      });
    }
    
    );
    
  }

  scrollToCenter () {
    this.content.scrollTo(0, 300, 500);
  }

  private setFullnameInfo(age: string, title: string, prefix: string, firstName: string, lastName: string): void {
    
    this.fullnameInfo = new FullNameInfo();
    this.fullnameInfo.age = age;
    this.fullnameInfo.title = title;
    this.fullnameInfo.prefix = prefix;
    this.fullnameInfo.firstName = firstName;
    this.fullnameInfo.lastName = lastName;
  }

  private setFullnameInfo2(age: string, title: string, prefix: string, firstName: string, lastName: string): void {
    
    this.fullnameInfo2 = new FullNameInfo();
    this.fullnameInfo2.age = age;
    this.fullnameInfo2.title = title;
    this.fullnameInfo2.prefix = prefix;
    this.fullnameInfo2.firstName = firstName;
    this.fullnameInfo2.lastName = lastName;
  }

  private setInsureFullname(age: string, title: string, prefix: string, firstName: string, lastName: string): void{
    this.insurefullnameInfo = new FullNameInfo();
    this.insurefullnameInfo.age = age;
    this.insurefullnameInfo.title = title;
    this.insurefullnameInfo.prefix = prefix;
    this.insurefullnameInfo.firstName = firstName;
    this.insurefullnameInfo.lastName = lastName;
  }

  private fullnameChange(fullname: FullNameInfo) {
    this.appSignPage.get('witness1title').setValue(fullname.prefix);
    this.appSignPage.get('witness1fname').setValue(fullname.firstName);
    this.appSignPage.get('witness1lname').setValue(fullname.lastName);
    this.appSignPage.get('witness_fname').setValue(fullname.prefix+' '+fullname.firstName + ' ' + fullname.lastName);
    this.appsData.appSign = this.appSignPage;

    this.setFullnameInfo(this.quotationM.insureage, "ชื่อพยาน",fullname.prefix, fullname.firstName,fullname.lastName);
  }

  private fullnameChange2(fullname: FullNameInfo) {
    this.appSignPage.get('witness2title').setValue(fullname.prefix);
    this.appSignPage.get('witness2fname').setValue(fullname.firstName);
    this.appSignPage.get('witness2lname').setValue(fullname.lastName);
    this.appSignPage.get('witness_fname2').setValue(fullname.prefix+' '+fullname.firstName + ' ' + fullname.lastName);
    this.appsData.appSign = this.appSignPage;

    this.setFullnameInfo2(this.quotationM.insureage, "ชื่อพยาน/ผู้เขียน/พิมพ์",fullname.prefix, fullname.firstName,fullname.lastName);
  }

  private insureFullnameChange(fullname: FullNameInfo){
    this.appSignPage.get('insuretitle').setValue(fullname.prefix);
    this.appSignPage.get('insurename').setValue(fullname.firstName);
    this.appSignPage.get('insurelastname').setValue(fullname.lastName);

    this.appSignPage.get('name').setValue(fullname.prefix+fullname.firstName+' '+fullname.lastName);

    this.appsData.appSign = this.appSignPage;

    this.setInsureFullname(this.quotationM.insureage,"ชื่อผู้เอาประกันภัย",fullname.prefix, fullname.firstName,fullname.lastName);
  }
}
