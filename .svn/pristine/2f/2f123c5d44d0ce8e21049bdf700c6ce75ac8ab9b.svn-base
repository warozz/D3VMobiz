import { ApiProvider } from './../providers/api/api';
import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Http } from '@angular/http';

import { RequestModel } from '../providers/model/request-model';
import { ResponseModel } from '../providers/model/response-model';
import { ServiceName } from "../providers/constants/service-name";
import { ApiDbProvider } from "../providers/api-db/api-db";
import { AlertDirective } from './../directives/extends/alert/alert';
import { AgentModel } from '../providers/agent/agent-model';
import { RiderConfig } from '../providers/rider/rider-config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  
  /**
   * จดจำหน้าจอล่าสุด
   */
  private rememberPage: boolean = true;
  /**
   * กำหนดระยะเวลาที่ไม่ได้ใช้งาน เพื่อออกจากระบบอัตโนมัติ 30 นาที = 1800
   */
  private idleTimeout = 1800;

  /**
   * สถานะ การใช้งานแอปพลิเคชัน
   */
  private idleState = 'ยังไม่เริ่มใช้งาน';
  /**
   * สถานะ หมดเวลาที่ไม่ได้ใช้งาน
   */
  private timedOut = false;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private apiDbProvider: ApiDbProvider,
    private storage: Storage,
    private alertCtrl: AlertDirective,
    private loadingCtrl: LoadingController,
    private idle: Idle,
    private keepalive: Keepalive,
    private http: Http,
    private apiProvider: ApiProvider) {

    this.apiProvider.setTLPromptMode();

    // เว็บไซต์
    if (platform.is('core') || platform.is('mobileweb'))
    {
      /*let loading = loadingCtrl.create({
        content: 'กรุณารอสักครู่...',
        cssClass: 'firstload'
      });
      loading.present();*/

      this.storage.get('loginProfile').then(profile => {
        // ยังไม่เข้าสู่ระบบ
        if (profile == null)
          this.rootPage = 'LoginPage';
        // เข้าสู่ระบบแล้ว
        else
        {
          // เวอร์ชัน
          this.http.get('assets/json/version.json').subscribe(data => {
            let version = data.json();
            this.storage.set('version', version[0]['version']);
          });

          this.storage.get('lastActive').then(lastActive => {
            let date = new Date();
            let idleTime = (date.getTime() - lastActive) / 1000;
            // หมดเวลาการใช้งาน
            if (idleTime > this.idleTimeout)
              this.rootPage = 'LoginPage';
            else
            {
              // แสดงหน้าจอที่เข้าถึงล่าสุด
              if (this.rememberPage) {
                this.storage.get('rootPage').then(page => {
                  // if (page == null)
                    this.rootPage = 'HomePage';
                  // else
                  //   this.rootPage = page;
                });
              }
              else
                this.rootPage = 'HomePage';
            }

            this.resetIdle();
          });
        }

        //loading.dismiss();
      });
    }

    // แอปพลิเคชัน
    else
    {
      // ตรวจสอบว่าตั้งรหัส PIN แล้วหรือไม่
      let agentModel: AgentModel = new AgentModel();
      agentModel.agentid = "";
  
      let request = new RequestModel();
      request.serviceName = ServiceName.SELECT;
      request.param = agentModel;
  
      this.apiDbProvider.agentService(request).then(
        (rs) => {
          let responseM: any = rs;
          // ยังไม่เข้าสู่ระบบ
          if (responseM.size == 0) {
            this.rootPage = 'LoginPage';
          // เข้าสู่ระบบแล้ว
          } else {
            // เวอร์ชัน
            this.http.get('assets/json/version.json').subscribe(data => {
              let version = data.json();
              this.storage.set('version', version[0]['version']);
            });

            this.storage.get('lastActive').then(lastActive => {
              let date = new Date();
              let idleTime = (date.getTime() - lastActive) / 1000;
              // หมดเวลาการใช้งาน
              if (idleTime > this.idleTimeout)
                this.rootPage = 'PincodePage';
              else
              {
                // แสดงหน้าจอที่เข้าถึงล่าสุด
                // if (this.rememberPage) {
                //   this.storage.get('rootPage').then(page => {
                //     if (page == null)
                //       this.rootPage = 'PincodePage';
                //     else
                //       this.rootPage = page;
                //   });
                // }
                // else
                //   this.rootPage = 'PincodePage';

                // หลังจากปิดแอพแล้วเปิดใหม่ จะเข้าไปหน้า PIN
                this.rootPage = 'PincodePage';
              }
  
              this.resetIdle();
            });
          }
          
          setTimeout(() => {
            splashScreen.hide();
          }, 2000);
        },
        (err) => {
          this.rootPage = 'LoginPage';

          setTimeout(() => {
            splashScreen.hide();
            this.alertCtrl.error(err);
          }, 2000);
        }
      );
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#006aa9');
    });

    // ฟังก์ชันตรวจสอบการใช้งานแอปพลิเคชัน
    // กำหนดระยะเวลาหยุดพัก ก่อนเริ่มตรวจจับการปฏิสัมพันธ์กับหน้าจอ
    idle.setIdle(1);
    // กำหนดระยะเวลาที่ไม่ได้ใช้งาน เพื่อออกจากระบบอัตโนมัติ
    idle.setTimeout(this.idleTimeout);
    // ตรวจจับการปฏิสัมพันธ์กับหน้าจอ เช่น clicks, scrolls, touches
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // กำลังใช้งาน
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'กำลังใช้งาน'

      this.storage.get('lastActive').then(lastActive => {
        // เวลาที่ใช้งานล่าสุด
        let date = new Date();
        this.storage.set('lastActive', date.getTime());
      }, err => {
        
        // เว็บไซต์
        if (platform.is('core') || platform.is('mobileweb')){
          location.reload();
        }
        // แอปพลิเคชัน
        else {
          location.reload();
        }
      });
    });
    // หมดเวลาที่ไม่ได้ใช้งาน
    idle.onTimeout.subscribe(() => {
      this.idleState = 'หมดเวลาที่ไม่ได้ใช้งาน';
      this.timedOut = true;

      // เว็บไซต์
      if (platform.is('core') || platform.is('mobileweb')){
        this.rootPage = 'LoginPage';
        setTimeout(() => {
          location.reload();
        }, 100);
      }
      // แอปพลิเคชัน
      else {
        this.rootPage = 'PincodePage';
        setTimeout(() => {
          location.reload();
        }, 100);
      }
    });
    // ไม่ได้ใช้งาน
    idle.onIdleStart.subscribe(() => this.idleState = 'ไม่ได้ใช้งาน');
    // ไม่ได้ใช้งาน และเวลาเหลือที่ไม่ได้ใช้งาน
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'กำลังจะหมดเวลาที่ไม่ได้ใช้งานในอีก ' + countdown + ' วินาที');

    // กำหนดระยะเวลาปิง ทุกๆ 1 นาที
    keepalive.interval(60);

    /*
    setInterval(() => {
      console.log('สถานะ: ' + this.idleState);
    }, 1000);
    */

    // Case only android Action click back button do not exit application
    platform.ready().then(() => {
      if (platform.is('android')) { // มีผลเฉพาะกับ android
        platform.registerBackButtonAction(() => {
          return ;
        });
      }
    });
  }

  /**
   * เริ่มการตรวจจับการปฏิสัมพันธ์กับหน้าจอใหม่
   */
  public resetIdle() {
    // เวลาที่ใช้งานล่าสุด
    let date = new Date();
    this.storage.set('lastActive', date.getTime());

    this.idle.watch();
    this.idleState = 'เริ่มการใช้งานใหม่';
    this.timedOut = false;
  }
}

