import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Categories } from '../../providers/providers';
import { Category } from '../../models/category';

@IonicPage()
@Component({
  selector: 'search-popover',
  template: `
    <!--<h5>{{ 'SEARCH_OPTIONS' | translate }}</h5>-->

    <ion-list radio-group [(ngModel)]="options.sort">
      <ion-list-header>{{ 'SEARCH_SORT' | translate }}</ion-list-header>

      <ng-container *ngIf="!options.astags; else tagsSort">
        <ion-item>
          <ion-label>{{ 'RELEVANCY' | translate }}</ion-label>
          <ion-radio value=""></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{ 'NEWEST' | translate }}</ion-label>
          <ion-radio value="date"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{ 'OLDEST' | translate }}</ion-label>
          <ion-radio value="date asc"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{ 'RATING' | translate }}</ion-label>
          <ion-radio value="vote"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{ 'NUMBEROFCOMMENTS' | translate }}</ion-label>
          <ion-radio value="comments"></ion-radio>
        </ion-item>
      </ng-container>

      <ng-template #tagsSort>
        <ion-item>
          <ion-label>{{ 'VIEWCOUNT' | translate }}</ion-label>
          <ion-radio value="views"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{ 'RATING' | translate }}</ion-label>
          <ion-radio value="rating"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{ 'NUMBEROFFAVORITES' | translate }}</ion-label>
          <ion-radio value="favorite"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{ 'NEWEST' | translate }}</ion-label>
          <ion-radio value="newest"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{ 'OLDEST' | translate }}</ion-label>
          <ion-radio value=""></ion-radio>
        </ion-item>
      </ng-template>
    </ion-list>

    <ion-list-header>{{ 'SEARCH_ONLYSPECIAL' | translate }}</ion-list-header>

    <ion-grid>
      <ion-row>
        <ion-col col-auto>
          <ion-item>
            <ion-checkbox [(ngModel)]="options.popular"></ion-checkbox>
            <ion-label>{{ 'HOT_TAG' | translate }}</ion-label>
          </ion-item>
        </ion-col>
        <ion-col col-auto>
          <ion-item>
            <ion-checkbox [(ngModel)]="options.editorsChoice"></ion-checkbox>
            <ion-label>{{ 'WRITER_TAG' | translate }}</ion-label>
          </ion-item>
        </ion-col>
        <ion-col col-auto>
          <ion-item>
            <ion-checkbox [(ngModel)]="options.winner"></ion-checkbox>
            <ion-label>{{ 'WINNER_TAG' | translate }}</ion-label>
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-item>
      <ion-label>{{ 'SEARCH_CATEGORY' | translate }}</ion-label>
      <ion-select [(ngModel)]="options.category" [multiple]="!options.astags">
        <ion-option value="" *ngIf="options.astags">{{ 'SEARCH_ANYCAT' | translate }}</ion-option>
        <ion-option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</ion-option>
      </ion-select>
    </ion-item>

    <ion-item>
      <ion-checkbox [(ngModel)]="options.astags" (click)="changeDefaultSort()"></ion-checkbox>
      <ion-label>{{ 'SEARCH_TAGS' | translate }}</ion-label>
    </ion-item>

    <button ion-button (click)="save()">{{ 'SEARCH' | translate }}</button>
  `,
  styles: [
    `
      h5 {
        margin: 15px 15px 5px 15px;
      }

      .list-header-md {
        border: none;
      }

      .list {
        margin-bottom: 10px;
        overflow-x: hidden;
      }

      ::ng-deep search-popover .item-inner {
        border: none !important;
      }

      .list-md .item-block .item-inner {
        border-color: #666;
      }

      .item-checkbox {
        padding-left: 10px;
      }

      .checkbox {
        margin-right: 8px !important;
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
        padding: 0 15px 0 15px;
        font-size: 0.8em;
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

      .grid .label {
        font-size: 0.8em;
      }

      .select {
        margin: 10px 0;
      }

      .button {
        margin: 15px 10px;
      }
    `,
  ],
})
export class SearchPopover {
  options;
  categories;

  constructor(navParams: NavParams, private viewCtrl: ViewController, public c: Categories) {
    this.options = navParams.get('options');
    this.c.getAllSorted().subscribe((cats: Category[]) => {
      this.categories = cats;
    });
  }

  save() {
    this.viewCtrl.dismiss(true);
  }

  changeDefaultSort() {
    this.options.sort = this.options.astags ? 'views' : '';
    this.options.category = this.options.astags ? '' : [];
  }
}
