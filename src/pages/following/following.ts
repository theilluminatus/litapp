import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Author } from '../../models/author';
import { Authors } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage {

  authors: Author[];
  currentpage = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public a: Authors
  ) {

  	this.a.getFollowing().subscribe((authors) => {
      this.authors = authors;
    });

  }

  loadMore(event) {
    this.currentpage++;
    this.a.getFollowing(this.currentpage).subscribe((data) => {
      if (!data.length) {
        event.enable(false);
        return;
      }
      data.forEach((a) => this.authors.push(a));
      event.complete();
    });
  }

  followToggle(author: Author, $event) {

    $event.stopPropagation();

    if (author.following) {
      this.a.unfollow(author);

    } else {
      this.a.follow(author);
    }

  }

  showAuthor(author: Author) {
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

}
