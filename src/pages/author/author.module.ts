import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { AuthorPage } from './author';
import { StoryListPageModule } from '../../parts/story-list/story-list.module';

@NgModule({
  declarations: [
    AuthorPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorPage),
    TranslateModule.forChild(),
    TooltipsModule,
    StoryListPageModule
  ],
})
export class AuthorPageModule {}
