import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListListPage } from './list-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListListPage),
    TranslateModule.forChild()
  ],
})
export class ListListPageModule {}
