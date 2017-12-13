import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ReportProvider } from '../../providers/report/report';
import {ReportDetailsPage} from '../report-details/report-details';

import { Camera, CameraOptions } from '@ionic-native/camera';



/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  vocabulary: any;
  show_page_loader = false;

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

  files:Array<string> = [];

  myImgValue:any;
  imageFileName:any;

  constructor(public navCtrl: NavController, private camera: Camera,public navParams: NavParams, public http: Http,private reportProvider: ReportProvider) {
    this.http.get('assets/vocabulary.json').map(res => res.json()).subscribe(
      response => {
        this.vocabulary = response;

      },
      err => {
        console.log("Oops!");
      });
  }

  getImage() {
    const options: CameraOptions = {
      //quality: 30,
      targetWidth:1080,
      targetHeight:1080,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY      
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.files = ["data:image/jpeg;base64," + imageData].concat(this.files);
    }, (err) => {
      console.log(err);
      alert("error uploading image, please retry");
    });
  }

  deleteSlide(index_to_delete){
    this.files.splice(index_to_delete,1);
  }

  submit() {
    this.show_page_loader = true;

    var prom_array = [];

    for (let entry of this.files) {
      prom_array.push(this.reportProvider.postImage(entry));
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

      console.log("POSTING REPORT", report);

      this.reportProvider.postReport(report).then((data)=>{
        this.show_page_loader = false;
        this.navCtrl.push(ReportDetailsPage, {
          report: data
        });
      });
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
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