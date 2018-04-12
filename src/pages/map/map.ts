import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedProvider} from '../../providers/shared/shared'


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
    console.log('Passed params _ 1', JSON.stringify(shared.data.length));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadmap();


  }

  loadmap(){
    this.map = leaflet.map("map").fitWorld();
    
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    let markerGroup = leaflet.featureGroup();
    let marker: any = leaflet.marker([45.1894610, 10.7899293]).on('click', () => {
        alert('Marker clicked');
      });
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);

  }

  zoomIn(){    
    this.map.setZoom(this.map.getZoom() + 1);
  }

}
