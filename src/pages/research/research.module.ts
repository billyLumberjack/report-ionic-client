import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResearchPage } from './research';

@NgModule({
  declarations: [
    ResearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ResearchPage),
  ],
})
export class ResearchPageModule {}
