import { Injectable } from '@angular/core';

import { FeedItem } from '../../models/feeditem';
import { deffeeditems } from '../data';

@Injectable()
export class Feed {
  feeditems: FeedItem[];

  constructor() {
    this.feeditems = deffeeditems;
  }

  query(params?: any) {
    if (!params) {
      return this.feeditems;
    }

    return this.feeditems.filter(feeditem => {
      for (const key in params) {
        const field = feeditem[key];
        if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return feeditem;
        }
        if (field === params[key]) {
          return feeditem;
        }
      }
      return null;
    });
  }
}
