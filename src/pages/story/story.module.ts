import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryPage } from './story';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryPage),
    TranslateModule.forChild()
  ],
  exports: [
    StoryPage
  ]
})
export class StoryPageModule { }
