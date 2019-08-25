import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Topos_slides} from '../topos_slides/topos_slides';
import { TranslateService } from '@ngx-translate/core';
import {MapComponent} from '../../components/map/map';

import leaflet from 'leaflet';


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

  @ViewChild('manna') mapContainer: MapComponent;
  
  map:any;

  report = null;
  isMapFullscreen = false;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService) {
    this.report = this.navParams.get("report");
    if(this.report.ReadableDate == undefined){
      this.report.ReadableDate = new Date(this.report.Date).toLocaleDateString();
    }

    //for(var key in this.report){
    //  //se *NON* presente tra i campi da nascondere lo inserisco nell'oggetto da visualizzare
    //  if(this.hiddenFields.indexOf(key) == -1)
    //    this.displayReport[key] = this.report[key];        
    //}    	
  }

  ionViewDidLoad() {
    this.mapContainer.map.off();
    this.mapContainer.map.remove();
    this.mapContainer.load();
  }

  gotoSlide(i){
    console.log("click",i);
    this.navCtrl.push(Topos_slides,{
      index:i,
      images:this.report.Images
    }); 
  }


}
