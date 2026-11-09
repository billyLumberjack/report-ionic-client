import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SharedReportsProvider } from '../../providers/shared/shared';

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
    return this.storage.get('visited_report').then((visited_report_array) => {
      if (visited_report_array) {
        reportList.forEach((item) => {
          if (visited_report_array.indexOf(item["_id"]) > -1) {
            item["Visited"] = true;
          }
        });
      }
      return reportList;
    });
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
