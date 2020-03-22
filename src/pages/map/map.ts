import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedProvider} from '../../providers/shared/shared'
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shared: SharedProvider,
    private mapProvider:MapProvider,
    private translate: TranslateService
  ) {}

  ionViewDidLoad() {
    this.map = this.mapProvider.getMap("map1");

    this.handleNavigationToReportPages();
    this.setupMapAndMarkers();
  }

  handleNavigationToReportPages(){
    let navigateToReportByEvent = (event) => {
      this.navCtrl.push(ReportDetailsPage, {
        report: this.shared.data[event["detail"]]
      });
    }

    document.addEventListener('build', navigateToReportByEvent );
  }

  setupMapAndMarkers(){

    console.log("loadmap triggered with " + this.shared.data.length + " reports");

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


    let markerArray = this.shared.data
      .filter(report_obj => report_obj.geometry && report_obj.geometry.type)
      .map((report_obj, index) => {
          let popup_string = buildPopupStringByReportAndId(report_obj, index);
          let leafletMarker = new leaflet.Marker(report_obj.geometry.coordinates).bindPopup(popup_string)
          return leafletMarker;
    });

    let markerGroup = leaflet.featureGroup(markerArray)
    markerGroup.addTo(this.map);
    this.map.fitBounds(markerGroup.getBounds());

  }

}


