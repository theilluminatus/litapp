import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { Globals } from '../../providers/providers';

@IonicPage({priority: 'high'})
@Component({
  selector: 'page-top-cat',
  templateUrl: 'top-cat.html'
})
export class TopCatPage {

  categories = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public g: Globals) {
    this.g.onReady().then(() => {
      this.categories = this.g.getCategories();
      this.categories.unshift({ id: 0, name: "All", description: "All categories" });
    });
  }

  openCategory(cat) {
    this.navCtrl.push('TopListPage', {
      category: cat
    })
  }

}
