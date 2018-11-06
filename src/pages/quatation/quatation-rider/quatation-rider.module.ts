import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuatationRiderPage } from './quatation-rider';
import { ComponentsModule } from './../../../components/components.module';
import { DirectivesModule } from './../../../directives/directives.module';
import { RiderConfig } from '../../../providers/rider/rider-config';

@NgModule({
  declarations: [
    //QuatationRiderPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationRiderPage),
  ],
  providers: [
    RiderConfig
  ]
})
export class QuatationRiderPageModule {}
