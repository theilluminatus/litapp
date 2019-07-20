import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ExportPopover } from './export-popover';

@NgModule({
  declarations: [
    ExportPopover,
  ],
  imports: [
    IonicPageModule.forChild(ExportPopover),
    TranslateModule.forChild()
  ],
  entryComponents: [
    ExportPopover,
  ]
})
export class ExportPopoverModule {}
