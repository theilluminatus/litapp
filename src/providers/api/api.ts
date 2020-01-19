// tslint:disable: prefer-template
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, Loading, Toast } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ENV } from '../../app/env';
import { Settings } from '../settings/settings';

const handleAPIError = (error: Error, url: string, data: any, method: string) => {
  console.info({
    url,
    method,
    data,
    type: 'API_Error',
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
  throw error;
};

@Injectable()
export class Api {
  // apikeys and appid are always the same
  public apikey: string = '70b3a71911b398a98d3dac695f34cf279c270ea0';
  public appid: string = '24b7c3f9d904ebd679299b1ce5506bc305a5ab40';
  public corsProxy: string = ENV.CORS_PROXY || '';
  public urls = this.getUrls();

  translations;
  loader: Loading;
  activeToasts: Toast[] = [];
  offlineModeErrorCount = 0;

  constructor(
    public http: HttpClient,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public settings: Settings,
  ) {
    try {
      const search = location.search.substring(1);
      const queryParams = JSON.parse(
        '{"' +
          decodeURI(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}',
      );
      if (queryParams.proxy) {
        this.corsProxy = queryParams.proxy;
        this.urls = this.getUrls();
      }
    } catch (e) {}
  }

  getUrls() {
    return [
      this.corsProxy + 'https://literotica.com/api',
      this.corsProxy + 'https://search.literotica.com/api',
      this.corsProxy + 'https://www.literotica.com',
      this.corsProxy + 'https://raw.githubusercontent.com/theilluminatus/litapp/master',
      this.corsProxy + 'https://literotica.com',
    ];
  }

  get(endpoint: string, params?: any, reqOpts?: any, urlIndex?: number, timeout?: number) {
    if (this.settings.allSettings.offlineMode) return this.showOfflineModeError();
    let newReqOpts = reqOpts;
    if (!reqOpts) {
      newReqOpts = {
        params: new HttpParams({ encoder: new WebHttpUrlEncodingCodec() }),
      };
    }

    // Support easy query params for GET requests
    if (params) {
      newReqOpts.params = new HttpParams({ encoder: new WebHttpUrlEncodingCodec() });
      for (const k in params) {
        newReqOpts.params = newReqOpts.params.set(k, params[k]);
      }
    }

    newReqOpts.withCredentials = true;
    newReqOpts.params = newReqOpts.params.set('apikey', this.apikey);
    newReqOpts.params = newReqOpts.params.set('appid', this.appid);
    const url = this.urls[urlIndex ? urlIndex : 0] + '/' + endpoint;
    const req = this.http.get(url, newReqOpts).catch(err => handleAPIError(err, url, newReqOpts.params, 'GET'));
    if (timeout) return req.timeout(timeout);
    return req;
  }

  post(endpoint: string, body: any, reqOpts?: any, addIDs?: boolean, urlIndex?: number) {
    if (this.settings.allSettings.offlineMode) return this.showOfflineModeError();
    let newEndpoint = endpoint;
    if (addIDs) {
      if (endpoint.indexOf('?') > -1) {
        newEndpoint += '&apikey=' + this.apikey + '&appid=' + this.appid;
      } else {
        newEndpoint += '?apikey=' + this.apikey + '&appid=' + this.appid;
      }
    }

    const url = this.urls[urlIndex ? urlIndex : 0] + '/' + newEndpoint;
    return this.http.post(url, body, reqOpts).catch(err => handleAPIError(err, url, body, 'POST'));
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    if (this.settings.allSettings.offlineMode) return this.showOfflineModeError();
    const url = this.urls[0] + '/' + endpoint;
    return this.http.put(url, body, reqOpts).catch(err => handleAPIError(err, url, body, 'PUT'));
  }

  delete(endpoint: string, reqOpts?: any, urlIndex?: number) {
    if (this.settings.allSettings.offlineMode) return this.showOfflineModeError();
    const url = this.urls[urlIndex ? urlIndex : 0] + '/' + endpoint;
    return this.http.delete(url, reqOpts).catch(err => handleAPIError(err, url, {}, 'DELETE'));
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    if (this.settings.allSettings.offlineMode) return this.showOfflineModeError();
    const url = this.urls[0] + '/' + endpoint;
    return this.http.patch(url, body, reqOpts).catch(err => handleAPIError(err, url, body, 'PATCH'));
  }

  showLoader() {
    if (this.loader) return this.loader;
    this.loader = this.loadingCtrl.create({ spinner: 'crescent' });
    this.loader.present();
    this.loader.onDidDismiss(() => {
      this.loader = undefined;
    });
    return this.loader;
  }

  updateLoader(content: string) {
    if (!this.loader) return;
    this.loader.setContent(content);
  }

  hideLoader() {
    if (this.loader) this.loader.dismiss().catch(() => {});
  }

  showToast(text?: string, timeout?: number, button?: string, removePrevious?: boolean) {
    return new Promise(resolve => {
      this.translate.get(['LOAD_ERROR', 'CLOSE_BUTTON']).subscribe(values => {
        this.translations = values;
        const toast = this.toastCtrl.create({
          message: text ? text : this.translations.LOAD_ERROR,
          showCloseButton: true,
          closeButtonText: button ? button : this.translations.CLOSE_BUTTON,
          duration: timeout ? timeout : 3000,
        });
        toast.present();
        toast.onDidDismiss(data => {
          resolve(toast);
          this.activeToasts.splice(this.activeToasts.indexOf(toast), 1);
        });

        if (removePrevious) {
          this.activeToasts.forEach(toast => toast.dismiss());
          this.activeToasts = [toast];
        } else {
          this.activeToasts.push(toast);
        }
      });
    });
  }

  showOfflineModeError() {
    if (this.offlineModeErrorCount < 3) {
      this.translate.get(['OFFLINE_ERROR']).subscribe(values => {
        this.showToast(values.OFFLINE_ERROR);
      });
      this.offlineModeErrorCount = this.offlineModeErrorCount + 1;
    }
    this.hideLoader();
    return Observable.of();
  }
}

// Source: https://github.com/angular/angular/issues/11058#issuecomment-351864976
// tslint:disable-next-line: no-duplicate-imports
import { HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
export class WebHttpUrlEncodingCodec implements HttpParameterCodec {
  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }
  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }
  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }
  decodeValue(v: string) {
    return decodeURIComponent(v);
  }
}
