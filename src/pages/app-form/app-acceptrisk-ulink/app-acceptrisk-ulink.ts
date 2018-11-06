import { UlinkAppformDataProvider } from './../../../providers/ulink-appform-data/ulink-appform-data';
import { UlinkApplicationDetailM } from './../../../providers/ulink-app-data/ulink-application-detail-model';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { LoadingDirective } from './../../../directives/extends/loading/loading';
import { ToastController } from 'ionic-angular';
import { UlinkApplicationFormM } from './../../../providers/ulink-app-data/ulink-application-form-model';
import { UlinkAppDataProvider } from './../../../providers/ulink-app-data/ulink-app-data';
import { ApiProvider } from './../../../providers/api/api';
import { FunctionName } from './../../../providers/constants/function-name';
import { RequestModel } from './../../../providers/model/request-model';
import { MCAapplicationsM } from './../../../providers/mcaapplications/mcaapplications-model';
import { ApplicationData } from './../../../providers/application/application-data';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UnitlinkAcceptRiskM } from "../../../providers/unitlink-accept-risk";
import  _ from "lodash";
import { ServiceName } from '../../../providers/constants/service-name';
import { FullNameInfo } from '../../../directives/utility/fullname-popup/fullname-info';

/**
 * Generated class for the AppAcceptriskUlinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'แบบรับทราบความเสี่ยง'
})
@Component({
  selector: 'page-app-acceptrisk-ulink',
  templateUrl: 'app-acceptrisk-ulink.html',
})
export class AppAcceptriskUlinkPage {

  private appInfo: FormGroup;
  private acceptRisk: UnitlinkAcceptRiskM = new UnitlinkAcceptRiskM();
  private allFundLists = [];
  private appForm1: FormGroup;
  private ulinkApplication: UlinkApplicationFormM;

  //step 2
  private appForm2: FormGroup;
  private fullnameInfo: FullNameInfo = new FullNameInfo();
  private quatationM;
  private fundSelected: any = [];

  // check box
  private preventexchange = false;
  private overrisk = false;

  // Select step
  private selectedStep: number = 0;
  private oldIndex: number = -1;
  private saleInfomation: any;
  
  constructor(
    private apiProvider: ApiProvider,
    private appData: ApplicationData,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private ulinkAppData: UlinkAppDataProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingDirective,
    private alertCtrl: AlertDirective,
    private storage: Storage,
    private ulinkAppFormProvider: UlinkAppformDataProvider) {
  
    this.storage.get('saleInformation').then(saleInfo => {
      this.saleInfomation = saleInfo;
    });
    
    console.log('this.ulinkAppData', this.ulinkAppData)
    this.getUlinkAcceptRisk();
    
    this.setFormGroup(); // Set form group
    this.setFormGroup2();
    this.setData();
    
  }

  ionViewDidEnter()
  {
    console.log('ionViewDidEnter');
  }

  ionViewDidLoad()
  {
    console.log('--this.acceptRisk', this.acceptRisk)
    console.log('appData', this.appData);
    // this.setData();
  }

  private setData()
  {
    console.log('setData')
    this.quatationM = this.appData.getQuotation();
    const {insureage, pname, fname, lname} = this.quatationM;
    const appDetail = _.first(_.get(this.appData, 'applicationMasterM.unitlinkapplicationdetailMs', new UlinkApplicationDetailM));
    this.setFullnameInfo(insureage, "ระบุผู้แทนโดยชอบธรรม", appDetail.lawtitle, appDetail.lawfname, appDetail.lawlname);
    this.appForm2.get('txtname').setValue(`${appDetail.lawtitle} ${appDetail.lawfname} ${appDetail.lawlname}`);
    this.appForm2.get('prename').setValue(appDetail.lawtitle);
    this.appForm2.get('firstname').setValue(appDetail.lawfname);
    this.appForm2.get('lastname').setValue(appDetail.lawlname);

    const appFormLists = _.get(this.ulinkAppData, 'ulinkApplicationFormList');
    this.ulinkApplication = _.find(appFormLists, ['formtype', 'riskaccept']);
    console.log('this.ulinkApplication ssss', this.ulinkApplication);
  }
  
  private setFormGroup()
  {
    const quatation = this.appData.getQuotation();
    const application: MCAapplicationsM = _.get(this.appData, 'applicationMasterM.mcaapplicationM', new MCAapplicationsM)
    const { planname, occupationtype, mode } = quatation;
    const {
      age,
      gender,
      title,
      name,
      lastname
    } = application;

    this.appInfo = this.fb.group({
      // ผู้เอาประกันภัย
      customername: { value: `${title} ${name} ${lastname}`, disabled: true },
      // เพศ
      gender: { value: gender === 'F' ? 'หญิง' : 'ชาย', disabled: true },
      // อายุ
      age: { value: age, disabled: true },
      // แบบประกัน
      planname:  { value: planname, disabled: true },
      // ชำระเบี้ย
      payment: { value: this.getTextMode(mode), disabled: true },
      // ชั้นอาชีพ
      occupationtype: { value: occupationtype, disabled: true },

      // fundSelected: this.fb.array([])
    });
  
  }

  private setFormGroup2()
  {
    const application: MCAapplicationsM = _.get(this.appData, 'applicationMasterM.mcaapplicationM', new MCAapplicationsM)
    const {
      title,
      name,
      lastname,
      agentfullname,
      agentid
    } = application;

    this.appForm1 = this.fb.group({
      rate: '',
      riskchoice: '',
      overrisk: [false, Validators.requiredTrue],
      preventexchange: [false, Validators.requiredTrue]
    });

    this.appForm2 = this.fb.group({
      prename: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      //เปลี่ยนด้วยนะ
      customername: `${title} ${name} ${lastname}`,
      txtname : '',
      agentid: agentid,
      agentfullname: agentfullname,
      agentmobileno: '',
      agentopinion: '', // ความเห็น
      licensesic: ''
    });
  }

  private setDataToFormGroup()
  {
    console.log('this.ulinkApplication', this.ulinkApplication)
    this.appForm1.get('rate').setValue(this.ulinkApplication.formdetail);
    this.appForm1.get('riskchoice').setValue(this.acceptRisk.riskchoice);
    this.appForm1.get('overrisk').setValue(this.acceptRisk.overrisk === 'Y');
    this.appForm1.get('preventexchange').setValue(this.acceptRisk.preventexchange === 'Y');
    this.overrisk = this.acceptRisk.overrisk === 'Y';
    this.preventexchange = this.acceptRisk.preventexchange === 'Y';

    this.appForm2.get('agentopinion').setValue(this.acceptRisk.agentopinion);
    this.appForm2.get('agentmobileno').setValue(this.acceptRisk.agentmoblieno);
    this.appForm2.get('licensesic').setValue(this.saleInfomation.licensesic);

    if (this.acceptRisk.validateoverrisk  === 'N') {
      this.appForm1.get('overrisk').disable();
    }
    if (this.acceptRisk.validatepreventexchange  === 'N') {
      this.appForm1.get('preventexchange').disable();
    }
  }

  private fullnameChange(fullname: FullNameInfo)
  {
    console.log('fullname', fullname)
    this.appForm2.get('prename').setValue(fullname.prefix);
    this.appForm2.get('firstname').setValue(fullname.firstName);
    this.appForm2.get('lastname').setValue(fullname.lastName);
  }

  private getUlinkAcceptRisk()
  {
    console.log('getUlinkAcceptRisk');
    let model: UnitlinkAcceptRiskM = new UnitlinkAcceptRiskM();
    model = {
      ...model,
      applicationid: this.appData.getApplicationId()
    };
    
    let modelObj: Array<UnitlinkAcceptRiskM> = [];
    modelObj.push(model);

    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      functionName: FunctionName.ULINKACCEPTRISK,
      serviceName: ServiceName.SELECT,
      param: modelObj
    }

    this.apiProvider.callData(request).then(
      (res) => {
        const data = _.get(res, 'data', new UnitlinkAcceptRiskM());
        this.acceptRisk = _.first(data);
        console.log('this.acceptRisk', this.acceptRisk)
        this.getAllFund(); // โหลดไม่ทัน
      },
      (err) => {
        console.log('err err', err)
      });
  }

  private getAllFund()
  {
    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      functionName: FunctionName.ALLFUND,
      serviceName: ServiceName.SELECT,
      searchkey: '',
      param: [{
        "allfundid": "1"
      }]
    }

    this.apiProvider.callData(request).then(
      (res) => {
        const data = _.get(res, 'data[0].allfund', []);
        console.log('data data', data)
        this.allFundLists = data;
        this.setFundSelected();
        this.setDataToFormGroup();
      },
      (err) => {
        console.log('err err', err)
      });
  }

  private setFullnameInfo(age: string, title: string, prefix: string, firstName: string, lastName: string): void
  {
    this.fullnameInfo = new FullNameInfo();
    this.fullnameInfo.age = age;
    this.fullnameInfo.title = title;
    this.fullnameInfo.prefix = prefix;
    this.fullnameInfo.firstName = firstName;
    this.fullnameInfo.lastName = lastName;
  } 

  private setFundSelected(): void
  { 
    for (let i=0; i<10; i++) {
      if (this.acceptRisk != null && this.acceptRisk.listUnitlinkacceptriskallocation[i]) {
        _.each(this.allFundLists, a => {
          if (a.fundid == this.acceptRisk.listUnitlinkacceptriskallocation[i].fundid) {
            this.fundSelected[i] = a.fundcode;
          }
        });
      } else {
        this.fundSelected[i] = '';
      }
    }
  }

  private changeIndex(event: number)
  {
    this.oldIndex = this.selectedStep;
    this.selectedStep = event;
    
    // save step 1
    if (event == 1) {
      if (this.appForm1.valid) {
        this.saveStep1();
      } else {
        this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
        setTimeout(() => {
          this.selectedStep = this.oldIndex;
        }, 1);
      }
    } 
    // save step 2
    if (event == 0) {
      if (this.appForm2.valid) {
        this.saveStep2();
      } else {
        this.alertCtrl.warning('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
        setTimeout(() => {
          this.selectedStep = this.oldIndex;
        }, 1);
      }
    } 
  }

  private onChecked(event)
  {
    if (event.target.name === 'overrisk') {
      this.overrisk = event.target.checked;
    }
    if (event.target.name === 'preventexchange') {
      this.preventexchange = event.target.checked;
    }
    // this.appForm1.get(event.target.name).setValue(event.target.checked ? 'Y' : 'N');
  }

  private saveStep1()
  {
    let model: UnitlinkAcceptRiskM = this.acceptRisk;
    model = {
      ...model,
      overrisk: this.appForm1.get('overrisk').value ? 'Y' : 'N',
      preventexchange: this.appForm1.get('preventexchange').value ? 'Y' : 'N'
    };

    this.saveService(model);
  }

  private async saveStep2()  {
    let model: UnitlinkAcceptRiskM = this.acceptRisk;
    model = {
      ...model,
      agentopinion: this.appForm2.get('agentopinion').value, // ความเห็นตัวแทน
      agentmoblieno: this.appForm2.get('agentmobileno').value,
      overrisk: this.appForm1.get('overrisk').value ? 'Y' : 'N',
      preventexchange: this.appForm1.get('preventexchange').value ? 'Y' : 'N'
    };
    await this.saveLawInfomation();
    this.saveService(model);
  }

  private saveService(model: UnitlinkAcceptRiskM)
  {
    let modelObj: Array<UnitlinkAcceptRiskM> = [];
    modelObj.push(model);

    let request: RequestModel = new RequestModel();
    request = {
      ...request,
      functionName: FunctionName.ULINKACCEPTRISK,
      serviceName: ServiceName.UPDATE,
      param: modelObj
    }
    this.loadingCtrl.present();
    this.apiProvider.callData(request).then(
      (res) => {
        this.loadingCtrl.dismiss();
        const data = _.get(res, 'data', new UnitlinkAcceptRiskM());
        let toast = this.toastCtrl.create({
          message: 'บันทึกสำเร็จ',
          duration: 3000
        });
        toast.present();
      },
      (err) => {
        this.loadingCtrl.dismiss();
        console.log('err err', err)
        let toast = this.toastCtrl.create({
          message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
            duration: 3000
        });
        toast.present();
        this.selectedStep = this.oldIndex;
      });

  }
  
  private async saveLawInfomation()
  {
    
    if (this.appData.applicationMasterM.unitlinkapplicationdetailMs.length > 0) {
      // update
      let model: UlinkApplicationDetailM = _.first(this.appData.applicationMasterM.unitlinkapplicationdetailMs);
      model = {
        ...model,
        applicationid: this.appData.getApplicationId(),
        lawtitle: this.appForm2.get('prename').value,
        lawfname: this.appForm2.get('firstname').value,
        lawlname: this.appForm2.get('lastname').value
      };
      return this.ulinkAppFormProvider.updateUlinkAppDetail(model);
    } else {
      // insert
      let model = new UlinkApplicationDetailM();
      model = {
        ...model,
        applicationid: this.appData.getApplicationId(),
        lawtitle: this.appForm2.get('prename').value,
        lawfname: this.appForm2.get('firstname').value,
        lawlname: this.appForm2.get('lastname').value
      };
      return this.ulinkAppFormProvider.insertUlinkAppDetail(model);
    }
  }


  private getTextMode(mode: string): string{
    if(mode == '1'){
      return "รายปี";
    } else if('2'){
      return "ราย 6 เดือน";
    } else if('4'){
      return "ราย 3 เดือน";
    } else if('0'){
      return "รายเดือน";
    } else if('1'){
      return "ชำระเบี้ยครั้งเดียว";
    }
    return "";
  }

  // เซฟใหญ่
  private saveForm()
  {
    if (this.selectedStep == 0) {
      this.saveStep1();
      this.ulinkAppData.patchUlinkApplicationForm('riskaccept', 'P');
    } else if(this.selectedStep == 1) {
      this.saveStep2();
      this.ulinkAppData.patchUlinkApplicationForm('riskaccept', 'S').then(
        () => {
          this.navCtrl.pop();
      });
    }
  }
}
