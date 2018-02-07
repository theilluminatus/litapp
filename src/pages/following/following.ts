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

  constructor(public navCtrl: NavController, public navParams: NavParams, public a: Authors) {
  	this.authors = this.a.query({ following: true });
  }

  showAuthor(author: Author) {
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

}
