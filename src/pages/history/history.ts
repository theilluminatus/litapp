import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';


@IonicPage()
@Component({
	selector: 'page-history',
	templateUrl: 'history.html',
})
export class HistoryPage {
	downloadFilterActive = false;
	allStories: Story[] = [];
	filteredStories: Story[] = [];

	private HISTORY_KEY: string = '_history';

	constructor(
		public navCtrl: NavController,
		public storage: Storage
	) { }

	ionViewDidEnter() {
		this.storage.get(this.HISTORY_KEY).then((history) => {
			this.allStories = [];
      if (history)
	      history.forEach((id) => {
	      	this.storage.get(this.HISTORY_KEY+"_"+id).then((story) => {
	      		if (story)
	      			this.allStories.push(new Story(story));
	      	});
	      });
	    this.refreshFilteredStories();
    });
	}

	toggleDownloadFilter() {
		this.downloadFilterActive = !this.downloadFilterActive;
		this.refreshFilteredStories();
	}

	private refreshFilteredStories() {
		if (this.downloadFilterActive)
			this.filteredStories = this.allStories.filter((s) => s.downloaded);
		else
			this.filteredStories = this.allStories;
	}

}
