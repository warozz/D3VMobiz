import { PipesModule } from './../../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuatationFormPage } from './quatation-form';
import { ComponentsModule } from './../../../components/components.module';
import { DirectivesModule } from './../../../directives/directives.module';

@NgModule({
  declarations: [
    //QuatationFormPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(QuatationFormPage),
  ],
})
export class QuatationFormPageModule {}
