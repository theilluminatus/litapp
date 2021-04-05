import { Component, ViewChild, HostListener } from '@angular/core';
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
  slidesPerView: number = 1;
  alternatePagination: boolean = true;
  inFullscreen = false;
  enableImmersive = false; // TODO: make this a global setting
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
    buttonStyle: 'light',
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
    public navParams: NavParams,
  ) {
    this.dir = platform.dir();
    this.enableImmersive = appSettings.allSettings.enableImmersiveReading && platform.is('cordova');
    this.story = navParams.get('story');

    const loader = navParams.get('loader');
    if (loader) {
      loader.dismiss();
    }

    translate.get(['STORY_ENDOFSERIES', 'CLOSE_BUTTON', 'STORYVIEW_ERROR_IMAGE']).subscribe(values => {
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
      const parsedContent = item.replace('<img src=', `<img alt='&nbsp;${this.translations.STORYVIEW_ERROR_IMAGE}' src=`);
      this.slides.push({
        content: parsedContent,
        page: index,
        desktoppage: index,
      });
    });
  }

  ionViewWillEnter() {
    this.alternatePagination = this.appSettings.allSettings.alternatePagination;
    if (this.slidesElement) {
      if (this.story.currentpage > 0) this.slideTo(this.story.currentpage, 0);
      if (this.alternatePagination) this.slidesElement.lockSwipes(true);
    }
  }

  ionViewDidEnter() {
    this.analytics.track('StoryView');

    // enable fullscreen mode when previous story in series was being read
    const shouldBeFullscreen = this.navParams.get('fullscreen') || this.inFullscreen;
    setTimeout(() => {
      if (shouldBeFullscreen) {
        this.toggleImmersive();
      }
    }, 10);
  }

  ionViewWillLeave() {
    if (this.enableImmersive) {
      this.androidFullScreen.showSystemUI();
    }
  }

  private toggleImmersive() {
    if (this.enableImmersive) {
      if (this.inFullscreen) {
        this.androidFullScreen.showSystemUI();
        this.androidFullScreen.showUnderSystemUI();
      } else {
        this.androidFullScreen.immersiveMode();
      }
    }
    this.inFullscreen = !this.inFullscreen;
  }

  // ----------------------------------------------------------------------
  // Moving between slides
  // ----------------------------------------------------------------------

  private slideTo(newPage: number, speed?: number) {
    if (this.alternatePagination) this.slidesElement.lockSwipes(false);
    this.slidesElement.slideTo(newPage, speed);
    if (this.alternatePagination) this.slidesElement.lockSwipes(true);
  }

  nextSlide(event?: MouseEvent) {
    if (event) event.stopPropagation();

    // try going to next in series on last page
    if (this.slidesElement.getActiveIndex() >= this.slides.length - 1) {
      this.goToNextInSeries();
      return;
    }

    // hide status bar after reading the first page
    if (this.firstTimeNextPage && !this.inFullscreen) {
      this.toggleImmersive();
    }

    this.slideTo(this.slidesElement.getActiveIndex() + 1);
    this.firstTimeNextPage = false;
  }

  prevSlide(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.slideTo(this.slidesElement.getActiveIndex() - 1);
  }

  clickSlides(event: MouseEvent) {
    if (this.alternatePagination) {
      this.toggleImmersive();
      return;
    }

    if (event.clientX < this.platform.width() / 4) {
      // clicking in left most 25%
      this.prevSlide();
    } else if (event.clientX > (3 * this.platform.width()) / 4) {
      // clicking in right most 25%
      this.nextSlide();
    } else {
      this.toggleImmersive();
    }
  }

  @HostListener('window:volumebuttonslistener', ['$event'])
  onVolumeRocker(event) {
    if (!this.appSettings.allSettings.navigateWithVolumeRocker) return;
    if (event.signal === 'volume-up') {
      this.prevSlide();
    }
    if (event.signal === 'volume-down') {
      this.nextSlide();
    }
  }

  slideSelectionChange(event: any) {
    this.slideTo(event.value - 1);
  }

  slideChanged() {
    const currentIndex = this.slidesElement.getActiveIndex();
    if (currentIndex >= this.slides.length) {
      this.goToNextInSeries();
      return;
    }

    // only one page
    if (this.range) {
      this.range.setValue(currentIndex + 1);
      this.story.currentpage = currentIndex;
      this.stories.cache(this.story);
    }
  }

  goToNextInSeries() {
    if (!this.story.series || this.appSettings.allSettings.offlineMode) return;

    this.stories.getSeries(this.story.series).subscribe(data => {
      for (let i = 0; i < data[0].length - 1; i += 1) {
        if (data[0][i].id === this.story.id) {
          this.navCtrl.push('StoryViewPage', {
            story: data[0][i + 1],
            fullscreen: this.inFullscreen,
          });
          this.navCtrl.remove(this.navCtrl.indexOf(this.navCtrl.last()), 1);
          return;
        }
      }

      this.ux.showToast('INFO', 'STORY_ENDOFSERIES', 2000, undefined, undefined, true);
    });
  }

  // ----------------------------------------------------------------------
  // Popovers / other pages
  // ----------------------------------------------------------------------

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
}
