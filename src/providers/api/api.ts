import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://www.literotica.com/api';
  
  // TODO: ask for apikey and appid on first boot and put in storage
  apikey: string = '70b3a71911b398a98d3dac695f34cf279c270ea0';
  appid: string = '24b7c3f9d904ebd679299b1ce5506bc305a5ab40';

  translations;

  constructor(
    public http: HttpClient,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    translate.get(['LOAD_ERROR', 'CLOSE_BUTTON']).subscribe(values => {
      this.translations = values;
    });    
  }

  get(endpoint: string, params?: any, reqOpts?: any, url?: string) {
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

    reqOpts.params = reqOpts.params.set('apikey', this.apikey);
    reqOpts.params = reqOpts.params.set('appid', this.appid);

    return this.http.get((url ? url : this.url) + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  showLoader() {
    let loader = this.loadingCtrl.create({spinner: "crescent"});
    loader.present();
    return loader;
  }

  // TODO: add translation
  showToast() {
    let toast = this.toastCtrl.create({
      message: this.translations.LOAD_ERROR,
      showCloseButton: true,
      closeButtonText: this.translations.CLOSE_BUTTON,
      duration: 3000
    });
    toast.present();
    return toast
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
