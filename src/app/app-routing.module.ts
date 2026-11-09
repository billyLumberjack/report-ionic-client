import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyTabsPage } from '../pages/my-tabs/my-tabs';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { ResearchPage } from '../pages/research/research';
import { AddPage } from '../pages/add/add';
import { AboutPage } from '../pages/about/about';
import { ReportDetailsPage } from '../pages/report-details/report-details';
import { SearchResultPage } from '../pages/search-result/search-result';
import { Topos_slides } from '../pages/topos_slides/topos_slides';

const routes: Routes = [
  {
    path: 'tabs',
    component: MyTabsPage,
    children: [
      { path: 'home', component: HomePage },
      { path: 'map', component: MapPage },
      { path: 'research', component: ResearchPage },
      { path: 'add', component: AddPage },
      { path: 'about', component: AboutPage },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'report-details', component: ReportDetailsPage },
  { path: 'search-result', component: SearchResultPage },
  { path: 'topos-slides', component: Topos_slides },
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' }
];

@NgModule({
  // useHash keeps every route served by index.html, so deep-link refreshes work
  // without any nginx rewrite config (the web container's nginx lives outside this
  // repo) and the Capacitor webview is happy too.
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
