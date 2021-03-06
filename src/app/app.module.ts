import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule, Http } from '@angular/http';
//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { ResearchPage } from '../pages/research/research';
import { AddPage } from '../pages/add/add';
import { AboutPage } from '../pages/about/about';
import { ReportDetailsPage } from '../pages/report-details/report-details';
import { SearchResultPage } from '../pages/search-result/search-result';
//providers
import { ReportProvider } from '../providers/report/report';
import { SharedReportsProvider } from '../providers/shared/shared';
// components
import { ReportComponent } from '../components/report/report';
import { MapComponent } from '../components/map/map';
import { PageLoaderComponent } from '../components/page-loader/page-loader';
import { ValidationErrorComponent } from '../components/validation-error/validation-error'
//directives
import { Autosize} from '../directives/autosize/autosize';
import { DirectivesModule } from '../directives/directives.module';


// Multilanguage
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyTabsPage } from '../pages/my-tabs/my-tabs';

import { Topos_slides } from '../pages/topos_slides/topos_slides';

import { IonicStorageModule } from '@ionic/storage';
//
import { Camera } from '@ionic-native/camera';
import { ReportHandlerProvider } from '../providers/report-handler/report-handler';

// pipes
import { PipesModule } from '../pipes/pipes.module';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    MyTabsPage,
    ResearchPage,
    ReportDetailsPage,
    SearchResultPage,
    Topos_slides,
    ReportComponent,
    ValidationErrorComponent,
    MapComponent,
    PageLoaderComponent,
    AddPage,
    AboutPage,
    Autosize
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true,
    }),
    DirectivesModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ReportDetailsPage,
    MyApp,
    MyTabsPage,
    ResearchPage,
    SearchResultPage,
    HomePage,
    MapPage,
    AboutPage,
    Topos_slides,
    AddPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReportProvider,
    Camera,
    SharedReportsProvider,
    ReportHandlerProvider
  ]
})

export class AppModule {}

