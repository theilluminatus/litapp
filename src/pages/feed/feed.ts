import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FeedItem } from '../../models/feeditem';
import { Feed } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  feed: FeedItem[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public f: Feed ) {
  	this.feed = this.f.query();
  }

  loadMore(event) {
    this.feed.push(
      this.feed[Math.floor(Math.random()*this.feed.length)]
    );
    event.complete();
  }

  openFollowing() {
  	this.navCtrl.push('FollowingPage');
  }

  openItem(item: FeedItem) {
  	if (item.subject == "author")
  		this.navCtrl.push('AuthorPage', {
  			author: item.author
  		});
  	else if (item.subject == "story")
		this.navCtrl.push('StoryPage', {
			story: item.story
		});
  }

}
