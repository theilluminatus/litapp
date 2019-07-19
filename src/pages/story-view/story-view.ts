import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams, Platform, PopoverController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { STORYSTYLEOPTIONS_KEY, HISTORY_KEY } from '../../providers/db';
import { Stories, Analytics } from '../../providers/providers';
import { User } from '../../providers/providers';
import { Story } from '../../models/story';

@IonicPage({priority: 'low'})
@Component({
  selector: 'page-story-view',
  templateUrl: 'story-view.html'
})
export class StoryViewPage {

  Math: Math = Math;

  slides: any[] = [];
  dir: string = 'ltr';
  slidesPerView: number = 1;
  fullscreen = false;
  firstTimeNextPage = true;
  story: Story;
  translations;
  @ViewChild("slidesElement") slidesElement: Slides;
  @ViewChild("range") range: any;

  settings = {
    fontsize: 15,
    lineheight: 21.5,
    theme: "black",
    color: "rgb(255,255,255)",
    background: "rgb(0,0,0)",
    font: "sans-serif",
    textalign: "justify",
    lowcontrast: false,
  }

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public storage: Storage,
    public user: User,
    public stories: Stories,
    public analytics: Analytics,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private androidFullScreen: AndroidFullScreen,
    translate: TranslateService,
    navParams: NavParams
  ) {

    this.dir = platform.dir();
    // this.slidesPerView = platform.isPortrait() ? 1 : 2;
    this.story = navParams.get('story');
    this.fullscreen = navParams.get('fullscreen') || this.fullscreen;

    let loader = navParams.get('loader');
    if (loader)
      loader.dismiss();

    translate.get(['STORY_ENDOFSERIES', 'CLOSE_BUTTON']).subscribe(values => {
      this.translations = values;
    });

    this.storage.get(STORYSTYLEOPTIONS_KEY).then((value) => {
      if (value)
        this.settings = value;
    });

    // get story from server
    if (!this.story.cached) {

      this.stories.getById(this.story.id).subscribe((story) => {
        if (!story) {
          this.navCtrl.pop();
          return;
        }
        
        // add details & content to db
        this.story.series = story.series;
        this.story.length = story.length;
        this.story.tags = story.tags;
        this.story.content = story.content;
        this.story.cached = true;

        this.stories.cache(this.story);
        this.addSlides();      
      });

    } else {
      this.addSlides();      
    }

    // add to history
    this.storage.get(HISTORY_KEY).then((history) => {
      if (!history) history = [];

      if (history.indexOf(this.story.id) > -1)
        history.splice(history.indexOf(this.story.id), 1);

      history.push(this.story.id);
      this.storage.set(HISTORY_KEY, history);
    });

  }

  private addSlides() {
    this.story.content.forEach((item, index) => this.slides.push({
      content: item,
      page: index,
      desktoppage: index
    }));
  }

  ionViewWillEnter() {
    if (this.story.currentpage > 0 && this.slidesElement )
      this.slidesElement.slideTo(this.story.currentpage, 0);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      if (this.fullscreen)
        this.androidFullScreen.immersiveMode();
      else
        this.androidFullScreen.showUnderSystemUI();
    }, 10);
    this.analytics.track('StoryView');
  }

  ionViewWillLeave() {
    this.androidFullScreen.showSystemUI();
  }

  clickSlides(event) {

    if ( event.clientX < this.platform.width()/4 ) {
      // clicking in left most 25%
      this.slidesElement.slidePrev();

    } else if ( event.clientX > 3*this.platform.width()/4 ) {
      // clicking in right most 25%
      if (this.firstTimeNextPage && !this.fullscreen)
        this.immersive();
      this.slidesElement.slideNext();
      this.firstTimeNextPage = false;

    } else {
      this.immersive();
    }
      
  }

  private immersive() {
    if (this.fullscreen) {
      // TODO: find a way to show statusbar under system ui immediatly
      this.androidFullScreen.showSystemUI();
      this.androidFullScreen.showUnderSystemUI();
    } else {
      this.androidFullScreen.immersiveMode();
    }
    this.fullscreen = !this.fullscreen;
  }

  showPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create("StoryPopover", {
      settings: this.settings
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss(() => {
      this.storage.set(STORYSTYLEOPTIONS_KEY, this.settings)
    });
  }

  showInfo(story: Story) {
    this.navCtrl.push('StoryDetailPage', {
      story: story
    });
  }

  showSeries(story: Story) {
    this.navCtrl.push('StorySeriesPage', {
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
    if (currentIndex >= this.slides.length && this.story.series) {
      
      this.stories.getSeries(this.story.series).subscribe((data) => {
        for (let i=0; i<data[0].length-1; i++) {
          if (data[0][i].id == this.story.id) {
            this.navCtrl.push('StoryViewPage', {
              story: data[0][i+1],
              fullscreen: this.fullscreen
            });
            this.navCtrl.remove(this.navCtrl.indexOf(this.navCtrl.last()),1);
            return;
          }
        }

        let toast = this.toastCtrl.create({
          message: this.translations.STORY_ENDOFSERIES,
          showCloseButton: true,
          closeButtonText: this.translations.CLOSE_BUTTON,
          duration: 2000,
          cssClass: "overui"
        });
        toast.present();
      });

      return;
    }

    this.story.currentpage = currentIndex;
    this.stories.cache(this.story);
    this.range.setValue(currentIndex+1);
  }

}
