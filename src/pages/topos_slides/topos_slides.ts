import { Component } from '@angular/core';
import { NavParams   } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
    selector: 'page-topos-slides',
    templateUrl: 'topos_slides.html'
})
export class Topos_slides {

    @ViewChild(Slides) slidesElements: Slides;

    slides : Array<any>;
    index: number;

    constructor(private navParams: NavParams) {
        this.slides = navParams.get('images');
        this.index = navParams.get('index');
    }

    ionViewDidEnter(){
        this.slidesElements.slideTo(this.index);
    }

}
