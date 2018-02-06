import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html'
})
export class StoryPage {
  slides: any[];
  dir: string = 'ltr';
  story: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.story = navParams.get('story');
    this.dir = platform.dir();
    this.menu.enable(true);
    this.slides = [{content: this.story.content, page: 1, desktoppage: 1}];
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
