import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { SharedReportsProvider } from '../../providers/shared/shared';

@Component({
  selector: 'page-topos-slides',
  templateUrl: 'topos_slides.html',
  styleUrls: ['topos_slides.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Topos_slides {

  @ViewChild('swiperRef') swiperRef: ElementRef;

  slides: Array<any>;
  index: number;

  constructor(private shared: SharedReportsProvider) {
    this.slides = this.shared.toposImages;
    this.index = this.shared.toposIndex;
  }

  ionViewDidEnter() {
    // Swiper custom element initialises asynchronously; slide once it is ready.
    setTimeout(() => {
      const swiper = this.swiperRef && this.swiperRef.nativeElement && this.swiperRef.nativeElement.swiper;
      if (swiper) {
        swiper.slideTo(this.index, 0);
      }
    }, 0);
  }

}
