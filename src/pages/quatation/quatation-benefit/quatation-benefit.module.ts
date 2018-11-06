import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { QuatationBenefitPage } from './quatation-benefit';
import { ComponentsModule } from '../../../components/components.module';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    QuatationBenefitPage
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationBenefitPage),
  ]
})
export class QuatationBenefitPageModule {}
