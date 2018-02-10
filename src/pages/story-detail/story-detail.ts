import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Story } from '../../models/story';
import { Author } from '../../models/author';
import { Stories } from '../../providers/providers';
import { User } from '../../providers/providers';

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
    public stories: Stories,
    public user: User,
    private socialSharing: SocialSharing
  ) {
  	this.story = navParams.get('story');

    // load data when directly view details
    if (!this.story.downloaded) {
      this.stories.getById(this.story.id).subscribe((story) => {
        if (!story) {
          this.navCtrl.pop();
          return;
        }

        // add details & content to db
        this.story.series = story.series;
        this.story.length = story.length;
        this.story.tags = story.tags;
      });
    }
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

  rate(event) {
    event.preventDefault();
    this.stories.rate(this.story, this.story.myrating);
  }

  search(query: string) {
    this.navCtrl.push("SearchPage", {
      query: query
    });
  }

  share() {
    this.socialSharing.share(null, null, null, this.story.url);
  }

}
