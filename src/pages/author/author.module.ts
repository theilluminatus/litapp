import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { AuthorPage } from './author';
import { StoryListNormalPageModule } from '../../parts/story-list-normal/story-list-normal.module';

@NgModule({
  declarations: [AuthorPage],
  imports: [IonicPageModule.forChild(AuthorPage), TranslateModule.forChild(), TooltipsModule, StoryListNormalPageModule],
})
export class AuthorPageModule {}
