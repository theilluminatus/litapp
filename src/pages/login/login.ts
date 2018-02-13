import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Toast } from '@ionic-native/toast';

import { User } from '../../providers/providers';


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

  private translations;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private browser: InAppBrowser,
    private toast: Toast
  ) {

    this.translateService.get(['LOGIN_ERROR','SIGNUP_MESSAGE']).subscribe((values) => {
      this.translations = values;
    });
  }

  login(event: UIEvent) {
    event.preventDefault();
    this.user.login(this.account).subscribe((resp) => {
      setTimeout(() => this.navCtrl.goToRoot(null) , 500);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: this.translations.LOGIN_ERROR,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  signup() {

    try {
      this.toast.show(this.translations.SIGNUP_MESSAGE, '5000', 'bottom').subscribe(toast => {
        console.log(this.translations.SIGNUP_MESSAGE);
      });
    } catch (e) {
        console.log(this.translations.SIGNUP_MESSAGE);
    }

    this.browser
      .create('https://www.literotica.com/stories/signup.php')
      .show();

  }
}
