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
      if (data)
        this.lists = data;
    });
  }

  openList(list: List) {
    this.navCtrl.push('ListViewPage', {
      list: list
    });
  }

  addList() {
    this.navCtrl.push('ListCreatePage');
  }

  edit(list: List, item, event) {
    event.stopPropagation();
    item.close();
    this.navCtrl.push('ListCreatePage', {
      list: list
    });
  }

  delete(list: List, item, event) {
    event.stopPropagation();
    this.l.delete(list).subscribe((d) => {
      if (d)
        item.close();
    });
  }

}
