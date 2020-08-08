import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { UpdatePopover } from './update-popover';

@NgModule({
  declarations: [UpdatePopover],
  imports: [IonicPageModule.forChild(UpdatePopover), TranslateModule.forChild()],
  entryComponents: [UpdatePopover],
})
export class UpdatePopoverModule {}
