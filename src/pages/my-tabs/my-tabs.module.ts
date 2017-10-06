import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTabsPage } from './my-tabs';

@NgModule({
  declarations: [
    MyTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTabsPage),
  ]
})
export class MyTabsPageModule {}
