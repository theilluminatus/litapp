import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-story-related',
  templateUrl: 'story-related.html',
})
export class StoryRelatedPage {
  related: Story[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public stories: Stories) {
    const story: Story = navParams.get('story');
    this.stories.getRelated(story.id).subscribe(data => {
      this.related = data[0];
    });
  }
}
