import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';
import {SharedProvider} from '../../providers/shared/shared'
import { Storage } from '@ionic/storage';
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
  reportList = [];


  highestCreatedAt = 0;

  // search section
  searchbarInput: string;
  hideToolbar = true;
  oldReportList = [];
  show_page_loader = true;

  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    public navCtrl: NavController,
    private reportProvider: ReportProvider,
    private navParams: NavParams,
    private shared: SharedProvider
  ) {

    if (navParams.get("params") !== undefined) {
      this.params = { ...this.params, ...navParams.get("params") };
    }
  }

  ionViewDidEnter() {
    this.markAlreadyVisitedReports();
  }

  ionViewDidLoad() {

    this.reportProvider.getReports(this.params).subscribe(data => {
      this.appendReports(data, true);
      this.markAlreadyVisitedReports();
    });
  }

  doRefresh(loader) {
    const p = {
      fromCreatedAt: this.highestCreatedAt + 1
    };

    console.log("refresh", p);

    this.reportProvider.getReports(p).subscribe(data => {
      this.appendReports(data, false);
      this.markAlreadyVisitedReports();
      loader.complete();
    });
  }

  doInfinite(infiniteScroll) {

    this.params["skip"] = this.reportList.length;

    this.reportProvider.getReports(this.params).subscribe(data => {
      this.appendReports(data, true);
      this.markAlreadyVisitedReports();
      infiniteScroll.complete();

      if (data.length === 0) {
        console.log("IS disabilitato");
        infiniteScroll.enable(false);
      }
    });
  }

  searchBtnClick() {
    this.hideToolbar = false;
  }

  appendReports(data: Array<{}>, appendOnBottom: boolean) {

    console.log("retrieved", data.length, "objs");

    if (data.length > 0) {

      let promises_array: Array<Promise<void>> = [];

      data.forEach((item, index) => {

        if (item["CreatedAt"] > this.highestCreatedAt) {
          this.highestCreatedAt = item["CreatedAt"];
        }
        item["ReadableDate"] = new Date(item["Date"]).toLocaleDateString();
      });

      this.show_page_loader = false;

      if (appendOnBottom) {
        this.reportList = this.reportList.concat(data);
      }
      else {
        this.reportList = data.concat(this.reportList);
      }
      this.oldReportList = this.reportList;
    }
    else if(this.reportList.length == 0){


      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'No results found',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.show_page_loader = false;
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();
    }
    this.shared.data = this.reportList;
    console.log("ITEMS IN PAGE", this.reportList.length);
  }

  markAlreadyVisitedReports() {
    this.storage.get('visited_report').then((visited_report_array) => {

      if (visited_report_array) {

        for (let item of this.reportList) {
          if (visited_report_array.indexOf(item["_id"]) > -1) {
            item["Visited"] = true;
          }
          ///*DA ELIMINARE ASAP*/
          //if(item.geometry == undefined){
          //  item["geometry"] = {
          //    type:"Point",
          //    coordinates:[
          //      (Math.random() * (36.32475 - 47.18290) + 47.18290),
          //      (Math.random() * (18.56574 - 6.54670) + 6.54670)
          //    ]
          //  };
          //}
          ///*DA ELIMINARE ASAP*/
        }
      }

    });
  }

  insertImages(reportObj) {

    reportObj["Images"] = [];
    return this.reportProvider.getImagesBySearchQuery(reportObj["TripName"] + " scialpinismo").then(response => {
      for (let image_obj of response.data.result.items) {
        reportObj["Images"].push(image_obj["media"]);
      }
    });

  }

}
