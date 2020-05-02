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

  newReportForm: FormGroup;

  vocabulary: any;
  show_page_loader = false;

  Region: string = "";
  TripRate: string = "";
  SnowRate: string = "";
  DownhillSide: string = "";
  UphillSide: string = "";
  Grade: string = "";
  TripDescription: string = "";
  LinkedTrip: string = "";

  User: string = "";
  StartingFrom: string = "";
  StartingValley: string = "";
  TripName: string = "";
  Date: string = "";
  MainSnowType: string = "";
  OtherSnowType: string = "";
  SnowDescription: string = "";
  AvalancheRisk: string = "";

  EndAltitude = 0;
  StartingAltitude = 0;
  ElevationGain = 0;

  files:Array<string> = [];

  myImgValue:any;
  imageFileName:any;

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
    this.newReportForm = new FormGroup({
      StartingValley: new FormControl('' ,         [Validators.minLength(2), Validators.maxLength(20)]),
      Date: new FormControl('' ,                    [Validators.required]),
      ElevationGain: new FormControl('' ,          [Validators.required]),
      StartingAltitude: new FormControl('' ,  []),
      EndAltitude: new FormControl('' ,            []),
      Grade: new FormControl('' ,              [Validators.required]),
      UphillSide: new FormControl('' ,             [Validators.required]),
      DownhillSide: new FormControl('' ,           [Validators.required]),
      MainSnowType: new FormControl('' ,          [Validators.required]),
      OtherSnowType: new FormControl('' ,         []),
      SnowRate: new FormControl('' ,               [Validators.required]),
      SnowDescription: new FormControl('' ,        [Validators.minLength(5)]),
      AvalancheRisk: new FormControl('' ,          []),
      TripRate: new FormControl('' ,               [Validators.required]),
      TripDescription: new FormControl('' ,        [Validators.minLength(5)]),
      LinkedTrip: new FormControl('' ,             []),
      User: new FormControl('' ,                    [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      StartingFrom: new FormControl('' ,           [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      Region: new FormControl('',                   [Validators.required]),
      TripName: new FormControl('',                [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      //email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.email]),
    });

  }

  displayValidationErrorsByName(formControlName : string) : boolean {
    return this.newReportForm.get(formControlName).invalid && (this.newReportForm.get(formControlName).dirty || this.newReportForm.get(formControlName).touched)
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

  cleanField(event) {
    event.value = "";
  }

  submit(){
    this.show_page_loader = true;

    var prom_array = [];
    for (let entry of this.files) {
      prom_array.push(this.reportProvider.postImage(entry));
    }

    Promise.all(prom_array).then(values=>{
      var images_array = values.map(item => item.url);
      var report = this.newReportForm.value;

      report["CreatedAt"] =  new Date().getTime();
      report["Date"] =  new Date(report["Date"]).getTime();
      report["AvalancheRisk"] = parseInt(report["AvalancheRisk"])
      report["Images"] =  images_array;

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

    console.log(this.newReportForm.value)
  }

}
