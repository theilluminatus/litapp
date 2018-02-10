import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Md5 } from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage';

import { USER_KEY } from './db';
import { Api } from './api/api';

@Injectable()
export class User {

  private user: any;

  constructor(public api: Api, public storage: Storage) {
    this.storage.get(USER_KEY).then((data) => {
      if (data)
        this.user = data;
    });
  }

  login(info: any) {

    let data = new FormData()
    data.append("username", info.username);
    data.append("password", Md5.hashStr(info.password));

    return this.api.post('2/auth/login', data, undefined, true).map((res: any) => {
      if (res.success) {
        this.processResponse(res);
      } else {
        console.error(res);
        throw Observable.throw(res); 
      }
    });
  }

  isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  getId() {
    return this.user.id;
  }

  getName() {
    return this.user.username;
  }

  getSession() {
    return this.user.session;
  }

  getDetails() {
    return this.user;
  }

  logout() {
    this.user = null;
    this.storage.remove(USER_KEY);
  }

  processResponse(resp) {
    this.user = {
      id: resp.login.user.user_id,
      username: resp.login.user.username,
      session: resp.login.session_id
    };
    this.storage.set(USER_KEY, this.user);
  }
}
