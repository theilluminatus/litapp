import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Story } from '../../models/story';

@Component({
  selector: 'story-list',
  templateUrl: 'story-list.html'
})
export class StoryListPage {
  @Input() stories: Story[];

  constructor(public navCtrl: NavController) {
  }

  openStory(story: Story) {
    this.navCtrl.push('StoryPage', {
      story: story
    });
  }
}
