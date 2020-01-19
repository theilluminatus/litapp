import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BrowserTab } from '@ionic-native/browser-tab';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';

import { Story } from '../../models/story';
import { Author } from '../../models/author';
import { Stories, UX, Settings, User, Categories } from '../../providers/providers';
import { handleNoCordovaError } from '../../app/utils';
import { Category } from '../../models/category';

@IonicPage({ priority: 'low' })
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
    public c: Categories,
    public stories: Stories,
    public settings: Settings,
    public user: User,
    private socialSharing: SocialSharing,
    private browser: BrowserTab,
    public file: File,
    public ux: UX,
  ) {
    this.story = navParams.get('story');

    // load data when directly view details
    if (!this.story.cached) {
      this.stories.getById(this.story.id).subscribe(story => {
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
    if (this.settings.allSettings.offlineMode) return;
    this.navCtrl.push('AuthorPage', {
      author,
    });
  }

  showSeries() {
    this.navCtrl.push('StorySeriesPage', {
      story: this.story,
    });
  }

  showRelated() {
    this.navCtrl.push('StoryRelatedPage', {
      story: this.story,
    });
  }

  rate(event) {
    event.preventDefault();
    this.stories.rate(this.story, this.myrating);
  }

  search(query: string | number) {
    if (this.settings.allSettings.offlineMode) return;
    this.navCtrl.push('SearchPage', {
      query,
    });
  }

  category(story: Story) {
    if (this.settings.allSettings.offlineMode) return;
    this.translate.get(['STORYDETAIL_VIEWCAT', 'TOP', 'NEW']).subscribe(values => {
      const alert = this.alertCtrl.create({
        title: values.STORYDETAIL_VIEWCAT,
        buttons: [
          {
            text: values.TOP,
            handler: d => {
              this.openCategoryListPage(story, 'top');
            },
          },
          {
            text: values.NEW,
            handler: d => {
              this.openCategoryListPage(story as any, 'new');
            },
          },
        ],
      });
      alert.present();
    });
  }

  openCategoryListPage(story: Story, sortOrder: string) {
    this.c.getClosestCategory((story.categoryID || story.category).toString()).subscribe((cat: Category) => {
      this.navCtrl.push('TopListPage', {
        category: cat,
        order: sortOrder,
      });
    });
  }

  openListPicker(ev: UIEvent) {
    const popover = this.popoverCtrl.create('BookmarkPopover', {
      story: this.story,
    });

    popover.present({
      ev,
    });
  }

  share() {
    this.socialSharing.share(null, null, null, this.story.url).catch(err =>
      handleNoCordovaError(err, () => {
        this.translate.get('COPYPROMPT_MSG').subscribe(label => prompt(label, this.story.url));
      }),
    );
  }

  export() {
    // tslint:disable-next-line: prefer-template
    const filename = 'litapp-story-' + this.story.url + '-' + Math.round(new Date().getTime() / 1000) + '.html';
    const data = `
<html>
<body>
  <h1>
    <a href="https://www.literotica.com/s/${this.story.url}">${this.story.title}</a>
    (by <a href="https://www.literotica.com/stories/memberpage.php?uid=${this.story.author.id}">${this.story.author.name})</a>
  </h1>

  <ul>
    <li>Category: ${this.story.category} (Tags: [${this.story.tags.join(', ')}])</li>
    <li>Rating: ${this.story.rating} (${this.story.viewcount} views)</li>
    <li>${this.story.length} pages</li>
    <li>Timestamp: ${new Date(parseInt(this.story.timestamp) * 1000).toISOString()}</li>
  </ul>

  <article>

    ${this.story.content.join('<br><hr><br>')}

  </article>

</body>
</html>
  `;

    const path = this.file.externalRootDirectory;
    this.file
      .writeFile(path, filename, data, { replace: true })
      .then(() => {
        this.translate.get(['SETTINGS_EXPORTSUCCESS']).subscribe(values => {
          this.ux.showToast('INFO', `${values.SETTINGS_EXPORTSUCCESS}: ${path}${filename}`);
        });
      })
      .catch(err =>
        handleNoCordovaError(err, () => {
          this.translate.get('COPYPROMPT_MSG').subscribe(label => prompt(label, data));
        }),
      );
  }

  toggleDownload() {
    if (this.story.downloaded) {
      this.stories.undownload(this.story);
    } else {
      this.stories.download(this.story);
    }
  }

  // updates only part of story
  refreshStory() {
    this.stories.getById(this.story.id, true).subscribe(story => {
      this.updateValues(story);
      this.myrating = this.story.myrating;
      this.stories.cache(this.story);
    });
  }

  openLink() {
    this.browser.openUrl(this.story.url).catch(err => handleNoCordovaError(err, () => window.open(this.story.url)));
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
