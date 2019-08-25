import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TopographyPage } from '../topography/topography';
import { ResearchPage } from '../research/research';
import { AddPage } from '../add/add';
import { AboutPage } from '../about/about';

/**
 * Generated class for the MyTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-my-tabs',
  templateUrl: 'my-tabs.html'
})
export class MyTabsPage {

  homeRoot = HomePage
  topoRoot = TopographyPage
  researchRoot = ResearchPage
  addRoot = AddPage
  aboutRoot = AboutPage;

  constructor(public navCtrl: NavController) {}

}
