import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPage } from './activity';
import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';

@NgModule({
  declarations: [
    ActivityPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(ActivityPage),
  ],
})
export class ActivityPageModule {}
