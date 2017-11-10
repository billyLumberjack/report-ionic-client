import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ReportProvider {

  url;

  constructor(public http: Http) {
    //this.url = "http://echo.jsontest.com/insert-key-here/insert-value-here/key/value";
    //this.url = "https://3dq6jt7fd0.execute-api.eu-central-1.amazonaws.com/dev/report";
    console.log('Hello ReportProvider Provider');
  }


  getReports(parameters) {
    this.url = "https://3dq6jt7fd0.execute-api.eu-central-1.amazonaws.com/dev/report";

    console.log(JSON.stringify(parameters,null,2));

    return this.http.get(this.url, {params:parameters}).map(res => res.json());
  }

  getLastReports(step, exclusiveStartKey) {
    this.url = "https://3dq6jt7fd0.execute-api.eu-central-1.amazonaws.com/dev/report?";

    if (step != null)
      this.url += "&limit=" + step;

    if (exclusiveStartKey != null)
      this.url += "&exclusiveStartKey=" + encodeURIComponent(JSON.stringify(exclusiveStartKey));

    return this.http.get(this.url).map(res => res.json());
  }

  getReportsBetweenDates(init, end) {
    //https://th6xzuilxk.execute-api.eu-central-1.amazonaws.com/dev/report?fromDate=1490095805000&toDate=1506940205000
    this.url = "https://3dq6jt7fd0.execute-api.eu-central-1.amazonaws.com/dev/report";
    this.url += ("?fromDate=" + init + "&toDate=" + end);

    return this.http.get(this.url).map(res => res.json());
  }

}
