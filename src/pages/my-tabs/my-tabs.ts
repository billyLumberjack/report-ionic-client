import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'page-my-tabs',
    templateUrl: 'my-tabs.html',
    styleUrls: ['my-tabs.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MyTabsPage {
  constructor() {}
}
