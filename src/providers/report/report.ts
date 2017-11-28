import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ReportProvider {

  host = "https://3dq6jt7fd0.execute-api.eu-central-1.amazonaws.com/dev";

  constructor(public http: Http) {
    console.log('Hello ReportProvider Provider');
  }

  postImage(body) {
    var url = this.host + "/images";
    return this.http.post(url,body).map(res => res.json());
  }

  postReport(report_obj) {
    var url = this.host + "/report";
    return this.http.post(url,report_obj).map(res => res.json());
  }


  getReports(parameters) {
    var url = this.host + "/report";

    console.log("PARAMETERS FROM PROVIDER\n",JSON.stringify(parameters,null,2));

    return this.http.get(url, {params:parameters}).map(res => res.json());
  }

}