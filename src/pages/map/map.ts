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
  @ViewChild('map') mapContainer: ElementRef;

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
    console.log('ionViewDidLoad MapPage');

    this.map = this.mapProvider.getMap("map1");

    this.loadmap();
  }

  loadmap(){

    console.log("loadmap triggered with " + this.shared.data.length + " reports");

    let markerArray = [];

    this.shared.data.forEach((report_obj, index) => {

      if(report_obj.geometry.type){

      let popup_string = '<table>'+
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
        '</tr></table>';

      markerArray.push(
        new leaflet.Marker(report_obj.geometry.coordinates)
        .bindPopup(popup_string)
      );
      }

    });

    document.addEventListener('build', (event) => {
        //console.log(JSON.stringify(event.detail,null,2));

        this.navCtrl.push(ReportDetailsPage, {
          report: this.shared.data[event["detail"]]
        });

      });

    let markerGroup = leaflet.featureGroup(markerArray)
    markerGroup.addTo(this.map);
    this.map.fitBounds(markerGroup.getBounds());

  }

  zoomIn(){
    this.map.setZoom(this.map.getZoom() + 1);
  }

}


