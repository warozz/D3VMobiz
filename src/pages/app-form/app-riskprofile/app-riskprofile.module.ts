import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppRiskprofilePage } from './app-riskprofile';
import { ComponentsModule } from '../../../components/components.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    AppRiskprofilePage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(AppRiskprofilePage),
  ],
})
export class AppRiskprofilePageModule {}
