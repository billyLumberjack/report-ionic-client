import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ReportProvider } from '../../providers/report/report'
import {ReportDetailsPage} from '../report-details/report-details'

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  vocabulary: any;
  show_loader = false;

  region: string = "";
  trip_rate: string = "";
  snow_rate: string = "";
  downhill_side: string = "";
  uphill_side: string = "";
  difficulty: string = "";
  trip_description: string = "";
  linked_trip: string = "";

  user: string = "";
  starting_from: string = "";
  starting_valley: string = "";
  trip_name: string = "";
  date: string = "";
  main_snow_type: string = "";
  other_snow_type: string = "";
  snow_description: string = "";
  avalanche_risk: string = "";

  end_altitude = 0;
  starting_from_altitude = 0;
  elevation_gain = 0;

  files:Array<File> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,private reportProvider: ReportProvider) {
    this.http.get('assets/vocabulary.json').map(res => res.json()).subscribe(
      response => {
        this.vocabulary = response;

      },
      err => {
        console.log("Oops!");
      });
  }

  

  changeListener($e): void {
    for(var c=0; c<$e.target.files.length; c++){
      this.files.push($e.target.files[c]);
    }
  }

  submit() {
    this.show_loader = true;

    var prom_array = [];

    for (let entry of this.files) {
      prom_array.push(this.postFile(entry));
    }

    Promise.all(prom_array).then(values=>{
      var images_array = values.map(item => item.url);

      var report = {};

      (this.trip_name) ? report["TripName"] = camelize(this.trip_name) :"";
      report["CreatedAt"] =  new Date().getTime();
      report["Region"] =  this.region;
      (this.starting_from) ? report["StartingFrom"] = camelize(this.starting_from) :"";
      report["ElevationGain"] = this.elevation_gain;
      report["Grade"] =  this.difficulty;
      report["UphillSide"] =  this.uphill_side;
      report["DownhillSide"] =  this.downhill_side;
      report["MainSnowType"] = this.main_snow_type;
      report["Date"] =  new Date(this.date).getTime();
      report["TripRate"] =  this.trip_rate;
      report["TripDescription"] =  this.trip_description;
      report["SnowRate"] =  this.snow_rate;
      report["StartingAltitude"] =  this.starting_from_altitude;
      report["SnowDescription"] = this.snow_description;
      (this.starting_valley) ? report["StartingValley"] = camelize(this.starting_valley) :"";
      report["EndAltitude"] =  this.end_altitude;
      (this.linked_trip) ? report["LinkedTrip"] = camelize(this.linked_trip) :"";
      report["OtherSnowType"] = this.other_snow_type;
      (this.avalanche_risk) ? report["AvalancheRisk"] = parseInt(this.avalanche_risk) :"";
      report["Images"] =  images_array;
      report["User"] = this.user;

      //var report = {
      //  TripName:camelize(this.trip_name),
      //  CreatedAt: new Date().getTime(),
      //  Region: this.region,
      //  StartingFrom: camelize(this.starting_from),
      //  ElevationGain:this.elevation_gain,
      //  Grade: this.difficulty,
      //  UphillSide: this.uphill_side,
      //  DownhillSide: this.downhill_side,
      //  MainSnowType:this.main_snow_type,
      //  Date: new Date(this.date).getTime(),
      //  TripRate: this.trip_rate,
      //  TripDescription: this.trip_description,
      //  SnowRate: this.snow_rate,
      //  StartingAltitude: this.starting_from_altitude,
      //  SnowDescription:this.snow_description,
      //  StartingValley:camelize(this.starting_valley),
      //  EndAltitude: this.end_altitude,
      //  LinkedTrip:camelize(this.linked_trip),
      //  OtherSnowType:this.other_snow_type,
      //  AvalancheRisk:parseInt(this.avalanche_risk),
      //  Images: images_array,
      //  User:this.user
      //};

      console.log("POSTING REPORT", report);

      this.postReport(report).then((data)=>{
        this.show_loader = false;
        this.navCtrl.push(ReportDetailsPage, {
          report: data
        });
      });
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  postReport(obj){
    return new Promise((resolve,reject)=>{
      this.reportProvider.postReport(obj).subscribe(data => {
        resolve(data);
      });
    });
  }

  postFile(f:File){
    
    return new Promise((resolve,reject) => {
      
      

      var reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => {
        //console.log("base 64 string\n", reader.result);
        this.reportProvider.postImage(reader.result).subscribe(data => {
          resolve(data);
          
        });
      };
      reader.onerror = function (error) {
        reject('Error: ' + error);
      };
    });
  }

}

function camelize(sentenceCase) {
  var out = "";
  sentenceCase.split(" ").forEach(function (el, idx) {
      var add = el.toLowerCase();
      out += add[0].toUpperCase() + add.slice(1);
      out += " ";
  });
  return out;
}