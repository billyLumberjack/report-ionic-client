import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ResearchPage } from '../research/research';

/**
 * Generated class for the MyTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-tabs',
  templateUrl: 'my-tabs.html'
})
export class MyTabsPage {

  homeRoot = HomePage
  researchRoot = ResearchPage


  constructor(public navCtrl: NavController) {}

}