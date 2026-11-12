import { Component, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import * as leaflet from 'leaflet';
import 'leaflet.fullscreen';
import { TranslateService } from '@ngx-translate/core';

// Webpack strips the default icon URL resolution; point to the copied assets.
delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
leaflet.Icon.Default.mergeOptions({
  iconUrl:       'assets/leaflet/marker-icon.png',
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  shadowUrl:     'assets/leaflet/marker-shadow.png',
});

@Component({
    selector: 'map',
    templateUrl: 'map.html',
    styleUrls: ['map.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MapComponent {

  private map;
  @ViewChild('angularMapId') mapContainer: ElementRef;

  constructor(
    private translate: TranslateService) {
  }

  removeMap() {
    this.map.remove();
  }

  invalidateSize() {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  initMap() {
    try {
      this.map = leaflet.map(this.mapContainer.nativeElement, {
        center: [46.5, 11.5], // Italian/Austrian Alps default
        zoom: 8
      });

      leaflet.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          subdomains: ["a", "b", "c"],
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

      this.map.addControl(new (leaflet.Control as any).Fullscreen());

      this.map.on('fullscreenchange', () => {
        this.map.invalidateSize();
      });
    }
    catch (error) {
      console.warn("Map init error catched : ", error.message);
      this.map.invalidateSize();
      return this.map;
    }
  }

  getLayerByReport(report, isReportClickable: boolean, index?: number) {

    let popupString: string;
    if (isReportClickable) {
      popupString = this.generateLeafletPopupByReport(report, false);
    } else {
      popupString = this.generateLeafletPopupByReport(report, false);
    }

    let marker = new leaflet.Marker(report.geometry.coordinates).bindPopup(popupString);
    return leaflet.featureGroup([marker]);
  }

  getLayerByReportArray(reportsList, areMarkersClickable: boolean) {
    let markersArray: Array<leaflet.Marker>;
    if (areMarkersClickable) {
      markersArray = this.createMarkerArrayFromReportArray(reportsList, true);
    }
    else {
      markersArray = this.createMarkerArrayFromReportArray(reportsList, false);
    }
    return leaflet.featureGroup(markersArray);
  }

  addLayerToMap(leafletLayer): void {
    leafletLayer.addTo(this.map);
  }

  centerMapOnLayer(leafletLayer): void {
    const bounds = leafletLayer.getBounds();
    if (bounds.isValid()) {
      this.map.fitBounds(bounds);
    }
  }

  private generateLeafletPopupByReport(report, addLink: Boolean, index?: number) {
    let popup_string = '<table>' +
      '<tr>' +
      '<th colspan="2"><b>';

    if (addLink) {
      popup_string += '<a onclick="document.getElementById(\'cssMapId\').dispatchEvent(new CustomEvent(\'build\',{detail: ' + index + '}));" href="javascript:void(0);">' +
        report.TripName +
        '</a>';
    }
    else {
      popup_string += report.TripName;
    }

    popup_string += '</b><th>' +
      '</tr>' +
      '<tr>' +
      '<td>' + this.translate.instant("DETAILS.ElevationGain") + '</td>' +
      '<td class="popup-value">' + report.ElevationGain + '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>' + this.translate.instant("DETAILS.Grade") + '</td>' +
      '<td class="popup-value">' + report.Grade + '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>' + this.translate.instant("DETAILS.TripRate") + '</td>' +
      '<td class="popup-value">' + report.TripRate + '</td>' +
      '</tr></table>';

    return popup_string;

  }


  private createMarkerArrayFromReportArray(reportArray, areMarkersClickable: boolean): Array<leaflet.Marker> {
    return reportArray.map((currentReport, index) => {

      if (currentReport.geometry && currentReport.geometry.coordinates) {

        let popupString: string;
        if (areMarkersClickable) {
          popupString = this.generateLeafletPopupByReport(currentReport, true, index);
        }
        else {
          popupString = this.generateLeafletPopupByReport(currentReport, false);
        }

        let leafletMarker = new leaflet.Marker(currentReport.geometry.coordinates).bindPopup(popupString);
        return leafletMarker;
      }
      else {
        return undefined;
      }

    })
      .filter(marker => marker != undefined);
  }

}
