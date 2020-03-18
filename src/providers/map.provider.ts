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

    leaflet.tileLayer(
    "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=225e7f1800604f6fb0906dcd15a5bd46",
    {
      maxZoom: 18,
      subdomains:["a","b","c"],
      errorTileUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }).addTo(result);

    return result;
  }
}
