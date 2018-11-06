import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppFormUlinkPage } from './app-form-ulink';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AppFormUlinkPage,
  ],
  imports: [
    IonicPageModule.forChild(AppFormUlinkPage),
    ComponentsModule
  ],
})
export class AppFormUlinkPageModule {}
