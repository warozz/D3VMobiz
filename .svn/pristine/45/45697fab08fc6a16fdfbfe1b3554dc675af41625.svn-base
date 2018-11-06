import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { IMyDpOptions } from "mydatepicker";
import { ValidateProvider } from "../../../../providers/validate/validate";
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { LoadingDirective } from "../../../../directives/extends/loading/loading";
import { AlertDirective } from '../../../../directives/extends/alert/alert';
import { ApplicationData } from '../../../../providers/application/application-data';
import { ApplicationAnswerM } from '../../../../providers/service-table/applicationanswer-model';
import * as moment from 'moment';
import _ from "lodash";


@IonicPage()
@Component({
  selector: 'page-app-medical-history',
  templateUrl: 'app-medical-history.html',
})
export class AppMedicalHistoryPage {

  /**
   * list โรค จาก check box
   */
  private diseaseInList = [];
  private diseaseInList_1 = [];
  private diseaseInList_2 = [];
  private diseaseInList_3 = [];
  
  // loop default detail value 
  /**
   * ใช้สำหรับ ดึงข้อมูล ใน process edit
   */
  private diseaseDetailList = [];

  private medicalHistoryObj: object = {};

  appMedicalHistory : FormGroup;

  private maxDate : string;
  
  constructor(
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private fb: FormBuilder,public content:Content ,
    public navCtrl: NavController,
    public navParams: NavParams,
    private validate: ValidateProvider,
    private platform: Platform,
    private appsData: ApplicationData
  ) {
    this.maxDate = moment().format('YYYY-MM-DD');
    this.appMedicalHistory = this.fb.group({
      hospitalName : '',
      physician: ['', Validators.required],
      physician_desc:'',
      yearphysician:['', Validators.required],
      physicianName:'',
      diseaseName:'',
      result:'',
      treatmentResult:'',
      medicalDate:'',
      treatmentPhysician:['', Validators.required],
      disease_25:'',
      disease_24:'',
      disease_23:'',
      disease_22:'',
      disease_21:'',
      disease_20:'',
      disease_19:'',
      disease_18:'',
      disease_17:'',
      disease_16:'',
      disease_15:'',
      disease_14:'',
      disease_13:'',
      disease_12:'',
      disease_11:'',
      disease_10:'',
      disease_9:'',
      disease_8:'',
      disease_7:'',
      disease_6:'',
      disease_5:'',
      disease_name1:'',
      treatment_result1:'',
      medical_contact1:'',
      treatmentDate1:'',
      disease_name2:'',
      treatment_result2:'',
      medical_contact2:'',
      treatmentDate2:'',
      disease_name3:'',
      treatment_result3:'',
      medical_contact3:'',
      treatmentDate3:''
    });
    
    this.appsData.getData('applicationAnswerMs').then((res: Array<ApplicationAnswerM> ) => {
      
      for(let item of res){
        if(item.questionid == '8'){
          if(item.answeryn == 'Y'){
            this.appMedicalHistory.get('physician').setValue('Y')
          }
          if(item.answeryn == 'N'){
            this.appMedicalHistory.get('physician').setValue('N')
            this.appMedicalHistory.get('physician_desc').setValidators([Validators.required]);
          }
          if(item.answeryn == ''){
            this.appMedicalHistory.get('physician').setValue('')
          }
          // let ansYn = item.answeryn == 'Y' ? 'Y' : '';
          // this.appMedicalHistory.get('physician').setValue(ansYn)
          this.appMedicalHistory.get('physician_desc').setValue(item.answerdesc)
        }
       
        if(item.questionid == '9'){
          if(item.answeryn == 'Y'){
            this.appMedicalHistory.get('yearphysician').setValue('Y')
            this.appMedicalHistory.get('hospitalName').setValidators([Validators.required]);
            this.appMedicalHistory.get('physicianName').setValidators([Validators.required]);
            this.appMedicalHistory.get('diseaseName').setValidators([Validators.required]);
            this.appMedicalHistory.get('result').setValidators([Validators.required]);
            this.appMedicalHistory.get('treatmentResult').setValidators([Validators.required]);
            this.appMedicalHistory.get('medicalDate').setValidators([Validators.required]);
          }
          if(item.answeryn == 'N'){
            this.appMedicalHistory.get('yearphysician').setValue('N')
          }
          if(item.answeryn == ''){
            this.appMedicalHistory.get('yearphysician').setValue('')
          }
          // let ansYn = item.answeryn == 'Y' ? 'Y' : '';
          // this.appMedicalHistory.get('yearphysician').setValue(ansYn)
          this.appMedicalHistory.get('hospitalName').setValue(item.text1)
          this.appMedicalHistory.get('physicianName').setValue(item.text2)
          this.appMedicalHistory.get('diseaseName').setValue(item.text3)
          this.appMedicalHistory.get('result').setValue(item.text4)
          this.appMedicalHistory.get('treatmentResult').setValue(item.text5)
          this.appMedicalHistory.get('medicalDate').setValue(item.datetime1)
        }

        if(item.questionid == '10'){
          //console.log(' 10 == :',item.answeryn)
          if(item.answeryn == 'Y'){
            this.appMedicalHistory.get('treatmentPhysician').setValue('Y')
            // dafault validate detail 1
            this.appMedicalHistory.get('disease_name1').setValidators([Validators.required]);
            this.appMedicalHistory.get('treatment_result1').setValidators([Validators.required]);
            this.appMedicalHistory.get('medical_contact1').setValidators([Validators.required]);
            this.appMedicalHistory.get('treatmentDate1').setValidators([Validators.required]);
            this.appMedicalHistory.get('disease_name1').updateValueAndValidity();
            this.appMedicalHistory.get('treatment_result1').updateValueAndValidity();
            this.appMedicalHistory.get('medical_contact1').updateValueAndValidity();
            this.appMedicalHistory.get('treatmentDate1').updateValueAndValidity();
          }
          if(item.answeryn == 'N'){
            this.appMedicalHistory.get('treatmentPhysician').setValue('N')
          }
          if(item.answeryn == ''){
            this.appMedicalHistory.get('treatmentPhysician').setValue('')
          }
          // let ansYn = item.answeryn == 'Y' ? 'Y' : '';
          // this.appMedicalHistory.get('treatmentPhysician').setValue(ansYn)
        }
        //______________________

        if(item.questionid == '29'){//ติดเชื่อในหูชั้นกลาง
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_21').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ติดเชื้อในหูชั้นกลาง')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ติดเชื้อในหูชั้นกลาง',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '30'){//ต่อมทอนซิลอักเสบเรื้อรัง
          let ansYn = item.answeryn == 'Y' ? true : '';    
          this.appMedicalHistory.get('disease_5').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ต่อมทอนซิลอักเสบเรื้อรัง')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ต่อมทอนซิลอักเสบเรื้อรัง',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }

        if(item.questionid == '31'){//ไซนัสอักเสบ
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_9').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ไซนัสอักเสบ')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ไซนัสอักเสบ',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }

        if(item.questionid == '32'){//ปวดศีรษะไมเกรน
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_13').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ปวดศีรษะไมเกรน')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ปวดศีรษะไมเกรน',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }

        if(item.questionid == '33'){//ภูมิแพ้
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_16').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ภูมิแพ้')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ภูมิแพ้',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        } 
        
        if(item.questionid == '34'){//หลอดลมอักเสบเรื้อรัง
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_22').setValue(ansYn)
          if(ansYn){
           this.diseaseInList.push('หลอดลมอักเสบเรื้อรัง')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'หลอดลมอักเสบเรื้อรัง',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '35'){//กรดไหลย้อน
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_6').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('กรดไหลย้อน')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'กรดไหลย้อน',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '36'){//นิ่ว
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_20').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('นิ่ว')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'นิ่ว',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '37'){//ถุงน้ำดีอักเสบ
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_10').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ถุงน้ำดีอักเสบ')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ถุงน้ำดีอักเสบ',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '38'){//ไส้เลื่อน
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_14').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ไส้เลื่อน')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ไส้เลื่อน',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '39'){//ริดสีดวงทวาร
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_17').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ริดสีดวงทวาร')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ริดสีดวงทวาร',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '40'){//ฝีคัณฑศูตร
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_19').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ฝีคัณฑศูตร')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ฝีคัณฑศูตร',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '41'){//เยื่อบุโพรงมดลูกเจริญผิดที่
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_23').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('เยื่อบุโพรงมดลูกเจริญผิดที่')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'เยื่อบุโพรงมดลูกเจริญผิดที่',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '42'){//หมอนรองกระดูกเคลื่อน
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_11').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('หมอนรองกระดูกเคลื่อน')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'หมอนรองกระดูกเคลื่อน',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '43'){//ข้อเสื่อม
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_15').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ข้อเสื่อม')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ข้อเสื่อม',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '44'){//เส้นเอ็นอักเสบเรื้อรัง
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_18').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('เส้นเอ็นอักเสบเรื้อรัง')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'เส้นเอ็นอักเสบเรื้อรัง',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
          
        }
        if(item.questionid == '45'){//เส้นประสาทอักเสบ
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_24').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('เส้นประสาทอักเสบ')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'เส้นประสาทอักเสบ',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '46'){//ออทิสติก
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_8').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('ออทิสติก')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'ออทิสติก',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '47'){//สมาธิสั้น
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_12').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('สมาธิสั้น')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'สมาธิสั้น',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '51'){//กระดูกสันหลังเคลื่อน
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_7').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('กระดูกสันหลังเคลื่อน')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'กระดูกสันหลังเคลื่อน',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }
        if(item.questionid == '78'){//หมอนรองกระดูกเคลื่อน หรือทับเส้นประสาท
          let ansYn = item.answeryn == 'Y' ? true : '';
          this.appMedicalHistory.get('disease_25').setValue(ansYn)
          if(ansYn){
            this.diseaseInList.push('หมอนรองกระดูกเคลื่อน หรือทับเส้นประสาท')
          }
          if(item.text1){
            this.diseaseDetailList.push({
              'name':'หมอนรองกระดูกเคลื่อน หรือทับเส้นประสาท',
              'text1':item.text1,
              'text2':item.text2,
              'datetime1':item.datetime1
            })
          }
        }

      }
      this.diseaseInList_1 = this.diseaseInList_2 = this.diseaseInList_3 = this.diseaseInList;
      
      this.diseaseDetailList.forEach((value,index) => {
        
        let _index = index+1
        let strIndex = _index.toString()
        //console.log('strIndex : ',strIndex)

        this.appMedicalHistory.get('disease_name'+strIndex).setValue(value.name)
        this.appMedicalHistory.get('treatmentDate'+strIndex).setValue(value.datetime1)
        this.appMedicalHistory.get('treatment_result'+strIndex).setValue(value.text1)
        this.appMedicalHistory.get('medical_contact'+strIndex).setValue(value.text2)
      });
     
      //console.log('this.appMedicalHistory AA :',this.appMedicalHistory)
      // ตอนนี้ใช้ default validate detail 1 5/6/18 
      // default validate ให้ ค่าต่างๆ disease_name ต้องมีค่า
      // if(this.appMedicalHistory.get('disease_name1').value){
      //   this.appMedicalHistory.get('treatment_result1').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('medical_contact1').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('treatmentDate1').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('treatment_result1').updateValueAndValidity();
      //   this.appMedicalHistory.get('medical_contact1').updateValueAndValidity();
      //   this.appMedicalHistory.get('treatmentDate1').updateValueAndValidity();
      // }
      // if(this.appMedicalHistory.get('disease_name2').value){
      //   this.appMedicalHistory.get('treatment_result2').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('medical_contact2').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('treatmentDate2').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('treatment_result2').updateValueAndValidity();
      //   this.appMedicalHistory.get('medical_contact2').updateValueAndValidity();
      //   this.appMedicalHistory.get('treatmentDate2').updateValueAndValidity();
      // }
      // if(this.appMedicalHistory.get('disease_name3').value){
      //   this.appMedicalHistory.get('treatment_result3').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('medical_contact3').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('treatmentDate3').setValidators([Validators.required]);
      //   this.appMedicalHistory.get('treatment_result3').updateValueAndValidity();
      //   this.appMedicalHistory.get('medical_contact3').updateValueAndValidity();
      //   this.appMedicalHistory.get('treatmentDate3').updateValueAndValidity();
      // }
         
      //console.log('this.diseaseInList :',this.diseaseInList)
      // this.appMedicalHistory.get('hospitalName').setValue(item.text1)
    }, (err)=> {
      console.log('Err : ', err);
    }).then(() => {
      this.diseaseChange('');
    });
    //console.log('this.diseaseDetailList BB : ',this.diseaseDetailList)

    // ส่งข้อมูลไปเก็บที่ provider
    this.appsData.appMedicalHistory = this.appMedicalHistory;
  }


  // function test
  private submitSave():void {
    //console.log("submitSave");
          
    //console.log('appMedicalHistory controls',this.appMedicalHistory.controls)

  }
 
  changePhysician(value: string){
    if(value == 'N'){
      this.appMedicalHistory.get('physician_desc').setValidators([Validators.required]);
    }
    if(value == 'Y'){
      this.appMedicalHistory.controls['physician_desc'].clearValidators();
      this.appMedicalHistory.get('physician_desc').setValue('')
    }
  }

  changeYearphysician(value: string){
    //console.log('changeYearphysician : ',value)
  
    if(value == 'Y'){
      this.appMedicalHistory.get('hospitalName').setValidators([Validators.required]);
      this.appMedicalHistory.get('physicianName').setValidators([Validators.required]);
      this.appMedicalHistory.get('diseaseName').setValidators([Validators.required]);
      this.appMedicalHistory.get('result').setValidators([Validators.required]);
      this.appMedicalHistory.get('treatmentResult').setValidators([Validators.required]);
      this.appMedicalHistory.get('medicalDate').setValidators([Validators.required]);
    }
    if(value == 'N'){
      this.diseaseInList = [];
      this.clearSelect();
      //console.log('this.appMedicalHistory',this.appMedicalHistory);
      this.appMedicalHistory.controls['hospitalName'].clearValidators();
      this.appMedicalHistory.controls['physicianName'].clearValidators();
      this.appMedicalHistory.controls['diseaseName'].clearValidators();
      this.appMedicalHistory.controls['result'].clearValidators();
      this.appMedicalHistory.controls['treatmentResult'].clearValidators();
      this.appMedicalHistory.controls['medicalDate'].clearValidators();
      //console.log('this.appMedicalHistory2',this.appMedicalHistory);
      this.appMedicalHistory.get('hospitalName').setValue('')
      this.appMedicalHistory.get('physicianName').setValue('')
      this.appMedicalHistory.get('diseaseName').setValue('')
      this.appMedicalHistory.get('result').setValue('')
      this.appMedicalHistory.get('treatmentResult').setValue('')
      this.appMedicalHistory.get('medicalDate').setValue('')
      //console.log('this.appMedicalHistory3',this.appMedicalHistory);
    }
    this.appMedicalHistory.get('hospitalName').updateValueAndValidity();
    this.appMedicalHistory.get('physicianName').updateValueAndValidity();
    this.appMedicalHistory.get('diseaseName').updateValueAndValidity();
    this.appMedicalHistory.get('result').updateValueAndValidity();
    this.appMedicalHistory.get('treatmentResult').updateValueAndValidity();
    this.appMedicalHistory.get('medicalDate').updateValueAndValidity();
  }

  /**
   * 
   * @param value data จากการ เลือก radio เคย/ไม่เคย
   * @see 'เป็น function สำหรับแก้ไขการ varidate data'
   */
  private changeTreatmentPhysician(value : any) : void {
    if(value == 'Y'){
      this.appMedicalHistory.get('disease_name1').setValidators([Validators.required]);
      this.appMedicalHistory.get('treatment_result1').setValidators([Validators.required]);
      this.appMedicalHistory.get('medical_contact1').setValidators([Validators.required]);
      this.appMedicalHistory.get('treatmentDate1').setValidators([Validators.required]);
      this.appMedicalHistory.get('disease_name1').updateValueAndValidity();
      this.appMedicalHistory.get('treatment_result1').updateValueAndValidity();
      this.appMedicalHistory.get('medical_contact1').updateValueAndValidity();
      this.appMedicalHistory.get('treatmentDate1').updateValueAndValidity();
    }
    if(value == 'N'){
      this.clearSelect();
      //console.log('clear all checkbox disease')
      // list in disease detail dropdown 
      this.diseaseInList = [];
      // 5-25 is number default checkbox
      for(let i = 5; i <=25 ; i ++){
        let strStart = i.toString();
        this.appMedicalHistory.get('disease_'+strStart).setValue('');
      }
      // 1-3 is number default disease detail
      for(let i = 1; i <=3 ; i ++){
        let strStart = i.toString();
        this.appMedicalHistory.controls['disease_name'+strStart].clearValidators();
        this.appMedicalHistory.controls['treatment_result'+strStart].clearValidators();
        this.appMedicalHistory.controls['medical_contact'+strStart].clearValidators();
        this.appMedicalHistory.controls['treatmentDate'+strStart].clearValidators();
        this.appMedicalHistory.get('disease_name'+strStart).setValue('');
        this.appMedicalHistory.get('treatment_result'+strStart).setValue('');
        this.appMedicalHistory.get('medical_contact'+strStart).setValue('');
        this.appMedicalHistory.get('treatmentDate'+strStart).setValue('');
        this.appMedicalHistory.get('disease_name'+strStart).updateValueAndValidity();
        this.appMedicalHistory.get('treatment_result'+strStart).updateValueAndValidity();
        this.appMedicalHistory.get('medical_contact'+strStart).updateValueAndValidity();
        this.appMedicalHistory.get('treatmentDate'+strStart).updateValueAndValidity();
      }

    }
  }
  // validate ใน detail ถ้า dropdown 1 - 3 ตัวไหนมีค่า ต้องมีรายละเอียด
  private diseaseCheck(event : any) : void {
    //console.log('event.terget : ',event.terget)
    let checked = event.target.checked;
    let value = event.target.defaultValue;
    // console.log('checked : ',checked)
    // console.log('value : ',value)
    
    if(event.target.checked){ //checkbox == true

      if(this.diseaseInList.length > 0){ // มี ข้อมูลแล้ว กดต๊ิก ตัวที่ 2
        const index: number = this.diseaseInList.indexOf(value);
        if (index == -1) {
          this.diseaseInList.push(value);
        } 
      }else{ // กดติ๊กครั้งแรก
        this.diseaseInList.push(value)
      }

    }else{ // checkbox == false  >> remove it
      const index: number = this.diseaseInList.indexOf(value);
      if (index !== -1) {
        this.diseaseInList.splice(index, 1);
        this.clearDiseaseForm(value);
      }  
      // ตอนนี้ใช้ default validate detail 1 5/6/18 
      //value ที่ check ออกเหมือนกับ ค่าไหนก็ ล้างค้า ในชุดนั้นๆ    
      // if(value == this.appMedicalHistory.get('disease_name1').value){
      //   this.appMedicalHistory.controls['treatment_result1'].clearValidators();
      //   this.appMedicalHistory.controls['medical_contact1'].clearValidators();
      //   this.appMedicalHistory.controls['treatmentDate1'].clearValidators();
      //   this.appMedicalHistory.get('treatment_result1').setValue('')
      //   this.appMedicalHistory.get('medical_contact1').setValue('')
      //   this.appMedicalHistory.get('treatmentDate1').setValue('')
      //   this.appMedicalHistory.get('treatment_result1').updateValueAndValidity();
      //   this.appMedicalHistory.get('medical_contact1').updateValueAndValidity();
      //   this.appMedicalHistory.get('treatmentDate1').updateValueAndValidity();
      // }
      // if(value == this.appMedicalHistory.get('disease_name2').value){
      //   this.appMedicalHistory.controls['treatment_result2'].clearValidators();
      //   this.appMedicalHistory.controls['medical_contact2'].clearValidators();
      //   this.appMedicalHistory.controls['treatmentDate2'].clearValidators();
      //   this.appMedicalHistory.get('treatment_result2').setValue('')
      //   this.appMedicalHistory.get('medical_contact2').setValue('')
      //   this.appMedicalHistory.get('treatmentDate2').setValue('')
      //   this.appMedicalHistory.get('treatment_result2').updateValueAndValidity();
      //   this.appMedicalHistory.get('medical_contact2').updateValueAndValidity();
      //   this.appMedicalHistory.get('treatmentDate2').updateValueAndValidity();
      // }
      // if(value == this.appMedicalHistory.get('disease_name3').value){
      //   this.appMedicalHistory.controls['treatment_result3'].clearValidators();
      //   this.appMedicalHistory.controls['medical_contact3'].clearValidators();
      //   this.appMedicalHistory.controls['treatmentDate3'].clearValidators();
      //   this.appMedicalHistory.get('treatment_result3').setValue('')
      //   this.appMedicalHistory.get('medical_contact3').setValue('')
      //   this.appMedicalHistory.get('treatmentDate3').setValue('')
      //   this.appMedicalHistory.get('treatment_result3').updateValueAndValidity();
      //   this.appMedicalHistory.get('medical_contact3').updateValueAndValidity();
      //   this.appMedicalHistory.get('treatmentDate3').updateValueAndValidity();
      // }

    }
    this.diseaseChange('');
  }

  private diseaseChange(diseaseNo : string) : void {
    // filter ชื่อโรคให้ไม่ขึ้นใน selection อันอื่นในกรณีที่ถูกเลือกแล้ว
    // const select1 = this.appMedicalHistory.get('disease_name1').value;
    // const select2 = this.appMedicalHistory.get('disease_name2').value;
    // const select3 = this.appMedicalHistory.get('disease_name3').value;
    
    // this.diseaseInList_1 = _.without(this.diseaseInList, select2, select3);
    // this.diseaseInList_2 = _.without(this.diseaseInList, select1, select3);
    // this.diseaseInList_3 = _.without(this.diseaseInList, select1, select2);
    
    // หน่วงเวลาไว้เพื่อรอให้ value ใน input เปลี่ยน ไม่งั้นจะได้ค่าเก่า
    setTimeout(() => {
      const select1 = this.appMedicalHistory.get('disease_name1').value;
      const select2 = this.appMedicalHistory.get('disease_name2').value;
      const select3 = this.appMedicalHistory.get('disease_name3').value;
      this.diseaseInList_1 = _.without(this.diseaseInList, select2, select3);
      this.diseaseInList_2 = _.without(this.diseaseInList, select1, select3);
      this.diseaseInList_3 = _.without(this.diseaseInList, select1, select2);
      // this.diseaseValidate(); // ตรวจสอบทุกโรค
    }, 150);
  }
 
  

  

  dateMedicalChange(date, position: string){
    //console.log('date :',date)
    this.appMedicalHistory.get(position).setValue(date)
  }
  
  ionViewDidLoad() {
    //console.log('ionViewDidLoad AppMedicalHistoryPage');
  }
  
  private medicalDateOption: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  private treatmentDateOption: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    
  };
  private treatmentDate2Option: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    
  };
  scrollToCenter () {
    this.content.scrollTo(0, 200, 500);
  }

  private clearSelect()
  {
    this.diseaseInList_1 = this.diseaseInList_2 = this.diseaseInList_3 = [];
  }

  private checkSelection(event, data)
  {
    if (data.length < 1) {
      this.alertCtrl.warning('กรุณาระบุโรคที่ท่านเคยรักษา');
    }
  }

  private diseaseValidate()
  {
    // ใส่ validate ให้กับฟอร์มที่ถูกเลือกโรคและอาการที่เป็น
    for (let i=1; i <= 3; i++ ) {
      this.appMedicalHistory.controls['disease_name' + i].clearValidators();
      this.appMedicalHistory.controls['treatment_result' + i].clearValidators();
      this.appMedicalHistory.controls['medical_contact' + i].clearValidators();
      this.appMedicalHistory.controls['treatmentDate' + i].clearValidators();
      // console.log('this.appMedicalHistory.get("disease_name"' + i+').value', this.appMedicalHistory.value['disease_name' + i]);
      
      if (this.appMedicalHistory.value['disease_name' + i] !== '') {
        this.appMedicalHistory.get('disease_name' + i).setValidators([Validators.required]);
        this.appMedicalHistory.get('disease_name' + i).updateValueAndValidity();
        this.appMedicalHistory.get('treatment_result' + i).setValidators([Validators.required]);
        this.appMedicalHistory.get('treatment_result' + i).updateValueAndValidity();
        this.appMedicalHistory.get('medical_contact' + i).setValidators([Validators.required]);
        this.appMedicalHistory.get('medical_contact' + i).updateValueAndValidity();
        this.appMedicalHistory.get('treatmentDate' + i).setValidators([Validators.required]);
        this.appMedicalHistory.get('treatmentDate' + i).updateValueAndValidity();
      }
    }
  }

  private clearDiseaseForm(itemdata = '')
  {
    if (itemdata != '') {
      for (let i=1; i <= 3; i++ ) {
        if (this.appMedicalHistory.get('disease_name' + i).value === itemdata) {
          this.appMedicalHistory.get('disease_name' + i).setValue('');
          this.appMedicalHistory.get('treatment_result' + i).setValue('');
          this.appMedicalHistory.get('medical_contact' + i).setValue('');
          this.appMedicalHistory.get('treatmentDate' + i).setValue('');
        }
      }
    }
  }

}
