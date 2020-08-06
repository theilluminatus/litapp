import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories, Globals } from '../../providers/providers';
import { Category } from '../../models/category';

@IonicPage()
@Component({
  selector: 'page-top-list',
  templateUrl: 'top-list.html',
})
export class TopListPage {
  stories: Story[] = [];
  currentpage = 1;
  cat: Category;
  order: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public s: Stories, public globals: Globals) {
    this.cat = navParams.get('category');
    this.order = navParams.get('order');

    if (!this.cat) {
      this.cat = new Category({ name: 'Error' });
      return;
    }

    if (this.order === 'top') {
      this.s.getTop(this.cat.id).subscribe(data => {
        this.stories = data[0];
      });
    }
    if (this.order === 'new') {
      this.s.getNew(this.cat.id).subscribe(data => {
        this.stories = data[0];
      });
    }
    if (this.order === 'random') {
      this.s.getRandom(this.cat.id).subscribe(data => {
        this.stories = data[0];
      });
    }
  }

  loadMore(event) {
    this.currentpage += 1;

    if (this.order === 'top') {
      this.s.getTop(this.cat.id, this.currentpage).subscribe(data => {
        this.addNewToList(data, event);
      });
    }

    if (this.order === 'new') {
      this.s.getNew(this.cat.id, this.currentpage).subscribe(data => {
        this.addNewToList(data, event);
      });
    }

    if (this.order === 'random') {
      this.s.getRandom(this.cat.id, this.currentpage).subscribe(data => {
        this.addNewToList(data, event);
      });
    }
  }

  addNewToList(data, event) {
    if (!data[0].length) {
      event.enable(false);
      return;
    }
    data[0].forEach(s => this.stories.push(s));
    event.complete();
  }
}
