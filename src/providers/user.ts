
import { Injectable } from '@angular/core';
import { Api } from './api/api';

@Injectable()
export class User {

  user: any;

  constructor(public api: Api) {

    // TODO: check if user in db -> load

  }

  login(info: any) {
    let seq = this.api.post('2/auth/login', info, undefined, true).share();

    seq.subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.processResponse(res);
      } else {
        // TODO: throw error
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  getDetails() {
    return {
      username: this.user.username,
      session_id: this.user.session_id
    };
  }


  logout() {
    this.user = null;
    // TODO: remove user from db
  }

  processResponse(resp) {
    this.user = resp.user;
  }
}
