import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBranchPage } from './search-branch';
import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';

@NgModule({
  declarations: [
    SearchBranchPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(SearchBranchPage),
  ],
})
export class SearchBranchPageModule {}
