import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Platform, Tabs, App, NavController } from 'ionic-angular';
import { User, UX, Feed, Settings } from '../../providers/providers';

@IonicPage({ priority: 'high' })
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = 'HistoryPage';
  tab2Root = 'ExplorePage';
  tab3Root = 'SearchPage';
  tab4Root = 'FeedPage';
  tab5Root = 'ListListPage';

  tab1Title = ' ';
  tab2Title = ' ';
  tab3Title = ' ';
  tab4Title = ' ';
  tab5Title = ' ';

  @ViewChild('tabs') tabs: Tabs;

  constructor(
    public platform: Platform,
    public app: App,
    public navCtrl: NavController,
    public translateService: TranslateService,
    public ux: UX,
    public user: User,
    public settings: Settings,
    public f: Feed,
  ) {
    this.platform.registerBackButtonAction(() => {
      this.ux.hideLoader();
      this.app.goBack();

      // code lets you return to history page before closing app, but doesnt work on search page for some reason
      // if ( this.app.getActiveNav().getActive()
      //   && this.app.getActiveNav() instanceof Tab
      //   && [this.tab2Root,this.tab3Root,this.tab4Root,this.tab5Root].indexOf(this.app.getActiveNav().getActive().name) > -1
      //   && (<Tab> this.app.getActiveNav()).root !== "HistoryPage") {

      //   this.tabs.select(0);
      // } else {
      //   this.app.goBack();
      // }
    });

    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE', 'TAB5_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
      this.tab4Title = values['TAB4_TITLE'];
      this.tab5Title = values['TAB5_TITLE'];
    });
  }

  ionViewDidEnter() {
    // TODO: Get an accurate statusbar size
    // used for immersive mode in the story-view component
    // const statusbarHeight = screen.height - this.platform.height() - 50; // 50px is height of navbar
    // this.tabs.getNativeElement().style.setProperty('--statusbar-height', `${statusbarHeight}px`);
  }
}
