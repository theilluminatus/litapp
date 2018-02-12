import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { Api } from './api/api';
import { GLOBALS_KEY } from './db';

@Injectable()
export class Globals {

  private globals;
  private ready;
  private version = 1.0;

  constructor(
    public api: Api,
    public storage: Storage,
    public translate: TranslateService,
    ) {

    this.ready = new Promise((resolve, reject) => {
      this.storage.get(GLOBALS_KEY).then((d) => {
        if (d) {
          this.globals = d;
          resolve();
        } else {
          resolve();
        }
      });
    });

  }

  onReady() {
    return this.ready;
  }

  getCategories() {
    return this.query().map((d) => {
      let array = [];
      for (let i in d.categories)
        array.push(d.categories[i]);

      return array;
    });
  }

  checkForUpdates() {

    this.api.get('app.json',undefined,undefined,3)
      .catch((e) => {
        return Observable.of(false);
      }).subscribe((d: any) => {
        this.translate.get(['UPDATE_FAILEDMSG', 'UPDATE_MSG']).subscribe(values => {

          if (d) {
            if (d.version > this.version) {
              this.api.showToast(values.UPDATE_MSG+" "+d.updatelink, 15000);
            }
            if (d.appid != this.api.appid)
              this.api.appid = d.appid;
            if (d.apikey != this.api.apikey)
              this.api.apikey = d.apikey;
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
