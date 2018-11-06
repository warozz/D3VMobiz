import { QuestionRiskProfileModel } from './../../../providers/ulink-app-data/question-risk-profile-model';
import { RequestModel } from '../../../providers/model/request-model';
import { ApiProvider } from '../../../providers/api/api';
import { Component, Input } from '@angular/core';
import { Events, NavController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { FunctionName } from '../../../providers/constants/function-name';
import { ServiceName } from '../../../providers/constants/service-name';
import { ProspectModel } from './../../../providers/prospect/prospect-model';
import { RiskProfileModel} from './../../../providers/ulink-app-data/risk-profile-model'
import { ProspectUlinkExpreieneModel } from './../../../providers/service-table/prospect-ulink-expreiene-medel'
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { CommonUtilProvider } from '../../../providers/common-util/common-util';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { RiskAssessmentModel } from '../../../providers/ulink-app-data/risk-assessment-model';
import * as moment from 'moment';
import { UlinkApplicationFormM } from '../../../providers/ulink-app-data/ulink-application-form-model';
import { UlinkAppDataProvider } from '../../../providers/ulink-app-data/ulink-app-data';
import { async } from 'rxjs/scheduler/async';
import _ from 'lodash';

@Component({
  selector: 'riskprofile',
  templateUrl: 'riskprofile.html'
})
export class RiskprofileComponent {

  private riskProfile: QuestionRiskProfileModel = new QuestionRiskProfileModel();

  private prospectUlinkEx: ProspectUlinkExpreieneModel;
  
  // private sum:Number = 0;
  private showPieChart:boolean = false;
  private formDetail: string = '';
  
  quotationMs = [];
  applicationMs = [];

  pieChartLabels = ['เงินฝากและตราสารหนี้ระยะสั้น','ตราสารหนี้ภาครัฐที่มีอายุมากกว่า 1 ปี','ตราสารหนี้ภาคเอกชน','ตราสารทุน','การลงทุนทางเลือก'];
  pieChartData = [0,0,0,0,0];
  pieChartColor = [{ backgroundColor:['#2A4F77','#2b5c91','#4076B1','#adcbed','#DEECFA']}];
  pieChartOption = {
    responsive: true,
    pieceLabel: {
      render: 'percentage',
      fontColor: 'white',
      precision: 2
    } 
  }

  private  dataQuestion1 = [
    {id: '1', ageStart : 56, ageEnd : 999, text : '(1) มากกว่า 55 ปี'},
    {id: '2', ageStart : 45, ageEnd : 55, text : '(2) 45 - 55 ปี'},
    {id: '3', ageStart : 35, ageEnd : 44, text : '(3) 35 - 44 ปี'},
    {id: '4', ageStart : 0, ageEnd : 34, text : '(4) น้อยกว่า 35 ปี'}
  ];

  private toggle_footer :boolean = false;
  private riskPoint: any = {};
  private checkboxQ4 = {
    isCheckedQ4_1: false,
    isCheckedQ4_2: false,
    isCheckedQ4_3: false,
    isCheckedQ4_4: false
  }

  private disableSaveButton: boolean = true;

  private riskProfileULinkAppForm : Array<UlinkApplicationFormM> = [];
  
  private prospect: ProspectModel;
  @Input('prospect') set setProspect(prospect: ProspectModel) {
    this.prospect = prospect;
    this.changeAge(this.prospect);
  }

  @Input('refresh') set setRefresh(refresh: boolean) {
    if (refresh) {
      this.toggle_footer = true;
      this.getRiskProfileFromService();
    }
  }

  private appForm: UlinkApplicationFormM = new UlinkApplicationFormM;
  @Input('appForm') set setFormType(appForm: UlinkApplicationFormM) {
    this.appForm = appForm;
  }

  private formPage: string = '';

  constructor(
    public navCtrl: NavController,
    public events: Events, 
    public apiProvider: ApiProvider, 
    private alertCtrl: AlertController,
    private alertDirective: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private commonUtilProvider: CommonUtilProvider,
    private ulinkApplication: UlinkAppDataProvider,
    private toastCtrl: ToastController,
    public navParams: NavParams
    )  {

     if(typeof this.navParams.get('page') != 'undefined'){
       this.formPage = this.navParams.get('page');
       if(this.formPage == 'AppFormUlink' ){
        this.riskProfileULinkAppForm  =  this.ulinkApplication.ulinkApplicationFormList.filter(item => item.formtype == 'riskprofile'); //get Formtype and status
        console.log("riskProfileULinkAppForm : ",this.riskProfileULinkAppForm);
       }

     }
     
  }



  /**
   * search last riskprofile
   */
  private getRiskProfileFromService() {

    const citizenID: string = this.prospect.citizenID;
    if ((citizenID != '') && (typeof citizenID != 'undefined')){
      this.loadingCtrl.present();
      let reqModel: RequestModel = new RequestModel();
      reqModel.serviceName = ServiceName.SELECT;
      reqModel.functionName = FunctionName.RISKPROFILE;
      // reqModel.searchkey = 'APPLICATION_PAGE';
      reqModel.param = [{citizenid: this.prospect.citizenID}];
  
      console.log('request Data getRiskProfile reqModel:--->', reqModel);
      this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
        (res)=>{
          if(res['datas'].length > 0){
            const data = res['datas'][0];
            console.log('res data ---> ', data);
            console.log(JSON.stringify(res));

            const riskAssessments: Array<RiskAssessmentModel> = data['riskassessmentMs'];

            console.log('riskAssessments data ---> ', riskAssessments);

            for (let i = 1; i < riskAssessments.length; i++) {

              let riskAssessment = riskAssessments[i];

              let answer = String(riskAssessment['riskanswer']);
              let riskquestionid = riskAssessment['riskquestionid'];

              this.riskProfile['risk'+(i+1)] = answer;
              // question4
              if(riskquestionid == 4){
                for (let j = 1; j < 5; j++) {

                  if(answer.includes(String(j))){
                    this.riskProfile['four'+j] = String(j);
                    this.checkboxQ4['isCheckedQ4_'+j] = true;
                  }  
                }
              }
            }
            this.submitCalculate();
          }else {
            this.resetData();
          }

          
          this.loadingCtrl.dismiss();
        },
        (err)=> {
          console.log(JSON.stringify(err));
          setTimeout(() => {
            this.loadingCtrl.dismiss();
          }, 1000);
          
        }
      );
  
    }


  }

  private changeAge(prospect : ProspectModel){
    if(prospect == undefined){
      this.riskPoint.age = '';
    }
    else{
      
      const age : number = Number(prospect.age);
      for(let i = 0; i < this.dataQuestion1.length; i++){
        const tmp = this.dataQuestion1[i];
        if(age >= tmp.ageStart && age <= tmp.ageEnd){
          this.riskPoint.age = tmp.text;
          this.riskProfile.risk1 = tmp['id'];
        }
      }
    }
  }

  
  getValCheckBox(ev){
    if(!ev.target.checked){

      if(ev.target.id == 'chkRiskProfile1'){
        this.riskProfile.four1 = '0';
      }
      if(ev.target.id == 'chkRiskProfile2'){
        this.riskProfile.four2 = '0';
      }
      if(ev.target.id == 'chkRiskProfile3'){
        this.riskProfile.four3 = '0';
      }
      if(ev.target.id == 'chkRiskProfile4'){
        this.riskProfile.four4 = '0';
      }
      console.log('riskProfile : ',this.riskProfile);
      return;
    } 
    // checked
    if(ev.target.id == 'chkRiskProfile1'){
      this.riskProfile.four1 = '1';
    }
    if(ev.target.id == 'chkRiskProfile2'){
      this.riskProfile.four2 = '2';
    }
    if(ev.target.id == 'chkRiskProfile3'){
      this.riskProfile.four3 = '3';
    }
    if(ev.target.id == 'chkRiskProfile4'){
      this.riskProfile.four4 = '4';
    }
    console.log('riskProfile : ',this.riskProfile);
    this.dataChange();
  }

  private submitCalculate() {
    let int1 = Number(this.riskProfile.risk1);
    let int2 = Number(this.riskProfile.risk2); 
    let int3 = Number(this.riskProfile.risk3);
    let intFour1 = Number(this.riskProfile.four1);
    let intFour2 = Number(this.riskProfile.four2);
    let intFour3 = Number(this.riskProfile.four3);
    let intFour4 = Number(this.riskProfile.four4);
    let int5 = Number(this.riskProfile.risk5);
    let int6 = Number(this.riskProfile.risk6);
    let int7 = Number(this.riskProfile.risk7);
    let int8 = Number(this.riskProfile.risk8);
    let int9 = Number(this.riskProfile.risk9);
    let int10 = Number(this.riskProfile.risk10);
    let int11 = Number(this.riskProfile.risk11);
    let int12 = Number(this.riskProfile.risk12);
    
    if(int2 == 0 || int3 == 0|| int5 == 0 || int6 == 0 || int7 == 0 || int8 == 0
       || int9 == 0 || int10 == 0 ||
      ( intFour1 == 0 && intFour2 == 0 && intFour3 == 0 && intFour4 == 0 )){
        this.openPopUpPleaseInput('กรุณาตอบให้ครบทุกคำถาม');
        this.showPieChart = false;
        return;
    }
    var Numbers = [intFour1, intFour2, intFour3, intFour4];
    var max = Numbers.reduce(function(p, v) {
      //console.log('p :',p)
      //console.log('v :',v)
      return (p > v ? p : v);
    });

    this.riskProfile.risk4 = String(max);


  
    this.riskProfile.sumScore = int1 + int2 + int3 + max + int5 + int6 + int7 + int8 + int9 + int10;

    if(!this.riskProfile.sumScore){
      this.openPopUpPleaseInput('กรุณาใส่ข้อมูล');
      this.showPieChart = false;
      return;
    }
    
    console.log(' riskProfile.sumScore :'+  this.riskProfile.sumScore);
    this.openPieChart();

  }

  
  openPieChart() : void{

    if(this.riskProfile.sumScore < 15){
      this.riskProfile.resultType = 'เสี่ยงต่ำ';
      this.pieChartData = [30, 30, 20, 10, 5];
      this.formDetail = 'low';
    }else if(this.riskProfile.sumScore <= 21){
      this.riskProfile.resultType = 'เสี่ยงปานกลางค่อนข้างต่ำ';
      this.pieChartData = [20, 35, 35, 20, 10];
      this.formDetail = 'medium';
    }else if(this.riskProfile.sumScore <= 29){
      this.riskProfile.resultType = 'เสี่ยงปานกลางค่อนข้างสูง';
      this.pieChartData = [10, 30, 30, 30, 10];
      this.formDetail = 'medium';
    }else if(this.riskProfile.sumScore <= 36){
      this.riskProfile.resultType = 'เสี่ยงสูง';
      this.pieChartData = [10, 20, 20, 40, 20];
      this.formDetail = 'hight';
    }else{
      this.riskProfile.resultType = 'เสี่ยงสูงมาก';
      this.pieChartData = [5, 15, 15, 60, 30];
      this.formDetail = 'hight';
    }
    this.showPieChart = true;
    this.disableSaveButton = false;

  }

  openPopUpPleaseInput(text) : void{
    let alert = this.alertCtrl.create({
      // title: 'Header',
      subTitle: text,
      buttons: ['ปิด']
    });
    alert.present();
  }

  private saveRiskProfile() {

    if(this.ValidateData() && this.showPieChart){
      this.loadingCtrl.present();

      let riskProfile = this.setRiskProfileData();
  
      console.log('riskProfile ---->', riskProfile);
  
      let reqModel: RequestModel = new RequestModel();
      reqModel.serviceName = ServiceName.INSERT;
      reqModel.functionName = FunctionName.RISKPROFILE;
      reqModel.param = [riskProfile];
  
      console.log('request Data saveRiskProfile reqModel:--->', reqModel);
      this.commonUtilProvider.callRestServiceTLPrompt(reqModel).then(
        (res)=>{
          console.log(JSON.stringify(res));
          //ถ้าเป็น ใบคำขอ save 
          if(typeof this.appForm.applicationid != 'undefined'){
            let assessmentdate = res['datas'][0]['assessmentdate'];
            this.saveAppRiskProfile(assessmentdate);
          }else{
            this.loadingCtrl.dismiss();
            setTimeout(() => {
              this.alertDirective.warning('บันทึกสำเร็จ');
            }, 1000);
          }
        },
        (err)=> {
          console.log(JSON.stringify(err));
          setTimeout(() => {
            this.loadingCtrl.dismiss();
            this.alertDirective.error(err);
          }, 1000);
        }
      );
    }
  }

  private saveAppRiskProfile(assessmentdate){
    console.log("assessmentdate-->",assessmentdate);
    let date: string = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let model: UlinkApplicationFormM = new UlinkApplicationFormM();
    model.applicationid = this.appForm.applicationid;
    model.formtype = 'riskprofile';
    model.formdetail = this.formDetail; //ระดับความเสี่ยง
    model.riskprofiledate = assessmentdate;

    const riskProfileULinkAppForm : UlinkApplicationFormM =  _.first(this.riskProfileULinkAppForm);
    model.allocationdate = riskProfileULinkAppForm.allocationdate;

    model.createdatetime = date;
    model.lastmodify = date;
    model.status = 'S';

    this.ulinkApplication.putUlinkApplicationForm(model).then(
      (res)=> {
        console.log(JSON.stringify(res));
        this.loadingCtrl.dismiss();
        let toast = this.toastCtrl.create({
            message: 'บันทึกสำเร็จ',
            duration: 3000
        });
        toast.present();
        setTimeout(() => {
          this.navCtrl.push('AppFormUlinkPage');
        }, 1500);
      },
      (err)=> {
        this.loadingCtrl.dismiss();
          let toast = this.toastCtrl.create({
            message: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง',
            duration: 3000
          });
        toast.present();
        console.log(err);
      }
    );
  }

  private setRiskProfileData(): RiskProfileModel {

    let date: string = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let sumScore: number = this.riskProfile.sumScore;

    let riskProfile: RiskProfileModel = new RiskProfileModel();
    riskProfile.citizenid = this.prospect.citizenID;
    riskProfile.assessmentdate = date;
    riskProfile.riskscore = sumScore;
    riskProfile.parttwo =  this.getPartTwo(sumScore);
    riskProfile.partthree = this.getPartTwo(sumScore);
    riskProfile.status = 'S';
    


    let riskAssessments: Array<RiskAssessmentModel> = [];

    for (let i = 1; i < 13; i++) {
      const data = Number(this.riskProfile['risk'+i]);
      console.log('data --->', data);
      let riskAssessment: RiskAssessmentModel= new RiskAssessmentModel();
      riskAssessment.citizenid = riskProfile.citizenid;
      riskAssessment.assessmentdate = riskProfile.assessmentdate;
      riskAssessment.riskquestionid = i;
      riskAssessment.riskanswer = data;
      riskAssessment.score = data;
      riskAssessment.status = 'S';


      if(i == 4){
        let dataQuestion4 = '';
        for (let j = 1; j < 5; j++) {
          const data = Number(this.riskProfile['four'+j]);
          
          if(data > 0){
            dataQuestion4 = dataQuestion4 + String(data);
          }
        }

        riskAssessment.riskanswer = Number(dataQuestion4);
        riskAssessment.score = Number(dataQuestion4);


      }

      riskAssessments.push(riskAssessment);

    }

    riskProfile.riskassessmentMs = riskAssessments;

    return riskProfile;

  }

  private getPartTwo(sumScore: number): number {
    if(sumScore < 15) return 1;
    if(sumScore >= 15 && sumScore <= 21) return 2;
    if(sumScore >= 22 && sumScore <= 29) return 3;
    if(sumScore >= 30 && sumScore <= 36) return 4;
    if(sumScore >= 37) return 5;

  }

  private ValidateData(): boolean {

    let pattern = /^(-?[0-9]*)$/;
    let checkIdno = pattern.test(this.prospect.citizenID);
    if((this.prospect.citizenID == '') || (typeof this.prospect.citizenID == 'undefined')){
      this.alertDirective.warning('กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลัก');
      return false;
    }
    else if ((this.prospect.citizenID != '') && (typeof this.prospect.citizenID != 'undefined') && (!checkIdno)){
      this.alertDirective.warning('กรุณากรอกเลขบัตรประจำตัวประชาชนให้ถูกรูปแบบ');
      this.prospect.citizenID = '';
        return false;
    }else if((this.prospect.citizenID != '') && (typeof this.prospect.citizenID != 'undefined') && this.prospect.citizenID.length < 13){
      this.alertDirective.warning('กรุณากรอกเลขบัตรประจำตัวประชาชน 13 หลัก');
        return false;
    }
    return true;
  }

  private resetData() {

    this.riskProfile = new QuestionRiskProfileModel();
    this.showPieChart = false;

    this.pieChartData = [0,0,0,0,0];
    this.pieChartOption = {
      responsive: true,
      pieceLabel: {
        render: 'percentage',
        fontColor: 'white',
        precision: 2
      } 
    }
  
    this.riskPoint = {};
    this.checkboxQ4 = {
      isCheckedQ4_1: false,
      isCheckedQ4_2: false,
      isCheckedQ4_3: false,
      isCheckedQ4_4: false
    }

    this.disableSaveButton = true;
    this.changeAge(this.prospect);
  }

  private dataChange(){
    this.showPieChart = false;
    this.disableSaveButton = true;
  }

}
