/* tslint:disable */
// disabled because prefer-template and shorthand properties shorthand
import { HttpClient, HttpParams, HttpParameterCodec, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '../../app/env';
import { Settings } from '../settings';
import { UX } from './ux';
import { Observable } from 'rxjs/Observable';

// Source: https://github.com/angular/angular/issues/11058#issuecomment-351864976
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

@Injectable()
export class Api {
  // apikeys and appid are always the same
  public apikey: string = '70b3a71911b398a98d3dac695f34cf279c270ea0';
  public appid: string = '24b7c3f9d904ebd679299b1ce5506bc305a5ab40';
  public corsProxy: string = ENV.CORS_PROXY || '';
  public urls = this.getUrls();

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
      this.corsProxy + 'https://api.github.com',
    ];
  }

  handleAPIError(error: HttpErrorResponse, url: string, data: any, method: string): any {
    console.error({
      type: 'API_Error',
      url,
      method,
      data,
      ...error,
    });

    if (error.status === 404) {
      this.ux.showToast('ERROR', 'LITEROTICA_NOTFOUND', 5000);
    } else if (error.status === 429) {
      this.ux.showToast('ERROR', 'LITEROTICA_TOOMANYREQUESTS', 5000);
    } else if (error.status === 503) {
      this.ux.showToast('ERROR', 'LITEROTICA_TEMPOFFLINE', 5000);
    }

    return Observable.of();
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

    // disable api keys for github requests
    if (urlIndex !== 3 && urlIndex !== 5) {
      newReqOpts.withCredentials = true;
      newReqOpts.params = newReqOpts.params.set('apikey', this.apikey);
      newReqOpts.params = newReqOpts.params.set('appid', this.appid);
    }

    const url = this.urls[urlIndex ? urlIndex : 0] + '/' + endpoint;
    const req = this.http.get(url, newReqOpts).catch(err => this.handleAPIError(err, url, newReqOpts.params, 'GET'));
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
    return this.http.post(url, body, reqOpts).catch(err => this.handleAPIError(err, url, body, 'POST'));
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    if (this.settings.allSettings.offlineMode) return this.ux.showOfflineModeError();
    const url = this.urls[0] + '/' + endpoint;
    return this.http.put(url, body, reqOpts).catch(err => this.handleAPIError(err, url, body, 'PUT'));
  }

  delete(endpoint: string, reqOpts?: any, urlIndex?: number) {
    if (this.settings.allSettings.offlineMode) return this.ux.showOfflineModeError();
    const url = this.urls[urlIndex ? urlIndex : 0] + '/' + endpoint;
    return this.http.delete(url, reqOpts).catch(err => this.handleAPIError(err, url, {}, 'DELETE'));
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    if (this.settings.allSettings.offlineMode) return this.ux.showOfflineModeError();
    const url = this.urls[0] + '/' + endpoint;
    return this.http.patch(url, body, reqOpts).catch(err => this.handleAPIError(err, url, body, 'PATCH'));
  }
}
