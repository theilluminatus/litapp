import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-story-series',
  templateUrl: 'story-series.html',
})
export class StorySeriesPage {
  series: Story[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public stories: Stories) {
    const story: Story = navParams.get('story');
    this.stories.getSeries(story.series).subscribe(data => {
      this.series = data[0];
    });
  }

  download() {
    this.stories.downloadSeries(this.series);
  }
}
