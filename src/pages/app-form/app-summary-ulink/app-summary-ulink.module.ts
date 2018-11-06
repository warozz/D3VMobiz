import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppSummaryUlinkPage } from './app-summary-ulink';

@NgModule({
  declarations: [
    AppSummaryUlinkPage,
  ],
  imports: [
    IonicPageModule.forChild(AppSummaryUlinkPage),
    ComponentsModule
  ],
})
export class AppSummaryUlinkPageModule {}
