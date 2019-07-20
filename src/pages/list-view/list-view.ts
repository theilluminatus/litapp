import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';

import { Story } from '../../models/story';
import { List } from '../../models/list';
import { Lists, Api } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListViewPage {

  list: List;
  stories: Story[];
  translations;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public l: Lists,
    private popoverCtrl: PopoverController,
    public translate: TranslateService,
    public file: File,
    public api: Api,
  ) {
  	let list = navParams.get('list');
  	this.l.onReady().then(() => {
	  	this.l.getById(list.urlname).subscribe(data => {
	      this.list = data;
        this.stories = this.list.stories;
	    });
    });

    this.translate.get(['SETTINGS_EXPORTSUCCESS']).subscribe((values) => {
      this.translations = values;
    });
  }

  filter(event: any) {
    if (!event.data || event.data == null) {
      this.stories = this.list.stories;
      return;
    }

    let query = event.target.value.toLowerCase();

    this.stories = this.list.stories.filter((story: Story) => {
      if (story.title.toLowerCase().indexOf(query) > -1) return true;
      if (story.description.toLowerCase().indexOf(query) > -1) return true;
      if (story.category.toLowerCase().indexOf(query) > -1) return true;
      if (story.author.name.toLowerCase().indexOf(query) > -1) return true;

      let matchingTags = story.tags.filter((tag) => {
        if (tag.toLowerCase().indexOf(query) > -1) return true;
        return false;
      });
      if (matchingTags.length > 0) return true;

      return false;
    });

  }

  openExportPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create("ExportPopover");

    popover.present({
      ev: ev
    });

    popover.onDidDismiss((choice: string) => {
      if (choice) {
        let data = null;
        let filename = "litapp-"+this.list.urlname+"-"+Math.round(new Date().getTime() / 1000);

        if (choice == 'json') {
          filename += ".json";
          data = JSON.stringify(this.list);
        } else if (choice == 'markdown') {
          filename += ".md";
          // converting to markdown
          data = `
# List: ${this.list.name} (ID: ${this.list.id})
> ${this.list.description}
- Created at: ${this.list.createtimestamp}
- Public: ${this.list.visibility}
- Amount of stories: ${this.list.size}

`;

          this.list.stories.forEach(s => {
            data += `
## [${s.title}](https://literotica.com/s/${s.url}) (by ${s.author.name})
> ${s.description}
- Created at: ${s.timestamp}
- Category: ${s.category}
- Rating: ${s.rating} (${s.viewcount} views)

`;
          });
        }

        let path = this.file.externalRootDirectory;
        this.file.writeFile(path, filename, data, {replace: true}).then(() => {
          this.api.showToast(this.translations.SETTINGS_EXPORTSUCCESS+": "+path+filename);
        }).catch((err) => {
          console.error(err);
        });

      }
    });
  }

}
