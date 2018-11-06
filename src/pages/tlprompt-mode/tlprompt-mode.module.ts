import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TlpromptModePage } from './tlprompt-mode';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TlpromptModePage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(TlpromptModePage),
  ],
})
export class TlpromptModePageModule {}
