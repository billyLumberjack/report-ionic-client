import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ReportProvider } from '../../providers/report/report'
import { ReportDetailsPage } from '../../pages/report-details/report-details';

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

  reportList: Array<{}>;

  vocabulary: any;

  region: Array<""> = [""];
  target: Array<""> = [""];
  trip_rate: Array<""> = [""];
  snow_rate: Array<""> = [""];
  downhill_side: Array<""> = [""];
  uphill_side: Array<""> = [""];
  difficulty: Array<""> = [""];

  user: string = "";
  starting_from: string = "";
  trip_name: string = "";
  fromDate: string = "";
  toDate: string = "";

  end_altitude: any = { lower: 0, upper: 0 };
  starting_from_altitude: any = { lower: 0, upper: 0 };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private reportProvider: ReportProvider) {
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

  itemSelected(obj) {
    this.navCtrl.push(ReportDetailsPage, {
      report: obj
    });
  }

  cleanField(event) {
    event.value = "";
  }

  cleanAllFields() {
    this.region = [""];
    this.target = [""];
    this.trip_rate = [""];
    this.snow_rate = [""];
    this.downhill_side = [""];
    this.uphill_side = [""];
    this.difficulty = [""];

    this.user = "";
    this.starting_from = "";
    this.trip_name = "";
    this.fromDate = "";
    this.toDate = "";

    this.end_altitude = {
      lower: 0,
      upper: this.vocabulary.height.max
    };
    this.starting_from_altitude = {
      lower: 0,
      upper: this.vocabulary.height.max
    };

    this.reportList = [];
  }

  submit() {

    var queryParameters = this.prepareQueryParams();

    if (queryParameters != null) {
      this.reportProvider.getReports(queryParameters).subscribe(data => {
        var arr = data.Items;

        arr.forEach(function (item, index) {
          item["ReadableDate"] = new Date(item.Date).toLocaleDateString();
        });

        this.reportList = arr;
      });
    } else {
      this.reportList = [];
    }



  }

  private prepareQueryParams() {
    var params = {};

    if (this.trip_name != "")
      params["tripName"] = this.trip_name.toLocaleLowerCase();

    if (this.region.toString() != "")
      params["region"] = this.region.toString();

    if (this.user != "")
      params["user"] = this.user;

    if (this.difficulty.toString() != "")
      params["grade"] = this.difficulty.toString();

    if (this.uphill_side.toString() != "")
      params["uphillSide"] = this.uphill_side.toString();

    if (this.downhill_side.toString() != "")
      params["downhillSide"] = this.downhill_side.toString();

    if (this.snow_rate.toString() != "")
      params["snowRate"] = this.snow_rate.toString();

    if (this.target.toString() != "")
      params["target"] = this.target.toString();

    if (this.trip_rate.toString() != "")
      params["tripRate"] = this.trip_rate.toString();

    if (this.starting_from != "")
      params["startingFrom"] = this.starting_from;

    if (this.fromDate != "") {
      console.log(this.fromDate);
      params["fromDate"] = new Date(this.fromDate).getTime();
    }
    if (this.toDate != "")
      params["toDate"] = new Date(this.toDate).getTime();

    if (this.starting_from_altitude.lower != this.vocabulary.height.min)
      params["fromStartingAltitude"] = this.starting_from_altitude.lower;
    if (this.starting_from_altitude.upper != this.vocabulary.height.max)
      params["toStartingAltitude"] = this.starting_from_altitude.upper;

    if (this.end_altitude.lower != this.vocabulary.height.min)
      params["fromEndAltitude"] = this.end_altitude.lower;
    if (this.end_altitude.upper != this.vocabulary.height.max)
      params["toEndAltitude"] = this.end_altitude.upper;

    if (Object.keys(params).length > 0)
      return params;
    else
      return null;
  }

}
