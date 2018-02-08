import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController, public user: User) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  logout() {
  	this.user.logout();
    this.navCtrl.push('TabsPage');
  }

}
