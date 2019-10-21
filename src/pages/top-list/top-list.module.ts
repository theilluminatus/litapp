import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopListPage } from './top-list';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TopListPage],
  imports: [IonicPageModule.forChild(TopListPage), TranslateModule.forChild(), StoryListPageModule],
})
export class TopListPageModule {}
