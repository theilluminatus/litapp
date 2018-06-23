import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-top-list',
  templateUrl: 'top-list.html',
})
export class TopListPage {

  stories: Story[];
  currentpage = 1;
  cat;
  order;

  constructor(public navCtrl: NavController, public navParams: NavParams, public s: Stories) {
  	this.cat = navParams.get('category');
    this.order = navParams.get('order');
    
    if (this.order == 'new') {
      this.s.getNew(this.cat.id).subscribe(data => {
        this.stories = data[0];
      });
    } else {
      this.s.getTop(this.cat.id).subscribe(data => {
        this.stories = data[0];
      });
    }
  }

  loadMore(event) {
    this.currentpage++;

    if (this.order == 'new') {

      this.s.getNew(this.cat.id, this.currentpage).subscribe((data) => {
        this.addNewToList(data, event);
      });

    } else {

      this.s.getTop(this.cat.id, this.currentpage).subscribe((data) => {
        this.addNewToList(data, event);
      });

    }

  }

  addNewToList(data, event) {
    if (!data[0].length) {
      event.enable(false);
      return;
    }
    data[0].forEach((s) => this.stories.push(s));
    event.complete();
  }

}
