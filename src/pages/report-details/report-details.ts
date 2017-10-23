import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Topos_slides} from '../topos_slides/topos_slides';

/**
 * Generated class for the ReportDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-details',
  templateUrl: 'report-details.html',
})
export class ReportDetailsPage {

	report = null;

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.report = this.navParams.get("report");

    //for(var key in this.report){
    //  //se *NON* presente tra i campi da nascondere lo inserisco nell'oggetto da visualizzare
    //  if(this.hiddenFields.indexOf(key) == -1)
    //    this.displayReport[key] = this.report[key];        
    //}    	
  }

  ionViewDidLoad() {}

  gotoSlide(i){
    console.log("click",i);
    this.navCtrl.push(Topos_slides,{
      index:i,
      images:this.report.Images
    }); 
  }


}
