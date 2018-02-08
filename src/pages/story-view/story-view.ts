import { Component, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, Slides, MenuController, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { User } from '../../providers/providers';
import { Story } from '../../models/story';
import { Author } from '../../models/author';

@IonicPage()
@Component({
  selector: 'page-story-view',
  templateUrl: 'story-view.html',
  animations: [
    trigger('visibilityChanged', [
      state("false", style({ opacity: 1 })),
      state("true", style({ opacity: 0 })),
      transition('* => *', animate('300ms'))
    ])
  ]
})
export class StoryViewPage {

  private STORYSTYLEOPTIONS_KEY: string = '_storystyle';

  Math: Math = Math;

  slides: any[];
  dir: string = 'ltr';
  slidesPerView: number = 1;
  fullscreen = false;
  story: Story;
  @ViewChild("slidesElement") slidesElement: Slides;
  @ViewChild("range") range: any;

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
    public storage: Storage,
    public user: User,
    private popoverCtrl: PopoverController,
    private androidFullScreen: AndroidFullScreen,
    translate: TranslateService,
    navParams: NavParams
  ) {
    this.menu.enable(true);
    this.dir = platform.dir();
    this.slidesPerView = platform.isPortrait() ? 1 : 2;
    this.story = navParams.get('story');

    this.storage.get(this.STORYSTYLEOPTIONS_KEY).then((value) => {
      if (value)
        this.settings = value;
    });

    // for (var i = 0; i < str.length; i++) {
    //   alert(str.charAt(i));
    // }

    // let linesPerSlide = this.slidesElement.contentHeight / lineheight;

    this.slides = [{content: this.story.content, page: 1, desktoppage: 1}];
    this.slides.push({content: this.story.content, page: 1, desktoppage: 1});
    this.slides.push({content: this.story.content, page: 1, desktoppage: 1});
  }

  ionViewWillEnter() {
    if (this.story.currentpage > 0)
      this.slidesElement.slideTo(this.story.currentpage, 0);
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

    popover.onDidDismiss(() => {
      this.storage.set(this.STORYSTYLEOPTIONS_KEY, this.settings)
    });
  }

  showInfo(story: Story) {
    this.navCtrl.push('StoryDetailPage', {
      story: story
    });
  }

  openListPicker(ev: UIEvent) {
    let popover = this.popoverCtrl.create("BookmarkPopover", {
      story: this.story
    });

    popover.present({
      ev: ev
    });
  }

  slideChanged() {
    let currentIndex = this.slidesElement.getActiveIndex();
    if (currentIndex == this.slides.length) {
      // TODO: autoload next story in series?
      return;
    }

    // TODO: persist current slide index to db
    this.story.currentpage = currentIndex;
    this.range.setValue(currentIndex+1);
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.showSystemUI())
      .catch((error: any) => console.log(error));
  }

}
