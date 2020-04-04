import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { Storage } from '@ionic/storage';
import {SharedProvider} from '../../providers/shared/shared'

/*
  Generated class for the ReportHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportHandlerProvider {

  highestCreatedAt = 0;
  oldReportList = [];


  constructor(
    private storage: Storage,
    private shared: SharedProvider

  ) {}

  emptyReportsList(){
    this.shared.data = [];
  }

  markAlreadyVisitedReports() {

    var enhanceArray = function(localReportArray, visited_report_array){
      if(visited_report_array){ 
        return localReportArray.map((item) => {
          if (visited_report_array.indexOf(item["_id"]) > -1) {
            item["Visited"] = true;
          return item;
          }
        });
      }
    }

    this.storage.get('visited_report').then(visited_report_array => enhanceArray(this.shared.data, visited_report_array));

  }

  convertReortsDateToLocalOne(){
    this.shared.data = this.shared.data.map((item, index) => {

      if (item["CreatedAt"] > this.highestCreatedAt) {
        this.highestCreatedAt = item["CreatedAt"];
      }
      item["ReadableDate"] = new Date(item["Date"]).toLocaleDateString();
      return item;
    });
  }

  appendReports(data: Array<{}>, appendOnBottom: boolean) {
    if (data.length > 0) {
      if (appendOnBottom) {
        this.shared.data = this.shared.data.concat(data);
      }
      else {
        this.shared.data = data.concat(this.shared.data);
      }
      this.oldReportList = this.shared.data;
    }

  }


}
