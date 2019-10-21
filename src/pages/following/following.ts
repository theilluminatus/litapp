import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';

import { Author } from '../../models/author';
import { Authors, Api } from '../../providers/providers';
import { handleNoCordovaError } from '../../app/utils';

@IonicPage()
@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage {

  authors: Author[];
  sortingProp: string = "";
  translations;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public a: Authors,
    private popoverCtrl: PopoverController,
    public file: File,
    public api: Api,
    public translate: TranslateService,
  ) {

  	this.a.getFollowing().subscribe((authors) => {
      this.authors = authors;
    });

    this.translate.get(['SETTINGS_EXPORTSUCCESS', 'COPYPROMPT_MSG']).subscribe((values) => {
      this.translations = values;
    });

  }

  followToggle(author: Author, $event) {

    $event.stopPropagation();

    if (author.following) {
      this.a.unfollow(author);

    } else {
      this.a.follow(author);
    }

  }

  showAuthor(author: Author) {
    this.navCtrl.push('AuthorPage', {
      author: author
    });
  }

  toggleSorting() {
    if (this.sortingProp == "")
      this.sortingProp = "name";

    else if (this.sortingProp == "name")
      this.sortingProp = "";
      
    else
      this.sortingProp = "";
  }

  openExportPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create("ExportPopover");

    popover.present({
      ev: ev
    });

    popover.onDidDismiss((choice: string) => {
      if (choice) {
        let data = null;
        let filename = "litapp-following-"+Math.round(new Date().getTime() / 1000);

        if (choice == 'json') {
          filename += ".json";
          data = JSON.stringify(this.authors);
        } else if (choice == 'markdown') {
          filename += ".md";
          // converting to markdown
          data = `
# Followed authors

`;

          this.authors.forEach(a => {
            data += `- [${a.name}](https://www.literotica.com/stories/memberpage.php?uid=${a.id})
`;
          });
        }

        let path = this.file.externalRootDirectory;
        this.file.writeFile(path, filename, data, {replace: true}).then(() => {
          this.api.showToast(this.translations.SETTINGS_EXPORTSUCCESS+": "+path+filename);
        }).catch(err => handleNoCordovaError(err, () => prompt(this.translations.COPYPROMPT_MSG, data)));

      }
    });
  }

}
