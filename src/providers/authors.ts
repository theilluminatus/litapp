import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';


import { Author } from '../models/author';
import { User } from './user';
import { Api } from './api/api';

@Injectable()
export class Authors {

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

    let loader = this.api.showLoader();
    return this.api.get('1/user-bio', params).map((data: any) => {
      if (loader) loader.dismiss();
      if (!data.success) {
        this.api.showToast();
        return null;
      }

      return new Author({
        storycount: data.user.profile.submissions_count,
        bio: data.user.profile.description
      });

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of(null);
    });
  }
  

  // TODO: add unfollow buttons next to followed + add infinity scroll
  // get authors you are following
  getFollowing() {

    let params = {
      user_id: this.user.getId(),
      session_id: this.user.getSession(),
      limit: 100,
      page: 1
    };

    let loader = this.api.showLoader();
    return this.api.get('2/favorites/author-list', params).map((data: any) => {
      if (loader) loader.dismiss();
      if (!data.success) {
        this.api.showToast();
        return null;
      }

      return data.users.map((author) =>
        new Author({
          id: author.id,
          name: author.username,
          picture: author.userpic
        })
      );

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of(null);
    });
  }

}
