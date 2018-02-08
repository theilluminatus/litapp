import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { StoryListPage } from './story-list';
import { BookmarkPopoverModule } from '../bookmark-popover/bookmark-popover.module';

@NgModule({
  declarations: [
    StoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryListPage),
    TranslateModule.forChild(),
    TooltipsModule,
    BookmarkPopoverModule
  ],
  exports: [
    StoryListPage
  ]
})
export class StoryListPageModule { }
