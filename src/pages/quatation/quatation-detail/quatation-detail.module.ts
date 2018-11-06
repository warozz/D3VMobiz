import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuatationDetailPage } from './quatation-detail';
import { ComponentsModule } from './../../../components/components.module';
import { DirectivesModule } from './../../../directives/directives.module';

@NgModule({
  declarations: [
    //QuatationDetailPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationDetailPage),
  ],
})
export class QuatationDetailPageModule {}
