import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryPage } from './story';
import { StoryPopoverModule } from './popover.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryPage),
    TranslateModule.forChild(),
    StoryPopoverModule
  ],
  exports: [
    StoryPage,
  ],
})
export class StoryPageModule { }
