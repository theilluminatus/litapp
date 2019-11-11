import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'sort-popover',
  template: `
    <ion-list radio-group [(ngModel)]="sortMethod">
      <ion-list-header>{{ 'HISTORY_SORT' | translate }}</ion-list-header>
      <ion-item>
        <ion-label>{{ 'DOWNLOADED' | translate }}</ion-label>
        <ion-radio value="-downloadtimestamp" (ionSelect)="save()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{ 'NEWEST' | translate }}</ion-label>
        <ion-radio value="-timestamp" (ionSelect)="save()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{ 'TITLE' | translate }}</ion-label>
        <ion-radio value="title" (ionSelect)="save()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{ 'AUTHOR' | translate }}</ion-label>
        <ion-radio value="author.name" (ionSelect)="save()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{ 'RATING' | translate }}</ion-label>
        <ion-radio value="-rating" (ionSelect)="save()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{ 'CATEGORY' | translate }}</ion-label>
        <ion-radio value="category" (ionSelect)="save()"></ion-radio>
      </ion-item>
    </ion-list>
  `,
})
export class SortPopover {
  sortMethod: string;

  constructor(navParams: NavParams, private viewCtrl: ViewController) {
    this.sortMethod = navParams.get('sortMethod');
  }

  save() {
    this.viewCtrl.dismiss(this.sortMethod);
  }
}
