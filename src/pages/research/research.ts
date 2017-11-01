import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the ResearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-research',
  templateUrl: 'research.html',
})
export class ResearchPage {

  vocabulary:any;
  
  user:string;
  target:string;
  trip_rate:string;
  snow_rate:string;
  downhill_side:string;
  uphill_side:string;
  difficulty:string;
  starting_from:string;
  region:string;
  trip_name:string;

  end_altitude: any = {
    lower: 0,
    upper: 0
  };
  starting_from_altitude: any = {
    lower: 0,
    upper: 0
  };



  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.get('assets/vocabulary.json').map(res => res.json()).subscribe(
      response => {
        this.vocabulary = response;

        this.end_altitude.lower = this.vocabulary.height.min;
        this.starting_from_altitude.lower = this.vocabulary.height.min;
        
        this.end_altitude.upper = this.vocabulary.height.max;
        this.starting_from_altitude.upper = this.vocabulary.height.max;
      },
      err => {
          console.log("Oops!");
      }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResearchPage');
  }

  submit(){
    console.log("user",this.user);
    console.log("target",this.target);
    console.log("trip_rate",this.trip_rate);
    console.log("snow_rate",this.snow_rate);
    console.log("downhill_side",this.downhill_side);
    console.log("uphill_side",this.uphill_side);
    console.log("difficulty",this.difficulty);
    console.log("starting_from",this.starting_from);
    console.log("region",this.region);
    console.log("trip_name",this.trip_name);
    console.log("end_altitude",this.end_altitude);
    console.log("starting_from_altitude",this.starting_from_altitude);
  }

}
