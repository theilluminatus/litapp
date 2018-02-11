import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { Story } from '../../models/story';

@Component({
  selector: 'story-list-normal',
  templateUrl: 'story-list-normal.html'
})
export class StoryListNormalPage {

  Math: Math = Math;
  
  @Input() stories: Story[];
  @Input() ishistory: boolean = false;
  @Input() infinite: boolean = false;
  @Output() onDeleteBySwiping: EventEmitter<any> = new EventEmitter();
  @Output() ionInfinite: EventEmitter<any> = new EventEmitter();

  enableInfinite = true;

  constructor(public navCtrl: NavController) { }

  public enableInfinity() {
    this.enableInfinite = true;
  }

  loadMore($event) {
    if (this.infinite)
      this.ionInfinite.emit($event);
  }

}
