import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppLifepremiumUlinkPage } from './app-lifepremium-ulink';
import { ComponentsModule } from '../../../components/components.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    AppLifepremiumUlinkPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(AppLifepremiumUlinkPage),
  ],
})
export class AppLifepremiumUlinkPageModule {}
