import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { Api } from './api/api';
import { GLOBALS_KEY } from './db';

@Injectable()
export class Globals {

  private globals;
  private ready;

  constructor(
    public api: Api,
    public storage: Storage
  ) {

    this.ready = new Promise((resolve, reject) => {
      this.storage.get(GLOBALS_KEY).then((d) => {
        if (d) {
          this.globals = d;
          resolve();
        } else {
          this.api.showToast();
          reject();
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
