import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedReportsProvider {

  constructor() {}

  public reportsFeed = [];
  public reportsSearchResults = [];

}
