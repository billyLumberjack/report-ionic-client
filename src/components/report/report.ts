import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { SharedReportsProvider } from '../../providers/shared/shared';

@Component({
    selector: 'report',
    templateUrl: 'report.html',
    styleUrls: ['report.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ReportComponent {

  @Input() report;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private shared: SharedReportsProvider
  ) {}

  itemSelected(obj) {

    // Mark as visited in-memory straight away so the eye icon shows as soon as
    // we navigate back (the feed objects are shared, so this persists on return).
    obj.Visited = true;

    this.storage.get('visited_report').then((visited_report_array) => {

      if (visited_report_array == undefined) {
        this.storage.set('visited_report', [obj._id]);
      }
      else if (visited_report_array.indexOf(obj._id) === -1) {
        this.storage.set('visited_report', visited_report_array.concat([obj._id]));
      }

      this.shared.selectedReport = obj;
      this.navCtrl.navigateForward('/report-details');
    });

  }

}
