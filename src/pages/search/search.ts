import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentStories: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public stories: Stories) { }

  /**
   * Perform a service for the proper stories.
   */
  getStories(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentStories = [];
      return;
    }

    this.currentStories = this.stories.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openStory(story: Story) {
    this.navCtrl.push('StoryPage', {
      story: story
    });
  }

}
