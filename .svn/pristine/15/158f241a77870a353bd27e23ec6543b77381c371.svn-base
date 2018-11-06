import { Http } from '@angular/http';
import { Component, HostBinding } from '@angular/core';
import { IonicPage, NavController, ModalController, Platform } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { RequestModel } from '../../providers/model/request-model';
import { PinLogModel } from '../../providers/pinlog/pinlog-model';
import { ServiceName } from "../../providers/constants/service-name";
import { ApiDbProvider } from "../../providers/api-db/api-db";
import { DateUtil } from '../../providers/utility/date-util';
import { ApplicationSessionM } from '../../providers/applicationsession/application-session-model';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { PopupComponent, PopupModel } from './../../components/utility/popup/popup';
import { Device } from '@ionic-native/device';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { SynchronizeTlpromptProvider } from '../../providers/synchronize-tlprompt/synchronize-tlprompt';
import { DatePipe } from '@angular/common'

/**
 * Generated class for the PincodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pincode',
  templateUrl: 'pincode.html',
})
export class PincodePage {

  /**
   * เวอร์ชัน
   */
  private tlpromptVersion: string;
  private tlpromptBuild: string;

  @HostBinding('class') private className: string = 'page-header-default';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertDirective,
    private vibration: Vibration,
    private apiDbProvider: ApiDbProvider,
    private modalCtrl: ModalController,
    private device: Device,
    private storage: Storage,
    private syncTLprompt: SynchronizeTlpromptProvider,
    private http: Http,
    private network: Network
  ) {

    // เวอร์ชัน
    this.http.get('assets/json/version.json').subscribe(data => {
      let version: Array<object> = data.json();
      this.tlpromptVersion = version[0]['version'];
      this.tlpromptBuild = version[0]['build'];
    });

    this.storage.get('version').then(version => {
      this.tlpromptVersion = version;
    });

    let appSessM: ApplicationSessionM = new ApplicationSessionM();
    appSessM.agentid = "";

    let request = new RequestModel();
    request.serviceName = ServiceName.SELECT;
    request.param = appSessM;

    this.apiDbProvider.applicationSessionService(request).then(
      (rs) => {
        let responseM: any = rs;
        this.agentID = responseM.data[0].agentid;
        this.activateCode = responseM.data[0].activatecode;
        this.deviceRefNo = responseM.data[0].deviceRefNo;

        if (responseM.status == 0 && (responseM.data[0].pincode == null || responseM.data[0].pincode == "")) {
          this.init();
        } else {

          let request = new RequestModel();
          request.serviceName = ServiceName.SELECT

          this.apiDbProvider.pinLogService(request).then(
            (res) => {
              let responseMp: any = res;
              this.init(responseM.data[0].pincode, responseMp.data.incorrectLeft);
            },
            (err) => {
              alertCtrl.error(err);
            }
          );
        }

      },
      (err) => {
        alertCtrl.error(err);
      }
    );

  }

  private deviceRefNo: string = '';

  private agentID: string = '';

  // unlock password
  private pinUnlock: string = '';
  // set new pincode
  private newPin: boolean = false;
  // incorrect time
  private incorrectLeft: number = 10;
  // activate code
  private activateCode: string = '';
  // show pin
  private showPin: boolean = false;
  // pin incorrect color
  private pinIncorrect: boolean = false;

  private titleArray = {
    pincode: {
      normal: 'กรุณาใส่ Pin',
      incorrent: 'รหัส Pin ไม่ถูกต้อง ลองใหม่อีกครั้ง',
      lock: 'ระบบกำลังส่งรหัส Activate code ทาง SMS',
      new: 'ตั้งค่า Pin 4 หลัก',
      new2: 'กรุณาจำรหัส Pin นี้ เพื่อใส่ทุกครั้งที่เริ่มใหม่',
      newconfirm: 'ยืนยัน Pin 4 หลัก',
    },
    activateCode: {
      normal: 'ใส่รหัสแอคทิเวทโค้ตที่ได้รับมา (Activate Code)',
      incorrent: 'รหัสแอคทิเวทโค้ตไม่ถูกต้อง ลองใหม่อีกครั้ง'
    }
  }
  private pinDefault = ['', '', '', ''];
  private actDefault = [];
  private buttonArray = {
    portrait: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'icon-info2', '0', 'icon-ion-backspace-outline'],
    landscape: ['1', '2', '3', '4', '5', 'icon-info2', '6', '7', '8', '9', '0', 'icon-ion-backspace-outline']
  };
  private title: string = 'รหัส Pin 4 หลัก';
  private title2: string = '';
  private message: string = this.titleArray.pincode.normal;
  private message2: string = '';
  private activateRef: string = '';
  private pinArray = this.pinDefault;
  private pin = this.pinDefault[0];
  private actArray = this.actDefault;

  private infoParagraph = [
    'รหัส Pin เป็นรหัสที่เก็บอยู่บนเครื่องของท่านเองเท่านั้น และต้องใส่ทุกครั้งที่เปิดใช้งานโปรแกรม หากท่านลืมรหัสจะต้องลบโปรแกรมและทำการติดตั้งใหม่ หรือ ติดต่อที่ส่วนสนับสนุนกิจกรรมและฝึกอบรมดิจิทัล เพื่อขอรหัสแอคทิเวทโค้ต (Activate Code) เพื่อปลดล็อค และทำการตั้งค่า รหัส Pin ใหม่',
    'ติดต่อสอบถาม<br /> ส่วนสนับสนุนกิจกรรมและฝึกอบรมดิจิทัล<br />เบอร์โทร. 022470247 ต่อ 1930-1934'
  ];

  public init(pinUnlock = '', incorrectLeft = 10)
  {
    this.pinUnlock = pinUnlock;
    this.incorrectLeft = incorrectLeft;
    this.activateRef = '';
    // new pincode
    if (this.pinUnlock == '')
    {
      this.message = this.titleArray.pincode.new;
      this.message2 = this.titleArray.pincode.new2;
      this.newPin = true;
    }
    // activate code
    else if (this.incorrectLeft == 0)
    {
      this.title = 'ใส่รหัสแอคทิเวทโค้ต';
      this.title2 = '(Activate Code)';
      this.message = '';
      this.message2 = this.titleArray.activateCode.normal;
      this.activateRef = this.deviceRefNo.substr(0,4) + '-' + this.deviceRefNo.substr(4,4) + '-' + this.deviceRefNo.substr(8,4);
    }
  }

  public pinCode(key) {
    // pincode
    if (this.incorrectLeft > 0)
    {
      if (this.pin.length < this.pinArray.length) {
        let pinLength = this.pinArray.length;
        if (key == 'icon-ion-backspace-outline')
          this.pin = this.pin.substring(0, this.pin.length - 1);
        else if (key == 'icon-info2')
        {
          let popupInfo = new PopupModel();
          popupInfo.icon = 'icon-info2';
          popupInfo.title = 'ช่วยเหลือ';
          popupInfo.paragraph = this.infoParagraph;
          popupInfo.footer = 'TL Pro Plus Version: <span class="c-red">'+ this.tlpromptVersion + (this.tlpromptBuild == null ? '' : '.' + this.tlpromptBuild) +'</span><br />Device Model Number: <span class="c-red">'+ this.device.model +'</span><br />OS Version: <span class="c-red">'+ this.device.platform + ' ' + this.device.version + '</span>';
          popupInfo.footerClass = "text-dark";
          let modal = this.modalCtrl.create(PopupComponent, popupInfo);
          modal.present();
        }
        else
          this.pin += key;
        this.pinArray = this.pin.split('');
        for (let i = this.pin.length; i < pinLength; i++)
          this.pinArray.push(this.pinDefault[0]);

        // 4 pin
        if (this.pin.length == pinLength) {
          setTimeout(() => {
            // pin correct
            if (this.pin == this.pinUnlock) {
              this.incorrectLeft = 10;
              if (this.newPin)
              {
                // service insert new pin

                let appSessM: ApplicationSessionM = new ApplicationSessionM();
                appSessM.agentid = this.agentID;
                appSessM.pincode = this.pinUnlock;
                appSessM.pinstatus = "A";
                appSessM.deviceRefNo = this.genCode('reference', '');
                appSessM.activatecode = this.genCode('activate', appSessM.deviceRefNo);
                console.log("set ActivateCode: actcode="+appSessM.activatecode+": deviceRefNo="+appSessM.deviceRefNo);

                let request = new RequestModel();
                request.serviceName = ServiceName.UPDATE;
                request.param = appSessM;

                this.apiDbProvider.applicationSessionService(request).then(
                  (rs) => {
                      let pinLogModel: PinLogModel = new PinLogModel();
                      pinLogModel.agentid = this.agentID;
                      pinLogModel.inputdate = DateUtil.date2str(new Date());
                      pinLogModel.result = "T";

                      let request = new RequestModel();
                      request.serviceName = ServiceName.INSERT;
                      request.param = pinLogModel;

                      this.apiDbProvider.pinLogService(request).then(
                        (rs) => {
                          // success
                        },
                        (err) => {
                          this.alertCtrl.error(err);
                        }
                      );

                  },
                  (err) => {
                    this.alertCtrl.error(err);
                  }
                );
              }
              else
              {
                // service update incorrectLeft

                let pinLogModel: PinLogModel = new PinLogModel();
                pinLogModel.agentid = this.agentID;
                pinLogModel.inputdate = DateUtil.date2str(new Date());
                pinLogModel.result = "T";

                let request = new RequestModel();
                request.serviceName = ServiceName.INSERT;
                request.param = pinLogModel;

                this.apiDbProvider.pinLogService(request).then(
                  (rs) => {
                    // success
                  },
                  (err) => {
                    this.alertCtrl.error(err);
                  }
                );

              }

              let tlpromptMode = 1;
              if (this.network.type == 'none')
                tlpromptMode = 0;
              // app tlprompt
              this.storage.set('tlpromptMode', tlpromptMode).then(() => {
                
                this.navCtrl.setRoot('TlpromptModePage');
              });
            }
            // new pin
            else if (this.pinUnlock == '') {
              this.pinUnlock = this.pin;
              this.message = this.titleArray.pincode.newconfirm;
            }
            // pin incorrect
            else
            {
              // vibration
              this.vibration.vibrate(100);
              this.pinIncorrect = true;

              this.message = '';
              this.message2 = this.titleArray.pincode.incorrent;

              if (!this.newPin)
              {

                let pinLogModel: PinLogModel = new PinLogModel();
                pinLogModel.agentid = this.agentID;
                pinLogModel.inputdate = DateUtil.date2str(new Date());
                pinLogModel.result = "F";

                let request = new RequestModel();
                request.serviceName = ServiceName.INSERT;
                request.param = pinLogModel;

                this.apiDbProvider.pinLogService(request).then(
                  (rs) => {
                    // success
                  },
                  (err) => {
                    this.alertCtrl.error(err);
                  }
                );

                let requestP = new RequestModel();
                requestP.serviceName = ServiceName.SELECT

                this.apiDbProvider.pinLogService(requestP).then(
                  (res) => {
                    let responseMp: any = res;
                    this.incorrectLeft = responseMp.data.incorrectLeft;
                    if (this.incorrectLeft == 0)
                    {
                      this.popupAct();

                      // call activate code page
                      // ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต เพื่อขอ Activate Code
                      this.title = 'ใส่รหัสแอคทิเวทโค้ต';
                      this.title2 = '(Activate Code)';
                      this.message = '';
                      this.message2 = this.titleArray.activateCode.normal;

                      // call service get activate code

                    }
                  },
                  (err) => {
                    this.alertCtrl.error(err);
                  }
                );
              }
              else {
                // reset pin new pin only
                setTimeout(() => {
                  this.message = this.titleArray.pincode.new;
                  this.message2 = this.titleArray.pincode.new2;
                  this.pinUnlock = '';
                }, 1000);
              }
            }
            this.pin = this.pinDefault[0];
            this.pinArray = this.pinDefault;
          }, 100)
        }
      }
    }
    // activate code
    else
    {
      let actLength = this.actArray.length;

      if (key == 'icon-ion-backspace-outline')
      {
        this.pin = this.pin.substring(0, this.pin.length - 1);
        this.actArray.pop();
      }
      else if (key == 'icon-info2')
      {
        this.popupAct();
      }
      else
      {
        this.pin += key;

        this.actArray = this.pin.split('');

        for (let i = this.pin.length; i < actLength; i++)
          this.actArray.push(this.actDefault[0]);

        if (this.pin.length == this.activateCode.length) {
          setTimeout(() => {
            // activate code true
            if (this.pin == this.activateCode)
            {
              this.title = 'รหัส Pin 4 หลัก';
              this.title2 = '';

              // new pin
              this.init();
            }
            // incorrect activate code
            else
            {
              // vibration
              this.vibration.vibrate(100);
              this.pinIncorrect = true;

              this.message2 = this.titleArray.activateCode.incorrent;
            }

            this.pin = this.pinDefault[0];
            this.pinArray = this.pinDefault;
            this.actArray = this.actDefault;
          }, 100);
        }
      }
    }
  }

  public genCode(codeType, arg): string{

    let result: string = '';
    if(codeType == "activate")
    {
      console.log("ARG="+JSON.parse(arg));
      // arg = referenceCode
      let result: string = '';
      let prog = 3333;
      let p1 = arg.toString().substring(0,4);
      let p2 = arg.toString().substring(4,8);
      let p3 = arg.toString().substring(8,12);
      let a1 = p1.substring(0,1);
      let a2 = p1.substring(1,2);
      let a3 = p1.substring(2,3);
      let a4 = p1.substring(3,4);
      let b1 = p2.substring(0,1);
      let b2 = p2.substring(1,2);
      let b3 = p2.substring(2,3);
      let b4 = p2.substring(3,4);
      let c1 = p3.substring(0,1);
      let c2 = p3.substring(1 ,2);
      let c3 = p3.substring(2,3);
      let c4 = p3.substring(3,4);
      let d1 = prog.toString().substring(0,1);
      let d2 = prog.toString().substring(1,2);
      let d3 = prog.toString().substring(2,3);
      let d4 = prog.toString().substring(3,4);

      let e1 = ((Number(a1+""+a4+""+b2+""+b3+""+c1+""+c2+""+c3+""+c4)*1)*(Number(a2)*1)).toString();
      let e2 = ((Number(a1+""+a4+""+b2+""+b3+""+c1+""+c2+""+c3+""+c4)*1)*(Number(d1)*2)).toString();
      let e3 = ((Number(a1+""+a4+""+b2+""+b3+""+c1+""+c2+""+c3+""+c4)*1)*(Number(a3)*3)).toString();
      let e4 = ((Number(a1+""+a4+""+b2+""+b3+""+c1+""+c2+""+c3+""+c4)*1)*(Number(d2)*4)).toString();
      let e5 = ((Number(a1+""+a4+""+b2+""+b3+""+c1+""+c2+""+c3+""+c4)*1)*(Number(b1)*5)).toString();
      let e6 = ((Number(a1+""+a4+""+b2+""+b3+""+c1+""+c2+""+c3+""+c4)*1)*(Number(d3)*6)).toString();
      let e7 = ((Number(a1+""+a4+""+b2+""+b3+""+c1+""+c2+""+c3+""+c4)*1)*(Number(b4)*7)).toString();
      let e8 = ((Number(a1+""+a4+""+b2+""+b3+""+c1+""+c2+""+c3+""+c4)*1)*(Number(d4)*8)).toString();


      let pass = [];

      let m = e1+"";
      let n = "";
      let l = m.length;
      e1 = ((l*1)>8)? m.toString().substring(l-8,l) : m.toString();
      m = e1.toString();
      e1 = ((l*1)<8)? m.length.toString() : m.toString();
      pass[1] = e1;

      m = e2+"";
      n = "";
      l = m.length;
      e2 = ((l*1)>8)? m.substring(l-8,l) : m;
      m = e2;
      e2 = ((l*1)<8)? m.length.toString() : m;
      pass[2] = e2;

      m = e3+"";
      n = "";
      l = m.length;
      e3 = ((l*1)>8)? m.substring(l-8,l) : m;
      m = e3;
      e3 = ((l*1)<8)? m.length.toString() : m;
      pass[3] = e3;


      m = e4+"";
      n = "";
      l = m.length;
      e4 = ((l*1)>8)? m.substring(l-8,l) : m;
      m = e4;
      e4 = ((l*1)<8)? m.length.toString() : m;
      pass[4] = e4;

      m = e5+"";
      n = "";
      l = m.length;
      e5 = ((l*1)>8)? m.substring(l-8,l) : m;
      m = e5;
      e5 = ((l*1)<8)? m.length.toString() : m;
      pass[5] = e5;

      m = e6+"";
      n = "";
      l = m.length;
      e6 = ((l*1)>8)? m.substring(l-8,l) : m;
      m = e6;
      e6 = ((l*1)<8)? m.length.toString() : m;
      pass[6] = e6;

      m = e7+"";
      n = "";
      l = m.length;
      e7 = ((l*1)>8)? m.substring(l-8,l) : m;
      m = e7;
      e7 = ((l*1)<8)? m.length.toString() : m;
      pass[7] = e7;

      m = e8+"";
      n = "";
      l = m.length;
      e8 = ((l*1)>8)? m.substring(l-8,l) : m;
      m = e8;
      e8 = ((l*1)<8)? m.length.toString() : m;
      pass[8] = e8;


      let r = [];

      for(let o=1; o<=8; o++)
      {
        let st = o-1;
        let q1 = pass[1].substring(st,o);
        let q2 = pass[2].substring(st,o);
        let q3 = pass[3].substring(st,o);
        let q4 = pass[4].substring(st,o);
        let q5 = pass[5].substring(st,o);
        let q6 = pass[6].substring(st,o);
        let q7 = pass[7].substring(st,o);
        let q8 = pass[8].substring(st,o);
        r[o] = (q1*1)+(q2*1)+(q3*1)+(q4*1)+(q5*1)+(q6*1)+(q7*1)+(q8*1);
        while(((r[o]+"").length)>1)
        {
          r[o]=(Number((r[o]+"").substring(0,1))*1)+(Number((r[o]+"").substring(1,2))*1);
        }
      }

      result = r[1]+""+r[2]+""+r[3]+""+r[4]+""+r[5]+""+r[6]+""+r[7]+""+r[8];

     // console.log('result active code : '+result);


      return result;
      //random 10 digits
      // result = Math.floor(Math.random() * 10000000000).toString();
      // if(result.length < 10)
      // {
      //   return this.genCode('activate');
      // }
      // else
      // {
      //   return result;
      // }
    }
    else if(codeType == "reference")
    {

      let asckey =["24","35","46","57","68","79","90","01","12","23","0","0","0","0","0","0","0","34","45","56","67","78","89","00","11","22","33","44","55","66","77","88","99","10","21","32","43","54","65","76","87","98","09"];

      //this.pin="1234";
      //this.agentID="00000045";

      let currentDate:Date = new Date();
      let years = currentDate.getFullYear()+543;
      let months = currentDate.getMonth()+1;
      let days = currentDate.getDate();

      let dayWithPad = days < 10? "0"+days: days;
      let monthWithPad = months < 10? "0"+months: months;


      // let new_date:Date=new Date();
      // let years=this.datePipe.transform(new_date, 'yyyy');                //format yyyy+543 = พ.ศ.
      // let months=this.datePipe.transform(new_date, 'MM');                 //format mm = months date
      // let days=this.datePipe.transform(new_date, 'dd');                   //format dd = day date

      //console.log("year="+years);

      let refData=years.toString()+monthWithPad.toString()+dayWithPad.toString();
      //console.log("refData="+refData);

      let serial=this.pin+this.agentID+refData;
     // console.log("serial="+serial);


      let ser=asckey[serial.substring(1,2)]+asckey[serial.substring(6,7)]+asckey[serial.substring(13,14)]+asckey[serial.substring(19,20)];
      let randnum = Number(Math.floor(Math.random() * 10000)+10000).toString();

     // console.log("randnum="+randnum);
      //console.log("ser="+ser);

      let key=Number(randnum)*Number(ser);    //ReferenceCode 12

     // console.log("Key="+key);

     // let part1 = key.toString().substring(0,4);
    //  let part2 = key.toString().substring(4,8);
     // let part3 = key.toString().substring(8,12);


      //result= this.part1+"-"+this.part2+"-"+this.part3;

      return key.toString();

      // //random 12 digits
      // result = Math.floor(Math.random() * 1000000000000).toString();
      // if(result.length < 12)
      // {
      //   return this.genCode('reference');
      // }
      // else
      // {
      //   return result;
      // }
    }
  }

  public popupAct() {
    this.activateRef = this.deviceRefNo.substr(0,4) + '-' + this.deviceRefNo.substr(4,4) + '-' + this.deviceRefNo.substr(8,4);

    let popupPinLock = new PopupModel();
    popupPinLock.icon = 'icon-ion-alert-circled c-red';
    popupPinLock.title = 'ท่านใส่รหัส Pin ไม่ถูกต้องเกิน 10 ครั้ง';
    popupPinLock.paragraph = [
      'กรุณา ลบ และ ติดตั้งโปรแกรมใหม่',
      'หรือ ติดต่อที่ส่วนสนับสนุนกิจกรรมและฝึกอบรมดิจิทัล เพื่อขอรหัสแอคทิเวทโค้ต (Activate Code) เพื่อปลดล็อค และทำการตั้งรหัส Pin ใหม่',
      'โทร. 022470247 ต่อ 1930-1934'
    ]
    popupPinLock.paragraphClass = "txt-center";
    popupPinLock.footer = 'เลขที่อ้างอิง <span class="c-red">' + this.activateRef + '</span>';
    popupPinLock.footerClass = 'txt-center fs40';
    let modal = this.modalCtrl.create(PopupComponent, popupPinLock);
    modal.present();
  }

}
