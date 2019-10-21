import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { StoryListNormalPage } from './story-list-normal';
import { StoryListItemModule } from '../story-list-item/story-list-item.module';
import { BookmarkPopoverModule } from '../bookmark-popover/bookmark-popover.module';

@NgModule({
  declarations: [StoryListNormalPage],
  imports: [
    IonicPageModule.forChild(StoryListNormalPage),
    TranslateModule.forChild(),
    TooltipsModule,
    StoryListItemModule,
    BookmarkPopoverModule,
  ],
  exports: [StoryListNormalPage],
})
export class StoryListNormalPageModule {}
