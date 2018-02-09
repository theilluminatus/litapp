import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  downloadFilterActive = false;
  allStories: Story[] = [];
  filteredStories: Story[] = [];

  private HISTORY_KEY: string = '_history';

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) { }

  ionViewDidEnter() {
    this.storage.get(this.HISTORY_KEY).then((history) => {
      if (history)
        history.forEach((id) => {
          this.storage.get(this.HISTORY_KEY+"_"+id).then((story) => {
            if (story)
              this.allStories.push(new Story(story));
          });
        });
      this.refreshFilteredStories();
    });
  }

  toggleDownloadFilter() {
    this.downloadFilterActive = !this.downloadFilterActive;
    this.refreshFilteredStories();
  }

  // TODO: translate
  clearAll() {
    this.alertCtrl.create({
      title: "Clear history",
      message: "Are you sure?",
      buttons: [{
        text: "OK",
        handler: () => {

          this.storage.forEach((v,k,i) => {
            if (k.indexOf(this.HISTORY_KEY) == 0)
              this.storage.remove(k);
          });
          this.allStories = [];
          this.refreshFilteredStories();
          
        }},
        { text: "Cancel" }
      ]
    }).present();
  }

  delete(story: Story) {
    this.allStories.forEach((item,index) => {
      if (item == story) {
        this.allStories.splice(index, 1);

        // remove from db
        this.storage.remove(this.HISTORY_KEY+"_"+story.id);
        this.storage.get(this.HISTORY_KEY).then((history) => {
          if (history) {
            history.forEach((id, index) => {
              if (id == story.id)
                history.splice(index, 1);
            });
            this.storage.set(this.HISTORY_KEY,history);
          }
        });

      }
    });
    this.refreshFilteredStories();
  }

  private refreshFilteredStories() {
    if (this.downloadFilterActive)
      this.filteredStories = this.allStories.filter((s) => s.downloaded);
    else
      this.filteredStories = this.allStories;
  }

}
