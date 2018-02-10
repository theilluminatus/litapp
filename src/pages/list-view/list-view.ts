import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { List } from '../../models/list';
import { Lists } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListViewPage {

  list: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, public l: Lists) {
  	let list = navParams.get('list');
  	this.l.getById(list.urlname).subscribe(data => {
      this.list = data;
    });
  }

}
