import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoadingController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class Api {
  urls = [
    'https://www.literotica.com/api',
    'https://search.literotica.com/api',
    'https://www.literotica.com'
  ];
  
  // TODO: ask for apikey and appid on first boot and put in storage
  apikey: string = '70b3a71911b398a98d3dac695f34cf279c270ea0';
  appid: string = '24b7c3f9d904ebd679299b1ce5506bc305a5ab40';

  translations;
  loader;

  constructor(
    public http: HttpClient,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  get(endpoint: string, params?: any, reqOpts?: any, urlIndex?: number) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams({encoder: new WebHttpUrlEncodingCodec()})
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams({encoder: new WebHttpUrlEncodingCodec()});
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    reqOpts.withCredentials = true;
    reqOpts.params = reqOpts.params.set('apikey', this.apikey);
    reqOpts.params = reqOpts.params.set('appid', this.appid);

    return this.http.get(this.urls[urlIndex ? urlIndex : 0] + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any, addIDs?: boolean, urlIndex?: number) {
    if (addIDs) {
      if (endpoint.indexOf('?') > -1)
        endpoint += '&apikey='+this.apikey+'&appid='+this.appid;
      else
        endpoint += '?apikey='+this.apikey+'&appid='+this.appid;
    }

    return this.http.post(this.urls[urlIndex ? urlIndex : 0] + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.urls[0] + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any, urlIndex?: number) {
    return this.http.delete(this.urls[urlIndex ? urlIndex : 0] + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.urls[0] + '/' + endpoint, body, reqOpts);
  }

  

  showLoader() {
    if (this.loader) return undefined;
    this.loader = this.loadingCtrl.create({spinner: "crescent"});
    this.loader.present();
    this.loader.onDidDismiss(() => {
      this.loader = undefined;
    });
    return this.loader;
  }

  showToast(text?: string) {
    this.translate.get(['LOAD_ERROR', 'CLOSE_BUTTON']).subscribe(values => {
      this.translations = values;
      let toast = this.toastCtrl.create({
        message: (text ? "Error: "+text : this.translations.LOAD_ERROR),
        showCloseButton: true,
        closeButtonText: this.translations.CLOSE_BUTTON,
        duration: 3000
      });
      toast.present();
    });
  }

}

// Source: https://github.com/angular/angular/issues/11058#issuecomment-351864976
import {HttpParameterCodec} from '@angular/common/http'
export class WebHttpUrlEncodingCodec implements HttpParameterCodec {
  encodeKey(k: string): string { return encodeURIComponent(k); }
  encodeValue(v: string): string { return encodeURIComponent(v); }
  decodeKey(k: string): string { return decodeURIComponent(k); }
  decodeValue(v: string) { return decodeURIComponent(v); }
}
