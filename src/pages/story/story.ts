import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, Slides, MenuController, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Story } from '../../models/story';
import { Author } from '../../models/author';

@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html'
})
export class StoryPage implements OnInit {
  slides: any[];
  dir: string = 'ltr';
  slidesPerView: number = 1;
  story: Story;
  @ViewChild("slidesElement") slidesElement: Slides;
  @ViewChild("range") range: any;

  // TODO: persist settings
  settings = {
    fontsize: 15,
    lineheight: 21.5,
    color: "white",
    background: "black",
    font: "sans-serif",
    textalign: "justify"
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public platform: Platform,
    private popoverCtrl: PopoverController,
    translate: TranslateService,
    navParams: NavParams,
  ) {
    this.story = navParams.get('story');
    this.dir = platform.dir();
    this.slidesPerView = platform.isPortrait() ? 1 : 2;
    this.menu.enable(true);
  }

  ngOnInit() {


    // for (var i = 0; i < str.length; i++) {
    //   alert(str.charAt(i));
    // }

    // let linesPerSlide = this.slidesElement.contentHeight / lineheight;

    this.slides = [{content: this.story.content, page: 1, desktoppage: 1}];
    this.slides.push({content: this.story.content, page: 1, desktoppage: 1});
    this.slides.push({content: this.story.content, page: 1, desktoppage: 1});

    // TODO: get current page from db
  }

  showPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create("StoryPopover", {
      settings: this.settings
    });

    popover.present({
      ev: ev
    });
  }

  showAuthor(author: Author) {
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

  showInfo(story: Story) {
    this.navCtrl.push('StoryDetailPage', {
      story: story
    });
  }

  slideChanged() {
    // TODO: persist current slide index to db
    let currentIndex = this.slidesElement.getActiveIndex();
    this.range.setValue(currentIndex+1);
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
