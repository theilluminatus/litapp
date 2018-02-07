import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { List } from '../../models/list';
import { Lists } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-list',
  templateUrl: 'list-list.html',
})
export class ListListPage {

  lists: List[];

  constructor(public navCtrl: NavController, public l: Lists) {
  	this.lists = this.l.query();
  }

  openList(list: List) {
    this.navCtrl.push('ListViewPage', {
      list: list
    });
  }

}
