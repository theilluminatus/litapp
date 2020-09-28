import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SortPopover } from './sort-popover';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [SortPopover],
  imports: [IonicPageModule.forChild(SortPopover), TranslateModule.forChild(), NgPipesModule],
  entryComponents: [SortPopover],
})
export class SortPopoverModule {}
