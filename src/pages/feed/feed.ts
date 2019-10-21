import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FeedItem } from '../../models/feeditem';
import { Author } from '../../models/author';
import { Feed } from '../../providers/providers';
import { FEED_KEY } from '../../providers/db';

@IonicPage({ priority: 'high' })
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  feed: FeedItem[] = [];
  enableInfinite = true;
  lastviewedid = 0;
  showLoader = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public f: Feed) {
    this.showLoader = true;
    Promise.all([this.f.onReady(), this.storage.get(FEED_KEY)]).then(values => {
      this.lastviewedid = values[1];
      this.refresh(null, true);
    });
  }

  refresh(event?, showloader?: boolean, force = false) {
    this.enableInfinite = true;
    this.f.query(undefined, showloader, force).subscribe(data => {
      if (data && data.length) {
        this.feed = data;
        this.storage.set(FEED_KEY, data[0].id);
        this.f.feedbadge = '';
      }
      if (event) event.complete();
      this.showLoader = false;
    });
  }

  loadMore(event) {
    this.f.query(this.feed[this.feed.length - 1].id, false).subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(i => this.feed.push(i));
        event.complete();
      } else {
        event.enable(false);
        this.enableInfinite = false;
      }
    });
  }

  openFollowing() {
    this.navCtrl.push('FollowingPage');
  }

  openAuthor(author: Author, event?) {
    if (event) {
      event.stopPropagation();
    }
    this.navCtrl.push('AuthorPage', {
      author,
    });
  }
}
