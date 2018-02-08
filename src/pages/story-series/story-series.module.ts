import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorySeriesPage } from './story-series';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StorySeriesPage,
  ],
  imports: [
    IonicPageModule.forChild(StorySeriesPage),
    TranslateModule.forChild(),
    StoryListPageModule
  ],
})
export class StorySeriesPageModule {}
