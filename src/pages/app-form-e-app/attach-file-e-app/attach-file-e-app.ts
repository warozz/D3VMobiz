import { ServiceName } from '../../../providers/constants/service-name';
import { FunctionName } from '../../../providers/constants/function-name';
import { RequestModel } from '../../../providers/model/request-model';
import { ApiProvider } from '../../../providers/api/api';
import { AttachFileM } from './../../../providers/service-table/attachfile-model';
import { ApplicationData } from './../../../providers/application/application-data';
import { PcSixtyM } from './../../../providers/pcsixty/pcsixty-model';
import { PcsixtyService } from './../../../providers/pcsixty/pcsixty-service';
import { isEmpty } from 'rxjs/operators';
import { AttachFileViewModalComponent } from '../../../components/attach-file-view-modal/attach-file-view-modal';
import { ApplicationEAppData } from '../../../providers/application/application-eapp-data';
import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AttachFileEAppModalComponent } from '../../../components/attach-file-e-app-modal/attach-file-e-app-modal';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { Broadcaster } from '../../../providers/utility/broadcaster';
import { AlertDirective } from '../../../directives/extends/alert/alert';
import { AttachPhotoUlinkEAppComponent } from '../../../components/utility/attach-photo-ulink-e-app/attach-photo-ulink-e-app';

