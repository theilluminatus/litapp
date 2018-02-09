import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { User } from '../../providers/providers';
import { Stories } from '../../providers/providers';
import { Authors } from '../../providers/providers';
import { Author } from '../../models/author';

@IonicPage()
@Component({
  selector: 'page-author',
  templateUrl: 'author.html',
})
export class AuthorPage {

  author: Author;
  showStories = false;
  showFavs = false;

  constructor(
    private socialSharing: SocialSharing,
    public navCtrl: NavController,
    public navParams: NavParams,
    public s: Stories,
    public a: Authors,
    public user: User
  ) {
  	this.author = navParams.get('author');

    this.a.getBio(this.author.id).subscribe((bio) => {
      this.author.bio = bio;
    });

  }

  loadSubmissions() {
    if (!this.author.stories) {
      this.s.getAuthorStories(this.author.id).subscribe((stories) => {
        this.author.stories = stories;
      });      
    }
    this.showStories = !this.showStories;
  }

  loadFavs() {
    if (!this.author.favs) {
      this.s.getAuthorFavs(this.author.id).subscribe((favs) => {
        this.author.favs = favs;
      });      
    }
    this.showFavs = !this.showFavs;
  }

  followToggle() {
  	// TODO: persist to server
  	// this.author.following = !this.author.following;
  }

  share() {
    this.socialSharing.share("Literotica story", null, null, "https://www.literotica.com/stories/memberpage.php?uid="+this.author.id);
  }

}
