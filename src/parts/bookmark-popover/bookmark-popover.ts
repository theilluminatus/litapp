import { Component } from '@angular/core';
import { Platform, IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Story } from '../../models/story';
import { List } from '../../models/list';
import { Lists } from '../../providers/providers';

@IonicPage({ priority: 'low' })
@Component({
  selector: 'bookmark-popover',
  templateUrl: 'bookmark-popover.html',
})
export class BookmarkPopover {
  alllists: List[];
  story: Story;

  unregister;

  constructor(navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, public l: Lists) {
    this.story = navParams.get('story');

    this.l.onReady().then(() => {
      this.l.query().subscribe(data => {
        if (data) {
          this.alllists = data;
        }
      });
    });
  }

  ionViewDidEnter() {
    this.unregister = this.platform.registerBackButtonAction(() => {
      this.viewCtrl.dismiss();
      this.unregister();
    });
  }

  ionViewDidLeave() {
    this.unregister();
  }

  toggleFromList(list: List) {
    if (!list.stories) {
      // load list before adding
      this.l.getById(list.urlname).subscribe();
    } else {
      if (list.stories.indexOf(this.story) > -1) {
        this.l.removeStory(list, this.story);

        // Cheap hack to use the focus state as a loading indicator when adding items
        // TODO: no indicator when removing items from a list
        if (document.activeElement) (document.activeElement as HTMLElement).blur();
      } else {
        this.l.addStory(list, this.story);
      }
    }
  }
}
