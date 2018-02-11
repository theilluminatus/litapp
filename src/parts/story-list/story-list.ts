import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { Story } from '../../models/story';
import { Author } from '../../models/author';

@Component({
  selector: 'story-list',
  templateUrl: 'story-list.html'
})
export class StoryListPage {

  Math: Math = Math;
  
  @Input() stories: Story[];
  @Input() ishistory: boolean = false;
  @Input() infinite: boolean = false;
  @Output() onDeleteBySwiping: EventEmitter<any> = new EventEmitter();
  @Output() ionInfinite: EventEmitter<any> = new EventEmitter();

  enableInfinite = true;

  constructor(
    public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    public user: User
  ) { }

  showHeaders(record, recordIndex, records) {
    if (this.ishistory) return null;
    let pagesize = 10;
    if (recordIndex % pagesize === 0 && recordIndex > 0) {
      let page = Math.round(recordIndex / pagesize);
      return (page+1) +" ("+ (page*pagesize+1) + " - "+ ((page+1)*pagesize) +")";
    }
    return null;
  }

  public enableInfinity() {
    this.enableInfinite = true;
  }

  pressTimer;
  handlePress(story: Story, event) {
    clearTimeout(this.pressTimer);
    this.pressTimer = setTimeout(() => {
      this.openStoryDetail(story);
    }, 1000)
  }

  handleClick(story: Story, event) {
    clearTimeout(this.pressTimer);
    this.openStory(story);
  }

  loadMore($event) {
    if (this.infinite)
      this.ionInfinite.emit($event);
  }

  openStory(story: Story) {
    if (story.downloaded && !this.ishistory)
      story.currentpage = null;
    this.navCtrl.push('StoryViewPage', {
      story: story
    });
  }

  openStoryDetail(story: Story) {
    this.navCtrl.push('StoryDetailPage', {
      story: story
    });
  }

  showAuthor(author: Author, event) {
    event.stopPropagation();
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

  openListPicker(story: Story, ev: UIEvent) {
    ev.stopPropagation();
    let popover = this.popoverCtrl.create("BookmarkPopover", {
      story: story
    });

    popover.present({
      ev: ev
    });
  }

  delete(story: Story, slidingItem: any) {
    slidingItem.close();
    this.onDeleteBySwiping.emit(story);
  }
}
