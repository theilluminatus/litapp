import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  stories: Story[];

  constructor(public navCtrl: NavController, public s: Stories, public navParams: NavParams) {
  	this.stories = this.s.query();
  }

  ionViewDidLoad() {
    
  }

}
