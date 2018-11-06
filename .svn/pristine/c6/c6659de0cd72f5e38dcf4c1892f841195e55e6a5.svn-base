import { ApiProvider } from './../../../providers/api/api';
import { PopoverComponent } from './../../popover/popover';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {ApiDbProvider} from '../../../providers/api-db/api-db';
import {ServiceName} from '../../../providers/constants/service-name';
import {RequestModel} from '../../../providers/model/request-model';
import { Component, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Platform, Content, NavController, AlertController, ModalController, Modal, LoadingController } from 'ionic-angular';
import { DOCUMENT } from '@angular/platform-browser';
import { PopupNewUpdateComponent } from './../../utility/popup-new-update/popup-new-update';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { AgentModel } from './../../../providers/agent/agent-model';
import { ModalOptions } from 'ionic-angular/components/modal/modal-options';
import { AlertDirective } from './../../../directives/extends/alert/alert';
import { PopoverController } from 'ionic-angular';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-header[header]',
  templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {

  popover: any;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private network: Network,
    private alertDirt: AlertDirective,
    private apiDBProvider: ApiDbProvider,
    public popoverCtrl: PopoverController,
    private apiProvider: ApiProvider,
    @Inject(DOCUMENT) private document: Document) {

      this.mode = this.apiProvider.getTLPromptMode();
        if (this.mode == 0)
          this.tlpromptMode = 'mini';

    // view ready
    platform.ready().then(() =>
    {
      // fixed menu header
      // this.fn_fixed_menu_init(false);
      // this.content = this.viewCtrl.getContent();
      // this.content.ionScroll.subscribe(data => this.fn_fixed_menu_init(data.scrollTop >= this.boxHeaderTop.nativeElement.offsetHeight));
    });

    this.storage.get('version').then(version => {
      this.version = 'V.' + version;
    });

    this.online = (this.network.type != 'none');
    this.network.onConnect().subscribe(() => {
      this.online = true;
    });
    this.network.onDisconnect().subscribe(() => {
      this.online = false;
    });

    // Pop over
    let saleInfomation: any;
    this.storage.get('saleInformation').then(saleInfo => {
      saleInfomation = saleInfo
    });
    this.storage.get('loginProfile').then(profile => {
      const data: object = {
        name: `${profile.pName} ${profile.fName} ${profile.lName}`,
        agentid: `รหัสตัวแทน ${profile.agentid}`,
        position: saleInfomation.strName,
        branch: `สาขา ${profile.branch}`,
        license: `ใบอนุญาติเลขที่ ${saleInfomation.licenseNo}`
      };
      this.popover = this.popoverCtrl.create(PopoverComponent, {userInfo: data}, {cssClass: 'popover-profile'});
    });
    
  }

  /**
   * เวอร์ชัน
   */
  private version: string;
  /**
   * สถานะเครือข่าย
   */
  private online: boolean = false;

  private content: Content;
  /**
   * บัญชีฝ่ายขาย
   */
  private profile = new AgentModel();
  /**
   * ตำแหน่งฝ่ายขาย
   */
  private salePosition: string;
  /**
   * tlprompt mode
   */
  private tlpromptMode = 'normal';
  private mode: number;
  /**
   * ชื่อหน้าที่กำลังเข้าถึง
   */
  private pageName: string;
  /**
   * เมนูหลัก
   */
  private mainMenu: Array<any>;
  /**
   * ความสูงเมนู
   */
  private headerMenuHeight: number = window.innerHeight - 117;
  @HostListener('window:resize', ['$event']) private onResize(event?) {
      this.headerMenuHeight = window.innerHeight - 117;
  }

  public ngOnInit(): void {
    this.setMenu();
    this.getSaleInfo();
  }

  /**
   * ดึงข้อมูลฝ่ายขาย
   */
  private getSaleInfo(): void {
    this.storage.get('saleInformation').then(saleInfo => {
      if (saleInfo != null)
        this.salePosition = saleInfo.strName;
      else
        this.getSaleInfo();
    });
  }

  /**
   * แสดงเมนู
   */
  private setMenu(): void {
    // get profile
    this.storage.get('loginProfile').then(profile => {
      this.profile = profile;

      // get tlprompt mode
      // this.storage.get('tlpromptMode').then(mode => {
      //   if (mode == 0)
      //     this.tlpromptMode = 'mini';
      const mode = this.mode;
        this.mainMenu = [
          {
            id: 1,
            title: 'หน้าหลัก',
            name: 'HomePage',
            icon: 'icon-web-page-home',
            disabled: this.profile.roleType != 'agent' ? 'disabled' : null,
            class: ''
          },
          {
            id: 2,
            title: 'ผู้มุ่งหวัง',
            name: 'ProspectPage',
            icon: 'icon-man-shape fs29',
            disabled: this.profile.roleType != 'agent' ? 'disabled' : null,
            class: ''
          },
          {
            id: 3,
            title: 'ใบเสนอขาย',
            name: 'QuatationPage',
            sub: ['InvestmentPage'],
            icon: 'icon-file-add fs29',
            disabled: null,
            class: ''
          },
          {
            id: 4,
            title: 'ใบคำขอ',
            name: 'AppFormPage',
            sub: ['AppApplicationPage' , 'AppFormUlinkPage', 'AppSummaryUlinkPage', 'AppDocsUlinkPage', 'AppRiskprofilePage', 'AppInvestmentInfoPage', 'AppLifepremiumUlinkPage', 'AppAcceptriskUlinkPage'],
            icon: 'icon-file-search fs29',
            disabled: mode == 0 || this.profile.roleType != 'agent' ? 'disabled' : null,
            class: ''
          },
          {
            id: 5,
            title: 'ชำระเบี้ย M-POS',
            name: 'MPosPage',
            icon: 'icon-ion-card fs29',
            disabled: mode == 0 || this.profile.roleType != 'agent' ? 'disabled' : 'disabled',
            class: ''
          },
          {
            id: 6,
            title: 'รพ.เครือข่าย',
            name: 'SearchHospitalPage',
            icon: 'icon-health-care fs29',
            disabled: mode == 0 || this.profile.roleType != 'agent' ? 'disabled' : null,
            class: ''
          },
          {
            id: 7,
            title: 'สาขา',
            name: 'SearchBranchPage',
            icon: 'icon-pin',
            disabled: mode == 0 || this.profile.roleType != 'agent' ? 'disabled' : 'disabled',
            class: ''
          },
          {
            id: 8,
            title: 'สื่อและเอกสารงานขาย',
            name: 'SalesMediaPage',
            icon: 'icon-download-2 fs29',
            disabled: mode == 0 || this.profile.roleType != 'agent' ? 'disabled' : null,
            class: ''
          },
          {
            id: 9,
            title: 'กิจกรรม',
            name: 'ActivityPage',
            icon: 'icon-calendar2',
            disabled: mode == 0 || this.profile.roleType != 'agent' ? 'disabled' : 'disabled',
            class: ''
          },
          {
            id: 10,
            title: 'มีอะไรใหม่',
            name: 'NewUpdatePage',
            icon: 'icon-ion-ios-lightbulb-outline fs29',
            disabled: null,
            class: 'view-only-mobile'
          },
          {
            id: 11,
            title: 'ตั้งค่า',
            name: 'SettingPage',
            icon: 'icon-settings',
            disabled: null,
            viewOnlyMobile: true,
            class: mode == 0 ? 'view-only-mobile' : 'hidden'
          },
          {
            id: 12,
            title: 'ช่วยเหลือ',
            name: 'HelpPage',
            icon: 'icon-info2',
            disabled: null,
            viewOnlyMobile: true,
            class: 'view-only-mobile'
          }
        ];

        // // เฉพาะแทบ แบบประกันชีวิตควบการลงทุน
        // if (this.navCtrl.getActive().id == 'InvestmentPage')
        //   this.mainMenu[2].name = 'InvestmentPage';
        
        setTimeout(() => {
          this.mainMenu.forEach((element, idx: number) => 
          {
            if (element.name == this.navCtrl.getActive().id)
            {
              this.pageName = element.title;
              return;
            }
  
            else if (typeof element.sub != 'undefined') {
              element.sub.forEach((sub: string) => {
                if (sub == this.navCtrl.getActive().id)
                {
                  this.mainMenu[idx].name = sub;
                  this.pageName = element.title;
                  return;
                }
              });
            }
          });
  
          if (this.profile.roleType == 'employee' && this.navCtrl.getActive().id != 'QuatationReportPage')
            this.open('QuatationPage');
        }, 100);
      //});
    });
  }

  /**
   * เปิดหน้าใหม่
   * @param page หน้าที่ต้องการเปิด
   */
  private open(page): void
  {
    if (page != this.navCtrl.getActive().id) {
      if (page == 'HomePage')
      {
        // remember page
        this.storage.set('rootPage', page).then(() => {
          this.navCtrl.setRoot(page);
        });
      }
      else if (page == 'LoginPage')
      {
        // website
        if (this.platform.is('core') || this.platform.is('mobileweb'))
        {
          // remember page
          // this.storage.set('rootPage', page).then(() => {
          //   this.navCtrl.setRoot(page);
          //   this.storage.clear;
          // });

          this.navCtrl.setRoot(page);
          this.storage.clear;
        }
        else
        {
          // remember page
          // this.storage.set('rootPage', 'PincodePage').then(() => {
          //   this.navCtrl.setRoot('PincodePage');
          // });
          
          let msg = 'คุณต้องการออกจากระบบเพื่อลงชื่อเข้าใช้งานระบบใหม่หรือไม่';
          this.alertDirt.confirm(msg).then(
            (res) => {
              let req: RequestModel = new RequestModel();
              req.serviceName = ServiceName.DROP;
              this.apiDBProvider.agentService(req).then(
                (res) => {
                  // this.storage.set('rootPage', page).then(() => {
                  //   this.navCtrl.setRoot(page);
                  // });

                  this.navCtrl.setRoot(page);
                  this.storage.clear;
                }
              );
            },
            (err) => {}
        );

        }
      }
      else if (page == 'NewUpdatePage') {
        this.fn_open_new_update();
        this.fn_toggle_main_menu();
      }
      else
      {
        this.fn_toggle_main_menu();
          this.storage.set('rootPage', page).then(() => {
            this.navCtrl.setRoot(page).then(
              () => {
                //this.fn_toggle_main_menu();
              }
            );
          }
        );
      }
    }
  }

  /**
   * class action เปิดแสดงเมนู
   */
  private toggleMainMenu = '';
  /**
   * เปิด / ปิด เมนู โหมด mobile
   */
  private fn_toggle_main_menu(): void
  {
    if (this.toggleMainMenu == '')
      this.toggleMainMenu = 'action';
    else
      this.toggleMainMenu = '';
  }

  // selector
  @ViewChild('boxHeaderTop') boxHeaderTop: ElementRef;
  /**
   * เปิด / ปิด fixed header
   * @param status เปิด / ปิด
   */
  private fn_fixed_menu_init(status: boolean): void
  {
    if (status)
      this.document.body.classList.add('header-menu-fix-top');
    else
      this.document.body.classList.remove('header-menu-fix-top');
  }

  /**
   * แสดงมีอะไรใหม่
   */
  private fn_open_new_update(): void
  {
    let modal: Modal = this.modalCtrl.create(PopupNewUpdateComponent);
    modal.present();
  }

  /*
  @HostListener('window:resize', ['$event'])
  private onResize(event): void {
    console.log("Height: " + event.target.innerHeight);
  }
  */
  
  /**
   *
   */
  private toggle: boolean = false;
  private presentPopover(event) {
    this.toggle ? this.popover.dismiss() : this.popover.present({ ev: event});
    this.popover.onDidDismiss(() => {
      this.toggle = false;
    });
    this.toggle = !this.toggle;
  }
}
