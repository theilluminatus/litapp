import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FeedItem } from '../../models/feeditem';
import { Story } from '../../models/story';
import { Author } from '../../models/author';
import { Feed } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  feed: FeedItem[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public f: Feed
  ) {
    this.refresh();
  }

  refresh(event?) {
    this.f.query(undefined, true).subscribe((data) => {
      if (data)
        this.feed = data;
      if (event) event.complete();
    });
  }

  loadMore(event) {
    if (!this.feed) {
      event.complete()
      return;
    }

    this.f.query(this.feed[this.feed.length-1].id, true).subscribe((data) => {
      if (data) {
        if (!data.length) {
          event.enable(false);
          return;
        }
        data.forEach(i => this.feed.push(i));
      }
      event.complete();
    });
  }

  openFollowing() {
  	this.navCtrl.push('FollowingPage');
  }

  pressTimer;
  handlePress(item: FeedItem, event) {

    if (!item.story) {
      this.openAuthor(item.author);
      return;
    }

    clearTimeout(this.pressTimer);
    this.pressTimer = setTimeout(() => {
      this.openStoryDetail(item.story);
    }, 500)
  }

  handleClick(item: FeedItem, event) {

    if (!item.story) {
      this.openAuthor(item.author);
      return;
    }

    clearTimeout(this.pressTimer);
    this.openStory(item.story);
  }

  openStory(story: Story) {
    this.navCtrl.push('StoryViewPage', {
      story: story
    });
  }

  openStoryDetail(story: Story) {
    this.navCtrl.push('StoryDetailPage', {
      story: story
    });
  }

  openAuthor(author: Author, event?) {
    if (event)
      event.stopPropagation();
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

}
