import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';

@Injectable()
export class User {
  _user: any = { username: "test" };

  constructor() { }

  login(accountInfo: any) {
    this._user = { username: accountInfo.username };
    console.log("logged in", this._user);
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
