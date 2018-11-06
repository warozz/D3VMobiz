import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppFormEAppPage } from './app-form-e-app';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { AttachFileEAppPage } from './attach-file-e-app/attach-file-e-app';
import { SignatureEAppPage } from './signature-e-app/signature-e-app';
import { PaymentEAppPage } from './payment-e-app/payment-e-app';
import { SendAllFileEAppPage } from './send-all-file-e-app/send-all-file-e-app';
//import { AttachFileEAppModalComponent } from '../attach-file-e-app/attach-file-e-app';
import { AppFormUlinkEAppPage } from './app-form-ulink-e-app/app-form-ulink-e-app';
import { ResultUlinkEAppPage } from './result-ulink-e-app/result-ulink-e-app';
@NgModule({
  declarations: [
    AppFormEAppPage,
    AttachFileEAppPage,
    SignatureEAppPage,
    PaymentEAppPage,
    SendAllFileEAppPage,
    AppFormUlinkEAppPage,
    ResultUlinkEAppPage

    
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(AppFormEAppPage),
  ],
  entryComponents: [
    AttachFileEAppPage,
    SignatureEAppPage,
    PaymentEAppPage,
    SendAllFileEAppPage,
    AppFormUlinkEAppPage,
    ResultUlinkEAppPage

  ]
})
export class AppFormEAppPageModule {}
