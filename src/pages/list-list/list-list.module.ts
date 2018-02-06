import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListListPage } from './list-list';

@NgModule({
  declarations: [
    ListListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListListPage),
  ],
})
export class ListListPageModule {}
