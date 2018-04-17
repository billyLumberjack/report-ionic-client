import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedProvider} from '../../providers/shared/shared'
import { ReportDetailsPage } from '../../pages/report-details/report-details';
import { TranslateService } from '@ngx-translate/core';




import leaflet from 'leaflet';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  map:any;
  refresherExists = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shared: SharedProvider, private translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.buildFakeCoordinates();
    this.loadmap();
  }

  buildFakeCoordinates(){
    /*
    "geometry": {
      "type": "Point",
      "coordinates": [125.6, 10.1]
    }
     
    for (let report of this.shared.data) {
      if(report.geometry == undefined){
        report["geometry"] = {
          type:"Point",
          coordinates:[
            (Math.random() * (36.32475 - 47.18290) + 47.18290),
            (Math.random() * (18.56574 - 6.54670) + 6.54670)
          ]
        };
      }
    }
    */
  }

  loadmap(){
    this.map = leaflet.map("map").fitWorld();
    
    leaflet.tileLayer('http://ec3.cdn.ecmaps.de/WmsGateway.ashx.jpg?Experience=kompass&MapStyle=KOMPASS%20Touristik&TileX={x}&TileY={y}&ZoomLevel={z}', {
      maxZoom: 18,
      subdomains:["1","2","3"],
      errorTileUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }).addTo(this.map);

    let markerArray = [];

    this.shared.data.forEach((report_obj, index) => {

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


