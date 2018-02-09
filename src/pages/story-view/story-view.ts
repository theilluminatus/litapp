import { Component, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, Slides, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { STORYSTYLEOPTIONS_KEY, HISTORY_KEY } from '../../providers/db';
import { Stories } from '../../providers/providers';
import { User } from '../../providers/providers';
import { Story } from '../../models/story';

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

  Math: Math = Math;

  slides: any[] = [];
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
    public platform: Platform,
    public storage: Storage,
    public user: User,
    public stories: Stories,
    private popoverCtrl: PopoverController,
    private androidFullScreen: AndroidFullScreen,
    translate: TranslateService,
    navParams: NavParams
  ) {
    this.dir = platform.dir();
    this.slidesPerView = platform.isPortrait() ? 1 : 2;
    this.story = navParams.get('story');

    this.storage.get(STORYSTYLEOPTIONS_KEY).then((value) => {
      if (value)
        this.settings = value;
    });

    // get story from server
    if (!this.story.content && this.story.id) {

      this.stories.getById(this.story.id).subscribe((story) => {
        if (!story) {
          this.navCtrl.pop();
          return;
        }
        
        // add details to db
        if (!this.story.length) {
          this.story.length = story.length;
          this.story.tags = story.tags;
        }
        this.storage.set(HISTORY_KEY+"_"+this.story.id, this.story);

        
        story.content.forEach((item, index) => this.slides.push({
          content: item,
          page: index,
          desktoppage: index
        }));

        setTimeout(() => {
          if (this.story.currentpage > 0)
            this.slidesElement.slideTo(this.story.currentpage, 0);
        }, 150);
      });

    } else {
      this.slides = [{content: this.story.content, page: 1, desktoppage: 1}];
    }

    // add to history
    this.storage.get(HISTORY_KEY).then((history) => {
      if (!history) history = [];

      if (history.indexOf(this.story.id) > -1)
        history.splice(history.indexOf(this.story.id),1);

      history.push(this.story.id);
      this.storage.set(HISTORY_KEY, history);
    });

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
      this.storage.set(STORYSTYLEOPTIONS_KEY, this.settings)
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
    if (currentIndex >= this.slides.length) {
      // TODO: autoload next story in series?
      return;
    }

    this.storage.get(HISTORY_KEY+"_"+this.story.id).then((value) => {
      value['currentpage'] = currentIndex;
      this.storage.set(HISTORY_KEY+"_"+this.story.id, value);
    });
    this.range.setValue(currentIndex+1);
  }

  ionViewWillLeave() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.showSystemUI())
      .catch((error: any) => console.log(error));
  }

}
