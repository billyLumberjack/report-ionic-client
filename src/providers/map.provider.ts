import { Injectable } from '@angular/core';

import leaflet from 'leaflet';
import { map } from 'rxjs/operator/map';


@Injectable()
export class MapProvider {

  public instance:any;

  constructor() {
  }

  public getMap(divId:String){
    var result = leaflet.map(divId).fitWorld();
    
    leaflet.tileLayer('http://ec{s}.cdn.ecmaps.de/WmsGateway.ashx.jpg?Experience=kompass&MapStyle=KOMPASS%20Touristik&TileX={x}&TileY={y}&ZoomLevel={z}',
    {
      maxZoom: 18,
      subdomains:["1","2","3"],
      errorTileUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }).addTo(result);

    return result;
  }
}
