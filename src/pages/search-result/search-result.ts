import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ReportProvider } from '../../providers/report/report';
import { ReportHandlerProvider } from '../../providers/report-handler/report-handler';
import { SharedReportsProvider } from '../../providers/shared/shared';

@Component({
    selector: 'page-search-result',
    templateUrl: 'search-result.html',
    styleUrls: ['search-result.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SearchResultPage implements OnInit {
  show_page_loader = true;
  infiniteDisabled = false;
  params: any = {
    limit: 20
  };

  async handleZeroReportsRetrieved() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'No results found',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.show_page_loader = false;
        }
      }]
    });
    await alert.present();
  }

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private reportProvider: ReportProvider,
    private reportHandler: ReportHandlerProvider,
    public shared: SharedReportsProvider
  ) {
    if (this.shared.searchParams) {
      this.params = { ...this.params, ...this.shared.searchParams };
    }
  }

  displaySearchResultOnMap() {
    this.shared.mapReportsList = this.shared.reportsSearchResults;
    this.navCtrl.navigateForward('/tabs/map');
  }

  ngOnInit() {
    this.reportProvider.getReports(this.params).subscribe(data => {

      if (data.length === 0)
        this.handleZeroReportsRetrieved();

      this.shared.reportsSearchResults = this.reportHandler.appendReports(this.shared.reportsSearchResults, data, true);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsSearchResults);
      this.shared.reportsSearchResults = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsSearchResults);

      this.show_page_loader = false;
    });
  }

  doRefresh(event) {
    const p = {
      fromCreatedAt: this.reportHandler.highestCreatedAt + 1
    };

    this.reportProvider.getReports(p).subscribe(data => {
      this.shared.reportsSearchResults = this.reportHandler.appendReports(this.shared.reportsSearchResults, data, false);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsSearchResults);
      this.shared.reportsSearchResults = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsSearchResults);
      event.target.complete();
    });
  }

  doInfinite(event) {
    this.params['skip'] = this.shared.reportsSearchResults.length;

    this.reportProvider.getReports(this.params).subscribe(data => {
      if (data.length === 0) {
        this.infiniteDisabled = true;
        console.info('Infinite Scroll disabilitato');
      }

      this.shared.reportsSearchResults = this.reportHandler.appendReports(this.shared.reportsSearchResults, data, true);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsSearchResults);
      this.shared.reportsSearchResults = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsSearchResults);

      event.target.complete();
    });
  }

}
