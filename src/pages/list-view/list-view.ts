import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { List } from '../../models/list';
import { Lists } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListViewPage {

  list: List;
  stories: Story[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public l: Lists) {
  	let list = navParams.get('list');
  	this.l.onReady().then(() => {
	  	this.l.getById(list.urlname).subscribe(data => {
	      this.list = data;
        this.stories = this.list.stories;
	    });
    });
  }

  filter(event: string) {
    if (!event.data || event.data == null) {
      this.stories = this.list.stories;
      return;
    }

    let query = event.target.value.toLowerCase();

    this.stories = this.list.stories.filter((story: Story) => {
      if (story.title.toLowerCase().indexOf(query) > -1) return true;
      if (story.description.toLowerCase().indexOf(query) > -1) return true;
      if (story.category.toLowerCase().indexOf(query) > -1) return true;
      if (story.author.name.toLowerCase().indexOf(query) > -1) return true;

      let matchingTags = story.tags.filter((tag) => {
        if (tag.toLowerCase().indexOf(query) > -1) return true;
        return false;
      });
      if (matchingTags.length > 0) return true;

      return false;
    });

  }

}
