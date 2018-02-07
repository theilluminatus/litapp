import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { List } from '../../models/list';
import { Stories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListViewPage {

  list: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, public s: Stories) {
  	this.list = navParams.get('list');
  	this.list["stories"] = this.s.query();

  }

}
