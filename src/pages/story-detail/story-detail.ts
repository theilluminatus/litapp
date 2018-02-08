import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Author } from '../../models/author';

@IonicPage()
@Component({
  selector: 'page-story-detail',
  templateUrl: 'story-detail.html',
})
export class StoryDetailPage {

  story: Story;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.story = navParams.get('story');
  }

  showAuthor(author: Author) {
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

  showSeries() {
    this.navCtrl.push('StorySeriesPage', {
      story: this.story
    });
  }

  download() {
    // TODO: download story
    this.story.downloaded = !this.story.downloaded;
  }

}
