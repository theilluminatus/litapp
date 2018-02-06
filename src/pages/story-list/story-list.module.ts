import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { StoryListPage } from './list-master';

@NgModule({
  declarations: [
    StoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryListPage),
    TranslateModule.forChild()
  ],
  exports: [
    StoryListPage
  ]
})
export class StoryListPageModule { }
