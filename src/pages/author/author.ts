import { Component, ViewChild } from '@angular/core';
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

  @ViewChild("biotext") biotext;
  author: Author;
  showStories = false;
  showFavs = false;
  showArrow = false;
  loaded = false;

  constructor(
    private socialSharing: SocialSharing,
    public navCtrl: NavController,
    public navParams: NavParams,
    public s: Stories,
    public a: Authors,
    public user: User
  ) {
  	this.author = navParams.get('author');

    this.a.getDetails(this.author.id).subscribe((author) => {
      this.author.bio = author.bio;
      this.author.storycount = author.storycount;
      this.loaded = true;
    });

  }

  ionViewDidEnter() {
    let loop = setInterval(()=>{
      if (this.loaded) {
        this.showArrow = this.biotext.nativeElement.scrollHeight > this.biotext.nativeElement.clientHeight;
        clearInterval(loop);
      }
    }, 50);
  }

  loadSubmissions() {
    if (!this.author.stories) {
      this.s.getAuthorStories(this.author.id).subscribe((data) => {
        this.author.stories = data[0];
      });      
    }
    this.showStories = !this.showStories;
  }

  loadFavs() {
    if (!this.author.favs) {
      this.s.getAuthorFavs(this.author.id).subscribe((favs) => {
        this.author.favs = favs[0];
      });      
    }
    this.showFavs = !this.showFavs;
  }

  followToggle() {
  	// TODO: persist to server
  	// this.author.following = !this.author.following;
  }

  share() {
    this.socialSharing.share(null, null, null, "https://www.literotica.com/stories/memberpage.php?uid="+this.author.id);
  }

}
