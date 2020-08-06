import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { BrowserTab } from '@ionic-native/browser-tab';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Keyboard } from '@ionic-native/keyboard';
import { Toast } from '@ionic-native/toast';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HeaderColor } from '@ionic-native/header-color';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { WebIntent } from '@ionic-native/web-intent';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Device } from '@ionic-native/device';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

import { Stories, Categories, Analytics, Authors, Lists, Feed, Globals, History, Settings, User, UX, Api } from '../providers/providers';
import { MyApp } from './app.component';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    checkforfeedupdates: true,
    checkforappupdates: true,
    cachelists: true,
    amoledBlackTheme: false,
    offlineMode: false,
    enableLock: false,
    forceNormalList: false,
    alternatePagination: false,
    onlyShowStoriesInFeed: false,
    navigateWithVolumeRocker: false,
  });
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    IonicModule.forRoot(MyApp, {
      preloadModules: true,
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    // own providers
    Api,
    Analytics,
    Stories,
    Categories,
    Authors,
    Lists,
    Feed,
    Globals,
    History,
    User,
    UX,
    // packages
    AndroidFullScreen,
    BrowserTab,
    GoogleAnalytics,
    SocialSharing,
    Keyboard,
    Toast,
    SplashScreen,
    StatusBar,
    HeaderColor,
    File,
    FileChooser,
    FilePath,
    WebIntent,
    Device,
    FingerprintAIO,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
