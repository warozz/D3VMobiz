import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppFormPage } from './app-form';
import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';

@NgModule({
  declarations: [
    AppFormPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(AppFormPage),
  ],
})
export class AppFormPageModule {}
