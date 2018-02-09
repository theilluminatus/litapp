import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Story } from '../../models/story';
import { Author } from '../../models/author';

@IonicPage()
@Component({
  selector: 'page-story-detail',
  templateUrl: 'story-detail.html',
})
export class StoryDetailPage {

  story: Story;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing
  ) {
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

  showRelated() {
    this.navCtrl.push('StoryRelatedPage', {
      story: this.story
    });
  }

  download() {
    // TODO: download story
    this.story.downloaded = !this.story.downloaded;
  }

  rate(event: UIEvent) {
    event.preventDefault();
    console.log(this.story);
    // TODO send rating to server
  }

  search(query: string) {
    this.navCtrl.push("SearchPage", {
      query: query
    });
  }

  share() {
    this.socialSharing.share("Literotica story", null, null, this.story.url);
  }

}
