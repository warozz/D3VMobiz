import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuationReportBraPage } from './quation-report-bra';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    QuationReportBraPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(QuationReportBraPage),
  ],
})
export class QuationReportBraPageModule {}
