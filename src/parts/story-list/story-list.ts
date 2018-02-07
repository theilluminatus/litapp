import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Story } from '../../models/story';

@Component({
  selector: 'story-list',
  templateUrl: 'story-list.html'
})
export class StoryListPage {
  @Input() stories: Story[];
  @Input() sliding: boolean = false;

  constructor(public navCtrl: NavController) {
  }

  openStory(story: Story) {
    this.navCtrl.push('StoryPage', {
      story: story
    });
  }

  delete(story: Story) {
    // TODO: persist to db
    this.stories.forEach((item,index) => {
      if (item == story)
        this.stories.splice(index, 1);
    });
  }
}
