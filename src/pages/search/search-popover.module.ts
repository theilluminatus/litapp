import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SearchPopover } from './search-popover';

@NgModule({
  declarations: [
    SearchPopover,
  ],
  imports: [
    IonicPageModule.forChild(SearchPopover),
    TranslateModule.forChild()
  ],
  entryComponents: [
    SearchPopover,
  ]
})
export class SearchPopoverModule {}