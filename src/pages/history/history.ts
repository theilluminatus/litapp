import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';


@IonicPage()
@Component({
	selector: 'page-history',
	templateUrl: 'history.html',
})
export class HistoryPage {
	downloadFilterActive = false;
	stories: Story[];

	constructor(public navCtrl: NavController, public s: Stories, public navParams: NavParams) {

	}

	toggleDownloadFilter() {
		this.downloadFilterActive = !this.downloadFilterActive;
		if (this.downloadFilterActive)
			this.stories = this.s.query({
				downloaded: true
			});
		else
			this.stories = this.s.query();
	}

}
