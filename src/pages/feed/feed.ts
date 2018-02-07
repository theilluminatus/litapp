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
  		this.openAuthor(item.author);
  	else if (item.subject == "story")
		this.navCtrl.push('StoryPage', {
			story: item.story
		});
  }

  openAuthor(author: Author) {
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

}
