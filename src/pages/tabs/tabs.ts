import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Platform, Tabs, Tab, App, NavController } from 'ionic-angular';
import { User, Api } from '../../providers/providers';
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

  backButtonListener;
  tabsub;

  @ViewChild('tabs') tabs: Tabs;

  constructor(
    public platform: Platform,
    public app: App,
    public navCtrl: NavController,
    public translateService: TranslateService,
    public api: Api,
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

  ionViewDidEnter() {
    this.tabsub = this.tabs.ionChange.subscribe((tab: Tab) => {
      if (this.backButtonListener) this.backButtonListener();
      if (tab.index > 0) {
        this.backButtonListener = this.platform.registerBackButtonAction(() => {
          let currentPageName = this.app.getActiveNav().getActive().name;
          if ([this.tab2Root,this.tab3Root,this.tab4Root,this.tab5Root].indexOf(currentPageName) > -1)
            this.tabs.select(0);
          else
            this.app.navPop();
        });
      }
    });
  }

  ionViewWillLeave() {
    if (this.backButtonListener) this.backButtonListener();
    if (this.tabsub) this.tabsub.unsubscribe();
  }
}
