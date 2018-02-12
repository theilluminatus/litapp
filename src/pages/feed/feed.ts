import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FeedItem } from '../../models/feeditem';
import { Author } from '../../models/author';
import { Feed } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  feed: FeedItem[] = [];
  enableInfinite = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public f: Feed
  ) {
    this.refresh(null, true);
  }

  refresh(event?, showloader?: boolean) {
    this.enableInfinite = true;
    this.f.query(undefined, showloader).subscribe((data) => {
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

    this.f.query(this.feed[this.feed.length-1].id, false).subscribe((data) => {
      if (data) {
        if (!data.length) {
          event.enable(false);
          return;
        }
        data.forEach(i => this.feed.push(i));
      }
      this.enableInfinite = false;
    });
  }

  openFollowing() {
  	this.navCtrl.push('FollowingPage');
  }

  openAuthor(author: Author, event?) {
    if (event)
      event.stopPropagation();
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

}
