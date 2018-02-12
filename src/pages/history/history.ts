import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { HISTORY_KEY, STORY_KEY } from '../../providers/db';
import { Stories } from '../../providers/providers';
import { Story } from '../../models/story';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  stories: Story[] = [];
  filteredStories: Story[] = [];

  onlyDownloaded = false;
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
    this.s.onReady().then(() => {

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
      
    });
  }

  toggleDownloaded() {
    this.onlyDownloaded = !this.onlyDownloaded;
    this.updateFilter();
  }

  private loadingFinished() {
    let maxNumberOfStories = 35;
    let length = this.stories.length;

    for (let i=0; i<(length - maxNumberOfStories); i++)
      if (!this.stories[i].downloaded)
        this.delete(this.stories[i]);


    this.updateFilter();
  }

  private updateFilter() {
    
    if (!this.onlyDownloaded) {
      this.filteredStories = this.stories;
      return;
    }

    this.filteredStories = [];
    this.storage.forEach((value, key, index) => {
      if (key.indexOf(STORY_KEY) == 0)
        if (value.downloaded)
          this.s.getById(value.id).subscribe((story) => {
            this.filteredStories.push(story);
          });
    });
  }

  clearAll() {

    this.alertCtrl.create({
      title: this.translations.HISTORY_TOOLTIP_CLEAR,
      message: this.translations.CONFIRM,
      buttons: [{
        text: this.translations.OK_BUTTON,
        handler: () => {

          this.onlyDownloaded = false;
          this.stories.forEach((story) => {
            if (!story.downloaded)
              this.s.uncache(story);
          });
          this.stories = [];
          this.storage.remove(HISTORY_KEY);
          this.updateFilter();

        }},
        { text: this.translations.CANCEL_BUTTON }
      ]
    }).present();

  }

  delete(story: Story) {

    // remove from db
    this.s.uncache(story);
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
        this.updateFilter();
      }
    });
  }

}
