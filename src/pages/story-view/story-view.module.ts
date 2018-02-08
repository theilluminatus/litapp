import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { StoryViewPage } from './story-view';
import { StoryPopoverModule } from './popover.module';

@NgModule({
  declarations: [
    StoryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryViewPage),
    TranslateModule.forChild(),
    TooltipsModule,
    StoryPopoverModule
  ],
  exports: [
    StoryViewPage,
  ],
})
export class StoryViewPageModule { }
