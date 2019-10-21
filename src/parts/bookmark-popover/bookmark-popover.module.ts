import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';
import { NgPipesModule } from 'ngx-pipes';

import { BookmarkPopover } from './bookmark-popover';

@NgModule({
  declarations: [BookmarkPopover],
  imports: [IonicPageModule.forChild(BookmarkPopover), TranslateModule.forChild(), TooltipsModule, NgPipesModule],
  entryComponents: [BookmarkPopover],
})
export class BookmarkPopoverModule {}
