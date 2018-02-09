import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { STARREDQUERIES_KEY } from '../../providers/db';
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
  currentpage: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public stories: Stories,
    public storage: Storage,
    private popoverCtrl: PopoverController
  ) {
    this.query = navParams.get('query');
    this.storage.get(STARREDQUERIES_KEY).then((value) => {
      if (value)
        this.starredQueries = value;
    });

  }

  ionViewWillEnter() {
    if (this.query) this.search(this.query);
  }

  getStories(query?: string) {
    let val = query ? query : this.searchbar.value;
    if (!val || !val.trim() || val.length < 3) return;

    this.stories.searchStory(val, this.sortmethod, 1).subscribe((data) => {
      this.currentStories = data;
    });
  }

  loadMore(event) {
    this.currentpage++;
    this.stories.searchStory(this.searchbar.value, this.sortmethod, this.currentpage).subscribe((data) => {
      if (data.length < 0) {
        event.enable(false);
        return;
      }
      data.forEach((story) => this.currentStories.push(story));
      event.complete();
    });
  }

  openStory(story: Story) {
    this.navCtrl.push('StoryViewPage', {
      story: story
    });
  }

  saveSearch(query: string) {
    if (query.trim().length < 2) return;
    if (this.starredQueries.indexOf(query) > -1) return;
    this.starredQueries.push(query);
    this.storage.set(STARREDQUERIES_KEY, this.starredQueries)
  }

  search(query: string) {
    this.searchbar.value = query;
    this.getStories(query);
    this.panel.close();
  }

  delete(query: string) {
    this.starredQueries.forEach((item, index) => {
      if (item == query)
        this.starredQueries.splice(index,1);
    });
    this.storage.set(STARREDQUERIES_KEY, this.starredQueries)
  }

  openSortPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create("SearchPopover", {
      method: this.sortmethod
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss((method) => {
      if (method) {
        // TODO: get new sorted stories
        this.sortmethod = method;
        this.getStories()
      }
    })
  }

}
