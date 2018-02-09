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
  	private toastCtrl: ToastController
  ) { }

  searchStory(query: string, sort: string, page?: number, limit?: number) {

  	let params = { 
  		"limit": limit? limit : 10,
  		"page": page ? page : 1,
  		"filter": [
  			{"property": "type", "value": "story"},
  			{"property": "q", "value": query}
  		]
  	};
  	params.filter = JSON.stringify(params.filter).trim();

  	let loading = this.loadingCtrl.create({spinner: "crescent"});
		loading.present();

    return this.api.get('1/submissions', params).map((data) => {
    	loading.dismiss();
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
    			timestamp: story.timestamp_published,
    			rating: story.rate,
    			viewcount: story.viewcount,
    			url: story.url,
    			author: new Author({
    				id: story.user.id,
    				name: story.user.username,
    				picture: story.user.userpic,
    			})
    		});
    	});

    }).catch((error) => {
    	loading.dismiss();
    	this.showToast();
    	return Observable.of([]);
    });
  }

  getById(id: any, params?: any) {
    return this.api.get('/s/'+id, params);
  }

  private showToast(data) {
  	// TODO: translate
		this.toastCtrl.create({
	    message: 'Error',
	    showCloseButton: true,
	    closeButtonText: 'Close',
	    dismissOnPageChange: true,
	    duration: 3000
		}).present();
  }

}
