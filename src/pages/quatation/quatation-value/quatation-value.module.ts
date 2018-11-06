import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuatationValuePage } from './quatation-value';
import { ComponentsModule } from './../../../components/components.module';
import { DirectivesModule } from './../../../directives/directives.module';

@NgModule({
  declarations: [
    //QuatationValuePage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationValuePage),
  ],
})
export class QuatationValuePageModule {}
