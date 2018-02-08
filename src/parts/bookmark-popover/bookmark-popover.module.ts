import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { BookmarkPopover } from './bookmark-popover';

@NgModule({
  declarations: [
    BookmarkPopover,
  ],
  imports: [
    IonicPageModule.forChild(BookmarkPopover),
    TranslateModule.forChild(),
    TooltipsModule
  ],
  entryComponents: [
    BookmarkPopover,
  ]
})
export class BookmarkPopoverModule {}