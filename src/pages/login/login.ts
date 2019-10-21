import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { Toast } from '@ionic-native/toast';

import { Analytics, User } from '../../providers/providers';
import { handleNoCordovaError } from '../../app/utils';

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
    public analytics: Analytics,
    private browser: BrowserTab,
    private toast: Toast
  ) {

    this.translateService.get(['LOGIN_ERROR','SIGNUP_MESSAGE']).subscribe((values) => {
      this.translations = values;
    });
  }

  login(event: UIEvent) {
    event.preventDefault();
    this.user.login(this.account).subscribe((resp) => {
      setTimeout(() => {
        this.navCtrl.goToRoot(null);
        this.analytics.track('Login');
      }, 500);
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
      this.toast.show(this.translations.SIGNUP_MESSAGE, '5000', 'bottom').subscribe(toast => {});
    } catch (err) {
      handleNoCordovaError(err, () => alert(this.translations.SIGNUP_MESSAGE));
    }

    const url = 'https://www.literotica.com/stories/signup.php';
    this.browser.openUrl(url).catch(err => handleNoCordovaError(err, () => window.open(url)));

  }
}
