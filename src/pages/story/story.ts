import { Component, ViewChild, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, Slides, MenuController, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { Story } from '../../models/story';
import { Author } from '../../models/author';

@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html',
  animations: [
    trigger('visibilityChanged', [
      state("false", style({ opacity: 1 })),
      state("true", style({ opacity: 0 })),
      transition('* => *', animate('300ms'))
    ])
  ]
})
export class StoryPage implements OnInit {

  Math: Math = Math;

  slides: any[];
  dir: string = 'ltr';
  slidesPerView: number = 1;
  fullscreen = false;
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
    private androidFullScreen: AndroidFullScreen,
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

  clickSlides(event) {

    // clicking in left most 25%
    if ( event.clientX < this.platform.width()/4 )
      this.slidesElement.slidePrev();
    // clicking in right most 25%
    else if ( event.clientX > 3*this.platform.width()/4 )
      this.slidesElement.slideNext();
    // click center 50%
    else {
      this.fullscreen = !this.fullscreen;
      this.androidFullScreen.isImmersiveModeSupported()
        .then(() => {
          if (this.fullscreen)
            this.androidFullScreen.immersiveMode()
          else
            this.androidFullScreen.showSystemUI()
        })
        .catch((error: any) => console.log(error));
    }
      
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
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.showSystemUI())
      .catch((error: any) => console.log(error));
  }

}
