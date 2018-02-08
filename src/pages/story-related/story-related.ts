import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';

@IonicPage()
@Component({
  selector: 'page-story-related',
  templateUrl: 'story-related.html',
})
export class StoryRelatedPage {

  related: Story[];
  // TODO: persist & load autoload setting to db
  autoload: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	let story: Story = navParams.get('story');
  	// TODO: make related relation between stories
  	this.related = story.author.favs;
  }

}
