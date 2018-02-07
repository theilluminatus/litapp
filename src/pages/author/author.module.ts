import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorPage } from './author';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AuthorPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorPage),
    TranslateModule.forChild(),
    StoryListPageModule
  ],
})
export class AuthorPageModule {}
