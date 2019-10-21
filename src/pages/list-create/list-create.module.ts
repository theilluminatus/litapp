import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

import { ListCreatePage } from './list-create';

@NgModule({
  declarations: [ListCreatePage],
  imports: [IonicPageModule.forChild(ListCreatePage), TranslateModule.forChild(), TooltipsModule],
  exports: [ListCreatePage],
})
export class ListCreatePageModule {}
