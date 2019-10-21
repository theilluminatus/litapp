import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { StoryPopover } from './story-popover';

@NgModule({
  declarations: [StoryPopover],
  imports: [IonicPageModule.forChild(StoryPopover)],
  entryComponents: [StoryPopover],
})
export class StoryPopoverModule {}
