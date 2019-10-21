import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { HistoryPage } from './history';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';

@NgModule({
  declarations: [HistoryPage],
  imports: [IonicPageModule.forChild(HistoryPage), TranslateModule.forChild(), TooltipsModule, StoryListPageModule],
})
export class HistoryPageModule {}
