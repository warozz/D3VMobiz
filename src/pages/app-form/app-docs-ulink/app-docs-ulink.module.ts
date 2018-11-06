import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppDocsUlinkPage } from './app-docs-ulink';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AppDocsUlinkPage,
  ],
  imports: [
    IonicPageModule.forChild(AppDocsUlinkPage),
    ComponentsModule
  ],
})
export class AppDocsUlinkPageModule {}
