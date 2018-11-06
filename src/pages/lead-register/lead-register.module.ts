import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeadRegisterPage } from './lead-register';
import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';

@NgModule({
  declarations: [
    LeadRegisterPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(LeadRegisterPage),
  ],
})
export class LeadRegisterPageModule {}
