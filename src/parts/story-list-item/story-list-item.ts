import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, PopoverController, LoadingController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { Story } from '../../models/story';
import { Author } from '../../models/author';

@Component({
  selector: 'story-list-item',
  templateUrl: 'story-list-item.html',
})
export class StoryListItem {
  Math: Math = Math;

  @Input() story: Story;
  @Input() ishistory: boolean = false;
  @Output() onDeleteBySwiping: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadBySwiping: EventEmitter<any> = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    public user: User,
  ) {}

  pressPosition = null;
  pressTimer = null;

  resetTouch() {
    clearTimeout(this.pressTimer);
    this.pressPosition = null;
    this.pressTimer = null;
  }

  handleTouchStart(story: Story, event: TouchEvent) {
    this.resetTouch();
    if (event.touches.length !== 1) return;

    this.pressPosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    this.pressTimer = setTimeout(() => {
      this.openStoryDetail(story);
    }, 650);
  }

  handleTouchMove(story: Story, event: TouchEvent) {
    if (event.touches.length !== 1 || !this.pressPosition) return;
    const allowedMove = 30;

    if (
      Math.abs(event.touches[0].clientX - this.pressPosition.x) > allowedMove ||
      Math.abs(event.touches[0].clientY - this.pressPosition.y) > allowedMove
    ) {
      this.resetTouch();
    }
  }

  handleTouchEnd(story: Story, event: TouchEvent) {
    this.resetTouch();
  }

  handleClick(story: Story, event) {
    this.resetTouch();
    this.openStory(story);
  }

  openStory(story: Story) {
    const minSizeForLoader = 35;

    let loader;
    if (story.length > minSizeForLoader) {
      loader = this.loadingCtrl.create({ spinner: 'crescent' });
      loader.present();
    }

    setTimeout(
      () => {
        this.navCtrl.push('StoryViewPage', {
          story,
          loader,
        });
      },
      story.length > minSizeForLoader ? 100 : 0,
    );
  }

  openStoryDetail(story: Story) {
    this.navCtrl.push('StoryDetailPage', {
      story,
    });
  }

  showAuthor(author: Author, event) {
    event.stopPropagation();
    this.navCtrl.push('AuthorPage', {
      author,
    });
  }

  openListPicker(story: Story, ev: UIEvent) {
    ev.stopPropagation();
    const popover = this.popoverCtrl.create('BookmarkPopover', {
      story,
    });

    popover.present({
      ev,
    });
  }

  delete(story: Story, slidingItem: any) {
    slidingItem.close();
    this.onDeleteBySwiping.emit(story);
  }

  download(story: Story, slidingItem: any) {
    slidingItem.close();
    this.onDownloadBySwiping.emit(story);
  }
}
