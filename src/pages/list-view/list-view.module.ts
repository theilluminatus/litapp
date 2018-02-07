import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListViewPage } from './list-view';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ListViewPage),
    TranslateModule.forChild(),
    StoryListPageModule
  ],
})
export class ListViewPageModule {}
