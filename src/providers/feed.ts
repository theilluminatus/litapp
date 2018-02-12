import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { FeedItem } from '../models/feeditem';
import { Author } from '../models/author';
import { Stories } from './stories';
import { Authors } from './authors';
import { FEED_KEY } from './db';
import { Api } from './api/api';

@Injectable()
export class Feed {

  constructor(
    public api: Api,
    public s: Stories,
    public a: Authors,
    public storage: Storage
  ) { }

  query(lastid?: number, showloader?: boolean) {

    let loader;
    if (showloader)
      loader = this.api.showLoader();

    let params = {
      chunked: 1,
      limit: 15,
      last_id: lastid ? lastid : undefined
    };

    return this.api.get('my/api/activity/wall',params,undefined,2).map((d: any) => {
      if (loader) loader.dismiss();
      if (!d.data) {
        this.api.showToast();
        return [];
      }

      let items = d.data.map(item => {
        return new FeedItem({
          id: item.id,
          timestamp: item.when,
          author: this.a.extractFromFeed(item.who),
          text: (!Array.isArray(item.what) ? [] : item.what),
          story: (Array.isArray(item.what) ? undefined : this.s.extractFromFeed(item))
        });
      });

      this.storage.set(FEED_KEY, items[0].id);
      return items;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of([]);
    });
  }

}
