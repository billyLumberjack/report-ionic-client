import { Component, Input} from '@angular/core';
import { ReportDetailsPage } from '../../pages/report-details/report-details';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';



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

  constructor(public navCtrl: NavController, private storage: Storage) {}

  itemSelected(obj) {

    this.storage.get('visited_report').then((visited_report_array) => {

      console.log(visited_report_array);

      if(visited_report_array == undefined){
        this.storage.set('visited_report', [obj._id]);
      }
      else{
        this.storage.set('visited_report', visited_report_array.concat([obj._id]));
      }
      this.navCtrl.push(ReportDetailsPage, {
        report: obj
      });
    });

  }

}
