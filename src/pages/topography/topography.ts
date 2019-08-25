import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MapComponent} from '../../components/map/map';

/**
 * Generated class for the TopographyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-topography',
  templateUrl: 'topography.html',
})



export class TopographyPage {

  @ViewChild('manna') mapContainer: MapComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.mapContainer.load();
  }
  ionViewDidLeave(){
    //console.log("i am leaving");
    //this.mapContainer.map.off();
    //this.mapContainer.map.remove();
  }

}
