import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SearchPage } from './search';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    TranslateModule.forChild(),
    StoryListPageModule
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule { }
