import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';

import { Author } from '../models/author';
import { User } from './user';
import { Api } from './shared/api';
import { UX } from './shared/ux';

const oldDefaultUserPic = 'https://www.literotica.com/imagesv2/da'; // the old api returns an invalid url to this image
const defaultUserPic = 'https://www.literotica.com/imagesv2/da_default.jpg';

@Injectable()
export class Authors {
  private authors: Map<number, Author> = new Map<number, Author>();

  constructor(public api: Api, public user: User, public loadingCtrl: LoadingController, public ux: UX) {}

  // Get an authors bio
  getDetails(id: any) {
    const filter = [{ property: 'user_id', value: id }];
    const params = { filter: JSON.stringify(filter).trim() };

    let cached = this.authors.get(id);
    if (cached && cached.bio) {
      return Observable.of(cached);
    }

    const loader = this.ux.showLoader();
    return this.api
      .get('1/user-bio', params)
      .map((data: any) => {
        if (loader) loader.dismiss();
        if (!data.success) {
          this.ux.showToast();
          console.error('author.getDetails');
          return null;
        }

        if (!cached) {
          cached = new Author({
            id: data.user.profile.id,
            picture: data.user.profile.userpic === oldDefaultUserPic ? defaultUserPic : data.user.profile.userpic,
            name: data.user.profile.username,
          });
        }

        cached.storycount = data.user.profile.submissions_count;
        cached.bio = data.user.profile.description;

        this.authors.set(cached.id, cached);
        return cached;
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.ux.showToast();
        console.error('author.getDetails', [id], error);
        return Observable.of(null);
      });
  }

  // get authors you are following
  getFollowing() {
    const loader = this.ux.showLoader();
    return this.api
      .get(`3/users/${this.user.getId()}/favorite/authors?params={%22nocache%22:true}`)
      .map((data: any) => {
        if (loader) loader.dismiss();
        if (!data.length) {
          this.ux.showToast();
          console.error('author.getFollowing');
          return [];
        }

        return data.map(item => this.extractFromFeed(item));
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.ux.showToast();
        console.error('author.getFollowing', error);
        return Observable.of([]);
      });
  }

  follow(author: Author) {
    const data = new FormData();
    data.append('type', 'member');
    data.append('id', author.id);

    return this.api
      .post(`3/users/follow/${author.id}`, {})
      .map((res: any) => res.success)
      .catch(error => {
        this.ux.showToast();
        console.error('author.follow', [author], error);
        return Observable.of(false);
      })
      .subscribe(d => {
        if (d) {
          author.following = true;
        } else {
          this.ux.showToast();
          console.error('author.follow', [author]);
        }
      });
  }

  unfollow(author: Author) {
    return this.api
      .delete(`3/users/follow/${author.id}`)
      .map((res: any) => res.success)
      .catch(error => {
        this.ux.showToast();
        console.error('author.unfollow', [author], error);
        return Observable.of(false);
      })
      .subscribe(d => {
        if (d) {
          author.following = false;
        } else {
          this.ux.showToast();
          console.error('author.unfollow', [author]);
        }
      });
  }

  extractFromFeed(item) {
    let cached = this.authors.get(item.id);
    if (cached && cached.updatetimestamp) {
      return cached;
    }

    if (!cached) {
      cached = new Author({
        id: item.userid,
        name: item.username,
        picture: item.userpic === oldDefaultUserPic ? defaultUserPic : item.userpic,
      });
    }

    cached.jointimestamp = item.joindate;
    cached.following = true;

    this.authors.set(cached.id, cached);
    return cached;
  }

  extractFromSearch(item) {
    const cached = this.authors.get(item.id);
    if (cached) {
      return cached;
    }

    const author = new Author({
      id: item.id,
      name: item.username,
      picture: item.userpic === oldDefaultUserPic ? defaultUserPic : item.userpic,
    });

    this.authors.set(author.id, author);
    return author;
  }

  extractFromNewSearch(item) {
    const cached = this.authors.get(item.userid);
    if (cached) {
      return cached;
    }

    const author = new Author({
      id: item.userid,
      name: item.username,
      picture: item.userpic,
    });

    this.authors.set(author.id, author);
    return author;
  }
}
