import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BrowserTab } from '@ionic-native/browser-tab';
import { ToastController, Platform } from 'ionic-angular';

import { Api } from './api/api';
import { User } from './user';
import { GLOBALS_KEY, VERSION_KEY } from './db';
import { ENV } from '../app/env';

@Injectable()
export class Globals {
  private globals;
  private ready;
  private version = 18; // just increase number, unrelated to version number

  constructor(
    public api: Api,
    public platform: Platform,
    public user: User,
    public storage: Storage,
    public translate: TranslateService,
    private browser: BrowserTab,
    public toastCtrl: ToastController,
  ) {
    this.storage.get(VERSION_KEY).then(v => {
      if (v && v !== this.version) {
        setTimeout(() => {
          this.translate.get(['UPDATED_MSG', 'CLOSE_BUTTON']).subscribe(values => {
            const toast = this.toastCtrl.create({
              message: values.UPDATED_MSG,
              showCloseButton: true,
              closeButtonText: values.CLOSE_BUTTON,
              duration: 15000,
            });
            toast.present();
            this.user.removeStoredUser();
          });
        }, 2000);
      }

      this.storage.set(VERSION_KEY, this.version);
    });

    this.ready = new Promise((resolve, reject) => {
      this.storage.get(GLOBALS_KEY).then(d => {
        if (d) {
          this.globals = d;
          resolve();
        } else {
          this.query().subscribe(() => {
            resolve();
          });
        }
      });
    });
  }

  onReady() {
    return this.ready;
  }

  // these getters assume globals has already been cached and loaded

  getLanguage(id: number) {
    if (this.globals.languages) {
      return Object.keys(this.globals.languages).filter(i => {
        const lang = this.globals.languages[i];
        if (parseInt(lang.id) === id) {
          return lang.shortname;
        }
      })[0];
    }
    return null;
  }

  getPopularTags() {
    const params = {
      limit: 100,
      periodCheck: false,
      period: 'all',
    };
    return this.api.get('3/tagsportal/top', params);
  }

  getVersion() {
    return this.version;
  }

  isWebApp() {
    // Override to show everything when developing in browser
    return !this.platform.is('cordova') && !ENV.DEV;
  }

  checkForUpdates() {
    this.api
      .get('app.json', undefined, undefined, 3)
      .catch(error => {
        console.error('globals.checkForUpdates', error);
        return Observable.of(false);
      })
      .subscribe((d: any) => {
        this.translate.get(['UPDATE_FAILEDMSG', 'UPDATE_MSG', 'DOWNLOAD_BUTTON']).subscribe(values => {
          if (d) {
            if (d.appid !== this.api.appid) {
              this.api.appid = d.appid;
            }
            if (d.apikey !== this.api.apikey) {
              this.api.apikey = d.apikey;
            }

            if (d.version > this.version && !this.isWebApp()) {
              this.api.showToast(values.UPDATE_MSG, 15000, values.DOWNLOAD_BUTTON).then((toast: any) => {
                this.browser.openUrl(d.updatelink || 'https://theilluminatus.github.io/litapp');
              });
            }
          } else {
            this.api.showToast(values.UPDATE_FAILEDMSG);
          }
        });
      });
  }

  private query() {
    if (this.globals) return Observable.of(this.globals);

    const loader = this.api.showLoader();
    return this.api
      .get('3/constants', null, null, null, 10000)
      .map((d: any) => {
        if (loader) loader.dismiss();
        if (!d) {
          this.api.showToast();
          return null;
        }

        this.globals = d;
        this.storage.set(GLOBALS_KEY, this.globals);
        return this.globals;
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.api.showToast();
        console.error('globals.query', error);
        return Observable.of(null);
      });
  }
}
