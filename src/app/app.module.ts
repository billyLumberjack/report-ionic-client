import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

// Multilanguage
import { TranslateDirective, TranslatePipe, provideTranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { MyApp } from './app.component';

// pages
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { MyTabsPage } from '../pages/my-tabs/my-tabs';
import { ResearchPage } from '../pages/research/research';
import { AddPage } from '../pages/add/add';
import { AboutPage } from '../pages/about/about';
import { ReportDetailsPage } from '../pages/report-details/report-details';
import { SearchResultPage } from '../pages/search-result/search-result';
import { Topos_slides } from '../pages/topos_slides/topos_slides';

// components
import { ReportComponent } from '../components/report/report';
import { MapComponent } from '../components/map/map';
import { PageLoaderComponent } from '../components/page-loader/page-loader';
import { ValidationErrorComponent } from '../components/validation-error/validation-error';

// pipes
import { ToFromDayOfYearPipe } from '../pipes/to-from-day-of-year/to-from-day-of-year';

// providers
import { ReportProvider } from '../providers/report/report';
import { SharedReportsProvider } from '../providers/shared/shared';
import { ReportHandlerProvider } from '../providers/report-handler/report-handler';

export function initStorageFactory(storage: Storage) {
  return () => storage.create();
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
    AddPage,
    AboutPage,
    ReportComponent,
    MapComponent,
    PageLoaderComponent,
    ValidationErrorComponent,
    ToFromDayOfYearPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    TranslatePipe,
    TranslateDirective
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initStorageFactory,
      deps: [Storage],
      multi: true
    },
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideTranslateService({
      loader: { provide: TranslateHttpLoader },
    }),
    provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
    ReportProvider,
    SharedReportsProvider,
    ReportHandlerProvider
  ],
  bootstrap: [MyApp],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
