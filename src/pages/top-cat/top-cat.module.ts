import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';

import { TopCatPage } from './top-cat';

@NgModule({
  declarations: [
    TopCatPage,
  ],
  imports: [
    IonicPageModule.forChild(TopCatPage),
    TranslateModule.forChild(),
    NgPipesModule
  ],
  exports: [
    TopCatPage
  ]
})
export class TopCatPageModule { }
