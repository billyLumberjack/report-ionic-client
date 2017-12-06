import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTabsPage } from '../pages/my-tabs/my-tabs';

import { TranslateService } from '@ngx-translate/core';

//declare var TestFairy: any; // at the top of the file


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MyTabsPage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private translate: TranslateService) {
    platform.ready().then(() => {
      
      
      //TestFairy.begin("abe27609f8ed4b248d398c6fd90b26b21e222ad6");

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      
      var lingua = navigator.language;// || navigator.userLanguage;
      lingua = lingua.substr(0, 2);
      console.log("LANGUAGE SET", lingua);
      this.translate.use(lingua);

      statusBar.styleDefault();
      splashScreen.hide();
      
    });
  }
}

