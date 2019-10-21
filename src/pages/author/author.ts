import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from '@ngx-translate/core';

import { Authors, Stories, User } from '../../providers/providers';
import { Author } from '../../models/author';
import { handleNoCordovaError } from '../../app/utils';

@IonicPage({ priority: 'low' })
@Component({
  selector: 'page-author',
  templateUrl: 'author.html',
})
export class AuthorPage {
  @ViewChild('biotext') biotext;
  author: Author;
  showArrow = false;
  loaded = false;
  openSegment = '';
  currentSubmissionsPage = 1;
  currentFavsPage = 1;

  constructor(
    private socialSharing: SocialSharing,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public s: Stories,
    public a: Authors,
    public user: User,
  ) {
    const author = navParams.get('author');

    this.a.getDetails(author.id).subscribe(author => {
      this.author = author;
      this.loaded = true;
    });
  }

  ionViewDidEnter() {
    const loop = setInterval(() => {
      if (this.loaded) {
        this.showArrow = this.biotext.nativeElement.scrollHeight > this.biotext.nativeElement.clientHeight;
        clearInterval(loop);
      }
    }, 50);
  }

  loadSubmissions() {
    if (!this.author.stories) {
      this.s.getAuthorStories(this.author.id).subscribe(data => {
        this.author.stories = data[0];
      });
    }
  }

  loadFavs() {
    if (!this.author.favs) {
      this.s.getAuthorFavs(this.author.id).subscribe(favs => {
        this.author.favs = favs[0];
      });
    }
  }

  loadMoreSubmissions(event) {
    if (!this.author.storycount || this.author.storycount < 11) event.enable(false);
    this.currentSubmissionsPage += 1;
    this.s.getAuthorStories(this.author.id, this.currentSubmissionsPage).subscribe(data => {
      if (!data[0].length) {
        event.enable(false);
        return;
      }
      data[0].forEach(s => this.author.stories.push(s));
      event.complete();
    });
  }

  loadMoreFavs(event) {
    this.currentFavsPage += 1;
    this.s.getAuthorFavs(this.author.id, this.currentFavsPage).subscribe(data => {
      if (!data[0].length) {
        event.enable(false);
        return;
      }
      data[0].forEach(s => this.author.favs.push(s));
      event.complete();
    });
  }

  followToggle() {
    if (this.author.following) {
      this.a.unfollow(this.author);
    } else {
      this.a.follow(this.author);
    }
  }

  share() {
    const url = `https://www.literotica.com/stories/memberpage.php?uid=${this.author.id}`;
    this.socialSharing.share(null, null, null, url).catch(err =>
      handleNoCordovaError(err, () => {
        this.translate.get('COPYPROMPT_MSG').subscribe(label => prompt(label, url));
      }),
    );
  }
}
