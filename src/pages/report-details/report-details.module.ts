import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportDetailsPage } from './report-details';

@NgModule({
  declarations: [
    ReportDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportDetailsPage),
  ],
})
export class ReportDetailsPageModule {}
