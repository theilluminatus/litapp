import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'search-popover',
  template: `

    <ion-list radio-group [(ngModel)]="method" (ionChange)="changeSort(method)">
      <ion-list-header>{{'SEARCH_SORT' | translate}}</ion-list-header>

      <ion-item>
        <ion-label>{{'RELEVANCY' | translate}}</ion-label>
        <ion-radio value="relevancy"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{'NEWEST' | translate}}</ion-label>
        <ion-radio value="newest"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{'OLDEST' | translate}}</ion-label>
        <ion-radio value="oldest"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{'RATING' | translate}}</ion-label>
        <ion-radio value="rating"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{'NUMBEROFCOMMENTS' | translate}}</ion-label>
        <ion-radio value="numberofcomments"></ion-radio>
      </ion-item>

    </ion-list>

  `,
  styles: [`

    search-popover {

      .list {
        margin-bottom: 10px;
      }

      .item-inner {
        border: none;
      }

      .list-md .item-block .item-inner {
        border-color: #666;
      }

      .tags {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .list .item .label p {
        white-space: normal;
      }

    }
    
  `]
})
export class SearchPopover {

  method: string;
  firstsinceopen = true;

  constructor(navParams: NavParams, private viewCtrl: ViewController) {
    this.method = navParams.get('method');
  }

  changeSort(method: string) {
    if (method && !this.firstsinceopen)
      this.viewCtrl.dismiss(method);
    this.firstsinceopen = false;
  }

}