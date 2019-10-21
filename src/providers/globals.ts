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
  private version = 14; // just increase number, unrelated to version number

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

  /** 
   * API route was removed, manually copied from https://search.literotica.com/ with script:
   * ```js
   * JSON.stringify(Array.from(
   *   document.querySelector('.SearchAdvanced__search-advanced__checkboxs___2MiL-').querySelectorAll('input, label')
   *   ).map((e,i) => i%2 ? e.textContent : e.value)
   *   .slice(2)
   *   .reduce((r, v, i, a) => { if (i%2==0) { r.push(a.slice(i,i+2)); } return r; }, [])
   *   .map(p => ({ id: p[0], name: p[1] }))
   * );
   * ```
  */
  getCategories() {
    const categories = [{"id":"37","name":"Anal"},{"id":"31","name":"BDSM"},{"id":"27","name":"Celebrities & Fan Fiction"},{"id":"28","name":"Chain Stories"},{"id":"2","name":"Erotic Couplings"},{"id":"51","name":"Erotic Horror"},{"id":"4","name":"Exhibitionist & Voyeur"},{"id":"5","name":"Fetish"},{"id":"40","name":"First Time"},{"id":"6","name":"Gay Male"},{"id":"7","name":"Group Sex"},{"id":"8","name":"How To"},{"id":"34","name":"Humor & Satire"},{"id":"45","name":"Illustrated"},{"id":"9","name":"Incest/Taboo"},{"id":"10","name":"Interracial Love"},{"id":"11","name":"Lesbian Sex"},{"id":"53","name":"Letters & Transcripts"},{"id":"12","name":"Loving Wives"},{"id":"26","name":"Mature"},{"id":"29","name":"Mind Control"},{"id":"32","name":"Non-English"},{"id":"35","name":"Non-Erotic"},{"id":"13","name":"NonConsent/Reluctance"},{"id":"14","name":"NonHuman"},{"id":"33","name":"Novels and Novellas"},{"id":"3","name":"Reviews & Essays"},{"id":"15","name":"Romance"},{"id":"38","name":"Sci-Fi & Fantasy"},{"id":"39","name":"Text With Audio"},{"id":"16","name":"Toys & Masturbation"},{"id":"48","name":"Transsexuals & Crossdressers"}];
    return categories;
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

  getPopularTags() {
   let params = {
     limit: 100,
     periodCheck: false,
     period: "all",
   };
   return this.api.get('3/tagsportal/top', params);
  }

  getVersion() {
    return this.version;
  }


  checkForUpdates() {

    this.api.get('app.json',undefined,undefined,3)
      .catch((error) => {
        console.error("globals.checkForUpdates", error);
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

    let loader = this.api.showLoader();
    return this.api.get('3/constants', null, null, null, 10000).map((d: any) => {

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
      console.error("globals.query", error);
      return Observable.of(null);
    });
  }

}
