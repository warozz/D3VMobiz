import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuatationAllocationPage } from './quatation-allocation';
import { ComponentsModule } from '../../../components/components.module';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    //QuatationAllocationPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationAllocationPage),
  ],
})
export class QuatationAllocationPageModule {}
