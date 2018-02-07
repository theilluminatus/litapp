import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorPage } from './author';

@NgModule({
  declarations: [
    AuthorPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorPage),
  ],
})
export class AuthorPageModule {}
