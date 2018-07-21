import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';

import { Author } from '../models/author';
import { User } from './user';
import { Api } from './api/api';

@Injectable()
export class Authors {

  private authors: Map<number,Author> = new Map<number,Author>();

  constructor(
    public api: Api,
  	public user: User,
  	public loadingCtrl: LoadingController,
  	public toastCtrl: ToastController
  ) { }


  // Get an authors bio
  getDetails(id: any) {
    let filter = [{"property":"user_id","value": id}];
    let params = { "filter": JSON.stringify(filter).trim() };

    let cached = this.authors.get(id);
    if (cached && cached.bio)
      return Observable.of(cached);
    
    let loader = this.api.showLoader();
    return this.api.get('1/user-bio', params).map((data: any) => {
      if (loader) loader.dismiss();
      if (!data.success) {
        this.api.showToast();
        return null;
      }

      if (!cached)
        cached = new Author({
          id: data.user.profile.id,
          picture: data.user.profile.userpic,
          name: data.user.profile.username,
        });
      
      cached.storycount = data.user.profile.submissions_count;
      cached.bio = data.user.profile.description;

      this.authors.set(cached.id, cached);
      return cached;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      console.error(error);
      return Observable.of(null);
    });
  }
  

  // get authors you are following
  getFollowing() {

    let loader = this.api.showLoader();
    return this.api.get('my/api/user/following', undefined, undefined, 2).map((data: any) => {
      if (loader) loader.dismiss();
      if (!data.length) {
        this.api.showToast();
        return [];
      }

      return data.map((item) =>
        this.extractFromFeed(item)
      );

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      console.error(error);
      return Observable.of([]);
    });
  }

  follow(author: Author) {
    
    let data = new FormData();
    data.append("user_id", this.user.getId());
    data.append("author_id", author.id);
    data.append("session_id", this.user.getSession());

    return this.api.post('2/favorites/author-add', data, undefined, true).map((res: any) => {
      if (res.error && res.error == "Author already in favorites list")
        author.following = true;
      else if (!res.success)
        this.api.showToast();
      return res.success;
    }).catch((error) => {
      this.api.showToast();
      console.error(error);
      return Observable.of(false);
    }).subscribe(d => {
      if (d)
        author.following = true;
    });
  }

  unfollow(author: Author) {

    let data = new FormData();
    data.append("user_id", this.user.getId());
    data.append("author_id", author.id);
    data.append("session_id", this.user.getSession());

    return this.api.post('2/favorites/author-remove', data, undefined, true).map((res: any) => {
      if (!res.success) this.api.showToast();
      return res.success;
    }).catch((error) => {
      this.api.showToast();
      console.error(error);
      return Observable.of(false);
    }).subscribe(d => {
      if (d)
        author.following = false;
    });
  }





  extractFromFeed(item) {
    let cached = this.authors.get(item.id);
    if (cached && cached.updatetimestamp)
      return cached;

    if (!cached)
      cached = new Author({
        id: item.userid,
        name: item.username,
        picture: item.userpic.currentUserpic,
      });

    cached.updatetimestamp = item.lastactivity;
    cached.jointimestamp = item.joindate;
    cached.following = true;

    this.authors.set(cached.id, cached);
    return cached;
  }

  extractFromSearch(item) {
    let cached = this.authors.get(item.id);
    if (cached)
      return cached;

    let author = new Author({
      id: item.id,
      name: item.username,
      picture: item.userpic,
    });

    this.authors.set(author.id, author);
    return author;
  }


}
