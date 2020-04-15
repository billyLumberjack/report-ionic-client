import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ReportProvider } from '../../providers/report/report';
import {ReportDetailsPage} from '../report-details/report-details';
import { AlertController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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

  signupform: FormGroup;

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

  tripNameRegexpErrorMsgMap:any;/* = [
    { displayErrorMsg : this.signupform.get('name').hasError('required') && this.signupform.get('name').touched , errorMsg : "msg1" },
    { displayErrorMsg : this.signupform.get('name').hasError('minlength') && this.signupform.get('name').touched , errorMsg : "msg2" },
    { displayErrorMsg : this.signupform.get('name').hasError('maxlength') && this.signupform.get('name').touched , errorMsg : "msg3" },
    { displayErrorMsg : this.signupform.get('name').hasError('pattern') && this.signupform.get('name').touched , errorMsg : "msg4" }
  ];*/

  @ViewChild('inputTypeFile') inputTypeFileElement: ElementRef;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController,public navParams: NavParams, public http: Http,private reportProvider: ReportProvider) {
    this.http.get('assets/vocabulary.json').map(res => res.json()).subscribe(
      response => {
        this.vocabulary = response;

      },
      err => {
        console.error("Oops!");
      });
  }

  get self(): AddPage {
    return this;
}

  ngOnInit() {
    console.log("MANNA");
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      //username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      //password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)])
      //email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });

    this.tripNameRegexpErrorMsgMap = [
      { displayErrorMsg : this.signupform.get('name').hasError('minlength') && this.signupform.get('name').touched , errorMsg : "msg2" }
    ];

  }

  callClickEventOnInputTypeFile(){
    this.inputTypeFileElement.nativeElement.click();
  }
  

  processFile(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.files.push(reader.result.toString());
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
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


      this.reportProvider.postReport(report).then((data)=>{

        let alert = this.alertCtrl.create({
          title: 'Success !',
          subTitle: "You're report has been uploaded succesfully",
          buttons: [{
            text: 'OK',
            //role: 'cancel',
            handler: () => {
              this.show_page_loader = false;
              this.navCtrl.push(ReportDetailsPage, {
                report: data
              });
            }
          }]
        });
        alert.present();

        
      });
    });
    
  }

  ionViewDidLoad() {
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