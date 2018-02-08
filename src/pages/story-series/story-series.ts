import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';

@IonicPage()
@Component({
  selector: 'page-story-series',
  templateUrl: 'story-series.html',
})
export class StorySeriesPage {

  series: Story[];
  // TODO: persist & load autoload setting to db
  autoload: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	let story: Story = navParams.get('story');
  	// TODO: make series relation between stories
  	this.series = story.author.stories;
  }

}
