import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { Globals } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({priority: 'high'})
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {

  categories = [];
  popularTags: any = []
  foldCats = true;
  foldTags = true;

  constructor(
    public translate: TranslateService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public g: Globals
  ) {
    this.translate.get(['EXPLORE_ALLCAT','EXPLORE_ALLCATDESCR']).subscribe(values => {
      this.g.onReady().then(() => {
        this.categories = this.g.getCategories();
        this.categories.unshift({ id: 0, name: values.EXPLORE_ALLCAT });
  
        this.g.getPopularTags().subscribe((tags) => {
          if (tags)
            this.popularTags = tags;
        })
      });
    });
  }

  openCategory(cat, order="top") {
    this.navCtrl.push('TopListPage', {
      category: cat,
      order: order
    });
  }

  openTag(tag) {
    this.navCtrl.push('SearchPage', {
      query: tag
    });
  }

}
