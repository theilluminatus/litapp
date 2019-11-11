import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, App, AlertController, ToastController } from 'ionic-angular';
import { WebIntent } from '@ionic-native/web-intent';

import { Globals, Analytics, Api, Stories, Lists, Feed, Settings } from '../providers/providers';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@Component({
  template: `
    <ng-container *ngIf="loggedIn">
      <ion-menu [content]="content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Literotica <small>(unofficial)</small></ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            <button menuClose ion-item (click)="openPage('TabsPage')">
              {{ 'MENU_HOME' | translate }}
            </button>

            <button menuClose ion-item (click)="openLinkDialog()" *ngIf="!settings.allSettings.offlineMode">
              {{ 'MENU_OPENLINK' | translate }}
            </button>

            <button menuClose ion-item (click)="openPage('AccountPage')" *ngIf="!settings.allSettings.offlineMode">
              {{ 'MENU_ACCOUNT' | translate }}
            </button>

            <button menuClose ion-item (click)="openPage('SettingsPage')">
              {{ 'MENU_SETTINGS' | translate }}
            </button>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-nav #content root="TabsPage"></ion-nav>
    </ng-container>
  `,
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  loggedIn: boolean = false;

  constructor(
    public platform: Platform,
    public app: App,
    public translate: TranslateService,
    public webIntent: WebIntent,
    public config: Config,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public settings: Settings,
    public analytics: Analytics, // necessary for tracking startup
    public api: Api,
    public g: Globals,
    public s: Stories,
    public l: Lists,
    public f: Feed,
    public faio: FingerprintAIO,
  ) {
    this.initTranslate();
    this.settings.load().then(() => {
      if (this.platform.is('cordova') && this.settings.allSettings.enableLock && !this.loggedIn) {
        this.showLockScreen();
      } else {
        this.loggedIn = true;
      }

      if (this.settings.allSettings.checkforappupdates && !this.settings.allSettings.offlineMode && this.platform.is('cordova')) {
        this.g.checkForUpdates();
      }

      if (this.settings.allSettings.amoledBlackTheme) {
        const styleSheet = document.createElement('link');
        styleSheet.setAttribute('href', './assets/black-theme.css');
        styleSheet.setAttribute('rel', 'stylesheet');
        document.head.appendChild(styleSheet);
      }
    });

    this.catchShareIntent();
    this.platform.resume.subscribe(() => {
      this.catchShareIntent();
    });
  }

  showLockScreen() {
    this.faio
      .isAvailable()
      .then(enabled => {
        if (!enabled) {
          this.loggedIn = true;
          return;
        }

        this.faio
          .show({
            clientId: 'litapp',
            clientSecret: '3}D+v862s4a6c>y5elLFj4xA', // not used for encryption so doesn't matter this is committed
            disableBackup: false,
          })
          .then((result: boolean) => {
            if (result) {
              this.loggedIn = result;
            }
          })
          .catch(() => this.platform.exitApp());
      })
      .catch(() => (this.loggedIn = true));
  }

  catchShareIntent() {
    if (this.platform.is('cordova')) {
      this.webIntent.getIntent().then(intent => {
        if (intent.action === 'android.intent.action.SEND' && intent.extras) {
          this.openURL(intent.extras['android.intent.extra.TEXT']);
        }
      });
    }
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
    if (page.title === 'TabsPage') {
      this.nav.setRoot(page);
    } else {
      this.nav.push(page);
    }
  }

  openLinkDialog(url?) {
    this.translate.get(['MENU_OPENLINK', 'OPENLINK_DESCRIPTION', 'OK_BUTTON', 'CANCEL_BUTTON']).subscribe(translations => {
      this.alertCtrl
        .create({
          title: translations.MENU_OPENLINK,
          message: translations.OPENLINK_DESCRIPTION,
          inputs: [
            {
              name: 'url',
              placeholder: 'https://www.literotica.com/...',
            },
          ],
          buttons: [
            {
              text: translations.OK_BUTTON,
              handler: data => {
                this.openURL(data.url);
              },
            },
            { text: translations.CANCEL_BUTTON },
          ],
        })
        .present();
    });
  }

  openURL(url: string) {
    // https://www.literotica.com/s/slave-takes-mistress-to-hawaii
    const storyRegex = /literotica\.com\/s\/([-a-zA-Z0-9._+]*)/g;
    const storyMatch = storyRegex.exec(url);
    if (storyMatch) {
      this.nav.push('SearchPage', {
        storyurl: storyMatch[1],
      });

      this.translate.get(['OPENLINK_STORYWARNING']).subscribe(translations => {
        this.toastCtrl
          .create({
            message: translations.OPENLINK_STORYWARNING,
            duration: 2000,
            position: 'bottom',
          })
          .present();
      });
      return;
    }

    // https://www.literotica.com/stories/memberpage.php?uid=1015993&page=submissions
    const authorRegex = /literotica\.com\/stories\/memberpage\.php\?.*uid=([0-9]*)/g;
    const authorMatch = authorRegex.exec(url);
    if (authorMatch) {
      const author = { id: authorMatch[1] };
      this.nav.push('AuthorPage', {
        author,
      });
      return;
    }

    this.translate.get(['OPENLINK_UNSUPPORTED']).subscribe(translations => {
      this.toastCtrl
        .create({
          message: translations.OPENLINK_UNSUPPORTED,
          duration: 2000,
          position: 'bottom',
        })
        .present();
    });
  }
}
