import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rockapps.iorder',
  appName: 'iOrder',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
