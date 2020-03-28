import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  params = {
    limit: 20
  };
  reportList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private reportProvider: ReportProvider) {

    if (navParams.get("params") !== undefined) {
      this.params = { ...this.params, ...navParams.get("params") };
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }

}
