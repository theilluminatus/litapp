import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListCreatePage } from './list-create';

@NgModule({
  declarations: [
    ListCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ListCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListCreatePage
  ]
})
export class ListCreatePageModule { }
