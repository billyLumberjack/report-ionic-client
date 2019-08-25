import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {SharedProvider} from '../../providers/shared/shared'
import { ReportDetailsPage } from '../../pages/report-details/report-details';
import leaflet from 'leaflet';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {

  text: string;

  map:any;
  refresherExists = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shared: SharedProvider, private translate: TranslateService){}
  
  load(){
    console.log('map component');

    console.log(JSON.stringify(this.map,null,2));

    this.map = leaflet.map("map",{
      zoomControl: false
    }).fitWorld();

    //add zoom control with your options
    leaflet.control.zoom({
      position:'bottomleft'
    }).addTo(this.map);
    
    leaflet.tileLayer('http://ec{s}.cdn.ecmaps.de/WmsGateway.ashx.jpg?Experience=kompass&MapStyle=KOMPASS%20Touristik&TileX={x}&TileY={y}&ZoomLevel={z}', {
      maxZoom: 18,
      subdomains:["1","2","3"],
      errorTileUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }).addTo(this.map);

    this.loadmap();
  }

  loadmap(){


    let markerArray = [];

    this.shared.data.forEach((report_obj, index) => {

      if(report_obj.geometry){

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
        //console.log(JSON.stringify(event["detail"],null,2));
        
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
