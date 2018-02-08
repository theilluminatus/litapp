import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

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
  query: string;
  sortmethod: string = "relevancy";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public stories: Stories,
    private popoverCtrl: PopoverController
  ) {
    this.query = navParams.get('query');
    // TODO: load starredQueries from db
  }

  ionViewWillEnter() {
    if (this.query) this.search(this.query);
  }

  getStories(ev, query?) {
    let val = query ? query : ev.target.value;
    if (!val || !val.trim()) {
      this.currentStories = [];
      return;
    }

    this.currentStories = this.stories.query({
      title: val,
      tags: val,
      category: val
    });
  }

  loadMore(event) {
    this.currentStories.push(
      this.currentStories[Math.floor(Math.random()*this.currentStories.length)]
    );
    event.complete();
  }

  openStory(story: Story) {
    this.navCtrl.push('StoryViewPage', {
      story: story
    });
  }

  saveSearch(query: string) {
    // TODO: persist starredQueries to db
    if (query.trim().length < 2) return;
    if (this.starredQueries.indexOf(query) > -1) return;
    this.starredQueries.push(query);
  }

  search(query: string) {
    this.searchbar.value = query;
    this.getStories(null, query);
    this.panel.close();
  }

  delete(query: string) {
    // TODO: persist starredQueries to db
    this.starredQueries.forEach((item, index) => {
      if (item == query)
        this.starredQueries.splice(index,1);
    });
  }

  openSortPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create("SearchPopover", {
      method: this.sortmethod
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss((data) => {
      if (data) {
        // TODO: get new sorted stories
        console.log(data);
        this.sortmethod = data;
      }
    })
  }

}
