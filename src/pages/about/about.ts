import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    styleUrls: ['about.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AboutPage {
  constructor() {}
}
