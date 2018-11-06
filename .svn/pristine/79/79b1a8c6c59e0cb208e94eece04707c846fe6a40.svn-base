import {File} from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {Transfer} from '@ionic-native/transfer';
import {Camera} from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { FilePath } from '@ionic-native/file-path';
import { ApplicationData } from './../providers/application/application-data';
import { QuatationValueCal } from './../providers/utility/quatation-value-cal';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ApiProvider } from '../providers/api/api';
import { HttpModule } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Vibration } from '@ionic-native/vibration';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { LOCALE_ID } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';

import { MyApp } from './app.component';

// custom component
import { ComponentsModule } from './../components/components.module';
import { DirectivesModule } from './../directives/directives.module';
import { PipesModule } from './../pipes/pipes.module';
import { QuatationPageModule } from './../pages/quatation/quatation.module';
import { ApiDbProvider } from '../providers/api-db/api-db';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { RegisterProvider } from '../providers/register/register-service';
import { RegionProvider } from '../providers/address/region/region';
import { ProvinceProvider } from '../providers/address/province/province';
import { AddressProvider } from '../providers/address/address';
import { SettingPlanProvider } from './../providers/setting-plan/setting-plan';
import { LoggerProvider } from './../providers/logger/logger-service';
import { TLPlanService } from './../providers/tlplan/tlplan-service';
import { SynchronizeTlpromptProvider } from '../providers/synchronize-tlprompt/synchronize-tlprompt';
import { CommonUtilProvider } from '../providers/common-util/common-util';
import { ValidateProvider } from '../providers/validate/validate';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatProvider } from '../providers/date-format/date-format';
import { CurrencyFormatProvider } from '../providers/currency-format/currency-format';
import { MathUtilProvider } from '../providers/utility/math-util';
import { AuthorizationKey } from '../providers/constants/authorization-key';
import { PremiumCalProvider } from '../providers/utility/premium-cal';
import { Geolocation } from '@ionic-native/geolocation';
import { Broadcaster } from '../providers/utility/broadcaster';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TlPlanProvider } from '../providers/tlplan/tlplan';
import { TokenInterceptor } from '../providers/constants/token-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeTh from '@angular/common/locales/th';
import { ApplicationEAppData } from '../providers/application/application-eapp-data';
import { QuotationData } from '../providers/quotation/quotation-data';
import { UlinkAppDataProvider } from '../providers/ulink-app-data/ulink-app-data';
import { UlinkAllocateProvider } from '../providers/ulink-app-data/ulink-allocate-data';
import { UniversalLifeDataProvider } from '../providers/universal-life-data/universal-life-data';
import { LogService } from '../providers/utility/logs-service';
import { UnitlinkDataProvider } from '../providers/ulink-app-data/unitlink-data';
import { Market } from '@ionic-native/market';
import { PcsixtyService } from '../providers/pcsixty/pcsixty-service';
import { CompareProspectProvider } from '../providers/ulink-app-data/compare-prospect';
import { ProspectProvider } from '../providers/prospect/prospect';
import { UnitlinkPremiumCalculateProvider } from '../providers/ulink-app-data/unitlink-premium-calculate';
import { SaleMediaData } from "../providers/sale-media/sale-media-data";
import { UnitlinkBenefit } from '../providers/ulink-benefit/unitlink-benefit';
import { UlinkAppformDataProvider } from '../providers/ulink-appform-data/ulink-appform-data';
import { RiderConfig } from '../providers/rider/rider-config';
registerLocaleData(localeTh);
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    QuatationPageModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
      monthShortNames: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
      dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
      dayShortNames: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
    }),
    IonicStorageModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FilePath,
    Transfer,
    Base64,
    SQLite,
    ApiProvider,
    ApiDbProvider,
    Vibration,
    Network,
    LoggerProvider,
    Device,
    SQLitePorter,
    RegisterProvider,
    RegionProvider,
    ProvinceProvider,
    AddressProvider,
    SettingPlanProvider,
    TLPlanService,
    SynchronizeTlpromptProvider,
    CommonUtilProvider,
    ValidateProvider,
    {
      provide: LOCALE_ID,
      useValue: 'th'
    },
    AuthorizationKey,
    DatePipe,
    DecimalPipe,
    DateFormatProvider,
    CurrencyFormatProvider,
    MathUtilProvider,
    PremiumCalProvider,
    Geolocation,
    MathUtilProvider,
    Broadcaster,
    TlPlanProvider,
    ApplicationData,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }/* tongm@ster : ห้้ามแก้ */
    ,QuatationValueCal,
    ApplicationEAppData,
    QuotationData,
    UlinkAppDataProvider,
    UlinkAllocateProvider,
    UniversalLifeDataProvider,
    UnitlinkDataProvider,
    UnitlinkPremiumCalculateProvider,
    CompareProspectProvider,
    File,
    FileOpener,
    LogService,
    Market,
    PcsixtyService,
    ProspectProvider,
    SaleMediaData,
    SaleMediaData,
    UnitlinkBenefit,
    UlinkAppformDataProvider,
    RiderConfig
  ]
})
export class AppModule {}
