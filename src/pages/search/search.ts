import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  @ViewChild("searchbar") searchbar: any;
  @ViewChild("panel") panel: any;

  currentStories: Story[] = [];
  starredQueries: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public stories: Stories) {
    // TODO: load starredQueries from db
  }

  getStories(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentStories = [];
      return;
    }

    this.currentStories = this.stories.query({
      title: val
    });
  }

  loadMore(event) {
    console.log(true);
    this.currentStories.push(
      this.currentStories[Math.floor(Math.random()*this.currentStories.length)]
    );
    event.complete();
  }

  openStory(story: Story) {
    this.navCtrl.push('StoryPage', {
      story: story
    });
  }

  saveSearch(query: string) {
    // TODO: persist starredQueries to db & check empty duplicates
    this.starredQueries.push(query);
  }

  search(query: string) {
    this.searchbar.value = query;
    this.panel.close();
  }

  delete(query: string) {
    // TODO: persist starredQueries to db
    this.starredQueries.forEach((item, index) => {
      if (item == query)
        this.starredQueries.splice(index,1);
    });
  }

}
