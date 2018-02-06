import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
    TranslateModule.forChild(),
    StoryListPageModule
  ],
})
export class HistoryPageModule {}
