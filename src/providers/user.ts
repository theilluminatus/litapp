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
      if (data) {
        this.user = data;
        if (this.user.date + 1000*60*60*24*360 < (new Date()).getTime() ) {
          // TODO: show message when force logout afte a year
          this.logout();
        }
      }
    });
  }

  login(info: any) {

    let loader = this.api.showLoader();

    let data = new FormData();
    data.append("username", info.username);
    data.append("password", String(Md5.hashStr(info.password)));

    return this.api.post('2/auth/login', data, undefined, true).map((res: any) => {
      if (res.success) {
        this.processAndGetMoreInfo(res, info);
        if (loader) loader.dismiss();
      } else {
        throw Observable.throw(res); 
      }
    });
  }

  processAndGetMoreInfo(resp: any, info: any) {
    this.user = {
      id: resp.login.user.user_id,
      username: resp.login.user.username,
      session: resp.login.session_id,
      date: (new Date()).getTime()
    };
    this.storage.set(USER_KEY, this.user);

    // second api to get lists
    let data = new FormData();
    data.append("command", "Login");
    data.append("uname", info.username);
    data.append("pwd", info.password);

    // getting cookie from second api
    // TODO: check if cookie set correctly? -> message on fail
    this.api.post('members/login.php', data, {withCredentials:true}, undefined, 2).subscribe();
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
}
