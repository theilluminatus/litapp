import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Globals, Categories } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../../models/category';

@IonicPage({ priority: 'high' })
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  groupedCats: Category[][];
  popularTags: any = [];
  foldCats = true;
  foldTags = true;

  constructor(
    public translate: TranslateService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public g: Globals,
    public c: Categories,
  ) {
    this.c.getAllSortedGrouped().subscribe((cats: Category[][]) => {
      this.groupedCats = cats;
    });

    this.g.onReady().then(() => {
      this.g.getPopularTags().subscribe(tags => {
        if (tags) {
          this.popularTags = tags;
        }
      });
    });
  }

  openCategory(cat: Category, sortOrder: string) {
    this.navCtrl.push('TopListPage', {
      category: cat,
      order: sortOrder,
    });
  }

  openTag(tag) {
    this.navCtrl.push('SearchPage', {
      query: tag,
    });
  }
}
