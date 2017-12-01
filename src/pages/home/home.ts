import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  params = {
    limit:20
  };
  reportList = [];
  
  // search section
  searchbarInput: string;
  hideToolbar = true;
  oldReportList=[];

  constructor(public navCtrl: NavController, private reportProvider: ReportProvider, private navParams: NavParams) {
    if(navParams.get("params") !== undefined){
      this.params = {...this.params, ...navParams.get("params")};
    }
  }

  ionViewDidLoad() {
    this.reportProvider.getReports(this.params).subscribe(data => {
      this.appendReports(data,true);
    });  
  }

  doRefresh(loader) {
    
    const p = {
      fromDate:this.reportList[0].Date + 1
    };

    console.log("refresh", p);
    
    this.reportProvider.getReports(p).subscribe(data => {
      this.appendReports(data,false);
      loader.complete();
    });  
  }

  doInfinite(infiniteScroll) {

    this.params["skip"] = this.reportList.length;

    this.reportProvider.getReports(this.params).subscribe(data => {
      this.appendReports(data,true);
      infiniteScroll.complete();

      if (data.length === 0){
        console.log("IS disabilitato");
        infiniteScroll.enable(false);
      }
    });  
  }

  searchBtnClick() {
    this.hideToolbar = false;
  }

  //gotoAdvancedSearch() {
  //  this.navCtrl.push(ResearchPage);
  //}

  onSearchbarCancel() {
    this.hideToolbar = true;
  }

  onSearchbarInput(ev) {
    this.reportList = this.oldReportList;

    const val = ev.target.value;
    console.log("VAL", val);

    if (val && val.trim() !== '') {
      this.reportList = this.reportList.filter((item) => {
        if (item.SearchTripName !== undefined && item.SearchTripName.includes(val.toLowerCase())) {
          return item;
        }
      });
    }
  }

  appendReports(data:Array<{}>, appendOnBottom: boolean) {

    console.log("retrieved", data.length, "objs");

    if (data.length > 0) {

      data.forEach((item, index) => {
        item["ReadableDate"] = new Date(item["Date"]).toLocaleDateString();
      });



      if (appendOnBottom) {
        this.reportList = this.reportList.concat(data);
      }
      else {
        this.reportList = data.concat(this.reportList);
      }



      this.oldReportList = this.reportList;


    }
    console.log("ITEMS IN PAGE", this.reportList.length);
  }

}
