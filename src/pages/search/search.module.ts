import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { SearchPage } from './search';
import { SearchPopoverModule } from './search-popover.module';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    TranslateModule.forChild(),
    TooltipsModule,
    SearchPopoverModule,
    StoryListPageModule
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule { }
