import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { ListListPage } from './list-list';

@NgModule({
  declarations: [
    ListListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListListPage),
    TranslateModule.forChild(),
    TooltipsModule
  ],
})
export class ListListPageModule {}
