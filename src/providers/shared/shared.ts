import { Injectable } from '@angular/core';

@Injectable()
export class SharedReportsProvider {

  constructor() {}

  public reportsFeed = [];
  public reportsSearchResults = [];

  // Transient payloads carried across router navigations (replaces the old
  // ionic-angular NavParams object passing, which is gone with Angular routing).
  public selectedReport: any = null;
  public mapReportsList: any[] = null;
  public searchParams: any = null;
  public toposImages: any[] = null;
  public toposIndex = 0;

}
