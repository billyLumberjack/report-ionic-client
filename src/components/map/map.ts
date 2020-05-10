import { Component, ElementRef, ViewChild } from '@angular/core';
import * as leaflet from 'leaflet';
import { TranslateService } from '@ngx-translate/core';
import * as $ from "jquery";


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

      leaflet.TileLayer.BetterWMS = leaflet.TileLayer.WMS.extend({
        getFeatureInfoPopup: null,
        canUserGetFeatureInfoFunction: function(latlng){return true;},
        getFeatureInfoLayerName: function(displayedLayer){return displayedLayer;},

        setCanUserGetFeatureInfoFunction: function(theFunction){
            this.canUserGetFeatureInfoFunction = theFunction;
        },

        setGetFeatureInfoLayerName: function(theFunction){
            this.getFeatureInfoLayerName = theFunction;
        },

        onAdd: function (map) {
          // Triggered when the layer is added to a map.
          //   Register a click listener, then do all the upstream WMS things
          leaflet.TileLayer.WMS.prototype.onAdd.call(this, map);
          map.on('click', this.getFeatureInfo, this);

          if (this.options.onAddCallback != null) {
              this.options.onAddCallback();
          }

        },

        onRemove: function (map) {
          // Triggered when the layer is removed from a map.
          //   Unregister a click listener, then do all the upstream WMS things
          leaflet.TileLayer.WMS.prototype.onRemove.call(this, map);
          if (this.getFeatureInfoPopup != null) {
              map.closePopup(this.getFeatureInfoPopup);
          }
          map.off('click', this.getFeatureInfo, this);
        },

        getFeatureInfo: function (evt) {
          // Make an AJAX request to the server and hope for the best
          var url = this.getFeatureInfoUrl(evt.latlng),
              showResults = leaflet.Util.bind(this.showGetFeatureInfo, this);

            $.ajax({
              url: url,
              dataType: 'json',
              success: function (data, status, xhr) {
                //var err = typeof data === 'string' ? null : data;
                var err = false;
                if (status != 'success') {
                    err = true;
                }
                showResults(err, evt.latlng, data);
              },
              error: function (xhr, status, error) {
                showResults(error);
              }
            });
        },

        getFeatureInfoUrl: function (latlng) {
          // Construct a GetFeatureInfo request URL given a point
          var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
              size = this._map.getSize(),

              //added by GFs
              featureInfoLayerName = this.getFeatureInfoLayerName(this.wmsParams.layers),

              params = {
                request: 'GetFeatureInfo',
                service: 'WMS',
                srs: 'EPSG:4326',
                styles: this.wmsParams.styles,
                transparent: this.wmsParams.transparent,
                version: this.wmsParams.version,
                format: this.wmsParams.format,
                bbox: this._map.getBounds().toBBoxString(),
                height: size.y,
                width: size.x,
                layers: featureInfoLayerName,
                query_layers: featureInfoLayerName,
                info_format: 'application/json'
              };


          params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
          params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

          return this._url + leaflet.Util.getParamString(params, this._url, true);
        },

        showGetFeatureInfo: function (err, latlng, data) {
          if (err) { console.log(err); return; } // do nothing if there's an error

          if (this.canUserGetFeatureInfoFunction(latlng) == false) {
              return;
          }

          var content = '';
          var translations = null;
          //if (application.bettwerWmsTrasnslation) {
          //    translations = application.bettwerWmsTrasnslation;
          //} else {
          //    console.log('set betterWmsTranslation!');
          //}
          var self = this;

          $.each(data.features, function(index, value){
      //edited BY GF
              if (value.properties.GRAY_INDEX <= -9999) {

              } else {

                  var geoserverLayerName = self.wmsParams.layers;
                  var contentPrefix = '<div class="popup-row"><i class="popupIcon meterIcon"></i><ul>';
                  var contentSuffix = '</ul></div>'

                  // unfortunately premium:snowdepth is stored in mm, and not in cm
                  if (value.properties.GRAY_INDEX &&
                          (
                              geoserverLayerName == 'premium:snowdepth' ||
                              geoserverLayerName == 'premium:HN-72' ||
                              geoserverLayerName == 'premium:HNp24'
                          )
                      ) {
                      if (geoserverLayerName == 'premium:snowdepth') {
                          var roundedValue =  Math.round(Math.round(value.properties.GRAY_INDEX * 100) / 1000);
                      } else {
                          var roundedValue = Math.round( Math.round( value.properties.GRAY_INDEX ) / 10);
                      }
                      content += contentPrefix+'<li class="title">' + translations.snowgrayindex+'</li><li> ' + roundedValue + ' cm</li>'+contentSuffix;
                  } else if (value.properties.GRAY_INDEX && geoserverLayerName == 'premium:slope') {
                      contentPrefix = contentPrefix.replace('meterIcon', 'slopeIcon');
                      var roundedValue = Math.round(value.properties.GRAY_INDEX * 100) / 100;
                      content += contentPrefix+'<li class="title">' + translations.slopegrayindex+'</li><li> ' + roundedValue + ' °</li>'+contentSuffix;
                  } else if (value.properties.GRAY_INDEX) {
                      var roundedValue = Math.round(Math.round(value.properties.GRAY_INDEX * 100) / 100);
                      content += contentPrefix+'<li class="title">' + translations.snowgrayindex+'</li><li> ' + roundedValue + ' cm</li>'+contentSuffix;
                  }

                  //route no more used as raster
                  /*else if (value.properties.name && value.properties.orig_diff) {
                      content += translations.routename+': ' + value.properties.name + '<br />'+translations.difficulty+': ' +
                              value.properties.orig_diff;
                      if (value.properties.z_min && value.properties.z_max) {
                          var zminRoundedValue = Math.round(value.properties.z_min * 100) / 100;
                          var zmaxRoundedValue = Math.round(value.properties.z_max * 100) / 100;

                          content += '<br />'+translations.altitude_min+': ' + zminRoundedValue + '<br />'+translations.altitude_max+': ' + zmaxRoundedValue;
                      }
                  }*/

              }
          });
          if (content != '') {
              // Otherwise show the content in a popup, or something.
              this.getFeatureInfoPopup = leaflet.popup({ 'className': 'customPopup featureInfoPopup', minWidth: 250,maxWidth: 800 })
                .setLatLng(latlng)
                .setContent(content)
                .openOn(this._map);
          }
        }
      });

      leaflet.tileLayer.betterWms = function (url, options) {
        return new leaflet.TileLayer.BetterWMS(url, options);
      };

  }

  removeMap() {
    this.map.remove();
  }

  initMap(){
    try {
      this.map = leaflet.map(this.mapContainer.nativeElement);

      leaflet.tileLayer(
        "https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}",
        {
          maxZoom: 18,
          subdomains:["a","b","c"],
          errorTileUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }).addTo(this.map);

    /********** */

    var betterLayerParams = {
      layers: "premium:snowdepth",
      transparent: true,
      format: 'image/png8',
      srs: 'EPSG:900913',
      opacity: 0.5,
      zIndex: 10
  };
  leaflet.tileLayer.betterWms('http://www.mysnowmaps.com/geoserver/ows?', betterLayerParams).addTo(this.map);

    /********** */

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
