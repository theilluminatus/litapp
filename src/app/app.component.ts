import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { Stories } from '../providers/providers';
import { Feed } from '../providers/providers';
import { Settings } from '../providers/providers';

@Component({
  template: `


    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Litero</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>

          <button menuClose ion-item (click)="openPage('TabsPage')">
            {{'MENU_HOME' | translate}}
          </button>

          <button menuClose ion-item (click)="openPage('AccountPage')">
            {{'MENU_ACCOUNT' | translate}}
          </button>

          <button menuClose ion-item (click)="openPage('SettingsPage')">
            {{'MENU_SETTINGS' | translate}}
          </button>          

        </ion-list>
      </ion-content>

    </ion-menu>
    <ion-nav #content root="TabsPage"></ion-nav>


  `
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  constructor(
    private translate: TranslateService,
    platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public s: Stories,
    public f: Feed
  ) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en');
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    if (page.title == 'TabsPage')
      this.nav.setRoot(page);
    else
      this.nav.push(page);
  }
}
