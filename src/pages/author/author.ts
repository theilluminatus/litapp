import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { User } from '../../providers/providers';
import { Author } from '../../models/author';

@IonicPage()
@Component({
  selector: 'page-author',
  templateUrl: 'author.html',
})
export class AuthorPage {

  author: Author;

  constructor(
    private socialSharing: SocialSharing,
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: User
  ) {
  	this.author = navParams.get('author');
  }

  followToggle() {
  	// TODO: persist to server (& db?)
  	this.author.following = !this.author.following;
  }

  share() {
    this.socialSharing.share("Literotica story", null, null, "https://www.literotica.com/stories/memberpage.php?uid="+this.author.id);
  }

}
