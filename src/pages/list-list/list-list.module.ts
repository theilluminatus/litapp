import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';
import { NgPipesModule } from 'ngx-pipes';

import { ListListPage } from './list-list';

@NgModule({
  declarations: [ListListPage],
  imports: [IonicPageModule.forChild(ListListPage), TranslateModule.forChild(), TooltipsModule, NgPipesModule],
})
export class ListListPageModule {}
