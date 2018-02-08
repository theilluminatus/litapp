import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryDetailPage } from './story-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryDetailPage),
    TranslateModule.forChild(),
  ],
})
export class StoryDetailPageModule {}
