import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Topos_slides} from '../topos_slides/topos_slides';
import { TranslateService } from '@ngx-translate/core';


import { MapComponent } from '../../components/map/map';


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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private translate: TranslateService
    ) {
    this.report = this.navParams.get("report");
    if(this.report.ReadableDate == undefined){
      this.report.ReadableDate = new Date(this.report.Date).toLocaleDateString();
    }
  }

  @ViewChild(MapComponent) mapComponent: MapComponent;

  ionViewDidEnter() {
    this.mapComponent.initMap();

    let reportMapLayer = this.mapComponent.getLayerByReport(this.report , false);
    this.mapComponent.addLayerToMap(reportMapLayer);
    this.mapComponent.centerMapOnLayer(reportMapLayer);
    }

  gotoSlide(i){
    this.navCtrl.push(Topos_slides,{
      index:i,
      images:this.report.Images
    });
  }


}
