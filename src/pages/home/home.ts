import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report'
import { ReportDetailsPage } from '../../pages/report-details/report-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reportList: any = [];
  from: number;
  to: number;

  eightWeeksMilliseconds: number = 4838400000;

  constructor(public navCtrl: NavController, private reportProvider: ReportProvider) {
    this.to = new Date().getTime();
    this.from = this.to - this.eightWeeksMilliseconds;
  }

  ionViewWillEnter() {
    this.populateList(null);
  }

  doInfinite(infiniteScroll) {
    this.to = this.from;
    this.from = this.to - this.eightWeeksMilliseconds;
    this.populateList(infiniteScroll);
  }

  populateList(is) {
    this.reportProvider.getReportsBetweenDates(this.from, this.to).subscribe(data => {

      if (data.length != 0) {

        data.sort(function (a, b) {
          return b.Date - a.Date
        });

        data.forEach(function (item, index) {
          item["ReadableDate"] = new Date(item.Date).toLocaleDateString();
        });

        this.reportList = this.reportList.concat(data);

        if (is != null)
          is.complete();
      }
      else if (is != null) {
        is.complete();
        is.enable(false);
      }


    });
  }

  itemSelected(obj) {
    this.navCtrl.push(ReportDetailsPage, {
      report: obj
    });
  }



}
