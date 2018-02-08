import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { StoryListPage } from './story-list';

@NgModule({
  declarations: [
    StoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryListPage),
    TranslateModule.forChild(),
    TooltipsModule
  ],
  exports: [
    StoryListPage
  ]
})
export class StoryListPageModule { }
