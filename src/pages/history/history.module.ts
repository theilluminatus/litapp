import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';
import { NgPipesModule } from 'ngx-pipes';

import { HistoryPage } from './history';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';
import { SortPopoverModule } from '../../parts/sort-popover/sort-popover.module';

@NgModule({
  declarations: [HistoryPage],
  imports: [
    IonicPageModule.forChild(HistoryPage),
    TranslateModule.forChild(),
    NgPipesModule,
    TooltipsModule,
    SortPopoverModule,
    StoryListPageModule,
  ],
})
export class HistoryPageModule {}
