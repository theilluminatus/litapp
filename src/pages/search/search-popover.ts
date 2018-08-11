import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'search-popover',
  template: `

    <ion-list radio-group [(ngModel)]="options.sort">
      <ion-list-header>{{'SEARCH_SORT' | translate}}</ion-list-header>

      <ion-item>
        <ion-label>{{'RELEVANCY' | translate}}</ion-label>
        <ion-radio value=""></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{'NEWEST' | translate}}</ion-label>
        <ion-radio value="date"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{'OLDEST' | translate}}</ion-label>
        <ion-radio value="date asc"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{'RATING' | translate}}</ion-label>
        <ion-radio value="vote"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>{{'NUMBEROFCOMMENTS' | translate}}</ion-label>
        <ion-radio value="views"></ion-radio>
      </ion-item>

    </ion-list>

    <ion-list>

    <ion-list-header>{{'SEARCH_ONLYTAG' | translate}}</ion-list-header>

    <ion-grid>
      <ion-row>
        
        <ion-col col-auto>
          <ion-item>
            <ion-checkbox [(ngModel)]="options.popular"></ion-checkbox>
            <ion-label>{{'HOT_TAG' | translate}}</ion-label>
          </ion-item>
        </ion-col>
        <ion-col col-auto>
          <ion-item>
            <ion-checkbox [(ngModel)]="options.editorsChoice"></ion-checkbox>
            <ion-label>{{'WRITER_TAG' | translate}}</ion-label>
          </ion-item>
        </ion-col>
        <ion-col col-auto>
          <ion-item>
            <ion-checkbox [(ngModel)]="options.winner"></ion-checkbox>
            <ion-label>{{'WINNER_TAG' | translate}}</ion-label>
          </ion-item>
        </ion-col>

      </ion-row>
    </ion-grid>

    <button ion-button (click)="save()">{{'SEARCH' | translate}}</button>

  `,
  styles: [`

    .list-header-md {
      border: none;
    }

    .list {
      margin-bottom: 10px;
      overflow-x: hidden;
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

    .grid {
      margin: 0 5px;
    }

    .grid .col {
      padding: 0;
    }

    .grid .item-md {
      padding-left: 0;
    }

    .grid .item-md .item-inner {
      padding-right: 0;
    }

    .grid .item-md .checkbox-md {
      margin: 0 5px 0 0;
    }

    .button {
      margin: 10px;
    }

  `]
})
export class SearchPopover {

  options;

  constructor(navParams: NavParams, private viewCtrl: ViewController) {
    this.options = navParams.get('options');
  }

  save() {
    this.viewCtrl.dismiss(true);
  }

}