import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { Storage } from '@ionic/storage';
import {SharedReportsProvider} from '../../providers/shared/shared'

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
    private shared: SharedReportsProvider

  ) {}

  emptyReportsList(reportList){
    return [];
  }

  markAlreadyVisitedReports(reportList) {

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

    this.storage.get('visited_report').then(visited_report_array => enhanceArray(reportList, visited_report_array));

  }

  convertReortsDateToLocalOne(reportList){
    return reportList.map((item, index) => {

      if (item["CreatedAt"] > this.highestCreatedAt) {
        this.highestCreatedAt = item["CreatedAt"];
      }
      item["ReadableDate"] = new Date(item["Date"]).toLocaleDateString();
      return item;
    });
  }

  appendReports(reportList , reportsToAppend: Array<{}>, appendOnBottom: boolean) {
    if (reportsToAppend.length > 0) {
      if (appendOnBottom) {
        reportList = reportList.concat(reportsToAppend);
      }
      else {
        reportList = reportsToAppend.concat(reportList);
      }
      this.oldReportList = reportList;
    }

    return reportList;

  }


}
