import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report'
import { ReportDetailsPage } from '../../pages/report-details/report-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reportList:any;

  constructor(public navCtrl: NavController, private reportProvider:ReportProvider) {
    
  }

  ionViewWillEnter(){
    
    this.reportProvider.getReportsBetweenDates(1490095805000,1506940205000).subscribe(data =>{

      this.reportList = data;

      this.reportList.sort(function(a, b){
        return b.Date-a.Date
      });

      console.log(this.reportList[0].TripName);

      this.reportList.forEach(function(item, index){
        item["ReadableDate"] = new Date(item.Date).toLocaleDateString();
      });


    });

  }

  itemSelected(obj){
    this.navCtrl.push(ReportDetailsPage, {
      report: obj
    });
  }



}
