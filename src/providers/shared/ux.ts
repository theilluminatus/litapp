import { Injectable } from '@angular/core';
import { LoadingController, ToastController, Loading, Toast } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class UX {
  loader: Loading;
  activeToasts: Toast[] = [];
  offlineModeErrorCount = 0;

  constructor(public translate: TranslateService, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {}

  showLoader() {
    if (this.loader) return this.loader;
    this.loader = this.loadingCtrl.create({ spinner: 'crescent' });
    this.loader.present();
    this.loader.onDidDismiss(() => {
      this.loader = undefined;
    });
    return this.loader;
  }

  updateLoader(content: string) {
    if (!this.loader) return;
    this.loader.setContent(content);
  }

  hideLoader() {
    if (this.loader) this.loader.dismiss().catch(() => {});
  }

  // label and buttonLabel can still contain a string just cast to any when needed
  showToast(
    type: 'ERROR' | 'INFO' = 'ERROR',
    label?: string,
    timeout?: number,
    buttonLabel?: string,
    removePrevious?: boolean,
    higher?: boolean,
  ): Promise<Toast> {
    const tag = `${type}_TAG`;
    return new Promise(resolve => {
      this.translate.get([label || 'LOAD_ERROR', buttonLabel || 'CLOSE_BUTTON', tag]).subscribe(translations => {
        const toast = this.toastCtrl.create({
          message: translations[tag] + (translations[label] || label || translations.LOAD_ERROR),
          showCloseButton: true,
          closeButtonText: translations[buttonLabel] || buttonLabel || translations.CLOSE_BUTTON,
          duration: timeout || 3000,
          cssClass: higher ? 'overui' : '',
        });
        toast.present();
        toast.onDidDismiss(data => {
          resolve(toast);
          this.activeToasts.splice(this.activeToasts.indexOf(toast), 1);
        });

        if (removePrevious || (type === 'ERROR' && !label)) {
          this.activeToasts.forEach(toast => toast.dismiss());
          this.activeToasts = [toast];
        } else {
          this.activeToasts.push(toast);
        }
      });
    });
  }

  showOfflineModeError() {
    if (this.offlineModeErrorCount < 3) {
      this.showToast('ERROR', 'OFFLINE_ERROR', undefined, undefined, true);
      this.offlineModeErrorCount = this.offlineModeErrorCount + 1;
    }
    this.hideLoader();
    return Observable.of();
  }
}
