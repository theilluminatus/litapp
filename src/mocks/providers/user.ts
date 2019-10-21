import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';

@Injectable()
export class User {
  _user: any;

  constructor() { }

  login(accountInfo: any) {
    this._user = { username: accountInfo.username };
    console.info("Login", this._user);
    return Observable.of(new Object()).mapTo(this._user);
  }

  getDetails() {
    return this._user;
  }

  isLoggedIn(): boolean {
    return this._user ? true : false;
  }

  logout() {
    this._user = null;
  }

}
