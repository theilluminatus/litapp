import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';

import { ExplorePage } from './explore';

@NgModule({
  declarations: [
    ExplorePage,
  ],
  imports: [
    IonicPageModule.forChild(ExplorePage),
    TranslateModule.forChild(),
    NgPipesModule
  ],
  exports: [
    ExplorePage
  ]
})
export class ExplorePageModule { }
