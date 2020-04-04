import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Topos_slides} from '../topos_slides/topos_slides';
import { TranslateService } from '@ngx-translate/core';

import {MapProvider} from '../../providers/map.provider'

import leaflet from 'leaflet';


/**
 * Generated class for the ReportDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-details',
  templateUrl: 'report-details.html',
})
export class ReportDetailsPage {

  @ViewChild('map') mapContainer: ElementRef;

  report = null;
  isMapFullscreen = false;

  map:any;

  fieldsToShow = [
    "Region",
    "StartingFrom",
    "StartingValley",
    "StartingAltitude",

    "Grade",
    "ElevationGain",
    "EndAltitude",
    "UphillSide",
    "DownhillSide",

    "SnowRate",
    "MainSnowType",
    "OtherSnowType",
    "AvalancheRisk",
    "SnowComment",
    "SnowDescription",

    "TripRate",
    "TripComment",
    "TripDescription",
    "LinkedTrip",

    "Site",
    "User"

    //"Id",
    //"Date",
    //"OnsiteId",
    //"SearchTripName",
    //"TripName",
    //"Type",
    //"Images",
  ];

  constructor(public mapProvider: MapProvider, public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService) {
    this.report = this.navParams.get("report");
    if(this.report.ReadableDate == undefined){
      this.report.ReadableDate = new Date(this.report.Date).toLocaleDateString();
    }
  }

  ionViewDidLoad() {

    this.map = this.mapProvider.getMap("map2").invalidateSize();

    let popup_string = '<table>'+
        '<tr>'+
        '<th colspan="2"><b>'+
        this.report.TripName+
        '</b><th>'+
        '</tr>'+
        '<tr>'+
        '<td>'+this.translate.instant("DETAILS.ElevationGain")+'</td>'+
        '<td class="popup-value">'+this.report.ElevationGain +'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>'+this.translate.instant("DETAILS.Grade")+'</td>'+
        '<td class="popup-value">'+this.report.Grade +'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>'+this.translate.instant("DETAILS.TripRate")+'</td>'+
        '<td class="popup-value">'+this.report.TripRate +'</td>'+
        '</tr></table>';

      let marker = new leaflet.Marker(this.report.geometry.coordinates)
        .bindPopup(popup_string);

      marker.addTo(this.map);
      this.map.setView(marker.getLatLng(),12);

      this.map.addControl(new leaflet.Control.Fullscreen());

      this.map.on('fullscreenchange', () => {
        this.map.invalidateSize();
      });

    }

  gotoSlide(i){
    this.navCtrl.push(Topos_slides,{
      index:i,
      images:this.report.Images
    });
  }

  zoomIn(){
    this.map.setZoom(this.map.getZoom() + 1);
  }


}
