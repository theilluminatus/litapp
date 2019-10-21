import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SearchPopover } from './search-popover';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [SearchPopover],
  imports: [IonicPageModule.forChild(SearchPopover), TranslateModule.forChild(), NgPipesModule],
  entryComponents: [SearchPopover],
})
export class SearchPopoverModule {}
