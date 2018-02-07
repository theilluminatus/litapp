import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Author } from '../../models/author';

@IonicPage()
@Component({
  selector: 'page-author',
  templateUrl: 'author.html',
})
export class AuthorPage {

  author: Author;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.author = navParams.get('author');
  }

}
