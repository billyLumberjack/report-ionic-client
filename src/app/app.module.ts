import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResearchPage } from '../pages/research/research';
import { ReportDetailsPage } from '../pages/report-details/report-details';
import { ReportProvider } from '../providers/report/report';

import { MyTabsPage } from '../pages/my-tabs/my-tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyTabsPage,
    ResearchPage,
    ReportDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ReportDetailsPage,
    MyApp,
    MyTabsPage,
    ResearchPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReportProvider
  ]
})
export class AppModule {}
