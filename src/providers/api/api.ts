import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://literotica.com/api/';
  
  // TODO: ask for apikey and appid on first boot and put in storage
  apikey: string = '70b3a71911b398a98d3dac695f34cf279c270ea0';
  appid: string = '24b7c3f9d904ebd679299b1ce5506bc305a5ab40';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
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

    return this.http.get(this.url + '/' + endpoint, reqOpts);
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
}

// Source: https://github.com/angular/angular/issues/11058#issuecomment-351864976
import {HttpParameterCodec} from '@angular/common/http'
export class WebHttpUrlEncodingCodec implements HttpParameterCodec {
  encodeKey(k: string): string { return encodeURIComponent(k); }
  encodeValue(v: string): string { return encodeURIComponent(v); }
  decodeKey(k: string): string { return decodeURIComponent(k); }
  decodeValue(v: string) { return decodeURIComponent(v); }
}