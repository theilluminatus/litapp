import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Story } from '../models/story';
import { Author } from '../models/author';
import { Api } from './api/api';

@Injectable()
export class Authors {

  constructor(
  	public api: Api,
  	public loadingCtrl: LoadingController,
  	public toastCtrl: ToastController
  ) { }


  // Get an authors bio
  getBio(id: any) {
    let filter = [{"property":"user_id","value": id}];
    let params = { "filter": JSON.stringify(filter).trim() };

    let loader = this.showLoader();
    return this.api.get('1/user-bio', params).map((data: any) => {
      loader.dismiss();
      if (!data.success) {
        this.showToast();
        return null;
      }

      return data.user.profile.description;

    }).catch((error) => {
      loader.dismiss();
      this.showToast();
      return Observable.of(null);
    });
  }
  

  // get authors you are following
  getFollowing() {
    let params = {
      user_id: 0,
      session_id: 0,
      limit: 100,
      page: 1
    };

    let loader = this.showLoader();
    return this.api.get('2/favorites/author-list', params).map((data: any) => {
      loader.dismiss();
      if (!data.success) {
        this.showToast();
        return null;
      }

      return data.users.map((author) => {
        return new Author({
          id: author.id,
          name: author.username,
          picture: author.userpic
        });
      });


    }).catch((error) => {
      loader.dismiss();
      this.showToast();
      return Observable.of(null);
    });
  }



  // HELPERS

  private showLoader() {
    let loader = this.loadingCtrl.create({spinner: "crescent"});
    loader.present();
    return loader;
  }

  private showToast() {
    let toast = this.toastCtrl.create({
      message: 'Error while loading',
      showCloseButton: true,
      closeButtonText: 'Close',
      duration: 3000
    });
    toast.present();
    return toast
  }

}
