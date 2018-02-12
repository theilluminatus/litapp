import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Platform, Tabs } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Feed } from '../../providers/providers';

@IonicPage({priority: 'high'})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HistoryPage';
  tab2Root = 'TopCatPage';
  tab3Root = 'SearchPage';
  tab4Root = 'FeedPage';
  tab5Root = 'ListListPage';

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";

  @ViewChild('tabs') tabs: Tabs;

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService,
    public platform: Platform,
    public user: User,
    public f: Feed
  ) {

    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE', 'TAB5_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
      this.tab4Title = values['TAB4_TITLE'];
      this.tab5Title = values['TAB5_TITLE'];
    });

  }
}
