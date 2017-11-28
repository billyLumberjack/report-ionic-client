import { Component, Input} from '@angular/core';
import { ReportDetailsPage } from '../../pages/report-details/report-details';
import { NavController } from 'ionic-angular';


/**
 * Generated class for the ReportComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'report',
  templateUrl: 'report.html'
})
export class ReportComponent {

  @Input() report;

  constructor(public navCtrl: NavController) {}

  itemSelected(obj) {
    this.navCtrl.push(ReportDetailsPage, {
      report: obj
    });
  }

}
