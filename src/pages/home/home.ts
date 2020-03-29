import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';
import { ReportHandlerProvider } from '../../providers/report-handler/report-handler';
import { SharedProvider } from '../../providers/shared/shared'
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
    private shared: SharedProvider
  ) {}

  ionViewDidLoad() {

    this.reportProvider.getReports(this.params).subscribe(data => {

      if(data.length === 0)
        this.handleZeroReportsRetrieved();

      this.reportHandler.appendReports(data, true);
      this.reportHandler.markAlreadyVisitedReports();
      this.reportHandler.convertReortsDateToLocalOne();

      this.show_page_loader = false;
    });
  }

  doRefresh(loader) {
    const p = {
      fromCreatedAt: this.reportHandler.highestCreatedAt + 1
    };

    this.reportProvider.getReports(p).subscribe(data => {

      this.reportHandler.appendReports(data, false);
      this.reportHandler.markAlreadyVisitedReports();
      this.reportHandler.convertReortsDateToLocalOne();
      loader.complete();
    });
  }

  doInfinite(infiniteScroll) {

    this.params["skip"] = this.shared.data.length;

    this.reportProvider.getReports(this.params).subscribe(data => {

      if(data.length === 0){
        infiniteScroll.enable(false);

        console.log("Infinite Scroll disabilitato");
      }

      this.reportHandler.appendReports(data, true);
      this.reportHandler.markAlreadyVisitedReports();
      this.reportHandler.convertReortsDateToLocalOne();

      infiniteScroll.complete();

    });
  }

  insertImages(reportObj) {
    //
    //    reportObj["Images"] = [];
    //    return this.reportProvider.getImagesBySearchQuery(reportObj["TripName"] + " scialpinismo").then(response => {
    //      for (let image_obj of response.data.result.items) {
    //        reportObj["Images"].push(image_obj["media"]);
    //      }
    //    });
    //
  }

}
