import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  displayReport = {};
  hiddenFields = ["Date", "OnsiteId", "SearchTripName", "Type", "Id", "TripName"];
	private JSObject = Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.report = this.navParams.get("report");

    for(var key in this.report){
      //se *NON* presente tra i campi da nascondere lo inserisco nell'oggetto da visualizzare
      if(this.hiddenFields.indexOf(key) == -1)
        this.displayReport[key] = this.report[key];        
    }    	
  }

  ionViewDidLoad() {}


}
