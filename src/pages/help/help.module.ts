import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpPage } from './help';
import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  declarations: [
    HelpPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(HelpPage),
  ],
})
export class HelpPageModule {}
