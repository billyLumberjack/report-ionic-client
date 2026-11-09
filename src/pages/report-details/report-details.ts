import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedReportsProvider } from '../../providers/shared/shared';
import { MapComponent } from '../../components/map/map';

@Component({
  selector: 'page-report-details',
  templateUrl: 'report-details.html',
  styleUrls: ['report-details.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportDetailsPage {

  report = null;
  isMapFullscreen = false;

  map: any;

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
  ];

  constructor(
    public navCtrl: NavController,
    private shared: SharedReportsProvider
  ) {
    this.report = this.shared.selectedReport;
    if (this.report && this.report.ReadableDate == undefined) {
      this.report.ReadableDate = new Date(this.report.Date).toLocaleDateString();
    }
  }

  @ViewChild(MapComponent) mapComponent: MapComponent;

  ionViewDidEnter() {
    if (this.report && this.report.geometry && this.report.geometry.coordinates) {
      this.mapComponent.initMap();
      let reportMapLayer = this.mapComponent.getLayerByReport(this.report, false);
      this.mapComponent.addLayerToMap(reportMapLayer);
      this.mapComponent.centerMapOnLayer(reportMapLayer);
    }
  }

  gotoSlide(i) {
    this.shared.toposImages = this.report.Images;
    this.shared.toposIndex = i;
    this.navCtrl.navigateForward('/topos-slides');
  }

}
