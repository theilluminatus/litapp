import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Story } from '../../models/story';
import { Settings } from '../../providers/providers';

@Component({
  selector: 'story-list',
  templateUrl: 'story-list.html',
})
export class StoryListPage {
  Math: Math = Math;

  @Input() stories: Story[];
  @Input() ishistory: boolean = false;
  @Input() infinite: boolean = false;
  @Output() onDeleteBySwiping: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadBySwiping: EventEmitter<any> = new EventEmitter();
  @Output() ionInfinite: EventEmitter<any> = new EventEmitter();

  enableInfinite = true;

  constructor(public navCtrl: NavController, public settings: Settings) {}

  showHeaders(record, recordIndex, records) {
    const pagesize = 10;
    if (!this.ishistory && recordIndex % pagesize === 0 && recordIndex > 0) {
      const page = Math.round(recordIndex / pagesize);
      return `${page + 1} (${page * pagesize + 1} - ${(page + 1) * pagesize})`;
    }
    return null;
  }

  public enableInfinity() {
    this.enableInfinite = true;
  }

  loadMore($event) {
    if (this.infinite) {
      this.ionInfinite.emit($event);
    }
  }
}
