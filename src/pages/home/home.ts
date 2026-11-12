import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ReportProvider } from '../../providers/report/report';
import { ReportHandlerProvider } from '../../providers/report-handler/report-handler';
import { SharedReportsProvider } from '../../providers/shared/shared';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    styleUrls: ['home.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomePage implements OnInit {

  params: any = {
    limit: 20
  };

  searchbarInput: string;
  show_page_loader = true;
  infiniteDisabled = false;

  constructor(
    private alertCtrl: AlertController,
    private reportProvider: ReportProvider,
    private reportHandler: ReportHandlerProvider,
    public shared: SharedReportsProvider
  ) {}

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

  ionViewWillEnter() {
    // ngOnInit only runs once; re-mark on every re-entry (e.g. after viewing a
    // report) so freshly-visited reports get their eye icon, matching the old app.
    if (this.shared.reportsFeed && this.shared.reportsFeed.length) {
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsFeed);
    }
  }

  ngOnInit() {
    this.reportProvider.getReports(this.params).subscribe({
      next: (data) => {
        if (data.length === 0)
          this.handleZeroReportsRetrieved();

        this.shared.reportsFeed = this.reportHandler.appendReports(this.shared.reportsFeed, data, true);
        this.reportHandler.markAlreadyVisitedReports(this.shared.reportsFeed);
        this.shared.reportsFeed = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsFeed);

        this.show_page_loader = false;
      },
      error: (err) => {
        console.error('Failed to load reports', err);
        this.show_page_loader = false;
        this.alertCtrl.create({
          header: 'Error',
          subHeader: 'Could not load reports',
          buttons: [{ text: 'OK', role: 'cancel' }]
        }).then(a => a.present());
      }
    });
  }

  doRefresh(event) {
    const p = {
      fromCreatedAt: this.reportHandler.highestCreatedAt + 1
    };

    this.reportProvider.getReports(p).subscribe({
      next: (data) => {
        this.shared.reportsFeed = this.reportHandler.appendReports(this.shared.reportsFeed, data, false);
        this.reportHandler.markAlreadyVisitedReports(this.shared.reportsFeed);
        this.shared.reportsFeed = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsFeed);
        event.target.complete();
      },
      error: () => event.target.complete()
    });
  }

  doInfinite(event) {
    this.params['skip'] = this.shared.reportsFeed.length;

    this.reportProvider.getReports(this.params).subscribe(data => {
      if (data.length === 0) {
        this.infiniteDisabled = true;
        console.info('Infinite Scroll disabled');
      }

      this.shared.reportsFeed = this.reportHandler.appendReports(this.shared.reportsFeed, data, true);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsFeed);
      this.shared.reportsFeed = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsFeed);

      event.target.complete();
    });
  }

}
