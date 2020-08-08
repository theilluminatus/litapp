import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { handleNoCordovaError } from '../../app/utils';
import { Api } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'update-popover',
  template: `
    <div class="main">
      <h2>{{ 'SETTINGS_UPDATE_TITLE' | translate }} v{{ data.versionName }}</h2>

      <pre>
        {{ changelog }}
      </pre
      >

      <div>
        <button ion-button (click)="cancel()" color="light">{{ 'CANCEL_BUTTON' | translate }}</button>
        <button ion-button (click)="update()">{{ 'DOWNLOAD_BUTTON' | translate }}</button>
      </div>
    </div>
  `,
  styles: [
    `
      .main {
        padding: 20px;
      }

      pre {
        min-height: 180px;
        white-space: pre-line;
        overflow-y: auto;
        max-height: 40vh;
      }
    `,
  ],
})
export class UpdatePopover {
  data: any;
  changelog: string;

  constructor(navParams: NavParams, private viewCtrl: ViewController, private browser: BrowserTab, private api: Api) {
    this.data = navParams.get('data') || {};

    // https://api.github.com/repos/theilluminatus/litapp/git/refs/tags
    this.api.get('repos/theilluminatus/litapp/git/refs/tags', undefined, undefined, 5).subscribe((list: any[]) => {
      const tagSha = Array.isArray(list) ? list.reverse()[0].object.sha : '';
      if (!tagSha) return;
      // https://api.github.com/repos/theilluminatus/litapp/git/tags/157d1d7b1574edbeb30e0aa4432e43dda38a6694
      this.api.get(`repos/theilluminatus/litapp/git/tags/${tagSha}`, undefined, undefined, 5).subscribe((tag: any) => {
        this.changelog = tag.message.replace(/\n/gi, '\n\n');
      });
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  update() {
    const updateLink = this.data.updatelink || 'https://theilluminatus.github.io/litapp';
    this.browser.openUrl(updateLink).catch(err => handleNoCordovaError(err, () => window.open(updateLink)));
  }
}
