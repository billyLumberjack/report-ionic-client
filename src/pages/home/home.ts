import { Component, ViewChild } from '@angular/core';
import { NavController, Keyboard } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report'
import { ReportDetailsPage } from '../../pages/report-details/report-details';
import { ResearchPage } from '../../pages/research/research';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reportList: any = [];
  lastKey = {};

  constructor(private keyboard: Keyboard, public navCtrl: NavController, private reportProvider: ReportProvider) {
  }

  ionViewDidLoad() {
    //window.addEventListener('native.keyboardhide', this.keyboardHideHandler);
    this.navCtrl.push(ResearchPage);
    this.populateList(null, null);
  }

  doInfinite(infiniteScroll) {
    this.populateList(this.lastKey, infiniteScroll);
  }

  populateList(lk, is) {


    return this.reportProvider.getLastReports(20, lk).subscribe(data => {

      var arr = data.Items;

      console.log("LAST KEY", JSON.stringify(data.LastEvaluatedKey));

      if (data.LastEvaluatedKey == undefined) {
        console.log("IS DISABLED");
        is.complete();
        is.enable(false);
      } else {
        this.lastKey = data.LastEvaluatedKey;
      }

      arr.forEach(function (item, index) {
        item["ReadableDate"] = new Date(item.Date).toLocaleDateString();
      });
      
      this.reportList = this.reportList.concat(arr);
      this.oldReportList = this.reportList;

      if (is != null)
        is.complete();
    });
  }

  itemSelected(obj) {
    this.navCtrl.push(ReportDetailsPage, {
      report: obj
    });
  }

  // search section
  searchbarInput: string;
  hideToolbar: boolean = true;
  oldReportList: Array<any>;

  @ViewChild('searchbarElement') mySearchbar;

  searchBtnClick() {
    this.hideToolbar = false;

    //setInterval(() => {
    //  this.mySearchbar.setFocus();
    //}, 200);
  }

  gotoAdvancedSearch() {
    this.navCtrl.push(ResearchPage);
  }

  onSearchbarCancel() {
    this.hideToolbar = true;
  }

  onSearchbarInput(ev) {
    this.reportList = this.oldReportList

    let val = ev.target.value;
    console.log("VAL", val);

    if (val && val.trim() !== '') {
      this.reportList = this.reportList.filter(function (item) {
        if (item.SearchTripName != undefined && item.SearchTripName.includes(val.toLowerCase())) {
          return item;
        }
      });
    }
  }



}
