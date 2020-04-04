import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ENV } from '@app/env';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ReportProvider {

  constructor(public http: Http) {
  }

  postImage(body) {
    var url = ENV.api_endpoint + "/images";
    return this.http.post(url,body).map(res => res.json()).toPromise().catch(err=>{
      console.error("ERROR UPLOADING IMAGE",err);
    });
  }

  postReport(report_obj) {
    var url = ENV.api_endpoint + "/report";
    return this.http.post(url,report_obj).map(res => res.json()).toPromise();
  }


  getReports(parameters) {
    var url = ENV.api_endpoint + "/report";
    return this.http.get(url, {params:parameters}).map(res => res.json());
  }

  getImagesBySearchQuery(queryString) {
    var url = "http://api.qwant.com/api/search/images";

    var parameters = {
      count: 3,
      q: queryString,
      t: "images",
      safesearch: 1,
      locale: "it_IT"
    }

    return this.http.get(url,{params:parameters}).map(res => res.json()).toPromise();
  }

}