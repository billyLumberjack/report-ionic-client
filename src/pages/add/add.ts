import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportProvider } from '../../providers/report/report';
import { SharedReportsProvider } from '../../providers/shared/shared';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
  styleUrls: ['add.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddPage implements OnInit {

  newReportForm: FormGroup;

  vocabulary: any;
  show_page_loader = false;

  files: Array<string> = [];

  @ViewChild('inputTypeFile') inputTypeFileElement: ElementRef;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public http: HttpClient,
    private reportProvider: ReportProvider,
    private shared: SharedReportsProvider
  ) {
    this.http.get<any>('assets/vocabulary.json').subscribe(
      response => {
        this.vocabulary = response;
      },
      err => {
        console.error("Oops!");
      });
  }

  ngOnInit() {
    this.newReportForm = new FormGroup({
      StartingValley: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
      Date: new FormControl('', [Validators.required]),
      ElevationGain: new FormControl('', [Validators.required]),
      StartingAltitude: new FormControl('', []),
      EndAltitude: new FormControl('', []),
      Grade: new FormControl('', [Validators.required]),
      UphillSide: new FormControl('', [Validators.required]),
      DownhillSide: new FormControl('', [Validators.required]),
      MainSnowType: new FormControl('', [Validators.required]),
      OtherSnowType: new FormControl('', []),
      SnowRate: new FormControl('', [Validators.required]),
      SnowDescription: new FormControl('', [Validators.minLength(5)]),
      AvalancheRisk: new FormControl('', []),
      TripRate: new FormControl('', [Validators.required]),
      TripDescription: new FormControl('', [Validators.minLength(5)]),
      LinkedTrip: new FormControl('', []),
      User: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      StartingFrom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      Region: new FormControl('', [Validators.required]),
      TripName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    });
  }

  displayValidationErrorsByName(formControlName: string): boolean {
    return this.newReportForm.get(formControlName).invalid && (this.newReportForm.get(formControlName).dirty || this.newReportForm.get(formControlName).touched);
  }

  callClickEventOnInputTypeFile() {
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

  deleteSlide(index_to_delete) {
    this.files.splice(index_to_delete, 1);
  }

  cleanField(event) {
    event.value = "";
  }

  submit() {
    this.show_page_loader = true;

    var prom_array = [];
    for (let entry of this.files) {
      prom_array.push(this.reportProvider.postImage(entry));
    }

    Promise.all(prom_array).then(values => {
      var images_array = values.map(item => item.url);
      var report = this.newReportForm.value;

      report["CreatedAt"] = new Date().getTime();
      report["Date"] = new Date(report["Date"]).getTime();
      report["AvalancheRisk"] = parseInt(report["AvalancheRisk"]);
      report["Images"] = images_array;

      this.reportProvider.postReport(report).then(async (data) => {

        const alert = await this.alertCtrl.create({
          header: 'Success !',
          subHeader: "You're report has been uploaded succesfully",
          buttons: [{
            text: 'OK',
            handler: () => {
              this.show_page_loader = false;
              this.shared.selectedReport = data;
              this.navCtrl.navigateForward('/report-details');
            }
          }]
        });
        await alert.present();

      });

    });

    console.log(this.newReportForm.value);
  }

}
