import { Platform, ModalController } from 'ionic-angular';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertDirective } from '../../directives/extends/alert/alert';
import { Network } from '@ionic-native/network';
import { LoadingDirective } from '../../directives/extends/loading/loading';
import { RegisterProvider } from '../../providers/register/register-service';
import { RequestModel } from '../../providers/model/request-model';
import { FunctionName } from '../../providers/constants/function-name';
import { UUID } from 'angular2-uuid';
import { PopupComponent, PopupModel } from './../../components/utility/popup/popup';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'ลืมรหัสผ่าน'
})
@Component({
  selector: 'page-register',
  templateUrl: '../register/register.html',
})
export class ForgetPage {
  register : FormGroup; 
  data :any;
  checkPerid : boolean = false;
  checkIdCardNo : boolean= false;
  checkBirth : boolean = false;
  checkMobileNo : boolean = false;
  mobileNo : string = '';

  /**
   * เวอร์ชัน
   */
  private tlpromptVersion: string;

  /**
   * ชื่อหน้าจอ
   */
  private titlePage: string = 'ลืมรหัสผ่าน/ออกรหัสผ่านใหม่';

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform : Platform,
    private alertCtrl: AlertDirective,
    private network : Network,
    private loadingCtrl: LoadingDirective,
    private registerProvider: RegisterProvider,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private storage: Storage) {
      
      this.createForm();

      this.storage.get('version').then(version => {
        this.tlpromptVersion = 'V.' + version;
      });
  }

  createForm(){
    this.register  = this.fb.group({
      mobileNo : ['',Validators.required],
      perid : ['',[Validators.required,Validators.maxLength(8),Validators.minLength(8)]],
      idCardNo : ['',[Validators.required,Validators.maxLength(13),Validators.required,Validators.minLength(13)]],
      birthDate : ['',Validators.required]
    });
  }

  dateChange(dateNow: String) {
    if(!dateNow) return;
    this.register.get('birthDate').setValue(dateNow);
    this.checkValidateGetMobile();
  }


  checkValidateGetMobile(){
console.log("event");
    this.mobileNo = '';
    if(this.register.get('perid').valid ) {
      console.log("perid > "+this.register.get('perid').value);
      this.checkPerid = true;
    }else
      this.checkPerid = false;
    if(this.register.get('idCardNo').valid) {
      console.log("idCardNo > "+this.register.get('idCardNo').value);
      this.checkIdCardNo = true;
    }else
    this.checkIdCardNo = false;
    if( this.register.get('birthDate').value != '' && typeof(this.register.get('birthDate').value) !== 'undefined' ){
      this.checkBirth = true;
      console.log("birthDate > "+this.register.get('birthDate').value);
    }else
    this.checkBirth = false;
      //this.loadingCtrl.present();
    if(this.checkPerid && this.checkIdCardNo && this.checkBirth){
      //console.log("valid");
      let birthDate = this.register.get('birthDate').value;
      let idCardNo = this.register.get('idCardNo').value;
      let perid = this.register.get('perid').value;
      let request = new RequestModel();
      request.functionName = FunctionName.CHECKMOBILE_DA;
      let dateClone = (birthDate.split("-",3));
      let year = parseInt(dateClone[0])+543;
      birthDate = year+"-"+dateClone[1]+"-"+dateClone[2];
      
      request.param = {perid:perid,birthDate : birthDate
         ,idCardNo:idCardNo , uID : UUID.UUID() ,channel : "tlprompt"} ;
      console.log(request.param);
      this.registerProvider.registerMemberDa(request)
      .then(
        res=> this.data = res.data).catch(err=>alert(err));
    }else{
      //console.log("invalid");
      //alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน");
      this.data = [];
    }
      
    
  }


  public submit():void
  {
    console.log(this.register.get('mobileNo').value);
   
    if(this.register.valid){
      console.log("submit");
      let birthDate = this.register.get('birthDate').value;
      let idCardNo = this.register.get('idCardNo').value;
      let perid = this.register.get('perid').value;
      let mobileNo = this.register.get('mobileNo').value;
      let mobileClone = (mobileNo.split("|",2));
      console.log(mobileClone[0]+"   "+mobileClone[1]);
      let dateClone = (birthDate.split("-",3));
      let year = parseInt(dateClone[0])+543;
      birthDate = year+"-"+dateClone[1]+"-"+dateClone[2];
      let request = new RequestModel();
      this.loadingCtrl.present();
      request.functionName = FunctionName.RESETPASSWORD_DA;
      request.param = {perid:perid,birthDate : birthDate
        ,idCardNo:idCardNo , uID : UUID.UUID() ,channel : "tlprompt" ,seq : mobileClone[1] , mobileNo : mobileClone[0]} ;
        console.log(request.param);
      this.registerProvider.registerMemberDa(request)
      .then(res=> {
        this.loadingCtrl.dismiss();
                  //alert(JSON.stringify(res.errorMessage))
                  let obj: any = res;
                  //alert(obj.errorMessage);
                 // this.alertCtrl.warning(obj.errorMessage);
                  if(obj.status == 'SUCCESS'){
                    /*let popupInfo = new PopupModel();
                    popupInfo.content = obj.errorMessage;
                    let modal = this.modalCtrl.create(PopupComponent, popupInfo);
                    modal.present();*/
                    this.alertCtrl.warning(obj.errorMessage);
                    this.loadingCtrl.dismiss();
                    this.navCtrl.setRoot('LoginPage');
                  }
                  else{
                    this.loadingCtrl.dismiss();
                    this.alertCtrl.warning(obj.errorMessage);
                    
                    //this.alertCtrl.warning('กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน');
                  }
        }).catch(err=>this.loadingCtrl.dismiss());
    }
    else if(this.register.get('mobileNo').value == '' || typeof(this.register.get('mobileNo').value) === 'undefined'){
      this.alertCtrl.warning("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน");
      return;
    }
  }
  /*
  public submit(form : NgForm)
  {
    console.log(form.value);
    if(!this.platform.is('core') && !this.platform.is('mobileweb')){
      if (this.network.type == 'none')
        this.alertCtrl.warning('กรุณาเชื่อมต่ออินเตอร์เพื่อทำการสมัครสมาชิก');
      if(form.valid){
        this.loadingCtrl.present();
        let request = new RequestModel();
        request.param  = form.value;
        console.log(request.param);
  
      }else{
        this.alertCtrl.warning('กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน');
      }
    }else{
      if(form.valid){
        this.loadingCtrl.present();
        let request = new RequestModel();
        request.functionName = FunctionName.RESETPASSWORD_DA;
        let dateClone = (form.value.birthDate.split("-",3));
        let year = parseInt(dateClone[0])+543;
        form.value.birthDate = year+"-"+dateClone[1]+"-"+dateClone[2];
        request.param  = form.value;
        request.param["uID"]=  UUID.UUID();
        request.param["channel"] = 'tlprompt';
        console.log(request.param);
        this.registerProvider.resetPasswordMemberDa(request)
        .then(
          res=> {
            this.loadingCtrl.dismiss();
            //alert(JSON.stringify(res.errorMessage))
            let obj: any = res;
            console.log(JSON.stringify(obj));
           
            if(obj.status == 'SUCCESS'){
            

              this.alertCtrl.warning(obj.errorMessage);
              this.navCtrl.setRoot('LoginPage');
                
            }
            else{
              //this.alertCtrl.warning(obj.errorMessage);
              this.alertCtrl.warning('กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน');
            }
            
           // modal.dismiss();
  
          },
          err => this.alertCtrl.error(JSON.stringify(err))
        )
      }else{
        this.alertCtrl.warning('กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน');
      }

      
      //new RegisterModel;
      
    }
    */
  

  public cancel()
  {
    this.navCtrl.pop();
  }
  
}
