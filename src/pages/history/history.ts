import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, PopoverController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { HISTORY_KEY, STORY_KEY } from '../../providers/db';
import { Stories, Settings } from '../../providers/providers';
import { Story } from '../../models/story';

@IonicPage({ priority: 'high' })
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  filteredStories: Story[] = [];
  sortMethod: string;

  onlyDownloaded = false;
  private translations;

  constructor(
    private translate: TranslateService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public s: Stories,
    public settings: Settings,
    private popoverCtrl: PopoverController,
  ) {
    this.translate.get(['HISTORY_TOOLTIP_CLEAR', 'CONFIRM', 'OK_BUTTON', 'CANCEL_BUTTON']).subscribe(values => {
      this.translations = values;
    });
  }

  ionViewWillEnter() {
    Promise.all([this.s.onReady(), this.settings.load()]).then(() => {
      this.onlyDownloaded = this.settings.allSettings.offlineMode;
      this.buildList();
    });
  }

  toggleDownloaded() {
    this.onlyDownloaded = !this.onlyDownloaded;
    this.buildList();
  }

  private buildList() {
    if (this.onlyDownloaded) this.buildDownloadedList();
    else this.buildHistoryList();
  }

  private buildHistoryList() {
    this.storage.get(HISTORY_KEY).then(history => {
      let loadedIndex = 0;
      if (history) {
        const temp = [];
        history.forEach((id, index) => {
          this.s.getById(id).subscribe(story => {
            if (story) {
              temp[history.length - index - 1] = story;
            }

            loadedIndex += 1;
            if (loadedIndex === history.length) {
              this.cleanHistory();
              this.filteredStories = temp;
            }
          });
        });
      } else {
        this.filteredStories = [];
      }
    });
  }

  // TODO: this doesn't work as expected
  private cleanHistory() {
    const maxNumberOfStories = 10;
    const toRemove = this.filteredStories
      .sort(s => (s.downloadedtimestamp ? new Date(s.downloadedtimestamp.toString()).getTime() : 0))
      .reverse()
      .filter((story, i) => {
        if (i > maxNumberOfStories - 1) {
          return story;
        }
      });

    toRemove.forEach(story => {
      if (!story.downloaded) {
        console.log('delete', story);
        // this.delete(story);
      }
    });
  }

  private buildDownloadedList() {
    this.storage.length().then(length => {
      const temp = [];
      this.storage.forEach((value, key, index) => {
        if (key.indexOf(STORY_KEY) === 0) {
          if (value.downloaded) {
            this.s.getById(value.id).subscribe(story => {
              temp.push(story);
            });
          }
        }
        if (index >= length - 1) {
          this.filteredStories = temp;
        }
      });
    });
  }

  clearAll() {
    this.alertCtrl
      .create({
        title: this.translations.HISTORY_TOOLTIP_CLEAR,
        message: this.translations.CONFIRM,
        buttons: [
          {
            text: this.translations.OK_BUTTON,
            handler: () => {
              this.onlyDownloaded = false;
              this.s.uncacheAll(true);
              this.storage.remove(HISTORY_KEY);
              this.buildList();
            },
          },
          { text: this.translations.CANCEL_BUTTON },
        ],
      })
      .present();
  }

  delete(story: Story) {
    // remove from db
    this.s.uncache(story);
    this.storage.get(HISTORY_KEY).then(history => {
      if (history) {
        history.splice(history.indexOf(story.id), 1);
        this.storage.set(HISTORY_KEY, history).then(() => this.buildList());
      }
    });
  }

  download(story: Story) {
    this.s.download(story);
  }

  openSortPopover(ev: UIEvent) {
    const popover = this.popoverCtrl.create('SortPopover', {
      sortMethod: this.sortMethod,
    });

    popover.present({
      ev,
    });
    popover.onDidDismiss(method => {
      if (method !== null) {
        this.sortMethod = method;
      }
    });
  }
}
