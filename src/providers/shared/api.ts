// tslint:disable: prefer-template
import { HttpClient, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loading, Toast } from 'ionic-angular';
import { ENV } from '../../app/env';
import { Settings } from '../settings';
import { UX } from './ux';

// Source: https://github.com/angular/angular/issues/11058#issuecomment-351864976
// tslint:disable-next-line: no-duplicate-imports
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

  loader: Loading;
  activeToasts: Toast[] = [];
  offlineModeErrorCount = 0;

  constructor(public http: HttpClient, public ux: UX, public settings: Settings) {
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
    if (this.settings.allSettings.offlineMode) return this.ux.showOfflineModeError();
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
    if (this.settings.allSettings.offlineMode) return this.ux.showOfflineModeError();
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
    if (this.settings.allSettings.offlineMode) return this.ux.showOfflineModeError();
    const url = this.urls[0] + '/' + endpoint;
    return this.http.put(url, body, reqOpts).catch(err => handleAPIError(err, url, body, 'PUT'));
  }

  delete(endpoint: string, reqOpts?: any, urlIndex?: number) {
    if (this.settings.allSettings.offlineMode) return this.ux.showOfflineModeError();
    const url = this.urls[urlIndex ? urlIndex : 0] + '/' + endpoint;
    return this.http.delete(url, reqOpts).catch(err => handleAPIError(err, url, {}, 'DELETE'));
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    if (this.settings.allSettings.offlineMode) return this.ux.showOfflineModeError();
    const url = this.urls[0] + '/' + endpoint;
    return this.http.patch(url, body, reqOpts).catch(err => handleAPIError(err, url, body, 'PATCH'));
  }
}
