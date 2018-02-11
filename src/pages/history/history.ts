import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { HISTORY_KEY, DOWNLOADED_KEY } from '../../providers/db';
import { Stories } from '../../providers/providers';
import { Story } from '../../models/story';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  stories: Story[] = [];

  private translations;

  constructor(
    private translate: TranslateService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public s: Stories
  ) {

    this.translate.get(['HISTORY_TOOLTIP_CLEAR','CONFIRM','OK_BUTTON','CANCEL_BUTTON']).subscribe(values => {
      this.translations = values;
    });

  }

  
  ionViewWillEnter() {
    this.stories = [];
    this.storage.get(HISTORY_KEY).then((history) => {
      let loadedIndex = 0;
      if (history)
        history.forEach((id, index) => {

          this.s.getById(id).subscribe((story) => {
            if (story)
              this.stories[history.length-index-1] = story;

            loadedIndex++;
            if (loadedIndex == history.length)
              this.loadingFinished();
          });

        });
    });
  }

  private loadingFinished() {
    let maxNumberOfStories = 35;

    for (let i=0; i<(this.stories.length - maxNumberOfStories); i++)
      this.delete(this.stories[i]);
  }

  clearAll() {
    this.alertCtrl.create({
      title: this.translations.HISTORY_TOOLTIP_CLEAR,
      message: this.translations.CONFIRM,
      buttons: [{
        text: this.translations.OK_BUTTON,
        handler: () => {

          this.stories.forEach((story) => {
            this.s.removeDownload(story);
          });
          this.storage.remove(HISTORY_KEY);
          this.stories = [];
          
        }},
        { text: this.translations.CANCEL_BUTTON }
      ]
    }).present();
  }

  delete(story: Story) {

    // remove from db
    this.s.removeDownload(story);
    this.storage.get(HISTORY_KEY).then((history) => {
      if (history) {
        history.forEach((id, index) => {
          if (id == story.id)
            history.splice(index, 1);
        });
        this.storage.set(HISTORY_KEY, history);
      }
    });

    // remove from list
    this.stories.forEach((item,index) => {
      if (item == story) {
        this.stories.splice(index, 1);
      }
    });
  }

}
