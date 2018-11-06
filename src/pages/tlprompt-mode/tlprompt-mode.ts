import {ApiProvider} from '../../providers/api/api';
import {ServiceName} from '../../providers/constants/service-name';
import {FunctionName} from '../../providers/constants/function-name';
import {RequestModel} from '../../providers/model/request-model';
import {LoadingDirective} from '../../directives/extends/loading/loading';
import {SynchronizeTlpromptProvider} from '../../providers/synchronize-tlprompt/synchronize-tlprompt';
import { Component } from '@angular/core';
import { IonicPage,  NavController,  ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { Http } from '@angular/http';

/**
 * Generated class for the NetworkModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tlprompt-mode',
  templateUrl: 'tlprompt-mode.html',
})
export class TlpromptModePage {

  /**
   * เวอร์ชัน
   */
  private tlpromptVersion: string;

  constructor(
    private http: Http,
    private alertCtrl: AlertDirective,
    private apiProvider: ApiProvider,
    private navCtrl: NavController, 
    private storage: Storage,
    private network: Network,
    private alert: AlertDirective,
    private syncProvider: SynchronizeTlpromptProvider,
    private loadingCtrl: LoadingDirective,
    private modalCtrl: ModalController) {

      this.storage.get('version').then(version => {
        this.tlpromptVersion = 'V.' + version;
      });
  }

  public async onlineMode(online)
  {
    if (this.network.type != 'none') {
       /** Step check version TL-PROMPT. */
       let requestM = new RequestModel();
       requestM.mode = 1;
       requestM.functionName = FunctionName.VERSION;
       requestM.serviceName = ServiceName.SELECT_ALL;
       await this.apiProvider.callData(requestM).then(
         (res) => { 
           let objs: any = res;
           let latestVersionDate: string = objs[0].datemodified;
           let version: string = objs[0].version;

           this.http.get('assets/json/version.json').subscribe(data => {
             let versions: any = data.json();
             let dateJson: any = versions[0]['date'];

             var dateServer = new Date(latestVersionDate.replace(' ', 'T'));
             var dateDevice = new Date(dateJson);
             console.log("Date on server " + dateServer);
             console.log("Date on device " + dateDevice);
             if (dateServer > dateDevice) {
                this.alertCtrl.warning('กรุณาอัปเดตแอปพลิเคชันเป็นเวอร์ชัน ' + version);
             }

           });
         },
         (err) => {
           console.log(err);
           this.alertCtrl.error(err);
         }
       );
    }

    if (online)
    {
      if (this.network.type == 'none')
      {
        this.alert.warning('กรุณาเชื่อมต่ออินเทอร์เน็ต เพื่อใช้งานทีแอล โปร พลัส');
      }
      else
      {
        this.apiProvider.setTLPromptMode(1);
        this.storage.set('tlpromptMode', 1);
        this.storage.set('rootPage', 'HomePage');
        //this.navCtrl.setRoot('HomePage'); 

        this.loadingCtrl.present();
        this.syncProvider.startSync().then(
          (res) => {
            this.loadingCtrl.dismiss();
            this.navCtrl.setRoot('HomePage'); 
          },
          (err) => {
            this.loadingCtrl.dismiss();
          }
        );

      }
    } 
    else
    {
      this.apiProvider.setTLPromptMode(0);
      this.storage.set('tlpromptMode', 0);
      this.storage.set('rootPage', 'HomePage');
      //this.navCtrl.setRoot('HomePage');
  
      this.loadingCtrl.present();
      this.syncProvider.startSync().then(
        (res) => {
          this.loadingCtrl.dismiss();
          this.navCtrl.setRoot('HomePage'); 
        },
        (err) => {
          this.loadingCtrl.dismiss();
        }
      );

    }
  }

}
