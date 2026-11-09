import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.billylumberjack.skiappreport',
  appName: 'SkiApp Report',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
