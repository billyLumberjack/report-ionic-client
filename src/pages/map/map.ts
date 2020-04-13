import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedReportsProvider} from '../../providers/shared/shared'
import { ReportDetailsPage } from '../../pages/report-details/report-details';
import { TranslateService } from '@ngx-translate/core';

import { MapComponent } from '../../components/map/map';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  refresherExists = true;
  map:any;

  reportsList = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shared : SharedReportsProvider
  ) {
    if(this.navParams.get("reportsList")){
      this.reportsList = this.navParams.get("reportsList");
    }
    else{
      this.reportsList = shared.reportsFeed;
    }

  }

  ionViewDidEnter() {

    this.mapComponent.initMap();

    let reportListLayer = this.mapComponent.getLayerByReportArray(this.reportsList , true);
    this.mapComponent.addLayerToMap(reportListLayer);
    this.mapComponent.centerMapOnLayer(reportListLayer);

    this.addListenerForReportPopupClick();
  }

  ionViewDidLeave(){
    document.getElementById("cssMapId").removeEventListener('build' , this.navigateToReportByEvent );
  }

  private addListenerForReportPopupClick(){
    document.getElementById("cssMapId").addEventListener('build', this.navigateToReportByEvent );
  }

  private navigateToReportByEvent = (event) => {

    console.log("dispatched event !");

    this.navCtrl.push(ReportDetailsPage, {
      report: this.reportsList[event["detail"]]
    });
  }



}


