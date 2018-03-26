import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BrowserTab } from '@ionic-native/browser-tab';

import { Api } from './api/api';
import { User } from './user';
import { GLOBALS_KEY, VERSION_KEY } from './db';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Globals {

  private globals;
  private ready;
  private version = 1.3;

  constructor(
    public api: Api,
    public user: User,
    public storage: Storage,
    public translate: TranslateService,
    private browser: BrowserTab,
    public toastCtrl: ToastController
  ) {

    this.storage.get(VERSION_KEY).then((v) => {
      if (v && v != this.version) {
        setTimeout(() => {
          this.translate.get(['UPDATED_MSG', 'CLOSE_BUTTON']).subscribe(values => {
            let toast = this.toastCtrl.create({
              message: values.UPDATED_MSG,
              showCloseButton: true,
              closeButtonText: values.CLOSE_BUTTON,
              duration: 15000
            });
            toast.present();
            this.user.removeStoredUser();
          });
        }, 2000);
      }

      this.storage.set(VERSION_KEY, this.version);
    });


    this.ready = new Promise((resolve, reject) => {
      this.storage.get(GLOBALS_KEY).then((d) => {
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
  getCategories() {
    if (this.globals.categories)
      return Object.keys(this.globals.categories).map((i) => {
          return this.globals.categories[i];
      });
    return [];
  }

  getCategory(id: number) {
    if (this.globals.categories)
      return this.globals.categories[id].name;
    return null;
  }

  getLanguage(id: number) {
    if (this.globals.languages)
      return Object.keys(this.globals.languages).filter((i) => {
        let lang = this.globals.languages[i];
        if (parseInt(lang.id) == id)
          return lang.shortname;
      })[0];
    return null;
  }


  checkForUpdates() {

    this.api.get('app.json',undefined,undefined,3)
      .catch((e) => {
        return Observable.of(false);
      }).subscribe((d: any) => {

        this.translate.get(['UPDATE_FAILEDMSG', 'UPDATE_MSG', 'DOWNLOAD_BUTTON']).subscribe(values => {

          if (d) {
            if (d.appid != this.api.appid)
              this.api.appid = d.appid;
            if (d.apikey != this.api.apikey)
              this.api.apikey = d.apikey;

            if (d.version > this.version) {
              this.api.showToast(values.UPDATE_MSG, 15000, values.DOWNLOAD_BUTTON).then((toast: any) => {
                toast.onDidDismiss(() => {
                  this.browser.openUrl(d.updatelink || 'https://theilluminatus.github.io/litapp');
                });
                
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

    let loader = this.api.showLoader();
    return this.api.get('my/api/constants',undefined,undefined,2).map((d: any) => {

      if (loader) loader.dismiss();
      if (!d) {
        this.api.showToast();
        return null;
      }

      this.globals = d;
      this.storage.set(GLOBALS_KEY, this.globals);
      return this.globals;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of(null);
    });
  }

}
