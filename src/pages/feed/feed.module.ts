import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { StoryListItemModule } from '../../parts/story-list-item/story-list-item.module';
import { FeedPage } from './feed';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    TranslateModule.forChild(),
    StoryListItemModule,
    TooltipsModule
  ],
})
export class FeedPageModule {}
