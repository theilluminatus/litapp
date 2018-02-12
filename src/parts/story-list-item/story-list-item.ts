import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { Story } from '../../models/story';
import { Author } from '../../models/author';

@Component({
  selector: 'story-list-item',
  templateUrl: 'story-list-item.html'
})
export class StoryListItem {

  Math: Math = Math;
  
  @Input() story: Story;
  @Input() ishistory: boolean = false;
  @Output() onDeleteBySwiping: EventEmitter<any> = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    public user: User
  ) { }

  pressTimer;
  handlePress(story: Story, event) {
    clearTimeout(this.pressTimer);
    this.pressTimer = setTimeout(() => {
      this.openStoryDetail(story);
    }, 750)
  }

  handleClick(story: Story, event) {
    clearTimeout(this.pressTimer);
    this.openStory(story);
  }

  openStory(story: Story) {
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
