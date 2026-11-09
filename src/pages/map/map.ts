import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedReportsProvider } from '../../providers/shared/shared';
import { MapComponent } from '../../components/map/map';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['map.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapPage {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  refresherExists = true;
  map: any;

  reportsList = [];

  constructor(
    public navCtrl: NavController,
    private shared: SharedReportsProvider
  ) {}

  ionViewDidEnter() {

    if (this.shared.mapReportsList && this.shared.mapReportsList.length) {
      this.reportsList = this.shared.mapReportsList;
      this.shared.mapReportsList = null; // consume once
    } else {
      this.reportsList = this.shared.reportsFeed;
    }

    this.mapComponent.initMap();

    if (this.reportsList && this.reportsList.length > 0) {
      let reportListLayer = this.mapComponent.getLayerByReportArray(this.reportsList, true);
      this.mapComponent.addLayerToMap(reportListLayer);
      this.mapComponent.centerMapOnLayer(reportListLayer);
    }

    // Ionic view transition completes after ~300ms; invalidateSize corrects
    // Leaflet's tile calculations if the container grew after initMap().
    setTimeout(() => this.mapComponent.invalidateSize(), 300);

    this.addListenerForReportPopupClick();
  }

  ionViewDidLeave() {
    const el = document.getElementById('cssMapId');
    if (el) {
      el.removeEventListener('build', this.navigateToReportByEvent);
    }
  }

  private addListenerForReportPopupClick() {
    const el = document.getElementById('cssMapId');
    if (el) {
      el.addEventListener('build', this.navigateToReportByEvent);
    }
  }

  private navigateToReportByEvent = (event) => {
    this.shared.selectedReport = this.reportsList[event['detail']];
    this.navCtrl.navigateForward('/report-details');
  }

}
