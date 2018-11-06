import { UniversalLifeSaleofferPage } from './universal-life-saleoffer/universal-life-saleoffer';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniversalLifePage } from './universal-life';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PdfViewdataPage } from '../pdf-viewdata/pdf-viewdata';

@NgModule({
  imports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(UniversalLifePage),
  ]
})
export class UniversalLifePageModule {}
