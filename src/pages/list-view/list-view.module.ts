import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TooltipsModule } from 'ionic-tooltips';
import { TranslateModule } from '@ngx-translate/core';

import { ListViewPage } from './list-view';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';
import { ExportPopoverModule } from '../../parts/export-popover/export-popover.module';

@NgModule({
  declarations: [
    ListViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ListViewPage),
    TranslateModule.forChild(),
    TooltipsModule,
    StoryListPageModule,
    ExportPopoverModule
  ],
})
export class ListViewPageModule {}
