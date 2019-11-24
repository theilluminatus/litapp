import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowingPage } from './following';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';
import { NgPipesModule } from 'ngx-pipes';
import { ExportPopoverModule } from '../../parts/export-popover/export-popover.module';

@NgModule({
  declarations: [FollowingPage],
  imports: [IonicPageModule.forChild(FollowingPage), TranslateModule.forChild(), TooltipsModule, NgPipesModule, ExportPopoverModule],
})
export class FollowingPageModule {}
