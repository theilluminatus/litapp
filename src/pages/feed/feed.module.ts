import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    TranslateModule.forChild()
  ],
})
export class FeedPageModule {}
