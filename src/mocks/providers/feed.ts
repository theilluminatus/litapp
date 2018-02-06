import { Injectable } from '@angular/core';

import { FeedItem } from '../../models/feeditem';

@Injectable()
export class Feed {
  feeditems: FeedItem[] = [];

  constructor() {
    let feeditems = [
      {
        "name": "Burt Bear",
        "subject": "author",
        "picture": "assets/img/speakers/bear.jpg",
        "text": "Burt is a Bear."
      },
      {
        "name": "Charlie Cheetah",
        "subject": "story",
        "text": "Charlie is a Cheetah."
      },
      {
        "name": "Donald Duck",
        "subject": "story",
        "text": "Donald is a Duck."
      },
      {
        "name": "Eva Eagle",
        "subject": "author",
        "picture": "assets/img/speakers/eagle.jpg",
        "text": "Eva is an Eagle."
      },
      {
        "name": "Ellie Elephant",
        "subject": "author",
        "picture": "assets/img/speakers/elephant.jpg",
        "text": "Ellie is an Elephant."
      },
      {
        "name": "Molly Mouse",
        "subject": "story",
        "text": "Molly is a Mouse."
      },
      {
        "name": "Paul Puppy",
        "subject": "author",
        "picture": "assets/img/speakers/puppy.jpg",
        "text": "Paul is a Puppy."
      }
    ];

    for (let feeditem of feeditems) {
      this.feeditems.push(new FeedItem(feeditem));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.feeditems;
    }

    return this.feeditems.filter((feeditem) => {
      for (let key in params) {
        let field = feeditem[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return feeditem;
        } else if (field == params[key]) {
          return feeditem;
        }
      }
      return null;
    });
  }

}
