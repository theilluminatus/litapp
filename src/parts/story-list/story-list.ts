import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    }, 500)
  }

  handleClick(story: Story, event) {
    clearTimeout(this.pressTimer);
    this.openStory(story);
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

  delete(story: Story) {
    this.onDeleteBySwiping.emit(story);
  }
}
