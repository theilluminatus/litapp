import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular'
import { Keyboard } from '@ionic-native/keyboard';

import { Storage } from '@ionic/storage';

import { STARREDQUERIES_KEY, RECENTQUERIES_KEY } from '../../providers/db';
import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';

@IonicPage({priority: 'high'})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  @ViewChild("searchbar") searchbar: any;
  @ViewChild("panel") panel: any;
  @ViewChild("list") list: any;

  currentStories: Story[] = [];
  recentQueries: string[] = [];
  starredQueries: string[] = [];
  query: string;
  totalResults: number;
  currentpage: number = 1;

  options = {
    sort: "",
    popular: false,
    editorsChoice: false,
    winner: false,
    astags: false,
    category: undefined
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public stories: Stories,
    public storage: Storage,
    private popoverCtrl: PopoverController,
    private keyboard: Keyboard
  ) {

    this.query = navParams.get('query');
    this.storage.get(RECENTQUERIES_KEY).then((value) => {
      if (value)
        this.recentQueries = value;
    });
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
    if (this.query) {
      this.options.astags = true;
      this.options.sort = 'views';
      this.options.category = '';
      this.search(this.query);
    } else if (this.searchbar.value == "") {
      setTimeout(() => { this.searchbar.setFocus(); }, 100);
    }
  }

  getStories(query?: string) {
    this.panel.close();
    let val = query ? query : this.searchbar.value;
    if (!val || !val.trim() || val.length < 3) return;

    this.currentStories = [];
    this.list.enableInfinity();
    this.stories.searchStory(val.trim(), this.options, 1).subscribe((data) => {
      this.totalResults = data[1];
      this.currentStories = data[0];
    });
    this.saveSearch(query);
  }

  loadMore(event) {
    this.currentpage++;
    this.stories.searchStory(this.searchbar.value, this.options, this.currentpage).subscribe((data) => {
      if (!data[0].length) {
        event.enable(false);
        return;
      }
      data[0].forEach((s) => this.currentStories.push(s));
      event.complete();
    });
  }

  saveSearch(query: string) {
    if (!query) return;

    query = query.trim();
    if (query.length < 2) return;
    if (this.recentQueries.indexOf(query) > -1) return;
    if (this.starredQueries.indexOf(query) > -1) return;
    this.recentQueries.push(query);
    this.storage.set(RECENTQUERIES_KEY, this.recentQueries);
  }

  pinSearch(event, query: string) {
    event.stopPropagation();
    if (this.starredQueries.indexOf(query) > -1) return;
    this.starredQueries.push(query);
    this.recentQueries.splice(this.recentQueries.indexOf(query), 1);
    this.storage.set(STARREDQUERIES_KEY, this.starredQueries);
    this.storage.set(RECENTQUERIES_KEY, this.recentQueries);
  }

  search(query: string) {
    this.searchbar.value = query;
    this.getStories(query);
  }

  delete(event, query: string) {
    event.stopPropagation();
    if (this.recentQueries.indexOf(query) > -1) {
      this.recentQueries.forEach((item, index) => {
        if (item == query)
          this.recentQueries.splice(index,1);
      });
      this.storage.set(RECENTQUERIES_KEY, this.recentQueries)

    } else if (this.starredQueries.indexOf(query) > -1) {
      this.starredQueries.forEach((item, index) => {
        if (item == query)
          this.starredQueries.splice(index,1);
      });
      this.storage.set(STARREDQUERIES_KEY, this.starredQueries)
    }
  }

  openOptionsPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create("SearchPopover", {
      options: this.options
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss((refresh) => {
      if (this.searchbar.value && refresh)
        this.getStories();
    })
  }

}
