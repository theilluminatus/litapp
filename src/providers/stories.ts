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
      {"property": "type", "value": "story"},
      {"property": "q", "value": query}
    ];
  	let params = { 
  		"limit": limit? limit : 10,
  		"page": page ? page : 1,
      "filter": JSON.stringify(filter).trim()
  	};

    let loader;
    if (!page || page < 2)
		  loader = this.showLoader();

    return this.api.get('1/submissions', params).map((data: any) => {
    	if (loader) loader.dismiss();
    	if (!data.success) {
    		this.showToast();
    		return [];
    	}

    	return data.submissions.map((story) => {
    		return new Story({
    			id: story.id,
    			title: story.name,
    			description: story.description,
          category: story.category.name,
    			lang: story.lang,
    			timestamp: story.timestamp_published,
    			rating: story.rate,
          series: story.series_id,
    			viewcount: story.view_count,
    			url: story.url,
          ishot: story.is_hot == "no" ? false : true,
          isnew: story.is_new == "no" ? false : true,
          iswriterspick: story.writers_pick == "no" ? false : true,
          iscontestwinner: story.contest_winner == "no" ? false : true,
          commentsenabled: story.enabled_comments > 0 ? true : false,
          ratingenabled: story.allow_vote > 0 ? true : false,
    			author: new Author({
    				id: story.user.id,
    				name: story.user.username,
    				picture: story.user.userpic,
    			})
    		});
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
