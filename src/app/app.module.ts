import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule, Http } from '@angular/http';
//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResearchPage } from '../pages/research/research';
import { AddPage } from '../pages/add/add';
import { ReportDetailsPage } from '../pages/report-details/report-details';
//providers
import { ReportProvider } from '../providers/report/report';
// components
import { ReportComponent } from '../components/report/report';
//directives
import { Autosize} from '../directives/autosize/autosize';


// Multilanguage
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyTabsPage } from '../pages/my-tabs/my-tabs';

import { Topos_slides } from '../pages/topos_slides/topos_slides';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyTabsPage,
    ResearchPage,
    ReportDetailsPage,
    Topos_slides,
    ReportComponent,
    AddPage,
    Autosize
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true,
    }),
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ReportDetailsPage,
    MyApp,
    MyTabsPage,
    ResearchPage,
    HomePage,
    Topos_slides,
    AddPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReportProvider
  ]
})

export class AppModule {}