/**
 * Generated class for the AttachFileEAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attach-file-e-app',
  templateUrl: 'attach-file-e-app.html',
})
export class AttachFileEAppPage {

  public attachFileMs: Array<AttachFileM> = [];
  checkShow: boolean = false;

  
  /**
   * ข้อมูลใบเสนอขาย
   */
  private quotationM = this.appData.getQuotation();

  /**
   * ปช.60
   */
  private pcSixtyM: PcSixtyM = new PcSixtyM();

  /**
   * มีเอกสาร ปช.60
   */
  private hasPcSixty: boolean = false;

  private typeapp:string = this.quotationM.typeapp;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingDirective,
    private alertCtrl: AlertDirective,
    private applicationEAppData: ApplicationEAppData,
    private appData: ApplicationData,
    private broadcaster: Broadcaster,
    private pcsixtyservice: PcsixtyService,
    private apiProvider: ApiProvider) {

       this.selectAttachFile();
       
       // select pc60
        this.pcSixtyM.applicationid = this.quotationM.mcaapplicationMs[0].applicationid;
        this.pcsixtyservice.selectPcSixtyService(this.pcSixtyM).then((res: PcSixtyM) => {
          if (typeof res != 'undefined') {
            this.pcSixtyM = res;
            this.hasPcSixty = true;
          }
        }, err => {
          this.alertCtrl.error(err);
        });
  }
  
  /**
   * ดึงข้อมูลเอกสารแนบทั้งหมด
   */
  public selectAttachFile() {

    let attachFileM: AttachFileM = new AttachFileM();
    attachFileM.applicationid = this.quotationM.mcaapplicationMs[0].applicationid;
    attachFileM.applicationno = this.quotationM.mcaapplicationMs[0].applicationno;

    let attachFileMs: Array<AttachFileM> = [];
    attachFileMs.push(attachFileM);

    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.ATTACHFILE;
    reqM.serviceName = ServiceName.SELECT;
    reqM.param = attachFileMs;

    this.applicationEAppData.attachFileMs = [];

    this.apiProvider.callData(reqM).then((res) => {
      if (Number(res['size']) > 0) {
       this.attachFileMs = res['data'];
       this.applicationEAppData.attachFileMs = res['data'];
       this.broadcaster.broadcast('attachfilesize', Number(res['size']));
      }
    } , (err) => {
      this.alertCtrl.error(err);
    });

  }

  uploadImage() {

    let loading = this.loadingCtrl.scopePresent();
    let modal = this.modalCtrl.create(AttachFileEAppModalComponent);
    modal.present();

    this.loadingCtrl.scopeDismiss(loading);

    /**
     * ดึงภาพกลับมารอ insert
     */
    modal.onDidDismiss(res => {
      if(typeof res != 'undefined'){
        let attachFile: AttachFileM = new AttachFileM();
        attachFile.applicationid = this.quotationM.mcaapplicationMs[0].applicationid;
        attachFile.applicationno = this.quotationM.mcaapplicationMs[0].applicationno;
        attachFile.filetype = res.filetype;
        attachFile.attribute01 = res.attribute01;
        attachFile.attribute02 = res.attribute02;
        attachFile.attribute03 = res.attribute03;

        if (attachFile.attribute03 != '') {

          let attachFileMs: Array<AttachFileM> = [];
          attachFileMs.push(attachFile);

          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.ATTACHFILE;
          reqM.serviceName = ServiceName.INSERT;
          reqM.param = attachFileMs;

          this.loadingCtrl.present();
          this.apiProvider.callData(reqM).then((res) => {
            
            this.loadingCtrl.dismiss();

            if (Number(res['size'] > 0)) {

              attachFile.attachid = res['data'][0].attachid;
              attachFile.fullpath = res['data'][0].fullpath;

              this.attachFileMs.push(attachFile);
              this.applicationEAppData.attachFileMs = this.attachFileMs;
              this.broadcaster.broadcast('attachfilesize', this.applicationEAppData.attachFileMs.length);
            }

          }, (err) => {
            this.loadingCtrl.dismiss();
            this.alertCtrl.error(err);
          });

          this.checkShow = true;
        }
      }
    });

  }

  saveEAppPhotoModal() {
    alert('saveEAppPhotoModal ')
  }

  /**
   * ลบเอกสารแนบ
   */
  async deleteDoc(index: any, item: any) {

    this.alertCtrl.confiemBox(`ยืนยันการลบ`).then(res => {

      if (item.attachid != undefined) {
        let attachFileM: AttachFileM = new AttachFileM();
        attachFileM.applicationid = item.applicationid;
        attachFileM.attachid = item.attachid;
    
        let attachFileMs: Array<AttachFileM> = [];
        attachFileMs.push(attachFileM);
    
        let reqM: RequestModel = new RequestModel();
        reqM.functionName = FunctionName.ATTACHFILE;
        reqM.serviceName = ServiceName.DELETE;
        reqM.param = attachFileMs;
    
        this.loadingCtrl.present();
        this.apiProvider.callData(reqM).then((res) => {
          
          this.loadingCtrl.dismiss();
  
          this.attachFileMs.splice(index, 1);
          this.applicationEAppData.attachFileMs = this.attachFileMs;
          this.broadcaster.broadcast('attachfilesize', this.applicationEAppData.attachFileMs.length);
    
        } , (err) => {
          this.loadingCtrl.dismiss();
          this.alertCtrl.error(err);
        });

      }
      else {
        this.attachFileMs.splice(index, 1);
        this.applicationEAppData.attachFileMs = this.attachFileMs;
        this.broadcaster.broadcast('attachfilesize', this.applicationEAppData.attachFileMs.length);
      }
     
    }).catch(err => {
      console.error(err);
    });
  }

  /**
   * ดูรูปเอกสารแนบโดยไปดึงมาจาก Alfresco server.
   */
  viewDoc(item: any) {

    if (item.fullpath != undefined && item.fullpath != '') {

      let attachFileM: AttachFileM = new AttachFileM();
      attachFileM.applicationid = this.quotationM.mcaapplicationMs[0].applicationid;
      attachFileM.applicationno = this.quotationM.mcaapplicationMs[0].applicationno;
      attachFileM.fullpath = item.fullpath;

      let attachFileMs: Array<AttachFileM> = [];
      attachFileMs.push(attachFileM);

      let reqM: RequestModel = new RequestModel();
      reqM.functionName = FunctionName.ATTACHFILE;
      reqM.serviceName = ServiceName.SELECT;
      reqM.searchkey = 'IMAGE_BASE64';
      reqM.param = attachFileMs;

      this.loadingCtrl.present();
      this.apiProvider.callData(reqM).then((res) => {
        this.loadingCtrl.dismiss();
        if (Number(res['size']) > 0) {
          item['attribute01'] = res['data'][0].attribute01;
          let modal = this.modalCtrl.create(AttachFileViewModalComponent, { item: item });
          modal.present();
        }
      } , (err) => {
        this.loadingCtrl.dismiss();
        this.alertCtrl.error(err);
      });

    }
    else {
      let modal = this.modalCtrl.create(AttachFileViewModalComponent, { item: item });
      modal.present();
    }
    
  }

  /**
   * ดูเอกสาร ปช.60
   */
  private viewDocPC60() {
    this.loadingCtrl.present();
    this.navCtrl.push('Pc60Page', { pcSixtyM: this.pcSixtyM }).then(() => {
      this.loadingCtrl.dismiss();
    });
  }

  /**
   * ลบเอกสาร ปช.60
   */
  private deleteDocPC60() {
    this.alertCtrl.confiemBox('ยืนยันการลบ').then(res => {
      this.pcsixtyservice.deletePcSixtyService(this.pcSixtyM).then(() => {
        this.pcSixtyM = new PcSixtyM();
        this.hasPcSixty = false;
      }, err => {
        this.alertCtrl.error(err);
      });

    }).catch(err => {
      console.error(err);
    });
  }
  /**
   * อัปโหลดรูปภาพของผู้เอาประกัน ulink
   */
  private uploadImageUlink(){
    let loading = this.loadingCtrl.scopePresent();
    let modal = this.modalCtrl.create(AttachPhotoUlinkEAppComponent);
    modal.present();
    this.loadingCtrl.scopeDismiss(loading);

    /**
     * ดึงภาพผู้เอาประกันมา insert
     */
    modal.onDidDismiss(res => {
      if(typeof res != 'undefined'){
        let attachFile: AttachFileM = new AttachFileM();
        attachFile.applicationid = this.quotationM.mcaapplicationMs[0].applicationid;
        attachFile.applicationno = this.quotationM.mcaapplicationMs[0].applicationno;
        attachFile.filetype = res.filetype;
        attachFile.attribute01 = res.attribute01;
        attachFile.attribute02 = res.attribute02;
        attachFile.attribute03 = res.attribute03;

        if (attachFile.attribute01 != '') {

          let attachFileMs: Array<AttachFileM> = [];
          attachFileMs.push(attachFile);

          let reqM: RequestModel = new RequestModel();
          reqM.functionName = FunctionName.ATTACHFILE;
          reqM.serviceName = ServiceName.INSERT;
          reqM.param = attachFileMs;

          this.loadingCtrl.present();
          this.apiProvider.callData(reqM).then((res) => {
            
            this.loadingCtrl.dismiss();

            if (Number(res['size'] > 0)) {

              attachFile.attachid = res['data'][0].attachid;
              attachFile.fullpath = res['data'][0].fullpath;

              this.attachFileMs.push(attachFile);
              this.applicationEAppData.attachFileMs = this.attachFileMs;
              this.broadcaster.broadcast('attachfilesize', this.applicationEAppData.attachFileMs.length);
            }

          }, (err) => {
            this.loadingCtrl.dismiss();
            this.alertCtrl.error(err);
          });

          this.checkShow = true;
        }
      }
    });
  }
}