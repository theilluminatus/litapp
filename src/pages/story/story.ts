import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html'
})
export class StoryPage implements OnInit {
  slides: any[];
  dir: string = 'ltr';
  slidesPerView: number = 1;
  story: any;
  @ViewChild("view") view: any;

  // TODO: persist settings
  settings = {
    fontsize: 14,
    lineheight: 21,
    color: "white",
    background: "black",
    font: "sans-serif",
    textalign: "left"
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

    // let linesPerSlide = this.view.contentHeight / lineheight;

    this.slides = [{content: this.story.content, page: 1, desktoppage: 1}];
    this.slides.push({content: this.story.content, page: 1, desktoppage: 1});
  }

  showPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create("StoryPopover", {
      settings: this.settings
    });

    popover.present({
      ev: ev
    });
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
