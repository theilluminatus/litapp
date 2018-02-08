import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { StoryPage } from './story';
import { StoryPopoverModule } from './popover.module';

@NgModule({
  declarations: [
    StoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryPage),
    TranslateModule.forChild(),
    TooltipsModule,
    StoryPopoverModule
  ],
  exports: [
    StoryPage,
  ],
})
export class StoryPageModule { }
