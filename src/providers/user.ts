import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Md5 } from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { USER_KEY, FEED_KEY } from './db';
import { Api } from './shared/api';
import { Settings } from './settings';
import { UX } from './shared/ux';

@Injectable()
export class User {
  private user: any;
  private ready;

  constructor(public api: Api, public settings: Settings, public storage: Storage, public translate: TranslateService, public ux: UX) {
    this.ready = new Promise((resolve, reject) => {
      Promise.all([this.settings.load(), this.storage.get(USER_KEY)]).then(data => {
        if (!this.settings.allSettings.offlineMode && data[1]) {
          this.user = data[1];
          if (this.user.date + 1000 * 60 * 60 * 24 * 360 < new Date().getTime()) {
            setTimeout(() => {
              this.ux.showToast('INFO', 'SESSIONTIMEOUT_MSG', 15000);
              this.removeStoredUser();
            }, 2000);
          }
        }
        resolve();
      });
    });
  }

  onReady() {
    return this.ready;
  }

  login(info: any) {
    const loader = this.ux.showLoader();

    const data = new FormData();
    data.append('username', info.username);
    data.append('password', String(Md5.hashStr(info.password)));

    return this.api.post('2/auth/login', data, undefined, true).map((res: any) => {
      if (res.success) {
        this.processAndGetMoreInfo(res, info);
        if (loader) loader.dismiss();
      } else {
        if (loader) loader.dismiss();
        throw Observable.throw(res);
      }
    });
  }

  processAndGetMoreInfo(resp: any, info: any) {
    this.user = {
      id: resp.login.user.user_id,
      username: resp.login.user.username,
      session: resp.login.session_id,
      date: new Date().getTime(),
    };
    this.storage.set(USER_KEY, this.user);

    // second api to get lists
    const data = new FormData();
    data.append('command', 'Login');
    data.append('uname', info.username);
    data.append('pwd', info.password);

    // getting cookie from second api
    // TODO: check if cookie set correctly? -> message on fail
    this.api.post('members/login.php', data, { withCredentials: true }, undefined, 2).subscribe();
  }

  isLoggedIn(): boolean {
    return this.user && !this.settings.allSettings.offlineMode;
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

  checkIfEverythingIsFucked() {
    return new Promise(resolve => {
      this.storage.get(USER_KEY).then(user => {
        if (JSON.stringify(this.user) !== JSON.stringify(user)) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  removeStoredUser() {
    this.storage.remove(USER_KEY);
    this.storage.remove(FEED_KEY);
  }

  logout() {
    this.user = null;
    this.removeStoredUser();
    window.location.reload();
  }
}
