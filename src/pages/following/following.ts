import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { Author } from '../../models/author';
import { Authors, Files } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage {
  authors: Author[];
  sortingProp: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public a: Authors,
    private popoverCtrl: PopoverController,
    public files: Files,
  ) {
    this.a.getFollowing().subscribe(authors => {
      this.authors = authors;
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
      author,
    });
  }

  toggleSorting() {
    if (this.sortingProp === '') {
      this.sortingProp = 'name';
    } else if (this.sortingProp === 'name') {
      this.sortingProp = '';
    } else {
      this.sortingProp = '';
    }
  }

  openExportPopover(ev: UIEvent) {
    const popover = this.popoverCtrl.create('ExportPopover');

    popover.present({
      ev,
    });

    popover.onDidDismiss((choice: string) => {
      if (choice) {
        let data = null;
        // tslint:disable-next-line: prefer-template
        let filename = 'litapp-following-' + Math.round(new Date().getTime() / 1000);

        if (choice === 'json') {
          filename += '.json';
          data = JSON.stringify(this.authors);
        } else if (choice === 'markdown') {
          filename += '.md';
          // converting to markdown
          data = `
# Followed authors

`;

          this.authors.forEach(a => {
            data += `- [${a.name}](https://www.literotica.com/stories/memberpage.php?uid=${a.id})
`;
          });
        }
        this.files.save(filename, data, choice === 'json' ? 'application/json' : 'text/markdown');
      }
    });
  }
}
