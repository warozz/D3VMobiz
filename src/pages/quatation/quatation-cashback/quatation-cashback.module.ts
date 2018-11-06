import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuatationCashbackPage } from './quatation-cashback';
import { DirectivesModule } from './../../../directives/directives.module';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    //QuatationCashbackPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationCashbackPage),
  ],
})
export class QuatationCashbackPageModule {}
