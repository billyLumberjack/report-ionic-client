import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportProvider {

  constructor(public http: HttpClient) {
  }

  postImage(body): Promise<any> {
    const url = environment.api_endpoint + '/images';
    return firstValueFrom(this.http.post<any>(url, body)).catch(err => {
      console.error('ERROR UPLOADING IMAGE', err);
    });
  }

  postReport(report_obj): Promise<any> {
    const url = environment.api_endpoint + '/report';
    return firstValueFrom(this.http.post<any>(url, report_obj));
  }

  getReports(parameters): Observable<any[]> {
    const url = environment.api_endpoint + '/report';
    return this.http.get<any[]>(url, { params: parameters });
  }

  getImagesBySearchQuery(queryString): Promise<any> {
    const url = 'https://api.qwant.com/api/search/images';

    const parameters = {
      count: 3,
      q: queryString,
      t: 'images',
      safesearch: 1,
      locale: 'it_IT'
    };

    return firstValueFrom(this.http.get<any>(url, { params: parameters }));
  }

}
