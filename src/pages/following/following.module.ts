import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowingPage } from './following';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    FollowingPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowingPage),
    TranslateModule.forChild(),
    TooltipsModule
  ],
})
export class FollowingPageModule {}
