import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BrowserTab } from '@ionic-native/browser-tab';
import { File } from '@ionic-native/file';

import { Story } from '../../models/story';
import { Author } from '../../models/author';
import { Stories, Globals, Api } from '../../providers/providers';
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
    private socialSharing: SocialSharing,
    private browser: BrowserTab,
    public file: File,
    public api: Api
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
    console.log(this.story.url);
  }

  export() {
    const filename = "litapp-story-"+this.story.url+"-"+Math.round(new Date().getTime() / 1000)+".html";
    const data = `
<html>
<body>
  <h1>
    <a href="https://www.literotica.com/s/${this.story.url}">${this.story.title}</a>
    (by <a href="https://www.literotica.com/stories/memberpage.php?uid=${this.story.author.id}">${this.story.author.name})</a>
  </h1>

  <ul>
    <li>Category: ${this.story.category} (Tags: [${this.story.tags.join(", ")}])</li>
    <li>Rating: ${this.story.rating} (${this.story.viewcount} views)</li>
    <li>${this.story.length} pages</li>
    <li>Timestamp: ${new Date(parseInt(this.story.timestamp)*1000).toISOString()}</li>
  </ul>

  <article>

    ${this.story.content.join('<br><hr><br>')}

  </article>

</body>
</html>
  `;

    const path = this.file.externalRootDirectory;
    this.file.writeFile(path, filename, data, {replace: true}).then(() => {
      this.translate.get(['SETTINGS_EXPORTSUCCESS']).subscribe(values => {
        this.api.showToast(values.SETTINGS_EXPORTSUCCESS+": "+path+filename);
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  toggleDownload() {
    if (this.story.downloaded)
      this.stories.undownload(this.story);
    else
      this.stories.download(this.story);
  }

  // updates only part of story
  refreshStory() {
    this.stories.getById(this.story.id, true).subscribe((story) => {
      this.updateValues(story);
      this.myrating = this.story.myrating;
      this.stories.cache(this.story);
    });
  }

  openLink() {
    this.browser.openUrl(this.story.url);
    console.log(this.story.url);
  }

  // quick and dirty fix
  private updateValues(fields) {
    for (const f in this.story) {
      if (fields[f] !== undefined) {
        // @ts-ignore
        this.story[f] = fields[f];
      }
    }
  }
}
