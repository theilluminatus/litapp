import { Injectable } from '@angular/core';

import { FeedItem } from '../../models/feeditem';

@Injectable()
export class Feed {
  feeditems: FeedItem[] = [];

  constructor() {
    let feeditems = [
      {
        "name": "",
        "author": "Bert",
        "subject": "author",
        "picture": "assets/img/speakers/bear.jpg",
        "text": "edited his bio.",
        "timestamp": "31/12/2017"
      },
      {
        "name": "Paul is a Puppy",
        "author": "John",
        "subject": "story",
        "text": "published a new story.",
        "timestamp": "30/12/2017"
      },
      {
        "name": "Donald Duck",
        "author": "John",
        "subject": "story",
        "text": "published a new story.",
        "timestamp": "29/12/2017"
      },
      {
        "name": "",
        "author": "John",
        "subject": "author",
        "picture": "assets/img/speakers/eagle.jpg",
        "text": "changed her relationship status.",
        "timestamp": "28/12/2017"
      },
      {
        "name": "",
        "author": "Inge",
        "subject": "author",
        "picture": "assets/img/speakers/elephant.jpg",
        "text": "changed her birthday.",
        "timestamp": "27/12/2017"
      },
      {
        "name": "Molly Mouse",
        "author": "John",
        "subject": "story",
        "text": "published a new story.",
        "timestamp": "10/12/2017"
      },
      {
        "name": "",
        "author": "Peter",
        "subject": "author",
        "picture": "assets/img/speakers/puppy.jpg",
        "text": "edited his bio.",
        "timestamp": "9/12/2017"
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
