import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, App } from 'ionic-angular';

import { Globals, Api } from '../providers/providers';
import { Stories } from '../providers/providers';
import { Lists } from '../providers/providers';
import { Feed } from '../providers/providers';
import { Settings } from '../providers/providers';

@Component({
  template: `


    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Literotica <small>(unofficial)</small></ion-title>
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
    public platform: Platform,
    public app: App,
    private translate: TranslateService,
    private config: Config,
    public settings: Settings,
    public api: Api,
    public g: Globals,
    public s: Stories,
    public l: Lists,
    public f: Feed
  ) {

    this.platform.registerBackButtonAction(() => {
      this.api.hideLoader();
      if (this.nav.getActive().index != 0)
        this.nav.popToRoot();
      else if (this.app.getActiveNav().canGoBack())
        this.app.navPop();
      else
        this.platform.exitApp()
    });
    this.initTranslate();
    this.settings.load().then(() => {
      if (this.settings.allSettings.checkforappupdates)
        this.g.checkForUpdates();
    });
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
