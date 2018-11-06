import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuatationHealthPage } from './quatation-health';
import { ComponentsModule } from './../../../components/components.module';
import { DirectivesModule } from './../../../directives/directives.module';

@NgModule({
  declarations: [
    //QuatationHealthPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationHealthPage),
  ],
})
export class QuatationHealthPageModule {}
