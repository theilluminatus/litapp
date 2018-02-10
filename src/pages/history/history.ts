import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { HISTORY_KEY } from '../../providers/db';
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
    public storage: Storage
  ) {

    this.translate.get(['HISTORY_TOOLTIP_CLEAR','CONFIRM','OK_BUTTON','CANCEL_BUTTON']).subscribe(values => {
      this.translations = values;
    });

  }

  
  ionViewDidEnter() {
    this.stories = [];
    this.storage.get(HISTORY_KEY).then((history) => {
      let loadedIndex = 0;
      if (history)
        history.forEach((id, index) => {
          this.storage.get(HISTORY_KEY+"_"+id).then((story) => {
            if (story)
              this.stories[index] = new Story(story);
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

          this.storage.forEach((v,k,i) => {
            if (k.indexOf(HISTORY_KEY) == 0)
              this.storage.remove(k);
          });
          this.stories = [];
          
        }},
        { text: this.translations.CANCEL_BUTTON }
      ]
    }).present();
  }

  delete(story: Story) {
    this.stories.forEach((item,index) => {
      if (item == story) {
        this.stories.splice(index, 1);

        // remove from db
        this.storage.remove(HISTORY_KEY+"_"+story.id);
        this.storage.get(HISTORY_KEY).then((history) => {
          if (history) {
            history.forEach((id, index) => {
              if (id == story.id)
                history.splice(index, 1);
            });
            this.storage.set(HISTORY_KEY,history);
          }
        });

      }
    });
  }

}
