import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuatationUnexpectedPage } from './quatation-unexpected';
import { ComponentsModule } from './../../../components/components.module';
import { DirectivesModule } from './../../../directives/directives.module';

@NgModule({
  declarations: [
    //QuatationUnexpectedPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationUnexpectedPage),
  ],
})
export class QuatationUnexpectedPageModule {}
