import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
  	this.l.query().subscribe(data => {
      this.lists = data;
      console.log(data);
    });
  }

  openList(list: List) {
    this.navCtrl.push('ListViewPage', {
      list: list
    });
  }

  addList() {
    this.navCtrl.push('ListCreatePage', {
      callback: (newlist) => {
        // TODO: reload lists
        this.lists.push(newlist);
      }
    });
  }

  edit(list: List, event) {
    event.stopPropagation();
    this.navCtrl.push('ListCreatePage', {
      list: list
    });
  }

  delete(list: List, event) {
    // TODO: delete list from server
    event.stopPropagation();
    this.lists.forEach((item,index) => {
      if (item == list)
        this.lists.splice(index, 1);
    });
  }

}
