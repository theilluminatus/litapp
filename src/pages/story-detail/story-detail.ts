import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Story } from '../../models/story';
import { Author } from '../../models/author';
import { Stories, Globals } from '../../providers/providers';
import { User } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({priority: 'low'})
@Component({
  selector: 'page-story-detail',
  templateUrl: 'story-detail.html',
})
export class StoryDetailPage {

  story: Story;
  myrating: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    public translate: TranslateService,
    public g: Globals,
    public stories: Stories,
    public user: User,
    private socialSharing: SocialSharing
  ) {
  	this.story = navParams.get('story');

    // load data when directly view details
    if (!this.story.cached) {
      this.stories.getById(this.story.id).subscribe((story) => {
        if (!story) {
          this.navCtrl.pop();
          return;
        }

        this.myrating = story.myrating;

        // add details & content to db
        this.story.series = story.series;
        this.story.length = story.length;
        this.story.lang = story.lang;
      });
    }
  }

  showAuthor(author: Author) {
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

  showSeries() {
    this.navCtrl.push('StorySeriesPage', {
      story: this.story
    });
  }

  showRelated() {
    this.navCtrl.push('StoryRelatedPage', {
      story: this.story
    });
  }

  rate(event) {
    event.preventDefault();
    this.stories.rate(this.story, this.myrating);
  }

  search(query: string) {
    this.navCtrl.push("SearchPage", {
      query: query
    });
  }

  category(query: string) {


    this.translate.get(['STORYDETAIL_VIEWCAT','TOP', 'NEW']).subscribe(values => {

      let alert = this.alertCtrl.create({
        title: values.STORYDETAIL_VIEWCAT,
        buttons: [{
          text: values.TOP,
          handler: (d) => {
            this.openCategoryListPage("top", query);
          }
        }, {
          text: values.NEW,
          handler: (d) => {
            this.openCategoryListPage("new", query);
          }
        }]
      });
      alert.present();

    });

  }

  openCategoryListPage(order: string, categoryName: string) {
    this.g.onReady().then(() => {
      let category = this.g.getCategories().find(c => c.name == categoryName);
      this.navCtrl.push('TopListPage', {
        category: category,
        order: order
      });
    });
  }

  openListPicker(ev: UIEvent) {
    let popover = this.popoverCtrl.create("BookmarkPopover", {
      story: this.story
    });

    popover.present({
      ev: ev
    });
  }

  share() {
    this.socialSharing.share(null, null, null, this.story.url);
  }

  toggleDownload() {
    if (this.story.downloaded)
      this.stories.undownload(this.story);
    else
      this.stories.download(this.story);
  }

}
