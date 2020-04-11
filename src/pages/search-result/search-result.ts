import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';
import { ReportHandlerProvider } from '../../providers/report-handler/report-handler';

import { SharedReportsProvider } from '../../providers/shared/shared'

import { AlertController } from 'ionic-angular';
import {MapPage} from '../map/map';


/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  hideToolbar = true;
  show_page_loader = true;
  params = {
    limit: 20
  };
  
  handleZeroReportsRetrieved = function(){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'No results found',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.show_page_loader = false;            }
      }]
    });
    alert.present();
  }

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private reportProvider: ReportProvider,
    private reportHandler: ReportHandlerProvider,
    private navParams: NavParams,
    private shared: SharedReportsProvider
  ) {

    if (navParams.get("params") !== undefined) {
      this.params = { ...this.params, ...navParams.get("params") };
    }
  }

  displaySearchResultOnMap(){
    this.navCtrl.push(MapPage , {reportsList: this.shared.reportsSearchResults});
  }

  ionViewDidLoad() {

    this.reportProvider.getReports(this.params).subscribe(data => {

      if(data.length === 0)
        this.handleZeroReportsRetrieved();

      this.shared.reportsSearchResults = this.reportHandler.appendReports(this.shared.reportsSearchResults,data, true);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsSearchResults);
      this.shared.reportsSearchResults = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsSearchResults);

      this.show_page_loader = false;
    });
  }

  doRefresh(loader) {
    const p = {
      fromCreatedAt: this.reportHandler.highestCreatedAt + 1
    };

    this.reportProvider.getReports(p).subscribe(data => {

      this.shared.reportsSearchResults = this.reportHandler.appendReports(this.shared.reportsSearchResults,data, false);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsSearchResults);
      this.shared.reportsSearchResults = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsSearchResults);
      loader.complete();
    });
  }

  doInfinite(infiniteScroll) {

    this.params["skip"] = this.shared.reportsSearchResults.length;

    this.reportProvider.getReports(this.params).subscribe(data => {

      if(data.length === 0){
        infiniteScroll.enable(false);

        console.info("Infinite Scroll disabilitato");
      }

      this.shared.reportsSearchResults = this.reportHandler.appendReports(this.shared.reportsSearchResults,data, true);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsSearchResults);
      this.shared.reportsSearchResults = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsSearchResults);

      infiniteScroll.complete();

    });
  }

}
