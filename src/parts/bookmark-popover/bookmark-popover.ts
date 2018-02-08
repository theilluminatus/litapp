import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { List } from '../../models/list';
import { Lists } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'bookmark-popover',
  templateUrl: 'bookmark-popover.html'
})
export class BookmarkPopover {

  alllists: List[];
  story: Story;

  constructor(private navParams: NavParams, public l: Lists) {
    this.alllists = this.l.query();
    this.story = navParams.get('story');
  }

  toggleFromList(list: List) {

    // TODO: persist to db & server

    if (this.story.lists.indexOf(list) > -1) {
      list.stories.splice(list.stories.indexOf(this.story), 1);
      this.story.lists.splice(this.story.lists.indexOf(list), 1);
    } else {
      list.stories.push(this.story);
      this.story.lists.push(list);
    }

  }
  
}