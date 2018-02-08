import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryRelatedPage } from './story-related';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StoryRelatedPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryRelatedPage),
    TranslateModule.forChild(),
    StoryListPageModule
  ],
})
export class StoryRelatedPageModule {}
