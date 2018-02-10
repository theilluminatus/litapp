import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular'
import { Keyboard } from '@ionic-native/keyboard';

import { Storage } from '@ionic/storage';

import { STARREDQUERIES_KEY, HISTORY_KEY } from '../../providers/db';
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
  totalResults: number;
  currentpage: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public stories: Stories,
    public storage: Storage,
    private popoverCtrl: PopoverController,
    private keyboard: Keyboard
  ) {

    this.query = navParams.get('query');
    this.storage.get(STARREDQUERIES_KEY).then((value) => {
      if (value)
        this.starredQueries = value;
    });
    
  }

  ionViewDidEnter() {
    this.keyboard.disableScroll(true);
  }

  ionViewWillLeave() {
    this.keyboard.disableScroll(false);
  }

  ionViewWillEnter() {
    if (this.query) this.search(this.query);
    else if (this.searchbar.value == "")
      setTimeout(() => { this.searchbar.setFocus(); }, 100);

  }

  getStories(query?: string) {
    let val = query ? query : this.searchbar.value;
    if (!val || !val.trim() || val.length < 3) return;

    this.currentStories = [];
    this.stories.searchStory(val.trim(), this.sortmethod, 1).subscribe((data) => {
      this.totalResults = data[1];
      this.lookForDownloadedAndPush(data[0]);
    });
  }

  loadMore(event) {
    this.currentpage++;
    this.stories.searchStory(this.searchbar.value, this.sortmethod, this.currentpage).subscribe((data) => {
      if (!data[0].length) {
        event.enable(false);
        return;
      }
      this.lookForDownloadedAndPush(data[0]);
      event.complete();
    });
  }

  private lookForDownloadedAndPush(stories: Story[]) {

    let mergedCount = 0;
    let mergedStories = Array(stories.length);
    stories.forEach((story, index) => {

      this.storage.get(HISTORY_KEY + "_" + story.id).then((data) => {
        if (data)
          mergedStories[index] = new Story(data);
        else
          mergedStories[index] = story

        mergedCount++;
        if (mergedCount == stories.length-1)
          mergedStories.forEach((s) => this.currentStories.push(s));
      });

    });
  }

  saveSearch(query: string) {
    query = query.trim();
    if (query.length < 2) return;
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
        this.sortmethod = method;
        this.getStories();
      }
    })
  }

}
