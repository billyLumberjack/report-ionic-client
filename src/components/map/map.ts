import { Component, ElementRef, ViewChild } from '@angular/core';
import * as leaflet from 'leaflet';
import { TranslateService } from '@ngx-translate/core';


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

  private map;
  @ViewChild('angularMapId') mapContainer: ElementRef;

  constructor(
    private translate: TranslateService    ) {

  }

  removeMap() {
    this.map.remove();
  }

  initMap(){
    try {
      this.map = leaflet.map(this.mapContainer.nativeElement);


      const lmapyCzBaseLayer = leaflet.tileLayer(
        "https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}",
        {
          maxZoom: 18,
          subdomains:["a","b","c"],
          errorTileUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }).addTo(this.map);

      const snowdepthOverlay = leaflet.tileLayer.wms(
        'http://www.mysnowmaps.com/geoserver/ows?',
        {
          layers: "premium:snowdepth",
          transparent: true,
          format: 'image/png8',
          srs: 'EPSG:900913',
          opacity: 0.5,
          zIndex: 10
      }).addTo(this.map);

      const baseMaps = {
        "Lmapy Cz": lmapyCzBaseLayer
      };

      const overlayMaps = {
        "Snow Depth": snowdepthOverlay
      };

      leaflet.control.layers(baseMaps, overlayMaps).addTo(this.map);
      leaflet.control.scale({imperial: false, position: 'bottomright'}).addTo(this.map);



        this.map.addControl(new leaflet.Control.Fullscreen());

        this.map.on('fullscreenchange', () => {
          this.map.invalidateSize();
        });
      }
      catch(error) {
        console.warn("Map init error catched : " , error.message);
        this.map.invalidateSize();
        return this.map;
      }
  }

  getLayerByReport(report , isReportClickable : boolean , index? : number){

    let popupString : string;
    if(isReportClickable){
      popupString = this.generateLeafletPopupByReport(report , false);
    }else{
      popupString = this.generateLeafletPopupByReport(report , false);
    }

    let marker = new leaflet.Marker(report.geometry.coordinates).bindPopup(popupString);
    return leaflet.featureGroup([marker]);
  }

  getLayerByReportArray(reportsList , areMarkersClickable : boolean){
    let markersArray : Array<leaflet.Marker>;
    if(areMarkersClickable){
      markersArray = this.createMarkerArrayFromReportArray(reportsList , true);
    }
    else{
      markersArray = this.createMarkerArrayFromReportArray(reportsList , false);
    }
    return leaflet.featureGroup(markersArray);
  }

  addLayerToMap(leafletLayer) : void {
    leafletLayer.addTo(this.map);
  }

  centerMapOnLayer(leafletLayer) : void {
    this.map.fitBounds(leafletLayer.getBounds());
  }

  private generateLeafletPopupByReport(report , addLink : Boolean , index? : number){
    let popup_string = '<table>'+
    '<tr>'+
    '<th colspan="2"><b>';

    if(addLink){
      popup_string += '<a onclick="document.getElementById(\'cssMapId\').dispatchEvent(new CustomEvent(\'build\',{detail: '+index+'}));" href="javascript:void(0);">'+
        report.TripName+
        '</a>';
    }
    else{
      popup_string += report.TripName;
    }

    popup_string += '</b><th>'+
      '</tr>'+
      '<tr>'+
      '<td>'+this.translate.instant("DETAILS.ElevationGain")+'</td>'+
      '<td class="popup-value">'+report.ElevationGain +'</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+this.translate.instant("DETAILS.Grade")+'</td>'+
      '<td class="popup-value">'+report.Grade +'</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+this.translate.instant("DETAILS.TripRate")+'</td>'+
      '<td class="popup-value">'+report.TripRate +'</td>'+
      '</tr></table>';

    return popup_string;

  }


  private createMarkerArrayFromReportArray(reportArray, areMarkersClickable : boolean) : leaflet.Marker{
    return reportArray.map((currentReport, index) => {

      if(currentReport.geometry && currentReport.geometry.coordinates ){

        let popupString : String;
        if(areMarkersClickable){
          popupString = this.generateLeafletPopupByReport(currentReport , true, index);
        }
        else{
          popupString = this.generateLeafletPopupByReport(currentReport , false);
        }

        let leafletMarker = new leaflet.Marker(currentReport.geometry.coordinates).bindPopup(popupString)
        return leafletMarker;
      }
      else{
        return undefined;
      }

    })
    .filter(marker => marker != undefined);
  }

}
