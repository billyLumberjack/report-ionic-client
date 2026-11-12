import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'page-loader',
    templateUrl: 'page-loader.html',
    styleUrls: ['page-loader.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PageLoaderComponent {

  constructor() {
  }

}
