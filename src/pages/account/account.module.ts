import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AccountPage } from './account';

@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
    TranslateModule.forChild()
  ],
  exports: [
    AccountPage
  ]
})
export class AccountPageModule { }
