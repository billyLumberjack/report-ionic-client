import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';
import { ReportHandlerProvider } from '../../providers/report-handler/report-handler';
import { SharedReportsProvider } from '../../providers/shared/shared'
import { AlertController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ENV } from '@app/env';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  params = {
    limit: 20
  };


  // search section
  searchbarInput: string;
  hideToolbar = true;
  show_page_loader = true;

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
  ) {}

  ionViewDidLoad() {

    this.reportProvider.getReports(this.params).subscribe(data => {

      if(data.length === 0)
        this.handleZeroReportsRetrieved();

      this.shared.reportsFeed = this.reportHandler.appendReports(this.shared.reportsFeed , data, true);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsFeed);
      this.shared.reportsFeed = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsFeed);

      this.show_page_loader = false;
    });
  }

  doRefresh(loader) {
    const p = {
      fromCreatedAt: this.reportHandler.highestCreatedAt + 1
    };

    this.reportProvider.getReports(p).subscribe(data => {

      this.shared.reportsFeed = this.reportHandler.appendReports(this.shared.reportsFeed,data, false);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsFeed);
      this.shared.reportsFeed = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsFeed);
      loader.complete();
    });
  }

  doInfinite(infiniteScroll) {

    this.params["skip"] = this.shared.reportsFeed.length;

    this.reportProvider.getReports(this.params).subscribe(data => {

      if(data.length === 0){
        infiniteScroll.enable(false);

        console.info("Infinite Scroll disabled");
      }

      this.shared.reportsFeed = this.reportHandler.appendReports(this.shared.reportsFeed,data, true);
      this.reportHandler.markAlreadyVisitedReports(this.shared.reportsFeed);
      this.shared.reportsFeed = this.reportHandler.convertReortsDateToLocalOne(this.shared.reportsFeed);

      infiniteScroll.complete();

    });
  }

  insertImages(reportObj) {
    //
    //    reportObj["Images"] = [];
    //    return this.reportProvider.getImagesBySearchQuery(reportObj["TripName"] + " scialpinismo").then(response => {
    //      for (let image_obj of response.reportsFeed.result.items) {
    //        reportObj["Images"].push(image_obj["media"]);
    //      }
    //    });
    //
  }

}
