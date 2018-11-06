import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPage } from './forget';
import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';

@NgModule({
  declarations: [
    ForgetPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(ForgetPage),
  ],
})
export class ForgetPageModule {}
