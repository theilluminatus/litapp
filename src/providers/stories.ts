import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Story } from '../models/story';
import { Author } from '../models/author';
import { Api } from './api/api';

@Injectable()
export class Stories {

  constructor(
  	public api: Api,
  	public loadingCtrl: LoadingController,
  	public toastCtrl: ToastController
  ) { }


  // Search for a story with a query and sort results
  searchStory(query: string, sort: string, page?: number, limit?: number) {
    let filter = [
      {"property": "q", "value": query},
      {"property": "type", "value": "story"}
    ];
    return this.search(filter, page, null, sort, "https://search.literotica.com/api");
  }


  // TODO: add infinitescroll to series page
  getSeries(seriesid: number, page?: number, limit?: number) {
    let filter = [
      {"property": "series_id", "value": seriesid}
    ];
    return this.search(filter, page);
  }


  getRelated(id: any) {
    let filter = [
      {"property": "related_id", "value": id}
    ];
    return this.search(filter);
  }


  // TODO: add infinitescroll for authors stories
  getAuthorStories(id: any, page?: number, limit?: number) {
    let filter = [
      {"property": "user_id", "value": id},
      {"property": "type", "value": "story"}
    ];
    return this.search(filter, page);
  }




  // helper for similar requests
  private search(filter: any, page?: number, limit?: number, sort?: string, url?: string) {
    let params = { 
      "limit": limit? limit : 10,
      "page": page ? page : 1,
      "filter": JSON.stringify(filter).trim()
    };

    let loader;
    if (!page || page < 2)
      loader = this.showLoader();

    return this.api.get('1/submissions', params, null, url).map((data: any) => {
      if (loader) loader.dismiss();

      console.log(data);

      if (!data.success && !data.submissions) {
        if (!data.hasOwnProperty('total'))
          this.showToast();
        return [];
      }

      return data.submissions.map((story) => {
        return this.extractSubmissionData(story);
      });

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.showToast();
      return Observable.of([]);
    });
  }


  // TODO: add infinitescroll for authors favs
  getAuthorFavs(id: any, page?: number, limit?: number) {
    let filter = [
      {"property": "user_id", "value": id},
      {"property": "type", "value": "story"}
    ];
    let params = { 
      "limit": limit? limit : 10,
      "page": page ? page : 1,
      "filter": JSON.stringify(filter).trim()
    };

    let loader;
    if (!page || page < 2)
      loader = this.showLoader();

    return this.api.get('1/user-favorites', params).map((data: any) => {
      if (loader) loader.dismiss();
      if (!data.success) {
        this.showToast();
        return [];
      }

      return data.submissions.map((story) => {
        return this.extractSubmissionData(story);
      });

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.showToast();
      return Observable.of([]);
    });
  }


  // Get a story by ID
  getById(id: any) {
    // TODO: send session id when logged in to get more info
    let filter = [{"property": "submission_id", "value": id}];
    let params = { "filter": JSON.stringify(filter).trim() };

    let loader = this.showLoader();
    return this.api.get('2/submissions/pages', params).map((data: any) => {
      loader.dismiss();
      if (!data.success) {
        this.showToast();
        return null;
      }

      let tags = !data.pages[0].tags ? [] : data.pages[0].tags
        .sort((a,b) => b.submission_count - a.submission_count )
        .map((el) => el.name);

      return new Story({
        id: data.pages[0].submission_id,
        title: data.pages[0].name,
        url: data.pages[0].url,
        series: data.pages[0].series_id,
        length: data.total,
        tags: tags,
        content: data.pages.map((p) => p.content)        
      });

    }).catch((error) => {
      loader.dismiss();
      this.showToast();
      return Observable.of(null);
    });
  }


  rate(story: Story, rating: number) {

    let filter = [{"property": "submission_id", "value": story.id}];
    let params = {
      storyid: story.id,
      user_id: 0, // TODO: check if user_id is necessary
      session_id: 0, // TODO: send session_id to vote
      "filter": JSON.stringify(filter).trim()
    };

    this.api.post('2/submissions/vote', params).map((data: any) => {
      if (!data.success)
        this.showToast();
      return null;
    }).catch(() => {
      this.showToast();
      return Observable.of(null);
    }).subscribe();
  }



  // HELPERS

  private showLoader() {
    let loader = this.loadingCtrl.create({spinner: "crescent"});
    loader.present();
    return loader;
  }

  // TODO: add translation
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

  private extractSubmissionData(apistory) {
    return new Story({
      id: apistory.id,
      title: apistory.name,
      description: apistory.description,
      category: apistory.category.name,
      lang: apistory.lang,
      timestamp: apistory.timestamp_published,
      rating: apistory.rate,
      viewcount: apistory.view_count,
      url: apistory.url,
      ishot: apistory.is_hot == "no" ? false : true,
      isnew: apistory.is_new == "no" ? false : true,
      iswriterspick: apistory.writers_pick == "no" ? false : true,
      iscontestwinner: apistory.contest_winner == "no" ? false : true,
      commentsenabled: apistory.enabled_comments > 0 ? true : false,
      ratingenabled: apistory.allow_vote > 0 ? true : false,
      author: new Author({
        id: apistory.user.id,
        name: apistory.user.username,
        picture: apistory.user.userpic,
      })
    });
  }

}
