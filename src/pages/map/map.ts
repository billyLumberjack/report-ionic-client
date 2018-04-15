import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedProvider} from '../../providers/shared/shared'
import { ReportDetailsPage } from '../../pages/report-details/report-details';



import leaflet from 'leaflet';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  map:any;
  refresherExists = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shared: SharedProvider) {
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
     */
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

      markerArray.push(
        new leaflet.Marker(report_obj.geometry.coordinates)
        .bindPopup('<a onclick="document.dispatchEvent(new CustomEvent(\'build\',{detail: '+index+'}));" href="javascript:void(0);">'+report_obj.TripName+'</a>')
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


