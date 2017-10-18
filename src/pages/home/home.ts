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
  lastKey = {};

  constructor(public navCtrl: NavController, private reportProvider: ReportProvider) {
  }

  ionViewWillEnter() {
    this.populateList(null,null);
  }

  doInfinite(infiniteScroll) {
    this.populateList(this.lastKey,infiniteScroll);
  }

  populateList(lk, is) {


    return this.reportProvider.getLastReports(20,lk).subscribe(data => {
      
      var arr = data.Items;
      
      console.log("LAST KEY", JSON.stringify(data.LastEvaluatedKey));
      
      if(data.LastEvaluatedKey == undefined){
        console.log("IS DISABLED");
        is.complete();
        is.enable(false);
      }else{
        this.lastKey = data.LastEvaluatedKey;
      }

      arr.forEach(function (item, index) {
          item["ReadableDate"] = new Date(item.Date).toLocaleDateString();
        });
/*
        for(var item in arr){
          if(this.reportList.includes(item))
            console.log("AAAAAAAAAAAAAAAAAAAA");
        }
*/
        this.reportList = this.reportList.concat(arr);

        if (is != null)
          is.complete();
  });
}

  itemSelected(obj) {
    this.navCtrl.push(ReportDetailsPage, {
      report: obj
    });
  }



}
