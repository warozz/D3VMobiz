import {ResponseModel} from '../../providers/model/response-model';
import {ConstantConfig} from '../../providers/utility/constant-config';
import {PopupResetDataComponent} from '../../components/utility/popup-reset-data/popup-reset-data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RequestModel } from './../../providers/model/request-model';
import { DateUtil } from './../../providers/utility/date-util';
import { FunctionName } from './../../providers/constants/function-name';
import { Component } from '@angular/core';
import {ModalController, Modal,  IonicPage,   NavController,   Platform} from 'ionic-angular';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { LoadingDirective } from './../../directives/extends/loading/loading';
import { Vibration } from '@ionic-native/vibration';
import { ApiProvider } from '../../providers/api/api';
import { ServiceName } from '../../providers/constants/service-name';
import { UUID } from 'angular2-uuid';
import { JwtHelper } from 'angular2-jwt';
import { ApiDbProvider } from './../../providers/api-db/api-db';
import { ErrorStatus } from '../../providers/constants/error-status';
import { Md5 } from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { LoggerProvider } from './../../providers/logger/logger-service';
import { ApplicationSessionM } from '../../providers/applicationsession/application-session-model';
import { AgentModel } from '../../providers/agent/agent-model';
import { Http, RequestOptions ,Headers  } from '@angular/http';
import { AuthorizationKey } from './../../providers/constants/authorization-key';
import {CommonUtilProvider} from './../../providers/common-util/common-util';
import { URLConfig } from '../../providers/constants/url-config';
import * as xml2js from 'xml2js';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'เข้าสู่ระบบ'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingDirective,
    private apiProvider: ApiProvider,
    private platform: Platform,
    private vibration: Vibration,
    private apiDbProvider: ApiDbProvider,
    private storage: Storage,
    private network: Network,
    private logger: LoggerProvider,
    private commonApi : CommonUtilProvider,
    private modalCtrl: ModalController,
    private http: Http,
    private userService: AuthorizationKey) {

    // ล้างค่า local storage
    storage.clear().then(() => {
      // เวอร์ชัน
      this.http.get('assets/json/version.json').subscribe(data => {
        let version = data.json();
        this.tlpromptVersion = 'V.' + version[0]['version'];
        this.storage.set('version', version[0]['version']);
      });
    });
  }

  /**
   * เวอร์ชัน
   */
  private tlpromptVersion: string;
  /**
   * ชื่อผู้ใช้
   */
  private username: string = '';
  /**
   * รหัสผ่าน
   */
  private password: string = '';
  /**
   * เข้าสู่ระบบ
   */

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  async login() {

    this.storage.remove('login_type');
    if (this.network.type == 'none')
      this.alertCtrl.warning('กรุณาเชื่อมต่ออินเทอร์เน็ตเพื่อเข้าสู่ระบบ');
    else if (this.username == '')
      this.alertCtrl.warning('กรุณากรอกรหัสตัวแทน หรือ เลขประจำตัวประชาชน');
    else if (this.password == '')
      this.alertCtrl.warning('กรุณากรอกรหัสผ่านนักขายดิจิทัล');
    //else if (this.username.length != 8 && this.username.length != 13)
    //  this.alertCtrl.warning('กรุณากรอกรหัสตัวแทน หรือรหัสบัตรประชาชนให้ครบ');
    else {
      // call log
      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        this.logger.insertLoginLog(this.username);
        this.logger.createTableActionLog();
      }

      this.loadingCtrl.present();
      let role = isNaN(Number(this.username))?"B":"A";
      let user = {username : this.username , password : this.password , role : role};
      this.userService.setRole(role);
      await this.storage.set('login_type',user);
      if(isNaN(Number(this.username))){
        
        let request: RequestModel = new RequestModel();
        let configURL: URLConfig = new URLConfig(request);
        let url2 = configURL.proxy;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let req2 = "grant_type=password&username="+this.username+"&password="+this.password;
        req2 += "&client_id="+configURL.consumer_key;
        req2 +="&client_secret="+configURL.consumer_secret;
        let options = new RequestOptions({ headers: headers });
        this.http.post(url2,req2,options).map(resp => resp.json())
          .subscribe(res=>{
            let value : any  = res; 
            console.log(value);
            // debugger;
            this.userService.setAuthToken(value.access_token,value.refresh_token);
            let headers1 = new Headers();
            headers1.append('Content-Type', 'text/xml');
            headers1.append('Authorization','Bearer '+value.access_token);
            let options1 = new RequestOptions({ headers: headers1 });
              let req3 = `
              <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.ldapadmin/">
                <soapenv:Header/>
                <soapenv:Body>
                    <web:serviceReq>
                      <arg0>
                          <requestID>search_id</requestID>
                          <searchFilter>
                            <attributeName>uid</attributeName>
                            <attributeValue>`+this.username+`</attributeValue>
                          </searchFilter>
                          <TLdapSecurity>
                            <password></password>
                            <username></username>
                          </TLdapSecurity>
                      </arg0>
                    </web:serviceReq>e
                </soapenv:Body>
              </soapenv:Envelope>
              `;
              let request2: RequestModel = new RequestModel();
              request2.functionName  = FunctionName.EMPDETAIL;
              let configURL1: URLConfig = new URLConfig(request2);
              
              this.http.post(configURL1.url,req3,options1)
              .map(resp1 => {
                xml2js.parseString(resp1.text(),(err,result)=>{
                  let obj : any = result;
                  //console.log(result['S:Envelope']); 
                  //console.log(obj['S:Envelope']['S:Body'][0]['ns2:serviceReqResponse'][0]['return'][0]['result'][0]['personAttributes'][0]);
                  let data = obj['S:Envelope']['S:Body'][0]['ns2:serviceReqResponse'][0]['return'][0]['result'][0]['personAttributes'][0];
                  let emailBranch = (typeof(data['mail']) !== 'undefined'? data['mail'][0]:'');
                  //alert(data['OU']);
                  let branchname = (typeof(data['OU']) !== 'undefined'? data['OU'][0]:'');
                  //console.log(data);
                  let dn = data['dn'][0].split(',');
                  //console.log(dn);
                  let ou = dn[1].split('=');
                  let o = dn[2].split('=');
                  let employee = {
                    cn : data['cn'][0],
                    dn : data['dn'][0],
                    empName : data['empName'][0],
                    mail : emailBranch,
                    pid : data['pid'][0],
                    ou : ou[1],
                    o : o[1],
                    branchname : branchname,
                    agentid: data['pid'][0],
                    perrmissionAgent: 'Normal',
                    roleType: 'employee'
                  };
                  this.storage.set('tlpromptMode', 2);
                  this.storage.set('loginProfile', employee);
                  
                });
              //  resp1.json()
              })
              .subscribe(res1=>{
                setTimeout(() => {
                  this.storage.get('loginProfile').then(res=>{ 
                    this.loadingCtrl.dismiss();
                    this.navCtrl.setRoot('HomePage');
                  });
                }, 1000);
              });

  
          },err=>{
            this.loadingCtrl.dismiss();
            this.alertCtrl.warning('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            this.navCtrl.setRoot(LoginPage);
             
          });
      
      }
      else
      {
        console.log("check1");
        let passwordHash = Md5.hashStr(this.password);
        let request = new RequestModel();
        request.functionName = FunctionName.TLPROMPT_WS_AUTHENTICATION;
        request.param = {
          "username": this.username,
          "password": passwordHash,
          "applicationCode": "tlprompt",
          "uID": UUID.UUID()
        };
  
        this.commonApi.execServiceAuthen(request).then(
          (res) => {
            
            let obj: any = res;
            if ("0" == obj.errorCode && ErrorStatus.SUCCESS == obj.status) {

              let jwtHelper: JwtHelper = new JwtHelper();
              let token = obj.token;
              let tokenRawData: any = jwtHelper.decodeToken(token);
              let dataDecode: any = tokenRawData.data;
              this.apiProvider.genarateTokenToAgentM(dataDecode, async (agenM: AgentModel): Promise<void> => {

                this.storage.set('loginProfile', agenM);

                if (agenM && agenM["roleType"] !== "employee") {

                  let reqSaleinfoM: RequestModel = new RequestModel();
                  reqSaleinfoM.param = [{
                    perid: agenM["agentid"],
                    type: "P"
                  }];

                  reqSaleinfoM.functionName = FunctionName.SALEINFO;
                  reqSaleinfoM.serviceName = ServiceName.SELECT;
                  await this.commonApi.callRestServiceTLPrompt(reqSaleinfoM).then(
                    async (res) => {
                      if (Number(res['size']) > 0)  {

                        const saleInfo = {... res['datas'][0]}; 

                        console.log("Sale infomation in login page = ", saleInfo, agenM);
                        this.storage.set(ConstantConfig.SALE_INFO_KEY, saleInfo);

                      }
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                } 

                if (this.platform.is('core') || this.platform.is('mobileweb')) {

                  this.storage.set('tlpromptMode', 2).then(() => {
                    setTimeout(() => {
                      this.loadingCtrl.dismiss();
                      this.navCtrl.setRoot('HomePage');
                    }, 2000);
                  });
                }
                else {
                 
                  let req = new RequestModel();
                  req.serviceName = ServiceName.SELECT;
                  this.apiDbProvider.applicationSessionService(req).then(
                    (res) => {
                      if (res != undefined && res['data'] != undefined && res['size'] > 0) {
                        console.log("------------- agentid in sqllite = ", res['data'][0].agentid);
    
                        if (res['data'][0].agentid == agenM.agentid) {
                            //ล็อกอินเป็นคนเดิม
                            this.initailSessionSQLLite(agenM, token);
                        }
                        else {
                          this.loadingCtrl.dismiss();
                          this.displayPopupResetDatabase(agenM, token);
                        }
                      }
                      else {
                        this.initailSessionSQLLite(agenM, token);
                      }
                    },
                    (err) => {
                      console.log(JSON.stringify(err));
                    }
                  );
                  
                }
              });
            }
            else {
              this.loadingCtrl.dismiss();
              this.vibration.vibrate(100);
              this.alertCtrl.warning('ชื่อผู้ใช้หรือรหัสผ่านนักขายดิจิทัลไม่ถูกต้อง');
              this.password = '';
            }
          },
          (err) => {
            this.loadingCtrl.dismiss();
            this.alertCtrl.error(err);
          }
        ).catch((err) => {
          this.loadingCtrl.dismiss();
          this.alertCtrl.error(err);
        });
      }
     
    }
  }

  public displayPopupResetDatabase(agenM: AgentModel, token: any) {

    let modal: Modal = this.modalCtrl.create(PopupResetDataComponent, {}, { showBackdrop: true, enableBackdropDismiss: true });
    modal.onDidDismiss( 
      (res) => {
      console.log('res=>', res);
      if (res === 'ok') {
        this.loadingCtrl.present();

        this.apiDbProvider.dropTable().then(
          (res) => {
            console.log("-------------- Drop all table done. ------------");

            this.initailSessionSQLLite(agenM, token);
          }
        );
      }
      else {
        //this.loadingCtrl.dismiss();
        this.username = '';
        this.password = '';
      }
      
    });

    modal.present();
  }

  confirmDropTable() {
    this.apiDbProvider.dropTable().then(
      (res) => {

      },
      (err) => {

      }
    );
  }

  public initailSessionSQLLite(agenM: AgentModel, token: any) {
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
          }).then(
            (res) => {
              if (this.platform.is('core') || this.platform.is('mobileweb')) {
                // website
                this.storage.set('tlpromptMode', 2).then(() => {
                  setTimeout(() => {
                    this.loadingCtrl.dismiss();
                    this.navCtrl.setRoot('HomePage');
                  }, 2000);
                });
              }
              else {
                
                this.loadingCtrl.dismiss();
                let tlpromptMode = 1;
                if (this.network.type == 'none') {
                  tlpromptMode = 0;
                }

                this.storage.set('tlpromptMode', tlpromptMode).then(() => {});
                this.navCtrl.setRoot('PincodePage');
            }
          },
          (err) => {
            this.alertCtrl.error(err);
          });
      },
      (err) => {
        this.alertCtrl.error(err);
      }
    );
  }

  /**
   * สมัครสมาชิก
   */
  register() {
    // window.open('http://www.thailife.com/da/สมัครสมาชิก');

    this.navCtrl.push('RegisterPage');
  }

  /**
   * ลืมรหัสผ่าน
   */
  forget() {
    // window.open('http://www.thailife.com/da/ลืมรหัสผ่าน');

    this.navCtrl.push('ForgetPage');
  }

  async saleInformationService(agentid) {
    return new Promise((resolve,reject) => {
      let reqModel: RequestModel = new RequestModel();
      reqModel.param = [{
        perid: agentid, //รหัสพนักงาน
        type: "P"
      }];
      reqModel.functionName = FunctionName.SALEINFO;
      reqModel.serviceName = ServiceName.SELECT;
      this.apiProvider.callData(reqModel).then(
        (res) => {
          let obj: any = res;
          let resModel: ResponseModel = obj;
          if (resModel['data'][0]) {
            resolve(resModel['data'][0] );
          } 
          else {
            reject('null or undefined.')
          } 
        }, (err) => {
          console.log(JSON.stringify(err));
          reject(err)
        }
      );
    });
  }
}
