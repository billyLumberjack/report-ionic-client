import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {
  constructor(
    private platform: Platform,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();

    // this language will be used as a fallback when a translation isn't found
    this.translate.setDefaultLang('en');

    const lingua = (navigator.language || 'en').substr(0, 2);
    console.info('LANGUAGE SET', lingua);
    this.translate.use(lingua);

    // Native-only shell plugins (no-ops in the browser build).
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.setStyle({ style: Style.Default });
      } catch (e) {
        console.warn('StatusBar unavailable', e);
      }
      try {
        await SplashScreen.hide();
      } catch (e) {
        console.warn('SplashScreen unavailable', e);
      }
    }
  }
}
