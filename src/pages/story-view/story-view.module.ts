import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { StoryViewPage } from './story-view';
import { StoryPopoverModule } from './story-popover.module';
import { BookmarkPopoverModule } from '../../parts/bookmark-popover/bookmark-popover.module';

@NgModule({
  declarations: [
    StoryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryViewPage),
    TranslateModule.forChild(),
    TooltipsModule,
    StoryPopoverModule,
    BookmarkPopoverModule
  ],
  exports: [
    StoryViewPage,
  ],
})
export class StoryViewPageModule { }
