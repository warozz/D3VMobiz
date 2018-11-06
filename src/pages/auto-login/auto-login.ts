import { FunctionName } from './../../providers/constants/function-name';
import { DateUtil } from './../../providers/utility/date-util';
import { ServiceName } from './../../providers/constants/service-name';
import { ApplicationSessionM } from './../../providers/applicationsession/application-session-model';
import { ApiDbProvider } from './../../providers/api-db/api-db';
import { AgentModel } from './../../providers/agent/agent-model';
import { LoadingDirective } from './../../directives/extends/loading/loading';
import { ApiProvider } from './../../providers/api/api';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { JwtHelper } from 'angular2-jwt';
import { CommonUtilProvider } from './../../providers/common-util/common-util';
import { RequestModel } from './../../providers/model/request-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SynchronizeTlpromptProvider } from '../../providers/synchronize-tlprompt/synchronize-tlprompt';
import { Storage } from '@ionic/storage';
import { FUNCTION_TYPE } from '@angular/compiler/src/output/output_ast';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
/**
 * Generated class for the AutoLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment : 'auto/:encode'})
@Component({
  selector: 'page-auto-login',
  templateUrl: 'auto-login.html',
})
export class AutoLoginPage {
requesturl = '';
  constructor( public navParams: NavParams ,public commonApi: CommonUtilProvider,
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private apiProvider: ApiProvider,
    private apiDbProvider: ApiDbProvider,private platform: Platform, private navCtrl: NavController, private syncTLprompt: SynchronizeTlpromptProvider,
    private storage: Storage, private http: Http
  ) {
    try {
       this.requesturl = decodeURIComponent(navParams.get('encode'));
    } catch (error) {
      this.navCtrl.setRoot('LoginPage');
    }
    console.log(decodeURIComponent(navParams.get('encode')));


    
    console.log(this.requesturl);
    
    this.loadingCtrl.present();
    this.autoLogin(this.requesturl).then(
    res=>{ 
      console.log(res);
      let obj : any = res;
      if(obj.status == 'SUCCESS'){

        let jwtHelper: JwtHelper = new JwtHelper();
        let token = obj.token;
        let tokenRawData: any = jwtHelper.decodeToken(token);
        let dataDecode: any = tokenRawData.data;
        console.log(dataDecode);
        this.apiProvider.genarateTokenToAgentM(dataDecode, (agenM: AgentModel): void => {

          // profile
          this.storage.set('loginProfile', agenM);
         console.log(agenM);
          //Step insert agent detail to SQLLite.
          let request = new RequestModel();
          request.serviceName = ServiceName.INSERT;
          request.param = agenM;
          this.apiDbProvider.agentService(request).then(
            (res) => {
              //Step insert to SQLLite table applicationSession.
              let appSessionM: ApplicationSessionM = new ApplicationSessionM();
              appSessionM.jwt = token;
              appSessionM.agentid = agenM.agentid;
              appSessionM.lastonlinemode = DateUtil.date2str(new Date());

              let request = new RequestModel();
              request.serviceName = ServiceName.INSERT;
              request.param = appSessionM;
              this.apiDbProvider.applicationSessionService(request).then(
                (res) => {
                  return res;//Next step check version
                },
                (err) => {
                  this.alertCtrl.error(err);
                }
              ).then(
                (res) => {
                  if (this.platform.is('core') || this.platform.is('mobileweb')) {
                    // website
                    this.storage.set('tlpromptMode', 2).then(() => {
                      setTimeout(() => {
                        //this.loadingCtrl.dismiss();
                        this.loadingCtrl.dismiss();
                        this.navCtrl.setRoot('HomePage');
                      }, 2000);
                    });
                  }
                  else {
                    //Step check version TL-PROMPT.
                    let requests = new RequestModel();
                    requests.mode = 1;
                    requests.functionName = FunctionName.VERSION;
                    requests.serviceName = ServiceName.SELECT_ALL;
                    this.apiProvider.callData(requests).then(
                      (res) => {
                        //this.loadingCtrl.dismiss();
                        let objs: any = res;
                        let datemodified: string = objs[0].datemodified;
                        let patch: string = objs[0].patch;
                        let version: string = objs[0].version;

                        this.http.get('assets/json/version.json').subscribe(data => {
                          let versions: any = data.json();
                          let date: any = versions[0]['date'];

                          var dateServer = new Date(datemodified);
                          var dateDevice = new Date(date);
                          console.log("Date on server " + dateServer);
                          console.log("Date on device " + dateDevice);
                          if (dateServer > dateDevice)
                            this.alertCtrl.warning('กรุณาอัปเดตแอปพลิเคชันเป็นเวอร์ชัน ' + version);

                          //Final step.
                          this.syncTLprompt.startSync();
                          // app tlprompt
                          this.storage.set('tlpromptMode', 1);
                          this.navCtrl.setRoot('PincodePage');

                        });

                      },
                      (err) => {
                        //this.loadingCtrl.dismiss();
                        this.alertCtrl.error(err);
                        // app tlprompt
                         this.storage.set('tlpromptMode', 1);
                        this.navCtrl.setRoot('PincodePage');
                      }
                    );
                  }
                },
                (err) => {
                  this.alertCtrl.error(err);
                });
            },
            (err) => {
              let alert = this.alertCtrl.create({
                title: 'แจ้งเตือน',
                subTitle: err,
                buttons: ['ตกลง']
              });
              alert.present();
            }
          );

       });
      }
      //data = res.status;
     
    },
    err =>alert(err)).catch(a => alert("anthen fail"));
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutoLoginPage');
  }

  async autoLogin(encode : string){
    let request = new RequestModel();
    request.functionName = FunctionName.AUTOLOGIN;
    request.param =  {uID : UUID.UUID(), username : encode};
    return await this.commonApi.postApi(request);
  }

  ngAfterViewInit(){
   // alert(this.requesturl);
  }

}
