import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Toast } from '@ionic-native/toast';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private signupMessageString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private browser: InAppBrowser,
    private toast: Toast
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    this.translateService.get('SIGNUP_MESSAGE').subscribe((value) => {
      this.signupMessageString = value;
    })
  }

  login(event: UIEvent) {
    event.preventDefault();
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  signup() {

    try {
      this.toast.show(this.signupMessageString, '5000', 'bottom').subscribe(toast => {
        console.log(this.signupMessageString);
      });
    } catch (e) {
        console.log(this.signupMessageString);
    }

    this.browser
      .create('https://www.literotica.com/stories/signup.php')
      .show();

  }
}
