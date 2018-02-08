import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Story } from '../../models/story';
import { Author } from '../../models/author';

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

  showAuthor(author: Author, event) {
    event.stopPropagation();
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

  openListPicker(story: Story, event) {
    event.stopPropagation();
    console.log(story);
  }

  delete(story: Story) {
    // TODO: persist to db + remove download if downloaded
    this.stories.forEach((item,index) => {
      if (item == story)
        this.stories.splice(index, 1);
    });
  }
}
