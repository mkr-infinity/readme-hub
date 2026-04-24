import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mkr.revisionmaster',
  appName: 'Revision Master',
  webDir: 'dist',
  android: {
    backgroundColor: '#140a22',
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      launchAutoHide: true,
      backgroundColor: '#140a22',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: '#140a22',
      style: 'DARK',
      overlaysWebView: false,
    },
  },
};

export default config;
