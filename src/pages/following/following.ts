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
  sortingProp: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public a: Authors
  ) {

  	this.a.getFollowing().subscribe((authors) => {
      this.authors = authors;
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

  toggleSorting() {
    if (this.sortingProp == "")
      this.sortingProp = "name";

    else if (this.sortingProp == "name")
      this.sortingProp = "jointimestamp";

    else if (this.sortingProp == "jointimestamp")
      this.sortingProp = "-updatetimestamp";

    else if (this.sortingProp == "-updatetimestamp")
      this.sortingProp = "";
      
    else
      this.sortingProp = "";
  }

}
