import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { STORYSTYLEOPTIONS_KEY } from '../../providers/db';
import { Stories, Analytics, Settings, History, User, UX } from '../../providers/providers';
import { Story } from '../../models/story';

@IonicPage({ priority: 'low' })
@Component({
  selector: 'page-story-view',
  templateUrl: 'story-view.html',
})
export class StoryViewPage {
  Math: Math = Math;

  slides: any[] = [];
  dir: string = 'ltr';
  webApp: boolean = true;
  slidesPerView: number = 1;
  fullscreen = false;
  firstTimeNextPage = true;
  story: Story;
  translations;
  @ViewChild('slidesElement') slidesElement: Slides;
  @ViewChild('range') range: any;

  settings = {
    fontsize: 15,
    lineheight: 21.5,
    theme: 'black',
    color: 'rgb(255,255,255)',
    background: 'rgb(0,0,0)',
    font: 'sans-serif',
    textalign: 'justify',
    lowcontrast: false,
  };

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public storage: Storage,
    public appSettings: Settings,
    public user: User,
    public stories: Stories,
    public analytics: Analytics,
    public history: History,
    private popoverCtrl: PopoverController,
    public ux: UX,
    private androidFullScreen: AndroidFullScreen,
    translate: TranslateService,
    navParams: NavParams,
  ) {
    this.dir = platform.dir();
    this.webApp = !platform.is('cordova');
    // this.slidesPerView = platform.isPortrait() ? 1 : 2;
    this.story = navParams.get('story');
    this.fullscreen = navParams.get('fullscreen') || this.fullscreen;

    const loader = navParams.get('loader');
    if (loader) {
      loader.dismiss();
    }

    translate.get(['STORY_ENDOFSERIES', 'CLOSE_BUTTON']).subscribe(values => {
      this.translations = values;
    });

    this.storage.get(STORYSTYLEOPTIONS_KEY).then(value => {
      if (value) {
        this.settings = value;
      }
    });

    // get story from server
    if (!this.story.cached) {
      this.stories.getById(this.story.id).subscribe(story => {
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

    this.history.add(this.story);
  }

  private addSlides() {
    this.story.content.forEach((item, index) => {
      // Add fallback handlers for images
      const parsedContent = item.replace('<img src=', '<img alt="&nbsp;Error while loading image." src=');
      this.slides.push({
        content: parsedContent,
        page: index,
        desktoppage: index,
      });
    });
  }

  ionViewWillEnter() {
    if (this.story.currentpage > 0 && this.slidesElement) {
      this.slidesElement.slideTo(this.story.currentpage, 0);
    }
  }

  ionViewDidEnter() {
    setTimeout(() => {
      if (this.fullscreen) {
        this.androidFullScreen.immersiveMode();
      } else {
        this.androidFullScreen.showUnderSystemUI();
      }
    }, 10);
    this.analytics.track('StoryView');
  }

  ionViewWillLeave() {
    this.androidFullScreen.showSystemUI();
  }

  clickSlides(event) {
    if (event.clientX < this.platform.width() / 4) {
      // clicking in left most 25%
      this.slidesElement.slidePrev();
    } else if (event.clientX > (3 * this.platform.width()) / 4) {
      // clicking in right most 25%
      if (this.firstTimeNextPage && !this.fullscreen) {
        this.immersive();
      }
      this.slidesElement.slideNext();
      this.firstTimeNextPage = false;
    } else {
      this.immersive();
    }
  }

  private immersive() {
    if (this.fullscreen) {
      // TODO: find a way to show statusbar under system ui immediately
      this.androidFullScreen.showSystemUI();
      this.androidFullScreen.showUnderSystemUI();
    } else {
      this.androidFullScreen.immersiveMode();
    }
    this.fullscreen = !this.fullscreen;
  }

  showPopover(ev: UIEvent) {
    const popover = this.popoverCtrl.create('StoryPopover', {
      settings: this.settings,
    });

    popover.present({
      ev,
    });

    popover.onDidDismiss(() => {
      this.storage.set(STORYSTYLEOPTIONS_KEY, this.settings);
    });
  }

  showInfo(story: Story) {
    this.navCtrl.push('StoryDetailPage', {
      story,
    });
  }

  showSeries(story: Story) {
    this.navCtrl.push('StorySeriesPage', {
      story,
    });
  }

  openListPicker(ev: UIEvent) {
    const popover = this.popoverCtrl.create('BookmarkPopover', {
      story: this.story,
    });

    popover.present({
      ev,
    });
  }

  slideChanged() {
    const currentIndex = this.slidesElement.getActiveIndex();
    if (currentIndex >= this.slides.length && this.story.series && !this.appSettings.allSettings.offlineMode) {
      this.stories.getSeries(this.story.series).subscribe(data => {
        for (let i = 0; i < data[0].length - 1; i += 1) {
          if (data[0][i].id === this.story.id) {
            this.navCtrl.push('StoryViewPage', {
              story: data[0][i + 1],
              fullscreen: this.fullscreen,
            });
            this.navCtrl.remove(this.navCtrl.indexOf(this.navCtrl.last()), 1);
            return;
          }
        }

        this.ux.showToast('INFO', 'STORY_ENDOFSERIES', 2000, undefined, undefined, true);
      });

      return;
    }

    // only one page
    if (this.range) {
      this.range.setValue(currentIndex + 1);
      this.story.currentpage = currentIndex;
      this.stories.cache(this.story);
    }
  }
}
