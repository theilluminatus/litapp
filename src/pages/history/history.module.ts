import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
    TranslateModule.forChild()
  ],
})
export class HistoryPageModule {}
