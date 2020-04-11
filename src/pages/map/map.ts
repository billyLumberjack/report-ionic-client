import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedReportsProvider} from '../../providers/shared/shared'
import { ReportDetailsPage } from '../../pages/report-details/report-details';
import { TranslateService } from '@ngx-translate/core';

import {MapProvider} from '../../providers/map.provider'

import leaflet from 'leaflet';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  refresherExists = true;
  map:any;

  reportsList = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shared: SharedReportsProvider,
    private mapProvider:MapProvider,
    private translate: TranslateService
  ) {
    if(this.navParams.get("reportsList")){
      this.reportsList = this.navParams.get("reportsList");
    }
    else{
      this.reportsList = shared.reportsFeed;
    }

  }

  ionViewDidLoad() {
    this.map = this.mapProvider.getMap("map1");

    this.handleNavigationToReportPages();
  }

  ionViewDidEnter(){
      this.setupMapAndMarkers();
      this.map.invalidateSize();

  }

  handleNavigationToReportPages(){
    let navigateToReportByEvent = (event) => {
      this.navCtrl.push(ReportDetailsPage, {
        report: this.reportsList[event["detail"]]
      });
    }

    document.addEventListener('build', navigateToReportByEvent );
  }

  setupMapAndMarkers(){
    var buildPopupStringByReportAndId = (report_obj, index) => {
      let res = '<table>'+
      '<tr>'+
      '<th colspan="2"><a onclick="document.dispatchEvent(new CustomEvent(\'build\',{detail: '+index+'}));" href="javascript:void(0);"><b>'+
      report_obj.TripName+
      '</b></a><th>'+
      '</tr>'+
      '<tr>'+
      '<td>'+this.translate.instant("DETAILS.ElevationGain")+'</td>'+
      '<td class="popup-value">'+report_obj.ElevationGain +'</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+this.translate.instant("DETAILS.Grade")+'</td>'+
      '<td class="popup-value">'+report_obj.Grade +'</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+this.translate.instant("DETAILS.TripRate")+'</td>'+
      '<td class="popup-value">'+report_obj.TripRate +'</td>'+
      '</tr></table>'

      return res;
    }


    let markerArray = this.reportsList
      .map((report_obj, index) => {
        if(report_obj.geometry && report_obj.geometry.coordinates ){
          let popup_string = buildPopupStringByReportAndId(report_obj, index);
          let leafletMarker = new leaflet.Marker(report_obj.geometry.coordinates).bindPopup(popup_string)
          return leafletMarker;
        }
        else{
          return undefined;
        }
      })
      .filter(marker => marker != undefined);

    let markerGroup = leaflet.featureGroup(markerArray)
    markerGroup.addTo(this.map);
    this.map.fitBounds(markerGroup.getBounds());

  }

}


